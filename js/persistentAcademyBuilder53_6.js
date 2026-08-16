/* Fritz Academy 53.6 — persistent personal Academy Builder */
(function(){
'use strict';
if(typeof BuilderEngine==='undefined') return;

function css(){
 if(document.getElementById('fa536css'))return;
 const s=document.createElement('style');s.id='fa536css';s.textContent=`
 .fa536{position:fixed;inset:0;z-index:1000040;background:#071426ef;display:grid;place-items:center;padding:8px;font-family:Arial,sans-serif}
 .fa536shell{width:min(1280px,99vw);height:min(850px,98vh);background:#fffdf4;border:6px solid #e7b93c;border-radius:24px;overflow:hidden;display:grid;grid-template-rows:auto 1fr auto;box-shadow:0 24px 70px #000b}
 .fa536head{background:linear-gradient(#fff5bc,#e8c653);border-bottom:4px solid #173f78;padding:11px 16px;display:flex;justify-content:space-between;align-items:center;gap:14px;color:#102342}.fa536head h1{margin:0;font-size:25px}.fa536head p{margin:3px 0 0;font-weight:800;color:#315b87}.fa536count{font-weight:900;white-space:nowrap}
 .fa536main{display:grid;grid-template-columns:250px 1fr;min-height:0}.fa536tray{background:#edf5ff;border-right:4px solid #173f78;padding:12px;overflow:auto}.fa536tray h2{margin:0 0 10px;color:#102342;font-size:20px}.fa536piece{width:100%;margin:0 0 9px;padding:9px;border:3px solid #9cb3ca;border-radius:13px;background:white;color:#102342;font-weight:900;cursor:pointer;text-align:left}.fa536piece.selected{border-color:#e0a51c;background:#fff0a2}.fa536piece.placed{box-shadow:inset 0 0 0 2px #69a85d}
 .fa536world{position:relative;overflow:hidden;min-height:560px;background:#9dd7ef url('assets/academy.png') center/cover no-repeat;touch-action:none}.fa536world:after{content:'';position:absolute;inset:0;pointer-events:none;background:linear-gradient(transparent 65%,rgba(20,52,35,.12))}.fa536zone{position:absolute;left:3%;right:3%;bottom:3%;height:50%;border:4px dashed rgba(255,255,255,.68);border-radius:28px;background:rgba(255,255,255,.05);pointer-events:none}.fa536hint{position:absolute;right:12px;top:12px;padding:7px 10px;border-radius:10px;background:#fffde8e8;border:2px solid #d4a62a;color:#173f78;font-weight:900;font-size:13px;z-index:3}
 .fa536obj{position:absolute;transform:translate(-50%,-50%);min-width:88px;min-height:78px;padding:8px 9px;border:3px solid #173f78;border-radius:16px;background:#fffdf1f2;box-shadow:0 9px 18px #0005;display:grid;place-items:center;cursor:grab;user-select:none;touch-action:none;z-index:4}.fa536obj.active{outline:5px solid #f6c744}.fa536icon{font-size:39px;line-height:1}.fa536label{font-size:11px;font-weight:900;text-align:center;color:#102342;max-width:105px}.fa536obj[data-kind='gate']{min-width:115px}.fa536obj[data-kind='garden']{min-width:125px}.fa536obj[data-kind='sign']{min-width:105px}.fa536obj[data-kind='kite']{background:#f7fbffef}
 .fa536foot{background:#102342;padding:10px;display:flex;justify-content:center;gap:10px;flex-wrap:wrap}.fa536foot button{padding:10px 18px;border:3px solid white;border-radius:12px;background:white;color:#102342;font-weight:900;cursor:pointer}.fa536foot .primary{background:#f6c744}
 @media(max-width:760px){.fa536main{grid-template-columns:1fr;grid-template-rows:150px 1fr}.fa536tray{border-right:0;border-bottom:4px solid #173f78;display:flex;gap:8px;overflow:auto}.fa536tray h2{display:none}.fa536piece{min-width:185px;margin:0}.fa536world{min-height:390px}.fa536head p{display:none}}
 `;document.head.appendChild(s);
}

function normalizePiece(piece,id){
 const p=piece||{id,name:id,icon:'⭐'};
 return {id:p.id||id,name:p.name||id,icon:p.icon||'⭐'};
}
function kind(piece){
 const s=((piece.id||'')+' '+(piece.name||'')).toLowerCase();
 if(s.includes('gate'))return'gate';
 if(s.includes('garden')||s.includes('flower')||s.includes('planter'))return'garden';
 if(s.includes('sign')||s.includes('marker')||s.includes('post'))return'sign';
 if(s.includes('kite'))return'kite';
 return'object';
}
function allPieces(engine){
 const map=new Map();
 (Array.isArray(window.LEVELS)?window.LEVELS:[]).forEach(level=>{
  if(!level)return;
  [level.feelingsActivity,level.story,level.phonics,level.reader1,level.reader2].forEach(section=>{
   const p=section&&section.rewardPiece;if(p&&p.id)map.set(p.id,normalizePiece(p,p.id));
  });
 });
 (engine.build&&engine.build.requiredPieces||[]).forEach(id=>{if(!map.has(id)){const p=typeof engine.findPiece==='function'?engine.findPiece(id):null;map.set(id,normalizePiece(p,id));}});
 return map;
}
function earnedIds(engine,map){
 const set=new Set();
 const progress=(engine.scene.save&&engine.scene.save.lessonProgress)||{};
 Object.values(progress).forEach(r=>(r&&Array.isArray(r.earnedPieces)?r.earnedPieces:[]).forEach(id=>{if(map.has(id))set.add(id)}));
 if(typeof engine.earnedPieces==='function')engine.earnedPieces().forEach(id=>{if(map.has(id))set.add(id)});
 return [...set];
}
function world(engine){
 const save=engine.scene.save;
 save.builderWorlds=save.builderWorlds||{};
 save.builderWorlds.personalAcademy=save.builderWorlds.personalAcademy||{};
 return save.builderWorlds.personalAcademy;
}
function save(engine){if(typeof saveGame==='function')saveGame(engine.scene.save);}

BuilderEngine.prototype.showBuilder=function(){
 css();
 this.scene.panels?.close?.();
 document.querySelector('.fa536')?.remove();
 document.querySelector('.bw51')?.remove();
 document.querySelector('.fritz-builder-overlay')?.remove();
 const map=allPieces(this),earned=earnedIds(this,map),placed=world(this);
 const required=(this.build&&this.build.requiredPieces)||[];
 let selected='';
 const student=(this.scene.save&&this.scene.save.studentName)||'Student';
 const overlay=document.createElement('div');overlay.className='fa536';
 overlay.innerHTML=`<section class="fa536shell"><header class="fa536head"><div><h1>${student}'s Academy</h1><p>Place your earned pieces anywhere you want. They stay here for future lessons.</p></div><div class="fa536count">${earned.length} earned</div></header><main class="fa536main"><aside class="fa536tray"><h2>Your Builder Pack</h2></aside><section class="fa536world"><div class="fa536zone"></div><div class="fa536hint">Click a piece, then click the Academy to place it. Drag it anytime.</div></section></main><footer class="fa536foot"><button data-close>Keep Building Later</button><button data-reset>Reset Current Lesson Pieces</button><button class="primary" data-finish>Finish This Build</button></footer></section>`;
 const tray=overlay.querySelector('.fa536tray'),stage=overlay.querySelector('.fa536world');
 function render(){
  tray.querySelectorAll('.fa536piece').forEach(n=>n.remove());stage.querySelectorAll('.fa536obj').forEach(n=>n.remove());
  earned.forEach(id=>{
   const p=map.get(id)||normalizePiece(null,id),b=document.createElement('button');b.className='fa536piece'+(selected===id?' selected':'')+(placed[id]?' placed':'');b.textContent=`${p.icon} ${p.name}`;b.onclick=()=>{selected=id;render()};tray.appendChild(b);
   if(placed[id]){
    const o=document.createElement('div');o.className='fa536obj'+(selected===id?' active':'');o.dataset.kind=kind(p);o.style.left=placed[id].x+'%';o.style.top=placed[id].y+'%';o.innerHTML=`<div class="fa536icon">${p.icon}</div><div class="fa536label">${p.name}</div>`;
    let dragging=false;
    o.onpointerdown=e=>{dragging=true;selected=id;o.setPointerCapture?.(e.pointerId)};
    o.onpointermove=e=>{if(!dragging)return;const r=stage.getBoundingClientRect();placed[id]={x:Math.max(5,Math.min(95,(e.clientX-r.left)/r.width*100)),y:Math.max(8,Math.min(93,(e.clientY-r.top)/r.height*100))};o.style.left=placed[id].x+'%';o.style.top=placed[id].y+'%'};
    o.onpointerup=()=>{dragging=false;save(this);render()};stage.appendChild(o);
   }
  });
 }
 stage.onclick=e=>{if(!selected||e.target!==stage)return;const r=stage.getBoundingClientRect();placed[selected]={x:Math.max(5,Math.min(95,(e.clientX-r.left)/r.width*100)),y:Math.max(8,Math.min(93,(e.clientY-r.top)/r.height*100))};save(this);render()};
 render.call(this);
 overlay.querySelector('[data-close]').onclick=()=>{save(this);overlay.remove()};
 overlay.querySelector('[data-reset]').onclick=()=>{required.forEach(id=>delete placed[id]);save(this);render.call(this)};
 overlay.querySelector('[data-finish]').onclick=()=>{const missing=required.filter(id=>!placed[id]);if(missing.length){alert('Place each reward piece from this lesson before finishing.');return;}save(this);overlay.remove();if(typeof this.completeBuild==='function')this.completeBuild();};
 document.body.appendChild(overlay);
};
window.FRITZ_PERSISTENT_BUILDER='53.6';
})();