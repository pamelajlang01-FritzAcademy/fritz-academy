/* Fritz Academy presentation polish v62
   Uses approved Rascal, removes only edge-connected avatar backdrops,
   and gives Builder rewards world-appropriate scale. */
(function(){
  'use strict';

  /* Exact approved Rascal supplied by Pam, stored locally in this branch. */
  if(window.FRITZ_SCENE_PRESENTATION&&window.FRITZ_SCENE_PRESENTATION.cast&&window.FRITZ_SCENE_PRESENTATION.cast.Rascal){
    window.FRITZ_SCENE_PRESENTATION.cast.Rascal.src='assets/characters/approved/rascal/approved-hero.webp';
    window.FRITZ_SCENE_PRESENTATION.cast.Rascal.fallback='assets/characters/approved/rascal/approved-hero.webp';
    window.FRITZ_SCENE_PRESENTATION.cast.Rascal.scale=.82;
  }

  /* Remove ONLY background connected to the outside edge. This preserves blue
     clothing and interior details that the old broad chroma-key damaged. */
  const avatarCache=new Map();
  function rgbDistance(a,b){const dr=a[0]-b[0],dg=a[1]-b[1],db=a[2]-b[2];return Math.sqrt(dr*dr+dg*dg+db*db);}
  function cleanAvatarSource(src){
    if(!src)return Promise.resolve(src);
    if(avatarCache.has(src))return avatarCache.get(src);
    const job=new Promise(resolve=>{
      const source=new Image();source.crossOrigin='anonymous';
      source.onload=()=>{
        try{
          const canvas=document.createElement('canvas');canvas.width=source.naturalWidth||source.width;canvas.height=source.naturalHeight||source.height;
          const ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.drawImage(source,0,0);
          const image=ctx.getImageData(0,0,canvas.width,canvas.height),p=image.data,w=canvas.width,h=canvas.height;
          const corners=[[0,0],[w-1,0],[0,h-1],[w-1,h-1]].map(([x,y])=>{const i=(y*w+x)*4;return[p[i],p[i+1],p[i+2]];});
          const bg=[0,1,2].map(k=>Math.round(corners.reduce((s,c)=>s+c[k],0)/corners.length));
          const seen=new Uint8Array(w*h),queue=new Int32Array(w*h),qx=new Int32Array(w*h);let head=0,tail=0;
          function push(x,y){if(x<0||y<0||x>=w||y>=h)return;const n=y*w+x;if(seen[n])return;const i=n*4;if(p[i+3]<10||rgbDistance([p[i],p[i+1],p[i+2]],bg)<92){seen[n]=1;qx[tail]=x;queue[tail]=y;tail++;}}
          for(let x=0;x<w;x++){push(x,0);push(x,h-1);}for(let y=1;y<h-1;y++){push(0,y);push(w-1,y);}
          while(head<tail){const x=qx[head],y=queue[head++],n=y*w+x,i=n*4;p[i+3]=0;push(x+1,y);push(x-1,y);push(x,y+1);push(x,y-1);}
          /* feather one pixel around the removed region */
          for(let y=1;y<h-1;y++)for(let x=1;x<w-1;x++){const n=y*w+x;if(seen[n])continue;const near=seen[n-1]||seen[n+1]||seen[n-w]||seen[n+w];if(near){const i=n*4;p[i+3]=Math.min(p[i+3],190);}}
          ctx.putImageData(image,0,0);resolve(canvas.toDataURL('image/png'));
        }catch(e){resolve(src);}
      };
      source.onerror=()=>resolve(src);source.src=src;
    });
    avatarCache.set(src,job);return job;
  }
  function cleanAvatarElement(img){
    if(!img||img.dataset.fritzBackdropCleaned==='2')return;const src=img.currentSrc||img.getAttribute('src')||'';if(!src)return;
    img.dataset.fritzBackdropCleaned='2';cleanAvatarSource(src).then(cleaned=>{if(cleaned&&img.isConnected)img.src=cleaned;});
  }
  function cleanAvatarViews(root=document){root.querySelectorAll('.fritz-avatar-choice img,.fritz-profile-avatar img,.fa-scene58-student').forEach(cleanAvatarElement);}
  window.FRITZ_CLEAN_AVATAR_SOURCE=cleanAvatarSource;window.FRITZ_CLEAN_AVATAR_ELEMENT=cleanAvatarElement;
  const observer=new MutationObserver(ms=>ms.forEach(m=>m.addedNodes.forEach(node=>{if(node.nodeType!==1)return;if(node.matches&&node.matches('.fritz-avatar-choice img,.fritz-profile-avatar img,.fa-scene58-student'))cleanAvatarElement(node);if(node.querySelectorAll)cleanAvatarViews(node);}))); 
  function startObserver(){observer.observe(document.body,{childList:true,subtree:true});cleanAvatarViews();}
  if(document.body)startObserver();else document.addEventListener('DOMContentLoaded',startObserver,{once:true});

  const style=document.createElement('style');style.id='fritz-presentation-polish-62';style.textContent=`
    .fa-scene58-student{background:transparent!important}
    .fa-builder58-piece{height:auto!important;object-fit:contain!important;mix-blend-mode:normal!important;filter:drop-shadow(0 10px 8px rgba(0,0,0,.36))!important;transform:translate(-50%,-86%)!important;transform-origin:center bottom!important}
    .fa-builder58-piece[data-kind="tree"]{width:clamp(235px,17vw,330px)!important;max-height:360px!important}
    .fa-builder58-piece[data-kind="flag"],.fa-builder58-piece[data-kind="sign"]{width:clamp(180px,13vw,250px)!important;max-height:285px!important}
    .fa-builder58-piece[data-kind="bench"]{width:clamp(170px,12vw,235px)!important;max-height:190px!important}
    .fa-builder58-piece[data-kind="letters"]{width:clamp(150px,10vw,205px)!important;max-height:145px!important}
    .fa-builder58-piece[data-kind="path"]{width:clamp(190px,14vw,285px)!important;max-height:155px!important}
    .fa-builder58-piece[data-kind="small"]{width:clamp(115px,8vw,155px)!important;max-height:155px!important}
    .fa-builder58-piece[data-kind="normal"]{width:clamp(160px,11vw,220px)!important;max-height:235px!important}
    .fa-builder58-ghost{width:190px!important;height:190px!important;object-fit:contain!important;filter:drop-shadow(0 10px 8px rgba(0,0,0,.36))!important}
    @media(max-width:760px){.fa-builder58-piece{max-width:170px!important}}
  `;document.head.appendChild(style);

  if(typeof BuilderEngine!=='undefined'){
    const originalRender=BuilderEngine.prototype.render;
    BuilderEngine.prototype.render=function(){
      const result=originalRender.call(this);
      if(this.stage)this.stage.querySelectorAll('.fa-builder58-piece').forEach(img=>{
        const n=String(img.title||img.alt||'').toLowerCase();let kind='normal';
        if(n.includes('tree'))kind='tree';else if(n.includes('flag'))kind='flag';else if(n.includes('sign')||n.includes('marker'))kind='sign';else if(n.includes('bench')||n.includes('chair'))kind='bench';else if(n.includes('letter')||n.includes('stone'))kind='letters';else if(n.includes('path')||n.includes('trail')||n.includes('stepping'))kind='path';else if(n.includes('bell')||n.includes('mailbox'))kind='small';
        img.dataset.kind=kind;
      });
      return result;
    };
  }
})();