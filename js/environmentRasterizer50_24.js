/* Fritz Academy reliable environment rasterizer v50.24 */
(function(){
  "use strict";
  if(typeof IllustrationEngine==="undefined") return;

  function rasterizeSvg(scene,key,src){
    return fetch(src,{cache:"no-store"})
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
            const canvas=document.createElement("canvas");
            canvas.width=1280;
            canvas.height=720;
            const context=canvas.getContext("2d");
            context.clearRect(0,0,canvas.width,canvas.height);
            context.drawImage(image,0,0,canvas.width,canvas.height);
            if(scene.textures.exists(key)) scene.textures.remove(key);
            scene.textures.addCanvas(key,canvas);
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

  IllustrationEngine.prototype.ensureAssets=function(config={},done){
    const missing=this.textureEntries(config).filter(entry=>!this.scene.textures.exists(entry.key));
    if(!missing.length){ done(); return; }

    const svgEntries=missing.filter(entry=>entry.type==="environment"&&/\.svg(?:\?|$)/i.test(entry.src));
    const imageEntries=missing.filter(entry=>!svgEntries.includes(entry));

    const svgWork=Promise.all(svgEntries.map(entry=>
      rasterizeSvg(this.scene,entry.key,entry.src).catch(error=>{
        console.error("[Fritz Academy] Environment rasterization failed",entry.src,error);
      })
    ));

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
