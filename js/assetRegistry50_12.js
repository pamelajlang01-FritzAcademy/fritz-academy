/* Fritz Academy Central Asset Registry v50.27 */
(function(){
  "use strict";

  const character=(id,name,production,legacy,scale,productionReady=false,meta={})=>({
    id,name,type:"character",production,legacy,scale,productionReady,meta,
    src(){ return this.productionReady?this.production:this.legacy; }
  });

  const environment=(id,name,production,legacy,productionReady=false,tags=[],composition={})=>({
    id,name,type:"environment",production,legacy,productionReady,tags,composition,
    src(){ return this.productionReady?this.production:this.legacy; }
  });

  const characters={
    fritz:character("fritz","Captain Fritz","assets/characters/captain-fritz/standing.png","assets/captain_fritz.png",1,true,{species:"Dalmatian",voice:"captain-fritz"}),
    bash:character("bash","Bash","assets/characters/bash/standing.png","assets/bash.png",1.08,true,{species:"German Shepherd",voice:"bash",rules:["left ear floppy","slightly taller than Captain Fritz"]}),
    bear:character("bear","Bear","assets/characters/bear/standing.png","assets/bear.png",.84,true,{species:"German Shepherd",voice:"bear",rules:["more tan than black","navy Academy hoodie"]}),
    nola:character("nola","Nola","assets/characters/nola/standing.png","assets/nola.png",1,true,{species:"Cane Corso",voice:"nola"}),
    tony:character("tony","Tony","assets/characters/tony/standing.png","assets/tony.png",.58,true,{species:"White Schnoodle",voice:"tony"}),
    rascal:character("rascal","Rascal","assets/characters/rascal/standing.png","assets/rascal.png",.84,true,{species:"Golden Retriever",voice:"rascal"})
  };

  /* Verified PNG used as a safe temporary background while the individual
     environment artwork is converted and validated as PNG. */
  const sharedLegacy="assets/fa_master_campus_v1.png";
  const outdoor={left:{x:-.27,y:.16},center:{x:0,y:.16},right:{x:.27,y:.16}};
  const indoor={left:{x:-.26,y:.18},center:{x:0,y:.18},right:{x:.26,y:.18}};
  const environments={
    campus:environment("campus","Fritz Academy Campus","assets/environments/academy-front.svg",sharedLegacy,false,["legacy-id","outdoor"],outdoor),
    "academy-gate":environment("academy-gate","Academy Gate","assets/environments/academy-gate.svg",sharedLegacy,false,["outdoor","entrance","arrival"],{fritz:{x:-.24,y:.16},student:{x:.23,y:.17},center:{x:0,y:.16}}),
    "academy-front":environment("academy-front","Academy Front","assets/environments/academy-front.svg",sharedLegacy,false,["outdoor","entrance"],outdoor),
    "welcome-garden":environment("welcome-garden","Welcome Garden","assets/environments/welcome-garden.svg",sharedLegacy,false,["outdoor","garden"],outdoor),
    "color-garden":environment("color-garden","Color Garden","assets/environments/color-garden.svg",sharedLegacy,false,["outdoor","garden","colors"],outdoor),
    "reading-room":environment("reading-room","Reading Room","assets/environments/reading-room.svg",sharedLegacy,false,["indoor","reading"],indoor),
    classroom:environment("classroom","Classroom","assets/environments/classroom.svg",sharedLegacy,false,["indoor","school"],indoor),
    "music-room":environment("music-room","Music Room","assets/environments/music-room.svg",sharedLegacy,false,["indoor","music"],indoor),
    playground:environment("playground","Playground","assets/environments/playground.svg",sharedLegacy,false,["outdoor","play"],outdoor),
    "builder-yard":environment("builder-yard","Builder Yard","assets/environments/builder-yard.svg",sharedLegacy,false,["outdoor","builder"],outdoor)
  };

  const props={
    gate:{id:"gate",production:"assets/props/gate.png",productionReady:false},
    flag:{id:"flag",production:"assets/props/academy-flag.png",productionReady:false},
    "name-tag":{id:"name-tag",production:"assets/props/name-tag.png",productionReady:false},
    bench:{id:"bench",production:"assets/props/bench.png",productionReady:false},
    book:{id:"book",production:"assets/props/book-blue.png",productionReady:false},
    backpack:{id:"backpack",production:"assets/props/backpack.png",productionReady:false},
    map:{id:"map",production:"assets/props/garden-map.png",productionReady:false},
    flowers:{id:"flowers",production:"assets/props/flowers.png",productionReady:false},
    "young-tree":{id:"young-tree",production:"assets/props/young-tree.png",productionReady:false}
  };

  function selected(asset){
    if(!asset) return "";
    return typeof asset.src==="function"?asset.src():(asset.productionReady?asset.production:asset.legacy||asset.production||"");
  }

  function markReady(type,id,ready=true){
    const group=type==="character"?characters:type==="environment"?environments:props;
    if(!group[id]) return false;
    group[id].productionReady=Boolean(ready);
    return true;
  }

  function audit(){
    const rows=[];
    Object.values(characters).forEach(asset=>rows.push({type:"character",id:asset.id,name:asset.name,active:selected(asset),production:asset.production,productionReady:asset.productionReady}));
    Object.values(environments).forEach(asset=>rows.push({type:"environment",id:asset.id,name:asset.name,active:selected(asset),production:asset.production,productionReady:asset.productionReady}));
    Object.values(props).forEach(asset=>rows.push({type:"prop",id:asset.id,name:asset.id,active:asset.productionReady?asset.production:"generated-placeholder",production:asset.production,productionReady:asset.productionReady}));
    return rows;
  }

  window.FritzAssetRegistry={version:"50.27",characters,environments,props,selected,markReady,audit};
})();