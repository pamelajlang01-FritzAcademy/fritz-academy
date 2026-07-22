/*
====================================================
FRITZ ACADEMY
Media Engine
Version 42.0.0
====================================================
*/

class MediaEngine {
  constructor(scene, lessonEngine){
    this.scene = scene;
    this.lessonEngine = lessonEngine;
    this.mediaElement = null;
    this.overlay = null;
  }

  stop(){
    if(this.mediaElement){
      try{
        this.mediaElement.pause();
        this.mediaElement.currentTime = 0;
      }catch(error){
        console.warn("Fritz Academy could not stop media:", error);
      }

      this.mediaElement.remove();
      this.mediaElement = null;
    }

    if(this.overlay){
      this.overlay.remove();
      this.overlay = null;
    }

    if("speechSynthesis" in window){
      window.speechSynthesis.cancel();
    }
  }

  speak(text){
    this.stop();

    if(!text || !("speechSynthesis" in window)){
      return;
    }

    const speech = new SpeechSynthesisUtterance(String(text));
    speech.lang = "en-US";
    speech.rate = 0.86;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
  }

  play(videoPath, audioPath, options = {}){
    this.stop();

    const source = videoPath || audioPath;

    if(!source){
      if(typeof options.onMissing === "function"){
        options.onMissing();
      }
      return;
    }

    const isVideo = Boolean(videoPath);
    const media = document.createElement(isVideo ? "video" : "audio");

    media.src = source;
    media.controls = true;
    media.preload = "auto";
    media.autoplay = true;
    media.playsInline = true;

    if(isVideo){
      const overlay = document.createElement("div");
      overlay.style.position = "fixed";
      overlay.style.inset = "0";
      overlay.style.zIndex = "100000";
      overlay.style.background = "rgba(7,20,38,0.94)";
      overlay.style.display = "flex";
      overlay.style.alignItems = "center";
      overlay.style.justifyContent = "center";
      overlay.style.padding = "24px";

      media.style.maxWidth = "92vw";
      media.style.maxHeight = "82vh";
      media.style.border = "6px solid #f6c744";
      media.style.borderRadius = "18px";
      media.style.background = "#000";

      const close = document.createElement("button");
      close.textContent = "Close";
      close.style.position = "fixed";
      close.style.top = "18px";
      close.style.right = "18px";
      close.style.zIndex = "100001";
      close.style.fontSize = "20px";
      close.style.fontWeight = "bold";
      close.style.padding = "10px 18px";
      close.style.border = "4px solid #111";
      close.style.borderRadius = "14px";
      close.style.background = "#f6c744";
      close.style.cursor = "pointer";

      close.addEventListener("click", () => this.stop());
      overlay.appendChild(media);
      overlay.appendChild(close);
      document.body.appendChild(overlay);
      this.overlay = overlay;
    }else{
      media.style.position = "fixed";
      media.style.left = "50%";
      media.style.bottom = "24px";
      media.style.transform = "translateX(-50%)";
      media.style.zIndex = "100000";
      media.style.width = "min(560px, 88vw)";
      document.body.appendChild(media);
    }

    media.addEventListener("ended", () => {
      this.stop();
      if(typeof options.onEnded === "function"){
        options.onEnded();
      }
    });

    media.addEventListener("error", () => {
      if(isVideo && audioPath && media.src.indexOf(audioPath) === -1){
        this.stop();
        this.play("", audioPath, options);
        return;
      }

      this.stop();

      if(typeof options.onMissing === "function"){
        options.onMissing();
      }
    });

    const playPromise = media.play();

    if(playPromise && typeof playPromise.catch === "function"){
      playPromise.catch(() => {
        media.autoplay = false;
      });
    }

    this.mediaElement = media;
  }

  showLessonMedia(config = {}){
    const media = config.media || {};

    const title = this.scene.add.text(
      0,
      -185,
      config.heading || media.title || "Academy Media",
      {
        fontSize: "35px",
        fontStyle: "bold",
        color: "#102342",
        align: "center",
        wordWrap: { width: 680 }
      }
    ).setOrigin(0.5);

    const icon = this.scene.add.text(
      0,
      -85,
      config.icon || "🎵",
      { fontSize: "68px" }
    ).setOrigin(0.5);

    const body = this.scene.add.text(
      0,
      20,
      media.rewardMessage ||
      config.message ||
      "Listen, watch, and join in.",
      {
        fontSize: "25px",
        fontStyle: "bold",
        color: "#102342",
        align: "center",
        wordWrap: { width: 650 }
      }
    ).setOrigin(0.5);

    const play = this.scene.panels.makeButton(
      -155,
      175,
      config.playLabel || "Play",
      () => this.play(
        media.videoPath,
        media.assetPath,
        {
          onMissing: () => {
            this.scene.panels.message(
              "Media Unavailable",
              "The lesson can continue. This media file was not found."
            );
          }
        }
      )
    );

    const next = this.scene.panels.makeButton(
      155,
      175,
      config.continueLabel || "Continue",
      () => {
        this.stop();
        if(typeof config.onComplete === "function"){
          config.onComplete();
        }
      }
    );

    this.scene.panels.open(
      [title, icon, body, play, next],
      { width: 780, height: 520 }
    );
  }
}

window.MediaEngine = MediaEngine;
