/* Fritz Academy reusable illustration props v47.1 */
(function(){
  "use strict";
  if(typeof IllustrationEngine==="undefined") return;
  const symbols={
    gate:"🏫",flag:"🚩",path:"🪨",speech:"💬","name-tag":"🏷️",sparkles:"✨",flowers:"🌼🌷",butterfly:"🦋","empty-bed":"🟫","flower-basket":"🧺🌷","young-tree":"🌳",question:"❓","backpack-outline":"◻️🎒",backpack:"🎒",thought:"💭",book:"📘",bench:"🪑",magnifier:"🔎",bush:"🌿",map:"🗺️","map-mark":"❌",idea:"💡",arrow:"➡️","garden-sign":"🪧",
    "arrow-left":"⬅️","arrow-right":"➡️","arrow-forward":"⬆️","little-door":"🚪","letters-cd":"C  D","letters-ef":"E  F",cat:"🐈","calm-symbol":"😌","direction-card":"🧭","garden-corner":"🌿","covered-circle":"⭕","open-circle":"🌸⭕🌸","envelope-e":"✉️ E","clue-card":"📜",fence:"🪵🪵","flowers-four":"🌸🌼🌷🌻","flowers-five":"🌸🌼🌷🌻🌺","paper-flower":"📄🌸","fish-pond":"💧","fish-four":"🐟🐟🐟🐟",egg:"🥚","safe-hands":"🙌","flower-arch":"🌸🌿🌸","final-stone":"🪨","proud-banner":"🏳️ GREAT BUILDERS!",
    "color-wheel":"🎨","red-flowers":"🌹🌹🌹","pond":"💧","blue-stones":"🔵🔵🔵","green-gate":"🟢🚪","yellow-sign":"🟨🪧",letters:"A B C","red-hat":"🔴🎩","yellow-flowers":"🌼🌼","orange-decor":"🟠✨","purple-decor":"🟣✨",rainbow:"🌈","number-ten":"🔟","three-red-flowers":"🌹🌹🌹","two-blue-flowers":"🔵🌸 🔵🌸","four-yellow-flowers":"🌼🌼🌼🌼","one-purple-flower":"🟣🌸","count-equation":"3 + 2 + 4 + 1 = 10","ten-flowers":"🌸🌼🌷🌹🌺🌻🌸🌼🌷🌹","five-jars":"🫙🫙🫙🫙🫙","red-seed-jar":"🫙🔴","two-blue-jars":"🫙🔵 🫙🔵","two-yellow-jars":"🫙🟡 🫙🟡","jar-equation":"1 + 2 + 2 = 5","seed-bag":"🌱👜","numbered-row":"1 2 3 4 5 6 7 8 9 10","six-spaces":"□ □ □ □ □ □","four-spaces":"□ □ □ □","planted-row":"🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱",sprouts:"🌱🌱🌱🌱🌱",
    signposts:"🪧  🪧  🪧","red-circle":"🔴","blue-square":"🟦","yellow-triangle":"🔺","green-rectangle":"🟩","purple-star":"💜⭐","orange-heart":"🧡❤️","shape-signs":"🔴 🟦 🔺 🟩 ⭐ ❤️","shape-kite":"🪁","kite-tail":"◼️◼️◼️",leaf:"🍃","green-oval":"🟢◯","shape-cards":"⭕ 🟦 🔺 ⭐ ❤️",plan:"📐📋","rectangle-walls":"▭ ▭","square-window":"🪟","round-clock":"🕘","star-row":"⭐⭐⭐","checklist":"✅📋","shape-shelter":"🏠",
    "placement-plan":"🗺️📋","seed-jars":"🫙🫙🫙",table:"🪑",toolbox:"🧰","under-arrow":"⬇️", "welcome-sign":"🪧", "behind-arrow":"↩️",nest:"🪺","visitor-gate":"🚪🌈","no-symbol":"🚫","beside-arrow":"↔️",careful:"🤫","color-wheel":"🎨","two-paths":"🪨     🪨","between-flowers":"🌷🌼🌷","checkmark":"✅",banner:"🏳️ COLOR GARDEN OPEN!"
  };
  window.FritzIllustrationPropKinds=Object.freeze(Object.keys(symbols));
  IllustrationEngine.prototype.makeProp=function(spec,x,y,width,height,index){
    const symbol=symbols[spec.kind]||`[${String(spec.kind||"prop").replace(/-/g," ")}]`;
    const isLabel=/letters-|banner|clue|direction|equation|row|spaces|plan|checklist|signposts/.test(spec.kind||"");
    const style={fontSize:`${Math.round((isLabel?28:42)*(Number(spec.scale)||1))}px`,fontStyle:isLabel?"bold":"normal",color:"#102342",align:"center",backgroundColor:isLabel?"rgba(255,255,255,.9)":undefined,padding:isLabel?{x:8,y:5}:undefined,wordWrap:{width:Math.max(110,width*.34)}};
    return this.scene.add.text(x+(Number(spec.x)||0)*width,y+(Number(spec.y)||0)*height,symbol,style).setOrigin(.5).setDepth(5+index);
  };
})();