/* Fritz Academy Illustration Engine v46.1 */
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

  textureEntries(config={}){
    const entries=[];
    const env=this.environment(config.environment||"campus");
    if(env) entries.push({key:`fa-env-${env.id}`,src:env.src});
    (config.characters||[]).forEach(spec=>{
      const id=typeof spec==="string"?spec:spec.id;
      if(id==="student"){
        const a=this.studentAvatar();
        if(a) entries.push({key:`fa-avatar-${a.id}`,src:a.src});
        return;
      }
      const c=this.character(id);
      if(c) entries.push({key:`fa-char-${id}`,src:c.primary||c.fallback});
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

    const frame=this.scene.add.rectangle(x,y,width,height,0xffffff,1).setStrokeStyle(5,0x174ea6).setDepth(0);
    objects.push(frame);

    if(env&&this.scene.textures.exists(`fa-env-${env.id}`)){
      const bg=this.scene.add.image(x,y,`fa-env-${env.id}`).setDisplaySize(width-8,height-8).setDepth(1);
      objects.push(bg);
    }else{
      objects.push(this.scene.add.rectangle(x,y,width-8,height-8,0xdff2ff,1).setDepth(1));
    }

    const shade=this.scene.add.rectangle(x,y+height*.32,width-8,height*.35,0x234a22,.16).setDepth(2);
    objects.push(shade);

    (config.props||[]).forEach((spec,index)=>{
      const prop=this.makeProp(spec,x,y,width,height,index);
      if(prop){ objects.push(prop); this.applyMotion(prop,spec.motion||"idle",12+index); }
    });

    (config.characters||[]).forEach((spec,index)=>{
      const id=typeof spec==="string"?spec:spec.id;
      let key=""; let scale=.75;
      if(id==="student"){
        const a=this.studentAvatar();
        if(!a) return;
        key=`fa-avatar-${a.id}`; scale=Number(spec.scale)||.72;
      }else{
        const c=this.character(id);
        if(!c) return;
        key=`fa-char-${id}`; scale=Number(spec.scale)||c.scale||1;
      }
      if(!this.scene.textures.exists(key)) return;
      const actorX=x+(Number(spec.x)||0)*width;
      const actorY=y+height*.24+(Number(spec.y)||0)*height;
      const actor=this.scene.add.image(actorX,actorY,key).setDepth(8+index);
      const baseHeight=height*.57*scale;
      actor.setDisplaySize(baseHeight*.64,baseHeight);
      objects.push(actor);
      this.applyMotion(actor,spec.motion||"idle",index);
    });

    const caption=this.scene.add.text(x,y+height*.39,options.label||config.caption||text||"Fritz Academy Story Scene",{
      fontSize:"16px",fontStyle:"bold",color:"#102342",backgroundColor:"rgba(255,255,255,.94)",padding:{x:10,y:5},align:"center",wordWrap:{width:width*.84}
    }).setOrigin(.5).setDepth(30);
    objects.push(caption);

    if(typeof options.onReady==="function") options.onReady();
  }

  makeProp(spec,x,y,width,height,index){
    const symbols={
      gate:"🏫",flag:"🚩",path:"🪨",speech:"💬","name-tag":"🏷️",sparkles:"✨",flowers:"🌼🌷",butterfly:"🦋","empty-bed":"🟫","flower-basket":"🧺🌷","young-tree":"🌳",question:"❓","backpack-outline":"◻️🎒",backpack:"🎒",thought:"💭",book:"📘",bench:"🪑",magnifier:"🔎",bush:"🌿",map:"🗺️","map-mark":"❌",idea:"💡",arrow:"➡️","garden-sign":"🪧"
    };
    const symbol=symbols[spec.kind]||"⭐";
    return this.scene.add.text(x+(Number(spec.x)||0)*width,y+(Number(spec.y)||0)*height,symbol,{
      fontSize:`${Math.round(42*(Number(spec.scale)||1))}px`,align:"center"
    }).setOrigin(.5).setDepth(5+index);
  }

  applyMotion(actor,motion="idle",delayIndex=0){
    if(!this.scene||!this.scene.tweens||!actor) return;
    const delay=delayIndex*90;
    const base={targets:actor,delay,ease:"Sine.easeInOut",yoyo:true,repeat:-1};
    if(["wave","celebrate","pop","surprised"].includes(motion)){
      this.scene.tweens.add({...base,angle:{from:-3,to:3},y:actor.y-8,duration:520});
    }else if(["walk","sweep"].includes(motion)){
      this.scene.tweens.add({...base,x:actor.x+30,duration:1250});
    }else if(motion==="fall"){
      this.scene.tweens.add({...base,y:actor.y+28,angle:12,duration:900});
    }else if(["float","thinking","reading","point","glow","sway"].includes(motion)){
      this.scene.tweens.add({...base,y:actor.y-7,duration:1150});
    }else{
      this.scene.tweens.add({...base,y:actor.y-4,duration:1450});
    }
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