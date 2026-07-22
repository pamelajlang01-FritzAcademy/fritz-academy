/*
====================================================
FRITZ ACADEMY
Modular Lesson Bridge
Version 42.0.0
====================================================

This bridge keeps the existing Lesson Engine operational
while routing migrated sections through the new modular
engines. It can be removed after LessonEngine is fully slimmed.
*/

const FritzLegacyLessonEngine = LessonEngine;

LessonEngine = class LessonEngine extends FritzLegacyLessonEngine {
  constructor(scene){
    super(scene);

    this.readerEngine = new ReaderEngine(
      scene,
      this
    );

    this.builderEngine = new BuilderEngine(
      scene,
      this
    );
  }

  startReader(reader, readerKey){
    this.readerEngine.start(
      this.lesson,
      readerKey,
      () => {
        if(readerKey === "reader1"){
          this.startReader(
            this.lesson.reader2,
            "reader2"
          );
          return;
        }

        this.showBuildSummary();
      }
    );
  }

  showBuildSummary(){
    this.builderEngine.start(
      this.lesson,
      () => this.showClosingSong()
    );
  }
};
