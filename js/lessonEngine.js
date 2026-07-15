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
    this.activeReader = null;
    this.activeReaderNumber = 0;
    this.selectedBuildPiece = null;
    this.buildObjects = [];
  }

  start(levelId, location = "Fritz Academy", options = {}){
    const lesson = findLevel(levelId);

    if(!lesson || !lesson.story || !lesson.reader1 || !lesson.reader2){
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

    this.scene.save.reviewMode = Boolean(options.reviewMode);
    this.ensureLessonSave();

    const checkpoint = options.restart
      ? "opening"
      : this.progress().currentSection || "opening";

    if(options.restart){
      this.progress().currentSection = "opening";
      saveGame(this.scene.save);
    }

       this.preloadLessonImages(() => {
      this.resumeFromCheckpoint(checkpoint);
    });

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
        weeklyActivity: "",
        completed: false
      };
    }

    if(!save.unlockedLevels){
      save.unlockedLevels = ["1-A"];
    }

    if(!save.academyBuilds){
      save.academyBuilds = {};
    }

    if(!save.placedBuilds){
      save.placedBuilds = {};
    }

    save.currentLevel = this.levelId;
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
    this.scene.save.currentCheckpoint = section;
    this.scene.save.currentLevel = this.levelId;
    saveGame(this.scene.save);
  }

  resumeFromCheckpoint(section){
    const routes = {
      opening: () => this.showMissionOpening(),
      greeting: () => this.showGreeting(0),
      conversation: () => this.showConversationActivityIntro(),
      story: () => this.startStory(),
      "alphabet-song": () => this.showAlphabetSong(),
      phonics: () => this.showPhonics(),
      "reader-1": () => this.startReader(this.lesson.reader1, 1),
      "reader-2": () => this.startReader(this.lesson.reader2, 2),
      build: () => this.showBuildWorkshop(),
      debrief: () => this.showDebrief(),
      "closing-song": () => this.showClosingSong(),
      complete: () => this.showCompletionScreen()
    };

    const route = routes[section] || routes.opening;
    route();
  }

  isReviewMode(){
    return Boolean(this.scene.save.reviewMode);
  }

  hasPiece(pieceId){
    return this.progress().earnedPieces.includes(pieceId);
  }

  earnPiece(piece){
    if(this.isReviewMode()){
      return;
    }

    if(!this.hasPiece(piece.id)){
      this.progress().earnedPieces.push(piece.id);
    }

    if(!this.scene.save.collected){
      this.scene.save.collected = {};
    }

    this.scene.save.collected[piece.id] = {
      ...piece,
      earnedIn: this.levelId
    };

    saveGame(this.scene.save);
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

    const reviewLabel = this.isReviewMode()
      ? "\n\nREVIEW MODE — no duplicate rewards will be added."
      : "";

    const body = this.scene.add.text(
      0,
      -15,
      "Captain Fritz has a new mission.\n\n" +
      "Complete each English challenge.\n" +
      "Earn five build pieces.\n" +
      "Add them to your Academy." +
      reviewLabel,
      {
        fontSize: "24px",
        fontStyle: "bold",
        color: "#102342",
        align: "center",
        lineSpacing: 9,
        wordWrap: {
          width: 660
        }
      }
    ).setOrigin(0.5);

    const begin = this.scene.panels.makeButton(
      0,
      205,
      "Begin Adventure",
      () => this.showGreeting(0),
      {
        fontSize: "25px"
      }
    );

    this.scene.panels.open(
      [title, subtitle, body, begin],
      {
        width: 800,
        height: 560
      }
    );
  }

  showGreeting(index){
    this.setSection("greeting");

    const conversation = Array.isArray(this.lesson.intro)
      ? this.lesson.intro
      : [];

    const line = conversation[index];

    if(!line){
      this.showConversationActivityIntro();
      return;
    }

    const speaker = this.scene.add.text(
      0,
      -170,
      line.speaker || "Captain Fritz",
      {
        fontSize: "27px",
        fontStyle: "bold",
        color: "#174ea6"
      }
    ).setOrigin(0.5);

    const dialogue = this.scene.add.text(
      0,
      -50,
      this.replaceName(line.text || ""),
      {
        fontSize: "29px",
        fontStyle: "bold",
        color: "#102342",
        align: "center",
        wordWrap: {
          width: 670
        }
      }
    ).setOrigin(0.5);

    const objects = [speaker, dialogue];
    const responseType = line.responseType;

    if(responseType === "name"){
      const answer = this.scene.add.text(
        0,
        60,
        `My name is ${this.studentName}.`,
        {
          fontSize: "25px",
          fontStyle: "bold",
          color: "#102342",
          backgroundColor: "#ffffff",
          padding: { x: 22, y: 12 }
        }
      ).setOrigin(0.5);

      const sayIt = this.scene.panels.makeButton(
        0,
        165,
        "I Said It",
        () => this.showGreeting(index + 1)
      );

      objects.push(answer, sayIt);
    }else if(responseType === "spelling"){
      const spelling =
        this.scene.save.studentSpelling ||
        this.studentName.toUpperCase().split("").join("-");

      const answer = this.scene.add.text(
        0,
        60,
        spelling,
        {
          fontSize: "31px",
          fontStyle: "bold",
          color: "#102342",
          backgroundColor: "#ffffff",
          padding: { x: 22, y: 12 }
        }
      ).setOrigin(0.5);

      const continueButton = this.scene.panels.makeButton(
        0,
        165,
        "Continue",
        () => this.showGreeting(index + 1)
      );

      objects.push(answer, continueButton);
    }else if(responseType === "feeling"){
      const choices = this.lesson.feelingChoices || [];
      const xPositions = this.choicePositions(choices.length, 220);

      choices.forEach((choice, choiceIndex) => {
        const x = xPositions[choiceIndex];

        const emoji = this.scene.add.text(
          x,
          45,
          choice.emoji,
          { fontSize: "48px" }
        ).setOrigin(0.5);

        const button = this.scene.panels.makeButton(
          x,
          135,
          choice.label,
          () => {
            this.progress().feeling = choice.id;
            saveGame(this.scene.save);
            this.showFeelingResponse(choice, index + 1);
          },
          {
            fontSize: "19px",
            padding: { x: 14, y: 9 }
          }
        );

        objects.push(emoji, button);
      });
    }else if(responseType === "weekly-activity"){
      const choices =
        this.lesson.conversationActivity?.responseChoices ||
        [];

      const xPositions = this.choicePositions(choices.length, 180);

      choices.forEach((choice, choiceIndex) => {
        const x = xPositions[choiceIndex];

        const emoji = this.scene.add.text(
          x,
          35,
          choice.emoji,
          { fontSize: "44px" }
        ).setOrigin(0.5);

        const button = this.scene.panels.makeButton(
          x,
          130,
          choice.label,
          () => {
            this.progress().weeklyActivity = choice.id;
            saveGame(this.scene.save);
            this.showSpokenResponse(choice.label, () => {
              this.showGreeting(index + 1);
            });
          },
          {
            fontSize: "17px",
            padding: { x: 11, y: 8 }
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
        width: 850,
        height: 520
      }
    );
  }

  choicePositions(count, spacing){
    if(count <= 1){
      return [0];
    }  preloadLessonImages(callback){
    const imagePaths = [];

    const addPages = pages => {
      (pages || []).forEach(page => {
        if(
          typeof page === "object" &&
          page.image &&
          !imagePaths.includes(page.image)
        ){
          imagePaths.push(page.image);
        }
      });
    };

    addPages(this.lesson.story?.pages);
    addPages(this.lesson.reader1?.pages);
    addPages(this.lesson.reader2?.pages);

    const missingImages = imagePaths.filter(
      path => !this.scene.textures.exists(path)
    );

    if(missingImages.length === 0){
      callback();
      return;
    }

    missingImages.forEach(path => {
      this.scene.load.image(path, path);
    });

    this.scene.load.once(
      Phaser.Loader.Events.COMPLETE,
      callback
    );

    this.scene.load.start();
  }

    const total = spacing * (count - 1);
    const start = -total / 2;

    return Array.from(
      { length: count },
      (_, index) => start + index * spacing
    );
  }  showFeelingResponse(choice, nextIndex){
    const title = this.scene.add.text(
      0,
      -130,
      "Great Job!",
      {
        fontSize: "34px",
        fontStyle: "bold",
        color: "#1b5e20"
      }
    ).setOrigin(0.5);

    const body = this.scene.add.text(
      0,
      -10,
      `You said:\n\n${choice.label}`,
      {
        fontSize: "28px",
        align: "center",
        color: "#102342"
      }
    ).setOrigin(0.5);

    const next = this.scene.panels.makeButton(
      0,
      170,
      "Continue",
      ()=>this.showGreeting(nextIndex)
    );

    this.scene.panels.open(
      [title, body, next],
      {
        width:700,
        height:420
      }
    );
  }

  showSpokenResponse(text, callback){
    const title = this.scene.add.text(
      0,
      -120,
      "Excellent Speaking!",
      {
        fontSize:"34px",
        fontStyle:"bold",
        color:"#1b5e20"
      }
    ).setOrigin(0.5);

    const body = this.scene.add.text(
      0,
      -10,
      text,
      {
        fontSize:"28px",
        color:"#102342",
        align:"center",
        wordWrap:{width:600}
      }
    ).setOrigin(0.5);

    const next=this.scene.panels.makeButton(
      0,
      170,
      "Continue",
      callback
    );

    this.scene.panels.open(
      [title,body,next],
      {
        width:700,
        height:420
      }
    );
  }

  showConversationActivityIntro(){

    this.setSection("conversation");

    const activity =
      this.lesson.conversationActivity ||
      this.lesson.feelingsActivity;

    const title=this.scene.add.text(
      0,
      -170,
      activity.title,
      {
        fontSize:"32px",
        fontStyle:"bold",
        color:"#174ea6"
      }
    ).setOrigin(0.5);

    const instructions=this.scene.add.text(
      0,
      -80,
      activity.instructions,
      {
        fontSize:"24px",
        color:"#102342",
        align:"center",
        wordWrap:{width:640}
      }
    ).setOrigin(0.5);

    const begin=this.scene.panels.makeButton(
      0,
      170,
      "Start Activity",
      ()=>{
        this.questionIndex=0;
        this.correctAnswers=0;
        this.showConversationQuestion();
      }
    );

    this.scene.panels.open(
      [title,instructions,begin],
      {
        width:760,
        height:500
      }
    );
  }

  showConversationQuestion(){

    const activity =
      this.lesson.conversationActivity ||
      this.lesson.feelingsActivity;

    const questions=activity.questions;

    if(this.questionIndex>=questions.length){

      this.earnPiece(activity.rewardPiece);

      this.showReward(
        activity.rewardPiece,
        ()=>this.startStory()
      );

      return;
    }

    const question=questions[this.questionIndex];

    const title=this.scene.add.text(
      0,
      -170,
      `Question ${this.questionIndex+1}`,
      {
        fontSize:"30px",
        fontStyle:"bold",
        color:"#174ea6"
      }
    ).setOrigin(0.5);

    const picture=this.scene.add.text(
      0,
      -90,
      question.picture || question.emoji || "",
      {
        fontSize:"58px"
      }
    ).setOrigin(0.5);

    const prompt=this.scene.add.text(
      0,
      -20,
      question.prompt,
      {
        fontSize:"24px",
        color:"#102342",
        align:"center",
        wordWrap:{width:620}
      }
    ).setOrigin(0.5);

    const objects=[title,picture,prompt];

    question.options.forEach((option,index)=>{

      const button=this.scene.panels.makeButton(
        0,
        70+(index*70),
        option,
        ()=>{

          if(option===question.answer){
            this.correctAnswers++;
          }

          this.questionIndex++;

          this.showConversationQuestion();

        },
        {
          width:420
        }
      );

      objects.push(button);

    });

    this.scene.panels.open(
      objects,
      {
        width:760,
        height:560
      }
    );
  }

  startStory(){

    this.setSection("story");

    this.storyPage=0;

    this.showStoryPage();

  }

  showStoryPage(){

    const pages=this.lesson.story.pages;

    if(this.storyPage>=pages.length){

      this.showStoryQuestions();

      return;

    }

    const page=pages[this.storyPage];

    const title=this.scene.add.text(
      0,
      -190,
      this.lesson.story.title,
      {
        fontSize:"30px",
        fontStyle:"bold",
        color:"#174ea6"
      }
    ).setOrigin(0.5);

       const imageObjects = [];

    if(
      page.image &&
      this.scene.textures.exists(page.image)
    ){
      const image = this.scene.add.image(
        0,
        -25,
        page.image
      );

      const scale = Math.min(
        470 / image.width,
        245 / image.height
      );

      image.setScale(scale);
      imageObjects.push(image);
    }else{
      const imageFrame = this.scene.add.rectangle(
        0,
        -25,
        470,
        245,
        0xe8f5e9,
        1
      ).setStrokeStyle(4, 0x174ea6);

      const imageLabel = this.scene.add.text(
        0,
        -25,
        "Illustration file not found",
        {
          fontSize: "21px",
          fontStyle: "bold",
          color: "#174ea6"
        }
      ).setOrigin(0.5);

      imageObjects.push(imageFrame, imageLabel);
    }
    const text=this.scene.add.text(
      0,
      160,
      this.replaceName(page.text),
      {
        fontSize:"26px",
        align:"center",
        wordWrap:{width:650},
        color:"#102342"
      }
    ).setOrigin(0.5);

    const next=this.scene.panels.makeButton(
      0,
      250,
      this.storyPage===pages.length-1
        ? "Questions"
        : "Next Page",
      ()=>{

        this.storyPage++;

        this.showStoryPage();

      }
    );

    this.scene.panels.open(
  [
    title,
    ...imageObjects,
    text,
    next
  ],
  {
    width: 820,
    height: 650
  }
);
  }  showStoryQuestions(){

    this.questionIndex = 0;

    this.showStoryQuestion();
  }

  showStoryQuestion(){

    const story = this.lesson.story;
    const questions = story.questions || [];

    if(this.questionIndex >= questions.length){

      this.earnPiece(story.rewardPiece);

      this.showReward(
        story.rewardPiece,
        () => this.showAlphabetSong()
      );

      return;
    }

    const question = questions[this.questionIndex];

    const title = this.scene.add.text(
      0,
      -180,
      "Story Challenge",
      {
        fontSize: "32px",
        fontStyle: "bold",
        color: "#174ea6"
      }
    ).setOrigin(0.5);

    const progress = this.scene.add.text(
      0,
      -130,
      `Question ${this.questionIndex + 1} of ${questions.length}`,
      {
        fontSize: "18px",
        fontStyle: "bold",
        color: "#5b677a"
      }
    ).setOrigin(0.5);

    const prompt = this.scene.add.text(
      0,
      -60,
      question.prompt,
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

    const objects = [
      title,
      progress,
      prompt
    ];

    const yPositions = [35, 105, 175];

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
              fontSize: "21px",
              padding: {
                x: 22,
                y: 9
              }
            }
          );

        objects.push(button);
      }
    );

    this.scene.panels.open(
      objects,
      {
        width: 790,
        height: 550
      }
    );
  }

  showCorrectAnswer(
    titleText,
    answer,
    callback
  ){

    const title = this.scene.add.text(
      0,
      -95,
      titleText,
      {
        fontSize: "38px",
        fontStyle: "bold",
        color: "#2f7d32"
      }
    ).setOrigin(0.5);

    const body = this.scene.add.text(
      0,
      5,
      answer,
      {
        fontSize: "28px",
        fontStyle: "bold",
        color: "#102342",
        align: "center",
        wordWrap: {
          width: 560
        }
      }
    ).setOrigin(0.5);

    const next =
      this.scene.panels.makeButton(
        0,
        115,
        "Continue",
        callback
      );

    this.scene.panels.open(
      [
        title,
        body,
        next
      ],
      {
        width: 650,
        height: 350
      }
    );
  }

  showTryAgain(callback){

    const title = this.scene.add.text(
      0,
      -75,
      "Try Again",
      {
        fontSize: "36px",
        fontStyle: "bold",
        color: "#b5462d"
      }
    ).setOrigin(0.5);

    const body = this.scene.add.text(
      0,
      10,
      "Look carefully and choose again.",
      {
        fontSize: "24px",
        fontStyle: "bold",
        color: "#102342",
        align: "center"
      }
    ).setOrigin(0.5);

    const tryButton =
      this.scene.panels.makeButton(
        0,
        110,
        "Try Again",
        callback
      );

    this.scene.panels.open(
      [
        title,
        body,
        tryButton
      ],
      {
        width: 640,
        height: 330
      }
    );
  }

  showReward(piece, callback){

    const reviewMode =
      this.isReviewMode();

    const title = this.scene.add.text(
      0,
      -175,
      reviewMode
        ? "Challenge Complete!"
        : "Build Piece Earned!",
      {
        fontSize: "34px",
        fontStyle: "bold",
        color: "#102342"
      }
    ).setOrigin(0.5);

    const icon = this.scene.add.text(
      0,
      -75,
      piece?.icon || "⭐",
      {
        fontSize: "74px"
      }
    ).setOrigin(0.5);

    const name = this.scene.add.text(
      0,
      20,
      piece?.name || "Academy Piece",
      {
        fontSize: "29px",
        fontStyle: "bold",
        color: "#174ea6"
      }
    ).setOrigin(0.5);

    const message = reviewMode
      ? "Review Mode does not add a duplicate piece."
      : "This piece has been added to your Builder Pack.";

    const body = this.scene.add.text(
      0,
      85,
      message,
      {
        fontSize: "21px",
        fontStyle: "bold",
        color: "#102342",
        align: "center",
        wordWrap: {
          width: 620
        }
      }
    ).setOrigin(0.5);

    const continueButton =
      this.scene.panels.makeButton(
        0,
        175,
        reviewMode
          ? "Continue Review"
          : "Add to Builder Pack",
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
        width: 750,
        height: 520
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
      song?.title ||
        "Fritz Academy Alphabet Song",
      {
        fontSize: "34px",
        fontStyle: "bold",
        color: "#102342"
      }
    ).setOrigin(0.5);

    const icon = this.scene.add.text(
      0,
      -95,
      "🎵",
      {
        fontSize: "72px"
      }
    ).setOrigin(0.5);

    const body = this.scene.add.text(
      0,
      5,
      (
        song?.rewardMessage ||
        "The Academy Music Box is ready!"
      ) +
      "\n\nSing the alphabet with the Academy cast.",
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

    const play =
      this.scene.panels.makeButton(
        -160,
        180,
        "Play Song",
        () => this.playMedia(
          song?.videoPath,
          song?.assetPath
        )
      );

    const continueButton =
      this.scene.panels.makeButton(
        160,
        180,
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
        width: 800,
        height: 530
      }
    );
  }

  showPhonics(){

    this.stopMedia();

    this.setSection("phonics");

    const phonics =
      this.lesson.phonics;

    const title = this.scene.add.text(
      0,
      -215,
      "Phonics Workshop",
      {
        fontSize: "33px",
        fontStyle: "bold",
        color: "#102342"
      }
    ).setOrigin(0.5);

    const letters = this.scene.add.text(
      0,
      -125,
      `${phonics.letterUpper}   ${phonics.letterLower}`,
      {
        fontSize: "84px",
        fontStyle: "bold",
        color: "#174ea6"
      }
    ).setOrigin(0.5);

    const sound = this.scene.add.text(
      0,
      -48,
      phonics.soundLabel || "",
      {
        fontSize: "24px",
        fontStyle: "bold",
        color: "#b5462d"
      }
    ).setOrigin(0.5);

    const cue = this.scene.add.text(
      0,
      5,
      phonics.teacherCue,
      {
        fontSize: "22px",
        fontStyle: "bold",
        color: "#102342",
        align: "center",
        wordWrap: {
          width: 670
        }
      }
    ).setOrigin(0.5);

    const examples = phonics.examples
      .map(
        example =>
          `${example.icon} ${example.word}`
      )
      .join("        ");

    const exampleText = this.scene.add.text(
      0,
      78,
      examples,
      {
        fontSize: "25px",
        fontStyle: "bold",
        color: "#102342",
        align: "center"
      }
    ).setOrigin(0.5);

    const hear =
      this.scene.panels.makeButton(
        -165,
        195,
        "Hear the Sound",
        () => {

          const exampleWords =
            phonics.examples
              .map(example => example.word)
              .join(". ");

          this.speakText(
            `${phonics.letterUpper}. ` +
            `${phonics.soundLabel}. ` +
            `${exampleWords}.`
          );
        },
        {
          backgroundColor: "#ffffff"
        }
      );

    const practice =
      this.scene.panels.makeButton(
        165,
        195,
        "Start Letter Game",
        () => this.showPhonicsQuestion(0)
      );

    this.scene.panels.open(
      [
        title,
        letters,
        sound,
        cue,
        exampleText,
        hear,
        practice
      ],
      {
        width: 850,
        height: 560
      }
    );
  }

  showPhonicsQuestion(index){

    const phonics =
      this.lesson.phonics;

    const questions = [
      phonics.recognitionQuestion,
      phonics.lowercaseQuestion,
      phonics.wordQuestion
    ].filter(Boolean);

    const question =
      questions[index];

    if(!question){

      this.earnPiece(
        phonics.rewardPiece
      );

      this.showReward(
        phonics.rewardPiece,
        () => this.startReader(
          this.lesson.reader1,
          1
        )
      );

      return;
    }

    const title = this.scene.add.text(
      0,
      -175,
      index < 2
        ? "Find the Letter"
        : "Find the Sound",
      {
        fontSize: "33px",
        fontStyle: "bold",
        color: "#174ea6"
      }
    ).setOrigin(0.5);

    const prompt = this.scene.add.text(
      0,
      -80,
      question.prompt,
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

    const objects = [
      title,
      prompt
    ];

    const xPositions =
      this.choicePositions(
        question.options.length,
        210
      );

    question.options.forEach(
      (option, optionIndex) => {

        const button =
          this.scene.panels.makeButton(
            xPositions[optionIndex],
            80,
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
              fontSize:
                index < 2
                  ? "39px"
                  : "22px",
              padding: {
                x: 26,
                y: 16
              }
            }
          );

        objects.push(button);
      }
    );

    this.scene.panels.open(
      objects,
      {
        width: 810,
        height: 470
      }
    );
  }

  startReader(reader, number){

    this.setSection(
      `reader-${number}`
    );

    this.activeReader = reader;
    this.activeReaderNumber = number;
    this.readerPage = 0;

    this.showReaderPage();
  }

  showReaderPage(){

    const reader =
      this.activeReader;

    if(
      this.readerPage >=
      reader.pages.length
    ){

      this.showReaderCheck();

      return;
    }

    const page =
      reader.pages[this.readerPage];

    const pageText =
      typeof page === "string"
        ? this.replaceName(page)
        : this.replaceName(
            page.text || ""
          );

    const title = this.scene.add.text(
      0,
      -210,
      reader.title,
      {
        fontSize: "29px",
        fontStyle: "bold",
        color: "#102342"
      }
    ).setOrigin(0.5);

    const level = this.scene.add.text(
      0,
      -165,
      `${reader.level} Reader — Page ${this.readerPage + 1} of ${reader.pages.length}`,
      {
        fontSize: "18px",
        fontStyle: "bold",
        color: "#5b677a"
      }
    ).setOrigin(0.5);

    const imagePath =
      typeof page === "object"
        ? page.image
        : "";

        const illustrationObjects = [];

    if(
      imagePath &&
      this.scene.textures.exists(imagePath)
    ){
      const illustration = this.scene.add.image(
        0,
        -40,
        imagePath
      );

      const scale = Math.min(
        500 / illustration.width,
        205 / illustration.height
      );

      illustration.setScale(scale);
      illustrationObjects.push(illustration);
    }else{
      const imageFrame = this.scene.add.rectangle(
        0,
        -40,
        500,
        205,
        0xe8f5e9,
        1
      ).setStrokeStyle(4, 0x174ea6);

      const imageLabel = this.scene.add.text(
        0,
        -40,
        "Illustration file not found",
        {
          fontSize: "21px",
          fontStyle: "bold",
          color: "#174ea6"
        }
      ).setOrigin(0.5);

      illustrationObjects.push(
        imageFrame,
        imageLabel
      );
    }

    const imageLabel =
      this.scene.add.text(
        0,
        -40,
        imagePath
          ? "Reader Illustration"
          : "Fritz Academy Story Scene",
        {
          fontSize: "22px",
          fontStyle: "bold",
          color: "#174ea6",
          align: "center"
        }
      )
      .setOrigin(0.5);

    const sentence =
      this.scene.add.text(
        0,
        105,
        pageText,
        {
          fontSize: "31px",
          fontStyle: "bold",
          color: "#102342",
          align: "center",
          lineSpacing: 8,
          wordWrap: {
            width: 680
          }
        }
      )
      .setOrigin(0.5);

    const hear =
      this.scene.panels.makeButton(
        -165,
        220,
        "Hear It",
        () => this.speakText(
          pageText
        ),
        {
          backgroundColor: "#ffffff"
        }
      );

    const next =
      this.scene.panels.makeButton(
        165,
        220,
        this.readerPage ===
          reader.pages.length - 1
          ? "Reader Challenge"
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
        imageFrame,
        imageLabel,
        sentence,
        hear,
        next
      ],
      {
        width: 850,
        height: 620
      }
    );
  }  showReaderCheck(){

    const reader = this.activeReader;
    const check = reader.check;

    const title = this.scene.add.text(
      0,
      -180,
      `${reader.title} Challenge`,
      {
        fontSize: "31px",
        fontStyle: "bold",
        color: "#174ea6"
      }
    ).setOrigin(0.5);

    const prompt = this.scene.add.text(
      0,
      -85,
      check.prompt,
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

    const objects = [
      title,
      prompt
    ];

    const yPositions = [
      25,
      95,
      165
    ];

    check.options.forEach(
      (option, optionIndex) => {

        const button =
          this.scene.panels.makeButton(
            0,
            yPositions[optionIndex],
            option,
            () => {

              if(option === check.answer){

                this.earnPiece(
                  reader.rewardPiece
                );

                this.showCorrectAnswer(
                  "Correct!",
                  option,
                  () => {

                    this.showReward(
                      reader.rewardPiece,
                      () => {

                        if(
                          this.activeReaderNumber === 1
                        ){

                          this.startReader(
                            this.lesson.reader2,
                            2
                          );

                        }else{

                          this.showBuildWorkshop();
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
            },
            {
              fontSize: "21px",
              padding: {
                x: 22,
                y: 9
              }
            }
          );

        objects.push(button);
      }
    );

    this.scene.panels.open(
      objects,
      {
        width: 790,
        height: 550
      }
    );
  }

  getAllEarnedPieces(){

    const allPieces = [];

    Object.values(
      this.scene.save.lessonProgress || {}
    ).forEach(progress => {

      if(
        Array.isArray(
          progress.earnedPieces
        )
      ){

        progress.earnedPieces.forEach(
          pieceId => {

            if(
              !allPieces.includes(pieceId)
            ){

              allPieces.push(pieceId);
            }
          }
        );
      }
    });

    return allPieces;
  }

  getPieceDefinition(pieceId){

    const collected =
      this.scene.save.collected || {};

    if(collected[pieceId]){

      return collected[pieceId];
    }

    const lessonPieces = [
      this.lesson.conversationActivity
        ?.rewardPiece,
      this.lesson.feelingsActivity
        ?.rewardPiece,
      this.lesson.story
        ?.rewardPiece,
      this.lesson.phonics
        ?.rewardPiece,
      this.lesson.reader1
        ?.rewardPiece,
      this.lesson.reader2
        ?.rewardPiece
    ].filter(Boolean);

    return (
      lessonPieces.find(
        piece => piece.id === pieceId
      ) || {
        id: pieceId,
        name: pieceId,
        icon: "⭐"
      }
    );
  }

  ensureBuildArea(){

    const save =
      this.scene.save;

    const areaId =
      this.lesson.build?.areaId ||
      this.lesson.buildArea ||
      "welcome-garden";

    if(!save.placedBuilds){

      save.placedBuilds = {};
    }

    if(!save.placedBuilds[areaId]){

      save.placedBuilds[areaId] = {};
    }

    return {
      areaId,
      placed:
        save.placedBuilds[areaId]
    };
  }

  showBuildWorkshop(){

    this.setSection("build");

    const build =
      this.lesson.build;

    const required =
      build.requiredPieces || [];

    const earned =
      this.progress().earnedPieces || [];

    const title =
      this.scene.add.text(
        0,
        -220,
        build.title ||
          "Build Your Academy",
        {
          fontSize: "32px",
          fontStyle: "bold",
          color: "#102342"
        }
      )
      .setOrigin(0.5);

    const directions =
      this.scene.add.text(
        0,
        -170,
        "Choose a piece from the Builder Pack.\nThen click inside the garden to place it.",
        {
          fontSize: "21px",
          fontStyle: "bold",
          color: "#174ea6",
          align: "center",
          wordWrap: {
            width: 690
          }
        }
      )
      .setOrigin(0.5);

    const packBackground =
      this.scene.add.rectangle(
        -265,
        25,
        245,
        355,
        0xf5ead3,
        1
      )
      .setStrokeStyle(
        4,
        0x102342
      );

    const gardenBackground =
      this.scene.add.rectangle(
        145,
        25,
        525,
        355,
        0x88c96b,
        1
      )
      .setStrokeStyle(
        5,
        0x102342
      )
      .setInteractive({
        useHandCursor: true
      });

    const sky =
      this.scene.add.rectangle(
        145,
        -80,
        515,
        135,
        0x9edcff,
        1
      );

    const grassLabel =
      this.scene.add.text(
        145,
        -125,
        "Nick's Welcome Garden",
        {
          fontSize: "23px",
          fontStyle: "bold",
          color: "#102342"
        }
      )
      .setOrigin(0.5);

    const packTitle =
      this.scene.add.text(
        -265,
        -125,
        "Builder Pack",
        {
          fontSize: "24px",
          fontStyle: "bold",
          color: "#102342"
        }
      )
      .setOrigin(0.5);

    const objects = [
      title,
      directions,
      packBackground,
      gardenBackground,
      sky,
      grassLabel,
      packTitle
    ];

    this.buildObjects = [];

    const buildState =
      this.ensureBuildArea();

    const allEarnedPieces =
      this.getAllEarnedPieces();

    const availablePieces =
      required.filter(
        pieceId =>
          earned.includes(pieceId) ||
          allEarnedPieces.includes(pieceId)
      );

    availablePieces.forEach(
      (pieceId, index) => {

        const piece =
          this.getPieceDefinition(
            pieceId
          );

        const y =
          -70 + index * 58;

        const button =
          this.scene.panels.makeButton(
            -265,
            y,
            `${piece.icon} ${piece.name}`,
            () => {

              this.selectedBuildPiece =
                pieceId;

              this.showBuildSelectionMessage(
                piece
              );
            },
            {
              fontSize: "16px",
              padding: {
                x: 10,
                y: 7
              },
              backgroundColor:
                buildState.placed[pieceId]
                  ? "#d7f0d2"
                  : "#ffffff"
            }
          );

        objects.push(button);
      }
    );

    Object.entries(
      buildState.placed
    ).forEach(
      ([pieceId, position]) => {

        const piece =
          this.getPieceDefinition(
            pieceId
          );

        const placedIcon =
          this.scene.add.text(
            position.x,
            position.y,
            piece.icon,
            {
              fontSize: "52px"
            }
          )
          .setOrigin(0.5)
          .setInteractive({
            useHandCursor: true
          });

        placedIcon.on(
          "pointerdown",
          () => {

            if(this.isReviewMode()){

              return;
            }

            this.selectedBuildPiece =
              pieceId;

            delete buildState.placed[
              pieceId
            ];

            saveGame(
              this.scene.save
            );

            this.showBuildWorkshop();
          }
        );

        this.buildObjects.push(
          placedIcon
        );

        objects.push(
          placedIcon
        );
      }
    );

    gardenBackground.on(
      "pointerdown",
      pointer => {

        if(this.isReviewMode()){

          return;
        }

        if(!this.selectedBuildPiece){

          this.scene.panels.message(
            "Choose a Piece",
            "Select an item from the Builder Pack first."
          );

          return;
        }

        const localX =
          Phaser.Math.Clamp(
            pointer.worldX - 640,
            -95,
            385
          );

        const localY =
          Phaser.Math.Clamp(
            pointer.worldY - 360,
            -40,
            165
          );

        buildState.placed[
          this.selectedBuildPiece
        ] = {
          x: localX,
          y: localY
        };

        this.selectedBuildPiece =
          null;

        saveGame(
          this.scene.save
        );

        this.showBuildWorkshop();
      }
    );

    const placedCount =
      required.filter(
        pieceId =>
          Boolean(
            buildState.placed[
              pieceId
            ]
          )
      ).length;

    const counter =
      this.scene.add.text(
        145,
        175,
        `${placedCount} of ${required.length} lesson pieces placed`,
        {
          fontSize: "19px",
          fontStyle: "bold",
          color: "#102342"
        }
      )
      .setOrigin(0.5);

    objects.push(counter);

    const finishButton =
      this.scene.panels.makeButton(
        145,
        225,
        this.isReviewMode()
          ? "Finish Review"
          : "Save My Garden",
        () => {

          if(
            !this.isReviewMode() &&
            placedCount <
              required.length
          ){

            this.scene.panels.message(
              "Keep Building",
              "Place all five lesson pieces before finishing."
            );

            return;
          }

          this.completeGarden();
        }
      );

    objects.push(finishButton);

    this.scene.panels.open(
      objects,
      {
        width: 940,
        height: 650
      }
    );
  }

  showBuildSelectionMessage(piece){

    const title =
      this.scene.add.text(
        0,
        -70,
        piece.icon,
        {
          fontSize: "65px"
        }
      )
      .setOrigin(0.5);

    const body =
      this.scene.add.text(
        0,
        20,
        `${piece.name}\n\nNow click inside the garden to place it.`,
        {
          fontSize: "24px",
          fontStyle: "bold",
          color: "#102342",
          align: "center",
          wordWrap: {
            width: 560
          }
        }
      )
      .setOrigin(0.5);

    const close =
      this.scene.panels.makeButton(
        0,
        125,
        "Place It",
        () => {

          this.scene.panels.close();

          this.showBuildWorkshop();
        }
      );

    this.scene.panels.open(
      [
        title,
        body,
        close
      ],
      {
        width: 650,
        height: 370
      }
    );
  }

  completeGarden(){

    const save =
      this.scene.save;

    const areaId =
      this.lesson.build?.areaId ||
      "welcome-garden";

    if(!save.academyBuilds){

      save.academyBuilds = {};
    }

    if(!save.academyBuilds[areaId]){

      save.academyBuilds[areaId] = {
        completedStages: []
      };
    }

    const stage =
      this.lesson.build?.stage ||
      this.lesson.buildStage ||
      1;

    if(
      !save.academyBuilds[
        areaId
      ].completedStages.includes(
        stage
      )
    ){

      save.academyBuilds[
        areaId
      ].completedStages.push(
        stage
      );
    }

    saveGame(save);

    const title =
      this.scene.add.text(
        0,
        -165,
        "Garden Progress Saved!",
        {
          fontSize: "35px",
          fontStyle: "bold",
          color: "#102342"
        }
      )
      .setOrigin(0.5);

    const garden =
      this.scene.add.text(
        0,
        -55,
        "🌳  🌼  🪨  🪑  🌷  🏮  🐦",
        {
          fontSize: "52px"
        }
      )
      .setOrigin(0.5);

    const body =
      this.scene.add.text(
        0,
        65,
        this.lesson.build
          ?.completionMessage ||
          "Your Academy build has been saved.",
        {
          fontSize: "23px",
          fontStyle: "bold",
          color: "#174ea6",
          align: "center",
          wordWrap: {
            width: 650
          }
        }
      )
      .setOrigin(0.5);

    const next =
      this.scene.panels.makeButton(
        0,
        170,
        "Mission Debrief",
        () => this.showDebrief()
      );

    this.scene.panels.open(
      [
        title,
        garden,
        body,
        next
      ],
      {
        width: 790,
        height: 500
      }
    );
  }  showDebrief(){

    this.setSection("debrief");

    const phonics =
      this.lesson.phonics;

    const title =
      this.scene.add.text(
        0,
        -195,
        "Captain Fritz's Mission Debrief",
        {
          fontSize: "31px",
          fontStyle: "bold",
          color: "#102342"
        }
      )
      .setOrigin(0.5);

    const buildTitle =
      this.lesson.build?.title ||
      "your Academy build";

    const body =
      this.scene.add.text(
        0,
        -15,
        `Great work, ${this.studentName}!\n\n` +
        "Today you practiced speaking and listening,\n" +
        "answered questions about the story,\n" +
        `worked with the letter ${phonics?.letterUpper || ""},\n` +
        "and read two different Academy stories.\n\n" +
        `You also added five pieces to ${buildTitle}.`,
        {
          fontSize: "23px",
          fontStyle: "bold",
          color: "#102342",
          align: "center",
          lineSpacing: 8,
          wordWrap: {
            width: 690
          }
        }
      )
      .setOrigin(0.5);

    const continueButton =
      this.scene.panels.makeButton(
        0,
        210,
        "Academy Closing",
        () => this.showClosingSong()
      );

    this.scene.panels.open(
      [
        title,
        body,
        continueButton
      ],
      {
        width: 820,
        height: 570
      }
    );
  }

  showClosingSong(){

    this.setSection("closing-song");

    const song =
      this.lesson.closingSong;

    const title =
      this.scene.add.text(
        0,
        -185,
        song?.title ||
          "Fritz Academy Theme",
        {
          fontSize: "34px",
          fontStyle: "bold",
          color: "#102342"
        }
      )
      .setOrigin(0.5);

    const icon =
      this.scene.add.text(
        0,
        -90,
        "🎶",
        {
          fontSize: "72px"
        }
      )
      .setOrigin(0.5);

    const body =
      this.scene.add.text(
        0,
        10,
        song?.rewardMessage ||
          "Your Academy progress has been saved.",
        {
          fontSize: "24px",
          fontStyle: "bold",
          color: "#102342",
          align: "center",
          wordWrap: {
            width: 650
          }
        }
      )
      .setOrigin(0.5);

    const play =
      this.scene.panels.makeButton(
        -165,
        180,
        "Play Theme",
        () => this.playMedia(
          song?.videoPath || null,
          song?.assetPath || null
        )
      );

    const finish =
      this.scene.panels.makeButton(
        165,
        180,
        this.isReviewMode()
          ? "Finish Review"
          : "Finish Lesson",
        () => {

          this.stopMedia();

          if(this.isReviewMode()){

            this.finishReview();

          }else{

            this.completeLesson();
          }
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
        width: 800,
        height: 520
      }
    );
  }

  completeLesson(){

    this.stopMedia();

    const save =
      this.scene.save;

    const completion =
      this.lesson.completion || {};

    const progress =
      this.progress();

    if(!progress.completed){

      progress.completed = true;

      if(!save.completed){

        save.completed = {};
      }

      save.completed[
        this.levelId
      ] = true;

      save.xp =
        (Number(save.xp) || 0) +
        (Number(completion.xp) || 0);

      save.stars =
        (Number(save.stars) || 0) +
        (Number(completion.stars) || 0);

      if(!save.unlockedLevels){

        save.unlockedLevels = [
          "1-A"
        ];
      }

      if(
        completion.unlocks &&
        !save.unlockedLevels.includes(
          completion.unlocks
        )
      ){

        save.unlockedLevels.push(
          completion.unlocks
        );
      }

      if(completion.unlocks){

        save.currentLevel =
          completion.unlocks;
      }

      save.currentCheckpoint =
        "opening";
    }

    progress.currentSection =
      "complete";

    save.reviewMode = false;

    this.scene.save =
      saveGame(save);

    if(this.scene.refreshHUD){

      this.scene.refreshHUD();
    }

    this.showCompletionScreen();
  }

  showCompletionScreen(){

    this.setSection("complete");

    const completion =
      this.lesson.completion || {};

    const title =
      this.scene.add.text(
        0,
        -165,
        `Level ${this.levelId} Complete!`,
        {
          fontSize: "37px",
          fontStyle: "bold",
          color: "#102342"
        }
      )
      .setOrigin(0.5);

    const reward =
      this.scene.add.text(
        0,
        -60,
        `⭐ +${completion.stars || 0} Star     XP +${completion.xp || 0}`,
        {
          fontSize: "28px",
          fontStyle: "bold",
          color: "#174ea6"
        }
      )
      .setOrigin(0.5);

    const body =
      this.scene.add.text(
        0,
        50,
        completion.message ||
          "Your lesson and Academy progress have been saved.",
        {
          fontSize: "24px",
          fontStyle: "bold",
          color: "#102342",
          align: "center",
          wordWrap: {
            width: 650
          }
        }
      )
      .setOrigin(0.5);

    const returnButton =
      this.scene.panels.makeButton(
        0,
        165,
        "Return to Academy",
        () => {

          this.scene.panels.close();

          if(this.scene.refreshHUD){

            this.scene.refreshHUD();
          }
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
        width: 750,
        height: 460
      }
    );
  }

  finishReview(){

    this.stopMedia();

    this.scene.save.reviewMode =
      false;

    saveGame(
      this.scene.save
    );

    const title =
      this.scene.add.text(
        0,
        -105,
        "Review Complete",
        {
          fontSize: "36px",
          fontStyle: "bold",
          color: "#102342"
        }
      )
      .setOrigin(0.5);

    const body =
      this.scene.add.text(
        0,
        5,
        "You reviewed this lesson.\n\nNo duplicate rewards or build pieces were added.",
        {
          fontSize: "24px",
          fontStyle: "bold",
          color: "#174ea6",
          align: "center",
          wordWrap: {
            width: 610
          }
        }
      )
      .setOrigin(0.5);

    const returnButton =
      this.scene.panels.makeButton(
        0,
        130,
        "Return to Academy",
        () => {

          this.scene.panels.close();
        }
      );

    this.scene.panels.open(
      [
        title,
        body,
        returnButton
      ],
      {
        width: 690,
        height: 390
      }
    );
  }

  speakText(text){

    if(
      !("speechSynthesis" in window)
    ){

      return;
    }

    window.speechSynthesis.cancel();

    const utterance =
      new SpeechSynthesisUtterance(
        String(text || "")
      );

    utterance.lang =
      "en-US";

    utterance.rate =
      0.82;

    utterance.pitch =
      1;

    window.speechSynthesis.speak(
      utterance
    );
  }

  playMedia(
    videoPath,
    audioPath
  ){

    this.stopMedia();

    if(videoPath){

      const video =
        document.createElement(
          "video"
        );

      video.src =
        videoPath;

      video.controls =
        true;

      video.autoplay =
        true;

      video.playsInline =
        true;

      video.style.position =
        "fixed";

      video.style.left =
        "50%";

      video.style.top =
        "50%";

      video.style.transform =
        "translate(-50%, -50%)";

      video.style.width =
        "min(86vw, 960px)";

      video.style.maxHeight =
        "80vh";

      video.style.zIndex =
        "99999";

      video.style.background =
        "#000000";

      video.style.border =
        "6px solid #f6c744";

      video.style.borderRadius =
        "14px";

      document.body.appendChild(
        video
      );

      this.mediaElement =
        video;

      video.addEventListener(
        "ended",
        () => this.stopMedia()
      );

      video.addEventListener(
        "error",
        () => {

          this.stopMedia();

          if(audioPath){

            this.playAudio(
              audioPath
            );

          }else{

            this.scene.panels.message(
              "Media File Needed",
              "Upload the matching video or audio file to the Fritz Academy assets folder."
            );
          }
        }
      );

      return;
    }

    if(audioPath){

      this.playAudio(
        audioPath
      );

      return;
    }

    this.scene.panels.message(
      "Media File Needed",
      "The lesson is ready, but this song file has not been uploaded yet."
    );
  }

  playAudio(audioPath){

    const audio =
      document.createElement(
        "audio"
      );

    audio.src =
      audioPath;

    audio.controls =
      true;

    audio.autoplay =
      true;

    audio.style.position =
      "fixed";

    audio.style.left =
      "50%";

    audio.style.bottom =
      "30px";

    audio.style.transform =
      "translateX(-50%)";

    audio.style.width =
      "min(82vw, 720px)";

    audio.style.zIndex =
      "99999";

    audio.style.background =
      "#ffffff";

    audio.style.border =
      "4px solid #f6c744";

    audio.style.borderRadius =
      "12px";

    document.body.appendChild(
      audio
    );

    this.mediaElement =
      audio;

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
          "Upload the completed song file to the matching assets folder."
        );
      }
    );
  }

  stopMedia(){

    if(
      "speechSynthesis" in window
    ){

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

      this.mediaElement =
        null;
    }
  }
}
