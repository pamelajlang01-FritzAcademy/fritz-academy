/* Fritz Academy Builder usability repair v50.34
   - Enlarges approved object assets for the garden scale.
   - Creates a clear build meadow over the finished environment artwork.
   - Replaces unreliable drag handoff with deterministic click/tap and drop placement.
*/
(function(){
  "use strict";
  if(typeof BuilderEngine==="undefined") return;

  const SCALE={
    "welcome-flowers":{w:250,h:165},
    "stone-path":{w:330,h:205},
    "reading-bench":{w:300,h:210},
    "welcome-tree":{w:260,h:305},
    "garden-fence":{w:350,h:205},
    "story-rug":{w:330,h:205},
    "book-shelf":{w:275,h:305},
    "reading-chair":{w:255,h:275},
    "book-cart":{w:300,h:250},
    "reading-circle":{w:350,h:235},
    "outdoor-story-stump":{w:295,h:265},
    "captain-fritz-statue":{w:235,h:320},
    "academy-flag":{w:285,h:230},
    "academy-mailbox":{w:270,h:270},
    "academy-bell":{w:285,h:300},
    "trophy-display":{w:305,h:295},
    "paw-print-stepping-stones":{w:340,h:250}
  };

  function installStyles(){
    if(document.getElementById("fritz-builder-usability-50-34")) return;
    const style=document.createElement("style");
    style.id="fritz-builder-usability-50-34";
    style.textContent=`
      .fritz-builder-stage{isolation:isolate!important;cursor:default!important}
      .fritz-builder-stage::after{
        content:""!important;display:block!important;position:absolute!important;
        left:8%!important;right:8%!important;top:24%!important;bottom:7%!important;
        z-index:1!important;border-radius:46% 46% 18% 18%/28% 28% 18% 18%!important;
        background:
          radial-gradient(ellipse at 50% 58%,rgba(104,166,72,.96) 0 42%,rgba(88,143,61,.92) 64%,rgba(45,91,48,.40) 86%,transparent 100%)!important;
        box-shadow:inset 0 0 34px rgba(255,255,255,.18),0 14px 30px rgba(17,57,29,.22)!important;
        pointer-events:none!important;
      }
      .fritz-builder-stage.is-ready-to-place{cursor:crosshair!important}
      .fritz-builder-stage>.fritz-builder-object{z-index:5!important;max-width:none!important;max-height:none!important}
      .fritz-builder-stage>.fritz-builder-object.is-selected{z-index:100!important}
      .fritz-builder-stage .fritz-object-label{display:none!important}
      .fritz-builder-piece.is-selected{outline:5px solid #f6c744!important;box-shadow:0 0 0 4px #0b3a75,0 8px 20px rgba(0,0,0,.25)!important}
      .fritz-builder-instruction{position:relative;z-index:2}
    `;
    document.head.appendChild(style);
  }

  function pointFor(stage,clientX,clientY){
    const rect=stage.getBoundingClientRect();
    return {
      x:Math.min(88,Math.max(12,((clientX-rect.left)/rect.width)*100)),
      y:Math.min(84,Math.max(30,((clientY-rect.top)/rect.height)*100))
    };
  }

  function applySizes(overlay){
    overlay.querySelectorAll(".fritz-builder-object[data-piece-id]").forEach(item=>{
      const size=SCALE[item.dataset.pieceId];
      if(!size) return;
      item.style.width=`${size.w}px`;
      item.style.height=`${size.h}px`;
    });
  }

  function install(engine){
    const overlay=document.querySelector(".fritz-builder-overlay");
    const stage=overlay&&overlay.querySelector(".fritz-builder-stage");
    const tray=overlay&&overlay.querySelector(".fritz-builder-tray");
    if(!overlay||!stage||!tray||overlay.dataset.usability5034==="1") return;
    overlay.dataset.usability5034="1";

    const placements=engine.placements();
    let selectedId="";
    const buttons=()=>[...tray.querySelectorAll(".fritz-builder-piece[data-piece-id]")];

    const select=id=>{
      selectedId=id||"";
      buttons().forEach(button=>button.classList.toggle("is-selected",button.dataset.pieceId===selectedId));
      stage.classList.toggle("is-ready-to-place",Boolean(selectedId));
      const instruction=tray.querySelector(".fritz-builder-instruction");
      if(instruction){
        instruction.textContent=selectedId
          ? "Now click or tap an open place in the meadow."
          : "Choose a piece, then click or tap an open place in the meadow.";
      }
    };

    const commitPlacement=(id,clientX,clientY)=>{
      if(!id) return;
      const point=pointFor(stage,clientX,clientY);
      placements[id]={x:point.x,y:point.y,z:Math.max(20,...Object.values(placements).map(p=>p&&p.z||0))+1};
      if(typeof saveGame==="function") saveGame(engine.scene.save);
      select("");
      overlay.remove();
      requestAnimationFrame(()=>engine.showBuilder());
    };

    buttons().forEach(button=>{
      button.draggable=true;
      button.addEventListener("click",event=>{
        if(button.disabled) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        select(button.dataset.pieceId);
      },true);
      button.addEventListener("dragstart",event=>{
        if(button.disabled){event.preventDefault();return;}
        const id=button.dataset.pieceId;
        select(id);
        event.dataTransfer?.setData("text/plain",id);
        if(event.dataTransfer) event.dataTransfer.effectAllowed="copy";
      },true);
    });

    stage.addEventListener("click",event=>{
      if(!selectedId) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      commitPlacement(selectedId,event.clientX,event.clientY);
    },true);

    stage.addEventListener("pointerup",event=>{
      if(!selectedId||event.pointerType==="mouse") return;
      event.preventDefault();
      event.stopImmediatePropagation();
      commitPlacement(selectedId,event.clientX,event.clientY);
    },true);

    stage.addEventListener("dragover",event=>{
      event.preventDefault();
      if(event.dataTransfer) event.dataTransfer.dropEffect="copy";
    },true);

    stage.addEventListener("drop",event=>{
      event.preventDefault();
      event.stopImmediatePropagation();
      const id=event.dataTransfer?.getData("text/plain")||selectedId;
      commitPlacement(id,event.clientX,event.clientY);
    },true);

    applySizes(overlay);
    requestAnimationFrame(()=>applySizes(overlay));
    setTimeout(()=>applySizes(overlay),120);
  }

  installStyles();
  const original=BuilderEngine.prototype.showBuilder;
  BuilderEngine.prototype.showBuilder=function(){
    const result=original.apply(this,arguments);
    requestAnimationFrame(()=>install(this));
    setTimeout(()=>install(this),160);
    return result;
  };
})();
