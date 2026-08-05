/* Fritz Academy 53.0 — stable classroom adventure layout using approved cast assets */
(function(){
'use strict';
const CAST={
 fritz:{name:'Captain Fritz',src:'assets/captain_fritz.png'},
 bash:{name:'Bash',src:'assets/bash.png'},
 bear:{name:'Bear',src:'assets/bear.png'},
 nola:{name:'Nola',src:'assets/nola.png'},
 rascal:{name:'Rascal',src:'assets/rascal.png'},
 tony:{name:'Tony',src:'assets/tony.png'}
};
const SCENES={
 story:[
  {focus:'fritz',prompt:'Captain Fritz asks: “What do you notice at the gate?”',clue:'Eight letter stones are missing.'},
  {focus:'tony',prompt:'Tony says, “I found A and B. Everyone follow me!”',clue:'The others look to Bash before moving.'},
  {focus:'bear',prompt:'Bear grins. “I found C and D near the door.”',clue:'Bear is being a little mischievous.'},
  {focus:'bash',prompt:'Bash carries E and F carefully.',clue:'Bash is the tallest puppy and has one floppy ear.'},
  {focus:'nola',prompt:'Nola finds G while Rascal searches for H.',clue:'Rascal may be getting into trouble again.'},
  {focus:'rascal',prompt:'The gate opens—and Rascal runs toward the field!',clue:'Captain Fritz asks, “How should we build our Academy?”'}
 ],
 reader1:[
  {focus:'tony',prompt:'WHO asks about a person.',clue:'Who found A and B? Tony did.'},
  {focus:'bear',prompt:'WHAT asks about a thing.',clue:'What did Bear find? C and D.'},
  {focus:'nola',prompt:'WHERE asks about a place.',clue:'Where were G and H? Near the gate.'},
  {focus:'fritz',prompt:'WHEN asks about time.',clue:'When did the gate open? After the letters were in order.'},
  {focus:'rascal',prompt:'WHY asks for a reason.',clue:'Why did they search? To open the gate.'},
  {focus:'bash',prompt:'HOW asks the way.',clue:'How did they succeed? They worked together.'}
 ],
 reader2:[
  {focus:'fritz',prompt:'Captain Fritz asks what the field could become.',clue:'The student gets to decide.'},
  {focus:'tony',prompt:'Tony has a plan and thinks everyone should follow it.',clue:'Everyone looks at Bash first.'},
  {focus:'bear',prompt:'Bear chooses a spot for the Alphabet Gate.',clue:'He is older than Bash, but smaller.'},
  {focus:'rascal',prompt:'Rascal tries to move the fountain by himself.',clue:'This may not go exactly as planned.'},
  {focus:'nola',prompt:'Nola protects the rewards from earlier lessons.',clue:'Nothing earned should be lost.'},
  {focus:'bash',prompt:'Bash gives the quiet nod. The team begins.',clue:'Now the Academy can grow.'}
 ]
};
function css(){
 if(document.getElementById('fa530css')) return;
 ['fa529css','fa527css','fa526css'].forEach(id=>{const old=document.getElementById(id);if(old)old.remove();});
 const s=document.createElement('style');
 s.id='fa530css';
 s.textContent=`
 .fa530{position:fixed;inset:0;z-index:1000010;background:#071426;display:grid;place-items:center;font-family:Arial,sans-serif;padding:6px;box-sizing:border-box}
 .fa530 *{box-sizing:border-box}
 .fa530game{width:min(1240px,99vw);height:min(850px,98vh);border:6px solid #f3c54b;border-radius:22px;overflow:hidden;background:#fffdf4;display:grid;grid-template-rows:58px minmax(0,1fr) 88px 70px 66px;box-shadow:0 24px 70px #0009}
 .fa530hud{display:flex;align-items:center;justify-content:space-between;padding:8px 18px;background:linear-gradient(#fff6c9,#f4d86f);border-bottom:4px solid #174ea6;color:#102342;overflow:hidden}.fa530hud h2{margin:0;font-size:23px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.fa530badge{background:#174ea6;color:#fff;border-radius:999px;padding:7px 13px;font-weight:900;white-space:nowrap}
 .fa530body{min-height:0;overflow:hidden;display:grid;grid-template-columns:minmax(0,1fr) 245px;background:#d9efff}
 .fa530scene{position:relative;min-width:0;min-height:0;overflow:hidden;background:url('assets/academy.png') center 42%/cover no-repeat}
 .fa530scene:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,255,255,.03),rgba(6,24,44,.08) 50%,rgba(6,24,44,.30));pointer-events:none}
 .fa530bubble{position:absolute;z-index:3;left:50%;top:14px;transform:translateX(-50%);width:min(690px,88%);background:#fffffff2;border:4px solid #174ea6;border-radius:19px;padding:9px 14px;text-align:center;color:#102342;font-size:20px;font-weight:900;box-shadow:0 6px 16px #0004}
 .fa530gate{position:absolute;z-index:1;left:50%;top:31%;transform:translateX(-50%);width:260px;height:105px;border:7px solid #e4b63d;border-radius:24px;background:rgba(20,40,68,.72);box-shadow:0 0 0 4px #fff4b2,0 10px 25px #0007;display:grid;place-items:center;color:#fff;font-size:31px;font-weight:900;letter-spacing:7px}
 .fa530stones{position:absolute;z-index:3;left:50%;top:58%;transform:translateX(-50%);display:flex;gap:6px}.fa530stone{width:42px;height:42px;border-radius:10px;background:linear-gradient(#ffe887,#e4a72c);border:3px solid #6f4318;display:grid;place-items:center;font-size:24px;font-weight:900;box-shadow:0 5px 10px #0005}
 .fa530clue{position:absolute;z-index:3;left:50%;bottom:12px;transform:translateX(-50%);width:min(650px,84%);background:#fff8d9f5;border:3px solid #d49a18;border-radius:15px;padding:8px 12px;text-align:center;color:#102342;font-size:16px;font-weight:850;box-shadow:0 6px 16px #0005}.fa530clue b{color:#174ea6;margin-right:8px}
 .fa530focus{min-width:0;min-height:0;overflow:hidden;background:linear-gradient(#17325a,#0e203d);border-left:4px solid #174ea6;display:grid;grid-template-rows:38px minmax(0,1fr) 38px;align-items:center;padding:7px;color:#fff}.fa530focus h3{text-align:center;margin:0;font-size:19px}.fa530portrait{align-self:stretch;justify-self:stretch;min-height:0;background:#fff;border:4px solid #f3c54b;border-radius:18px;overflow:hidden;display:grid;place-items:center;box-shadow:0 8px 18px #0007}.fa530portrait img{width:100%;height:100%;object-fit:contain;display:block}.fa530role{text-align:center;background:#f3c54b;color:#102342;border-radius:10px;padding:5px 7px;font-size:14px;font-weight:900}
 .fa530text{overflow:hidden;padding:10px 24px;display:grid;place-items:center;text-align:center;color:#102342;background:#fffdf4;border-top:4px solid #174ea6;font-size:21px;line-height:1.2;font-weight:850}
 .fa530team{overflow:hidden;background:#eaf2fb;border-top:3px solid #102342;display:flex;align-items:center;justify-content:center;gap:9px;padding:5px 10px}.fa530mini{width:78px;height:58px;background:#fff;border:2px solid #102342;border-radius:10px;display:grid;grid-template-columns:38px 1fr;align-items:center;overflow:hidden;padding:2px}.fa530mini.active{border-color:#f0b51d;box-shadow:0 0 0 3px #ffe48a}.fa530mini img{width:36px;height:50px;object-fit:contain}.fa530mini span{font-size:10px;font-weight:900;color:#102342;line-height:1.05;text-align:center}
 .fa530controls{display:flex;justify-content:center;align-items:center;gap:18px;padding:7px;background:#102342}.fa530controls button{padding:9px 22px;border:3px solid #fff;border-radius:12px;font-size:18px;font-weight:900;cursor:pointer}.fa530controls .read{background:#fff;color:#102342}.fa530controls .next{background:#ffc63d;color:#102342}
 @media(max-width:850px){.fa530game{grid-template-rows:52px minmax(0,1fr) 80px 62px 60px}.fa530body{grid-template-columns:minmax(0,1fr) 190px}.fa530hud h2{font-size:19px}.fa530bubble{font-size:16px}.fa530gate{width:210px;height:85px;font-size:25px}.fa530stone{width:32px;height:32px;font-size:19px}.fa530stones{gap:3px}.fa530text{font-size:18px}.fa530mini{width:62px;grid-template-columns:28px 1fr}.fa530mini img{width:27px;height:43px}}
 `;
 document.head.appendChild(s);
}
function clear(){document.querySelectorAll('.fa530,.fa529,.fa527,.fa526').forEach(n=>n.remove())}
function page(raw){return typeof raw==='string'?{text:raw}:{text:(raw&&raw.text)||''}}
function render(engine,collection,type,index,next,label){
 css();clear();
 const scene=(SCENES[type]||[])[index]||SCENES.story[0];
 const raw=page(collection.pages[index]);
 const focus=CAST[scene.focus]||CAST.fritz;
 const order=['fritz','tony','bear','bash','nola','rascal'];
 const o=document.createElement('div');o.className='fa530';
 o.innerHTML=`<section class="fa530game"><header class="fa530hud"><h2>${collection.title} — Page ${index+1} of ${collection.pages.length}</h2><span class="fa530badge">Adventure Mode</span></header><div class="fa530body"><main class="fa530scene"><div class="fa530bubble"></div><div class="fa530gate">A B C D</div><div class="fa530stones">${'ABCDEFGH'.split('').map(x=>`<span class="fa530stone">${x}</span>`).join('')}</div><div class="fa530clue"><b>CLUE</b><span></span></div></main><aside class="fa530focus"><h3></h3><div class="fa530portrait"><img></div><div class="fa530role">Academy Team</div></aside></div><div class="fa530text"></div><div class="fa530team"></div><footer class="fa530controls"><button class="read">🔊 Read Aloud</button><button class="next">${label} ➜</button></footer></section>`;
 o.querySelector('.fa530bubble').textContent=scene.prompt;
 o.querySelector('.fa530clue span').textContent=scene.clue;
 o.querySelector('.fa530focus h3').textContent=focus.name;
 const portrait=o.querySelector('.fa530portrait img');portrait.src=focus.src;portrait.alt=focus.name;
 o.querySelector('.fa530text').textContent=engine.lessonEngine.replaceName(raw.text);
 const team=o.querySelector('.fa530team');
 order.forEach(id=>{const c=CAST[id],d=document.createElement('div');d.className='fa530mini '+(id===scene.focus?'active':'');d.innerHTML=`<img src="${c.src}" alt="${c.name}"><span>${c.name}</span>`;team.appendChild(d)});
 o.querySelector('.read').onclick=()=>engine.lessonEngine.speakText(engine.lessonEngine.replaceName(raw.text));
 o.querySelector('.next').onclick=()=>{o.remove();next()};
 document.body.appendChild(o);
}
if(window.StoryEngine){StoryEngine.prototype.showPage=function(){if(!this.lesson||this.lesson.id!=='2-A')return;if(this.pageIndex>=this.story.pages.length){this.startQuestions();return}const last=this.pageIndex===this.story.pages.length-1;render(this,this.story,'story',this.pageIndex,()=>{this.pageIndex++;this.showPage()},last?'Story Check':'Next Page')}}
if(window.ReaderEngine){ReaderEngine.prototype.showPage=function(){if(!this.lesson||this.lesson.id!=='2-A')return;if(this.pageIndex>=this.reader.pages.length){this.startCheck();return}const key=this.readerKey||'reader1',last=this.pageIndex===this.reader.pages.length-1;render(this,this.reader,key,this.pageIndex,()=>{this.pageIndex++;this.showPage()},last?'Reader Check':'Next Page')}}
window.FRITZ_LESSON2A_APPROVED_CAST='53.0';
})();