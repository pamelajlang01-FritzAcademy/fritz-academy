class PanelManager {
  constructor(scene){
    this.scene = scene;
    this.activeObjects = [];
    this.isOpen = false;
    this.centerX = 640;
    this.centerY = 360;
    this.baseDepth = 5000;
  }

  open(children, options = {}){
    this.close();

    this.isOpen = true;

    const width = options.width || 820;
    const height = options.height || 540;

    /*
      The overlay and background are deliberately
      not interactive. They cannot block buttons.
    */
    const overlay = this.scene.add
      .rectangle(
        this.centerX,
        this.centerY,
        1280,
        720,
        0x071426,
        0.52
      )
      .setScrollFactor(0)
      .setDepth(this.baseDepth);

    const background = this.scene.add
      .rectangle(
        this.centerX,
        this.centerY,
        width,
        height,
        0xfffbef,
        0.99
      )
      .setStrokeStyle(6, 0x102342)
      .setScrollFactor(0)
      .setDepth(this.baseDepth + 1);

    this.activeObjects.push(
      overlay,
      background
    );

    /*
      Existing game code creates panel content using
      coordinates relative to the center of the screen.
      Move each item into its correct absolute position.
    */
    children.forEach((child, index) => {
      child.x += this.centerX;
      child.y += this.centerY;

      child
        .setScrollFactor(0)
        .setDepth(this.baseDepth + 2 + index);

      this.activeObjects.push(child);
    });

    return this.activeObjects;
  }

  close(){
    this.activeObjects.forEach(object => {
      if(object && object.destroy){
        object.destroy();
      }
    });

    this.activeObjects = [];
    this.isOpen = false;

    if(this.scene){
      this.scene.mobileDir = null;

      if(
        this.scene.player &&
        this.scene.player.body
      ){
        this.scene.player.body.setVelocity(
          0,
          0
        );
      }
    }
  }

  makeButton(
    x,
    y,
    label,
    callback,
    options = {}
  ){
    const button = this.scene.add
      .text(
        x,
        y,
        label,
        {
          fontFamily: "Arial",
          fontSize:
            options.fontSize ||
            "23px",
          fontStyle: "bold",
          color:
            options.color ||
            "#102342",
          backgroundColor:
            options.backgroundColor ||
            "#f6c744",
          padding:
            options.padding ||
            {
              x: 24,
              y: 11
            },
          align: "center"
        }
      )
      .setOrigin(0.5);

    /*
      Give the button a clear rectangular hit area
      instead of relying on Phaser to infer one.
    */
    button.setInteractive(
      new Phaser.Geom.Rectangle(
        0,
        0,
        button.width,
        button.height
      ),
      Phaser.Geom.Rectangle.Contains
    );

    button.input.cursor = "pointer";

    button.on(
      "pointerover",
      () => {
        button.setAlpha(0.82);
      }
    );

    button.on(
      "pointerout",
      () => {
        button.setAlpha(1);
      }
    );

    button.on(
      "pointerup",
      () => {
        callback();
      }
    );

    return button;
  }

  message(title, body){
    const titleText = this.scene.add
      .text(
        0,
        -100,
        title,
        {
          fontFamily: "Arial",
          fontSize: "31px",
          fontStyle: "bold",
          color: "#102342"
        }
      )
      .setOrigin(0.5);

    const bodyText = this.scene.add
      .text(
        0,
        -10,
        body,
        {
          fontFamily: "Arial",
          fontSize: "22px",
          fontStyle: "bold",
          color: "#102342",
          align: "center",
          wordWrap: {
            width: 580
          }
        }
      )
      .setOrigin(0.5);

    const closeButton = this.makeButton(
      0,
      95,
      "Close",
      () => {
        this.close();
      }
    );

    this.open(
      [
        titleText,
        bodyText,
        closeButton
      ],
      {
        width: 680,
        height: 300
      }
    );
  }
}
