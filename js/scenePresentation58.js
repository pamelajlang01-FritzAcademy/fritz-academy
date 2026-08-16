/* Fritz Academy Scene Presentation v58
   One cast. One Academy. One adventure.
   Story/reader pages are staged inside Academy scenery with approved dressed cast assets. */
(function(){
  const RAW='https://raw.githubusercontent.com/pamelajlang01-FritzAcademy/fritz-academy/repair/lesson-integrity-foundation/';
  const CAST={
    'Captain Fritz':{src:RAW+'assets/characters/approved/captain-fritz/nautical-idle.webp',scale:0.96},
    'Bash':{src:RAW+'assets/characters/approved/bash/sweatsuit-idle.webp',scale:1.13},
    'Bear':{src:RAW+'assets/characters/approved/bear/sweatsuit-idle.webp',scale:0.82},
    'Nola':{src:RAW+'assets/characters/approved/nola/sweatsuit-idle.webp',scale:0.96},
    'Tony':{src:RAW+'assets/characters/approved/tony/sweatsuit-idle.webp',scale:0.62},
    'Rascal':{src:'assets/characters/approved/rascal/approved-hero.svg',scale:0.80}
  };

  function injectStyles(){
    if(document.getElementById('fa-scene58-style'))return;
    const s=document.createElement('style');s.id='fa-scene58-style';
    s.textContent=`
      .fa-scene58{position:fixed;inset:0;z-index:10100;background:rgba(4,14,29,.94);display:flex;align-items:center;justify-content:center;font-family:Arial,sans-serif;color:#102342}
      .fa-scene58 *{box-sizing:border-box}
      .fa-scene58-card{width:min(1180px,96vw);height:min(820px,94vh);background:#fff8e8;border:5px solid #0f3564;border-radius:24px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 70px rgba(0,0,0,.55)}
      .fa-scene58-head{height:76px;display:flex;align-items:center;gap:18px;padding:10px 18px;background:linear-gradient(#fff3b8,#f4cf61);border-bottom:4px solid #0f4f9e;flex:0 0 auto}
      .fa-scene58-badge{background:#123b72;color:white;border-radius:999px;padding:10px 18px;font-weight:900;font-size:18px;letter-spacing:.5px;white-space:nowrap}
      .fa-scene58-title{font-size:25px;font-weight:900;flex:1;text-align:center}.fa-scene58-page{font-size:16px;font-weight:800;color:#334e73;white-space:nowrap}
      .fa-scene58-stage{position:relative;flex:1;min-height:0;overflow:hidden;background-image:linear-gradient(rgba(3,20,42,.02),rgba(3,20,42,.02)),url('assets/fritz_academy_world_map.png');background-size:cover;background-position:center 46%}
      .fa-scene58-stage:after{content:'';position:absolute;inset:0;background:linear-gradient(to bottom,rgba(255,255,255,0) 60%,rgba(8,30,54,.12));pointer-events:none}
      .fa-scene58-cast{position:absolute;left:3%;right:3%;bottom:0;height:82%;display:flex;align-items:flex-end;justify-content:center;gap:1.8%;pointer-events:none;z-index:2}
      .fa-scene58-char{height:72%;max-width:22%;object-fit:contain;object-position:center bottom;filter:drop-shadow(0 9px 8px rgba(0,0,0,.32));transform-origin:center bottom;animation:faIdle58 3.2s ease-in-out infinite}
      .fa-scene58-char:nth-child(2){animation-delay:.35s}.fa-scene58-char:nth-child(3){animation-delay:.7s}.fa-scene58-char:nth-child(4){animation-delay:1.05s}
      @keyframes faIdle58{0%,100%{translate:0 0}50%{translate:0 -5px}}
      .fa-scene58-journal{min-height:162px;background:#fffaf0;border-top:4px solid #102f5e;padding:16px 24px 14px;display:flex;flex-direction:column;justify-content:center;flex:0 0 auto;z-index:4}
      .fa-scene58-text{font-size:27px;line-height:1.3;font-weight:800;text-align:center;max-width:1020px;margin:0 auto 12px;color:#102342}
      .fa-scene58-actions{display:flex;justify-content:center;gap:18px}.fa-scene58-btn{border:3px solid #153c70;border-radius:14px;padding:10px 23px;background:white;color:#102342;font-size:18px;font-weight:900;cursor:pointer;box-shadow:0 3px 0 rgba(15,53,100,.28)}.fa-scene58-btn.next{background:#f5c646}
      @media(max-width:760px){.fa-scene58-card{width:100vw;height:100vh;border-radius:0;border-width:0}.fa-scene58-head{height:70px;padding:8px}.fa-scene58-badge{font-size:14px;padding:8px 11px}.fa-scene58-title{font-size:18px}.fa-scene58-page{display:none}.fa-scene58-text{font-size:21px}.fa-scene58-journal{min-height:180px}.fa-scene58-char{max-width:28%;height:66%}}
    `;document.head.appendChild(s);
  }

  function castFor(text,pageImage){
    const t=String(text||''); const names=[];
    Object.keys(CAST).forEach(name=>{if(t.toLowerCase().includes(name.toLowerCase()))names.push(name);});
    const p=String(pageImage||'').toLowerCase();
    if(p.includes('captain_fritz')&&!names.includes('Captain Fritz'))names.push('Captain Fritz');
    ['bash','bear','nola','tony','rascal'].forEach(n=>{if(p.includes(n)){const name=n[0].toUpperCase()+n.slice(1);if(!names.includes(name))names.push(name);}});
    return names.slice(0,4);
  }

  function close(){const old=document.querySelector('.fa-scene58');if(old)old.remove();}

  function open(opts){
    injectStyles();close();
    const root=document.createElement('div');root.className='fa-scene58';
    const card=document.createElement('div');card.className='fa-scene58-card';
    const head=document.createElement('div');head.className='fa-scene58-head';
    const badge=document.createElement('div');badge.className='fa-scene58-badge';badge.textContent=opts.badge||'ACADEMY STORY';
    const title=document.createElement('div');title.className='fa-scene58-title';title.textContent=opts.title||'';
    const page=document.createElement('div');page.className='fa-scene58-page';page.textContent=`Page ${opts.pageIndex+1} of ${opts.total}`;
    head.append(badge,title,page);
    const stage=document.createElement('div');stage.className='fa-scene58-stage';
    if(opts.background)stage.style.backgroundImage=`linear-gradient(rgba(3,20,42,.02),rgba(3,20,42,.02)),url('${opts.background}')`;
    const cast=document.createElement('div');cast.className='fa-scene58-cast';
    castFor(opts.text,opts.pageImage).forEach(name=>{
      const spec=CAST[name];const img=document.createElement('img');img.className='fa-scene58-char';img.src=spec.src;img.alt=name;img.title=name;img.style.transform=`scale(${spec.scale})`;cast.appendChild(img);
    });
    stage.appendChild(cast);
    const journal=document.createElement('div');journal.className='fa-scene58-journal';
    const txt=document.createElement('div');txt.className='fa-scene58-text';txt.textContent=opts.text||'';
    const actions=document.createElement('div');actions.className='fa-scene58-actions';
    const read=document.createElement('button');read.className='fa-scene58-btn';read.textContent='🔊 Read Aloud';read.onclick=()=>opts.onRead&&opts.onRead();
    const next=document.createElement('button');next.className='fa-scene58-btn next';next.textContent=opts.nextLabel||'Next Page →';next.onclick=()=>{close();opts.onNext&&opts.onNext();};
    actions.append(read,next);journal.append(txt,actions);card.append(head,stage,journal);root.appendChild(card);document.body.appendChild(root);
  }

  window.FRITZ_SCENE_PRESENTATION={open,close,cast:CAST};
})();