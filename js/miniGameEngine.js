class MiniGameEngine {
  constructor(scene, lessonEngine){
    this.scene = scene;
    this.lessonEngine = lessonEngine;
    this.lesson = null;
    this.onComplete = null;
    this.pairs = [];
    this.answerOrder = [];
    this.matched = new Set();
    this.selectedPrompt = null;
    this.feedback = '';
  }

  start(lesson, onComplete){
    this.lesson = lesson;
    this.onComplete = onComplete;
    this.matched = new Set();
    this.selectedPrompt = null;
    this.feedback = '';
    this.pairs = this.buildPairs(lesson);

    if(this.pairs.length < 2){
      this.finish();
      return;
    }

    this.answerOrder = this.shuffle(this.pairs.map((_, index) => index));
    this.lessonEngine.setSection('mini-game');
    this.renderIntro();
  }

  buildPairs(lesson){
    const result = [];
    const seenAnswers = new Set();
    const sources = [
      lesson && lesson.feelingsActivity && lesson.feelingsActivity.questions,
      lesson && lesson.story && lesson.story.questions
    ];

    for(const source of sources){
      if(!Array.isArray(source)) continue;
      for(const question of source){
        if(!question || !question.prompt || !question.answer) continue;
        const answer = String(question.answer).trim();
        if(!answer || seenAnswers.has(answer)) continue;
        result.push({ prompt: String(question.prompt).trim(), answer });
        seenAnswers.add(answer);
        if(result.length >= 3) return result;
      }
    }

    return result;
  }

  shuffle(values){
    const copy = values.slice();
    for(let i = copy.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    if(copy.length > 1 && copy.every((value, index) => value === index)){
      copy.push(copy.shift());
    }
    return copy;
  }

  gameLabel(){
    const specs = this.lesson && this.lesson.episode && this.lesson.episode.miniGames;
    if(Array.isArray(specs) && specs.length){
      return String(specs[0])
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, letter => letter.toUpperCase());
    }
    return 'Mission Match';
  }

  renderIntro(){
    const title = this.scene.add.text(0, -175, this.gameLabel(), {
      fontSize: '34px', fontStyle: 'bold', color: '#102342', align: 'center', wordWrap: { width: 680 }
    }).setOrigin(0.5);

    const body = this.scene.add.text(0, -15,
      'Mini-Game Mission\n\nMatch every clue card to its answer card.\nChoose a clue on the left, then its match on the right.', {
        fontSize: '25px', fontStyle: 'bold', color: '#102342', align: 'center', lineSpacing: 9, wordWrap: { width: 650 }
      }).setOrigin(0.5);

    const begin = this.scene.panels.makeButton(0, 175, 'Start Mini-Game', () => this.renderBoard());
    this.scene.panels.open([title, body, begin], { width: 800, height: 510 });
  }

  renderBoard(){
    if(this.matched.size >= this.pairs.length){
      this.renderWin();
      return;
    }

    const objects = [];
    const title = this.scene.add.text(0, -245, this.gameLabel(), {
      fontSize: '28px', fontStyle: 'bold', color: '#102342', align: 'center', wordWrap: { width: 700 }
    }).setOrigin(0.5);
    objects.push(title);

    const progress = this.scene.add.text(0, -205, `${this.matched.size} of ${this.pairs.length} matches`, {
      fontSize: '19px', fontStyle: 'bold', color: '#46566f'
    }).setOrigin(0.5);
    objects.push(progress);

    if(this.feedback){
      objects.push(this.scene.add.text(0, 225, this.feedback, {
        fontSize: '19px', fontStyle: 'bold', color: this.feedback.startsWith('Match') ? '#2f7d32' : '#b5462d',
        align: 'center', wordWrap: { width: 680 }
      }).setOrigin(0.5));
    }

    const yPositions = [-135, -15, 105];
    this.pairs.forEach((pair, index) => {
      if(this.matched.has(index)) return;
      const selected = this.selectedPrompt === index;
      const promptCard = this.scene.add.text(-205, yPositions[index], pair.prompt, {
        fontSize: '18px', fontStyle: 'bold', color: '#102342', backgroundColor: selected ? '#fff1ad' : '#ffffff',
        padding: { x: 12, y: 10 }, align: 'center', wordWrap: { width: 280 }
      }).setOrigin(0.5).setInteractive({ useHandCursor: true });
      promptCard.on('pointerdown', () => {
        this.selectedPrompt = index;
        this.feedback = 'Now choose the matching answer card.';
        this.renderBoard();
      });
      objects.push(promptCard);
    });

    this.answerOrder.forEach((pairIndex, slotIndex) => {
      if(this.matched.has(pairIndex)) return;
      const pair = this.pairs[pairIndex];
      const answerCard = this.scene.add.text(205, yPositions[slotIndex], pair.answer, {
        fontSize: '18px', fontStyle: 'bold', color: '#174ea6', backgroundColor: '#eef4ff',
        padding: { x: 12, y: 10 }, align: 'center', wordWrap: { width: 280 }
      }).setOrigin(0.5).setInteractive({ useHandCursor: true });
      answerCard.on('pointerdown', () => this.chooseAnswer(pairIndex));
      objects.push(answerCard);
    });

    const leftLabel = this.scene.add.text(-205, -180, 'CLUES', { fontSize: '17px', fontStyle: 'bold', color: '#46566f' }).setOrigin(0.5);
    const rightLabel = this.scene.add.text(205, -180, 'MATCHES', { fontSize: '17px', fontStyle: 'bold', color: '#46566f' }).setOrigin(0.5);
    objects.push(leftLabel, rightLabel);

    this.scene.panels.open(objects, { width: 840, height: 620 });
  }

  chooseAnswer(pairIndex){
    if(this.selectedPrompt === null){
      this.feedback = 'Choose a clue card first.';
      this.renderBoard();
      return;
    }

    if(this.selectedPrompt === pairIndex){
      this.matched.add(pairIndex);
      this.selectedPrompt = null;
      this.feedback = 'Match made!';
      this.renderBoard();
      return;
    }

    this.feedback = 'That pair does not match yet. Try another answer.';
    this.renderBoard();
  }

  renderWin(){
    const title = this.scene.add.text(0, -115, 'Mini-Game Complete!', {
      fontSize: '38px', fontStyle: 'bold', color: '#2f7d32'
    }).setOrigin(0.5);
    const body = this.scene.add.text(0, 0, `You matched all ${this.pairs.length} clues.\nThe adventure can continue.`, {
      fontSize: '26px', fontStyle: 'bold', color: '#102342', align: 'center', lineSpacing: 10
    }).setOrigin(0.5);
    const next = this.scene.panels.makeButton(0, 135, 'Continue Adventure', () => this.finish());
    this.scene.panels.open([title, body, next], { width: 700, height: 400 });
  }

  finish(){
    const callback = this.onComplete;
    this.onComplete = null;
    if(typeof callback === 'function') callback();
  }
}

window.MiniGameEngine = MiniGameEngine;
