/* Fritz Academy Version 43.2 classroom fixes */
(function(){
  "use strict";

  function chooseNarrator(){
    if(!("speechSynthesis" in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    const preferred = [
      "Microsoft Aria Online (Natural)",
      "Microsoft Jenny Online (Natural)",
      "Google US English",
      "Ava",
      "Nicky",
      "Alex",
      "Samantha"
    ];
    for(const wanted of preferred){
      const voice = voices.find(item => item.lang && item.lang.toLowerCase().startsWith("en") && item.name.toLowerCase().includes(wanted.toLowerCase()));
      if(voice) return voice;
    }
    return voices.find(item => item.lang && item.lang.toLowerCase().startsWith("en-us")) ||
      voices.find(item => item.lang && item.lang.toLowerCase().startsWith("en")) || null;
  }

  if(typeof MediaEngine !== "undefined"){
    MediaEngine.prototype.speak = function(text){
      this.stop();
      if(!text || !("speechSynthesis" in window)) return;
      const speech = new SpeechSynthesisUtterance(String(text));
      const voice = chooseNarrator();
      if(voice){
        speech.voice = voice;
        speech.lang = voice.lang || "en-US";
      }else{
        speech.lang = "en-US";
      }
      speech.rate = 0.78;
      speech.pitch = 1.08;
      speech.volume = 1;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(speech);
    };

    MediaEngine.prototype.play = function(videoPath, audioPath, options = {}){
      this.stop();
      const source = videoPath || audioPath;
      if(!source){
        if(typeof options.onMissing === "function") options.onMissing();
        return;
      }

      const isVideo = Boolean(videoPath);
      const media = document.createElement(isVideo ? "video" : "audio");
      media.src = source;
      media.controls = true;
      media.preload = "auto";
      media.autoplay = true;
      media.playsInline = true;

      const finish = callback => {
        this.stop();
        if(typeof callback === "function") window.setTimeout(callback, 30);
      };

      if(isVideo){
        const overlay = document.createElement("div");
        Object.assign(overlay.style, {
          position: "fixed", inset: "0", zIndex: "100000",
          background: "rgba(7,20,38,0.96)", display: "grid",
          gridTemplateRows: "1fr auto", alignItems: "center",
          justifyItems: "center", gap: "14px", padding: "22px",
          boxSizing: "border-box"
        });
        Object.assign(media.style, {
          maxWidth: "92vw", maxHeight: "76vh",
          border: "6px solid #f6c744", borderRadius: "18px",
          background: "#000"
        });

        const actions = document.createElement("div");
        Object.assign(actions.style, {
          display: "flex", flexWrap: "wrap",
          justifyContent: "center", gap: "12px"
        });

        const returnButton = document.createElement("button");
        returnButton.type = "button";
        returnButton.textContent = "Return to Lesson";
        const continueButton = document.createElement("button");
        continueButton.type = "button";
        continueButton.textContent = options.continueLabel || "Continue Lesson";

        [returnButton, continueButton].forEach(button => {
          Object.assign(button.style, {
            border: "3px solid #102342", borderRadius: "13px",
            padding: "12px 20px", fontSize: "18px",
            fontWeight: "bold", background: "#f6c744",
            color: "#102342", cursor: "pointer"
          });
        });

        returnButton.addEventListener("click", () => finish(options.onClose));
        continueButton.addEventListener("click", () => finish(options.onContinue || options.onEnded));
        actions.append(returnButton, continueButton);
        overlay.append(media, actions);
        document.body.appendChild(overlay);
        this.overlay = overlay;
      }else{
        Object.assign(media.style, {
          position: "fixed", left: "50%", bottom: "24px",
          transform: "translateX(-50%)", zIndex: "100000",
          width: "min(560px, 88vw)"
        });
        document.body.appendChild(media);
      }

      media.addEventListener("ended", () => finish(options.onEnded));
      media.addEventListener("error", () => {
        if(isVideo && audioPath){
          finish(() => this.play("", audioPath, options));
          return;
        }
        finish(options.onMissing);
      });

      const promise = media.play();
      if(promise && typeof promise.catch === "function"){
        promise.catch(() => { media.autoplay = false; });
      }
      this.mediaElement = media;
    };

    MediaEngine.prototype.showLessonMedia = function(config = {}){
      const media = config.media || {};
      const title = this.scene.add.text(0, -185, config.heading || media.title || "Academy Media", {
        fontSize: "35px", fontStyle: "bold", color: "#102342",
        align: "center", wordWrap: { width: 680 }
      }).setOrigin(0.5);
      const icon = this.scene.add.text(0, -85, config.icon || "🎵", { fontSize: "68px" }).setOrigin(0.5);
      const body = this.scene.add.text(0, 20, media.rewardMessage || config.message || "Listen, watch, and join in.", {
        fontSize: "25px", fontStyle: "bold", color: "#102342",
        align: "center", wordWrap: { width: 650 }
      }).setOrigin(0.5);

      const restore = () => this.showLessonMedia(config);
      const complete = () => {
        this.stop();
        if(typeof config.onComplete === "function") config.onComplete();
      };

      const play = this.scene.panels.makeButton(-155, 175, config.playLabel || "Play Song", () => {
        this.play(media.videoPath, media.assetPath, {
          continueLabel: config.continueLabel || "Continue Lesson",
          onEnded: restore,
          onClose: restore,
          onContinue: complete,
          onMissing: () => this.scene.panels.message(
            "Media Unavailable",
            "The song could not be loaded, but the lesson can continue."
          )
        });
      });
      const next = this.scene.panels.makeButton(155, 175, config.continueLabel || "Continue", complete);
      this.scene.panels.open([title, icon, body, play, next], { width: 780, height: 520 });
    };
  }

  function renderReliablePage(engine, reading, readingKey, finishLabel){
    const pageIndex = engine.pageIndex;
    const page = engine.normalizePage(reading.pages[pageIndex]);
    const objects = [];
    const title = engine.scene.add.text(0, -220, `${reading.title} — Page ${pageIndex + 1} of ${reading.pages.length}`, {
      fontSize: "20px", fontStyle: "bold", color: "#46566f",
      align: "center", wordWrap: { width: 700 }
    }).setOrigin(0.5);
    objects.push(title);

    if(reading.level){
      const level = engine.scene.add.text(0, -184, reading.level, {
        fontSize: "18px", fontStyle: "bold", color: "#174ea6"
      }).setOrigin(0.5);
      objects.push(level);
    }

    const render = imageKey => {
      if(imageKey){
        const image = engine.scene.add.image(0, -82, imageKey).setOrigin(0.5);
        image.setScale(Math.min(560 / image.width, 220 / image.height, 1));
        objects.push(image);
      }else{
        new IllustrationEngine(engine.scene).addScene(objects, page.text, {
          y: -82, width: 560, height: 220,
          label: readingKey === "story" ? "Story Illustration" : "Reader Illustration"
        });
      }

      const text = engine.scene.add.text(0, 92, engine.lessonEngine.replaceName(page.text), {
        fontSize: "25px", fontStyle: "bold", color: "#102342",
        align: "center", lineSpacing: 7, wordWrap: { width: 700 }
      }).setOrigin(0.5);
      const readButton = engine.scene.panels.makeButton(-150, 215, "Read Aloud", () => {
        engine.lessonEngine.speakText(engine.lessonEngine.replaceName(page.text));
      }, { backgroundColor: "#ffffff" });
      const nextButton = engine.scene.panels.makeButton(150, 215,
        pageIndex === reading.pages.length - 1 ? finishLabel : "Next Page",
        () => {
          engine.lessonEngine.stopMedia();
          engine.pageIndex++;
          engine.showPage();
        }
      );
      objects.push(text, readButton, nextButton);
      engine.scene.panels.open(objects, { width: 820, height: 590 });
    };

    if(!page.image){
      render(null);
      return;
    }

    const imageKey = `${readingKey}-${engine.lesson.id}-${pageIndex}`;
    if(engine.scene.textures.exists(imageKey)){
      const source = engine.scene.textures.get(imageKey).getSourceImage();
      if(source && source.width > 16 && source.height > 16){
        render(imageKey);
      }else{
        render(null);
      }
      return;
    }

    const probe = new Image();
    probe.onload = () => {
      try{
        engine.scene.textures.addImage(imageKey, probe);
        render(imageKey);
      }catch(error){
        render(null);
      }
    };
    probe.onerror = () => render(null);
    probe.src = page.image;
  }

  if(typeof StoryEngine !== "undefined"){
    StoryEngine.prototype.showPage = function(){
      if(this.pageIndex >= this.story.pages.length){
        this.startQuestions();
        return;
      }
      renderReliablePage(this, this.story, "story", "Story Check");
    };
  }

  if(typeof ReaderEngine !== "undefined"){
    ReaderEngine.prototype.showPage = function(){
      if(this.pageIndex >= this.reader.pages.length){
        this.startCheck();
        return;
      }
      renderReliablePage(this, this.reader, this.readerKey, "Reader Check");
    };
  }
})();
