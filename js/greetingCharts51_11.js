/* Fritz Academy 51.11 — greeting charts shown at the actual questions, no black image textures */
(function(){
  "use strict";
  if(typeof LessonEngine==="undefined") return;

  const feelings=[
    {id:"happy",face:"😀",word:"Happy",sentence:"I am happy."},
    {id:"fine",face:"🙂",word:"Fine",sentence:"I am fine."},
    {id:"okay",face:"😐",word:"Okay",sentence:"I am okay."},
    {id:"excited",face:"🤩",word:"Excited",sentence:"I am excited."},
    {id:"tired",face:"😴",word:"Tired",sentence:"I am tired."},
    {id:"sad",face:"😢",word:"Sad",sentence:"I am sad."},
    {id:"angry",face:"😠",word:"Angry",sentence:"I am angry."},
    {id:"nervous",face:"😟",word:"Nervous",sentence:"I am nervous."}
  ];

  const activities=[
    {id:"played",face:"⚽",word:"Played",sentence:"I played."},
    {id:"read",face:"📖",word:"Read",sentence:"I read."},
    {id:"watched-tv",face:"📺",word:"Watched TV",sentence:"I watched TV."},
    {id:"studied",face:"✏️",word:"Studied",sentence:"I studied."},
    {id:"ate",face:"🍎",word:"Ate",sentence:"I ate."},
    {id:"slept",face:"🛏️",word:"Slept",sentence:"I slept."},
    {id:"played-games",face:"🎮",word:"Played a game",sentence:"I played a game."},
    {id:"went-outside",face:"🌳",word:"Went outside",sentence:"I went outside."}
  ];

  function ensureStyle(){
    if(document.getElementById("fritz-greeting-chart-style-5111")) return;
    const style=document.createElement("style");
    style.id="fritz-greeting-chart-style-5111";
    style.textContent=`
      .fritz-chart-overlay{position:fixed;inset:0;z-index:200000;background:#071426cc;display:grid;place-items:center;padding:12px;font-family:Arial,sans-serif}
      .fritz-chart-shell{width:min(940px,97vw);max-height:94vh;overflow:auto;background:#fffdf3;border:6px solid #102342;border-radius:18px;padding:18px;box-sizing:border-box}
      .fritz-chart-title{text-align:center;color:#102342;font-size:30px;font-weight:900;margin:0 0 8px}
      .fritz-chart-help{text-align:center;color:#46566f;font-size:20px;font-weight:700;margin:0 0 16px}
      .fritz-chart-grid{display:grid;grid-template-columns:repeat(4,minmax(130px,1fr));gap:14px}
      .fritz-chart-card{background:white;border:4px solid #174ea6;border-radius:16px;padding:10px;min-height:150px;display:grid;place-items:center;text-align:center;cursor:pointer;box-shadow:0 4px 0 #d8dfeb}
      .fritz-chart-card:hover,.fritz-chart-card:focus{transform:translateY(-2px);outline:5px solid #ffc63d}
      .fritz-chart-icon{font-size:68px;line-height:1}
      .fritz-chart-word{font-size:24px;font-weight:900;color:#102342;margin-top:8px}
      .fritz-chart-sentence{font-size:18px;font-weight:800;color:#174ea6;margin-top:4px}
      .fritz-answer-shell{width:min(700px,94vw);background:#fffdf3;border:6px solid #102342;border-radius:18px;padding:34px;text-align:center;font-family:Arial,sans-serif}
      .fritz-answer-shell h2{font-size:34px;color:#2f7d32;margin:0 0 20px}.fritz-answer-shell p{font-size:31px;font-weight:900;color:#102342;margin:0 0 28px}.fritz-answer-shell button{background:#ffc63d;color:#102342;border:0;padding:14px 28px;font-size:23px;font-weight:900;border-radius:8px}
      @media(max-width:720px){.fritz-chart-grid{grid-template-columns:repeat(2,minmax(120px,1fr))}.fritz-chart-icon{font-size:54px}.fritz-chart-word{font-size:20px}.fritz-chart-title{font-size:25px}}
    `;
    document.head.appendChild(style);
  }

  function removeCharts(){document.querySelectorAll(".fritz-chart-overlay").forEach(node=>node.remove());}

  function showChart(engine,title,help,choices,onChoose){
    ensureStyle();removeCharts();
    const overlay=document.createElement("div");overlay.className="fritz-chart-overlay";
    const shell=document.createElement("section");shell.className="fritz-chart-shell";
    const heading=document.createElement("h1");heading.className="fritz-chart-title";heading.textContent=title;
    const instruction=document.createElement("p");instruction.className="fritz-chart-help";instruction.textContent=help;
    const grid=document.createElement("div");grid.className="fritz-chart-grid";
    choices.forEach(choice=>{
      const card=document.createElement("button");card.className="fritz-chart-card";card.type="button";
      const icon=document.createElement("div");icon.className="fritz-chart-icon";icon.textContent=choice.face;
      const word=document.createElement("div");word.className="fritz-chart-word";word.textContent=choice.word;
      const sentence=document.createElement("div");sentence.className="fritz-chart-sentence";sentence.textContent=choice.sentence;
      card.append(icon,word,sentence);card.onclick=()=>{overlay.remove();onChoose(choice);};
      grid.appendChild(card);
    });
    shell.append(heading,instruction,grid);overlay.appendChild(shell);document.body.appendChild(overlay);
  }

  function showAnswer(title,sentence,nextLabel,onNext){
    removeCharts();
    const overlay=document.createElement("div");overlay.className="fritz-chart-overlay";
    const shell=document.createElement("section");shell.className="fritz-answer-shell";
    const heading=document.createElement("h2");heading.textContent=title;
    const text=document.createElement("p");text.textContent=sentence;
    const next=document.createElement("button");next.textContent=nextLabel;next.onclick=()=>{overlay.remove();onNext();};
    shell.append(heading,text,next);overlay.appendChild(shell);document.body.appendChild(overlay);
  }

  LessonEngine.prototype.showGreeting=function(index){
    if(this.levelId!=="1-D") return;
    this.setSection("greeting");
    if(index===0){
      showAnswer(`Hello, ${this.studentName}!`,`Captain Fritz: It is good to see you.`,`How Are You?`,()=>this.showGreeting(1));
      return;
    }
    if(index===1){
      showChart(this,`Captain Fritz: How are you today, ${this.studentName}?`,`Look at the faces. Choose one and say the full sentence.`,feelings,choice=>{
        this.progress().feeling=choice.id;saveGame(this.scene.save);
        showAnswer("Great speaking!",choice.sentence,"Next Question",()=>this.showGreeting(2));
      });
      return;
    }
    if(index===2){
      showChart(this,"Captain Fritz: What did you do between classes?","Choose an activity and say the full sentence.",activities,choice=>{
        this.progress().betweenClassActivity=choice.id;saveGame(this.scene.save);
        showAnswer("Good answer!",choice.sentence,"Start Lesson",()=>this.startStory());
      });
      return;
    }
    this.startStory();
  };

  /* The greeting charts now teach and collect feelings directly. Do not run the old
     three-question matching activity afterward. */
  LessonEngine.prototype.showFeelingsActivityIntro=function(){
    if(this.levelId==="1-D"){this.startStory();return;}
  };
})();
