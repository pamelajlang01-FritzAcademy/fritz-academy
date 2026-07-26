/* Fritz Academy production Builder asset layer v50.32 */
(function(){
  "use strict";
  if(typeof BuilderEngine === "undefined") return;

  const AREA_LIBRARY={
    "welcome-garden":{
      title:"Welcome Garden",
      background:"assets/environments/welcome_garden.png",
      stages:{
        1:{subtitle:"Build the first section of your Welcome Garden."},
        2:{subtitle:"Add the next section to your Welcome Garden."},
        3:{subtitle:"Keep growing your Welcome Garden."}
      }
    }
  };

  /*
   * Approved object library. The first five IDs are the pieces currently
   * earned by the Welcome Garden lesson. The remaining definitions make the
   * full Pack 1 library available to later lesson/build stages without another
   * asset-path rewrite.
   */
  const PIECES={
    "welcome-flowers":{label:"Welcome Flowers",asset:"assets/objects/welcome_flowers.png",width:178,height:118},
    "stone-path":{label:"Stone Garden Path",asset:"assets/objects/stone_path.png",width:205,height:128},
    "reading-bench":{label:"Garden Reading Bench",asset:"assets/objects/reading_bench.png",width:190,height:132},
    "welcome-tree":{label:"Welcome Tree",asset:"assets/objects/garden_tree.png",width:170,height:190},
    "garden-fence":{label:"Garden Fence",asset:"assets/objects/garden_fence.png",width:220,height:128},

    "story-rug":{label:"Story Rug",asset:"assets/objects/story_rug.png",width:210,height:130},
    "book-shelf":{label:"Book Shelf",asset:"assets/objects/book_shelf.png",width:170,height:190},
    "reading-chair":{label:"Reading Chair",asset:"assets/objects/reading_chair.png",width:165,height:178},
    "book-cart":{label:"Book Cart",asset:"assets/objects/book_cart.png",width:190,height:160},
    "reading-circle":{label:"Reading Circle",asset:"assets/objects/reading_circle.png",width:220,height:150},
    "outdoor-story-stump":{label:"Outdoor Story Stump",asset:"assets/objects/outdoor_story_stump.png",width:190,height:170},
    "captain-fritz-statue":{label:"Captain Fritz Statue",asset:"assets/objects/captain_fritz_statue.png",width:150,height:205},
    "academy-flag":{label:"Academy Flag",asset:"assets/objects/academy_flag.png",width:185,height:150},
    "academy-mailbox":{label:"Academy Mailbox",asset:"assets/objects/academy_mailbox.png",width:180,height:180},
    "academy-bell":{label:"Academy Bell",asset:"assets/objects/academy_bell.png",width:180,height:190},
    "trophy-display":{label:"Trophy Display",asset:"assets/objects/trophy_display.png",width:190,height:185},
    "paw-print-stepping-stones":{label:"Paw Print Stepping Stones",asset:"assets/objects/paw_print_stepping_stones.png",width:210,height:155}
  };

  function installStyles(){
    if(document.getElementById("fritz-builder-production-50-32")) return;
    const style=document.createElement("style");
    style.id="fritz-builder-production-50-32";
    style.textContent=`
      .fritz-builder-shell{width:min(1440px,99vw)!important;height:min(900px,98vh)!important;border-color:#f6c744!important;background:#fffaf0!important}
      .fritz-builder-header{background:linear-gradient(100deg,#082c62,#124f91)!important;color:#fff!important;border-bottom-color:#f6c744!important}
      .fritz-builder-title{color:#fff!important}.fritz-builder-subtitle{color:#ffe27a!important}
      .fritz-builder-main{grid-template-columns:minmax(230px,300px) 1fr!important}
      .fritz-builder-tray{background:linear-gradient(#fff9e8,#eef6ff)!important;border-right:4px solid #0b3a75!important}
      .fritz-builder-tray h3{color:#0b3a75!important;text-align:center!important}
      .fritz-builder-stage-wrap{background:#0b2d5d!important;padding:12px!important}
      .fritz-builder-stage{background-position:center!important;background-repeat:no-repeat!important;background-size:cover!important;border:5px solid #f6c744!important;border-radius:22px!important;min-height:570px!important}
      .fritz-builder-stage::before,.fritz-builder-cloud{display:none!important}
      .fritz-builder-piece{grid-template-columns:100px 1fr!important;min-height:112px!important;border-color:#b28a39!important;background:#fff!important}
      .fritz-piece-preview{height:92px!important;background:linear-gradient(#e8f6ff,#d7efc5)!important;border:2px solid #d2b15f!important}
      .fritz-piece-preview img{width:96%!important;height:96%!important;object-fit:contain!important;display:block!important}
      .fritz-builder-object{background:transparent!important;filter:drop-shadow(0 10px 8px rgba(0,0,0,.28))!important}
      .fritz-builder-object img{width:100%!important;height:100%!important;object-fit:contain!important;display:block!important;pointer-events:none!important}
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
      stage.style.backgroundSize="cover";
      stage.style.backgroundPosition="center";
      stage.style.backgroundRepeat="no-repeat";
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
      const selected=item.classList.contains("is-selected");
      item.className="fritz-builder-object production-builder-object"+(selected?" is-selected":"");
      item.style.width=`${def.width}px`;
      item.style.height=`${def.height||Math.round(def.width*.78)}px`;
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

  window.FritzBuilderProductionAssets={areas:AREA_LIBRARY,pieces:PIECES,version:"50.32",apply:applyProductionAssets};
})();