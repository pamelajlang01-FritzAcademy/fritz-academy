/* Fritz Academy 51.22 — reliable lesson launch from Adventure Log */
(function(){
  'use strict';
  if(typeof World === 'undefined') return;

  World.prototype.startLevel = function(levelId, location){
    try{
      // Always reload the currently selected student before launching.
      this.save = typeof getSave === 'function' ? getSave() : this.save;
      const unlocked = Array.isArray(this.save?.unlockedLevels)
        ? this.save.unlockedLevels
        : ['1-A'];

      if(!unlocked.includes(levelId)){
        this.panels?.message?.(
          'Lesson Locked',
          'Complete the earlier lesson first.'
        );
        return;
      }

      this.hidePrompt?.();
      this.lessonEngine?.stopMedia?.();

      // The Adventure Log panel was remaining above the lesson and intercepting input.
      this.panels?.close?.();

      this.save.currentLevel = levelId;
      this.save.currentCheckpoint = 'opening';
      if(typeof saveGame === 'function'){
        this.save = saveGame(this.save);
      }
      this.refreshHUD?.();

      if(!this.lessonEngine || typeof this.lessonEngine.start !== 'function'){
        throw new Error('Lesson Engine is unavailable.');
      }

      // Let PanelManager finish destroying the selection screen first.
      window.setTimeout(() => {
        try{
          this.lessonEngine.start(levelId, location || 'Adventure Log');
        }catch(error){
          console.error('Fritz Academy lesson launch failed:', error);
          this.panels?.message?.(
            'Lesson could not open',
            error?.message || 'Please reload Fritz Academy and try again.'
          );
        }
      }, 40);
    }catch(error){
      console.error('Fritz Academy startLevel failed:', error);
      this.panels?.close?.();
      window.setTimeout(() => {
        this.panels?.message?.(
          'Lesson could not open',
          error?.message || 'Please reload Fritz Academy and try again.'
        );
      }, 40);
    }
  };
})();