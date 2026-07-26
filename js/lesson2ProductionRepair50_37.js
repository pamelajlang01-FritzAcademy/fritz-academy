/* Fritz Academy Lesson 2 production repair v50.37 */
(function(){
  "use strict";

  const REWARDS={
    conversation:{id:"academy-mailbox",name:"Academy Mailbox",icon:"📬",area:"welcome-garden",lesson:"1-B"},
    story:{id:"academy-flag",name:"Academy Flag",icon:"🏳️",area:"welcome-garden",lesson:"1-B"},
    phonics:{id:"paw-print-stepping-stones",name:"Paw Print Stepping Stones",icon:"🐾",area:"welcome-garden",lesson:"1-B"},
    reader1:{id:"captain-fritz-statue",name:"Captain Fritz Statue",icon:"⭐",area:"welcome-garden",lesson:"1-B"},
    reader2:{id:"academy-bell",name:"Academy Bell",icon:"🔔",area:"welcome-garden",lesson:"1-B"}
  };

  const LETTERS=[
    {upper:"D",lower:"d",cue:"D says /d/ as in dog.",examples:[{word:"dog",picture:"🐶"},{word:"duck",picture:"🦆"},{word:"drum",picture:"🥁"}]},
    {upper:"E",lower:"e",cue:"E says /e/ as in egg.",examples:[{word:"egg",picture:"🥚"},{word:"elephant",picture:"🐘"},{word:"elbow",picture:"💪"}]},
    {upper:"F",lower:"f",cue:"F says /f/ as in fish.",examples:[{word:"fish",picture:"🐟"},{word:"frog",picture:"🐸"},{word:"flower",picture:"🌼"}]}
  ];

  function patchLesson(){
    if(typeof findLevel!=="function") return;
    const lesson=findLevel("1-B");
    if(!lesson) return;

    lesson.unlocked=true;
    lesson.intro=[
      {speaker:"Captain Fritz",text:"Hello, {studentName}! Welcome back to Fritz Academy!"},
      {speaker:"Captain Fritz",text:"Last time you learned A, B, and C and started the Welcome Garden."},
      {speaker:"Captain Fritz",text:"How are you today?",responseType:"feeling"},
      {speaker:"Captain Fritz",text:"Today we will learn D, E, and F, read about Bear's missing backpack, and build a brand-new Academy section."}
    ];

    lesson.feelingsActivity={
      title:"Beginning Sound Warm-Up",
      instructions:"Choose the letter that begins each picture word.",
      questions:[
        {emoji:"🐶",prompt:"Dog begins with which letter?",answer:"D",options:["D","E","F"]},
        {emoji:"🥚",prompt:"Egg begins with which letter?",answer:"E",options:["F","E","D"]},
        {emoji:"🐟",prompt:"Fish begins with which letter?",answer:"F",options:["E","D","F"]}
      ],
      rewardPiece:REWARDS.conversation
    };

    lesson.story.rewardPiece=REWARDS.story;
    lesson.story.pages=[
      {text:"Bear hurries into the Welcome Garden. His blue backpack is missing.",image:"assets/environments/welcome_garden.png"},
      {text:"Captain Fritz says, “Welcome back, Bear. Tell us what you did before you came here.”",image:"assets/captain_fritz.png"},
      {text:"Bear thinks carefully. “I read a book near the garden bench.”",image:"assets/bear.png"},
      {text:"Bash checks beside the path while Nola looks near the flowers.",image:"assets/bash.png"},
      {text:"Tony looks under the reading bench and finds the blue backpack.",image:"assets/tony.png"},
      {text:"Bear smiles. “Thank you, friends. We solved the problem together!”",image:"assets/bear.png"}
    ];

    lesson.phonics={
      title:"D, E, and F Picture Match",
      review:["A","B","C"],
      letters:LETTERS,
      chant:"D says d-d-dog. E says e-e-egg. F says f-f-fish. D, E, F — sounds are fun!",
      rewardPiece:REWARDS.phonics
    };

    lesson.reader1.rewardPiece=REWARDS.reader1;
    lesson.reader1.pages=[
      {text:"Tony walks beside the Welcome Garden.",image:"assets/tony.png"},
      {text:"He sees a blue book near the path.",image:"assets/environments/welcome_garden.png"},
      {text:"The book has a picture of a dog on the cover.",image:"assets/alphabet-blocks.png"},
      {text:"Tony picks up the book and looks for its owner.",image:"assets/tony.png"},
      {text:"Bear says, “That is my book. Thank you, Tony!”",image:"assets/bear.png"}
    ];

    lesson.reader2.rewardPiece=REWARDS.reader2;
    lesson.reader2.pages=[
      {text:"Tony carries the book to Bear beside the garden path.",image:"assets/environments/welcome_garden.png"},
      {text:"A small Academy map slips out from between the pages.",image:"assets/alphabet-blocks.png"},
      {text:"The map shows a flag, a bell, a statue, and paw-print stones.",image:"assets/objects/academy_flag.png"},
      {text:"Captain Fritz says, “These are the next pieces for our Academy garden.”",image:"assets/captain_fritz.png"},
      {text:"The friends decide where each new piece should go.",image:"assets/environments/welcome_garden.png"}
    ];

    lesson.build={
      areaId:"welcome-garden",
      stage:2,
      title:"Build the Academy Welcome Corner",
      requiredPieces:["academy-mailbox","academy-flag","paw-print-stepping-stones","captain-fritz-statue","academy-bell"],
      completionMessage:"You completed a new Academy Welcome Corner with five brand-new pieces."
    };
  }

  function installStyles(){
    if(document.getElementById("lesson2-production-50-37")) return;
    const style=document.createElement("style");
    style.id="lesson2-production-50-37";
    style.textContent=`
      .fritz-l2-overlay{position:fixed;inset:0;z-index:180000;background:rgba(4,18,38,.97);display:grid;place-items:center;padding:12px;font-family:Arial,sans-serif}
      .fritz-l2-shell{width:min(1120px,98vw);height:min(720px,95vh);background:#fffaf0;border:6px solid #f5c542;border-radius:24px;overflow:hidden;display:grid;grid-template-rows:auto 1fr auto;color:#102342}
      .fritz-l2-head{background:#123f79;color:white;padding:16px 22px;border-bottom:4px solid #f5c542}.fritz-l2-head h1{margin:0;font-size:32px}.fritz-l2-head p{margin:6px 0 0;color:#ffe27a;font-weight:800}
      .fritz-l2-main{display:grid;grid-template-columns:280px 1fr;min-height:0}.fritz-l2-letters{padding:18px;background:#edf5ff;border-right:4px solid #123f79}.fritz-l2-letter{width:100%;padding:14px;margin-bottom:14px;border:4px solid #174ea6;border-radius:16px;background:white;font-size:34px;font-weight:900;cursor:pointer}.fritz-l2-letter.selected{background:#fff0a8;outline:5px solid #f5c542}.fritz-l2-letter small{display:block;font-size:15px;margin-top:5px;color:#46566f}
      .fritz-l2-pictures{padding:20px;display:grid;grid-template-columns:repeat(3,1fr);gap:16px;overflow:auto;background:linear-gradient(#fffdf6,#edf8e9)}.fritz-l2-picture{min-height:150px;border:4px dashed #7990aa;border-radius:18px;background:white;display:grid;place-items:center;text-align:center;font-size:22px;font-weight:900;cursor:pointer}.fritz-l2-picture .emoji{font-size:64px}.fritz-l2-picture.correct{border-style:solid;border-color:#2f7d32;background:#e4f7e5}.fritz-l2-picture.wrong{border-color:#b5462d;background:#ffe7df}
      .fritz-l2-foot{padding:12px 18px;background:#fff2bf;border-top:4px solid #123f79;display:flex;justify-content:space-between;align-items:center;gap:12px;font-weight:900}.fritz-l2-foot button{padding:11px 18px;border:3px solid #102342;border-radius:13px;background:white;font-size:17px;font-weight:900}.fritz-l2-foot .finish{background:#f5c542}
      @media(max-width:760px){.fritz-l2-main{grid-template-columns:1fr;grid-template-rows:190px 1fr}.fritz-l2-letters{display:flex;gap:10px;overflow:auto;border-right:0;border-bottom:4px solid #123f79}.fritz-l2-letter{min-width:180px}.fritz-l2-pictures{grid-template-columns:repeat(2,1fr)}}
    `;
    document.head.appendChild(style);
  }

  function openPictureMatch(engine,onComplete){
    document.querySelector(".fritz-l2-overlay")?.remove();
    const overlay=document.createElement("div"); overlay.className="fritz-l2-overlay";
    const shell=document.createElement("section"); shell.className="fritz-l2-shell";
    shell.innerHTML='<header class="fritz-l2-head"><h1>D, E, and F Picture Match</h1><p>Choose a letter, then choose every picture that begins with that sound.</p></header>';
    const main=document.createElement("div"); main.className="fritz-l2-main";
    const bank=document.createElement("aside"); bank.className="fritz-l2-letters";
    const pictures=document.createElement("section"); pictures.className="fritz-l2-pictures";
    const footer=document.createElement("footer"); footer.className="fritz-l2-foot";
    const status=document.createElement("span");
    const chant=document.createElement("button"); chant.textContent="Hear Sound Chant";
    const finish=document.createElement("button"); finish.className="finish"; finish.textContent="Finish Phonics"; finish.disabled=true;
    footer.append(status,chant,finish); main.append(bank,pictures); shell.append(main,footer); overlay.appendChild(shell); document.body.appendChild(overlay);

    let selected=""; let matched=0;
    const rounds=LETTERS.flatMap(l=>l.examples.slice(0,2).map(e=>({letter:l.upper,word:e.word,picture:e.picture}))).sort(()=>Math.random()-.5);
    const refresh=()=>{status.textContent=`${matched} of ${rounds.length} pictures matched`;finish.disabled=matched<rounds.length;bank.querySelectorAll("button").forEach(b=>b.classList.toggle("selected",b.dataset.letter===selected));};

    LETTERS.forEach(l=>{const b=document.createElement("button");b.className="fritz-l2-letter";b.dataset.letter=l.upper;b.innerHTML=`${l.upper} ${l.lower}<small>${l.cue}</small>`;b.onclick=()=>{selected=l.upper;engine.speakText(l.cue);refresh();};bank.appendChild(b);});
    rounds.forEach(r=>{const card=document.createElement("button");card.className="fritz-l2-picture";card.innerHTML=`<span class="emoji">${r.picture}</span><span>${r.word}</span>`;card.onclick=()=>{if(card.classList.contains("correct"))return;if(!selected){status.textContent="Choose D, E, or F first.";return;}if(selected===r.letter){card.classList.add("correct");matched++;engine.speakText(`${r.word} begins with ${r.letter}.`);refresh();}else{card.classList.add("wrong");engine.speakText(`Try again. Listen to the first sound in ${r.word}.`);setTimeout(()=>card.classList.remove("wrong"),500);}};pictures.appendChild(card);});
    chant.onclick=()=>engine.speakText("D says d d dog. E says e e egg. F says f f fish.");
    finish.onclick=()=>{overlay.remove();onComplete();};
    refresh();
  }

  function installLatePatches(){
    if(typeof LessonEngine==="undefined") return;

    const originalGreeting=LessonEngine.prototype.showGreeting;
    LessonEngine.prototype.showGreeting=function(index){
      if(this.levelId!=="1-B") return originalGreeting.apply(this,arguments);
      this.setSection("greeting");
      const line=this.lesson.intro[index];
      if(!line){this.showFeelingsActivityIntro();return;}
      const text=this.replaceName(line.text);
      const objects=[
        this.scene.add.text(0,-155,line.speaker||"Captain Fritz",{fontSize:"27px",fontStyle:"bold",color:"#174ea6"}).setOrigin(.5),
        this.scene.add.text(0,-25,text,{fontSize:"29px",fontStyle:"bold",color:"#102342",align:"center",wordWrap:{width:670}}).setOrigin(.5)
      ];
      if(line.responseType==="feeling"){
        const xs=[-220,0,220];(this.lesson.feelingChoices||[]).forEach((choice,i)=>{objects.push(this.scene.add.text(xs[i],65,choice.emoji,{fontSize:"48px"}).setOrigin(.5));objects.push(this.scene.panels.makeButton(xs[i],145,choice.label,()=>{this.progress().feeling=choice.id;saveGame(this.scene.save);this.showGreeting(index+1);},{fontSize:"19px"}));});
      }else{objects.push(this.scene.panels.makeButton(-145,170,"Hear It",()=>this.speakText(text),{backgroundColor:"#fff"}));objects.push(this.scene.panels.makeButton(145,170,"Next",()=>this.showGreeting(index+1)));}
      this.scene.panels.open(objects,{width:820,height:520});
    };

    const originalIntro=LessonEngine.prototype.showFeelingsActivityIntro;
    LessonEngine.prototype.showFeelingsActivityIntro=function(){
      if(this.levelId!=="1-B") return originalIntro.apply(this,arguments);
      this.setSection("beginning-sounds");
      openPictureMatch(this,()=>this.rewardPiece(REWARDS.conversation,"You matched D, E, and F to their pictures!",()=>this.startStory()));
    };

    const originalPhonics=LessonEngine.prototype.showPhonics;
    LessonEngine.prototype.showPhonics=function(){
      if(this.levelId!=="1-B") return originalPhonics.apply(this,arguments);
      this.stopMedia();this.setSection("phonics");
      openPictureMatch(this,()=>this.rewardPiece(REWARDS.phonics,"You completed the D, E, and F sound workshop!",()=>this.startReader(this.lesson.reader1,"reader1")));
    };
  }

  patchLesson();
  installStyles();
  installLatePatches();
  window.FritzLesson2ProductionRepair5037={version:"50.37",patchLesson};
})();