/* Fritz Academy Illustration Engine v50.9 */
class IllustrationEngine {
  constructor(scene){
    this.scene=scene;
    this.library=window.FritzIllustrationLibrary||{characters:{},avatars:[],environments:{}};
  }
  character(id){ return this.library.characters[id]||null; }
  environment(id){ return this.library.environments[id]||this.library.environments.campus||null; }
  studentAvatar(){
    const id=this.scene&&this.scene.save&&this.scene.save.avatar;
    return this.library.avatars.find(a=>a.id===id)||null;
  }
  clamp(value,min,max){ return Math.min(max,Math.max(min,value)); }

  textureEntries(config={}){
    const entries=[];
    const env=this.environment(config.environment||"campus");
    if(env) entries.push({key:`fa-env-${env.id}`,src:env.src});
    (config.characters||[]).forEach(spec=>{
      const id=typeof spec==="string"?spec:spec.id;
      if(id==="student"){
        const avatar=this.studentAvatar();
        if(avatar) entries.push({key:`fa-avatar-${avatar.id}`,src:String(avatar.src||"").replace(/^assets\/assets\//,"assets/")});
      }else{
        const character=this.character(id);
        if(character) entries.push({key:`fa-char-${id}`,src:character.primary||character.fallback});
      }
    });
    return entries.filter((entry,index,array)=>array.findIndex(item=>item.key===entry.key)===index);
  }

  ensureAssets(config={},done){
    const missing=this.textureEntries(config).filter(entry=>!this.scene.textures.exists(entry.key));
    if(!missing.length){ done(); return; }
    let settled=false;
    const finish=()=>{ if(settled) return; settled=true; done(); };
    missing.forEach(entry=>this.scene.load.image(entry.key,entry.src));
    this.scene.load.once("complete",finish);
    this.scene.load.start();
  }

  cleanOuterBackground(key){
    const cleanKey=`${key}-edge-clean-v509`;
    if(this.scene.textures.exists(cleanKey)) return cleanKey;
    const texture=this.scene.textures.get(key);
    const source=texture&&texture.getSourceImage&&texture.getSourceImage();
    if(!source||!source.width||!source.height) return key;

    try{
      const canvas=document.createElement("canvas");
      canvas.width=source.width;
      canvas.height=source.height;
      const ctx=canvas.getContext("2d",{willReadFrequently:true});
      ctx.drawImage(source,0,0);
      const image=ctx.getImageData(0,0,canvas.width,canvas.height);
      const data=image.data,w=canvas.width,h=canvas.height;
      const visited=new Uint8Array(w*h);
      const queue=[];
      const pushEdge=(x,y)=>queue.push([x,y]);
      for(let x=0;x<w;x++){ pushEdge(x,0); pushEdge(x,h-1); }
      for(let y=1;y<h-1;y++){ pushEdge(0,y); pushEdge(w-1,y); }
      const isBackground=(r,g,b,a)=>{
        if(a<20) return true;
        const spread=Math.max(r,g,b)-Math.min(r,g,b);
        return r>232&&g>232&&b>232&&spread<24;
      };
      while(queue.length){
        const [x,y]=queue.pop();
        if(x<0||x>=w||y<0||y>=h) continue;
        const idx=y*w+x;
        if(visited[idx]) continue;
        visited[idx]=1;
        const i=idx*4;
        if(!isBackground(data[i],data[i+1],data[i+2],data[i+3])) continue;
        data[i+3]=0;
        queue.push([x-1,y],[x+1,y],[x,y-1],[x,y+1]);
      }
      ctx.putImageData(image,0,0);
      this.scene.textures.addCanvas(cleanKey,canvas);
      return cleanKey;
    }catch(error){
      return key;
    }
  }

  addScene(objects,text,options={}){
    const config=options.scene||{};
    this.ensureAssets(config,()=>this.drawScene(objects,text,options));
  }

  drawScene(objects,text,options={}){
    const x=Number(options.x)||0;
    const y=Number(options.y)||-92;
    const width=Number(options.width)||620;
    const height=Number(options.height)||250;
    const config=options.scene||{};
    const env=this.environment(config.environment||options.environment||"campus");
    const innerWidth=width-10,innerHeight=height-10;
    const left=x-innerWidth/2,right=x+innerWidth/2,top=y-innerHeight/2,bottom=y+innerHeight/2;

    objects.push(this.scene.add.rectangle(x,y,width,height,0xffffff,1).setDepth(0));
    if(env&&this.scene.textures.exists(`fa-env-${env.id}`)){
      const bg=this.scene.add.image(x,y,`fa-env-${env.id}`).setDepth(1);
      bg.setDisplaySize(innerWidth,innerHeight);
      objects.push(bg);
    }else{
      objects.push(this.scene.add.rectangle(x,y,innerWidth,innerHeight,0xdff2ff,1).setDepth(1));
    }
    objects.push(this.scene.add.rectangle(x,y+height*.34,innerWidth,height*.28,0x102342,.08).setDepth(2));

    const redundantProps=new Set(["gate","flag","path","garden-sign","academy-sign"]);
    (config.props||[]).forEach((spec,index)=>{
      if(redundantProps.has(String(spec.kind||"").toLowerCase())) return;
      const prop=this.makeProp(spec,x,y,width,height,index);
      if(!prop) return;
      prop.x=this.clamp(prop.x,left+48,right-48);
      prop.y=this.clamp(prop.y,top+42,bottom-52);
      if(prop.setScale&&prop.scaleX>1) prop.setScale(1);
      objects.push(prop);
      this.applyMotion(prop,spec.motion||"idle",12+index);
    });

    (config.characters||[]).forEach((spec,index)=>{
      const id=typeof spec==="string"?spec:spec.id;
      let key="",scale=.75,avatarId="";
      if(id==="student"){
        const avatar=this.studentAvatar();
        if(!avatar) return;
        avatarId=avatar.id;
        key=`fa-avatar-${avatar.id}`;
        scale=Number(spec.scale)||.72;
      }else{
        const character=this.character(id);
        if(!character) return;
        key=`fa-char-${id}`;
        scale=Number(spec.scale)||character.scale||1;
      }
      if(!this.scene.textures.exists(key)) return;
      if(id==="student"&&window.FritzAvatarAssetPipeline){
        key=window.FritzAvatarAssetPipeline.cleanPhaserTexture(this.scene,key,avatarId);
      }else{
        key=this.cleanOuterBackground(key);
      }
      const source=this.scene.textures.get(key).getSourceImage();
      const ratio=source&&source.height?source.width/source.height:.64;
      const maxHeight=Math.min(innerHeight*.52,126);
      const actorHeight=this.clamp(maxHeight*scale,50,maxHeight);
      const actorWidth=Math.min(actorHeight*ratio,innerWidth*.20);
      const halfW=actorWidth/2,halfH=actorHeight/2;
      const actorX=this.clamp(x+(Number(spec.x)||0)*width,left+halfW+18,right-halfW-18);
      const actorY=this.clamp(y+height*.16+(Number(spec.y)||0)*height,top+halfH+18,bottom-halfH-48);
      const actor=this.scene.add.image(actorX,actorY,key).setDepth(8+index);
      actor.setDisplaySize(actorWidth,actorHeight);
      objects.push(actor);
      this.applyMotion(actor,spec.motion||"idle",index);
    });

    objects.push(this.scene.add.rectangle(x,y,width,height,0xffffff,0).setStrokeStyle(5,0x174ea6).setDepth(40));
    if(typeof options.onReady==="function") options.onReady();
  }

  makeProp(spec,x,y,width,height,index){
    const symbols={speech:"💬","name-tag":"🏷️",sparkles:"✨",flowers:"🌼🌷",butterfly:"🦋","empty-bed":"🟫","flower-basket":"🧺🌷","young-tree":"🌳",question:"❓","backpack-outline":"◻️🎒",backpack:"🎒",thought:"💭",book:"📘",bench:"🪑",magnifier:"🔎",bush:"🌿",map:"🗺️","map-mark":"❌",idea:"💡",arrow:"➡️"};
    const symbol=symbols[spec.kind];
    if(!symbol) return null;
    return this.scene.add.text(x+(Number(spec.x)||0)*width,y+(Number(spec.y)||0)*height,symbol,{fontSize:`${Math.min(40,Math.max(20,Math.round(32*(Number(spec.scale)||1))))}px`,align:"center"}).setOrigin(.5).setDepth(5+index);
  }

  applyMotion(actor,motion="idle",delayIndex=0){
    if(!this.scene||!this.scene.tweens||!actor) return;
    const delay=delayIndex*60;
    const base={targets:actor,delay,ease:"Sine.easeInOut",yoyo:true,repeat:-1};
    if(["wave","celebrate","pop","surprised"].includes(motion)) this.scene.tweens.add({...base,angle:{from:-1.5,to:1.5},duration:700});
    else if(["thinking","reading","point","glow","sway","float","walk","sweep","fall"].includes(motion)) this.scene.tweens.add({...base,angle:{from:-.6,to:.6},duration:1200});
    else this.scene.tweens.add({...base,scaleY:actor.scaleY*1.006,duration:1500});
  }

  validateScene(config={}){
    const errors=[];
    if(!this.environment(config.environment||"campus")) errors.push("Unknown environment");
    (config.characters||[]).forEach(spec=>{
      const id=typeof spec==="string"?spec:spec.id;
      if(id!=="student"&&!this.character(id)) errors.push(`Unknown character: ${id}`);
    });
    return {valid:errors.length===0,errors};
  }
}
window.IllustrationEngine=IllustrationEngine;
