/* Fritz Academy 53.10 — Lesson 6 cast-behavior correction */
(function(){
'use strict';
const level=typeof findLevel==='function'?findLevel('2-B'):null;
if(!level||!level.story)return;
level.story.pages=[
 {text:'Bear finds a bright kite beside the Academy path. He lifts it carefully and calls, “Look what I found!”'},
 {text:'Rascal races over. “Let me try it!” he says. Before Bear can answer, Rascal reaches for the string.'},
 {text:'Bear pulls the kite away and runs. Rascal chases him around the fountain. They are laughing so hard that neither puppy sees where he is going.'},
 {text:'Nola sees Bear and Rascal racing toward each other. “Oh no!” she says. She runs to find Bash and Tony.'},
 {text:'Bash reaches the path just in time. He steps between the two puppies and holds out his paws. “Stop!” Bear and Rascal skid to a halt.'},
 {text:'Tony pushes up his glasses. “I have an idea. We could make enough kites for everyone!” He starts listing paper, sticks, string, and ribbon.'},
 {text:'Bash studies Tony’s idea, then nods. “That will work. Let’s build six kites together—one for Bear, Rascal, Nola, me, {studentName}, and a big one for Captain Fritz.”'},
 {text:'Captain Fritz walks over and smiles. “That sounds like a plan. What will you need first? How can everyone help?” He waits while the team decides.'},
 {text:'Tony explains each step. Bash hands out the pieces. Nola checks the plan. {studentName} helps build. Bear and Rascal work side by side instead of chasing.'},
 {text:'Soon six kites rise over Fritz Academy. Captain Fritz asks, “What changed?” Bear looks at Rascal and says, “We stopped fighting over one kite and made enough to share.”'}
];
level.story.questions=[
 {prompt:'Why does Rascal chase Bear?',options:['He wants to try the kite','He wants an orange','He is looking for Tony'],answer:'He wants to try the kite'},
 {prompt:'Who notices that Bear and Rascal may crash?',options:['Nola','Captain Fritz','Tony'],answer:'Nola'},
 {prompt:'Who stops Bear and Rascal?',options:['Bash','Tony','Captain Fritz'],answer:'Bash'},
 {prompt:'What does Tony suggest?',options:['Make kites for everyone','Hide the kite','Go home'],answer:'Make kites for everyone'},
 {prompt:'Who decides that Tony’s plan will work?',options:['Bash','Rascal','Bear'],answer:'Bash'},
 {prompt:'How does Captain Fritz help?',options:['He asks questions and lets the team solve it','He builds every kite himself','He takes the kite away'],answer:'He asks questions and lets the team solve it'}
];
if(level.reader2){
 level.reader2.pages=[
  {text:'Tony has an idea.'},
  {text:'Bash thinks about the idea.'},
  {text:'Bash says, “Let’s build six kites.”'},
  {text:'Nola checks the paper.'},
  {text:'Bear and Rascal tie the string.'},
  {text:'We make five regular kites and one big kite for Captain Fritz.'}
 ];
}
window.FRITZ_LESSON6_BEHAVIOR='53.10';
})();