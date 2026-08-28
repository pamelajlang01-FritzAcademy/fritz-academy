/* Non-destructive validation for the canonical nine-lesson foundation. */
(function(){
  window.validateFritzCanonicalFoundation = function(){
    const data = window.FRITZ_CANONICAL_FOUNDATION;
    const errors = [];
    if(!Array.isArray(data) || data.length !== 9){
      errors.push('Canonical foundation must contain exactly 9 lessons.');
      return {ok:false,errors};
    }
    const letters = data.flatMap(x=>x.letters || []);
    if(letters.join('') !== 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') errors.push('Lessons 1-9 must introduce A-Z exactly once in order.');
    data.forEach((lesson,i)=>{
      if(lesson.courseLesson !== i+1) errors.push('Course lesson numbering is not sequential at index '+i+'.');
      if(!lesson.questionTargets || !lesson.questionTargets.length) errors.push('Lesson '+lesson.courseLesson+' lacks question-language targets.');
      if(!lesson.phrases || !lesson.phrases.length) errors.push('Lesson '+lesson.courseLesson+' lacks functional response phrases.');
    });
    const finalTargets = new Set(data[8].questionTargets || []);
    ['who','what','where','when','why','how','how many','which','yes/no'].forEach(q=>{ if(!finalTargets.has(q)) errors.push('Lesson 9 cumulative mission is missing '+q+'.'); });
    return {ok:errors.length===0,errors};
  };
})();