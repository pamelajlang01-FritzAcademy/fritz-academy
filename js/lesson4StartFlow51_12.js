/* Fritz Academy 51.13 — reliable Lesson 4 opening and correctly paced learning checks */
(function(){
  "use strict";
  if(typeof LessonEngine==="undefined") return;

  const originalOpening=LessonEngine.prototype.showMissionOpening;
  const originalShowPhonics=LessonEngine.prototype.showPhonics;
  const originalShowReaderCheck=LessonEngine.prototype.showReaderCheck;
  const originalStartStory=LessonEngine.prototype.startStory;

  function isLesson4(engine){return engine&&engine.levelId==="1-D";}

  LessonEngine.prototype.showMissionOpening=function(){
    if(!isLesson4(this)) return originalOpening.call(this);

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
      /* Begin with the two conversational charts only. */
      this.showGreeting(0);
    },{fontSize:"25px"});
    this.scene.panels.open([title,subtitle,body,begin],{width:780,height:520});
  };

  /* Keep the lesson order locked:
     greeting charts -> story -> story questions/reward -> alphabet song ->
     question-word guide -> Reader 1 -> Reader 1 questions/reward ->
     Reader 2 -> Reader 2 questions/reward -> builder -> closing song. */
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
    objects.push(this.scene.add.text(0,-205,"Learn the meanings. Practice questions come after each story or reader.",{
      fontSize:"20px",fontStyle:"bold",color:"#46566f",align:"center",wordWrap:{width:720}
    }).setOrigin(.5));

    rows.forEach((row,index)=>{
      const x=index%2===0?-205:205;
      const y=-120+Math.floor(index/2)*105;
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

  LessonEngine.prototype.showReaderCheck=function(){
    if(!isLesson4(this)) return originalShowReaderCheck.call(this);

    const reader=this.currentReader;
    const questions=Array.isArray(reader&&reader.questions)&&reader.questions.length
      ? reader.questions
      : [reader&&reader.check].filter(Boolean);

    if(!this._lesson4ReaderCheck||this._lesson4ReaderCheck.key!==this.currentReaderKey){
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

  LessonEngine.prototype.startStory=function(){
    if(isLesson4(this)){
      this.questionIndex=0;
      this.storyPage=0;
      this._lesson4ReaderCheck=null;
    }
    return originalStartStory.call(this);
  };
})();
