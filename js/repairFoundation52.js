/*
====================================================
FRITZ ACADEMY
Repair Foundation 52.0
====================================================
Centralizes lesson validation at launch and produces one
clear integrity report instead of silently failing through
layered emergency patches.
*/
(function(){
  'use strict';

  const report = {
    checkedAt: new Date().toISOString(),
    lessons: {},
    valid: [],
    invalid: [],
    duplicateIds: []
  };

  function lessons(){
    return Array.isArray(window.LEVELS)
      ? window.LEVELS
      : (typeof LEVELS !== 'undefined' && Array.isArray(LEVELS) ? LEVELS : []);
  }

  function normalizeVisualQuestions(lesson){
    if(!lesson) return lesson;
    const groups = [
      lesson.feelingsActivity,
      lesson.vocabularyActivity,
      lesson.listeningActivity,
      lesson.speakingActivity
    ].filter(Boolean);

    groups.forEach(group => {
      if(!Array.isArray(group.questions)) return;
      group.questions.forEach((question, index) => {
        if(!question || String(question.prompt || '').trim()) return;
        const visual = question.emoji || question.image || question.picture || question.audio;
        if(visual){
          question.prompt = group.instructions || group.title || `Choose the correct answer for item ${index + 1}.`;
        }
      });
    });
    return lesson;
  }

  function validateLesson(lesson){
    normalizeVisualQuestions(lesson);
    if(!window.LessonValidator || typeof window.LessonValidator.validate !== 'function'){
      return { valid: true, errors: [] };
    }
    return window.LessonValidator.validate(lesson);
  }

  function audit(){
    const all = lessons();
    const seen = new Set();

    all.forEach(lesson => {
      const id = lesson && lesson.id ? lesson.id : '(missing id)';
      if(seen.has(id)) report.duplicateIds.push(id);
      seen.add(id);

      const result = validateLesson(lesson);
      report.lessons[id] = result;
      (result.valid ? report.valid : report.invalid).push(id);
    });

    window.FRITZ_REPAIR_REPORT = report;
    if(report.invalid.length || report.duplicateIds.length){
      console.warn('Fritz Academy integrity audit found lesson defects.', report);
    }else{
      console.info('Fritz Academy integrity audit passed.', report);
    }
    return report;
  }

  function showFailure(scene, levelId, errors){
    const details = errors.slice(0, 4).join('\n• ');
    const message = details
      ? `This lesson needs repair before class:\n\n• ${details}`
      : 'This lesson needs repair before class.';

    console.error(`Fritz Academy blocked incomplete lesson ${levelId}`, errors);
    scene?.panels?.message?.('Lesson Repair Required', message);
  }

  function installLaunchGuard(){
    if(typeof window.LessonEngine === 'undefined') return false;
    const prototype = window.LessonEngine.prototype;
    if(!prototype || typeof prototype.start !== 'function' || prototype.start.__repair52) return true;

    const originalStart = prototype.start;
    const guardedStart = function(levelId, location){
      const lesson = typeof window.findLevel === 'function'
        ? window.findLevel(levelId)
        : (typeof findLevel === 'function' ? findLevel(levelId) : null);
      const result = validateLesson(lesson);

      report.lessons[levelId] = result;
      if(!result.valid){
        showFailure(this.scene, levelId, result.errors || []);
        return;
      }
      return originalStart.call(this, levelId, location);
    };

    guardedStart.__repair52 = true;
    guardedStart.__original = originalStart;
    prototype.start = guardedStart;
    return true;
  }

  function boot(){
    audit();
    if(!installLaunchGuard()){
      window.setTimeout(installLaunchGuard, 0);
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  }else{
    boot();
  }
})();
