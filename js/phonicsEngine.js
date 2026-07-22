/*
====================================================
FRITZ ACADEMY
Phonics Engine
Version 42.0.0
====================================================
*/

class PhonicsEngine {
  constructor(scene, lessonEngine){
    this.scene = scene;
    this.lessonEngine = lessonEngine;
    this.questionEngine = new QuestionEngine(scene, lessonEngine);
    this.lesson = null;
    this.phonics = null;
    this.onComplete = null;
  }

  start(lesson, onComplete){
    this.lesson = lesson;
    this.phonics = lesson && lesson.phonics;
    this.onComplete = onComplete;

    if(!this.phonics){
      this.finish();
      return;
    }

    this.lessonEngine.stopMedia();
    this.lessonEngine.setSection("phonics");
    this.showWorkshop();
  }

  normalizeLetters(){
    const upper = this.phonics.letterUpper;
    const lower = this.phonics.letterLower;

    if(Array.isArray(upper) || Array.isArray(lower)){
      const uppers = Array.isArray(upper) ? upper : [upper].filter(Boolean);
      const lowers = Array.isArray(lower) ? lower : [lower].filter(Boolean);

      return uppers.map((value, index) => ({
        upper: value || "",
        lower: lowers[index] || ""
      }));
    }

    if(Array.isArray(this.phonics.letters)){
      return this.phonics.letters.map(letter => ({
        upper: letter.upper || letter.letterUpper || "",
        lower: letter.lower || letter.letterLower || ""
      }));
    }

    return [{
      upper: upper || "",
      lower: lower || ""
    }];
  }

  buildQuestions(){
    if(Array.isArray(this.phonics.questions)){
      return this.phonics.questions.filter(Boolean);
    }

    return [
      this.phonics.recognitionQuestion,
      this.phonics.lowercaseQuestion,
      this.phonics.wordQuestion,
      this.phonics.blendingQuestion
    ].filter(Boolean);
  }

  showWorkshop(){
    const letters = this.normalizeLetters();
    const letterDisplay = letters
      .map(letter => `${letter.upper} ${letter.lower}`.trim())
      .filter(Boolean)
      .join("    ");

    const title = this.scene.add.text(
      0,
      -215,
      this.phonics.title || "Phonics Workshop",
      {
        fontSize: "33px",
        fontStyle: "bold",
        color: "#102342"
      }
    ).setOrigin(0.5);

    const lettersText = this.scene.add.text(
      0,
      -125,
      letterDisplay,
      {
        fontSize: letters.length > 2 ? "54px" : "72px",
        fontStyle: "bold",
        color: "#174ea6",
        align: "center",
        wordWrap: { width: 700 }
      }
    ).setOrigin(0.5);

    const sound = this.scene.add.text(
      0,
      -45,
      this.phonics.soundLabel || "Listen and say the sound.",
      {
        fontSize: "26px",
        fontStyle: "bold",
        color: "#102342",
        align: "center",
        wordWrap: { width: 680 }
      }
    ).setOrigin(0.5);

    const cue = this.scene.add.text(
      0,
      15,
      this.phonics.teacherCue || "Listen, repeat, and connect each sound to a word.",
      {
        fontSize: "22px",
        fontStyle: "bold",
        color: "#102342",
        align: "center",
        wordWrap: { width: 660 }
      }
    ).setOrigin(0.5);

    const objects = [title, lettersText, sound, cue];
    const examples = Array.isArray(this.phonics.examples)
      ? this.phonics.examples.slice(0, 4)
      : [];

    const positions = examples.length === 4
      ? [-255, -85, 85, 255]
      : examples.length === 2
        ? [-130, 130]
        : [-190, 0, 190];

    examples.forEach((example, index) => {
      objects.push(
        this.scene.add.text(
          positions[index] || 0,
          115,
          `${example.icon || "🔤"}\n${example.word || ""}`,
          {
            fontSize: examples.length === 4 ? "22px" : "25px",
            fontStyle: "bold",
            color: "#102342",
            align: "center"
          }
        ).setOrigin(0.5)
      );
    });

    const listen = this.scene.panels.makeButton(
      -160,
      210,
      "Hear the Sounds",
      () => {
        this.lessonEngine.speakText(
          this.phonics.teacherCue ||
          `${letterDisplay}. ${examples.map(example => example.word).join(", ")}`
        );
      },
      { backgroundColor: "#ffffff" }
    );

    const practice = this.scene.panels.makeButton(
      160,
      210,
      "Start Practice",
      () => this.startPractice()
    );

    objects.push(listen, practice);

    this.scene.panels.open(
      objects,
      { width: 820, height: 590 }
    );
  }

  startPractice(){
    const questions = this.buildQuestions();

    this.questionEngine.start({
      title: "Phonics Practice",
      questions,
      successMessage: "Correct!",
      retryMessage: "Say the sound again, then choose the best answer.",
      onComplete: () => this.finishWithReward()
    });
  }

  finishWithReward(){
    if(this.phonics.rewardPiece){
      this.lessonEngine.rewardPiece(
        this.phonics.rewardPiece,
        "You completed the phonics workshop!",
        () => this.finish()
      );
      return;
    }

    this.finish();
  }

  finish(){
    const callback = this.onComplete;
    this.onComplete = null;

    if(typeof callback === "function"){
      callback();
    }
  }
}

window.PhonicsEngine = PhonicsEngine;
