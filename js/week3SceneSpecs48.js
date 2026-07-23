/* Fritz Academy Week 3 illustration scenes v48.0 */
(function(){
  "use strict";
  const C=(id,x,scale,motion="idle",y=0)=>({id,x,scale,motion,y});
  const P=(kind,x,y,scale=1,motion="idle")=>({kind,x,y,scale,motion});
  const target=window.FritzLessonSceneSpecs||(window.FritzLessonSceneSpecs={});
  target["3-A"]={
    story:[
      {environment:"classroom",caption:"The classroom things are mixed together.",characters:[C("fritz",-.18,1,"thinking"),C("student",.22,.72,"idle")],props:[P("mixed-supplies",.05,.08,1)]},
      {environment:"classroom",caption:"Tony finds a pencil under a chair.",characters:[C("tony",-.18,.58,"point")],props:[P("chair",.12,.1,.9),P("pencil",.15,.19,.75,"glow"),P("table",.32,.08,.85)]},
      {environment:"reading-room",caption:"Nola puts the books on the reading shelf.",characters:[C("nola",-.16,1,"building")],props:[P("books",.08,.05,.9),P("shelf",.28,.02,1)]},
      {environment:"classroom",caption:"Bear carries paper while Bash moves the supply box.",characters:[C("bear",-.24,.84,"walk"),C("bash",.18,1.08,"walk")],props:[P("paper-stack",-.02,.04,.8,"float"),P("supply-box",.34,.08,.9)]},
      {environment:"classroom",caption:"The student checks every picture label.",characters:[C("student",-.12,.72,"point"),C("tony",.22,.58,"idle")],props:[P("label-board",.08,-.08,1,"glow")]},
      {environment:"classroom",caption:"Every classroom object now has a clear place.",characters:[C("fritz",-.3,1,"celebrate"),C("nola",-.05,1,"celebrate"),C("student",.25,.72,"celebrate")],props:[P("organized-room",0,.05,1),P("sparkles",.2,-.18,.8,"float")]}
    ],
    reader1:[
      {environment:"classroom",caption:"Tony has a pencil.",characters:[C("tony",-.12,.58,"idle")],props:[P("pencil",.14,.02,.85,"float")]},
      {environment:"classroom",caption:"He has one piece of paper.",characters:[C("tony",-.14,.58,"point")],props:[P("paper",.16,.04,.85,"glow")]},
      {environment:"classroom",caption:"The pencil is on the table.",characters:[C("tony",-.18,.58,"point")],props:[P("table",.15,.09,.95),P("pencil",.15,.02,.65)]},
      {environment:"classroom",caption:"The paper is beside the pencil.",characters:[C("tony",-.18,.58,"point")],props:[P("table",.14,.09,.95),P("pencil",.1,.01,.6),P("paper",.2,.01,.65)]},
      {environment:"classroom",caption:"Tony is ready to write.",characters:[C("tony",-.08,.58,"celebrate")],props:[P("writing-set",.18,.04,.9,"glow")]}
    ],
    reader2:[
      {environment:"classroom",caption:"Rascal puts a book inside the supply bag.",characters:[C("rascal",-.12,.84,"building")],props:[P("book",.1,.02,.7),P("bag",.23,.08,.85)]},
      {environment:"reading-room",caption:"Tony explains that books belong on the shelf.",characters:[C("tony",-.2,.58,"point"),C("rascal",.18,.84,"thinking")],props:[P("shelf",.02,.02,.95),P("books",.06,.02,.7)]},
      {environment:"reading-room",caption:"Nola shows Rascal the picture label.",characters:[C("nola",-.18,1,"point"),C("rascal",.18,.84,"idle")],props:[P("picture-label",0,-.08,.85,"glow")]},
      {environment:"classroom",caption:"Rascal checks the other classroom objects.",characters:[C("rascal",-.08,.84,"point")],props:[P("object-cards",.18,-.02,.95,"float")]},
      {environment:"classroom",caption:"He puts pencils and paper in the correct places.",characters:[C("rascal",-.16,.84,"building")],props:[P("pencil-cup",.1,.03,.8),P("paper-stack",.25,.06,.8)]},
      {environment:"classroom",caption:"Labels help everyone keep the room organized.",characters:[C("nola",-.24,1,"celebrate"),C("rascal",.02,.84,"celebrate"),C("student",.28,.72,"celebrate")],props:[P("label-board",0,-.12,.9,"glow"),P("sparkles",.2,-.18,.7,"float")]}
    ]
  };
  target["3-B"]={
    story:[
      {environment:"classroom",caption:"Captain Fritz gives two classroom directions.",characters:[C("fritz",-.18,1,"point"),C("rascal",.2,.84,"idle")],props:[P("two-step-card",.03,-.12,.9,"glow")]},
      {environment:"classroom",caption:"Rascal begins before the direction is finished.",characters:[C("rascal",-.08,.84,"walk")],props:[P("open-book",.18,.05,.85),P("speech",-.22,-.16,.7,"pop")]},
      {environment:"classroom",caption:"He turns to page two and feels confused.",characters:[C("rascal",-.08,.84,"thinking")],props:[P("page-two",.18,.02,.85,"glow"),P("question",.28,-.15,.7,"pop")]},
      {environment:"classroom",caption:"Tony reminds him to wait for the whole direction.",characters:[C("tony",-.2,.58,"point"),C("rascal",.18,.84,"idle")],props:[P("listen-first",0,-.15,.9,"glow")]},
      {environment:"classroom",caption:"Rascal opens the blue book and shows page four.",characters:[C("rascal",-.12,.84,"celebrate"),C("student",.22,.72,"idle")],props:[P("blue-book",.06,.03,.8),P("page-four",.22,.02,.8,"glow")]},
      {environment:"classroom",caption:"Captain Fritz thanks Rascal for listening carefully.",characters:[C("fritz",-.2,1,"celebrate"),C("rascal",.12,.84,"celebrate")],props:[P("thank-you",0,-.15,.85,"glow"),P("sparkles",.25,-.18,.7,"float")]}
    ],
    reader1:[
      {environment:"classroom",caption:"Nola has a red box.",characters:[C("nola",-.12,1,"idle")],props:[P("red-box",.18,.08,.85,"float")]},
      {environment:"classroom",caption:"Captain Fritz asks her to open it.",characters:[C("fritz",-.2,1,"point"),C("nola",.18,1,"idle")],props:[P("speech",0,-.18,.7,"pop")]},
      {environment:"classroom",caption:"Nola opens the box.",characters:[C("nola",-.12,1,"building")],props:[P("open-red-box",.18,.07,.9,"pop")]},
      {environment:"classroom",caption:"A quilt card is inside.",characters:[C("nola",-.12,1,"surprised")],props:[P("quilt-card",.18,.02,.85,"glow")]},
      {environment:"classroom",caption:"Nola shows the card and says thank you.",characters:[C("nola",-.16,1,"celebrate"),C("fritz",.2,1,"idle")],props:[P("quilt-card",0,-.02,.75,"float"),P("thank-you",.02,-.18,.7,"glow")]}
    ],
    reader2:[
      {environment:"classroom",caption:"Captain Fritz gives the student two directions.",characters:[C("fritz",-.2,1,"point"),C("student",.2,.72,"idle")],props:[P("two-step-card",0,-.13,.9,"glow")]},
      {environment:"classroom",caption:"The student waits until both directions are complete.",characters:[C("student",-.05,.72,"thinking")],props:[P("listening-ears",.2,-.08,.8,"float")]},
      {environment:"classroom",caption:"First, the student takes the pencil.",characters:[C("student",-.12,.72,"building")],props:[P("number-one",.12,-.15,.7,"glow"),P("pencil",.22,.04,.75)]},
      {environment:"classroom",caption:"Next, the student closes the supply box.",characters:[C("student",-.12,.72,"building")],props:[P("number-two",.1,-.15,.7,"glow"),P("closed-box",.22,.07,.85)]},
      {environment:"classroom",caption:"Bear checks that the actions are in the correct order.",characters:[C("bear",-.16,.84,"point"),C("student",.2,.72,"idle")],props:[P("check-marks",0,-.15,.85,"glow")]},
      {environment:"classroom",caption:"Listening to all the words makes directions easier.",characters:[C("bear",-.25,.84,"celebrate"),C("student",0,.72,"celebrate"),C("tony",.25,.58,"celebrate")],props:[P("listening-signal",0,-.17,.8,"glow"),P("sparkles",.22,-.18,.7,"float")]}
    ]
  };
})();
