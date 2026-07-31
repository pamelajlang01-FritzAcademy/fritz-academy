/* Fritz Academy 51.5 — force Lesson 4 to use authored image assets only */
(function(){
  "use strict";
  if(typeof findLevel!=="function") return;
  const lesson=findLevel("1-D");
  if(!lesson) return;

  const scenePaths=["who","what","where","when","why","how"].map(word=>`assets/scenes/lesson4-${word}.svg`);
  const rewardArt={
    "question-garden-sign":"assets/objects/question-garden-sign.svg",
    "question-flower-bed":"assets/objects/question-flower-bed.svg",
    "question-lantern":"assets/objects/question-lantern.svg"
  };

  if(window.FritzLessonSceneSpecs) delete window.FritzLessonSceneSpecs["1-D"];

  function bindPages(section){
    if(!section||!Array.isArray(section.pages)) return;
    section.pages=section.pages.map((page,index)=>{
      const value=typeof page==="string"?{text:page}:{...(page||{})};
      value.image=scenePaths[index%scenePaths.length];
      delete value.scene;
      delete value.illustration;
      return value;
    });
  }
  bindPages(lesson.story);bindPages(lesson.reader1);bindPages(lesson.reader2);

  lesson.vocabulary=[
    {word:"who",display:"Who asks about a person.",picture:scenePaths[0]},
    {word:"what",display:"What asks about a thing.",picture:scenePaths[1]},
    {word:"where",display:"Where asks about a place.",picture:scenePaths[2]},
    {word:"when",display:"When asks about a time or day.",picture:scenePaths[3]},
    {word:"why",display:"Why asks what made something happen.",picture:scenePaths[4]},
    {word:"how",display:"How asks the way we do something.",picture:scenePaths[5]}
  ];

  function bindReward(section){
    const piece=section&&section.rewardPiece;
    if(!piece||!piece.id)return;
    if(rewardArt[piece.id])piece.image=rewardArt[piece.id];
    piece.icon="";
  }
  bindReward(lesson.story);bindReward(lesson.reader1);bindReward(lesson.reader2);

  /* Lesson 4 awards Builder pieces only after story, Reader 1, and Reader 2 questions. */
  if(lesson.feelingsActivity) delete lesson.feelingsActivity.rewardPiece;
  if(lesson.phonics) delete lesson.phonics.rewardPiece;

  lesson.phonics.examples=[
    {word:"Who = person",image:scenePaths[0]},
    {word:"What = thing",image:scenePaths[1]},
    {word:"Where = place",image:scenePaths[2]},
    {word:"When = time",image:scenePaths[3]},
    {word:"Why = what made it happen",image:scenePaths[4]},
    {word:"How = the way",image:scenePaths[5]}
  ];
  lesson.build.requiredPieces=["question-garden-sign","question-flower-bed","question-lantern"];
  window.FRITZ_LESSON4_PRODUCTION_VISUALS=true;
})();
