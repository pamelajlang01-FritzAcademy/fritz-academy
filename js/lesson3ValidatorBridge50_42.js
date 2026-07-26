/* Fritz Academy Lesson 3 validator bridge v50.42
   Lesson 3 intentionally awards three pieces. This bridge lets the legacy
   validator inspect complete temporary reward records without adding extra
   rewards to the live lesson. */
(function(){
  "use strict";

  if(typeof LessonValidator==="undefined" || typeof LessonValidator.validate!=="function") return;

  const originalValidate=LessonValidator.validate.bind(LessonValidator);

  LessonValidator.validate=function(lesson){
    if(!lesson || lesson.id!=="1-C") return originalValidate(lesson);

    const feelings=lesson.feelingsActivity;
    const reader1=lesson.reader1;
    const feelingsReward=feelings&&feelings.rewardPiece;
    const reader1Reward=reader1&&reader1.rewardPiece;

    /* Temporary validator-only records. They are restored immediately and
       never enter the student's reward flow or builder inventory. */
    if(feelings && !feelings.rewardPiece){
      feelings.rewardPiece={id:"lesson3-validation-feelings",name:"Lesson Check",icon:"✓",area:"welcome-garden",lesson:"1-C"};
    }
    if(reader1 && !reader1.rewardPiece){
      reader1.rewardPiece={id:"lesson3-validation-reader1",name:"Lesson Check",icon:"✓",area:"welcome-garden",lesson:"1-C"};
    }

    let result;
    try{
      result=originalValidate(lesson);
    }finally{
      if(feelings) feelings.rewardPiece=feelingsReward||null;
      if(reader1) reader1.rewardPiece=reader1Reward||null;
    }
    return result;
  };

  window.FritzLesson3ValidatorBridge5042={version:"50.42",lessonId:"1-C"};
})();