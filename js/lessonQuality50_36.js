/* Fritz Academy lesson quality upgrade v50.36
   Production repairs for the first four lessons:
   - Captain Fritz introduces himself only in Lesson 1.
   - Lessons 2-4 use welcome-back continuity and cumulative review.
   - Each lesson teaches three letters with sound-picture matching.
   - Replaces babyish letter-to-letter practice with drag/drop and tap-to-match play.
*/
(function(){
  "use strict";

  const LESSON_UPGRADES={
    "1-A":{
      intro:[
        {speaker:"Captain Fritz",text:"Hello! My name is Captain Fritz."},
        {speaker:"Captain Fritz",text:"Welcome to Fritz Academy. We are going to learn, read, play, and build together."},
        {speaker:"Captain Fritz",text:"What is your name?",responseType:"name"},
        {speaker:"Captain Fritz",text:"It is wonderful to meet you, {studentName}!"},
        {speaker:"Captain Fritz",text:"How are you today?",responseType:"feeling"},
        {speaker:"Captain Fritz",text:"Today we will learn the letters A, B, and C. Then we will add new pieces to the Welcome Garden."}
      ],
      phonics:{
        title:"A, B, and C Sound Workshop",
        review:[],
        letters:[
          {upper:"A",lower:"a",sound:"short a",cue:"A says /a/ as in apple.",examples:[{word:"apple",picture:"🍎"},{word:"ant",picture:"🐜"},{word:"alligator",picture:"🐊"}]},
          {upper:"B",lower:"b",sound:"b",cue:"B says /b/ as in ball.",examples:[{word:"ball",picture:"⚽"},{word:"book",picture:"📘"},{word:"bee",picture:"🐝"}]},
          {upper:"C",lower:"c",sound:"hard c",cue:"C says /k/ as in cat.",examples:[{word:"cat",picture:"🐱"},{word:"car",picture:"🚗"},{word:"cake",picture:"🎂"}]}
        ],
        chant:"A says a-a-apple. B says b-b-ball. C says c-c-cat. A, B, C — sounds for me!"
      }
    },
    "1-B":{
      intro:[
        {speaker:"Captain Fritz",text:"Hello, {studentName}! Welcome back to Fritz Academy!"},
        {speaker:"Captain Fritz",text:"Last time you learned A, B, and C and began the Welcome Garden."},
        {speaker:"Captain Fritz",text:"How are you today?",responseType:"feeling"},
        {speaker:"Captain Fritz",text:"Tell me one letter you remember from our last class.",responseType:"say"},
        {speaker:"Captain Fritz",text:"Excellent. Today we will learn D, E, and F and use them in a new picture game."}
      ],
      phonics:{
        title:"D, E, and F Sound Workshop",
        review:["A","B","C"],
        letters:[
          {upper:"D",lower:"d",sound:"d",cue:"D says /d/ as in dog.",examples:[{word:"dog",picture:"🐶"},{word:"duck",picture:"🦆"},{word:"drum",picture:"🥁"}]},
          {upper:"E",lower:"e",sound:"short e",cue:"E says /e/ as in egg.",examples:[{word:"egg",picture:"🥚"},{word:"elephant",picture:"🐘"},{word:"elbow",picture:"💪"}]},
          {upper:"F",lower:"f",sound:"f",cue:"F says /f/ as in fish.",examples:[{word:"fish",picture:"🐟"},{word:"frog",picture:"🐸"},{word:"flower",picture:"🌼"}]}
        ],
        chant:"D says d-d-dog. E says e-e-egg. F says f-f-fish. D, E, F — sounds are fun!"
      }
    },
    "1-C":{
      intro:[
        {speaker:"Captain Fritz",text:"Hello, {studentName}! Welcome back! I am happy to see you again."},
        {speaker:"Captain Fritz",text:"You already know A through F. That is six letters!"},
        {speaker:"Captain Fritz",text:"How are you today?",responseType:"feeling"},
        {speaker:"Captain Fritz",text:"Today we will add G, H, and I. Listen carefully for the first sound in each word."}
      ],
      phonics:{
        title:"G, H, and I Sound Workshop",
        review:["A","B","C","D","E","F"],
        letters:[
          {upper:"G",lower:"g",sound:"hard g",cue:"G says /g/ as in goat.",examples:[{word:"goat",picture:"🐐"},{word:"gift",picture:"🎁"},{word:"grapes",picture:"🍇"}]},
          {upper:"H",lower:"h",sound:"h",cue:"H says /h/ as in hat.",examples:[{word:"hat",picture:"🎩"},{word:"house",picture:"🏠"},{word:"horse",picture:"🐴"}]},
          {upper:"I",lower:"i",sound:"short i",cue:"I says /i/ as in insect.",examples:[{word:"insect",picture:"🐞"},{word:"igloo",picture:"🧊"},{word:"ink",picture:"🖋️"}]}
        ],
        chant:"G says g-g-goat. H says h-h-hat. I says i-i-insect. G, H, I — give it a try!"
      }
    },
    "1-D":{
      intro:[
        {speaker:"Captain Fritz",text:"Hello, {studentName}! Welcome back to Fritz Academy!"},
        {speaker:"Captain Fritz",text:"You have learned A through I. Today we will reach twelve letters."},
        {speaker:"Captain Fritz",text:"How are you today?",responseType:"feeling"},
        {speaker:"Captain Fritz",text:"Our new letters are J, K, and L. We will listen, sort pictures, and read the beginning sounds."}
      ],
      phonics:{
        title:"J, K, and L Sound Workshop",
        review:["A","B","C","D","E","F","G","H","I"],
        letters:[
          {upper:"J",lower:"j",sound:"j",cue:"J says /j/ as in jam.",examples:[{word:"jam",picture:"🍓"},{word:"jet",picture:"✈️"},{word:"juice",picture:"🧃"}]},
          {upper:"K",lower:"k",sound:"k",cue:"K says /k/ as in kite.",examples:[{word:"kite",picture:"🪁"},{word:"key",picture:"🔑"},{word:"king",picture:"🤴"}]},
          {upper:"L",lower:"l",sound:"l",cue:"L says /l/ as in lion.",examples:[{word:"lion",picture:"🦁"},{word:"leaf",picture:"🍃"},{word:"lamp",picture:"💡"}]}
        ],
        chant:"J says j-j-jam. K says k-k-kite. L says l-l-lion. J, K, L — listen well!"
      }
    }
  };

  function applyLessonData(){
    Object.entries(LESSON_UPGRADES).forEach(([id,upgrade])=>{
      const lesson=typeof findLevel==="function"?findLevel(id):null;
      if(!lesson) return;
      lesson.unlocked=true;
      lesson.intro=upgrade.intro;
      lesson.phonics=Object.assign({},lesson.phonics||{},upgrade.phonics,{
        rewardPiece:(lesson.phonics&&lesson.phonics.rewardPiece)||null
      });
      lesson.objectives=lesson.objectives||{};
      lesson.objectives.phonics=[
        `Recognize and name ${upgrade.phonics.letters.map(l=>l.upper).join(", ")}.`,
        "Connect each beginning sound to meaningful pictures and words.",
        upgrade.phonics.review.length?`Review ${upgrade.phonics.review.join(", ")}.`:"Build a strong first-letter foundation."
      ];
    });
  }

  function makeHtmlButton(label,className){
    const button=document.createElement("button");
    button.type="button";
    button.className=className||"";
    button.textContent=label;
    return button;
  }

  function installStyles(){
    if(document.getElementById("fritz-lesson-quality-50-36")) return;
    const style=document.createElement("style");
    style.id="fritz-lesson-quality-50-36";
    style.textContent=`
      .fritz-phonics-overlay{position:fixed;inset:0;z-index:120000;background:rgba(6,20,39,.96);display:grid;place-items:center;padding:10px;box-sizing:border-box;font-family:Arial,sans-serif;color:#102342}
      .fritz-phonics-shell{width:min(1180px,98vw);height:min(760px,96vh);background:#fffaf0;border:6px solid #f6c744;border-radius:26px;display:grid;grid-template-rows:auto 1fr auto;overflow:hidden;box-shadow:0 24px 80px rgba(0,0,0,.5)}
      .fritz-phonics-header{padding:14px 20px;background:linear-gradient(100deg,#082c62,#14599c);color:white;border-bottom:4px solid #f6c744}.fritz-phonics-header h1{margin:0;font-size:32px}.fritz-phonics-header p{margin:6px 0 0;color:#ffe27a;font-weight:800}
      .fritz-phonics-main{display:grid;grid-template-columns:300px 1fr;min-height:0}.fritz-letter-bank{padding:16px;background:#eef6ff;border-right:4px solid #174ea6;overflow:auto}.fritz-picture-zone{padding:18px;overflow:auto;background:linear-gradient(#fffdf5,#eaf7df)}
      .fritz-letter-card{width:100%;margin:0 0 12px;padding:12px;border:4px solid #174ea6;border-radius:18px;background:#fff;font-size:30px;font-weight:900;color:#102342;cursor:grab;box-shadow:0 5px 12px rgba(0,0,0,.12)}.fritz-letter-card.is-selected{outline:6px solid #f6c744;background:#fff4bd}.fritz-letter-card small{display:block;font-size:15px;color:#46566f;margin-top:5px}
      .fritz-picture-grid{display:grid;grid-template-columns:repeat(3,minmax(150px,1fr));gap:16px}.fritz-picture-card{min-height:155px;border:4px dashed #7890aa;border-radius:20px;background:#fff;display:grid;place-items:center;text-align:center;padding:12px;font-weight:900;font-size:22px;cursor:pointer}.fritz-picture-card .pic{font-size:62px}.fritz-picture-card.correct{border-style:solid;border-color:#2f7d32;background:#e6f7e7}.fritz-picture-card.wrong{border-color:#b5462d;background:#ffe8e1;animation:fritzShake .25s linear 2}
      .fritz-phonics-footer{padding:12px;background:#fff4c9;border-top:4px solid #174ea6;display:flex;justify-content:space-between;align-items:center;gap:12px}.fritz-phonics-status{font-weight:900;font-size:18px}.fritz-phonics-footer button{border:3px solid #102342;border-radius:14px;padding:11px 18px;font-size:17px;font-weight:900;background:#fff;cursor:pointer}.fritz-phonics-footer .primary{background:#f6c744}
      @keyframes fritzShake{25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}
      @media(max-width:760px){.fritz-phonics-main{grid-template-columns:1fr;grid-template-rows:190px 1fr}.fritz-letter-bank{display:flex;gap:10px;border-right:0;border-bottom:4px solid #174ea6}.fritz-letter-card{min-width:180px}.fritz-picture-grid{grid-template-columns:repeat(2,1fr)}}
    `;
    document.head.appendChild(style);
  }

  function shuffled(array){
    return array.slice().sort(()=>Math.random()-.5);
  }

  function openPhonicsGame(engine){
    const phonics=engine.lesson&&engine.lesson.phonics;
    const letters=phonics&&Array.isArray(phonics.letters)?phonics.letters:[];
    if(!letters.length){
      engine.startReader(engine.lesson.reader1,"reader1");
      return;
    }

    document.querySelector(".fritz-phonics-overlay")?.remove();
    const overlay=document.createElement("div");
    overlay.className="fritz-phonics-overlay";
    const shell=document.createElement("section");
    shell.className="fritz-phonics-shell";
    const header=document.createElement("header");
    header.className="fritz-phonics-header";
    header.innerHTML=`<h1>${phonics.title||"Phonics Picture Match"}</h1><p>Drag a letter to a picture, or tap a letter and then tap its matching picture.</p>`;

    const main=document.createElement("div");
    main.className="fritz-phonics-main";
    const bank=document.createElement("aside");
    bank.className="fritz-letter-bank";
    const zone=document.createElement("section");
    zone.className="fritz-picture-zone";
    const grid=document.createElement("div");
    grid.className="fritz-picture-grid";
    zone.appendChild(grid);
    main.append(bank,zone);

    const footer=document.createElement("footer");
    footer.className="fritz-phonics-footer";
    const status=document.createElement("div");
    status.className="fritz-phonics-status";
    const hear=makeHtmlButton("Hear the Sound Chant");
    const continueButton=makeHtmlButton("Finish Phonics","primary");
    continueButton.disabled=true;
    footer.append(status,hear,continueButton);

    let selected="";
    let correct=0;
    const rounds=shuffled(letters.flatMap(letter=>letter.examples.slice(0,2).map(example=>({letter:letter.upper,example,cue:letter.cue}))));
    const total=rounds.length;

    const refresh=()=>{
      status.textContent=`${correct} of ${total} pictures matched`;
      continueButton.disabled=correct<total;
      bank.querySelectorAll(".fritz-letter-card").forEach(card=>card.classList.toggle("is-selected",card.dataset.letter===selected));
    };

    letters.forEach(letter=>{
      const card=makeHtmlButton(`${letter.upper}  ${letter.lower}` ,"fritz-letter-card");
      card.dataset.letter=letter.upper;
      card.draggable=true;
      card.innerHTML=`${letter.upper} &nbsp; ${letter.lower}<small>${letter.cue}</small>`;
      card.addEventListener("click",()=>{selected=letter.upper;refresh();engine.speakText(letter.cue);});
      card.addEventListener("dragstart",event=>{selected=letter.upper;event.dataTransfer.setData("text/plain",letter.upper);refresh();});
      bank.appendChild(card);
    });

    rounds.forEach(round=>{
      const card=document.createElement("button");
      card.type="button";
      card.className="fritz-picture-card";
      card.dataset.answer=round.letter;
      card.innerHTML=`<span class="pic">${round.example.picture}</span><span>${round.example.word}</span>`;
      const tryMatch=letter=>{
        if(card.classList.contains("correct")||!letter) return;
        if(letter===round.letter){
          card.classList.remove("wrong");
          card.classList.add("correct");
          card.disabled=true;
          correct++;
          engine.speakText(`${round.letter}. ${round.example.word}. Correct!`);
          selected="";
          refresh();
        }else{
          card.classList.remove("wrong");
          void card.offsetWidth;
          card.classList.add("wrong");
          engine.speakText(`Try again. Listen to ${round.example.word}.`);
        }
      };
      card.addEventListener("click",()=>tryMatch(selected));
      card.addEventListener("dragover",event=>event.preventDefault());
      card.addEventListener("drop",event=>{event.preventDefault();tryMatch(event.dataTransfer.getData("text/plain")||selected);});
      grid.appendChild(card);
    });

    hear.addEventListener("click",()=>engine.speakText(phonics.chant));
    continueButton.addEventListener("click",()=>{
      if(continueButton.disabled) return;
      overlay.remove();
      engine.rewardPiece(
        phonics.rewardPiece,
        `You matched ${letters.map(l=>l.upper).join(", ")} to their beginning-sound pictures!`,
        ()=>engine.startReader(engine.lesson.reader1,"reader1")
      );
    });

    shell.append(header,main,footer);
    overlay.appendChild(shell);
    document.body.appendChild(overlay);
    refresh();
  }

  function installEnginePatches(){
    if(typeof LessonEngine==="undefined") return;

    LessonEngine.prototype.showGreeting=function(index){
      this.setSection("greeting");
      const conversation=Array.isArray(this.lesson.intro)&&this.lesson.intro.length?this.lesson.intro:[{speaker:"Captain Fritz",text:"Hello, {studentName}!"}];
      const line=conversation[index];
      if(!line){ this.showFeelingsActivityIntro(); return; }
      const textValue=this.replaceName(line.text||"");
      const speaker=this.scene.add.text(0,-165,line.speaker||"Captain Fritz",{fontSize:"27px",fontStyle:"bold",color:"#174ea6"}).setOrigin(.5);
      const dialogue=this.scene.add.text(0,-35,textValue,{fontSize:"29px",fontStyle:"bold",color:"#102342",align:"center",wordWrap:{width:670},lineSpacing:8}).setOrigin(.5);
      const objects=[speaker,dialogue];
      const next=()=>this.showGreeting(index+1);

      if(line.responseType==="name"){
        objects.push(this.scene.add.text(0,80,`My name is ${this.studentName}.`,{fontSize:"25px",fontStyle:"bold",color:"#102342",backgroundColor:"#fff",padding:{x:22,y:12}}).setOrigin(.5));
        objects.push(this.scene.panels.makeButton(0,175,"I Said My Name",next));
      }else if(line.responseType==="feeling"){
        const choices=this.lesson.feelingChoices||[];
        const xs=choices.length===3?[-220,0,220]:choices.map((_,i)=>(i-(choices.length-1)/2)*180);
        choices.forEach((choice,i)=>{
          objects.push(this.scene.add.text(xs[i],55,choice.emoji||"🙂",{fontSize:"48px"}).setOrigin(.5));
          objects.push(this.scene.panels.makeButton(xs[i],135,choice.label,()=>{this.progress().feeling=choice.id;saveGame(this.scene.save);this.showFeelingResponse(choice);},{fontSize:"19px",padding:{x:12,y:8}}));
        });
      }else if(line.responseType==="say"){
        objects.push(this.scene.panels.makeButton(-145,170,"Hear It",()=>this.speakText(textValue),{backgroundColor:"#fff"}));
        objects.push(this.scene.panels.makeButton(145,170,"I Said It",next));
      }else{
        objects.push(this.scene.panels.makeButton(-145,170,"Hear It",()=>this.speakText(textValue),{backgroundColor:"#fff"}));
        objects.push(this.scene.panels.makeButton(145,170,"Next",next));
      }
      this.scene.panels.open(objects,{width:820,height:520});
    };

    LessonEngine.prototype.showPhonics=function(){
      this.stopMedia();
      this.setSection("phonics");
      const phonics=this.lesson.phonics||{};
      const letters=Array.isArray(phonics.letters)?phonics.letters:[];
      if(!letters.length){ openPhonicsGame(this); return; }
      const title=this.scene.add.text(0,-205,phonics.title||"Phonics Workshop",{fontSize:"33px",fontStyle:"bold",color:"#102342"}).setOrigin(.5);
      const reviewText=phonics.review&&phonics.review.length?`Quick review: ${phonics.review.join("  ")}`:"Our first sound set";
      const review=this.scene.add.text(0,-158,reviewText,{fontSize:"19px",fontStyle:"bold",color:"#46566f"}).setOrigin(.5);
      const xs=letters.length===3?[-220,0,220]:letters.map((_,i)=>(i-(letters.length-1)/2)*185);
      const objects=[title,review];
      letters.forEach((letter,i)=>{
        objects.push(this.scene.add.text(xs[i],-55,`${letter.upper} ${letter.lower}`,{fontSize:"58px",fontStyle:"bold",color:"#174ea6"}).setOrigin(.5));
        objects.push(this.scene.add.text(xs[i],45,letter.examples.map(e=>`${e.picture} ${e.word}`).join("\n"),{fontSize:"21px",fontStyle:"bold",color:"#102342",align:"center",lineSpacing:6}).setOrigin(.5));
        objects.push(this.scene.panels.makeButton(xs[i],145,"Hear Sound",()=>this.speakText(letter.cue),{fontSize:"17px",padding:{x:12,y:7},backgroundColor:"#fff"}));
      });
      objects.push(this.scene.panels.makeButton(-165,220,"Sound Chant",()=>this.speakText(phonics.chant),{backgroundColor:"#fff"}));
      objects.push(this.scene.panels.makeButton(165,220,"Play Picture Match",()=>openPhonicsGame(this)));
      this.scene.panels.open(objects,{width:860,height:610});
    };

    LessonEngine.prototype.startPhonicsPractice=function(){ openPhonicsGame(this); };
  }

  applyLessonData();
  installStyles();
  installEnginePatches();
  window.FritzLessonQuality5036={version:"50.36",upgrades:LESSON_UPGRADES,openPhonicsGame};
})();