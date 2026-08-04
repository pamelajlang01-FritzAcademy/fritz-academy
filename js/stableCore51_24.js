/* Fritz Academy 51.25 — stable lesson launch with click isolation */
(function(){
  'use strict';

  function install(){
    if(typeof World === 'undefined' || typeof LessonEngine === 'undefined'){
      window.setTimeout(install, 25);
      return;
    }

    World.prototype.startLevel = function(levelId, location){
      try{
        this.save = typeof getSave === 'function' ? getSave() : this.save;
        const unlocked = Array.isArray(this.save && this.save.unlockedLevels)
          ? this.save.unlockedLevels
          : ['1-A'];

        if(!unlocked.includes(levelId)){
          this.panels.message('Lesson Locked','Complete the earlier lesson first.');
          return;
        }

        const lesson = typeof findLevel === 'function' ? findLevel(levelId) : null;
        if(!lesson){
          this.panels.message('Lesson could not open',`Lesson ${levelId} was not found.`);
          return;
        }

        this.hidePrompt();
        this.lessonEngine.stopMedia();

        this.save.currentLevel = levelId;
        this.save.currentCheckpoint = 'opening';
        this.save = saveGame(this.save);
        this.refreshHUD();

        /* Destroy the lesson chooser before opening the lesson. The launch is
           delayed until the original pointer event has completely finished,
           preventing that click from also closing or advancing the new panel. */
        this.panels.close();
        if(this.input){
          this.input.enabled = false;
        }

        window.setTimeout(() => {
          try{
            this.lessonEngine.start(levelId, location || 'Adventure Log');

            window.setTimeout(() => {
              if(this.input){
                this.input.enabled = true;
              }
            }, 120);
          }catch(error){
            if(this.input){
              this.input.enabled = true;
            }
            console.error('Fritz Academy stable launch failed:', error);
            this.panels.message(
              'Lesson could not open',
              error && error.message ? error.message : `Level ${levelId} could not start.`
            );
          }
        }, 180);
      }catch(error){
        if(this.input){
          this.input.enabled = true;
        }
        console.error('Fritz Academy stable launch failed:', error);
        this.panels.message(
          'Lesson could not open',
          error && error.message ? error.message : `Level ${levelId} could not start.`
        );
      }
    };
  }

  install();
})();
