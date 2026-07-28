/* Fritz Academy Global Avatar Asset Pipeline v50.9
   Student avatars are separate from story characters. This pipeline applies
   the same edge-connected background cleanup to every approved avatar in
   profile screens, lessons, games, readers, and Builder activities. */
(function(){
  "use strict";

  const processedSources = new Map();
  const avatarIds = new Set();

  function canonicalizeRegistry(){
    const registry = Array.isArray(window.FRITZ_AVATARS) ? window.FRITZ_AVATARS : [];
    registry.forEach(avatar => {
      if(!avatar || !avatar.id || !avatar.src) return;
      // Keep the repository path exactly as registered. The approved girl
      // avatars live under assets/avatars/girl while the approved boy avatars
      // currently live under assets/assets/avatars/boy.
      avatarIds.add(avatar.id);
    });
    return registry;
  }

  function isEdgeBackground(r,g,b,a){
    if(a < 24) return true;
    const max = Math.max(r,g,b);
    const min = Math.min(r,g,b);
    const spread = max-min;
    const nearWhite = r > 226 && g > 226 && b > 226 && spread < 32;
    const blue = b > 92 && b > r * 1.10 && b > g * 1.025 && (b-r) > 18;
    return nearWhite || blue;
  }

  function cleanCanvas(source){
    if(!source || !source.width || !source.height) return null;
    const canvas = document.createElement("canvas");
    canvas.width = source.naturalWidth || source.width;
    canvas.height = source.naturalHeight || source.height;
    const ctx = canvas.getContext("2d", {willReadFrequently:true});
    if(!ctx) return null;
    ctx.drawImage(source,0,0,canvas.width,canvas.height);
    const image = ctx.getImageData(0,0,canvas.width,canvas.height);
    const data = image.data;
    const w = canvas.width;
    const h = canvas.height;
    const visited = new Uint8Array(w*h);
    const queue = [];
    for(let x=0;x<w;x++){ queue.push(x); queue.push((h-1)*w+x); }
    for(let y=1;y<h-1;y++){ queue.push(y*w); queue.push(y*w+w-1); }

    while(queue.length){
      const index = queue.pop();
      if(index < 0 || index >= w*h || visited[index]) continue;
      visited[index] = 1;
      const p = index*4;
      if(!isEdgeBackground(data[p],data[p+1],data[p+2],data[p+3])) continue;
      data[p+3] = 0;
      const x = index % w;
      const y = Math.floor(index/w);
      if(x>0) queue.push(index-1);
      if(x<w-1) queue.push(index+1);
      if(y>0) queue.push(index-w);
      if(y<h-1) queue.push(index+w);
    }

    ctx.putImageData(image,0,0);
    return canvas;
  }

  function preparedSource(src){
    if(!src) return Promise.resolve(src);
    const canonical = src;
    if(processedSources.has(canonical)) return processedSources.get(canonical);
    const promise = new Promise(resolve => {
      const image = new Image();
      image.onload = () => {
        try{
          const canvas = cleanCanvas(image);
          resolve(canvas ? canvas.toDataURL("image/png") : canonical);
        }catch(error){ resolve(canonical); }
      };
      image.onerror = () => resolve(canonical);
      image.src = canonical;
    });
    processedSources.set(canonical,promise);
    return promise;
  }

  function isAvatarImage(image){
    if(!image || image.tagName !== "IMG") return false;
    if(image.closest(".fritz-avatar-choice,.fritz-profile-avatar")) return true;
    const src = image.getAttribute("src") || "";
    return /assets\/(?:assets\/)?avatars\//i.test(src);
  }

  function prepareImage(image){
    if(!isAvatarImage(image) || image.dataset.fritzAvatarPrepared === "true") return;
    image.dataset.fritzAvatarPrepared = "true";
    const original = image.getAttribute("src") || "";
    preparedSource(original).then(cleaned => {
      if(cleaned) image.src = cleaned;
      image.style.background = "transparent";
      image.style.objectFit = image.closest(".fritz-profile-avatar") ? "contain" : image.style.objectFit;
    });
  }

  function prepareDocument(root=document){
    root.querySelectorAll && root.querySelectorAll("img").forEach(prepareImage);
  }

  function observeDocument(){
    prepareDocument();
    const observer = new MutationObserver(records => {
      records.forEach(record => record.addedNodes.forEach(node => {
        if(node.nodeType !== 1) return;
        if(node.tagName === "IMG") prepareImage(node);
        prepareDocument(node);
      }));
    });
    observer.observe(document.documentElement,{childList:true,subtree:true});
  }

  function cleanPhaserTexture(scene,key,avatarId){
    if(!scene || !scene.textures || !key) return key;
    const cleanKey = `${key}-avatar-transparent-v509`;
    if(scene.textures.exists(cleanKey)) return cleanKey;
    if(avatarId && !avatarIds.has(avatarId)) return key;
    const texture = scene.textures.get(key);
    const source = texture && texture.getSourceImage && texture.getSourceImage();
    try{
      const canvas = cleanCanvas(source);
      if(!canvas) return key;
      scene.textures.addCanvas(cleanKey,canvas);
      return cleanKey;
    }catch(error){
      return key;
    }
  }

  canonicalizeRegistry();
  window.FritzAvatarAssetPipeline = {
    version:"50.9.1",
    registry:window.FRITZ_AVATARS || [],
    prepareSource:preparedSource,
    prepareImage,
    prepareDocument,
    cleanPhaserTexture,
    canonicalizeRegistry
  };

  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded",observeDocument,{once:true});
  else observeDocument();
})();