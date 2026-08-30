/*
====================================================
FRITZ ACADEMY
Version 54 Stabilization Patch
====================================================
Fixes:
- Reliable typing in student profile fields.
- Prevent Phaser keyboard capture while a profile form is open.
- Preload story and reader illustrations without adding a visible loading screen.
- Continue with a safe placeholder if an illustration fails to load.
====================================================
*/
(function(){
  "use strict";
  function activeGameScenes(){if(typeof Phaser==="undefined"||!Array.isArray(Phaser.GAMES))return[];return Phaser.GAMES.flatMap(game=>{try{return game&&game.scene?game.scene.getScenes(true):[];}catch(error){return[];}});}
  function setGameKeyboardEnabled(enabled){activeGameScenes().forEach(scene=>{if(scene&&scene.input&&scene.input.keyboard)scene.input.keyboard.enabled=enabled;});}
  function protectProfileInputs(panel){if(!panel)return;panel.querySelectorAll("input").forEach(input=>{input.addEventListener("keydown",event=>event.stopPropagation());input.addEventListener("keyup",event=>event.stopPropagation());input.addEventListener("keypress",event=>event.stopPropagation());});const nameInput=panel.querySelector('input[type="text"]');if(nameInput){nameInput.maxLength=80;nameInput.setAttribute("autocapitalize","words");nameInput.setAttribute("enterkeyhint","next");nameInput.spellcheck=false;nameInput.setAttribute("aria-describedby","fritz-name-help");if(!panel.querySelector('#fritz-name-help')){const help=document.createElement("small");help.id="fritz-name-help";help.className="fritz-profile-help";help.textContent="Names may include spaces, hyphens, apostrophes, and international characters.";nameInput.insertAdjacentElement("afterend",help);}}}
  if(typeof StudentProfileEngine!=="undefined"){
    const originalChooser=StudentProfileEngine.prototype.showChooser,originalCreateForm=StudentProfileEngine.prototype.showCreateForm,originalClose=StudentProfileEngine.prototype.close;
    StudentProfileEngine.prototype.showChooser=function(){originalChooser.call(this);setGameKeyboardEnabled(false);protectProfileInputs(this.panel);};
    StudentProfileEngine.prototype.showCreateForm=function(){originalCreateForm.call(this);setGameKeyboardEnabled(false);protectProfileInputs(this.panel);};
    StudentProfileEngine.prototype.close=function(){originalClose.call(this);setGameKeyboardEnabled(true);};
    const originalStyles=StudentProfileEngine.prototype.injectStyles;
    StudentProfileEngine.prototype.injectStyles=function(){originalStyles.call(this);if(document.getElementById("fritz-stabilization-styles"))return;const style=document.createElement("style");style.id="fritz-stabilization-styles";style.textContent='.fritz-profile-form input:focus{border-color:#174ea6;outline:3px solid rgba(23,78,166,.2)}.fritz-profile-help{display:block;margin:-2px 0 6px;color:#46566f;font-size:14px;line-height:1.35}';document.head.appendChild(style);};
  }
  function placeholderTexture(scene,key){if(scene.textures.exists(key))return;const texture=scene.textures.createCanvas(key,8,8),context=texture.getContext();context.fillStyle="#f7f1dd";context.fillRect(0,0,8,8);texture.refresh();}
  function preloadPageImages(scene,pages,keyForIndex){const jobs=(Array.isArray(pages)?pages:[]).map((page,index)=>{const source=page&&typeof page==="object"?page.image:"",key=keyForIndex(index);if(!source||scene.textures.exists(key))return Promise.resolve();return new Promise(resolve=>{let settled=false;const image=new Image(),finish=success=>{if(settled)return;settled=true;try{if(success&&!scene.textures.exists(key))scene.textures.addImage(key,image);else if(!success)placeholderTexture(scene,key);}catch(error){placeholderTexture(scene,key);}resolve();};const timeout=window.setTimeout(()=>finish(false),5000);image.onload=()=>{window.clearTimeout(timeout);finish(true);};image.onerror=()=>{window.clearTimeout(timeout);finish(false);};image.src=source;});});return Promise.all(jobs);}
  /* Preload invisibly. The preceding game screen remains visible, avoiding a dead-feeling transition and preserving the 20–25 minute pace. */
  if(typeof StoryEngine!=="undefined"){
    const originalStoryStart=StoryEngine.prototype.start;
    StoryEngine.prototype.start=function(lesson,onComplete){const pages=lesson&&lesson.story?lesson.story.pages:[];preloadPageImages(this.scene,pages,index=>`story-${lesson.id}-${index}`).then(()=>originalStoryStart.call(this,lesson,onComplete)).catch(()=>originalStoryStart.call(this,lesson,onComplete));};
  }
  if(typeof ReaderEngine!=="undefined"){
    const originalReaderStart=ReaderEngine.prototype.start;
    ReaderEngine.prototype.start=function(lesson,readerKey,onComplete){const reader=lesson&&lesson[readerKey],pages=reader?reader.pages:[];preloadPageImages(this.scene,pages,index=>`reader-${lesson.id}-${readerKey}-${index}`).then(()=>originalReaderStart.call(this,lesson,readerKey,onComplete)).catch(()=>originalReaderStart.call(this,lesson,readerKey,onComplete));};
  }
})();