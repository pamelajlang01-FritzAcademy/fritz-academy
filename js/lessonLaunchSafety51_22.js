/* Fritz Academy 51.23 — reliable lesson launch without click-through */
(function(){
  'use strict';
  if(typeof World === 'undefined') return;

  World.prototype.startLevel = function(levelId, location){
    try{
      this.save = typeof getSave === 'function' ? getSave() : this.save;
      const unlocked = Array.isArray(this.save?.unlockedLevels)
        ? this.save.unlockedLevels
        : ['1-A'];

      if(!unlocked.includes(levelId)){
        this.panels?.message?.('Lesson Locked','Complete the earlier lesson first.');
        return;
      }

      const lesson = typeof findLevel === 'function' ? findLevel(levelId) : null;
      if(!lesson){
        this.panels?.message?.('Lesson could not open',`Lesson ${levelId} was not found.`);
        return;
      }

      this.hidePrompt?.();
      this.lessonEngine?.stopMedia?.();
      this.panels?.close?.();

      this.save.currentLevel = levelId;
      this.save.currentCheckpoint = 'opening';
      if(typeof saveGame === 'function') this.save = saveGame(this.save);
      this.refreshHUD?.();

      if(!this.lessonEngine || typeof this.lessonEngine.start !== 'function'){
        throw new Error('Lesson Engine is unavailable.');
      }

      // Prevent the Adventure Log pointer-up from landing on the newly opened lesson.
      if(this.input) this.input.enabled = false;

      window.setTimeout(() => {
        try{
          if(this.input) this.input.enabled = true;
          this.lessonEngine.start(levelId, location || 'Adventure Log');

          // A successful lesson opening always creates a panel or a lesson DOM overlay.
          window.setTimeout(() => {
            const domLesson = document.querySelector('.l420,.l419-overlay,.l418-overlay,.l4stable,.l4p-overlay,.greeting-chart-overlay');
            if(!this.panels?.isOpen && !domLesson){
              console.error('Fritz Academy: lesson start returned without opening a lesson', levelId, lesson);
              this.panels?.message?.(
                'Lesson could not open',
                `Level ${levelId} did not start. Please report this lesson number.`
              );
            }
          }, 80);
        }catch(error){
          if(this.input) this.input.enabled = true;
          console.error('Fritz Academy lesson launch failed:', error);
          this.panels?.message?.(
            'Lesson could not open',
            error?.message || 'Please reload Fritz Academy and try again.'
          );
        }
      }, 180);
    }catch(error){
      if(this.input) this.input.enabled = true;
      console.error('Fritz Academy startLevel failed:', error);
      this.panels?.close?.();
      window.setTimeout(() => {
        this.panels?.message?.(
          'Lesson could not open',
          error?.message || 'Please reload Fritz Academy and try again.'
        );
      }, 60);
    }
  };
})();