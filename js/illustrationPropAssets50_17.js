/* Fritz Academy story and reader production prop assets v50.17 */
(function(){
  "use strict";
  if(typeof IllustrationEngine === "undefined") return;

  const PROP_ASSETS={
    "flowers":{src:"assets/props/builder/welcome-flowers.svg",width:92,height:68},
    "flower-basket":{src:"assets/props/builder/welcome-flowers.svg",width:88,height:66},
    "young-tree":{src:"assets/props/builder/welcome-tree.svg",width:90,height:108},
    "bench":{src:"assets/props/builder/reading-bench.svg",width:112,height:70},
    "path":{src:"assets/props/builder/stone-path.svg",width:120,height:58},
    "garden-fence":{src:"assets/props/builder/garden-fence.svg",width:126,height:70}
  };

  const originalTextureEntries=IllustrationEngine.prototype.textureEntries;
  IllustrationEngine.prototype.textureEntries=function(config={}){
    const entries=originalTextureEntries.call(this,config);
    (config.props||[]).forEach(spec=>{
      const kind=String(spec&&spec.kind||"").toLowerCase();
      const asset=PROP_ASSETS[kind];
      if(asset) entries.push({key:`fa-prop-${kind}`,src:asset.src});
    });
    return entries.filter((entry,index,array)=>array.findIndex(item=>item.key===entry.key)===index);
  };

  IllustrationEngine.prototype.makeProp=function(spec,x,y,width,height,index){
    const kind=String(spec&&spec.kind||"").toLowerCase();
    const asset=PROP_ASSETS[kind];
    const textureKey=`fa-prop-${kind}`;
    if(!asset||!this.scene.textures.exists(textureKey)){
      console.info(`[Fritz Academy] Production prop not installed yet: ${kind||"unknown"}`);
      return null;
    }
    const scale=Math.max(.55,Math.min(1.35,Number(spec.scale)||1));
    const prop=this.scene.add.image(
      x+(Number(spec.x)||0)*width,
      y+(Number(spec.y)||0)*height,
      textureKey
    ).setOrigin(.5).setDepth(5+index);
    prop.setDisplaySize(asset.width*scale,asset.height*scale);
    return prop;
  };

  window.FritzIllustrationPropAssets={version:"50.17",assets:PROP_ASSETS};
})();
