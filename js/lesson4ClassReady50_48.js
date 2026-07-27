/* Fritz Academy Lesson 4 class-ready patch v50.49 */
(function(){
  "use strict";

  const lesson=typeof findLevel==="function"?findLevel("1-D"):null;

  /* Lesson 4 must present the story before its story questions. Skip the
     legacy pre-story feelings quiz for this lesson only. */
  if(typeof LessonEngine!=="undefined"){
    const priorFeelingsIntro=LessonEngine.prototype.showFeelingsActivityIntro;
    LessonEngine.prototype.showFeelingsActivityIntro=function(){
      if(this.levelId==="1-D"){
        this.startStory();
        return;
      }
      return priorFeelingsIntro.call(this);
    };
  }

  /* Replace the indoor trophy display with a garden-appropriate reward. */
  if(lesson){
    const outdoorReward={
      id:"paw-print-stepping-stones",
      name:"Paw Print Stepping Stones",
      icon:"🐾",
      area:"welcome-garden",
      lesson:"1-D"
    };
    if(lesson.reader2) lesson.reader2.rewardPiece=outdoorReward;
    if(lesson.build){
      lesson.build.requiredPieces=["book-cart","reading-circle","paw-print-stepping-stones"];
      lesson.build.title="Build the Garden Reading Club";
      lesson.build.completionMessage="You built the Garden Reading Club and its paw-print path.";
    }
  }

  /* Use approved standalone PNG objects in every Lesson 4 illustration.
     These exact files must exist in assets/objects/. */
  if(typeof IllustrationEngine!=="undefined"){
    const lesson4Assets={
      jacket:{src:"assets/objects/yellow_jacket.png",w:125,h:120},
      key:{src:"assets/objects/library_key_gold.png",w:105,h:105},
      lock:{src:"assets/objects/brass_lock.png",w:105,h:110},
      "paw-print-stepping-stones":{src:"assets/objects/paw_print_stepping_stones.png",w:210,h:150}
    };

    const priorEntries=IllustrationEngine.prototype.textureEntries;
    IllustrationEngine.prototype.textureEntries=function(config={}){
      const entries=priorEntries.call(this,config)||[];
      (config.props||[]).forEach(spec=>{
        const kind=String(spec&&spec.kind||"").toLowerCase();
        const asset=lesson4Assets[kind];
        if(asset) entries.push({key:`fa-l4-object-${kind}`,src:asset.src});
      });
      return entries.filter((entry,index,list)=>
        entry&&entry.key&&list.findIndex(other=>other&&other.key===entry.key)===index
      );
    };

    const priorMakeProp=IllustrationEngine.prototype.makeProp;
    IllustrationEngine.prototype.makeProp=function(spec,x,y,width,height,index){
      const kind=String(spec&&spec.kind||"").toLowerCase();
      const asset=lesson4Assets[kind];
      const textureKey=`fa-l4-object-${kind}`;
      if(!asset||!this.scene.textures.exists(textureKey)){
        return priorMakeProp.call(this,spec,x,y,width,height,index);
      }
      const scale=Math.max(.45,Math.min(1.4,Number(spec.scale)||1));
      const image=this.scene.add.image(
        x+(Number(spec.x)||0)*width,
        y+(Number(spec.y)||0)*height,
        textureKey
      ).setOrigin(.5).setDepth(5+index);
      image.setDisplaySize(asset.w*scale,asset.h*scale);
      return image;
    };
  }

  window.FritzLesson4ClassReady5049={version:"50.49",lessonId:"1-D"};
})();