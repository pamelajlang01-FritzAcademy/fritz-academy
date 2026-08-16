/* Fritz Academy 54.1 — Lesson 6 production language/story pass */
(function(){
'use strict';
const level=typeof findLevel==='function'?findLevel('2-B'):null;
if(!level)return;
const reward=(id,name)=>({id,name,area:'kite-workshop',lesson:'2-B'});

Object.assign(level,{
 title:'The Kite Chase',
 chapter:'Week 2',
 targetMinutes:25,
 sightWords:['I','see','the','is','can','we','you','have'],
 vocabulary:[
  {word:'kite',display:'a kite'},{word:'string',display:'kite string'},{word:'paper',display:'paper'},
  {word:'sticks',display:'sticks'},{word:'run',display:'run'},{word:'stop',display:'stop'},
  {word:'share',display:'share'},{word:'together',display:'work together'}
 ],
 objectives:{
  speaking:['Answer How are you? and What did you do?','Use who, what, where, why, and how in simple exchanges.','Name and use I through P words.'],
  listening:['Follow short directions during the kite games.','Listen to a connected story and identify what happened first, next, and last.'],
  reading:['Read two short connected readers that continue the kite adventure.','Read familiar sight words inside meaningful sentences.'],
  phonics:['Recognize I, J, K, L, M, N, O, and P.','Connect each letter with a familiar beginning sound and word.']
 },
 intro:[
  {speaker:'Captain Fritz',text:'Welcome back, {studentName}! How are you today?',responseType:'feeling'},
  {speaker:'Captain Fritz',text:'What did you do today?',responseType:'weekly-activity'},
  {speaker:'Captain Fritz',text:'I hear Bear and Rascal outside. I wonder what they are doing. Let us go see.'}
 ],
 feelingChoices:[
  {id:'happy',label:'I am happy.',emoji:'😀'},{id:'excited',label:'I am excited.',emoji:'🤩'},
  {id:'fine',label:'I am fine.',emoji:'🙂'},{id:'tired',label:'I am tired.',emoji:'😴'},
  {id:'sad',label:'I am sad.',emoji:'😢'},{id:'nervous',label:'I am nervous.',emoji:'😟'}
 ],
 story:{
  title:'The Kite Chase',
  pages:[
   {text:'Bear finds a bright kite beside the Academy path. He picks it up and turns it over in his paws. “Look what I found!” he calls.'},
   {text:'Rascal comes running. His tail is wagging. “Can I try it?” he asks. Bear says, “Wait. Let me see how it works first.”'},
   {text:'Rascal reaches for the string anyway. Bear steps away with the kite, and Rascal follows. One step becomes two, and soon both puppies are running around the fountain.'},
   {text:'Nola is carrying flowers to the garden when she sees them. Bear is looking back at Rascal instead of looking ahead. “Oh no,” Nola says. She runs to find Bash and Tony.'},
   {text:'Bash reaches the path just before Bear and Rascal crash into each other. He plants his paws and calls, “Stop!” Both puppies skid to a halt on opposite sides of him.'},
   {text:'Tony hurries up behind Nola and pushes his glasses into place. “Clearly, we need more kites,” he announces. “I can make a plan.” Everyone turns to Bash.'},
   {text:'Bash looks at Bear, then at Rascal. “That will work,” he says. “But we build them together, and nobody grabs another puppy’s string.” Bear and Rascal agree.'},
   {text:'Captain Fritz walks over while Tony spreads his plan on a table. He does not tell them what to do. He asks, “What will you need? Who will do each job? How will you keep everyone safe?”'},
   {text:'The team makes six kites: one for Bear, Rascal, Nola, Bash, and {studentName}, and one large kite for Captain Fritz. This time Bear and Rascal run side by side. The six kites rise over the Academy together.'}
  ],
  questions:[
   {prompt:'What does Bear find?',options:['A kite','A book','A ball'],answer:'A kite'},
   {prompt:'Why does Nola get Bash and Tony?',options:['Bear and Rascal may crash','She wants lunch','The garden is closed'],answer:'Bear and Rascal may crash'},
   {prompt:'Who makes the final decision about the plan?',options:['Bash','Tony','Rascal'],answer:'Bash'},
   {prompt:'How does Captain Fritz help?',options:['He asks questions and gives direction','He builds every kite','He takes the kite away'],answer:'He asks questions and gives direction'},
   {prompt:'What changes at the end?',options:['Bear and Rascal work together','Rascal hides the kite','Everyone goes home'],answer:'Bear and Rascal work together'}
  ],
  rewardPiece:reward('kite-workshop-sign','Kite Workshop Sign')
 },
 phonics:{
  letterUpper:'I J K L M N O P',letterLower:'i j k l m n o p',soundLabel:'I through P',
  teacherCue:'Listen, say, and find: insect, jar, kite, leaf, moon, nest, orange, paper.',
  examples:[
   {word:'insect',icon:'🐞'},{word:'jar',icon:'🫙'},{word:'kite',icon:'🪁'},{word:'leaf',icon:'🍃'},
   {word:'moon',icon:'🌙'},{word:'nest',icon:'🪺'},{word:'orange',icon:'🍊'},{word:'paper',icon:'📄'}
  ],
  recognitionQuestion:{prompt:'Which set is I through P?',options:['I J K L M N O P','A B C D E F G H','Q R S T U V W X'],answer:'I J K L M N O P'},
  lowercaseQuestion:{prompt:'Which set matches in lowercase?',options:['i j k l m n o p','a b c d e f g h','q r s t u v w x'],answer:'i j k l m n o p'},
  wordQuestion:{prompt:'Which word begins with K?',options:['kite','nest','paper'],answer:'kite'},
  rewardPiece:reward('safe-path-marker','Safe Path Marker')
 },
 reader1:{
  title:"Reader 1: Bear's Kite",level:'Easy',
  pages:[
   {text:'Bear has a new kite.'},
   {text:'He wants to see it fly.'},
   {text:'Rascal asks, “Can I try?”'},
   {text:'Bear says, “Wait, please.”'},
   {text:'Rascal follows Bear down the path.'},
   {text:'Nola sees them run. She knows they need help.'}
  ],
  check:{prompt:'Why does Nola go for help?',options:['Bear and Rascal are running without looking','She lost a flower','Tony called her'],answer:'Bear and Rascal are running without looking'},
  rewardPiece:reward('safe-path-marker','Safe Path Marker')
 },
 reader2:{
  title:"Reader 2: Tony's Plan",level:'Easy Plus',
  pages:[
   {text:'Bash stops the chase. Bear and Rascal are safe.'},
   {text:'Tony says, “We can make more kites.”'},
   {text:'Bash listens to the idea. “Yes. We will make them together,” he says.'},
   {text:'Tony draws the plan. Bash brings the sticks and paper.'},
   {text:'Nola checks the pieces. Bear and Rascal tie the string together.'},
   {text:'Soon six kites are ready to fly over Fritz Academy.'}
  ],
  check:{prompt:'What does the team do after Bash approves the plan?',options:['They build six kites together','They hide the first kite','They stop playing'],answer:'They build six kites together'},
  rewardPiece:reward('six-kite-display','Six-Kite Display')
 },
 build:{
  areaId:'kite-workshop',stage:1,title:"Build Tony's Kite Workshop",
  requiredPieces:['kite-workshop-sign','safe-path-marker','six-kite-display'],
  completionMessage:'Your Kite Workshop is now part of your Academy. The pieces will stay where you place them.'
 },
 closingSong:null,
 completion:{xp:45,stars:2,unlocks:'2-C',message:'The Kite Chase is complete. You helped the team listen, read, solve a problem, and build together.'}
});
window.FRITZ_LESSON6_PRODUCTION='54.1';
})();