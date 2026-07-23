/* Fritz Academy Builder interaction safety v50.0 */
(function(){
  "use strict";
  const clamp=(v,min,max)=>Math.min(max,Math.max(min,v));
  function clampNode(stage,item){
    const r=stage.getBoundingClientRect();
    const hx=Math.max(8,item.offsetWidth*.43/r.width*100),hy=Math.max(10,item.offsetHeight*.43/r.height*100);
    item.style.left=`${clamp(parseFloat(item.style.left)||50,hx,100-hx)}%`;
    item.style.top=`${clamp(parseFloat(item.style.top)||50,hy,100-hy)}%`;
  }
  function clampAll(){
    const stage=document.querySelector(".fritz-builder-stage");if(!stage)return;
    stage.querySelectorAll(".fritz-builder-object").forEach(item=>clampNode(stage,item));
  }
  function install(){
    if(document.getElementById("fritz-builder50-style")) return;
    const style=document.createElement("style");style.id="fritz-builder50-style";
    style.textContent=`
      .fritz-builder-stage{overflow:hidden!important}
      .fritz-builder-object{width:120px!important;height:120px!important;max-width:22%!important;max-height:28%!important;transform:translate(-50%,-50%) scale(.86)!important}
      .fritz-builder-object.is-selected{transform:translate(-50%,-50%) scale(.91)!important}
      .fritz-builder-piece .fritz-piece-preview{font-size:0!important}
    `;document.head.appendChild(style);
    window.addEventListener("pointermove",e=>{
      const stage=document.querySelector(".fritz-builder-stage");
      const item=stage&&stage.querySelector(".fritz-builder-object.is-selected");
      if(!stage||!item)return;
      requestAnimationFrame(()=>{
        const r=stage.getBoundingClientRect();
        const hx=Math.max(8,item.offsetWidth*.43/r.width*100),hy=Math.max(10,item.offsetHeight*.43/r.height*100);
        item.style.left=`${clamp((e.clientX-r.left)/r.width*100,hx,100-hx)}%`;
        item.style.top=`${clamp((e.clientY-r.top)/r.height*100,hy,100-hy)}%`;
      });
    });
    window.addEventListener("pointerup",()=>requestAnimationFrame(clampAll));
    const observer=new MutationObserver(()=>requestAnimationFrame(clampAll));
    observer.observe(document.body,{childList:true,subtree:true});
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",install);else install();
})();