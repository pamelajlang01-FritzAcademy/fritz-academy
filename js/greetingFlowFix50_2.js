/* Fritz Academy returning-student greeting flow repair v50.2 */
(function(){
  "use strict";
  if(typeof LessonEngine==="undefined") return;
  const original=LessonEngine.prototype.showGreeting;
  LessonEngine.prototype.showGreeting=function(index){
    if(this.levelId==="1-A") return original.call(this,index);
    this.setSection("greeting");
    const name=this.studentName||"Academy Student";
    const lines=[
      `Hello, ${name}! It is good to see you again.`,
      "How are you today?",
      "What have you done since our last class?",
      `Today we are learning ${this.lesson&&this.lesson.title?this.lesson.title:"something new"}. Are you ready?`
    ];
    if(index>=lines.length){
      if(typeof this.showFeelingsActivityIntro==="function") this.showFeelingsActivityIntro();
      else if(this.storyEngine&&typeof this.storyEngine.start==="function") this.storyEngine.start();
      return;
    }
    const speaker=this.scene.add.text(0,-145,"Captain Fritz",{fontSize:"27px",fontStyle:"bold",color:"#174ea6"}).setOrigin(.5);
    const dialogue=this.scene.add.text(0,-20,lines[index],{fontSize:"29px",fontStyle:"bold",color:"#102342",align:"center",wordWrap:{width:650}}).setOrigin(.5);
    const button=this.scene.panels.makeButton(0,165,index===lines.length-1?"Start Lesson":"Next",()=>this.showGreeting(index+1),{fontSize:"24px"});
    this.scene.panels.open([speaker,dialogue,button],{width:800,height:500});
  };
})();
