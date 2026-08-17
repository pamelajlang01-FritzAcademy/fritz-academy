/* Fritz Academy cast proportion lock v65
   Bash is the intentionally oversized puppy. Use explicit display heights so source-canvas proportions cannot distort the cast.
   Also fixes Rascal's production URL: academy runs under /academy/, so approved local assets must use a root-relative /assets/... path. */
(function(){
  'use strict';

  const HEIGHTS={
    'Bash':'58%',
    'Captain Fritz':'53%',
    'Nola':'49%',
    'Bear':'43%',
    'Rascal':'41%',
    'Tony':'34%'
  };

  const RASCAL='/assets/characters/approved/rascal/approved-hero.webp';

  function applyCast(root=document){
    if(window.FRITZ_SCENE_PRESENTATION&&window.FRITZ_SCENE_PRESENTATION.cast){
      const r=window.FRITZ_SCENE_PRESENTATION.cast.Rascal;
      if(r){r.src=RASCAL;r.fallback=RASCAL;r.scale=1;}
    }

    root.querySelectorAll('.fa-scene58-char').forEach(img=>{
      const name=img.dataset.name||img.title||img.alt||'';
      if(HEIGHTS[name]){
        img.style.setProperty('height',HEIGHTS[name],'important');
        img.style.setProperty('width','auto','important');
        img.style.setProperty('max-width',name==='Bash'?'19%':'16%','important');
        img.style.setProperty('transform','none','important');
        img.style.setProperty('object-fit','contain','important');
        img.style.setProperty('object-position','center bottom','important');
      }
      if(name==='Rascal'){
        img.src=RASCAL;
        img.dataset.fallback='1';
        img.onerror=function(){
          /* Never replace Rascal with a wrong dog. Leave the approved source in place for retry/cache refresh. */
          this.onerror=null;
          setTimeout(()=>{ if(this.isConnected) this.src=RASCAL+'?v=65'; },80);
        };
      }
    });

    /* Student is a puppy cadet, but is not part of the fixed cast-size hierarchy. */
    root.querySelectorAll('.fa-scene58-student').forEach(img=>{
      img.style.setProperty('height','39%','important');
      img.style.setProperty('width','auto','important');
      img.style.setProperty('max-width','15%','important');
      img.style.setProperty('transform','none','important');
      img.style.setProperty('object-fit','contain','important');
      img.style.setProperty('object-position','center bottom','important');
    });
  }

  function ensureRascal(root=document){
    const scene=root.querySelector('.fa-scene58');
    if(!scene)return;
    const text=(scene.querySelector('.fa-scene58-text')?.textContent||'').toLowerCase();
    if(!text.includes('rascal'))return;
    const cast=scene.querySelector('.fa-scene58-cast');
    if(!cast||cast.querySelector('[data-name="Rascal"]'))return;
    const img=document.createElement('img');
    img.className='fa-scene58-char';
    img.dataset.name='Rascal';
    img.alt='Rascal';img.title='Rascal';img.src=RASCAL;
    cast.appendChild(img);
    applyCast(scene);
  }

  const style=document.createElement('style');
  style.id='fritz-cast-proportion-lock-65';
  style.textContent=`
    .fa-scene58-char[data-name="Bash"]{height:58%!important;max-width:19%!important;transform:none!important}
    .fa-scene58-char[data-name="Captain Fritz"]{height:53%!important;max-width:17%!important;transform:none!important}
    .fa-scene58-char[data-name="Nola"]{height:49%!important;max-width:16%!important;transform:none!important}
    .fa-scene58-char[data-name="Bear"]{height:43%!important;max-width:15%!important;transform:none!important}
    .fa-scene58-char[data-name="Rascal"]{height:41%!important;max-width:15%!important;transform:none!important}
    .fa-scene58-char[data-name="Tony"]{height:34%!important;max-width:13%!important;transform:none!important}
    .fa-scene58-student{height:39%!important;max-width:15%!important;transform:none!important}
  `;
  document.head.appendChild(style);

  const observer=new MutationObserver(mutations=>{
    let relevant=false;
    for(const m of mutations){ if(m.addedNodes.length){relevant=true;break;} }
    if(!relevant)return;
    requestAnimationFrame(()=>{applyCast();ensureRascal();});
  });
  function start(){observer.observe(document.body,{childList:true,subtree:true});applyCast();ensureRascal();}
  if(document.body)start();else document.addEventListener('DOMContentLoaded',start,{once:true});
})();