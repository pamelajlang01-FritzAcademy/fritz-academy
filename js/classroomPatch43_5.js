/* Fritz Academy 43.5 classroom stabilization */
(function(){
  "use strict";

  function applyLessonOneArtwork(){
    if(typeof findLevel !== "function") return;
    const lesson = findLevel("1-A");
    if(!lesson) return;
    const artwork={
      story:["assets/captain_fritz.png","assets/fritz_academy_world_map.png","assets/captain_fritz.png","assets/academy.png","assets/captain_fritz.png","assets/fritz_academy_world_map.png"],
      reader1:["assets/tony.png","assets/academy.png","assets/tony.png","assets/academy.png","assets/tony.png"],
      reader2:["assets/tony.png","assets/fritz_academy_world_map.png","assets/nola.png","assets/bash.png","assets/academy.png"]
    };
    Object.keys(artwork).forEach(key=>{
      const reading=lesson[key];
      if(!reading||!Array.isArray(reading.pages)) return;
      reading.pages=reading.pages.map((page,index)=>{
        const normalized=typeof page==="string"?{text:page}:Object.assign({},page);
        normalized.image=artwork[key][index]||"assets/academy.png";
        return normalized;
      });
    });
  }

  applyLessonOneArtwork();

  if(typeof BuilderEngine!=="undefined"){
    const originalStart=BuilderEngine.prototype.start;
    BuilderEngine.prototype.start=function(lesson,onComplete){
      const build=lesson&&lesson.build;
      const progress=this.lessonEngine&&typeof this.lessonEngine.progress==="function"
        ?this.lessonEngine.progress():null;
      if(build&&Array.isArray(build.requiredPieces)&&progress){
        if(!Array.isArray(progress.earnedPieces)) progress.earnedPieces=[];
        build.requiredPieces.forEach(id=>{
          if(!progress.earnedPieces.includes(id)) progress.earnedPieces.push(id);
        });
        if(this.scene&&this.scene.save&&typeof saveGame==="function") saveGame(this.scene.save);
      }
      originalStart.call(this,lesson,onComplete);
    };

    const originalShow=BuilderEngine.prototype.showBuilder;
    BuilderEngine.prototype.showBuilder=function(){
      originalShow.call(this);
      const required=this.build&&Array.isArray(this.build.requiredPieces)?this.build.requiredPieces:[];
      if(!required.length||!this.scene||!this.scene.panels) return;

      const panels=this.scene.panels;
      const addButton=(button,index)=>{
        button.x+=panels.centerX;
        button.y+=panels.centerY;
        button.setScrollFactor(0).setDepth(panels.baseDepth+50+index);
        panels.activeObjects.push(button);
      };

      const placeAll=panels.makeButton(-210,275,"Place My Pieces",()=>{
        const placements=this.placements();
        required.forEach((id,index)=>{placements[id]=index;});
        this.selectedPieceId="";
        saveGame(this.scene.save);
        this.showBuilder();
      },{fontSize:"19px",backgroundColor:"#ffffff"});

      const finish=panels.makeButton(210,275,this.isComplete()?"Finish This Build":"Place Pieces First",()=>{
        if(this.isComplete()) this.completeBuild();
      },{fontSize:"19px",backgroundColor:this.isComplete()?"#f6c744":"#e6e6e6"});

      addButton(placeAll,0);
      addButton(finish,1);
    };
  }
})();