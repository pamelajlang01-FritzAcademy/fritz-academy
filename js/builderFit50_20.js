/* Fritz Academy Builder final viewport fit v50.20 */
(function(){
  "use strict";
  if(typeof BuilderEngine==="undefined") return;

  function installStyles(){
    if(document.getElementById("fritz-builder-fit-50-20")) return;
    const style=document.createElement("style");
    style.id="fritz-builder-fit-50-20";
    style.textContent=`
      .fritz-builder-overlay{padding:4px!important;overflow:hidden!important}
      .fritz-builder-shell{width:calc(100vw - 8px)!important;height:calc(100dvh - 8px)!important;max-width:none!important;max-height:none!important;border-width:4px!important;border-radius:18px!important;grid-template-rows:auto minmax(0,1fr) auto!important}
      .fritz-builder-header{padding:9px 14px!important;min-height:58px!important}
      .fritz-builder-title{font-size:clamp(25px,2.5vw,38px)!important;line-height:1.05!important}
      .fritz-builder-subtitle{font-size:clamp(14px,1.35vw,20px)!important;max-width:44%!important}
      .fritz-builder-main{grid-template-columns:minmax(220px,280px) minmax(0,1fr)!important;min-height:0!important;overflow:hidden!important}
      .fritz-builder-tray{min-height:0!important;overflow-y:auto!important;padding:10px!important}
      .fritz-builder-tray h3{font-size:24px!important;margin:0 0 8px!important}
      .fritz-builder-instruction{font-size:14px!important;padding:8px 10px!important;margin-bottom:8px!important}
      .fritz-builder-piece{min-height:88px!important;margin-bottom:8px!important;grid-template-columns:82px 1fr!important;padding:7px!important}
      .fritz-piece-preview{height:72px!important}
      .fritz-builder-stage-wrap{min-width:0!important;min-height:0!important;overflow:hidden!important;padding:8px!important;display:flex!important;align-items:center!important;justify-content:center!important}
      .fritz-builder-stage{width:min(100%,calc((100dvh - 178px) * 1.7778))!important;height:auto!important;max-height:100%!important;min-height:0!important;aspect-ratio:16/9!important;background-size:100% 100%!important;background-position:center!important;flex:0 1 auto!important}
      .fritz-builder-object{width:min(var(--fritz-piece-width,145px),12.5vw)!important;height:min(var(--fritz-piece-height,114px),10vw)!important;max-width:150px!important;max-height:118px!important}
      .fritz-builder-object .fritz-object-label{display:none!important}
      .fritz-builder-footer{padding:7px 9px!important;gap:7px!important;flex-wrap:nowrap!important;overflow-x:auto!important;justify-content:center!important}
      .fritz-builder-footer button{font-size:14px!important;padding:8px 12px!important;white-space:nowrap!important;border-width:2px!important}
      @media(max-width:900px){
        .fritz-builder-main{grid-template-columns:minmax(190px,235px) minmax(0,1fr)!important}
        .fritz-builder-stage{width:min(100%,calc((100dvh - 174px) * 1.7778))!important}
        .fritz-builder-subtitle{display:none!important}
      }
      @media(max-width:680px){
        .fritz-builder-main{grid-template-columns:1fr!important;grid-template-rows:126px minmax(0,1fr)!important}
        .fritz-builder-tray{display:flex!important;gap:7px!important;overflow-x:auto!important;overflow-y:hidden!important;border-right:0!important;border-bottom:3px solid #0b3a75!important}
        .fritz-builder-tray h3,.fritz-builder-instruction{display:none!important}
        .fritz-builder-piece{min-width:170px!important;height:104px!important;margin:0!important}
        .fritz-builder-stage{width:min(100%,calc((100dvh - 250px) * 1.7778))!important}
      }
    `;
    document.head.appendChild(style);
  }

  function polish(){
    const stage=document.querySelector(".fritz-builder-stage");
    if(!stage) return;
    stage.querySelectorAll(".fritz-builder-object").forEach(item=>{
      item.style.setProperty("--fritz-piece-width",item.style.width||"145px");
      item.style.setProperty("--fritz-piece-height",item.style.height||"114px");
      const x=Math.min(89,Math.max(11,parseFloat(item.style.left)||50));
      const y=Math.min(86,Math.max(14,parseFloat(item.style.top)||50));
      item.style.left=`${x}%`;
      item.style.top=`${y}%`;
    });
  }

  installStyles();
  const original=BuilderEngine.prototype.showBuilder;
  BuilderEngine.prototype.showBuilder=function(){
    const result=original.call(this);
    requestAnimationFrame(polish);
    setTimeout(polish,100);
    return result;
  };
  window.addEventListener("resize",()=>requestAnimationFrame(polish));
})();
