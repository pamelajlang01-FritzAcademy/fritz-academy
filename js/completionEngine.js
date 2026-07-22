/*
====================================================
FRITZ ACADEMY
Completion Engine
Version 42.0.0
====================================================
*/

class CompletionEngine {
  constructor(scene, lessonEngine){
    this.scene = scene;
    this.lessonEngine = lessonEngine;
  }

  complete(lesson){
    const levelId = lesson.id;
    const completion = lesson.completion || {};
    const save = this.scene.save;
    const progress = this.lessonEngine.progress();

    if(!save.completed){
      save.completed = {};
    }

    if(!Array.isArray(save.unlockedLevels)){
      save.unlockedLevels = ["1-A"];
    }

    const wasComplete = Boolean(save.completed[levelId]);

    progress.completed = true;
    progress.currentSection = "complete";
    save.completed[levelId] = true;

    if(!wasComplete){
      save.xp = (Number(save.xp) || 0) + (Number(completion.xp) || 0);
      save.stars = (Number(save.stars) || 0) + (Number(completion.stars) || 0);
    }

    const unlocks = Array.isArray(completion.unlocks)
      ? completion.unlocks
      : [completion.unlocks].filter(Boolean);

    unlocks.forEach(level => {
      if(!save.unlockedLevels.includes(level)){
        save.unlockedLevels.push(level);
      }
    });

    save.currentLevel = unlocks[0] || levelId;
    saveGame(save);

    this.showSummary(lesson, completion, wasComplete);
  }

  showSummary(lesson, completion, wasComplete){
    const title = this.scene.add.text(
      0,
      -195,
      `Level ${lesson.id} Complete!`,
      {
        fontSize: "38px",
        fontStyle: "bold",
        color: "#2f7d32"
      }
    ).setOrigin(0.5);

    const stars = this.scene.add.text(
      0,
      -100,
      "⭐".repeat(Math.max(1, Number(completion.stars) || 1)),
      { fontSize: "58px" }
    ).setOrigin(0.5);

    const rewardLine = wasComplete
      ? "Review complete — your earlier rewards are safely preserved."
      : `You earned ${Number(completion.xp) || 0} XP and ${Number(completion.stars) || 0} star.`;

    const body = this.scene.add.text(
      0,
      15,
      `${completion.message || "Excellent work!"}\n\n${rewardLine}`,
      {
        fontSize: "24px",
        fontStyle: "bold",
        color: "#102342",
        align: "center",
        wordWrap: { width: 680 },
        lineSpacing: 8
      }
    ).setOrigin(0.5);

    const finish = this.scene.panels.makeButton(
      0,
      190,
      "Return to Academy",
      () => {
        this.lessonEngine.stopMedia();
        this.scene.panels.close();

        if(typeof this.scene.refreshHUD === "function"){
          this.scene.refreshHUD();
        }

        if(typeof this.scene.showAdventureLog === "function"){
          this.scene.showAdventureLog();
        }
      }
    );

    this.scene.panels.open(
      [title, stars, body, finish],
      { width: 800, height: 560 }
    );
  }
}

window.CompletionEngine = CompletionEngine;
