/*
====================================================
FRITZ ACADEMY
Builder Engine
Version 42.0.0
====================================================

Purpose:
- Turn earned lesson rewards into a real building activity.
- Let students select and place every earned piece.
- Save placements per student, area, and stage.
- Require the full lesson set before completing the build.
*/

class BuilderEngine {
  constructor(scene, lessonEngine){
    this.scene = scene;
    this.lessonEngine = lessonEngine;
    this.lesson = null;
    this.build = null;
    this.selectedPieceId = "";
    this.onComplete = null;
  }

  start(lesson, onComplete){
    this.lesson = lesson;
    this.build = lesson && lesson.build;
    this.selectedPieceId = "";
    this.onComplete = onComplete;

    if(
      !this.build ||
      !Array.isArray(this.build.requiredPieces) ||
      this.build.requiredPieces.length === 0
    ){
      this.scene.panels.message(
        "Build Area Missing",
        "This lesson does not contain a complete build activity."
      );
      return;
    }

    this.lessonEngine.setSection("build");
    this.ensureSaveData();
    this.showBuilder();
  }

  ensureSaveData(){
    const save = this.scene.save;

    if(!save.placedBuilds){
      save.placedBuilds = {};
    }

    if(!save.placedBuilds[this.build.areaId]){
      save.placedBuilds[this.build.areaId] = {};
    }

    if(!save.placedBuilds[this.build.areaId][this.build.stage]){
      save.placedBuilds[this.build.areaId][this.build.stage] = {};
    }

    saveGame(save);
  }

  placements(){
    return this.scene.save.placedBuilds[
      this.build.areaId
    ][this.build.stage];
  }

  earnedPieces(){
    const progress = this.lessonEngine.progress();
    return progress && Array.isArray(progress.earnedPieces)
      ? progress.earnedPieces
      : [];
  }

  findPiece(pieceId){
    const sources = [
      this.lesson.feelingsActivity,
      this.lesson.story,
      this.lesson.phonics,
      this.lesson.reader1,
      this.lesson.reader2
    ];

    for(const source of sources){
      if(
        source &&
        source.rewardPiece &&
        source.rewardPiece.id === pieceId
      ){
        return source.rewardPiece;
      }
    }

    return {
      id: pieceId,
      name: pieceId,
      icon: "⭐"
    };
  }

  pieceInSlot(slotIndex){
    const placements = this.placements();

    return Object.keys(placements).find(
      pieceId => placements[pieceId] === slotIndex
    ) || "";
  }

  isPlaced(pieceId){
    return Object.prototype.hasOwnProperty.call(
      this.placements(),
      pieceId
    );
  }

  showBuilder(){
    const earned = this.earnedPieces();
    const required = this.build.requiredPieces;
    const allEarned = required.every(
      pieceId => earned.includes(pieceId)
    );

    const objects = [];

    const title = this.scene.add.text(
      0,
      -255,
      this.build.title || "Build Your Academy",
      {
        fontSize: "31px",
        fontStyle: "bold",
        color: "#102342",
        align: "center",
        wordWrap: { width: 720 }
      }
    ).setOrigin(0.5);

    const directions = this.scene.add.text(
      0,
      -215,
      allEarned
        ? "Choose an earned piece, then choose where to place it."
        : "Finish the lesson activities to earn every building piece.",
      {
        fontSize: "19px",
        fontStyle: "bold",
        color: allEarned ? "#174ea6" : "#b5462d",
        align: "center",
        wordWrap: { width: 700 }
      }
    ).setOrigin(0.5);

    objects.push(title, directions);

    const slotPositions = [
      [-240, -85],
      [0, -85],
      [240, -85],
      [-120, 65],
      [120, 65]
    ];

    required.forEach((pieceId, index) => {
      const position = slotPositions[index] || [
        -240 + (index % 3) * 240,
        -85 + Math.floor(index / 3) * 150
      ];

      const placedPieceId = this.pieceInSlot(index);
      const placedPiece = placedPieceId
        ? this.findPiece(placedPieceId)
        : null;

      const slot = this.scene.panels.makeButton(
        position[0],
        position[1],
        placedPiece
          ? `${placedPiece.icon}\n${placedPiece.name}`
          : `Build Spot ${index + 1}\n➕`,
        () => this.placeSelected(index),
        {
          fontSize: "18px",
          backgroundColor: placedPiece ? "#dff3df" : "#ffffff",
          padding: { x: 18, y: 12 }
        }
      );

      objects.push(slot);
    });

    const unplaced = required.filter(pieceId => {
      return earned.includes(pieceId) && !this.isPlaced(pieceId);
    });

    if(unplaced.length > 0){
      const packLabel = this.scene.add.text(
        0,
        155,
        "Builder Pack",
        {
          fontSize: "20px",
          fontStyle: "bold",
          color: "#102342"
        }
      ).setOrigin(0.5);

      objects.push(packLabel);

      const packX = unplaced.length === 1
        ? [0]
        : unplaced.length === 2
          ? [-150, 150]
          : [-240, -120, 0, 120, 240];

      unplaced.forEach((pieceId, index) => {
        const piece = this.findPiece(pieceId);
        const selected = this.selectedPieceId === pieceId;

        const button = this.scene.panels.makeButton(
          packX[index] || 0,
          210,
          `${piece.icon} ${piece.name}`,
          () => {
            this.selectedPieceId = pieceId;
            this.showBuilder();
          },
          {
            fontSize: "16px",
            backgroundColor: selected ? "#f6c744" : "#ffffff",
            padding: { x: 12, y: 8 }
          }
        );

        objects.push(button);
      });
    }

    const complete = this.isComplete();

    const action = this.scene.panels.makeButton(
      0,
      275,
      complete ? "Finish This Build" : "Place Every Piece",
      () => {
        if(complete){
          this.completeBuild();
        }
      },
      {
        fontSize: "21px",
        backgroundColor: complete ? "#f6c744" : "#e6e6e6"
      }
    );

    objects.push(action);

    this.scene.panels.open(
      objects,
      {
        width: 900,
        height: 680
      }
    );
  }

  placeSelected(slotIndex){
    if(!this.selectedPieceId){
      return;
    }

    const placements = this.placements();
    const occupyingPiece = this.pieceInSlot(slotIndex);

    if(occupyingPiece){
      delete placements[occupyingPiece];
    }

    placements[this.selectedPieceId] = slotIndex;
    this.selectedPieceId = "";
    saveGame(this.scene.save);
    this.showBuilder();
  }

  isComplete(){
    const placements = this.placements();

    return this.build.requiredPieces.every(pieceId => {
      return Object.prototype.hasOwnProperty.call(
        placements,
        pieceId
      );
    });
  }

  completeBuild(){
    if(!this.isComplete()){
      return;
    }

    if(!this.scene.save.academyBuilds){
      this.scene.save.academyBuilds = {};
    }

    this.scene.save.academyBuilds[
      this.build.areaId
    ] = Math.max(
      this.scene.save.academyBuilds[this.build.areaId] || 0,
      this.build.stage
    );

    saveGame(this.scene.save);

    const title = this.scene.add.text(
      0,
      -145,
      "Build Complete!",
      {
        fontSize: "38px",
        fontStyle: "bold",
        color: "#2f7d32"
      }
    ).setOrigin(0.5);

    const icon = this.scene.add.text(
      0,
      -60,
      "🏡✨",
      { fontSize: "60px" }
    ).setOrigin(0.5);

    const body = this.scene.add.text(
      0,
      45,
      this.build.completionMessage ||
        "Your new Academy section has been saved.",
      {
        fontSize: "25px",
        fontStyle: "bold",
        color: "#102342",
        align: "center",
        wordWrap: { width: 650 }
      }
    ).setOrigin(0.5);

    const continueButton = this.scene.panels.makeButton(
      0,
      165,
      "Celebrate",
      () => this.finish()
    );

    this.scene.panels.open(
      [title, icon, body, continueButton],
      { width: 760, height: 500 }
    );
  }

  finish(){
    const callback = this.onComplete;
    this.onComplete = null;

    if(typeof callback === "function"){
      callback();
    }
  }
}

window.BuilderEngine = BuilderEngine;
