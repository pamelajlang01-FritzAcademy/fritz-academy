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

  const result = await page.evaluate(async () => {
    const errors = [];
    const requiredGlobals = [
      "Phaser", "LEVELS", "findLevel", "LessonValidator", "PanelManager",
      "QuestionEngine", "StoryEngine", "ReaderEngine", "BuilderEngine",
      "PhonicsEngine", "MediaEngine", "CompletionEngine", "LessonEngine", "World"
    ];

    requiredGlobals.forEach(name => {
      if(typeof window[name] === "undefined") errors.push(`Missing global: ${name}`);
    });

    const lessonIds = ["1-C", "1-D", "1-E"];
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

  failures.push(...result.errors);
  console.log(`Checked ${result.lessonCount} lessons and ${result.checkedAssets.length} referenced assets.`);
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
