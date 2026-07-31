/* Fritz Academy Lesson 4 — Question Words
   Replaces the outdated E/F lesson with a beginner ESL lesson on
   Who, What, Where, When, Why, and How.
*/
(function(){
  "use strict";

  if(typeof findLevel !== "function") return;
  const lesson = findLevel("1-D");
  if(!lesson) return;

  const piece = (id,name,icon) => ({
    id,
    name,
    icon,
    area:"welcome-garden",
    lesson:"1-D"
  });

  Object.assign(lesson, {
    id:"1-D",
    chapter:"Week 1",
    title:"Six Good Questions",
    unlocked:false,
    reward:"Welcome Garden — Question Corner",
    buildArea:"welcome-garden",
    buildStage:4,

    objectives:{
      speaking:[
        "Ask and answer simple questions with who, what, where, when, why, and how.",
        "Say how you feel in a short sentence."
      ],
      listening:[
        "Understand what each question word asks.",
        "Answer questions about a short story."
      ],
      reading:[
        "Read six common question words.",
        "Read two short connected readers.",
        "Answer simple questions using story details."
      ],
      writing:["Choose the correct question word."],
      phonics:["Review the alphabet while learning question words."]
    },

    vocabulary:[
      {word:"who",display:"Who? A person.",picture:"👤"},
      {word:"what",display:"What? A thing.",picture:"📦"},
      {word:"where",display:"Where? A place.",picture:"📍"},
      {word:"when",display:"When? A time or day.",picture:"🕒"},
      {word:"why",display:"Why? What made it happen?",picture:"💭"},
      {word:"how",display:"How? The way we do it.",picture:"🛠️"}
    ],

    intro:[
      {speaker:"Captain Fritz",text:"Hello, {studentName}! How do you feel today?",responseType:"feeling"},
      {speaker:"Captain Fritz",text:"Today we learn six question words."},
      {speaker:"Captain Fritz",text:"Questions help us find an answer."}
    ],

    feelingChoices:[
      {id:"happy",label:"I am happy.",emoji:"😀"},
      {id:"tired",label:"I am tired.",emoji:"😴"},
      {id:"excited",label:"I am excited.",emoji:"🤩"}
    ],

    feelingsActivity:{
      title:"How Do You Feel?",
      instructions:"Choose your answer and say the full sentence.",
      questions:[
        {prompt:"How do you feel today?",options:["I am happy.","I am tired.","I am excited."],answer:"I am happy."}
      ],
      rewardPiece:piece("lesson4-greeting-card","Question Word Card","❓")
    },

    story:{
      title:"The Six Questions",
      pages:[
        {text:"Tony sees a gold key. He asks, “Who has the key?” Who asks about a person.",image:"assets/tony.png"},
        {text:"Bear sees a box. He asks, “What is in the box?” What asks about a thing.",image:"assets/bear.png"},
        {text:"Nola looks around. She asks, “Where is the library?” Where asks about a place.",image:"assets/nola.png"},
        {text:"Rascal sees a clock. He asks, “When do we go inside?” When asks about a time or day.",image:"assets/rascal.png"},
        {text:"Bash sees the locked door. He asks, “Why is it locked?” Why asks what made something happen.",image:"assets/bash.png"},
        {text:"Captain Fritz asks, “How can we open it?” How asks the way we do something. Tony uses the key.",image:"assets/captain_fritz.png"}
      ],
      questions:[
        {prompt:"Who has the gold key?",options:["Tony","Nola","Captain Fritz"],answer:"Tony"},
        {prompt:"What does Bear see?",options:["A box","A bus","A fish"],answer:"A box"},
        {prompt:"Where do the friends want to go?",options:["The library","The park","The car"],answer:"The library"},
        {prompt:"When asks about what?",options:["A time or day","A person","A thing"],answer:"A time or day"},
        {prompt:"Why asks what?",options:["What made it happen","Which person","Which place"],answer:"What made it happen"},
        {prompt:"How do they open the door?",options:["They use the key","They sing","They run"],answer:"They use the key"}
      ],
      rewardPiece:piece("question-garden-sign","Question Garden Sign","🪧")
    },

    alphabetSong:{
      title:"Fritz Academy Alphabet Song",
      rewardMessage:"Sing the alphabet with Captain Fritz!",
      assetPath:"assets/alphabet-song-small.mp4",
      videoPath:"assets/alphabet-song-small.mp4"
    },

    /* The current engine expects this section after the alphabet song.
       It is used as a short question-word review rather than a new-letter lesson. */
    phonics:{
      letterUpper:"WHO • WHAT • WHERE • WHEN • WHY • HOW",
      letterLower:"question words",
      soundLabel:"Listen for the first word in the question.",
      teacherCue:"Read each question word slowly. Ask the student what kind of answer it needs.",
      examples:[
        {word:"Who = person",icon:"👤"},
        {word:"What = thing",icon:"📦"},
        {word:"Where = place",icon:"📍"},
        {word:"When = time",icon:"🕒"},
        {word:"Why = what made it happen",icon:"💭"},
        {word:"How = the way",icon:"🛠️"}
      ],
      recognitionQuestion:{prompt:"Which word asks about a person?",options:["Who","Where","When"],answer:"Who"},
      lowercaseQuestion:{prompt:"Which word asks about a place?",options:["Where","Why","What"],answer:"Where"},
      wordQuestion:{prompt:"Which word asks the way we do something?",options:["How","Who","When"],answer:"How"},
      rewardPiece:piece("lesson4-review-marker","Question Review Marker","❔")
    },

    reader1:{
      title:"Reader 1: What Does It Ask?",
      level:"Easy",
      pages:[
        {text:"Who asks about a person. Who is Tony? Tony is a puppy.",image:"assets/tony.png"},
        {text:"What asks about a thing. What is this? It is a key.",image:"assets/alphabet-blocks.png"},
        {text:"Where asks about a place. Where is the key? It is on the table.",image:"assets/academy.png"},
        {text:"When asks about a time or day. When do we read? We read today.",image:"assets/captain_fritz.png"},
        {text:"Why asks what made something happen. Why is the door locked? It keeps the books safe.",image:"assets/bash.png"},
        {text:"How asks the way we do something. How do we open the door? We use the key.",image:"assets/captain_fritz.png"}
      ],
      questions:[
        {prompt:"Which word asks about a person?",options:["Who","What","When"],answer:"Who"},
        {prompt:"Which word asks about a thing?",options:["What","Where","Why"],answer:"What"},
        {prompt:"Which word asks about a place?",options:["Where","How","Who"],answer:"Where"},
        {prompt:"Which word asks about time?",options:["When","What","Where"],answer:"When"},
        {prompt:"Which word asks what made something happen?",options:["Why","Who","How"],answer:"Why"},
        {prompt:"Which word asks the way we do something?",options:["How","When","What"],answer:"How"}
      ],
      check:{prompt:"Which word asks the way we do something?",options:["How","Who","Where"],answer:"How"},
      rewardPiece:piece("question-flower-bed","Question Flower Bed","🌼")
    },

    reader2:{
      title:"Reader 2: Questions in the Library",
      level:"Growing Reader",
      pages:[
        {text:"Tony has a map. Who has the map? Tony has it.",image:"assets/tony.png"},
        {text:"Bear has a bag. What is in the bag? A book is in it.",image:"assets/bear.png"},
        {text:"The friends go to the library. Where do they go? They go to the library.",image:"assets/academy.png"},
        {text:"They read today. When do they read? They read today.",image:"assets/captain_fritz.png"},
        {text:"They read to learn. Why do they read? They want to learn.",image:"assets/nola.png"},
        {text:"They learn together. How do they learn? They read and talk together.",image:"assets/bash.png"}
      ],
      questions:[
        {prompt:"Who has the map?",options:["Tony","Bear","Nola"],answer:"Tony"},
        {prompt:"What is in the bag?",options:["A book","A key","A hat"],answer:"A book"},
        {prompt:"Where do the friends go?",options:["The library","The garden","The bus"],answer:"The library"},
        {prompt:"When do they read?",options:["Today","Next year","At night only"],answer:"Today"},
        {prompt:"Why do they read?",options:["They want to learn","They want to sleep","They want to run"],answer:"They want to learn"},
        {prompt:"How do they learn?",options:["They read and talk together","They hide","They jump"],answer:"They read and talk together"}
      ],
      check:{prompt:"Why do the friends read?",options:["They want to learn","They want to sleep","They want to leave"],answer:"They want to learn"},
      rewardPiece:piece("question-lantern","Question Garden Lantern","🏮")
    },

    build:{
      areaId:"welcome-garden",
      stage:4,
      title:"Build the Question Corner",
      requiredPieces:["question-garden-sign","question-flower-bed","question-lantern"],
      completionMessage:"You built a Question Corner in the Welcome Garden."
    },

    closingSong:{
      title:"Fritz Academy Welcome Song",
      assetPath:"assets/welcome-song-small.mp4",
      videoPath:"assets/welcome-song-small.mp4",
      rewardMessage:"Great work asking six good questions!"
    },

    completion:{
      xp:30,
      stars:1,
      unlocks:"1-E",
      message:"Lesson 4 complete! You know six important question words."
    }
  });

  /* ReaderEngine versions differ: some read `check`, others read `questions`.
     Both are supplied above. Keep only the three meaningful garden rewards in the build. */
  lesson.build.requiredPieces = [
    lesson.story.rewardPiece.id,
    lesson.reader1.rewardPiece.id,
    lesson.reader2.rewardPiece.id
  ];

  console.info("Fritz Academy: Lesson 4 question-words replacement loaded", lesson);
})();
