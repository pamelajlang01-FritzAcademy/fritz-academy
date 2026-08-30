/* Structural timing guard for Fritz Academy. Warns when authored screen counts are likely to exceed the 20–25 minute target. */
(function(){
  if(typeof LEVELS==='undefined'||!Array.isArray(LEVELS))return;
  const canonical=LEVELS.filter(l=>l&&Number.isInteger(l.canonicalLesson)&&l.canonicalLesson>=1&&l.canonicalLesson<=108);
  const report={targetMinutes:'20–25',checked:canonical.length,warnings:[],errors:[]};
  const warn=(n,msg)=>report.warnings.push(`Episode ${n}: ${msg}`);
  const error=(n,msg)=>report.errors.push(`Episode ${n}: ${msg}`);

  canonical.forEach(l=>{
    const n=l.canonicalLesson;
    const storyPages=l.story&&Array.isArray(l.story.pages)?l.story.pages.length:0;
    const r1=l.reader1&&Array.isArray(l.reader1.pages)?l.reader1.pages.length:0;
    const r2=l.reader2&&Array.isArray(l.reader2.pages)?l.reader2.pages.length:0;
    const intro=Array.isArray(l.intro)?l.intro.length:0;
    const challenge=l.feelingsActivity&&Array.isArray(l.feelingsActivity.questions)?l.feelingsActivity.questions.length:0;
    const storyChecks=l.story&&Array.isArray(l.story.questions)?l.story.questions.length:0;
    const phonicsChecks=l.phonics?['recognitionQuestion','lowercaseQuestion','wordQuestion'].filter(k=>l.phonics[k]).length:0;
    const minigames=l.episode&&Array.isArray(l.episode.miniGames)?l.episode.miniGames.length:0;

    if(storyPages===0)error(n,'missing story pages');
    if(storyPages>7)warn(n,`${storyPages} story pages; target maximum is 7`);
    if(r1+r2>10)warn(n,`${r1+r2} reader pages; target maximum is 10 total`);
    if(intro>7)warn(n,`${intro} opening dialogue lines; runtime displays at most 7 in one scene`);
    if(challenge>3)warn(n,`${challenge} opening challenge questions; target maximum is 3`);
    if(storyChecks>2)warn(n,`${storyChecks} story-check questions; target maximum is 2`);
    if(phonicsChecks>3)warn(n,`${phonicsChecks} phonics checks; target maximum is 3`);
    if(minigames>2)warn(n,`${minigames} minigame specs; runtime should use one primary interaction plus optional variation`);

    /* Approximation uses active runtime, not raw authored dialogue screens:
       hook .75 + team scene 1.25 + challenge .45/q + story .35/page + story checks .35/q
       + minigame 2 + song 2 + phonics intro .75 + phonics checks .35/q
       + readers .32/page + two reader checks .7 + builder 2.5 + tag .5 + transitions 1.5. */
    const estimated=.75+1.25+(challenge*.45)+(storyPages*.35)+(storyChecks*.35)+(minigames?2:0)+(l.alphabetSong?2:0)+.75+(phonicsChecks*.35)+((r1+r2)*.32)+.7+2.5+(l.episode&&l.episode.tag?.5:0)+1.5;
    l.runtimeTiming=l.runtimeTiming||{};
    l.runtimeTiming.estimatedMinutes=Math.round(estimated*10)/10;
    l.runtimeTiming.target='20–25 minutes maximum';
    if(estimated>25)warn(n,`estimated runtime ${estimated.toFixed(1)} minutes exceeds 25-minute ceiling`);
  });

  window.FRITZ_EPISODE_TIMING_REPORT=report;
  if(report.errors.length)console.error('[Fritz Timing] structural errors',report.errors);
  if(report.warnings.length)console.warn('[Fritz Timing] review warnings',report.warnings);
  else console.info(`[Fritz Timing] ${report.checked} episodes within structural timing limits.`);
})();