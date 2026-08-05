/* Fritz Academy 52.6 — emergency classroom renderer using approved character PNGs */
(function(){
'use strict';
const CAST=[
 {name:'Tony',src:'assets/tony.png',h:150},
 {name:'Bear',src:'assets/bear.png',h:205},
 {name:'Captain Fritz',src:'assets/captain_fritz.png',h:235},
 {name:'Nola',src:'assets/nola.png',h:235},
 {name:'Rascal',src:'assets/rascal.png',h:215},
 {name:'Bash',src:'assets/bash.png',h:275}
];
const FOCUS={
 story:['Captain Fritz','Tony','Bear','Bash','Nola','Rascal'],
 reader1:['Tony','Bear','Nola','Captain Fritz','Rascal','Bash'],
 reader2:['Captain Fritz','Tony','Bear','Rascal','Nola','Tony']
};
function ensureCss(){
 if(document.getElementById('fa526css'))return;
 const s=document.createElement('style');s.id='fa526css';s.textContent=`
 .fa526{position:fixed;inset:0;z-index:1000001;background:#071426e8;display:grid;place-items:center;font-family:Arial,sans-serif;padding:10px}
 .fa526book{width:min(1180px,98vw);height:min(820px,97vh);background:#fffdf3;border:6px solid #102342;border-radius:22px;overflow:hidden;display:grid;grid-template-rows:auto 1fr auto}
 .fa526head{text-align:center;padding:10px 16px;background:#fff1b7;border-bottom:3px solid #174ea6;color:#102342;font-size:24px;font-weight:900}
 .fa526main{display:grid;grid-template-rows:minmax(360px,1fr) auto;min-height:0}
 .fa526scene{position:relative;overflow:hidden;background:linear-gradient(#9edcff 0 45%,#d7efff 45% 49%,#88c86c 49% 100%);border-bottom:3px solid #174ea6}
 .fa526scene:before{content:'';position:absolute;left:50%;top:7%;width:240px;height:145px;transform:translateX(-50%);background:url('assets/academy.png') center/cover no-repeat;border:4px solid #6d4b2f;border-radius:18px;opacity:.9}
 .fa526cast{position:absolute;left:2%;right:2%;bottom:8px;height:300px;display:flex;align-items:flex-end;justify-content:space-around;gap:4px}
 .fa526char{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;filter:drop-shadow(0 8px 8px #0005);transition:.2s}
 .fa526char img{display:block;max-width:165px;width:auto;object-fit:contain;object-position:center bottom}
 .fa526char.dim{opacity:.48;transform:scale(.92)}.fa526char.focus{opacity:1;transform:scale(1.06)}
 .fa526name{margin-top:-2px;background:#fff8d4;border:2px solid #102342;border-radius:12px;padding:3px 8px;font-weight:900;font-size:12px;white-space:nowrap}
 .fa526char.focus .fa526name{background:#ffd34f}
 .fa526text{padding:12px 28px;text-align:center;font-size:26px;line-height:1.25;font-weight:800;color:#102342;background:#fffdf3}
 .fa526foot{display:flex;justify-content:center;gap:20px;padding:11px;border-top:3px solid #102342}.fa526foot button{padding:11px 24px;border:3px solid #102342;border-radius:11px;font-size:20px;font-weight:900;background:#fff;cursor:pointer}.fa526foot .next{background:#ffc63d}
 @media(max-width:760px){.fa526char img{max-width:105px}.fa526cast{height:230px}.fa526text{font-size:21px}.fa526scene:before{width:180px;height:105px}}
 `;document.head.appendChild(s);
}
function clear(){document.querySelectorAll('.fa526').forEach(n=>n.remove())}
function pageObj(raw){return typeof raw==='string'?{text:raw}:{text:(raw&&raw.text)||''}}
function render(engine,collection,type,index,next,label){
 ensureCss();clear();const raw=pageObj(collection.pages[index]);const focus=(FOCUS[type]||[])[index]||'Captain Fritz';
 const o=document.createElement('div');o.className='fa526';o.innerHTML=`<section class="fa526book"><header class="fa526head">${collection.title} — Page ${index+1} of ${collection.pages.length}</header><main class="fa526main"><div class="fa526scene"><div class="fa526cast"></div></div><div class="fa526text"></div></main><footer class="fa526foot"><button class="read">Read Aloud</button><button class="next">${label}</button></footer></section>`;
 o.querySelector('.fa526text').textContent=engine.lessonEngine.replaceName(raw.text);
 const cast=o.querySelector('.fa526cast');CAST.forEach(c=>{const d=document.createElement('div');d.className='fa526char '+(c.name===focus?'focus':'dim');d.innerHTML=`<img src="${c.src}" alt="${c.name}" style="height:${c.h}px"><div class="fa526name">${c.name}</div>`;cast.appendChild(d)});
 o.querySelector('.read').onclick=()=>engine.lessonEngine.speakText(engine.lessonEngine.replaceName(raw.text));
 o.querySelector('.next').onclick=()=>{o.remove();next()};document.body.appendChild(o);
}
if(window.StoryEngine){StoryEngine.prototype.showPage=function(){if(!this.lesson||this.lesson.id!=='2-A')return;if(this.pageIndex>=this.story.pages.length){this.startQuestions();return}const last=this.pageIndex===this.story.pages.length-1;render(this,this.story,'story',this.pageIndex,()=>{this.pageIndex++;this.showPage()},last?'Story Check':'Next Page')}}
if(window.ReaderEngine){ReaderEngine.prototype.showPage=function(){if(!this.lesson||this.lesson.id!=='2-A')return;if(this.pageIndex>=this.reader.pages.length){this.startCheck();return}const last=this.pageIndex===this.reader.pages.length-1;render(this,this.reader,this.readerKey||'reader1',this.pageIndex,()=>{this.pageIndex++;this.showPage()},last?'Reader Check':'Next Page')}}
window.FRITZ_LESSON2A_APPROVED_CAST=true;
})();