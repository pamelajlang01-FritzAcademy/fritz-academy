/* Fritz Academy 51.19 — class-safe Lesson 4 presentation */
(function(){
  'use strict';
  const REWARDS={
    'Question Garden Sign':'assets/objects/question-sign-premium.svg',
    'Question Flower Bed':'assets/objects/question-flower-bed-premium.svg',
    'Question Garden Lantern':'assets/objects/question-lantern-premium.svg'
  };
  function isL4(x){return x&&x.lesson&&x.lesson.id==='1-D';}
  function clear(){document.querySelectorAll('.l419-overlay,.l418-overlay,.l4p-overlay,.l4-scene-card').forEach(n=>n.remove());}
  function css(){if(document.getElementById('l419-css'))return;const s=document.createElement('style');s.id='l419-css';s.textContent=`
  .l419-overlay{position:fixed;inset:0;z-index:500000;background:rgba(5,18,36,.93);display:grid;place-items:center;padding:12px;font-family:Arial,sans-serif}
  .l419-book{width:min(1020px,96vw);height:min(760px,95vh);background:#fffdf4;border:6px solid #102342;border-radius:24px;overflow:hidden;display:grid;grid-template-rows:auto 1fr auto;box-shadow:0 20px 60px #0009}
  .l419-head{background:#fff3bd;border-bottom:3px solid #174ea6;padding:15px;text-align:center;font-size:28px;font-weight:900;color:#102342}
  .l419-page{display:grid;place-items:center;padding:35px;min-height:0;background:linear-gradient(145deg,#f7fbff,#fffaf0)}
  .l419-card{width:min(820px,90%);border:4px solid #174ea6;border-radius:24px;background:white;padding:42px 45px;text-align:center;box-shadow:0 12px 28px #10234222}
  .l419-word{font-size:54px;font-weight:900;color:#174ea6;margin-bottom:22px;letter-spacing:1px}
  .l419-text{font-size:34px;line-height:1.35;font-weight:800;color:#102342}
  .l419-foot{display:flex;justify-content:center;gap:22px;padding:14px;border-top:3px solid #102342;background:#fff}
  .l419-foot button{padding:12px 28px;border:3px solid #102342;border-radius:10px;font-size:22px;font-weight:900;background:#fff;color:#102342}.l419-foot .next{background:#ffc63d}
  .l419-builder{position:fixed;inset:0;z-index:510000;background:#071426ed;display:grid;place-items:center;padding:10px;font-family:Arial,sans-serif}
  .l419-buildshell{width:min(1180px,98vw);height:min(780px,96vh);background:#fff;border:6px solid #f6c744;border-radius:22px;overflow:hidden;display:grid;grid-template-rows:auto 1fr auto}
  .l419-buildhead{padding:14px 20px;background:#fff3bd;border-bottom:3px solid #174ea6;font-size:26px;font-weight:900;color:#102342}
  .l419-stage{position:relative;background:linear-gradient(#9bdcff 0 44%,#72bf59 44% 100%);overflow:hidden}
  .l419-stage:before{content:'';position:absolute;left:50%;bottom:-5%;width:180px;height:65%;background:#d8c08f;clip-path:polygon(45% 0,55% 0,100% 100%,0 100%)}
  .l419-place{position:absolute;width:180px;height:180px;transform:translate(-50%,-50%);filter:drop-shadow(0 12px 8px #0004)}.l419-place img{width:100%;height:100%;object-fit:contain}.l419-label{position:absolute;left:50%;bottom:-10px;transform:translateX(-50%);white-space:nowrap;background:#fff;border:2px solid #174ea6;border-radius:8px;padding:5px 9px;font-weight:900;color:#102342}
  .l419-buildfoot{display:flex;justify-content:center;padding:12px;border-top:3px solid #174ea6}.l419-buildfoot button{padding:12px 26px;border:3px solid #102342;border-radius:10px;background:#ffc63d;font-size:21px;font-weight:900;color:#102342}
  .l419-reward-img{display:block;width:190px;height:190px;object-fit:contain;margin:20px auto 10px;filter:drop-shadow(0 10px 7px #0004)}
  `;document.head.appendChild(s)}
  function qword(text){const m=String(text||'').match(/\b(Who|What|Where|When|Why|How)\b/i);return m?m[1].toUpperCase():'';}
  function render(host,section,index,next,label){css();clear();const raw=section.pages[index],p=typeof raw==='string'?{text:raw}:(raw||{}),text=host.lessonEngine.replaceName(p.text||'');const ov=document.createElement('div');ov.className='l419-overlay';ov.innerHTML=`<section class="l419-book"><header class="l419-head">${section.title} — Page ${index+1} of ${section.pages.length}</header><main class="l419-page"><div class="l419-card"><div class="l419-word">${qword(text)}</div><div class="l419-text"></div></div></main><footer class="l419-foot"><button class="read">Read Aloud</button><button class="next">${label}</button></footer></section>`;ov.querySelector('.l419-text').textContent=text;ov.querySelector('.read').onclick=()=>host.lessonEngine.speakText(text);ov.querySelector('.next').onclick=()=>{ov.remove();next()};document.body.appendChild(ov)}
  if(window.StoryEngine)StoryEngine.prototype.showPage=function(){if(!isL4(this))return;if(this.pageIndex>=this.story.pages.length){this.startQuestions();return}const last=this.pageIndex===this.story.pages.length-1;render(this,this.story,this.pageIndex,()=>{this.pageIndex++;this.showPage()},last?'Story Questions':'Next Page')};
  if(window.ReaderEngine)ReaderEngine.prototype.showPage=function(){if(!isL4(this))return;if(this.pageIndex>=this.reader.pages.length){this.startCheck();return}const last=this.pageIndex===this.reader.pages.length-1;render(this,this.reader,this.pageIndex,()=>{this.pageIndex++;this.showPage()},last?'Reader Questions':'Next Page')};
  if(window.BuilderEngine)BuilderEngine.prototype.showBuilder=function(){if(!(this.lessonEngine&&this.lessonEngine.lesson&&this.lessonEngine.lesson.id==='1-D'))return;css();clear();const ov=document.createElement('div');ov.className='l419-builder';ov.innerHTML=`<section class="l419-buildshell"><header class="l419-buildhead">Your Question Garden</header><main class="l419-stage"><div class="l419-place" style="left:25%;top:62%"><img src="${REWARDS['Question Garden Sign']}"><span class="l419-label">Question Garden Sign</span></div><div class="l419-place" style="left:50%;top:68%"><img src="${REWARDS['Question Flower Bed']}"><span class="l419-label">Question Flower Bed</span></div><div class="l419-place" style="left:75%;top:58%"><img src="${REWARDS['Question Garden Lantern']}"><span class="l419-label">Question Garden Lantern</span></div></main><footer class="l419-buildfoot"><button>Finish This Build</button></footer></section>`;ov.querySelector('button').onclick=()=>{ov.remove();this.completeBuild()};document.body.appendChild(ov)};
  const mo=new MutationObserver(()=>{const bodyText=document.body.innerText||'';if(!bodyText.includes('Build Piece Earned!'))return;for(const [name,src] of Object.entries(REWARDS)){if(bodyText.includes(name)&&!document.querySelector(`img[data-l419="${name}"]`)){const buttons=[...document.querySelectorAll('button')].filter(b=>/Add to Builder Pack/i.test(b.textContent));const b=buttons[0];if(b){const img=document.createElement('img');img.dataset.l419=name;img.className='l419-reward-img';img.src=src;b.parentElement.insertBefore(img,b)}}}});mo.observe(document.documentElement,{childList:true,subtree:true});
})();