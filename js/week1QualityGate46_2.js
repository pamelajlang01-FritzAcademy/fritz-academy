/* Fritz Academy Week 1 Quality Gate v46.2 */
(function(){
  "use strict";
  const requiredLessons=["1-A","1-B","1-C","1-D"];
  const requiredSections=["objectives","vocabulary","intro","feelingsActivity","story","alphabetSong","phonics","reader1","reader2","build","closingSong","completion"];
  const reports=[];
  const levels=(typeof LEVELS!=="undefined"&&Array.isArray(LEVELS))?LEVELS:[];
  const scenes=window.FritzLessonSceneSpecs||{};
  const propKinds=new Set(window.FritzIllustrationPropKinds||[]);
  function add(id,severity,message){ reports.push({lesson:id,severity,message}); }
  function pagesOf(reading){ return reading&&Array.isArray(reading.pages)?reading.pages:[]; }
  function scenePages(id,key){ return scenes[id]&&Array.isArray(scenes[id][key])?scenes[id][key]:[]; }
  function uniqueTexts(pages){ const texts=pages.map(p=>String(typeof p==="string"?p:(p&&p.text)||"").trim().toLowerCase()).filter(Boolean); return new Set(texts).size===texts.length; }
  requiredLessons.forEach((id,index)=>{
    const lesson=levels.find(l=>l&&l.id===id);
    if(!lesson){ add(id,"error","Lesson is missing from LEVELS."); return; }
    requiredSections.forEach(key=>{ if(!lesson[key]) add(id,"error",`${key} is missing.`); });
    [["story",lesson.story],["reader1",lesson.reader1],["reader2",lesson.reader2]].forEach(([key,reading])=>{
      const pages=pagesOf(reading);
      if(pages.length<5) add(id,"error",`${key} needs at least five pages.`);
      if(!uniqueTexts(pages)) add(id,"warning",`${key} contains repeated page text.`);
      const specs=scenePages(id,key);
      if(specs.length!==pages.length) add(id,"error",`${key} has ${pages.length} pages but ${specs.length} illustration scenes.`);
      specs.forEach((spec,pageIndex)=>{
        if(!spec.environment) add(id,"error",`${key} page ${pageIndex+1} has no environment.`);
        if(!Array.isArray(spec.characters)||spec.characters.length===0) add(id,"warning",`${key} page ${pageIndex+1} has no character actor.`);
        (spec.props||[]).forEach(prop=>{ if(propKinds.size&&!propKinds.has(prop.kind)) add(id,"error",`${key} page ${pageIndex+1} uses unknown prop: ${prop.kind}.`); });
      });
    });
    const phonics=lesson.phonics||{};
    const teachesTwo=String(phonics.letterUpper||"").includes("&");
    if(teachesTwo&&(!Array.isArray(phonics.examples)||phonics.examples.length<4)) add(id,"warning","Phonics should provide at least four examples when teaching two letters.");
    const build=lesson.build||{};
    if(!Array.isArray(build.requiredPieces)||build.requiredPieces.length!==5) add(id,"warning","Builder should use exactly five earned pieces for the Week 1 lesson pattern.");
    const expectedNext=index<requiredLessons.length-1?requiredLessons[index+1]:"2-A";
    if(!lesson.completion||lesson.completion.unlocks!==expectedNext) add(id,"error",`Completion should unlock ${expectedNext}.`);
  });
  const errors=reports.filter(r=>r.severity==="error");
  const warnings=reports.filter(r=>r.severity==="warning");
  window.FritzWeek1QualityReport={version:"46.2",passed:errors.length===0,errors,warnings,all:reports,checkedAt:new Date().toISOString()};
  if(errors.length) console.error("Fritz Week 1 quality gate failed",window.FritzWeek1QualityReport); else console.info("Fritz Week 1 quality gate passed",window.FritzWeek1QualityReport);
})();