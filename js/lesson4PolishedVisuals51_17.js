/* Fritz Academy 51.17 — polished Lesson 4 story, readers, rewards, and builder */
(function(){
  "use strict";
  const chars={
    tony:"assets/tony.png",bash:"assets/bash.png",bear:"assets/bear.png",
    nola:"assets/nola.png",rascal:"assets/rascal.png",fritz:"assets/captain_fritz.png"
  };
  const words=["WHO","WHAT","WHERE","WHEN","WHY","HOW"];
  const pairs=[["tony","bash"],["bear","nola"],["nola","fritz"],["rascal","fritz"],["bash","fritz"],["tony","fritz"]];
  const accents=["#ffd166","#ff8fab","#72c7ff","#9b8cff","#ff9f68","#78d39b"];
  function isL4(host){return host&&host.lesson&&host.lesson.id==="1-D";}
  function clean(){document.querySelectorAll('.l4p-overlay,.l4-scene-card').forEach(n=>n.remove());}
  function style(){
    if(document.getElementById('l4p-style'))return;
    const s=document.createElement('style');s.id='l4p-style';s.textContent=`
    .l4p-overlay{position:fixed;inset:0;z-index:250000;background:#071426d9;display:grid;place-items:center;padding:10px;font-family:Arial,sans-serif}
    .l4p-shell{width:min(1040px,97vw);height:min(790px,96vh);background:#fffdf4;border:6px solid #102342;border-radius:22px;overflow:hidden;display:grid;grid-template-rows:auto 1fr auto;box-shadow:0 20px 60px #0008}
    .l4p-head{text-align:center;padding:13px 18px;font-size:26px;font-weight:900;color:#102342;background:#fff4c8;border-bottom:3px solid #174ea6}
    .l4p-art{position:relative;overflow:hidden;margin:18px 24px 8px;border:5px solid #174ea6;border-radius:18px;background:linear-gradient(#8fd8ff 0 48%,#79c65d 48% 100%)}
    .l4p-art:before{content:"";position:absolute;left:-5%;right:-5%;bottom:0;height:30%;background:linear-gradient(165deg,transparent 0 25%,#d8c59d 26% 37%,transparent 38% 100%);opacity:.85}
    .l4p-cloud{position:absolute;width:150px;height:42px;border-radius:50%;background:#fff;opacity:.82;top:35px}.l4p-cloud:before,.l4p-cloud:after{content:"";position:absolute;background:#fff;border-radius:50%}.l4p-cloud:before{width:70px;height:70px;left:22px;top:-28px}.l4p-cloud:after{width:82px;height:76px;right:18px;top:-34px}
    .l4p-tree{position:absolute;bottom:85px;width:32px;height:145px;background:#78502c;border-radius:10px}.l4p-tree:before{content:"";position:absolute;width:145px;height:120px;border-radius:50%;background:#3f8c4b;left:-56px;top:-65px;box-shadow:28px -15px 0 #54a85e,-25px -10px 0 #4d9c56}
    .l4p-character{position:absolute;bottom:8px;height:76%;max-width:38%;object-fit:contain;object-position:center bottom;filter:drop-shadow(0 10px 8px #0004)}
    .l4p-left{left:5%}.l4p-right{right:5%}.l4p-badge{position:absolute;left:50%;top:24px;transform:translateX(-50%);padding:10px 28px;border:6px solid #174ea6;border-radius:18px;background:#fff8d8;color:#102342;font-size:40px;font-weight:900;box-shadow:0 7px 0 #10234222}
    .l4p-bubble{position:absolute;left:50%;top:105px;transform:translateX(-50%);width:min(470px,55%);padding:15px 20px;background:#fff;border:4px solid #102342;border-radius:20px;color:#102342;text-align:center;font-size:26px;font-weight:900;box-shadow:0 8px 18px #0003}
    .l4p-caption{font-size:29px;line-height:1.28;font-weight:900;color:#102342;text-align:center;padding:12px 28px 15px}
    .l4p-foot{display:flex;justify-content:center;gap:24px;padding:13px;border-top:3px solid #102342;background:#fff}.l4p-foot button{padding:12px 28px;border:3px solid #102342;border-radius:10px;font-size:22px;font-weight:900;color:#102342;background:#fff}.l4p-foot .next{background:#ffc63d}
    .biw-stage{background-image:url('assets/environments/question-garden-premium.svg')!important;background-position:center!important;background-size:cover!important;background-repeat:no-repeat!important}
    @media(max-width:700px){.l4p-shell{height:94vh}.l4p-character{height:64%;max-width:44%}.l4p-bubble{top:92px;font-size:19px;width:58%}.l4p-badge{font-size:28px}.l4p-caption{font-size:21px}}
    `;document.head.appendChild(s);
  }
  function render(host,section,index,onNext,nextLabel){
    style();clean();
    const page=typeof section.pages[index]==='string'?{text:section.pages[index]}:(section.pages[index]||{});
    const i=index%6,p=pairs[i],accent=accents[i];
    const ov=document.createElement('div');ov.className='l4p-overlay';
    const sh=document.createElement('section');sh.className='l4p-shell';
    const hd=document.createElement('header');hd.className='l4p-head';hd.textContent=`${section.title} — Page ${index+1} of ${section.pages.length}`;
    const art=document.createElement('div');art.className='l4p-art';art.style.boxShadow=`inset 0 0 0 8px ${accent}44`;
    const first=(page.text?host.lessonEngine.replaceName(page.text).split('.')[0]:'Ask a good question')+'.';
    art.innerHTML=`<span class="l4p-cloud" style="left:8%"></span><span class="l4p-cloud" style="right:8%;transform:scale(.75)"></span><span class="l4p-tree" style="left:7%"></span><span class="l4p-tree" style="right:7%;transform:scale(.85)"></span><div class="l4p-badge" style="border-color:${accent}">${words[i]}?</div><div class="l4p-bubble">${first}</div><img class="l4p-character l4p-left" src="${chars[p[0]]}" alt=""><img class="l4p-character l4p-right" src="${chars[p[1]]}" alt="">`;
    const cap=document.createElement('div');cap.className='l4p-caption';cap.textContent=host.lessonEngine.replaceName(page.text||'');
    const ft=document.createElement('footer');ft.className='l4p-foot';
    const read=document.createElement('button');read.textContent='Read Aloud';read.onclick=()=>host.lessonEngine.speakText(host.lessonEngine.replaceName(page.text||''));
    const next=document.createElement('button');next.className='next';next.textContent=nextLabel;next.onclick=()=>{ov.remove();onNext();};
    ft.append(read,next);sh.append(hd,art,cap,ft);ov.appendChild(sh);document.body.appendChild(ov);
  }
  if(window.StoryEngine){StoryEngine.prototype.showPage=function(){if(!isL4(this))return;if(this.pageIndex>=this.story.pages.length){this.startQuestions();return;}const last=this.pageIndex===this.story.pages.length-1;render(this,this.story,this.pageIndex,()=>{this.pageIndex++;this.showPage();},last?'Story Questions':'Next Page');};}
  if(window.ReaderEngine){ReaderEngine.prototype.showPage=function(){if(!isL4(this))return;if(this.pageIndex>=this.reader.pages.length){this.startCheck();return;}const last=this.pageIndex===this.reader.pages.length-1;render(this,this.reader,this.pageIndex,()=>{this.pageIndex++;this.showPage();},last?'Reader Questions':'Next Page');};}
  if(typeof findLevel==='function'){
    const lesson=findLevel('1-D');if(lesson){
      lesson.story.rewardPiece.image='assets/objects/question-sign-premium.svg';lesson.story.rewardPiece.icon='';
      lesson.reader1.rewardPiece.image='assets/objects/question-flower-bed-premium.svg';lesson.reader1.rewardPiece.icon='';
      lesson.reader2.rewardPiece.image='assets/objects/question-lantern-premium.svg';lesson.reader2.rewardPiece.icon='';
      lesson.build.backgroundImage='assets/environments/question-garden-premium.svg';
    }
  }
  style();
})();