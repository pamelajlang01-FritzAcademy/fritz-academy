/* Fritz Academy Scene Presentation v60
   Approved student cadets + complete named cast + real Academy prop library. */
(function(){
  'use strict';
  const ART_RAW='https://raw.githubusercontent.com/pamelajlang01-FritzAcademy/fritz-academy/recovery-v50-1-exact/';
  const CAST_RAW='https://raw.githubusercontent.com/pamelajlang01-FritzAcademy/fritz-academy/92f549ac9a3d312c73e6d9ec2e3331575d8aabaa/';
  const CAST={
    'Captain Fritz':{src:CAST_RAW+'assets/characters/approved/captain-fritz/nautical-idle.webp',fallback:ART_RAW+'assets/captain_fritz.png',scale:0.98},
    'Bash':{src:CAST_RAW+'assets/characters/approved/bash/sweatsuit-idle.webp',fallback:ART_RAW+'assets/characters/bash/standing.png',scale:1.15},
    'Bear':{src:CAST_RAW+'assets/characters/approved/bear/sweatsuit-idle.webp',fallback:ART_RAW+'assets/characters/bear/standing.png',scale:0.84},
    'Nola':{src:CAST_RAW+'assets/characters/approved/nola/sweatsuit-idle.webp',fallback:ART_RAW+'assets/characters/nola/standing.png',scale:0.98},
    'Tony':{src:CAST_RAW+'assets/characters/approved/tony/sweatsuit-idle.webp',fallback:ART_RAW+'assets/characters/tony/standing.png',scale:0.63},
    'Rascal':{src:'assets/characters/approved/rascal/approved-hero.svg',fallback:ART_RAW+'assets/characters/rascal/standing.png',scale:0.82}
  };
  const ENV={
    academy:ART_RAW+'assets/environments/academy_front.png',gate:ART_RAW+'assets/environments/academy_gate.png',garden:ART_RAW+'assets/environments/welcome_garden.png',
    workshop:ART_RAW+'assets/environments/builder_workshop.png',stream:ART_RAW+'assets/environments/stream.png',bridge:ART_RAW+'assets/environments/bridge.png',
    reading:ART_RAW+'assets/environments/reading_room.png',classroom:ART_RAW+'assets/environments/classroom_beginner.png',hallway:ART_RAW+'assets/environments/hallway.png'
  };
  const PROP={
    flowers:ART_RAW+'assets/objects/welcome_flowers.png',path:ART_RAW+'assets/objects/stone_path.png',bench:ART_RAW+'assets/objects/reading_bench.png',tree:ART_RAW+'assets/objects/garden_tree.png',fence:ART_RAW+'assets/objects/garden_fence.png',
    rug:ART_RAW+'assets/objects/story_rug.png',shelf:ART_RAW+'assets/objects/book_shelf.png',chair:ART_RAW+'assets/objects/reading_chair.png',cart:ART_RAW+'assets/objects/book_cart.png',circle:ART_RAW+'assets/objects/reading_circle.png',
    stump:ART_RAW+'assets/objects/outdoor_story_stump.png',statue:ART_RAW+'assets/objects/captain_fritz_statue.png',flag:ART_RAW+'assets/objects/academy_flag.png',mailbox:ART_RAW+'assets/objects/academy_mailbox.png',bell:ART_RAW+'assets/objects/academy_bell.png',trophy:ART_RAW+'assets/objects/trophy_display.png',steps:ART_RAW+'assets/objects/paw_print_stepping_stones.png'
  };
  function environmentFor(opts){
    const s=(String(opts.title||'')+' '+String(opts.text||'')+' '+String(opts.pageImage||'')).toLowerCase();
    if(s.includes('workshop')||(s.includes('kite')&&(s.includes('make')||s.includes('build'))))return ENV.workshop;
    if(s.includes('pond')||s.includes('fish')||s.includes('windmill')||s.includes('weather'))return ENV.stream;
    if(s.includes('bridge'))return ENV.bridge;
    if(s.includes('classroom')||s.includes('desk'))return ENV.classroom;
    if(s.includes('hall'))return ENV.hallway;
    if(s.includes('gate'))return ENV.gate;
    if(s.includes('reader')||s.includes('book')||s.includes('reading'))return ENV.reading;
    return ENV.garden;
  }
  function castFor(text,pageImage){
    const t=String(text||'').toLowerCase(),p=String(pageImage||'').toLowerCase(),names=[];
    Object.keys(CAST).forEach(name=>{if(t.includes(name.toLowerCase()))names.push(name);});
    ['bash','bear','nola','tony','rascal'].forEach(key=>{if(p.includes(key)){const n=key[0].toUpperCase()+key.slice(1);if(!names.includes(n))names.push(n);}});
    if(p.includes('captain_fritz')&&!names.includes('Captain Fritz'))names.push('Captain Fritz');
    return names; /* never cap the cast: everyone involved must appear */
  }
  function propsFor(text){
    const t=String(text||'').toLowerCase(),arr=[];
    const add=(test,src)=>{if(test&&!arr.includes(src))arr.push(src);};
    add(t.includes('bench'),PROP.bench);add(t.includes('tree'),PROP.tree);add(t.includes('flower')||t.includes('garden bed'),PROP.flowers);add(t.includes('path'),PROP.path);add(t.includes('fence'),PROP.fence);
    add(t.includes('rug'),PROP.rug);add(t.includes('shelf'),PROP.shelf);add(t.includes('chair'),PROP.chair);add(t.includes('book')||t.includes('cart'),PROP.cart);add(t.includes('reading circle'),PROP.circle);
    add(t.includes('stump'),PROP.stump);add(t.includes('statue'),PROP.statue);add(t.includes('flag')||t.includes('banner'),PROP.flag);add(t.includes('mailbox')||t.includes('mail'),PROP.mailbox);add(t.includes('bell'),PROP.bell);add(t.includes('trophy'),PROP.trophy);add(t.includes('step')||t.includes('paw print'),PROP.steps);
    return arr.slice(0,5);
  }
  function injectStyles(){
    if(document.getElementById('fa-scene60-style'))return;
    const s=document.createElement('style');s.id='fa-scene60-style';s.textContent=`
      .fa-scene58{position:fixed;inset:0;z-index:10100;background:rgba(4,14,29,.94);display:flex;align-items:center;justify-content:center;font-family:Arial,sans-serif;color:#102342}.fa-scene58 *{box-sizing:border-box}
      .fa-scene58-card{width:min(1180px,96vw);height:min(820px,94vh);background:#fff8e8;border:5px solid #0f3564;border-radius:24px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 70px rgba(0,0,0,.55)}
      .fa-scene58-head{height:76px;display:flex;align-items:center;gap:18px;padding:10px 18px;background:linear-gradient(#fff3b8,#f4cf61);border-bottom:4px solid #0f4f9e;flex:0 0 auto}.fa-scene58-badge{background:#123b72;color:white;border-radius:999px;padding:10px 18px;font-weight:900;font-size:18px;white-space:nowrap}.fa-scene58-title{font-size:25px;font-weight:900;flex:1;text-align:center}.fa-scene58-page{font-size:16px;font-weight:800;color:#334e73}
      .fa-scene58-stage{position:relative;flex:1;min-height:0;overflow:hidden;background-size:cover;background-position:center;background-repeat:no-repeat}.fa-scene58-cast{position:absolute;left:2%;right:2%;bottom:-1%;height:83%;display:flex;align-items:flex-end;justify-content:center;gap:.8%;pointer-events:none;z-index:3}.fa-scene58-cast.many{gap:.25%}.fa-scene58-char,.fa-scene58-student{height:66%;max-width:18%;object-fit:contain;object-position:center bottom;filter:drop-shadow(0 8px 7px rgba(0,0,0,.32));transform-origin:center bottom;animation:faIdle60 3.2s ease-in-out infinite}.fa-scene58-cast.many .fa-scene58-char,.fa-scene58-cast.many .fa-scene58-student{height:55%;max-width:14.2%}.fa-scene58-student{height:62%}
      .fa-scene58-prop{position:absolute;object-fit:contain;filter:drop-shadow(0 6px 5px rgba(0,0,0,.28));z-index:2;pointer-events:none}.fa-scene58-prop.p0{width:14%;left:6%;bottom:1%}.fa-scene58-prop.p1{width:13%;right:7%;bottom:2%}.fa-scene58-prop.p2{width:11%;left:25%;bottom:0}.fa-scene58-prop.p3{width:11%;right:26%;bottom:0}.fa-scene58-prop.p4{width:10%;left:46%;bottom:0}
      @keyframes faIdle60{0%,100%{translate:0 0}50%{translate:0 -5px}}.fa-scene58-journal{min-height:162px;background:#fffaf0;border-top:4px solid #102f5e;padding:16px 24px 14px;display:flex;flex-direction:column;justify-content:center}.fa-scene58-text{font-size:27px;line-height:1.3;font-weight:800;text-align:center;max-width:1020px;margin:0 auto 12px}.fa-scene58-actions{display:flex;justify-content:center;gap:18px}.fa-scene58-btn{border:3px solid #153c70;border-radius:14px;padding:10px 23px;background:white;color:#102342;font-size:18px;font-weight:900;cursor:pointer}.fa-scene58-btn.next{background:#f5c646}
      @media(max-width:760px){.fa-scene58-card{width:100vw;height:100vh;border-radius:0;border:0}.fa-scene58-page{display:none}.fa-scene58-text{font-size:21px}.fa-scene58-char,.fa-scene58-student{height:54%;max-width:22%}.fa-scene58-cast.many .fa-scene58-char,.fa-scene58-cast.many .fa-scene58-student{height:43%;max-width:16%}}
    `;document.head.appendChild(s);
  }
  function close(){document.querySelectorAll('.fa-scene58').forEach(n=>n.remove());}
  function open(opts){
    injectStyles();close();
    const root=document.createElement('div');root.className='fa-scene58';const card=document.createElement('div');card.className='fa-scene58-card';
    const head=document.createElement('div');head.className='fa-scene58-head';const badge=document.createElement('div');badge.className='fa-scene58-badge';badge.textContent=opts.badge||'ACADEMY STORY';const title=document.createElement('div');title.className='fa-scene58-title';title.textContent=opts.title||'';const page=document.createElement('div');page.className='fa-scene58-page';page.textContent=`Page ${opts.pageIndex+1} of ${opts.total}`;head.append(badge,title,page);
    const stage=document.createElement('div');stage.className='fa-scene58-stage';stage.style.backgroundImage=`url('${opts.background||environmentFor(opts)}')`;
    propsFor(opts.text).forEach((src,i)=>{const im=document.createElement('img');im.className='fa-scene58-prop p'+i;im.src=src;stage.appendChild(im);});
    const names=castFor(opts.text,opts.pageImage),active=typeof getSave==='function'?getSave():null;const cast=document.createElement('div');cast.className='fa-scene58-cast'+((names.length+(active&&active.avatar?1:0))>=5?' many':'');
    if(active&&active.studentName&&active.avatar&&typeof window.getFritzAvatar==='function'){
      const spec=window.getFritzAvatar(active.avatar);if(spec&&spec.src){const av=document.createElement('img');av.className='fa-scene58-student';av.src=spec.src;av.alt=active.studentName;av.title=active.studentName;cast.appendChild(av);}
    }
    names.forEach(name=>{const spec=CAST[name],img=document.createElement('img');img.className='fa-scene58-char';img.src=spec.src;img.alt=name;img.title=name;img.style.transform=`scale(${spec.scale})`;img.dataset.fallback='0';img.onerror=()=>{if(img.dataset.fallback==='0'&&spec.fallback){img.dataset.fallback='1';img.src=spec.fallback;}else{img.remove();}};cast.appendChild(img);});
    stage.appendChild(cast);
    const journal=document.createElement('div');journal.className='fa-scene58-journal';const txt=document.createElement('div');txt.className='fa-scene58-text';txt.textContent=opts.text||'';const actions=document.createElement('div');actions.className='fa-scene58-actions';const read=document.createElement('button');read.className='fa-scene58-btn';read.textContent='🔊 Read Aloud';read.onclick=()=>opts.onRead&&opts.onRead();const next=document.createElement('button');next.className='fa-scene58-btn next';next.textContent=opts.nextLabel||'Next Page →';next.onclick=()=>{close();opts.onNext&&opts.onNext();};actions.append(read,next);journal.append(txt,actions);card.append(head,stage,journal);root.appendChild(card);document.body.appendChild(root);
  }
  window.FRITZ_SCENE_PRESENTATION={open,close,cast:CAST,environments:ENV,props:PROP};
})();
