/* Fritz Academy 43.3 classroom stabilization */
(function(){
  "use strict";

  function applyLessonOneArtwork(){
    if(typeof findLevel !== "function") return;
    const lesson = findLevel("1-A");
    if(!lesson) return;

    const storyImages = [
      "assets/captain_fritz.png",
      "assets/fritz_academy_world_map.png",
      "assets/captain_fritz.png",
      "assets/academy.png",
      "assets/captain_fritz.png",
      "assets/fritz_academy_world_map.png"
    ];
    const readerOneImages = [
      "assets/tony.png",
      "assets/academy.png",
      "assets/tony.png",
      "assets/academy.png",
      "assets/tony.png"
    ];
    const readerTwoImages = [
      "assets/tony.png",
      "assets/fritz_academy_world_map.png",
      "assets/nola.png",
      "assets/bash.png",
      "assets/academy.png"
    ];

    [
      [lesson.story, storyImages],
      [lesson.reader1, readerOneImages],
      [lesson.reader2, readerTwoImages]
    ].forEach(([reading, images]) => {
      if(!reading || !Array.isArray(reading.pages)) return;
      reading.pages = reading.pages.map((page, index) => {
        const normalized = typeof page === "string" ? { text: page } : Object.assign({}, page);
        normalized.image = images[index] || "assets/academy.png";
        return normalized;
      });
    });
  }

  applyLessonOneArtwork();

  if(typeof MediaEngine !== "undefined"){
    const originalShow = MediaEngine.prototype.showLessonMedia;
    MediaEngine.prototype.showLessonMedia = function(config){
      const safeConfig = Object.assign({}, config || {});
      const originalComplete = safeConfig.onComplete;
      originalShow.call(this, Object.assign({}, safeConfig, {
        onComplete: () => {
          this.stop();
          if(typeof originalComplete === "function") originalComplete();
        }
      }));
    };

    MediaEngine.prototype.showMissingWithoutLeavingLesson = function(config){
      this.stop();
      const title = this.scene.add.text(0, -90, "Song File Not Installed Yet", {
        fontSize: "32px", fontStyle: "bold", color: "#102342", align: "center"
      }).setOrigin(0.5);
      const body = this.scene.add.text(0, 10,
        "The lesson is still open. Choose Continue Lesson to move forward.", {
          fontSize: "23px", fontStyle: "bold", color: "#174ea6", align: "center",
          wordWrap: { width: 650 }
        }).setOrigin(0.5);
      const retry = this.scene.panels.makeButton(-155, 130, "Try Song Again", () => {
        this.play(config.videoPath, config.audioPath, config.options || {});
      });
      const continueButton = this.scene.panels.makeButton(155, 130, "Continue Lesson", () => {
        this.stop();
        if(typeof config.onContinue === "function") config.onContinue();
      });
      this.scene.panels.open([title, body, retry, continueButton], { width: 760, height: 420 });
    };
  }

  if(typeof LessonEngine !== "undefined"){
    const originalAlphabet = LessonEngine.prototype.showAlphabetSong;
    LessonEngine.prototype.showAlphabetSong = function(){
      this.setSection("alphabet-song");
      const song = this.lesson.alphabetSong || {};
      const title = this.scene.add.text(0, -180, "Music Box Unlocked!", {
        fontSize: "35px", fontStyle: "bold", color: "#102342"
      }).setOrigin(0.5);
      const icon = this.scene.add.text(0, -80, "🎵", { fontSize: "70px" }).setOrigin(0.5);
      const body = this.scene.add.text(0, 15,
        (song.rewardMessage || "Sing with Captain Fritz!") + "\n\nThe lesson will remain open while the song plays.", {
          fontSize: "24px", fontStyle: "bold", color: "#102342", align: "center",
          wordWrap: { width: 650 }
        }).setOrigin(0.5);
      const play = this.scene.panels.makeButton(-155, 175, "Play Song", () => {
        const media = this.mediaEngine;
        media.play(song.videoPath, song.assetPath, {
          onEnded: () => this.showAlphabetSong(),
          onMissing: () => media.showMissingWithoutLeavingLesson({
            videoPath: song.videoPath,
            audioPath: song.assetPath,
            options: { onEnded: () => this.showAlphabetSong() },
            onContinue: () => this.showPhonics()
          })
        });
      });
      const next = this.scene.panels.makeButton(155, 175, "Continue Lesson", () => {
        this.stopMedia();
        this.showPhonics();
      });
      this.scene.panels.open([title, icon, body, play, next], { width: 780, height: 520 });
    };
  }
})();
