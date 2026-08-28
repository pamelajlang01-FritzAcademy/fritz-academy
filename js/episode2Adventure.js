/* Episode 2 production adventure overlay: Who Took the Flag?
   Keeps Lesson 2 D/E/F + WHO curriculum and save/unlock identity intact. */
(function(){
  if(typeof LEVELS==='undefined'||!Array.isArray(LEVELS)) return;
  const lesson=LEVELS.find(x=>x&&x.id==='1-B'); if(!lesson) return;
  lesson.title='Who Took the Flag?';
  lesson.episode={
    estimatedMinutes:20,
    beats:['hook','characterProblem','discoveryPlay','miniGame','storyTurn','readerMission','builderPayoff','tag'],
    miniGames:['paw-print identity hunt','D/E/F clue match'],
    readerPurpose:'Read the short flag-room clue card to identify who carried the flag and where the next clue is hidden.',
    builderPayoff:'Return the Academy flag and raise it over the Welcome Garden Friends Corner.',
    hook:'The Academy flag is gone just before the Welcome Garden opening.',
    tag:'A metallic CLUNK comes from the newly repaired garden gate. Bash looks over. “That gate did not make that sound yesterday.”'
  };
  lesson.intro=[
    {speaker:'Captain Fritz',text:'The Welcome Garden is almost ready. There is just one problem.'},
    {speaker:'Nola',text:'The flag is gone! The opening cannot start without the Academy flag!'},
    {speaker:'Tony',text:'Everyone stay calm. As acting Chief Flag Investigator, I will question every suspect.'},
    {speaker:'Bash',text:'Tony, we do not have suspects. We have friends. We need clues.'},
    {speaker:'Rascal',text:'Clues? I love clues. Especially clues that are not about me.'},
    {speaker:'Bear',text:'That was a very specific thing to say.'},
    {speaker:'Captain Fritz',text:'Good investigators ask the right question. When we need a name, we ask WHO. Help Bash find out who carried the flag.'}
  ];
  lesson.feelingsActivity.title='Paw-Print Identity Hunt';
  lesson.feelingsActivity.instructions='Follow the paw-print trail. Each stop shows an Academy friend. Use WHO to identify the friend and keep the trail moving.';
  lesson.story={
    title:'Who Took the Flag?',
    pages:[
      {text:'The empty flagpole stands over the Welcome Garden. Nola checks behind it twice, just in case.',image:'assets/nola.png'},
      {text:'Tony points at a paw print. “Aha! Evidence!” Bash looks closer. “Tony, that is your paw print.”',image:'assets/bash.png'},
      {text:'Rascal finds a card marked D beside the path. Bear finds a card marked E near a basket. Bash spots F by the garden fence.',image:'assets/alphabet-blocks.png'},
      {text:'Captain Fritz does not solve the mystery. “You have three clues. What question will help you identify the dog in each clue?”',image:'assets/captain_fritz.png'},
      {text:'The player follows D, E and F clues: dog, egg and fish pictures lead across the garden.',image:'assets/alphabet-blocks.png'},
      {text:'At the last clue, Bear freezes. A piece of flag rope is caught on his collar.',image:'assets/bear.png'},
      {text:'“Bear?” Bash asks. Bear remembers: Rascal asked him to move a long rolled-up cloth so it would not get dirty while they moved the crates.',image:'assets/bear.png'},
      {text:'Rascal gasps. “The long cloth was the flag?” Tony announces, “Mystery solved exactly as I planned.”',image:'assets/bash.png'},
      {text:'The flag is safe in the Builder shed. Nobody stole it. Bash leads the team to bring it back.',image:'assets/bash.png'}
    ],
    questions:[
      {prompt:'Who finds the F clue?',options:['Bash','Tony','Nola'],answer:'Bash'},
      {prompt:'Who carried the rolled flag without knowing what it was?',options:['Bear','Captain Fritz','Nola'],answer:'Bear'},
      {prompt:'Who asked Bear to move it?',options:['Rascal','Bash','Tony'],answer:'Rascal'}
    ],
    rewardPiece:{id:'def-friend-gate',name:'Flag Trail Marker',icon:'🚩',area:'welcome-garden',lesson:'1-B'}
  };
  lesson.phonics.teacherCue='The clue cards use D, E and F. Listen: D—dog, E—egg, F—fish. Match each sound to the correct trail marker to keep searching.';
  lesson.reader1.title='Clue Card: Who Has the Flag?';
  lesson.reader1.pages=[
    {text:'Who is this?',image:'assets/bear.png'},
    {text:'This is Bear.',image:'assets/bear.png'},
    {text:'Bear has the rope.',image:'assets/bear.png'},
    {text:'Who is this?',image:'assets/rascal.png'},
    {text:'This is Rascal.',image:'assets/rascal.png'},
    {text:'Rascal has a clue.',image:'assets/rascal.png'}
  ];
  lesson.reader1.check={prompt:'Who has the rope?',options:['Bear','Rascal','Bash'],answer:'Bear'};
  lesson.reader2.title='The Builder Shed Note';
  lesson.reader2.pages=[
    {text:'I am Bash.',image:'assets/bash.png'},
    {text:'I see the shed.',image:'assets/bash.png'},
    {text:'This is the flag.',image:'assets/alphabet-blocks.png'},
    {text:'Bear can help.',image:'assets/bear.png'},
    {text:'Rascal can help.',image:'assets/rascal.png'},
    {text:'We have the flag.',image:'assets/bash.png'}
  ];
  lesson.reader2.check={prompt:'What do the friends find in the shed?',options:['The flag','A fish','A ball'],answer:'The flag'};
  lesson.build.title='Raise the Academy Flag';
  lesson.build.completionMessage='The flag is back over the Welcome Garden. The team solved the mystery by asking WHO and following D/E/F clues.';
  lesson.completion.message='The flag is flying again! But the garden gate just made a strange sound...';
})();