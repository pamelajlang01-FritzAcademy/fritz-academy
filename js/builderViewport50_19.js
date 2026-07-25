/* Fritz Academy Builder viewport and recovery repair v50.19 */
(function(){
  "use strict";
  if(typeof BuilderEngine==="undefined") return;

  function installStyles(){
    if(document.getElementById("fritz-builder-viewport-50-19")) return;
    const style=document.createElement("style");
    style.id="fritz-builder-viewport-50-19";
    style.textContent=`
      .fritz-builder-overlay{padding:4px!important;overflow:hidden!important;align-items:stretch!important}
      .fritz-builder-shell{width:calc(100vw - 8px)!important;height:calc(100dvh - 8px)!important;max-width:none!important;max-height:none!important;border-width:4px!important;border-radius:18px!important;grid-template-rows:auto minmax(0,1fr) auto!important}
      .fritz-builder-header{padding:10px 14px!important;min-height:58px!important;box-sizing:border-box!important}
      .fritz-builder-title{font-size:clamp(24px,2.6vw,38px)!important}
      .fritz-builder-main{min-height:0!important;overflow:hidden!important;grid-template-columns:minmax(245px,330px) minmax(0,1fr)!important}
      .fritz-builder-tray{min-height:0!important;overflow-y:auto!important;overscroll-behavior:contain!important;padding:10px!important}
      .fritz-builder-stage-wrap{min-width:0!important;min-height:0!important;overflow:hidden!important;padding:10px!important}
      .fritz-builder-stage{width:100%!important;height:100%!important;min-height:0!important;box-sizing:border-box!important;overflow:hidden!important}
      .fritz-builder-footer{position:relative!important;z-index:20!important;padding:8px 10px!important;min-height:58px!important;box-sizing:border-box!important;flex-wrap:nowrap!important;overflow-x:auto!important}
      .fritz-builder-footer button{white-space:nowrap!important;padding:9px 13px!important;font-size:15px!important}
      .fritz-builder-object{max-width:150px!important;max-height:135px!important}
      @media(max-width:820px){
        .fritz-builder-main{grid-template-columns:minmax(205px,28vw) minmax(0,1fr)!important;grid-template-rows:1fr!important}
        .fritz-builder-piece{grid-template-columns:74px 1fr!important;min-height:92px!important}
        .fritz-piece-preview{height:72px!important}
        .fritz-builder-subtitle{font-size:14px!important}
      }
    `;
    document.head.appendChild(style);
  }

  function safePoint(stage,item,x,y){
    const rect=stage.getBoundingClientRect();
    const width=Math.max(80,item?item.getBoundingClientRect().width:120);
    const height=Math.max(72,item?item.getBoundingClientRect().height:110);
    const marginX=Math.min(18,Math.max(7,(width/2+14)/rect.width*100));
    const marginY=Math.min(20,Math.max(9,(height/2+18)/rect.height*100));
    return {
      x:Math.min(100-marginX,Math.max(marginX,Number(x)||50)),
      y:Math.min(100-marginY,Math.max(marginY,Number(y)||50))
    };
  }

  function repair(engine){
    const overlay=document.querySelector(".fritz-builder-overlay");
    const stage=overlay&&overlay.querySelector(".fritz-builder-stage");
    const tray=overlay&&overlay.querySelector(".fritz-builder-tray");
    const footer=overlay&&overlay.querySelector(".fritz-builder-footer");
    if(!overlay||!stage||!tray||!footer||overlay.dataset.viewport5019==="1") return;
    overlay.dataset.viewport5019="1";

    const placements=engine.placements();
    const clampAll=()=>{
      stage.querySelectorAll(".fritz-builder-object[data-piece-id]").forEach(item=>{
        const id=item.dataset.pieceId;
        const current=placements[id]&&typeof placements[id]==="object"?placements[id]:{x:50,y:50,z:10};
        const point=safePoint(stage,item,current.x,current.y);
        current.x=point.x; current.y=point.y;
        placements[id]=current;
        item.style.left=`${point.x}%`;
        item.style.top=`${point.y}%`;
      });
      if(typeof saveGame==="function") saveGame(engine.scene.save);
    };

    requestAnimationFrame(clampAll);
    setTimeout(clampAll,140);
    window.addEventListener("resize",clampAll,{passive:true});

    const recoverButton=document.createElement("button");
    recoverButton.type="button";
    recoverButton.textContent="Return All Pieces to Tray";
    recoverButton.title="Recover any piece that was placed off-screen";
    recoverButton.addEventListener("click",()=>{
      (engine.build.requiredPieces||[]).forEach(id=>delete placements[id]);
      if(typeof saveGame==="function") saveGame(engine.scene.save);
      overlay.remove();
      engine.showBuilder();
    });

    const centerButton=document.createElement("button");
    centerButton.type="button";
    centerButton.textContent="Bring Pieces Into View";
    centerButton.addEventListener("click",clampAll);

    const finish=footer.querySelector(".primary");
    if(finish) footer.insertBefore(recoverButton,finish);
    else footer.appendChild(recoverButton);
    if(finish) footer.insertBefore(centerButton,finish);
    else footer.appendChild(centerButton);

    // Keep the currently selected tray card visible.
    tray.addEventListener("click",event=>{
      const card=event.target.closest(".fritz-builder-piece");
      if(card) card.scrollIntoView({block:"nearest",behavior:"smooth"});
    });
  }

  installStyles();
  const original=BuilderEngine.prototype.showBuilder;
  BuilderEngine.prototype.showBuilder=function(){
    const result=original.call(this);
    requestAnimationFrame(()=>repair(this));
    setTimeout(()=>repair(this),180);
    return result;
  };
})();
