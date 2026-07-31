/* Lesson 4 production visual asset binding */
(function(){
  "use strict";
  if(typeof findLevel!=="function") return;
  const lesson=findLevel("1-D");
  if(!lesson) return;
  const scenes=["who","what","where","when","why","how"].map(n=>`assets/scenes/lesson4-${n}.svg`);
  lesson.vocabulary=[
    {word:"who",display:"Who asks about a person.",picture:scenes[0]},
    {word:"what",display:"What asks about a thing.",picture:scenes[1]},
    {word:"where",display:"Where asks about a place.",picture:scenes[2]},
    {word:"when",display:"When asks about a time or day.",picture:scenes[3]},
    {word:"why",display:"Why asks what made something happen.",picture:scenes[4]},
    {word:"how",display:"How asks the way we do something.",picture:scenes[5]}
  ];
  lesson.story.pages.forEach((p,i)=>p.image=scenes[i%6]);
  lesson.reader1.pages.forEach((p,i)=>p.image=scenes[i%6]);
  lesson.reader2.pages.forEach((p,i)=>p.image=scenes[i%6]);
  const bind=(piece,image)=>{piece.image=image;piece.icon="";return piece;};
  bind(lesson.story.rewardPiece,"assets/objects/question-garden-sign.svg");
  bind(lesson.reader1.rewardPiece,"assets/objects/question-flower-bed.svg");
  bind(lesson.reader2.rewardPiece,"assets/objects/question-lantern.svg");
  if(lesson.feelingsActivity?.rewardPiece){lesson.feelingsActivity.rewardPiece.icon="";lesson.feelingsActivity.rewardPiece.image="assets/objects/question-garden-sign.svg";}
  if(lesson.phonics){
    lesson.phonics.examples=[
      {word:"Who = person",image:scenes[0]},{word:"What = thing",image:scenes[1]},
      {word:"Where = place",image:scenes[2]},{word:"When = time",image:scenes[3]},
      {word:"Why = what made it happen",image:scenes[4]},{word:"How = the way",image:scenes[5]}
    ];
    if(lesson.phonics.rewardPiece){lesson.phonics.rewardPiece.icon="";lesson.phonics.rewardPiece.image="assets/objects/question-garden-sign.svg";}
  }
})();