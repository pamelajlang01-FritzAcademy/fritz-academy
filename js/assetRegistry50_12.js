/* Fritz Academy Central Asset Registry v50.12 */
(function(){
  "use strict";

  const character=(id,name,production,legacy,scale,productionReady=false,meta={})=>({
    id,name,type:"character",production,legacy,scale,productionReady,meta,
    src(){ return this.productionReady?this.production:this.legacy; }
  });

  const environment=(id,name,production,legacy,productionReady=false,tags=[])=>({
    id,name,type:"environment",production,legacy,productionReady,tags,
    src(){ return this.productionReady?this.production:this.legacy; }
  });

  const characters={
    fritz:character("fritz","Captain Fritz","assets/characters/captain-fritz/standing.png","assets/captain_fritz.png",1,true,{species:"Dalmatian",voice:"captain-fritz"}),
    bash:character("bash","Bash","assets/characters/bash/standing.png","assets/bash.png",1.08,false,{species:"German Shepherd",voice:"bash",rules:["left ear floppy","slightly taller than Captain Fritz"]}),
    bear:character("bear","Bear","assets/characters/bear/standing.png","assets/bear.png",.84,false,{species:"German Shepherd",voice:"bear",rules:["more tan than black","navy Academy hoodie"]}),
    nola:character("nola","Nola","assets/characters/nola/standing.png","assets/nola.png",1,false,{species:"Cane Corso",voice:"nola"}),
    tony:character("tony","Tony","assets/characters/tony/standing.png","assets/tony.png",.58,false,{species:"White Schnoodle",voice:"tony"}),
    rascal:character("rascal","Rascal","assets/characters/rascal/standing.png","assets/rascal.png",.84,false,{species:"Golden Retriever",voice:"rascal"})
  };

  const sharedLegacy="assets/academy.png";
  const environments={
    campus:environment("campus","Fritz Academy Campus","assets/environments/academy-front.png",sharedLegacy,false,["legacy-id","outdoor"]),
    "academy-front":environment("academy-front","Academy Front","assets/environments/academy-front.png",sharedLegacy,false,["outdoor","entrance"]),
    "welcome-garden":environment("welcome-garden","Welcome Garden","assets/environments/welcome-garden.png",sharedLegacy,false,["outdoor","garden"]),
    "color-garden":environment("color-garden","Color Garden","assets/environments/color-garden.png",sharedLegacy,false,["outdoor","garden"]),
    "reading-room":environment("reading-room","Reading Room","assets/environments/reading-room.png",sharedLegacy,false,["indoor","reading"]),
    classroom:environment("classroom","Classroom","assets/environments/classroom.png",sharedLegacy,false,["indoor","school"]),
    "music-room":environment("music-room","Music Room","assets/environments/music-room.png",sharedLegacy,false,["indoor","music"]),
    playground:environment("playground","Playground","assets/environments/playground.png",sharedLegacy,false,["outdoor","play"]),
    "builder-yard":environment("builder-yard","Builder Yard","assets/environments/builder-yard.png",sharedLegacy,false,["outdoor","builder"])
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

  window.FritzAssetRegistry={version:"50.12",characters,environments,props,selected,markReady,audit};
})();
