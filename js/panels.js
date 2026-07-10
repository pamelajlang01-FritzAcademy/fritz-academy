class PanelManager {
  constructor(scene){
    this.scene = scene;
    this.activePanel = null;
    this.isOpen = false;
  }

  open(children){
    this.close();
    this.isOpen = true;
    this.activePanel = this.scene.add.container(640, 360).setScrollFactor(0).setDepth(900);
    this.activePanel.add(children);
    return this.activePanel;
  }

  close(){
    if(this.activePanel){
      this.activePanel.destroy();
      this.activePanel = null;
    }
    this.isOpen = false;
  }

  message(title, body){
    const bg = this.scene.add.rectangle(0, 0, 660, 260, 0xfffbef, 0.98)
      .setStrokeStyle(5, 0x102342);

    const titleText = this.scene.add.text(0, -90, title, {
      fontFamily: "Arial",
      fontSize: "30px",
      fontStyle: "bold",
      color: "#102342"
    }).setOrigin(0.5);

    const bodyText = this.scene.add.text(0, -10, body, {
      fontFamily: "Arial",
      fontSize: "22px",
      fontStyle: "bold",
      color: "#102342",
      align: "center",
      wordWrap: { width: 560 }
    }).setOrigin(0.5);

    const close = this.scene.add.text(0, 85, "Close", {
      fontFamily: "Arial",
      fontSize: "22px",
      fontStyle: "bold",
      color: "#102342",
      backgroundColor: "#f6c744",
      padding: { x: 24, y: 10 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    close.on("pointerdown", () => this.close());

    this.open([bg, titleText, bodyText, close]);
  }
}
