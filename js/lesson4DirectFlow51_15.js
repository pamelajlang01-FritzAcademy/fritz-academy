/* Fritz Academy 51.15 — self-contained Lesson 4 opening and greeting flow */
(function(){
  "use strict";
  if(typeof LessonEngine==="undefined") return;

  const feelings=[
    {id:"happy",icon:"😀",word:"Happy",sentence:"I am happy."},
    {id:"fine",icon:"🙂",word:"Fine",sentence:"I am fine."},
    {id:"okay",icon:"😐",word:"Okay",sentence:"I am okay."},
    {id:"excited",icon:"🤩",word:"Excited",sentence:"I am excited."},
    {id:"tired",icon:"😴",word:"Tired",sentence:"I am tired."},
    {id:"sad",icon:"😢",word:"Sad",sentence:"I am sad."},
    {id:"angry",icon:"😠",word:"Angry",sentence:"I am angry."},
    {id:"nervous",icon:"😟",word:"Nervous",sentence:"I am nervous."}
  ];
  const activities=[
    {id:"played",icon:"⚽",word:"Played",sentence:"I played."},
    {id:"read",icon:"📖",word:"Read",sentence:"I read."},
    {id:"watched-tv",icon:"📺",word:"Watched TV",sentence:"I watched TV."},
    {id:"studied",icon:"✏️",word:"Studied",sentence:"I studied."},
    {id:"ate",icon:"🍎",word:"Ate",sentence:"I ate."},
    {id:"slept",icon:"🛏️",word:"Slept",sentence:"I slept."},
    {id:"played-games",icon:"🎮",word:"Played a game",sentence:"I played a game."},
    {id:"went-outside",icon:"🌳",word:"Went outside",sentence:"I went outside."}
  ];

  function ensureStyle(){
    if(document.getElementById("fritz-l4-direct-style")) return;
    const style=document.createElement("style");
    style.id="fritz-l4-direct-style";
    style.textContent=`
      .fritz-l4-overlay{position:fixed;inset:0;z-index:999999;background:#071426dd;display:grid;place-items:center;padding:12px;font-family:Arial,sans-serif}
      .fritz-l4-shell{width:min(940px,96vw);max-height:94vh;overflow:auto;background:#fffdf3;border:6px solid #102342;border-radius:18px;padding:24px;box-sizing:border-box;text-align:center}
      .fritz-l4-shell h1{margin:0 0 10px;font-size:38px;color:#102342}.fritz-l4-shell h2{margin:0 0 14px;font-size:29px;color:#174ea6}.fritz-l4-shell p{font-size:22px;font-weight:800;color:#46566f}
      .fritz-l4-start,.fritz-l4-next{background:#ffc63d;color:#102342;border:0;border-radius:8px;padding:15px 30px;font-size:24px;font-weight:900;cursor:pointer}
      .fritz-l4-grid{display:grid;grid-template-columns:repeat(4,minmax(130px,1fr));gap:14px;margin:18px 0}
      .fritz-l4-card{background:#fff;border:4px solid #174ea6;border-radius:16px;padding:12px;min-height:145px;cursor:pointer;display:grid;place-items:center}
      .fritz-l4-card:hover,.fritz-l4-card:focus{outline:5px solid #ffc63d}.fritz-l4-icon{font-size:62px}.fritz-l4-word{font-size:23px;font-weight:900;color:#102342}.fritz-l4-sentence{font-size:18px;font-weight:800;color:#174ea6}
      @media(max-width:720px){.fritz-l4-grid{grid-template-columns:repeat(2,minmax(120px,1fr))}.fritz-l4-shell h1{font-size:30px}.fritz-l4-icon{font-size:50px}}
    `;
    document.head.appendChild(style);
  }

  function clear(){document.querySelectorAll(".fritz-l4-overlay").forEach(n=>n.remove());}
  function mount(content){ensureStyle();clear();const o=document.createElement("div");o.className="fritz-l4-overlay";const s=document.createElement("section");s.className="fritz-l4-shell";content(s,o);o.appendChild(s);document.body.appendChild(o);}

  function showChart(engine,title,help,choices,onChoose){
    mount((shell,overlay)=>{
      const h=document.createElement("h1");h.textContent=title;
      const p=document.createElement("p");p.textContent=help;
      const grid=document.createElement("div");grid.className="fritz-l4-grid";
      choices.forEach(choice=>{
        const b=document.createElement("button");b.type="button";b.className="fritz-l4-card";
        b.innerHTML=`<div class="fritz-l4-icon">${choice.icon}</div><div class="fritz-l4-word">${choice.word}</div><div class="fritz-l4-sentence">${choice.sentence}</div>`;
        b.addEventListener("click",()=>{overlay.remove();onChoose(choice);},{once:true});
        grid.appendChild(b);
      });
      shell.append(h,p,grid);
    });
  }

  function showAnswer(title,sentence,label,next){
    mount((shell,overlay)=>{
      const h=document.createElement("h1");h.textContent=title;
      const p=document.createElement("p");p.textContent=sentence;
      const b=document.createElement("button");b.type="button";b.className="fritz-l4-next";b.textContent=label;
      b.addEventListener("click",()=>{overlay.remove();next();},{once:true});
      shell.append(h,p,b);
    });
  }

  LessonEngine.prototype.showMissionOpening=function(){
    if(this.levelId!=="1-D") return;
    this.setSection("opening");
    mount((shell,overlay)=>{
      const h=document.createElement("h1");h.textContent="Level 1-D";
      const h2=document.createElement("h2");h2.textContent=this.lesson.title||"Six Good Questions";
      const p=document.createElement("p");p.innerHTML="Today we learn:<br><strong>Who • What • Where • When • Why • How</strong><br><br>Listen, read, answer, and build.";
      const b=document.createElement("button");b.type="button";b.className="fritz-l4-start";b.textContent="Start Lesson";
      b.addEventListener("click",()=>{overlay.remove();this.showGreeting(0);},{once:true});
      shell.append(h,h2,p,b);
    });
  };

  LessonEngine.prototype.showGreeting=function(index){
    if(this.levelId!=="1-D") return;
    this.setSection("greeting");
    if(index===0){
      showChart(this,`Captain Fritz: How are you today, ${this.studentName}?`,`Choose one. Say the full sentence.`,feelings,choice=>{
        this.progress().feeling=choice.id;saveGame(this.scene.save);
        showAnswer("Great speaking!",choice.sentence,"Next Question",()=>this.showGreeting(1));
      });
      return;
    }
    if(index===1){
      showChart(this,"Captain Fritz: What did you do between classes?","Choose one. Say the full sentence.",activities,choice=>{
        this.progress().betweenClassActivity=choice.id;saveGame(this.scene.save);
        showAnswer("Good answer!",choice.sentence,"Start Story",()=>{
          clear();
          this.questionIndex=0;
          this.storyPage=0;
          this.startStory();
        });
      });
      return;
    }
    clear();
    this.startStory();
  };
})();
