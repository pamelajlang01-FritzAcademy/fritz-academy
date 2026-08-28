/* Fritz Academy Builder Engine v52.0.0
   Polished visual build board, persistent placements, strict required-piece completion. */
class BuilderEngine{
  constructor(scene,lessonEngine){this.scene=scene;this.lessonEngine=lessonEngine;this.lesson=null;this.build=null;this.selectedPieceId="";this.onComplete=null;}
  start(lesson,onComplete){this.lesson=lesson;this.build=lesson&&lesson.build;this.selectedPieceId="";this.onComplete=onComplete;if(!this.build||!Array.isArray(this.build.requiredPieces)||!this.build.requiredPieces.length){this.scene.panels.message("Build Area Missing","This adventure does not contain a complete Builder activity.");return;}this.lessonEngine.setSection("build");this.ensureSaveData();this.showBuilder();}
  ensureSaveData(){const s=this.scene.save;s.placedBuilds=s.placedBuilds||{};s.placedBuilds[this.build.areaId]=s.placedBuilds[this.build.areaId]||{};s.placedBuilds[this.build.areaId][this.build.stage]=s.placedBuilds[this.build.areaId][this.build.stage]||{};saveGame(s);}
  placements(){return this.scene.save.placedBuilds[this.build.areaId][this.build.stage];}
  earnedPieces(){const p=this.lessonEngine.progress();return p&&Array.isArray(p.earnedPieces)?p.earnedPieces:[];}
  sources(){return [this.lesson.feelingsActivity,this.lesson.story,this.lesson.phonics,this.lesson.reader1,this.lesson.reader2];}
  findPiece(id){for(const src of this.sources()){if(src&&src.rewardPiece&&src.rewardPiece.id===id)return src.rewardPiece;}return{id,name:id,icon:"⭐"};}
  pieceInSlot(i){const p=this.placements();return Object.keys(p).find(id=>p[id]===i)||"";}
  isPlaced(id){return Object.prototype.hasOwnProperty.call(this.placements(),id);}
  addLabel(objects,x,y,text,style={}){const t=this.scene.add.text(x,y,text,Object.assign({fontSize:"18px",fontStyle:"bold",color:"#102342",align:"center",wordWrap:{width:180}},style)).setOrigin(.5);objects.push(t);return t;}
  addCard(objects,x,y,w,h,fill,stroke=0xD2B66A){const r=this.scene.add.rectangle(x,y,w,h,fill,1).setStrokeStyle(3,stroke,1);objects.push(r);return r;}
  showBuilder(){const earned=this.earnedPieces(),required=this.build.requiredPieces,placedCount=required.filter(id=>this.isPlaced(id)).length,allEarned=required.every(id=>earned.includes(id)),objects=[];
    const board=this.scene.add.rectangle(0,5,840,590,0xF8F1DB,1).setStrokeStyle(5,0xC89A3A,1);objects.push(board);
    this.addLabel(objects,0,-262,this.build.title||"Build Your Academy",{fontSize:"30px",color:"#19365F",wordWrap:{width:720}});
    this.addLabel(objects,0,-225,`Builder Progress  ${placedCount}/${required.length}`,{fontSize:"18px",color:"#6B5428"});
    const barBack=this.scene.add.rectangle(0,-198,560,16,0xE5DCC5,1);objects.push(barBack);const ratio=required.length?placedCount/required.length:0;if(ratio>0){const bar=this.scene.add.rectangle(-280+(560*ratio)/2,-198,560*ratio,16,0xD8A83B,1);objects.push(bar);}
    this.addLabel(objects,0,-170,allEarned?(this.selectedPieceId?"Now choose a glowing build spot.":"Choose a piece from your Builder Pack."):"Finish the adventure activities to collect every piece.",{fontSize:"16px",color:allEarned?"#174EA6":"#A3472F",wordWrap:{width:700}});
    const slots=[[-250,-55],[0,-55],[250,-55],[-125,80],[125,80]];
    required.forEach((id,i)=>{const [x,y]=slots[i]||[-250+(i%3)*250,-55+Math.floor(i/3)*135],placedId=this.pieceInSlot(i),piece=placedId?this.findPiece(placedId):null;this.addCard(objects,x,y,205,112,piece?0xEAF6E8:(this.selectedPieceId?0xFFF4C4:0xFFFFFF),piece?0x67A866:(this.selectedPieceId?0xE1AF32:0xC7B98E));
      const icon=this.scene.add.text(x,y-19,piece?(piece.icon||"⭐"):"＋",{fontSize:piece?"40px":"35px",color:"#6B5428"}).setOrigin(.5).setInteractive({useHandCursor:true});icon.on("pointerup",()=>this.placeSelected(i));objects.push(icon);
      this.addLabel(objects,x,y+30,piece?piece.name:`Build Spot ${i+1}`,{fontSize:piece?"15px":"16px",color:piece?"#245C32":"#7A6A45",wordWrap:{width:175}});
    });
    this.addLabel(objects,0,154,"BUILDER PACK",{fontSize:"17px",color:"#6B5428"});
    const unplaced=required.filter(id=>earned.includes(id)&&!this.isPlaced(id)),packX=unplaced.length<=1?[0]:unplaced.length===2?[-160,160]:[-280,-140,0,140,280];
    if(!unplaced.length)this.addLabel(objects,0,205,allEarned?"All earned pieces are on the board.":"Pieces appear here as you earn them.",{fontSize:"15px",color:"#7A6A45"});
    unplaced.forEach((id,i)=>{const p=this.findPiece(id),selected=this.selectedPieceId===id,x=packX[i]||0;this.addCard(objects,x,210,125,84,selected?0xF9D86A:0xFFFFFF,selected?0xB78318:0xD6C79B);const c=this.scene.add.text(x,195,p.icon||"⭐",{fontSize:"31px"}).setOrigin(.5).setInteractive({useHandCursor:true});c.on("pointerup",()=>{this.selectedPieceId=id;this.showBuilder();});objects.push(c);const n=this.scene.add.text(x,229,p.name,{fontSize:"12px",fontStyle:"bold",color:"#19365F",align:"center",wordWrap:{width:108}}).setOrigin(.5).setInteractive({useHandCursor:true});n.on("pointerup",()=>{this.selectedPieceId=id;this.showBuilder();});objects.push(n);});
    const complete=this.isComplete();const action=this.scene.panels.makeButton(0,278,complete?"Finish This Build":"Place Every Piece",()=>{if(complete)this.completeBuild();},{fontSize:"20px",backgroundColor:complete?"#F6C744":"#E5E0D3",padding:{x:28,y:10}});objects.push(action);this.scene.panels.open(objects,{width:930,height:700});}
  placeSelected(slotIndex){if(!this.selectedPieceId)return;const earned=this.earnedPieces();if(!earned.includes(this.selectedPieceId))return;const placements=this.placements(),occupying=this.pieceInSlot(slotIndex);if(occupying)delete placements[occupying];placements[this.selectedPieceId]=slotIndex;this.selectedPieceId="";saveGame(this.scene.save);this.showBuilder();}
  isComplete(){const p=this.placements();return this.build.requiredPieces.every(id=>Object.prototype.hasOwnProperty.call(p,id));}
  completeBuild(){if(!this.isComplete())return;const s=this.scene.save;s.academyBuilds=s.academyBuilds||{};s.academyBuilds[this.build.areaId]=Math.max(s.academyBuilds[this.build.areaId]||0,this.build.stage);saveGame(s);const objects=[];this.addCard(objects,0,0,700,380,0xFFF8DF,0xD3A83E);this.addLabel(objects,0,-125,"BUILD COMPLETE!",{fontSize:"37px",color:"#2F7D32"});const sparkle=this.scene.add.text(0,-55,"🏡 ✨ ⭐",{fontSize:"54px"}).setOrigin(.5);objects.push(sparkle);this.addLabel(objects,0,38,this.build.completionMessage||"Your new Academy section has been saved.",{fontSize:"23px",color:"#19365F",wordWrap:{width:590}});const cont=this.scene.panels.makeButton(0,132,"Continue the Adventure",()=>this.finish(),{fontSize:"20px",backgroundColor:"#F6C744"});objects.push(cont);this.scene.panels.open(objects,{width:780,height:500});}
  finish(){const cb=this.onComplete;this.onComplete=null;if(typeof cb==="function")cb();}
}
window.BuilderEngine=BuilderEngine;