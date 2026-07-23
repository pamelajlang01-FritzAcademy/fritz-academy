/* Fritz Academy Week 2 Quality Gate v47.1 */
(function(){
  "use strict";
  const ids=["2-A","2-B","2-C","2-D"];
  const required=["objectives","vocabulary","intro","feelingsActivity","story","alphabetSong","phonics","reader1","reader2","build","closingSong","completion"];
  const reports=[];
  const levels=Array.isArray(window.LEVELS)?window.LEVELS:[];
  const scenes=window.FritzLessonSceneSpecs||{};
  const props=new Set(window.FritzIllustrationPropKinds||[]);
  const add=(lesson,severity,message)=>reports.push({lesson,severity,message});
  const pages=x=>x&&Array.isArray(x.pages)?x.pages:[];
  const sceneList=(id,key)=>scenes[id]&&Array.isArray(scenes[id][key])?scenes[id][key]:[];
  ids.forEach((id,index)=>{
    const lesson=levels.find(item=>item&&item.id===id);
    if(!lesson){ add(id,"error","Lesson is missing."); return; }
    required.forEach(key=>{ if(!lesson[key]) add(id,"error",`${key} is missing.`); });
    if(!Array.isArray(lesson.vocabulary)||lesson.vocabulary.length<6) add(id,"error","Vocabulary requires at least six meaningful targets.");
    [["story",lesson.story,6],["reader1",lesson.reader1,5],["reader2",lesson.reader2,5]].forEach(([key,reading,min])=>{
      const lessonPages=pages(reading);
      if(lessonPages.length<min) add(id,"error",`${key} requires at least ${min} pages.`);
      const specs=sceneList(id,key);
      if(specs.length!==lessonPages.length) add(id,"error",`${key} has ${lessonPages.length} pages and ${specs.length} scenes.`);
      specs.forEach((spec,pageIndex)=>{
        if(!spec.environment) add(id,"error",`${key} page ${pageIndex+1} has no environment.`);
        if(!Array.isArray(spec.characters)||!spec.characters.length) add(id,"warning",`${key} page ${pageIndex+1} has no actor.`);
        (spec.props||[]).forEach(prop=>{ if(props.size&&!props.has(prop.kind)) add(id,"error",`${key} page ${pageIndex+1} uses unknown prop ${prop.kind}.`); });
      });
    });
    const phonics=lesson.phonics||{};
    if(!Array.isArray(phonics.examples)||phonics.examples.length<4) add(id,"error","Phonics requires four examples for the two-letter sequence.");
    const pieces=lesson.build&&lesson.build.requiredPieces;
    if(!Array.isArray(pieces)||pieces.length!==5) add(id,"error","Builder must use five earned lesson pieces.");
    const next=index<ids.length-1?ids[index+1]:"3-A";
    if(!lesson.completion||lesson.completion.unlocks!==next) add(id,"error",`Completion must unlock ${next}.`);
  });
  const errors=reports.filter(item=>item.severity==="error");
  const warnings=reports.filter(item=>item.severity==="warning");
  window.FritzWeek2QualityReport={version:"47.1",passed:errors.length===0,errors,warnings,all:reports,checkedAt:new Date().toISOString()};
  if(errors.length) console.error("Fritz Week 2 quality gate failed",window.FritzWeek2QualityReport);
  else console.info("Fritz Week 2 quality gate passed",window.FritzWeek2QualityReport);
})();