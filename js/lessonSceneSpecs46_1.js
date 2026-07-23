/* Fritz Academy Lesson Scene Specifications v46.1 */
(function(){
  "use strict";
  const C=(id,x,scale,motion="idle",y=0)=>({id,x,scale,motion,y});
  const P=(kind,x,y,scale=1,motion="idle")=>({kind,x,y,scale,motion});

  window.FritzLessonSceneSpecs={
    "1-A":{
      story:[
        {environment:"academy-front",caption:"Captain Fritz waits beside the Academy gate.",characters:[C("fritz",-0.18,1,"idle")],props:[P("gate",0.24,0.06,1.1),P("flag",0.34,-0.18,.8,"wave")]},
        {environment:"academy-front",caption:"A new Academy Builder walks up the path.",characters:[C("fritz",.18,1,"idle"),C("student",-.20,.72,"walk")],props:[P("path",0,.23,1.2)]},
        {environment:"academy-front",caption:"Captain Fritz waves and says hello.",characters:[C("fritz",-.08,1,"wave"),C("student",.22,.72,"idle")],props:[P("speech",.05,-.22,.9,"pop")]},
        {environment:"academy-front",caption:"The new student introduces themself.",characters:[C("fritz",-.19,1,"idle"),C("student",.18,.72,"wave")],props:[P("name-tag",.02,-.18,.9,"float")]},
        {environment:"academy-front",caption:"Captain Fritz smiles. It is nice to meet you.",characters:[C("fritz",-.16,1,"celebrate"),C("student",.17,.72,"celebrate")],props:[P("sparkles",0,-.23,1,"float")]},
        {environment:"welcome-garden",caption:"Together, they walk toward the unfinished Welcome Garden.",characters:[C("fritz",-.16,1,"walk"),C("student",.11,.72,"walk")],props:[P("flowers",-.32,.22,.8,"sway"),P("garden-sign",.31,.07,.85)]}
      ],
      reader1:[
        {environment:"academy-front",caption:"Tony is near the gate.",characters:[C("tony",-.12,.58,"idle")],props:[P("gate",.24,.06,1)]},
        {environment:"academy-front",caption:"Tony sees a new friend.",characters:[C("tony",-.18,.58,"idle"),C("student",.17,.72,"walk")],props:[P("sparkles",0,-.2,.7,"float")]},
        {environment:"academy-front",caption:"Tony says hello.",characters:[C("tony",-.16,.58,"wave"),C("student",.18,.72,"idle")],props:[P("speech",0,-.2,.75,"pop")]},
        {environment:"academy-front",caption:"The new friend waves.",characters:[C("tony",-.16,.58,"idle"),C("student",.18,.72,"wave")],props:[P("speech",0,-.2,.75,"pop")]},
        {environment:"welcome-garden",caption:"Tony is happy.",characters:[C("tony",0,.58,"celebrate")],props:[P("flowers",-.28,.22,.8,"sway"),P("butterfly",.25,-.12,.8,"float")]}
      ],
      reader2:[
        {environment:"welcome-garden",caption:"Tony and the student walk to the garden.",characters:[C("tony",-.18,.58,"walk"),C("student",.15,.72,"walk")],props:[P("path",0,.22,1.1)]},
        {environment:"welcome-garden",caption:"The garden has a path, but it needs flowers.",characters:[C("tony",-.2,.58,"thinking"),C("student",.18,.72,"idle")],props:[P("path",0,.22,1.1),P("empty-bed",.28,.2,.9)]},
        {environment:"welcome-garden",caption:"Nola brings a basket of bright flowers.",characters:[C("nola",-.08,1,"walk"),C("tony",.26,.58,"celebrate")],props:[P("flower-basket",-.28,.12,.9,"float")]},
        {environment:"welcome-garden",caption:"Bash carries a small tree to the garden.",characters:[C("bash",-.04,1.08,"walk"),C("student",.29,.72,"idle")],props:[P("young-tree",-.29,.04,.95,"sway")]},
        {environment:"welcome-garden",caption:"The friends are ready to build together.",characters:[C("bash",-.27,1.08,"celebrate"),C("nola",-.02,1,"celebrate"),C("tony",.21,.58,"celebrate"),C("student",.36,.72,"celebrate")],props:[P("flowers",0,.23,1,"sway"),P("sparkles",0,-.22,1,"float")]}
      ]
    },
    "1-B":{
      story:[
        {environment:"academy-front",caption:"Bear runs into the courtyard. His backpack is missing.",characters:[C("bear",-.08,.84,"walk")],props:[P("question",.18,-.16,.9,"pop"),P("backpack-outline",-.3,.12,.8)]},
        {environment:"academy-front",caption:"Bear remembers having the backpack that morning.",characters:[C("bear",0,.84,"thinking")],props:[P("thought",.18,-.18,.9,"float"),P("backpack",.29,.05,.8)]},
        {environment:"academy-front",caption:"Bash asks what Bear did before coming to school.",characters:[C("bash",-.17,1.08,"idle"),C("bear",.18,.84,"thinking")],props:[P("question",0,-.2,.9,"pop")]},
        {environment:"welcome-garden",caption:"Bear remembers reading a book near the garden.",characters:[C("bear",-.03,.84,"reading")],props:[P("book",.15,.13,.85,"float"),P("flowers",-.3,.22,.75,"sway")]},
        {environment:"welcome-garden",caption:"The friends look beside the reading bench.",characters:[C("bash",-.24,1.08,"walk"),C("bear",.03,.84,"walk"),C("student",.29,.72,"walk")],props:[P("bench",0,.18,1),P("magnifier",.2,-.12,.75,"sweep")]},
        {environment:"welcome-garden",caption:"They find the backpack under the bench.",characters:[C("bash",-.24,1.08,"celebrate"),C("bear",.04,.84,"celebrate"),C("student",.3,.72,"celebrate")],props:[P("bench",0,.18,1),P("backpack",.05,.18,.85,"pop"),P("sparkles",0,-.2,1,"float")]}
      ],
      reader1:[
        {environment:"welcome-garden",caption:"Tony walks beside the garden.",characters:[C("tony",-.1,.58,"walk")],props:[P("flowers",.25,.22,.75,"sway")]},
        {environment:"welcome-garden",caption:"He sees a blue book.",characters:[C("tony",-.12,.58,"idle")],props:[P("book",.2,.14,.9,"glow")]},
        {environment:"welcome-garden",caption:"The book is near a bush.",characters:[C("tony",-.18,.58,"point")],props:[P("bush",.2,.15,1),P("book",.28,.14,.75,"glow")]},
        {environment:"welcome-garden",caption:"Tony picks up the book.",characters:[C("tony",0,.58,"celebrate")],props:[P("book",.13,-.02,.82,"float")]},
        {environment:"reading-room",caption:"Tony knows the book belongs to Bear.",characters:[C("tony",-.18,.58,"point"),C("bear",.18,.84,"idle")],props:[P("book",0,.03,.78,"float")]}
      ],
      reader2:[
        {environment:"reading-room",caption:"Tony carries the blue book to Bear.",characters:[C("tony",-.2,.58,"walk"),C("bear",.2,.84,"idle")],props:[P("book",-.05,.03,.8,"float")]},
        {environment:"reading-room",caption:"A small garden map falls from the pages.",characters:[C("tony",-.18,.58,"surprised"),C("bear",.18,.84,"surprised")],props:[P("map",0,.03,.9,"fall")]},
        {environment:"welcome-garden",caption:"The map shows a path, a bench, and a tall tree.",characters:[C("bear",-.22,.84,"point")],props:[P("map",.05,-.05,1),P("bench",.28,.18,.7),P("young-tree",.34,-.02,.75,"sway")]},
        {environment:"welcome-garden",caption:"Rascal points to a mark beside the tree.",characters:[C("rascal",-.13,.84,"point")],props:[P("map",.14,-.05,1),P("map-mark",.27,-.02,.7,"pulse")]},
        {environment:"welcome-garden",caption:"Nola thinks it may be the next garden clue.",characters:[C("nola",-.17,1,"thinking"),C("tony",.22,.58,"idle")],props:[P("map",.02,.02,.85),P("idea",.12,-.2,.8,"glow")]},
        {environment:"campus",caption:"The friends decide to follow the map next time.",characters:[C("nola",-.3,1,"walk"),C("tony",-.08,.58,"walk"),C("rascal",.14,.84,"celebrate"),C("student",.33,.72,"walk")],props:[P("map",.03,-.08,.7,"float"),P("arrow",.28,-.15,.8,"sweep")]}
      ]
    }
  };
})();