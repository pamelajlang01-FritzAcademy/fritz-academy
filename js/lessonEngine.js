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
    this.setSection("story");
    this.storyPage = 0;
    this.showStoryPage();
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
      -110,
      `${phonics.letterUpper}   ${phonics.letterLower}`,
      {
        fontSize: "86px",
        fontStyle: "bold",
        color: "#174ea6"
      }
    ).setOrigin(0.5);

    const cue = this.scene.add.text(
      0,
      -20,
      phonics.teacherCue,
      {
        fontSize: "23px",
        fontStyle: "bold",
        color: "#102342",
        align: "center"
      }
    ).setOrigin(0.5);

    const examples = phonics.examples
      .map(example =>
        `${example.icon} ${example.word}`
      )
      .join("      ");

    const examplesText = this.scene.add.text(
      0,
      65,
      examples,
      {
        fontSize: "26px",
        fontStyle: "bold",
        color: "#102342"
      }
    ).setOrigin(0.5);

        const hear = this.scene.panels.makeButton(
      -155,
      185,
      "Hear the Sound",
      () => this.speakText(
        `${phonics.letterUpper}. ${phonics.soundLabel}. ${phonics.examples
          .map(example => example.word)
          .join(". ")}.`
      ),
      {
        backgroundColor: "#ffffff"
      }
    );
    const practice =
      this.scene.panels.makeButton(
        155,
        185,
        "Letter Game",
        () => this.showPhonicsQuestion(0)
      );

    this.scene.panels.open(
      [
        title,
        letters,
        cue,
        examplesText,
        hear,
        practice
      ],
      {
        width: 820,
        height: 540
      }
    );
  }

  showPhonicsQuestion(index){
    const phonics = this.lesson.phonics;

    const questions = [
  phonics.recognitionQuestion,
  phonics.lowercaseQuestion,
  phonics.wordQuestion
].filter(Boolean);

    const question = questions[index];

    if(!question){
      this.rewardPiece(
        phonics.rewardPiece,
       `You learned uppercase ${phonics.letterUpper} and lowercase ${phonics.letterLower}!`,
        () => this.startReader(
          this.lesson.reader1,
          1
        )
      );
      return;
    }

    const title = this.scene.add.text(
      0,
      -165,
      "Find the Letter",
      {
        fontSize: "34px",
        fontStyle: "bold",
        color: "#102342"
      }
    ).setOrigin(0.5);

    const prompt = this.scene.add.text(
      0,
      -75,
      question.prompt,
      {
        fontSize: "27px",
        fontStyle: "bold",
        color: "#102342"
      }
    ).setOrigin(0.5);

    const objects = [title, prompt];
    const xPositions = [-180, 0, 180];

    question.options.forEach(
      (option, optionIndex) => {
        const button =
          this.scene.panels.makeButton(
            xPositions[optionIndex],
            75,
            option,
            () => {
              if(option === question.answer){
                this.showCorrectAnswer(
                  "Correct!",
                  option,
                  () => this.showPhonicsQuestion(
                    index + 1
                  )
                );
              }else{
                this.showTryAgain(
                  () => this.showPhonicsQuestion(
                    index
                  )
                );
              }
            },
            {
              fontSize: "42px",
              padding: {
                x: 30,
                y: 18
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
        height: 450
      }
    );
  }

  startReader(reader, number){
    this.setSection(`reader-${number}`);
    this.activeReader = reader;
    this.activeReaderNumber = number;
    this.readerPage = 0;
    this.showReaderPage();
  }

  showReaderPage(){
    const reader = this.activeReader;

    if(this.readerPage >= reader.pages.length){
      this.showReaderCheck();
      return;
    }

    const pageText =
      this.replaceName(
        reader.pages[this.readerPage]
      );

    const title = this.scene.add.text(
      0,
      -205,
      reader.title,
      {
        fontSize: "28px",
        fontStyle: "bold",
        color: "#102342"
      }
    ).setOrigin(0.5);

    const level = this.scene.add.text(
      0,
      -160,
      `${reader.level} Reader — Page ${this.readerPage + 1}`,
      {
        fontSize: "19px",
        fontStyle: "bold",
        color: "#46566f"
      }
    ).setOrigin(0.5);

    const sentence = this.scene.add.text(
      0,
      -15,
      pageText,
      {
        fontSize: "38px",
        fontStyle: "bold",
        color: "#102342",
        align: "center",
        wordWrap: {
          width: 680
        }
      }
    ).setOrigin(0.5);

    const hear = this.scene.panels.makeButton(
      -155,
      190,
      "Hear It",
      () => this.speakText(pageText),
      {
        backgroundColor: "#ffffff"
      }
    );

    const next = this.scene.panels.makeButton(
      155,
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
        level,
        sentence,
        hear,
        next
      ],
      {
        width: 800,
        height: 520
      }
    );
  }

  showReaderCheck(){
    const reader = this.activeReader;
    const check = reader.check;

    const title = this.scene.add.text(
      0,
      -175,
      "Reader Check",
      {
        fontSize: "33px",
        fontStyle: "bold",
        color: "#102342"
      }
    ).setOrigin(0.5);

    const prompt = this.scene.add.text(
      0,
      -85,
      check.prompt,
      {
        fontSize: "26px",
        fontStyle: "bold",
        color: "#102342"
      }
    ).setOrigin(0.5);

    const objects = [title, prompt];
    const yPositions = [25, 90, 155];

    check.options.forEach(
      (option, optionIndex) => {
        const button =
          this.scene.panels.makeButton(
            0,
            yPositions[optionIndex],
            option,
            () => {
              if(option === check.answer){
                this.rewardPiece(
                  reader.rewardPiece,
                  "Reader complete!",
                  () => {
                    if(this.activeReaderNumber === 1){
                      this.startReader(
                        this.lesson.reader2,
                        2
                      );
                    }else{
                      this.showBuildWorkshop();
                    }
                  }
                );
              }else{
                this.showTryAgain(
                  () => this.showReaderCheck()
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

  showBuildWorkshop(){
    this.setSection("build");

    const required =
      this.lesson.build.requiredPieces;

    const earned =
      this.progress().earnedPieces;

    const pieceMap = {
      flowers: "🌼 Flowers",
      path: "🪨 Path",
      bench: "🪑 Bench",
      tree: "🌳 Tree",
      fence: "🪵 Fence"
    };

    const pieceList = required
      .map(pieceId => {
        const marker = earned.includes(pieceId)
          ? "✅"
          : "⬜";

        return `${marker} ${pieceMap[pieceId]}`;
      })
      .join("\n");

    const title = this.scene.add.text(
      0,
      -210,
      "Build the Welcome Garden",
      {
        fontSize: "33px",
        fontStyle: "bold",
        color: "#102342"
      }
    ).setOrigin(0.5);

    const list = this.scene.add.text(
      -120,
      -35,
      pieceList,
      {
        fontSize: "25px",
        fontStyle: "bold",
        color: "#102342",
        lineSpacing: 12
      }
    ).setOrigin(0.5);

    const directions = this.scene.add.text(
      220,
      -30,
      "You earned every piece.\n\nNow put the garden together!",
      {
        fontSize: "23px",
        fontStyle: "bold",
        color: "#174ea6",
        align: "center",
        wordWrap: {
          width: 290
        }
      }
    ).setOrigin(0.5);

    const build = this.scene.panels.makeButton(
      0,
      205,
      "Build My Garden",
      () => this.completeGarden()
    );

    this.scene.panels.open(
      [
        title,
        list,
        directions,
        build
      ],
      {
        width: 820,
        height: 550
      }
    );
  }

  completeGarden(){
    const save = this.scene.save;

    if(!save.academyBuilds){
      save.academyBuilds = {};
    }

    save.academyBuilds.welcomeGarden = true;
    saveGame(save);

    const title = this.scene.add.text(
      0,
      -185,
      "Welcome Garden Complete!",
      {
        fontSize: "34px",
        fontStyle: "bold",
        color: "#102342"
      }
    ).setOrigin(0.5);

    const garden = this.scene.add.text(
      0,
      -50,
      "🌳   🌼   🪨   🪑   🌼   🪵",
      {
        fontSize: "55px"
      }
    ).setOrigin(0.5);

    const body = this.scene.add.text(
      0,
      70,
      this.lesson.build.completionMessage,
      {
        fontSize: "24px",
        fontStyle: "bold",
        color: "#174ea6",
        align: "center"
      }
    ).setOrigin(0.5);

    const continueButton =
      this.scene.panels.makeButton(
        0,
        180,
        "Mission Debrief",
        () => this.showDebrief()
      );

    this.scene.panels.open(
      [
        title,
        garden,
        body,
        continueButton
      ],
      {
        width: 800,
        height: 520
      }
    );
  }

  showDebrief(){
    this.setSection("debrief");

    const title = this.scene.add.text(
      0,
      -190,
      "Captain Fritz's Mission Debrief",
      {
        fontSize: "31px",
        fontStyle: "bold",
        color: "#102342"
      }
    ).setOrigin(0.5);

    const body = this.scene.add.text(
      0,
      -15,
      `Great work, ${this.studentName}!\n\n` +
      "Today you learned to say hello,\n" +
      "tell someone your name,\n" +
      "talk about your feelings,\n" +
      "and read the letter A.\n\n" +
      "You also built the Welcome Garden!",
      {
        fontSize: "24px",
        fontStyle: "bold",
        color: "#102342",
        align: "center",
        lineSpacing: 8,
        wordWrap: {
          width: 680
        }
      }
    ).setOrigin(0.5);

    const continueButton =
      this.scene.panels.makeButton(
        0,
        205,
        "Hello & Goodbye Song",
        () => this.showClosingSong()
      );

    this.scene.panels.open(
      [
        title,
        body,
        continueButton
      ],
      {
        width: 800,
        height: 550
      }
    );
  }

  showClosingSong(){
    this.setSection("closing-song");

    const song =
      this.lesson.closingSong;

    const title = this.scene.add.text(
      0,
      -185,
      song.title,
      {
        fontSize: "34px",
        fontStyle: "bold",
        color: "#102342"
      }
    ).setOrigin(0.5);

    const icon = this.scene.add.text(
      0,
      -90,
      "🎶",
      {
        fontSize: "72px"
      }
    ).setOrigin(0.5);

    const body = this.scene.add.text(
      0,
      10,
      song.rewardMessage,
      {
        fontSize: "24px",
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
      180,
      "Play Song",
      () => this.playMedia(
        null,
        song.assetPath
      )
    );

    const finish =
      this.scene.panels.makeButton(
        155,
        180,
        "Finish Lesson",
        () => {
          this.stopMedia();
          this.completeLesson();
        }
      );

    this.scene.panels.open(
      [
        title,
        icon,
        body,
        play,
        finish
      ],
      {
        width: 780,
        height: 510
      }
    );
  }

  completeLesson(){
    this.stopMedia();

    const save = this.scene.save;
    const completion = this.lesson.completion;

    if(!this.progress().completed){
      this.progress().completed = true;

      save.completed[this.levelId] = true;
      save.xp += completion.xp;
      save.stars += completion.stars;

      if(
        !save.unlockedLevels.includes(
          completion.unlocks
        )
      ){
        save.unlockedLevels.push(
          completion.unlocks
        );
      }

      save.currentLevel = completion.unlocks;
    }

    saveGame(save);

    if(this.scene.refreshHUD){
      this.scene.refreshHUD();
    }

    const title = this.scene.add.text(
      0,
      -150,
      `Level ${this.levelId} Complete!`,
      {
        fontSize: "37px",
        fontStyle: "bold",
        color: "#102342"
      }
    ).setOrigin(0.5);

    const reward = this.scene.add.text(
      0,
      -45,
      "⭐ +1 Star     XP +25",
      {
        fontSize: "29px",
        fontStyle: "bold",
        color: "#174ea6"
      }
    ).setOrigin(0.5);

    const body = this.scene.add.text(
      0,
      55,
      completion.message,
      {
        fontSize: "24px",
        fontStyle: "bold",
        color: "#102342",
        align: "center"
      }
    ).setOrigin(0.5);

    const returnButton =
      this.scene.panels.makeButton(
        0,
        155,
        "Return to Academy",
        () => {
          this.scene.panels.close();
        }
      );

    this.scene.panels.open(
      [
        title,
        reward,
        body,
        returnButton
      ],
      {
        width: 720,
        height: 440
      }
    );
  }

  speakText(text){
    if("speechSynthesis" in window){
      window.speechSynthesis.cancel();

      const utterance =
        new SpeechSynthesisUtterance(text);

      utterance.lang = "en-US";
      utterance.rate = 0.82;
      utterance.pitch = 1;

      window.speechSynthesis.speak(
        utterance
      );
    }
  }

  playMedia(videoPath, audioPath){
    this.stopMedia();

    if(videoPath){
      const video =
        document.createElement("video");

      video.src = videoPath;
      video.controls = true;
      video.autoplay = true;

      video.style.position = "fixed";
      video.style.left = "50%";
      video.style.top = "50%";
      video.style.transform =
        "translate(-50%, -50%)";
      video.style.width = "min(80vw, 900px)";
      video.style.maxHeight = "78vh";
      video.style.zIndex = "99999";
      video.style.background = "#000";
      video.style.border =
        "6px solid #f6c744";
      video.style.borderRadius = "12px";

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
            this.playAudio(audioPath);
          }else{
            this.scene.panels.message(
              "Media Needed",
              "Upload the completed song file to the matching assets folder."
            );
          }
        }
      );

      return;
    }

    if(audioPath){
      this.playAudio(audioPath);
    }
  }

  playAudio(audioPath){
    const audio =
      document.createElement("audio");

    audio.src = audioPath;
    audio.controls = true;
    audio.autoplay = true;

    audio.style.position = "fixed";
    audio.style.left = "50%";
    audio.style.bottom = "30px";
    audio.style.transform =
      "translateX(-50%)";
    audio.style.width = "min(80vw, 700px)";
    audio.style.zIndex = "99999";

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
