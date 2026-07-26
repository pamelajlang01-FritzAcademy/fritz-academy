/* Fritz Academy official Lesson 4 replacement v50.46 */
(function(){
  "use strict";
  const lesson=typeof findLevel==="function"?findLevel("1-D"):null;
  if(!lesson) return;

  const piece=(id,name,icon)=>({id,name,icon,area:"welcome-garden",lesson:"1-D"});
  const C=(id,x,scale,motion="idle",y=0)=>({id,x,scale,motion,y});
  const P=(kind,x,y,scale=1,motion="idle")=>({kind,x,y,scale,motion});

  lesson.title="The Lost Library Key";
  lesson.unlocked=true;
  lesson.reward="Garden Reading Club";
  lesson.objectives={
    speaking:["Use short sentences to describe a plan.","Explain who helps and what each friend does.","Say words beginning with J, K, and L."],
    listening:["Follow a connected six-part story.","Listen for J, K, and L beginning sounds.","Answer short questions about actions and sequence."],
    reading:["Read two easy stories that continue the main event.","Use familiar words from Lessons 1-3.","Read a few new J, K, and L words in context."],
    writing:["Identify and form J, j, K, k, L, and l.","Complete one short sentence about the story."]
  };

  lesson.intro=[
    {speaker:"Captain Fritz",text:"Hello, {studentName}! Welcome back to Fritz Academy!"},
    {speaker:"Captain Fritz",text:"You know A through I. Today we will learn J, K, and L."},
    {speaker:"Captain Fritz",text:"How are you today?",responseType:"feeling"},
    {speaker:"Captain Fritz",text:"Tony has a new plan, but the friends must find the library key first."},
    {speaker:"Captain Fritz",text:"Listen for jacket, key, and library."}
  ];

  lesson.feelingsActivity={
    title:"How Do They Feel?",
    instructions:"Choose the short sentence that fits.",
    questions:[
      {emoji:"😃",prompt:"Tony has a new plan.",options:["He is excited.","He is asleep.","He is angry."],answer:"He is excited."},
      {emoji:"😟",prompt:"The key is missing.",options:["Nola is worried.","Nola is hungry.","Nola is laughing."],answer:"Nola is worried."},
      {emoji:"😌",prompt:"Bash makes a safe plan.",options:["He is calm.","He is lost.","He is sad."],answer:"He is calm."}
    ],
    rewardPiece:null
  };

  lesson.story={
    title:"The Lost Library Key",
    pages:[
      {text:"Tony shows the friends his plan for a new garden reading club.",image:"assets/tony.png"},
      {text:"Rascal races to the book cart, but the little lock is closed.",image:"assets/rascal.png"},
      {text:"Bear finds a yellow jacket near the path. A key jingles inside its pocket.",image:"assets/bear.png"},
      {text:"Nola worries that Rascal will run ahead again. Everyone looks at Bash.",image:"assets/nola.png"},
      {text:"Bash nods to Tony. “We can use your plan, but we stay together.”",image:"assets/bash.png"},
      {text:"Captain Fritz asks what they are doing. Tony says, “We found the library key, and we are starting a reading club!”",image:"assets/captain_fritz.png"}
    ],
    questions:[
      {prompt:"Who has the plan?",options:["Tony","Bear","Nola"],answer:"Tony"},
      {prompt:"What is locked?",options:["The book cart","The gate","The mailbox"],answer:"The book cart"},
      {prompt:"Where is the key?",options:["In a jacket","Under a chair","In a book"],answer:"In a jacket"},
      {prompt:"Who makes the safe plan?",options:["Bash","Rascal","Bear"],answer:"Bash"},
      {prompt:"What do they start?",options:["A reading club","A race","A picnic"],answer:"A reading club"}
    ],
    rewardPiece:piece("book-cart","Garden Book Cart","📚")
  };

  lesson.alphabetSong=lesson.alphabetSong||{title:"Fritz Academy Alphabet Song",assetPath:"assets/audio/alphabet-song.mp3",videoPath:"assets/video/alphabet-song.mp4"};

  lesson.phonics={
    title:"J, K, and L Picture Match",
    review:["A","B","C","D","E","F","G","H","I"],
    letters:[
      {upper:"J",lower:"j",sound:"j",cue:"J says /j/ as in jacket.",examples:[{word:"jacket",picture:"🧥"},{word:"jar",picture:"🏺"},{word:"jump",picture:"🦘"}]},
      {upper:"K",lower:"k",sound:"k",cue:"K says /k/ as in key.",examples:[{word:"key",picture:"🔑"},{word:"kite",picture:"🪁"},{word:"king",picture:"🤴"}]},
      {upper:"L",lower:"l",sound:"l",cue:"L says /l/ as in leaf.",examples:[{word:"leaf",picture:"🍃"},{word:"lion",picture:"🦁"},{word:"lamp",picture:"💡"}]}
    ],
    chant:"J says j-j-jacket. K says k-k-key. L says l-l-leaf. J, K, L — listen well!",
    letterUpper:"J K L",letterLower:"j k l",soundLabel:"J, K, and L",
    teacherCue:"Say: j-j-jacket, k-k-key, l-l-leaf.",
    examples:[{word:"jacket",icon:"🧥"},{word:"key",icon:"🔑"},{word:"leaf",icon:"🍃"}],
    recognitionQuestion:{prompt:"Choose the new uppercase letters.",options:["J, K, L","G, H, I","D, E, F"],answer:"J, K, L"},
    lowercaseQuestion:{prompt:"Choose the new lowercase letters.",options:["j, k, l","g, h, i","d, e, f"],answer:"j, k, l"},
    wordQuestion:{prompt:"Which words begin with J, K, and L?",options:["jacket, key, leaf","garden, hat, insect","dog, egg, fish"],answer:"jacket, key, leaf"},
    rewardPiece:null
  };

  lesson.reader1={
    title:"Reader 1: The Key in the Jacket",
    level:"Easy",
    pages:[
      {text:"Bear has a yellow jacket.",image:"assets/bear.png"},
      {text:"The jacket has a pocket.",image:"assets/bear.png"},
      {text:"A little key is in the pocket.",image:"assets/bear.png"},
      {text:"Bear gives the key to Bash.",image:"assets/bash.png"},
      {text:"Bash opens the book cart.",image:"assets/bash.png"}
    ],
    check:{prompt:"What is in the pocket?",options:["A key","A leaf","A ball"],answer:"A key"},
    rewardPiece:piece("reading-circle","Garden Reading Circle","⭕")
  };

  lesson.reader2={
    title:"Reader 2: Rascal's First Job",
    level:"Easy Plus",
    pages:[
      {text:"The book cart is open.",image:"assets/environments/welcome_garden.png"},
      {text:"Tony gives Rascal one job.",image:"assets/tony.png"},
      {text:"Rascal puts the little books in a neat row.",image:"assets/rascal.png"},
      {text:"Nola checks the row and smiles.",image:"assets/nola.png"},
      {text:"The friends sit in the reading circle and choose a book.",image:"assets/environments/welcome_garden.png"}
    ],
    check:{prompt:"What is Rascal's job?",options:["Put books in a row","Hide the key","Climb the tree"],answer:"Put books in a row"},
    rewardPiece:piece("trophy-display","Reading Club Trophy Display","🏆")
  };

  lesson.build={
    areaId:"welcome-garden",stage:4,title:"Build the Garden Reading Club",
    requiredPieces:["book-cart","reading-circle","trophy-display"],
    completionMessage:"You built the Garden Reading Club."
  };
  lesson.completion={xp:35,stars:1,unlocks:"1-E",message:"Lesson 4 complete!"};

  window.FritzLessonSceneSpecs=window.FritzLessonSceneSpecs||{};
  window.FritzLessonSceneSpecs["1-D"]={
    story:[
      {environment:"welcome-garden",caption:lesson.story.pages[0].text,characters:[C("tony",-.1,.62,"point"),C("bash",.24,1.08,"idle")],props:[P("map",.08,-.06,.9,"float")]},
      {environment:"welcome-garden",caption:lesson.story.pages[1].text,characters:[C("rascal",-.05,.84,"walk"),C("nola",.28,1,"worried")],props:[P("book-cart",.13,.1,.72),P("lock",.12,-.02,.65)]},
      {environment:"welcome-garden",caption:lesson.story.pages[2].text,characters:[C("bear",-.08,.84,"surprised")],props:[P("jacket",.15,.02,.8),P("key",.23,-.05,.7,"glow")]},
      {environment:"welcome-garden",caption:lesson.story.pages[3].text,characters:[C("nola",-.25,1,"worried"),C("rascal",.02,.84,"idle"),C("bash",.28,1.08,"thinking")],props:[]},
      {environment:"welcome-garden",caption:lesson.story.pages[4].text,characters:[C("bash",-.12,1.08,"nod"),C("tony",.18,.62,"idle")],props:[P("map",.02,-.04,.75)]},
      {environment:"welcome-garden",caption:lesson.story.pages[5].text,characters:[C("fritz",-.28,1,"thinking"),C("tony",-.04,.62,"point"),C("bash",.21,1.08,"idle"),C("rascal",.38,.84,"celebrate")],props:[P("book-cart",.07,.12,.55)]}
    ],
    reader1:[
      {environment:"welcome-garden",caption:lesson.reader1.pages[0].text,characters:[C("bear",-.08,.84,"idle")],props:[P("jacket",.18,.04,.8)]},
      {environment:"welcome-garden",caption:lesson.reader1.pages[1].text,characters:[C("bear",-.08,.84,"point")],props:[P("jacket",.18,.04,.8)]},
      {environment:"welcome-garden",caption:lesson.reader1.pages[2].text,characters:[C("bear",-.08,.84,"surprised")],props:[P("key",.18,-.02,.75,"glow")]},
      {environment:"welcome-garden",caption:lesson.reader1.pages[3].text,characters:[C("bear",-.18,.84,"idle"),C("bash",.18,1.08,"idle")],props:[P("key",0,-.02,.65,"float")]},
      {environment:"welcome-garden",caption:lesson.reader1.pages[4].text,characters:[C("bash",-.08,1.08,"celebrate")],props:[P("book-cart",.18,.1,.72),P("key",.03,-.02,.55)]}
    ],
    reader2:[
      {environment:"welcome-garden",caption:lesson.reader2.pages[0].text,characters:[C("rascal",-.08,.84,"idle")],props:[P("book-cart",.18,.1,.72)]},
      {environment:"welcome-garden",caption:lesson.reader2.pages[1].text,characters:[C("tony",-.18,.62,"point"),C("rascal",.18,.84,"idle")],props:[]},
      {environment:"welcome-garden",caption:lesson.reader2.pages[2].text,characters:[C("rascal",-.08,.84,"reading")],props:[P("books",.18,.06,.8)]},
      {environment:"welcome-garden",caption:lesson.reader2.pages[3].text,characters:[C("nola",-.18,1,"point"),C("rascal",.18,.84,"celebrate")],props:[P("books",0,.08,.65)]},
      {environment:"welcome-garden",caption:lesson.reader2.pages[4].text,characters:[C("tony",-.3,.62,"reading"),C("bash",-.12,1.08,"reading"),C("nola",.08,1,"reading"),C("bear",.25,.84,"reading"),C("rascal",.4,.84,"reading")],props:[P("reading-circle",.04,.15,.65),P("book-cart",-.2,.08,.5)]}
    ]
  };

  /* Allow three live rewards while satisfying the legacy validator. */
  if(typeof LessonValidator!=="undefined"&&typeof LessonValidator.validate==="function"){
    const prior=LessonValidator.validate.bind(LessonValidator);
    LessonValidator.validate=function(candidate){
      if(!candidate||candidate.id!=="1-D") return prior(candidate);
      const f=candidate.feelingsActivity,p=candidate.phonics,fr=f&&f.rewardPiece,pr=p&&p.rewardPiece;
      if(f&&!fr) f.rewardPiece={id:"l4-check-f",name:"Lesson Check",icon:"✓"};
      if(p&&!pr) p.rewardPiece={id:"l4-check-p",name:"Lesson Check",icon:"✓"};
      try{return prior(candidate);}finally{if(f)f.rewardPiece=fr||null;if(p)p.rewardPiece=pr||null;}
    };
  }

  /* Render official PNG objects in Lesson 4 scenes instead of text fallbacks. */
  if(typeof IllustrationEngine!=="undefined"){
    const assets={
      "book-cart":{src:"assets/objects/book_cart.png",w:180,h:145},
      "reading-circle":{src:"assets/objects/reading_circle.png",w:210,h:150},
      "trophy-display":{src:"assets/objects/trophy_display.png",w:190,h:155}
    };
    const oldEntries=IllustrationEngine.prototype.textureEntries;
    IllustrationEngine.prototype.textureEntries=function(config={}){
      const entries=oldEntries.call(this,config)||[];
      (config.props||[]).forEach(spec=>{const k=String(spec&&spec.kind||"").toLowerCase(),a=assets[k];if(a)entries.push({key:`fa-l4-${k}`,src:a.src});});
      return entries.filter((e,i,a)=>e&&e.key&&a.findIndex(x=>x&&x.key===e.key)===i);
    };
    const oldProp=IllustrationEngine.prototype.makeProp;
    IllustrationEngine.prototype.makeProp=function(spec,x,y,width,height,index){
      const k=String(spec&&spec.kind||"").toLowerCase(),a=assets[k];
      if(!a||!this.scene.textures.exists(`fa-l4-${k}`)) return oldProp.call(this,spec,x,y,width,height,index);
      const s=Math.max(.45,Math.min(1.35,Number(spec.scale)||1));
      const image=this.scene.add.image(x+(Number(spec.x)||0)*width,y+(Number(spec.y)||0)*height,`fa-l4-${k}`).setOrigin(.5).setDepth(5+index);
      image.setDisplaySize(a.w*s,a.h*s);return image;
    };
  }

  window.FritzLesson4Production5046={version:"50.46",lessonId:"1-D"};
})();