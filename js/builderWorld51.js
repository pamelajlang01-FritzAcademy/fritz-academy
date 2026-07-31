/* Fritz Academy 51.0 persistent open builder world */
(function(){
  "use strict";
  if(typeof BuilderEngine === "undefined") return;

  function normalizePiece(piece){
    if(!piece) return piece;
    const id = String(piece.id || "").toLowerCase();
    const fixed = Object.assign({}, piece);
    if(id.includes("bookshelf") || id.includes("book-shelf") || id.includes("bookcase")){
      fixed.name = "Bookshelf";
      fixed.icon = fixed.icon || "📚";
    }
    if(id.includes("chair") || id.includes("reading-seat")){
      fixed.name = "Reading Chair";
      fixed.icon = fixed.icon || "🪑";
    }
    return fixed;
  }

  const originalFindPiece = BuilderEngine.prototype.findPiece;
  BuilderEngine.prototype.findPiece = function(pieceId){
    return normalizePiece(originalFindPiece.call(this, pieceId));
  };

  function allAreaPieces(engine){
    const area = engine.build.areaId;
    const byId = new Map();
    const levels = Array.isArray(window.LEVELS) ? window.LEVELS : [];
    levels.forEach(level => {
      if(!level || !level.build || level.build.areaId !== area) return;
      [level.feelingsActivity, level.story, level.phonics, level.reader1, level.reader2]
        .forEach(section => {
          const piece = section && section.rewardPiece;
          if(piece && piece.id) byId.set(piece.id, normalizePiece(piece));
        });
    });
    return byId;
  }

  function earnedAcrossArea(engine, pieceMap){
    const progress = engine.scene.save.lessonProgress || {};
    const earned = new Set();
    Object.values(progress).forEach(record => {
      (record && Array.isArray(record.earnedPieces) ? record.earnedPieces : [])
        .forEach(id => { if(pieceMap.has(id)) earned.add(id); });
    });
    engine.build.requiredPieces.forEach(id => {
      if(engine.earnedPieces().includes(id)) earned.add(id);
    });
    return [...earned];
  }

  function ensureWorld(engine){
    const save = engine.scene.save;
    save.builderWorlds = save.builderWorlds || {};
    save.builderWorlds[engine.build.areaId] = save.builderWorlds[engine.build.areaId] || {};
    return save.builderWorlds[engine.build.areaId];
  }

  function saveWorld(engine){ saveGame(engine.scene.save); }

  function styles(){
    if(document.getElementById("fritz-builder-world51")) return;
    const s=document.createElement("style");
    s.id="fritz-builder-world51";
    s.textContent=`
    .bw51{position:fixed;inset:0;z-index:130000;background:#071426ee;display:grid;place-items:center;padding:12px;font-family:Arial,sans-serif}
    .bw51-shell{width:min(1220px,98vw);height:min(790px,97vh);background:#fff;border:6px solid #f6c744;border-radius:24px;overflow:hidden;display:grid;grid-template-rows:auto 1fr auto}
    .bw51-head{padding:12px 18px;background:#fff7cf;border-bottom:3px solid #174ea6;display:flex;justify-content:space-between;gap:16px;align-items:center}.bw51-head h2{margin:0;color:#102342}.bw51-head p{margin:0;color:#174ea6;font-weight:800}
    .bw51-main{display:grid;grid-template-columns:240px 1fr;min-height:0}.bw51-tray{padding:12px;background:#edf5ff;border-right:3px solid #174ea6;overflow:auto}.bw51-tray h3{margin:0 0 10px;color:#102342}.bw51-piece{width:100%;padding:10px;margin:0 0 9px;border:3px solid #9fb3c8;border-radius:14px;background:white;font-weight:900;text-align:left;cursor:pointer}.bw51-piece.selected{border-color:#d79b00;background:#fff1a8}.bw51-piece.placed{opacity:.58}
    .bw51-world{position:relative;overflow:hidden;min-height:520px;background:linear-gradient(#9edcff 0 43%,#d8f1ff 43% 49%,#91cf75 49% 100%);touch-action:none}
    .bw51-world:before{content:"";position:absolute;left:6%;right:6%;bottom:4%;height:34%;border:4px dashed rgba(255,255,255,.7);border-radius:42% 48% 18% 18%;background:rgba(255,255,255,.08)}
    .bw51-academy{position:absolute;left:50%;top:5%;transform:translateX(-50%);width:170px;height:95px;background:#f0d49a;border:5px solid #7b5736;border-radius:16px 16px 5px 5px;opacity:.75}.bw51-academy:before{content:"";position:absolute;left:-20px;right:-20px;top:-42px;height:48px;background:#315b87;clip-path:polygon(50% 0,100% 100%,0 100%)}.bw51-academy:after{content:"ACADEMY";position:absolute;inset:0;display:grid;place-items:center;font-weight:900;color:#51361f}
    .bw51-object{position:absolute;transform:translate(-50%,-50%);min-width:92px;min-height:82px;padding:8px;border:3px solid #174ea6;border-radius:16px;background:#ffffffec;display:grid;place-items:center;cursor:grab;box-shadow:0 8px 18px #0003;user-select:none;touch-action:none}.bw51-object .icon{font-size:42px}.bw51-object .label{font-size:12px;font-weight:900;color:#102342;text-align:center}.bw51-object.active{outline:5px solid #f6c744}
    .bw51-foot{padding:10px;display:flex;justify-content:center;gap:10px;flex-wrap:wrap;border-top:3px solid #174ea6}.bw51-foot button{padding:10px 18px;border:3px solid #102342;border-radius:12px;font-weight:900;background:white;cursor:pointer}.bw51-foot .primary{background:#f6c744}.bw51-note{position:absolute;right:12px;bottom:10px;background:#ffffffdd;padding:7px 10px;border-radius:10px;font-weight:800;color:#174ea6}
    @media(max-width:760px){.bw51-main{grid-template-columns:1fr;grid-template-rows:150px 1fr}.bw51-tray{border-right:0;border-bottom:3px solid #174ea6;display:flex;gap:8px;overflow:auto}.bw51-tray h3{display:none}.bw51-piece{min-width:180px;margin:0}.bw51-world{min-height:390px}.bw51-head p{display:none}}
    `;
    document.head.appendChild(s);
  }

  BuilderEngine.prototype.showBuilder = function(){
    styles();
    if(this.scene.panels) this.scene.panels.close();
    document.querySelector(".bw51")?.remove();
    document.querySelector(".fritz-builder-overlay")?.remove();

    const pieceMap=allAreaPieces(this);
    this.build.requiredPieces.forEach(id => { if(!pieceMap.has(id)) pieceMap.set(id, this.findPiece(id)); });
    const earned=earnedAcrossArea(this,pieceMap);
    const world=ensureWorld(this);
    let selected="";

    const overlay=document.createElement("div"); overlay.className="bw51";
    const shell=document.createElement("section"); shell.className="bw51-shell";
    shell.innerHTML=`<header class="bw51-head"><div><h2>${this.build.title || "Build Your Academy"}</h2><p>Your earned pieces stay in this shared scene.</p></div><strong>${earned.length} piece${earned.length===1?"":"s"} earned</strong></header>`;
    const main=document.createElement("div"); main.className="bw51-main";
    const tray=document.createElement("aside"); tray.className="bw51-tray"; tray.innerHTML="<h3>Builder Pack</h3>";
    const stage=document.createElement("div"); stage.className="bw51-world"; stage.innerHTML='<div class="bw51-academy"></div><div class="bw51-note">Open space for your growing Academy</div>';

    function render(){
      tray.querySelectorAll(".bw51-piece").forEach(n=>n.remove());
      stage.querySelectorAll(".bw51-object").forEach(n=>n.remove());
      earned.forEach(id=>{
        const p=pieceMap.get(id) || {id,name:id,icon:"⭐"};
        const b=document.createElement("button"); b.className="bw51-piece"+(selected===id?" selected":"")+(world[id]?" placed":""); b.textContent=`${p.icon || "⭐"} ${p.name || id}`;
        b.onclick=()=>{ selected=id; render(); };
        tray.appendChild(b);
        if(world[id]){
          const o=document.createElement("div"); o.className="bw51-object"+(selected===id?" active":""); o.style.left=world[id].x+"%"; o.style.top=world[id].y+"%"; o.innerHTML=`<div class="icon">${p.icon || "⭐"}</div><div class="label">${p.name || id}</div>`;
          let dragging=false;
          const move=e=>{ if(!dragging)return; const r=stage.getBoundingClientRect(); const point=e.touches?e.touches[0]:e; world[id]={x:Math.max(6,Math.min(94,(point.clientX-r.left)/r.width*100)),y:Math.max(14,Math.min(90,(point.clientY-r.top)/r.height*100))}; o.style.left=world[id].x+"%";o.style.top=world[id].y+"%"; };
          o.onpointerdown=e=>{dragging=true;o.setPointerCapture?.(e.pointerId);selected=id;}; o.onpointermove=move; o.onpointerup=()=>{dragging=false;saveWorld(this);render();};
          stage.appendChild(o);
        }
      });
    }
    stage.onclick=e=>{ if(!selected || e.target!==stage) return; const r=stage.getBoundingClientRect(); world[selected]={x:(e.clientX-r.left)/r.width*100,y:(e.clientY-r.top)/r.height*100}; saveWorld(this); render(); };
    render.call(this);

    const foot=document.createElement("footer"); foot.className="bw51-foot";
    const reset=document.createElement("button"); reset.textContent="Reset This Lesson's Pieces"; reset.onclick=()=>{this.build.requiredPieces.forEach(id=>delete world[id]);saveWorld(this);render.call(this);};
    const close=document.createElement("button"); close.textContent="Keep Building Later"; close.onclick=()=>overlay.remove();
    const requiredPlaced=()=>this.build.requiredPieces.every(id=>Boolean(world[id]));
    const finish=document.createElement("button"); finish.className="primary"; finish.textContent="Finish This Build"; finish.onclick=()=>{ if(!requiredPlaced()){alert("Place each piece earned in this lesson before finishing.");return;} overlay.remove(); this.completeBuild(); };
    foot.append(reset,close,finish); main.append(tray,stage); shell.append(main,foot); overlay.appendChild(shell); document.body.appendChild(overlay);
  };
})();
