/* Fritz Academy canonical render lock v66
   Source of truth: approved Fritz Academy character reference sheet and outfit library.
   Bash is the intentionally oversized puppy. Character images are visually trimmed before sizing
   so transparent source padding cannot distort the approved relative proportions.
   Builder objects are also trimmed and given stable in-world footprints; stage zoom handles scaling. */
(function(){
  'use strict';

  const RAW_APPROVED='https://raw.githubusercontent.com/pamelajlang01-FritzAcademy/fritz-academy/92f549ac9a3d312c73e6d9ec2e3331575d8aabaa/';
  const RAW_EXACT='https://raw.githubusercontent.com/pamelajlang01-FritzAcademy/fritz-academy/recovery-v50-1-exact/';
  const RASCAL='https://raw.githubusercontent.com/pamelajlang01-FritzAcademy/fritz-academy/recovery/fritz-production/assets/characters/approved/rascal/approved-hero.webp';

  /* Approved outfits already created for the Academy. Do not substitute alternate dogs. */
  const APPROVED={
    'Captain Fritz':{src:RAW_APPROVED+'assets/characters/approved/captain-fritz/nautical-idle.webp',ratio:.91},
    'Bash':{src:RAW_APPROVED+'assets/characters/approved/bash/sweatsuit-idle.webp',ratio:1.00},
    'Bear':{src:RAW_APPROVED+'assets/characters/approved/bear/sweatsuit-idle.webp',ratio:.66},
    'Nola':{src:RAW_APPROVED+'assets/characters/approved/nola/sweatsuit-idle.webp',ratio:.78},
    'Tony':{src:RAW_APPROVED+'assets/characters/approved/tony/sweatsuit-idle.webp',ratio:.43},
    'Rascal':{src:RASCAL,ratio:.64}
  };

  /* Visible-height target is relative to the story-stage height, with Bash as the master reference. */
  const BASH_STAGE_HEIGHT=.58;
  const trimCache=new Map();

  function trimTransparent(src){
    if(!src)return Promise.resolve(src);
    if(trimCache.has(src))return trimCache.get(src);
    const job=new Promise(resolve=>{
      const im=new Image(); im.crossOrigin='anonymous';
      im.onload=()=>{
        try{
          const w=im.naturalWidth||im.width,h=im.naturalHeight||im.height;
          const c=document.createElement('canvas');c.width=w;c.height=h;
          const x=c.getContext('2d',{willReadFrequently:true});x.drawImage(im,0,0);
          const d=x.getImageData(0,0,w,h),p=d.data;
          let minX=w,minY=h,maxX=-1,maxY=-1;
          for(let yy=0;yy<h;yy++)for(let xx=0;xx<w;xx++){
            const a=p[(yy*w+xx)*4+3];if(a>18){if(xx<minX)minX=xx;if(xx>maxX)maxX=xx;if(yy<minY)minY=yy;if(yy>maxY)maxY=yy;}
          }
          if(maxX<minX||maxY<minY){resolve(src);return;}
          const pad=Math.max(2,Math.round(Math.max(w,h)*.008));
          minX=Math.max(0,minX-pad);minY=Math.max(0,minY-pad);maxX=Math.min(w-1,maxX+pad);maxY=Math.min(h-1,maxY+pad);
          const tw=maxX-minX+1,th=maxY-minY+1,out=document.createElement('canvas');out.width=tw;out.height=th;
          out.getContext('2d').drawImage(c,minX,minY,tw,th,0,0,tw,th);
          resolve(out.toDataURL('image/png'));
        }catch(e){resolve(src);}
      };
      im.onerror=()=>resolve(src); im.src=src;
    });
    trimCache.set(src,job);return job;
  }

  function setApprovedCastMap(){
    const cast=window.FRITZ_SCENE_PRESENTATION&&window.FRITZ_SCENE_PRESENTATION.cast;
    if(!cast)return;
    Object.entries(APPROVED).forEach(([name,spec])=>{
      if(!cast[name])cast[name]={};
      cast[name].src=spec.src;cast[name].fallback=spec.src;cast[name].scale=1;
    });
  }

  function normalizeCast(root=document){
    setApprovedCastMap();
    root.querySelectorAll('.fa-scene58-char').forEach(img=>{
      const name=img.dataset.name||img.title||img.alt||'';const spec=APPROVED[name];if(!spec)return;
      if(img.dataset.canonical66!=='1'){
        img.dataset.canonical66='1';img.src=spec.src;img.onerror=()=>{
          /* Only Rascal gets a same-character emergency fallback; never substitute another cast member. */
          if(name==='Rascal'&&img.dataset.rascalFallback!=='1'){
            img.dataset.rascalFallback='1';img.src=RAW_EXACT+'assets/characters/rascal/standing.png';
          }
        };
        trimTransparent(spec.src).then(clean=>{if(img.isConnected&&clean)img.src=clean;});
      }
      const h=(BASH_STAGE_HEIGHT*spec.ratio*100).toFixed(2)+'%';
      img.style.setProperty('height',h,'important');
      img.style.setProperty('width','auto','important');
      img.style.setProperty('max-width','20%','important');
      img.style.setProperty('transform','none','important');
      img.style.setProperty('object-fit','contain','important');
      img.style.setProperty('object-position','center bottom','important');
    });
  }

  function ensureNamedCast(root=document){
    const scene=root.querySelector('.fa-scene58');if(!scene)return;
    const text=(scene.querySelector('.fa-scene58-text')?.textContent||'').toLowerCase();
    const cast=scene.querySelector('.fa-scene58-cast');if(!cast)return;
    Object.keys(APPROVED).forEach(name=>{
      if(!text.includes(name.toLowerCase()))return;
      if(cast.querySelector('[data-name="'+name.replace(/"/g,'')+'"]'))return;
      const img=document.createElement('img');img.className='fa-scene58-char';img.dataset.name=name;img.alt=name;img.title=name;img.src=APPROVED[name].src;cast.appendChild(img);
    });
    normalizeCast(scene);
  }

  const WORLD_WIDTH={
    'welcome-flag':190,'welcome-garden-sign':220,'letter-stones-abc':175,'gate-bench':215,'apple-tree':275,
    'backpack-rack':205,'clue-door':210,'garden-lantern':115,'reading-bench':215,'garden-fence':250,
    'garden-map':180,'small-bridge':260,'bushes':200,'flowers':190,'flag':185,
    'kite-workshop':290,'kite-rack':185,'tool-bench':220,'storage-shelf':190,'workshop-sign':195,
    'windmill':285,'pond':310,'fish':120,'dock':275,'water-wheel':235,
    'garden-arch':245,'fountain':225,'walking-path':300,'roses':195,'butterfly-garden':230,
    'reading-circle':260,'story-tree':285,'owl-perch':165,'bird-house':135,'picnic-area':245,
    'alphabet-gate':300,'academy-banner':210,'flags':190,'trophy-pedestal':145,'music-stage':300
  };
  function worldWidth(id,name){
    const key=String(id||'').toLowerCase(),n=String(name||'').toLowerCase();
    if(WORLD_WIDTH[key])return WORLD_WIDTH[key];
    if(n.includes('tree'))return 275;if(n.includes('bench'))return 215;if(n.includes('sign'))return 210;if(n.includes('flag'))return 190;
    if(n.includes('letter')||n.includes('stone'))return 175;if(n.includes('path'))return 300;if(n.includes('fountain'))return 225;if(n.includes('gate'))return 290;
    if(n.includes('flower')||n.includes('rose')||n.includes('bush'))return 195;if(n.includes('bridge')||n.includes('dock'))return 265;
    return 200;
  }
  function normalizeBuilder(root=document){
    root.querySelectorAll('.fa-builder58-piece').forEach(img=>{
      const id=img.dataset.id||'',name=img.title||img.alt||id,w=worldWidth(id,name);
      img.style.setProperty('width',w+'px','important');
      img.style.setProperty('height','auto','important');
      img.style.setProperty('max-height','none','important');
      img.style.setProperty('transform','translate(-50%,-92%)','important');
      img.style.setProperty('transform-origin','center bottom','important');
      img.style.setProperty('object-fit','contain','important');
      if(img.dataset.trim66!=='1'){
        img.dataset.trim66='1';trimTransparent(img.currentSrc||img.src).then(clean=>{if(img.isConnected&&clean)img.src=clean;});
      }
    });
    root.querySelectorAll('.fa-builder58-card img').forEach(img=>{
      img.style.setProperty('width','78px','important');img.style.setProperty('height','78px','important');img.style.setProperty('object-fit','contain','important');
    });
  }

  const style=document.createElement('style');style.id='fritz-canonical-render-66';style.textContent=`
    .fa-scene58-char[data-name="Bash"]{height:58%!important}
    .fa-scene58-char[data-name="Captain Fritz"]{height:52.78%!important}
    .fa-scene58-char[data-name="Nola"]{height:45.24%!important}
    .fa-scene58-char[data-name="Bear"]{height:38.28%!important}
    .fa-scene58-char[data-name="Rascal"]{height:37.12%!important}
    .fa-scene58-char[data-name="Tony"]{height:24.94%!important}
    .fa-scene58-char{width:auto!important;transform:none!important;object-fit:contain!important;object-position:center bottom!important}
    .fa-builder58-piece{height:auto!important;max-height:none!important;object-fit:contain!important;transform:translate(-50%,-92%)!important;transform-origin:center bottom!important}
  `;document.head.appendChild(style);

  /* Patch Builder render so every re-render reapplies canonical world footprints. */
  function patchBuilder(){
    if(typeof BuilderEngine==='undefined'||BuilderEngine.prototype.__canonical66)return;
    BuilderEngine.prototype.__canonical66=true;const old=BuilderEngine.prototype.render;
    BuilderEngine.prototype.render=function(){const r=old.call(this);requestAnimationFrame(()=>normalizeBuilder(this.overlay||document));return r;};
  }

  function apply(){patchBuilder();normalizeCast();ensureNamedCast();normalizeBuilder();}
  const obs=new MutationObserver(()=>requestAnimationFrame(apply));
  function start(){obs.observe(document.body,{childList:true,subtree:true});apply();}
  if(document.body)start();else document.addEventListener('DOMContentLoaded',start,{once:true});
  window.FRITZ_CANONICAL66={approved:APPROVED,normalizeCast,normalizeBuilder};
})();