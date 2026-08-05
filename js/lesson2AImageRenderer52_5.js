/* Fritz Academy 52.5 — force Lesson 2-A to use authored page images */
(function(){
  'use strict';

  function ensureStyles(){
    if(document.getElementById('fa-2a-image-renderer-525')) return;
    const style=document.createElement('style');
    style.id='fa-2a-image-renderer-525';
    style.textContent=`
      .fa525{position:fixed;inset:0;z-index:1000000;background:#071426e8;display:grid;place-items:center;padding:10px;font-family:Arial,sans-serif}
      .fa525-book{width:min(1100px,97vw);height:min(840px,96vh);background:#fffdf3;border:6px solid #102342;border-radius:22px;overflow:hidden;display:grid;grid-template-rows:auto minmax(0,1fr) auto}
      .fa525-head{padding:11px 18px;text-align:center;background:#fff3bd;border-bottom:3px solid #174ea6;color:#102342;font-size:23px;font-weight:900}
      .fa525-main{min-height:0;display:grid;grid-template-rows:minmax(0,1fr) auto;padding:12px 18px 8px}
      .fa525-main img{display:block;width:100%;height:100%;min-height:360px;object-fit:contain;border:4px solid #174ea6;border-radius:16px;background:#dff2ff}
      .fa525-text{padding:10px 18px 4px;text-align:center;color:#102342;font-size:27px;line-height:1.25;font-weight:900}
      .fa525-foot{display:flex;justify-content:center;gap:20px;padding:12px;border-top:3px solid #102342}
      .fa525-foot button{padding:11px 24px;border:3px solid #102342;border-radius:11px;background:#fff;font-size:20px;font-weight:900;cursor:pointer}
      .fa525-foot .next{background:#ffc63d}
      @media(max-width:720px){.fa525-main img{min-height:280px}.fa525-text{font-size:21px}.fa525-head{font-size:19px}}
    `;
    document.head.appendChild(style);
  }

  function clear(){ document.querySelectorAll('.fa525').forEach(node=>node.remove()); }

  function normalize(raw){
    return typeof raw==='string' ? {text:raw,image:''} : {text:(raw&&raw.text)||'',image:(raw&&raw.image)||''};
  }

  function render(engine,collection,isReader){
    if(engine.pageIndex>=collection.pages.length){
      clear();
      if(isReader) engine.startCheck(); else engine.startQuestions();
      return;
    }

    ensureStyles();
    clear();
    if(engine.scene && engine.scene.panels) engine.scene.panels.close();

    const page=normalize(collection.pages[engine.pageIndex]);
    const text=engine.lessonEngine.replaceName(page.text);
    const overlay=document.createElement('div');
    overlay.className='fa525';
    overlay.innerHTML=`<section class="fa525-book"><header class="fa525-head"></header><main class="fa525-main"><img alt="Fritz Academy illustrated scene"><div class="fa525-text"></div></main><footer class="fa525-foot"><button class="read">Read Aloud</button><button class="next"></button></footer></section>`;

    overlay.querySelector('.fa525-head').textContent=`${collection.title} — Page ${engine.pageIndex+1} of ${collection.pages.length}`;
    overlay.querySelector('.fa525-text').textContent=text;
    const image=overlay.querySelector('img');
    if(page.image){
      image.src=page.image;
    }else{
      image.style.display='none';
    }
    image.onerror=()=>{
      image.style.display='none';
      console.error('Lesson 2-A authored image failed to load.', page.image);
    };

    overlay.querySelector('.read').onclick=()=>engine.lessonEngine.speakText(text);
    const next=overlay.querySelector('.next');
    next.textContent=engine.pageIndex===collection.pages.length-1 ? (isReader?'Reader Check':'Story Check') : 'Next Page';
    next.onclick=()=>{
      engine.lessonEngine.stopMedia();
      overlay.remove();
      engine.pageIndex++;
      engine.showPage();
    };
    document.body.appendChild(overlay);
  }

  if(window.StoryEngine){
    const oldStoryShow=StoryEngine.prototype.showPage;
    StoryEngine.prototype.showPage=function(){
      if(!this.lesson || this.lesson.id!=='2-A') return oldStoryShow.call(this);
      return render(this,this.story,false);
    };
  }

  if(window.ReaderEngine){
    const oldReaderShow=ReaderEngine.prototype.showPage;
    ReaderEngine.prototype.showPage=function(){
      if(!this.lesson || this.lesson.id!=='2-A') return oldReaderShow.call(this);
      return render(this,this.reader,true);
    };
  }

  window.FRITZ_2A_IMAGE_RENDERER={version:'52.5',mode:'authored-page-images'};
})();
