/* Fritz Academy Lesson 3 production repair v50.38
   Aligns Lesson 1-C with the G/H/I phonics progression and gives it a unique reading-corner builder pack. */
(function(){
  "use strict";

  const lesson=typeof findLevel==="function"?findLevel("1-C"):null;
  if(!lesson) return;

  lesson.title="Follow the Garden Map";
  lesson.reward="Garden Reading Corner";
  lesson.objectives=lesson.objectives||{};
  lesson.objectives.speaking=[
    "Use left, right, forward, and stop in complete directions.",
    "Describe how a character feels and explain why.",
    "Say words that begin with G, H, and I."
  ];
  lesson.objectives.listening=[
    "Follow two-step spoken directions.",
    "Recognize the beginning sounds /g/, /h/, and short /i/.",
    "Listen for important details in a connected story."
  ];
  lesson.objectives.reading=[
    "Read a connected story about following a map and building a reading corner.",
    "Answer questions about actions, reasons, and sequence.",
    "Read two short readers using cumulative A-I vocabulary."
  ];
  lesson.objectives.writing=[
    "Identify and form G, g, H, h, I, and i.",
    "Complete a short direction sentence."
  ];

  lesson.intro=[
    {speaker:"Captain Fritz",text:"Hello, {studentName}! Welcome back to Fritz Academy!"},
    {speaker:"Captain Fritz",text:"You already know A through F. Today we will learn G, H, and I."},
    {speaker:"Captain Fritz",text:"How are you today?",responseType:"feeling"},
    {speaker:"Captain Fritz",text:"Tony found a garden map. We will follow its directions and build a special reading corner."},
    {speaker:"Captain Fritz",text:"Listen for these words: garden, gate, hat, hill, insect, and inside.",responseType:"say"}
  ];

  lesson.feelingsActivity={
    title:"Feelings and Reasons",
    instructions:"Read each situation and choose the complete sentence that explains the feeling.",
    questions:[
      {emoji:"🤩",prompt:"Tony finds a hidden map. How does he feel?",answer:"He feels excited because he found a clue.",options:["He feels excited because he found a clue.","He feels worried because it is raining.","He feels calm because he is sleeping."]},
      {emoji:"😟",prompt:"Nola cannot see the next arrow. How does she feel?",answer:"She feels worried because the path is unclear.",options:["She feels proud because she won.","She feels worried because the path is unclear.","She feels excited because she found a gift."]},
      {emoji:"😌",prompt:"Captain Fritz reads one direction at a time. How does he feel?",answer:"He feels calm because he has a careful plan.",options:["He feels calm because he has a careful plan.","He feels sad because he lost a book.","He feels angry because the gate is blue."]}
    ],
    rewardPiece:{id:"reading-chair",name:"Garden Reading Chair",icon:"🪑",area:"welcome-garden",lesson:"1-C"}
  };

  lesson.story={
    title:"The Map to the Reading Corner",
    pages:[
      {text:"Tony finds a rolled map under the big garden tree.",image:"assets/tony.png"},
      {text:"The map says, “Go forward to the gate, then turn right.”",image:"assets/environments/academy_gate.png"},
      {text:"Nola wears a bright hat so the friends can see her beside the high flowers.",image:"assets/nola.png"},
      {text:"Near the hill, Bear spots a tiny insect resting on a green leaf.",image:"assets/bear.png"},
      {text:"Captain Fritz says, “The insect is beside the final arrow. Look inside the wooden box.”",image:"assets/captain_fritz.png"},
      {text:"Inside the box is a sign: GARDEN READING CORNER. The friends cheer because careful listening helped them find it.",image:"assets/environments/welcome_garden.png"}
    ],
    questions:[
      {prompt:"Where does Tony find the map?",options:["Under the big garden tree","Inside the classroom","Beside the Academy bell"],answer:"Under the big garden tree"},
      {prompt:"What two directions does the map give first?",options:["Go forward, then turn right","Turn left, then stop","Go backward, then run"],answer:"Go forward, then turn right"},
      {prompt:"Why does Nola wear a bright hat?",options:["So the friends can see her","Because she is cold","To hide from Captain Fritz"],answer:"So the friends can see her"},
      {prompt:"What helps the friends find the wooden box?",options:["An insect beside the final arrow","A loud song from the classroom","A red ball on the path"],answer:"An insect beside the final arrow"},
      {prompt:"Why do the friends cheer at the end?",options:["Careful listening helped them find the reading corner","They finished lunch","They found letters C and D"],answer:"Careful listening helped them find the reading corner"}
    ],
    rewardPiece:{id:"outdoor-story-stump",name:"Outdoor Story Stump",icon:"🪵",area:"welcome-garden",lesson:"1-C"}
  };

  lesson.reader1={
    title:"Reader 1: The Hat on the Hill",
    level:"Easy",
    pages:[
      {text:"Nola has a blue hat.",image:"assets/nola.png"},
      {text:"She goes up the hill.",image:"assets/environments/academy_path.png"},
      {text:"The wind lifts her hat.",image:"assets/nola.png"},
      {text:"Tony gets the hat from the grass.",image:"assets/tony.png"},
      {text:"Nola says, “Thank you for helping me.”",image:"assets/nola.png"}
    ],
    check:{prompt:"How does Tony help Nola?",options:["He gets her hat from the grass","He closes the Academy gate","He carries a fish"],answer:"He gets her hat from the grass"},
    rewardPiece:{id:"book-cart",name:"Garden Book Cart",icon:"📚",area:"welcome-garden",lesson:"1-C"}
  };

  lesson.reader2={
    title:"Reader 2: Inside the Garden Box",
    level:"Stretch",
    pages:[
      {text:"Captain Fritz points to a small box near the garden gate.",image:"assets/captain_fritz.png"},
      {text:"Bear asks, “Is the next clue inside?”",image:"assets/bear.png"},
      {text:"Tony opens the box and finds books, a sign, and a garden plan.",image:"assets/tony.png"},
      {text:"The plan shows a reading chair, a book cart, and a circle for story time.",image:"assets/environments/reading_room.png"},
      {text:"The friends decide where each piece should go before they begin to build.",image:"assets/environments/welcome_garden.png"}
    ],
    check:{prompt:"What does the garden plan show?",options:["A reading chair, a book cart, and a story circle","A bus, a boat, and a train","A kitchen, a bed, and a bath"],answer:"A reading chair, a book cart, and a story circle"},
    rewardPiece:{id:"book-shelf",name:"Garden Book Shelf",icon:"📚",area:"welcome-garden",lesson:"1-C"}
  };

  lesson.phonics=Object.assign({},lesson.phonics||{}, {
    rewardPiece:{id:"story-rug",name:"Outdoor Story Rug",icon:"⭕",area:"welcome-garden",lesson:"1-C"}
  });

  lesson.build={
    areaId:"welcome-garden",
    stage:3,
    title:"Build the Garden Reading Corner",
    requiredPieces:["reading-chair","outdoor-story-stump","story-rug","book-cart","book-shelf"],
    completionMessage:"You completed the Garden Reading Corner with five brand-new pieces."
  };

  window.FritzLesson3ProductionRepair5038={version:"50.38",lessonId:"1-C"};
})();
