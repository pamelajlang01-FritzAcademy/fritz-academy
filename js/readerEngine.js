/*
====================================================
FRITZ ACADEMY
Reader Engine
Version 51.6.0
====================================================
*/

class ReaderEngine {
  constructor(scene, lessonEngine){
    this.scene = scene;
    this.lessonEngine = lessonEngine;
    this.questionEngine = new QuestionEngine(scene, lessonEngine);
    this.lesson = null;
    this.reader = null;
    this.readerKey = "";
    this.pageIndex = 0;
    this.onComplete = null;
  }

  start(lesson, readerKey, onComplete){
    this.lesson = lesson;
    this.readerKey = readerKey;
    this.reader = lesson && lesson[readerKey];
    this.pageIndex = 0;
    this.onComplete = onComplete;

    if(!this.reader || !Array.isArray(this.reader.pages) || this.reader.pages.length === 0){
      this.scene.panels.message("Reader Missing","This lesson does not contain a complete reader.");
      return;
    }

    this.lessonEngine.stopMedia();
    this.lessonEngine.setSection(readerKey);
    this.showPage();
  }

  normalizePage(page){
    if(typeof page === "string") return { text: page, image: "" };
    return {
      text: page && page.text ? page.text : "",
      image: page && page.image ? page.image : ""
    };
  }

  showPage(){
    if(this.pageIndex >= this.reader.pages.length){
      this.startCheck();
      return;
    }

    const page = this.normalizePage(this.reader.pages[this.pageIndex]);
    const objects = [];

    const title = this.scene.add.text(
      0,-220,
      `${this.reader.title} — Page ${this.pageIndex + 1} of ${this.reader.pages.length}`,
      {fontSize:"20px",fontStyle:"bold",color:"#46566f",align:"center",wordWrap:{width:700}}
    ).setOrigin(0.5);
    objects.push(title);

    if(this.reader.level){
      objects.push(this.scene.add.text(
        0,-180,this.reader.level,
        {fontSize:"19px",fontStyle:"bold",color:"#174ea6"}
      ).setOrigin(0.5));
    }

    const render = imageKey => {
      let textY=-10, fontSize="32px", textWidth=680;

      if(imageKey){
        const image=this.scene.add.image(0,-80,imageKey).setOrigin(0.5);
        image.setScale(Math.min(560/image.width,220/image.height,1));
        objects.push(image);
        textY=90;fontSize="25px";textWidth=700;
      }

      objects.push(this.scene.add.text(
        0,textY,this.lessonEngine.replaceName(page.text),
        {fontSize,fontStyle:"bold",color:"#102342",align:"center",lineSpacing:8,wordWrap:{width:textWidth}}
      ).setOrigin(0.5));

      const readButton=this.scene.panels.makeButton(
        -150,210,"Read Aloud",
        ()=>this.lessonEngine.speakText(this.lessonEngine.replaceName(page.text)),
        {backgroundColor:"#ffffff"}
      );

      const nextButton=this.scene.panels.makeButton(
        150,210,
        this.pageIndex===this.reader.pages.length-1?"Reader Check":"Next Page",
        ()=>{this.lessonEngine.stopMedia();this.pageIndex++;this.showPage();}
      );

      objects.push(readButton,nextButton);
      this.scene.panels.open(objects,{width:820,height:585});
    };

    if(!page.image){render(null);return;}

    const imageKey=`reader-${this.lesson.id}-${this.readerKey}-${this.pageIndex}`;
    if(this.scene.textures.exists(imageKey)){render(imageKey);return;}

    const isSvg=/\.svg(?:\?|$)/i.test(page.image);
    const fileType=isSvg?"svg":"image";
    const completeEvent=`filecomplete-${fileType}-${imageKey}`;

    const onLoadError=file=>{
      if(file&&file.key===imageKey){
        this.scene.load.off(completeEvent,onLoadComplete);
        render(null);
      }
    };
    const onLoadComplete=()=>{
      this.scene.load.off("loaderror",onLoadError);
      render(imageKey);
    };

    this.scene.load.once(completeEvent,onLoadComplete);
    this.scene.load.once("loaderror",onLoadError);
    if(isSvg){
      this.scene.load.svg(imageKey,page.image,{width:960,height:540});
    }else{
      this.scene.load.image(imageKey,page.image);
    }
    this.scene.load.start();
  }

  startCheck(){
    const questions=Array.isArray(this.reader.questions)
      ? this.reader.questions
      : (this.reader.check ? [this.reader.check] : []);

    if(!questions.length){this.finishReader();return;}

    this.questionEngine.start({
      title:"Reader Check",
      questions,
      successMessage:"Correct!",
      retryMessage:"Look back at the reader and try again.",
      onComplete:()=>this.finishReader()
    });
  }

  finishReader(){
    const finish=()=>{
      const callback=this.onComplete;
      this.onComplete=null;
      if(typeof callback==="function") callback();
    };

    if(this.reader.rewardPiece){
      this.lessonEngine.rewardPiece(this.reader.rewardPiece,"You completed this reader!",finish);
      return;
    }
    finish();
  }
}

window.ReaderEngine=ReaderEngine;
