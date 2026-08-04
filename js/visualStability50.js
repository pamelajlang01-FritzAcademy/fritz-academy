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
  if(typeof IllustrationEngine!=="undefined"){
    const originalDraw=IllustrationEngine.prototype.drawScene;
    IllustrationEngine.prototype.drawScene=function(objects,text,options={}){
      originalDraw.call(this,objects,text,options);
      const x=Number(options.x)||0,y=Number(options.y)||-92,w=Number(options.width)||620,h=Number(options.height)||250;
      const maskShape=this.scene.make.graphics({x:0,y:0,add:false});maskShape.fillStyle(0xffffff).fillRect(x-w/2+4,y-h/2+4,w-8,h-8);const mask=maskShape.createGeometryMask();
      objects.forEach(obj=>{if(obj&&obj.texture&&obj.setMask){const key=obj.texture.key;if(key&&(/^fa-char-|^fa-avatar-/.test(key))){const cleanKey=cleanTexture(this,key);if(cleanKey!==key)obj.setTexture(cleanKey);obj.setMask(mask);obj.x=clamp(obj.x,x-w*.40,x+w*.40);obj.y=clamp(obj.y,y-h*.23,y+h*.27);}}});
    };
  }
})();