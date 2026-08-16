/* Fritz Academy production game-session engine v56.0
   One reusable orchestration layer for all 108 game sessions. */
class LessonEngine {
  constructor(scene){
    this.scene=scene;
    this.lesson=null;
    this.levelId="";
    this.location="Fritz Academy";
    this.studentName="Academy Student";
    this.storyEngine=new StoryEngine(scene,this);
    this.readerEngine=new ReaderEngine(scene,this);
    this.phonicsEngine=new PhonicsEngine(scene,this);
    this.builderEngine=new BuilderEngine(scene,this);
    this.mediaEngine=new MediaEngine(scene,this);
    this.completionEngine=new CompletionEngine(scene,this);
  }

  start(levelId,location="Fritz Academy"){
    const lesson=findLevel(levelId);
    if(!this.isCompleteLesson(lesson)){
      this.scene.panels.message("Adventure Locked","This game session is not production-complete yet.");
      return;
    }
    this.lesson=lesson;
    this.levelId=levelId;
    this.location=location;
    this.studentName=this.scene.save.studentName||"Academy Student";
    this.ensureLessonSave();
    this.showMissionOpening();
  }

  isCompleteLesson(lesson){
    return Boolean(lesson&&lesson.story&&lesson.phonics&&lesson.reader1&&lesson.reader2&&lesson.build&&lesson.completion);
  }

  ensureLessonSave(){
    const save=this.scene.save;
    save.lessonProgress=save.lessonProgress||{};
    save.lessonProgress[this.levelId]=save.lessonProgress[this.levelId]||{currentSection:"opening",earnedPieces:[],feeling:"",completed:false};
    save.unlockedLevels=Array.isArray(save.unlockedLevels)?save.unlockedLevels:["1-A"];
    save.completed=save.completed||{};
    saveGame(save);
  }

  progress(){return this.scene.save.lessonProgress[this.levelId];}
  setSection(section){this.progress().currentSection=section;saveGame(this.scene.save);}
  replaceName(text){return replaceStudentName(text,this.studentName);}
  hasPiece(id){return this.progress().earnedPieces.includes(id);}
  earnPiece(piece){if(piece&&piece.id&&!this.hasPiece(piece.id)){this.progress().earnedPieces.push(piece.id);saveGame(this.scene.save);}}
  stopMedia(){this.mediaEngine.stop();}
  speakText(text){this.mediaEngine.speak(this.replaceName(text));}
  playMedia(video,audio,options={}){this.mediaEngine.play(video,audio,options);}

  showMissionOpening(){
    this.setSection("opening");
    const title=this.scene.add.text(0,-190,`Session ${this.levelId}`,{fontSize:"34px",fontStyle:"bold",color:"#102342"}).setOrigin(.5);
    const subtitle=this.scene.add.text(0,-125,this.lesson.title,{fontSize:"29px",fontStyle:"bold",color:"#174ea6",align:"center",wordWrap:{width:680}}).setOrigin(.5);
    const body=this.scene.add.text(0,-10,this.lesson.mission||"Something is happening at Fritz Academy. Help the puppies solve it and earn new pieces for your Academy.",{fontSize:"24px",fontStyle:"bold",color:"#102342",align:"center",lineSpacing:9,wordWrap:{width:660}}).setOrigin(.5);
    const begin=this.scene.panels.makeButton(0,175,"Enter the Academy",()=>this.showOpeningSong(),{fontSize:"24px"});
    this.scene.panels.open([title,subtitle,body,begin],{width:800,height:520});
  }

  showOpeningSong(){
    this.setSection("welcome-song");
    const song=this.lesson.welcomeSong;
    if(!song){this.showGreeting(0);return;}
    const title=this.scene.add.text(0,-170,"Welcome Back to Fritz Academy",{fontSize:"32px",fontStyle:"bold",color:"#102342"}).setOrigin(.5);
    const body=this.scene.add.text(0,-35,"Start the adventure with the Academy welcome song.",{fontSize:"25px",fontStyle:"bold",color:"#174ea6",align:"center",wordWrap:{width:650}}).setOrigin(.5);
    const play=this.scene.panels.makeButton(-150,150,"Play Welcome Song",()=>this.playMedia(song.videoPath,song.assetPath));
    const next=this.scene.panels.makeButton(150,150,"Start Adventure",()=>{this.stopMedia();this.showGreeting(0);});
    this.scene.panels.open([title,body,play,next],{width:780,height:470});
  }

  showGreeting(index){
    this.setSection("greeting");
    const lines=Array.isArray(this.lesson.intro)?this.lesson.intro:[];
    const line=lines[index];
    if(!line){this.showFeelingsCheck();return;}
    const speaker=this.scene.add.text(0,-155,line.speaker||"Captain Fritz",{fontSize:"25px",fontStyle:"bold",color:"#174ea6"}).setOrigin(.5);
    const text=this.scene.add.text(0,-25,this.replaceName(line.text),{fontSize:"29px",fontStyle:"bold",color:"#102342",align:"center",lineSpacing:8,wordWrap:{width:680}}).setOrigin(.5);
    const objects=[speaker,text];
    if(line.responseType==="feeling"){
      const choices=this.lesson.feelingChoices||[];
      const xs=choices.length===3?[-220,0,220]:choices.map((_,i)=>(i-(choices.length-1)/2)*180);
      choices.forEach((choice,i)=>{
        objects.push(this.scene.add.text(xs[i],70,choice.emoji||"🙂",{fontSize:"46px"}).setOrigin(.5));
        objects.push(this.scene.panels.makeButton(xs[i],145,choice.label,()=>{this.progress().feeling=choice.id;saveGame(this.scene.save);this.showGreeting(index+1);},{fontSize:"18px",padding:{x:12,y:8}}));
      });
    }else{
      const hear=this.scene.panels.makeButton(-145,165,"Hear It",()=>this.speakText(line.text),{backgroundColor:"#ffffff"});
      const next=this.scene.panels.makeButton(145,165,line.responseType?"I Said It":"Next",()=>this.showGreeting(index+1));
      objects.push(hear,next);
    }
    this.scene.panels.open(objects,{width:820,height:510});
  }

  showFeelingsCheck(){
    const activity=this.lesson.feelingsActivity;
    if(!activity){this.showLanguageGame();return;}
    this.setSection("feelings");
    new QuestionEngine(this.scene,this).start({title:activity.title||"Feelings Check",questions:activity.questions||[],successMessage:"Yes!",retryMessage:"Look at the face and try again.",onComplete:()=>{
      if(activity.rewardPiece){this.rewardPiece(activity.rewardPiece,"You checked in with the Academy team!",()=>this.showLanguageGame());}
      else this.showLanguageGame();
    }});
  }

  showLanguageGame(){
    const game=this.lesson.languageGame;
    if(!game||!Array.isArray(game.questions)||!game.questions.length){this.startStory();return;}
    this.setSection("language-game");
    new QuestionEngine(this.scene,this).start({title:game.title||"Academy Talk Challenge",questions:game.questions,successMessage:"That works!",retryMessage:"Listen to the sentence and try again.",onComplete:()=>this.startStory()});
  }

  startStory(){this.storyEngine.start(this.lesson,()=>this.showAlphabetSong());}

  showAlphabetSong(){
    this.setSection("alphabet-song");
    const song=this.lesson.alphabetSong;
    if(!song){this.startPhonics();return;}
    const title=this.scene.add.text(0,-175,"Alphabet Music Challenge",{fontSize:"32px",fontStyle:"bold",color:"#102342"}).setOrigin(.5);
    const body=this.scene.add.text(0,-35,song.rewardMessage||"Sing, point, and listen for today’s letters.",{fontSize:"25px",fontStyle:"bold",color:"#174ea6",align:"center",wordWrap:{width:650}}).setOrigin(.5);
    const play=this.scene.panels.makeButton(-145,155,"Play Alphabet Song",()=>this.playMedia(song.videoPath,song.assetPath));
    const next=this.scene.panels.makeButton(145,155,"Letter Game",()=>{this.stopMedia();this.startPhonics();});
    this.scene.panels.open([title,body,play,next],{width:780,height:470});
  }

  startPhonics(){
    this.phonicsEngine.start(this.lesson,()=>this.readerEngine.start(this.lesson,"reader1",()=>this.readerEngine.start(this.lesson,"reader2",()=>this.startBuilder())));
  }

  startBuilder(){this.builderEngine.start(this.lesson,()=>this.completeLesson());}

  rewardPiece(piece,message,callback){
    this.earnPiece(piece);
    const title=this.scene.add.text(0,-155,"Academy Piece Earned!",{fontSize:"33px",fontStyle:"bold",color:"#102342"}).setOrigin(.5);
    const icon=this.scene.add.text(0,-55,piece.icon||"⭐",{fontSize:"68px"}).setOrigin(.5);
    const name=this.scene.add.text(0,35,piece.name||"Academy Piece",{fontSize:"28px",fontStyle:"bold",color:"#174ea6"}).setOrigin(.5);
    const body=this.scene.add.text(0,90,message,{fontSize:"20px",fontStyle:"bold",color:"#102342",align:"center",wordWrap:{width:620}}).setOrigin(.5);
    const next=this.scene.panels.makeButton(0,180,"Put It in My Builder Pack",callback);
    this.scene.panels.open([title,icon,name,body,next],{width:760,height:510});
  }

  showCorrectAnswer(titleText,answer,callback){
    const title=this.scene.add.text(0,-80,titleText,{fontSize:"36px",fontStyle:"bold",color:"#2f7d32"}).setOrigin(.5);
    const body=this.scene.add.text(0,5,String(answer),{fontSize:"25px",fontStyle:"bold",color:"#102342",align:"center",wordWrap:{width:600}}).setOrigin(.5);
    const next=this.scene.panels.makeButton(0,115,"Next",callback);
    this.scene.panels.open([title,body,next],{width:650,height:350});
  }

  showTryAgain(callback,message="Look closely and try again."){
    const title=this.scene.add.text(0,-70,"Try Again",{fontSize:"34px",fontStyle:"bold",color:"#b5462d"}).setOrigin(.5);
    const body=this.scene.add.text(0,10,message,{fontSize:"23px",fontStyle:"bold",color:"#102342",align:"center",wordWrap:{width:580}}).setOrigin(.5);
    const again=this.scene.panels.makeButton(0,115,"Try Again",callback);
    this.scene.panels.open([title,body,again],{width:640,height:340});
  }

  completeLesson(){this.completionEngine.complete(this.lesson);}
}
window.LessonEngine=LessonEngine;