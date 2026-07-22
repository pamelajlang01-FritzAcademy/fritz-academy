/* Fritz Academy 43.4 uploaded media paths */
(function(){
  "use strict";

  function applyUploadedMedia(){
    if(typeof LEVELS === "undefined") return;
    LEVELS.forEach(lesson => {
      if(lesson.alphabetSong){
        lesson.alphabetSong.videoPath = "assets/alphabet-song-small.mp4";
      }
      if(lesson.closingSong){
        lesson.closingSong.videoPath = "assets/welcome-song-small.mp4";
      }
    });
  }

  applyUploadedMedia();

  if(typeof LessonEngine !== "undefined"){
    LessonEngine.prototype.showAlphabetSong = function(){
      this.setSection("alphabet-song");
      const song = this.lesson.alphabetSong || {};
      this.mediaEngine.showLessonMedia({
        heading: song.title || "Fritz Academy Alphabet Song",
        icon: "🎵",
        media: song,
        playLabel: "Play Alphabet Song",
        continueLabel: "Continue to Phonics",
        onComplete: () => this.showPhonics()
      });
    };
  }
})();