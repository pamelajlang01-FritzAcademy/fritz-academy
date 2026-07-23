/* Fritz Academy Week 3 finale curriculum v49.0 */
(function(){
  "use strict";
  const lessons=[
    {
      id:"3-C",chapter:"Week 3",title:"Our Classroom Routine",unlocked:false,reward:"Learning Room — Section 3",buildArea:"learning-room",buildStage:3,
      objectives:{
        speaking:["Name common classroom routines.","Use first, next, and last.","Say what you do in class using complete sentences."],
        listening:["Sequence three classroom actions.","Follow routine directions.","Recognize beginning sounds /s/ and /t/."],
        reading:["Read routine sentences in order.","Use sequence words to understand a story.","Read two connected readers."],
        writing:["Identify and form S, s, T, and t.","Complete a three-step routine."],
        phonics:["Recognize S and T.","Produce /s/ and /t/.","Connect sounds to sun, sit, table, and top."]
      },
      vocabulary:[
        {word:"first",display:"First, I sit down.",picture:"1️⃣"},{word:"next",display:"Next, I open my book.",picture:"2️⃣"},{word:"last",display:"Last, I put things away.",picture:"3️⃣"},
        {word:"sit",display:"Please sit down.",picture:"🪑"},{word:"stand",display:"Please stand up.",picture:"🙋"},{word:"ready",display:"I am ready to learn.",picture:"✅"}
      ],
      intro:[
        {speaker:"Captain Fritz",text:"Today we will practice a strong classroom routine."},
        {speaker:"Captain Fritz",text:"First, sit down. Next, open your book. Last, show you are ready.",responseType:"sequence-choice"},
        {speaker:"Captain Fritz",text:"Sequence words help us explain what happens in order."}
      ],
      feelingChoices:[{id:"ready",label:"I am ready.",emoji:"✅"},{id:"focused",label:"I am focused.",emoji:"🧐"},{id:"calm",label:"I am calm.",emoji:"😌"}],
      feelingsActivity:{title:"Put the Routine in Order",instructions:"Choose the sentence that correctly completes each step.",questions:[
        {emoji:"1️⃣",prompt:"What happens first?",answer:"First, I sit down.",options:["First, I sit down.","First, I close the room.","First, I leave class."]},
        {emoji:"2️⃣",prompt:"What happens next?",answer:"Next, I open my book.",options:["Next, I open my book.","Next, I hide my pencil.","Next, I run outside."]},
        {emoji:"3️⃣",prompt:"What happens last?",answer:"Last, I put things away.",options:["Last, I put things away.","Last, I start over.","Last, I lose my bag."]}
      ],rewardPiece:{id:"routine-board",name:"Classroom Routine Board",icon:"📋",area:"learning-room",lesson:"3-C"}},
      story:{title:"The Morning Routine Mix-Up",pages:[
        {text:"The class arrives, but the Learning Room is not ready."},
        {text:"Rascal opens his book before he sits down and drops his pencil."},
        {text:"Tony points to the routine board: first sit, next open, last begin."},
        {text:"Nola helps everyone place bags beside their chairs."},
        {text:"The student follows all three steps in the correct order."},
        {text:"Captain Fritz smiles because the calm routine helps everyone learn."}
      ],questions:[
        {prompt:"What does Tony use to help the class?",options:["The routine board","A garden map","A music box"],answer:"The routine board"},
        {prompt:"Where do the bags go?",options:["Beside the chairs","On the roof","Under the garden gate"],answer:"Beside the chairs"},
        {prompt:"Why does the routine help?",options:["It helps everyone learn calmly","It makes the room louder","It hides the classroom things"],answer:"It helps everyone learn calmly"}
      ],rewardPiece:{id:"bag-parking-row",name:"Bag Parking Row",icon:"🎒",area:"learning-room",lesson:"3-C"}},
      alphabetSong:{title:"Fritz Academy Alphabet Song",rewardMessage:"Sing S and T clearly!",assetPath:"assets/video/alphabet-song.mp4",videoPath:"assets/video/alphabet-song.mp4"},
      phonics:{letterUpper:"S & T",letterLower:"s & t",soundLabel:"/s/ and /t/",teacherCue:"Say: s, s, sun. Then say: t, t, table.",examples:[
        {word:"sun",icon:"☀️"},{word:"sit",icon:"🪑"},{word:"table",icon:"🪵"},{word:"top",icon:"🔝"}
      ],recognitionQuestion:{prompt:"Choose the uppercase letters for this lesson.",options:["S and T","Q and R","U and V"],answer:"S and T"},lowercaseQuestion:{prompt:"Choose the matching lowercase letters.",options:["s and t","q and r","u and v"],answer:"s and t"},wordQuestion:{prompt:"Which pair begins with S and T sounds?",options:["sun and table","queen and rabbit","umbrella and van"],answer:"sun and table"},rewardPiece:{id:"st-letter-wall",name:"S and T Letter Wall",icon:"🔤",area:"learning-room",lesson:"3-C"}},
      reader1:{title:"Reader 1: Sit, Then Start",level:"Easy",pages:[
        "Tony comes into class.","First, he sits down.","Next, he opens his book.","Last, he takes out a pencil.","Tony is ready to start."
      ],check:{prompt:"What does Tony do first?",options:["He sits down","He leaves the room","He closes the book"],answer:"He sits down"},rewardPiece:{id:"ready-seat",name:"Ready Learning Seat",icon:"🪑",area:"learning-room",lesson:"3-C"}},
      reader2:{title:"Reader 2: A Calm Start",level:"Stretch",pages:[
        "Bash carries a large supply box into the Learning Room.","He wants to open it before the class is ready.","Bear reminds him to follow the routine in order.","First, Bash parks the box beside the supply shelf.","Next, he sits with the class, and last, Captain Fritz opens the box.","Following the routine keeps the materials safe and the class calm."
      ],check:{prompt:"Why does Bash wait to open the box?",options:["To follow the routine and keep materials safe","Because the box is empty","Because class is outside"],answer:"To follow the routine and keep materials safe"},rewardPiece:{id:"calm-start-clock",name:"Calm Start Clock",icon:"🕘",area:"learning-room",lesson:"3-C"}},
      build:{areaId:"learning-room",stage:3,title:"Build the Classroom Routine Center",requiredPieces:["routine-board","bag-parking-row","st-letter-wall","ready-seat","calm-start-clock"],completionMessage:"You built a Routine Center and used sequence words to explain classroom actions."},
      closingSong:{title:"Fritz Academy Welcome Song",assetPath:"assets/video/welcome-song.mp4",videoPath:"assets/video/welcome-song.mp4",rewardMessage:"Celebrate a calm and ready classroom!"},
      completion:{xp:40,stars:1,unlocks:"3-D",message:"Level 3-C complete! Level 3-D is now unlocked."}
    },
    {
      id:"3-D",chapter:"Week 3",title:"Learning Room Challenge",unlocked:false,reward:"Learning Room — Section 4",buildArea:"learning-room",buildStage:4,
      objectives:{
        speaking:["Review classroom objects, actions, and routines.","Answer complete-sentence questions.","Explain a two-step direction."],
        listening:["Follow mixed classroom directions.","Sequence actions accurately.","Recognize beginning sounds /u/ and /v/."],
        reading:["Read and solve a classroom challenge.","Use details from several sentences.","Complete a Week 3 reading check."],
        writing:["Identify and form U, u, V, and v.","Write or trace a short classroom sentence."],
        phonics:["Recognize U and V.","Produce short-u /u/ and /v/.","Connect sounds to umbrella, up, van, and vest."]
      },
      vocabulary:[
        {word:"review",display:"Let us review.",picture:"🔁"},{word:"choose",display:"Choose the correct object.",picture:"👉"},{word:"follow",display:"Follow the direction.",picture:"👣"},
        {word:"check",display:"Check your work.",picture:"✅"},{word:"explain",display:"Explain your answer.",picture:"💬"},{word:"finish",display:"We finish together.",picture:"🏁"}
      ],
      intro:[
        {speaker:"Captain Fritz",text:"Today is the Week 3 Learning Room Challenge."},
        {speaker:"Captain Fritz",text:"You will name objects, follow directions, read carefully, and explain your thinking."},
        {speaker:"Captain Fritz",text:"Take your time. Strong learners listen, check, and try again."}
      ],
      feelingChoices:[{id:"confident",label:"I am confident.",emoji:"😊"},{id:"careful",label:"I am careful.",emoji:"🧐"},{id:"proud",label:"I am proud.",emoji:"⭐"}],
      feelingsActivity:{title:"Week 3 Quick Review",instructions:"Choose the best complete answer.",questions:[
        {emoji:"📘",prompt:"What is this?",answer:"This is a book.",options:["This is a book.","Please close the bag.","First, I stand outside."]},
        {emoji:"🙏",prompt:"Which request is polite?",answer:"Please give me the pencil.",options:["Give pencil now.","Please give me the pencil.","The pencil is purple."]},
        {emoji:"1️⃣2️⃣",prompt:"Which sentence shows order?",answer:"First sit, then open the book.",options:["First sit, then open the book.","The book is blue.","I see a chair."]}
      ],rewardPiece:{id:"review-station",name:"Week 3 Review Station",icon:"🔁",area:"learning-room",lesson:"3-D"}},
      story:{title:"The Learning Room Challenge",pages:[
        {text:"Captain Fritz places a book, pencil, bag, and paper around the Learning Room."},
        {text:"The first clue says, “Find the pencil and put it beside the book.”"},
        {text:"The second clue says, “Open the bag, then show the paper.”"},
        {text:"Rascal starts too quickly, but the student reminds him to hear both steps."},
        {text:"Together they follow every direction and check each object."},
        {text:"The Learning Room lights sparkle because the whole class completes the challenge."}
      ],questions:[
        {prompt:"Where must the pencil go?",options:["Beside the book","Under the garden","Behind Captain Fritz"],answer:"Beside the book"},
        {prompt:"What must happen after the bag is opened?",options:["Show the paper","Close the classroom","Move the chair outside"],answer:"Show the paper"},
        {prompt:"What helps Rascal succeed?",options:["Listening to both steps","Moving faster","Skipping the clue"],answer:"Listening to both steps"}
      ],rewardPiece:{id:"challenge-table",name:"Learning Challenge Table",icon:"🏆",area:"learning-room",lesson:"3-D"}},
      alphabetSong:{title:"Fritz Academy Alphabet Song",rewardMessage:"Sing U and V clearly!",assetPath:"assets/video/alphabet-song.mp4",videoPath:"assets/video/alphabet-song.mp4"},
      phonics:{letterUpper:"U & V",letterLower:"u & v",soundLabel:"short u and /v/",teacherCue:"Say: u, u, umbrella. Then say: v, v, van.",examples:[
        {word:"umbrella",icon:"☂️"},{word:"up",icon:"⬆️"},{word:"van",icon:"🚐"},{word:"vest",icon:"🦺"}
      ],recognitionQuestion:{prompt:"Choose the uppercase letters for this lesson.",options:["U and V","S and T","W and X"],answer:"U and V"},lowercaseQuestion:{prompt:"Choose the matching lowercase letters.",options:["u and v","s and t","w and x"],answer:"u and v"},wordQuestion:{prompt:"Which pair begins with U and V sounds?",options:["umbrella and van","sun and table","web and box"],answer:"umbrella and van"},rewardPiece:{id:"uv-letter-banner",name:"U and V Letter Banner",icon:"🔤",area:"learning-room",lesson:"3-D"}},
      reader1:{title:"Reader 1: Under the Table",level:"Easy",pages:[
        "A vest is on the chair.","An umbrella is under the table.","Tony sees the umbrella.","He puts it beside the vest.","Now both things are easy to find."
      ],check:{prompt:"Where is the umbrella at first?",options:["Under the table","On the roof","Inside the book"],answer:"Under the table"},rewardPiece:{id:"find-it-shelf",name:"Find-It Shelf",icon:"🔎",area:"learning-room",lesson:"3-D"}},
      reader2:{title:"Reader 2: We Check Our Work",level:"Stretch",pages:[
        "The class finishes the Learning Room challenge, but Captain Fritz asks everyone to check again.","Nola checks the books and paper on the shelves.","Bear checks that the chairs and tables are in safe places.","Tony reads the routine board while the student checks the two-step directions.","Rascal notices one pencil in the wrong cup and fixes it.","Careful checking helps the whole class finish with confidence."
      ],check:{prompt:"What does Rascal fix?",options:["A pencil in the wrong cup","A flower in the garden","A missing song"],answer:"A pencil in the wrong cup"},rewardPiece:{id:"week3-celebration-light",name:"Week 3 Celebration Light",icon:"✨",area:"learning-room",lesson:"3-D"}},
      build:{areaId:"learning-room",stage:4,title:"Complete the Learning Room",requiredPieces:["review-station","challenge-table","uv-letter-banner","find-it-shelf","week3-celebration-light"],completionMessage:"You completed the Learning Room and demonstrated Week 3 classroom English."},
      closingSong:{title:"Fritz Academy Welcome Song",assetPath:"assets/video/welcome-song.mp4",videoPath:"assets/video/welcome-song.mp4",rewardMessage:"Celebrate completing Week 3!"},
      completion:{xp:45,stars:2,unlocks:"4-A",message:"Week 3 complete! Level 4-A is now unlocked."}
    }
  ];
  if(!Array.isArray(window.LEVELS)) return;
  lessons.forEach(lesson=>{
    const index=window.LEVELS.findIndex(item=>item&&item.id===lesson.id);
    if(index>=0) window.LEVELS[index]=lesson; else window.LEVELS.push(lesson);
  });
})();