/*
====================================================
FRITZ ACADEMY
Illustration Engine
Version 43.2.0
====================================================

Purpose:
- Ensure every story and reader page always shows an illustration.
- Render a bright, age-appropriate Academy scene when a page image is missing.
- Keep the lesson usable while bespoke artwork is produced and reviewed.
*/

class IllustrationEngine {
  constructor(scene){
    this.scene = scene;
  }

  addScene(objects, text, options = {}){
    const centerX = Number(options.x) || 0;
    const centerY = Number(options.y) || -92;
    const width = Number(options.width) || 560;
    const height = Number(options.height) || 230;
    const lowerText = String(text || "").toLowerCase();

    const background = this.scene.add.rectangle(
      centerX,
      centerY,
      width,
      height,
      0xdff2ff,
      1
    ).setStrokeStyle(4, 0x174ea6);

    const grass = this.scene.add.rectangle(
      centerX,
      centerY + height * 0.28,
      width - 8,
      height * 0.42,
      0xbfe3a1,
      1
    );

    const sun = this.scene.add.circle(
      centerX + width * 0.37,
      centerY - height * 0.30,
      24,
      0xf6c744,
      1
    ).setStrokeStyle(3, 0xd59b00);

    const path = this.scene.add.polygon(
      centerX,
      centerY + height * 0.28,
      [
        -58, -10,
        58, -10,
        118, 86,
        -118, 86
      ],
      0xd8c4a8,
      1
    ).setStrokeStyle(3, 0x8c7359);

    objects.push(background, grass, sun, path);

    if(lowerText.includes("gate")){
      const leftPost = this.scene.add.rectangle(
        centerX - 150,
        centerY + 15,
        18,
        112,
        0x8b5a2b,
        1
      );
      const rightPost = this.scene.add.rectangle(
        centerX + 150,
        centerY + 15,
        18,
        112,
        0x8b5a2b,
        1
      );
      const arch = this.scene.add.rectangle(
        centerX,
        centerY - 34,
        300,
        18,
        0x8b5a2b,
        1
      );
      objects.push(leftPost, rightPost, arch);
    }

    if(lowerText.includes("garden") || lowerText.includes("flower")){
      [-205, -165, 165, 205].forEach((offset, index) => {
        const flower = this.scene.add.text(
          centerX + offset,
          centerY + 55 + (index % 2) * 12,
          index % 2 ? "🌷" : "🌼",
          { fontSize: "32px" }
        ).setOrigin(0.5);
        objects.push(flower);
      });
    }

    if(lowerText.includes("tree")){
      const tree = this.scene.add.text(
        centerX + 190,
        centerY - 5,
        "🌳",
        { fontSize: "72px" }
      ).setOrigin(0.5);
      objects.push(tree);
    }

    const fritz = this.scene.add.text(
      centerX - 78,
      centerY + 15,
      "🐶",
      { fontSize: "66px" }
    ).setOrigin(0.5);

    const student = this.scene.add.text(
      centerX + 68,
      centerY + 18,
      "🧒",
      { fontSize: "60px" }
    ).setOrigin(0.5);

    objects.push(fritz, student);

    if(lowerText.includes("wave") || lowerText.includes("hello")){
      const greeting = this.scene.add.text(
        centerX,
        centerY - 78,
        "Hello! 👋",
        {
          fontSize: "24px",
          fontStyle: "bold",
          color: "#102342",
          backgroundColor: "#ffffff",
          padding: { x: 12, y: 7 }
        }
      ).setOrigin(0.5);
      objects.push(greeting);
    }

    const caption = this.scene.add.text(
      centerX - width * 0.39,
      centerY - height * 0.38,
      options.label || "Fritz Academy Story Scene",
      {
        fontSize: "15px",
        fontStyle: "bold",
        color: "#174ea6",
        backgroundColor: "#ffffff",
        padding: { x: 8, y: 4 }
      }
    ).setOrigin(0, 0.5);

    objects.push(caption);
  }
}

window.IllustrationEngine = IllustrationEngine;
