/* Fritz Academy emergency classroom readiness v50.2 */
(function(){
  "use strict";
  const READY_THROUGH=["1-A","1-B","1-C","1-D","2-A","2-B"];
  const TARGET="2-B";

  function ensureProgress(save){
    if(!save) return;
    if(!Array.isArray(save.unlockedLevels)) save.unlockedLevels=["1-A"];
    READY_THROUGH.forEach(id=>{ if(!save.unlockedLevels.includes(id)) save.unlockedLevels.push(id); });
    if(!save.lessonProgress) save.lessonProgress={};
    if(typeof saveGame==="function") saveGame(save);
  }

  if(typeof World!=="undefined"){
    const originalPrepare=World.prototype.prepareSaveData;
    World.prototype.prepareSaveData=function(){
      originalPrepare.call(this);
      ensureProgress(this.save);
    };

    const originalCreatePlayer=World.prototype.createPlayer;
    World.prototype.createPlayer=function(){
      originalCreatePlayer.call(this);
      const save=this.save||{};
      const lib=window.FRITZ_AVATARS||window.FritzIllustrationLibrary&&window.FritzIllustrationLibrary.avatars||[];
      const avatar=(Array.isArray(lib)?lib:[]).find(a=>a.id===save.avatar);
      if(!avatar||!avatar.src||!this.load||!this.textures) return;
      const key=`student-world-${avatar.id}`;
      const apply=()=>{
        if(!this.player||!this.textures.exists(key)) return;
        this.player.setTexture(key).setScale(.055);
      };
      if(this.textures.exists(key)){ apply(); return; }
      this.load.image(key,avatar.src);
      this.load.once("complete",apply);
      this.load.start();
    };
  }

  if(typeof LessonEngine!=="undefined"){
    const originalStart=LessonEngine.prototype.start;
    LessonEngine.prototype.start=function(levelId,location){
      ensureProgress(this.scene&&this.scene.save);
      return originalStart.call(this,levelId,location);
    };
  }

  if(typeof BuilderEngine!=="undefined"){
    const originalShow=BuilderEngine.prototype.showBuilder;
    BuilderEngine.prototype.showBuilder=function(){
      try{
        const required=this.build&&Array.isArray(this.build.requiredPieces)?this.build.requiredPieces:[];
        const progress=this.scene&&this.scene.save&&this.scene.save.lessonProgress&&this.scene.save.lessonProgress[this.lessonId||this.levelId];
        if(progress&&Array.isArray(progress.earnedPieces)) required.forEach(id=>{if(!progress.earnedPieces.includes(id))progress.earnedPieces.push(id);});
        const placements=typeof this.placements==="function"?this.placements():{};
        required.forEach((id,index)=>{if(!placements[id]||typeof placements[id]!=="object")placements[id]={x:20+(index%3)*29,y:31+Math.floor(index/3)*31,z:index+10};});
        if(this.scene&&this.scene.save&&typeof saveGame==="function")saveGame(this.scene.save);
      }catch(e){console.warn("Tonight Builder safeguard",e);}
      return originalShow.call(this);
    };
  }

  function installLaunch(){
    if(document.getElementById("fritz-tonight-launch")) return;
    const button=document.createElement("button");
    button.id="fritz-tonight-launch";
    button.type="button";
    button.textContent="Start Nick’s Lesson — Week 2 Lesson 3";
    Object.assign(button.style,{position:"fixed",left:"50%",bottom:"14px",transform:"translateX(-50%)",zIndex:"120000",padding:"13px 20px",border:"3px solid #102342",borderRadius:"14px",background:"#f6c744",color:"#102342",fontWeight:"900",fontSize:"17px",boxShadow:"0 6px 20px rgba(0,0,0,.35)",cursor:"pointer"});
    button.addEventListener("click",()=>{
      const game=Phaser&&Phaser.GAMES&&Phaser.GAMES[0];
      const world=game&&game.scene&&game.scene.getScene("World");
      if(!world||!world.lessonEngine){ alert("The Academy is still loading. Please click again in a moment."); return; }
      ensureProgress(world.save);
      if(window.fritzStudentProfiles&&window.fritzStudentProfiles.close)window.fritzStudentProfiles.close();
      world.startLevel(TARGET,"Teacher Quick Start");
    });
    document.body.appendChild(button);
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",installLaunch);else installLaunch();
})();