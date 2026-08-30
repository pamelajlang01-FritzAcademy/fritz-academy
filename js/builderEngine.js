/* Fritz Academy Builder Engine v54.0.0
   Canonical Fritz art, persistent placements, strict completion, 960x640-safe layout. */
class BuilderEngine{
  constructor(scene,lessonEngine){this.scene=scene;this.lessonEngine=lessonEngine;this.lesson=null;this.build=null;this.selectedPieceId='';this.onComplete=null;}
  start(lesson,onComplete){
    this.lesson=lesson;this.build=lesson&&lesson.build;this.selectedPieceId='';this.onComplete=onComplete;
    if(!this.build||!Array.isArray(this.build.requiredPieces)||!this.build.requiredPieces.length){this.scene.panels.message('Build Area Missing','This adventure does not contain a complete Builder activity.');return;}
    this.lessonEngine.setSection('build');this.ensureSaveData();this.prepareVisuals(()=>this.showBuilder());
  }
  ensureSaveData(){const s=this.scene.save;s.placedBuilds=s.placedBuilds||{};s.placedBuilds[this.build.areaId]=s.placedBuilds[this.build.areaId]||{};s.placedBuilds[this.build.areaId][this.build.stage]=s.placedBuilds[this.build.areaId][this.build.stage]||{};saveGame(s);}
  placements(){return this.scene.save.placedBuilds[this.build.areaId][this.build.stage];}
  earnedPieces(){const p=this.lessonEngine.progress();return p&&Array.isArray(p.earnedPieces)?p.earnedPieces:[];}
  sources(){return [this.lesson.feelingsActivity,this.lesson.story,this.lesson.phonics,this.lesson.reader1,this.lesson.reader2];}
  findPiece(id){for(const src of this.sources()){if(src&&src.rewardPiece&&src.rewardPiece.id===id)return src.rewardPiece;}return{id,name:id,icon:'★'};}
  pieceInSlot(i){const p=this.placements();return Object.keys(p).find(id=>p[id]===i)||'';}
  isPlaced(id){return Object.prototype.hasOwnProperty.call(this.placements(),id);}
  assetKey(path){return 'builder-'+String(path||'').replace(/[^a-z0-9]+/gi,'-').toLowerCase();}
  assetPathForPiece(piece){return window.FRITZ_BUILDER_ASSETS&&window.FRITZ_BUILDER_ASSETS.piecePath?window.FRITZ_BUILDER_ASSETS.piecePath(piece):'';}
  areaAssetPath(){return window.FRITZ_BUILDER_ASSETS&&window.FRITZ_BUILDER_ASSETS.areaPath?window.FRITZ_BUILDER_ASSETS.areaPath(this.build.areaId):'';}
  prepareVisuals(done){
    const paths=[this.areaAssetPath(),...this.build.requiredPieces.map(id=>this.assetPathForPiece(this.findPiece(id)))].filter(Boolean);
    const unique=[...new Set(paths)],missing=unique.filter(path=>!this.scene.textures.exists(this.assetKey(path)));
    if(!missing.length){done();return;}
    let pending=missing.length,finished=false;const finish=()=>{pending--;if(pending<=0&&!finished){finished=true;done();}};
    missing.forEach(path=>{const key=this.assetKey(path),isSvg=/\.svg(?:\?|$)/i.test(path);this.scene.load.once(`filecomplete-${isSvg?'svg':'image'}-${key}`,finish);if(isSvg)this.scene.load.svg(key,path,{width:640,height:360});else this.scene.load.image(key,path);});
    this.scene.load.on('loaderror',file=>{if(file&&missing.some(path=>this.assetKey(path)===file.key))finish();});
    this.scene.load.start();
  }
  addLabel(objects,x,y,text,style={}){const t=this.scene.add.text(x,y,text,Object.assign({fontSize:'16px',fontStyle:'bold',color:'#102342',align:'center',wordWrap:{width:180}},style)).setOrigin(.5);objects.push(t);return t;}
  addCard(objects,x,y,w,h,fill,stroke=0xD2B66A,radius=16){const g=this.scene.add.graphics();g.fillStyle(fill,1);g.lineStyle(3,stroke,1);g.fillRoundedRect(x-w/2,y-h/2,w,h,radius);g.strokeRoundedRect(x-w/2,y-h/2,w,h,radius);objects.push(g);return g;}
  addArt(objects,path,x,y,maxW,maxH,interactiveCallback){if(!path)return null;const key=this.assetKey(path);if(!this.scene.textures.exists(key))return null;const image=this.scene.add.image(x,y,key).setOrigin(.5);const source=image.texture.getSourceImage();const w=source.width||image.width||1,h=source.height||image.height||1;image.setScale(Math.min(maxW/w,maxH/h,1));if(interactiveCallback){image.setInteractive({useHandCursor:true});image.on('pointerup',interactiveCallback);}objects.push(image);return image;}
  sceneTitle(){return (this.lesson&&this.lesson.reward)||'Academy Builder';}
  areaLabel(){return String(this.build.areaId||'academy-build').replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase());}
  showBuilder(){
    const earned=this.earnedPieces(),required=this.build.requiredPieces,placedCount=required.filter(id=>this.isPlaced(id)).length,allEarned=required.every(id=>earned.includes(id)),objects=[];
    const shell=this.scene.add.graphics();shell.fillStyle(0x102342,1);shell.fillRoundedRect(-445,-294,890,588,24);shell.fillStyle(0xF7F0DC,1);shell.fillRoundedRect(-428,-277,856,554,20);objects.push(shell);
    this.addLabel(objects,-270,-250,'FRITZ ACADEMY BUILDER',{fontSize:'15px',color:'#B78318',wordWrap:{width:300},align:'left'});
    this.addLabel(objects,-270,-219,this.build.title||'Build Your Academy',{fontSize:'27px',color:'#19365F',wordWrap:{width:390},align:'left'});
    this.addLabel(objects,-270,-190,`${this.areaLabel()} • Stage ${this.build.stage}`,{fontSize:'13px',color:'#6B5428',wordWrap:{width:350},align:'left'});
    const areaPath=this.areaAssetPath();this.addCard(objects,245,-214,300,122,0xDCECF4,0xB78318,18);this.addArt(objects,areaPath,245,-214,284,108);
    const barBack=this.scene.add.graphics();barBack.fillStyle(0xD9D0BA,1);barBack.fillRoundedRect(-395,-160,790,12,6);objects.push(barBack);if(required.length){const bar=this.scene.add.graphics();bar.fillStyle(0xD8A83B,1);bar.fillRoundedRect(-395,-160,790*(placedCount/required.length),12,6);objects.push(bar);}
    this.addLabel(objects,0,-137,`${placedCount}/${required.length} pieces placed`,{fontSize:'14px',color:'#46566F'});
    this.addLabel(objects,0,-112,allEarned?(this.selectedPieceId?'Choose a glowing build spot.':'Choose a piece from your Builder Pack.'):'Finish the adventure activities to unlock every build piece.',{fontSize:'14px',color:allEarned?'#174EA6':'#A3472F',wordWrap:{width:720}});
    const slots=[[-300,-38],[-150,-38],[0,-38],[150,-38],[300,-38]];
    required.forEach((id,i)=>{
      const [x,y]=slots[i]||[-300+(i%5)*150,-38+Math.floor(i/5)*95],placedId=this.pieceInSlot(i),piece=placedId?this.findPiece(placedId):null,ready=!!this.selectedPieceId;
      this.addCard(objects,x,y,132,112,piece?0xE8F3E6:(ready?0xFFF0AE:0xFCF9F1),piece?0x5E9F64:(ready?0xD39B1F:0xC8B98E),14);
      if(piece){const art=this.addArt(objects,this.assetPathForPiece(piece),x,y-12,92,62);if(!art)this.addLabel(objects,x,y-12,piece.icon||'★',{fontSize:'30px'});this.addLabel(objects,x,y+38,piece.name,{fontSize:'11px',color:'#245C32',wordWrap:{width:118}});}
      else{const target=this.scene.add.circle(x,y-10,27,ready?0xF7D364:0xEEE6D2,1).setStrokeStyle(3,ready?0xC18A16:0xC8B98E,1).setInteractive({useHandCursor:true});target.on('pointerup',()=>this.placeSelected(i));objects.push(target);this.addLabel(objects,x,y-10,ready?'＋':'•',{fontSize:'28px',color:ready?'#7A5610':'#9A8B66'});this.addLabel(objects,x,y+36,ready?'Place Here':`Spot ${i+1}`,{fontSize:'11px',color:ready?'#7A5610':'#7A6A45'});}
    });
    this.addLabel(objects,0,42,'BUILDER PACK',{fontSize:'14px',color:'#6B5428'});
    const unplaced=required.filter(id=>earned.includes(id)&&!this.isPlaced(id)),packX=unplaced.length<=1?[0]:unplaced.length===2?[-120,120]:[-280,-140,0,140,280];
    if(!unplaced.length)this.addLabel(objects,0,105,allEarned?'All pieces are on the build.':'Earned pieces appear here.',{fontSize:'14px',color:'#7A6A45'});
    unplaced.forEach((id,i)=>{const p=this.findPiece(id),selected=this.selectedPieceId===id,x=packX[i]||0,select=()=>{this.selectedPieceId=id;this.showBuilder();};this.addCard(objects,x,105,122,96,selected?0xF8D76A:0xFFFFFF,selected?0xB78318:0xD6C79B,13);const art=this.addArt(objects,this.assetPathForPiece(p),x,89,86,52,select);if(!art){const badge=this.scene.add.text(x,89,p.icon||'★',{fontSize:'27px'}).setOrigin(.5).setInteractive({useHandCursor:true});badge.on('pointerup',select);objects.push(badge);}const n=this.scene.add.text(x,132,p.name,{fontSize:'10px',fontStyle:'bold',color:'#19365F',align:'center',wordWrap:{width:106}}).setOrigin(.5).setInteractive({useHandCursor:true});n.on('pointerup',select);objects.push(n);});
    const complete=this.isComplete(),action=this.scene.panels.makeButton(0,222,complete?'Complete the Build':'Place Every Piece',()=>{if(complete)this.completeBuild();},{fontSize:'18px',backgroundColor:complete?'#F6C744':'#DAD3C2',padding:{x:24,y:8}});objects.push(action);
    this.scene.panels.open(objects,{width:920,height:610});
  }
  placeSelected(slotIndex){if(!this.selectedPieceId)return;const earned=this.earnedPieces();if(!earned.includes(this.selectedPieceId))return;const placements=this.placements(),occupying=this.pieceInSlot(slotIndex);if(occupying)delete placements[occupying];placements[this.selectedPieceId]=slotIndex;this.selectedPieceId='';saveGame(this.scene.save);this.showBuilder();}
  isComplete(){const p=this.placements();return this.build.requiredPieces.every(id=>Object.prototype.hasOwnProperty.call(p,id));}
  completeBuild(){if(!this.isComplete())return;const s=this.scene.save;s.academyBuilds=s.academyBuilds||{};s.academyBuilds[this.build.areaId]=Math.max(s.academyBuilds[this.build.areaId]||0,this.build.stage);saveGame(s);const objects=[];const bg=this.scene.add.graphics();bg.fillStyle(0x102342,1);bg.fillRoundedRect(-360,-225,720,450,24);bg.fillStyle(0xFFF7DF,1);bg.fillRoundedRect(-340,-205,680,410,20);objects.push(bg);this.addArt(objects,this.areaAssetPath(),0,-75,380,150);this.addLabel(objects,0,-165,'BUILD COMPLETE!',{fontSize:'33px',color:'#2F7D32'});this.addLabel(objects,0,42,this.build.completionMessage||'Your new Academy section has been saved.',{fontSize:'19px',color:'#19365F',wordWrap:{width:570}});const cont=this.scene.panels.makeButton(0,145,'Continue the Adventure',()=>this.finish(),{fontSize:'18px',backgroundColor:'#F6C744'});objects.push(cont);this.scene.panels.open(objects,{width:780,height:520});}
  finish(){const cb=this.onComplete;this.onComplete=null;if(typeof cb==='function')cb();}
}
window.BuilderEngine=BuilderEngine;