/* Fritz Academy 52.7 — immersive classroom renderer using approved character PNGs */
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
  {focus:'tony',prompt:'Tony points proudly. “I found A and B!”',clue:'A is beside the apple. B is beside the blue ball.'},
  {focus:'bear',prompt:'Bear grins. “I found C and D near the door.”',clue:'Bear is being a little mischievous.'},
  {focus:'bash',prompt:'Bash carries E and F carefully.',clue:'Everyone looks to Bash before they move.'},
  {focus:'nola',prompt:'Nola finds G while Rascal noses around H.',clue:'Rascal may be getting into trouble again.'},
  {focus:'rascal',prompt:'The gate opens—and Rascal is already running toward the field!',clue:'Captain Fritz asks, “How should we build our Academy?”'}
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
  {focus:'fritz',prompt:'Captain Fritz asks what the new field could become.',clue:'The student gets to decide.'},
  {focus:'tony',prompt:'Tony has a plan and thinks everyone should follow it.',clue:'Everyone looks at Bash first.'},
  {focus:'bear',prompt:'Bear chooses a spot for the Alphabet Gate.',clue:'He is smaller than Bash but older.'},
  {focus:'rascal',prompt:'Rascal tries to move the Question Fountain by himself.',clue:'This may not go exactly as planned.'},
  {focus:'nola',prompt:'Nola protects the earlier rewards.',clue:'Nothing earned should be lost.'},
  {focus:'bash',prompt:'Bash gives the quiet nod. The team begins.',clue:'Now the Academy can grow.'}
 ]
};
function css(){if(document.getElementById('fa527css'))return;const s=document.createElement('style');s.id='fa527css';s.textContent=`
.fa527{position:fixed;inset:0;z-index:1000002;background:#071426;display:grid;place-items:center;font-family:Arial,sans-serif;padding:8px}
.fa527game{width:min(1240px,99vw);height:min(850px,98vh);border:6px solid #f3c54b;border-radius:24px;overflow:hidden;display:grid;grid-template-rows:auto 1fr auto;background:#102342;box-shadow:0 24px 70px #0009}
.fa527hud{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 18px;background:linear-gradient(180deg,#fff6c9,#f4d86f);color:#102342;border-bottom:4px solid #174ea6}.fa527hud h2{margin:0;font-size:24px}.fa527badge{background:#174ea6;color:white;border-radius:999px;padding:7px 13px;font-weight:900}
.fa527world{position:relative;overflow:hidden;background:url('assets/academy.png') center 35%/cover no-repeat;isolation:isolate}
.fa527world:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(4,20,40,.02),rgba(4,20,40,.14) 52%,rgba(4,20,40,.58));z-index:-1}
.fa527gate{position:absolute;left:50%;top:9%;transform:translateX(-50%);width:270px;height:110px;border:8px solid #e4b63d;border-radius:28px;background:rgba(20,40,68,.62);box-shadow:0 0 0 4px #fff4b2,0 10px 30px #0007;display:grid;place-items:center;color:white;font-size:38px;font-weight:900;letter-spacing:8px}
.fa527stones{position:absolute;left:50%;top:30%;transform:translateX(-50%);display:flex;gap:8px}.fa527stone{width:48px;height:48px;border-radius:12px;background:linear-gradient(#ffe887,#e4a72c);border:4px solid #6f4318;display:grid;place-items:center;font-size:28px;font-weight:900;box-shadow:0 6px 12px #0005;animation:float527 2.4s ease-in-out infinite}.fa527stone:nth-child(even){animation-delay:.5s}@keyframes float527{50%{transform:translateY(-7px)}}
.fa527char{position:absolute;bottom:6%;filter:drop-shadow(0 14px 14px #0008);transition:.25s;transform-origin:center bottom}.fa527char img{height:100%;max-width:100%;object-fit:contain}.fa527char.focus{filter:drop-shadow(0 0 12px #ffd84c) drop-shadow(0 16px 14px #0008);animation:pulse527 1.5s ease-in-out infinite}@keyframes pulse527{50%{transform:scale(1.045)}}
.fa527char .tag{position:absolute;left:50%;bottom:-6px;transform:translateX(-50%);background:#fff6c9;border:3px solid #102342;border-radius:12px;padding:4px 10px;font-size:13px;font-weight:900;white-space:nowrap}
.fa527-fritz{left:5%;height:260px}.fa527-tony{left:22%;height:170px}.fa527-bear{left:35%;height:220px}.fa527-bash{left:49%;height:305px}.fa527-nola{left:66%;height:260px}.fa527-rascal{left:83%;height:230px}
.fa527bubble{position:absolute;left:50%;top:3%;transform:translateX(-50%);width:min(720px,76%);background:rgba(255,255,255,.96);border:5px solid #174ea6;border-radius:24px;padding:13px 18px;text-align:center;color:#102342;font-size:22px;font-weight:900;box-shadow:0 8px 22px #0004}
.fa527clue{position:absolute;right:2%;top:42%;width:250px;background:rgba(255,248,214,.96);border:4px solid #d49a18;border-radius:18px;padding:12px;color:#102342;font-size:17px;font-weight:800;box-shadow:0 8px 20px #0005}.fa527clue b{display:block;color:#174ea6;margin-bottom:5px}
.fa527text{background:#fffdf4;color:#102342;padding:13px 28px;text-align:center;font-size:25px;line-height:1.25;font-weight:850;border-top:4px solid #174ea6}
.fa527controls{display:flex;justify-content:center;gap:18px;padding:10px;background:#102342}.fa527controls button{padding:12px 24px;border:3px solid white;border-radius:13px;font-size:19px;font-weight:900;cursor:pointer}.fa527controls .read{background:white;color:#102342}.fa527controls .next{background:#ffc63d;color:#102342}
@media(max-width:850px){.fa527-fritz{height:205px}.fa527-tony{height:130px}.fa527-bear{height:170px}.fa527-bash{height:235px}.fa527-nola{height:205px}.fa527-rascal{height:180px}.fa527clue{display:none}.fa527bubble{font-size:18px}.fa527text{font-size:20px}}
`;document.head.appendChild(s)}
function clear(){document.querySelectorAll('.fa527,.fa526').forEach(n=>n.remove())}
function p(raw){return typeof raw==='string'?{text:raw}:{text:(raw&&raw.text)||''}}
function render(engine,collection,type,index,next,label){css();clear();const scene=(SCENES[type]||[])[index]||SCENES.story[0];const raw=p(collection.pages[index]);const o=document.createElement('div');o.className='fa527';o.innerHTML=`<section class="fa527game"><header class="fa527hud"><h2>${collection.title} — Page ${index+1} of ${collection.pages.length}</h2><span class="fa527badge">Adventure Mode</span></header><main class="fa527world"><div class="fa527bubble">${scene.prompt}</div><div class="fa527gate">A B C D</div><div class="fa527stones">${'ABCDEFGH'.split('').map(x=>`<span class="fa527stone">${x}</span>`).join('')}</div><div class="fa527clue"><b>CLUE</b>${scene.clue}</div></main><div class="fa527text"></div><footer class="fa527controls"><button class="read">🔊 Read Aloud</button><button class="next">${label} ➜</button></footer></section>`;
 const world=o.querySelector('.fa527world');
 const order=['fritz','tony','bear','bash','nola','rascal'];
 order.forEach(id=>{const c=CAST[id],d=document.createElement('div');d.className=`fa527char fa527-${id} ${scene.focus===id?'focus':''}`;d.innerHTML=`<img src="${c.src}" alt="${c.name}"><div class="tag">${c.name}</div>`;world.appendChild(d)});
 o.querySelector('.fa527text').textContent=engine.lessonEngine.replaceName(raw.text);
 o.querySelector('.read').onclick=()=>engine.lessonEngine.speakText(engine.lessonEngine.replaceName(raw.text));
 o.querySelector('.next').onclick=()=>{o.remove();next()};document.body.appendChild(o)
}
if(window.StoryEngine){StoryEngine.prototype.showPage=function(){if(!this.lesson||this.lesson.id!=='2-A')return;if(this.pageIndex>=this.story.pages.length){this.startQuestions();return}const last=this.pageIndex===this.story.pages.length-1;render(this,this.story,'story',this.pageIndex,()=>{this.pageIndex++;this.showPage()},last?'Story Check':'Next Page')}}
if(window.ReaderEngine){ReaderEngine.prototype.showPage=function(){if(!this.lesson||this.lesson.id!=='2-A')return;if(this.pageIndex>=this.reader.pages.length){this.startCheck();return}const key=this.readerKey||'reader1',last=this.pageIndex===this.reader.pages.length-1;render(this,this.reader,key,this.pageIndex,()=>{this.pageIndex++;this.showPage()},last?'Reader Check':'Next Page')}}
window.FRITZ_LESSON2A_APPROVED_CAST='52.7';
})();