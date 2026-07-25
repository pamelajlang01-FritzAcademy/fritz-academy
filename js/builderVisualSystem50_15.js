/* Fritz Academy Builder Visual System v50.15 */
(function(){
  "use strict";
  if(typeof BuilderEngine==="undefined") return;

  const COLORS={navy:0x102342,blue:0x174ea6,gold:0xf6c744,cream:0xfffbef,green:0x4f9b58,soil:0x8b5a2b,wood:0xb97843,sky:0xdff2ff};

  BuilderEngine.prototype.makeVisualPiece=function(piece,x,y,scale=1){
    const id=String(piece&&piece.id||"").toLowerCase();
    const name=String(piece&&piece.name||id).toLowerCase();
    const key=`${id} ${name}`;
    const c=this.scene.add.container(x,y).setScale(scale);
    const g=this.scene.add.graphics();
    c.add(g);

    if(/flower|garden/.test(key)){
      g.fillStyle(COLORS.green,1).fillRect(-4,-2,8,32);
      [[-20,-18,0xf26b7a],[0,-25,0xf6c744],[20,-18,0x8b6edb]].forEach(([px,py,color])=>{
        g.fillStyle(color,1).fillCircle(px,py,11); g.fillCircle(px-8,py+4,8); g.fillCircle(px+8,py+4,8);
        g.fillStyle(0xffe7a8,1).fillCircle(px,py,5);
      });
      g.fillStyle(COLORS.soil,1).fillRoundedRect(-34,24,68,16,7);
    }else if(/tree/.test(key)){
      g.fillStyle(COLORS.wood,1).fillRoundedRect(-8,3,16,38,5);
      g.fillStyle(0x62a85e,1).fillCircle(0,-18,31); g.fillCircle(-20,-3,22); g.fillCircle(20,-3,22);
    }else if(/bench/.test(key)){
      g.fillStyle(COLORS.wood,1).fillRoundedRect(-38,-14,76,13,4).fillRoundedRect(-38,5,76,13,4);
      g.fillRect(-29,18,7,24).fillRect(22,18,7,24);
    }else if(/gate|door/.test(key)){
      g.lineStyle(5,COLORS.wood,1).strokeRoundedRect(-32,-40,64,82,5);
      for(let px=-20;px<=20;px+=20) g.strokeLineShape(new Phaser.Geom.Line(px,-38,px,40));
      g.fillStyle(COLORS.gold,1).fillCircle(20,2,4);
    }else if(/sign|name/.test(key)){
      g.fillStyle(COLORS.wood,1).fillRoundedRect(-42,-30,84,45,8).fillRect(-5,15,10,34);
      const t=this.scene.add.text(0,-8,(piece.name||"SIGN").toUpperCase(),{fontFamily:"Arial",fontSize:"11px",fontStyle:"bold",color:"#ffffff",align:"center",wordWrap:{width:74}}).setOrigin(.5);
      c.add(t);
    }else if(/book/.test(key)){
      g.fillStyle(0x3d78c5,1).fillRoundedRect(-35,-28,32,56,5).fillRoundedRect(3,-28,32,56,5);
      g.lineStyle(3,0xffffff,1).strokeLineShape(new Phaser.Geom.Line(0,-25,0,26));
    }else if(/backpack|bag/.test(key)){
      g.fillStyle(0xe78b3a,1).fillRoundedRect(-27,-30,54,65,14);
      g.lineStyle(5,0x9c5527,1).strokeArc(0,-29,18,Math.PI,0,false);
      g.fillStyle(0xf7b45f,1).fillRoundedRect(-19,4,38,20,7);
    }else if(/path|stone|brick/.test(key)){
      [-28,0,28].forEach((px,i)=>g.fillStyle(i%2?0xb9b3a8:0xd0c9bc,1).fillRoundedRect(px-15,-18+(i%2)*12,30,25,6));
    }else if(/window/.test(key)){
      g.fillStyle(0x9ed8f3,1).fillRect(-31,-31,62,62); g.lineStyle(6,0xffffff,1).strokeRect(-31,-31,62,62);
      g.strokeLineShape(new Phaser.Geom.Line(0,-30,0,30)); g.strokeLineShape(new Phaser.Geom.Line(-30,0,30,0));
    }else if(/roof/.test(key)){
      g.fillStyle(0xc94d45,1).fillTriangle(-42,28,0,-35,42,28);
    }else{
      g.fillStyle(0x7bb5e8,1).fillRoundedRect(-31,-31,62,62,12);
      const fallback=this.scene.add.text(0,0,piece.icon||"★",{fontSize:"34px"}).setOrigin(.5);
      c.add(fallback);
    }
    return c;
  };

  BuilderEngine.prototype.showBuilder=function(){
    const earned=this.earnedPieces();
    const required=this.build.requiredPieces;
    const allEarned=required.every(id=>earned.includes(id));
    const objects=[];

    const title=this.scene.add.text(0,-290,this.build.title||"Build Your Academy",{fontSize:"34px",fontStyle:"bold",color:"#102342",align:"center",wordWrap:{width:820}}).setOrigin(.5);
    const directions=this.scene.add.text(0,-250,allEarned?"Choose a piece from your Builder Pack, then choose a glowing build spot.":"Complete the lesson activities to earn every building piece.",{fontSize:"19px",fontStyle:"bold",color:allEarned?"#174ea6":"#b5462d",align:"center",wordWrap:{width:820}}).setOrigin(.5);
    objects.push(title,directions);

    const board=this.scene.add.rectangle(0,-50,820,340,COLORS.sky,1).setStrokeStyle(5,COLORS.blue).setDepth(0);
    const ground=this.scene.add.rectangle(0,75,810,85,0x8fcf72,1).setDepth(1);
    const boardLabel=this.scene.add.text(-382,-198,"BUILD SPACE",{fontSize:"17px",fontStyle:"bold",color:"#174ea6"}).setOrigin(0,.5).setDepth(2);
    objects.push(board,ground,boardLabel);

    const slots=[[-275,-105],[-92,-105],[92,-105],[275,-105],[-185,65],[0,65],[185,65]];
    required.forEach((pieceId,index)=>{
      const [sx,sy]=slots[index]||[0,65];
      const placedId=this.pieceInSlot(index);
      const selected=Boolean(this.selectedPieceId);
      const pad=this.scene.add.rectangle(sx,sy,150,120,0xffffff,placedId?.12:(selected?.9:.58)).setStrokeStyle(selected&&!placedId?5:3,selected&&!placedId?COLORS.gold:COLORS.blue).setDepth(2).setInteractive({useHandCursor:true});
      pad.on("pointerdown",()=>this.placeSelected(index));
      objects.push(pad);
      if(placedId){
        const piece=this.findPiece(placedId);
        const visual=this.makeVisualPiece(piece,sx,sy-8,.78).setDepth(4);
        const label=this.scene.add.text(sx,sy+45,piece.name,{fontSize:"14px",fontStyle:"bold",color:"#102342",align:"center",wordWrap:{width:135}}).setOrigin(.5).setDepth(5);
        objects.push(visual,label);
      }else{
        const plus=this.scene.add.text(sx,sy-5,"+",{fontSize:"42px",fontStyle:"bold",color:selected?"#c29200":"#174ea6"}).setOrigin(.5).setDepth(3);
        const spot=this.scene.add.text(sx,sy+35,`Build Spot ${index+1}`,{fontSize:"14px",fontStyle:"bold",color:"#46566f"}).setOrigin(.5).setDepth(3);
        objects.push(plus,spot);
      }
    });

    const tray=this.scene.add.rectangle(0,195,820,145,COLORS.cream,1).setStrokeStyle(4,COLORS.gold).setDepth(0);
    const trayLabel=this.scene.add.text(-382,142,"BUILDER PACK",{fontSize:"18px",fontStyle:"bold",color:"#102342"}).setOrigin(0,.5).setDepth(2);
    objects.push(tray,trayLabel);

    const unplaced=required.filter(id=>earned.includes(id)&&!this.isPlaced(id));
    const xs=unplaced.length<=1?[0]:unplaced.length===2?[-150,150]:unplaced.length===3?[-230,0,230]:[-300,-100,100,300];
    unplaced.slice(0,4).forEach((pieceId,index)=>{
      const piece=this.findPiece(pieceId); const selected=this.selectedPieceId===pieceId; const px=xs[index]||0;
      const card=this.scene.add.rectangle(px,210,170,88,selected?COLORS.gold:0xffffff,1).setStrokeStyle(selected?5:3,selected?0xb88700:COLORS.blue).setDepth(2).setInteractive({useHandCursor:true});
      card.on("pointerdown",()=>{this.selectedPieceId=pieceId;this.showBuilder();});
      const visual=this.makeVisualPiece(piece,px-52,205,.46).setDepth(3);
      const label=this.scene.add.text(px+22,205,piece.name,{fontSize:"15px",fontStyle:"bold",color:"#102342",align:"center",wordWrap:{width:100}}).setOrigin(.5).setDepth(4);
      objects.push(card,visual,label);
    });
    if(!unplaced.length){
      objects.push(this.scene.add.text(0,205,"All earned pieces are on the build board.",{fontSize:"18px",fontStyle:"bold",color:"#2f7d32"}).setOrigin(.5));
    }

    const complete=this.isComplete();
    const action=this.scene.panels.makeButton(0,300,complete?"Finish This Build":"Place Every Piece",()=>{if(complete)this.completeBuild();},{fontSize:"22px",backgroundColor:complete?"#f6c744":"#e6e6e6",padding:{x:26,y:10}});
    objects.push(action);
    this.scene.panels.open(objects,{width:960,height:760});
  };
})();