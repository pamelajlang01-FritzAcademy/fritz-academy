/* Fritz Academy Builder interaction repair v50.18 */
(function(){
  "use strict";
  if(typeof BuilderEngine==="undefined") return;

  function installStyles(){
    if(document.getElementById("fritz-builder-interaction-50-18")) return;
    const style=document.createElement("style");
    style.id="fritz-builder-interaction-50-18";
    style.textContent=`
      .fritz-builder-piece.is-selected{outline:5px solid #f6c744!important;box-shadow:0 0 0 4px #0b3a75,0 8px 20px rgba(0,0,0,.22)!important;opacity:1!important}
      .fritz-builder-stage.is-ready-to-place{box-shadow:inset 0 0 0 7px #f6c744,0 0 25px rgba(246,199,68,.65)!important;cursor:crosshair!important}
      .fritz-builder-instruction{margin:0 0 12px;padding:10px 12px;border:3px solid #f6c744;border-radius:13px;background:#0b3a75;color:#fff;font-size:15px;font-weight:900;line-height:1.25;text-align:center}
      .fritz-builder-piece img,.fritz-builder-object img{pointer-events:none!important;-webkit-user-drag:none!important;user-select:none!important}
    `;
    document.head.appendChild(style);
  }

  function installInteraction(engine){
    const overlay=document.querySelector(".fritz-builder-overlay");
    const stage=overlay&&overlay.querySelector(".fritz-builder-stage");
    const tray=overlay&&overlay.querySelector(".fritz-builder-tray");
    if(!overlay||!stage||!tray||overlay.dataset.interaction5018==="1") return;
    overlay.dataset.interaction5018="1";

    const placements=engine.placements();
    let selectedId="";

    const instruction=document.createElement("p");
    instruction.className="fritz-builder-instruction";
    instruction.textContent="Choose a piece, then click or tap where you want it in the garden. You may also drag it into place.";
    const trayTitle=tray.querySelector("h3");
    if(trayTitle) trayTitle.insertAdjacentElement("afterend",instruction);
    else tray.prepend(instruction);

    const buttons=()=>[...tray.querySelectorAll(".fritz-builder-piece[data-piece-id]")];
    const setSelected=id=>{
      selectedId=id||"";
      buttons().forEach(button=>button.classList.toggle("is-selected",button.dataset.pieceId===selectedId));
      stage.classList.toggle("is-ready-to-place",Boolean(selectedId));
      instruction.textContent=selectedId
        ? "Now click or tap the place in the garden where this piece should go."
        : "Choose a piece, then click or tap where you want it in the garden. You may also drag it into place.";
    };

    const pointFor=(clientX,clientY)=>{
      const rect=stage.getBoundingClientRect();
      return {
        x:Math.min(92,Math.max(8,((clientX-rect.left)/rect.width)*100)),
        y:Math.min(90,Math.max(10,((clientY-rect.top)/rect.height)*100))
      };
    };

    const placeAt=(id,clientX,clientY)=>{
      if(!id) return;
      const point=pointFor(clientX,clientY);
      const button=tray.querySelector(`.fritz-builder-piece[data-piece-id="${CSS.escape(id)}"]`);

      if(!placements[id]||typeof placements[id]!=="object"){
        placements[id]={x:point.x,y:point.y,z:Object.keys(placements).length+10};
      }else{
        placements[id].x=point.x;
        placements[id].y=point.y;
      }
      if(typeof saveGame==="function") saveGame(engine.scene.save);

      const existing=stage.querySelector(`.fritz-builder-object[data-piece-id="${CSS.escape(id)}"]`);
      if(existing){
        existing.style.left=`${point.x}%`;
        existing.style.top=`${point.y}%`;
      }else{
        const originalClick=button&&button.onclick;
        if(button){
          button.dispatchEvent(new MouseEvent("click",{bubbles:true,cancelable:true,view:window}));
          requestAnimationFrame(()=>{
            const created=stage.querySelector(`.fritz-builder-object[data-piece-id="${CSS.escape(id)}"]`);
            if(created){created.style.left=`${point.x}%`;created.style.top=`${point.y}%`;}
          });
        }
      }
      if(button) button.classList.add("is-placed");
      setSelected("");
    };

    buttons().forEach(button=>{
      button.querySelectorAll("img").forEach(img=>{img.draggable=false;});
      button.addEventListener("click",event=>{
        if(button.disabled) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        setSelected(button.dataset.pieceId);
      },true);
      button.addEventListener("dragstart",event=>{
        if(button.disabled){event.preventDefault();return;}
        const id=button.dataset.pieceId;
        setSelected(id);
        if(event.dataTransfer){
          event.dataTransfer.effectAllowed="move";
          event.dataTransfer.setData("text/plain",id);
        }
      },true);
    });

    stage.addEventListener("dragover",event=>{event.preventDefault();if(event.dataTransfer)event.dataTransfer.dropEffect="move";});
    stage.addEventListener("drop",event=>{
      event.preventDefault();
      const id=(event.dataTransfer&&event.dataTransfer.getData("text/plain"))||selectedId;
      placeAt(id,event.clientX,event.clientY);
    },true);
    stage.addEventListener("click",event=>{
      if(!selectedId) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      placeAt(selectedId,event.clientX,event.clientY);
    },true);
    stage.addEventListener("pointerup",event=>{
      if(!selectedId||event.pointerType==="mouse") return;
      placeAt(selectedId,event.clientX,event.clientY);
    },true);
  }

  installStyles();
  const original=BuilderEngine.prototype.showBuilder;
  BuilderEngine.prototype.showBuilder=function(){
    const result=original.call(this);
    requestAnimationFrame(()=>installInteraction(this));
    setTimeout(()=>installInteraction(this),120);
    return result;
  };
})();
