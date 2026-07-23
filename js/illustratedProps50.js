/* Fritz Academy illustrated story props v50.0 */
(function(){
  "use strict";
  if(typeof IllustrationEngine==="undefined") return;
  const labelKinds=/letters|banner|clue|direction|equation|number|row|spaces|plan|checklist|sign/i;
  IllustrationEngine.prototype.makeProp=function(spec,x,y,width,height,index){
    const scene=this.scene,kind=String(spec.kind||"prop"),scale=Number(spec.scale)||1;
    const container=scene.add.container(x+(Number(spec.x)||0)*width,y+(Number(spec.y)||0)*height).setDepth(5+index).setScale(scale);
    const add=o=>{container.add(o);return o;};
    const rect=(px,py,w,h,color,stroke=0x4b3828)=>add(scene.add.rectangle(px,py,w,h,color).setStrokeStyle(2,stroke));
    const circle=(px,py,r,color,stroke=0x4b3828)=>add(scene.add.circle(px,py,r,color).setStrokeStyle(2,stroke));
    const text=(value,size=18,color="#20314f")=>add(scene.add.text(0,0,value,{fontSize:`${size}px`,fontStyle:"bold",color,align:"center",backgroundColor:"rgba(255,255,255,.86)",padding:{x:5,y:3}}).setOrigin(.5));
    if(kind.includes("flower")||kind==="flowers")[-28,0,28].forEach((dx,i)=>{rect(dx,15,4,34,0x3d8d45,0x3d8d45);circle(dx,0,12,[0xffcf47,0xff77a8,0x9a7bff][i],0xffffff);circle(dx,0,4,0x70451f,0x70451f);});
    else if(kind.includes("tree")){rect(0,18,14,55,0x80522f);circle(0,-12,30,0x4da64e,0x317d38);circle(-22,0,20,0x5db85b,0x317d38);circle(22,0,20,0x5db85b,0x317d38);}
    else if(kind.includes("bench")){rect(0,8,75,12,0xa96b35);rect(0,-14,75,12,0xb97b42);rect(-26,28,8,32,0x5c4028);rect(26,28,8,32,0x5c4028);}
    else if(kind.includes("path")||kind.includes("stone"))[-32,0,32].forEach((dx,i)=>add(scene.add.ellipse(dx,(i%2)*10,38,22,0xb8b0a4).setStrokeStyle(2,0x777168)));
    else if(kind.includes("fence")){rect(0,-10,100,8,0xd3a264);rect(0,18,100,8,0xd3a264);[-42,0,42].forEach(dx=>rect(dx,5,10,70,0xd3a264));}
    else if(kind.includes("pond")||kind.includes("fish")){add(scene.add.ellipse(0,10,100,48,0x69c9ef).setStrokeStyle(3,0x287ca6));if(kind.includes("fish")){add(scene.add.triangle(-14,8,0,8,18,0,18,16,0xff9c45));add(scene.add.triangle(18,8,0,8,-15,0,-15,16,0xff9c45));}}
    else if(kind.includes("door")||kind.includes("gate")){rect(0,4,58,76,0xa96b45,0x684226);circle(17,7,4,0xf4d35e,0x8d6d15);}
    else if(kind.includes("backpack")){rect(0,8,58,60,0x3978b9,0x1e4c79);add(scene.add.arc(0,-20,24,180,360,false,0x6da6dc).setStrokeStyle(5,0x1e4c79));rect(0,18,38,18,0xf6c744,0x1e4c79);}
    else if(kind.includes("book")){rect(-18,0,34,46,0x3d78b8,0xffffff);rect(18,0,34,46,0x4d8acc,0xffffff);rect(0,0,3,46,0xffffff,0xffffff);}
    else if(kind.includes("map")){rect(0,0,76,54,0xf3e3aa,0x8b7040);add(scene.add.line(0,0,-28,12,28,-10,0x3d8d45).setLineWidth(4));circle(18,-10,5,0xd34c4c,0xd34c4c);}
    else if(kind.includes("arrow")){add(scene.add.triangle(14,0,-18,-14,-18,14,18,0,0xf6c744).setStrokeStyle(2,0x7a5b00));rect(-12,0,36,10,0xf6c744,0x7a5b00);}
    else if(kind.includes("butterfly")){add(scene.add.ellipse(-12,0,22,32,0xff77a8));add(scene.add.ellipse(12,0,22,32,0x9a7bff));rect(0,0,5,28,0x343434,0x343434);}
    else if(labelKinds.test(kind))text(kind.replace(/-/g," ").toUpperCase(),kind.length>16?12:16);
    else{rect(0,0,62,44,0xf2c36b,0x7c532f);text(kind.replace(/-/g," "),12,"#51361f");}
    container.setSize(110,90);return container;
  };
})();