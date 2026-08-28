/* Fritz Academy Builder integrity validation. Fails loudly in console without resetting student saves. */
(function(){
  function validateBuilderIntegrity(levels){
    const errors=[]; const stageKeys=new Set();
    (levels||[]).forEach(level=>{
      if(!level||!level.build)return;
      const b=level.build;
      if(!b.areaId)errors.push(`${level.id}: missing build.areaId`);
      if(typeof b.stage!=='number')errors.push(`${level.id}: missing numeric build.stage`);
      if(!Array.isArray(b.requiredPieces)||!b.requiredPieces.length)errors.push(`${level.id}: missing requiredPieces`);
      const sources=[level.feelingsActivity,level.story,level.phonics,level.reader1,level.reader2];
      const rewardIds=sources.map(s=>s&&s.rewardPiece&&s.rewardPiece.id).filter(Boolean);
      (b.requiredPieces||[]).forEach(id=>{if(!rewardIds.includes(id))errors.push(`${level.id}: required Builder piece ${id} has no matching reward source`);});
      const key=`${b.areaId}:${b.stage}`;
      if(stageKeys.has(key))errors.push(`${level.id}: duplicate Builder stage key ${key}`); else stageKeys.add(key);
    });
    return {ok:errors.length===0,errors};
  }
  window.validateFritzBuilderIntegrity=validateBuilderIntegrity;
  if(typeof LEVELS!=='undefined'&&Array.isArray(LEVELS)){
    const result=validateBuilderIntegrity(LEVELS);
    if(!result.ok)console.error('[Fritz Builder Integrity]',result.errors);
    else console.info('[Fritz Builder Integrity] all Builder stages valid');
  }
})();