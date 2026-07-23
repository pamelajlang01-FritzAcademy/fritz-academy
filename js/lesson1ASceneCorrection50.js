/* Fritz Academy Lesson 1-A scene correction v50.0 */
(function(){
  "use strict";
  const C=(id,x,scale,motion="idle",y=0)=>({id,x,scale,motion,y});
  const P=(kind,x,y,scale=1,motion="idle")=>({kind,x,y,scale,motion});
  const target=window.FritzLessonSceneSpecs||(window.FritzLessonSceneSpecs={});
  target["1-A"]={
    story:[
      {environment:"academy-front",caption:"Captain Fritz waits beside the Academy gate.",characters:[C("fritz",-.18,1,"idle")],props:[P("gate",.24,.03,1),P("flag",.34,-.19,.8,"sway")]},
      {environment:"academy-front",caption:"A new Academy Builder walks up the path.",characters:[C("student",-.05,.72,"walk")],props:[P("path",.12,.2,1.1),P("academy-sign",-.29,-.08,.8)]},
      {environment:"academy-front",caption:"Captain Fritz waves and says, Hello!",characters:[C("fritz",-.14,1,"wave"),C("student",.22,.72,"idle")],props:[P("speech",.02,-.18,.75,"pop")]},
      {environment:"academy-front",caption:"The student says their name.",characters:[C("student",-.10,.72,"point"),C("fritz",.20,1,"idle")],props:[P("name-tag",.02,-.17,.8,"float")]},
      {environment:"academy-front",caption:"Captain Fritz smiles. It is nice to meet you.",characters:[C("fritz",-.12,1,"celebrate"),C("student",.22,.72,"celebrate")],props:[P("sparkles",.02,-.18,.75,"float")]},
      {environment:"welcome-garden",caption:"Together, they walk toward the unfinished Welcome Garden.",characters:[C("fritz",-.24,1,"walk"),C("student",.12,.72,"walk")],props:[P("empty-bed",.27,.18,1),P("garden-sign",.32,-.04,.75)]}
    ],
    reader1:[
      {environment:"academy-front",caption:"Captain Fritz is at the gate.",characters:[C("fritz",-.12,1,"idle")],props:[P("gate",.25,.04,1)]},
      {environment:"academy-front",caption:"The student walks on the path.",characters:[C("student",-.05,.72,"walk")],props:[P("path",.15,.20,1)]},
      {environment:"academy-front",caption:"Captain Fritz waves.",characters:[C("fritz",-.12,1,"wave"),C("student",.22,.72,"idle")],props:[P("speech",.03,-.18,.7)]},
      {environment:"academy-front",caption:"The student says, Hello.",characters:[C("student",-.10,.72,"wave"),C("fritz",.20,1,"idle")],props:[P("speech",.02,-.18,.7)]},
      {environment:"welcome-garden",caption:"They are new friends.",characters:[C("fritz",-.18,1,"celebrate"),C("student",.18,.72,"celebrate")],props:[P("flowers",0,.18,.8,"sway")]}
    ],
    reader2:[
      {environment:"welcome-garden",caption:"The Welcome Garden is not finished.",characters:[C("fritz",-.22,1,"point"),C("student",.16,.72,"thinking")],props:[P("empty-bed",.24,.18,1)]},
      {environment:"welcome-garden",caption:"Captain Fritz shows the garden plan.",characters:[C("fritz",-.16,1,"point"),C("student",.22,.72,"idle")],props:[P("map",.03,-.15,.8,"float")]},
      {environment:"welcome-garden",caption:"The student chooses flowers.",characters:[C("student",-.12,.72,"building")],props:[P("flower-basket",.20,.14,.9),P("flowers",.30,.16,.8,"sway")]},
      {environment:"welcome-garden",caption:"Captain Fritz carries the garden sign.",characters:[C("fritz",-.15,1,"building")],props:[P("garden-sign",.22,.05,.9)]},
      {environment:"welcome-garden",caption:"They begin building together.",characters:[C("fritz",-.22,1,"building"),C("student",.14,.72,"building")],props:[P("young-tree",.30,.04,.8,"sway"),P("flowers",0,.19,.8,"sway")]},
      {environment:"welcome-garden",caption:"The first part of the Welcome Garden is ready.",characters:[C("fritz",-.22,1,"celebrate"),C("student",.14,.72,"celebrate")],props:[P("welcome-sign",.30,.02,.8),P("sparkles",.02,-.18,.8,"float")]}
    ]
  };
})();