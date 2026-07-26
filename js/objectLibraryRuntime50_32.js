/* Fritz Academy object library runtime v50.32
   Ensures builder tray, placed objects, and earned-piece screens use the approved PNG object library. */
(function(){
  "use strict";

  const OBJECTS={
    "welcome-flowers":{label:"Welcome Flowers",asset:"assets/objects/welcome_flowers.png",width:150},
    "stone-path":{label:"Stone Garden Path",asset:"assets/objects/stone_path.png",width:190},
    "reading-bench":{label:"Garden Reading Bench",asset:"assets/objects/reading_bench.png",width:185},
    "welcome-tree":{label:"Welcome Tree",asset:"assets/objects/garden_tree.png",width:170},
    "garden-fence":{label:"Garden Fence",asset:"assets/objects/garden_fence.png",width:205},
    "story-rug":{label:"Story Rug",asset:"assets/objects/story_rug.png",width:190},
    "book-shelf":{label:"Book Shelf",asset:"assets/objects/book_shelf.png",width:175},
    "reading-chair":{label:"Reading Chair",asset:"assets/objects/reading_chair.png",width:155},
    "book-cart":{label:"Book Cart",asset:"assets/objects/book_cart.png",width:180},
    "reading-circle":{label:"Reading Circle",asset:"assets/objects/reading_circle.png",width:210},
    "story-tree-stump":{label:"Story Tree Stump",asset:"assets/objects/story_tree_stump.png",width:170},
    "outdoor-story-stump":{label:"Outdoor Story Stump",asset:"assets/objects/outdoor_story_stump.png",width:180},
    "fritz-statue":{label:"Captain Fritz Statue",asset:"assets/objects/fritz_statue.png",width:145},
    "academy-flag":{label:"Academy Flag",asset:"assets/objects/academy_flag.png",width:170},
    "academy-mailbox":{label:"Academy Mailbox",asset:"assets/objects/academy_mailbox.png",width:165},
    "academy-bell":{label:"Academy Bell",asset:"assets/objects/academy_bell.png",width:170},
    "trophy-display":{label:"Trophy Display",asset:"assets/objects/trophy_display.png",width:190},
    "paw-print-stepping-stones":{label:"Paw Print Stepping Stones",asset:"assets/objects/paw_print_stepping_stones.png",width:195}
  };

  function installStyles(){
    if(document.getElementById("fritz-object-library-runtime-50-32")) return;
    const style=document.createElement("style");
    style.id="fritz-object-library-runtime-50-32";
    style.textContent=`
      .fritz-piece-preview{display:grid!important;place-items:center!important;overflow:hidden!important}
      .fritz-piece-preview img{display:block!important;width:96%!important;height:96%!important;object-fit:contain!important}
      .fritz-builder-object{background:transparent!important}
      .fritz-builder-object img{display:block!important;width:100%!important;height:100%!important;object-fit:contain!important;pointer-events:none!important}
      .fritz-builder-object span:not(.fritz-object-label){display:none!important}
    `;
    document.head.appendChild(style);
  }

  function applyBuilderAssets(){
    document.querySelectorAll(".fritz-builder-piece[data-piece-id]").forEach(button=>{
      const def=OBJECTS[button.dataset.pieceId];
      if(!def) return;
      let preview=button.querySelector(".fritz-piece-preview");
      if(!preview){
        preview=document.createElement("div");
        preview.className="fritz-piece-preview";
        button.prepend(preview);
      }
      preview.className="fritz-piece-preview";
      preview.innerHTML=`<img src="${def.asset}" alt="${def.label}">`;
    });

    document.querySelectorAll(".fritz-builder-object[data-piece-id]").forEach(item=>{
      const def=OBJECTS[item.dataset.pieceId];
      if(!def) return;
      const selected=item.classList.contains("is-selected");
      item.className="fritz-builder-object object-library-piece"+(selected?" is-selected":"");
      item.style.width=`${def.width}px`;
      item.style.height=`${Math.round(def.width*0.8)}px`;
      item.innerHTML=`<img src="${def.asset}" alt="${def.label}"><span class="fritz-object-label">${def.label}</span>`;
    });
  }

  function scheduleBuilderApply(){
    requestAnimationFrame(applyBuilderAssets);
    setTimeout(applyBuilderAssets,40);
    setTimeout(applyBuilderAssets,140);
    setTimeout(applyBuilderAssets,350);
  }

  installStyles();
  const observer=new MutationObserver(scheduleBuilderApply);
  observer.observe(document.documentElement,{childList:true,subtree:true});

  if(typeof BuilderEngine!=="undefined"){
    const originalShow=BuilderEngine.prototype.showBuilder;
    BuilderEngine.prototype.showBuilder=function(){
      const result=originalShow.apply(this,arguments);
      scheduleBuilderApply();
      return result;
    };
  }

  if(typeof LessonEngine!=="undefined"){
    LessonEngine.prototype.rewardPiece=function(piece,message,callback){
      this.earnPiece(piece);
      const def=piece&&OBJECTS[piece.id];
      const objects=[];
      const title=this.scene.add.text(0,-175,"Build Piece Earned!",{
        fontSize:"34px",fontStyle:"bold",color:"#102342"
      }).setOrigin(.5);
      objects.push(title);

      const finishRender=(textureKey)=>{
        if(textureKey){
          const image=this.scene.add.image(0,-65,textureKey).setOrigin(.5);
          const maxW=260,maxH=175;
          image.setScale(Math.min(maxW/image.width,maxH/image.height,1));
          objects.push(image);
        }else{
          objects.push(this.scene.add.text(0,-65,(piece&&piece.icon)||"⭐",{fontSize:"72px"}).setOrigin(.5));
        }
        const name=this.scene.add.text(0,45,(def&&def.label)||(piece&&piece.name)||"Builder Piece",{
          fontSize:"29px",fontStyle:"bold",color:"#174ea6"
        }).setOrigin(.5);
        const body=this.scene.add.text(0,100,message||"You earned a new builder piece!",{
          fontSize:"21px",fontStyle:"bold",color:"#102342",align:"center",wordWrap:{width:620}
        }).setOrigin(.5);
        const continueButton=this.scene.panels.makeButton(0,185,"Add to Builder Pack",callback);
        objects.push(name,body,continueButton);
        this.scene.panels.open(objects,{width:720,height:540});
      };

      if(!def){ finishRender(null); return; }
      const key=`object-reward-${piece.id}`;
      if(this.scene.textures.exists(key)){ finishRender(key); return; }
      const event=`filecomplete-image-${key}`;
      const complete=()=>finishRender(key);
      const failed=file=>{
        if(file&&file.key===key){
          this.scene.load.off(event,complete);
          finishRender(null);
        }
      };
      this.scene.load.once(event,complete);
      this.scene.load.once("loaderror",failed);
      this.scene.load.image(key,def.asset);
      this.scene.load.start();
    };
  }

  window.FritzObjectLibraryRuntime={version:"50.32",objects:OBJECTS,apply:applyBuilderAssets};
})();