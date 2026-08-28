/* Canonical Fritz Academy foundation runtime lessons 1-3.
   Replaces instructional content in legacy runtime IDs 1-A, 1-B, 1-C while
   preserving IDs, completion/unlock flow, builder areas, and student saves. */
(function(){
  if(typeof LEVELS === 'undefined' || !Array.isArray(LEVELS)) return;

  const musicBox = {
    title:'Fritz Academy Alphabet Song',
    rewardMessage:'Open the Music Box and sing the alphabet with Fritz!',
    assetPath:'assets/audio/alphabet-song.mp3',
    videoPath:'assets/video/alphabet-song.mp4'
  };
  const closing = {
    title:'Fritz Academy Welcome Theme',
    assetPath:'assets/audio/fritz-academy-theme.mp3',
    videoPath:'assets/video/fritz-academy-theme.mp4',
    rewardMessage:'Great work. Celebrate with the Academy friends!'
  };
  function replaceLesson(id, lesson){
    const i = LEVELS.findIndex(x=>x && x.id===id);
    if(i >= 0) LEVELS[i] = lesson;
    else LEVELS.push(lesson);
  }

  replaceLesson('1-A', {
    id:'1-A', chapter:'Week 1', title:'What Is It? A B C', unlocked:true,
    reward:'Welcome Garden — ABC Gate', buildArea:'welcome-garden', buildStage:1,
    canonicalLesson:1,
    objectives:{
      speaking:['Say hello and tell your name.','Answer “What is this?” with “It is a ___.”','Say A, B, and C and their first useful sounds.'],
      listening:['Understand hello, name, and the question word what.','Follow look, listen, point, and choose.','Hear the beginning sounds in apple, ball, and cat.'],
      reading:['Recognize A, B, C and a, b, c.','Read the sight words I, a, my, is in modeled phrases.','Read two highly controlled beginner readers.'],
      writing:['Identify and trace/copy A a, B b, C c.'],
      phonics:['Connect A with short /a/ in apple.','Connect B with /b/ in ball.','Connect C with hard /k/ in cat.']
    },
    vocabulary:[
      {word:'hello',display:'Hello!',picture:'👋'},
      {word:'name',display:'My name is ___.',picture:'🏷️'},
      {word:'what',display:'What is this?',picture:'❓'},
      {word:'apple',display:'an apple',picture:'🍎'},
      {word:'ball',display:'a ball',picture:'⚽'},
      {word:'cat',display:'a cat',picture:'🐱'}
    ],
    intro:[
      {speaker:'Captain Fritz',text:'Hello! My name is Captain Fritz.'},
      {speaker:'Captain Fritz',text:'What is your name?',responseType:'name'},
      {speaker:'Captain Fritz',text:'Today we learn a powerful question: WHAT. What asks us about a thing.'},
      {speaker:'Captain Fritz',text:'Look, listen, point, and choose. Then we will build the first Academy gate.'}
    ],
    feelingChoices:[
      {id:'ready',label:'I am ready.',emoji:'⭐'},
      {id:'happy',label:'I am happy.',emoji:'😀'},
      {id:'okay',label:'I am okay.',emoji:'🙂'}
    ],
    feelingsActivity:{
      title:'What Is This?', instructions:'Look at the picture. Choose the complete answer.',
      questions:[
        {emoji:'🍎',prompt:'What is this?',options:['It is an apple.','It is a ball.','It is a cat.'],answer:'It is an apple.'},
        {emoji:'⚽',prompt:'What is this?',options:['It is a cat.','It is a ball.','It is an apple.'],answer:'It is a ball.'},
        {emoji:'🐱',prompt:'What is this?',options:['It is a cat.','It is an apple.','It is a ball.'],answer:'It is a cat.'}
      ],
      rewardPiece:{id:'abc-sign',name:'ABC Welcome Sign',icon:'🔤',area:'welcome-garden',lesson:'1-A'}
    },
    story:{
      title:'Three Things at the Academy Gate',
      pages:[
        {text:'Captain Fritz waits at the Academy gate.',image:'assets/captain_fritz.png'},
        {text:'Bash finds an apple beside the path.',image:'assets/bash.png'},
        {text:'Bear finds a ball near the gate.',image:'assets/bear.png'},
        {text:'Nola sees a cat sitting by the garden.',image:'assets/nola.png'},
        {text:'Fritz asks, “What is this?” The friends name each thing.',image:'assets/captain_fritz.png'},
        {text:'A is for apple. B is for ball. C is for cat. The first gate begins to open!',image:'assets/alphabet-blocks.png'}
      ],
      questions:[
        {prompt:'What does Bash find?',options:['An apple','A ball','A cat'],answer:'An apple'},
        {prompt:'What does Bear find?',options:['A ball','An apple','A book'],answer:'A ball'},
        {prompt:'What question does Fritz ask?',options:['What is this?','Where is this?','Why is this?'],answer:'What is this?'}
      ],
      rewardPiece:{id:'abc-gate',name:'ABC Garden Gate',icon:'🚪',area:'welcome-garden',lesson:'1-A'}
    },
    alphabetSong:Object.assign({},musicBox),
    phonics:{
      letterUpper:'A B C', letterLower:'a b c', soundLabel:'short a, /b/, hard c /k/',
      teacherCue:'Say the letter, then the sound anchor: A—apple, B—ball, C—cat.',
      examples:[{word:'apple',icon:'🍎'},{word:'ant',icon:'🐜'},{word:'ball',icon:'⚽'},{word:'book',icon:'📘'},{word:'cat',icon:'🐱'},{word:'cup',icon:'🥤'}],
      recognitionQuestion:{prompt:'Choose the letters for this lesson.',options:['A B C','D E F','G H I'],answer:'A B C'},
      lowercaseQuestion:{prompt:'Choose the matching lowercase letters.',options:['a b c','d e f','g h i'],answer:'a b c'},
      wordQuestion:{prompt:'Which set starts with A, B, and C?',options:['apple, ball, cat','dog, egg, fish','goat, hat, igloo'],answer:'apple, ball, cat'},
      rewardPiece:{id:'abc-stones',name:'A B C Letter Stones',icon:'🔤',area:'welcome-garden',lesson:'1-A'}
    },
    reader1:{
      title:'Reader 1: What Is This?',level:'First Reader',
      pages:[
        {text:'I see an apple.',image:'assets/bash.png'},
        {text:'It is an apple.',image:'assets/alphabet-blocks.png'},
        {text:'I see a ball.',image:'assets/bear.png'},
        {text:'It is a ball.',image:'assets/alphabet-blocks.png'},
        {text:'I see a cat.',image:'assets/nola.png'}
      ],
      check:{prompt:'What does the reader see last?',options:['A cat','A ball','An apple'],answer:'A cat'},
      rewardPiece:{id:'abc-reader-bench',name:'ABC Reading Bench',icon:'🪑',area:'welcome-garden',lesson:'1-A'}
    },
    reader2:{
      title:'Reader 2: My Name Is Fritz',level:'Supported',
      pages:[
        {text:'Hello!',image:'assets/captain_fritz.png'},
        {text:'My name is Fritz.',image:'assets/captain_fritz.png'},
        {text:'I see an apple.',image:'assets/bash.png'},
        {text:'I see a ball.',image:'assets/bear.png'},
        {text:'I see a cat.',image:'assets/nola.png'}
      ],
      check:{prompt:'What is the character’s name?',options:['Fritz','Bear','Bash'],answer:'Fritz'},
      rewardPiece:{id:'name-flag',name:'My Name Flag',icon:'🚩',area:'welcome-garden',lesson:'1-A'}
    },
    build:{areaId:'welcome-garden',stage:1,title:'Build the ABC Gate',requiredPieces:['abc-sign','abc-gate','abc-stones','abc-reader-bench','name-flag'],completionMessage:'You built the ABC Gate. You can ask WHAT and answer with a thing.'},
    closingSong:Object.assign({},closing),
    completion:{xp:30,stars:1,unlocks:'1-B',message:'Lesson 1 complete! Lesson 2 is unlocked.'}
  });

  replaceLesson('1-B', {
    id:'1-B',chapter:'Week 1',title:'Who Is It? D E F',unlocked:false,
    reward:'Welcome Garden — DEF Friends',buildArea:'welcome-garden',buildStage:2,canonicalLesson:2,
    objectives:{
      speaking:['Answer “Who is this?” with “This is ___.”','Answer “Who are you?” with “I am ___.”','Say D, E, F and their useful sounds.'],
      listening:['Understand WHO as asking about identity.','Distinguish who from what in modeled questions.','Hear /d/, short /e/, and /f/.'],
      reading:['Recognize D E F and d e f.','Read this, am, you with earlier sight words.','Read controlled identity sentences.'],
      writing:['Identify and trace/copy D d, E e, F f.'],
      phonics:['D—dog /d/.','E—egg short /e/.','F—fish /f/.']
    },
    vocabulary:[
      {word:'who',display:'Who is this?',picture:'❓'},
      {word:'this',display:'This is Fritz.',picture:'👉'},
      {word:'dog',display:'a dog',picture:'🐶'},
      {word:'egg',display:'an egg',picture:'🥚'},
      {word:'fish',display:'a fish',picture:'🐟'},
      {word:'friend',display:'This is my friend.',picture:'🐾'}
    ],
    intro:[
      {speaker:'Captain Fritz',text:'Hello, {studentName}! Yesterday we asked WHAT about things.'},
      {speaker:'Captain Fritz',text:'Today we ask WHO. WHO asks about someone’s identity.'},
      {speaker:'Captain Fritz',text:'Who are you?',responseType:'name'},
      {speaker:'Captain Fritz',text:'Listen for D, E, and F while we meet Academy friends.'}
    ],
    feelingChoices:[{id:'ready',label:'I am ready.',emoji:'⭐'},{id:'happy',label:'I am happy.',emoji:'😀'},{id:'okay',label:'I am okay.',emoji:'🙂'}],
    feelingsActivity:{
      title:'Who Is This?',instructions:'Look at the Academy friend. Choose the complete identity answer.',
      questions:[
        {emoji:'🐾',prompt:'Who is this?',options:['This is Bash.','It is a ball.','It is an apple.'],answer:'This is Bash.'},
        {emoji:'🐾',prompt:'Who is this?',options:['This is Bear.','It is a fish.','It is a cat.'],answer:'This is Bear.'},
        {emoji:'🐾',prompt:'Who is this?',options:['This is Nola.','It is an egg.','It is a book.'],answer:'This is Nola.'}
      ],rewardPiece:{id:'friend-posts',name:'Academy Friend Posts',icon:'🐾',area:'welcome-garden',lesson:'1-B'}
    },
    story:{
      title:'Who Is at the Garden?',pages:[
        {text:'Fritz hears a sound at the garden gate.',image:'assets/captain_fritz.png'},
        {text:'Bash runs up first. Fritz asks, “Who is this?”',image:'assets/bash.png'},
        {text:'“This is Bash,” says Bear.',image:'assets/bear.png'},
        {text:'Nola arrives with a small basket.',image:'assets/nola.png'},
        {text:'The friends find a dog picture, an egg picture, and a fish picture.',image:'assets/alphabet-blocks.png'},
        {text:'D is for dog. E is for egg. F is for fish.',image:'assets/alphabet-blocks.png'}
      ],questions:[
        {prompt:'Who runs up first?',options:['Bash','Nola','Fritz'],answer:'Bash'},
        {prompt:'Which question asks about identity?',options:['Who is this?','What is this?','How many?'],answer:'Who is this?'},
        {prompt:'What begins with F?',options:['Fish','Egg','Dog'],answer:'Fish'}
      ],rewardPiece:{id:'def-friend-gate',name:'DEF Friend Gate',icon:'🚪',area:'welcome-garden',lesson:'1-B'}
    },
    alphabetSong:Object.assign({},musicBox),
    phonics:{letterUpper:'D E F',letterLower:'d e f',soundLabel:'/d/, short e, /f/',teacherCue:'Say: D—dog, E—egg, F—fish.',examples:[{word:'dog',icon:'🐶'},{word:'door',icon:'🚪'},{word:'egg',icon:'🥚'},{word:'elf',icon:'🧝'},{word:'fish',icon:'🐟'},{word:'fan',icon:'🪭'}],recognitionQuestion:{prompt:'Choose D E F.',options:['D E F','A B C','G H I'],answer:'D E F'},lowercaseQuestion:{prompt:'Choose d e f.',options:['d e f','a b c','g h i'],answer:'d e f'},wordQuestion:{prompt:'Which set starts with D, E, F?',options:['dog, egg, fish','apple, ball, cat','goat, hat, igloo'],answer:'dog, egg, fish'},rewardPiece:{id:'def-stones',name:'D E F Letter Stones',icon:'🔤',area:'welcome-garden',lesson:'1-B'}},
    reader1:{title:'Reader 1: Who Is This?',level:'First Reader',pages:[{text:'Who is this?',image:'assets/bash.png'},{text:'This is Bash.',image:'assets/bash.png'},{text:'Who is this?',image:'assets/bear.png'},{text:'This is Bear.',image:'assets/bear.png'},{text:'This is my friend.',image:'assets/nola.png'}],check:{prompt:'Which word asks about identity?',options:['Who','What','Many'],answer:'Who'},rewardPiece:{id:'friend-book',name:'Friend Reader Book',icon:'📘',area:'welcome-garden',lesson:'1-B'}},
    reader2:{title:'Reader 2: I Am Here',level:'Supported',pages:[{text:'I am Fritz.',image:'assets/captain_fritz.png'},{text:'I am here.',image:'assets/captain_fritz.png'},{text:'This is Bash.',image:'assets/bash.png'},{text:'This is Bear.',image:'assets/bear.png'},{text:'This is Nola.',image:'assets/nola.png'}],check:{prompt:'Who says “I am Fritz”?',options:['Fritz','Bear','Nola'],answer:'Fritz'},rewardPiece:{id:'friend-lamp',name:'Friendship Lamp',icon:'🏮',area:'welcome-garden',lesson:'1-B'}},
    build:{areaId:'welcome-garden',stage:2,title:'Build the DEF Friends Corner',requiredPieces:['friend-posts','def-friend-gate','def-stones','friend-book','friend-lamp'],completionMessage:'You built the Friends Corner. You can ask WHO and answer with an identity.'},
    closingSong:Object.assign({},closing),completion:{xp:30,stars:1,unlocks:'1-C',message:'Lesson 2 complete! Lesson 3 is unlocked.'}
  });

  replaceLesson('1-C', {
    id:'1-C',chapter:'Week 1',title:'What or Who? G H I',unlocked:false,
    reward:'Welcome Garden — GHI Question Path',buildArea:'welcome-garden',buildStage:3,canonicalLesson:3,
    objectives:{
      speaking:['Choose WHAT for things and WHO for identities.','Answer simple yes/no questions with a complete model.','Say G, H, I and their useful sounds.'],
      listening:['Understand the difference between WHAT and WHO.','Understand “Is this ___?”','Hear hard /g/, /h/, and short /i/.'],
      reading:['Recognize G H I and g h i.','Read it, yes, no, not with earlier sight words.','Read controlled what/who/yes-no sentences.'],
      writing:['Identify and trace/copy G g, H h, I i.'],
      phonics:['G—goat hard /g/.','H—hat /h/.','I—igloo short /i/.']
    },
    vocabulary:[{word:'what',display:'What is this?',picture:'❓'},{word:'who',display:'Who is this?',picture:'❓'},{word:'yes',display:'Yes, it is.',picture:'✅'},{word:'no',display:'No, it is not.',picture:'❌'},{word:'goat',display:'a goat',picture:'🐐'},{word:'hat',display:'a hat',picture:'🎩'},{word:'igloo',display:'an igloo',picture:'🧊'}],
    intro:[{speaker:'Captain Fritz',text:'You already know WHAT and WHO. Today we choose the right question.'},{speaker:'Captain Fritz',text:'WHAT asks about a thing. WHO asks about identity.'},{speaker:'Captain Fritz',text:'We also answer: Is this ___? Yes, it is. No, it is not.'},{speaker:'Captain Fritz',text:'Then we finish Week 1 with G, H, and I.'}],
    feelingChoices:[{id:'ready',label:'I am ready.',emoji:'⭐'},{id:'happy',label:'I am happy.',emoji:'😀'},{id:'okay',label:'I am okay.',emoji:'🙂'}],
    feelingsActivity:{title:'Choose the Question',instructions:'Decide whether the clue needs WHAT or WHO, then choose the answer.',questions:[{emoji:'⚽',prompt:'You see a ball. Which question fits?',options:['What is this?','Who is this?','Why?'],answer:'What is this?'},{emoji:'🐾',prompt:'You see Captain Fritz. Which question fits?',options:['Who is this?','What is this?','How many?'],answer:'Who is this?'},{emoji:'🎩',prompt:'Is this a hat?',options:['Yes, it is.','No, it is not.','Who is this?'],answer:'Yes, it is.'}],rewardPiece:{id:'question-signs',name:'WHAT and WHO Signs',icon:'❓',area:'welcome-garden',lesson:'1-C'}},
    story:{title:'The Question Path',pages:[{text:'Fritz opens a path with two signs: WHAT and WHO.',image:'assets/captain_fritz.png'},{text:'Bear finds a hat. “What is this?” asks Fritz.',image:'assets/bear.png'},{text:'“It is a hat,” says Bear.',image:'assets/bear.png'},{text:'Bash arrives. “Who is this?” asks Nola.',image:'assets/bash.png'},{text:'“This is Bash,” says Fritz.',image:'assets/captain_fritz.png'},{text:'At the end are G, H, and I blocks: goat, hat, igloo.',image:'assets/alphabet-blocks.png'}],questions:[{prompt:'Which question asks about the hat?',options:['What is this?','Who is this?','When?'],answer:'What is this?'},{prompt:'Which question asks about Bash?',options:['Who is this?','What is this?','Where?'],answer:'Who is this?'},{prompt:'Is the hat a thing?',options:['Yes, it is.','No, it is not.'],answer:'Yes, it is.'}],rewardPiece:{id:'question-path',name:'Question Path',icon:'🪨',area:'welcome-garden',lesson:'1-C'}},
    alphabetSong:Object.assign({},musicBox),
    phonics:{letterUpper:'G H I',letterLower:'g h i',soundLabel:'hard g, /h/, short i',teacherCue:'Say: G—goat, H—hat, I—igloo.',examples:[{word:'goat',icon:'🐐'},{word:'gate',icon:'🚪'},{word:'hat',icon:'🎩'},{word:'hand',icon:'✋'},{word:'igloo',icon:'🧊'},{word:'in',icon:'📥'}],recognitionQuestion:{prompt:'Choose G H I.',options:['G H I','D E F','J K L'],answer:'G H I'},lowercaseQuestion:{prompt:'Choose g h i.',options:['g h i','d e f','j k l'],answer:'g h i'},wordQuestion:{prompt:'Which set starts with G, H, I?',options:['goat, hat, igloo','dog, egg, fish','jam, kite, lamp'],answer:'goat, hat, igloo'},rewardPiece:{id:'ghi-stones',name:'G H I Letter Stones',icon:'🔤',area:'welcome-garden',lesson:'1-C'}},
    reader1:{title:'Reader 1: What? Who?',level:'First Reader',pages:[{text:'What is this?',image:'assets/alphabet-blocks.png'},{text:'It is a hat.',image:'assets/bear.png'},{text:'Who is this?',image:'assets/bash.png'},{text:'This is Bash.',image:'assets/bash.png'},{text:'Yes. Bash is here.',image:'assets/bash.png'}],check:{prompt:'Which question asks about Bash?',options:['Who is this?','What is this?'],answer:'Who is this?'},rewardPiece:{id:'question-book',name:'Question Reader Book',icon:'📗',area:'welcome-garden',lesson:'1-C'}},
    reader2:{title:'Reader 2: Is It?',level:'Supported',pages:[{text:'Is this a hat?',image:'assets/bear.png'},{text:'Yes, it is.',image:'assets/bear.png'},{text:'Is this a cat?',image:'assets/nola.png'},{text:'No, it is not.',image:'assets/nola.png'},{text:'It is a dog.',image:'assets/captain_fritz.png'}],check:{prompt:'How do we answer when the statement is correct?',options:['Yes, it is.','No, it is not.'],answer:'Yes, it is.'},rewardPiece:{id:'yes-no-flags',name:'Yes and No Flags',icon:'🚩',area:'welcome-garden',lesson:'1-C'}},
    build:{areaId:'welcome-garden',stage:3,title:'Build the GHI Question Path',requiredPieces:['question-signs','question-path','ghi-stones','question-book','yes-no-flags'],completionMessage:'Week 1 complete. You know A–I, WHAT, WHO, and basic yes/no answers.'},
    closingSong:Object.assign({},closing),completion:{xp:35,stars:1,unlocks:'1-D',message:'Lesson 3 complete! Your next Academy challenge is unlocked.'}
  });
})();
