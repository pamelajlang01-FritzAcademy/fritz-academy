/* Fritz Academy song playback repair 50.7 */
(function(){
  "use strict";

  function normalizeSongPaths(){
    if(typeof LEVELS === "undefined") return;
    LEVELS.forEach((lesson) => {
      if(lesson.alphabetSong){
        lesson.alphabetSong.videoPath = "assets/alphabet-song-small.mp4";
        lesson.alphabetSong.assetPath = "assets/alphabet-song-small.mp4";
      }
      if(lesson.closingSong){
        lesson.closingSong.videoPath = "assets/welcome-song-small.mp4";
        lesson.closingSong.assetPath = "assets/welcome-song-small.mp4";
      }
    });
  }

  normalizeSongPaths();

  if(typeof MediaEngine === "undefined") return;

  MediaEngine.prototype.play = function(videoPath, audioPath, options = {}){
    this.stop();

    const source = videoPath || audioPath;
    if(!source){
      if(typeof options.onMissing === "function") options.onMissing();
      return;
    }

    const isVideo = /\.mp4(?:$|\?)/i.test(source) || Boolean(videoPath);
    const media = document.createElement(isVideo ? "video" : "audio");
    const sourceWithCacheBust = source + (source.includes("?") ? "&" : "?") + "v=50.7";

    media.src = sourceWithCacheBust;
    media.controls = true;
    media.preload = "auto";
    media.playsInline = true;
    media.autoplay = false;
    media.volume = 1;

    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.inset = "0";
    overlay.style.zIndex = "100000";
    overlay.style.background = "rgba(7,20,38,0.96)";
    overlay.style.display = "flex";
    overlay.style.flexDirection = "column";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.gap = "18px";
    overlay.style.padding = "24px";

    media.style.maxWidth = "92vw";
    media.style.maxHeight = "76vh";
    media.style.width = isVideo ? "min(960px, 92vw)" : "min(560px, 88vw)";
    media.style.border = "6px solid #f6c744";
    media.style.borderRadius = "18px";
    media.style.background = "#000";

    const status = document.createElement("div");
    status.textContent = "Loading song…";
    status.style.color = "white";
    status.style.fontSize = "22px";
    status.style.fontWeight = "bold";

    const start = document.createElement("button");
    start.textContent = "Start Song";
    start.style.fontSize = "24px";
    start.style.fontWeight = "bold";
    start.style.padding = "14px 28px";
    start.style.border = "4px solid #111";
    start.style.borderRadius = "14px";
    start.style.background = "#f6c744";
    start.style.cursor = "pointer";

    const close = document.createElement("button");
    close.textContent = "Close";
    close.style.position = "fixed";
    close.style.top = "18px";
    close.style.right = "18px";
    close.style.fontSize = "20px";
    close.style.fontWeight = "bold";
    close.style.padding = "10px 18px";
    close.style.border = "4px solid #111";
    close.style.borderRadius = "14px";
    close.style.background = "#f6c744";
    close.style.cursor = "pointer";

    const beginPlayback = () => {
      status.textContent = "Starting song…";
      const promise = media.play();
      if(promise && typeof promise.then === "function"){
        promise.then(() => {
          status.textContent = "Song playing";
          start.style.display = "none";
        }).catch((error) => {
          console.error("Fritz Academy song playback blocked:", error);
          status.textContent = "Tap Start Song again to play.";
          start.style.display = "block";
        });
      }
    };

    start.addEventListener("click", beginPlayback);
    close.addEventListener("click", () => this.stop());
    media.addEventListener("canplay", () => {
      status.textContent = "Ready";
      beginPlayback();
    }, { once: true });
    media.addEventListener("playing", () => {
      status.textContent = "Song playing";
      start.style.display = "none";
    });
    media.addEventListener("ended", () => {
      this.stop();
      if(typeof options.onEnded === "function") options.onEnded();
    });
    media.addEventListener("error", () => {
      console.error("Fritz Academy song file failed:", sourceWithCacheBust, media.error);
      status.textContent = "The song file could not load.";
      start.style.display = "none";
      if(typeof options.onMissing === "function") options.onMissing();
    });

    overlay.appendChild(media);
    overlay.appendChild(status);
    overlay.appendChild(start);
    overlay.appendChild(close);
    document.body.appendChild(overlay);

    this.mediaElement = media;
    this.overlay = overlay;
    media.load();
  };
})();
