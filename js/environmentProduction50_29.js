/* Fritz Academy Production Environment Integration v50.29 */
(function(){
  "use strict";

  const aliases={
    academy_gate:"academy-gate",
    academy_front:"academy-front",
    welcome_garden:"welcome-garden",
    academy_path:"academy-path",
    reading_room:"reading-room",
    classroom_beginner:"classroom-beginner",
    classroom_primary:"classroom-primary",
    builder_workshop:"builder-workshop",
    builder_yard:"builder-yard"
  };

  const required=[
    "academy-gate","academy-front","welcome-garden","academy-path",
    "bridge","stream","library","reading-room","hallway",
    "classroom-beginner","classroom-primary","builder-workshop"
  ];

  function normalize(id){
    const raw=String(id||"").trim();
    return aliases[raw]||raw;
  }

  function validate(){
    const registry=window.FritzAssetRegistry;
    if(!registry||!registry.environments) return {valid:false,errors:["Environment registry unavailable"]};
    const errors=[];
    required.forEach(id=>{
      const asset=registry.environments[id];
      if(!asset) errors.push(`Missing environment registry entry: ${id}`);
      else if(!asset.productionReady) errors.push(`Environment not production-ready: ${id}`);
      else if(!/\.png(?:\?|$)/i.test(asset.production||"")) errors.push(`Environment is not using PNG production art: ${id}`);
    });
    return {valid:errors.length===0,errors};
  }

  if(window.IllustrationEngine&&window.IllustrationEngine.prototype){
    const original=window.IllustrationEngine.prototype.environment;
    window.IllustrationEngine.prototype.environment=function(id){
      return original.call(this,normalize(id));
    };
  }

  window.FritzEnvironmentProduction={version:"50.29",aliases,required,normalize,validate};

  const result=validate();
  if(!result.valid) console.error("[Fritz Academy] Production environment validation failed",result.errors);
  else console.info("[Fritz Academy] Production Environment Packs 1 and 2 active.");
})();
