/* Fritz Academy Week 3 quality gate v48.0 */
(function(){
  "use strict";
  const ids=["3-A","3-B"],levels=Array.isArray(window.LEVELS)?window.LEVELS:[],scenes=window.FritzLessonSceneSpecs||{},reports=[];
  const add=(lesson,severity,message)=>reports.push({lesson,severity,message});
  ids.forEach((id,index)=>{
    const lesson=levels.find(item=>item&&item.id===id);if(!lesson){add(id,"error","Lesson is missing.");return;}
    ["objectives","vocabulary","intro","feelingsActivity","story","alphabetSong","phonics","reader1","reader2","build","closingSong","completion"].forEach(key=>{if(!lesson[key])add(id,"error",`${key} is missing.`);});
    [["story",lesson.story],["reader1",lesson.reader1],["reader2",lesson.reader2]].forEach(([key,reading])=>{const pages=reading&&Array.isArray(reading.pages)?reading.pages:[],specs=scenes[id]&&Array.isArray(scenes[id][key])?scenes[id][key]:[];if(pages.length<5)add(id,"error",`${key} needs at least five pages.`);if(specs.length!==pages.length)add(id,"error",`${key} illustration count does not match page count.`);});
    if(!Array.isArray(lesson.phonics&&lesson.phonics.examples)||lesson.phonics.examples.length<4)add(id,"error","Phonics needs four examples.");
    if(!Array.isArray(lesson.build&&lesson.build.requiredPieces)||lesson.build.requiredPieces.length!==5)add(id,"error","Builder needs five earned pieces.");
    const next=index===0?"3-B":"3-C";if(!lesson.completion||lesson.completion.unlocks!==next)add(id,"error",`Lesson must unlock ${next}.`);
  });
  const errors=reports.filter(r=>r.severity==="error");window.FritzWeek3QualityReport={version:"48.0",passed:errors.length===0,errors,all:reports,checkedAt:new Date().toISOString()};
  if(errors.length)console.error("Fritz Week 3 quality gate failed",window.FritzWeek3QualityReport);else console.info("Fritz Week 3 quality gate passed",window.FritzWeek3QualityReport);
})();