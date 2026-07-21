class StoryEngine {
  constructor(scene, lessonEngine){
    this.scene = scene;
    this.lessonEngine = lessonEngine;
    this.lesson = null;
    this.story = null;
    this.pageIndex = 0;
    this.questionIndex = 0;
    this.onComplete = null;
  }

  start(lesson, onComplete){
    this.lesson = lesson;
    this.story = lesson && lesson.story;
    this.pageIndex = 0;
    this.questionIndex = 0;
    this.onComplete = onComplete;

    if(!this.story || !Array.isArray(this.story.pages)){
      this.scene.panels.message("Story Missing", "This lesson does not contain a story.");
      return;
    }

    this.lessonEngine.setSection("story");
    this.showPage();
  }

  normalizePage(page){
    return typeof page === "string"
      ? { text: page, image: "" }
      : { text: page.text || "", image: page.image || "" };
  }

  showPage(){
    if(this.pageIndex >= this.story.pages.length){
      this.questionIndex = 0;
      this.showQuestion();
      return;
    }

    const page = this.normalizePage(this.story.pages[this.pageIndex]);
    const objects = [];

    const label = this.scene.add.text(0, -215,
      `${this.story.title} — Page ${this.pageIndex + 1} of ${this.story.pages.length}`,
      { fontSize: "20px", fontStyle: "bold", color: "#46566f" }
    ).setOrigin(0.5);
    objects.push(label);

    const render = imageKey => {
      let textY = -25;
      let fontSize = "31px";

      if(imageKey){
        const image = this.scene.add.image(0, -95, imageKey).setOrigin(0.5);
        const scale = Math.min(560 / image.width, 235 / image.height, 1);
        image.setScale(scale);
        objects.push(image);
        textY = 80;
        fontSize = "25px";
      }

      const text = this.scene.add.text(0, textY,
        this.lessonEngine.replaceName(page.text),
        { fontSize, fontStyle: "bold", color: "#102342", align: "center", wordWrap: { width: 690 } }
      ).setOrigin(0.5);
      objects.push(text);

      const read = this.scene.panels.makeButton(-150, 205, "Read Aloud", () => {
        this.lessonEngine.speakText(this.lessonEngine.replaceName(page.text));
      }, { backgroundColor: "#ffffff" });

      const next = this.scene.panels.makeButton(150, 205,
        this.pageIndex === this.story.pages.length - 1 ? "Story Check" : "Next Page",
        () => {
          this.lessonEngine.stopMedia();
          this.pageIndex++;
          this.showPage();
        }
      );

      objects.push(read, next);
      this.scene.panels.open(objects, { width: 820, height: 570 });
    };

    if(!page.image){
      render(null);
      return;
    }

    const key = `story-${this.lesson.id}-${this.pageIndex}`;
    if(this.scene.textures.exists(key)){
      render(key);
      return;
    }

    this.scene.load.once(`filecomplete-image-${key}`, () => render(key));
    this.scene.load.once("loaderror", file => {
      if(file && file.key === key) render(null);
    });
    this.scene.load.image(key, page.image);
    this.scene.load.start();
  }

  showQuestion(){
    const questions = Array.isArray(this.story.questions) ? this.story.questions : [];
    const question = questions[this.questionIndex];

    if(!question){
      if(this.story.rewardPiece){
        this.lessonEngine.rewardPiece(
          this.story.rewardPiece,
          "You understood the story!",
          () => this.finish()
        );
      }else{
        this.finish();
      }
      return;
    }

    const title = this.scene.add.text(0, -185, "Story Check",
      { fontSize: "32px", fontStyle: "bold", color: "#102342" }
    ).setOrigin(0.5);

    const prompt = this.scene.add.text(0, -90, question.prompt,
      { fontSize: "27px", fontStyle: "bold", color: "#102342", align: "center", wordWrap: { width: 650 } }
    ).setOrigin(0.5);

    const objects = [title, prompt];
    const yPositions = [25, 90, 155];

    question.options.forEach((option, index) => {
      objects.push(this.scene.panels.makeButton(0, yPositions[index], option, () => {
        if(option === question.answer){
          this.questionIndex++;
          this.lessonEngine.showCorrectAnswer("Correct!", option, () => this.showQuestion());
        }else{
          this.lessonEngine.showTryAgain(() => this.showQuestion());
        }
      }, { fontSize: "21px" }));
    });

    this.scene.panels.open(objects, { width: 760, height: 530 });
  }

  finish(){
    const callback = this.onComplete;
    this.onComplete = null;
    if(typeof callback === "function") callback();
  }
}

window.StoryEngine = StoryEngine;
