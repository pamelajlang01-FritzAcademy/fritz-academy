/* Fritz Academy Week 3 finale illustration scenes v49.0 */
(function(){
  "use strict";
  const C=(id,x,scale,motion="idle",y=0)=>({id,x,scale,motion,y});
  const P=(kind,x,y,scale=1,motion="idle")=>({kind,x,y,scale,motion});
  const target=window.FritzLessonSceneSpecs||(window.FritzLessonSceneSpecs={});
  target["3-C"]={
    story:[
      {environment:"classroom",caption:"The class arrives, but the Learning Room is not ready.",characters:[C("fritz",-.22,1,"thinking"),C("student",.22,.72,"idle")],props:[P("mixed-classroom",0,.14,1)]},
      {environment:"classroom",caption:"Rascal opens his book before he sits and drops his pencil.",characters:[C("rascal",-.12,.84,"surprised")],props:[P("open-book",.18,.02,.9),P("pencil",.24,.18,.8,"fall")]},
      {environment:"classroom",caption:"Tony points to the routine board.",characters:[C("tony",-.16,.58,"point"),C("rascal",.18,.84,"thinking")],props:[P("routine-board",.05,-.16,.9,"glow")]},
      {environment:"classroom",caption:"Nola helps everyone park bags beside chairs.",characters:[C("nola",-.18,1,"building"),C("student",.22,.72,"building")],props:[P("bag-row",.02,.2,1)]},
      {environment:"classroom",caption:"The student follows all three steps in order.",characters:[C("student",-.05,.72,"celebrate")],props:[P("first-next-last",.14,-.18,.95,"glow"),P("ready-seat",-.18,.15,.8)]},
      {environment:"classroom",caption:"A calm routine helps everyone learn.",characters:[C("fritz",-.28,1,"celebrate"),C("nola",-.04,1,"celebrate"),C("tony",.2,.58,"celebrate"),C("student",.34,.72,"celebrate")],props:[P("sparkles",0,-.2,.9,"float")]}
    ],
    reader1:[
      {environment:"classroom",caption:"Tony comes into class.",characters:[C("tony",-.05,.58,"walk")],props:[P("door",.22,.02,.8)]},
      {environment:"classroom",caption:"First, he sits down.",characters:[C("tony",-.08,.58,"idle")],props:[P("ready-seat",.14,.1,.85),P("number-one",-.22,-.16,.7,"glow")]},
      {environment:"classroom",caption:"Next, he opens his book.",characters:[C("tony",-.12,.58,"reading")],props:[P("open-book",.16,.05,.85),P("number-two",-.22,-.16,.7,"glow")]},
      {environment:"classroom",caption:"Last, he takes out a pencil.",characters:[C("tony",-.12,.58,"point")],props:[P("pencil",.16,.04,.8,"float"),P("number-three",-.22,-.16,.7,"glow")]},
      {environment:"classroom",caption:"Tony is ready to start.",characters:[C("tony",-.08,.58,"celebrate")],props:[P("checkmark",.17,-.08,.8,"pop")]}
    ],
    reader2:[
      {environment:"classroom",caption:"Bash carries a large supply box.",characters:[C("bash",-.1,1.08,"walk")],props:[P("supply-box",.22,.08,1)]},
      {environment:"classroom",caption:"He wants to open it before class is ready.",characters:[C("bash",-.12,1.08,"thinking")],props:[P("supply-box",.2,.08,1),P("question",.25,-.16,.7,"float")]},
      {environment:"classroom",caption:"Bear reminds Bash to follow the routine.",characters:[C("bear",-.18,.84,"point"),C("bash",.18,1.08,"idle")],props:[P("routine-board",0,-.18,.8,"glow")]},
      {environment:"classroom",caption:"First, Bash parks the box by the shelf.",characters:[C("bash",-.18,1.08,"building")],props:[P("supply-box",.14,.16,.9),P("shelf",.3,.04,.9)]},
      {environment:"classroom",caption:"Next he sits; last, Captain Fritz opens the box.",characters:[C("bash",-.2,1.08,"idle"),C("fritz",.2,1,"building")],props:[P("first-next-last",0,-.18,.8,"glow"),P("open-box",.28,.1,.8)]},
      {environment:"classroom",caption:"The routine keeps materials safe and class calm.",characters:[C("bear",-.25,.84,"celebrate"),C("bash",0,1.08,"celebrate"),C("student",.27,.72,"celebrate")],props:[P("safe-symbol",0,-.18,.8,"glow")]}
    ]
  };
  target["3-D"]={
    story:[
      {environment:"classroom",caption:"Captain Fritz places classroom objects around the room.",characters:[C("fritz",-.18,1,"point"),C("student",.22,.72,"idle")],props:[P("book",-.02,.12,.75),P("pencil",.12,.12,.7),P("backpack",.26,.12,.75),P("paper",.34,.02,.7)]},
      {environment:"classroom",caption:"The first clue says to place the pencil beside the book.",characters:[C("student",-.15,.72,"building")],props:[P("clue-card",.05,-.18,.8,"glow"),P("book",.15,.12,.75),P("pencil",.28,.12,.7)]},
      {environment:"classroom",caption:"The second clue says to open the bag, then show the paper.",characters:[C("nola",-.18,1,"point")],props:[P("backpack",.12,.1,.85),P("paper",.28,.02,.8,"float"),P("number-two",-.02,-.18,.7,"glow")]},
      {environment:"classroom",caption:"The student reminds Rascal to hear both steps.",characters:[C("student",-.18,.72,"point"),C("rascal",.18,.84,"thinking")],props:[P("listening-signal",0,-.18,.8,"glow")]},
      {environment:"classroom",caption:"Together they follow every direction and check each object.",characters:[C("rascal",-.18,.84,"building"),C("student",.18,.72,"building")],props:[P("checklist",0,-.18,.8,"glow"),P("checkmark",.28,.02,.7,"pop")]},
      {environment:"classroom",caption:"The whole class completes the Learning Room Challenge.",characters:[C("fritz",-.32,1,"celebrate"),C("nola",-.1,1,"celebrate"),C("rascal",.14,.84,"celebrate"),C("student",.34,.72,"celebrate")],props:[P("trophy",0,-.2,.85,"pop"),P("sparkles",.22,-.16,.8,"float")]}
    ],
    reader1:[
      {environment:"classroom",caption:"A vest is on the chair.",characters:[C("tony",-.16,.58,"idle")],props:[P("vest",.16,.04,.8,"float"),P("chair",.25,.14,.75)]},
      {environment:"classroom",caption:"An umbrella is under the table.",characters:[C("tony",-.18,.58,"point")],props:[P("umbrella",.18,.15,.85),P("table",.18,.02,.85)]},
      {environment:"classroom",caption:"Tony sees the umbrella.",characters:[C("tony",-.12,.58,"surprised")],props:[P("umbrella",.2,.1,.85,"glow")]},
      {environment:"classroom",caption:"He puts it beside the vest.",characters:[C("tony",-.16,.58,"building")],props:[P("umbrella",.12,.1,.8),P("vest",.27,.1,.8)]},
      {environment:"classroom",caption:"Now both things are easy to find.",characters:[C("tony",-.08,.58,"celebrate")],props:[P("umbrella",.15,.1,.75),P("vest",.28,.1,.75),P("checkmark",.22,-.14,.7,"pop")]}
    ],
    reader2:[
      {environment:"classroom",caption:"Captain Fritz asks everyone to check again.",characters:[C("fritz",-.15,1,"point")],props:[P("checklist",.18,-.08,.85,"glow")]},
      {environment:"classroom",caption:"Nola checks the books and paper.",characters:[C("nola",-.15,1,"building")],props:[P("books",.14,.08,.85),P("paper",.28,.05,.75)]},
      {environment:"classroom",caption:"Bear checks that chairs and tables are safe.",characters:[C("bear",-.14,.84,"point")],props:[P("chair",.14,.12,.75),P("table",.28,.06,.8)]},
      {environment:"classroom",caption:"Tony reads the routine board while the student checks directions.",characters:[C("tony",-.2,.58,"reading"),C("student",.2,.72,"point")],props:[P("routine-board",0,-.18,.78,"glow"),P("direction-display",.32,-.08,.7)]},
      {environment:"classroom",caption:"Rascal fixes one pencil in the wrong cup.",characters:[C("rascal",-.12,.84,"building")],props:[P("pencil-cups",.2,.08,.9),P("pencil",.25,-.04,.65,"fall")]},
      {environment:"classroom",caption:"Careful checking helps the class finish with confidence.",characters:[C("fritz",-.3,1,"celebrate"),C("bear",-.08,.84,"celebrate"),C("rascal",.16,.84,"celebrate"),C("student",.34,.72,"celebrate")],props:[P("celebration-light",0,-.2,.9,"glow"),P("sparkles",.22,-.15,.8,"float")]}
    ]
  };
})();