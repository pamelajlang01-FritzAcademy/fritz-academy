/*
====================================================
FRITZ ACADEMY
Question Engine
Version 42.0.0
====================================================

Purpose:
- Provide one reusable assessment layer for stories,
  readers, phonics, and future activities.
- Keep questions after the learning content.
- Support clear, age-appropriate feedback.
- Return a result callback only after the set is complete.
*/

class QuestionEngine {
  constructor(scene, lessonEngine){
    this.scene = scene;
    this.lessonEngine = lessonEngine;
    this.questions = [];
    this.index = 0;
    this.correct = 0;
    this.title = "Check Your Learning";
    this.onComplete = null;
    this.options = {};
  }

  start(config = {}){
    this.questions = Array.isArray(config.questions)
      ? config.questions.filter(Boolean)
      : [];

    this.index = 0;
    this.correct = 0;
    this.title = config.title || "Check Your Learning";
    this.onComplete = config.onComplete;
    this.options = {
      requireCorrect: config.requireCorrect !== false,
      showProgress: config.showProgress !== false,
      successMessage: config.successMessage || "Great thinking!",
      retryMessage: config.retryMessage || "Look closely and try again.",
      width: config.width || 780,
      height: config.height || 540
    };

    if(this.questions.length === 0){
      this.finish();
      return;
    }

    this.showQuestion();
  }

  normalizeQuestion(question){
    const source = question || {};

    return {
      prompt: source.prompt || source.question || "Choose the best answer.",
      options: Array.isArray(source.options)
        ? source.options
        : [],
      answer: source.answer,
      image: source.image || "",
      emoji: source.emoji || "",
      explanation: source.explanation || ""
    };
  }

  showQuestion(){
    const raw = this.questions[this.index];

    if(!raw){
      this.finish();
      return;
    }

    const question = this.normalizeQuestion(raw);

    if(
      question.options.length === 0 ||
      typeof question.answer === "undefined"
    ){
      this.index++;
      this.showQuestion();
      return;
    }

    const objects = [];

    const title = this.scene.add.text(
      0,
      -205,
      this.title,
      {
        fontSize: "32px",
        fontStyle: "bold",
        color: "#102342",
        align: "center",
        wordWrap: { width: 680 }
      }
    ).setOrigin(0.5);

    objects.push(title);

    if(this.options.showProgress){
      const progress = this.scene.add.text(
        0,
        -165,
        `Question ${this.index + 1} of ${this.questions.length}`,
        {
          fontSize: "19px",
          fontStyle: "bold",
          color: "#46566f"
        }
      ).setOrigin(0.5);

      objects.push(progress);
    }

    if(question.emoji){
      const emoji = this.scene.add.text(
        0,
        -100,
        question.emoji,
        { fontSize: "64px" }
      ).setOrigin(0.5);

      objects.push(emoji);
    }

    const promptY = question.emoji ? -35 : -90;

    const prompt = this.scene.add.text(
      0,
      promptY,
      question.prompt,
      {
        fontSize: "27px",
        fontStyle: "bold",
        color: "#102342",
        align: "center",
        wordWrap: { width: 660 }
      }
    ).setOrigin(0.5);

    objects.push(prompt);

    const optionCount = question.options.length;
    const startY = question.emoji ? 45 : 20;
    const gap = optionCount > 3 ? 50 : 65;

    question.options.forEach((option, optionIndex) => {
      const button = this.scene.panels.makeButton(
        0,
        startY + optionIndex * gap,
        String(option),
        () => this.checkAnswer(option, question),
        {
          fontSize: optionCount > 3 ? "20px" : "21px",
          padding: {
            x: 22,
            y: optionCount > 3 ? 7 : 9
          }
        }
      );

      objects.push(button);
    });

    this.scene.panels.open(
      objects,
      {
        width: this.options.width,
        height: this.options.height
      }
    );
  }

  checkAnswer(selected, question){
    if(selected === question.answer){
      this.correct++;
      this.index++;

      const message = question.explanation
        ? `${selected}\n\n${question.explanation}`
        : String(selected);

      this.lessonEngine.showCorrectAnswer(
        this.options.successMessage,
        message,
        () => this.showQuestion()
      );

      return;
    }

    if(!this.options.requireCorrect){
      this.index++;
      this.showQuestion();
      return;
    }

    this.lessonEngine.showTryAgain(
      () => this.showQuestion(),
      this.options.retryMessage
    );
  }

  finish(){
    const callback = this.onComplete;
    const result = {
      correct: this.correct,
      total: this.questions.length
    };

    this.onComplete = null;

    if(typeof callback === "function"){
      callback(result);
    }
  }
}

window.QuestionEngine = QuestionEngine;
