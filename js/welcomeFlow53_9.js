/* Fritz Academy 53.9 — welcome video belongs at Academy entry, never lesson close */
(function(){
'use strict';
const WELCOME='assets/welcome-song-small.mp4';

// The welcome video is available as an explicit Academy-opening experience.
window.FRITZ_WELCOME_MEDIA={videoPath:WELCOME,assetPath:WELCOME,title:'Welcome to Fritz Academy'};

// Do not autoplay repeatedly. A teacher/student can launch it once per browser session from the Academy.
function addWelcomeButton(){
  if(document.getElementById('faWelcomeButton')) return;
  const b=document.createElement('button');
  b.id='faWelcomeButton';
  b.textContent='▶ Welcome to Fritz Academy';
  Object.assign(b.style,{position:'fixed',left:'14px',bottom:'14px',zIndex:'99990',padding:'9px 13px',border:'3px solid #f6c744',borderRadius:'12px',background:'#102342',color:'#fff',fontWeight:'900',cursor:'pointer'});
  b.onclick=()=>{
    if(window.game?.scene?.scenes){
      const scene=window.game.scene.scenes.find(s=>s&&s.lessonEngine&&s.lessonEngine.media);
      const media=scene?.lessonEngine?.media;
      if(media&&typeof media.play==='function') return media.play(WELCOME,null,{});
    }
    const v=document.createElement('video');v.src=WELCOME;v.controls=true;v.playsInline=true;v.autoplay=true;v.style='position:fixed;inset:5%;width:90%;height:90%;object-fit:contain;background:#071426;z-index:100010;border:6px solid #f6c744;border-radius:18px';v.onclick=e=>e.stopPropagation();const close=document.createElement('button');close.textContent='Close';close.style='position:fixed;right:6%;top:6%;z-index:100011;padding:10px 18px;font-weight:900';close.onclick=()=>{v.remove();close.remove()};document.body.append(v,close);
  };
  document.body.appendChild(b);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',addWelcomeButton);else addWelcomeButton();
window.FRITZ_WELCOME_FLOW='53.9';
})();