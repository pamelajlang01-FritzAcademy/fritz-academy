/* Fritz Academy Lesson 3 cast, scene, reader, and phonics alignment v50.44 */
(function(){
  "use strict";

  const lesson=typeof findLevel==="function"?findLevel("1-C"):null;
  if(!lesson) return;

  const piece=(id,name,icon)=>({id,name,icon,area:"welcome-garden",lesson:"1-C"});
  const C=(id,x,scale,motion="idle",y=0)=>({id,x,scale,motion,y});
  const P=(kind,x,y,scale=1,motion="idle")=>({kind,x,y,scale,motion});

  lesson.title="The Friends Build a Reading Corner";
  lesson.reward="Garden Reading Corner";

  lesson.story={
    title:"The Friends Build a Reading Corner",
    pages:[
      {text:"Tony opens the garden plan. He shows everyone where the new reading corner will go.",image:"assets/tony.png"},
      {text:"Bash carries the heavy book shelf and reading chair along the path.",image:"assets/bash.png"},
      {text:"Nola sorts the books while Bear brings a basket of cushions.",image:"assets/nola.png"},
      {text:"Rascal finds a good place for the story stump beside the green garden.",image:"assets/rascal.png"},
      {text:"Captain Fritz asks, ‘What are you building?’ Tony says, ‘A reading corner for everyone!’",image:"assets/captain_fritz.png"},
      {text:"The friends put every piece in place. Their new garden reading corner is ready.",image:"assets/environments/welcome_garden.png"}
    ],
    questions:[
      {prompt:"Who leads the work?",options:["Tony","Captain Fritz","Nola"],answer:"Tony"},
      {prompt:"What does Bash carry?",options:["A shelf and chair","A bell","A flag"],answer:"A shelf and chair"},
      {prompt:"What does Nola sort?",options:["Books","Flowers","Hats"],answer:"Books"},
      {prompt:"What does Rascal place?",options:["The story stump","The mailbox","The gate"],answer:"The story stump"},
      {prompt:"What do they build?",options:["A reading corner","A kitchen","A bridge"],answer:"A reading corner"}
    ],
    rewardPiece:piece("reading-chair","Garden Reading Chair","🪑")
  };

  lesson.reader1={
    title:"Reader 1: Tony's Garden Plan",
    level:"Easy",
    pages:[
      {text:"Tony has a garden plan.",image:"assets/tony.png"},
      {text:"He points to a green place.",image:"assets/environments/welcome_garden.png"},
      {text:"Rascal helps him mark the spot.",image:"assets/rascal.png"},
      {text:"They grin. The plan is ready.",image:"assets/environments/welcome_garden.png"}
    ],
    check:{prompt:"What does Tony have?",options:["A garden plan","A red hat","A drum"],answer:"A garden plan"},
    rewardPiece:piece("outdoor-story-stump","Outdoor Story Stump","🪵")
  };

  lesson.reader2={
    title:"Reader 2: Bash Helps Build",
    level:"Stretch",
    pages:[
      {text:"Bash carries the heavy chair.",image:"assets/bash.png"},
      {text:"Nola brings books for the shelf.",image:"assets/nola.png"},
      {text:"Bear finds an insect on a leaf.",image:"assets/bear.png"},
      {text:"The friends leave it safe and finish the reading corner.",image:"assets/environments/welcome_garden.png"}
    ],
    check:{prompt:"Who carries the chair?",options:["Bash","Tony","Bear"],answer:"Bash"},
    rewardPiece:piece("book-shelf","Garden Book Shelf","📚")
  };

  lesson.phonics=Object.assign({},lesson.phonics||{}, {
    letterUpper:"G H I",
    letterLower:"g h i",
    soundLabel:"G, H, and short I",
    teacherCue:"Say: g-g-garden, h-h-hat, i-i-insect.",
    examples:[
      {word:"garden",icon:"🌻"},
      {word:"hat",icon:"🎩"},
      {word:"insect",icon:"🐞"}
    ],
    recognitionQuestion:{prompt:"Choose the new uppercase letters.",options:["G, H, I","C, D, E","A, B, C"],answer:"G, H, I"},
    lowercaseQuestion:{prompt:"Choose the new lowercase letters.",options:["g, h, i","c, d, e","a, b, c"],answer:"g, h, i"},
    wordQuestion:{prompt:"Which words begin with G, H, and I?",options:["garden, hat, insect","cat, dog, egg","apple, ball, car"],answer:"garden, hat, insect"},
    rewardPiece:piece("book-shelf","Garden Book Shelf","📚")
  });

  if(lesson.feelingsActivity) lesson.feelingsActivity.rewardPiece=piece("reading-chair","Garden Reading Chair","🪑");

  lesson.build={
    areaId:"welcome-garden",
    stage:3,
    title:"Build the Garden Reading Corner",
    requiredPieces:["reading-chair","outdoor-story-stump","book-shelf"],
    completionMessage:"You built the Garden Reading Corner."
  };

  window.FritzLessonSceneSpecs=window.FritzLessonSceneSpecs||{};
  window.FritzLessonSceneSpecs["1-C"]={
    story:[
      {environment:"welcome-garden",caption:lesson.story.pages[0].text,characters:[C("tony",-.08,.62,"point"),C("rascal",.24,.84,"idle")],props:[P("map",.08,-.06,.9,"float")]},
      {environment:"welcome-garden",caption:lesson.story.pages[1].text,characters:[C("bash",-.08,1.08,"walk"),C("tony",.28,.62,"point")],props:[P("book-shelf",-.27,.09,.68),P("reading-chair",.08,.12,.65)]},
      {environment:"welcome-garden",caption:lesson.story.pages[2].text,characters:[C("nola",-.18,1,"idle"),C("bear",.2,.84,"walk")],props:[P("books",-.02,.06,.8),P("cushions",.31,.12,.75)]},
      {environment:"welcome-garden",caption:lesson.story.pages[3].text,characters:[C("rascal",-.1,.84,"point"),C("tony",.24,.62,"idle")],props:[P("story-stump",.08,.12,.75),P("flowers",-.3,.22,.7,"sway")]},
      {environment:"welcome-garden",caption:lesson.story.pages[4].text,characters:[C("fritz",-.25,1,"thinking"),C("tony",.02,.62,"point"),C("bash",.27,1.08,"idle")],props:[P("question",-.08,-.18,.8,"pop"),P("map",.13,-.03,.7)]},
      {environment:"welcome-garden",caption:lesson.story.pages[5].text,characters:[C("tony",-.3,.62,"celebrate"),C("bash",-.12,1.08,"celebrate"),C("nola",.08,1,"celebrate"),C("rascal",.27,.84,"celebrate"),C("bear",.39,.84,"celebrate")],props:[P("book-shelf",-.2,.1,.55),P("reading-chair",.02,.13,.55),P("story-stump",.24,.13,.55)]}
    ],
    reader1:[
      {environment:"welcome-garden",caption:lesson.reader1.pages[0].text,characters:[C("tony",-.08,.62,"idle")],props:[P("map",.14,-.04,.9,"float")]},
      {environment:"welcome-garden",caption:lesson.reader1.pages[1].text,characters:[C("tony",-.08,.62,"point")],props:[P("map-mark",.2,.04,.75,"pulse"),P("flowers",-.28,.22,.7,"sway")]},
      {environment:"welcome-garden",caption:lesson.reader1.pages[2].text,characters:[C("tony",-.18,.62,"idle"),C("rascal",.18,.84,"point")],props:[P("map-mark",.03,.04,.75,"pulse")]},
      {environment:"welcome-garden",caption:lesson.reader1.pages[3].text,characters:[C("tony",-.15,.62,"celebrate"),C("rascal",.17,.84,"celebrate")],props:[P("map",.02,-.04,.8,"float")]}
    ],
    reader2:[
      {environment:"welcome-garden",caption:lesson.reader2.pages[0].text,characters:[C("bash",-.06,1.08,"walk")],props:[P("reading-chair",.18,.12,.72)]},
      {environment:"welcome-garden",caption:lesson.reader2.pages[1].text,characters:[C("nola",-.08,1,"walk")],props:[P("books",.18,.06,.8,"float")]},
      {environment:"welcome-garden",caption:lesson.reader2.pages[2].text,characters:[C("bear",-.1,.84,"point")],props:[P("insect",.2,.02,.75,"float"),P("leaf",.2,.12,.8)]},
      {environment:"welcome-garden",caption:lesson.reader2.pages[3].text,characters:[C("bash",-.28,1.08,"celebrate"),C("nola",-.06,1,"celebrate"),C("bear",.17,.84,"celebrate"),C("rascal",.34,.84,"celebrate")],props:[P("book-shelf",-.15,.1,.55),P("reading-chair",.1,.13,.55)]}
    ]
  };

  window.FritzLesson3CastAndSceneFix5044={version:"50.44",lessonId:"1-C"};
})();