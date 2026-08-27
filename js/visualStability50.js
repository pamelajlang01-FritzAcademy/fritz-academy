/* Fritz Academy visual stability v50.2 — canonical artwork only, no drawn substitutes */
(function(){
  "use strict";
  const clamp=(v,min,max)=>Math.min(max,Math.max(min,v));

  function cleanTexture(engine,key){
    const scene=engine.scene,cleanKey=`${key}-clean`;
    if(scene.textures.exists(cleanKey)) return cleanKey;
    const texture=scene.textures.get(key),source=texture&&texture.getSourceImage&&texture.getSourceImage();
    if(!source||!source.width||!source.height) return key;
    try{
      const canvas=document.createElement("canvas");canvas.width=source.width;canvas.height=source.height;
      const ctx=canvas.getContext("2d",{willReadFrequently:true});ctx.drawImage(source,0,0);
      const image=ctx.getImageData(0,0,canvas.width,canvas.height),data=image.data,w=canvas.width,h=canvas.height;
      const seen=new Uint8Array(w*h),queue=[],seeds=[];
      for(let x=0;x<w;x+=Math.max(1,Math.floor(w/40))){seeds.push([x,0],[x,h-1]);}
      for(let y=0;y<h;y+=Math.max(1,Math.floor(h/40))){seeds.push([0,y],[w-1,y]);}
      const colorAt=(x,y)=>{const i=(y*w+x)*4;return[data[i],data[i+1],data[i+2],data[i+3]];};
      const isBg=(c,seed)=>{if(c[3]<20)return true;const bright=(c[0]+c[1]+c[2])/3,spread=Math.max(c[0],c[1],c[2])-Math.min(c[0],c[1],c[2]),d=Math.hypot(c[0]-seed[0],c[1]-seed[1],c[2]-seed[2]);return d<48||(bright>232&&spread<28)||(c[2]>145&&c[2]>c[0]*1.08&&c[2]>c[1]*1.03&&bright>115);};
      seeds.forEach(([sx,sy])=>{const seed=colorAt(sx,sy);if(!(seed[3]<20||((seed[0]+seed[1]+seed[2])/3>205)||seed[2]>145))return;queue.push([sx,sy,seed]);while(queue.length){const[x,y,s]=queue.pop(),idx=y*w+x;if(seen[idx])continue;seen[idx]=1;const c=colorAt(x,y);if(!isBg(c,s))continue;data[idx*4+3]=0;if(x>0)queue.push([x-1,y,s]);if(x<w-1)queue.push([x+1,y,s]);if(y>0)queue.push([x,y-1,s]);if(y<h-1)queue.push([x,y+1,s]);}});
      ctx.putImageData(image,0,0);scene.textures.addCanvas(cleanKey,canvas);return cleanKey;
    }catch(error){console.warn("Fritz Academy character cleanup skipped:",error);return key;}
  }

  if(typeof IllustrationEngine!=="undefined"){
    /* No emoji, CSS-like, or Phaser-drawn art substitutes. Missing art stays missing until the real asset is supplied. */
    IllustrationEngine.prototype.makeProp=function(){ return null; };

    IllustrationEngine.prototype.drawScene=function(objects,text,options={}){
      const x=Number(options.x)||0,y=Number(options.y)||-92,w=Number(options.width)||620,h=Number(options.height)||250;
      const config=options.scene||{};
      const env=this.environment(config.environment||options.environment||"campus");
      const envKey=env?`fa-env-${env.id}`:"";

      if(!envKey||!this.scene.textures.exists(envKey)){
        console.error("Fritz Academy canonical environment missing:",env&&env.id);
        const warning=this.scene.add.text(x,y,"Fritz artwork failed to load. Please reload this lesson.",{fontSize:"18px",fontStyle:"bold",color:"#8b1e1e",backgroundColor:"rgba(255,255,255,.96)",padding:{x:12,y:8},align:"center",wordWrap:{width:w*.8}}).setOrigin(.5).setDepth(30);
        objects.push(warning);
        if(typeof options.onReady==="function") options.onReady();
        return;
      }

      const bg=this.scene.add.image(x,y,envKey).setDisplaySize(w,h).setDepth(1);
      objects.push(bg);
      const maskShape=this.scene.make.graphics({x:0,y:0,add:false});
      maskShape.fillStyle(0xffffff).fillRect(x-w/2,y-h/2,w,h);
      const mask=maskShape.createGeometryMask();

      (config.characters||[]).forEach((spec,index)=>{
        const id=typeof spec==="string"?spec:spec.id;
        let key="",scale=.75;
        if(id==="student"){
          const a=this.studentAvatar(); if(!a) return;
          key=`fa-avatar-${a.id}`; scale=Number(spec.scale)||.72;
        }else{
          const c=this.character(id); if(!c) return;
          key=`fa-char-${id}`; scale=Number(spec.scale)||c.scale||1;
        }
        if(!this.scene.textures.exists(key)){console.error("Fritz Academy canonical character missing:",id);return;}
        key=cleanTexture(this,key);
        const actorX=clamp(x+(Number(spec.x)||0)*w,x-w*.40,x+w*.40);
        const actorY=clamp(y+h*.23+(Number(spec.y)||0)*h,y-h*.23,y+h*.27);
        const actor=this.scene.add.image(actorX,actorY,key).setDepth(8+index).setMask(mask);
        const baseHeight=Math.min(h*.54*scale,h*.68);
        actor.setDisplaySize(baseHeight*.64,baseHeight);
        objects.push(actor);
        this.applyMotion(actor,spec.motion||"idle",index);
      });

      objects.push(this.scene.add.text(x,y+h*.39,options.label||config.caption||text||"",{fontSize:"16px",fontStyle:"bold",color:"#102342",backgroundColor:"rgba(255,255,255,.94)",padding:{x:10,y:5},align:"center",wordWrap:{width:w*.84}}).setOrigin(.5).setDepth(30));
      if(typeof options.onReady==="function") options.onReady();
    };

    IllustrationEngine.prototype.applyMotion=function(actor,motion="idle",delayIndex=0){
      if(!this.scene||!this.scene.tweens||!actor)return;
      const delay=delayIndex*70,duration=900+delayIndex*25;
      if(["wave","celebrate","surprised","pop"].includes(motion))this.scene.tweens.add({targets:actor,delay,angle:{from:-2,to:2},scaleX:actor.scaleX*1.025,scaleY:actor.scaleY*1.025,duration:620,yoyo:true,repeat:-1,ease:"Sine.easeInOut"});
      else if(["walk","sweep","building","point","reading","thinking"].includes(motion))this.scene.tweens.add({targets:actor,delay,angle:{from:-1,to:1},duration,yoyo:true,repeat:-1,ease:"Sine.easeInOut"});
      else this.scene.tweens.add({targets:actor,delay,scaleY:actor.scaleY*1.012,duration:1300,yoyo:true,repeat:-1,ease:"Sine.easeInOut"});
    };
  }
})();