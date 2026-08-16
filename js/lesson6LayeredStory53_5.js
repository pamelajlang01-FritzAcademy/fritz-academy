/* Fritz Academy 53.10 — layered Lesson 6 story presentation */
(function(){
'use strict';

const LEVEL_ID='2-B';
const APPROVED={
  captainFritz:'assets/characters/approved/captain-fritz/nautical-idle.webp',
  bash:'assets/characters/approved/bash/sweatsuit-idle.webp',
  bear:'assets/characters/approved/bear/sweatsuit-idle.webp',
  nola:'assets/characters/approved/nola/sweatsuit-idle.webp',
  rascal:'assets/characters/approved/rascal/sweatsuit-idle.webp',
  tony:'assets/characters/approved/tony/sweatsuit-idle.webp'
};

const scenes=[
  {env:'assets/environments/welcome-garden-open.svg',chars:[['bear','22%','63%','18','bob'],['captainFritz','78%','62%','17','idle']],props:['kite'],focus:'bear'},
  {env:'assets/environments/welcome-garden-open.svg',chars:[['bear','38%','64%','18','runRight'],['rascal','62%','65%','16','runLeft']],props:['kite'],focus:'rascal'},
  {env:'assets/environments/question-garden-premium.svg',chars:[['bear','44%','65%','18','runRight'],['rascal','57%','65%','16','runLeft'],['nola','18%','63%','17','worry']],props:['kite'],focus:'nola'},
  {env:'assets/environments/question-garden-premium.svg',chars:[['nola','24%','63%','17','runRight'],['bash','58%','61%','21','idle'],['tony','78%','68%','13','idle']],props:[],focus:'nola'},
  {env:'assets/environments/question-garden-premium.svg',chars:[['bear','35%','65%','18','skid'],['bash','50%','60%','21','stop'],['rascal','65%','65%','16','skid']],props:['kite'],focus:'bash'},
  {env:'assets/academy.png',chars:[['tony','23%','68%','13','explain'],['bash','43%','61%','21','carry'],['bear','62%','65%','18','idle'],['rascal','76%','66%','16','idle']],props:['plans'],focus:'tony'},
  {env:'assets/academy.png',chars:[['captainFritz','18%','61%','17','think'],['tony','38%','68%','13','explain'],['bash','58%','61%','21','idle'],['nola','76%','63%','17','idle']],props:['plans'],focus:'bash'},
  {env:'assets/academy.png',chars:[['tony','18%','68%','13','explain'],['bash','36%','61%','21','carry'],['nola','54%','63%','17','idle'],['bear','70%','65%','18','work'],['rascal','83%','66%','16','work']],props:['workshop'],focus:'bash'},
  {env:'assets/academy.png',chars:[['captainFritz','20%','61%','17','celebrate'],['bash','39%','61%','21','celebrate'],['nola','56%','63%','17','celebrate'],['bear','70%','65%','18','celebrate'],['rascal','83%','66%','16','celebrate'],['tony','10%','68%','13','celebrate']],props:['sixKites'],focus:'captainFritz'}
];

function addCss(){
 if(document.getElementById('fa535css'))return;
 const s=document.createElement('style');s.id='fa535css';s.textContent=`
 .fa535{position:fixed;inset:0;z-index:1000030;background:#071426f2;display:grid;place-items:center;padding:8px;font-family:Arial,sans-serif}
 .fa535book{width:min(1180px,99vw);height:min(820px,98vh);background:#fffdf3;border:6px solid #e8b935;border-radius:24px;overflow:hidden;display:grid;grid-template-rows:auto minmax(330px,1fr) auto auto;box-shadow:0 24px 70px #000a}
 .fa535head{padding:10px 18px;background:linear-gradient(#fff4b4,#e9c553);border-bottom:4px solid #173f78;color:#102342;display:flex;justify-content:space-between;align-items:center}.fa535head h1{margin:0;font-size:25px}.fa535page{font-weight:900}
 .fa535scene{position:relative;overflow:hidden;background:#acd6ef}.fa535env{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.fa535shade{position:absolute;inset:0;background:linear-gradient(transparent 62%,#0b1d3655)}
 .fa535char{position:absolute;transform:translate(-50%,-100%);object-fit:contain;filter:drop-shadow(0 8px 7px #0006);transform-origin:50% 100%}.fa535char.missing{display:none}
 .fa535missing{position:absolute;transform:translate(-50%,-100%);padding:8px 12px;background:#fff9;border:3px solid #173f78;border-radius:12px;color:#102342;font-weight:900;font-size:13px;text-align:center;max-width:115px}
 .fa535kite{position:absolute;left:52%;top:14%;width:72px;height:92px;background:linear-gradient(135deg,#ffd44e 50%,#53aef2 50%);clip-path:polygon(50% 0,100% 44%,50% 100%,0 44%);animation:kite535 2s ease-in-out infinite}.fa535kite:after{content:'';position:absolute;width:3px;height:110px;background:#704821;left:49%;top:82%}@keyframes kite535{50%{transform:translate(18px,-10px) rotate(4deg)}}
 .fa535plans{position:absolute;left:49%;bottom:8%;width:150px;height:88px;background:#dff3ff;border:4px solid #356a9f;transform:rotate(-4deg);box-shadow:0 8px 18px #0005}.fa535plans:before{content:'KITE PLAN';position:absolute;inset:12px;border:2px dashed #356a9f;display:grid;place-items:center;color:#356a9f;font-weight:900}
 .fa535workshop{position:absolute;left:40%;right:8%;bottom:5%;height:84px;background:#925f34;border:5px solid #5a361e;border-radius:8px;box-shadow:0 10px 16px #0006}.fa535workshop:before{content:'paper   sticks   string   ribbon';position:absolute;inset:10px;background:#f4e4b5;border-radius:6px;display:grid;place-items:center;color:#50351f;font-weight:900}
 .fa535six{position:absolute;inset:5% 4% 35%;pointer-events:none}.fa535six span{position:absolute;width:48px;height:64px;background:linear-gradient(135deg,#ffcc46 50%,#5db6ef 50%);clip-path:polygon(50% 0,100% 44%,50% 100%,0 44%);animation:kite535 2.2s ease-in-out infinite}.fa535six span:nth-child(1){left:6%;top:18%}.fa535six span:nth-child(2){left:22%;top:2%;animation-delay:.2s}.fa535six span:nth-child(3){left:39%;top:14%;animation-delay:.4s}.fa535six span:nth-child(4){left:56%;top:0;animation-delay:.6s}.fa535six span:nth-child(5){left:72%;top:17%;animation-delay:.8s}.fa535six span:nth-child(6){left:88%;top:2%;width:68px;height:88px;animation-delay:1s}
 .fa535journal{background:linear-gradient(#fffdf6,#f4e6c5);border-top:5px solid #7c5429;padding:15px 20px;min-height:145px;color:#17243b}.fa535journal h2{margin:0 0 6px;font-size:20px;color:#704821}.fa535text{font-size:24px;font-weight:800;line-height:1.35;max-width:1000px;margin:auto;text-align:center}
 .fa535controls{background:#102342;padding:10px;display:flex;justify-content:center;gap:18px}.fa535btn{padding:10px 22px;border:3px solid #fff;border-radius:12px;background:#f7c63b;color:#102342;font-size:18px;font-weight:900;cursor:pointer}.fa535btn.secondary{background:#fff}
 @keyframes bob535{50%{transform:translate(-50%,calc(-100% - 6px))}}@keyframes idle535{50%{transform:translate(-50%,calc(-100% - 3px)) scale(1.01)}}@keyframes runR535{50%{transform:translate(calc(-50% + 18px),calc(-100% - 3px)) rotate(2deg)}}@keyframes runL535{50%{transform:translate(calc(-50% - 18px),calc(-100% - 3px)) rotate(-2deg)}}@keyframes worry535{50%{transform:translate(-50%,-100%) rotate(-2deg)}}@keyframes stop535{50%{transform:translate(-50%,-100%) scale(1.035)}}@keyframes skid535{50%{transform:translate(-50%,-100%) rotate(3deg)}}@keyframes explain535{50%{transform:translate(-50%,calc(-100% - 4px)) rotate(1deg)}}@keyframes carry535{50%{transform:translate(-50%,calc(-100% - 4px))}}@keyframes celebrate535{50%{transform:translate(-50%,calc(-100% - 10px)) rotate(2deg)}}
 .bob{animation:bob535 1.7s ease-in-out infinite}.idle{animation:idle535 2.3s ease-in-out infinite}.runRight{animation:runR535 .75s ease-in-out infinite}.runLeft{animation:runL535 .75s ease-in-out infinite}.worry{animation:worry535 .8s ease-in-out infinite}.stop{animation:stop535 1s ease-in-out infinite}.skid{animation:skid535 .55s ease-in-out infinite}.explain{animation:explain535 1.1s ease-in-out infinite}.carry{animation:carry535 1.4s ease-in-out infinite}.work{animation:explain535 1.3s ease-in-out infinite}.think{animation:idle535 2.4s ease-in-out infinite}.celebrate{animation:celebrate535 .8s ease-in-out infinite}
 @media(max-width:760px){.fa535book{grid-template-rows:auto minmax(280px,1fr) auto auto}.fa535text{font-size:19px}.fa535journal{min-height:125px}.fa535head h1{font-size:20px}}
 `;document.head.appendChild(s);
}

function displayName(key){return ({captainFritz:'Captain Fritz',bash:'Bash',bear:'Bear',nola:'Nola',rascal:'Rascal',tony:'Tony'})[key]||key;}
function renderProp(stage,prop){
 if(prop==='kite'){const d=document.createElement('div');d.className='fa535kite';stage.appendChild(d)}
 if(prop==='plans'){const d=document.createElement('div');d.className='fa535plans';stage.appendChild(d)}
 if(prop==='workshop'){const d=document.createElement('div');d.className='fa535workshop';stage.appendChild(d)}
 if(prop==='sixKites'){const d=document.createElement('div');d.className='fa535six';d.innerHTML='<span></span>'.repeat(6);stage.appendChild(d)}
}

if(window.StoryEngine){
 const original=StoryEngine.prototype.showPage;
 StoryEngine.prototype.showPage=function(){
   if(!this.lesson||this.lesson.id!==LEVEL_ID)return original.call(this);
   if(this.pageIndex>=this.story.pages.length){this.startQuestions();return;}
   addCss();document.querySelectorAll('.fa535').forEach(n=>n.remove());
   const page=this.normalizePage(this.story.pages[this.pageIndex]);
   const spec=scenes[this.pageIndex]||scenes[0];
   const wrap=document.createElement('div');wrap.className='fa535';
   wrap.innerHTML=`<section class="fa535book"><header class="fa535head"><h1>${this.story.title}</h1><div class="fa535page">Page ${this.pageIndex+1} of ${this.story.pages.length}</div></header><main class="fa535scene"><img class="fa535env" src="${spec.env}" alt="Academy environment"><div class="fa535shade"></div></main><section class="fa535journal"><h2>Academy Journal</h2><div class="fa535text"></div></section><footer class="fa535controls"><button class="fa535btn secondary" data-read>Read Aloud</button><button class="fa535btn" data-next>${this.pageIndex===this.story.pages.length-1?'Story Check':'Next Page'}</button></footer></section>`;
   const stage=wrap.querySelector('.fa535scene');
   (spec.props||[]).forEach(p=>renderProp(stage,p));
   (spec.chars||[]).forEach(([key,x,y,w,motion])=>{
      const img=document.createElement('img');img.className=`fa535char ${motion||'idle'}`;img.src=APPROVED[key];img.alt=displayName(key);img.style.left=x;img.style.top=y;img.style.width=`${w}%`;
      const missing=document.createElement('div');missing.className='fa535missing';missing.style.left=x;missing.style.top=y;missing.textContent=`Approved ${displayName(key)} asset needed`;
      img.onload=()=>missing.remove();img.onerror=()=>{img.classList.add('missing')};stage.appendChild(img);stage.appendChild(missing);
   });
   wrap.querySelector('.fa535text').textContent=this.lessonEngine.replaceName(page.text);
   wrap.querySelector('[data-read]').onclick=()=>this.lessonEngine.speakText(this.lessonEngine.replaceName(page.text));
   wrap.querySelector('[data-next]').onclick=()=>{this.lessonEngine.stopMedia();wrap.remove();this.pageIndex++;this.showPage();};
   document.body.appendChild(wrap);
 };
}

window.FRITZ_LESSON6_LAYERED='53.10';
})();