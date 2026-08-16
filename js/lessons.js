const LEVELS = [
{
 id:"1-A", chapter:"Week 1", title:"Welcome to the Academy", unlocked:true,
 reward:"Welcome Garden — First Path", buildArea:"welcome-garden", buildStage:1,
 objectives:{speaking:["Say your name.","Say how you feel."],listening:["Understand hello, name, happy, fine, sad."],reading:["Recognize A and short-a words."],phonics:["A/a and short /a/."]},
 vocabulary:[{word:"hello",display:"Hello!",picture:"👋"},{word:"name",display:"My name is...",picture:"🏷️"},{word:"happy",display:"I am happy.",picture:"😀"},{word:"friend",display:"friend",picture:"🐾"}],
 intro:[{speaker:"Captain Fritz",text:"Hello! I am Captain Fritz."},{speaker:"Captain Fritz",text:"What is your name?",responseType:"name"},{speaker:"Captain Fritz",text:"How are you today?",responseType:"feeling"}],
 feelingChoices:[{id:"happy",label:"I am happy.",emoji:"😀"},{id:"fine",label:"I am fine.",emoji:"🙂"},{id:"sad",label:"I am sad.",emoji:"😢"}],
 feelingsActivity:{title:"How Do You Feel?",instructions:"Match the face and sentence.",questions:[
  {emoji:"😀",answer:"I am happy.",options:["I am happy.","I am sad.","I am fine."]},
  {emoji:"🙂",answer:"I am fine.",options:["I am sad.","I am fine.","I am happy."]},
  {emoji:"😢",answer:"I am sad.",options:["I am fine.","I am happy.","I am sad."]}
 ],rewardPiece:{id:"welcome-flowers",name:"Welcome Flowers",icon:"🌼",area:"welcome-garden",lesson:"1-A"}},
 story:{title:"The New Academy Builder",pages:[
  {text:"Captain Fritz waits at the Academy gate. A new student is coming up the path.",image:"assets/fritz_academy_world_map.png"},
  {text:"Tony is the first puppy to notice. “Someone is here!” he calls.",image:"assets/tony.png"},
  {text:"Bash walks over with Bear, Nola, and Rascal. Bash smiles and waits beside Captain Fritz.",image:"assets/bash.png"},
  {text:"Captain Fritz says, “Hello! Welcome to Fritz Academy. What is your name?”",image:"assets/captain_fritz.png"},
  {text:"The puppies show {studentName} the Welcome Garden. Rascal runs ahead, but Bash reminds him to wait.",image:"assets/academy.png"},
  {text:"Captain Fritz points to an empty place beside the path. “Every Academy Builder adds something here. What will you build first?”",image:"assets/academy.png"}
 ],questions:[
  {prompt:"Who welcomes the new student?",options:["Captain Fritz","A cat","A teacher at another school"],answer:"Captain Fritz"},
  {prompt:"Who runs ahead?",options:["Rascal","Tony","Nola"],answer:"Rascal"},
  {prompt:"Where do the friends go?",options:["The Welcome Garden","The beach","A store"],answer:"The Welcome Garden"}
 ],rewardPiece:{id:"stone-path",name:"Stone Garden Path",icon:"🪨",area:"welcome-garden",lesson:"1-A"}},
 alphabetSong:{title:"Fritz Academy Alphabet Song",rewardMessage:"Listen for A.",assetPath:"assets/alphabet-song-small.mp4",videoPath:"assets/alphabet-song-small.mp4"},
 phonics:{letterUpper:"A",letterLower:"a",soundLabel:"short a",teacherCue:"Say: a, a, apple.",examples:[{word:"apple",icon:"🍎"},{word:"ant",icon:"🐜"},{word:"map",icon:"🗺️"}],
  recognitionQuestion:{prompt:"Choose uppercase A.",options:["A","B","D"],answer:"A"},
  lowercaseQuestion:{prompt:"Choose lowercase a.",options:["e","a","o"],answer:"a"},
  wordQuestion:{prompt:"Which word has short a?",options:["apple","moon","tree"],answer:"apple"},
  rewardPiece:{id:"reading-bench",name:"Garden Reading Bench",icon:"🪑",area:"welcome-garden",lesson:"1-A"}},
 reader1:{title:"Reader 1: Tony Says Hello",level:"Easy",pages:[
  {text:"Tony is by the gate.",image:"assets/tony.png"},{text:"He sees {studentName}.",image:"assets/academy.png"},{text:"Tony says, “Hello!”",image:"assets/tony.png"},{text:"The new friend waves.",image:"assets/academy.png"},{text:"Tony is happy.",image:"assets/tony.png"}
 ],check:{prompt:"How does Tony feel?",options:["Happy","Sad","Angry"],answer:"Happy"},rewardPiece:{id:"welcome-tree",name:"Welcome Tree",icon:"🌳",area:"welcome-garden",lesson:"1-A"}},
 reader2:{title:"Reader 2: A Place for a Friend",level:"Easy Plus",pages:[
  {text:"The garden has a path.",image:"assets/academy.png"},{text:"Nola brings flowers.",image:"assets/nola.png"},{text:"Bear carries a small tree.",image:"assets/bear.png"},{text:"Bash asks, “Where should it go?”",image:"assets/bash.png"},{text:"{studentName} helps the friends choose a place.",image:"assets/academy.png"}
 ],check:{prompt:"What does Bear carry?",options:["A small tree","A kite","A book"],answer:"A small tree"},rewardPiece:{id:"garden-fence",name:"Garden Fence",icon:"🪵",area:"welcome-garden",lesson:"1-A"}},
 build:{areaId:"welcome-garden",stage:1,title:"Build Your First Garden Corner",requiredPieces:["welcome-flowers","stone-path","reading-bench","welcome-tree","garden-fence"],completionMessage:"Your first Academy garden corner is saved."},
 completion:{xp:25,stars:1,unlocks:"1-B",message:"Your first Academy adventure is complete."}
},
{
 id:"1-B",chapter:"Week 1",title:"Bear's Missing Ball",unlocked:false,reward:"Welcome Garden — Play Corner",buildArea:"welcome-garden",buildStage:2,
 objectives:{speaking:["Answer: What did you do?","Use I played / I read / I helped."],listening:["Follow simple action words."],reading:["Recognize B/b and /b/."],phonics:["B/b and /b/."]},
 vocabulary:[{word:"ball",display:"ball",picture:"⚽"},{word:"book",display:"book",picture:"📘"},{word:"played",display:"I played.",picture:"🎮"},{word:"helped",display:"I helped.",picture:"🤝"}],
 intro:[{speaker:"Captain Fritz",text:"Welcome back, {studentName}! How are you today?",responseType:"feeling"},{speaker:"Captain Fritz",text:"What did you do today?"},{speaker:"Captain Fritz",text:"Bear cannot find his ball. The puppies need your help."}],
 feelingChoices:[{id:"great",label:"I am great.",emoji:"😄"},{id:"fine",label:"I am fine.",emoji:"🙂"},{id:"tired",label:"I am tired.",emoji:"😴"}],
 feelingsActivity:{title:"Feelings Check",instructions:"Match each face.",questions:[
  {emoji:"😄",answer:"I am great.",options:["I am great.","I am tired.","I am fine."]},
  {emoji:"🙂",answer:"I am fine.",options:["I am tired.","I am fine.","I am great."]},
  {emoji:"😴",answer:"I am tired.",options:["I am fine.","I am great.","I am tired."]}
 ],rewardPiece:{id:"playground-sign",name:"Play Corner Sign",icon:"🪧",area:"welcome-garden",lesson:"1-B"}},
 story:{title:"Bear's Missing Ball",pages:[
  {text:"Bear brings his blue ball to the garden. Rascal asks if they can play.",image:"assets/bear.png"},
  {text:"Bear rolls the ball to Rascal. Rascal kicks it too hard, and the ball disappears behind the bushes.",image:"assets/rascal.png"},
  {text:"Nola looks under the bench and beside the flowers. She cannot see it, so she gets Bash and Tony.",image:"assets/nola.png"},
  {text:"Tony starts giving directions. “Look left! Look right! Look under everything!” Bash studies the ground instead.",image:"assets/tony.png"},
  {text:"Bash sees a small track in the dirt. “The ball rolled downhill,” he says. The group follows the track.",image:"assets/bash.png"},
  {text:"They find the ball beside a birdhouse. Bear lets Rascal try again, but this time they stand closer together.",image:"assets/academy.png"}
 ],questions:[
  {prompt:"What did Rascal kick?",options:["Bear's ball","A book","A box"],answer:"Bear's ball"},
  {prompt:"Who notices the track?",options:["Bash","Tony","Captain Fritz"],answer:"Bash"},
  {prompt:"Where is the ball?",options:["Beside a birdhouse","In a classroom","Under a bed"],answer:"Beside a birdhouse"}
 ],rewardPiece:{id:"birdhouse",name:"Garden Birdhouse",icon:"🐦",area:"welcome-garden",lesson:"1-B"}},
 alphabetSong:{title:"Fritz Academy Alphabet Song",rewardMessage:"Listen for B.",assetPath:"assets/alphabet-song-small.mp4",videoPath:"assets/alphabet-song-small.mp4"},
 phonics:{letterUpper:"B",letterLower:"b",soundLabel:"/b/",teacherCue:"Say: b, b, ball.",examples:[{word:"ball",icon:"⚽"},{word:"book",icon:"📘"},{word:"bag",icon:"🎒"}],
  recognitionQuestion:{prompt:"Choose uppercase B.",options:["P","B","D"],answer:"B"},lowercaseQuestion:{prompt:"Choose lowercase b.",options:["d","p","b"],answer:"b"},wordQuestion:{prompt:"Which word begins with /b/?",options:["ball","map","fish"],answer:"ball"},
  rewardPiece:{id:"ball-rack",name:"Ball Rack",icon:"⚽",area:"welcome-garden",lesson:"1-B"}},
 reader1:{title:"Reader 1: The Blue Ball",level:"Easy",pages:[
  {text:"Bear has a blue ball.",image:"assets/bear.png"},{text:"Rascal wants to play.",image:"assets/rascal.png"},{text:"The ball rolls away.",image:"assets/academy.png"},{text:"Bash sees the track.",image:"assets/bash.png"},{text:"They find the ball.",image:"assets/academy.png"}
 ],check:{prompt:"What color is the ball?",options:["Blue","Red","Green"],answer:"Blue"},rewardPiece:{id:"play-bench",name:"Play Bench",icon:"🪑",area:"welcome-garden",lesson:"1-B"}},
 reader2:{title:"Reader 2: Play Together",level:"Easy Plus",pages:[
  {text:"Bear rolls the ball to Rascal.",image:"assets/bear.png"},{text:"Rascal rolls it to Nola.",image:"assets/rascal.png"},{text:"Nola rolls it to Tony.",image:"assets/nola.png"},{text:"Tony says, “Bash, your turn!”",image:"assets/tony.png"},{text:"The friends play together.",image:"assets/bash.png"}
 ],check:{prompt:"Who gets the ball after Nola?",options:["Tony","Captain Fritz","Bear"],answer:"Tony"},rewardPiece:{id:"play-flowers",name:"Play Corner Flowers",icon:"🌻",area:"welcome-garden",lesson:"1-B"}},
 build:{areaId:"welcome-garden",stage:2,title:"Build the Play Corner",requiredPieces:["playground-sign","birdhouse","ball-rack","play-bench","play-flowers"],completionMessage:"The Play Corner is saved in your Academy."},
 completion:{xp:25,stars:1,unlocks:"1-C",message:"The Play Corner is ready."}
},
{
 id:"1-C",chapter:"Week 1",title:"The Garden Map",unlocked:false,reward:"Welcome Garden — Map Corner",buildArea:"welcome-garden",buildStage:3,
 objectives:{speaking:["Use left, right, stop.","Answer where questions."],listening:["Follow simple directions."],reading:["Recognize C, D and their sounds."],phonics:["C/c hard /k/ and D/d /d/."]},
 vocabulary:[{word:"map",display:"map",picture:"🗺️"},{word:"left",display:"left",picture:"⬅️"},{word:"right",display:"right",picture:"➡️"},{word:"door",display:"door",picture:"🚪"}],
 intro:[{speaker:"Captain Fritz",text:"How are you today, {studentName}?",responseType:"feeling"},{speaker:"Captain Fritz",text:"Tony found an old garden map. What do you think it shows?"}],
 feelingChoices:[{id:"excited",label:"I am excited.",emoji:"🤩"},{id:"worried",label:"I am worried.",emoji:"😟"},{id:"calm",label:"I am calm.",emoji:"😌"}],
 feelingsActivity:{title:"Feelings Check",instructions:"Match each face.",questions:[
  {emoji:"🤩",answer:"I am excited.",options:["I am excited.","I am worried.","I am calm."]},
  {emoji:"😟",answer:"I am worried.",options:["I am calm.","I am worried.","I am excited."]},
  {emoji:"😌",answer:"I am calm.",options:["I am worried.","I am excited.","I am calm."]}
 ],rewardPiece:{id:"map-post",name:"Garden Map Post",icon:"🗺️",area:"welcome-garden",lesson:"1-C"}},
 story:{title:"The Map Under the Tree",pages:[
  {text:"Tony finds a folded map under the reading bench. He wants to follow every arrow at once.",image:"assets/tony.png"},
  {text:"Bear and Rascal race toward the first arrow. They reach two paths and stop.",image:"assets/bear.png"},
  {text:"Nola notices a tiny C beside the left path and a D beside the right path. She calls Bash.",image:"assets/nola.png"},
  {text:"Tony says they should take the shortest path. Bash asks everyone to read the map first.",image:"assets/bash.png"},
  {text:"The map says, “C means continue left. D marks the little door.” The puppies follow the directions together.",image:"assets/alphabet-blocks.png"},
  {text:"Behind the little door is a box of old Academy garden markers. Captain Fritz asks, “How did the map help you?”",image:"assets/captain_fritz.png"}
 ],questions:[
  {prompt:"Who finds the map?",options:["Tony","Rascal","Nola"],answer:"Tony"},
  {prompt:"What does Bash want everyone to do first?",options:["Read the map","Run faster","Go home"],answer:"Read the map"},
  {prompt:"What is behind the little door?",options:["Garden markers","A car","A cake"],answer:"Garden markers"}
 ],rewardPiece:{id:"clue-door",name:"Little Clue Door",icon:"🚪",area:"welcome-garden",lesson:"1-C"}},
 alphabetSong:{title:"Fritz Academy Alphabet Song",rewardMessage:"Listen for C and D.",assetPath:"assets/alphabet-song-small.mp4",videoPath:"assets/alphabet-song-small.mp4"},
 phonics:{letterUpper:"C D",letterLower:"c d",soundLabel:"/k/ and /d/",teacherCue:"Say: c, c, cat. d, d, dog.",examples:[{word:"cat",icon:"🐱"},{word:"cup",icon:"🥤"},{word:"dog",icon:"🐶"},{word:"door",icon:"🚪"}],
  recognitionQuestion:{prompt:"Choose C and D.",options:["C D","A B","E F"],answer:"C D"},lowercaseQuestion:{prompt:"Choose c and d.",options:["e f","c d","a b"],answer:"c d"},wordQuestion:{prompt:"Which pair begins with C and D sounds?",options:["cat and dog","apple and ball","fish and gate"],answer:"cat and dog"},
  rewardPiece:{id:"letter-stones-cd",name:"C and D Letter Stones",icon:"🔤",area:"welcome-garden",lesson:"1-C"}},
 reader1:{title:"Reader 1: Cat by the Door",level:"Easy",pages:[
  {text:"A cat is by the door.",image:"assets/academy.png"},{text:"The cat sees Bear.",image:"assets/bear.png"},{text:"Bear does not run.",image:"assets/bear.png"},{text:"He waits by the door.",image:"assets/academy.png"},{text:"The cat stays calm.",image:"assets/academy.png"}
 ],check:{prompt:"Where is the cat?",options:["By the door","In a bus","On a bed"],answer:"By the door"},rewardPiece:{id:"cat-statue",name:"Friendly Cat Statue",icon:"🐱",area:"welcome-garden",lesson:"1-C"}},
 reader2:{title:"Reader 2: The Right Turn",level:"Easy Plus",pages:[
  {text:"Nola reads the map.",image:"assets/nola.png"},{text:"Tony points left.",image:"assets/tony.png"},{text:"Bash says, “Check the map.”",image:"assets/bash.png"},{text:"The map says right.",image:"assets/alphabet-blocks.png"},{text:"The friends turn right together.",image:"assets/academy.png"}
 ],check:{prompt:"Which way does the map say?",options:["Right","Left","Back"],answer:"Right"},rewardPiece:{id:"direction-arrows",name:"Garden Direction Arrows",icon:"↔️",area:"welcome-garden",lesson:"1-C"}},
 build:{areaId:"welcome-garden",stage:3,title:"Build the Map Corner",requiredPieces:["map-post","clue-door","letter-stones-cd","cat-statue","direction-arrows"],completionMessage:"The Map Corner is saved."},
 completion:{xp:30,stars:1,unlocks:"2-A",message:"Week 1 is complete."}
},
{
 id:"2-A",chapter:"Week 2",title:"The Garden Circle",unlocked:false,reward:"Welcome Garden — Flower Circle",buildArea:"welcome-garden",buildStage:4,
 objectives:{speaking:["Answer what and how many."],listening:["Follow clue language."],reading:["Recognize E, F and their sounds."],phonics:["E/e short /e/ and F/f /f/."]},
 vocabulary:[{word:"egg",display:"egg",picture:"🥚"},{word:"fish",display:"fish",picture:"🐟"},{word:"flower",display:"flower",picture:"🌸"},{word:"four",display:"four",picture:"4️⃣"}],
 intro:[{speaker:"Captain Fritz",text:"How are you today, {studentName}?",responseType:"feeling"},{speaker:"Captain Fritz",text:"The old garden circle has a new clue. Look carefully."}],
 feelingChoices:[{id:"surprised",label:"I am surprised.",emoji:"😮"},{id:"proud",label:"I am proud.",emoji:"😊"},{id:"confused",label:"I am confused.",emoji:"😕"}],
 feelingsActivity:{title:"Feelings Check",instructions:"Match each face.",questions:[
  {emoji:"😮",answer:"I am surprised.",options:["I am surprised.","I am proud.","I am confused."]},
  {emoji:"😊",answer:"I am proud.",options:["I am confused.","I am proud.","I am surprised."]},
  {emoji:"😕",answer:"I am confused.",options:["I am proud.","I am surprised.","I am confused."]}
 ],rewardPiece:{id:"flower-arch",name:"Flower Arch",icon:"🌸",area:"welcome-garden",lesson:"2-A"}},
 story:{title:"Four Flowers and One Fake",pages:[
  {text:"Nola finds an envelope marked E beside the garden circle. Inside is a note: “Find four flowers by the fence.”",image:"assets/nola.png"},
  {text:"Bear counts five flowers and looks confused. Rascal says, “Five is close enough!”",image:"assets/bear.png"},
  {text:"Tony starts counting again. Bash asks everyone to look at each flower instead.",image:"assets/bash.png"},
  {text:"Nola touches the fifth flower. It is made of paper. “This one is not real,” she says.",image:"assets/nola.png"},
  {text:"The four real flowers fit into four empty spaces around the circle. The old cover begins to move.",image:"assets/academy.png"},
  {text:"The circle opens to a tiny fish pond. Captain Fritz smiles. “What helped you solve the clue?”",image:"assets/captain_fritz.png"}
 ],questions:[
  {prompt:"How many real flowers are there?",options:["Four","Five","Three"],answer:"Four"},
  {prompt:"Who discovers the paper flower?",options:["Nola","Rascal","Tony"],answer:"Nola"},
  {prompt:"What opens?",options:["The garden circle","A car door","A classroom"],answer:"The garden circle"}
 ],rewardPiece:{id:"four-flowers",name:"Four Bright Flowers",icon:"💐",area:"welcome-garden",lesson:"2-A"}},
 alphabetSong:{title:"Fritz Academy Alphabet Song",rewardMessage:"Listen for E and F.",assetPath:"assets/alphabet-song-small.mp4",videoPath:"assets/alphabet-song-small.mp4"},
 phonics:{letterUpper:"E F",letterLower:"e f",soundLabel:"short e and /f/",teacherCue:"Say: e, e, egg. f, f, fish.",examples:[{word:"egg",icon:"🥚"},{word:"elephant",icon:"🐘"},{word:"fish",icon:"🐟"},{word:"flower",icon:"🌸"}],
  recognitionQuestion:{prompt:"Choose E and F.",options:["E F","C D","G H"],answer:"E F"},lowercaseQuestion:{prompt:"Choose e and f.",options:["e f","c d","g h"],answer:"e f"},wordQuestion:{prompt:"Which pair begins with E and F?",options:["egg and fish","cat and dog","gate and hat"],answer:"egg and fish"},
  rewardPiece:{id:"letter-stones-ef",name:"E and F Letter Stones",icon:"🔤",area:"welcome-garden",lesson:"2-A"}},
 reader1:{title:"Reader 1: Four Fish",level:"Easy",pages:[
  {text:"Four fish swim.",image:"assets/academy.png"},{text:"One fish is fast.",image:"assets/academy.png"},{text:"Two fish turn.",image:"assets/academy.png"},{text:"Three fish hide.",image:"assets/academy.png"},{text:"Four fish come back.",image:"assets/academy.png"}
 ],check:{prompt:"How many fish come back?",options:["Four","Two","Five"],answer:"Four"},rewardPiece:{id:"fish-pond",name:"Little Fish Pond",icon:"🐟",area:"welcome-garden",lesson:"2-A"}},
 reader2:{title:"Reader 2: Finish the Circle",level:"Easy Plus",pages:[
  {text:"Nola plants one flower.",image:"assets/nola.png"},{text:"Bear plants one flower.",image:"assets/bear.png"},{text:"Rascal plants one flower.",image:"assets/rascal.png"},{text:"Tony plants one flower.",image:"assets/tony.png"},{text:"Bash checks all four. The circle is ready.",image:"assets/bash.png"}
 ],check:{prompt:"Who checks the four flowers?",options:["Bash","Rascal","Captain Fritz"],answer:"Bash"},rewardPiece:{id:"garden-circle",name:"Garden Circle",icon:"⭕",area:"welcome-garden",lesson:"2-A"}},
 build:{areaId:"welcome-garden",stage:4,title:"Build the Flower Circle",requiredPieces:["flower-arch","four-flowers","letter-stones-ef","fish-pond","garden-circle"],completionMessage:"The Flower Circle is saved."},
 completion:{xp:30,stars:1,unlocks:"2-B",message:"The Flower Circle is complete."}
},
{
 id:"2-B",chapter:"Week 2",title:"The Locked Alphabet Gate",unlocked:false,reward:"Alphabet Gate",buildArea:"academy-world",buildStage:1,
 objectives:{speaking:["Ask who, what, where."],listening:["Follow letter clues."],reading:["Recognize G and H and review A-H."],phonics:["G/g hard /g/ and H/h /h/."]},
 vocabulary:[{word:"gate",display:"gate",picture:"🚪"},{word:"green",display:"green",picture:"🟢"},{word:"hat",display:"hat",picture:"🎩"},{word:"help",display:"help",picture:"🤝"}],
 intro:[{speaker:"Captain Fritz",text:"How are you today, {studentName}?",responseType:"feeling"},{speaker:"Captain Fritz",text:"The old Alphabet Gate is locked. Eight letter stones are missing."}],
 feelingChoices:[{id:"ready",label:"I am ready.",emoji:"😄"},{id:"curious",label:"I am curious.",emoji:"🤔"},{id:"nervous",label:"I am nervous.",emoji:"😟"}],
 feelingsActivity:{title:"Feelings Check",instructions:"Match each face.",questions:[
  {emoji:"😄",answer:"I am ready.",options:["I am ready.","I am curious.","I am nervous."]},
  {emoji:"🤔",answer:"I am curious.",options:["I am nervous.","I am curious.","I am ready."]},
  {emoji:"😟",answer:"I am nervous.",options:["I am curious.","I am ready.","I am nervous."]}
 ],rewardPiece:{id:"gate-lantern",name:"Alphabet Gate Lantern",icon:"🏮",area:"academy-world",lesson:"2-B"}},
 story:{title:"The Locked Alphabet Gate",pages:[
  {text:"Bear and Rascal find an old gate behind the garden. Eight empty spaces run across the stone arch.",image:"assets/academy.png"},
  {text:"Rascal pushes the gate. Nothing happens. Bear notices an A carved beside the first empty space.",image:"assets/bear.png"},
  {text:"Nola gets Bash and Tony. Tony says they should search everywhere. Bash asks, “What do we know first?”",image:"assets/bash.png"},
  {text:"The group realizes the spaces need A through H in order. They search the path, garden, bench, and fountain.",image:"assets/alphabet-blocks.png"},
  {text:"Nola finds G under the green gate sign. Rascal finds H beside Captain Fritz's old hat box.",image:"assets/nola.png"},
  {text:"The group places A through H in order. The gate opens. Captain Fritz asks, “How did you know what came next?”",image:"assets/captain_fritz.png"}
 ],questions:[
  {prompt:"What is missing from the gate?",options:["Eight letter stones","Six books","Three balls"],answer:"Eight letter stones"},
  {prompt:"Where does Nola find G?",options:["Under the green gate sign","In a classroom","On a boat"],answer:"Under the green gate sign"},
  {prompt:"How does the team open the gate?",options:["Put A-H in order","Push harder","Ask Fritz for a key"],answer:"Put A-H in order"}
 ],rewardPiece:{id:"alphabet-gate",name:"Alphabet Gate",icon:"🚪",area:"academy-world",lesson:"2-B"}},
 alphabetSong:{title:"Fritz Academy Alphabet Song",rewardMessage:"Review A through H.",assetPath:"assets/alphabet-song-small.mp4",videoPath:"assets/alphabet-song-small.mp4"},
 phonics:{letterUpper:"G H",letterLower:"g h",soundLabel:"/g/ and /h/",teacherCue:"Say: g, g, gate. h, h, hat.",examples:[{word:"gate",icon:"🚪"},{word:"green",icon:"🟢"},{word:"hat",icon:"🎩"},{word:"help",icon:"🤝"}],
  recognitionQuestion:{prompt:"Choose G and H.",options:["G H","E F","I J"],answer:"G H"},lowercaseQuestion:{prompt:"Choose g and h.",options:["g h","e f","i j"],answer:"g h"},wordQuestion:{prompt:"Which pair begins with G and H?",options:["gate and hat","egg and fish","cat and dog"],answer:"gate and hat"},
  rewardPiece:{id:"letter-stones-gh",name:"G and H Letter Stones",icon:"🔤",area:"academy-world",lesson:"2-B"}},
 reader1:{title:"Reader 1: G by the Gate",level:"Easy",pages:[
  {text:"G is by the gate.",image:"assets/academy.png"},{text:"Nola sees G.",image:"assets/nola.png"},{text:"She gets Bash.",image:"assets/bash.png"},{text:"Bash carries G.",image:"assets/bash.png"},{text:"G goes in the gate.",image:"assets/alphabet-blocks.png"}
 ],check:{prompt:"Who sees G?",options:["Nola","Bear","Tony"],answer:"Nola"},rewardPiece:{id:"gate-sign",name:"Green Gate Sign",icon:"🪧",area:"academy-world",lesson:"2-B"}},
 reader2:{title:"Reader 2: H by the Hat",level:"Easy Plus",pages:[
  {text:"Rascal sees a hat box.",image:"assets/rascal.png"},{text:"H is beside the box.",image:"assets/alphabet-blocks.png"},{text:"Rascal calls Bear.",image:"assets/rascal.png"},{text:"They carry H together.",image:"assets/bear.png"},{text:"H goes after G.",image:"assets/alphabet-blocks.png"}
 ],check:{prompt:"What comes before H?",options:["G","F","I"],answer:"G"},rewardPiece:{id:"question-fountain",name:"Question Fountain",icon:"⛲",area:"academy-world",lesson:"2-B"}},
 build:{areaId:"academy-world",stage:1,title:"Open the Alphabet Gate",requiredPieces:["gate-lantern","alphabet-gate","letter-stones-gh","gate-sign","question-fountain"],completionMessage:"The Alphabet Gate is now part of your Academy."},
 completion:{xp:35,stars:2,unlocks:"2-C",message:"The Alphabet Gate is open."}
},
{
 id:"2-C",chapter:"Week 2",title:"The Great Kite Problem",unlocked:false,reward:"Kite Field and Workshop",buildArea:"academy-world",buildStage:2,
 objectives:{speaking:["Use who, what, where, why, how.","Use simple action words."],listening:["Follow a connected story and building directions."],reading:["Recognize I through P and read two connected readers."],phonics:["Review names and beginning sounds I-P."]},
 vocabulary:[{word:"kite",display:"kite",picture:"🪁"},{word:"run",display:"run",picture:"🏃"},{word:"stop",display:"stop",picture:"🛑"},{word:"help",display:"help",picture:"🤝"},{word:"together",display:"together",picture:"🐾"}],
 intro:[{speaker:"Captain Fritz",text:"How are you today, {studentName}?",responseType:"feeling"},{speaker:"Captain Fritz",text:"What did you do today?"},{speaker:"Captain Fritz",text:"There is a lot of wind at the Academy. I wonder what the puppies are doing."}],
 feelingChoices:[{id:"happy",label:"I am happy.",emoji:"😀"},{id:"excited",label:"I am excited.",emoji:"🤩"},{id:"tired",label:"I am tired.",emoji:"😴"}],
 feelingsActivity:{title:"Feelings Check",instructions:"Match each face.",questions:[
  {emoji:"😀",answer:"I am happy.",options:["I am happy.","I am excited.","I am tired."]},
  {emoji:"🤩",answer:"I am excited.",options:["I am tired.","I am excited.","I am happy."]},
  {emoji:"😴",answer:"I am tired.",options:["I am excited.","I am happy.","I am tired."]}
 ],rewardPiece:{id:"kite-field-sign",name:"Kite Field Sign",icon:"🪧",area:"academy-world",lesson:"2-C"}},
 story:{title:"The Great Kite Problem",pages:[
  {text:"Bear is flying his favorite kite on the Academy field. The wind lifts it high above the trees.",image:"assets/bear.png"},
  {text:"Rascal wants a turn. He grabs for the string, and Bear runs away laughing. Rascal chases him across the field.",image:"assets/rascal.png"},
  {text:"Nola sees Bear running backward toward a bench. She races to find Bash and Tony.",image:"assets/nola.png"},
  {text:"Tony starts shouting instructions, but Bash looks at the field first. “They need to stop before they crash,” Bash says.",image:"assets/bash.png"},
  {text:"Bash steps between the two paths and gets Bear and Rascal to stop. Bear still has the kite, but now both puppies are upset.",image:"assets/bash.png"},
  {text:"Tony says, “We can make more kites!” Everyone looks at Bash. Bash thinks, then says, “Yes. We can make one for each of us and one for {studentName}.”",image:"assets/tony.png"},
  {text:"Captain Fritz arrives with a box of old kite plans. “Interesting solution,” he says. “What will you need, and how will you build them?”",image:"assets/captain_fritz.png"}
 ],questions:[
  {prompt:"Why does Rascal chase Bear?",options:["He wants the kite","He lost a book","He is going home"],answer:"He wants the kite"},
  {prompt:"Who notices the danger first?",options:["Nola","Tony","Captain Fritz"],answer:"Nola"},
  {prompt:"Who decides the group should make more kites?",options:["Bash","Tony","Rascal"],answer:"Bash"},
  {prompt:"What does Captain Fritz bring?",options:["Old kite plans","A new ball","A lunch box"],answer:"Old kite plans"}
 ],rewardPiece:{id:"kite-workshop-sign",name:"Kite Workshop Sign",icon:"🛠️",area:"academy-world",lesson:"2-C"}},
 alphabetSong:{title:"Fritz Academy Alphabet Song",rewardMessage:"Listen for I through P.",assetPath:"assets/alphabet-song-small.mp4",videoPath:"assets/alphabet-song-small.mp4"},
 phonics:{letterUpper:"I J K L M N O P",letterLower:"i j k l m n o p",soundLabel:"I through P",teacherCue:"Say each letter and one word: insect, jar, kite, leaf, moon, nest, orange, puppy.",examples:[
  {word:"insect",icon:"🐞"},{word:"jar",icon:"🫙"},{word:"kite",icon:"🪁"},{word:"leaf",icon:"🍃"},{word:"moon",icon:"🌙"},{word:"nest",icon:"🪺"},{word:"orange",icon:"🍊"},{word:"puppy",icon:"🐶"}],
  recognitionQuestion:{prompt:"Which set is I through P?",options:["I J K L M N O P","A B C D","Q R S T"],answer:"I J K L M N O P"},
  lowercaseQuestion:{prompt:"Which set matches in lowercase?",options:["i j k l m n o p","a b c d","q r s t"],answer:"i j k l m n o p"},
  wordQuestion:{prompt:"Which word begins with K?",options:["kite","orange","nest"],answer:"kite"},
  rewardPiece:{id:"ip-letter-stones",name:"I-P Letter Stones",icon:"🔤",area:"academy-world",lesson:"2-C"}},
 reader1:{title:"Reader 1: Bear's Kite",level:"Easy",pages:[
  {text:"Bear has a kite.",image:"assets/bear.png"},{text:"The kite is high.",image:"assets/academy.png"},{text:"Rascal wants a turn.",image:"assets/rascal.png"},{text:"Bear runs. Rascal runs.",image:"assets/academy.png"},{text:"Bash says, “Stop.”",image:"assets/bash.png"},{text:"The puppies stop in time.",image:"assets/bash.png"}
 ],check:{prompt:"Who tells the puppies to stop?",options:["Bash","Tony","Captain Fritz"],answer:"Bash"},rewardPiece:{id:"safe-path-marker",name:"Safe Path Marker",icon:"🛑",area:"academy-world",lesson:"2-C"}},
 reader2:{title:"Reader 2: Tony's Plan",level:"Easy Plus",pages:[
  {text:"Tony puts the kite plan on a table.",image:"assets/tony.png"},{text:"He points to sticks, paper, string, and tails.",image:"assets/academy.png"},{text:"Bash brings the pieces to the table.",image:"assets/bash.png"},{text:"Bear and Rascal work on two kites together.",image:"assets/bear.png"},{text:"Nola helps make a kite for {studentName}.",image:"assets/nola.png"},{text:"The team makes six kites. Captain Fritz asks, “Which kite will you fly first?”",image:"assets/captain_fritz.png"}
 ],check:{prompt:"How many kites does the team make?",options:["Six","Two","Eight"],answer:"Six"},rewardPiece:{id:"six-kite-display",name:"Six-Kite Display",icon:"🪁",area:"academy-world",lesson:"2-C"}},
 build:{areaId:"academy-world",stage:2,title:"Build the Kite Field",requiredPieces:["kite-field-sign","kite-workshop-sign","ip-letter-stones","safe-path-marker","six-kite-display"],completionMessage:"Your Kite Field is saved in your Academy."},
 completion:{xp:40,stars:2,unlocks:[],message:"Week 2 is complete. More Academy adventures are coming next."}
}
];

function findLevel(id){ return LEVELS.find(level => level.id === id); }
function replaceStudentName(text,studentName){ return String(text||"").replaceAll("{studentName}",studentName||"Academy Student"); }
window.FRITZ_COURSE_VERSION = "55.0-clean-six";
