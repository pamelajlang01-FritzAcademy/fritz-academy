/* Fritz Academy 51.12 — reliable Lesson 4 opening and greeting-chart start */
(function(){
  "use strict";
  if(typeof LessonEngine==="undefined") return;

  const originalOpening=LessonEngine.prototype.showMissionOpening;

  LessonEngine.prototype.showMissionOpening=function(){
    if(this.levelId!=="1-D"){
      return originalOpening.call(this);
    }

    this.setSection("opening");

    const title=this.scene.add.text(0,-205,`Level ${this.levelId}`,{
      fontSize:"34px",fontStyle:"bold",color:"#102342"
    }).setOrigin(.5);

    const subtitle=this.scene.add.text(0,-145,this.lesson.title,{
      fontSize:"27px",fontStyle:"bold",color:"#174ea6"
    }).setOrigin(.5);

    const body=this.scene.add.text(0,-20,
      "Today we learn six important question words.\n\n"+
      "Who • What • Where\nWhen • Why • How\n\n"+
      "Listen, read, answer, and build.",{
        fontSize:"25px",fontStyle:"bold",color:"#102342",align:"center",lineSpacing:10,wordWrap:{width:650}
      }
    ).setOrigin(.5);

    const begin=this.scene.panels.makeButton(0,190,"Start Lesson",()=>{
      /* Bypass the older greeting chain and open the new chart immediately. */
      if(typeof this.showGreeting==="function"){
        this.showGreeting(3);
      }
    },{fontSize:"25px"});

    this.scene.panels.open([title,subtitle,body,begin],{width:780,height:520});
  };
})();
