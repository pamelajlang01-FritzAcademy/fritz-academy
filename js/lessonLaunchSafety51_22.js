/* Fritz Academy stable rebuild — core lesson launch */
(function(){
  'use strict';

  function removeStableOpening(){
    document.querySelectorAll('.fritz-stable-opening').forEach(node => node.remove());
  }

  function addStableStyles(){
    if(document.getElementById('fritz-stable-opening-css')) return;
    const style = document.createElement('style');
    style.id = 'fritz-stable-opening-css';
    style.textContent = `
      .fritz-stable-opening{position:fixed;inset:0;z-index:1000000;display:grid;place-items:center;padding:18px;background:rgba(7,20,38,.82);font-family:Arial,sans-serif}
      .fritz-stable-opening__card{width:min(760px,94vw);box-sizing:border-box;padding:34px 28px;border:6px solid #102342;border-radius:24px;background:#fffdf5;text-align:center;color:#102342;box-shadow:0 24px 70px rgba(0,0,0,.45)}
      .fritz-stable-opening__level{margin:0 0 8px;font-size:clamp(28px,5vw,42px);font-weight:900}
      .fritz-stable-opening__title{margin:0 0 24px;font-size:clamp(24px,4vw,34px);font-weight:900;color:#174ea6}
      .fritz-stable-opening__body{margin:0 auto 28px;max-width:620px;font-size:23px;line-height:1.5;font-weight:700}
      .fritz-stable-opening__button{border:3px solid #102342;border-radius:12px;padding:14px 28px;background:#f6c744;color:#102342;font-size:24px;font-weight:900;cursor:pointer}
    `;
    document.head.appendChild(style);
  }

  if(typeof World !== 'undefined'){
    World.prototype.startLevel = function(levelId, location){
      try{
        this.save = typeof getSave === 'function' ? getSave() : this.save;
        const unlocked = Array.isArray(this.save && this.save.unlockedLevels)
          ? this.save.unlockedLevels
          : ['1-A'];

        if(!unlocked.includes(levelId)){
          this.panels && this.panels.message('Lesson Locked','Complete the earlier lesson first.');
          return;
        }

        const lesson = typeof findLevel === 'function' ? findLevel(levelId) : null;
        if(!lesson){
          this.panels && this.panels.message('Lesson could not open',`Lesson ${levelId} was not found.`);
          return;
        }

        this.hidePrompt && this.hidePrompt();
        this.lessonEngine && this.lessonEngine.stopMedia && this.lessonEngine.stopMedia();
        this.panels && this.panels.close && this.panels.close();
        removeStableOpening();

        this.save.currentLevel = levelId;
        this.save.currentCheckpoint = 'opening';
        if(typeof saveGame === 'function') this.save = saveGame(this.save);
        this.refreshHUD && this.refreshHUD();

        const engine = this.lessonEngine;
        if(!engine || typeof engine.start !== 'function'){
          throw new Error('Lesson Engine is unavailable.');
        }

        // Run after the Adventure Log click has completely finished.
        window.setTimeout(function(){
          try{
            engine.start(levelId, location || 'Adventure Log');
          }catch(error){
            console.error('Fritz Academy lesson launch failed:', error);
            engine.scene && engine.scene.panels && engine.scene.panels.message(
              'Lesson could not open',
              error && error.message ? error.message : 'Please reload Fritz Academy and try again.'
            );
          }
        }, 0);
      }catch(error){
        console.error('Fritz Academy startLevel failed:', error);
        this.panels && this.panels.message(
          'Lesson could not open',
          error && error.message ? error.message : 'Please reload Fritz Academy and try again.'
        );
      }
    };
  }

  if(typeof LessonEngine !== 'undefined'){
    LessonEngine.prototype.showMissionOpening = function(){
      this.setSection('opening');
      addStableStyles();
      removeStableOpening();

      const overlay = document.createElement('div');
      overlay.className = 'fritz-stable-opening';
      overlay.innerHTML = `
        <section class="fritz-stable-opening__card" role="dialog" aria-modal="true">
          <h1 class="fritz-stable-opening__level">Level ${this.levelId}</h1>
          <h2 class="fritz-stable-opening__title"></h2>
          <p class="fritz-stable-opening__body">Meet the Fritz Academy friends, listen to the story, answer the questions, earn Builder pieces, and finish today's build.</p>
          <button type="button" class="fritz-stable-opening__button">Start Lesson</button>
        </section>`;
      overlay.querySelector('.fritz-stable-opening__title').textContent = this.lesson.title || 'Fritz Academy Lesson';
      overlay.querySelector('button').addEventListener('click', () => {
        overlay.remove();
        window.setTimeout(() => this.showGreeting(0), 0);
      }, {once:true});
      document.body.appendChild(overlay);
    };
  }
})();