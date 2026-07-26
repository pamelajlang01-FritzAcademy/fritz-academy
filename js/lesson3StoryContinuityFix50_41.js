/* Fritz Academy Lesson 3 story continuity and image alignment v50.41 */
(function(){
  "use strict";

  function piece(id,name,icon){
    return {id,name,icon,area:"welcome-garden",lesson:"1-C"};
  }

  const lesson=typeof findLevel==="function"?findLevel("1-C"):null;
  if(!lesson) return;

  lesson.title="Captain Fritz Builds a Reading Corner";
  lesson.reward="Garden Reading Corner";

  lesson.intro=[
    {speaker:"Captain Fritz",text:"Hello, {studentName}! Welcome back to Fritz Academy!"},
    {speaker:"Captain Fritz",text:"You know A through F. Today we will learn G, H, and I."},
    {speaker:"Captain Fritz",text:"We are adding a reading corner to the garden today."},
    {speaker:"Captain Fritz",text:"Listen for garden, hat, and insect."}
  ];

  lesson.story={
    title:"Captain Fritz and the Reading Corner",
    pages:[
      {text:"Captain Fritz walks into the Welcome Garden with a new plan.",image:"assets/captain_fritz.png"},
      {text:"He points to an empty place beside the garden path.",image:"assets/environments/welcome_garden.png"},
      {text:"Nola brings a blue hat and a basket of books.",image:"assets/nola.png"},
      {text:"Bear finds a tiny insect on a green leaf near the path.",image:"assets/bear.png"},
      {text:"Captain Fritz says, “G is for garden. H is for hat. I is for insect.”",image:"assets/captain_fritz.png"},
      {text:"The friends place the chair, story stump, and book shelf in the new reading corner.",image:"assets/environments/welcome_garden.png"}
    ],
    questions:[
      {prompt:"Who has the plan?",options:["Captain Fritz","Nola","Bear"],answer:"Captain Fritz"},
      {prompt:"What does Nola bring?",options:["A hat and books","A bell","A kite"],answer:"A hat and books"},
      {prompt:"What does Bear find?",options:["An insect","A fish","A drum"],answer:"An insect"},
      {prompt:"What is G for?",options:["Garden","Book","Chair"],answer:"Garden"},
      {prompt:"What do they build?",options:["A reading corner","A kitchen","A playground"],answer:"A reading corner"}
    ],
    rewardPiece:piece("reading-chair","Garden Reading Chair","🪑")
  };

  lesson.reader1={
    title:"Reader 1: Nola's Hat",
    level:"Easy",
    pages:[
      {text:"Nola has a blue hat.",image:"assets/nola.png"},
      {text:"She walks in the garden.",image:"assets/environments/welcome_garden.png"},
      {text:"The hat falls by the path.",image:"assets/environments/academy_path.png"},
      {text:"Nola picks up her hat.",image:"assets/nola.png"}
    ],
    check:{prompt:"What falls?",options:["The hat","The book","The bell"],answer:"The hat"},
    rewardPiece:null
  };

  lesson.reader2={
    title:"Reader 2: The Insect in the Garden",
    level:"Stretch",
    pages:[
      {text:"Bear walks beside Captain Fritz in the garden.",image:"assets/bear.png"},
      {text:"Bear sees a small insect on a green leaf.",image:"assets/bear.png"},
      {text:"Captain Fritz says, “I is for insect.”",image:"assets/captain_fritz.png"},
      {text:"They leave the insect safely on the leaf.",image:"assets/environments/welcome_garden.png"}
    ],
    check:{prompt:"Where is the insect?",options:["On a leaf","In a book","Under a chair"],answer:"On a leaf"},
    rewardPiece:piece("book-shelf","Garden Book Shelf","📚")
  };

  lesson.phonics=Object.assign({},lesson.phonics||{}, {
    rewardPiece:piece("outdoor-story-stump","Outdoor Story Stump","🪵")
  });

  if(lesson.feelingsActivity) lesson.feelingsActivity.rewardPiece=null;

  lesson.build={
    areaId:"welcome-garden",
    stage:3,
    title:"Build the Garden Reading Corner",
    requiredPieces:["reading-chair","outdoor-story-stump","book-shelf"],
    completionMessage:"You built the Garden Reading Corner."
  };

  window.FritzLesson3StoryContinuityFix5041={version:"50.41",lessonId:"1-C"};
})();