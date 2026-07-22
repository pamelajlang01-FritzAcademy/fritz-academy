class LessonEngine {
  constructor(scene){
    this.scene = scene;
    this.lesson = null;
    this.levelId = null;
    this.location = "";
    this.studentName = "";
    this.storyPage = 0;
    this.readerPage = 0;
    this.questionIndex = 0;
    this.correctAnswers = 0;
    this.mediaElement = null;
    this.storyEngine = new StoryEngine(scene, this);
  }

  start(levelId, location = "Fritz Academy"){
    const lesson = findLevel(levelId);

    if(
  !lesson ||
  !lesson.story ||
  !lesson.phonics ||
  !lesson.reader1 ||
  !lesson.reader2 ||
  !lesson.build ||
  !lesson.completion
){
  this.scene.panels.message(
    "Adventure Locked",
    "This lesson is still being built."
  );
  return;
}

    this.lesson = lesson;
    this.levelId = levelId;
    this.location = location;
    this.studentName =
      this.scene.save.studentName ||
      "Academy Student";

    this.ensureLessonSave();
    this.showMissionOpening();
  }

  ensureLessonSave(){
    const save = this.scene.save;

    if(!save.lessonProgress){
      save.lessonProgress = {};
    }

    if(!save.lessonProgress[this.levelId]){
      save.lessonProgress[this.levelId] = {
        currentSection: "opening",
        earnedPieces: [],
        feeling: "",
        completed: false
      };
    }

    if(!save.unlockedLevels){
      save.unlockedLevels = ["1-A"];
    }

    ["1-B", "1-C", "1-D"].forEach((lessonId) => {
      if(!save.unlockedLevels.includes(lessonId)){
        save.unlockedLevels.push(lessonId);
      }
    });

    saveGame(save);
  }

  progress(){
    return this.scene.save.lessonProgress[this.levelId];
  }

  replaceName(text){
    return replaceStudentName(
      text,
      this.studentName
    );
  }

  setSection(section){
    this.progress().currentSection = section;
    saveGame(this.scene.save);
  }

  hasPiece(pieceId){
    return this.progress().earnedPieces.includes(pieceId);
  }

  earnPiece(piece){
    if(!this.hasPiece(piece.id)){
      this.progress().earnedPieces.push(piece.id);
      saveGame(this.scene.save);
    }
  }

  showMissionOpening(){
    this.setSection("opening");

    const title = this.scene.add.text(
      0,
      -205,
      `Level ${this.levelId}`,
      {
        fontSize: "34px",
        fontStyle: "bold",
        color: "#102342"
      }
    ).setOrigin(0.5);

    const subtitle = this.scene.add.text(
      0,
      -145,
      this.lesson.title,
      {
        fontSize: "27px",
        fontStyle: "bold",
        color: "#174ea6"
      }
    ).setOrigin(0.5);

    const body = this.scene.add.text(
      0,
      -20,
      "Captain Fritz has a new mission.\n\n" +
      "Learn the words.\n" +
      "Earn the pieces.\n" +
      "Build the Welcome Garden.",
      {
        fontSize: "25px",
        fontStyle: "bold",
        color: "#102342",
        align: "center",
        lineSpacing: 10,
        wordWrap: {
          width: 650
        }
      }
    ).setOrigin(0.5);

    const begin = this.scene.panels.makeButton(
      0,
      190,
      "Begin Adventure",
      () => this.showGreeting(0),
      {
        fontSize: "25px"
      }
    );

    this.scene.panels.open(
      [title, subtitle, body, begin],
      {
        width: 780,
        height: 520
      }
    );
  }

  showGreeting(index){
    this.setSection("greeting");

    const conversation = [
      {
        speaker: "Captain Fritz",
        text: "Hello! My name is Captain Fritz."
      },
      {
        speaker: "Captain Fritz",
        text: "What is your name?",
        nameResponse: true
      },
      {
        speaker: "Captain Fritz",
        text:
          `It is nice to meet you, ${this.studentName}!`
      },
      {
        speaker: "Captain Fritz",
        text: "How are you today?",
        feelingResponse: true
      }
    ];

    const line = conversation[index];

    if(!line){
      this.showFeelingsActivityIntro();
      return;
    }

    const speaker = this.scene.add.text(
      0,
      -160,
      line.speaker,
      {
        fontSize: "27px",
        fontStyle: "bold",
        color: "#174ea6"
      }
    ).setOrigin(0.5);

    const dialogue = this.scene.add.text(
      0,
      -30,
      line.text,
      {
        fontSize: "30px",
        fontStyle: "bold",
        color: "#102342",
        align: "center",
        wordWrap: {
          width: 650
        }
      }
    ).setOrigin(0.5);

    const objects = [
      speaker,
      dialogue
    ];

    if(line.nameResponse){
      const answer = this.scene.add.text(
        0,
        75,
        `My name is ${this.studentName}.`,
        {
          fontSize: "25px",
          fontStyle: "bold",
          color: "#102342",
          backgroundColor: "#ffffff",
          padding: {
            x: 22,
            y: 12
          }
        }
      ).setOrigin(0.5);

      const sayIt = this.scene.panels.makeButton(
        0,
        165,
        "I Said It",
        () => this.showGreeting(index + 1)
      );

      objects.push(answer, sayIt);
    }else if(line.feelingResponse){
      const choices = this.lesson.feelingChoices;
      const xPositions = [-220, 0, 220];

      choices.forEach((choice, choiceIndex) => {
        const emoji = this.scene.add.text(
          xPositions[choiceIndex],
          55,
          choice.emoji,
          {
            fontSize: "48px"
          }
        ).setOrigin(0.5);

        const button = this.scene.panels.makeButton(
          xPositions[choiceIndex],
          135,
          choice.label,
          () => {
            this.progress().feeling = choice.id;
            saveGame(this.scene.save);
            this.showFeelingResponse(choice);
          },
          {
            fontSize: "20px",
            padding: {
              x: 15,
              y: 9
            }
          }
        );

        objects.push(emoji, button);
      });
    }else{
      const next = this.scene.panels.makeButton(
        0,
        170,
        "Next",
        () => this.showGreeting(index + 1)
      );

      objects.push(next);
    }

    this.scene.panels.open(
      objects,
      {
        width: 800,
        height: 500
      }
    );
  }

  showFeelingResponse(choice){
    const title = this.scene.add.text(
      0,
      -135,
      choice.emoji,
      {
        fontSize: "70px"
      }
    ).setOrigin(0.5);

    const studentSentence = this.scene.add.text(
      0,
      -35,
      choice.label,
      {
        fontSize: "30px",
        fontStyle: "bold",
        color: "#102342"
      }
    ).setOrigin(0.5);

    const fritzResponse = this.scene.add.text(
      0,
      65,
      `Captain Fritz: Thank you, ${this.studentName}.`,
      {
        fontSize: "23px",
        fontStyle: "bold",
        color: "#174ea6"
      }
    ).setOrigin(0.5);

    const continueButton =
      this.scene.panels.makeButton(
        0,
        155,
        "Continue",
        () => this.showFeelingsActivityIntro()
      );

    this.scene.panels.open(
      [
        title,
        studentSentence,
        fritzResponse,
        continueButton
      ],
      {
        width: 720,
        height: 430
      }
    );
  }

  showFeelingsActivityIntro(){
    this.setSection("feelings");

    const title = this.scene.add.text(
      0,
      -175,
      "Feeling Match",
      {
        fontSize: "34px",
        fontStyle: "bold",
        color: "#102342"
      }
    ).setOrigin(0.5);

    const body = this.scene.add.text(
      0,
      -25,
      "Match each face to the English sentence.\n\n" +
      "Get all three correct to earn\n" +
      "the first Welcome Garden piece.",
      {
        fontSize: "25px",
        fontStyle: "bold",
        color: "#102342",
        align: "center",
        wordWrap: {
          width: 650
        }
      }
    ).setOrigin(0.5);

    const begin = this.scene.panels.makeButton(
      0,
      170,
      "Start Matching",
      () => {
        this.questionIndex = 0;
        this.correctAnswers = 0;
        this.showFeelingQuestion();
      }
    );

    this.scene.panels.open(
      [title, body, begin],
      {
        width: 760,
        height: 480
      }
    );
  }

  showFeelingQuestion(){
    const activity =
      this.lesson.feelingsActivity;

    const question =
      activity.questions[this.questionIndex];

    if(!question){
      this.rewardPiece(
        activity.rewardPiece,
        "You matched the feelings!",
        () => this.startStory()
      );
      return;
    }

    const progress = this.scene.add.text(
      0,
      -205,
      `Feeling ${this.questionIndex + 1} of ${activity.questions.length}`,
      {
        fontSize: "19px",
        fontStyle: "bold",
        color: "#46566f"
      }
    ).setOrigin(0.5);

    const emoji = this.scene.add.text(
      0,
      -105,
      question.emoji,
      {
        fontSize: "78px"
      }
    ).setOrigin(0.5);

    const instruction = this.scene.add.text(
      0,
      -20,
      "Choose the matching sentence.",
      {
        fontSize: "24px",
        fontStyle: "bold",
        color: "#102342"
      }
    ).setOrigin(0.5);

    const objects = [
      progress,
      emoji,
      instruction
    ];

    const yPositions = [55, 115, 175];

    question.options.forEach(
      (option, optionIndex) => {
        const button =
          this.scene.panels.makeButton(
            0,
            yPositions[optionIndex],
            option,
            () => {
              if(option === question.answer){
                this.correctAnswers++;
                this.questionIndex++;

                this.showCorrectAnswer(
                  "Correct!",
                  question.answer,
                  () => this.showFeelingQuestion()
                );
              }else{
                this.showTryAgain(
                  () => this.showFeelingQuestion()
                );
              }
            },
            {
              fontSize: "21px",
              padding: {
                x: 22,
                y: 8
              }
            }
          );

        objects.push(button);
      }
    );

    this.scene.panels.open(
      objects,
      {
        width: 760,
        height: 560
      }
    );
  }

  showCorrectAnswer(titleText, answer, callback){
    const title = this.scene.add.text(
      0,
      -90,
      titleText,
      {
        fontSize: "38px",
        fontStyle: "bold",
        color: "#2f7d32"
      }
    ).setOrigin(0.5);

    const body = this.scene.add.text(
      0,
      10,
      answer,
      {
        fontSize: "28px",
        fontStyle: "bold",
        color: "#102342"
      }
    ).setOrigin(0.5);

    const next = this.scene.panels.makeButton(
      0,
      110,
      "Next",
      callback
    );

    this.scene.panels.open(
      [title, body, next],
      {
        width: 620,
        height: 330
      }
    );
  }

  showTryAgain(callback){
    const title = this.scene.add.text(
      0,
      -60,
      "Try Again",
      {
        fontSize: "36px",
        fontStyle: "bold",
        color: "#b5462d"
      }
    ).setOrigin(0.5);

    const body = this.scene.add.text(
      0,
      20,
      "Look carefully and try once more.",
      {
        fontSize: "24px",
        fontStyle: "bold",
        color: "#102342"
      }
    ).setOrigin(0.5);

    const tryButton =
      this.scene.panels.makeButton(
        0,
        105,
        "Try Again",
        callback
      );

    this.scene.panels.open(
      [title, body, tryButton],
      {
        width: 620,
        height: 320
      }
    );
  }

  rewardPiece(piece, message, callback){
    this.earnPiece(piece);

    const title = this.scene.add.text(
      0,
      -165,
      "Build Piece Earned!",
      {
        fontSize: "34px",
        fontStyle: "bold",
        color: "#102342"
      }
    ).setOrigin(0.5);

    const icon = this.scene.add.text(
      0,
      -65,
      piece.icon,
      {
        fontSize: "72px"
      }
    ).setOrigin(0.5);

    const name = this.scene.add.text(
      0,
      20,
      piece.name,
      {
        fontSize: "29px",
        fontStyle: "bold",
        color: "#174ea6"
      }
    ).setOrigin(0.5);

    const body = this.scene.add.text(
      0,
      82,
      message,
      {
        fontSize: "21px",
        fontStyle: "bold",
        color: "#102342"
      }
    ).setOrigin(0.5);

    const continueButton =
      this.scene.panels.makeButton(
        0,
        170,
        "Add to Builder Pack",
        callback
      );

    this.scene.panels.open(
      [
        title,
        icon,
        name,
        body,
        continueButton
      ],
      {
        width: 720,
        height: 500
      }
    );
  }

  startStory(){
    this.storyEngine.start(
      this.lesson,
      () => this.showAlphabetSong()
    );
  }

  showStoryPage(){
    const story = this.lesson.story;

    if(this.storyPage >= story.pages.length){
      this.questionIndex = 0;
      this.showStoryQuestion();
      return;
    }

    const page = story.pages[this.storyPage];

    const pageLabel = this.scene.add.text(
      0,
      -205,
      `${story.title} — Page ${this.storyPage + 1}`,
      {
        fontSize: "21px",
        fontStyle: "bold",
        color: "#46566f"
      }
    ).setOrigin(0.5);

    const storyText = this.scene.add.text(
      0,
      -25,
      this.replaceName(page.text),
      {
        fontSize: "31px",
        fontStyle: "bold",
        color: "#102342",
        align: "center",
        lineSpacing: 10,
        wordWrap: {
          width: 670
        }
      }
    ).setOrigin(0.5);

    const readButton =
      this.scene.panels.makeButton(
        -150,
        190,
        "Read Again",
        () => {
          this.speakText(
            this.replaceName(page.text)
          );
        },
        {
          backgroundColor: "#ffffff"
        }
      );

    const nextButton =
      this.scene.panels.makeButton(
        150,
        190,
        this.storyPage ===
          story.pages.length - 1
          ? "Story Check"
          : "Next Page",
        () => {
          this.storyPage++;
          this.showStoryPage();
        }
      );

    this.scene.panels.open(
      [
        pageLabel,
        storyText,
        readButton,
        nextButton
      ],
      {
        width: 800,
        height: 520
      }
    );
  }

  showStoryQuestion(){
    const story = this.lesson.story;
    const question =
      story.questions[this.questionIndex];

    if(!question){
      this.rewardPiece(
        story.rewardPiece,
        "You understood the story!",
        () => this.showAlphabetSong()
      );
      return;
    }

    const title = this.scene.add.text(
      0,
      -185,
      "Story Check",
      {
        fontSize: "32px",
        fontStyle: "bold",
        color: "#102342"
      }
    ).setOrigin(0.5);

    const prompt = this.scene.add.text(
      0,
      -90,
      question.prompt,
      {
        fontSize: "27px",
        fontStyle: "bold",
        color: "#102342",
        align: "center"
      }
    ).setOrigin(0.5);

    const objects = [title, prompt];
    const yPositions = [25, 90, 155];

    question.options.forEach(
      (option, optionIndex) => {
        const button =
          this.scene.panels.makeButton(
            0,
            yPositions[optionIndex],
            option,
            () => {
              if(option === question.answer){
                this.questionIndex++;

                this.showCorrectAnswer(
                  "Correct!",
                  option,
                  () => this.showStoryQuestion()
                );
              }else{
                this.showTryAgain(
                  () => this.showStoryQuestion()
                );
              }
            },
            {
              fontSize: "21px"
            }
          );

        objects.push(button);
      }
    );

    this.scene.panels.open(
      objects,
      {
        width: 760,
        height: 530
      }
    );
  }

  showAlphabetSong(){
    this.setSection("alphabet-song");

    const song =
      this.lesson.alphabetSong;

    const title = this.scene.add.text(
      0,
      -190,
      "Music Box Unlocked!",
      {
        fontSize: "35px",
        fontStyle: "bold",
        color: "#102342"
      }
    ).setOrigin(0.5);

    const icon = this.scene.add.text(
      0,
      -95,
      "🎵",
      {
        fontSize: "70px"
      }
    ).setOrigin(0.5);

    const body = this.scene.add.text(
      0,
      0,
      song.rewardMessage +
      "\n\nSing the alphabet with Captain Fritz.",
      {
        fontSize: "25px",
        fontStyle: "bold",
        color: "#102342",
        align: "center"
      }
    ).setOrigin(0.5);

    const play = this.scene.panels.makeButton(
      -155,
      175,
      "Play Song",
      () => this.playMedia(
        song.videoPath,
        song.assetPath
      )
    );

    const continueButton =
      this.scene.panels.makeButton(
        155,
        175,
        "Continue",
        () => {
          this.stopMedia();
          this.showPhonics();
        }
      );

    this.scene.panels.open(
      [
        title,
        icon,
        body,
        play,
        continueButton
      ],
      {
        width: 780,
        height: 520
      }
    );
  }

  showPhonics(){
    this.stopMedia();
    this.setSection("phonics");

    const phonics = this.lesson.phonics;

    const title = this.scene.add.text(
      0,
      -210,
      "Phonics Workshop",
      {
        fontSize: "33px",
        fontStyle: "bold",
        color: "#102342"
      }
    ).setOrigin(0.5);

    const letters = this.scene.add.text(
      0,
      -115,
      `${phonics.letterUpper}  ${phonics.letterLower}`,
      {
        fontSize: "76px",
        fontStyle: "bold",
        color: "#174ea6"
      }
    ).setOrigin(0.5);

    const sound = this.scene.add.text(
      0,
      -35,
      phonics.soundLabel,
      {
        fontSize: "27px",
        fontStyle: "bold",
        color: "#102342"
      }
    ).setOrigin(0.5);

    const cue = this.scene.add.text(
      0,
      25,
      phonics.teacherCue,
      {
        fontSize: "23px",
        fontStyle: "bold",
        color: "#102342",
        align: "center",
        wordWrap: {
          width: 640
        }
      }
    ).setOrigin(0.5);

    const examplePositions = [-190, 0, 190];
    const objects = [title, letters, sound, cue];

    phonics.examples.forEach(
      (example, index) => {
        const exampleText = this.scene.add.text(
          examplePositions[index],
          110,
          `${example.icon}\n${example.word}`,
          {
            fontSize: "26px",
            fontStyle: "bold",
            color: "#102342",
            align: "center"
          }
        ).setOrigin(0.5);

        objects.push(exampleText);
      }
    );

    const listen = this.scene.panels.makeButton(
      -155,
      205,
      "Hear the Sound",
      () => this.speakText(
        phonics.teacherCue
      ),
      {
        backgroundColor: "#ffffff"
      }
    );

    const practice = this.scene.panels.makeButton(
      155,
      205,
      "Practice",
      () => this.startPhonicsPractice()
    );

    objects.push(listen, practice);

    this.scene.panels.open(
      objects,
      {
        width: 800,
        height: 590
      }
    );
  }

  startPhonicsPractice(){
    this.questionIndex = 0;
    this.showPhonicsQuestion();
  }

  phonicsQuestions(){
    return [
      this.lesson.phonics.recognitionQuestion,
      this.lesson.phonics.lowercaseQuestion,
      this.lesson.phonics.wordQuestion
    ];
  }

  showPhonicsQuestion(){
    const questions = this.phonicsQuestions();
    const question =
      questions[this.questionIndex];

    if(!question){
      this.rewardPiece(
        this.lesson.phonics.rewardPiece,
        "You completed the phonics workshop!",
        () => this.startReader(
          this.lesson.reader1,
          "reader1"
        )
      );
      return;
    }

    const title = this.scene.add.text(
      0,
      -175,
      `Phonics ${this.questionIndex + 1} of ${questions.length}`,
      {
        fontSize: "31px",
        fontStyle: "bold",
        color: "#102342"
      }
    ).setOrigin(0.5);

    const prompt = this.scene.add.text(
      0,
      -70,
      question.prompt,
      {
        fontSize: "27px",
        fontStyle: "bold",
        color: "#102342",
        align: "center"
      }
    ).setOrigin(0.5);

    const objects = [title, prompt];
    const yPositions = [30, 95, 160];

    question.options.forEach(
      (option, optionIndex) => {
        const button =
          this.scene.panels.makeButton(
            0,
            yPositions[optionIndex],
            option,
            () => {
              if(option === question.answer){
                this.questionIndex++;

                this.showCorrectAnswer(
                  "Correct!",
                  option,
                  () => this.showPhonicsQuestion()
                );
              }else{
                this.showTryAgain(
                  () => this.showPhonicsQuestion()
                );
              }
            }
          );

        objects.push(button);
      }
    );

    this.scene.panels.open(
      objects,
      {
        width: 760,
        height: 520
      }
    );
  }

  startReader(reader, readerKey){
    this.stopMedia();
    this.setSection(readerKey);
    this.currentReader = reader;
    this.currentReaderKey = readerKey;
    this.readerPage = 0;
    this.showReaderPage();
  }

  showReaderPage(){
    const reader = this.currentReader;

    if(this.readerPage >= reader.pages.length){
      this.showReaderCheck();
      return;
    }

    const page = reader.pages[this.readerPage];
    const pageText =
      typeof page === "string"
        ? page
        : page.text;

    const title = this.scene.add.text(
      0,
      -205,
      `${reader.title} — Page ${this.readerPage + 1}`,
      {
        fontSize: "21px",
        fontStyle: "bold",
        color: "#46566f"
      }
    ).setOrigin(0.5);

    const levelLabel = this.scene.add.text(
      0,
      -155,
      reader.level,
      {
        fontSize: "20px",
        fontStyle: "bold",
        color: "#174ea6"
      }
    ).setOrigin(0.5);

    const text = this.scene.add.text(
      0,
      -15,
      this.replaceName(pageText),
      {
        fontSize: "33px",
        fontStyle: "bold",
        color: "#102342",
        align: "center",
        wordWrap: {
          width: 670
        }
      }
    ).setOrigin(0.5);

    const readButton =
      this.scene.panels.makeButton(
        -150,
        190,
        "Read Again",
        () => this.speakText(
          this.replaceName(pageText)
        ),
        {
          backgroundColor: "#ffffff"
        }
      );

    const nextButton =
      this.scene.panels.makeButton(
        150,
        190,
        this.readerPage ===
          reader.pages.length - 1
          ? "Reader Check"
          : "Next Page",
        () => {
          this.readerPage++;
          this.showReaderPage();
        }
      );

    this.scene.panels.open(
      [
        title,
        levelLabel,
        text,
        readButton,
        nextButton
      ],
      {
        width: 800,
        height: 520
      }
    );
  }

  showReaderCheck(){
    const reader = this.currentReader;
    const check = reader.check;

    const title = this.scene.add.text(
      0,
      -175,
      "Reader Check",
      {
        fontSize: "32px",
        fontStyle: "bold",
        color: "#102342"
      }
    ).setOrigin(0.5);

    const prompt = this.scene.add.text(
      0,
      -70,
      check.prompt,
      {
        fontSize: "27px",
        fontStyle: "bold",
        color: "#102342",
        align: "center"
      }
    ).setOrigin(0.5);

    const objects = [title, prompt];
    const yPositions = [30, 95, 160];

    check.options.forEach(
      (option, optionIndex) => {
        const button =
          this.scene.panels.makeButton(
            0,
            yPositions[optionIndex],
            option,
            () => {
              if(option === check.answer){
                this.showCorrectAnswer(
                  "Correct!",
                  option,
                  () => {
                    this.rewardPiece(
                      reader.rewardPiece,
                      "You completed this reader!",
                      () => {
                        if(
                          this.currentReaderKey ===
                          "reader1"
                        ){
                          this.startReader(
                            this.lesson.reader2,
                            "reader2"
                          );
                        }else{
                          this.showBuildSummary();
                        }
                      }
                    );
                  }
                );
              }else{
                this.showTryAgain(
                  () => this.showReaderCheck()
                );
              }
            }
          );

        objects.push(button);
      }
    );

    this.scene.panels.open(
      objects,
      {
        width: 760,
        height: 520
      }
    );
  }

  showBuildSummary(){
    this.setSection("build");

    const build = this.lesson.build;
    const earned =
      this.progress().earnedPieces;

    const title = this.scene.add.text(
      0,
      -205,
      build.title,
      {
        fontSize: "32px",
        fontStyle: "bold",
        color: "#102342"
      }
    ).setOrigin(0.5);

    const summaryLines =
      build.requiredPieces.map(pieceId => {
        const piece = this.findPiece(pieceId);
        const hasIt = earned.includes(pieceId);

        return `${hasIt ? "✅" : "⬜"} ${
          piece ? piece.name : pieceId
        }`;
      });

    const summary = this.scene.add.text(
      0,
      -25,
      summaryLines.join("\n"),
      {
        fontSize: "23px",
        fontStyle: "bold",
        color: "#102342",
        lineSpacing: 9,
        align: "left"
      }
    ).setOrigin(0.5);

    const ready =
      build.requiredPieces.every(
        pieceId => earned.includes(pieceId)
      );

    const button = this.scene.panels.makeButton(
      0,
      205,
      ready
        ? "Build This Section"
        : "Return to Lesson",
      () => {
        if(ready){
          this.completeBuild();
        }else{
          this.showPhonics();
        }
      }
    );

    this.scene.panels.open(
      [title, summary, button],
      {
        width: 760,
        height: 590
      }
    );
  }

  findPiece(pieceId){
    const sources = [
      this.lesson.feelingsActivity,
      this.lesson.story,
      this.lesson.phonics,
      this.lesson.reader1,
      this.lesson.reader2
    ];

    for(const source of sources){
      if(
        source &&
        source.rewardPiece &&
        source.rewardPiece.id === pieceId
      ){
        return source.rewardPiece;
      }
    }

    return null;
  }

  completeBuild(){
    const build = this.lesson.build;

    if(!this.scene.save.academyBuilds){
      this.scene.save.academyBuilds = {};
    }

    this.scene.save.academyBuilds[
      build.areaId
    ] = Math.max(
      this.scene.save.academyBuilds[
        build.areaId
      ] || 0,
      build.stage
    );

    saveGame(this.scene.save);

    const title = this.scene.add.text(
      0,
      -160,
      "Build Complete!",
      {
        fontSize: "38px",
        fontStyle: "bold",
        color: "#2f7d32"
      }
    ).setOrigin(0.5);

    const body = this.scene.add.text(
      0,
      -25,
      build.completionMessage,
      {
        fontSize: "27px",
        fontStyle: "bold",
        color: "#102342",
        align: "center",
        wordWrap: {
          width: 650
        }
      }
    ).setOrigin(0.5);

    const continueButton =
      this.scene.panels.makeButton(
        0,
        170,
        "Celebrate",
        () => this.showClosingSong()
      );

    this.scene.panels.open(
      [title, body, continueButton],
      {
        width: 760,
        height: 470
      }
    );
  }

  showClosingSong(){
    this.setSection("closing-song");

    const closing =
      this.lesson.closingSong;

    const title = this.scene.add.text(
      0,
      -185,
      "Academy Celebration",
      {
        fontSize: "35px",
        fontStyle: "bold",
        color: "#102342"
      }
    ).setOrigin(0.5);

    const icon = this.scene.add.text(
      0,
      -85,
      "🎶 ⭐ 🎶",
      {
        fontSize: "55px"
      }
    ).setOrigin(0.5);

    const body = this.scene.add.text(
      0,
      15,
      closing.rewardMessage,
      {
        fontSize: "25px",
        fontStyle: "bold",
        color: "#102342",
        align: "center",
        wordWrap: {
          width: 650
        }
      }
    ).setOrigin(0.5);

    const play = this.scene.panels.makeButton(
      -155,
      175,
      "Play Theme",
      () => this.playMedia(
        closing.videoPath,
        closing.assetPath
      )
    );

    const finish = this.scene.panels.makeButton(
      155,
      175,
      "Finish Level",
      () => {
        this.stopMedia();
        this.completeLesson();
      }
    );

    this.scene.panels.open(
      [title, icon, body, play, finish],
      {
        width: 780,
        height: 510
      }
    );
  }

  completeLesson(){
    const completion =
      this.lesson.completion;

    this.progress().completed = true;
    this.progress().currentSection =
      "complete";

    this.scene.save.completed[
      this.levelId
    ] = true;

    this.scene.save.xp +=
      completion.xp;

    this.scene.save.stars +=
      completion.stars;

    if(
      completion.unlocks &&
      !this.scene.save.unlockedLevels.includes(
        completion.unlocks
      )
    ){
      this.scene.save.unlockedLevels.push(
        completion.unlocks
      );
    }

    this.scene.save.currentLevel =
      completion.unlocks ||
      this.levelId;

    saveGame(this.scene.save);

    const title = this.scene.add.text(
      0,
      -190,
      `Level ${this.levelId} Complete!`,
      {
        fontSize: "38px",
        fontStyle: "bold",
        color: "#2f7d32"
      }
    ).setOrigin(0.5);

    const stars = this.scene.add.text(
      0,
      -90,
      "⭐",
      {
        fontSize: "72px"
      }
    ).setOrigin(0.5);

    const rewards = this.scene.add.text(
      0,
      5,
      `+${completion.xp} XP\n` +
      `+${completion.stars} Star`,
      {
        fontSize: "28px",
        fontStyle: "bold",
        color: "#102342",
        align: "center",
        lineSpacing: 7
      }
    ).setOrigin(0.5);

    const message = this.scene.add.text(
      0,
      100,
      completion.message,
      {
        fontSize: "22px",
        fontStyle: "bold",
        color: "#174ea6",
        align: "center",
        wordWrap: {
          width: 650
        }
      }
    ).setOrigin(0.5);

    const returnButton =
      this.scene.panels.makeButton(
        0,
        205,
        "Return to Academy",
        () => {
          this.scene.panels.close();
          this.scene.refreshHUD();
        }
      );

    this.scene.panels.open(
      [
        title,
        stars,
        rewards,
        message,
        returnButton
      ],
      {
        width: 780,
        height: 590
      }
    );
  }

  speakText(text){
    if(!("speechSynthesis" in window)){
      return;
    }

    window.speechSynthesis.cancel();

    const utterance =
      new SpeechSynthesisUtterance(text);

    utterance.rate = 0.84;
    utterance.pitch = 1.05;
    utterance.volume = 1;

    window.speechSynthesis.speak(
      utterance
    );
  }

  playMedia(videoPath, audioPath){
    this.stopMedia();

    const useVideo =
      videoPath &&
      videoPath.trim();

    const source =
      useVideo || audioPath;

    if(!source){
      this.scene.panels.message(
        "Song File Needed",
        "The lesson is ready, but the song file has not been added yet."
      );
      return;
    }

    if(useVideo){
      const video =
        document.createElement("video");

      video.src = source;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;

      video.style.position = "fixed";
      video.style.left = "50%";
      video.style.top = "50%";
      video.style.transform =
        "translate(-50%, -50%)";
      video.style.width = "min(900px, 88vw)";
      video.style.maxHeight = "76vh";
      video.style.background = "#000000";
      video.style.border =
        "6px solid #102342";
      video.style.borderRadius = "18px";
      video.style.zIndex = "10000";

      document.body.appendChild(video);

      this.mediaElement = video;

      video.addEventListener(
        "ended",
        () => this.stopMedia()
      );

      video.addEventListener(
        "error",
        () => {
          this.stopMedia();

          if(audioPath){
            this.playMedia(
              "",
              audioPath
            );
          }else{
            this.scene.panels.message(
              "Song File Needed",
              "The lesson is ready, but the video file still needs to be uploaded to GitHub."
            );
          }
        }
      );

      return;
    }

    const audio =
      document.createElement("audio");

    audio.src = source;
    audio.controls = true;
    audio.autoplay = true;

    audio.style.position = "fixed";
    audio.style.left = "50%";
    audio.style.bottom = "25px";
    audio.style.transform =
      "translateX(-50%)";
    audio.style.zIndex = "10000";

    document.body.appendChild(audio);

    this.mediaElement = audio;

    audio.addEventListener(
      "ended",
      () => this.stopMedia()
    );

    audio.addEventListener(
      "error",
      () => {
        this.stopMedia();

        this.scene.panels.message(
          "Song File Needed",
          "The lesson is ready, but the song file still needs to be uploaded to GitHub."
        );
      }
    );
  }

  stopMedia(){
    if("speechSynthesis" in window){
      window.speechSynthesis.cancel();
    }

    if(this.mediaElement){
      try{
        this.mediaElement.pause();
      }catch(error){
        console.warn(
          "Unable to pause media:",
          error
        );
      }

      this.mediaElement.remove();
      this.mediaElement = null;
    }
  }
}
