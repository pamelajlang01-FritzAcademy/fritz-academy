/* Fritz Academy Version 45 Builder 2.0 */
(function(){
  "use strict";

  if(typeof BuilderEngine === "undefined") return;

  const PIECE_LIBRARY = {
    "welcome-flowers": { label:"Welcome Flowers", type:"flowers" },
    "stone-path": { label:"Stone Path", type:"path" },
    "reading-bench": { label:"Reading Bench", type:"bench" },
    "welcome-tree": { label:"Welcome Tree", type:"tree" },
    "garden-fence": { label:"Garden Fence", type:"fence" },
    "watering-can": { label:"Watering Can", type:"watering-can" },
    "flower-bed": { label:"Flower Bed", type:"flower-bed" },
    "garden-lantern": { label:"Garden Lantern", type:"lantern" },
    "birdhouse": { label:"Birdhouse", type:"birdhouse" },
    "welcome-sign": { label:"Welcome Sign", type:"sign" }
  };

  function ensureStyles(){
    if(document.getElementById("fritz-builder45-styles")) return;
    const style = document.createElement("style");
    style.id = "fritz-builder45-styles";
    style.textContent = `
      .fritz-builder-overlay{position:fixed;inset:0;z-index:110000;background:rgba(7,20,38,.96);display:grid;place-items:center;padding:12px;box-sizing:border-box;font-family:Arial,sans-serif;color:#102342}
      .fritz-builder-shell{width:min(1180px,98vw);height:min(760px,96vh);background:#fffaf0;border:6px solid #f6c744;border-radius:26px;box-shadow:0 22px 80px rgba(0,0,0,.5);display:grid;grid-template-rows:auto 1fr auto;overflow:hidden}
      .fritz-builder-header{display:flex;gap:14px;align-items:center;justify-content:space-between;padding:14px 18px;background:linear-gradient(90deg,#fff7c9,#e6f4ff);border-bottom:3px solid #174ea6}
      .fritz-builder-title{margin:0;font-size:clamp(24px,3vw,34px)}
      .fritz-builder-subtitle{font-weight:800;color:#174ea6;text-align:right}
      .fritz-builder-main{display:grid;grid-template-columns:minmax(180px,250px) 1fr;min-height:0}
      .fritz-builder-tray{padding:14px;background:#f2f7ff;border-right:3px solid #174ea6;overflow:auto}
      .fritz-builder-tray h3{margin:0 0 10px;font-size:22px}
      .fritz-builder-piece{width:100%;min-height:88px;margin:0 0 10px;border:3px solid #9fb3c8;border-radius:16px;background:white;display:grid;grid-template-columns:76px 1fr;align-items:center;gap:8px;padding:8px;cursor:grab;font-weight:900;color:#102342;text-align:left;box-shadow:0 4px 10px rgba(16,35,66,.12)}
      .fritz-builder-piece:active{cursor:grabbing}.fritz-builder-piece.is-placed{opacity:.45}.fritz-builder-piece:focus{outline:4px solid rgba(246,199,68,.55)}
      .fritz-piece-preview{height:68px;position:relative;display:grid;place-items:center;overflow:hidden;border-radius:12px;background:linear-gradient(#dff3ff 0 58%,#b9df9b 58%)}
      .fritz-builder-stage-wrap{padding:14px;min-width:0;min-height:0;background:#dbeeff}
      .fritz-builder-stage{height:100%;min-height:480px;position:relative;overflow:hidden;border:4px solid #174ea6;border-radius:20px;background:linear-gradient(#9fd9ff 0 42%,#d7f0ff 42% 48%,#83c86b 48% 100%);touch-action:none;box-shadow:inset 0 0 35px rgba(23,78,166,.22)}
      .fritz-builder-stage::before{content:"";position:absolute;left:8%;right:8%;bottom:-12%;height:45%;background:#79b85e;border-radius:50% 50% 0 0/30% 30% 0 0;box-shadow:0 -30px 0 #8ac66e}
      .fritz-builder-stage::after{content:"";position:absolute;left:0;right:0;top:38%;height:10%;background:linear-gradient(90deg,transparent,#fff 45%,#fff 55%,transparent);opacity:.45}
      .fritz-builder-cloud{position:absolute;width:110px;height:36px;background:white;border-radius:50px;opacity:.88;animation:fritzCloud 18s linear infinite}.fritz-builder-cloud::before,.fritz-builder-cloud::after{content:"";position:absolute;background:white;border-radius:50%}.fritz-builder-cloud::before{width:50px;height:50px;left:17px;top:-24px}.fritz-builder-cloud::after{width:65px;height:58px;right:12px;top:-30px}.fritz-builder-cloud.c1{left:-130px;top:9%}.fritz-builder-cloud.c2{left:-260px;top:22%;transform:scale(.7);animation-duration:25s;animation-delay:-7s}
      @keyframes fritzCloud{to{left:110%}}
      .fritz-builder-object{position:absolute;left:0;top:0;width:120px;height:120px;transform:translate(-50%,-50%);cursor:grab;touch-action:none;user-select:none;z-index:10;filter:drop-shadow(0 10px 7px rgba(0,0,0,.25));transition:filter .15s,transform .15s}
      .fritz-builder-object.is-selected{filter:drop-shadow(0 0 0 #fff) drop-shadow(0 0 10px #f6c744);transform:translate(-50%,-50%) scale(1.06)}
      .fritz-builder-object:active{cursor:grabbing}.fritz-object-label{position:absolute;left:50%;bottom:-22px;transform:translateX(-50%);white-space:nowrap;background:rgba(255,255,255,.92);border:2px solid #174ea6;border-radius:10px;padding:3px 7px;font-size:12px;font-weight:900}
      .fritz-builder-footer{padding:12px 16px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap;border-top:3px solid #174ea6;background:#fff}
      .fritz-builder-footer button{border:3px solid #102342;border-radius:13px;padding:11px 18px;font-weight:900;font-size:17px;cursor:pointer;background:white;color:#102342}.fritz-builder-footer .primary{background:#f6c744}.fritz-builder-footer button:disabled{opacity:.45;cursor:not-allowed}
      .obj-tree .trunk{position:absolute;left:50%;bottom:12px;width:24px;height:68px;background:#8a572f;transform:translateX(-50%);border-radius:8px}.obj-tree .crown{position:absolute;left:50%;top:6px;width:92px;height:82px;background:#3f9d4a;border-radius:50%;transform:translateX(-50%);box-shadow:-26px 18px 0 #58ad52,26px 17px 0 #58ad52,0 -14px 0 #4da84d}
      .obj-bench .seat{position:absolute;left:12px;right:12px;bottom:32px;height:18px;background:#a86c35;border-radius:6px;box-shadow:0 -28px 0 #bb7c3e}.obj-bench .leg{position:absolute;bottom:8px;width:12px;height:34px;background:#59402b}.obj-bench .l1{left:28px}.obj-bench .l2{right:28px}
      .obj-flowers .stem{position:absolute;left:50%;bottom:16px;width:6px;height:62px;background:#3e8d42}.obj-flowers .bloom{position:absolute;left:50%;top:20px;width:34px;height:34px;background:#ffca4b;border-radius:50%;transform:translateX(-50%);box-shadow:-20px 5px 0 #ff79a8,20px 7px 0 #a879ff,-9px 24px 0 #ff8c42,13px 25px 0 #fff06a}
      .obj-path{width:150px;height:88px}.obj-path .stone{position:absolute;width:48px;height:30px;background:#b6afa4;border:3px solid #827c72;border-radius:50%}.obj-path .s1{left:7px;top:40px}.obj-path .s2{left:48px;top:17px}.obj-path .s3{right:8px;top:42px}
      .obj-fence{width:170px;height:100px}.obj-fence .rail{position:absolute;left:5px;right:5px;height:13px;background:#d2a366;border:2px solid #8f6738}.obj-fence .r1{top:32px}.obj-fence .r2{top:67px}.obj-fence .post{position:absolute;top:12px;width:18px;height:82px;background:#d2a366;border:2px solid #8f6738;border-radius:5px}.obj-fence .p1{left:18px}.obj-fence .p2{left:76px}.obj-fence .p3{right:18px}
      .obj-watering-can .body{position:absolute;left:32px;top:35px;width:70px;height:54px;background:#58a7d8;border:4px solid #28678d;border-radius:14px}.obj-watering-can .handle{position:absolute;left:43px;top:14px;width:48px;height:38px;border:8px solid #28678d;border-bottom:0;border-radius:28px 28px 0 0}.obj-watering-can .spout{position:absolute;left:93px;top:45px;width:48px;height:16px;background:#58a7d8;border:4px solid #28678d;transform:rotate(-18deg);border-radius:8px}
      .obj-flower-bed{width:155px;height:100px}.obj-flower-bed .soil{position:absolute;left:8px;right:8px;bottom:10px;height:42px;background:#7a4b2b;border-radius:50%}.obj-flower-bed .petals{position:absolute;left:18px;right:18px;top:18px;height:48px;background:radial-gradient(circle at 10% 60%,#ffdf4d 0 8px,transparent 9px),radial-gradient(circle at 30% 30%,#ff72a6 0 9px,transparent 10px),radial-gradient(circle at 52% 55%,#9d7cff 0 9px,transparent 10px),radial-gradient(circle at 73% 25%,#ff914d 0 9px,transparent 10px),radial-gradient(circle at 92% 60%,#fff36b 0 8px,transparent 9px)}
      .obj-lantern .post{position:absolute;left:53px;top:8px;width:12px;height:102px;background:#424b58}.obj-lantern .lamp{position:absolute;left:33px;top:5px;width:52px;height:48px;background:#ffe97a;border:5px solid #424b58;border-radius:8px;box-shadow:0 0 22px #ffe97a}
      .obj-birdhouse .pole{position:absolute;left:54px;top:54px;width:12px;height:60px;background:#8a572f}.obj-birdhouse .house{position:absolute;left:25px;top:25px;width:70px;height:58px;background:#d66a4e;border:4px solid #873a2a;border-radius:5px}.obj-birdhouse .roof{position:absolute;left:17px;top:6px;width:88px;height:45px;background:#315b87;clip-path:polygon(50% 0,100% 100%,0 100%)}.obj-birdhouse .hole{position:absolute;left:50px;top:46px;width:18px;height:18px;background:#3a2a20;border-radius:50%}
      .obj-sign .post{position:absolute;left:52px;top:47px;width:15px;height:67px;background:#7c532f}.obj-sign .board{position:absolute;left:10px;top:14px;width:105px;height:52px;background:#f2c36b;border:4px solid #7c532f;border-radius:9px}.obj-sign .board::after{content:"WELCOME";position:absolute;inset:0;display:grid;place-items:center;font-size:13px;font-weight:900;color:#51361f}
      @media(max-width:760px){.fritz-builder-shell{height:98vh}.fritz-builder-main{grid-template-columns:1fr;grid-template-rows:145px 1fr}.fritz-builder-tray{border-right:0;border-bottom:3px solid #174ea6;display:flex;gap:8px;overflow:auto}.fritz-builder-tray h3{display:none}.fritz-builder-piece{min-width:180px;margin:0}.fritz-builder-stage{min-height:360px}.fritz-builder-subtitle{display:none}}
    `;
    document.head.appendChild(style);
  }

  function pieceDefinition(id){
    return PIECE_LIBRARY[id] || { label:id.replace(/-/g," "), type:"sign" };
  }

  function objectMarkup(type){
    switch(type){
      case "tree": return '<span class="trunk"></span><span class="crown"></span>';
      case "bench": return '<span class="seat"></span><span class="leg l1"></span><span class="leg l2"></span>';
      case "flowers": return '<span class="stem"></span><span class="bloom"></span>';
      case "path": return '<span class="stone s1"></span><span class="stone s2"></span><span class="stone s3"></span>';
      case "fence": return '<span class="rail r1"></span><span class="rail r2"></span><span class="post p1"></span><span class="post p2"></span><span class="post p3"></span>';
      case "watering-can": return '<span class="handle"></span><span class="body"></span><span class="spout"></span>';
      case "flower-bed": return '<span class="soil"></span><span class="petals"></span>';
      case "lantern": return '<span class="post"></span><span class="lamp"></span>';
      case "birdhouse": return '<span class="roof"></span><span class="house"></span><span class="hole"></span><span class="pole"></span>';
      default: return '<span class="post"></span><span class="board"></span>';
    }
  }

  function makeVisual(id, compact){
    const def = pieceDefinition(id);
    const node = document.createElement("div");
    node.className = `fritz-piece-preview obj-${def.type}`;
    node.innerHTML = objectMarkup(def.type);
    if(compact) node.style.transform = "scale(.78)";
    return node;
  }

  function clamp(value,min,max){ return Math.min(max,Math.max(min,value)); }

  BuilderEngine.prototype.showBuilder = function(){
    ensureStyles();
    const earned = this.earnedPieces();
    const required = this.build.requiredPieces.slice();
    const allEarned = required.every(id => earned.includes(id));
    const placements = this.placements();

    if(this.scene.panels) this.scene.panels.close();
    const old = document.querySelector(".fritz-builder-overlay");
    if(old) old.remove();

    const overlay = document.createElement("div");
    overlay.className = "fritz-builder-overlay";
    const shell = document.createElement("section");
    shell.className = "fritz-builder-shell";
    shell.setAttribute("role","dialog");
    shell.setAttribute("aria-label",this.build.title || "Fritz Academy Builder");

    const header = document.createElement("header");
    header.className = "fritz-builder-header";
    const heading = document.createElement("h1");
    heading.className = "fritz-builder-title";
    heading.textContent = this.build.title || "Build Your Academy Garden";
    const subtitle = document.createElement("div");
    subtitle.className = "fritz-builder-subtitle";
    subtitle.textContent = allEarned ? "Drag each piece anywhere into your garden." : "Finish the lesson to earn every piece.";
    header.append(heading,subtitle);

    const main = document.createElement("div");
    main.className = "fritz-builder-main";
    const tray = document.createElement("aside");
    tray.className = "fritz-builder-tray";
    const trayTitle = document.createElement("h3");
    trayTitle.textContent = "Builder Pack";
    tray.appendChild(trayTitle);

    const stageWrap = document.createElement("div");
    stageWrap.className = "fritz-builder-stage-wrap";
    const stage = document.createElement("div");
    stage.className = "fritz-builder-stage";
    stage.innerHTML = '<span class="fritz-builder-cloud c1"></span><span class="fritz-builder-cloud c2"></span>';
    stageWrap.appendChild(stage);
    main.append(tray,stageWrap);

    let selectedId = "";
    const rendered = new Map();

    const savePosition = (id,x,y) => {
      placements[id] = { x:clamp(x,5,95), y:clamp(y,8,91), z:(placements[id] && placements[id].z) || Object.keys(placements).length + 1 };
      saveGame(this.scene.save);
    };

    const createPlaced = (id,position) => {
      const def = pieceDefinition(id);
      const item = document.createElement("div");
      item.className = `fritz-builder-object obj-${def.type}`;
      item.dataset.pieceId = id;
      item.innerHTML = objectMarkup(def.type) + `<span class="fritz-object-label">${def.label}</span>`;
      item.style.left = `${position.x}%`;
      item.style.top = `${position.y}%`;
      item.style.zIndex = String(position.z || 10);
      item.tabIndex = 0;
      stage.appendChild(item);
      rendered.set(id,item);

      let dragging = false;
      const move = event => {
        if(!dragging) return;
        const point = event.touches ? event.touches[0] : event;
        const rect = stage.getBoundingClientRect();
        const x = ((point.clientX - rect.left) / rect.width) * 100;
        const y = ((point.clientY - rect.top) / rect.height) * 100;
        item.style.left = `${clamp(x,5,95)}%`;
        item.style.top = `${clamp(y,8,91)}%`;
      };
      const end = event => {
        if(!dragging) return;
        dragging = false;
        item.classList.remove("is-selected");
        const point = event.changedTouches ? event.changedTouches[0] : event;
        const rect = stage.getBoundingClientRect();
        savePosition(id,((point.clientX-rect.left)/rect.width)*100,((point.clientY-rect.top)/rect.height)*100);
        window.removeEventListener("pointermove",move);
        window.removeEventListener("pointerup",end);
        window.removeEventListener("touchmove",move);
        window.removeEventListener("touchend",end);
        refreshButtons();
      };
      const begin = event => {
        event.preventDefault();
        dragging = true;
        selectedId = id;
        item.classList.add("is-selected");
        Object.values(placements).forEach(p => { if(p && typeof p === "object") p.z = Math.max(1,(p.z || 1)-1); });
        placements[id].z = 99;
        item.style.zIndex = "99";
        window.addEventListener("pointermove",move);
        window.addEventListener("pointerup",end);
        window.addEventListener("touchmove",move,{passive:false});
        window.addEventListener("touchend",end);
      };
      item.addEventListener("pointerdown",begin);
      item.addEventListener("touchstart",begin,{passive:false});
      item.addEventListener("click",() => {
        selectedId = id;
        rendered.forEach(node => node.classList.toggle("is-selected",node === item));
        refreshButtons();
      });
    };

    const defaultPosition = index => ({ x:22 + (index % 3) * 28, y:35 + Math.floor(index / 3) * 31, z:index + 10 });

    required.forEach((id,index) => {
      const def = pieceDefinition(id);
      const button = document.createElement("button");
      button.type = "button";
      button.className = "fritz-builder-piece";
      button.dataset.pieceId = id;
      button.draggable = true;
      button.append(makeVisual(id,true),document.createTextNode(def.label));
      const earnedPiece = earned.includes(id);
      if(!earnedPiece) button.disabled = true;
      if(placements[id] && typeof placements[id] === "object") button.classList.add("is-placed");
      button.addEventListener("dragstart",event => event.dataTransfer.setData("text/plain",id));
      button.addEventListener("click",() => {
        if(!earnedPiece) return;
        if(!placements[id] || typeof placements[id] !== "object"){
          const position = defaultPosition(index);
          savePosition(id,position.x,position.y);
          createPlaced(id,placements[id]);
          button.classList.add("is-placed");
          selectedId = id;
          refreshButtons();
        }
      });
      tray.appendChild(button);

      if(placements[id] && typeof placements[id] === "object") createPlaced(id,placements[id]);
      else if(typeof placements[id] === "number"){
        const position = defaultPosition(placements[id]);
        savePosition(id,position.x,position.y);
        createPlaced(id,placements[id]);
        button.classList.add("is-placed");
      }
    });

    stage.addEventListener("dragover",event => event.preventDefault());
    stage.addEventListener("drop",event => {
      event.preventDefault();
      const id = event.dataTransfer.getData("text/plain");
      if(!id || !earned.includes(id)) return;
      const rect = stage.getBoundingClientRect();
      savePosition(id,((event.clientX-rect.left)/rect.width)*100,((event.clientY-rect.top)/rect.height)*100);
      if(rendered.has(id)){
        const node = rendered.get(id);
        node.style.left = `${placements[id].x}%`;
        node.style.top = `${placements[id].y}%`;
      }else createPlaced(id,placements[id]);
      const trayButton = tray.querySelector(`[data-piece-id="${CSS.escape(id)}"]`);
      if(trayButton) trayButton.classList.add("is-placed");
      selectedId = id;
      refreshButtons();
    });

    const footer = document.createElement("footer");
    footer.className = "fritz-builder-footer";
    const backButton = document.createElement("button");
    backButton.textContent = "Back to Lesson";
    const removeButton = document.createElement("button");
    removeButton.textContent = "Return Selected Piece";
    const resetButton = document.createElement("button");
    resetButton.textContent = "Reset Garden";
    const finishButton = document.createElement("button");
    finishButton.className = "primary";
    finishButton.textContent = "Save and Finish Build";

    const refreshButtons = () => {
      removeButton.disabled = !selectedId;
      finishButton.disabled = !required.every(id => placements[id] && typeof placements[id] === "object");
    };

    backButton.addEventListener("click",() => { overlay.remove(); });
    removeButton.addEventListener("click",() => {
      if(!selectedId) return;
      delete placements[selectedId];
      saveGame(this.scene.save);
      const node = rendered.get(selectedId);
      if(node) node.remove();
      rendered.delete(selectedId);
      const trayButton = tray.querySelector(`[data-piece-id="${CSS.escape(selectedId)}"]`);
      if(trayButton) trayButton.classList.remove("is-placed");
      selectedId = "";
      refreshButtons();
    });
    resetButton.addEventListener("click",() => {
      required.forEach(id => delete placements[id]);
      saveGame(this.scene.save);
      overlay.remove();
      this.showBuilder();
    });
    finishButton.addEventListener("click",() => {
      if(finishButton.disabled) return;
      overlay.remove();
      this.completeBuild();
    });

    footer.append(backButton,removeButton,resetButton,finishButton);
    shell.append(header,main,footer);
    overlay.appendChild(shell);
    document.body.appendChild(overlay);
    refreshButtons();
  };

  BuilderEngine.prototype.isComplete = function(){
    const placements = this.placements();
    return this.build.requiredPieces.every(id => placements[id] && typeof placements[id] === "object");
  };
})();
