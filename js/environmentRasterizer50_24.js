/* Fritz Academy reliable environment rasterizer v50.25 */
(function(){
  "use strict";
  if(typeof IllustrationEngine==="undefined") return;

  function addImageToCanvasTexture(scene,key,image){
    const canvas=document.createElement("canvas");
    canvas.width=1280;
    canvas.height=720;
    const context=canvas.getContext("2d");
    context.clearRect(0,0,canvas.width,canvas.height);
    context.drawImage(image,0,0,canvas.width,canvas.height);
    if(scene.textures.exists(key)) scene.textures.remove(key);
    scene.textures.addCanvas(key,canvas);
  }

  function rasterizeSvg(scene,key,src){
    return fetch(`${src}${src.includes("?")?"&":"?"}environmentBuild=50.25`,{cache:"no-store"})
      .then(response=>{
        if(!response.ok) throw new Error(`Environment request failed: ${response.status} ${src}`);
        return response.text();
      })
      .then(svgText=>new Promise((resolve,reject)=>{
        const blob=new Blob([svgText],{type:"image/svg+xml;charset=utf-8"});
        const url=URL.createObjectURL(blob);
        const image=new Image();
        image.onload=()=>{
          try{
            addImageToCanvasTexture(scene,key,image);
            URL.revokeObjectURL(url);
            resolve();
          }catch(error){
            URL.revokeObjectURL(url);
            reject(error);
          }
        };
        image.onerror=()=>{
          URL.revokeObjectURL(url);
          reject(new Error(`Environment SVG could not be rasterized: ${src}`));
        };
        image.src=url;
      }));
  }

  function loadLegacyFallback(scene,key){
    return new Promise(resolve=>{
      const image=new Image();
      image.onload=()=>{
        try{ addImageToCanvasTexture(scene,key,image); }
        catch(error){ console.error("[Fritz Academy] Legacy environment fallback failed",error); }
        resolve();
      };
      image.onerror=()=>resolve();
      image.src=`assets/academy.png?environmentFallback=50.25`;
    });
  }

  IllustrationEngine.prototype.ensureAssets=function(config={},done){
    const entries=this.textureEntries(config);
    const svgEntries=entries.filter(entry=>entry.type==="environment"&&/\.svg(?:\?|$)/i.test(entry.src));
    const imageEntries=entries.filter(entry=>!svgEntries.includes(entry)&&!this.scene.textures.exists(entry.key));

    /* Always replace environment textures. Earlier loaders may have already
       registered a blank SVG texture under the correct key. */
    const svgWork=Promise.all(svgEntries.map(entry=>{
      if(this.scene.textures.exists(entry.key)) this.scene.textures.remove(entry.key);
      return rasterizeSvg(this.scene,entry.key,entry.src).catch(error=>{
        console.error("[Fritz Academy] Environment rasterization failed",entry.src,error);
        return loadLegacyFallback(this.scene,entry.key);
      });
    }));

    const imageWork=new Promise(resolve=>{
      if(!imageEntries.length){ resolve(); return; }
      let settled=false;
      const finish=()=>{ if(settled) return; settled=true; resolve(); };
      imageEntries.forEach(entry=>this.scene.load.image(entry.key,entry.src));
      this.scene.load.once("complete",finish);
      this.scene.load.once("loaderror",file=>console.error("[Fritz Academy] Asset failed to load",file&&file.src));
      this.scene.load.start();
    });

    Promise.all([svgWork,imageWork]).then(()=>done());
  };
})();
