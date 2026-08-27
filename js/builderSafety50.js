/* Fritz Academy Builder interaction safety v50.1 — containment only */
(function(){
  "use strict";

  const clamp=(v,min,max)=>Math.min(max,Math.max(min,v));

  function clampNode(stage,item){
    const r=stage.getBoundingClientRect();
    if(!r.width || !r.height) return;
    const hx=Math.max(8,item.offsetWidth*.43/r.width*100);
    const hy=Math.max(10,item.offsetHeight*.43/r.height*100);
    item.style.left=`${clamp(parseFloat(item.style.left)||50,hx,100-hx)}%`;
    item.style.top=`${clamp(parseFloat(item.style.top)||50,hy,100-hy)}%`;
  }

  function clampAll(){
    const stage=document.querySelector(".fritz-builder-stage");
    if(!stage)return;
    stage.querySelectorAll(".fritz-builder-object").forEach(item=>clampNode(stage,item));
  }

  function install(){
    if(document.getElementById("fritz-builder50-style"))return;

    const style=document.createElement("style");
    style.id="fritz-builder50-style";
    style.textContent=`
      .fritz-builder-stage{overflow:hidden!important}
      .fritz-builder-object{width:120px!important;height:120px!important;max-width:22%!important;max-height:28%!important;transform:translate(-50%,-50%) scale(.86)!important}
      .fritz-builder-object.is-selected{transform:translate(-50%,-50%) scale(.91)!important}
      .fritz-builder-piece .fritz-piece-preview{font-size:0!important}
    `;
    document.head.appendChild(style);

    /*
      Builder 45 already owns pointer/touch dragging and persists the final
      position. The previous safety patch also listened to every global
      pointermove and moved the selected object a second time. That created
      competing drag controllers and could make a merely selected object move
      with the pointer. Safety now only enforces containment after placement or
      layout changes; it never takes ownership of dragging.
    */
    window.addEventListener("pointerup",()=>requestAnimationFrame(clampAll));
    window.addEventListener("touchend",()=>requestAnimationFrame(clampAll),{passive:true});

    const observer=new MutationObserver(mutations=>{
      if(mutations.some(m=>Array.from(m.addedNodes).some(node=>node.nodeType===1 && (node.matches?.(".fritz-builder-object,.fritz-builder-overlay") || node.querySelector?.(".fritz-builder-object"))))){
        requestAnimationFrame(clampAll);
      }
    });
    observer.observe(document.body,{childList:true,subtree:true});

    window.addEventListener("resize",()=>requestAnimationFrame(clampAll));
  }

  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",install);else install();
})();
