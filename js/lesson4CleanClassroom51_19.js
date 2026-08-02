/* Fritz Academy 51.19 — clean classroom-ready Lesson 1-D visuals */
(function(){
  "use strict";
  const CH={tony:"assets/tony.png",bash:"assets/bash.png",bear:"assets/bear.png",nola:"assets/nola.png",rascal:"assets/rascal.png",fritz:"assets/captain_fritz.png"};
  const PAIRS=[["tony","bash"],["bear","nola"],["nola","fritz"],["rascal","fritz"],["bash","fritz"],["tony","fritz"]];
  const OBJECTS=["🔑","📦","🌳","🕒","💧","🔓"];
  function isL4(x){return x&&x.lesson&&x.lesson.id==="1-D";}
  function css(){if(document.getElementById("l4clean-css"))return;const s=document.createElement("style");s.id="l4clean-css";s.textContent=`
  .l4clean{position:fixed;inset:0;z-index:400000;background:#071426dc;display:grid;place-items:center;padding:10px;font-family:Arial,sans-serif}
  .l4clean-shell{width:min(1040px,97vw);height:min(790px,96vh);background:#fffdf4;border:6px solid #102342;border-radius:22px;overflow:hidden;display:grid;grid-template-rows:auto 1fr auto;box-shadow:0 24px 70px #0009}
  .l4clean-head{text-align:center;padding:13px 18px;font-size:26px;font-weight:900;color:#102342;background:#fff3bd;border-bottom:3px solid #174ea6}
  .l4clean-main{display:grid;grid-template-rows:minmax(330px,1fr) auto;min-height:0}
  .l4clean-art{position:relative;overflow:hidden;margin:18px 24px 8px;border:5px solid #174ea6;border-radius:18px;background:url('assets/environments/welcome-garden-open.svg') center/cover no-repeat}
  .l4clean-art:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(255,255,255,.14),transparent 25%,transparent 75%,rgba(255,255,255,.14));pointer-events:none}
  .l4clean-portrait{position:absolute;bottom:24px;width:210px;height:250px;border:7px solid white;border-radius:28px;background:white;box-shadow:0 12px 26px #0005;overflow:hidden;z-index:2}
  .l4clean-portrait.left{left:34px}.l4clean-portrait.right{right:34px}.l4clean-portrait img{width:100%;height:100%;object-fit:contain;background:white}
  .l4clean-object{position:absolute;left:50%;top:53%;transform:translate(-50%,-50%);font-size:105px;filter:drop-shadow(0 12px 8px #0005);z-index:3}
  .l4clean-caption{font-size:29px;line-height:1.28;font-weight:900;color:#102342;text-align:center;padding:12px 30px 16px}
  .l4clean-foot{display:flex;justify-content:center;gap:24px;padding:13px;border-top:3px solid #102342;background:#fff}.l4clean-foot button{padding:12px 28px;border:3px solid #102342;border-radius:10px;font-size:22px;font-weight:900;color:#102342;background:#fff}.l4clean-foot .next{background:#ffc63d}
  @media(max-width:700px){.l4clean-shell{height:94vh}.l4clean-portrait{width:135px;height:180px;bottom:18px}.l4clean-portrait.left{left:14px}.l4clean-portrait.right{right:14px}.l4clean-object{font-size:72px}.l4clean-caption{font-size:21px}}
  `;document.head.appendChild(s);}
  function remove(){document.querySelectorAll('.l4clean,.l4p-overlay,.l4-scene-card,.l4e-overlay').forEach(n=>n.remove());}
  function render(host,section,index,next,nextLabel){css();remove();const raw=section.pages[index],page=typeof raw==='string'?{text:raw}:(raw||{}),pair=PAIRS[index%6];const ov=document.createElement('div');ov.className='l4clean';ov.innerHTML=`<section class="l4clean-shell"><header class="l4clean-head">${section.title} — Page ${index+1} of ${section.pages.length}</header><main class="l4clean-main"><div class="l4clean-art"><div class="l4clean-portrait left"><img src="${CH[pair[0]]}" alt=""></div><div class="l4clean-object" aria-hidden="true">${OBJECTS[index%6]}</div><div class="l4clean-portrait right"><img src="${CH[pair[1]]}" alt=""></div></div><div class="l4clean-caption"></div></main><footer class="l4clean-foot"><button class="read">Read Aloud</button><button class="next">${nextLabel}</button></footer></section>`;const text=host.lessonEngine.replaceName(page.text||'');ov.querySelector('.l4clean-caption').textContent=text;ov.querySelector('.read').onclick=()=>host.lessonEngine.speakText(text);ov.querySelector('.next').onclick=()=>{host.lessonEngine.stopMedia?.();ov.remove();next();};document.body.appendChild(ov);}
  if(window.StoryEngine){StoryEngine.prototype.showPage=function(){if(!isL4(this))return;if(this.pageIndex>=this.story.pages.length){this.startQuestions();return;}const last=this.pageIndex===this.story.pages.length-1;render(this,this.story,this.pageIndex,()=>{this.pageIndex++;this.showPage();},last?'Story Questions':'Next Page');};}
  if(window.ReaderEngine){ReaderEngine.prototype.showPage=function(){if(!isL4(this))return;if(this.pageIndex>=this.reader.pages.length){this.startCheck();return;}const last=this.pageIndex===this.reader.pages.length-1;render(this,this.reader,this.pageIndex,()=>{this.pageIndex++;this.showPage();},last?'Reader Questions':'Next Page');};}
  if(typeof findLevel==='function'){const l=findLevel('1-D');if(l){l.story.rewardPiece.image='assets/objects/question-sign-premium.svg';l.reader1.rewardPiece.image='assets/objects/question-flower-bed-premium.svg';l.reader2.rewardPiece.image='assets/objects/question-lantern-premium.svg';l.build.backgroundImage='assets/environments/question-garden-premium.svg';}}
})();