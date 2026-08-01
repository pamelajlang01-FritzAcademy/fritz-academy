/* Fritz Academy 51.13 — restore Lesson 4 instructional sequence */
(function(){
  "use strict";
  if(typeof LessonEngine==="undefined") return;

  const originalShowPhonics=LessonEngine.prototype.showPhonics;
  const originalShowReaderCheck=LessonEngine.prototype.showReaderCheck;

  function isLesson4(engine){return engine&&engine.levelId==="1-D";}

  /* Lesson 4 does not use a front-loaded phonics quiz. After the alphabet song,
     show one teaching guide, then move into Reader 1. */
  LessonEngine.prototype.showPhonics=function(){
    if(!isLesson4(this)) return originalShowPhonics.call(this);
    this.stopMedia();
    this.setSection("question-word-guide");

    const rows=[
      ["WHO","a person","Who is Captain Fritz?"],
      ["WHAT","a thing","What is in the box?"],
      ["WHERE","a place","Where is the library?"],
      ["WHEN","a time or day","When do we read?"],
      ["WHY","what made it happen","Why is the door locked?"],
      ["HOW","the way we do something","How do we open it?"]
    ];

    const objects=[];
    objects.push(this.scene.add.text(0,-245,"Question Word Guide",{
      fontSize:"34px",fontStyle:"bold",color:"#102342"
    }).setOrigin(.5));
    objects.push(this.scene.add.text(0,-205,"Learn the meaning first. The questions come after each story or reader.",{
      fontSize:"20px",fontStyle:"bold",color:"#46566f",align:"center",wordWrap:{width:720}
    }).setOrigin(.5));

    rows.forEach((row,index)=>{
      const column=index%2;
      const line=Math.floor(index/2);
      const x=column===0?-205:205;
      const y=-120+line*105;
      objects.push(this.scene.add.rectangle(x,y,360,88,0xffffff).setStrokeStyle(4,0x174ea6));
      objects.push(this.scene.add.text(x-150,y-24,row[0],{
        fontSize:"25px",fontStyle:"bold",color:"#174ea6"
      }).setOrigin(0,.5));
      objects.push(this.scene.add.text(x-45,y-24,row[1],{
        fontSize:"19px",fontStyle:"bold",color:"#102342"
      }).setOrigin(0,.5));
      objects.push(this.scene.add.text(x,y+18,row[2],{
        fontSize:"17px",fontStyle:"bold",color:"#46566f",align:"center",wordWrap:{width:325}
      }).setOrigin(.5));
    });

    objects.push(this.scene.panels.makeButton(0,225,"Start Reader 1",()=>{
      this.questionIndex=0;
      this.startReader(this.lesson.reader1,"reader1");
    }));

    this.scene.panels.open(objects,{width:860,height:650});
  };

  /* Use the full question set for each reader, immediately after that reader.
     Reward the Builder piece only after those questions are completed. */
  LessonEngine.prototype.showReaderCheck=function(){
    if(!isLesson4(this)) return originalShowReaderCheck.call(this);
    const reader=this.currentReader;
    const questions=Array.isArray(reader&&reader.questions)&&reader.questions.length
      ? reader.questions
      : [reader&&reader.check].filter(Boolean);

    if(!this._lesson4ReaderCheck || this._lesson4ReaderCheck.key!==this.currentReaderKey){
      this._lesson4ReaderCheck={key:this.currentReaderKey,index:0};
    }
    const state=this._lesson4ReaderCheck;
    const question=questions[state.index];

    if(!question){
      this._lesson4ReaderCheck=null;
      this.rewardPiece(reader.rewardPiece,"You answered the reader questions!",()=>{
        if(this.currentReaderKey==="reader1"){
          this.startReader(this.lesson.reader2,"reader2");
        }else{
          this.showBuildSummary();
        }
      });
      return;
    }

    const objects=[];
    objects.push(this.scene.add.text(0,-190,`${reader.title} — Question ${state.index+1} of ${questions.length}`,{
      fontSize:"27px",fontStyle:"bold",color:"#102342",align:"center",wordWrap:{width:690}
    }).setOrigin(.5));
    objects.push(this.scene.add.text(0,-85,question.prompt,{
      fontSize:"26px",fontStyle:"bold",color:"#102342",align:"center",wordWrap:{width:650}
    }).setOrigin(.5));

    const y=[35,100,165];
    question.options.forEach((option,index)=>{
      objects.push(this.scene.panels.makeButton(0,y[index],String(option),()=>{
        if(option===question.answer){
          state.index++;
          this.showCorrectAnswer("Correct!",String(option),()=>this.showReaderCheck());
        }else{
          this.showTryAgain(()=>this.showReaderCheck());
        }
      },{fontSize:"21px"}));
    });
    this.scene.panels.open(objects,{width:780,height:540});
  };

  /* Reset section-specific counters so an earlier question set cannot spill into
     the next section when a lesson is restarted. */
  const originalStartStory=LessonEngine.prototype.startStory;
  LessonEngine.prototype.startStory=function(){
    if(isLesson4(this)){
      this.questionIndex=0;
      this.storyPage=0;
      this._lesson4ReaderCheck=null;
    }
    return originalStartStory.call(this);
  };
})();
