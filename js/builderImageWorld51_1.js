/* Production image-based builder renderer */
(function(){
  "use strict";
  if(typeof BuilderEngine==="undefined") return;
  const bg="assets/environments/welcome-garden-open.svg";
  function pieceMap(engine){
    const map=new Map();
    (window.LEVELS||[]).forEach(level=>{
      if(!level?.build||level.build.areaId!==engine.build.areaId)return;
      [level.feelingsActivity,level.story,level.phonics,level.reader1,level.reader2].forEach(s=>{if(s?.rewardPiece?.id)map.set(s.rewardPiece.id,s.rewardPiece);});
    });
    engine.build.requiredPieces.forEach(id=>{if(!map.has(id))map.set(id,engine.findPiece(id));});
    return map;
  }
  function earned(engine,map){
    const set=new Set();
    Object.values(engine.scene.save.lessonProgress||{}).forEach(r=>(r?.earnedPieces||[]).forEach(id=>{if(map.has(id))set.add(id);}));
    engine.build.requiredPieces.forEach(id=>{if(engine.earnedPieces().includes(id))set.add(id);});
    return [...set];
  }
  function world(engine){
    const save=engine.scene.save;save.builderWorlds=save.builderWorlds||{};save.builderWorlds[engine.build.areaId]=save.builderWorlds[engine.build.areaId]||{};return save.builderWorlds[engine.build.areaId];
  }
  function addStyles(){if(document.getElementById("builder-image-world"))return;const s=document.createElement("style");s.id="builder-image-world";s.textContent=`.biw{position:fixed;inset:0;z-index:150000;background:#071426ee;display:grid;place-items:center;padding:12px;font-family:Arial}.biw-shell{width:min(1220px,98vw);height:min(790px,97vh);background:#fff;border:6px solid #f6c744;border-radius:24px;overflow:hidden;display:grid;grid-template-rows:auto 1fr auto}.biw-head{padding:12px 18px;background:#fff7cf;border-bottom:3px solid #174ea6}.biw-head h2{margin:0;color:#102342}.biw-main{display:grid;grid-template-columns:245px 1fr;min-height:0}.biw-tray{padding:12px;background:#edf5ff;border-right:3px solid #174ea6;overflow:auto}.biw-card{width:100%;display:grid;grid-template-columns:76px 1fr;align-items:center;gap:8px;padding:8px;margin-bottom:9px;border:3px solid #9fb3c8;border-radius:14px;background:#fff;font-weight:900;text-align:left}.biw-card img{width:72px;height:72px;object-fit:contain}.biw-stage{position:relative;overflow:hidden;background:url('${bg}') center/cover no-repeat;touch-action:none}.biw-object{position:absolute;transform:translate(-50%,-50%);width:150px;height:150px;cursor:grab;touch-action:none;filter:drop-shadow(0 10px 8px #0005)}.biw-object img{width:100%;height:100%;object-fit:contain}.biw-label{position:absolute;left:50%;bottom:-18px;transform:translateX(-50%);white-space:nowrap;background:#ffffffe8;border:2px solid #174ea6;border-radius:8px;padding:3px 7px;font-size:12px;font-weight:900}.biw-foot{padding:10px;display:flex;justify-content:center;gap:10px;border-top:3px solid #174ea6}.biw-foot button{padding:10px 18px;border:3px solid #102342;border-radius:12px;font-weight:900;background:#fff}.biw-foot .primary{background:#f6c744}@media(max-width:760px){.biw-main{grid-template-columns:1fr;grid-template-rows:145px 1fr}.biw-tray{display:flex;gap:8px;overflow:auto;border-right:0;border-bottom:3px solid #174ea6}.biw-card{min-width:190px}.biw-object{width:112px;height:112px}}`;document.head.appendChild(s);}
  BuilderEngine.prototype.showBuilder=function(){
    addStyles();this.scene.panels?.close();document.querySelectorAll('.bw51,.fritz-builder-overlay,.biw').forEach(n=>n.remove());
    const map=pieceMap(this), ids=earned(this,map), placed=world(this);let selected="";
    const overlay=document.createElement('div');overlay.className='biw';const shell=document.createElement('section');shell.className='biw-shell';shell.innerHTML=`<header class="biw-head"><h2>${this.build.title||'Build Your Academy'}</h2></header>`;
    const main=document.createElement('div');main.className='biw-main';const tray=document.createElement('aside');tray.className='biw-tray';const stage=document.createElement('div');stage.className='biw-stage';
    const render=()=>{tray.innerHTML='';stage.innerHTML='';ids.forEach(id=>{const p=map.get(id)||{};if(!p.image)return;const b=document.createElement('button');b.className='biw-card';b.innerHTML=`<img src="${p.image}" alt=""><span>${p.name||id}</span>`;b.onclick=()=>{selected=id;};tray.appendChild(b);if(placed[id]){const o=document.createElement('div');o.className='biw-object';o.style.left=placed[id].x+'%';o.style.top=placed[id].y+'%';o.innerHTML=`<img src="${p.image}" alt="${p.name||''}"><span class="biw-label">${p.name||id}</span>`;let drag=false;o.onpointerdown=e=>{drag=true;o.setPointerCapture?.(e.pointerId);};o.onpointermove=e=>{if(!drag)return;const r=stage.getBoundingClientRect();placed[id]={x:Math.max(7,Math.min(93,(e.clientX-r.left)/r.width*100)),y:Math.max(12,Math.min(91,(e.clientY-r.top)/r.height*100))};o.style.left=placed[id].x+'%';o.style.top=placed[id].y+'%';};o.onpointerup=()=>{drag=false;saveGame(this.scene.save);};stage.appendChild(o);}});};
    stage.onclick=e=>{if(!selected||e.target!==stage)return;const r=stage.getBoundingClientRect();placed[selected]={x:(e.clientX-r.left)/r.width*100,y:(e.clientY-r.top)/r.height*100};saveGame(this.scene.save);render();};render();
    const foot=document.createElement('footer');foot.className='biw-foot';const later=document.createElement('button');later.textContent='Keep Building Later';later.onclick=()=>overlay.remove();const finish=document.createElement('button');finish.className='primary';finish.textContent='Finish This Build';finish.onclick=()=>{if(!this.build.requiredPieces.every(id=>placed[id])){alert('Place each lesson piece first.');return;}overlay.remove();this.completeBuild();};foot.append(later,finish);main.append(tray,stage);shell.append(main,foot);overlay.appendChild(shell);document.body.appendChild(overlay);
  };
})();