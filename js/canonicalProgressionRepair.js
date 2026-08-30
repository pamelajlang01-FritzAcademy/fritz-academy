/* Fritz Academy canonical progression repair.
   Normalizes post-foundation episode IDs after all content overrides load,
   removes conflicting legacy slots, rewires unlocks/reward-piece lesson IDs,
   and corrects week labels without resetting student saves. */
(function(){
  if(typeof LEVELS==='undefined'||!Array.isArray(LEVELS)) return;

  const slots = [
    '6-D','6-E',
    '7-A','7-B','7-C','7-D','7-E',
    '8-A','8-B','8-C','8-D','8-E',
    '9-A','9-B','9-C','9-D','9-E',
    '10-A','10-B','10-C','10-D','10-E',
    '11-A','11-B','11-C','11-D','11-E',
    '12-A','12-B','12-C','12-D','12-E',
    '13-A','13-B','13-C','13-D','13-E',
    '14-A','14-B','14-C','14-D','14-E',
    '15-A','15-B','15-C','15-D','15-E',
    '16-A','16-B','16-C','16-D','16-E',
    '17-A','17-B','17-C','17-D','17-E',
    '18-A','18-B','18-C','18-D','18-E',
    '19-A','19-B','19-C','19-D','19-E',
    '20-A','20-B','20-C','20-D','20-E',
    '21-A','21-B','21-C','21-D','21-E',
    '22-A','22-B','22-C','22-D','22-E',
    '23-A','23-B','23-C','23-D','23-E',
    '24-A','24-B','24-C','24-D','24-E',
    '25-A','25-B','25-C','25-D','25-E',
    '26-A','26-B','26-C','26-D','26-E',
    '27-A','27-B','27-C','27-D','27-E',
    '28-A','28-B','28-C','28-D','28-E',
    '29-A','29-B','29-C','29-D','29-E',
    '30-A','30-B','30-C','30-D','30-E',
    '31-A','31-B','31-C','31-D','31-E',
    '32-A','32-B','32-C','32-D','32-E',
    '33-A','33-B','33-C','33-D','33-E',
    '34-A','34-B','34-C','34-D','34-E',
    '35-A','35-B','35-C','35-D','35-E',
    '36-A','36-B','36-C'
  ];

  const idForEpisode = (n)=>{
    if(n<25||n>108) return null;
    return slots[n-25] || null;
  };
  const weekForEpisode = (n)=>Math.ceil(n/3);

  const canonical = LEVELS.filter(x=>x&&Number.isInteger(x.canonicalLesson)&&x.canonicalLesson>=25&&x.canonicalLesson<=108);
  const byEpisode = new Map();
  canonical.forEach(x=>byEpisode.set(x.canonicalLesson,x));

  // Remove legacy/conflicting entries occupying canonical target slots.
  const targetIds = new Set();
  for(let n=25;n<=108;n++){const id=idForEpisode(n);if(id)targetIds.add(id);}
  for(let i=LEVELS.length-1;i>=0;i--){
    const x=LEVELS[i];
    if(!x) continue;
    const isCanonicalPost25=Number.isInteger(x.canonicalLesson)&&x.canonicalLesson>=25&&x.canonicalLesson<=108;
    const isConflictingLegacy=targetIds.has(x.id)&&!isCanonicalPost25;
    if(isCanonicalPost25||isConflictingLegacy) LEVELS.splice(i,1);
  }

  function rewriteLessonRefs(value,oldId,newId,seen){
    if(!value||typeof value!=='object') return;
    seen=seen||new WeakSet();
    if(seen.has(value)) return;
    seen.add(value);
    if(value.rewardPiece&&value.rewardPiece.lesson===oldId) value.rewardPiece.lesson=newId;
    Object.keys(value).forEach(k=>{
      const v=value[k];
      if(v&&typeof v==='object') rewriteLessonRefs(v,oldId,newId,seen);
    });
  }

  const report=[];
  Array.from(byEpisode.keys()).sort((a,b)=>a-b).forEach(n=>{
    const level=byEpisode.get(n);
    const oldId=level.id;
    const newId=idForEpisode(n);
    if(!newId) return;
    level.id=newId;
    level.chapter='Week '+weekForEpisode(n);
    if(level.completion){
      const next=idForEpisode(n+1);
      if(next) level.completion.unlocks=next;
    }
    rewriteLessonRefs(level,oldId,newId);
    LEVELS.push(level);
    report.push({episode:n,oldId,newId,unlocks:level.completion&&level.completion.unlocks,chapter:level.chapter});
  });

  // Compatibility: if a save points at one of the freshly-authored pre-repair IDs,
  // map it by canonical episode identity when that can be inferred safely.
  window.FRITZ_CANONICAL_ID_FOR_EPISODE=idForEpisode;
  window.FRITZ_PROGRESSION_REPAIR_REPORT={count:report.length,episodes:report};

  // Pedagogy correction: Episode 27 focuses on voiced TH in familiar function words.
  const ep27=byEpisode.get(27);
  if(ep27){
    ep27.title='The TH Stone Gate';
    if(ep27.objectives){
      ep27.objectives.speaking=['Say voiced TH /ð/ in familiar beginner words.'];
      ep27.objectives.listening=['Hear voiced TH in this, that, them, then.'];
      ep27.objectives.reading=['Read this, that, them, then with support.'];
      ep27.objectives.writing=['Build one voiced-TH word.'];
      ep27.objectives.phonics=['Digraph th /ð/ in high-utility function words; note another TH sound will come later.'];
    }
    ep27.vocabulary=[
      {word:'this',display:'this',picture:'👉'},
      {word:'that',display:'that',picture:'👈'},
      {word:'them',display:'them',picture:'🐾'},
      {word:'then',display:'then',picture:'➡️'}
    ];
    if(ep27.phonics){
      ep27.phonics.soundLabel='voiced TH /ð/';
      ep27.phonics.teacherCue='Start with the voiced TH sound in this, that, them, then. Keep both letters together. Explain only that TH can make another sound in other words and save that contrast for later.';
      ep27.phonics.examples=[{word:'this',icon:'👉'},{word:'that',icon:'👈'},{word:'them',icon:'🐾'},{word:'then',icon:'➡️'}];
      ep27.phonics.wordQuestion={prompt:'Which begins with voiced TH?',options:['then','ship','chip'],answer:'then'};
    }
  }

  // Pedagogy correction: Episode 28 teaches WH as a question-word spelling pattern,
  // not as one universal sound (who differs in modern English).
  const ep28=byEpisode.get(28);
  if(ep28&&ep28.phonics){
    ep28.phonics.soundLabel='WH question-word spelling team';
    ep28.phonics.teacherCue='Teach WH as a familiar spelling pattern at the beginning of question words: what, when, where, why. Do not tell learners every WH word has one identical sound; who begins with /h/ in modern English.';
  }

  console.info('[Fritz] Canonical progression repaired',window.FRITZ_PROGRESSION_REPAIR_REPORT);
})();