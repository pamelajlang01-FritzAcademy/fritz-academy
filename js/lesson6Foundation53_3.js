/* Fritz Academy 53.3 — Lesson 6 foundation: easier reading + I-P gameplay */
(function(){
'use strict';
const level=typeof findLevel==='function'?findLevel('2-B'):null;
if(!level)return;
const reward=(id,name,icon)=>({id,name,icon,area:'academy-world',lesson:'2-B'});
Object.assign(level,{
 title:'The Missing Letter Trail',
 chapter:'Week 2',
 objectives:{
  speaking:['Say the letters I through P.','Use short answers with who, what, and where.'],
  reading:['Read short patterned sentences.','Recognize I through P in words and signs.'],
  phonics:['Review the names and beginning sounds of I, J, K, L, M, N, O, and P.']
 },
 feelingChoices:[
  {id:'happy',label:'I am happy.',emoji:'😀'},
  {id:'excited',label:'I am excited.',emoji:'🤩'},
  {id:'fine',label:'I am fine.',emoji:'🙂'},
  {id:'tired',label:'I am tired.',emoji:'😴'},
  {id:'sad',label:'I am sad.',emoji:'😢'},
  {id:'nervous',label:'I am nervous.',emoji:'😟'}
 ],
 story:{
  title:'The Missing Letter Trail',
  pages:[
   {text:'Captain Fritz sees a trail of signs. The first sign says I.'},
   {text:'Tony finds J by a jar. “I found J,” he says.'},
   {text:'Bear finds K by a kite. Rascal tries to grab the kite.'},
   {text:'Bash finds L and M. He waits for the team before moving them.'},
   {text:'Nola finds N and O near an orange tree.'},
   {text:'Rascal finds P in a puddle. Captain Fritz asks, “How can we put the letters in order?”'}
  ],
  questions:[
   {prompt:'Who finds J?',options:['Tony','Nola','Captain Fritz'],answer:'Tony'},
   {prompt:'What is near K?',options:['A kite','A jar','A puddle'],answer:'A kite'},
   {prompt:'Where is P?',options:['In a puddle','In a tree','On a chair'],answer:'In a puddle'},
   {prompt:'What must the team do?',options:['Put I through P in order','Hide the letters','Leave the trail'],answer:'Put I through P in order'}
  ],
  rewardPiece:reward('letter-trail-sign','Letter Trail Sign','🪧')
 },
 alphabetSong:{
  title:'Fritz Academy Alphabet Song',
  rewardMessage:'Sing and listen for I through P.',
  assetPath:'assets/alphabet-song-small.mp4',
  videoPath:'assets/alphabet-song-small.mp4'
 },
 phonics:{
  letterUpper:'I J K L M N O P',letterLower:'i j k l m n o p',soundLabel:'I through P',
  teacherCue:'Say each letter, then one word: insect, jar, kite, leaf, moon, nest, orange, puddle.',
  examples:[
   {word:'insect',icon:'🐞'},{word:'jar',icon:'🫙'},{word:'kite',icon:'🪁'},{word:'leaf',icon:'🍃'},
   {word:'moon',icon:'🌙'},{word:'nest',icon:'🪺'},{word:'orange',icon:'🍊'},{word:'puddle',icon:'💧'}
  ],
  recognitionQuestion:{prompt:'Which set is I through P?',options:['I J K L M N O P','A B C D','Q R S T'],answer:'I J K L M N O P'},
  lowercaseQuestion:{prompt:'Which set matches in lowercase?',options:['i j k l m n o p','a b c d','q r s t'],answer:'i j k l m n o p'},
  wordQuestion:{prompt:'Which word begins with P?',options:['puddle','orange','nest'],answer:'puddle'},
  rewardPiece:reward('ip-letter-stones','I–P Letter Stones','🔤')
 },
 reader1:{
  title:'Reader 1: The Kite',level:'Easy',
  pages:[
   {text:'I see a kite.'},
   {text:'The kite is by a leaf.'},
   {text:'Bear has the kite.'},
   {text:'Rascal wants the kite.'},
   {text:'Bash says, “Wait.”'}
  ],
  check:{prompt:'Who has the kite?',options:['Bear','Tony','Nola'],answer:'Bear'},
  rewardPiece:reward('kite-tree','Kite Tree','🪁')
 },
 reader2:{
  title:'Reader 2: The Orange and the Puddle',level:'Easy Plus',
  pages:[
   {text:'Nola sees an orange.'},
   {text:'The orange is near a puddle.'},
   {text:'Rascal runs to the puddle.'},
   {text:'Splash! The team laughs.'},
   {text:'Captain Fritz asks, “Where is the orange now?”'}
  ],
  check:{prompt:'Where is the orange?',options:['Near the puddle','By the kite','In the jar'],answer:'Near the puddle'},
  rewardPiece:reward('orange-puddle-garden','Orange Puddle Garden','🍊')
 },
 build:{
  areaId:'academy-world',stage:6,title:'Add the Letter Trail',
  requiredPieces:['letter-trail-sign','ip-letter-stones','kite-tree','orange-puddle-garden'],
  completionMessage:'Your Letter Trail has been added to your Academy.'
 },
 closingSong:{title:'Fritz Academy Welcome Song',assetPath:'assets/welcome-song-small.mp4',videoPath:'assets/welcome-song-small.mp4',rewardMessage:'Celebrate the new I–P trail.'},
 completion:{xp:40,stars:2,unlocks:'2-C',message:'Lesson 6 complete! The next Academy adventure is unlocked.'}
});

function css(){if(document.getElementById('fa533css'))return;const s=document.createElement('style');s.id='fa533css';s.textContent=`
.fa533{position:fixed;inset:0;z-index:1000015;background:#071426ee;display:grid;place-items:center;font-family:Arial,sans-serif;padding:10px}.fa533box{width:min(1080px,98vw);height:min(740px,96vh);background:#fffdf2;border:6px solid #f4c542;border-radius:24px;overflow:hidden;display:grid;grid-template-rows:auto 1fr auto}.fa533head{background:linear-gradient(#fff4b8,#efd05e);padding:14px;text-align:center;color:#102342;border-bottom:4px solid #174ea6}.fa533head h1{margin:0}.fa533play{background:url('assets/academy.png') center/cover no-repeat;display:grid;place-items:center;position:relative}.fa533panel{width:min(850px,90%);background:#102342e8;border:6px solid #ffe28a;border-radius:24px;padding:26px;box-shadow:0 18px 36px #0008}.fa533slots{display:grid;grid-template-columns:repeat(8,1fr);gap:9px}.fa533slot{height:78px;border:4px dashed #ffe28a;border-radius:14px;display:grid;place-items:center;color:white;font-size:37px;font-weight:900}.fa533slot.on{background:linear-gradient(#ffe783,#e5a92d);border-style:solid;border-color:#704716;color:#102342}.fa533tray{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin-top:26px}.fa533letter{width:66px;height:66px;border:4px solid #102342;border-radius:13px;background:white;color:#102342;font-size:32px;font-weight:900;cursor:pointer;box-shadow:0 6px 0 #c58f1b}.fa533letter.used{visibility:hidden}.fa533msg{margin-top:20px;background:#fff;border:4px solid #174ea6;border-radius:14px;padding:10px;text-align:center;font-size:20px;font-weight:900;color:#102342}.fa533foot{background:#102342;text-align:center;padding:12px}.fa533go{display:none;padding:12px 28px;border:3px solid white;border-radius:12px;background:#ffc63d;font-size:21px;font-weight:900}
`;document.head.appendChild(s)}
if(typeof LessonEngine!=='undefined'){
 const old=LessonEngine.prototype.showPhonics;
 LessonEngine.prototype.showPhonics=function(){
  if(this.levelId!=='2-B')return old.call(this);
  this.stopMedia();this.setSection('phonics');css();document.querySelectorAll('.fa533').forEach(n=>n.remove());
  const letters='IJKLMNOP'.split('');let idx=0;const o=document.createElement('div');o.className='fa533';o.innerHTML=`<section class="fa533box"><header class="fa533head"><h1>Follow the Missing Letter Trail</h1><p>Choose I through P in order.</p></header><main class="fa533play"><div class="fa533panel"><div class="fa533slots">${letters.map(()=>'<div class="fa533slot">?</div>').join('')}</div><div class="fa533tray"></div><div class="fa533msg">Find I first.</div></div></main><footer class="fa533foot"><button class="fa533go">Continue to Reader 1 ➜</button></footer></section>`;
  const slots=[...o.querySelectorAll('.fa533slot')],tray=o.querySelector('.fa533tray'),msg=o.querySelector('.fa533msg'),go=o.querySelector('.fa533go');
  ['L','I','P','J','N','K','O','M'].forEach(letter=>{const b=document.createElement('button');b.className='fa533letter';b.textContent=letter;b.onclick=()=>{if(letter!==letters[idx]){msg.textContent=`Look again. Find ${letters[idx]}.`;return;}slots[idx].textContent=letter;slots[idx].classList.add('on');b.classList.add('used');idx++;if(idx===letters.length){msg.textContent='Excellent! I through P are in order.';go.style.display='inline-block';}else msg.textContent=`Good. Now find ${letters[idx]}.`;};tray.appendChild(b)});
  go.onclick=()=>{o.remove();this.rewardPiece(this.lesson.phonics.rewardPiece,'You completed the I–P letter trail!',()=>this.startReader(this.lesson.reader1,'reader1'));};document.body.appendChild(o);
 };
}
window.FRITZ_LESSON6_FOUNDATION='53.3';
})();