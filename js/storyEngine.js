class StoryEngine {
  constructor(scene, lessonEngine){
    this.scene = scene;
    this.lessonEngine = lessonEngine;
    this.questionEngine = new QuestionEngine(
      scene,
      lessonEngine
    );
    this.lesson = null;
    this.story = null;
    this.pageIndex = 0;
    this.onComplete = null;
  }

  start(lesson, onComplete){
    this.lesson = lesson;
    this.story = lesson && lesson.story;
    this.pageIndex = 0;
    this.onComplete = onComplete;

    if(
      !this.story ||
      !Array.isArray(this.story.pages) ||
      this.story.pages.length === 0
    ){
      this.scene.panels.message(
        "Story Missing",
        "This lesson does not contain a complete story."
      );
      return;
    }

    this.lessonEngine.setSection("story");
    this.showPage();
  }

  normalizePage(page){
    return typeof page === "string"
      ? {
          text: page,
          image: ""
        }
      : {
          text: page && page.text
            ? page.text
            : "",
          image: page && page.image
            ? page.image
            : ""
        };
  }

  showPage(){
    if(this.pageIndex >= this.story.pages.length){
      this.startQuestions();
      return;
    }

    const page = this.normalizePage(
      this.story.pages[this.pageIndex]
    );

    const objects = [];

    const label = this.scene.add.text(
      0,
      -215,
      `${this.story.title} — Page ${this.pageIndex + 1} of ${this.story.pages.length}`,
      {
        fontSize: "20px",
        fontStyle: "bold",
        color: "#46566f",
        align: "center",
        wordWrap: {
          width: 700
        }
      }
    ).setOrigin(0.5);

    objects.push(label);

    const render = imageKey => {
      let textY = -25;
      let fontSize = "31px";

      if(imageKey){
        const image = this.scene.add.image(
          0,
          -95,
          imageKey
        ).setOrigin(0.5);

        const scale = Math.min(
          560 / image.width,
          235 / image.height,
          1
        );

        image.setScale(scale);
        objects.push(image);
        textY = 80;
        fontSize = "25px";
      }

      const text = this.scene.add.text(
        0,
        textY,
        this.lessonEngine.replaceName(page.text),
        {
          fontSize,
          fontStyle: "bold",
          color: "#102342",
          align: "center",
          lineSpacing: 8,
          wordWrap: {
            width: 690
          }
        }
      ).setOrigin(0.5);

      objects.push(text);

      const read = this.scene.panels.makeButton(
        -150,
        205,
        "Read Aloud",
        () => {
          this.lessonEngine.speakText(
            this.lessonEngine.replaceName(page.text)
          );
        },
        {
          backgroundColor: "#ffffff"
        }
      );

      const next = this.scene.panels.makeButton(
        150,
        205,
        this.pageIndex === this.story.pages.length - 1
          ? "Story Check"
          : "Next Page",
        () => {
          this.lessonEngine.stopMedia();
          this.pageIndex++;
          this.showPage();
        }
      );

      objects.push(read, next);

      this.scene.panels.open(
        objects,
        {
          width: 820,
          height: 570
        }
      );
    };

    if(!page.image){
      render(null);
      return;
    }

    const imageKey =
      `story-${this.lesson.id}-${this.pageIndex}`;

    if(this.scene.textures.exists(imageKey)){
      render(imageKey);
      return;
    }

    const completeEvent =
      `filecomplete-image-${imageKey}`;

    const onLoadError = file => {
      if(file && file.key === imageKey){
        this.scene.load.off(
          completeEvent,
          onLoadComplete
        );
        render(null);
      }
    };

    const onLoadComplete = () => {
      this.scene.load.off(
        "loaderror",
        onLoadError
      );
      render(imageKey);
    };

    this.scene.load.once(
      completeEvent,
      onLoadComplete
    );

    this.scene.load.once(
      "loaderror",
      onLoadError
    );

    this.scene.load.image(
      imageKey,
      page.image
    );

    this.scene.load.start();
  }

  startQuestions(){
    this.questionEngine.start({
      title: "Story Check",
      questions: Array.isArray(this.story.questions)
        ? this.story.questions
        : [],
      successMessage: "Correct!",
      retryMessage:
        "Think about what happened in the story and try again.",
      onComplete: () => this.finishStory()
    });
  }

  finishStory(){
    const finish = () => {
      const callback = this.onComplete;
      this.onComplete = null;

      if(typeof callback === "function"){
        callback();
      }
    };

    if(this.story.rewardPiece){
      this.lessonEngine.rewardPiece(
        this.story.rewardPiece,
        "You understood the story!",
        finish
      );
      return;
    }

    finish();
  }
}

window.StoryEngine = StoryEngine;
