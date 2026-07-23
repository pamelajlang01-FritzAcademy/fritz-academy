/* Fritz Academy reusable illustration props v46.2 */
(function(){
  "use strict";
  if(typeof IllustrationEngine==="undefined") return;
  const symbols={
    gate:"🏫",flag:"🚩",path:"🪨",speech:"💬","name-tag":"🏷️",sparkles:"✨",flowers:"🌼🌷",butterfly:"🦋","empty-bed":"🟫","flower-basket":"🧺🌷","young-tree":"🌳",question:"❓","backpack-outline":"◻️🎒",backpack:"🎒",thought:"💭",book:"📘",bench:"🪑",magnifier:"🔎",bush:"🌿",map:"🗺️","map-mark":"❌",idea:"💡",arrow:"➡️","garden-sign":"🪧",
    "arrow-left":"⬅️","arrow-right":"➡️","arrow-forward":"⬆️","little-door":"🚪","letters-cd":"C  D","letters-ef":"E  F",cat:"🐈","calm-symbol":"😌","direction-card":"🧭","garden-corner":"🌿","covered-circle":"⭕","open-circle":"🌸⭕🌸","envelope-e":"✉️ E","clue-card":"📜","fence":"🪵🪵","flowers-four":"🌸🌼🌷🌻","flowers-five":"🌸🌼🌷🌻🌺","paper-flower":"📄🌸","fish-pond":"💧","fish-four":"🐟🐟🐟🐟",egg:"🥚","safe-hands":"🙌","flower-arch":"🌸🌿🌸","final-stone":"🪨","proud-banner":"🏳️ GREAT BUILDERS!"
  };
  window.FritzIllustrationPropKinds=Object.freeze(Object.keys(symbols));
  IllustrationEngine.prototype.makeProp=function(spec,x,y,width,height,index){
    const symbol=symbols[spec.kind]||`[${String(spec.kind||"prop").replace(/-/g," ")}]`;
    const isLabel=/letters-|banner|clue-card|direction-card/.test(spec.kind||"");
    const style={
      fontSize:`${Math.round((isLabel?30:42)*(Number(spec.scale)||1))}px`,
      fontStyle:isLabel?"bold":"normal",
      color:"#102342",
      align:"center",
      backgroundColor:isLabel?"rgba(255,255,255,.9)":undefined,
      padding:isLabel?{x:8,y:5}:undefined,
      wordWrap:{width:Math.max(100,width*.28)}
    };
    return this.scene.add.text(x+(Number(spec.x)||0)*width,y+(Number(spec.y)||0)*height,symbol,style).setOrigin(.5).setDepth(5+index);
  };
})();