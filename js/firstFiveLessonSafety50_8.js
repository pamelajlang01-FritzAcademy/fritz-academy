/* Fritz Academy 50.8 — first five lesson safety and acceptance guard */
(function(){
  "use strict";

  const IDS = ["1-A", "1-B", "1-C", "1-D", "1-E"];
  const NEXT = {"1-A":"1-B","1-B":"1-C","1-C":"1-D","1-D":"1-E","1-E":"1-F"};
  const FALLBACK_IMAGE = "assets/academy.png";

  function normalizeQuestion(question, fallbackPrompt){
    const q = Object.assign({}, question || {});
    q.prompt = String(q.prompt || fallbackPrompt || "Choose the best answer.").trim();
    q.options = Array.isArray(q.options) && q.options.length >= 2 ? q.options.filter(Boolean) : ["Yes", "No"];
    if(!q.options.includes(q.answer)) q.answer = q.options[0];
    return q;
  }

  function normalizePiece(piece, id, name, lessonId){
    const value = Object.assign({}, piece || {});
    value.id = value.id || id;
    value.name = value.name || name;
    value.icon = value.icon || "⭐";
    value.area = value.area || "welcome-garden";
    value.lesson = value.lesson || lessonId;
    return value;
  }

  function normalizeReading(reading, lessonId, key, isStory){
    const value = Object.assign({}, reading || {});
    value.title = value.title || (isStory ? "Academy Story" : key === "reader1" ? "Easy Reader" : "Story Extension");
    value.pages = Array.isArray(value.pages) ? value.pages : [];
    while(value.pages.length < 3){
      value.pages.push({text:"The Academy friends continue their adventure together.", image:FALLBACK_IMAGE});
    }
    value.pages = value.pages.map(page => {
      const normalized = typeof page === "string" ? {text:page} : Object.assign({}, page || {});
      normalized.text = String(normalized.text || "The friends continue their Academy adventure.").trim();
      normalized.image = normalized.image || FALLBACK_IMAGE;
      return normalized;
    });
    if(isStory){
      value.questions = (Array.isArray(value.questions) && value.questions.length ? value.questions : [
        {prompt:"Who is in the story?",options:["The Academy friends","No one"],answer:"The Academy friends"}
      ]).map((q, i) => normalizeQuestion(q, `Story question ${i + 1}`));
    }else{
      value.check = normalizeQuestion(value.check || (Array.isArray(value.questions) ? value.questions[0] : null), "What happened in the reader?");
    }
    value.rewardPiece = normalizePiece(value.rewardPiece, `${lessonId}-${key}-reward`, `${value.title} Reward`, lessonId);
    return value;
  }

  function normalizeLesson(lesson, lessonId){
    if(!lesson) return null;
    lesson.id = lesson.id || lessonId;
    lesson.title = lesson.title || `Fritz Academy ${lessonId}`;
    lesson.feelingChoices = Array.isArray(lesson.feelingChoices) && lesson.feelingChoices.length >= 3 ? lesson.feelingChoices : [
      {id:"happy",label:"I am happy.",emoji:"😀"},
      {id:"fine",label:"I am fine.",emoji:"🙂"},
      {id:"excited",label:"I am excited.",emoji:"🤩"}
    ];
    lesson.feelingsActivity = Object.assign({}, lesson.feelingsActivity || {});
    lesson.feelingsActivity.questions = (Array.isArray(lesson.feelingsActivity.questions) && lesson.feelingsActivity.questions.length ? lesson.feelingsActivity.questions : [
      {prompt:"How do you feel?",options:["I am happy.","I am fine."],answer:"I am happy."}
    ]).map((q, i) => normalizeQuestion(q, `Feelings question ${i + 1}`));
    lesson.feelingsActivity.rewardPiece = normalizePiece(lesson.feelingsActivity.rewardPiece, `${lessonId}-feelings-reward`, "Feelings Reward", lessonId);

    lesson.story = normalizeReading(lesson.story, lessonId, "story", true);
    lesson.reader1 = normalizeReading(lesson.reader1, lessonId, "reader1", false);
    lesson.reader2 = normalizeReading(lesson.reader2, lessonId, "reader2", false);

    lesson.alphabetSong = Object.assign({}, lesson.alphabetSong || {}, {
      title: (lesson.alphabetSong && lesson.alphabetSong.title) || "Fritz Academy Alphabet Song",
      assetPath: "assets/alphabet-song-small.mp4",
      videoPath: "assets/alphabet-song-small.mp4"
    });
    lesson.closingSong = Object.assign({}, lesson.closingSong || {}, {
      title: (lesson.closingSong && lesson.closingSong.title) || "Fritz Academy Welcome Song",
      assetPath: "assets/welcome-song-small.mp4",
      videoPath: "assets/welcome-song-small.mp4"
    });

    lesson.phonics = Object.assign({}, lesson.phonics || {});
    lesson.phonics.letterUpper = String(lesson.phonics.letterUpper || "A");
    lesson.phonics.letterLower = String(lesson.phonics.letterLower || lesson.phonics.letterUpper.toLowerCase());
    lesson.phonics.soundLabel = String(lesson.phonics.soundLabel || "letter sound");
    lesson.phonics.teacherCue = String(lesson.phonics.teacherCue || "Listen, repeat, and point to the letter.");
    lesson.phonics.examples = Array.isArray(lesson.phonics.examples) && lesson.phonics.examples.length >= 3 ? lesson.phonics.examples : [
      {word:"apple",icon:"🍎"},{word:"book",icon:"📘"},{word:"cat",icon:"🐱"}
    ];
    lesson.phonics.recognitionQuestion = normalizeQuestion(lesson.phonics.recognitionQuestion, "Choose the uppercase letter or letters.");
    lesson.phonics.lowercaseQuestion = normalizeQuestion(lesson.phonics.lowercaseQuestion, "Choose the lowercase letter or letters.");
    lesson.phonics.wordQuestion = normalizeQuestion(lesson.phonics.wordQuestion, "Choose the matching word.");
    lesson.phonics.rewardPiece = normalizePiece(lesson.phonics.rewardPiece, `${lessonId}-phonics-reward`, "Phonics Reward", lessonId);

    const earnedPieces = [
      lesson.feelingsActivity.rewardPiece,
      lesson.story.rewardPiece,
      lesson.phonics.rewardPiece,
      lesson.reader1.rewardPiece,
      lesson.reader2.rewardPiece
    ];
    lesson.build = Object.assign({}, lesson.build || {});
    lesson.build.areaId = lesson.build.areaId || lesson.buildArea || "welcome-garden";
    lesson.build.stage = Number.isFinite(lesson.build.stage) ? lesson.build.stage : (Number(lesson.buildStage) || IDS.indexOf(lessonId) + 1);
    lesson.build.title = lesson.build.title || "Build Your Academy Area";
    lesson.build.requiredPieces = earnedPieces.map(piece => piece.id);
    lesson.build.completionMessage = lesson.build.completionMessage || "Your new Academy area is ready.";

    lesson.completion = Object.assign({}, lesson.completion || {});
    lesson.completion.xp = Number.isFinite(lesson.completion.xp) ? lesson.completion.xp : 30;
    lesson.completion.stars = Number.isFinite(lesson.completion.stars) ? lesson.completion.stars : 1;
    lesson.completion.unlocks = lesson.completion.unlocks || NEXT[lessonId];
    lesson.completion.message = lesson.completion.message || `Level ${lessonId} complete!`;
    return lesson;
  }

  function apply(){
    if(typeof findLevel !== "function") return;
    IDS.forEach(id => normalizeLesson(findLevel(id), id));

    if(typeof LessonEngine !== "undefined"){
      const originalEnsure = LessonEngine.prototype.ensureLessonSave;
      LessonEngine.prototype.ensureLessonSave = function(){
        if(typeof originalEnsure === "function") originalEnsure.call(this);
        const save = this.scene.save;
        save.unlockedLevels = Array.isArray(save.unlockedLevels) ? save.unlockedLevels : ["1-A"];
        IDS.forEach(id => { if(!save.unlockedLevels.includes(id)) save.unlockedLevels.push(id); });
        if(typeof saveGame === "function") saveGame(save);
      };
    }

    const report = IDS.map(id => {
      const lesson = findLevel(id);
      const result = typeof LessonValidator !== "undefined" ? LessonValidator.validate(lesson) : {valid:Boolean(lesson),errors:[]};
      return {id, valid:result.valid, errors:result.errors || []};
    });
    window.FRITZ_FIRST_FIVE_REPORT = report;
    console.info("Fritz Academy first-five lesson report", report);
  }

  apply();
})();
