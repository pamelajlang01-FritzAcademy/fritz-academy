/* Fritz Academy 51.7 — direct authored-scene renderer for Lesson 4 */
(function(){
  "use strict";
  function isLesson4(engine){return engine&&engine.lesson&&engine.lesson.id==="1-D";}
  function ensureStyle(){
    if(document.getElementById("l4-html-scene-style"))return;
    const style=document.createElement("style");
    style.id="l4-html-scene-style";
    style.textContent=`.l4-scene-card{position:fixed;inset:0;z-index:140000;background:#071426cc;display:grid;place-items:center;padding:12px;font-family:Arial,sans-serif}.l4-scene-shell{width:min(860px,96vw);height:min(650px,94vh);background:#fffdf3;border:6px solid #102342;border-radius:18px;display:grid;grid-template-rows:auto 1fr auto;overflow:hidden}.l4-scene-head{padding:14px 18px;text-align:center;font-weight:900;color:#102342;font-size:22px}.l4-scene-main{display:grid;grid-template-rows:minmax(250px,1fr) auto;align-items:center;gap:10px;padding:0 22px 8px}.l4-scene-main img{width:100%;height:100%;max-height:360px;object-fit:contain;border:4px solid #174ea6;background:#eef8ff}.l4-scene-text{font-size:28px;line-height:1.28;font-weight:900;color:#102342;text-align:center;padding:8px 12px}.l4-scene-foot{display:flex;justify-content:center;gap:24px;padding:14px;border-top:3px solid #102342}.l4-scene-foot button{padding:12px 26px;border:0;border-radius:4px;font-size:24px;font-weight:900;background:#ffc63d;color:#102342}.l4-scene-foot .read{background:white;border:2px solid #ddd}@media(max-width:700px){.l4-scene-text{font-size:22px}.l4-scene-shell{height:92vh}.l4-scene-foot button{font-size:19px;padding:10px 16px}}`;
    document.head.appendChild(style);
  }
  function renderPage(host,section,pageIndex,onNext,nextLabel){
    ensureStyle();
    document.querySelectorAll(".l4-scene-card").forEach(n=>n.remove());
    const raw=section.pages[pageIndex];
    const page=typeof raw==="string"?{text:raw,image:""}:(raw||{});
    const overlay=document.createElement("div");overlay.className="l4-scene-card";
    const shell=document.createElement("section");shell.className="l4-scene-shell";
    const head=document.createElement("header");head.className="l4-scene-head";head.textContent=`${section.title} — Page ${pageIndex+1} of ${section.pages.length}`;
    const main=document.createElement("main");main.className="l4-scene-main";
    const img=document.createElement("img");img.src=page.image;img.alt="Lesson illustration";
    img.onerror=()=>{img.style.display="none";};
    const text=document.createElement("div");text.className="l4-scene-text";text.textContent=host.lessonEngine.replaceName(page.text||"");
    const foot=document.createElement("footer");foot.className="l4-scene-foot";
    const read=document.createElement("button");read.className="read";read.textContent="Read Aloud";read.onclick=()=>host.lessonEngine.speakText(host.lessonEngine.replaceName(page.text||""));
    const next=document.createElement("button");next.textContent=nextLabel;next.onclick=()=>{host.lessonEngine.stopMedia();overlay.remove();onNext();};
    main.append(img,text);foot.append(read,next);shell.append(head,main,foot);overlay.appendChild(shell);document.body.appendChild(overlay);
  }
  if(window.StoryEngine){
    const original=StoryEngine.prototype.showPage;
    StoryEngine.prototype.showPage=function(){
      if(!isLesson4(this))return original.call(this);
      if(this.pageIndex>=this.story.pages.length){this.startQuestions();return;}
      const last=this.pageIndex===this.story.pages.length-1;
      renderPage(this,this.story,this.pageIndex,()=>{this.pageIndex++;this.showPage();},last?"Story Check":"Next Page");
    };
  }
  if(window.ReaderEngine){
    const original=ReaderEngine.prototype.showPage;
    ReaderEngine.prototype.showPage=function(){
      if(!isLesson4(this))return original.call(this);
      if(this.pageIndex>=this.reader.pages.length){this.startCheck();return;}
      const last=this.pageIndex===this.reader.pages.length-1;
      renderPage(this,this.reader,this.pageIndex,()=>{this.pageIndex++;this.showPage();},last?"Reader Check":"Next Page");
    };
  }
})();