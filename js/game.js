class World extends Phaser.Scene {
  constructor(){
    super("World");
  }

  preload(){
    this.load.image("campus", "assets/fritz_academy_world_map.png");
    this.load.image("fritz_raw", "assets/captain_fritz.png");
  }

  create(){
    this.save = getSave();
    this.panels = new PanelManager(this);

    this.worldW = 2048;
    this.worldH = 2048;
    this.currentZone = null;
    this.mobileDir = null;

    this.physics.world.setBounds(0, 0, this.worldW, this.worldH);
    this.cameras.main.setBounds(0, 0, this.worldW, this.worldH);

    this.add.image(this.worldW / 2, this.worldH / 2, "campus")
      .setDisplaySize(this.worldW, this.worldH);

    this.makeCleanSprite("fritz_raw", "fritz", 238);

    this.createCollision();
    this.createPlayer();
    this.createCaptainFritz();
    this.createZones();
    this.createHUD();
    this.createMobileControls();
    this.createAdventureLogButton();

    this.keys = this.input.keyboard.addKeys("W,A,S,D,UP,DOWN,LEFT,RIGHT,SPACE,ESC,M,ONE,TWO,THREE,FOUR,D");

    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    this.cameras.main.setZoom(1.05);

    this.input.keyboard.on("keydown-ESC", () => this.panels.close());
    this.input.keyboard.on("keydown-D", () => this.toggleDebug());

    if(!this.save.studentName){
      this.showStudentSetup();
    }
  }

  makeCleanSprite(sourceKey, newKey, whiteCutoff){
    const src = this.textures.get(sourceKey).getSourceImage();
    const temp = document.createElement("canvas");
    temp.width = src.width;
    temp.height = src.height;

    const tctx = temp.getContext("2d");
    tctx.drawImage(src, 0, 0);

    const img = tctx.getImageData(0, 0, temp.width, temp.height);
    const d = img.data;

    let minX = temp.width;
    let minY = temp.height;
    let maxX = 0;
    let maxY = 0;

    for(let y = 0; y < temp.height; y++){
      for(let x = 0; x < temp.width; x++){
        const i = (y * temp.width + x) * 4;
        const r = d[i];
        const g = d[i + 1];
        const b = d[i + 2];

        if(r > whiteCutoff && g > whiteCutoff && b > whiteCutoff){
          d[i + 3] = 0;
        }

        if(d[i + 3] > 20){
          if(x < minX) minX = x;
          if(y < minY) minY = y;
          if(x > maxX) maxX = x;
          if(y > maxY) maxY = y;
        }
      }
    }

    tctx.putImageData(img, 0, 0);

    const pad = 8;
    minX = Math.max(0, minX - pad);
    minY = Math.max(0, minY - pad);
    maxX = Math.min(temp.width, maxX + pad);
    maxY = Math.min(temp.height, maxY + pad);

    const cropW = maxX - minX;
    const cropH = maxY - minY;

    const canvas = this.textures.createCanvas(newKey, cropW, cropH);
    const ctx = canvas.getContext();
    ctx.drawImage(temp, minX, minY, cropW, cropH, 0, 0, cropW, cropH);
    canvas.refresh();
  }

  createPlayer(){
    this.playerShadow = this.add.ellipse(980, 1848, 34, 14, 0x000000, 0.28).setDepth(19);

    this.player = this.physics.add.image(980, 1830, "fritz")
      .setScale(0.045)
      .setDepth(20);

    this.player.body.setCollideWorldBounds(true);
    this.player.body.setSize(42, 64);

    this.physics.add.collider(this.player, this.walls);
  }

  createCaptainFritz(){
    this.fritz = this.add.image(1015, 1765, "fritz")
      .setScale(0.055)
      .setDepth(22)
      .setInteractive({ useHandCursor: true });

    this.add.text(1015, 1688, "💬", {
      fontSize: "24px"
    }).setOrigin(0.5).setDepth(23);

    this.fritz.on("pointerdown", () => {
      const name = this.save.studentName || "Academy Student";
      this.panels.message(
        "Captain Fritz",
        `Welcome back, ${name}! Open your Academy Adventure Log to continue.`
      );
    });
  }

  createCollision(){
    this.walls = this.physics.add.staticGroup();
    this.debugRects = [];

    const wallData = [
      [1020, 735, 350, 240],
      [520, 760, 310, 250],
      [1270, 425, 330, 260],
      [1435, 650, 330, 260],
      [925, 1515, 330, 230],
      [1645, 970, 360, 270],
      [350, 1040, 330, 270],
      [1510, 1700, 530, 290],
      [760, 1325, 260, 160],
      [1180, 1510, 240, 120]
    ];

    wallData.forEach(([x, y, w, h]) => {
      const z = this.add.zone(x, y, w, h);
      this.physics.world.enable(z);
      z.body.setImmovable(true);
      z.body.moves = false;
      this.walls.add(z);

      const r = this.add.rectangle(x, y, w, h, 0xff0000, 0.22)
        .setStrokeStyle(2, 0xff0000)
        .setVisible(false)
        .setDepth(500);

      this.debugRects.push(r);
    });
  }

  toggleDebug(){
    this.debugRects.forEach(r => r.setVisible(!r.visible));
  }

  createZones(){
    this.zones = [];
    this.zone("Main Hall", 1020, 925, 270, 160, "1-A");
    this.zone("Training Grounds", 1600, 1850, 420, 160, "2-A");
    this.zone("Greenhouse", 930, 1700, 320, 160, "3-A");
    this.zone("Library", 520, 925, 280, 160, "4-A");
  }

  zone(name, x, y, w, h, level){
    const z = this.add.zone(x, y, w, h);
    this.physics.world.enable(z);
    z.name = name;
    z.level = level;
    this.zones.push(z);
  }

  update(){
    if(this.panels.isOpen){
      this.player.body.setVelocity(0, 0);
      return;
    }

    const speed = 210;
    let vx = 0;
    let vy = 0;

    if(this.keys.LEFT.isDown || this.keys.A.isDown) vx = -speed;
    if(this.keys.RIGHT.isDown || this.keys.D.isDown) vx = speed;
    if(this.keys.UP.isDown || this.keys.W.isDown) vy = -speed;
    if(this.keys.DOWN.isDown || this.keys.S.isDown) vy = speed;

    if(this.mobileDir){
      vx = this.mobileDir.x * speed;
      vy = this.mobileDir.y * speed;
    }

    this.player.body.setVelocity(vx, vy);

    if(vx < 0) this.player.setFlipX(true);
    if(vx > 0) this.player.setFlipX(false);

    this.playerShadow.x = this.player.x;
    this.playerShadow.y = this.player.y + 20;

    this.checkZones();

    if(Phaser.Input.Keyboard.JustDown(this.keys.SPACE) && this.currentZone){
      this.openLevel(this.currentZone.level, this.currentZone.name);
    }

    if(Phaser.Input.Keyboard.JustDown(this.keys.M)) this.showAdventureLog();
    if(Phaser.Input.Keyboard.JustDown(this.keys.ONE)) this.openLevel("1-A", "Quick Start");
    if(Phaser.Input.Keyboard.JustDown(this.keys.TWO)) this.openLevel("2-A", "Quick Start");
    if(Phaser.Input.Keyboard.JustDown(this.keys.THREE)) this.openLevel("3-A", "Quick Start");
    if(Phaser.Input.Keyboard.JustDown(this.keys.FOUR)) this.openLevel("4-A", "Quick Start");
  }

  checkZones(){
    let found = null;
    const box = new Phaser.Geom.Rectangle(this.player.x - 24, this.player.y - 35, 48, 70);

    for(const z of this.zones){
      if(Phaser.Geom.Rectangle.Overlaps(z.getBounds(), box)){
        found = z;
        break;
      }
    }

    if(found && !this.currentZone){
      this.currentZone = found;
      this.showPrompt(found.name);
    }

    if(!found && this.currentZone){
      this.currentZone = null;
      this.hidePrompt();
    }
  }

  openLevel(levelId, place){
    const level = findLevel(levelId);
    if(!level) return;

    this.save.currentLevel = levelId;
    saveGame(this.save);

    this.activeLevel = level;
    this.activePlace = place;
    this.lessonStep = 0;

    this.showLevelPanel();
  }

  showLevelPanel(){
    this.panels.close();

    const level = this.activeLevel;

    const steps = [
      {
        title: `Level ${level.id}`,
        body: `${level.title}\n\nPlace: ${this.activePlace}\nFocus: ${level.focus}`
      },
      {
        title: "Story",
        body: "Captain Fritz gives you your next Academy task.\n\nUse English to help build the Academy."
      },
      {
        title: "Read With Me",
        body: `Hello.\nI am ${this.save.studentName || "an Academy Student"}.\nI see the Academy.\nI can help.`
      },
      {
        title: "Say It",
        body: `Practice:\n${level.focus}`
      },
      {
        title: "Challenge",
        body: `Complete the task and earn: ${level.reward}`
      },
      {
        title: "Complete",
        body: "Save this level and continue your Adventure Log."
      }
    ];

    const step = steps[this.lessonStep];

    const bg = this.add.rectangle(0, 0, 800, 520, 0xfffbef, 0.98)
      .setStrokeStyle(6, 0x102342);

    const title = this.add.text(0, -220, step.title, {
      fontSize: "32px",
      fontStyle: "bold",
      color: "#102342"
    }).setOrigin(0.5);

    const body = this.add.text(0, -35, step.body, {
      fontSize: "25px",
      fontStyle: "bold",
      color: "#102342",
      align: "center",
      wordWrap: { width: 710 }
    }).setOrigin(0.5);

    const next = this.add.text(170, 210, this.lessonStep < 5 ? "Next" : "Finish", {
      fontSize: "24px",
      fontStyle: "bold",
      color: "#102342",
      backgroundColor: "#f6c744",
      padding: { x: 26, y: 12 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    const close = this.add.text(-170, 210, "Close", {
      fontSize: "24px",
      fontStyle: "bold",
      color: "#102342",
      backgroundColor: "#ffffff",
      padding: { x: 26, y: 12 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    next.on("pointerdown", () => {
      if(this.lessonStep < 5){
        this.lessonStep++;
        this.showLevelPanel();
      }else{
        this.completeLevel();
      }
    });

    close.on("pointerdown", () => this.panels.close());

    this.panels.open([bg, title, body, next, close]);
  }

  completeLevel(){
    const id = this.activeLevel.id;

    if(!this.save.completed[id]){
      this.save.completed[id] = true;
      this.save.xp += 10;
      this.save.stars += 1;

      if(id.startsWith("1-")) this.save.pack.keys++;
      if(id.startsWith("2-")) this.save.pack.books++;
      if(id.startsWith("3-")) this.save.pack.seeds++;
      if(id.startsWith("4-")) this.save.pack.blueprints++;
    }

    saveGame(this.save);
    this.refreshHUD();
    this.panels.message("Saved", "Progress saved. The Academy will remember this next class.");
  }

  createAdventureLogButton(){
    const b = this.add.text(1090, 664, "Adventure Log", {
      fontSize: "18px",
      fontStyle: "bold",
      color: "#102342",
      backgroundColor: "#f6c744",
      padding: { x: 16, y: 8 }
    }).setScrollFactor(0).setDepth(260).setInteractive({ useHandCursor: true });

    b.on("pointerdown", () => this.showAdventureLog());
  }

  showAdventureLog(){
    this.panels.close();

    const bg = this.add.rectangle(0, 0, 850, 610, 0xfffbef, 0.98)
      .setStrokeStyle(6, 0x102342);

    const title = this.add.text(0, -270, "Fritz Academy Adventure Log", {
      fontSize: "32px",
      fontStyle: "bold",
      color: "#102342"
    }).setOrigin(0.5);

    const rows = [];
    let y = -210;
    let currentChapter = "";

    LEVELS.forEach(level => {
      if(level.chapter !== currentChapter){
        currentChapter = level.chapter;
        rows.push(this.add.text(-350, y, currentChapter, {
          fontSize: "20px",
          fontStyle: "bold",
          color: "#174ea6"
        }));
        y += 32;
      }

      const done = this.save.completed[level.id] ? "✅ " : "";
      const current = this.save.currentLevel === level.id ? "▶ " : "";
      const label = `${current}${done}Level ${level.id}: ${level.title}`;

      const row = this.add.text(-330, y, label, {
        fontSize: "19px",
        fontStyle: "bold",
        color: this.save.currentLevel === level.id ? "#ffffff" : "#102342",
        backgroundColor: this.save.currentLevel === level.id ? "#174ea6" : "#ffffff",
        padding: { x: 10, y: 5 }
      }).setInteractive({ useHandCursor: true });

      row.on("pointerdown", () => this.openLevel(level.id, "Adventure Log"));

      rows.push(row);
      y += 36;
    });

    const close = this.add.text(0, 270, "Close", {
      fontSize: "22px",
      fontStyle: "bold",
      color: "#102342",
      backgroundColor: "#f6c744",
      padding: { x: 24, y: 8 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    close.on("pointerdown", () => this.panels.close());

    this.panels.open([bg, title, ...rows, close]);
  }

  createHUD(){
    this.hud = this.add.container(0, 0).setScrollFactor(0).setDepth(200);

    const topBg = this.add.rectangle(235, 32, 440, 46, 0x102342, 0.92)
      .setStrokeStyle(3, 0xffffff, 0.45);

    this.hudText = this.add.text(28, 18, "", {
      fontSize: "18px",
      fontStyle: "bold",
      color: "#ffffff"
    });

    const packBg = this.add.rectangle(1045, 32, 420, 46, 0x102342, 0.92)
      .setStrokeStyle(3, 0xffffff, 0.45);

    this.packText = this.add.text(850, 18, "", {
      fontSize: "18px",
      fontStyle: "bold",
      color: "#ffffff"
    });

    this.hud.add([topBg, this.hudText, packBg, this.packText]);
    this.refreshHUD();
  }

  refreshHUD(){
    const s = this.save;
    const p = s.pack;
    const name = s.studentName || "New Student";

    this.hudText.setText(`${name} | Level ${s.currentLevel} | XP ${s.xp} | ⭐ ${s.stars}`);
    this.packText.setText(`📘${p.books}  🧱${p.bricks}  📜${p.blueprints}  🌱${p.seeds}  🔧${p.tools}  🔑${p.keys}`);
  }

  createMobileControls(){
    const x = 88;
    const y = 560;

    const make = (txt, dx, dy) => {
      const b = this.add.text(x + dx, y + dy, txt, {
        fontSize: "25px",
        backgroundColor: "#f6c744",
        color: "#102342",
        padding: { x: 12, y: 7 },
        fontStyle: "bold"
      }).setScrollFactor(0).setInteractive({ useHandCursor: true }).setDepth(250);

      b.dir = {
        x: dx === -42 ? -1 : dx === 42 ? 1 : 0,
        y: dy === -42 ? -1 : dy === 42 ? 1 : 0
      };

      b.on("pointerdown", () => this.mobileDir = b.dir);
      b.on("pointerup", () => this.mobileDir = null);
      b.on("pointerout", () => this.mobileDir = null);
    };

    make("↑", 0, -42);
    make("↓", 0, 42);
    make("←", -42, 0);
    make("→", 42, 0);
  }

  showPrompt(name){
    this.hidePrompt();

    this.prompt = this.add.container(640, 655).setScrollFactor(0).setDepth(260);

    const bg = this.add.rectangle(0, 0, 450, 42, 0xffffff, 0.95)
      .setStrokeStyle(3, 0x102342);

    const txt = this.add.text(0, 0, `SPACE: ${name}`, {
      fontSize: "19px",
      fontStyle: "bold",
      color: "#102342"
    }).setOrigin(0.5);

    this.prompt.add([bg, txt]);
  }

  hidePrompt(){
    if(this.prompt){
      this.prompt.destroy();
      this.prompt = null;
    }
  }

  showStudentSetup(){
    const bg = this.add.rectangle(0, 0, 760, 500, 0xfffbef, 0.98)
      .setStrokeStyle(6, 0x102342);

    const title = this.add.text(0, -205, "Welcome to Fritz Academy", {
      fontSize: "34px",
      fontStyle: "bold",
      color: "#102342"
    }).setOrigin(0.5);

    const body = this.add.text(0, -70,
      "Captain Fritz gives you an Academy Adventure Log.\n\nFor now, your student uses the puppy explorer sprite.",
      {
        fontSize: "24px",
        fontStyle: "bold",
        color: "#102342",
        align: "center",
        wordWrap: { width: 660 }
      }
    ).setOrigin(0.5);

    const start = this.add.text(0, 165, "Start Adventure", {
      fontSize: "24px",
      fontStyle: "bold",
      color: "#102342",
      backgroundColor: "#f6c744",
      padding: { x: 26, y: 12 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    start.on("pointerdown", () => {
      const entered = prompt("Student name?");
      this.save.studentName = entered && entered.trim() ? entered.trim() : "Academy Student";
      saveGame(this.save);
      this.refreshHUD();
      this.panels.close();
      this.panels.message("Captain Fritz", `Welcome to Fritz Academy, ${this.save.studentName}!`);
    });

    this.panels.open([bg, title, body, start]);
  }
}

new Phaser.Game({
  type: Phaser.AUTO,
  parent: "game",
  width: 1280,
  height: 720,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: "arcade"
  },
  scene: World
});
