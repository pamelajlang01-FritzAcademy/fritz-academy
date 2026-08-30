/* Non-destructive release integrity checks for the canonical 108-episode Fritz Academy course. */
(function(){
  if(typeof LEVELS === 'undefined' || !Array.isArray(LEVELS)) return;

  const report = { valid: true, errors: [], warnings: [], episodeCount: 0, checkedAt: new Date().toISOString() };
  const byNumber = new Map();
  const idOwners = new Map();
  const buildOwners = new Map();

  const addError = message => { report.valid = false; report.errors.push(message); };
  const addWarning = message => report.warnings.push(message);

  LEVELS.forEach(level => {
    if(!level || !Number.isInteger(level.canonicalLesson)) return;
    const n = level.canonicalLesson;
    if(n < 1 || n > 108) return;
    report.episodeCount++;

    if(byNumber.has(n)) addError(`Duplicate canonical episode ${n}: ${byNumber.get(n).id} and ${level.id}.`);
    else byNumber.set(n, level);

    if(idOwners.has(level.id)) addError(`Duplicate runtime level id ${level.id}.`);
    else idOwners.set(level.id, n);

    if(!level.story || !Array.isArray(level.story.pages) || !level.story.pages.length) addError(`Episode ${n} is missing story pages.`);
    if(!level.reader1 || !Array.isArray(level.reader1.pages) || !level.reader1.pages.length) addError(`Episode ${n} is missing Reader 1.`);
    if(!level.reader2 || !Array.isArray(level.reader2.pages) || !level.reader2.pages.length) addError(`Episode ${n} is missing Reader 2.`);
    if(!level.phonics) addError(`Episode ${n} is missing phonics/decoding content.`);
    if(!level.build || !level.build.areaId || !Number.isFinite(level.build.stage)) addError(`Episode ${n} has an incomplete Builder definition.`);
    if(!level.completion) addError(`Episode ${n} is missing completion data.`);

    const miniGames = level.episode && level.episode.miniGames;
    if(!Array.isArray(miniGames) || !miniGames.length) addWarning(`Episode ${n} has no authored mini-game specification.`);

    if(level.build && level.build.areaId && Number.isFinite(level.build.stage)){
      const key = `${level.build.areaId}:${level.build.stage}`;
      if(buildOwners.has(key)) addError(`Duplicate Builder slot ${key}: episodes ${buildOwners.get(key)} and ${n}.`);
      else buildOwners.set(key, n);

      const pieceSources = [level.feelingsActivity, level.story, level.phonics, level.reader1, level.reader2]
        .filter(Boolean)
        .map(source => source.rewardPiece && source.rewardPiece.id)
        .filter(Boolean);
      const required = Array.isArray(level.build.requiredPieces) ? level.build.requiredPieces : [];
      required.forEach(pieceId => {
        if(!pieceSources.includes(pieceId)) addError(`Episode ${n} Builder requires missing reward piece ${pieceId}.`);
      });
      if(required.length === 0) addWarning(`Episode ${n} Builder has no required pieces.`);
    }
  });

  for(let n = 1; n <= 108; n++){
    if(!byNumber.has(n)) addError(`Canonical episode ${n} is not loaded.`);
  }

  for(let n = 1; n < 108; n++){
    const current = byNumber.get(n);
    const next = byNumber.get(n + 1);
    if(!current || !next || !current.completion) continue;
    if(current.completion.unlocks !== next.id){
      addError(`Episode ${n} unlocks ${current.completion.unlocks || 'nothing'} instead of episode ${n + 1} (${next.id}).`);
    }
  }

  const finalEpisode = byNumber.get(108);
  if(finalEpisode && finalEpisode.completion && finalEpisode.completion.unlocks){
    addWarning(`Episode 108 still unlocks ${finalEpisode.completion.unlocks}; expected terminal course completion.`);
  }

  window.FRITZ_COURSE_INTEGRITY = report;
  if(report.valid){
    console.info(`Fritz Academy integrity: ${report.episodeCount}/108 episodes loaded with no blocking structural errors.`, report);
  }else{
    console.error('Fritz Academy course integrity failed.', report);
  }
})();
