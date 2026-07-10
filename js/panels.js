class PanelManager {
  constructor(scene){
    this.scene = scene;
    this.activePanel = null;
    this.overlay = null;
    this.isOpen = false;
  }

  open(children, options = {}){
    this.close();

    this.isOpen = true;

    this.overlay = this.scene.add.rectangle(
      640,
      360,
      1280,
      720,
      0x071426,
      options.overlayAlpha ?? 0.55
    )
      .setScrollFactor(0)
      .setDepth(890
