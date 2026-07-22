/*
====================================================
FRITZ ACADEMY
Modular Lesson Bridge
Version 42.2.0
====================================================
*/

const FritzLegacyLessonEngine = LessonEngine;

LessonEngine = class LessonEngine extends FritzLegacyLessonEngine {
  constructor(scene){
    super(scene);
    this.readerEngine = new ReaderEngine(scene, this);
    this.builderEngine = new BuilderEngine(scene, this);
    this.phonicsEngine = new PhonicsEngine(scene, this);
    this.mediaEngine = new MediaEngine(scene, this);
    this.completionEngine = new CompletionEngine(scene, this);
  }

  start(levelId, location = "Fritz Academy"){
    const lesson = findLevel(levelId);
    const strictLessons = ["1-C", "1-D", "1-E"];

    if(
      strictLessons.includes(levelId) &&
      typeof LessonValidator !== "undefined"
    ){
      const result = LessonValidator.validate(lesson);

      if(!result.valid){
        console.error(
          `Fritz Academy lesson ${levelId} failed validation:`,
          result.errors
        );

        this.scene.panels.message(
          "Lesson Check Required",
          `Level ${levelId} cannot start because its learning content is incomplete.\n\n${result.errors.slice(0, 4).join("\n")}`
        );
        return;
      }
    }

    super.start(levelId, location);
  }

  startReader(reader, readerKey){
    this.readerEngine.start(this.lesson, readerKey, () => {
      if(readerKey === "reader1"){
        this.startReader(this.lesson.reader2, "reader2");
        return;
      }
      this.showBuildSummary();
    });
  }

  showBuildSummary(){
    this.builderEngine.start(
      this.lesson,
      () => this.showClosingSong()
    );
  }

  showAlphabetSong(){
    this.setSection("alphabet-song");

    if(!this.lesson.alphabetSong){
      this.showPhonics();
      return;
    }

    this.mediaEngine.showLessonMedia({
      heading: "Music Box Unlocked!",
      icon: "🎵",
      media: this.lesson.alphabetSong,
      playLabel: "Play Song",
      continueLabel: "Continue",
      message: "Sing the alphabet with Captain Fritz.",
      onComplete: () => this.showPhonics()
    });
  }

  showPhonics(){
    this.phonicsEngine.start(this.lesson, () => {
      this.startReader(this.lesson.reader1, "reader1");
    });
  }

  showClosingSong(){
    this.setSection("closing-song");

    if(!this.lesson.closingSong){
      this.completeLesson();
      return;
    }

    this.mediaEngine.showLessonMedia({
      heading: "Academy Celebration",
      icon: "🎶 ⭐ 🎶",
      media: this.lesson.closingSong,
      playLabel: "Play Theme",
      continueLabel: "Finish Level",
      onComplete: () => this.completeLesson()
    });
  }

  completeLesson(){
    this.completionEngine.complete(this.lesson);
  }

  playMedia(videoPath, audioPath){
    this.mediaEngine.play(videoPath, audioPath);
  }

  stopMedia(){
    if(this.mediaEngine){
      this.mediaEngine.stop();
    }
  }

  speakText(text){
    if(this.mediaEngine){
      this.mediaEngine.speak(text);
    }
  }
};
