/* Fritz Academy Episode 1 production override.
   Turns canonical Lesson 1 into an episodic 20-minute game adventure while
   preserving runtime ID 1-A, rewards, saves, and unlock flow. */
(function(){
  if(typeof LEVELS === 'undefined' || !Array.isArray(LEVELS)) return;
  const i=LEVELS.findIndex(x=>x&&x.id==='1-A');
  if(i<0) return;
  const base=LEVELS[i];
  LEVELS[i]=Object.assign({},base,{
    title:'The Welcome Garden Mix-Up',episodeTitle:'The Welcome Garden Mix-Up',estimatedMinutes:20,
    beats:['hook','characterProblem','discoveryPlay','miniGame','storyTurn','readerMission','builderPayoff','tag'],
    miniGames:['crate-label-hunt','abc-sound-sort'],
    readerPurpose:'Read the Builder note and crate labels to discover where the missing garden pieces belong.',
    builderPayoff:'Restore the first section of the Welcome Garden and open the ABC gate.',
    intro:[
      {speaker:'Captain Fritz',text:'Welcome to Fritz Academy, {studentName}. We have a small problem at the Welcome Garden.'},
      {speaker:'Tony',text:'A small problem? Perfect. I am in charge of small problems. And medium problems. And, obviously, large problems.'},
      {speaker:'Nola',text:'Tony, the Builder crates are all mixed up. What if the gate never opens?'},
      {speaker:'Rascal',text:'Mixed up is a strong phrase. I prefer “rearranged.”'},
      {speaker:'Bear',text:'I only moved two. Maybe three.'},
      {speaker:'Bash',text:'You were about to move another one. The labels matter. Three crates have A, B, and C on them.'},
      {speaker:'Captain Fritz',text:'Good catch, Bash. {studentName}, will you help the team find what belongs in each crate?'},
      {speaker:'Captain Fritz',text:'First, what is your name?',responseType:'name'}
    ],
    feelingsActivity:Object.assign({},base.feelingsActivity,{
      title:'Crate Label Hunt',
      instructions:'Rascal mixed the picture tags. Look at each one and answer WHAT so Bash can put it on the right crate.',
      questions:[
        {emoji:'🍎',prompt:'Bash holds up the first tag. What is this?',options:['It is an apple.','It is a ball.','It is a cat.'],answer:'It is an apple.'},
        {emoji:'⚽',prompt:'Tony points to the second tag. What is this?',options:['It is a cat.','It is a ball.','It is an apple.'],answer:'It is a ball.'},
        {emoji:'🐱',prompt:'Nola finds the last tag under a bench. What is this?',options:['It is a cat.','It is an apple.','It is a ball.'],answer:'It is a cat.'}
      ]
    }),
    story:{
      title:'The Crates That Would Not Open',
      pages:[
        {text:'Three Builder crates sit in the wrong places. One is marked A, one B, and one C.',image:'assets/alphabet-blocks.png'},
        {text:'Tony taps the A crate. “Easy. We open all three at once.” Bash shakes his head. “We need the right clue first.”',image:'assets/bash.png'},
        {text:'Rascal rolls a loose ball toward Bear. Bear reaches for it, but Bash plants one big paw in front of his older brother. “Not now.”',image:'assets/bear.png'},
        {text:'Nola spots a note tucked behind the gate. “What if this is the clue? What if we read it wrong?”',image:'assets/nola.png'},
        {text:'Captain Fritz smiles. “Then we look carefully and try again. Builders solve problems one clue at a time.”',image:'assets/captain_fritz.png'},
        {text:'The note shows three pictures: apple, ball, cat. Bash studies the crate marks. “A—apple. B—ball. C—cat.”',image:'assets/alphabet-blocks.png'},
        {text:'The first lock clicks. The Welcome Garden is one step closer to opening.',image:'assets/academy.png'}
      ],
      questions:[
        {prompt:'What is on the first picture tag?',options:['An apple','A ball','A cat'],answer:'An apple'},
        {prompt:'What does Bash stop Bear from doing?',options:['Playing with the loose ball','Reading the note','Opening the gate'],answer:'Playing with the loose ball'},
        {prompt:'What question helps name a thing?',options:['What is this?','Who is this?','Where is it?'],answer:'What is this?'}
      ],
      rewardPiece:base.story.rewardPiece
    },
    phonics:Object.assign({},base.phonics,{
      title:'Sound Sort: Open the Crates',
      teacherCue:'Help Bash test the locks: A—apple, B—ball, C—cat.',
      recognitionQuestion:{prompt:'Tony needs the three crate letters. Which set is correct?',options:['A B C','D E F','G H I'],answer:'A B C'},
      lowercaseQuestion:{prompt:'Nola finds the tiny label set. Which one matches A B C?',options:['a b c','d e f','g h i'],answer:'a b c'},
      wordQuestion:{prompt:'Which clue set opens the A, B, C locks?',options:['apple, ball, cat','dog, egg, fish','goat, hat, igloo'],answer:'apple, ball, cat'}
    }),
    reader1:{
      title:'Builder Note: What Is in the Crates?',level:'First Reader',
      pages:[
        {text:'I see an apple.',image:'assets/alphabet-blocks.png'},
        {text:'It is for A.',image:'assets/alphabet-blocks.png'},
        {text:'I see a ball.',image:'assets/alphabet-blocks.png'},
        {text:'It is for B.',image:'assets/alphabet-blocks.png'},
        {text:'I see a cat.',image:'assets/alphabet-blocks.png'},
        {text:'It is for C.',image:'assets/alphabet-blocks.png'}
      ],
      check:{prompt:'The note says the cat is for which crate?',options:['C','A','B'],answer:'C'},
      rewardPiece:base.reader1.rewardPiece
    },
    reader2:{
      title:'Gate Sign: My Name Is Fritz',level:'Supported',
      pages:[
        {text:'Hello!',image:'assets/captain_fritz.png'},
        {text:'My name is Fritz.',image:'assets/captain_fritz.png'},
        {text:'I see A.',image:'assets/alphabet-blocks.png'},
        {text:'I see B.',image:'assets/alphabet-blocks.png'},
        {text:'I see C.',image:'assets/alphabet-blocks.png'},
        {text:'The gate can open.',image:'assets/academy.png'}
      ],
      check:{prompt:'What can open now?',options:['The gate','The Music Box','A window'],answer:'The gate'},
      rewardPiece:base.reader2.rewardPiece
    },
    alphabetSong:Object.assign({},base.alphabetSong,{rewardMessage:'The Music Box is working! Sing while the team checks the A, B, and C crates.'}),
    build:Object.assign({},base.build,{title:'Restore the First Garden Section',completionMessage:'The ABC gate swings open. The first Welcome Garden section is restored.'}),
    tag:[
      {speaker:'Tony',text:'Excellent leadership, everyone. Especially mine.'},
      {speaker:'Bash',text:'You guessed all three crates wrong before {studentName} fixed them.'},
      {speaker:'Rascal',text:'Speaking of things that are missing... was the Academy flag always gone?'},
      {speaker:'Nola',text:'The flag is gone?'},
      {speaker:'Captain Fritz',text:'Looks like tomorrow’s adventure just found us.'}
    ],
    completion:Object.assign({},base.completion,{message:'The Welcome Garden Mix-Up is solved. The next adventure is unlocked.'})
  });
})();