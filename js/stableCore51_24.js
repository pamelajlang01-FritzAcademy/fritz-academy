/* Fritz Academy 51.24 — stable core lesson launch */
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

        /* LessonEngine opens its own panel. PanelManager.open() safely closes
           the Adventure Log before drawing the lesson, so no delayed click
           transition or launch watchdog is needed. */
        this.lessonEngine.start(levelId, location || 'Adventure Log');
      }catch(error){
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
