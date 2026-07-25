/* Fritz Academy production Builder asset layer v50.16 */
(function(){
  "use strict";
  if(typeof BuilderEngine === "undefined") return;

  const AREA_LIBRARY={
    "welcome-garden":{
      title:"Welcome Garden",
      background:"assets/environments/welcome-garden-builder.svg",
      stages:{
        1:{subtitle:"Build the first section of your Welcome Garden."},
        2:{subtitle:"Add the next section to your Welcome Garden."},
        3:{subtitle:"Keep growing your Welcome Garden."}
      }
    }
  };

  const PIECES={
    "welcome-flowers":{label:"Welcome Flowers",asset:"assets/props/builder/welcome-flowers.svg",width:148},
    "stone-path":{label:"Stone Garden Path",asset:"assets/props/builder/stone-path.svg",width:170},
    "reading-bench":{label:"Garden Reading Bench",asset:"assets/props/builder/reading-bench.svg",width:160},
    "welcome-tree":{label:"Welcome Tree",asset:"assets/props/builder/welcome-tree.svg",width:145},
    "garden-fence":{label:"Garden Fence",asset:"assets/props/builder/garden-fence.svg",width:185}
  };

  function installStyles(){
    if(document.getElementById("fritz-builder-production-50-16")) return;
    const style=document.createElement("style");
    style.id="fritz-builder-production-50-16";
    style.textContent=`
      .fritz-builder-shell{width:min(1440px,99vw)!important;height:min(900px,98vh)!important;border-color:#f6c744!important;background:#fffaf0!important}
      .fritz-builder-header{background:linear-gradient(100deg,#082c62,#124f91)!important;color:#fff!important;border-bottom-color:#f6c744!important}
      .fritz-builder-title{color:#fff!important}.fritz-builder-subtitle{color:#ffe27a!important}
      .fritz-builder-main{grid-template-columns:minmax(230px,300px) 1fr!important}
      .fritz-builder-tray{background:linear-gradient(#fff9e8,#eef6ff)!important;border-right:4px solid #0b3a75!important}
      .fritz-builder-tray h3{color:#0b3a75!important;text-align:center!important}
      .fritz-builder-stage-wrap{background:#0b2d5d!important;padding:12px!important}
      .fritz-builder-stage{background-position:center!important;background-repeat:no-repeat!important;background-size:cover!important;border:5px solid #f6c744!important;border-radius:22px!important;min-height:570px!important}
      .fritz-builder-stage::before,.fritz-builder-stage::after,.fritz-builder-cloud{display:none!important}
      .fritz-builder-piece{grid-template-columns:100px 1fr!important;min-height:112px!important;border-color:#b28a39!important;background:#fff!important}
      .fritz-piece-preview{height:92px!important;background:linear-gradient(#e8f6ff,#d7efc5)!important;border:2px solid #d2b15f!important}
      .fritz-piece-preview img{width:92%;height:92%;object-fit:contain;display:block}
      .fritz-builder-object{background:transparent!important;filter:drop-shadow(0 10px 8px rgba(0,0,0,.28))!important}
      .fritz-builder-object img{width:100%;height:100%;object-fit:contain;display:block;pointer-events:none}
      .fritz-builder-object .fritz-object-label{bottom:-28px!important;border-color:#f6c744!important;background:#0b2d5d!important;color:#fff!important;font-size:13px!important}
      .fritz-builder-footer{background:#fff8df!important;border-top-color:#f6c744!important}
      @media(max-width:760px){.fritz-builder-main{grid-template-columns:1fr!important;grid-template-rows:160px 1fr!important}.fritz-builder-stage{min-height:420px!important}}
    `;
    document.head.appendChild(style);
  }

  function applyProductionAssets(engine){
    const areaId=(engine.build&&engine.build.areaId)||"welcome-garden";
    const area=AREA_LIBRARY[areaId];
    const stage=document.querySelector(".fritz-builder-stage");
    if(stage&&area){
      stage.style.backgroundImage=`url("${area.background}")`;
      stage.dataset.areaId=areaId;
      stage.dataset.stage=String((engine.build&&engine.build.stage)||1);
    }

    const heading=document.querySelector(".fritz-builder-title");
    const subtitle=document.querySelector(".fritz-builder-subtitle");
    if(area&&heading) heading.textContent=(engine.build&&engine.build.title)||`Build the ${area.title}`;
    if(area&&subtitle){
      const stageInfo=area.stages[(engine.build&&engine.build.stage)||1];
      subtitle.textContent=(stageInfo&&stageInfo.subtitle)||`Design your own ${area.title}.`;
    }

    document.querySelectorAll(".fritz-builder-piece[data-piece-id]").forEach(button=>{
      const id=button.dataset.pieceId;
      const def=PIECES[id];
      if(!def) return;
      const preview=button.querySelector(".fritz-piece-preview");
      if(preview){
        preview.className="fritz-piece-preview";
        preview.innerHTML=`<img src="${def.asset}" alt="${def.label}">`;
      }
      const textNodes=[...button.childNodes].filter(node=>node.nodeType===Node.TEXT_NODE);
      textNodes.forEach(node=>node.textContent=` ${def.label}`);
    });

    document.querySelectorAll(".fritz-builder-object[data-piece-id]").forEach(item=>{
      const id=item.dataset.pieceId;
      const def=PIECES[id];
      if(!def) return;
      item.className="fritz-builder-object production-builder-object"+(item.classList.contains("is-selected")?" is-selected":"");
      item.style.width=`${def.width}px`;
      item.style.height=`${Math.round(def.width*.78)}px`;
      item.innerHTML=`<img src="${def.asset}" alt="${def.label}"><span class="fritz-object-label">${def.label}</span>`;
    });
  }

  installStyles();
  const original=BuilderEngine.prototype.showBuilder;
  BuilderEngine.prototype.showBuilder=function(){
    const result=original.call(this);
    requestAnimationFrame(()=>applyProductionAssets(this));
    setTimeout(()=>applyProductionAssets(this),80);
    return result;
  };

  window.FritzBuilderProductionAssets={areas:AREA_LIBRARY,pieces:PIECES,version:"50.16"};
})();