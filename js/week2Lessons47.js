/* Fritz Academy Week 2 curriculum v47.0 */
(function(){
  "use strict";
  const lessons=[
    {
      id:"2-A",chapter:"Week 2",title:"Colors in the Garden",unlocked:false,reward:"Color Garden — Section 1",buildArea:"color-garden",buildStage:1,
      objectives:{
        speaking:["Name six common colors.","Use: It is ___.","Ask and answer: What color is it?"],
        listening:["Identify colors in spoken directions.","Follow one- and two-step color directions.","Recognize beginning sounds /g/ and /h/."],
        reading:["Read color words in short sentences.","Use picture and text evidence.","Read two connected readers with increasing complexity."],
        writing:["Identify and form G, g, H, and h.","Complete: It is ___."],
        phonics:["Recognize G and H.","Produce hard-g /g/ and /h/.","Connect sounds to green, garden, hat, and happy."]
      },
      vocabulary:[
        {word:"red",display:"It is red.",picture:"🔴"},{word:"blue",display:"It is blue.",picture:"🔵"},{word:"yellow",display:"It is yellow.",picture:"🟡"},
        {word:"green",display:"It is green.",picture:"🟢"},{word:"orange",display:"It is orange.",picture:"🟠"},{word:"purple",display:"It is purple.",picture:"🟣"}
      ],
      intro:[
        {speaker:"Captain Fritz",text:"Welcome to Week 2, {studentName}! The garden needs color."},
        {speaker:"Captain Fritz",text:"What color do you see?",responseType:"color-choice"},
        {speaker:"Captain Fritz",text:"Listen carefully. We will sort, describe, and build with colors."}
      ],
      feelingChoices:[{id:"happy",label:"I am happy.",emoji:"😀"},{id:"curious",label:"I am curious.",emoji:"🤔"},{id:"excited",label:"I am excited.",emoji:"🤩"}],
      feelingsActivity:{
        title:"Color Talk",instructions:"Choose the complete sentence that correctly names each color.",questions:[
          {emoji:"🔴",prompt:"What color is this?",answer:"It is red.",options:["It is red.","It is blue.","It is green."]},
          {emoji:"🔵",prompt:"What color is this?",answer:"It is blue.",options:["It is yellow.","It is blue.","It is purple."]},
          {emoji:"🟢",prompt:"What color is this?",answer:"It is green.",options:["It is orange.","It is red.","It is green."]}
        ],rewardPiece:{id:"color-wheel",name:"Garden Color Wheel",icon:"🎨",area:"color-garden",lesson:"2-A"}
      },
      story:{title:"Nola's Color Plan",pages:[
        {text:"Nola opens a plan for a new Color Garden."},
        {text:"She marks red flowers beside the front path."},
        {text:"Bear chooses blue stones for the little pond."},
        {text:"Bash carries a green garden gate."},
        {text:"Tony adds yellow signs so everyone can read the color names."},
        {text:"Captain Fritz checks the plan. Every color has a clear purpose."}
      ],questions:[
        {prompt:"Who makes the Color Garden plan?",options:["Nola","Bear","Tony"],answer:"Nola"},
        {prompt:"What color are the pond stones?",options:["Blue","Red","Orange"],answer:"Blue"},
        {prompt:"Why does Tony add yellow signs?",options:["So everyone can read the color names","To hide the path","To close the garden"],answer:"So everyone can read the color names"}
      ],rewardPiece:{id:"red-flower-row",name:"Red Flower Row",icon:"🌹",area:"color-garden",lesson:"2-A"}},
      alphabetSong:{title:"Fritz Academy Alphabet Song",rewardMessage:"Sing G and H clearly!",assetPath:"assets/video/alphabet-song.mp4",videoPath:"assets/video/alphabet-song.mp4"},
      phonics:{letterUpper:"G & H",letterLower:"g & h",soundLabel:"/g/ and /h/",teacherCue:"Say: g, g, green. Then say: h, h, hat.",examples:[
        {word:"green",icon:"🟢"},{word:"garden",icon:"🌿"},{word:"hat",icon:"🎩"},{word:"happy",icon:"😀"}
      ],recognitionQuestion:{prompt:"Choose the uppercase letters for this lesson.",options:["G and H","E and F","I and J"],answer:"G and H"},lowercaseQuestion:{prompt:"Choose the matching lowercase letters.",options:["g and h","e and f","i and j"],answer:"g and h"},wordQuestion:{prompt:"Which pair begins with G and H sounds?",options:["green and hat","fish and egg","cat and dog"],answer:"green and hat"},rewardPiece:{id:"gh-letter-sign",name:"G and H Letter Sign",icon:"🔤",area:"color-garden",lesson:"2-A"}},
      reader1:{title:"Reader 1: The Red Hat",level:"Easy",pages:[
        "Tony has a red hat.","The hat is small.","He puts it near a green gate.","Rascal sees the red hat.","Tony says, “Yes, it is my hat.”"
      ],check:{prompt:"What color is Tony's hat?",options:["Red","Blue","Green"],answer:"Red"},rewardPiece:{id:"red-hat-marker",name:"Red Hat Garden Marker",icon:"🎩",area:"color-garden",lesson:"2-A"}},
      reader2:{title:"Reader 2: A Garden of Many Colors",level:"Stretch",pages:[
        "The friends stand beside the unfinished Color Garden.","Nola plants red and yellow flowers near the path.","Bear places blue stones around the pond.","Bash adds the green gate while Tony labels each color.","The student chooses orange and purple decorations.","Together, the six colors make the garden easy to describe and fun to explore."
      ],check:{prompt:"Which two colors does the student choose?",options:["Orange and purple","Red and blue","Green and yellow"],answer:"Orange and purple"},rewardPiece:{id:"rainbow-planter",name:"Rainbow Planter",icon:"🌈",area:"color-garden",lesson:"2-A"}},
      build:{areaId:"color-garden",stage:1,title:"Build the First Color Garden",requiredPieces:["color-wheel","red-flower-row","gh-letter-sign","red-hat-marker","rainbow-planter"],completionMessage:"You built the first section of the Color Garden and used complete color sentences."},
      closingSong:{title:"Fritz Academy Welcome Song",assetPath:"assets/video/welcome-song.mp4",videoPath:"assets/video/welcome-song.mp4",rewardMessage:"Celebrate your colorful work!"},
      completion:{xp:35,stars:1,unlocks:"2-B",message:"Level 2-A complete! Level 2-B is now unlocked."}
    },
    {
      id:"2-B",chapter:"Week 2",title:"Count the Flowers",unlocked:false,reward:"Color Garden — Section 2",buildArea:"color-garden",buildStage:2,
      objectives:{
        speaking:["Count objects from one to ten.","Use: I see ___ flowers.","Ask and answer: How many?"],
        listening:["Identify spoken numbers one through ten.","Follow counting directions.","Recognize beginning sounds /i/ and /j/."],
        reading:["Read number words one through ten.","Compare quantities in short sentences.","Answer story questions using counted evidence."],
        writing:["Identify and form I, i, J, and j.","Complete: I see ___ ___."],
        phonics:["Recognize I and J.","Produce short-i /i/ and /j/.","Connect sounds to insect, ink, jar, and jump."]
      },
      vocabulary:[
        {word:"one",display:"one flower",picture:"1️⃣"},{word:"two",display:"two flowers",picture:"2️⃣"},{word:"three",display:"three flowers",picture:"3️⃣"},
        {word:"four",display:"four flowers",picture:"4️⃣"},{word:"five",display:"five flowers",picture:"5️⃣"},{word:"ten",display:"ten flowers",picture:"🔟"}
      ],
      intro:[
        {speaker:"Captain Fritz",text:"Today we will count carefully from one to ten."},
        {speaker:"Captain Fritz",text:"How many flowers do you see?",responseType:"number-choice"},
        {speaker:"Captain Fritz",text:"Touch or point to each object once as you count."}
      ],
      feelingChoices:[{id:"ready",label:"I am ready.",emoji:"👍"},{id:"focused",label:"I am focused.",emoji:"🧐"},{id:"proud",label:"I am proud.",emoji:"😊"}],
      feelingsActivity:{title:"Count and Choose",instructions:"Count each group, then choose the complete sentence.",questions:[
        {emoji:"🌷🌷",prompt:"How many flowers?",answer:"I see two flowers.",options:["I see two flowers.","I see three flowers.","I see five flowers."]},
        {emoji:"🌼🌼🌼",prompt:"How many flowers?",answer:"I see three flowers.",options:["I see one flower.","I see four flowers.","I see three flowers."]},
        {emoji:"🌹🌹🌹🌹",prompt:"How many flowers?",answer:"I see four flowers.",options:["I see four flowers.","I see six flowers.","I see two flowers."]}
      ],rewardPiece:{id:"counting-post",name:"Counting Post",icon:"🔢",area:"color-garden",lesson:"2-B"}},
      story:{title:"The Ten-Flower Mix-Up",pages:[
        {text:"Captain Fritz asks the friends to plant exactly ten flowers."},
        {text:"Nola plants three red flowers beside the path."},
        {text:"Bear adds two blue flowers near the pond."},
        {text:"Bash brings four yellow flowers, and Tony adds one purple flower."},
        {text:"The friends count again: three plus two plus four plus one makes ten."},
        {text:"The garden is correct because everyone counted each flower carefully."}
      ],questions:[
        {prompt:"How many flowers must the friends plant?",options:["Ten","Eight","Twelve"],answer:"Ten"},
        {prompt:"How many yellow flowers does Bash bring?",options:["Four","Two","One"],answer:"Four"},
        {prompt:"What helps the friends know the garden is correct?",options:["They count each flower carefully","They guess","They remove every flower"],answer:"They count each flower carefully"}
      ],rewardPiece:{id:"ten-flower-bed",name:"Ten-Flower Bed",icon:"💐",area:"color-garden",lesson:"2-B"}},
      alphabetSong:{title:"Fritz Academy Alphabet Song",rewardMessage:"Sing I and J clearly!",assetPath:"assets/video/alphabet-song.mp4",videoPath:"assets/video/alphabet-song.mp4"},
      phonics:{letterUpper:"I & J",letterLower:"i & j",soundLabel:"short i and /j/",teacherCue:"Say: i, i, insect. Then say: j, j, jump.",examples:[
        {word:"insect",icon:"🐞"},{word:"ink",icon:"🖋️"},{word:"jar",icon:"🫙"},{word:"jump",icon:"🦘"}
      ],recognitionQuestion:{prompt:"Choose the uppercase letters for this lesson.",options:["I and J","G and H","K and L"],answer:"I and J"},lowercaseQuestion:{prompt:"Choose the matching lowercase letters.",options:["i and j","g and h","k and l"],answer:"i and j"},wordQuestion:{prompt:"Which pair begins with I and J sounds?",options:["insect and jump","green and hat","kite and leaf"],answer:"insect and jump"},rewardPiece:{id:"ij-letter-stones",name:"I and J Letter Stones",icon:"🔤",area:"color-garden",lesson:"2-B"}},
      reader1:{title:"Reader 1: Five Jars",level:"Easy",pages:[
        "Five jars sit on a table.","One jar has red seeds.","Two jars have blue seeds.","Two jars have yellow seeds.","One plus two plus two makes five jars."
      ],check:{prompt:"How many jars are on the table?",options:["Five","Four","Six"],answer:"Five"},rewardPiece:{id:"seed-jar-table",name:"Seed Jar Table",icon:"🫙",area:"color-garden",lesson:"2-B"}},
      reader2:{title:"Reader 2: Count Before You Plant",level:"Stretch",pages:[
        "Rascal wants to plant every seed at once.","Tony asks him to stop and count the open spaces first.","There are six spaces in the first row and four in the second row.","The friends count ten spaces altogether.","They place one seed in each space, so no plants are crowded.","Careful counting helps the new flowers have room to grow."
      ],check:{prompt:"Why do the friends count the spaces first?",options:["So the plants have room to grow","So they can hide the seeds","So they can skip planting"],answer:"So the plants have room to grow"},rewardPiece:{id:"numbered-planting-row",name:"Numbered Planting Row",icon:"🌱",area:"color-garden",lesson:"2-B"}},
      build:{areaId:"color-garden",stage:2,title:"Add the Counting Garden",requiredPieces:["counting-post","ten-flower-bed","ij-letter-stones","seed-jar-table","numbered-planting-row"],completionMessage:"You added a counting section and used numbers to solve a real garden problem."},
      closingSong:{title:"Fritz Academy Welcome Song",assetPath:"assets/video/welcome-song.mp4",videoPath:"assets/video/welcome-song.mp4",rewardMessage:"Celebrate counting to ten!"},
      completion:{xp:35,stars:1,unlocks:"2-C",message:"Level 2-B complete! Level 2-C is now unlocked."}
    }
  ];
  if(!Array.isArray(window.LEVELS)) return;
  lessons.forEach(lesson=>{
    const index=window.LEVELS.findIndex(item=>item&&item.id===lesson.id);
    if(index>=0) window.LEVELS[index]=lesson; else window.LEVELS.push(lesson);
  });
})();