/*
====================================================
FRITZ ACADEMY
Week 1 Repair 52.1
Lessons 1-A through 1-D
====================================================
Repairs final assembled Week 1 lesson objects after the legacy
extension and emergency-patch chain has finished loading.
*/
(function(){
  'use strict';

  const WEEK_ONE = ['1-A','1-B','1-C','1-D'];
  const FALLBACK_IMAGE = 'assets/characters/captain-fritz.png';

  function allLessons(){
    if(Array.isArray(window.LEVELS)) return window.LEVELS;
    if(typeof LEVELS !== 'undefined' && Array.isArray(LEVELS)) return LEVELS;
    return [];
  }

  function find(id){
    if(typeof window.findLevel === 'function') return window.findLevel(id);
    if(typeof findLevel === 'function') return findLevel(id);
    return allLessons().find(lesson => lesson && lesson.id === id) || null;
  }

  function text(value){
    return String(value == null ? '' : value).trim();
  }

  function ensureQuestion(question, fallbackPrompt){
    if(!question || typeof question !== 'object') return;
    if(!text(question.prompt)){
      question.prompt = text(question.instructions) || text(fallbackPrompt) || 'Choose the correct answer.';
    }
    if(!Array.isArray(question.options)) question.options = [];
    question.options = question.options.map(option => String(option)).filter(Boolean);
    if(question.answer != null && !question.options.includes(String(question.answer))){
      question.answer = String(question.answer);
      question.options.unshift(question.answer);
    }
  }

  function repairQuestionGroup(group){
    if(!group || !Array.isArray(group.questions)) return;
    group.questions.forEach((question, index) => {
      ensureQuestion(question, group.instructions || group.title || `Question ${index + 1}`);
    });
  }

  function repairReading(reading, label, storyRequired){
    if(!reading || typeof reading !== 'object') return;
    if(!Array.isArray(reading.pages)) reading.pages = [];

    reading.pages = reading.pages.map((page, index) => {
      const normalized = typeof page === 'string' ? { text: page } : (page || {});
      if(!text(normalized.text)) normalized.text = `${label}, page ${index + 1}.`;
      if(storyRequired && !text(normalized.image)) normalized.image = FALLBACK_IMAGE;
      return normalized;
    });

    const questions = Array.isArray(reading.questions)
      ? reading.questions
      : (reading.check ? [reading.check] : []);
    questions.forEach((question, index) => ensureQuestion(question, `${label} comprehension question ${index + 1}`));
    if(!Array.isArray(reading.questions) && questions.length) reading.questions = questions;
  }

  function repairPhonics(phonics){
    if(!phonics || typeof phonics !== 'object') return;
    ['recognitionQuestion','lowercaseQuestion','wordQuestion'].forEach((key, index) => {
      ensureQuestion(phonics[key], `Phonics question ${index + 1}`);
    });
  }

  function repairRewardsAndBuild(lesson){
    const sources = [
      lesson.feelingsActivity,
      lesson.story,
      lesson.phonics,
      lesson.reader1,
      lesson.reader2
    ].filter(Boolean);

    const pieces = sources.map(source => source.rewardPiece).filter(piece => piece && piece.id);
    pieces.forEach(piece => {
      if(!text(piece.name)) piece.name = piece.id.replace(/[-_]+/g, ' ');
      if(!text(piece.image) && !text(piece.icon)) piece.icon = '⭐';
      if(!text(piece.lesson)) piece.lesson = lesson.id;
    });

    if(lesson.build && typeof lesson.build === 'object'){
      if(!Array.isArray(lesson.build.requiredPieces) || !lesson.build.requiredPieces.length){
        lesson.build.requiredPieces = pieces.map(piece => piece.id);
      }
      lesson.build.requiredPieces = [...new Set(lesson.build.requiredPieces.filter(id => pieces.some(piece => piece.id === id)))];
    }
  }

  function repairCompletion(lesson, nextId){
    if(!lesson.completion || typeof lesson.completion !== 'object') lesson.completion = {};
    if(typeof lesson.completion.xp !== 'number') lesson.completion.xp = 100;
    if(typeof lesson.completion.stars !== 'number') lesson.completion.stars = 3;
    if(!text(lesson.completion.unlocks)) lesson.completion.unlocks = nextId || '2-A';
  }

  function repairLesson(lesson, index){
    if(!lesson) return { id: WEEK_ONE[index], found: false, valid: false, errors: ['Lesson definition was not found.'] };

    repairQuestionGroup(lesson.feelingsActivity);
    repairQuestionGroup(lesson.vocabularyActivity);
    repairQuestionGroup(lesson.listeningActivity);
    repairQuestionGroup(lesson.speakingActivity);
    repairReading(lesson.story, 'Teacher story', true);
    repairReading(lesson.reader1, 'Reader 1', false);
    repairReading(lesson.reader2, 'Reader 2', false);
    repairPhonics(lesson.phonics);
    repairRewardsAndBuild(lesson);
    repairCompletion(lesson, WEEK_ONE[index + 1]);

    const validation = window.LessonValidator && typeof window.LessonValidator.validate === 'function'
      ? window.LessonValidator.validate(lesson)
      : { valid: true, errors: [] };

    return {
      id: lesson.id,
      found: true,
      valid: Boolean(validation.valid),
      errors: validation.errors || [],
      storyPages: Array.isArray(lesson.story?.pages) ? lesson.story.pages.length : 0,
      reader1Pages: Array.isArray(lesson.reader1?.pages) ? lesson.reader1.pages.length : 0,
      reader2Pages: Array.isArray(lesson.reader2?.pages) ? lesson.reader2.pages.length : 0,
      requiredPieces: Array.isArray(lesson.build?.requiredPieces) ? lesson.build.requiredPieces.slice() : []
    };
  }

  function boot(){
    const report = WEEK_ONE.map((id, index) => repairLesson(find(id), index));
    window.FRITZ_WEEK1_REPAIR_REPORT = report;

    const incomplete = report.filter(item => !item.valid);
    if(incomplete.length){
      console.warn('Fritz Academy Week 1 still has content defects requiring authored repair.', incomplete);
    }else{
      console.info('Fritz Academy Week 1 structural repair passed.', report);
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  }else{
    boot();
  }
})();
