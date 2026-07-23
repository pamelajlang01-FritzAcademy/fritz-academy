/* Fritz Academy Illustration Engine v46.0 */
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

  preloadSceneAssets(config={}){
    if(!this.scene||!this.scene.load) return;
    const env=this.environment(config.environment||"campus");
    if(env&&!this.scene.textures.exists(`fa-env-${env.id}`)) this.scene.load.image(`fa-env-${env.id}`,env.src);
    (config.characters||[]).forEach(entry=>{
      const id=typeof entry==="string"?entry:entry.id;
      const c=this.character(id);
      if(c&&!this.scene.textures.exists(`fa-char-${id}`)) this.scene.load.image(`fa-char-${id}`,c.primary||c.fallback);
    });
    if(config.includeStudent){
      const avatar=this.studentAvatar();
      if(avatar&&!this.scene.textures.exists(`fa-avatar-${avatar.id}`)) this.scene.load.image(`fa-avatar-${avatar.id}`,avatar.src);
    }
  }

  addScene(objects,text,options={}){
    const x=Number(options.x)||0;
    const y=Number(options.y)||-92;
    const width=Number(options.width)||620;
    const height=Number(options.height)||250;
    const config=options.scene||{};
    const env=this.environment(config.environment||options.environment||"campus");

    const frame=this.scene.add.rectangle(x,y,width,height,0xffffff,1).setStrokeStyle(5,0x174ea6);
    objects.push(frame);

    if(env){
      const key=`fa-runtime-env-${env.id}`;
      const image=this.scene.add.image(x,y,env.src).setDisplaySize(width-8,height-8);
      image.setCrop(0,0,image.width||width,image.height||height);
      objects.push(image);
    } else {
      objects.push(this.scene.add.rectangle(x,y,width-8,height-8,0xdff2ff,1));
    }

    const actorSpecs=Array.isArray(config.characters)&&config.characters.length
      ? config.characters
      : [{id:"fritz",x:-0.20},{id:"bash",x:0.05},{id:"bear",x:0.27}];

    actorSpecs.forEach((spec,index)=>{
      const id=typeof spec==="string"?spec:spec.id;
      const c=this.character(id);
      if(!c) return;
      const actorX=x+(Number(spec.x)||(-0.24+index*0.24))*width;
      const actorY=y+height*0.24+(Number(spec.y)||0);
      const actor=this.scene.add.image(actorX,actorY,c.primary||c.fallback);
      const baseHeight=height*0.58*(Number(spec.scale)||c.scale||1);
      actor.setDisplaySize(baseHeight*0.62,baseHeight).setDepth(5+index);
      objects.push(actor);
      this.applyMotion(actor,spec.motion||"idle",index);
    });

    if(config.includeStudent){
      const avatar=this.studentAvatar();
      if(avatar){
        const actor=this.scene.add.image(x-width*0.34,y+height*0.24,avatar.src).setDisplaySize(height*0.36,height*0.54).setDepth(7);
        objects.push(actor);
        this.applyMotion(actor,"idle",9);
      }
    }

    const caption=this.scene.add.text(x,y+height*0.39,options.label||config.caption||"Fritz Academy Story Scene",{
      fontSize:"16px",fontStyle:"bold",color:"#102342",backgroundColor:"rgba(255,255,255,.94)",padding:{x:10,y:5},align:"center",wordWrap:{width:width*0.82}
    }).setOrigin(0.5).setDepth(20);
    objects.push(caption);
  }

  applyMotion(actor,motion="idle",delayIndex=0){
    if(!this.scene||!this.scene.tweens||!actor) return;
    const delay=delayIndex*110;
    if(motion==="wave"||motion==="celebrate"){
      this.scene.tweens.add({targets:actor,angle:{from:-2,to:2},y:actor.y-8,duration:520,yoyo:true,repeat:-1,delay,ease:"Sine.easeInOut"});
    } else if(motion==="walk"){
      this.scene.tweens.add({targets:actor,x:actor.x+28,duration:1200,yoyo:true,repeat:-1,delay,ease:"Sine.easeInOut"});
    } else {
      this.scene.tweens.add({targets:actor,y:actor.y-5,scaleX:actor.scaleX*1.01,scaleY:actor.scaleY*1.01,duration:1300,yoyo:true,repeat:-1,delay,ease:"Sine.easeInOut"});
    }
  }

  validateScene(config={}){
    const errors=[];
    if(!this.environment(config.environment||"campus")) errors.push("Unknown environment");
    (config.characters||[]).forEach(spec=>{
      const id=typeof spec==="string"?spec:spec.id;
      if(!this.character(id)) errors.push(`Unknown character: ${id}`);
    });
    return {valid:errors.length===0,errors};
  }
}
window.IllustrationEngine=IllustrationEngine;