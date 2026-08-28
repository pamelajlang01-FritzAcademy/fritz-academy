/* Fritz Academy episode/game production canon.
   This data is intentionally runtime-readable so episode content can be validated
   against the same character and pacing rules used by production. */
(function(){
  const canon = {
    targetMinutes:20,
    segmentMinMinutes:2,
    segmentMaxMinutes:4,
    characters:{
      'Captain Fritz':{role:'mentor',traits:['warm','experienced','guiding'],mustNot:'solve every problem for the player'},
      'Bash':{role:'real-leader',traits:['calm','capable','observant','dependable'],relationship:'younger but much larger brother of Bear'},
      'Tony':{role:'self-appointed-leader',traits:['confident','enthusiastic','comic certainty'],mustNot:'be treated as stupid or disposable'},
      'Nola':{role:'worrier',traits:['careful','predictive','questioning'],function:'surfaces risks and naturally prompts questions'},
      'Rascal':{role:'troublemaker',traits:['curious','impulsive','playful'],mustNot:'be cruel or dangerously reckless'},
      'Bear':{role:'semi-troublemaker',traits:['good-hearted','tempted by Rascal schemes'],relationship:'older brother of Bash; Bash regularly catches/stops him'}
    },
    requiredEpisodeBeats:['hook','characterProblem','discoveryPlay','miniGame','storyTurn','readerMission','builderPayoff','tag'],
    foundationArc:[
      {courseLesson:1,title:'The Welcome Garden Mix-Up',letters:['A','B','C'],questions:['what'],problem:'Rascal and Bear moved the first Builder crates; A/B/C marks identify what belongs where.'},
      {courseLesson:2,title:'Who Took the Flag?',letters:['D','E','F'],questions:['who'],problem:'A harmless missing Academy flag starts an identity and clue hunt before the welcome event.'},
      {courseLesson:3,title:'The Mystery Gate',letters:['G','H','I'],questions:['what','who','yes/no'],problem:'Mixed-up gate markers keep the Welcome Garden gate from opening.'},
      {courseLesson:4,title:'The Lost Key Trail',letters:['J','K','L'],questions:['where'],problem:'A missing Builder key sends the team searching the Academy grounds.'},
      {courseLesson:5,title:'The Bridge With Missing Pieces',letters:['M','N','O'],questions:['how','how many'],problem:'The team must safely repair an Academy garden bridge with the correct number of pieces.'},
      {courseLesson:6,title:'The Three Paths',letters:['P','Q','R'],questions:['which'],problem:'Conflicting signs require the player to choose the correct route from letter, sound and visual clues.'},
      {courseLesson:7,title:'The Music Box Countdown',letters:['S','T','U'],questions:['when'],problem:'Academy preparations must be completed in the correct order before the Music Box event.'},
      {courseLesson:8,title:'The Strange Tracks',letters:['V','W','X'],questions:['why'],problem:'Funny tracks near an unfinished build create a safe cause-and-effect mystery.'},
      {courseLesson:9,title:'The Alphabet Builder Challenge',letters:['Y','Z'],questions:['who','what','where','when','why','how','how many','which','yes/no'],problem:'A chain of Academy clues completes the Alphabet Foundation build and opens the decoding arc.'}
    ]
  };

  function validateEpisodeSpec(spec){
    const errors=[];
    if(!spec) return {ok:false,errors:['Missing episode spec.']};
    if(!spec.title) errors.push('Episode needs an adventure title.');
    if(!spec.estimatedMinutes || spec.estimatedMinutes<18 || spec.estimatedMinutes>22) errors.push('Episode target must remain near 20 minutes.');
    const beats=new Set(spec.beats||[]);
    canon.requiredEpisodeBeats.forEach(b=>{if(!beats.has(b)) errors.push('Missing episode beat: '+b);});
    if(!spec.miniGames || spec.miniGames.length<1) errors.push('Episode needs at least one genuine mini-game.');
    if(!spec.readerPurpose) errors.push('Reading/listening must advance the adventure.');
    if(!spec.builderPayoff) errors.push('Episode needs a builder/progression payoff.');
    return {ok:errors.length===0,errors};
  }

  window.FRITZ_EPISODE_CANON=Object.freeze(canon);
  window.validateFritzEpisodeSpec=validateEpisodeSpec;
})();