/* Fritz Academy classroom-ready safeguards v50.1 */
(function(){
  "use strict";

  const courseOrder=["1-A","1-B","1-C","1-D","2-A","2-B","2-C","2-D","3-A","3-B","3-C","3-D"];
  const displayPosition=id=>{
    const i=courseOrder.indexOf(id);
    if(i<0) return null;
    return {courseLesson:i+1,week:Math.floor(i/3)+1,lesson:(i%3)+1};
  };

  function normalizeGreetings(){
    if(!Array.isArray(window.LEVELS)) return;
    window.LEVELS.forEach(level=>{
      const pos=displayPosition(level&&level.id);
      if(!level||!pos) return;
      level.courseLesson=pos.courseLesson;
      level.displayWeek=pos.week;
      level.displayLesson=pos.lesson;
      level.studentFacingLabel=`Week ${pos.week} — Lesson ${pos.lesson}`;
      if(level.id!=="1-A"){
        level.intro=[
          {speaker:"Captain Fritz",text:"Hello, {studentName}! It is good to see you again."},
          {speaker:"Captain Fritz",text:"How are you today?",responseType:"feeling"},
          {speaker:"Captain Fritz",text:"What have you done since our last class?",responseType:"conversation"},
          {speaker:"Captain Fritz",text:`Today we are starting ${level.title}. Are you ready?`,responseType:"ready"}
        ];
      }
    });
  }

  function repairAvatarImages(root=document){
    root.querySelectorAll("img").forEach(img=>{
      if(img.dataset.fritzFallbackInstalled) return;
      img.dataset.fritzFallbackInstalled="1";
      img.addEventListener("error",()=>{
        const src=img.getAttribute("src")||"";
        if(src.includes("assets/assets/")) img.src=src.replace("assets/assets/","assets/");
        else if(src.includes("assets/avatars/boy/")) img.src=src.replace("assets/avatars/boy/","assets/assets/avatars/boy/");
      });
    });
  }

  function makeAvatarChoiceMandatoryForExistingStudents(){
    if(typeof StudentProfileEngine==="undefined") return;
    const original=StudentProfileEngine.prototype.showChooser;
    StudentProfileEngine.prototype.showChooser=function(){
      original.call(this);
      repairAvatarImages(this.panel||document);
      const activeId=this.activeId&&this.activeId();
      const active=(this.students&&this.students().find(s=>s.id===activeId))||null;
      if(active&&!active.avatar&&this.panel){
        const warning=document.createElement("p");
        warning.className="fritz-profile-error";
        warning.textContent=`Please choose an Academy avatar for ${active.studentName||"this student"} before continuing.`;
        const continueButton=[...this.panel.querySelectorAll("button")].find(b=>/Continue with Selected Student/i.test(b.textContent||""));
        if(continueButton) continueButton.disabled=true;
        const editButton=[...this.panel.querySelectorAll("button")].find(b=>/Change Selected Avatar/i.test(b.textContent||""));
        if(editButton) editButton.textContent="Choose Student Avatar";
        this.panel.prepend(warning);
      }
    };
    const originalCreate=StudentProfileEngine.prototype.showCreateForm;
    if(originalCreate){
      StudentProfileEngine.prototype.showCreateForm=function(){
        originalCreate.call(this);
        repairAvatarImages(this.panel||document);
      };
    }
    const originalEdit=StudentProfileEngine.prototype.showAvatarEditor;
    if(originalEdit){
      StudentProfileEngine.prototype.showAvatarEditor=function(id){
        originalEdit.call(this,id);
        repairAvatarImages(this.panel||document);
      };
    }
  }

  function makeBuilderNonBlocking(){
    if(typeof BuilderEngine==="undefined") return;
    const original=BuilderEngine.prototype.showBuilder;
    BuilderEngine.prototype.showBuilder=function(){
      try{
        const required=(this.build&&Array.isArray(this.build.requiredPieces))?this.build.requiredPieces:[];
        const earned=typeof this.earnedPieces==="function"?this.earnedPieces():[];
        const placements=typeof this.placements==="function"?this.placements():{};
        required.forEach((id,index)=>{
          if(earned.includes(id)&&(!placements[id]||typeof placements[id]!=="object")){
            placements[id]={x:22+(index%3)*28,y:32+Math.floor(index/3)*30,z:index+10};
          }
        });
        if(this.scene&&this.scene.save&&typeof saveGame==="function") saveGame(this.scene.save);
      }catch(error){ console.warn("Builder auto-placement safeguard",error); }
      return original.call(this);
    };
  }

  function improveVisibleLabels(){
    if(typeof LessonEngine!=="undefined"){
      const original=LessonEngine.prototype.showMissionOpening;
      LessonEngine.prototype.showMissionOpening=function(){
        const pos=displayPosition(this.levelId);
        if(this.lesson&&pos){
          this.lesson.chapter=`Week ${pos.week}`;
          this.lesson.studentFacingLabel=`Week ${pos.week} — Lesson ${pos.lesson}`;
        }
        return original.call(this);
      };
    }
  }

  normalizeGreetings();
  makeAvatarChoiceMandatoryForExistingStudents();
  makeBuilderNonBlocking();
  improveVisibleLabels();

  const observer=new MutationObserver(()=>repairAvatarImages(document));
  observer.observe(document.documentElement,{childList:true,subtree:true});
  window.FritzCoursePosition={courseOrder,displayPosition};
})();