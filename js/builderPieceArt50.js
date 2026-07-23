/* Fritz Academy Builder illustrated piece registry v50.0 */
(function(){
  "use strict";
  const existing=window.FritzBuilderPieceArt||(window.FritzBuilderPieceArt={});
  Object.assign(existing,{
    "welcome-flowers":{label:"Welcome Flowers",type:"flowers"},"stone-path":{label:"Stone Path",type:"path"},"reading-bench":{label:"Reading Bench",type:"bench"},"welcome-tree":{label:"Welcome Tree",type:"tree"},"garden-fence":{label:"Garden Fence",type:"fence"},
    "watering-can":{label:"Watering Can",type:"watering-can"},"flower-bed":{label:"Flower Bed",type:"flower-bed"},"garden-lantern":{label:"Garden Lantern",type:"lantern"},birdhouse:{label:"Birdhouse",type:"birdhouse"},"welcome-sign":{label:"Welcome Sign",type:"sign"},
    "map-post":{label:"Garden Map Post",type:"sign"},"clue-door":{label:"Little Clue Door",type:"door"},"letter-stones-cd":{label:"C and D Stones",type:"letter-stones"},"cat-statue":{label:"Friendly Cat Statue",type:"statue"},"direction-arrows":{label:"Direction Arrows",type:"arrows"},
    "flower-arch":{label:"Flower Arch",type:"arch"},"four-flowers":{label:"Four Bright Flowers",type:"flowers"},"letter-stones-ef":{label:"E and F Stones",type:"letter-stones"},"fish-pond":{label:"Little Fish Pond",type:"pond"},"proud-banner":{label:"Proud Builders Banner",type:"banner"}
  });
  const original=window.BuilderPieceDefinition;
  window.BuilderPieceDefinition=function(id){return existing[id]||(original&&original(id))||{label:String(id).replace(/-/g," "),type:"sign"};};
})();