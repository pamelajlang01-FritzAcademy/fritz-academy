/* Emergency classroom launcher for Nick's sixth lesson */
(function(){
  "use strict";
  const TARGET="2-B";
  function unlock(){
    try{
      const save=typeof getSave==="function"?getSave():null;
      if(!save)return;
      save.unlockedLevels=Array.isArray(save.unlockedLevels)?save.unlockedLevels:[];
      ["1-A","1-B","1-C","1-D","2-A",TARGET].forEach(id=>{if(!save.unlockedLevels.includes(id))save.unlockedLevels.push(id);});
      save.currentLevel=TARGET;
      if(typeof saveGame==="function")saveGame(save);
    }catch(e){console.error("Nick lesson unlock failed",e);}
  }
  unlock();
  if(typeof LessonEngine!=="undefined"){
    const oldStart=LessonEngine.prototype.start;
    LessonEngine.prototype.start=function(levelId,location){
      if(levelId===TARGET){
        unlock();
        const lesson=typeof findLevel==="function"?findLevel(TARGET):null;
        if(!lesson){this.scene.panels.message("Lesson unavailable","Lesson 2-B could not be loaded.");return;}
        this.lesson=lesson;this.levelId=TARGET;this.location=location||"Adventure Log";
        this.studentName=(this.scene.save&&this.scene.save.studentName)||"Academy Student";
        this.ensureLessonSave();
        this.showMissionOpening();
        return;
      }
      return oldStart.call(this,levelId,location);
    };
    const oldGreeting=LessonEngine.prototype.showGreeting;
    LessonEngine.prototype.showGreeting=function(index){
      if(this.levelId!==TARGET)return oldGreeting.call(this,index);
      this.setSection("greeting");
      const name=this.studentName||"Academy Student";
      const lines=[`Hello, ${name}! It is great to see you again.`,"How are you today?","What have you done since our last class?","Today we will count flowers from one to ten. Are you ready?"];
      if(index>=lines.length){
        try{ if(this.storyEngine&&typeof this.storyEngine.start==="function") this.storyEngine.start(this.lesson,()=>this.showAlphabetSong()); else this.showAlphabetSong(); }
        catch(e){console.error(e);this.showAlphabetSong();}
        return;
      }
      const s=this.scene.add.text(0,-145,"Captain Fritz",{fontSize:"27px",fontStyle:"bold",color:"#174ea6"}).setOrigin(.5);
      const d=this.scene.add.text(0,-20,lines[index],{fontSize:"29px",fontStyle:"bold",color:"#102342",align:"center",wordWrap:{width:650}}).setOrigin(.5);
      const b=this.scene.panels.makeButton(0,165,index===3?"Start Lesson":"Next",()=>this.showGreeting(index+1),{fontSize:"24px"});
      this.scene.panels.open([s,d,b],{width:800,height:500});
    };
  }
  window.addEventListener("DOMContentLoaded",()=>{
    unlock();
    const btn=document.createElement("button");btn.textContent="Start Nick's Lesson 6";
    Object.assign(btn.style,{position:"fixed",left:"12px",top:"12px",zIndex:"100001",padding:"12px 16px",border:"0",borderRadius:"12px",background:"#f6c744",color:"#102342",fontWeight:"700",cursor:"pointer"});
    btn.onclick=()=>{unlock();const game=window.game||null;const scene=game&&game.scene&&game.scene.getScene?game.scene.getScene("World"):null;if(scene&&scene.startLevel)scene.startLevel(TARGET,"Nick's Lesson");else location.reload();};
    document.body.appendChild(btn);
  });
})();