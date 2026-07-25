/* Fritz Academy Illustration Library v50.12 */
(function(){
  "use strict";

  const registry=window.FritzAssetRegistry;
  if(!registry){
    throw new Error("FritzAssetRegistry must load before illustrationLibrary.js");
  }

  const characters={};
  Object.values(registry.characters).forEach(asset=>{
    characters[asset.id]={
      id:asset.id,
      name:asset.name,
      species:asset.meta&&asset.meta.species||"",
      role:asset.meta&&asset.meta.role||"",
      scale:asset.scale||1,
      primary:registry.selected(asset),
      production:asset.production,
      fallback:asset.legacy||"",
      productionReady:Boolean(asset.productionReady),
      voiceId:asset.meta&&asset.meta.voice||asset.id,
      rules:asset.meta&&asset.meta.rules||[]
    };
  });

  const avatars = [
    ["girl-1","assets/avatars/girl/ChatGPT Image Jul 13, 2026, 05_09_47 PM.png"],
    ["girl-2","assets/avatars/girl/ChatGPT Image Jul 13, 2026, 05_38_28 PM.png"],
    ["girl-3","assets/avatars/girl/ChatGPT Image Jul 13, 2026, 05_46_11 PM.png"],
    ["girl-4","assets/avatars/girl/ChatGPT Image Jul 13, 2026, 06_04_48 PM.png"],
    ["girl-5","assets/avatars/girl/ChatGPT Image Jul 13, 2026, 06_26_03 PM.png"],
    ["girl-6","assets/avatars/girl/ChatGPT Image Jul 13, 2026, 06_53_21 PM.png"],
    ["boy-1","assets/avatars/boy/ChatGPT Image Jul 13, 2026, 04_52_40 PM.png"],
    ["boy-2","assets/avatars/boy/ChatGPT Image Jul 13, 2026, 05_30_53 PM.png"],
    ["boy-3","assets/avatars/boy/ChatGPT Image Jul 13, 2026, 05_43_25 PM.png"],
    ["boy-4","assets/avatars/boy/ChatGPT Image Jul 13, 2026, 05_52_10 PM.png"],
    ["boy-5","assets/avatars/boy/ChatGPT Image Jul 13, 2026, 06_18_19 PM.png"],
    ["boy-6","assets/avatars/boy/ChatGPT Image Jul 13, 2026, 06_47_19 PM.png"]
  ].map(([id,src])=>({id,name:id.replace("-"," ").replace(/\b\w/g,c=>c.toUpperCase()),src,type:"student-avatar"}));

  const environments={};
  Object.values(registry.environments).forEach(asset=>{
    environments[asset.id]={
      id:asset.id,
      name:asset.name,
      src:registry.selected(asset),
      production:asset.production,
      fallback:asset.legacy||"",
      productionReady:Boolean(asset.productionReady),
      tags:asset.tags||[]
    };
  });

  const expressions=["happy","laughing","thinking","surprised","sad","proud","curious","worried","excited","focused"];
  const poses=["standing","sitting","walking","running","jumping","waving","pointing","reading","listening","building","singing","celebrating"];

  window.FritzIllustrationLibrary={version:"50.12",characters,avatars,environments,expressions,poses};
})();
