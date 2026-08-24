/*
====================================================
FRITZ ACADEMY
Lesson 4 Consolidated Repair 52.2
====================================================
One authoritative Lesson 1-D definition and opening flow.
Replaces the layered 51.x Lesson 4 emergency overrides.
*/
(function(){
  'use strict';

  const level = typeof findLevel === 'function' ? findLevel('1-D') : null;
  if(!level) return;

  const reward = (id, name, image) => ({
    id, name, image, area: 'welcome-garden', lesson: '1-D'
  });

  const scenes = {
    map: 'assets/environments/question-garden-premium.svg',
    flower: 'assets/environments/question-garden-premium.svg',
    butterfly: 'assets/environments/question-garden-premium.svg',
    bell: 'assets/environments/question-garden-premium.svg',
    missing: 'assets/environments/question-garden-premium.svg',
    water: 'assets/environments/question-garden-premium.svg'
  };

  const page = (text, scene) => ({ text, scene, image: scenes[scene] });
  const question = (prompt, options, answer) => ({ prompt, options, answer });

  Object.assign(level, {
    title: 'The Question Garden',
    story: {
      title: 'The Mystery Map',
      pages: [
        page('Captain Fritz and Tony find an old map beside the garden gate. “What is this?” asks Fritz. “It is a map,” says Tony.', 'map'),
        page('Bear follows the map to a blue flower near the big tree. “Where is the blue flower?” he asks. Nola points to it.', 'flower'),
        page('A bright butterfly lands on the flower. “Who can follow the butterfly?” asks Nola. Rascal runs after it.', 'butterfly'),
        page('The Academy bell rings across the garden. “When do we meet at the fountain?” asks Tony. “When the bell rings,” says Fritz.', 'bell'),
        page('The friends reach the fountain, but the watering can is gone. “Why is it missing?” asks Bear. They look for a clue.', 'missing'),
        page('Bash returns with the watering can. “How do we help the garden?” asks Fritz. “We water the flowers together,” says Bash.', 'water')
      ],
      questions: [
        question('What did Fritz and Tony find?', ['A map','A hat','A ball'], 'A map'),
        question('Where was the blue flower?', ['Near the big tree','In the house','Under a bed'], 'Near the big tree'),
        question('Who followed the butterfly?', ['Rascal','Tony','No one'], 'Rascal'),
        question('When do the friends meet?', ['When the bell rings','Next year','At midnight'], 'When the bell rings'),
        question('Why did they look for a clue?', ['The watering can was missing','They were sleepy','It was raining'], 'The watering can was missing'),
        question('How do they help the garden?', ['They water the flowers together','They leave','They hide'], 'They water the flowers together')
      ],
      rewardPiece: reward('question-garden-sign','Question Garden Sign','assets/objects/question-sign-premium.svg')
    },
    reader1: {
      title: 'Reader 1: Six Questions in the Garden',
      pages: [
        page('What did the friends find? They found a map.', 'map'),
        page('Where was the flower? It was near the big tree.', 'flower'),
        page('Who followed the butterfly? Rascal followed it.', 'butterfly'),
        page('When did the friends meet? They met when the bell rang.', 'bell'),
        page('Why did they search? The watering can was missing.', 'missing'),
        page('How did they help? They watered the flowers together.', 'water')
      ],
      questions: [
        question('Which word asks about a thing?', ['What','Who','When'], 'What'),
        question('Which word asks about a place?', ['Where','Why','How'], 'Where'),
        question('Which word asks about a person?', ['Who','What','When'], 'Who'),
        question('Which word asks about time?', ['When','Where','Why'], 'When'),
        question('Which word asks for a reason?', ['Why','Who','What'], 'Why'),
        question('Which word asks how something is done?', ['How','When','Where'], 'How')
      ],
      check: question('Which word asks for a reason?', ['Why','Who','Where'], 'Why'),
      rewardPiece: reward('question-flower-bed','Question Flower Bed','assets/objects/question-flower-bed-premium.svg')
    },
    reader2: {
      title: 'Reader 2: The Garden Is Ready',
      pages: [
        page('The map shows the Question Garden.', 'map'),
        page('The blue flower grows near the tree.', 'flower'),
        page('Rascal follows the butterfly to the fountain.', 'butterfly'),
        page('The bell tells the friends when to meet.', 'bell'),
        page('They search because the watering can is missing.', 'missing'),
        page('Bash brings it back, and everyone waters the garden.', 'water')
      ],
      questions: [
        question('What shows the garden?', ['The map','The bell','The butterfly'], 'The map'),
        question('Where does the flower grow?', ['Near the tree','In the library','On the roof'], 'Near the tree'),
        question('Who follows the butterfly?', ['Rascal','Bear','Captain Fritz'], 'Rascal'),
        question('When do the friends meet?', ['When the bell rings','When they sleep','Next winter'], 'When the bell rings'),
        question('Why do they search?', ['The watering can is missing','They want a snack','The gate is blue'], 'The watering can is missing'),
        question('How do they finish the garden?', ['They water it together','They close it','They run away'], 'They water it together')
      ],
      check: question('How do they help the garden?', ['They water it together','They hide','They sleep'], 'They water it together'),
      rewardPiece: reward('question-lantern','Question Garden Lantern','assets/objects/question-lantern-premium.svg')
    },
    build: {
      areaId: 'welcome-garden',
      stage: 4,
      title: 'Build the Question Garden',
      backgroundImage: 'assets/environments/question-garden-premium.svg',
      requiredPieces: ['question-garden-sign','question-flower-bed','question-lantern'],
      completionMessage: 'You completed the Question Garden.'
    },
    completion: Object.assign({}, level.completion || {}, {
      unlocks: (level.completion && level.completion.unlocks) || '2-A',
      xp: Number.isFinite(level.completion && level.completion.xp) ? level.completion.xp : 100,
      stars: Number.isFinite(level.completion && level.completion.stars) ? level.completion.stars : 3
    })
  });

  const feelings = [
    ['happy','😀','Happy','I am happy.'],
    ['fine','🙂','Fine','I am fine.'],
    ['okay','😐','Okay','I am okay.'],
    ['excited','🤩','Excited','I am excited.'],
    ['tired','😴','Tired','I am tired.'],
    ['sad','😢','Sad','I am sad.']
  ];
  const activities = [
    ['played','⚽','Played','I played.'],
    ['read','📖','Read','I read.'],
    ['watched-tv','📺','Watched TV','I watched TV.'],
    ['studied','✏️','Studied','I studied.'],
    ['ate','🍎','Ate','I ate.'],
    ['went-outside','🌳','Went outside','I went outside.']
  ];

  function style(){
    if(document.getElementById('fritz-l4-52-style')) return;
    const node=document.createElement('style');
    node.id='fritz-l4-52-style';
    node.textContent='.fritz-l4-52{position:fixed;inset:0;z-index:999999;background:#071426e8;display:grid;place-items:center;padding:12px;font-family:Arial,sans-serif}.fritz-l4-52>section{width:min(940px,96vw);max-height:94vh;overflow:auto;background:#fffdf3;border:6px solid #102342;border-radius:18px;padding:24px;box-sizing:border-box;text-align:center}.fritz-l4-52 h1{margin:0 0 10px;font-size:38px;color:#102342}.fritz-l4-52 h2{color:#174ea6}.fritz-l4-52 p{font-size:22px;font-weight:800;color:#46566f}.fritz-l4-52-grid{display:grid;grid-template-columns:repeat(3,minmax(140px,1fr));gap:14px;margin:18px 0}.fritz-l4-52 button{border:4px solid #174ea6;border-radius:14px;background:#fff;padding:14px;font-size:20px;font-weight:900;color:#102342;cursor:pointer}.fritz-l4-52 button.primary{background:#ffc63d;border-color:#102342}.fritz-l4-52 .icon{font-size:52px;display:block}@media(max-width:700px){.fritz-l4-52-grid{grid-template-columns:repeat(2,minmax(120px,1fr))}}';
    document.head.appendChild(node);
  }
  function clear(){ document.querySelectorAll('.fritz-l4-52').forEach(n=>n.remove()); }
  function mount(render){
    style(); clear();
    const overlay=document.createElement('div'); overlay.className='fritz-l4-52';
    const shell=document.createElement('section'); overlay.appendChild(shell);
    render(shell,overlay); document.body.appendChild(overlay);
  }
  function choose(title,help,items,onChoose){
    mount((shell,overlay)=>{
      shell.innerHTML=`<h1>${title}</h1><p>${help}</p>`;
      const grid=document.createElement('div'); grid.className='fritz-l4-52-grid';
      items.forEach(([id,icon,word,sentence])=>{
        const button=document.createElement('button');
        button.innerHTML=`<span class="icon">${icon}</span>${word}<br><small>${sentence}</small>`;
        button.onclick=()=>{ overlay.remove(); onChoose({id,sentence}); };
        grid.appendChild(button);
      });
      shell.appendChild(grid);
    });
  }
  function confirm(title,text,label,next){
    mount((shell,overlay)=>{
      shell.innerHTML=`<h1>${title}</h1><p>${text}</p>`;
      const button=document.createElement('button'); button.className='primary'; button.textContent=label;
      button.onclick=()=>{overlay.remove();next();}; shell.appendChild(button);
    });
  }

  if(typeof LessonEngine !== 'undefined'){
    const originalOpening=LessonEngine.prototype.showMissionOpening;
    const originalGreeting=LessonEngine.prototype.showGreeting;

    LessonEngine.prototype.showMissionOpening=function(){
      if(this.levelId!=='1-D') return originalOpening.call(this);
      this.setSection('opening');
      mount((shell,overlay)=>{
        shell.innerHTML='<h1>Level 1-D</h1><h2>The Question Garden</h2><p>Learn six useful question words:<br><strong>Who • What • Where • When • Why • How</strong></p>';
        const button=document.createElement('button'); button.className='primary'; button.textContent='Start Lesson';
        button.onclick=()=>{overlay.remove();this.showGreeting(0);}; shell.appendChild(button);
      });
    };

    LessonEngine.prototype.showGreeting=function(index){
      if(this.levelId!=='1-D') return originalGreeting.call(this,index);
      this.setSection('greeting');
      if(index===0){
        choose(`Captain Fritz: How are you today, ${this.studentName}?`,'Choose one and say the full sentence.',feelings,choice=>{
          this.progress().feeling=choice.id; saveGame(this.scene.save);
          confirm('Great speaking!',choice.sentence,'Next Question',()=>this.showGreeting(1));
        });
        return;
      }
      if(index===1){
        choose('What did you do between classes?','Choose one and say the full sentence.',activities,choice=>{
          this.progress().betweenClassActivity=choice.id; saveGame(this.scene.save);
          confirm('Good answer!',choice.sentence,'Start Story',()=>{clear();this.questionIndex=0;this.storyPage=0;this.startStory();});
        });
        return;
      }
      clear(); this.startStory();
    };
  }

  const validation = window.LessonValidator && typeof window.LessonValidator.validate === 'function'
    ? window.LessonValidator.validate(level)
    : {valid:true,errors:[]};

  window.FRITZ_LESSON4_REPAIR_REPORT = {
    version: '52.2',
    lessonId: '1-D',
    valid: validation.valid,
    errors: validation.errors || [],
    storyPages: level.story.pages.length,
    reader1Pages: level.reader1.pages.length,
    reader2Pages: level.reader2.pages.length,
    requiredPieces: level.build.requiredPieces.slice(),
    legacyOverridesLoaded: false
  };
})();
