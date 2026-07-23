/* Fritz Academy Week 2 scene specifications v47.1 */
(function(){
  "use strict";
  const C=(id,x,scale,motion="idle",y=0)=>({id,x,scale,motion,y});
  const P=(kind,x,y,scale=1,motion="idle")=>({kind,x,y,scale,motion});
  window.FritzLessonSceneSpecs=window.FritzLessonSceneSpecs||{};
  Object.assign(window.FritzLessonSceneSpecs,{
    "2-C":{
      story:[
        {environment:"color-garden",caption:"Captain Fritz finds six empty signposts.",characters:[C("fritz",-.12,1,"thinking"),C("student",.22,.72,"idle")],props:[P("signposts",.05,.16,1.1)]},
        {environment:"color-garden",caption:"Nola makes a red circle and a blue square.",characters:[C("nola",-.13,1,"building")],props:[P("red-circle",.12,-.02,.9,"pop"),P("blue-square",.3,.02,.9,"pop")]},
        {environment:"color-garden",caption:"Bear makes a yellow triangle roof sign.",characters:[C("bear",-.12,.84,"building")],props:[P("yellow-triangle",.16,-.02,1,"pop"),P("toolbox",.3,.16,.75)]},
        {environment:"color-garden",caption:"Bash carries the green rectangle sign.",characters:[C("bash",-.08,1.08,"walk")],props:[P("green-rectangle",.2,-.02,1,"float"),P("gate",.34,.12,.8)]},
        {environment:"color-garden",caption:"Tony adds a purple star and orange heart.",characters:[C("tony",-.08,.58,"celebrate")],props:[P("purple-star",.14,-.05,.9,"glow"),P("orange-heart",.3,.02,.9,"glow")]},
        {environment:"color-garden",caption:"Every visitor can name each place by color and shape.",characters:[C("fritz",-.28,1,"celebrate"),C("nola",-.08,1,"celebrate"),C("tony",.13,.58,"celebrate"),C("student",.31,.72,"celebrate")],props:[P("shape-signs",0,.1,1.1),P("sparkles",0,-.22,1,"float")]}
      ],
      reader1:[
        {environment:"playground",caption:"A kite has a triangle top.",characters:[C("tony",-.18,.58,"point")],props:[P("shape-kite",.15,-.06,1,"float")]},
        {environment:"playground",caption:"The tail has three small squares.",characters:[C("tony",-.18,.58,"idle")],props:[P("kite-tail",.17,.02,1,"sway")]},
        {environment:"playground",caption:"A leaf lands on the kite.",characters:[C("tony",-.16,.58,"surprised")],props:[P("shape-kite",.12,-.05,.9,"float"),P("leaf",.24,-.12,.7,"fall")]},
        {environment:"playground",caption:"The leaf is green and oval-like.",characters:[C("tony",-.15,.58,"point")],props:[P("leaf",.18,-.02,1,"float"),P("green-oval",.31,.02,.75)]},
        {environment:"playground",caption:"Tony names every color and shape.",characters:[C("tony",-.08,.58,"celebrate"),C("student",.2,.72,"celebrate")],props:[P("shape-cards",.04,-.15,.9,"float")]}
      ],
      reader2:[
        {environment:"color-garden",caption:"The friends design a reading shelter.",characters:[C("bear",-.2,.84,"thinking"),C("nola",.08,1,"thinking"),C("student",.3,.72,"idle")],props:[P("plan",0,-.13,.9,"float")]},
        {environment:"color-garden",caption:"Bear chooses rectangles and a triangle roof.",characters:[C("bear",-.14,.84,"building")],props:[P("rectangle-walls",.12,.08,1),P("yellow-triangle",.13,-.1,.9)]},
        {environment:"color-garden",caption:"Nola adds square windows and a round clock.",characters:[C("nola",-.16,1,"building")],props:[P("square-window",.12,.02,.8,"pop"),P("round-clock",.28,-.1,.8,"pop")]},
        {environment:"color-garden",caption:"Bash places stars along the roof edge.",characters:[C("bash",-.15,1.08,"building")],props:[P("star-row",.17,-.12,1,"glow")]},
        {environment:"color-garden",caption:"The student checks every piece.",characters:[C("student",-.05,.72,"point")],props:[P("checklist",.18,-.02,.9,"float"),P("shape-shelter",.32,.1,.8)]},
        {environment:"color-garden",caption:"The finished shelter shows how shapes work together.",characters:[C("bear",-.27,.84,"celebrate"),C("nola",-.08,1,"celebrate"),C("bash",.16,1.08,"celebrate"),C("student",.35,.72,"celebrate")],props:[P("shape-shelter",.03,.07,1),P("sparkles",0,-.23,1,"float")]}
      ]
    },
    "2-D":{
      story:[
        {environment:"color-garden",caption:"Captain Fritz reads the final placement plan.",characters:[C("fritz",-.16,1,"reading"),C("student",.22,.72,"listening")],props:[P("placement-plan",.04,-.02,.9,"float")]},
        {environment:"color-garden",caption:"Nola puts seed jars on the table beside the pond.",characters:[C("nola",-.18,1,"building")],props:[P("seed-jars",.05,.06,.85),P("table",.18,.15,.9),P("pond",.34,.12,.75)]},
        {environment:"color-garden",caption:"Bear places the tool box under the shelter.",characters:[C("bear",-.16,.84,"building")],props:[P("shape-shelter",.14,.02,.9),P("toolbox",.14,.18,.75,"pop"),P("under-arrow",.31,.1,.7)]},
        {environment:"color-garden",caption:"Bash moves the sign between the gate and flowers.",characters:[C("bash",-.08,1.08,"walk")],props:[P("gate",-.31,.1,.75),P("welcome-sign",.13,.08,.85,"float"),P("red-flowers",.34,.17,.8,"sway")]},
        {environment:"color-garden",caption:"Tony finds a nest behind the yellow sign.",characters:[C("tony",-.17,.58,"surprised")],props:[P("yellow-sign",.08,.07,.85),P("nest",.23,.12,.8,"glow"),P("behind-arrow",.34,-.05,.65)]},
        {environment:"color-garden",caption:"The Color Garden opens for visitors.",characters:[C("fritz",-.3,1,"celebrate"),C("bash",-.1,1.08,"celebrate"),C("tony",.12,.58,"celebrate"),C("student",.31,.72,"celebrate")],props:[P("visitor-gate",0,.05,1),P("sparkles",0,-.23,1,"float")]}
      ],
      reader1:[
        {environment:"color-garden",caption:"A nest is behind the yellow sign.",characters:[C("tony",-.18,.58,"point")],props:[P("yellow-sign",.09,.04,.9),P("nest",.24,.11,.8,"glow")]},
        {environment:"color-garden",caption:"The nest is not on the path.",characters:[C("tony",-.16,.58,"idle")],props:[P("path",0,.22,1),P("nest",.25,.05,.75),P("no-symbol",.08,-.08,.7)]},
        {environment:"color-garden",caption:"Tony stands beside the sign.",characters:[C("tony",-.05,.58,"idle")],props:[P("yellow-sign",.17,.04,.9),P("beside-arrow",.06,-.1,.7)]},
        {environment:"color-garden",caption:"He looks in the nest without touching it.",characters:[C("tony",-.14,.58,"thinking")],props:[P("nest",.18,.02,.9,"float"),P("careful",.32,-.12,.7)]},
        {environment:"color-garden",caption:"Tony tells Captain Fritz where the nest is.",characters:[C("tony",-.17,.58,"point"),C("fritz",.18,1,"listening")],props:[P("speech",0,-.2,.8,"pop"),P("nest",.02,.12,.65)]}
      ],
      reader2:[
        {environment:"color-garden",caption:"The friends walk through the garden one final time.",characters:[C("nola",-.28,1,"walk"),C("bear",-.08,.84,"walk"),C("student",.22,.72,"walk")],props:[P("checklist",.34,-.1,.75,"float")]},
        {environment:"color-garden",caption:"The color wheel is beside the entrance.",characters:[C("nola",-.18,1,"point")],props:[P("color-wheel",.05,-.02,.9,"spin"),P("visitor-gate",.29,.08,.8)]},
        {environment:"color-garden",caption:"Jars are on the table and tools are under the shelter.",characters:[C("bear",-.19,.84,"point")],props:[P("seed-jars",.02,.02,.7),P("table",.12,.15,.8),P("toolbox",.28,.18,.65),P("shape-shelter",.31,.02,.7)]},
        {environment:"color-garden",caption:"Flowers grow between the paths.",characters:[C("bash",-.18,1.08,"idle")],props:[P("two-paths",.05,.17,1),P("between-flowers",.15,.15,.9,"sway")]},
        {environment:"color-garden",caption:"The student checks each direction.",characters:[C("student",-.05,.72,"point")],props:[P("placement-plan",.18,-.02,.9,"float"),P("checkmark",.33,-.12,.75,"pop")]},
        {environment:"color-garden",caption:"The garden is safe, clear, and ready.",characters:[C("fritz",-.3,1,"celebrate"),C("nola",-.1,1,"celebrate"),C("bear",.12,.84,"celebrate"),C("student",.32,.72,"celebrate")],props:[P("visitor-gate",0,.05,1),P("banner",0,-.19,.9,"sway"),P("sparkles",0,-.28,1,"float")]}
      ]
    }
  });
})();