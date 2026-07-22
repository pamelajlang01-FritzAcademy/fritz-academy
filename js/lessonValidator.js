/*
====================================================
FRITZ ACADEMY
Lesson Integrity Validator
Version 42.0.0
====================================================

Stops incomplete lesson data before class flow begins.
Every required learning section is checked in sequence.
*/

class LessonValidator {
  static validate(lesson){
    const errors = [];

    if(!lesson || !lesson.id){
      return { valid:false, errors:["Lesson data is missing."] };
    }

    const requiredObjects = [
      "feelingsActivity",
      "story",
      "alphabetSong",
      "phonics",
      "reader1",
      "reader2",
      "build",
      "completion"
    ];

    requiredObjects.forEach(key => {
      if(!lesson[key]){
        errors.push(`${key} is missing.`);
      }
    });

    this.validateActivity(
      lesson.feelingsActivity,
      "Feelings activity",
      errors
    );

    this.validateReading(
      lesson.story,
      "Teacher story",
      errors,
      true
    );

    this.validateReading(
      lesson.reader1,
      "Reader 1",
      errors,
      false
    );

    this.validateReading(
      lesson.reader2,
      "Reader 2",
      errors,
      false
    );

    this.validatePhonics(lesson.phonics, errors);
    this.validateBuild(lesson, errors);

    if(
      !lesson.completion ||
      !lesson.completion.unlocks ||
      typeof lesson.completion.xp !== "number" ||
      typeof lesson.completion.stars !== "number"
    ){
      errors.push("Completion rewards or next-level unlock are incomplete.");
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  static validateActivity(activity, label, errors){
    if(!activity){
      return;
    }

    if(
      !Array.isArray(activity.questions) ||
      activity.questions.length === 0
    ){
      errors.push(`${label} has no questions.`);
    }else{
      activity.questions.forEach((question, index) => {
        this.validateQuestion(
          question,
          `${label}, question ${index + 1}`,
          errors
        );
      });
    }

    if(!this.validPiece(activity.rewardPiece)){
      errors.push(`${label} reward piece is incomplete.`);
    }
  }

  static validateReading(reading, label, errors, isStory){
    if(!reading){
      return;
    }

    if(
      !Array.isArray(reading.pages) ||
      reading.pages.length < 3
    ){
      errors.push(`${label} needs at least three pages.`);
      return;
    }

    reading.pages.forEach((page, index) => {
      const normalized = typeof page === "string"
        ? { text:page, image:"" }
        : (page || {});

      if(!String(normalized.text || "").trim()){
        errors.push(`${label}, page ${index + 1}, has no text.`);
      }

      /* Version 42 quality rule: new Week 1 lessons must be illustrated. */
      if(
        isStory &&
        !String(normalized.image || "").trim()
      ){
        errors.push(`${label}, page ${index + 1}, has no illustration.`);
      }
    });

    const questions = isStory
      ? reading.questions
      : (reading.questions || (reading.check ? [reading.check] : []));

    if(!Array.isArray(questions) || questions.length === 0){
      errors.push(`${label} has no comprehension check.`);
    }else{
      questions.forEach((question, index) => {
        this.validateQuestion(
          question,
          `${label}, question ${index + 1}`,
          errors
        );
      });
    }

    if(!this.validPiece(reading.rewardPiece)){
      errors.push(`${label} reward piece is incomplete.`);
    }
  }

  static validateQuestion(question, label, errors){
    if(!question || !String(question.prompt || "").trim()){
      errors.push(`${label} has no prompt.`);
      return;
    }

    if(
      !Array.isArray(question.options) ||
      question.options.length < 2
    ){
      errors.push(`${label} needs at least two answer choices.`);
      return;
    }

    if(!question.options.includes(question.answer)){
      errors.push(`${label} answer is not one of its choices.`);
    }
  }

  static validatePhonics(phonics, errors){
    if(!phonics){
      return;
    }

    ["letterUpper","letterLower","soundLabel","teacherCue"].forEach(key => {
      if(!String(phonics[key] || "").trim()){
        errors.push(`Phonics ${key} is missing.`);
      }
    });

    if(
      !Array.isArray(phonics.examples) ||
      phonics.examples.length < 3
    ){
      errors.push("Phonics needs at least three examples.");
    }

    [
      phonics.recognitionQuestion,
      phonics.lowercaseQuestion,
      phonics.wordQuestion
    ].forEach((question, index) => {
      this.validateQuestion(
        question,
        `Phonics question ${index + 1}`,
        errors
      );
    });

    if(!this.validPiece(phonics.rewardPiece)){
      errors.push("Phonics reward piece is incomplete.");
    }
  }

  static validateBuild(lesson, errors){
    const build = lesson.build;

    if(!build){
      return;
    }

    if(
      !build.areaId ||
      typeof build.stage !== "number" ||
      !Array.isArray(build.requiredPieces) ||
      build.requiredPieces.length === 0
    ){
      errors.push("Build activity configuration is incomplete.");
      return;
    }

    const pieceIds = [
      lesson.feelingsActivity && lesson.feelingsActivity.rewardPiece,
      lesson.story && lesson.story.rewardPiece,
      lesson.phonics && lesson.phonics.rewardPiece,
      lesson.reader1 && lesson.reader1.rewardPiece,
      lesson.reader2 && lesson.reader2.rewardPiece
    ].filter(Boolean).map(piece => piece.id);

    build.requiredPieces.forEach(pieceId => {
      if(!pieceIds.includes(pieceId)){
        errors.push(`Build requires unknown piece: ${pieceId}.`);
      }
    });

    if(new Set(build.requiredPieces).size !== build.requiredPieces.length){
      errors.push("Build contains a duplicate required piece.");
    }
  }

  static validPiece(piece){
    return Boolean(
      piece &&
      piece.id &&
      piece.name &&
      piece.icon
    );
  }
}

window.LessonValidator = LessonValidator;
