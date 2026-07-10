class World extends Phaser.Scene {
  constructor(){
    super("World");
  }

  preload(){
    this.load.image(
      "campus",
      "assets/fritz_academy_world_map.png"
    );

    this.load.image(
      "fritz_raw",
      "assets/captain_fritz.png"
    );
  }

  create(){
    this.save = getSave();
    this.panels = new PanelManager(this);

    this.worldW = 2048;
    this.worldH = 2048;

    this.currentZone = null;
    this.mobileDir = null;
    this.prompt = null;
    this.debugOn = false;

    this.physics.world.setBounds(
      0,
      0,
      this.worldW,
      this.worldH
    );

    this.cameras.main.setBounds(
      0,
      0,
      this.worldW,
      this.worldH
    );

    this.add
      .image(
        this.worldW / 2,
        this.worldH / 2,
        "campus"
      )
      .setDisplaySize(
        this.worldW,
        this.worldH
      )
      .setDepth(0);

    this.makeCleanSprite(
      "fritz_raw",
      "fritz",
      238
    );

    this.createCollision();
    this.createPlayer();
    this.createCaptainFritz();
    this.createZones();
    this.createHUD();
    this.createMobileControls();
    this.createAdventureLogButton();

    this.keys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.UP,
      down: Phaser.Input.Keyboard.KeyCodes.DOWN,
      left: Phaser.Input.Keyboard.KeyCodes.LEFT,
      right: Phaser.Input.Keyboard.KeyCodes.RIGHT,

      w: Phaser.Input.Keyboard.KeyCodes.W,
      a: Phaser.Input.Keyboard.KeyCodes.A,
      s: Phaser.Input.Keyboard.KeyCodes.S,
      d: Phaser.Input.Keyboard.KeyCodes.D,

      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
      escape: Phaser.Input.Keyboard.KeyCodes.ESC,
      menu: Phaser.Input.Keyboard.KeyCodes.M
    });

    this.input.keyboard.on(
      "keydown-ESC",
      () => this.panels.close()
    );

    this.input.keyboard.on(
      "keydown-B",
      () => this.toggleDebug()
    );

    this.cameras.main.startFollow(
      this.player,
      true,
      0.08,
      0.08
    );

    this.cameras.main.setZoom(1.02);

    if(!this.save.studentName){
      this.showStudentSetup();
    }
  }

  makeCleanSprite(sourceKey, newKey, whiteCutoff){
    const source = this.textures
      .get(sourceKey)
      .getSourceImage();

    const temporaryCanvas =
      document.createElement("canvas");

    temporaryCanvas.width = source.width;
    temporaryCanvas.height = source.height;

    const temporaryContext =
      temporaryCanvas.getContext("2d");

    temporaryContext.drawImage(
      source,
      0,
      0
    );

    const imageData =
      temporaryContext.getImageData(
        0,
        0,
        source.width,
        source.height
      );

    const pixels = imageData.data;

    let minX = source.width;
    let minY = source.height;
    let maxX = 0;
    let maxY = 0;

    for(let y = 0; y < source.height; y++){
      for(let x = 0; x < source.width; x++){
        const index =
          (y * source.width + x) * 4;

        const red = pixels[index];
        const green = pixels[index + 1];
        const blue = pixels[index + 2];

        if(
          red > whiteCutoff &&
          green > whiteCutoff &&
          blue > whiteCutoff
        ){
          pixels[index + 3] = 0;
        }

        if(pixels[index + 3] > 20){
          minX = Math.min(minX, x);
          minY = Math.min(minY, y);
          maxX = Math.max(maxX, x);
          maxY = Math.max(maxY, y);
        }
      }
    }

    temporaryContext.putImageData(
      imageData,
      0,
      0
    );

    const padding = 8;

    minX = Math.max(0, minX - padding);
    minY = Math.max(0, minY - padding);

    maxX = Math.min(
      source.width,
      maxX + padding
    );

    maxY = Math.min(
      source.height,
      maxY + padding
    );

    const cropWidth = maxX - minX;
    const cropHeight = maxY - minY;

    const canvasTexture =
      this.textures.createCanvas(
        newKey,
        cropWidth,
        cropHeight
      );

    const context =
      canvasTexture.getContext();

    context.drawImage(
      temporaryCanvas,
      minX,
      minY,
      cropWidth,
      cropHeight,
      0,
      0,
      cropWidth,
      cropHeight
    );

    canvasTexture.refresh();
  }

  createPlayer(){
    /*
      Spawn on the lower stone path rather than
      on top of the greenhouse.
    */
    const startX = 1080;
    const startY = 1810;

    this.playerShadow = this.add
      .ellipse(
        startX,
        startY + 27,
        35,
        13,
        0x000000,
        0.28
      )
      .setDepth(startY - 1);

    /*
      Temporary student-puppy placeholder.
      Captain Fritz remains the larger NPC.
    */
    this.player = this.physics.add
      .image(
        startX,
        startY,
        "fritz"
      )
      .setScale(0.036)
      .setDepth(startY);

    this.player.body.setCollideWorldBounds(true);

    this.player.body.setSize(
      38,
      52
    );

    this.player.body.setOffset(
      Math.max(
        0,
        (this.player.width - 38) / 2
      ),
      Math.max(
        0,
        this.player.height - 58
      )
    );

    this.physics.add.collider(
      this.player,
      this.walls
    );
  }

  createCaptainFritz(){
    const x = 1015;
    const y = 1740;

    this.captainFritz = this.add
      .image(
        x,
        y,
        "fritz"
      )
      .setScale(0.052)
      .setDepth(y)
      .setInteractive({
        useHandCursor: true,
        pixelPerfect: true,
        alphaTolerance: 10
      });

    this.captainBubble = this.add
      .text(
        x,
        y - 78,
        "💬",
        {
          fontSize: "25px"
        }
      )
      .setOrigin(0.5)
      .setDepth(y + 1)
      .setInteractive({
        useHandCursor: true
      });

    const speak = () => {
      const name =
        this.save.studentName ||
        "Academy Student";

      this.panels.message(
        "Captain Fritz",
        `Welcome, ${name}! Open your Academy Adventure Log to begin your next mission.`
      );
    };

    this.captainFritz.on(
      "pointerdown",
      speak
    );

    this.captainBubble.on(
      "pointerdown",
      speak
    );
  }

  createCollision(){
    this.walls =
      this.physics.add.staticGroup();

    this.debugRects = [];

    /*
      These zones keep the player around the
      visible paths in the current map section.
    */
    const barriers = [
      /*
        Greenhouse body.
        Door and lower stairs remain accessible.
      */
      [780, 1335, 480, 250, "Greenhouse upper"],
      [630, 1510, 230, 190, "Greenhouse left"],
      [1010, 1490, 150, 150, "Greenhouse right"],

      /*
        Main building at upper left.
      */
      [315, 390, 620, 590, "Main building"],

      /*
        Left pond and stream.
      */
      [160, 1450, 320, 360, "Left pond"],
      [370, 1285, 170, 240, "Left stream"],

      /*
        River beside the greenhouse.
      */
      [1235, 1030, 180, 650, "River"],

      /*
        Right garden fencing.
      */
      [1680, 1420, 510, 500, "Right garden"],

      /*
        Lower-right gazebo.
      */
      [1840, 1770, 260, 260, "Gazebo"]
    ];

    barriers.forEach(
      ([x, y, width, height, label]) => {
        const zone = this.add.zone(
          x,
          y,
          width,
          height
        );

        this.physics.world.enable(
          zone,
          Phaser.Physics.Arcade.STATIC_BODY
        );

        zone.body.setSize(
          width,
          height
        );

        zone.debugLabel = label;

        this.walls.add(zone);

        const rectangle = this.add
          .rectangle(
            x,
            y,
            width,
            height,
            0xff0000,
            0.22
          )
          .setStrokeStyle(
            3,
            0xff0000
          )
          .setVisible(false)
          .setDepth(5000);

        this.debugRects.push(rectangle);
      }
    );
  }

  toggleDebug(){
    this.debugOn = !this.debugOn;

    this.debugRects.forEach(
      rectangle => {
        rectangle.setVisible(
          this.debugOn
        );
      }
    );
  }

  createZones(){
    this.zones = [];

    /*
      Current playable Greenhouse entrance.
      More entrances will be aligned as we
      move around the entire campus map.
    */
    this.zone(
      "Greenhouse",
      930,
      1695,
      250,
      130,
      "3-A"
    );

    /*
      Adventure entry points for testing.
    */
    this.zone(
      "Main Hall",
      420,
      780,
      260,
      150,
      "1-A"
    );

    this.zone(
      "Library",
      500,
      1000,
      260,
      150,
      "4-A"
    );

    this.zone(
      "Training Grounds",
      1600,
      1620,
      340,
      180,
      "2-A"
    );
  }

  zone(name, x, y, width, height, level){
    const zone = this.add.zone(
      x,
      y,
      width,
      height
    );

    zone.name = name;
    zone.level = level;

    this.zones.push(zone);
  }

  update(){
    if(!this.player || !this.player.body){
      return;
    }

    if(this.panels.isOpen){
      this.player.body.setVelocity(
        0,
        0
      );

      this.mobileDir = null;
      return;
    }

    const speed = 205;

    let velocityX = 0;
    let velocityY = 0;

    if(
      this.keys.left.isDown ||
      this.keys.a.isDown
    ){
      velocityX = -speed;
    }

    if(
      this.keys.right.isDown ||
      this.keys.d.isDown
    ){
      velocityX = speed;
    }

    if(
      this.keys.up.isDown ||
      this.keys.w.isDown
    ){
      velocityY = -speed;
    }

    if(
      this.keys.down.isDown ||
      this.keys.s.isDown
    ){
      velocityY = speed;
    }

    if(this.mobileDir){
      velocityX =
        this.mobileDir.x * speed;

      velocityY =
        this.mobileDir.y * speed;
    }

    /*
      Prevent diagonal movement from being faster.
    */
    if(velocityX !== 0 && velocityY !== 0){
      velocityX *= 0.7071;
      velocityY *= 0.7071;
    }

    this.player.body.setVelocity(
      velocityX,
      velocityY
    );

    if(velocityX < 0){
      this.player.setFlipX(true);
    }

    if(velocityX > 0){
      this.player.setFlipX(false);
    }

    /*
      Dynamic depth makes the player appear in
      front of or behind objects based on Y position.
    */
    this.player.setDepth(
      Math.floor(this.player.y)
    );

    this.playerShadow.x =
      this.player.x;

    this.playerShadow.y =
      this.player.y + 27;

    this.playerShadow.setDepth(
      Math.floor(this.player.y) - 1
    );

    this.checkZones();

    if(
      Phaser.Input.Keyboard.JustDown(
        this.keys.space
      ) &&
      this.currentZone
    ){
      this.openLevel(
        this.currentZone.level,
        this.currentZone.name
      );
    }

    if(
      Phaser.Input.Keyboard.JustDown(
        this.keys.menu
      )
    ){
      this.showAdventureLog();
    }
  }

  checkZones(){
    let foundZone = null;

    const playerBounds =
      new Phaser.Geom.Rectangle(
        this.player.x - 24,
        this.player.y - 38,
        48,
        76
      );

    for(const zone of this.zones){
      if(
        Phaser.Geom.Rectangle.Overlaps(
          zone.getBounds(),
          playerBounds
        )
      ){
        foundZone = zone;
        break;
      }
    }

    if(
      foundZone !==
      this.currentZone
    ){
      this.currentZone = foundZone;

      if(foundZone){
        this.showPrompt(foundZone);
      }else{
        this.hidePrompt();
      }
    }
  }

  showPrompt(zone){
    this.hidePrompt();

    this.prompt = this.add
      .container(
        640,
        650
      )
      .setScrollFactor(0)
      .setDepth(1000);

    const background = this.add
      .rectangle(
        0,
        0,
        510,
        60,
        0xffffff,
        0.97
      )
      .setStrokeStyle(
        4,
        0x102342
      );

    const label = this.add
      .text(
        -75,
        0,
        `${zone.name}`,
        {
          fontSize: "20px",
          fontStyle: "bold",
          color: "#102342"
        }
      )
      .setOrigin(0.5);

    const enterButton = this.add
      .text(
        165,
        0,
        "Enter",
        {
          fontSize: "20px",
          fontStyle: "bold",
          color: "#102342",
          backgroundColor: "#f6c744",
          padding: {
            x: 20,
            y: 8
          }
        }
      )
      .setOrigin(0.5)
      .setInteractive({
        useHandCursor: true
      });

    enterButton.on(
      "pointerdown",
      event => {
        event.stopPropagation();

        this.openLevel(
          zone.level,
          zone.name
        );
      }
    );

    this.prompt.add([
      background,
      label,
      enterButton
    ]);
  }

  hidePrompt(){
    if(this.prompt){
      this.prompt.destroy(true);
      this.prompt = null;
    }
  }

  openLevel(levelId, place){
    const level = findLevel(levelId);

    if(!level){
      this.panels.message(
        "Adventure unavailable",
        "This Academy adventure has not been added yet."
      );
      return;
    }

    this.hidePrompt();

    this.save.currentLevel =
      levelId;

    saveGame(this.save);

    this.activeLevel = level;
    this.activePlace = place;
    this.lessonStep = 0;

    this.showLevelPanel();
  }

  showLevelPanel(){
    const level = this.activeLevel;

    const studentName =
      this.save.studentName ||
      "Academy Student";

    const steps = [
      {
        title: `Level ${level.id}`,
        body:
          `${level.title}\n\n` +
          `Location: ${this.activePlace}\n` +
          `English focus: ${level.focus}`
      },
      {
        title: "Mission Story",
        body:
          "Captain Fritz has a new Academy mission.\n\n" +
          "Listen carefully and use English to help."
      },
      {
        title: "Read With Me",
        body:
          `Hello.\n` +
          `I am ${studentName}.\n` +
          `I see Fritz Academy.\n` +
          `I can help.`
      },
      {
        title: "Say It",
        body:
          `Practice these words and phrases:\n\n` +
          `${level.focus}`
      },
      {
        title: "Mission Challenge",
        body:
          `Complete this mission to earn:\n\n` +
          `${level.reward}`
      },
      {
        title: "Level Complete",
        body:
          "Great work!\n\n" +
          "Save your progress and return to the Academy."
      }
    ];

    const step =
      steps[this.lessonStep];

    const title = this.add
      .text(
        0,
        -210,
        step.title,
        {
          fontSize: "32px",
          fontStyle: "bold",
          color: "#102342"
        }
      )
      .setOrigin(0.5);

    const body = this.add
      .text(
        0,
        -30,
        step.body,
        {
          fontSize: "25px",
          fontStyle: "bold",
          color: "#102342",
          align: "center",
          wordWrap: {
            width: 680
          }
        }
      )
      .setOrigin(0.5);

    const closeButton =
      this.panels.makeButton(
        -175,
        205,
        "Close",
        () => {
          this.panels.close();
        },
        {
          backgroundColor: "#ffffff"
        }
      );

    const nextButton =
      this.panels.makeButton(
        175,
        205,
        this.lessonStep < 5
          ? "Next"
          : "Finish",
        () => {
          if(this.lessonStep < 5){
            this.lessonStep++;
            this.showLevelPanel();
          }else{
            this.completeLevel();
          }
        }
      );

    this.panels.open(
      [
        title,
        body,
        closeButton,
        nextButton
      ],
      {
        width: 820,
        height: 540
      }
    );
  }

  completeLevel(){
    const levelId =
      this.activeLevel.id;

    if(!this.save.completed[levelId]){
      this.save.completed[levelId] = true;
      this.save.xp += 10;
      this.save.stars += 1;

      if(levelId.startsWith("1-")){
        this.save.pack.keys++;
      }

      if(levelId.startsWith("2-")){
        this.save.pack.books++;
      }

      if(levelId.startsWith("3-")){
        this.save.pack.seeds++;
      }

      if(levelId.startsWith("4-")){
        this.save.pack.blueprints++;
      }
    }

    saveGame(this.save);
    this.refreshHUD();

    this.panels.message(
      "Progress saved",
      "Your Academy Adventure Log has been updated."
    );
  }

  createAdventureLogButton(){
    this.adventureLogButton = this.add
      .text(
        1155,
        674,
        "Adventure Log",
        {
          fontSize: "18px",
          fontStyle: "bold",
          color: "#102342",
          backgroundColor: "#f6c744",
          padding: {
            x: 16,
            y: 8
          }
        }
      )
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setDepth(1000)
      .setInteractive({
        useHandCursor: true
      });

    this.adventureLogButton.on(
      "pointerdown",
      event => {
        event.stopPropagation();
        this.showAdventureLog();
      }
    );
  }

  showAdventureLog(){
    const title = this.add
      .text(
        0,
        -265,
        "Fritz Academy Adventure Log",
        {
          fontSize: "31px",
          fontStyle: "bold",
          color: "#102342"
        }
      )
      .setOrigin(0.5);

    const visibleRows = [];
    const levelsPerPage = 8;

    const currentIndex = Math.max(
      0,
      LEVELS.findIndex(
        level =>
          level.id ===
          this.save.currentLevel
      )
    );

    let startIndex =
      Math.max(
        0,
        currentIndex - 2
      );

    startIndex =
      Math.min(
        startIndex,
        Math.max(
          0,
          LEVELS.length - levelsPerPage
        )
      );

    const visibleLevels =
      LEVELS.slice(
        startIndex,
        startIndex + levelsPerPage
      );

    let rowY = -195;

    visibleLevels.forEach(level => {
      const completed =
        Boolean(
          this.save.completed[level.id]
        );

      const current =
        level.id ===
        this.save.currentLevel;

      let prefix = "○";

      if(completed){
        prefix = "✓";
      }

      if(current){
        prefix = "▶";
      }

      const row = this.add
        .text(
          0,
          rowY,
          `${prefix} Level ${level.id}: ${level.title}`,
          {
            fontSize: "20px",
            fontStyle: "bold",
            color: current
              ? "#ffffff"
              : "#102342",
            backgroundColor: current
              ? "#174ea6"
              : "#ffffff",
            padding: {
              x: 16,
              y: 7
            },
            fixedWidth: 690,
            align: "left"
          }
        )
        .setOrigin(0.5)
        .setInteractive({
          useHandCursor: true
        });

      row.on(
        "pointerdown",
        event => {
          event.stopPropagation();

          this.openLevel(
            level.id,
            "Adventure Log"
          );
        }
      );

      visibleRows.push(row);
      rowY += 48;
    });

    const hint = this.add
      .text(
        0,
        207,
        "The log automatically centers on the student's current level.",
        {
          fontSize: "17px",
          color: "#46566f"
        }
      )
      .setOrigin(0.5);

    const closeButton =
      this.panels.makeButton(
        0,
        250,
        "Close",
        () => {
          this.panels.close();
        }
      );

    this.panels.open(
      [
        title,
        ...visibleRows,
        hint,
        closeButton
      ],
      {
        width: 820,
        height: 630
      }
    );
  }

  createHUD(){
    this.hud = this.add
      .container(0, 0)
      .setScrollFactor(0)
      .setDepth(900);

    const statusBackground = this.add
      .rectangle(
        250,
        32,
        480,
        48,
        0x102342,
        0.94
      )
      .setStrokeStyle(
        2,
        0xffffff,
        0.45
      );

    this.hudText = this.add
      .text(
        22,
        18,
        "",
        {
          fontSize: "18px",
          fontStyle: "bold",
          color: "#ffffff"
        }
      );

    const inventoryBackground = this.add
      .rectangle(
        1060,
        32,
        410,
        48,
        0x102342,
        0.94
      )
      .setStrokeStyle(
        2,
        0xffffff,
        0.45
      );

    this.packText = this.add
      .text(
        870,
        18,
        "",
        {
          fontSize: "18px",
          fontStyle: "bold",
          color: "#ffffff"
        }
      );

    this.hud.add([
      statusBackground,
      this.hudText,
      inventoryBackground,
      this.packText
    ]);

    this.refreshHUD();
  }

  refreshHUD(){
    const save = this.save;
    const pack = save.pack;

    const studentName =
      save.studentName ||
      "New Student";

    this.hudText.setText(
      `${studentName}  |  Level ${save.currentLevel}  |  XP ${save.xp}  |  ⭐ ${save.stars}`
    );

    this.packText.setText(
      `📘${pack.books}  ` +
      `🧱${pack.bricks}  ` +
      `📜${pack.blueprints}  ` +
      `🌱${pack.seeds}  ` +
      `🔧${pack.tools}  ` +
      `🔑${pack.keys}`
    );
  }

  createMobileControls(){
    const centerX = 84;
    const centerY = 570;

    const makeButton = (
      symbol,
      offsetX,
      offsetY,
      direction
    ) => {
      const button = this.add
        .text(
          centerX + offsetX,
          centerY + offsetY,
          symbol,
          {
            fontSize: "26px",
            fontStyle: "bold",
            color: "#102342",
            backgroundColor: "#f6c744",
            padding: {
              x: 13,
              y: 8
            }
          }
        )
        .setOrigin(0.5)
        .setScrollFactor(0)
        .setDepth(1000)
        .setInteractive({
          useHandCursor: true
        });

      button.on(
        "pointerdown",
        event => {
          event.stopPropagation();

          if(!this.panels.isOpen){
            this.mobileDir = direction;
          }
        }
      );

      const stop = () => {
        this.mobileDir = null;
      };

      button.on("pointerup", stop);
      button.on("pointerout", stop);
      button.on("pointerupoutside", stop);

      return button;
    };

    makeButton(
      "↑",
      0,
      -48,
      { x: 0, y: -1 }
    );

    makeButton(
      "↓",
      0,
      48,
      { x: 0, y: 1 }
    );

    makeButton(
      "←",
      -48,
      0,
      { x: -1, y: 0 }
    );

    makeButton(
      "→",
      48,
      0,
      { x: 1, y: 0 }
    );
  }

  showStudentSetup(){
    const title = this.add
      .text(
        0,
        -205,
        "Welcome to Fritz Academy",
        {
          fontSize: "34px",
          fontStyle: "bold",
          color: "#102342"
        }
      )
      .setOrigin(0.5);

    const body = this.add
      .text(
        0,
        -65,
        "Captain Fritz is the Academy guide.\n\nYou are a new Academy student joining the adventure.",
        {
          fontSize: "24px",
          fontStyle: "bold",
          color: "#102342",
          align: "center",
          wordWrap: {
            width: 660
          }
        }
      )
      .setOrigin(0.5);

    const startButton =
      this.panels.makeButton(
        0,
        155,
        "Start Adventure",
        () => {
          const enteredName =
            window.prompt(
              "What is the student's first name?"
            );

          this.save.studentName =
            enteredName &&
            enteredName.trim()
              ? enteredName.trim()
              : "Academy Student";

          saveGame(this.save);
          this.refreshHUD();

          this.panels.message(
            "Captain Fritz",
            `Welcome to Fritz Academy, ${this.save.studentName}!`
          );
        },
        {
          fontSize: "24px"
        }
      );

    this.panels.open(
      [
        title,
        body,
        startButton
      ],
      {
        width: 780,
        height: 500
      }
    );
  }
}

new Phaser.Game({
  type: Phaser.AUTO,

  parent: "game",

  width: 1280,
  height: 720,

  backgroundColor: "#071426",

  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter:
      Phaser.Scale.CENTER_BOTH
  },

  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  },

  scene: World
});
