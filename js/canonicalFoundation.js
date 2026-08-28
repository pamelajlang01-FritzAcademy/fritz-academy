/* Fritz Academy canonical Lessons 1-9 instructional map. */
(function(){
  const foundation = [
    {courseLesson:1,week:1,letters:['A','B','C'],questionTargets:['what'],phrases:['Hello.','My name is ___.','What is this?','It is a ___.'],sightWords:['I','a','my','is']},
    {courseLesson:2,week:1,letters:['D','E','F'],questionTargets:['who'],phrases:['Who is this?','This is ___.','Who are you?','I am ___.'],sightWords:['this','am','you']},
    {courseLesson:3,week:1,letters:['G','H','I'],questionTargets:['what','who','yes/no'],phrases:['Is this ___?','Yes, it is.','No, it is not.'],sightWords:['it','yes','no','not']},
    {courseLesson:4,week:2,letters:['J','K','L'],questionTargets:['where'],phrases:['Where is ___?','It is here.','It is there.','It is in/on/under ___.'],sightWords:['where','here','there','in','on']},
    {courseLesson:5,week:2,letters:['M','N','O'],questionTargets:['how','how many'],phrases:['How many ___?','I see ___.','There are ___.'],sightWords:['how','many','see','are']},
    {courseLesson:6,week:2,letters:['P','Q','R'],questionTargets:['which'],phrases:['Which one?','The ___ one.','This one.'],sightWords:['which','one','the']},
    {courseLesson:7,week:3,letters:['S','T','U'],questionTargets:['when'],phrases:['When?','Now.','Later.','In the morning.','At night.'],sightWords:['when','now']},
    {courseLesson:8,week:3,letters:['V','W','X'],questionTargets:['why'],phrases:['Why?','Because ___.'],sightWords:['why','because']},
    {courseLesson:9,week:3,letters:['Y','Z'],questionTargets:['who','what','where','when','why','how','how many','which','yes/no'],phrases:['Ask, listen, choose, and answer with a complete beginner sentence.'],sightWords:[]}
  ];
  foundation.forEach((lesson,index)=>{
    lesson.previousLetters = foundation.slice(0,index).flatMap(item=>item.letters);
    lesson.cumulativeLetters = lesson.previousLetters.concat(lesson.letters);
    lesson.responseProgression = ['point-or-match','choose-model-answer','fill-frame','short-answer','complete-sentence'];
  });
  window.FRITZ_CANONICAL_FOUNDATION = Object.freeze(foundation.map(Object.freeze));
})();