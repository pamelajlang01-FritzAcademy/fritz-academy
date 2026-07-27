/* Fritz Academy Lesson 4 class-ready patch v50.48 */
(function(){
  "use strict";

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

  /* Use the two approved standalone PNG objects in every Lesson 4
     illustration instead of rendering their names as text fallbacks. */
  if(typeof IllustrationEngine!=="undefined"){
    const lesson4Assets={
      jacket:{src:"assets/objects/yellow_jacket.png",w:125,h:120},
      key:{src:"assets/objects/library_key_gold.png",w:105,h:105}
    };

    const priorEntries=IllustrationEngine.prototype.textureEntries;
    IllustrationEngine.prototype.textureEntries=function(config={}){
      const entries=priorEntries.call(this,config)||[];
      (config.props||[]).forEach(spec=>{
        const kind=String(spec&&spec.kind||"").toLowerCase();
        const asset=lesson4Assets[kind];
        if(asset){
          entries.push({key:`fa-l4-object-${kind}`,src:asset.src});
        }
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

  window.FritzLesson4ClassReady5048={version:"50.48",lessonId:"1-D"};
})();
