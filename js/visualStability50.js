/* Fritz Academy visual stability patch v50.0 */
(function(){
  "use strict";
  function clamp(v,min,max){ return Math.min(max,Math.max(min,v)); }
  function cleanTexture(engine,key){
    const scene=engine.scene,cleanKey=`${key}-clean`;
    if(scene.textures.exists(cleanKey)) return cleanKey;
    const texture=scene.textures.get(key),source=texture&&texture.getSourceImage&&texture.getSourceImage();
    if(!source||!source.width||!source.height) return key;
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
  }
  function addBackground(scene,objects,x,y,w,h,id){
    const palette={"academy-front":[0x9bdcff,0x8bd06f,0xf7d08a],"welcome-garden":[0xb8e8ff,0x79c96a,0xffd76b],"reading-room":[0xffefd2,0xd7a86e,0x8f5f3b],classroom:[0xe8f3ff,0xc7d8ee,0x59789e],"music-room":[0xffe8f2,0xd8b6df,0x7a4c83],playground:[0xa9e0ff,0x8bd06f,0xf4a261],campus:[0xb6e7ff,0x7bc86b,0xf6cf74]}[id]||[0xb6e7ff,0x7bc86b,0xf6cf74];
    objects.push(scene.add.rectangle(x,y-h*.14,w,h*.72,palette[0]).setDepth(1),scene.add.rectangle(x,y+h*.30,w,h*.38,palette[1]).setDepth(1));
    if(id==="reading-room"||id==="classroom"||id==="music-room"){
      objects.push(scene.add.rectangle(x-w*.30,y-h*.12,w*.22,h*.32,0xbfe9ff).setStrokeStyle(5,palette[2]).setDepth(2),scene.add.rectangle(x+w*.29,y+h*.02,w*.18,h*.42,palette[2]).setDepth(2));
      objects.push(scene.add.text(x+w*.27,y-h*.03,id==="music-room"?"♪  ♫":"BOOKS",{fontSize:id==="music-room"?"42px":"18px",fontStyle:"bold",color:"#5a3166"}).setOrigin(.5).setDepth(3));
    }else{
      objects.push(scene.add.circle(x+w*.34,y-h*.28,22,palette[2]).setDepth(2),scene.add.ellipse(x,y+h*.30,w*.30,h*.34,0xd9c39f).setDepth(2),scene.add.circle(x-w*.34,y-h*.02,35,0x3d9148).setDepth(2),scene.add.rectangle(x-w*.34,y+h*.13,14,70,0x80552f).setDepth(2));
      if(id==="academy-front") objects.push(scene.add.rectangle(x+w*.18,y+h*.03,w*.28,h*.42,0xf3e1ba).setStrokeStyle(4,0x6f4b2e).setDepth(2),scene.add.rectangle(x+w*.18,y+h*.13,w*.07,h*.20,0x7b4a2f).setDepth(3));
      else objects.push(scene.add.text(x+w*.23,y+h*.05,"GARDEN",{fontSize:"18px",fontStyle:"bold",color:"#2c6b36"}).setOrigin(.5).setDepth(3));
    }
  }
  if(typeof IllustrationEngine!=="undefined"){
    IllustrationEngine.prototype.drawScene=function(objects,text,options={}){
      const x=Number(options.x)||0,y=Number(options.y)||-92,w=Number(options.width)||620,h=Number(options.height)||250,config=options.scene||{},env=this.environment(config.environment||options.environment||"campus");
      const frame=this.scene.add.rectangle(x,y,w,h,0xffffff,1).setStrokeStyle(5,0x174ea6).setDepth(0);objects.push(frame);addBackground(this.scene,objects,x,y,w-8,h-8,env?env.id:"campus");
      const maskShape=this.scene.make.graphics({x:0,y:0,add:false});maskShape.fillStyle(0xffffff).fillRect(x-w/2+4,y-h/2+4,w-8,h-8);const mask=maskShape.createGeometryMask();
      (config.props||[]).forEach((spec,index)=>{const prop=this.makeProp(spec,x,y,w,h,index);if(prop){prop.setMask(mask);objects.push(prop);this.applyMotion(prop,spec.motion||"idle",12+index);}});
      (config.characters||[]).forEach((spec,index)=>{const id=typeof spec==="string"?spec:spec.id;let key="",scale=.75;if(id==="student"){const a=this.studentAvatar();if(!a)return;key=`fa-avatar-${a.id}`;scale=Number(spec.scale)||.72;}else{const c=this.character(id);if(!c)return;key=`fa-char-${id}`;scale=Number(spec.scale)||c.scale||1;}if(!this.scene.textures.exists(key))return;key=cleanTexture(this,key);const actorX=clamp(x+(Number(spec.x)||0)*w,x-w*.40,x+w*.40),actorY=clamp(y+h*.23+(Number(spec.y)||0)*h,y-h*.23,y+h*.27),actor=this.scene.add.image(actorX,actorY,key).setDepth(8+index).setMask(mask),baseHeight=Math.min(h*.54*scale,h*.68);actor.setDisplaySize(baseHeight*.64,baseHeight);objects.push(actor);this.applyMotion(actor,spec.motion||"idle",index);});
      objects.push(this.scene.add.text(x,y+h*.39,options.label||config.caption||text||"Fritz Academy Story Scene",{fontSize:"16px",fontStyle:"bold",color:"#102342",backgroundColor:"rgba(255,255,255,.94)",padding:{x:10,y:5},align:"center",wordWrap:{width:w*.84}}).setOrigin(.5).setDepth(30));if(typeof options.onReady==="function")options.onReady();
    };
    IllustrationEngine.prototype.applyMotion=function(actor,motion="idle",delayIndex=0){if(!this.scene||!this.scene.tweens||!actor)return;const delay=delayIndex*70,duration=900+delayIndex*25;if(["wave","celebrate","surprised","pop"].includes(motion))this.scene.tweens.add({targets:actor,delay,angle:{from:-2,to:2},scaleX:actor.scaleX*1.025,scaleY:actor.scaleY*1.025,duration:620,yoyo:true,repeat:-1,ease:"Sine.easeInOut"});else if(["walk","sweep","building","point","reading","thinking"].includes(motion))this.scene.tweens.add({targets:actor,delay,angle:{from:-1,to:1},duration,yoyo:true,repeat:-1,ease:"Sine.easeInOut"});else this.scene.tweens.add({targets:actor,delay,scaleY:actor.scaleY*1.012,duration:1300,yoyo:true,repeat:-1,ease:"Sine.easeInOut"});};
  }
})();