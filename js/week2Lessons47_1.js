/* Fritz Academy Week 2 curriculum continuation v47.1 */
(function(){
  "use strict";
  const lessons=[
    {
      id:"2-C",chapter:"Week 2",title:"Shapes Around Us",unlocked:false,reward:"Color Garden — Section 3",buildArea:"color-garden",buildStage:3,
      objectives:{
        speaking:["Name circle, square, triangle, rectangle, star, and heart.","Use: It is a ___.","Describe an object's color and shape in one sentence."],
        listening:["Identify shapes from spoken clues.","Follow two-step shape-and-color directions.","Recognize beginning sounds /k/ and /l/."],
        reading:["Read shape words in connected sentences.","Use details to identify an object.","Read two related readers with increasing complexity."],
        writing:["Identify and form K, k, L, and l.","Complete: It is a ___ ___."],
        phonics:["Recognize K and L.","Produce /k/ and /l/.","Connect sounds to kite, key, leaf, and lamp."]
      },
      vocabulary:[
        {word:"circle",display:"It is a circle.",picture:"⭕"},{word:"square",display:"It is a square.",picture:"🟦"},{word:"triangle",display:"It is a triangle.",picture:"🔺"},
        {word:"rectangle",display:"It is a rectangle.",picture:"▭"},{word:"star",display:"It is a star.",picture:"⭐"},{word:"heart",display:"It is a heart.",picture:"❤️"}
      ],
      intro:[
        {speaker:"Captain Fritz",text:"Today we will look for shapes all around the Color Garden."},
        {speaker:"Captain Fritz",text:"What shape do you see?",responseType:"shape-choice"},
        {speaker:"Captain Fritz",text:"Use two details when you can: color and shape."}
      ],
      feelingChoices:[{id:"curious",label:"I am curious.",emoji:"🤔"},{id:"ready",label:"I am ready.",emoji:"👍"},{id:"confident",label:"I am confident.",emoji:"😊"}],
      feelingsActivity:{title:"Shape Detective",instructions:"Study each symbol and choose the complete shape sentence.",questions:[
        {emoji:"🔺",prompt:"What shape is this?",answer:"It is a triangle.",options:["It is a triangle.","It is a circle.","It is a square."]},
        {emoji:"⭐",prompt:"What shape is this?",answer:"It is a star.",options:["It is a rectangle.","It is a star.","It is a heart."]},
        {emoji:"❤️",prompt:"What shape is this?",answer:"It is a heart.",options:["It is a heart.","It is a triangle.","It is a circle."]}
      ],rewardPiece:{id:"shape-guide",name:"Garden Shape Guide",icon:"🔷",area:"color-garden",lesson:"2-C"}},
      story:{title:"The Missing Shape Signs",pages:[
        {text:"Captain Fritz finds six empty signposts in the Color Garden."},
        {text:"Nola draws a red circle for the pond and a blue square for the seed table."},
        {text:"Bear makes a yellow triangle sign for the tool shed roof."},
        {text:"Bash carries a green rectangle sign to the garden gate."},
        {text:"Tony adds a purple star and an orange heart to the final two posts."},
        {text:"The signs help every visitor name each place by its color and shape."}
      ],questions:[
        {prompt:"Which shape marks the pond?",options:["A red circle","A blue square","A yellow triangle"],answer:"A red circle"},
        {prompt:"Who carries the green rectangle sign?",options:["Bash","Tony","Nola"],answer:"Bash"},
        {prompt:"Why are the signs useful?",options:["They help visitors name each place","They hide the garden","They make the paths smaller"],answer:"They help visitors name each place"}
      ],rewardPiece:{id:"six-shape-signs",name:"Six Shape Signs",icon:"🪧",area:"color-garden",lesson:"2-C"}},
      alphabetSong:{title:"Fritz Academy Alphabet Song",rewardMessage:"Sing K and L clearly!",assetPath:"assets/video/alphabet-song.mp4",videoPath:"assets/video/alphabet-song.mp4"},
      phonics:{letterUpper:"K & L",letterLower:"k & l",soundLabel:"/k/ and /l/",teacherCue:"Say: k, k, kite. Then say: l, l, leaf.",examples:[
        {word:"kite",icon:"🪁"},{word:"key",icon:"🔑"},{word:"leaf",icon:"🍃"},{word:"lamp",icon:"💡"}
      ],recognitionQuestion:{prompt:"Choose the uppercase letters for this lesson.",options:["K and L","I and J","M and N"],answer:"K and L"},lowercaseQuestion:{prompt:"Choose the matching lowercase letters.",options:["k and l","i and j","m and n"],answer:"k and l"},wordQuestion:{prompt:"Which pair begins with K and L sounds?",options:["kite and leaf","insect and jump","moon and nest"],answer:"kite and leaf"},rewardPiece:{id:"kl-letter-gate",name:"K and L Letter Gate",icon:"🔤",area:"color-garden",lesson:"2-C"}},
      reader1:{title:"Reader 1: The Kite and the Leaf",level:"Easy",pages:[
        "A kite has a triangle top.","Its tail has three small squares.","A leaf lands on the kite.","The leaf is green and oval-like.","Tony names every color and shape he can see."
      ],check:{prompt:"What shape is the top of the kite?",options:["A triangle","A circle","A rectangle"],answer:"A triangle"},rewardPiece:{id:"kite-display",name:"Shape Kite Display",icon:"🪁",area:"color-garden",lesson:"2-C"}},
      reader2:{title:"Reader 2: Build with Shapes",level:"Stretch",pages:[
        "The friends design a small reading shelter for the Color Garden.","Bear chooses rectangles for the walls and a triangle for the roof.","Nola adds square windows and a round clock above the door.","Bash places star decorations along the green roof edge.","The student checks that every piece has a useful place.","The finished shelter shows how shapes can work together in a real design."
      ],check:{prompt:"Which shape does Bear use for the roof?",options:["A triangle","A circle","A heart"],answer:"A triangle"},rewardPiece:{id:"shape-shelter",name:"Shape Reading Shelter",icon:"🏠",area:"color-garden",lesson:"2-C"}},
      build:{areaId:"color-garden",stage:3,title:"Build the Shape Corner",requiredPieces:["shape-guide","six-shape-signs","kl-letter-gate","kite-display","shape-shelter"],completionMessage:"You added a shape corner and described objects with both color and shape words."},
      closingSong:{title:"Fritz Academy Welcome Song",assetPath:"assets/video/welcome-song.mp4",videoPath:"assets/video/welcome-song.mp4",rewardMessage:"Celebrate your shape discoveries!"},
      completion:{xp:35,stars:1,unlocks:"2-D",message:"Level 2-C complete! Level 2-D is now unlocked."}
    },
    {
      id:"2-D",chapter:"Week 2",title:"Where Does It Go?",unlocked:false,reward:"Color Garden — Week 2 Finale",buildArea:"color-garden",buildStage:4,
      objectives:{
        speaking:["Use in, on, under, beside, behind, and between.","Give a short placement direction.","Describe where an object is in a complete sentence."],
        listening:["Follow two- and three-step placement directions.","Distinguish common position words.","Recognize beginning sounds /m/ and /n/."],
        reading:["Read position words in meaningful directions.","Sequence events from a garden task.","Answer questions using location evidence."],
        writing:["Identify and form M, m, N, and n.","Complete: The ___ is ___ the ___."],
        phonics:["Recognize M and N.","Produce /m/ and /n/.","Connect sounds to map, moon, nest, and net."]
      },
      vocabulary:[
        {word:"in",display:"The seed is in the jar.",picture:"🫙"},{word:"on",display:"The book is on the bench.",picture:"📘"},{word:"under",display:"The bag is under the table.",picture:"⬇️"},
        {word:"beside",display:"The sign is beside the gate.",picture:"↔️"},{word:"behind",display:"The ball is behind the tree.",picture:"🌳"},{word:"between",display:"Tony is between two friends.",picture:"🐾"}
      ],
      intro:[
        {speaker:"Captain Fritz",text:"The Color Garden is almost finished. Every object needs the correct place."},
        {speaker:"Captain Fritz",text:"Where does it go?",responseType:"position-choice"},
        {speaker:"Captain Fritz",text:"Listen for the position word before you move anything."}
      ],
      feelingChoices:[{id:"focused",label:"I am focused.",emoji:"🧐"},{id:"helpful",label:"I am helpful.",emoji:"🤝"},{id:"proud",label:"I am proud.",emoji:"😊"}],
      feelingsActivity:{title:"Listen and Place",instructions:"Choose the sentence that matches the object's position.",questions:[
        {emoji:"📘🪑",prompt:"The book rests on the bench. Which sentence is correct?",answer:"The book is on the bench.",options:["The book is on the bench.","The book is under the bench.","The book is behind the bench."]},
        {emoji:"🎒⬇️",prompt:"The backpack is below the table. Which sentence is correct?",answer:"The backpack is under the table.",options:["The backpack is beside the table.","The backpack is under the table.","The backpack is on the table."]},
        {emoji:"🌳⚽",prompt:"The tree hides the ball from view. Which sentence is correct?",answer:"The ball is behind the tree.",options:["The ball is in the tree.","The ball is between the tree.","The ball is behind the tree."]}
      ],rewardPiece:{id:"position-board",name:"Position Word Board",icon:"🧭",area:"color-garden",lesson:"2-D"}},
      story:{title:"The Garden Placement Plan",pages:[
        {text:"Captain Fritz reads the final placement plan aloud."},
        {text:"Nola puts the seed jars on the table beside the blue pond."},
        {text:"Bear places the tool box under the reading shelter."},
        {text:"Bash moves the welcome sign between the green gate and the red flower bed."},
        {text:"Tony finds a bird nest behind the yellow shape sign and leaves it safely in place."},
        {text:"When every object is correctly placed, the Color Garden opens for visitors."}
      ],questions:[
        {prompt:"Where are the seed jars?",options:["On the table beside the pond","Under the shelter","Behind the sign"],answer:"On the table beside the pond"},
        {prompt:"What does Bear place under the shelter?",options:["The tool box","The welcome sign","The seed jars"],answer:"The tool box"},
        {prompt:"Why does Tony leave the nest in place?",options:["It is a safe home for birds","It is too colorful","It belongs on the table"],answer:"It is a safe home for birds"}
      ],rewardPiece:{id:"placement-plan",name:"Garden Placement Plan",icon:"🗺️",area:"color-garden",lesson:"2-D"}},
      alphabetSong:{title:"Fritz Academy Alphabet Song",rewardMessage:"Sing M and N clearly!",assetPath:"assets/video/alphabet-song.mp4",videoPath:"assets/video/alphabet-song.mp4"},
      phonics:{letterUpper:"M & N",letterLower:"m & n",soundLabel:"/m/ and /n/",teacherCue:"Say: m, m, map. Then say: n, n, nest.",examples:[
        {word:"map",icon:"🗺️"},{word:"moon",icon:"🌙"},{word:"nest",icon:"🪺"},{word:"net",icon:"🥅"}
      ],recognitionQuestion:{prompt:"Choose the uppercase letters for this lesson.",options:["M and N","K and L","O and P"],answer:"M and N"},lowercaseQuestion:{prompt:"Choose the matching lowercase letters.",options:["m and n","k and l","o and p"],answer:"m and n"},wordQuestion:{prompt:"Which pair begins with M and N sounds?",options:["map and nest","kite and leaf","orange and pig"],answer:"map and nest"},rewardPiece:{id:"mn-letter-arch",name:"M and N Letter Arch",icon:"🔤",area:"color-garden",lesson:"2-D"}},
      reader1:{title:"Reader 1: The Nest Behind the Sign",level:"Easy",pages:[
        "A nest is behind the yellow sign.","The nest is not on the path.","Tony stands beside the sign.","He looks in the nest but does not touch it.","He tells Captain Fritz where the nest is."
      ],check:{prompt:"Where is the nest?",options:["Behind the yellow sign","Under the pond","On the path"],answer:"Behind the yellow sign"},rewardPiece:{id:"safe-nest-area",name:"Safe Nest Area",icon:"🪺",area:"color-garden",lesson:"2-D"}},
      reader2:{title:"Reader 2: Ready for Visitors",level:"Stretch",pages:[
        "The friends walk through the garden one final time.","The color wheel is beside the entrance, and the shape guide is on its post.","Seed jars are on the table, while tools are stored under the shelter.","Flowers grow between the paths without blocking the way.","The student checks each direction against the placement plan.","Captain Fritz opens the gate because the Color Garden is safe, clear, and ready."
      ],check:{prompt:"Why does Captain Fritz open the gate?",options:["The garden is safe, clear, and ready","The signs are missing","The tools are on the path"],answer:"The garden is safe, clear, and ready"},rewardPiece:{id:"visitor-gate",name:"Color Garden Visitor Gate",icon:"🚪",area:"color-garden",lesson:"2-D"}},
      build:{areaId:"color-garden",stage:4,title:"Complete the Color Garden",requiredPieces:["position-board","placement-plan","mn-letter-arch","safe-nest-area","visitor-gate"],completionMessage:"You completed the Color Garden by following precise placement directions and protecting the garden's wildlife."},
      closingSong:{title:"Fritz Academy Welcome Song",assetPath:"assets/video/welcome-song.mp4",videoPath:"assets/video/welcome-song.mp4",rewardMessage:"Celebrate completing Week 2!"},
      completion:{xp:40,stars:2,unlocks:"3-A",message:"Level 2-D complete! Week 3 is now unlocked."}
    }
  ];
  if(!Array.isArray(window.LEVELS)) return;
  lessons.forEach(lesson=>{
    const index=window.LEVELS.findIndex(item=>item&&item.id===lesson.id);
    if(index>=0) window.LEVELS[index]=lesson; else window.LEVELS.push(lesson);
  });
})();