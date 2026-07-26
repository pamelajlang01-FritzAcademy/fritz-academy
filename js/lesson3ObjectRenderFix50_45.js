/* Fritz Academy Lesson 3 approved object rendering v50.45 */
(function(){
  "use strict";
  if(typeof IllustrationEngine === "undefined") return;

  const OBJECT_ASSETS={
    "reading-chair":{src:"assets/objects/reading_chair.png",width:150,height:150},
    "book-shelf":{src:"assets/objects/book_shelf.png",width:168,height:170},
    "story-stump":{src:"assets/objects/outdoor_story_stump.png",width:180,height:145},
    "outdoor-story-stump":{src:"assets/objects/outdoor_story_stump.png",width:180,height:145}
  };

  const originalTextureEntries=IllustrationEngine.prototype.textureEntries;
  IllustrationEngine.prototype.textureEntries=function(config={}){
    const entries=originalTextureEntries.call(this,config)||[];
    (config.props||[]).forEach(spec=>{
      const kind=String(spec&&spec.kind||"").toLowerCase();
      const asset=OBJECT_ASSETS[kind];
      if(asset) entries.push({key:`fa-approved-object-${kind}`,src:asset.src});
    });
    return entries.filter((entry,index,array)=>
      entry&&entry.key&&array.findIndex(item=>item&&item.key===entry.key)===index
    );
  };

  const originalMakeProp=IllustrationEngine.prototype.makeProp;
  IllustrationEngine.prototype.makeProp=function(spec,x,y,width,height,index){
    const kind=String(spec&&spec.kind||"").toLowerCase();
    const asset=OBJECT_ASSETS[kind];
    if(!asset) return originalMakeProp.call(this,spec,x,y,width,height,index);

    const textureKey=`fa-approved-object-${kind}`;
    if(!this.scene.textures.exists(textureKey)){
      return originalMakeProp.call(this,spec,x,y,width,height,index);
    }

    const scale=Math.max(.45,Math.min(1.4,Number(spec.scale)||1));
    const image=this.scene.add.image(
      x+(Number(spec.x)||0)*width,
      y+(Number(spec.y)||0)*height,
      textureKey
    ).setOrigin(.5).setDepth(5+index);
    image.setDisplaySize(asset.width*scale,asset.height*scale);
    return image;
  };

  window.FritzLesson3ObjectRenderFix5045={version:"50.45",objects:Object.keys(OBJECT_ASSETS)};
})();