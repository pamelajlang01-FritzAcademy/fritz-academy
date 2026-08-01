/* Fritz Academy 51.16 — illustrated Lesson 4 story scenes with official characters */
(function(){
  "use strict";
  if(!window.StoryEngine) return;

  const sceneData=[
    {word:"WHO?",prompt:"Who has the key?",actors:[{src:"assets/tony.png",left:"8%",w:"31%"},{src:"assets/bash.png",right:"7%",w:"34%"}],prop:"🔑"},
    {word:"WHAT?",prompt:"What is in the box?",actors:[{src:"assets/bear.png",left:"8%",w:"34%"},{src:"assets/nola.png",right:"7%",w:"31%"}],prop:"📦"},
    {word:"WHERE?",prompt:"Where is the library?",actors:[{src:"assets/nola.png",left:"8%",w:"31%"},{src:"assets/captain_fritz.png",right:"7%",w:"31%"}],prop:"📚"},
    {word:"WHEN?",prompt:"When do we read?",actors:[{src:"assets/rascal.png",left:"8%",w:"31%"},{src:"assets/tony.png",right:"7%",w:"31%"}],prop:"🕒"},
    {word:"WHY?",prompt:"Why is the door locked?",actors:[{src:"assets/bash.png",left:"8%",w:"34%"},{src:"assets/captain_fritz.png",right:"7%",w:"31%"}],prop:"🔒"},
    {word:"HOW?",prompt:"How do we open the door?",actors:[{src:"assets/tony.png",left:"8%",w:"31%"},{src:"assets/captain_fritz.png",right:"7%",w:"31%"}],prop:"🔑"}
  ];

  function isLesson4(engine){return engine&&engine.lesson&&engine.lesson.id==="1-D";}
  function ensureStyle(){
    if(document.getElementById("lesson4-character-scenes-5116")) return;
    const style=document.createElement("style");
    style.id="lesson4-character-scenes-5116";
    style.textContent=`
      .l4-character-scene{position:relative;width:100%;height:100%;min-height:350px;overflow:hidden;border:4px solid #174ea6;background:linear-gradient(#8fd3ff 0 45%,#72bd62 45% 100%)}
      .l4-character-scene:before{content:"";position:absolute;inset:0;background:url('assets/environments/welcome-garden-open.svg') center/cover no-repeat;opacity:.72}
      .l4-word-tag{position:absolute;z-index:3;left:5%;top:5%;background:#fff8d5;border:5px solid #174ea6;border-radius:18px;padding:8px 22px;font-size:40px;font-weight:900;color:#102342}
      .l4-prompt{position:absolute;z-index:3;left:50%;top:20%;transform:translateX(-50%);width:55%;text-align:center;font-size:27px;font-weight:900;color:#102342;background:#ffffffdd;border-radius:12px;padding:8px}
      .l4-actor{position:absolute;z-index:2;bottom:-2%;height:auto;max-height:78%;object-fit:contain;filter:drop-shadow(0 8px 8px #0004)}
      .l4-prop{position:absolute;z-index:4;left:50%;top:53%;transform:translate(-50%,-50%);font-size:74px;background:#fff8d5dd;border:4px solid #d19b24;border-radius:18px;padding:8px 14px}
    `;
    document.head.appendChild(style);
  }

  function replaceIllustration(overlay,index){
    const old=overlay.querySelector(".l4-scene-main img");
    if(!old) return;
    const data=sceneData[index%sceneData.length];
    const scene=document.createElement("div");scene.className="l4-character-scene";
    const tag=document.createElement("div");tag.className="l4-word-tag";tag.textContent=data.word;
    const prompt=document.createElement("div");prompt.className="l4-prompt";prompt.textContent=data.prompt;
    scene.append(tag,prompt);
    data.actors.forEach(actor=>{
      const img=document.createElement("img");img.className="l4-actor";img.src=actor.src;img.alt="Fritz Academy character";
      if(actor.left)img.style.left=actor.left;if(actor.right)img.style.right=actor.right;img.style.width=actor.w;
      scene.appendChild(img);
    });
    const prop=document.createElement("div");prop.className="l4-prop";prop.textContent=data.prop;scene.appendChild(prop);
    old.replaceWith(scene);
  }

  const original=StoryEngine.prototype.showPage;
  StoryEngine.prototype.showPage=function(){
    const result=original.apply(this,arguments);
    if(!isLesson4(this)) return result;
    ensureStyle();
    requestAnimationFrame(()=>{
      const overlay=document.querySelector(".l4-scene-card");
      if(overlay) replaceIllustration(overlay,this.pageIndex);
    });
    return result;
  };
})();
