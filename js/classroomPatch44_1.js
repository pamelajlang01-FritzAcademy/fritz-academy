/* Fritz Academy Version 44.1 classroom corrections */
(function(){
  "use strict";

  const AVATAR_PATHS = {
    "girl-1": "assets/avatars/girl/ChatGPT Image Jul 13, 2026, 05_09_47 PM.png",
    "girl-2": "assets/avatars/girl/ChatGPT Image Jul 13, 2026, 05_38_28 PM.png",
    "girl-3": "assets/avatars/girl/ChatGPT Image Jul 13, 2026, 05_46_11 PM.png",
    "girl-4": "assets/avatars/girl/ChatGPT Image Jul 13, 2026, 06_04_48 PM.png",
    "girl-5": "assets/avatars/girl/ChatGPT Image Jul 13, 2026, 06_26_03 PM.png",
    "girl-6": "assets/avatars/girl/ChatGPT Image Jul 13, 2026, 06_53_21 PM.png",
    "boy-1": "assets/assets/avatars/boy/ChatGPT Image Jul 13, 2026, 04_52_40 PM.png",
    "boy-2": "assets/assets/avatars/boy/ChatGPT Image Jul 13, 2026, 05_30_53 PM.png",
    "boy-3": "assets/assets/avatars/boy/ChatGPT Image Jul 13, 2026, 05_43_25 PM.png",
    "boy-4": "assets/assets/avatars/boy/ChatGPT Image Jul 13, 2026, 05_52_10 PM.png",
    "boy-5": "assets/assets/avatars/boy/ChatGPT Image Jul 13, 2026, 06_18_19 PM.png",
    "boy-6": "assets/assets/avatars/boy/ChatGPT Image Jul 13, 2026, 06_47_19 PM.png"
  };

  function applyLessonOneBContent(){
    if(typeof findLevel !== "function") return;
    const lesson = findLevel("1-B");
    if(!lesson) return;

    lesson.feelingsActivity = lesson.conversationActivity || lesson.feelingsActivity;
    lesson.feelingsActivity.title = "What Did You Do?";
    lesson.feelingsActivity.instructions = "Look at each activity picture. Choose the complete sentence that tells what happened today or this week.";
    lesson.feelingsActivity.progressLabel = "Activity";
    lesson.feelingsActivity.questionInstruction = "Choose the complete sentence.";
    lesson.feelingsActivity.successMessage = "You answered the activity questions!";

    const storyImages = [
      "assets/bear.png",
      "assets/bear.png",
      "assets/bash.png",
      "assets/academy.png",
      "assets/fritz_academy_world_map.png",
      "assets/bear.png"
    ];
    if(lesson.story && Array.isArray(lesson.story.pages)){
      lesson.story.pages = lesson.story.pages.map((page, index) => {
        const normalized = typeof page === "string" ? { text: page } : Object.assign({}, page);
        normalized.image = storyImages[index] || "assets/academy.png";
        return normalized;
      });
    }

    const readerOneImages = ["assets/tony.png","assets/academy.png","assets/tony.png","assets/tony.png","assets/bear.png"];
    const readerTwoImages = ["assets/tony.png","assets/fritz_academy_world_map.png","assets/academy.png","assets/rascal.png","assets/nola.png","assets/fritz_academy_world_map.png"];
    [[lesson.reader1, readerOneImages],[lesson.reader2, readerTwoImages]].forEach(([reader, images]) => {
      if(!reader || !Array.isArray(reader.pages)) return;
      reader.pages = reader.pages.map((page, index) => {
        const normalized = typeof page === "string" ? { text: page } : Object.assign({}, page);
        normalized.image = images[index] || "assets/academy.png";
        return normalized;
      });
    });
  }

  applyLessonOneBContent();

  if(typeof LessonEngine !== "undefined"){
    LessonEngine.prototype.showFeelingsActivityIntro = function(){
      this.setSection("conversation-activity");
      const activity = this.lesson.feelingsActivity || this.lesson.conversationActivity;
      const title = this.scene.add.text(0, -175, activity.title || "Language Practice", {
        fontSize: "34px", fontStyle: "bold", color: "#102342"
      }).setOrigin(0.5);
      const body = this.scene.add.text(0, -25,
        (activity.instructions || "Choose the best complete sentence.") +
        "\n\nComplete all three to earn a Builder piece.", {
          fontSize: "25px", fontStyle: "bold", color: "#102342", align: "center",
          wordWrap: { width: 650 }
        }).setOrigin(0.5);
      const begin = this.scene.panels.makeButton(0, 170, "Start Activity", () => {
        this.questionIndex = 0;
        this.correctAnswers = 0;
        this.showFeelingQuestion();
      });
      this.scene.panels.open([title, body, begin], { width: 760, height: 480 });
    };

    LessonEngine.prototype.showFeelingQuestion = function(){
      const activity = this.lesson.feelingsActivity || this.lesson.conversationActivity;
      const question = activity.questions[this.questionIndex];
      if(!question){
        this.rewardPiece(activity.rewardPiece, activity.successMessage || "You completed the language activity!", () => this.startStory());
        return;
      }
      const progress = this.scene.add.text(0, -205,
        `${activity.progressLabel || "Question"} ${this.questionIndex + 1} of ${activity.questions.length}`, {
          fontSize: "19px", fontStyle: "bold", color: "#46566f"
        }).setOrigin(0.5);
      const picture = this.scene.add.text(0, -105, question.emoji || question.picture || "💬", { fontSize: "78px" }).setOrigin(0.5);
      const instruction = this.scene.add.text(0, -20,
        activity.questionInstruction || question.prompt || "Choose the best answer.", {
          fontSize: "24px", fontStyle: "bold", color: "#102342", align: "center",
          wordWrap: { width: 650 }
        }).setOrigin(0.5);
      const objects = [progress, picture, instruction];
      const yPositions = [55, 115, 175];
      question.options.forEach((option, optionIndex) => {
        objects.push(this.scene.panels.makeButton(0, yPositions[optionIndex], option, () => {
          if(option === question.answer){
            this.correctAnswers++;
            this.questionIndex++;
            this.showCorrectAnswer("Correct!", question.answer, () => this.showFeelingQuestion());
          }else{
            this.showTryAgain(() => this.showFeelingQuestion());
          }
        }, { fontSize: "21px", padding: { x: 22, y: 8 } }));
      });
      this.scene.panels.open(objects, { width: 760, height: 560 });
    };
  }

  function animateCurrentReadingPanel(engine){
    const run = () => {
      const objects = engine && engine.scene && engine.scene.panels ? engine.scene.panels.activeObjects : [];
      const image = objects.find(object => object && object.type === "Image");
      if(!image || image.__fritzAnimated) return;
      image.__fritzAnimated = true;
      const baseScaleX = image.scaleX;
      const baseScaleY = image.scaleY;
      engine.scene.tweens.add({
        targets: image,
        scaleX: baseScaleX * 1.035,
        scaleY: baseScaleY * 1.035,
        y: image.y - 5,
        duration: 1800,
        ease: "Sine.easeInOut",
        yoyo: true,
        repeat: -1
      });
    };
    window.setTimeout(run, 100);
    window.setTimeout(run, 450);
  }

  if(typeof StoryEngine !== "undefined"){
    const originalStoryPage = StoryEngine.prototype.showPage;
    StoryEngine.prototype.showPage = function(){
      originalStoryPage.call(this);
      animateCurrentReadingPanel(this);
    };
  }

  if(typeof ReaderEngine !== "undefined"){
    const originalReaderPage = ReaderEngine.prototype.showPage;
    ReaderEngine.prototype.showPage = function(){
      originalReaderPage.call(this);
      animateCurrentReadingPanel(this);
    };
  }

  if(typeof World !== "undefined"){
    const originalPreload = World.prototype.preload;
    World.prototype.preload = function(){
      originalPreload.call(this);
      Object.entries(AVATAR_PATHS).forEach(([id, path]) => {
        this.load.image(`student-avatar-${id}`, path);
      });
    };

    World.prototype.createPlayer = function(){
      const startX = 1080;
      const startY = 1810;
      const avatarId = this.save && this.save.avatar;
      const avatarKey = avatarId && AVATAR_PATHS[avatarId] ? `student-avatar-${avatarId}` : "fritz";
      this.playerShadow = this.add.ellipse(startX, startY + 34, 44, 15, 0x000000, 0.28).setDepth(startY - 1);
      this.player = this.physics.add.image(startX, startY, avatarKey).setDepth(startY);
      if(avatarKey === "fritz"){
        this.player.setScale(0.036);
      }else{
        this.player.setDisplaySize(70, 92);
      }
      this.player.body.setCollideWorldBounds(true);
      this.player.body.setSize(Math.max(30, this.player.displayWidth * 0.55), Math.max(42, this.player.displayHeight * 0.72));
      this.physics.add.collider(this.player, this.walls);
    };
  }
})();