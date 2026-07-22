import { chromium } from "playwright";

const baseUrl = process.env.FRITZ_BASE_URL || "http://127.0.0.1:5500";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const failures = [];

page.on("pageerror", error => failures.push(`Page error: ${error.message}`));
page.on("console", message => {
  if(message.type() === "error") failures.push(`Console error: ${message.text()}`);
});

try {
  const response = await page.goto(`${baseUrl}/academy.html?smoke=${Date.now()}`, {
    waitUntil: "networkidle",
    timeout: 30000
  });

  if(!response || !response.ok()) {
    failures.push(`academy.html returned ${response ? response.status() : "no response"}`);
  }

  await page.waitForTimeout(1500);

  const startupResult = await page.evaluate(async () => {
    const errors = [];
    const requiredGlobals = [
      "Phaser", "LEVELS", "findLevel", "LessonValidator", "PanelManager",
      "QuestionEngine", "StoryEngine", "ReaderEngine", "BuilderEngine",
      "PhonicsEngine", "MediaEngine", "CompletionEngine", "LessonEngine", "World",
      "StudentProfileEngine", "createStudent", "selectStudent", "listStudents"
    ];

    requiredGlobals.forEach(name => {
      if(typeof window[name] === "undefined") errors.push(`Missing global: ${name}`);
    });

    const profileOverlay = document.querySelector(".fritz-profile-overlay");
    if(!profileOverlay) errors.push("Student chooser did not open at startup.");

    const switchButton = document.querySelector("#fritz-switch-student");
    if(!switchButton) errors.push("Switch Student button was not created.");

    const lessonIds = ["1-A", "1-B", "1-C", "1-D", "1-E"];
    const assets = new Set();

    for(const id of lessonIds) {
      const lesson = typeof findLevel === "function" ? findLevel(id) : null;
      if(!lesson) {
        errors.push(`Missing lesson ${id}`);
        continue;
      }

      const validation = LessonValidator.validate(lesson);
      if(!validation.valid) {
        errors.push(`${id} validation failed: ${validation.errors.join(" | ")}`);
      }

      const readings = [lesson.story, lesson.reader1, lesson.reader2];
      readings.forEach(reading => {
        (reading?.pages || []).forEach(page => {
          if(page && typeof page === "object" && page.image) assets.add(page.image);
        });
      });

      [lesson.alphabetSong, lesson.closingSong].forEach(media => {
        if(media?.videoPath) assets.add(media.videoPath);
        if(media?.assetPath) assets.add(media.assetPath);
      });
    }

    for(const asset of assets) {
      try {
        const response = await fetch(asset, { cache: "no-store" });
        if(!response.ok) errors.push(`Missing asset ${asset}: HTTP ${response.status}`);
      } catch(error) {
        errors.push(`Asset request failed ${asset}: ${error.message}`);
      }
    }

    const canvas = document.querySelector("canvas");
    if(!canvas) errors.push("Phaser canvas was not created.");

    return { errors, checkedAssets: [...assets], lessonCount: window.LEVELS?.length || 0 };
  });

  failures.push(...startupResult.errors);

  const addButton = page.getByRole("button", { name: "+ Add Student" });
  if(await addButton.count()) {
    await addButton.click();
    const nameInput = page.getByLabel("Student name");

    if(await nameInput.count() === 0) {
      failures.push("Student name input did not open.");
    } else {
      const maxLength = await nameInput.getAttribute("maxlength");
      if(maxLength !== "80") {
        failures.push(`Student name maxlength should be 80, received ${maxLength}.`);
      }

      const sampleName = "Ana María-Jane O'Connor";
      await nameInput.fill(sampleName);
      const typedName = await nameInput.inputValue();
      if(typedName !== sampleName) {
        failures.push(`Student name field changed typed characters: ${typedName}`);
      }
    }
  } else {
    failures.push("Add Student button was not available.");
  }

  const transitionResult = await page.evaluate(async () => {
    const errors = [];

    if(window.fritzStudentProfiles) {
      window.fritzStudentProfiles.close();
    }

    const game = Phaser.GAMES && Phaser.GAMES[0];
    const scene = game && game.scene ? game.scene.getScene("World") : null;
    const lesson = findLevel("1-A");

    if(!scene || !scene.lessonEngine || !lesson) {
      return { errors: ["Could not prepare the Lesson 1-A transition test."] };
    }

    scene.lessonEngine.lesson = lesson;
    scene.lessonEngine.levelId = "1-A";
    scene.lessonEngine.studentName = scene.save.studentName || "Academy Student";
    scene.lessonEngine.ensureLessonSave();

    scene.lessonEngine.startStory();

    await new Promise(resolve => setTimeout(resolve, 2500));

    if(!scene.textures.exists("story-1-A-0")) {
      errors.push("Lesson 1-A first story illustration did not preload.");
    }

    const panelText = scene.panels && scene.panels.container
      ? scene.panels.container.list
          .filter(item => item && typeof item.text === "string")
          .map(item => item.text)
          .join(" ")
      : "";

    if(!panelText.includes("A New Builder Arrives") || !panelText.includes("Page 1")) {
      errors.push("Lesson 1-A did not advance from the earned builder piece to story page 1.");
    }

    return { errors };
  });

  failures.push(...transitionResult.errors);
  console.log(`Checked ${startupResult.lessonCount} lessons, student name entry, Lesson 1-A transition, and ${startupResult.checkedAssets.length} referenced assets.`);
} catch(error) {
  failures.push(`Smoke test exception: ${error.stack || error.message}`);
} finally {
  await browser.close();
}

if(failures.length) {
  console.error("FRITZ ACADEMY SMOKE TEST FAILED");
  failures.forEach(failure => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("FRITZ ACADEMY SMOKE TEST PASSED");
