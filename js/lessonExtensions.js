/* Fritz Academy Version 42 lesson extensions.
   Replaces the old 1-C placeholder and adds complete 1-D and 1-E lessons. */
(function(){
  const lessons = [
    {
      id:"1-C", chapter:"Week 1", title:"Follow the Garden Map", unlocked:false,
      reward:"Welcome Garden — Section 3", buildArea:"welcome-garden", buildStage:3,
      objectives:{
        speaking:["Say how you feel using a complete sentence.","Give and follow simple directions.","Name objects that begin with C and D."],
        listening:["Match feeling words to faces.","Follow left, right, forward, and stop.","Recognize /k/ and /d/."],
        reading:["Read short map directions.","Read a six-page story and two connected readers.","Answer questions using details from the text."],
        writing:["Identify and form C, c, D, and d."],
        phonics:["Recognize C and D.","Produce hard-c /k/ and /d/.","Connect the sounds to cat, cup, dog, and door."]
      },
      vocabulary:[
        {word:"excited",display:"I am excited.",picture:"🤩"},{word:"worried",display:"I am worried.",picture:"😟"},
        {word:"calm",display:"I am calm.",picture:"😌"},{word:"left",display:"Turn left.",picture:"⬅️"},
        {word:"right",display:"Turn right.",picture:"➡️"},{word:"map",display:"Follow the map.",picture:"🗺️"}
      ],
      intro:[
        {speaker:"Captain Fritz",text:"Welcome back, {studentName}! How do you feel today?",responseType:"feeling"},
        {speaker:"Captain Fritz",text:"Tony found a garden map. Today we will follow its directions."},
        {speaker:"Captain Fritz",text:"Listen carefully: left, right, forward, and stop!"}
      ],
      feelingChoices:[
        {id:"excited",label:"I am excited.",emoji:"🤩"},{id:"worried",label:"I am worried.",emoji:"😟"},{id:"calm",label:"I am calm.",emoji:"😌"}
      ],
      feelingsActivity:{title:"Match the Feelings",instructions:"Choose the sentence that matches each face.",questions:[
        {emoji:"🤩",prompt:"How does this face feel?",answer:"I am excited.",options:["I am excited.","I am worried.","I am calm."]},
        {emoji:"😟",prompt:"How does this face feel?",answer:"I am worried.",options:["I am calm.","I am worried.","I am excited."]},
        {emoji:"😌",prompt:"How does this face feel?",answer:"I am calm.",options:["I am worried.","I am excited.","I am calm."]}
      ],rewardPiece:{id:"map-post",name:"Garden Map Post",icon:"🗺️",area:"welcome-garden",lesson:"1-C"}},
      story:{title:"The Map Under the Tree",pages:[
        {text:"Tony opens the garden map beside the reading bench.",image:"assets/tony.png"},
        {text:"The first arrow points left toward a tall tree.",image:"assets/academy.png"},
        {text:"Bear feels excited, but Nola feels worried about taking the wrong path.",image:"assets/bear.png"},
        {text:"Captain Fritz says, “Stay calm. We will read one direction at a time.”",image:"assets/captain_fritz.png"},
        {text:"They turn right at the tree and find a small wooden door.",image:"assets/bash.png"},
        {text:"The letters C and D are carved on the door. The next clue is inside!",image:"assets/alphabet-blocks.png"}
      ],questions:[
        {prompt:"Where does the first arrow point?",options:["Left toward a tree","Back to the gate","Into the classroom"],answer:"Left toward a tree"},
        {prompt:"Who feels worried?",options:["Nola","Tony","Captain Fritz"],answer:"Nola"},
        {prompt:"What is carved on the door?",options:["C and D","A and B","E and F"],answer:"C and D"}
      ],rewardPiece:{id:"clue-door",name:"Little Clue Door",icon:"🚪",area:"welcome-garden",lesson:"1-C"}},
      alphabetSong:{title:"Fritz Academy Alphabet Song",rewardMessage:"Sing and point to every letter!",assetPath:"assets/video/alphabet-song.mp4",videoPath:"assets/video/alphabet-song.mp4"},
      phonics:{letterUpper:"C & D",letterLower:"c & d",soundLabel:"/k/ and /d/",teacherCue:"Say: c, c, cat. Then say: d, d, dog.",examples:[
        {word:"cat",icon:"🐱"},{word:"cup",icon:"🥤"},{word:"dog",icon:"🐶"},{word:"door",icon:"🚪"}
      ],recognitionQuestion:{prompt:"Choose the uppercase letters for this lesson.",options:["C and D","A and B","E and F"],answer:"C and D"},lowercaseQuestion:{prompt:"Choose the matching lowercase letters.",options:["c and d","a and b","e and f"],answer:"c and d"},wordQuestion:{prompt:"Which pair begins with C and D sounds?",options:["cat and dog","apple and ball","fish and egg"],answer:"cat and dog"},rewardPiece:{id:"letter-stones-cd",name:"C and D Letter Stones",icon:"🔤",area:"welcome-garden",lesson:"1-C"}},
      reader1:{title:"Reader 1: Cat by the Door",level:"Easy",pages:[
        {text:"A cat sits by the door.",image:"assets/academy.png"},{text:"The cat sees a dog.",image:"assets/bear.png"},
        {text:"The dog does not run.",image:"assets/bash.png"},{text:"The cat and dog look at the map.",image:"assets/alphabet-blocks.png"},
        {text:"They wait calmly by the door.",image:"assets/captain_fritz.png"}
      ],check:{prompt:"Where does the cat sit?",options:["By the door","On a bus","Under a bed"],answer:"By the door"},rewardPiece:{id:"cat-statue",name:"Friendly Cat Statue",icon:"🐱",area:"welcome-garden",lesson:"1-C"}},
      reader2:{title:"Reader 2: The Direction Challenge",level:"Stretch",pages:[
        {text:"Captain Fritz gives each friend one direction.",image:"assets/captain_fritz.png"},{text:"Tony walks forward to the corner.",image:"assets/tony.png"},
        {text:"Nola turns left beside the door.",image:"assets/nola.png"},{text:"Bear turns right and discovers a covered garden circle.",image:"assets/bear.png"},
        {text:"The map says, “Bring the next two letters to open this place.”",image:"assets/alphabet-blocks.png"}
      ],check:{prompt:"What does Bear discover?",options:["A covered garden circle","A blue backpack","A classroom"],answer:"A covered garden circle"},rewardPiece:{id:"direction-arrows",name:"Garden Direction Arrows",icon:"↔️",area:"welcome-garden",lesson:"1-C"}},
      build:{areaId:"welcome-garden",stage:3,title:"Build the Map Corner",requiredPieces:["map-post","clue-door","letter-stones-cd","cat-statue","direction-arrows"],completionMessage:"You completed the map corner of your Welcome Garden."},
      closingSong:{title:"Fritz Academy Welcome Song",assetPath:"assets/video/welcome-song.mp4",videoPath:"assets/video/welcome-song.mp4",rewardMessage:"Celebrate your map adventure with Fritz!"},
      completion:{xp:30,stars:1,unlocks:"1-D",message:"Level 1-C complete! Level 1-D is now unlocked."}
    },
    {
      id:"1-D",chapter:"Week 1",title:"Open the Garden Circle",unlocked:false,reward:"Welcome Garden — Section 4",buildArea:"welcome-garden",buildStage:4,
      objectives:{speaking:["Describe a feeling accurately.","Ask and answer: What do you see?","Name words beginning with E and F."],listening:["Distinguish surprised, proud, and confused.","Follow short clue directions.","Recognize short-e /e/ and /f/."],reading:["Read a six-page clue story.","Read two connected readers.","Answer using details from the text."],writing:["Identify and form E, e, F, and f."],phonics:["Recognize E and F.","Produce short-e /e/ and /f/.","Connect sounds to egg, elephant, fish, and flower."]},
      vocabulary:[{word:"surprised",display:"I am surprised.",picture:"😮"},{word:"proud",display:"I am proud.",picture:"😊"},{word:"confused",display:"I am confused.",picture:"😕"},{word:"see",display:"What do you see?",picture:"👀"},{word:"flower",display:"I see a flower.",picture:"🌸"},{word:"circle",display:"a garden circle",picture:"⭕"}],
      intro:[{speaker:"Captain Fritz",text:"Hello, {studentName}! How do you feel today?",responseType:"feeling"},{speaker:"Captain Fritz",text:"The covered garden circle needs two new letters: E and F."},{speaker:"Captain Fritz",text:"What do you see? Look closely for clues."}],
      feelingChoices:[{id:"surprised",label:"I am surprised.",emoji:"😮"},{id:"proud",label:"I am proud.",emoji:"😊"},{id:"confused",label:"I am confused.",emoji:"😕"}],
      feelingsActivity:{title:"Match the Feelings",instructions:"Match each situation with the correct feeling.",questions:[
        {emoji:"😮",prompt:"The garden cover opens suddenly. How do you feel?",answer:"I am surprised.",options:["I am surprised.","I am proud.","I am confused."]},
        {emoji:"😊",prompt:"You solve a difficult clue. How do you feel?",answer:"I am proud.",options:["I am confused.","I am proud.","I am surprised."]},
        {emoji:"😕",prompt:"The clue says four, but you see five. How do you feel?",answer:"I am confused.",options:["I am proud.","I am surprised.","I am confused."]}
      ],rewardPiece:{id:"flower-arch",name:"Flower Arch",icon:"🌸",area:"welcome-garden",lesson:"1-D"}},
      story:{title:"The Flowers Behind the Cover",pages:[
        {text:"The friends stand around the covered garden circle.",image:"assets/academy.png"},{text:"Nola finds an envelope marked with a large E.",image:"assets/nola.png"},
        {text:"Inside is a clue: “Find four flowers beside the fence.”",image:"assets/alphabet-blocks.png"},{text:"Bear looks confused because he sees five flowers.",image:"assets/bear.png"},
        {text:"Tony notices that one is a paper flower. Four are real.",image:"assets/tony.png"},{text:"The cover opens. Everyone is surprised, and Captain Fritz says, “Be proud—you solved the clue!”",image:"assets/captain_fritz.png"}
      ],questions:[{prompt:"What letter is on the envelope?",options:["E","C","F"],answer:"E"},{prompt:"Why is Bear confused?",options:["He sees five flowers","He lost the map","He cannot find the door"],answer:"He sees five flowers"},{prompt:"How many flowers are real?",options:["Four","Five","Three"],answer:"Four"}],rewardPiece:{id:"four-flowers",name:"Four Bright Flowers",icon:"💐",area:"welcome-garden",lesson:"1-D"}},
      alphabetSong:{title:"Fritz Academy Alphabet Song",rewardMessage:"Sing E and F clearly!",assetPath:"assets/video/alphabet-song.mp4",videoPath:"assets/video/alphabet-song.mp4"},
      phonics:{letterUpper:"E & F",letterLower:"e & f",soundLabel:"short e and /f/",teacherCue:"Say: e, e, egg. Then say: f, f, fish.",examples:[{word:"egg",icon:"🥚"},{word:"elephant",icon:"🐘"},{word:"fish",icon:"🐟"},{word:"flower",icon:"🌸"}],recognitionQuestion:{prompt:"Choose the uppercase letters for this lesson.",options:["E and F","C and D","G and H"],answer:"E and F"},lowercaseQuestion:{prompt:"Choose the matching lowercase letters.",options:["e and f","c and d","g and h"],answer:"e and f"},wordQuestion:{prompt:"Which pair begins with E and F sounds?",options:["egg and fish","cat and dog","apple and ball"],answer:"egg and fish"},rewardPiece:{id:"letter-stones-ef",name:"E and F Letter Stones",icon:"🔤",area:"welcome-garden",lesson:"1-D"}},
      reader1:{title:"Reader 1: Four Fish",level:"Easy",pages:[{text:"Four fish swim in a pond.",image:"assets/academy.png"},{text:"Each fish is fast.",image:"assets/rascal.png"},{text:"An egg is near the pond.",image:"assets/alphabet-blocks.png"},{text:"The friends look, but they do not touch it.",image:"assets/captain_fritz.png"},{text:"They tell Nola what they see.",image:"assets/nola.png"}],check:{prompt:"How many fish swim in the pond?",options:["Four","Two","Five"],answer:"Four"},rewardPiece:{id:"fish-pond",name:"Little Fish Pond",icon:"🐟",area:"welcome-garden",lesson:"1-D"}},
      reader2:{title:"Reader 2: Everyone Helps",level:"Stretch",pages:[{text:"Everyone helps finish the new garden circle.",image:"assets/academy.png"},{text:"Fritz places the flower arch near the entrance.",image:"assets/captain_fritz.png"},{text:"Nola plants four flowers beside the fence.",image:"assets/nola.png"},{text:"Tony checks the map, and Bear carries the final stone.",image:"assets/tony.png"},{text:"The friends feel proud because careful reading helped them succeed.",image:"assets/bear.png"}],check:{prompt:"Why do the friends feel proud?",options:["They completed the garden circle","They found a backpack","They won a race"],answer:"They completed the garden circle"},rewardPiece:{id:"proud-banner",name:"Proud Builders Banner",icon:"🏳️",area:"welcome-garden",lesson:"1-D"}},
      build:{areaId:"welcome-garden",stage:4,title:"Complete the Garden Circle",requiredPieces:["flower-arch","four-flowers","letter-stones-ef","fish-pond","proud-banner"],completionMessage:"You completed the fourth section of your Welcome Garden."},
      closingSong:{title:"Fritz Academy Welcome Song",assetPath:"assets/video/welcome-song.mp4",videoPath:"assets/video/welcome-song.mp4",rewardMessage:"Celebrate a strong week of learning!"},
      completion:{xp:30,stars:1,unlocks:"1-E",message:"Level 1-D complete! Level 1-E is now unlocked."}
    },
    {
      id:"1-E",chapter:"Week 1",title:"The Garden Helpers",unlocked:false,reward:"Welcome Garden — Section 5",buildArea:"welcome-garden",buildStage:5,
      objectives:{speaking:["Ask: Can you help me?","Offer: I can help.","Name words beginning with G and H."],listening:["Follow two-step garden directions.","Recognize /g/ and /h/.","Identify who helps with each job."],reading:["Read sentences about helping.","Read a six-page story and two illustrated readers.","Answer evidence-based questions."],writing:["Identify and form G, g, H, and h.","Complete: I can help with ___."],phonics:["Recognize G and H.","Produce hard-g /g/ and /h/.","Connect sounds to gate, garden, hat, and hand."]},
      vocabulary:[{word:"help",display:"I can help.",picture:"🤝"},{word:"gate",display:"Open the gate.",picture:"🚪"},{word:"garden",display:"This is our garden.",picture:"🌿"},{word:"hand",display:"Use your hand.",picture:"✋"},{word:"heavy",display:"It is heavy.",picture:"🏋️"},{word:"together",display:"We work together.",picture:"🧑‍🤝‍🧑"}],
      intro:[{speaker:"Captain Fritz",text:"Welcome back, {studentName}! The Welcome Garden is almost ready."},{speaker:"Captain Fritz",text:"Some jobs are easier when friends work together."},{speaker:"Captain Fritz",text:"Today we will ask for help, offer help, and learn G and H."}],
      feelingChoices:[{id:"helpful",label:"I feel helpful.",emoji:"🤝"},{id:"curious",label:"I feel curious.",emoji:"🧐"},{id:"ready",label:"I feel ready.",emoji:"🙂"}],
      feelingsActivity:{title:"How Do the Helpers Feel?",instructions:"Choose the sentence that matches each situation.",questions:[
        {emoji:"🤝",prompt:"You carry a watering can for a friend. How do you feel?",options:["I feel helpful.","I feel sleepy.","I feel lost."],answer:"I feel helpful."},
        {emoji:"🧐",prompt:"You discover a new garden tool. How do you feel?",options:["I feel angry.","I feel curious.","I feel cold."],answer:"I feel curious."},
        {emoji:"🙂",prompt:"Captain Fritz gives you a job. How do you feel?",options:["I feel ready.","I feel worried.","I feel sick."],answer:"I feel ready."}
      ],rewardPiece:{id:"helper-tool-rack",name:"Helper Tool Rack",icon:"🧰",area:"welcome-garden",lesson:"1-E"}},
      story:{title:"The Heavy Garden Gate",pages:[
        {text:"Captain Fritz and the friends walk to the new garden gate.",image:"assets/captain_fritz.png"},{text:"Bear tries to lift the gate, but it is too heavy for one helper.",image:"assets/bear.png"},
        {text:"Bear asks, “Can you help me?”",image:"assets/bear.png"},{text:"Tony and Nola answer, “Yes. We can help.”",image:"assets/tony.png"},
        {text:"They hold the gate with their hands while Captain Fritz fastens the hinge.",image:"assets/nola.png"},{text:"The gate opens smoothly. Working together solved the problem.",image:"assets/academy.png"}
      ],questions:[{prompt:"Why can Bear not lift the gate alone?",options:["It is too heavy.","It is too small.","It is missing."],answer:"It is too heavy."},{prompt:"What does Bear ask?",options:["Can you help me?","Where is my book?","Are you tired?"],answer:"Can you help me?"},{prompt:"What makes the job successful?",options:["The friends work together.","Bear leaves the garden.","The gate falls down."],answer:"The friends work together."}],rewardPiece:{id:"garden-gate",name:"Working Garden Gate",icon:"🚪",area:"welcome-garden",lesson:"1-E"}},
      alphabetSong:{title:"Fritz Academy Alphabet Song",rewardMessage:"Listen for G and H while you sing.",assetPath:"assets/video/alphabet-song.mp4",videoPath:"assets/video/alphabet-song.mp4"},
      phonics:{letterUpper:"G & H",letterLower:"g & h",soundLabel:"hard g /g/ and /h/",teacherCue:"Say: g, g, gate. Then breathe out gently: h, h, hat.",examples:[{word:"gate",icon:"🚪"},{word:"garden",icon:"🌿"},{word:"hat",icon:"🧢"},{word:"hand",icon:"✋"}],recognitionQuestion:{prompt:"Choose the uppercase letters for this lesson.",options:["G and H","E and F","I and J"],answer:"G and H"},lowercaseQuestion:{prompt:"Choose the matching lowercase letters.",options:["g and h","e and f","i and j"],answer:"g and h"},wordQuestion:{prompt:"Which pair begins with G and H sounds?",options:["gate and hand","fish and egg","cat and dog"],answer:"gate and hand"},rewardPiece:{id:"letter-stones-gh",name:"G and H Letter Stones",icon:"🔤",area:"welcome-garden",lesson:"1-E"}},
      reader1:{title:"Reader 1: Gus Has a Hat",level:"Easy",pages:[{text:"Gus has a green hat.",image:"assets/academy.png"},{text:"He goes to the garden gate.",image:"assets/alphabet-blocks.png"},{text:"The gate is high.",image:"assets/captain_fritz.png"},{text:"Gus uses his hand to push it.",image:"assets/tony.png"},{text:"The green gate opens.",image:"assets/academy.png"}],check:{prompt:"What color is Gus's hat?",options:["Green","Red","Blue"],answer:"Green"},rewardPiece:{id:"green-garden-hat",name:"Green Garden Hat",icon:"🧢",area:"welcome-garden",lesson:"1-E"}},
      reader2:{title:"Reader 2: Helpers at the Garden",level:"Stretch",pages:[{text:"The helpers gather beside the garden gate.",image:"assets/academy.png"},{text:"Nola holds the seed bag while Tony gets the tools.",image:"assets/nola.png"},{text:"Bear carries the heavy garden box with both hands.",image:"assets/bear.png"},{text:"Captain Fritz checks each job and thanks every helper.",image:"assets/captain_fritz.png"},{text:"Together, they prepare the garden for new plants.",image:"assets/academy.png"}],check:{prompt:"How does Bear carry the heavy box?",options:["With both hands","On his head","With one finger"],answer:"With both hands"},rewardPiece:{id:"helper-bench",name:"Garden Helper Bench",icon:"🪑",area:"welcome-garden",lesson:"1-E"}},
      build:{areaId:"welcome-garden",stage:5,title:"Build the Garden Helper Station",requiredPieces:["helper-tool-rack","garden-gate","letter-stones-gh","green-garden-hat","helper-bench"],completionMessage:"You completed the Garden Helper Station. Every earned piece is saved in your Academy."},
      closingSong:{title:"Fritz Academy Welcome Song",assetPath:"assets/video/welcome-song.mp4",videoPath:"assets/video/welcome-song.mp4",rewardMessage:"Celebrate helping, reading, and building together!"},
      completion:{xp:35,stars:1,unlocks:"2-A",message:"Level 1-E complete! Week 2 is now unlocked."}
    }
  ];

  lessons.forEach(lesson => {
    const index = LEVELS.findIndex(item => item.id === lesson.id);
    if(index >= 0){ LEVELS[index] = lesson; }
    else { LEVELS.push(lesson); }
  });
})();
