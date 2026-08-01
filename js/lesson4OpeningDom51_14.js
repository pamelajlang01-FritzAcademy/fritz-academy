/* Fritz Academy 51.14 — DOM opening for Lesson 1-D to avoid blocked Phaser button input */
(function(){
  "use strict";
  if(typeof LessonEngine==="undefined") return;

  const originalOpening=LessonEngine.prototype.showMissionOpening;

  function removeOpening(){
    document.querySelectorAll('.lesson4-opening-overlay').forEach(node=>node.remove());
  }

  function ensureStyle(){
    if(document.getElementById('lesson4-opening-style-5114')) return;
    const style=document.createElement('style');
    style.id='lesson4-opening-style-5114';
    style.textContent=`
      .lesson4-opening-overlay{position:fixed;inset:0;z-index:300000;background:#071426cc;display:grid;place-items:center;padding:16px;font-family:Arial,sans-serif}
      .lesson4-opening-card{width:min(780px,94vw);background:#fffdf3;border:6px solid #102342;border-radius:18px;padding:38px 30px;text-align:center;box-sizing:border-box}
      .lesson4-opening-card h1{font-size:42px;color:#102342;margin:0 0 18px}
      .lesson4-opening-card h2{font-size:31px;color:#174ea6;margin:0 0 28px}
      .lesson4-opening-card p{font-size:27px;line-height:1.45;font-weight:800;color:#102342;margin:0 0 30px}
      .lesson4-opening-card button{background:#ffc63d;color:#102342;border:0;border-radius:8px;padding:15px 34px;font-size:27px;font-weight:900;cursor:pointer}
    `;
    document.head.appendChild(style);
  }

  LessonEngine.prototype.showMissionOpening=function(){
    if(this.levelId!=="1-D") return originalOpening.call(this);

    this.setSection("opening");
    ensureStyle();
    removeOpening();

    const overlay=document.createElement('div');
    overlay.className='lesson4-opening-overlay';
    const card=document.createElement('section');
    card.className='lesson4-opening-card';

    const title=document.createElement('h1');
    title.textContent=`Level ${this.levelId}`;
    const subtitle=document.createElement('h2');
    subtitle.textContent=this.lesson.title;
    const body=document.createElement('p');
    body.innerHTML='Today we learn six important question words.<br><br><strong>Who • What • Where<br>When • Why • How</strong><br><br>Listen, read, answer, and build.';
    const begin=document.createElement('button');
    begin.type='button';
    begin.textContent='Start Lesson';
    begin.addEventListener('click',()=>{
      removeOpening();
      this.showGreeting(0);
    });

    card.append(title,subtitle,body,begin);
    overlay.appendChild(card);
    document.body.appendChild(overlay);
  };
})();
