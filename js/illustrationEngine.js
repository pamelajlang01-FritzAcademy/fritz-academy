/* Fritz Academy Illustration Engine v50.4 */
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
        if(avatar) entries.push({key:`fa-avatar-${avatar.id}`,src:avatar.src});
        return;
      }
      const character=this.character(id);
      if(character) entries.push({key:`fa-char-${id}`,src:character.primary||character.fallback});
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
    this.scene.load.once("loaderror",()=>{});
    this.scene.load.start();
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
    const innerWidth=width-10;
    const innerHeight=height-10;
    const left=x-innerWidth/2;
    const right=x+innerWidth/2;
    const top=y-innerHeight/2;
    const bottom=y+innerHeight/2;

    objects.push(this.scene.add.rectangle(x,y,width,height,0xffffff,1).setStrokeStyle(5,0x174ea6).setDepth(0));

    if(env&&this.scene.textures.exists(`fa-env-${env.id}`)){
      const bg=this.scene.add.image(x,y,`fa-env-${env.id}`).setDepth(1);
      const source=bg.texture.getSourceImage();
      const sourceRatio=source&&source.height?source.width/source.height:1;
      const frameRatio=innerWidth/innerHeight;
      if(sourceRatio>frameRatio) bg.setDisplaySize(innerHeight*sourceRatio,innerHeight);
      else bg.setDisplaySize(innerWidth,innerWidth/sourceRatio);
      objects.push(bg);
    }else{
      objects.push(this.scene.add.rectangle(x,y,innerWidth,innerHeight,0xdff2ff,1).setDepth(1));
    }

    objects.push(this.scene.add.rectangle(x,y+height*.32,innerWidth,height*.35,0x234a22,.12).setDepth(2));

    (config.props||[]).forEach((spec,index)=>{
      const prop=this.makeProp(spec,x,y,width,height,index);
      if(!prop) return;
      prop.x=this.clamp(prop.x,left+40,right-40);
      prop.y=this.clamp(prop.y,top+34,bottom-44);
      if(prop.setScale&&prop.scaleX>1.15) prop.setScale(1.15);
      objects.push(prop);
      this.applyMotion(prop,spec.motion||"idle",12+index,{left:left+40,right:right-40,top:top+34,bottom:bottom-44});
    });

    (config.characters||[]).forEach((spec,index)=>{
      const id=typeof spec==="string"?spec:spec.id;
      let key="";
      let scale=.75;
      if(id==="student"){
        const avatar=this.studentAvatar();
        if(!avatar) return;
        key=`fa-avatar-${avatar.id}`;
        scale=Number(spec.scale)||.72;
      }else{
        const character=this.character(id);
        if(!character) return;
        key=`fa-char-${id}`;
        scale=Number(spec.scale)||character.scale||1;
      }
      if(!this.scene.textures.exists(key)) return;
      const source=this.scene.textures.get(key).getSourceImage();
      const ratio=source&&source.height?source.width/source.height:.64;
      const maxHeight=Math.min(innerHeight*.56,136);
      const actorHeight=this.clamp(maxHeight*scale,54,maxHeight);
      const actorWidth=Math.min(actorHeight*ratio,innerWidth*.22);
      const halfW=actorWidth/2;
      const halfH=actorHeight/2;
      const actorX=this.clamp(x+(Number(spec.x)||0)*width,left+halfW+10,right-halfW-10);
      const actorY=this.clamp(y+height*.18+(Number(spec.y)||0)*height,top+halfH+10,bottom-halfH-38);
      const actor=this.scene.add.image(actorX,actorY,key).setDepth(8+index);
      actor.setDisplaySize(actorWidth,actorHeight);
      objects.push(actor);
      this.applyMotion(actor,spec.motion||"idle",index,{left:left+halfW+10,right:right-halfW-10,top:top+halfH+10,bottom:bottom-halfH-38});
    });

    objects.push(this.scene.add.text(x,y+height*.39,options.label||config.caption||text||"Fritz Academy Story Scene",{
      fontSize:"16px",fontStyle:"bold",color:"#102342",backgroundColor:"rgba(255,255,255,.94)",padding:{x:10,y:5},align:"center",wordWrap:{width:width*.84}
    }).setOrigin(.5).setDepth(30));
    if(typeof options.onReady==="function") options.onReady();
  }
  makeProp(spec,x,y,width,height,index){
    const symbols={gate:"🏫",flag:"🚩",path:"🪨",speech:"💬","name-tag":"🏷️",sparkles:"✨",flowers:"🌼🌷",butterfly:"🦋","empty-bed":"🟫","flower-basket":"🧺🌷","young-tree":"🌳",question:"❓","backpack-outline":"◻️🎒",backpack:"🎒",thought:"💭",book:"📘",bench:"🪑",magnifier:"🔎",bush:"🌿",map:"🗺️","map-mark":"❌",idea:"💡",arrow:"➡️","garden-sign":"🪧"};
    const symbol=symbols[spec.kind]||"⭐";
    return this.scene.add.text(x+(Number(spec.x)||0)*width,y+(Number(spec.y)||0)*height,symbol,{fontSize:`${Math.min(44,Math.max(22,Math.round(36*(Number(spec.scale)||1))))}px`,align:"center"}).setOrigin(.5).setDepth(5+index);
  }
  applyMotion(actor,motion="idle",delayIndex=0,bounds=null){
    if(!this.scene||!this.scene.tweens||!actor) return;
    const delay=delayIndex*70;
    const base={targets:actor,delay,ease:"Sine.easeInOut",yoyo:true,repeat:-1};
    const safeX=value=>bounds?this.clamp(value,bounds.left,bounds.right):value;
    const safeY=value=>bounds?this.clamp(value,bounds.top,bounds.bottom):value;
    if(["wave","celebrate","pop","surprised"].includes(motion)) this.scene.tweens.add({...base,angle:{from:-2,to:2},y:safeY(actor.y-3),duration:620});
    else if(["walk","sweep"].includes(motion)) this.scene.tweens.add({...base,x:safeX(actor.x+8),duration:1150});
    else if(motion==="fall") this.scene.tweens.add({...base,y:safeY(actor.y+8),angle:5,duration:850});
    else if(["float","thinking","reading","point","glow","sway"].includes(motion)) this.scene.tweens.add({...base,y:safeY(actor.y-3),duration:1100});
    else this.scene.tweens.add({...base,y:safeY(actor.y-2),duration:1400});
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
