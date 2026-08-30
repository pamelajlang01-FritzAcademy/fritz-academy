/* Makes the runtime present authored episodes as adventures instead of replaying the original Welcome Garden lesson shell. */
(function(){
  if(typeof LessonEngine === 'undefined') return;

  const originalClosingSong = LessonEngine.prototype.showClosingSong;

  LessonEngine.prototype.showMissionOpening = function(){
    this.setSection('opening');
    const hook = this.lesson && this.lesson.episode && this.lesson.episode.hook
      ? this.lesson.episode.hook
      : 'Captain Fritz has a new Academy mission.';

    const title = this.scene.add.text(0, -185, this.lesson.title, {
      fontSize: '35px', fontStyle: 'bold', color: '#102342', align: 'center', wordWrap: { width: 700 }
    }).setOrigin(0.5);
    const episode = this.scene.add.text(0, -125, `Episode ${this.lesson.canonicalLesson || this.levelId}`, {
      fontSize: '20px', fontStyle: 'bold', color: '#174ea6'
    }).setOrigin(0.5);
    const body = this.scene.add.text(0, 5, this.replaceName(hook), {
      fontSize: '25px', fontStyle: 'bold', color: '#102342', align: 'center', lineSpacing: 9, wordWrap: { width: 650 }
    }).setOrigin(0.5);
    const begin = this.scene.panels.makeButton(0, 185, 'Enter the Adventure', () => this.showGreeting(0), { fontSize: '24px' });
    this.scene.panels.open([title, episode, body, begin], { width: 800, height: 530 });
  };

  LessonEngine.prototype.showGreeting = function(index){
    this.setSection('character-opening');
    const conversation = Array.isArray(this.lesson.intro) && this.lesson.intro.length
      ? this.lesson.intro
      : [{ speaker: 'Captain Fritz', text: 'The mission is ready. Let’s see what happens.' }];
    const line = conversation[index];

    if(!line){
      this.showFeelingsActivityIntro();
      return;
    }

    const speaker = this.scene.add.text(0, -155, line.speaker || 'Fritz Academy', {
      fontSize: '28px', fontStyle: 'bold', color: '#174ea6'
    }).setOrigin(0.5);
    const dialogue = this.scene.add.text(0, -15, this.replaceName(line.text || ''), {
      fontSize: '29px', fontStyle: 'bold', color: '#102342', align: 'center', lineSpacing: 9, wordWrap: { width: 660 }
    }).setOrigin(0.5);
    const next = this.scene.panels.makeButton(0, 175,
      index === conversation.length - 1 ? 'Take the Challenge' : 'Next',
      () => this.showGreeting(index + 1));
    this.scene.panels.open([speaker, dialogue, next], { width: 800, height: 500 });
  };

  LessonEngine.prototype.showFeelingsActivityIntro = function(){
    this.setSection('episode-challenge');
    const activity = this.lesson.feelingsActivity;
    if(!activity || !Array.isArray(activity.questions) || !activity.questions.length){
      this.startStory();
      return;
    }

    const title = this.scene.add.text(0, -170, activity.title || 'Adventure Challenge', {
      fontSize: '34px', fontStyle: 'bold', color: '#102342', align: 'center', wordWrap: { width: 680 }
    }).setOrigin(0.5);
    const body = this.scene.add.text(0, -20,
      activity.instructions || 'Use the clues to solve the challenge.', {
        fontSize: '25px', fontStyle: 'bold', color: '#102342', align: 'center', lineSpacing: 10, wordWrap: { width: 650 }
      }).setOrigin(0.5);
    const begin = this.scene.panels.makeButton(0, 165, 'Start Challenge', () => {
      this.questionIndex = 0;
      this.correctAnswers = 0;
      this.showFeelingQuestion();
    });
    this.scene.panels.open([title, body, begin], { width: 780, height: 480 });
  };

  LessonEngine.prototype.showFeelingQuestion = function(){
    const activity = this.lesson.feelingsActivity;
    const question = activity.questions[this.questionIndex];
    if(!question){
      if(activity.rewardPiece){
        this.rewardPiece(activity.rewardPiece, 'Challenge complete!', () => this.startStory());
      }else{
        this.startStory();
      }
      return;
    }

    const title = this.scene.add.text(0, -190,
      `${activity.title || 'Challenge'} — ${this.questionIndex + 1} of ${activity.questions.length}`, {
        fontSize: '27px', fontStyle: 'bold', color: '#46566f', align: 'center', wordWrap: { width: 700 }
      }).setOrigin(0.5);
    const prompt = this.scene.add.text(0, -85, question.prompt || 'Choose the best match.', {
      fontSize: '27px', fontStyle: 'bold', color: '#102342', align: 'center', wordWrap: { width: 680 }
    }).setOrigin(0.5);
    const objects = [title, prompt];
    const options = Array.isArray(question.options) ? question.options : [];
    const startY = options.length <= 2 ? 45 : 20;
    const gap = options.length <= 2 ? 85 : 65;

    options.forEach((option, optionIndex) => {
      const button = this.scene.panels.makeButton(0, startY + optionIndex * gap, option, () => {
        if(option === question.answer){
          this.correctAnswers++;
          this.questionIndex++;
          this.showCorrectAnswer('Correct!', option, () => this.showFeelingQuestion());
        }else{
          this.showTryAgain(() => this.showFeelingQuestion());
        }
      }, { fontSize: '20px', padding: { x: 18, y: 8 } });
      objects.push(button);
    });

    this.scene.panels.open(objects, { width: 800, height: 550 });
  };

  LessonEngine.prototype.showClosingSong = function(){
    const tag = this.lesson && this.lesson.episode && this.lesson.episode.tag;
    if(tag && !this._episodeTagShown){
      this._episodeTagShown = true;
      this.setSection('episode-tag');
      const label = this.scene.add.text(0, -145, 'NEXT...', {
        fontSize: '23px', fontStyle: 'bold', color: '#174ea6'
      }).setOrigin(0.5);
      const text = this.scene.add.text(0, -10, this.replaceName(tag), {
        fontSize: '29px', fontStyle: 'bold', color: '#102342', align: 'center', lineSpacing: 10, wordWrap: { width: 660 }
      }).setOrigin(0.5);
      const next = this.scene.panels.makeButton(0, 165, 'Finish Episode', () => originalClosingSong.call(this));
      this.scene.panels.open([label, text, next], { width: 780, height: 470 });
      return;
    }
    originalClosingSong.call(this);
  };
})();
