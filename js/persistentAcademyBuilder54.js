/* Fritz Academy 54.0 — production Academy Builder: real world + image-backed rewards */
(function(){
'use strict';
if(typeof BuilderEngine==='undefined') return;

function addCss(){
 if(document.getElementById('fa540css')) return;
 const s=document.createElement('style'); s.id='fa540css'; s.textContent=`
 .fa540{position:fixed;inset:0;z-index:1000100;background:#06111eea;display:grid;place-items:center;padding:8px;font-family:Arial,sans-serif}
 .fa540shell{width:min(1360px,99vw);height:min(900px,98vh);background:#fffaf0;border:6px solid #e5b73b;border-radius:24px;overflow:hidden;display:grid;grid-template-rows:auto 1fr auto;box-shadow:0 28px 80px #000c}
 .fa540head{display:flex;justify-content:space-between;align-items:center;gap:18px;padding:12px 18px;background:linear-gradient(#fff4b5,#e8c350);border-bottom:4px solid #173f78;color:#102342}
 .fa540head h1{margin:0;font-size:27px}.fa540head p{margin:4px 0 0;font-weight:800;color:#315b87}.fa540count{font-weight:900;white-space:nowrap}
 .fa540main{display:grid;grid-template-columns:275px 1fr;min-height:0;background:#102342}
 .fa540tray{background:#edf4fc;border-right:4px solid #173f78;padding:12px;overflow:auto}.fa540tray h2{margin:0 0 10px;color:#102342;font-size:20px}
 .fa540piece{width:100%;display:grid;grid-template-columns:64px 1fr;align-items:center;gap:9px;margin:0 0 10px;padding:7px;border:3px solid #9aafc4;border-radius:14px;background:#fff;color:#102342;font-weight:900;cursor:pointer;text-align:left}
 .fa540piece img{width:64px;height:55px;object-fit:contain;filter:drop-shadow(0 3px 3px #0003)}.fa540piece.selected{border-color:#dc9e16;background:#fff0a2}.fa540piece.placed{box-shadow:inset 0 0 0 2px #6ca55d}
 .fa540world{position:relative;overflow:hidden;min-height:590px;background:#7dc6e8 url('assets/academy.png') center/cover no-repeat;touch-action:none}
 .fa540world:before{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 56%,rgba(8,31,27,.10));pointer-events:none}
 .fa540hint{position:absolute;right:14px;top:14px;z-index:12;padding:8px 12px;background:#fff8dbed;border:3px solid #e2b439;border-radius:12px;color:#102342;font-weight:900;font-size:13px;box-shadow:0 5px 14px #0004}
 .fa540obj{position:absolute;transform:translate(-50%,-50%);cursor:grab;user-select:none;touch-action:none;z-index:6;filter:drop-shadow(0 8px 7px #0005);transform-origin:center bottom}
 .fa540obj img{display:block;width:100%;height:100%;object-fit:contain;pointer-events:none}
 .fa540obj.active{filter:drop-shadow(0 0 0 #0000) drop-shadow(0 0 8px #ffd74e) drop-shadow(0 8px 7px #0005)}
 .fa540obj[data-size='small']{width:8.5%;height:13%}.fa540obj[data-size='medium']{width:12%;height:18%}.fa540obj[data-size='wide']{width:18%;height:15%}.fa540obj[data-size='large']{width:17%;height:24%}.fa540obj[data-size='xl']{width:23%;height:30%}
 .fa540name{position:absolute;left:50%;bottom:-20px;transform:translateX(-50%);padding:3px 7px;background:#fffde8e8;border:1px solid #c89d32;border-radius:8px;font-size:10px;font-weight:900;color:#102342;white-space:nowrap;opacity:0;transition:.15s;pointer-events:none}
 .fa540obj:hover .fa540name,.fa540obj.active .fa540name{opacity:1}
 .fa540foot{background:#102342;padding:10px;display:flex;justify-content:center;gap:10px;flex-wrap:wrap}.fa540foot button{padding:10px 18px;border:3px solid #fff;border-radius:12px;background:#fff;color:#102342;font-weight:900;cursor:pointer}.fa540foot .primary{background:#f4c542}
 .fa540empty{padding:16px;background:#fff7d8;border:2px solid #d5a72f;border-radius:12px;color:#102342;font-weight:800}
 @media(max-width:820px){.fa540main{grid-template-columns:1fr;grid-template-rows:155px 1fr}.fa540tray{border-right:0;border-bottom:4px solid #173f78;display:flex;gap:8px;overflow:auto}.fa540tray h2{display:none}.fa540piece{min-width:205px;margin:0}.fa540world{min-height:420px}.fa540head p{display:none}.fa540obj[data-size='small']{width:14%}.fa540obj[data-size='medium']{width:18%}.fa540obj[data-size='wide']{width:25%}.fa540obj[data-size='large']{width:23%}.fa540obj[data-size='xl']{width:30%}}
 `; document.head.appendChild(s);
}
function normalize(piece,id){return {id:(piece&&piece.id)||id,name:(piece&&piece.name)||id};}
function allPieces(engine){
 const map=new Map();
 (Array.isArray(window.LEVELS)?window.LEVELS:[]).forEach(level=>{
  if(!level)return;
  [level.feelingsActivity,level.conversationActivity,level.story,level.phonics,level.reader1,level.reader2].forEach(sec=>{
   const p=sec&&sec.rewardPiece; if(p&&p.id) map.set(p.id,normalize(p,p.id));
  });
 });
 (engine.build&&engine.build.requiredPieces||[]).forEach(id=>{
  if(!map.has(id)){const p=typeof engine.findPiece==='function'?engine.findPiece(id):null;map.set(id,normalize(p,id));}
 });
 return map;
}
function earnedIds(engine,map){
 const set=new Set(),progress=(engine.scene.save&&engine.scene.save.lessonProgress)||{};
 Object.values(progress).forEach(r=>(r&&Array.isArray(r.earnedPieces)?r.earnedPieces:[]).forEach(id=>{if(map.has(id))set.add(id)}));
 if(typeof engine.earnedPieces==='function') (engine.earnedPieces()||[]).forEach(id=>{if(map.has(id))set.add(id)});
 return [...set];
}
function world(engine){
 const s=engine.scene.save;s.builderWorlds=s.builderWorlds||{};s.builderWorlds.personalAcademy=s.builderWorlds.personalAcademy||{};return s.builderWorlds.personalAcademy;
}
function persist(engine){if(typeof saveGame==='function')saveGame(engine.scene.save);}
function syncCompletion(engine,required,placed){
 const s=engine.scene.save;s.placedBuilds=s.placedBuilds||{};s.placedBuilds[engine.build.areaId]=s.placedBuilds[engine.build.areaId]||{};
 const stage={};required.forEach((id,i)=>{if(placed[id])stage[id]=i;});s.placedBuilds[engine.build.areaId][engine.build.stage]=stage;persist(engine);
}
const sizes={
 'welcome-flowers':'wide','flower-bed':'wide','four-flowers':'wide','stone-path':'wide','reading-bench':'medium','welcome-tree':'large','garden-fence':'wide',
 'watering-can':'small','garden-lantern':'small','birdhouse':'medium','map-post':'medium','clue-door':'large','letter-stones-cd':'medium','letter-stones-ef':'medium',
 'ip-letter-stones':'medium','cat-statue':'medium','direction-arrows':'wide','flower-arch':'large','fish-pond':'wide','proud-banner':'wide',
 'academy-team-banner':'wide','alphabet-gate':'xl','question-fountain':'large','kite-workshop-sign':'wide','safe-path-marker':'medium','six-kite-display':'wide'
};
function assetFor(id){return window.FRITZ_BUILDER_ASSETS&&window.FRITZ_BUILDER_ASSETS[id];}
function safeName(s){return String(s||'').replace(/[<>&"]/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]));}

BuilderEngine.prototype.showBuilder=function(){
 addCss(); this.scene.panels?.close?.();
 document.querySelectorAll('.fa540,.fa536,.bw51,.fritz-builder-overlay').forEach(n=>n.remove());
 const map=allPieces(this),earned=earnedIds(this,map),placed=world(this),required=(this.build&&this.build.requiredPieces)||[];
 const available=earned.filter(id=>assetFor(id));
 let selected='';
 const student=(this.scene.save&&this.scene.save.studentName)||'Student';
 const overlay=document.createElement('div');overlay.className='fa540';
 overlay.innerHTML=`<section class="fa540shell"><header class="fa540head"><div><h1>${safeName(student)}'s Fritz Academy</h1><p>Build your own Academy. Everything you place is saved for your next visit.</p></div><div class="fa540count">${available.length} real pieces earned</div></header><main class="fa540main"><aside class="fa540tray"><h2>Builder Pack</h2></aside><section class="fa540world"><div class="fa540hint">Choose an illustrated piece, then click the Academy to place it. Drag to move it.</div></section></main><footer class="fa540foot"><button data-close>Save & Keep Building Later</button><button data-reset>Reset This Lesson's Pieces</button><button class="primary" data-finish>Finish This Build</button></footer></section>`;
 const tray=overlay.querySelector('.fa540tray'),stage=overlay.querySelector('.fa540world');

 function render(){
  tray.querySelectorAll('.fa540piece,.fa540empty').forEach(n=>n.remove());stage.querySelectorAll('.fa540obj').forEach(n=>n.remove());
  if(!available.length){const e=document.createElement('div');e.className='fa540empty';e.textContent='No finished Academy art has been earned yet.';tray.appendChild(e);}
  available.forEach(id=>{
   const p=map.get(id)||normalize(null,id),src=assetFor(id);
   const b=document.createElement('button');b.className='fa540piece'+(selected===id?' selected':'')+(placed[id]?' placed':'');
   b.innerHTML=`<img src="${src}" alt=""><span>${safeName(p.name)}</span>`;b.onclick=()=>{selected=id;render()};tray.appendChild(b);
   if(placed[id]){
    const o=document.createElement('div');o.className='fa540obj'+(selected===id?' active':'');o.dataset.size=sizes[id]||'medium';
    o.style.left=placed[id].x+'%';o.style.top=placed[id].y+'%';o.innerHTML=`<img src="${src}" alt="${safeName(p.name)}"><span class="fa540name">${safeName(p.name)}</span>`;
    let drag=false,moved=false;
    o.onpointerdown=e=>{e.stopPropagation();drag=true;moved=false;selected=id;o.setPointerCapture?.(e.pointerId)};
    o.onpointermove=e=>{if(!drag)return;moved=true;const r=stage.getBoundingClientRect();placed[id]={x:Math.max(3,Math.min(97,(e.clientX-r.left)/r.width*100)),y:Math.max(6,Math.min(95,(e.clientY-r.top)/r.height*100))};o.style.left=placed[id].x+'%';o.style.top=placed[id].y+'%'};
    o.onpointerup=e=>{e.stopPropagation();drag=false;persist(this);if(!moved)render.call(this)};
    stage.appendChild(o);
   }
  });
 }
 stage.onclick=e=>{
  if(!selected||e.target!==stage)return;
  const r=stage.getBoundingClientRect();placed[selected]={x:Math.max(3,Math.min(97,(e.clientX-r.left)/r.width*100)),y:Math.max(6,Math.min(95,(e.clientY-r.top)/r.height*100))};
  persist(this);render.call(this);
 };
 render.call(this);
 overlay.querySelector('[data-close]').onclick=()=>{persist(this);overlay.remove()};
 overlay.querySelector('[data-reset]').onclick=()=>{required.forEach(id=>delete placed[id]);syncCompletion(this,required,placed);render.call(this)};
 overlay.querySelector('[data-finish]').onclick=()=>{
  const missing=required.filter(id=>assetFor(id)&&!placed[id]);
  const unfinished=required.filter(id=>!assetFor(id));
  if(unfinished.length){alert('This build still has unfinished artwork. It will not be replaced with placeholders.');return;}
  if(missing.length){alert('Place each reward piece from this adventure before finishing.');return;}
  syncCompletion(this,required,placed);overlay.remove();if(typeof this.completeBuild==='function')this.completeBuild();
 };
 document.body.appendChild(overlay);
};
window.FRITZ_PRODUCTION_BUILDER='54.0';
})();