/* Inserts a genuine interactive mini-game between story completion and the Music Box for episodes that define episode.miniGames. */
(function(){
  if(typeof LessonEngine === 'undefined') return;

  LessonEngine.prototype.startStory = function(){
    this.storyEngine.start(
      this.lesson,
      () => {
        const specs = this.lesson && this.lesson.episode && this.lesson.episode.miniGames;
        if(window.MiniGameEngine && Array.isArray(specs) && specs.length){
          if(!this.miniGameEngine){
            this.miniGameEngine = new MiniGameEngine(this.scene, this);
          }
          this.miniGameEngine.start(this.lesson, () => this.showAlphabetSong());
          return;
        }
        this.showAlphabetSong();
      }
    );
  };
})();
