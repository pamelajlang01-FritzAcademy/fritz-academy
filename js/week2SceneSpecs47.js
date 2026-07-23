/* Fritz Academy Week 2 scene specifications v47.0 */
(function(){
  "use strict";
  const C=(id,x,scale,motion="idle",y=0)=>({id,x,scale,motion,y});
  const P=(kind,x,y,scale=1,motion="idle")=>({kind,x,y,scale,motion});
  const target=window.FritzLessonSceneSpecs||(window.FritzLessonSceneSpecs={});
  target["2-A"]={
    story:[
      {environment:"welcome-garden",caption:"Nola opens a plan for a new Color Garden.",characters:[C("nola",-.12,1,"point"),C("student",.24,.72,"idle")],props:[P("map",.05,-.08,.95,"float"),P("color-wheel",-.32,-.12,.8,"glow")]},
      {environment:"welcome-garden",caption:"Nola marks red flowers beside the front path.",characters:[C("nola",-.16,1,"building")],props:[P("red-flowers",.18,.2,1,"sway"),P("path",-.05,.22,1.1)]},
      {environment:"welcome-garden",caption:"Bear chooses blue stones for the pond.",characters:[C("bear",-.12,.84,"building")],props:[P("pond",.2,.17,.95),P("blue-stones",.21,.13,.9,"float")]},
      {environment:"academy-front",caption:"Bash carries a green garden gate.",characters:[C("bash",-.08,1.08,"walk")],props:[P("green-gate",.24,.05,1.05,"sway")]},
      {environment:"welcome-garden",caption:"Tony adds yellow signs with color names.",characters:[C("tony",-.14,.58,"point")],props:[P("yellow-sign",.2,.06,.9,"glow"),P("letters",.24,-.12,.7,"float")]},
      {environment:"welcome-garden",caption:"Captain Fritz checks the finished color plan.",characters:[C("fritz",-.22,1,"point"),C("nola",.02,1,"celebrate"),C("bear",.26,.84,"celebrate")],props:[P("color-wheel",0,-.2,.8,"glow"),P("sparkles",.32,-.18,.8,"float")]}
    ],
    reader1:[
      {environment:"academy-front",caption:"Tony has a red hat.",characters:[C("tony",-.05,.58,"idle")],props:[P("red-hat",.16,-.05,.85,"float")]},
      {environment:"academy-front",caption:"The hat is small.",characters:[C("tony",-.16,.58,"point")],props:[P("red-hat",.14,.02,.62,"glow")]},
      {environment:"welcome-garden",caption:"Tony puts the hat near a green gate.",characters:[C("tony",-.22,.58,"walk")],props:[P("red-hat",0,.12,.65),P("green-gate",.25,.02,.95)]},
      {environment:"welcome-garden",caption:"Rascal sees the red hat.",characters:[C("rascal",-.14,.84,"surprised")],props:[P("red-hat",.18,.08,.72,"glow")]},
      {environment:"welcome-garden",caption:"Tony says the hat is his.",characters:[C("tony",-.18,.58,"wave"),C("rascal",.18,.84,"idle")],props:[P("red-hat",0,.02,.72,"float"),P("speech",0,-.2,.7,"pop")]}
    ],
    reader2:[
      {environment:"welcome-garden",caption:"The friends stand beside the unfinished Color Garden.",characters:[C("nola",-.28,1,"idle"),C("bear",-.02,.84,"idle"),C("bash",.24,1.08,"idle")],props:[P("empty-bed",0,.22,1.15)]},
      {environment:"welcome-garden",caption:"Nola plants red and yellow flowers.",characters:[C("nola",-.12,1,"building")],props:[P("red-flowers",.14,.2,.85,"sway"),P("yellow-flowers",.3,.2,.85,"sway")]},
      {environment:"welcome-garden",caption:"Bear places blue stones around the pond.",characters:[C("bear",-.12,.84,"building")],props:[P("pond",.22,.16,.95),P("blue-stones",.22,.12,.85,"float")]},
      {environment:"welcome-garden",caption:"Bash adds the gate while Tony labels colors.",characters:[C("bash",-.24,1.08,"building"),C("tony",.22,.58,"point")],props:[P("green-gate",0,.04,.9),P("yellow-sign",.33,.02,.7,"glow")]},
      {environment:"welcome-garden",caption:"The student chooses orange and purple decorations.",characters:[C("student",-.05,.72,"celebrate")],props:[P("orange-decor",.18,.08,.85,"float"),P("purple-decor",-.22,.08,.85,"float")]},
      {environment:"welcome-garden",caption:"Six colors make the garden easy to describe.",characters:[C("fritz",-.28,1,"celebrate"),C("nola",-.05,1,"celebrate"),C("tony",.18,.58,"celebrate"),C("student",.34,.72,"celebrate")],props:[P("rainbow",0,-.22,1,"glow"),P("sparkles",.22,-.15,.8,"float")]}
    ]
  };
  target["2-B"]={
    story:[
      {environment:"welcome-garden",caption:"Captain Fritz asks for exactly ten flowers.",characters:[C("fritz",-.15,1,"point"),C("student",.2,.72,"idle")],props:[P("number-ten",.05,-.18,.9,"glow"),P("empty-bed",.2,.2,1)]},
      {environment:"welcome-garden",caption:"Nola plants three red flowers.",characters:[C("nola",-.12,1,"building")],props:[P("three-red-flowers",.2,.2,1,"sway")]},
      {environment:"welcome-garden",caption:"Bear adds two blue flowers.",characters:[C("bear",-.12,.84,"building")],props:[P("two-blue-flowers",.2,.2,.95,"sway"),P("pond",.32,.17,.75)]},
      {environment:"welcome-garden",caption:"Bash brings four yellow flowers and Tony adds one purple flower.",characters:[C("bash",-.22,1.08,"walk"),C("tony",.25,.58,"building")],props:[P("four-yellow-flowers",-.02,.18,1,"sway"),P("one-purple-flower",.34,.18,.8,"sway")]},
      {environment:"welcome-garden",caption:"The friends count three plus two plus four plus one.",characters:[C("nola",-.3,1,"point"),C("bear",-.07,.84,"point"),C("bash",.2,1.08,"point")],props:[P("count-equation",0,-.2,1,"glow")]},
      {environment:"welcome-garden",caption:"Careful counting shows that the total is ten.",characters:[C("fritz",-.25,1,"celebrate"),C("tony",0,.58,"celebrate"),C("student",.28,.72,"celebrate")],props:[P("number-ten",0,-.2,1,"pop"),P("ten-flowers",0,.2,1.15,"sway")]}
    ],
    reader1:[
      {environment:"classroom",caption:"Five jars sit on a table.",characters:[C("tony",-.18,.58,"idle")],props:[P("five-jars",.14,.08,1)]},
      {environment:"classroom",caption:"One jar has red seeds.",characters:[C("tony",-.15,.58,"point")],props:[P("red-seed-jar",.18,.06,.85,"glow")]},
      {environment:"classroom",caption:"Two jars have blue seeds.",characters:[C("tony",-.15,.58,"point")],props:[P("two-blue-jars",.2,.06,.9,"glow")]},
      {environment:"classroom",caption:"Two jars have yellow seeds.",characters:[C("tony",-.15,.58,"point")],props:[P("two-yellow-jars",.2,.06,.9,"glow")]},
      {environment:"classroom",caption:"One plus two plus two makes five jars.",characters:[C("tony",-.12,.58,"celebrate")],props:[P("jar-equation",.18,-.08,.95,"glow"),P("five-jars",.18,.14,.8)]}
    ],
    reader2:[
      {environment:"welcome-garden",caption:"Rascal wants to plant every seed at once.",characters:[C("rascal",-.08,.84,"celebrate")],props:[P("seed-bag",.2,.08,.9,"float")]},
      {environment:"welcome-garden",caption:"Tony asks him to count the spaces first.",characters:[C("tony",-.18,.58,"point"),C("rascal",.18,.84,"thinking")],props:[P("numbered-row",0,.18,1)]},
      {environment:"welcome-garden",caption:"There are six spaces in one row and four in another.",characters:[C("tony",-.18,.58,"point")],props:[P("six-spaces",.08,.12,.9),P("four-spaces",.24,.2,.8)]},
      {environment:"welcome-garden",caption:"The friends count ten spaces altogether.",characters:[C("tony",-.22,.58,"point"),C("rascal",.18,.84,"point")],props:[P("number-ten",0,-.18,.9,"glow"),P("numbered-row",0,.17,1)]},
      {environment:"welcome-garden",caption:"They place one seed in each space.",characters:[C("rascal",-.2,.84,"building"),C("student",.22,.72,"building")],props:[P("planted-row",0,.18,1,"sway")]},
      {environment:"welcome-garden",caption:"Careful counting gives every plant room to grow.",characters:[C("tony",-.23,.58,"celebrate"),C("rascal",0,.84,"celebrate"),C("student",.27,.72,"celebrate")],props:[P("sprouts",0,.18,1.1,"sway"),P("sparkles",.1,-.18,.8,"float")]}
    ]
  };
})();