/* Fritz Academy 43.5 classroom stabilization */
(function(){
  "use strict";

  function applyLessonOneArtwork(){
    if(typeof findLevel !== "function") return;
    const lesson = findLevel("1-A");
    if(!lesson) return;

    const artwork = {
      story: [
        "assets/captain_fritz.png",
        "assets/fritz_academy_world_map.png",
        "assets/captain_fritz.png",
        "assets/academy.png",
        "assets/captain_fritz.png",
        "assets/fritz_academy_world_map.png"
      ],
      reader1: [
        "assets/tony.png",
        "assets/academy.png",
        "assets/tony.png",
        "assets/academy.png",
        "assets/tony.png"
      ],
      reader2: [
        "assets/tony.png",
        "assets/fritz_academy_world_map.png",
        "assets/nola.png",
        "assets/bash.png",
        "assets/academy.png"
      ]
    };

    Object.keys(artwork).forEach(key => {
      const reading = lesson[key];
      if(!reading || !Array.isArray(reading.pages)) return;
      reading.pages = reading.pages.map((page, index) => {
        const normalized = typeof page === "string"
          ? { text: page }
          : Object.assign({}, page);
        normalized.image = artwork[key][index] || "assets/academy.png";
        return normalized;
      });
    });
  }

  applyLessonOneArtwork();

  if(typeof BuilderEngine !== "undefined"){
    const originalStart = BuilderEngine.prototype.start;

    BuilderEngine.prototype.start = function(lesson, onComplete){
      const build = lesson && lesson.build;
      const progress = this.lessonEngine && typeof this.lessonEngine.progress === "function"
        ? this.lessonEngine.progress()
        : null;

      /* Reaching the Builder means the learning activities are complete.
         Repair older or interrupted saves that did not record every earned piece. */
      if(
        build &&
        Array.isArray(build.requiredPieces) &&
        progress
      ){
        if(!Array.isArray(progress.earnedPieces)){
          progress.earnedPieces = [];
        }

        build.requiredPieces.forEach(pieceId => {
          if(!progress.earnedPieces.includes(pieceId)){
            progress.earnedPieces.push(pieceId);
          }
        });

        if(this.scene && this.scene.save && typeof saveGame === "function"){
          saveGame(this.scene.save);
        }
      }

      originalStart.call(this, lesson, onComplete);
    };

    const originalShowBuilder = BuilderEngine.prototype.showBuilder;

    BuilderEngine.prototype.showBuilder = function(){
      originalShowBuilder.call(this);

      const required = this.build && Array.isArray(this.build.requiredPieces)
        ? this.build.requiredPieces
        : [];

      if(!required.length || !this.scene || !this.scene.panels){
        return;
      }

      /* Add a guaranteed one-click placement control so touch users and young
         learners cannot become trapped if selection/slot interaction is missed. */
      const placeAll = this.scene.panels.makeButton(
        -210,
        275,
        "Place My Pieces",
        () => {
          const placements = this.placements();
          required.forEach((pieceId, index) => {
            placements[pieceId] = index;
          });
          this.selectedPieceId = "";
          saveGame(this.scene.save);
          originalShowBuilder.call(this);
        },
        {
          fontSize: "19px",
          backgroundColor: "#ffffff"
        }
      );

      const finish = this.scene.panels.makeButton(
        210,
        275,
        this.isComplete() ? "Finish This Build" : "Place Pieces First",
        () => {
          if(this.isComplete()){
            this.completeBuild();
          }
        },
        {
          fontSize: "19px",
          backgroundColor: this.isComplete() ? "#f6c744" : "#e6e6e6"
        }
      );

      if(this.scene.panels.container){
        this.scene.panels.container.add([placeAll, finish]);
      }
    };
  }
})();