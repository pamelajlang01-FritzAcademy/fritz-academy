/* Fritz Academy Persistent Illustrated Academy Builder v57.0
   Real Academy environment + draggable illustrated rewards + per-student saves. */
class BuilderEngine {
  constructor(scene,lessonEngine){
    this.scene=scene;
    this.lessonEngine=lessonEngine;
    this.lesson=null;
    this.build=null;
    this.onComplete=null;
    this.overlay=null;
    this.canvas=null;
    this.selectedId="";
    this.drag=null;
    this.boundMove=e=>this.onPointerMove(e);
    this.boundUp=e=>this.onPointerUp(e);
  }

  start(lesson,onComplete){
    this.lesson=lesson;
    this.build=lesson&&lesson.build;
    this.onComplete=onComplete;
    if(!this.build||!Array.isArray(this.build.requiredPieces)||!this.build.requiredPieces.length){
      this.scene.panels.message("Build Area Missing","This game session does not contain a complete Academy build.");
      return;
    }
    this.lessonEngine.setSection("build");
    this.ensureSaveData();
    this.openBuilder();
  }

  ensureSaveData(){
    const s=this.scene.save;
    s.builderWorlds=s.builderWorlds||{};
    s.builderWorlds[this.build.areaId]=s.builderWorlds[this.build.areaId]||{};
    s.academyBuilds=s.academyBuilds||{};
    saveGame(s);
  }

  world(){return this.scene.save.builderWorlds[this.build.areaId];}

  allPieceSources(level){
    return [level&&level.feelingsActivity,level&&level.story,level&&level.phonics,level&&level.reader1,level&&level.reader2]
      .filter(Boolean).map(x=>x.rewardPiece).filter(Boolean);
  }

  pieceCatalog(){
    const out={};
    (Array.isArray(window.LEVELS)?window.LEVELS:[]).forEach(level=>{
      this.allPieceSources(level).forEach(piece=>{if(piece&&piece.id)out[piece.id]=piece;});
    });
    this.allPieceSources(this.lesson).forEach(piece=>{if(piece&&piece.id)out[piece.id]=piece;});
    return out;
  }

  earnedIds(){
    const ids=new Set();
    const progress=this.scene.save.lessonProgress||{};
    Object.values(progress).forEach(p=>{
      (p&&Array.isArray(p.earnedPieces)?p.earnedPieces:[]).forEach(id=>ids.add(id));
    });
    const current=this.lessonEngine.progress();
    (current&&Array.isArray(current.earnedPieces)?current.earnedPieces:[]).forEach(id=>ids.add(id));
    return [...ids];
  }

  piece(id){
    const p=this.pieceCatalog()[id];
    return p||{id,name:id,icon:""};
  }

  art(piece){
    return window.FRITZ_BUILDER_ART&&typeof window.FRITZ_BUILDER_ART.resolve==="function"
      ? window.FRITZ_BUILDER_ART.resolve(piece)
      : "assets/alphabet-blocks.png";
  }

  isPlaced(id){return Boolean(this.world()[id]);}
  isComplete(){return this.build.requiredPieces.every(id=>this.isPlaced(id));}

  injectStyles(){
    if(document.getElementById("fritz-builder57-style"))return;
    const style=document.createElement("style");
    style.id="fritz-builder57-style";
    style.textContent=`
      .fa-builder57{position:fixed;inset:0;z-index:10050;background:rgba(3,12,24,.94);display:flex;flex-direction:column;color:#102342;font-family:Arial,sans-serif}
      .fa-builder57 *{box-sizing:border-box}
      .fa-builder57-head{height:76px;display:flex;align-items:center;gap:18px;padding:10px 18px;background:#f8f1dd;border-bottom:4px solid #d6ad43;flex:0 0 auto}
      .fa-builder57-title{font-size:24px;font-weight:900;flex:1}.fa-builder57-sub{font-size:14px;color:#46566f;margin-top:3px}
      .fa-builder57-btn{border:2px solid #183b68;border-radius:13px;background:#fff;padding:11px 17px;font-weight:900;color:#102342;cursor:pointer;font-size:15px}
      .fa-builder57-btn.primary{background:#f3c84b}.fa-builder57-btn:disabled{opacity:.42;cursor:not-allowed}
      .fa-builder57-main{position:relative;flex:1;min-height:0;overflow:hidden;background:#8fc477}
      .fa-builder57-world{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.03),rgba(255,255,255,.03)),url('assets/fritz_academy_world_map.png');background-size:cover;background-position:center;overflow:hidden;touch-action:none}
      .fa-builder57-world:after{content:'YOUR FRITZ ACADEMY';position:absolute;left:18px;top:18px;padding:8px 13px;border-radius:12px;background:rgba(248,241,221,.88);border:2px solid rgba(214,173,67,.9);font-weight:900;font-size:13px;letter-spacing:.6px;pointer-events:none}
      .fa-builder57-piece{position:absolute;width:112px;height:112px;object-fit:contain;transform:translate(-50%,-50%);filter:drop-shadow(0 6px 5px rgba(0,0,0,.28));cursor:grab;user-select:none;-webkit-user-drag:none;touch-action:none;transition:filter .12s,outline .12s}
      .fa-builder57-piece.sel{outline:4px solid #f3c84b;outline-offset:4px;border-radius:10px;filter:drop-shadow(0 7px 7px rgba(0,0,0,.4))}
      .fa-builder57-piece.drag{cursor:grabbing;transition:none;z-index:999!important}
      .fa-builder57-foot{height:158px;background:#f8f1dd;border-top:4px solid #d6ad43;display:flex;gap:14px;padding:10px 16px;align-items:stretch;flex:0 0 auto}
      .fa-builder57-pack{flex:1;display:flex;gap:10px;overflow-x:auto;overflow-y:hidden;padding:4px 3px 8px;align-items:center}
      .fa-builder57-card{width:112px;min-width:112px;height:126px;background:#fff;border:2px solid #d6c18a;border-radius:14px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;padding:6px;cursor:pointer;box-shadow:0 3px 7px rgba(0,0,0,.12)}
      .fa-builder57-card img{width:72px;height:72px;object-fit:contain}.fa-builder57-card strong{font-size:12px;text-align:center;line-height:1.05}.fa-builder57-card.current{border-color:#174ea6}.fa-builder57-card.placed{opacity:.48}
      .fa-builder57-side{width:210px;border-left:1px solid #cdbb91;padding-left:14px;display:flex;flex-direction:column;justify-content:center;gap:8px}
      .fa-builder57-status{font-size:13px;font-weight:800;line-height:1.35}.fa-builder57-hint{font-size:12px;color:#46566f;line-height:1.25}
      @media(max-width:700px){.fa-builder57-head{height:68px;padding:8px}.fa-builder57-title{font-size:18px}.fa-builder57-sub{display:none}.fa-builder57-foot{height:146px;padding:7px}.fa-builder57-side{width:150px}.fa-builder57-card{min-width:98px;width:98px}.fa-builder57-piece{width:94px;height:94px}}
    `;
    document.head.appendChild(style);
  }

  openBuilder(){
    this.closeBuilder(false);
    this.injectStyles();
    if(this.scene.panels&&this.scene.panels.close)this.scene.panels.close();
    if(this.scene.physics&&this.scene.physics.world)this.scene.physics.pause();

    const root=document.createElement("div"); root.className="fa-builder57";
    const head=document.createElement("div"); head.className="fa-builder57-head";
    const titleWrap=document.createElement("div"); titleWrap.style.flex="1";
    const title=document.createElement("div"); title.className="fa-builder57-title"; title.textContent=this.build.title||"Build Your Fritz Academy";
    const sub=document.createElement("div"); sub.className="fa-builder57-sub"; sub.textContent="Place, move, and save the pieces you earn. Your Academy stays this way for this student.";
    titleWrap.append(title,sub);
    const reset=document.createElement("button"); reset.className="fa-builder57-btn"; reset.textContent="Return Selected to Pack"; reset.onclick=()=>this.returnSelected();
    const finish=document.createElement("button"); finish.className="fa-builder57-btn primary"; finish.id="fa-builder57-finish"; finish.onclick=()=>this.finishBuild();
    head.append(titleWrap,reset,finish);

    const main=document.createElement("div"); main.className="fa-builder57-main";
    const world=document.createElement("div"); world.className="fa-builder57-world"; main.appendChild(world); this.canvas=world;

    const foot=document.createElement("div"); foot.className="fa-builder57-foot";
    const pack=document.createElement("div"); pack.className="fa-builder57-pack"; pack.id="fa-builder57-pack";
    const side=document.createElement("div"); side.className="fa-builder57-side";
    const status=document.createElement("div"); status.className="fa-builder57-status"; status.id="fa-builder57-status";
    const hint=document.createElement("div"); hint.className="fa-builder57-hint"; hint.textContent="Click a piece in the pack to place it. Drag anything already in the Academy to move it. Placements save automatically.";
    side.append(status,hint); foot.append(pack,side);

    root.append(head,main,foot); document.body.appendChild(root); this.overlay=root;
    window.addEventListener("pointermove",this.boundMove,{passive:false});
    window.addEventListener("pointerup",this.boundUp);
    this.render();
  }

  render(){
    if(!this.overlay||!this.canvas)return;
    this.canvas.querySelectorAll(".fa-builder57-piece").forEach(n=>n.remove());
    const pack=this.overlay.querySelector("#fa-builder57-pack"); pack.innerHTML="";
    const catalog=this.pieceCatalog();
    const earned=this.earnedIds().filter(id=>catalog[id]);
    const world=this.world();

    Object.keys(world).forEach((id,index)=>{
      const piece=this.piece(id); const pos=world[id];
      const img=document.createElement("img"); img.className="fa-builder57-piece"+(this.selectedId===id?" sel":"");
      img.src=this.art(piece); img.alt=piece.name; img.title=piece.name; img.dataset.id=id;
      img.style.left=`${Math.max(.03,Math.min(.97,Number(pos.x)||.5))*100}%`;
      img.style.top=`${Math.max(.06,Math.min(.94,Number(pos.y)||.5))*100}%`;
      img.style.zIndex=String(pos.z||20+index);
      img.addEventListener("pointerdown",e=>this.beginDrag(e,id,img));
      img.addEventListener("click",()=>{this.selectedId=id;this.render();});
      this.canvas.appendChild(img);
    });

    earned.forEach(id=>{
      const piece=this.piece(id); const card=document.createElement("button"); card.className="fa-builder57-card";
      if(this.build.requiredPieces.includes(id))card.classList.add("current");
      if(world[id])card.classList.add("placed");
      const img=document.createElement("img"); img.src=this.art(piece); img.alt="";
      const label=document.createElement("strong"); label.textContent=piece.name;
      card.append(img,label); card.title=world[id]?"Already placed — click to select":"Place in Academy";
      card.onclick=()=>{ if(world[id]){this.selectedId=id;this.render();} else this.placeNew(id); };
      pack.appendChild(card);
    });
    this.updateStatus();
  }

  placeNew(id){
    if(this.world()[id])return;
    const offset=(Object.keys(this.world()).length%7)*.035;
    this.world()[id]={x:.48+offset,y:.55+((Object.keys(this.world()).length%3)-1)*.08,z:50+Object.keys(this.world()).length};
    this.selectedId=id; saveGame(this.scene.save); this.render();
  }

  beginDrag(e,id,img){
    e.preventDefault(); this.selectedId=id; img.classList.add("drag","sel");
    const rect=this.canvas.getBoundingClientRect();
    this.drag={id,img,rect};
    try{img.setPointerCapture(e.pointerId);}catch(_e){}
  }

  onPointerMove(e){
    if(!this.drag)return; e.preventDefault();
    const r=this.drag.rect;
    const x=Math.max(.025,Math.min(.975,(e.clientX-r.left)/r.width));
    const y=Math.max(.05,Math.min(.95,(e.clientY-r.top)/r.height));
    this.drag.img.style.left=`${x*100}%`; this.drag.img.style.top=`${y*100}%`;
    const p=this.world()[this.drag.id]||{}; p.x=x;p.y=y;p.z=999;this.world()[this.drag.id]=p;
  }

  onPointerUp(){
    if(!this.drag)return;
    const p=this.world()[this.drag.id]; if(p)p.z=50+Object.keys(this.world()).indexOf(this.drag.id);
    this.drag=null; saveGame(this.scene.save); this.render();
  }

  returnSelected(){
    if(!this.selectedId||!this.world()[this.selectedId])return;
    delete this.world()[this.selectedId]; this.selectedId=""; saveGame(this.scene.save); this.render();
  }

  updateStatus(){
    if(!this.overlay)return;
    const placed=this.build.requiredPieces.filter(id=>this.isPlaced(id)).length;
    const total=this.build.requiredPieces.length;
    const complete=placed===total;
    const el=this.overlay.querySelector("#fa-builder57-status");
    el.textContent=complete?`All ${total} new pieces are placed. Your Academy is ready to save.`:`This session: ${placed} of ${total} new pieces placed.`;
    const btn=this.overlay.querySelector("#fa-builder57-finish"); btn.disabled=!complete; btn.textContent=complete?"Save Build & Finish":"Place All New Pieces";
  }

  finishBuild(){
    if(!this.isComplete())return;
    this.scene.save.academyBuilds[this.build.areaId]=Math.max(this.scene.save.academyBuilds[this.build.areaId]||0,this.build.stage||1);
    saveGame(this.scene.save);
    const cb=this.onComplete; this.onComplete=null;
    this.closeBuilder(true);
    if(typeof cb==="function")cb();
  }

  closeBuilder(resume=true){
    window.removeEventListener("pointermove",this.boundMove);
    window.removeEventListener("pointerup",this.boundUp);
    if(this.overlay){this.overlay.remove();this.overlay=null;}
    this.canvas=null;this.drag=null;
    if(resume&&this.scene&&this.scene.physics&&this.scene.physics.world)this.scene.physics.resume();
  }
}
window.BuilderEngine=BuilderEngine;