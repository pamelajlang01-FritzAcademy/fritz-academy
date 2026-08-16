/* Fritz Academy presentation polish v61
   Removes pale-blue avatar mats at render time, restores real Rascal,
   and scales Builder pieces as scenery instead of thumbnail stickers. */
(function(){
  'use strict';

  const ART_RAW='https://raw.githubusercontent.com/pamelajlang01-FritzAcademy/fritz-academy/recovery-v50-1-exact/';

  /* Restore the original approved Rascal art that already exists in the Academy asset set. */
  if(window.FRITZ_SCENE_PRESENTATION&&window.FRITZ_SCENE_PRESENTATION.cast&&window.FRITZ_SCENE_PRESENTATION.cast.Rascal){
    window.FRITZ_SCENE_PRESENTATION.cast.Rascal.src=ART_RAW+'assets/rascal.png';
    window.FRITZ_SCENE_PRESENTATION.cast.Rascal.fallback=ART_RAW+'assets/rascal.png';
    window.FRITZ_SCENE_PRESENTATION.cast.Rascal.scale=.82;
  }

  const avatarCache=new Map();
  function isBlueBackdrop(r,g,b,a){
    if(a<20)return false;
    const light=r+g+b;
    return r>125&&g>145&&b>165&&b>r+10&&b>g+3&&light>470;
  }
  function cleanAvatarSource(src){
    if(!src)return Promise.resolve(src);
    if(avatarCache.has(src))return avatarCache.get(src);
    const job=new Promise(resolve=>{
      const source=new Image();
      source.crossOrigin='anonymous';
      source.onload=()=>{
        try{
          const canvas=document.createElement('canvas');
          canvas.width=source.naturalWidth||source.width;
          canvas.height=source.naturalHeight||source.height;
          const ctx=canvas.getContext('2d',{willReadFrequently:true});
          ctx.drawImage(source,0,0);
          const data=ctx.getImageData(0,0,canvas.width,canvas.height);
          const p=data.data;
          for(let i=0;i<p.length;i+=4){
            const r=p[i],g=p[i+1],b=p[i+2],a=p[i+3];
            if(isBlueBackdrop(r,g,b,a)){
              const strength=Math.min(1,Math.max(0,(b-Math.max(r,g)-2)/28));
              p[i+3]=Math.round(a*(1-strength));
              if(r>155&&g>175&&b>190)p[i+3]=0;
            }
          }
          ctx.putImageData(data,0,0);
          resolve(canvas.toDataURL('image/png'));
        }catch(error){resolve(src);}
      };
      source.onerror=()=>resolve(src);
      source.src=src;
    });
    avatarCache.set(src,job);
    return job;
  }
  function cleanAvatarElement(img){
    if(!img||img.dataset.fritzBackdropCleaned==='1')return;
    const src=img.currentSrc||img.getAttribute('src')||'';
    if(!src)return;
    img.dataset.fritzBackdropCleaned='1';
    cleanAvatarSource(src).then(cleaned=>{if(cleaned&&img.isConnected)img.src=cleaned;});
  }
  function cleanAvatarViews(root=document){
    root.querySelectorAll('.fritz-avatar-choice img,.fritz-profile-avatar img,.fa-scene58-student').forEach(cleanAvatarElement);
  }
  window.FRITZ_CLEAN_AVATAR_SOURCE=cleanAvatarSource;
  window.FRITZ_CLEAN_AVATAR_ELEMENT=cleanAvatarElement;

  const observer=new MutationObserver(mutations=>{
    mutations.forEach(m=>m.addedNodes.forEach(node=>{
      if(node.nodeType!==1)return;
      if(node.matches&&node.matches('.fritz-avatar-choice img,.fritz-profile-avatar img,.fa-scene58-student'))cleanAvatarElement(node);
      if(node.querySelectorAll)cleanAvatarViews(node);
    }));
  });
  if(document.body)observer.observe(document.body,{childList:true,subtree:true});
  else document.addEventListener('DOMContentLoaded',()=>observer.observe(document.body,{childList:true,subtree:true}),{once:true});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>cleanAvatarViews(),{once:true});
  else cleanAvatarViews();

  /* Builder visual scale: placed rewards must read as campus objects, not UI thumbnails. */
  const style=document.createElement('style');
  style.id='fritz-presentation-polish-61';
  style.textContent=`
    .fa-builder58-piece{
      width:clamp(150px,11vw,205px)!important;
      height:auto!important;
      max-height:220px!important;
      object-fit:contain!important;
      mix-blend-mode:multiply;
      filter:drop-shadow(0 8px 6px rgba(0,0,0,.34))!important;
    }
    .fa-builder58-piece[data-scale="large"]{width:clamp(185px,14vw,255px)!important;max-height:260px!important}
    .fa-builder58-piece[data-scale="small"]{width:clamp(125px,9vw,165px)!important;max-height:180px!important}
    .fa-builder58-ghost{width:160px!important;height:160px!important;mix-blend-mode:multiply}
    @media(max-width:760px){.fa-builder58-piece{width:130px!important;max-height:160px!important}}
  `;
  document.head.appendChild(style);

  if(typeof BuilderEngine!=='undefined'){
    const originalRender=BuilderEngine.prototype.render;
    BuilderEngine.prototype.render=function(){
      const result=originalRender.call(this);
      if(this.stage){
        this.stage.querySelectorAll('.fa-builder58-piece').forEach(img=>{
          const name=String(img.title||img.alt||'').toLowerCase();
          if(name.includes('tree')||name.includes('flag')||name.includes('sign')||name.includes('gate'))img.dataset.scale='large';
          else if(name.includes('letter')||name.includes('stone')||name.includes('bell')||name.includes('mailbox'))img.dataset.scale='small';
          else img.dataset.scale='normal';
        });
      }
      return result;
    };
  }
})();