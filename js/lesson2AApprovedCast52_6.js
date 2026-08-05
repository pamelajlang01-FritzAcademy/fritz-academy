/* Fritz Academy 52.9 — clean classroom adventure renderer using approved cast assets */
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
 if(document.getElementById('fa529css')) return;
 const s=document.createElement('style');
 s.id='fa529css';
 s.textContent=`
 .fa529{position:fixed;inset:0;z-index:1000005;background:#071426;display:grid;place-items:center;font-family:Arial,sans-serif;padding:8px}
 .fa529game{width:min(1240px,99vw);height:min(850px,98vh);border:6px solid #f3c54b;border-radius:24px;overflow:hidden;background:#fffdf4;display:grid;grid-template-rows:auto 1fr auto auto;box-shadow:0 24px 70px #0009}
 .fa529hud{display:flex;align-items:center;justify-content:space-between;padding:10px 18px;background:linear-gradient(#fff6c9,#f4d86f);border-bottom:4px solid #174ea6;color:#102342}.fa529hud h2{margin:0;font-size:24px}.fa529badge{background:#174ea6;color:#fff;border-radius:999px;padding:7px 13px;font-weight:900}
 .fa529body{min-height:0;display:grid;grid-template-columns:1fr 270px;background:#d9efff}
 .fa529scene{position:relative;min-width:0;overflow:hidden;background:url('assets/academy.png') center 42%/cover no-repeat}
 .fa529scene:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,255,255,.03),rgba(6,24,44,.08) 50%,rgba(6,24,44,.38));pointer-events:none}
 .fa529bubble{position:absolute;z-index:2;left:50%;top:18px;transform:translateX(-50%);width:min(680px,86%);background:#ffffffee;border:5px solid #174ea6;border-radius:22px;padding:12px 16px;text-align:center;color:#102342;font-size:22px;font-weight:900;box-shadow:0 8px 20px #0004}
 .fa529gate{position:absolute;z-index:1;left:50%;top:31%;transform:translateX(-50%);width:290px;height:130px;border:8px solid #e4b63d;border-radius:28px;background:rgba(20,40,68,.72);box-shadow:0 0 0 4px #fff4b2,0 10px 30px #0007;display:grid;place-items:center;color:#fff;font-size:35px;font-weight:900;letter-spacing:8px}
 .fa529stones{position:absolute;z-index:2;left:50%;top:59%;transform:translateX(-50%);display:flex;gap:8px}.fa529stone{width:46px;height:46px;border-radius:12px;background:linear-gradient(#ffe887,#e4a72c);border:4px solid #6f4318;display:grid;place-items:center;font-size:27px;font-weight:900;box-shadow:0 6px 12px #0005}
 .fa529clue{position:absolute;z-index:2;left:50%;bottom:18px;transform:translateX(-50%);width:min(640px,82%);background:#fff8d9ee;border:4px solid #d49a18;border-radius:16px;padding:10px 14px;text-align:center;color:#102342;font-size:17px;font-weight:850;box-shadow:0 8px 20px #0005}.fa529clue b{color:#174ea6;margin-right:8px}
 .fa529focus{background:linear-gradient(#17325a,#0e203d);border-left:4px solid #174ea6;display:grid;grid-template-rows:auto 1fr auto;align-items:center;padding:10px;color:#fff;min-width:0}
 .fa529focus h3{text-align:center;margin:2px 0 6px;font-size:20px}.fa529portrait{align-self:center;justify-self:center;width:220px;height:330px;background:#fff;border:5px solid #f3c54b;border-radius:22px;overflow:hidden;display:grid;place-items:end center;box-shadow:0 10px 24px #0008}.fa529portrait img{max-width:100%;max-height:100%;object-fit:contain;display:block}.fa529role{text-align:center;background:#f3c54b;color:#102342;border-radius:12px;padding:7px 9px;font-size:15px;font-weight:900}
 .fa529text{padding:13px 28px;text-align:center;color:#102342;background:#fffdf4;border-top:4px solid #174ea6;font-size:24px;line-height:1.25;font-weight:850}
 .fa529team{height:92px;background:#eaf2fb;border-top:3px solid #102342;display:flex;align-items:center;justify-content:center;gap:12px;padding:6px 12px;overflow:hidden}.fa529mini{width:86px;height:76px;background:#fff;border:3px solid #102342;border-radius:12px;display:grid;grid-template-rows:1fr auto;place-items:center;overflow:hidden}.fa529mini.active{border-color:#f0b51d;box-shadow:0 0 0 4px #ffe48a}.fa529mini img{max-width:72px;max-height:54px;object-fit:contain}.fa529mini span{font-size:11px;font-weight:900;color:#102342;padding-bottom:2px}
 .fa529controls{display:flex;justify-content:center;gap:18px;padding:10px;background:#102342}.fa529controls button{padding:11px 23px;border:3px solid #fff;border-radius:13px;font-size:19px;font-weight:900;cursor:pointer}.fa529controls .read{background:#fff;color:#102342}.fa529controls .next{background:#ffc63d;color:#102342}
 @media(max-width:850px){.fa529body{grid-template-columns:1fr 205px}.fa529portrait{width:165px;height:250px}.fa529stones{gap:4px}.fa529stone{width:36px;height:36px;font-size:21px}.fa529text{font-size:19px}.fa529bubble{font-size:18px}.fa529team{gap:5px}.fa529mini{width:65px}}
 `;
 document.head.appendChild(s);
}
function clear(){document.querySelectorAll('.fa529,.fa527,.fa526').forEach(n=>n.remove())}
function page(raw){return typeof raw==='string'?{text:raw}:{text:(raw&&raw.text)||''}}
function render(engine,collection,type,index,next,label){
 css();clear();
 const scene=(SCENES[type]||[])[index]||SCENES.story[0];
 const raw=page(collection.pages[index]);
 const focus=CAST[scene.focus]||CAST.fritz;
 const order=['fritz','tony','bear','bash','nola','rascal'];
 const o=document.createElement('div');o.className='fa529';
 o.innerHTML=`<section class="fa529game"><header class="fa529hud"><h2>${collection.title} — Page ${index+1} of ${collection.pages.length}</h2><span class="fa529badge">Adventure Mode</span></header><div class="fa529body"><main class="fa529scene"><div class="fa529bubble"></div><div class="fa529gate">A B C D</div><div class="fa529stones">${'ABCDEFGH'.split('').map(x=>`<span class="fa529stone">${x}</span>`).join('')}</div><div class="fa529clue"><b>CLUE</b><span></span></div></main><aside class="fa529focus"><h3></h3><div class="fa529portrait"><img></div><div class="fa529role">Academy Team</div></aside></div><div class="fa529text"></div><div class="fa529team"></div><footer class="fa529controls"><button class="read">🔊 Read Aloud</button><button class="next">${label} ➜</button></footer></section>`;
 o.querySelector('.fa529bubble').textContent=scene.prompt;
 o.querySelector('.fa529clue span').textContent=scene.clue;
 o.querySelector('.fa529focus h3').textContent=focus.name;
 o.querySelector('.fa529portrait img').src=focus.src;
 o.querySelector('.fa529portrait img').alt=focus.name;
 o.querySelector('.fa529text').textContent=engine.lessonEngine.replaceName(raw.text);
 const team=o.querySelector('.fa529team');
 order.forEach(id=>{const c=CAST[id],d=document.createElement('div');d.className='fa529mini '+(id===scene.focus?'active':'');d.innerHTML=`<img src="${c.src}" alt="${c.name}"><span>${c.name}</span>`;team.appendChild(d)});
 o.querySelector('.read').onclick=()=>engine.lessonEngine.speakText(engine.lessonEngine.replaceName(raw.text));
 o.querySelector('.next').onclick=()=>{o.remove();next()};
 document.body.appendChild(o);
}
if(window.StoryEngine){StoryEngine.prototype.showPage=function(){if(!this.lesson||this.lesson.id!=='2-A')return;if(this.pageIndex>=this.story.pages.length){this.startQuestions();return}const last=this.pageIndex===this.story.pages.length-1;render(this,this.story,'story',this.pageIndex,()=>{this.pageIndex++;this.showPage()},last?'Story Check':'Next Page')}}
if(window.ReaderEngine){ReaderEngine.prototype.showPage=function(){if(!this.lesson||this.lesson.id!=='2-A')return;if(this.pageIndex>=this.reader.pages.length){this.startCheck();return}const key=this.readerKey||'reader1',last=this.pageIndex===this.reader.pages.length-1;render(this,this.reader,key,this.pageIndex,()=>{this.pageIndex++;this.showPage()},last?'Reader Check':'Next Page')}}
window.FRITZ_LESSON2A_APPROVED_CAST='52.9';
})();