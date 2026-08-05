/* Fritz Academy 53.1 — classroom rescue: reliable unlock + honest content + playable gate game */
(function(){
'use strict';

function unlock2A(save){
  if(!save) return;
  save.unlockedLevels=Array.isArray(save.unlockedLevels)?save.unlockedLevels:[];
  if(!save.unlockedLevels.includes('2-A')) save.unlockedLevels.push('2-A');
  if(typeof saveGame==='function') saveGame(save);
}

if(window.World){
  const oldPrepare=World.prototype.prepareSaveData;
  World.prototype.prepareSaveData=function(){
    oldPrepare.call(this);
    unlock2A(this.save);
  };
}
try{ if(typeof getSave==='function') unlock2A(getSave()); }catch(e){}

const level=typeof findLevel==='function'?findLevel('2-A'):null;
if(level){
  level.title='The Alphabet Gate Adventure';
  if(level.story&&Array.isArray(level.story.pages)&&level.story.pages[5]){
    level.story.pages[5].text='The bell rings when all eight letters are in order. The gate opens, and the Academy team cheers. Captain Fritz asks, “How did you solve it?”';
  }
  level.reader2={
    title:'Reader 2: Ask the Right Question',
    pages:[
      {text:'Captain Fritz asks, “Who found A and B?” Tony raises one paw.'},
      {text:'He asks, “What did Bear find?” Bear points to C and D.'},
      {text:'He asks, “Where was G?” Nola points under the green gate.'},
      {text:'He asks, “When did the gate open?” Bash says, “After the letters were in order.”'},
      {text:'He asks, “Why did everyone search?” Rascal says, “To open the gate!”'},
      {text:'He asks, “How did the team succeed?” Everyone says, “We worked together!”'}
    ],
    questions:[
      {prompt:'Which question word asks about a person?',options:['Who','Where','When'],answer:'Who'},
      {prompt:'Which question word asks about a place?',options:['Where','Why','How'],answer:'Where'},
      {prompt:'Which question word asks for a reason?',options:['Why','What','Who'],answer:'Why'}
    ],
    check:{prompt:'Which question word asks the way something happened?',options:['How','When','Where'],answer:'How'},
    rewardPiece:{id:'academy-team-banner',name:'Academy Team Banner',icon:'🏳️',area:'alphabet-gate',lesson:'2-A'}
  };
  level.build={areaId:'alphabet-gate',stage:1,title:'Unlock the Alphabet Gate',requiredPieces:['alphabet-gate','question-fountain','academy-team-banner'],completionMessage:'You placed A through H in order and unlocked the Alphabet Gate!'};
  level.completion=Object.assign({},level.completion,{message:'Adventure complete! You unlocked the Alphabet Gate and Level 2-B.'});
}

function addCss(){
 if(document.getElementById('fa531css'))return;
 const s=document.createElement('style');s.id='fa531css';s.textContent=`
 .fa531{position:fixed;inset:0;z-index:1000010;background:#071426eF;display:grid;place-items:center;font-family:Arial,sans-serif;padding:10px}
 .fa531box{width:min(1120px,98vw);height:min(760px,96vh);border:6px solid #f4c542;border-radius:24px;overflow:hidden;background:#fffdf2;display:grid;grid-template-rows:auto 1fr auto;box-shadow:0 24px 70px #000a}
 .fa531head{padding:13px 20px;background:linear-gradient(#fff5bd,#f3d266);border-bottom:4px solid #174ea6;text-align:center;color:#102342}.fa531head h1{margin:0;font-size:30px}.fa531head p{margin:5px 0 0;font-size:18px;font-weight:800}
 .fa531world{position:relative;background:url('assets/academy.png') center/cover no-repeat;display:grid;place-items:center;overflow:hidden}.fa531world:after{content:'';position:absolute;inset:0;background:#07142633}
 .fa531gate{position:relative;z-index:2;width:min(820px,88%);padding:26px;border:8px solid #d6a529;border-radius:28px;background:#102342e8;box-shadow:0 0 0 5px #fff0a4,0 16px 35px #0008}
 .fa531slots{display:grid;grid-template-columns:repeat(8,1fr);gap:10px}.fa531slot{height:92px;border:4px dashed #ffe68b;border-radius:16px;background:#fff2;display:grid;place-items:center;font-size:44px;font-weight:900;color:#fff}.fa531slot.filled{border-style:solid;background:linear-gradient(#ffe787,#e7a92b);color:#102342;border-color:#6e431a;animation:pop531 .25s ease}@keyframes pop531{50%{transform:scale(1.12)}}
 .fa531tray{position:relative;z-index:2;margin-top:28px;display:flex;justify-content:center;gap:12px;flex-wrap:wrap}.fa531letter{width:72px;height:72px;border:4px solid #102342;border-radius:14px;background:#fff;font-size:36px;font-weight:900;color:#102342;cursor:pointer;box-shadow:0 7px 0 #c99523}.fa531letter:active{transform:translateY(4px);box-shadow:0 3px 0 #c99523}.fa531letter.used{visibility:hidden}
 .fa531msg{position:relative;z-index:2;margin-top:18px;background:#fffdf2;border:4px solid #174ea6;border-radius:16px;padding:10px 18px;text-align:center;font-size:21px;font-weight:900;color:#102342}
 .fa531foot{padding:12px;background:#102342;text-align:center}.fa531finish{padding:12px 28px;border:3px solid #fff;border-radius:13px;background:#ffc63d;color:#102342;font-size:21px;font-weight:900;cursor:pointer;display:none}
 @media(max-width:800px){.fa531slots{gap:4px}.fa531slot{height:66px;font-size:31px}.fa531letter{width:54px;height:54px;font-size:28px}.fa531head h1{font-size:24px}}
 `;document.head.appendChild(s);
}

if(window.BuilderEngine){
  const oldShow=BuilderEngine.prototype.showBuilder;
  BuilderEngine.prototype.showBuilder=function(){
    if((this.lesson&&this.lesson.id)!=='2-A'&&this.lessonEngine?.levelId!=='2-A') return oldShow.call(this);
    addCss();document.querySelectorAll('.fa531').forEach(n=>n.remove());
    const letters='ABCDEFGH'.split('');let nextIndex=0;
    const o=document.createElement('div');o.className='fa531';
    o.innerHTML=`<section class="fa531box"><header class="fa531head"><h1>Unlock the Alphabet Gate</h1><p>Choose the letters in alphabetical order: A through H.</p></header><main class="fa531world"><div><div class="fa531gate"><div class="fa531slots">${letters.map(()=>'<div class="fa531slot">?</div>').join('')}</div></div><div class="fa531tray"></div><div class="fa531msg">Start with A. What comes next?</div></div></main><footer class="fa531foot"><button class="fa531finish">Open the Gate ➜</button></footer></section>`;
    const tray=o.querySelector('.fa531tray'),slots=[...o.querySelectorAll('.fa531slot')],msg=o.querySelector('.fa531msg'),finish=o.querySelector('.fa531finish');
    ['C','A','F','B','H','D','G','E'].forEach(letter=>{const b=document.createElement('button');b.className='fa531letter';b.textContent=letter;b.onclick=()=>{if(letter!==letters[nextIndex]){msg.textContent=`Not yet. Find ${letters[nextIndex]}.`;b.animate([{transform:'translateX(-7px)'},{transform:'translateX(7px)'},{transform:'translateX(0)'}],{duration:240});return;}slots[nextIndex].textContent=letter;slots[nextIndex].classList.add('filled');b.classList.add('used');nextIndex++;if(nextIndex===letters.length){msg.textContent='You did it! A through H are in order. The gate is unlocked!';finish.style.display='inline-block';}else msg.textContent=`Great! Now find ${letters[nextIndex]}.`;};tray.appendChild(b)});
    finish.onclick=()=>{o.remove();const save=this.scene.save;save.academyBuilds=save.academyBuilds||{};save.academyBuilds['alphabet-gate']=1;if(typeof saveGame==='function')saveGame(save);this.finish();};
    document.body.appendChild(o);
  };
}
window.FRITZ_CLASS_RESCUE='53.1';
})();