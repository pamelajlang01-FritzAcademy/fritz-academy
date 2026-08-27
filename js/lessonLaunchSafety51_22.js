/* Fritz Academy runtime recovery — stable lesson launch with later safety checks preserved */
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
        this.panels?.message?.('Lesson Locked','Complete the earlier lesson first.');
        return;
      }

      // Preserve the later guard against launching a missing lesson.
      const lesson = typeof findLevel === 'function' ? findLevel(levelId) : null;
      if(typeof findLevel === 'function' && !lesson){
        this.panels?.message?.('Lesson could not open',`Lesson ${levelId} was not found.`);
        return;
      }

      this.hidePrompt?.();
      this.lessonEngine?.stopMedia?.();

      // Close the Adventure Log before the lesson opens so it cannot intercept input.
      this.panels?.close?.();

      this.save.currentLevel = levelId;
      this.save.currentCheckpoint = 'opening';
      if(typeof saveGame === 'function') this.save = saveGame(this.save);
      this.refreshHUD?.();

      if(!this.lessonEngine || typeof this.lessonEngine.start !== 'function'){
        throw new Error('Lesson Engine is unavailable.');
      }

      // Recovery rule: do not disable Phaser input globally while the lesson is opening.
      // The later 51.23 launcher did this and also guessed success from a narrow DOM selector list.
      // The stable launcher simply starts the lesson after the Adventure Log has closed.
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
