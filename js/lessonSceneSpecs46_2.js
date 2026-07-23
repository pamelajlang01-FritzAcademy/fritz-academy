/* Fritz Academy Lesson Scene Specifications v46.2 — Lessons 1-C and 1-D */
(function(){
  "use strict";
  const C=(id,x,scale,motion="idle",y=0)=>({id,x,scale,motion,y});
  const P=(kind,x,y,scale=1,motion="idle")=>({kind,x,y,scale,motion});
  const specs=window.FritzLessonSceneSpecs||(window.FritzLessonSceneSpecs={});

  specs["1-C"]={
    story:[
      {environment:"welcome-garden",caption:"Tony opens the garden map beside the reading bench.",characters:[C("tony",-.16,.58,"reading"),C("student",.22,.72,"idle")],props:[P("bench",0,.18,1),P("map",-.02,-.02,.9,"float")]},
      {environment:"welcome-garden",caption:"The first arrow points left toward a tall tree.",characters:[C("tony",-.24,.58,"point"),C("student",.18,.72,"idle")],props:[P("map",-.04,-.04,.85),P("arrow-left",.13,-.13,.8,"sweep"),P("young-tree",.32,-.02,1,"sway")]},
      {environment:"welcome-garden",caption:"Bear feels excited, but Nola worries about the wrong path.",characters:[C("bear",-.21,.84,"celebrate"),C("nola",.18,1,"thinking")],props:[P("map",0,.03,.8),P("question",.30,-.18,.72,"pop")]},
      {environment:"welcome-garden",caption:"Captain Fritz reminds everyone to read one direction at a time.",characters:[C("fritz",-.16,1,"point"),C("bear",.16,.84,"idle"),C("nola",.33,1,"idle")],props:[P("map",0,.02,.8),P("speech",-.01,-.21,.8,"pop")]},
      {environment:"welcome-garden",caption:"They turn right at the tree and discover a small wooden door.",characters:[C("bash",-.26,1.08,"walk"),C("bear",.02,.84,"walk"),C("student",.29,.72,"walk")],props:[P("arrow-right",-.02,-.16,.8,"sweep"),P("young-tree",.25,-.01,.85,"sway"),P("little-door",.35,.13,.85,"pop")]},
      {environment:"welcome-garden",caption:"The letters C and D are carved on the clue door.",characters:[C("bash",-.24,1.08,"point"),C("tony",.08,.58,"celebrate"),C("student",.31,.72,"idle")],props:[P("little-door",.16,.10,1),P("letters-cd",.16,-.08,.9,"glow")]}
    ],
    reader1:[
      {environment:"welcome-garden",caption:"A cat sits beside the little door.",characters:[C("student",-.23,.72,"idle")],props:[P("cat",.12,.12,.9,"idle"),P("little-door",.31,.10,.85)]},
      {environment:"welcome-garden",caption:"The cat sees Bear near the path.",characters:[C("bear",.18,.84,"idle")],props:[P("cat",-.18,.12,.85,"idle"),P("path",0,.22,1)]},
      {environment:"welcome-garden",caption:"Bear stays calm and does not chase the cat.",characters:[C("bear",.12,.84,"idle")],props:[P("cat",-.20,.12,.85,"idle"),P("calm-symbol",0,-.19,.75,"float")]},
      {environment:"welcome-garden",caption:"The cat and Bear look carefully at the map.",characters:[C("bear",.18,.84,"thinking")],props:[P("cat",-.20,.12,.85,"idle"),P("map",0,-.02,.92,"float")]},
      {environment:"welcome-garden",caption:"They wait calmly beside the door.",characters:[C("bear",.17,.84,"idle"),C("student",-.30,.72,"idle")],props:[P("cat",-.08,.12,.8,"idle"),P("little-door",.33,.10,.85)]}
    ],
    reader2:[
      {environment:"welcome-garden",caption:"Captain Fritz gives each friend one clear direction.",characters:[C("fritz",-.20,1,"point"),C("tony",.05,.58,"idle"),C("nola",.27,1,"idle")],props:[P("direction-card",0,-.16,.85,"float")]},
      {environment:"welcome-garden",caption:"Tony walks forward to the corner.",characters:[C("tony",-.05,.58,"walk")],props:[P("arrow-forward",.18,-.10,.82,"sweep"),P("garden-corner",.31,.13,.9)]},
      {environment:"welcome-garden",caption:"Nola turns left beside the little door.",characters:[C("nola",-.10,1,"walk")],props:[P("arrow-left",.16,-.13,.8,"sweep"),P("little-door",.30,.10,.85)]},
      {environment:"welcome-garden",caption:"Bear turns right and discovers a covered garden circle.",characters:[C("bear",-.16,.84,"walk"),C("student",.25,.72,"surprised")],props:[P("arrow-right",.02,-.14,.8,"sweep"),P("covered-circle",.30,.12,1,"glow")]},
      {environment:"welcome-garden",caption:"The map says two new letters will open the garden circle.",characters:[C("fritz",-.24,1,"reading"),C("bear",.06,.84,"idle"),C("student",.30,.72,"idle")],props:[P("map",0,-.03,.9,"float"),P("letters-ef",.19,-.17,.75,"glow")]}
    ]
  };

  specs["1-D"]={
    story:[
      {environment:"welcome-garden",caption:"The friends gather around the covered garden circle.",characters:[C("fritz",-.30,1,"idle"),C("nola",-.08,1,"idle"),C("bear",.14,.84,"idle"),C("student",.34,.72,"idle")],props:[P("covered-circle",.03,.13,1.05,"glow")]},
      {environment:"welcome-garden",caption:"Nola finds an envelope marked with a large E.",characters:[C("nola",-.08,1,"celebrate"),C("tony",.24,.58,"idle")],props:[P("envelope-e",.08,-.05,.92,"float")]},
      {environment:"welcome-garden",caption:"The clue says to find four flowers beside the fence.",characters:[C("nola",-.18,1,"reading"),C("student",.22,.72,"idle")],props:[P("clue-card",0,-.05,.9,"float"),P("fence",.31,.16,.9),P("flowers-four",.25,.20,.78,"sway")]},
      {environment:"welcome-garden",caption:"Bear is confused because he can see five flowers.",characters:[C("bear",-.08,.84,"thinking")],props:[P("flowers-five",.24,.17,.92,"sway"),P("question",.02,-.19,.8,"pop")]},
      {environment:"welcome-garden",caption:"Tony notices that one flower is made of paper.",characters:[C("tony",-.16,.58,"point"),C("bear",.20,.84,"idle")],props:[P("paper-flower",.05,.03,.9,"glow"),P("flowers-four",.30,.19,.74,"sway")]},
      {environment:"welcome-garden",caption:"The cover opens, and everyone celebrates solving the clue.",characters:[C("fritz",-.31,1,"celebrate"),C("nola",-.10,1,"celebrate"),C("bear",.12,.84,"celebrate"),C("tony",.28,.58,"celebrate"),C("student",.39,.72,"celebrate")],props:[P("open-circle",.04,.13,1.05,"glow"),P("sparkles",0,-.22,1,"float")]}
    ],
    reader1:[
      {environment:"welcome-garden",caption:"Four fish swim in the little pond.",characters:[C("student",-.27,.72,"idle")],props:[P("fish-pond",.12,.14,1),P("fish-four",.12,.03,.8,"sway")]},
      {environment:"welcome-garden",caption:"Each fish moves quickly through the water.",characters:[C("rascal",-.23,.84,"celebrate")],props:[P("fish-pond",.14,.14,1),P("fish-four",.14,.02,.8,"sweep")]},
      {environment:"welcome-garden",caption:"An egg rests safely near the pond.",characters:[C("rascal",-.22,.84,"thinking")],props:[P("fish-pond",.18,.14,.9),P("egg",-.02,.13,.75,"glow")]},
      {environment:"welcome-garden",caption:"The friends look, but they do not touch the egg.",characters:[C("fritz",-.23,1,"point"),C("rascal",.08,.84,"idle"),C("student",.31,.72,"idle")],props:[P("egg",.04,.12,.72),P("safe-hands",.18,-.18,.72,"float")]},
      {environment:"welcome-garden",caption:"They tell Nola exactly what they see.",characters:[C("nola",.16,1,"listening"),C("rascal",-.17,.84,"point"),C("student",-.36,.72,"idle")],props:[P("speech",0,-.18,.78,"pop"),P("fish-pond",.25,.16,.72)]}
    ],
    reader2:[
      {environment:"welcome-garden",caption:"Everyone helps finish the new garden circle.",characters:[C("bash",-.31,1.08,"building"),C("nola",-.08,1,"building"),C("bear",.15,.84,"building"),C("student",.34,.72,"building")],props:[P("open-circle",.02,.14,1)]},
      {environment:"welcome-garden",caption:"Captain Fritz places the flower arch near the entrance.",characters:[C("fritz",-.13,1,"building")],props:[P("flower-arch",.22,.04,1,"glow")]},
      {environment:"welcome-garden",caption:"Nola plants four flowers beside the fence.",characters:[C("nola",-.12,1,"building")],props:[P("fence",.28,.16,.9),P("flowers-four",.12,.19,.85,"sway")]},
      {environment:"welcome-garden",caption:"Tony checks the map while Bear carries the final stone.",characters:[C("tony",-.24,.58,"reading"),C("bear",.20,.84,"walk")],props:[P("map",-.07,-.04,.78,"float"),P("final-stone",.31,.11,.82,"float")]},
      {environment:"welcome-garden",caption:"Careful reading helps the friends complete the garden circle.",characters:[C("fritz",-.32,1,"celebrate"),C("nola",-.10,1,"celebrate"),C("bear",.13,.84,"celebrate"),C("tony",.28,.58,"celebrate"),C("student",.39,.72,"celebrate")],props:[P("open-circle",.02,.14,1),P("proud-banner",.04,-.18,.9,"wave"),P("sparkles",0,-.25,1,"float")]}
    ]
  };
})();