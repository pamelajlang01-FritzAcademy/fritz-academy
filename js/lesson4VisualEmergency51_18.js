/* Fritz Academy 51.18 — emergency visual repair for Lesson 4 */
(function(){
  "use strict";

  const CHARACTERS={
    tony:"assets/tony.png", bash:"assets/bash.png", bear:"assets/bear.png",
    nola:"assets/nola.png", rascal:"assets/rascal.png", fritz:"assets/captain_fritz.png"
  };
  const PAIRS=[["tony","bash"],["bear","nola"],["nola","fritz"],["rascal","fritz"],["bash","fritz"],["tony","fritz"]];
  const OBJECTS=["🔑","📦","🏫","🕒","🔒","🔑"];
  const CLEAN_CACHE=new Map();

  function isLesson4(host){return host&&host.lesson&&host.lesson.id==="1-D";}
  function clear(){document.querySelectorAll('.l4p-overlay,.l4-scene-card,.l418-overlay,.biw').forEach(n=>n.remove());}
  function installStyles(){
    if(document.getElementById('l418-style')) return;
    const s=document.createElement('style');
    s.id='l418-style';
    s.textContent=`
      .l418-overlay{position:fixed;inset:0;z-index:300000;background:#071426df;display:grid;place-items:center;padding:10px;font-family:Arial,sans-serif}
      .l418-shell{width:min(1050px,97vw);height:min(790px,96vh);background:#fffdf4;border:6px solid #102342;border-radius:22px;overflow:hidden;display:grid;grid-template-rows:auto 1fr auto;box-shadow:0 20px 60px #0008}
      .l418-head{text-align:center;padding:13px 18px;font-size:26px;font-weight:900;color:#102342;background:#fff4c8;border-bottom:3px solid #174ea6}
      .l418-main{display:grid;grid-template-rows:minmax(360px,1fr) auto;min-height:0}
      .l418-art{position:relative;overflow:hidden;margin:16px 22px 8px;border:5px solid #174ea6;border-radius:18px;background:url('assets/environments/welcome-garden-open.svg') center/cover no-repeat}
      .l418-character{position:absolute;bottom:0;height:84%;max-width:39%;object-fit:contain;object-position:center bottom;filter:drop-shadow(0 10px 8px #0005)}
      .l418-left{left:5%}.l418-right{right:5%}
      .l418-object{position:absolute;left:50%;top:49%;transform:translate(-50%,-50%);font-size:82px;filter:drop-shadow(0 8px 5px #0005)}
      .l418-caption{font-size:29px;line-height:1.25;font-weight:900;color:#102342;text-align:center;padding:12px 28px 15px}
      .l418-foot{display:flex;justify-content:center;gap:24px;padding:13px;border-top:3px solid #102342;background:#fff}
      .l418-foot button{padding:12px 28px;border:3px solid #102342;border-radius:10px;font-size:22px;font-weight:900;color:#102342;background:#fff}.l418-foot .next{background:#ffc63d}
      .l418-builder{position:fixed;inset:0;z-index:310000;background:#071426ed;display:grid;place-items:center;padding:10px;font-family:Arial,sans-serif}
      .l418-builder-shell{width:min(1220px,98vw);height:min(790px,97vh);background:#fff;border:6px solid #f6c744;border-radius:24px;overflow:hidden;display:grid;grid-template-rows:auto 1fr auto}
      .l418-builder-head{padding:12px 18px;background:#fff7cf;border-bottom:3px solid #174ea6}.l418-builder-head h2{margin:0;color:#102342}
      .l418-builder-main{display:grid;grid-template-columns:250px 1fr;min-height:0}.l418-tray{padding:12px;background:#edf5ff;border-right:3px solid #174ea6;overflow:auto}
      .l418-piece{width:100%;display:grid;grid-template-columns:80px 1fr;align-items:center;gap:8px;padding:8px;margin-bottom:9px;border:3px solid #9fb3c8;border-radius:14px;background:#fff;font-weight:900;text-align:left}.l418-piece img{width:76px;height:76px;object-fit:contain}
      .l418-stage{position:relative;overflow:hidden;background:url('assets/environments/question-garden-premium.svg') center/cover no-repeat;touch-action:none}
      .l418-placed{position:absolute;transform:translate(-50%,-50%);width:155px;height:155px;cursor:grab;touch-action:none;filter:drop-shadow(0 10px 8px #0005)}.l418-placed img{width:100%;height:100%;object-fit:contain}
      .l418-label{position:absolute;left:50%;bottom:-18px;transform:translateX(-50%);white-space:nowrap;background:#ffffffe8;border:2px solid #174ea6;border-radius:8px;padding:3px 7px;font-size:12px;font-weight:900}
      .l418-builder-foot{padding:10px;display:flex;justify-content:center;gap:10px;border-top:3px solid #174ea6}.l418-builder-foot button{padding:10px 18px;border:3px solid #102342;border-radius:12px;font-weight:900;background:#fff}.l418-builder-foot .primary{background:#f6c744}
      @media(max-width:700px){.l418-shell{height:94vh}.l418-character{height:70%;max-width:45%}.l418-caption{font-size:21px}.l418-builder-main{grid-template-columns:1fr;grid-template-rows:150px 1fr}.l418-tray{display:flex;gap:8px;overflow:auto;border-right:0;border-bottom:3px solid #174ea6}.l418-piece{min-width:200px}}
    `;
    document.head.appendChild(s);
  }

  async function cleanCharacter(src){
    if(CLEAN_CACHE.has(src)) return CLEAN_CACHE.get(src);
    const promise=new Promise(resolve=>{
      const img=new Image();
      img.onload=()=>{
        try{
          const c=document.createElement('canvas'); c.width=img.naturalWidth; c.height=img.naturalHeight;
          const ctx=c.getContext('2d',{willReadFrequently:true}); ctx.drawImage(img,0,0);
          const data=ctx.getImageData(0,0,c.width,c.height),p=data.data,w=c.width,h=c.height;
          const seen=new Uint8Array(w*h),q=[];
          const seed=(x,y)=>{const i=(y*w+x)*4;q.push([x,y,p[i],p[i+1],p[i+2]]);};
          for(let x=0;x<w;x+=Math.max(1,Math.floor(w/60))){seed(x,0);seed(x,h-1);} for(let y=0;y<h;y+=Math.max(1,Math.floor(h/60))){seed(0,y);seed(w-1,y);}
          while(q.length){const [x,y,sr,sg,sb]=q.pop(),idx=y*w+x;if(seen[idx])continue;seen[idx]=1;const i=idx*4,r=p[i],g=p[i+1],b=p[i+2],a=p[i+3];const bright=(r+g+b)/3,spread=Math.max(r,g,b)-Math.min(r,g,b),dist=Math.hypot(r-sr,g-sg,b-sb);if(!(a<20||dist<42||(bright>225&&spread<35)))continue;p[i+3]=0;if(x>0)q.push([x-1,y,sr,sg,sb]);if(x<w-1)q.push([x+1,y,sr,sg,sb]);if(y>0)q.push([x,y-1,sr,sg,sb]);if(y<h-1)q.push([x,y+1,sr,sg,sb]);}
          ctx.putImageData(data,0,0); resolve(c.toDataURL('image/png'));
        }catch(e){resolve(src);}
      };
      img.onerror=()=>resolve(src); img.src=src;
    });
    CLEAN_CACHE.set(src,promise); return promise;
  }

  async function render(host,section,index,onNext,nextLabel){
    installStyles(); clear();
    const raw=section.pages[index],page=typeof raw==='string'?{text:raw}:(raw||{}),pair=PAIRS[index%6];
    const ov=document.createElement('div');ov.className='l418-overlay';
    const sh=document.createElement('section');sh.className='l418-shell';
    const hd=document.createElement('header');hd.className='l418-head';hd.textContent=`${section.title} — Page ${index+1} of ${section.pages.length}`;
    const main=document.createElement('main');main.className='l418-main';
    const art=document.createElement('div');art.className='l418-art';
    const left=document.createElement('img');left.className='l418-character l418-left';left.alt='';
    const right=document.createElement('img');right.className='l418-character l418-right';right.alt='';
    const object=document.createElement('div');object.className='l418-object';object.textContent=OBJECTS[index%6];
    art.append(left,right,object);
    const caption=document.createElement('div');caption.className='l418-caption';caption.textContent=host.lessonEngine.replaceName(page.text||'');
    const foot=document.createElement('footer');foot.className='l418-foot';
    const read=document.createElement('button');read.textContent='Read Aloud';read.onclick=()=>host.lessonEngine.speakText(host.lessonEngine.replaceName(page.text||''));
    const next=document.createElement('button');next.className='next';next.textContent=nextLabel;next.onclick=()=>{ov.remove();onNext();};
    foot.append(read,next);main.append(art,caption);sh.append(hd,main,foot);ov.appendChild(sh);document.body.appendChild(ov);
    left.src=await cleanCharacter(CHARACTERS[pair[0]]); right.src=await cleanCharacter(CHARACTERS[pair[1]]);
  }

  if(window.StoryEngine){
    StoryEngine.prototype.showPage=function(){
      if(!isLesson4(this)) return;
      if(this.pageIndex>=this.story.pages.length){this.startQuestions();return;}
      const last=this.pageIndex===this.story.pages.length-1;
      render(this,this.story,this.pageIndex,()=>{this.pageIndex++;this.showPage();},last?'Story Questions':'Next Page');
    };
  }
  if(window.ReaderEngine){
    ReaderEngine.prototype.showPage=function(){
      if(!isLesson4(this)) return;
      if(this.pageIndex>=this.reader.pages.length){this.startCheck();return;}
      const last=this.pageIndex===this.reader.pages.length-1;
      render(this,this.reader,this.pageIndex,()=>{this.pageIndex++;this.showPage();},last?'Reader Questions':'Next Page');
    };
  }

  if(window.BuilderEngine){
    BuilderEngine.prototype.showBuilder=function(){
      if(!(this.lessonEngine&&this.lessonEngine.lesson&&this.lessonEngine.lesson.id==='1-D')) return;
      installStyles();clear();
      const pieces=[
        {id:this.build.requiredPieces[0],name:'Question Garden Sign',image:'assets/objects/question-sign-premium.svg'},
        {id:this.build.requiredPieces[1],name:'Question Flower Bed',image:'assets/objects/question-flower-bed-premium.svg'},
        {id:this.build.requiredPieces[2],name:'Question Lantern',image:'assets/objects/question-lantern-premium.svg'}
      ];
      const save=this.scene.save;save.builderWorlds=save.builderWorlds||{};const placed=save.builderWorlds[this.build.areaId]||(save.builderWorlds[this.build.areaId]={});let selected='';
      const ov=document.createElement('div');ov.className='l418-builder';const shell=document.createElement('section');shell.className='l418-builder-shell';
      const head=document.createElement('header');head.className='l418-builder-head';head.innerHTML='<h2>Build the Question Garden</h2>';
      const main=document.createElement('div');main.className='l418-builder-main';const tray=document.createElement('aside');tray.className='l418-tray';const stage=document.createElement('div');stage.className='l418-stage';
      const renderBuilder=()=>{tray.innerHTML='';stage.innerHTML='';pieces.forEach(p=>{const b=document.createElement('button');b.className='l418-piece';b.innerHTML=`<img src="${p.image}" alt=""><span>${p.name}</span>`;b.onclick=()=>selected=p.id;tray.appendChild(b);if(placed[p.id]){const o=document.createElement('div');o.className='l418-placed';o.style.left=placed[p.id].x+'%';o.style.top=placed[p.id].y+'%';o.innerHTML=`<img src="${p.image}" alt=""><span class="l418-label">${p.name}</span>`;let drag=false;o.onpointerdown=e=>{drag=true;o.setPointerCapture?.(e.pointerId)};o.onpointermove=e=>{if(!drag)return;const r=stage.getBoundingClientRect();placed[p.id]={x:Math.max(8,Math.min(92,(e.clientX-r.left)/r.width*100)),y:Math.max(12,Math.min(90,(e.clientY-r.top)/r.height*100))};o.style.left=placed[p.id].x+'%';o.style.top=placed[p.id].y+'%'};o.onpointerup=()=>{drag=false;saveGame(save)};stage.appendChild(o);}})};
      stage.onclick=e=>{if(!selected||e.target!==stage)return;const r=stage.getBoundingClientRect();placed[selected]={x:(e.clientX-r.left)/r.width*100,y:(e.clientY-r.top)/r.height*100};saveGame(save);renderBuilder();};renderBuilder();
      const foot=document.createElement('footer');foot.className='l418-builder-foot';const later=document.createElement('button');later.textContent='Keep Building Later';later.onclick=()=>ov.remove();const finish=document.createElement('button');finish.className='primary';finish.textContent='Finish This Build';finish.onclick=()=>{if(!pieces.every(p=>placed[p.id])){alert('Place all three pieces first.');return;}ov.remove();this.completeBuild();};foot.append(later,finish);main.append(tray,stage);shell.append(head,main,foot);ov.appendChild(shell);document.body.appendChild(ov);
    };
  }
})();