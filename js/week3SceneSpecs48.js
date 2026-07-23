/* Fritz Academy Week 3 illustration scenes v48.0 */
(function(){
  "use strict";
  const C=(id,x,scale,motion="idle",y=0)=>({id,x,scale,motion,y});
  const P=(kind,x,y,scale=1,motion="idle")=>({kind,x,y,scale,motion});
  const S=(environment,caption,characters,props)=>({environment,caption,characters,props});
  const target=window.FritzLessonSceneSpecs||(window.FritzLessonSceneSpecs={});
  target["3-A"]={
    story:[
      S("classroom","The classroom things are mixed together.",[C("fritz",-.18,1,"thinking"),C("student",.22,.72)],[P("mixed-supplies",.05,.08)]),
      S("classroom","Tony finds a pencil under a chair.",[C("tony",-.18,.58,"point")],[P("chair",.12,.1,.9),P("pencil",.15,.19,.75,"glow"),P("table",.32,.08,.85)]),
      S("reading-room","Nola puts the books on the reading shelf.",[C("nola",-.16,1,"building")],[P("books",.08,.05,.9),P("shelf",.28,.02)]),
      S("classroom","Bear carries paper while Bash moves the supply box.",[C("bear",-.24,.84,"walk"),C("bash",.18,1.08,"walk")],[P("paper-stack",-.02,.04,.8,"float"),P("supply-box",.34,.08,.9)]),
      S("classroom","The student checks every picture label.",[C("student",-.12,.72,"point"),C("tony",.22,.58)],[P("label-board",.08,-.08,1,"glow")]),
      S("classroom","Every classroom object now has a clear place.",[C("fritz",-.3,1,"celebrate"),C("nola",-.05,1,"celebrate"),C("student",.25,.72,"celebrate")],[P("organized-room",0,.05),P("sparkles",.2,-.18,.8,"float")])
    ],
    reader1:[
      S("classroom","Tony has a pencil.",[C("tony",-.12,.58)],[P("pencil",.14,.02,.85,"float")]),
      S("classroom","He has one piece of paper.",[C("tony",-.14,.58,"point")],[P("paper",.16,.04,.85,"glow")]),
      S("classroom","The pencil is on the table.",[C("tony",-.18,.58,"point")],[P("table",.15,.09,.95),P("pencil",.15,.02,.65)]),
      S("classroom","The paper is beside the pencil.",[C("tony",-.18,.58,"point")],[P("table",.14,.09,.95),P("pencil",.1,.01,.6),P("paper",.2,.01,.65)]),
      S("classroom","Tony is ready to write.",[C("tony",-.08,.58,"celebrate")],[P("writing-set",.18,.04,.9,"glow")])
    ],
    reader2:[
      S("classroom","Rascal puts a book inside the supply bag.",[C("rascal",-.12,.84,"building")],[P("book",.1,.02,.7),P("bag",.23,.08,.85)]),
      S("reading-room","Tony explains that books belong on the shelf.",[C("tony",-.2,.58,"point"),C("rascal",.18,.84,"thinking")],[P("shelf",.02,.02,.95),P("books",.06,.02,.7)]),
      S("reading-room","Nola shows Rascal the picture label.",[C("nola",-.18,1,"point"),C("rascal",.18,.84)],[P("picture-label",0,-.08,.85,"glow")]),
      S("classroom","Rascal checks the other classroom objects.",[C("rascal",-.08,.84,"point")],[P("object-cards",.18,-.02,.95,"float")]),
      S("classroom","He puts pencils and paper in the correct places.",[C("rascal",-.16,.84,"building")],[P("pencil-cup",.1,.03,.8),P("paper-stack",.25,.06,.8)]),
      S("classroom","Labels help everyone keep the room organized.",[C("nola",-.24,1,"celebrate"),C("rascal",.02,.84,"celebrate"),C("student",.28,.72,"celebrate")],[P("label-board",0,-.12,.9,"glow"),P("sparkles",.2,-.18,.7,"float")])
    ]
  };
  target["3-B"]={
    story:[
      S("classroom","Captain Fritz gives two classroom directions.",[C("fritz",-.18,1,"point"),C("rascal",.2,.84)],[P("two-step-card",.03,-.12,.9,"glow")]),
      S("classroom","Rascal begins before the direction is finished.",[C("rascal",-.08,.84,"walk")],[P("open-book",.18,.05,.85),P("speech",-.22,-.16,.7,"pop")]),
      S("classroom","He turns to page two and feels confused.",[C("rascal",-.08,.84,"thinking")],[P("page-two",.18,.02,.85,"glow"),P("question",.28,-.15,.7,"pop")]),
      S("classroom","Tony reminds him to wait for the whole direction.",[C("tony",-.2,.58,"point"),C("rascal",.18,.84)],[P("listen-first",0,-.15,.9,"glow")]),
      S("classroom","Rascal opens the blue book and shows page four.",[C("rascal",-.12,.84,"celebrate"),C("student",.22,.72)],[P("blue-book",.06,.03,.8),P("page-four",.22,.02,.8,"glow")]),
      S("classroom","Captain Fritz thanks Rascal for listening carefully.",[C("fritz",-.2,1,"celebrate"),C("rascal",.12,.84,"celebrate")],[P("thank-you",0,-.15,.85,"glow"),P("sparkles",.25,-.18,.7,"float")])
    ],
    reader1:[
      S("classroom","Nola has a red box.",[C("nola",-.12,1)],[P("red-box",.18,.08,.85,"float")]),
      S("classroom","Captain Fritz asks her to open it.",[C("fritz",-.2,1,"point"),C("nola",.18,1)],[P("speech",0,-.18,.7,"pop")]),
      S("classroom","Nola opens the box.",[C("nola",-.12,1,"building")],[P("open-red-box",.18,.07,.9,"pop")]),
      S("classroom","A quilt card is inside.",[C("nola",-.12,1,"surprised")],[P("quilt-card",.18,.02,.85,"glow")]),
      S("classroom","Nola shows the card and says thank you.",[C("nola",-.16,1,"celebrate"),C("fritz",.2,1)],[P("quilt-card",0,-.02,.75,"float"),P("thank-you",.02,-.18,.7,"glow")])
    ],
    reader2:[
      S("classroom","Captain Fritz gives the student two directions.",[C("fritz",-.2,1,"point"),C("student",.2,.72)],[P("two-step-card",0,-.13,.9,"glow")]),
      S("classroom","The student waits until both directions are complete.",[C("student",-.05,.72,"thinking")],[P("listening-ears",.2,-.08,.8,"float")]),
      S("classroom","First, the student takes the pencil.",[C("student",-.12,.72,"building")],[P("number-one",.12,-.15,.7,"glow"),P("pencil",.22,.04,.75)]),
      S("classroom","Next, the student closes the supply box.",[C("student",-.12,.72,"building")],[P("number-two",.1,-.15,.7,"glow"),P("closed-box",.22,.07,.85)]),
      S("classroom","Bear checks that the actions are in order.",[C("bear",-.16,.84,"point"),C("student",.2,.72)],[P("check-marks",0,-.15,.85,"glow")]),
      S("classroom","Listening to all the words makes directions easier.",[C("bear",-.25,.84,"celebrate"),C("student",0,.72,"celebrate"),C("tony",.25,.58,"celebrate")],[P("listening-signal",0,-.17,.8,"glow"),P("sparkles",.22,-.18,.7,"float")])
    ]
  };
})();