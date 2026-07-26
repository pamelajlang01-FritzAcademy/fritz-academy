/* Fritz Academy Production Environment Render Fix v50.30 */
(function(){
  "use strict";

  if(!window.IllustrationEngine||!window.IllustrationEngine.prototype) return;

  const proto=window.IllustrationEngine.prototype;

  proto.ensureAssets=function(config={},done){
    const entries=this.textureEntries(config);
    const missing=entries.filter(entry=>!this.scene.textures.exists(entry.key));
    if(!missing.length){ done(); return; }

    let completed=false;
    const finish=()=>{
      if(completed) return;
      completed=true;
      done();
    };

    missing.forEach(entry=>{
      console.info("[Fritz Academy] Loading scene asset",entry.key,entry.src);
      if(entry.type==="environment"&&/\.svg(?:\?|$)/i.test(entry.src)){
        this.scene.load.svg(entry.key,entry.src,{width:1280,height:720});
      }else{
        this.scene.load.image(entry.key,entry.src);
      }
    });

    this.scene.load.once("complete",finish);
    this.scene.load.on("loaderror",file=>{
      console.error("[Fritz Academy] Scene asset failed to load",file&&file.key,file&&file.src);
    });
    this.scene.load.start();
  };

  proto.drawScene=function(objects,text,options={}){
    const x=Number(options.x)||0;
    const y=Number(options.y)||-92;
    const width=Number(options.width)||620;
    const height=Number(options.height)||250;
    const config=options.scene||{};
    const environmentId=config.environment||options.environment||"";
    const env=this.environment(environmentId);
    const innerWidth=width-10;
    const innerHeight=height-10;
    const left=x-innerWidth/2;
    const right=x+innerWidth/2;
    const top=y-innerHeight/2;
    const bottom=y+innerHeight/2;

    objects.push(this.scene.add.rectangle(x,y,width,height,0xffffff,1).setDepth(0));

    const environmentKey=env?`fa-env-${env.id}`:"";
    if(env&&environmentKey&&this.scene.textures.exists(environmentKey)){
      const bg=this.scene.add.image(x,y,environmentKey).setDepth(1);
      bg.setDisplaySize(innerWidth,innerHeight);
      objects.push(bg);
      console.info("[Fritz Academy] Environment rendered",env.id,env.src);
    }else{
      objects.push(this.scene.add.rectangle(x,y,innerWidth,innerHeight,0xeaf3ff,1).setDepth(1));
      const missingLabel=environmentId?`Artwork unavailable: ${environmentId}`:"Scene artwork unavailable";
      objects.push(this.scene.add.text(x,y,missingLabel,{fontFamily:"Arial",fontSize:"18px",fontStyle:"bold",color:"#174ea6",align:"center",wordWrap:{width:innerWidth-40}}).setOrigin(.5).setDepth(2));
      console.error("[Fritz Academy] Environment texture unavailable",environmentId,environmentKey,env&&env.src);
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
      let key="";
      let scale=.75;
      let avatarId="";

      if(id==="student"){
        const avatar=this.studentAvatar();
        if(!avatar){
          console.warn("[Fritz Academy] Scene requests the student avatar, but the active student has no valid avatar.");
          return;
        }
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
      const halfW=actorWidth/2;
      const halfH=actorHeight/2;
      const actorX=this.clamp(x+(Number(spec.x)||0)*width,left+halfW+18,right-halfW-18);
      const actorY=this.clamp(y+height*.16+(Number(spec.y)||0)*height,top+halfH+18,bottom-halfH-48);
      const actor=this.scene.add.image(actorX,actorY,key).setDepth(8+index);
      actor.setDisplaySize(actorWidth,actorHeight);
      objects.push(actor);
      this.applyMotion(actor,spec.motion||"idle",index);
    });

    objects.push(this.scene.add.rectangle(x,y,width,height,0xffffff,0).setStrokeStyle(5,0x174ea6).setDepth(40));
    if(typeof options.onReady==="function") options.onReady();
  };

  console.info("[Fritz Academy] Production environment render fix v50.30 active.");
})();