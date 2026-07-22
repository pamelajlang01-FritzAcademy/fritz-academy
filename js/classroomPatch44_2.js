/* Fritz Academy Version 44.2: real layered motion and avatar cleanup */
(function(){
  "use strict";

  const AVATAR_PATHS = {
    "girl-1": "assets/avatars/girl/ChatGPT Image Jul 13, 2026, 05_09_47 PM.png",
    "girl-2": "assets/avatars/girl/ChatGPT Image Jul 13, 2026, 05_38_28 PM.png",
    "girl-3": "assets/avatars/girl/ChatGPT Image Jul 13, 2026, 05_46_11 PM.png",
    "girl-4": "assets/avatars/girl/ChatGPT Image Jul 13, 2026, 06_04_48 PM.png",
    "girl-5": "assets/avatars/girl/ChatGPT Image Jul 13, 2026, 06_26_03 PM.png",
    "girl-6": "assets/avatars/girl/ChatGPT Image Jul 13, 2026, 06_53_21 PM.png",
    "boy-1": "assets/assets/avatars/boy/ChatGPT Image Jul 13, 2026, 04_52_40 PM.png",
    "boy-2": "assets/assets/avatars/boy/ChatGPT Image Jul 13, 2026, 05_30_53 PM.png",
    "boy-3": "assets/assets/avatars/boy/ChatGPT Image Jul 13, 2026, 05_43_25 PM.png",
    "boy-4": "assets/assets/avatars/boy/ChatGPT Image Jul 13, 2026, 05_52_10 PM.png",
    "boy-5": "assets/assets/avatars/boy/ChatGPT Image Jul 13, 2026, 06_18_19 PM.png",
    "boy-6": "assets/assets/avatars/boy/ChatGPT Image Jul 13, 2026, 06_47_19 PM.png"
  };

  function colorDistance(a, b){
    const dr = a[0] - b[0];
    const dg = a[1] - b[1];
    const db = a[2] - b[2];
    return Math.sqrt(dr * dr + dg * dg + db * db);
  }

  function makeTransparentAvatar(scene, sourceKey, outputKey){
    if(scene.textures.exists(outputKey)) return outputKey;
    const source = scene.textures.get(sourceKey).getSourceImage();
    if(!source || !source.width || !source.height) return sourceKey;

    const canvas = document.createElement("canvas");
    canvas.width = source.width;
    canvas.height = source.height;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(source, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const corners = [
      [data[0], data[1], data[2]],
      [data[(canvas.width - 1) * 4], data[(canvas.width - 1) * 4 + 1], data[(canvas.width - 1) * 4 + 2]],
      [data[(canvas.width * (canvas.height - 1)) * 4], data[(canvas.width * (canvas.height - 1)) * 4 + 1], data[(canvas.width * (canvas.height - 1)) * 4 + 2]],
      [data[(canvas.width * canvas.height - 1) * 4], data[(canvas.width * canvas.height - 1) * 4 + 1], data[(canvas.width * canvas.height - 1) * 4 + 2]]
    ];
    const background = corners.reduce((sum, c) => [sum[0]+c[0], sum[1]+c[1], sum[2]+c[2]], [0,0,0]).map(v => v / 4);

    for(let i = 0; i < data.length; i += 4){
      const pixel = [data[i], data[i+1], data[i+2]];
      const blueDominant = data[i+2] > data[i] * 1.12 && data[i+2] > data[i+1] * 1.05;
      if(colorDistance(pixel, background) < 72 || (blueDominant && colorDistance(pixel, background) < 115)){
        data[i+3] = 0;
      }
    }
    ctx.putImageData(imageData, 0, 0);

    const texture = scene.textures.createCanvas(outputKey, canvas.width, canvas.height);
    texture.getContext().drawImage(canvas, 0, 0);
    texture.refresh();
    return outputKey;
  }

  if(typeof World !== "undefined"){
    const oldPreload = World.prototype.preload;
    World.prototype.preload = function(){
      oldPreload.call(this);
      Object.entries(AVATAR_PATHS).forEach(([id, path]) => this.load.image(`student-avatar-raw-${id}`, path));
    };

    World.prototype.createPlayer = function(){
      const startX = 1080;
      const startY = 1810;
      const avatarId = this.save && this.save.avatar;
      let avatarKey = "fritz";
      if(avatarId && AVATAR_PATHS[avatarId]){
        avatarKey = makeTransparentAvatar(this, `student-avatar-raw-${avatarId}`, `student-avatar-clean-${avatarId}`);
      }
      this.playerShadow = this.add.ellipse(startX, startY + 34, 44, 15, 0x000000, 0.28).setDepth(startY - 1);
      this.player = this.physics.add.image(startX, startY, avatarKey).setDepth(startY);
      if(avatarKey === "fritz") this.player.setScale(0.036);
      else this.player.setDisplaySize(68, 92);
      this.player.body.setCollideWorldBounds(true);
      this.player.body.setSize(Math.max(30, this.player.displayWidth * 0.5), Math.max(42, this.player.displayHeight * 0.72));
      this.physics.add.collider(this.player, this.walls);
    };

    World.prototype.createGreenhouseMarker = function(){
      this.greenhouseMarker = this.add.text(930, 1650, "FOUNDATION GARDEN\nLESSONS 1-A AND BEYOND", {
        fontSize: "18px", fontStyle: "bold", color: "#102342",
        backgroundColor: "rgba(255,255,255,0.88)", padding: { x: 10, y: 7 }, align: "center"
      }).setOrigin(0.5).setDepth(1690);
    };
  }

  const SCENES_1B = {
    story: [
      { bg:"assets/academy.png", actors:[{src:"assets/bear.png",cls:"enter-left"}], prop:"🎒", propCls:"shake", caption:"Bear rushes into the courtyard." },
      { bg:"assets/academy.png", actors:[{src:"assets/bear.png",cls:"think"}], prop:"💭", propCls:"float", caption:"Bear remembers the morning." },
      { bg:"assets/fritz_academy_world_map.png", actors:[{src:"assets/bash.png",cls:"enter-right"},{src:"assets/bear.png",cls:"idle"}], prop:"❓", propCls:"pulse", caption:"Bash asks an important question." },
      { bg:"assets/academy.png", actors:[{src:"assets/bear.png",cls:"nod"}], prop:"📘", propCls:"float", caption:"Bear remembers reading near the garden." },
      { bg:"assets/fritz_academy_world_map.png", actors:[{src:"assets/bash.png",cls:"walk"},{src:"assets/bear.png",cls:"walk-delay"}], prop:"🔍", propCls:"sweep", caption:"The friends search beside the bench." },
      { bg:"assets/academy.png", actors:[{src:"assets/bear.png",cls:"celebrate"},{src:"assets/bash.png",cls:"bounce"}], prop:"🎒", propCls:"pop", caption:"They find the backpack under the bench!" }
    ],
    reader1: [
      { bg:"assets/fritz_academy_world_map.png", actors:[{src:"assets/tony.png",cls:"walk"}], prop:"🌿", propCls:"sway", caption:"Tony walks beside the garden." },
      { bg:"assets/academy.png", actors:[{src:"assets/tony.png",cls:"look-down"}], prop:"📘", propCls:"glow", caption:"Tony sees a blue book." },
      { bg:"assets/academy.png", actors:[{src:"assets/tony.png",cls:"point"}], prop:"🌳", propCls:"sway", caption:"The book is near a bush." },
      { bg:"assets/academy.png", actors:[{src:"assets/tony.png",cls:"lift"}], prop:"📘", propCls:"lift-prop", caption:"Tony picks up the book." },
      { bg:"assets/academy.png", actors:[{src:"assets/tony.png",cls:"nod"},{src:"assets/bear.png",cls:"enter-right"}], prop:"💬", propCls:"pulse", caption:"Tony knows the book belongs to Bear." }
    ],
    reader2: [
      { bg:"assets/academy.png", actors:[{src:"assets/tony.png",cls:"walk"},{src:"assets/bear.png",cls:"idle"}], prop:"📘", propCls:"float", caption:"Tony carries the book to Bear." },
      { bg:"assets/academy.png", actors:[{src:"assets/tony.png",cls:"surprise"},{src:"assets/bear.png",cls:"surprise-delay"}], prop:"🗺️", propCls:"fall", caption:"A garden map falls from the pages." },
      { bg:"assets/fritz_academy_world_map.png", actors:[{src:"assets/bear.png",cls:"point"}], prop:"🪑🌳", propCls:"pulse", caption:"The map shows a path, bench, and tree." },
      { bg:"assets/fritz_academy_world_map.png", actors:[{src:"assets/rascal.png",cls:"bounce"}], prop:"❌", propCls:"pop", caption:"Rascal points to a mark beside the tree." },
      { bg:"assets/academy.png", actors:[{src:"assets/nola.png",cls:"nod"},{src:"assets/tony.png",cls:"idle"}], prop:"💡", propCls:"glow", caption:"Nola thinks it may be a garden clue." },
      { bg:"assets/fritz_academy_world_map.png", actors:[{src:"assets/nola.png",cls:"walk"},{src:"assets/tony.png",cls:"walk-delay"},{src:"assets/rascal.png",cls:"bounce"}], prop:"➡️", propCls:"sweep", caption:"The friends will follow the map next time." }
    ]
  };

  function ensureDynamicStyles(){
    if(document.getElementById("fritz-dynamic-scene-styles")) return;
    const style = document.createElement("style");
    style.id = "fritz-dynamic-scene-styles";
    style.textContent = `
      .fritz-story-overlay{position:fixed;inset:0;z-index:95000;background:rgba(7,20,38,.94);display:grid;place-items:center;padding:14px;box-sizing:border-box;font-family:Arial,sans-serif}
      .fritz-story-card{width:min(930px,96vw);max-height:94vh;overflow:auto;background:#fffdf5;border:6px solid #f6c744;border-radius:24px;padding:18px;box-shadow:0 22px 70px rgba(0,0,0,.45);color:#102342}
      .fritz-story-title{text-align:center;font-weight:900;font-size:clamp(20px,3.2vw,30px);margin-bottom:10px}
      .fritz-stage{position:relative;height:min(46vh,360px);min-height:260px;overflow:hidden;border:4px solid #174ea6;border-radius:18px;background:#dff2ff}
      .fritz-stage-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:saturate(.95) brightness(1.03)}
      .fritz-stage::after{content:"";position:absolute;left:0;right:0;bottom:0;height:28%;background:linear-gradient(transparent,rgba(191,227,161,.8));pointer-events:none}
      .fritz-actor{position:absolute;bottom:5%;height:68%;max-width:38%;object-fit:contain;z-index:3;filter:drop-shadow(0 10px 8px rgba(0,0,0,.28));transform-origin:50% 100%}
      .fritz-actor:nth-of-type(2){left:14%}.fritz-actor:nth-of-type(3){right:14%}.fritz-actor:nth-of-type(4){left:42%;height:55%}
      .fritz-prop{position:absolute;left:50%;top:18%;transform:translateX(-50%);z-index:5;font-size:clamp(48px,8vw,86px);filter:drop-shadow(0 7px 5px rgba(0,0,0,.25))}
      .fritz-caption{position:absolute;left:50%;bottom:8px;transform:translateX(-50%);z-index:8;width:min(82%,680px);background:rgba(255,255,255,.92);border:3px solid #f6c744;border-radius:14px;padding:8px 14px;text-align:center;font-weight:800;font-size:18px}
      .fritz-story-text{text-align:center;font-size:clamp(21px,3vw,29px);font-weight:800;line-height:1.35;margin:16px auto;max-width:780px}
      .fritz-story-actions{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}.fritz-story-actions button{border:3px solid #102342;border-radius:13px;padding:12px 20px;font-size:18px;font-weight:900;cursor:pointer;background:#f6c744;color:#102342}.fritz-story-actions button:first-child{background:white}
      .enter-left{animation:enterLeft .9s ease-out both,idle 2.2s 1s ease-in-out infinite}.enter-right{animation:enterRight .9s ease-out both,idle 2.2s 1.1s ease-in-out infinite}.walk{animation:walkAcross 3.4s ease-in-out infinite}.walk-delay{animation:walkAcross 3.4s .45s ease-in-out infinite}.idle{animation:idle 2.2s ease-in-out infinite}.think{animation:think 2.8s ease-in-out infinite}.nod{animation:nod 1.7s ease-in-out infinite}.bounce{animation:bounce 1.2s ease-in-out infinite}.celebrate{animation:celebrate 1.1s ease-in-out infinite}.point{animation:point 1.7s ease-in-out infinite}.lift{animation:lift 2s ease-in-out infinite}.look-down{animation:lookDown 2s ease-in-out infinite}.surprise{animation:surprise .9s ease-in-out infinite}.surprise-delay{animation:surprise .9s .25s ease-in-out infinite}
      .shake{animation:shake .7s ease-in-out infinite}.float{animation:float 2s ease-in-out infinite}.pulse{animation:pulse 1.3s ease-in-out infinite}.sweep{animation:sweep 2.2s ease-in-out infinite}.pop{animation:pop 1.4s ease-in-out infinite}.sway{animation:sway 2.2s ease-in-out infinite}.glow{animation:glow 1.8s ease-in-out infinite}.lift-prop{animation:liftProp 2s ease-in-out infinite}.fall{animation:fall 2s ease-in-out infinite}
      @keyframes enterLeft{from{left:-35%;transform:rotate(-8deg)}to{left:14%;transform:none}}@keyframes enterRight{from{right:-35%;transform:rotate(8deg)}to{right:14%;transform:none}}@keyframes idle{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}@keyframes walkAcross{0%,100%{transform:translateX(-25px) rotate(-2deg)}50%{transform:translateX(25px) rotate(2deg)}}@keyframes think{0%,100%{transform:rotate(0)}50%{transform:rotate(-6deg) translateY(-5px)}}@keyframes nod{0%,100%{transform:rotate(0)}50%{transform:rotate(5deg) translateY(4px)}}@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-22px)}}@keyframes celebrate{0%,100%{transform:rotate(-3deg)}50%{transform:translateY(-18px) rotate(4deg)}}@keyframes point{0%,100%{transform:translateX(0)}50%{transform:translateX(16px) rotate(3deg)}}@keyframes lift{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px) rotate(-3deg)}}@keyframes lookDown{0%,100%{transform:rotate(0)}50%{transform:rotate(7deg)}}@keyframes surprise{0%,100%{transform:scale(1)}50%{transform:scale(1.08) translateY(-8px)}}
      @keyframes shake{0%,100%{transform:translateX(-50%) rotate(-5deg)}50%{transform:translateX(-50%) rotate(5deg)}}@keyframes float{0%,100%{transform:translate(-50%,0)}50%{transform:translate(-50%,-16px)}}@keyframes pulse{0%,100%{transform:translateX(-50%) scale(1)}50%{transform:translateX(-50%) scale(1.18)}}@keyframes sweep{0%,100%{transform:translateX(-80px)}50%{transform:translateX(30px)}}@keyframes pop{0%,100%{transform:translateX(-50%) scale(.9)}50%{transform:translateX(-50%) scale(1.2)}}@keyframes sway{0%,100%{transform:translateX(-50%) rotate(-5deg)}50%{transform:translateX(-50%) rotate(5deg)}}@keyframes glow{0%,100%{filter:drop-shadow(0 0 2px #fff)}50%{filter:drop-shadow(0 0 18px #f6c744)}}@keyframes liftProp{0%,100%{transform:translate(-50%,22px)}50%{transform:translate(-50%,-16px)}}@keyframes fall{0%{transform:translate(-50%,-80px) rotate(-20deg)}55%,100%{transform:translate(-50%,25px) rotate(5deg)}}
    `;
    document.head.appendChild(style);
  }

  function closeDynamicScene(){
    const existing = document.querySelector(".fritz-story-overlay");
    if(existing) existing.remove();
  }

  function renderDynamicPage(engine, reading, sceneKey, finishLabel){
    const pageIndex = engine.pageIndex;
    if(pageIndex >= reading.pages.length){
      closeDynamicScene();
      if(sceneKey === "story") engine.startQuestions(); else engine.startCheck();
      return;
    }
    ensureDynamicStyles();
    closeDynamicScene();
    if(engine.scene && engine.scene.panels) engine.scene.panels.close();

    const page = engine.normalizePage(reading.pages[pageIndex]);
    const sceneDef = (SCENES_1B[sceneKey] || [])[pageIndex] || {};
    const overlay = document.createElement("div");
    overlay.className = "fritz-story-overlay";
    const card = document.createElement("section");
    card.className = "fritz-story-card";
    const title = document.createElement("div");
    title.className = "fritz-story-title";
    title.textContent = `${reading.title} — Page ${pageIndex + 1} of ${reading.pages.length}`;
    const stage = document.createElement("div");
    stage.className = "fritz-stage";
    const bg = document.createElement("img");
    bg.className = "fritz-stage-bg";
    bg.src = sceneDef.bg || "assets/academy.png";
    stage.appendChild(bg);
    (sceneDef.actors || []).forEach(actor => {
      const img = document.createElement("img");
      img.className = `fritz-actor ${actor.cls || "idle"}`;
      img.src = actor.src;
      img.alt = "Fritz Academy character";
      stage.appendChild(img);
    });
    if(sceneDef.prop){
      const prop = document.createElement("div");
      prop.className = `fritz-prop ${sceneDef.propCls || "float"}`;
      prop.textContent = sceneDef.prop;
      stage.appendChild(prop);
    }
    const caption = document.createElement("div");
    caption.className = "fritz-caption";
    caption.textContent = sceneDef.caption || "Watch the story scene.";
    stage.appendChild(caption);

    const text = document.createElement("div");
    text.className = "fritz-story-text";
    text.textContent = engine.lessonEngine.replaceName(page.text);
    const actions = document.createElement("div");
    actions.className = "fritz-story-actions";
    const read = document.createElement("button");
    read.type = "button";
    read.textContent = "Read Aloud";
    read.addEventListener("click", () => engine.lessonEngine.speakText(engine.lessonEngine.replaceName(page.text)));
    const next = document.createElement("button");
    next.type = "button";
    next.textContent = pageIndex === reading.pages.length - 1 ? finishLabel : "Next Page";
    next.addEventListener("click", () => {
      engine.lessonEngine.stopMedia();
      engine.pageIndex++;
      renderDynamicPage(engine, reading, sceneKey, finishLabel);
    });
    actions.append(read, next);
    card.append(title, stage, text, actions);
    overlay.appendChild(card);
    document.body.appendChild(overlay);
  }

  if(typeof StoryEngine !== "undefined"){
    const oldShowStory = StoryEngine.prototype.showPage;
    StoryEngine.prototype.showPage = function(){
      if(this.lesson && this.lesson.id === "1-B"){
        renderDynamicPage(this, this.story, "story", "Story Check");
        return;
      }
      oldShowStory.call(this);
    };
  }

  if(typeof ReaderEngine !== "undefined"){
    const oldShowReader = ReaderEngine.prototype.showPage;
    ReaderEngine.prototype.showPage = function(){
      if(this.lesson && this.lesson.id === "1-B"){
        const key = this.readerKey === "reader1" ? "reader1" : "reader2";
        renderDynamicPage(this, this.reader, key, "Reader Check");
        return;
      }
      oldShowReader.call(this);
    };
  }
})();