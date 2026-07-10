class PanelManager {
  constructor(scene){
    this.scene = scene;
    this.activePanel = null;
    this.isOpen = false;
  }

  open(content, options = {}){
    this.close();

    this.isOpen = true;

    const width = options.width || 820;
    const height = options.height || 540;

    this.activePanel = this.scene.add
      .container(640, 360)
      .setScrollFactor(0)
      .setDepth(2000);

    const blocker = this.scene.add
      .rectangle(0, 0, 1280, 720, 0x071426, 0.48)
      .setInteractive();

    const background = this.scene.add
      .rectangle(0, 0, width, height, 0xfffbef, 0.99)
      .setStrokeStyle(6, 0x102342);

    this.activePanel.add([blocker, background, ...content]);

    this.scene.input.setTopOnly(true);

    return this.activePanel;
  }

  close(){
    if(this.activePanel){
      this.activePanel.destroy(true);
      this.activePanel = null;
    }

    this.isOpen = false;

    if(this.scene && this.scene.mobileDir){
      this.scene.mobileDir = null;
    }
  }

  makeButton(x, y, label, callback, options = {}){
    const button = this.scene.add
      .text(x, y, label, {
        fontFamily: "Arial",
        fontSize: options.fontSize || "23px",
        fontStyle: "bold",
        color: options.color || "#102342",
        backgroundColor: options.backgroundColor || "#f6c744",
        padding: options.padding || { x: 24, y: 11 },
        align: "center"
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    button.on("pointerover", () => {
      button.setAlpha(0.82);
    });

    button.on("pointerout", () => {
      button.setAlpha(1);
    });

    button.on("pointerdown", event => {
      event.stopPropagation();
      callback();
    });

    return button;
  }

  message(title, body){
    const titleText = this.scene.add
      .text(0, -105, title, {
        fontFamily: "Arial",
        fontSize: "31px",
        fontStyle: "bold",
        color: "#102342"
      })
      .setOrigin(0.5);

    const bodyText = this.scene.add
      .text(0, -10, body, {
        fontFamily: "Arial",
        fontSize: "22px",
        fontStyle: "bold",
        color: "#102342",
        align: "center",
        wordWrap: { width: 580 }
      })
      .setOrigin(0.5);

    const closeButton = this.makeButton(
      0,
      95,
      "Close",
      () => this.close()
    );

    this.open(
      [titleText, bodyText, closeButton],
      { width: 680, height: 300 }
    );
  }
}
