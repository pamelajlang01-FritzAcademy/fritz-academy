/* Fritz Academy Presentation Controls v50.14 */
(function(){
  "use strict";

  const STYLE_ID="fa-presentation-controls-style";
  const FULLSCREEN_ID="fa-fullscreen-button";
  const STORY_BAR_ID="fa-story-playback-bar";

  function addStyles(){
    if(document.getElementById(STYLE_ID)) return;
    const style=document.createElement("style");
    style.id=STYLE_ID;
    style.textContent=`
      #${FULLSCREEN_ID}{position:fixed;right:18px;bottom:18px;z-index:100000;border:3px solid #f9c642;border-radius:14px;background:#102342;color:#fff;padding:12px 18px;font:700 17px Arial,sans-serif;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,.28)}
      #${FULLSCREEN_ID}:hover,#${FULLSCREEN_ID}:focus{background:#174ea6;outline:3px solid rgba(249,198,66,.45)}
      #${STORY_BAR_ID}{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:99999;display:none;align-items:center;gap:8px;flex-wrap:wrap;justify-content:center;max-width:min(940px,94vw);padding:10px 12px;border:3px solid #f9c642;border-radius:16px;background:rgba(16,35,66,.96);box-shadow:0 5px 22px rgba(0,0,0,.35)}
      #${STORY_BAR_ID} button{border:0;border-radius:10px;background:#fff;color:#102342;padding:9px 13px;font:700 15px Arial,sans-serif;cursor:pointer;min-width:92px}
      #${STORY_BAR_ID} button[data-primary="true"]{background:#f9c642;color:#102342}
      #${STORY_BAR_ID} button:disabled{opacity:.45;cursor:not-allowed}
      #${STORY_BAR_ID} .fa-story-status{color:#fff;font:700 14px Arial,sans-serif;min-width:92px;text-align:center}
      @media(max-width:760px){#${FULLSCREEN_ID}{right:10px;bottom:10px;padding:10px 13px;font-size:14px}#${STORY_BAR_ID}{bottom:8px;gap:5px;padding:8px}#${STORY_BAR_ID} button{font-size:13px;padding:8px 9px;min-width:74px}}
    `;
    document.head.appendChild(style);
  }

  function world(){
    try{
      const game=window.Phaser&&Array.isArray(Phaser.GAMES)?Phaser.GAMES[0]:null;
      return game&&game.scene?game.scene.getScene("World"):null;
    }catch(error){ return null; }
  }

  function storyEngine(){
    const scene=world();
    return scene&&scene.lessonEngine&&scene.lessonEngine.storyEngine||null;
  }

  function isStoryActive(){
    const scene=world();
    const engine=storyEngine();
    if(!scene||!engine||!engine.story||!Array.isArray(engine.story.pages)) return false;
    try{
      const progress=scene.lessonEngine.progress&&scene.lessonEngine.progress();
      return Boolean(progress&&progress.currentSection==="story");
    }catch(error){ return false; }
  }

  function stopSpeech(){
    const scene=world();
    if(scene&&scene.lessonEngine&&typeof scene.lessonEngine.stopMedia==="function") scene.lessonEngine.stopMedia();
    if(window.speechSynthesis) window.speechSynthesis.cancel();
  }

  const playback={
    playing:false,
    paused:false,
    timer:null,
    clear(){ if(this.timer){ clearTimeout(this.timer); this.timer=null; } },
    currentText(){
      const engine=storyEngine();
      if(!engine||!engine.story||!engine.story.pages) return "";
      const page=engine.story.pages[engine.pageIndex];
      const normalized=engine.normalizePage?engine.normalizePage(page):page;
      const raw=typeof normalized==="string"?normalized:(normalized&&normalized.text)||"";
      return engine.lessonEngine&&engine.lessonEngine.replaceName?engine.lessonEngine.replaceName(raw):raw;
    },
    duration(text){ return Math.max(3200,Math.min(14000,1300+String(text||"").split(/\s+/).filter(Boolean).length*390)); },
    narrateAndAdvance(){
      const engine=storyEngine();
      if(!this.playing||this.paused||!engine||!engine.story) return;
      const text=this.currentText();
      stopSpeech();
      if(engine.lessonEngine&&typeof engine.lessonEngine.speakText==="function") engine.lessonEngine.speakText(text);
      this.clear();
      this.timer=setTimeout(()=>{
        if(!this.playing||this.paused) return;
        const last=engine.pageIndex>=engine.story.pages.length-1;
        if(last){
          this.playing=false;
          this.paused=false;
          stopSpeech();
          updateControls();
          return;
        }
        engine.pageIndex++;
        engine.showPage();
        updateControls();
        setTimeout(()=>this.narrateAndAdvance(),350);
      },this.duration(text));
      updateControls();
    },
    play(){
      if(!isStoryActive()) return;
      this.playing=true;
      this.paused=false;
      this.narrateAndAdvance();
    },
    pause(){
      if(!this.playing) return;
      this.paused=true;
      this.clear();
      stopSpeech();
      updateControls();
    },
    resume(){
      if(!this.playing){ this.play(); return; }
      this.paused=false;
      this.narrateAndAdvance();
    },
    stop(){
      this.playing=false;
      this.paused=false;
      this.clear();
      stopSpeech();
      updateControls();
    }
  };

  function movePage(delta){
    const engine=storyEngine();
    if(!engine||!engine.story) return;
    playback.stop();
    engine.pageIndex=Math.max(0,Math.min(engine.story.pages.length-1,engine.pageIndex+delta));
    engine.showPage();
    updateControls();
  }

  function restartStory(){
    const engine=storyEngine();
    if(!engine||!engine.story) return;
    playback.stop();
    engine.pageIndex=0;
    engine.showPage();
    updateControls();
  }

  function makeButton(label,action,primary=false){
    const button=document.createElement("button");
    button.type="button";
    button.textContent=label;
    button.dataset.action=action;
    if(primary) button.dataset.primary="true";
    return button;
  }

  function addFullscreenButton(){
    if(document.getElementById(FULLSCREEN_ID)) return;
    const button=document.createElement("button");
    button.id=FULLSCREEN_ID;
    button.type="button";
    button.textContent="⛶ Full Screen";
    button.setAttribute("aria-label","Enter full screen");
    button.addEventListener("click",async()=>{
      try{
        if(!document.fullscreenElement){ await document.documentElement.requestFullscreen(); }
        else{ await document.exitFullscreen(); }
      }catch(error){ console.warn("[Fritz Academy] Full screen request was blocked.",error); }
    });
    document.addEventListener("fullscreenchange",()=>{
      const active=Boolean(document.fullscreenElement);
      button.textContent=active?"✕ Exit Full Screen":"⛶ Full Screen";
      button.setAttribute("aria-label",active?"Exit full screen":"Enter full screen");
      setTimeout(()=>window.dispatchEvent(new Event("resize")),100);
    });
    document.body.appendChild(button);
  }

  function addStoryBar(){
    if(document.getElementById(STORY_BAR_ID)) return;
    const bar=document.createElement("div");
    bar.id=STORY_BAR_ID;
    bar.setAttribute("role","toolbar");
    bar.setAttribute("aria-label","Teacher story controls");
    bar.append(
      makeButton("◀ Previous","previous"),
      makeButton("▶ Play Story","play",true),
      makeButton("⏸ Pause","pause"),
      makeButton("⏯ Resume","resume"),
      makeButton("Next ▶","next"),
      makeButton("↺ Restart","restart")
    );
    const status=document.createElement("span");
    status.className="fa-story-status";
    status.textContent="Story ready";
    bar.appendChild(status);
    bar.addEventListener("click",event=>{
      const action=event.target&&event.target.dataset&&event.target.dataset.action;
      if(action==="previous") movePage(-1);
      else if(action==="next") movePage(1);
      else if(action==="play") playback.play();
      else if(action==="pause") playback.pause();
      else if(action==="resume") playback.resume();
      else if(action==="restart") restartStory();
    });
    document.body.appendChild(bar);
  }

  function updateControls(){
    const bar=document.getElementById(STORY_BAR_ID);
    if(!bar) return;
    const active=isStoryActive();
    bar.style.display=active?"flex":"none";
    if(!active){ playback.stop(); return; }
    const engine=storyEngine();
    const buttons=Object.fromEntries(Array.from(bar.querySelectorAll("button")).map(button=>[button.dataset.action,button]));
    buttons.previous.disabled=!engine||engine.pageIndex<=0;
    buttons.next.disabled=!engine||!engine.story||engine.pageIndex>=engine.story.pages.length-1;
    buttons.play.disabled=playback.playing&&!playback.paused;
    buttons.pause.disabled=!playback.playing||playback.paused;
    buttons.resume.disabled=!playback.playing||!playback.paused;
    const status=bar.querySelector(".fa-story-status");
    if(status&&engine&&engine.story) status.textContent=`Page ${engine.pageIndex+1} of ${engine.story.pages.length}${playback.playing?(playback.paused?" • Paused":" • Playing"):""}`;
  }

  function init(){
    addStyles();
    addFullscreenButton();
    addStoryBar();
    setInterval(updateControls,400);
  }

  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();

  window.FritzPresentationControls={version:"50.14",playback,update:updateControls};
})();
