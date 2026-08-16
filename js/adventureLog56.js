/* Fritz Academy data-driven Adventure Log v56 */
World.prototype.showAdventureLog=function(){
  const unlocked=Array.isArray(this.save.unlockedLevels)?this.save.unlockedLevels:["1-A"];
  const title=this.add.text(0,-285,"Fritz Academy Adventure Log",{fontSize:"30px",fontStyle:"bold",color:"#102342"}).setOrigin(.5);
  const rows=[];
  const levels=Array.isArray(LEVELS)?LEVELS:[];
  const visible=levels.slice(0,9);
  let y=-225;
  visible.forEach(level=>{
    const completed=Boolean((this.save.completed||{})[level.id]);
    const current=level.id===this.save.currentLevel;
    const isUnlocked=unlocked.includes(level.id);
    let prefix=isUnlocked?"○":"🔒";
    if(completed) prefix="✅";
    if(current) prefix="▶";
    const row=this.add.text(0,y,`${prefix} ${level.chapter} • ${level.id}: ${level.title}`,{
      fontSize:"18px",fontStyle:"bold",color:current?"#ffffff":"#102342",backgroundColor:current?"#174ea6":"#ffffff",padding:{x:14,y:6},fixedWidth:710,align:"left"
    }).setOrigin(.5);
    if(isUnlocked){
      row.setInteractive({useHandCursor:true});
      row.on("pointerup",()=>this.startLevel(level.id,"Adventure Log"));
    }
    rows.push(row);y+=46;
  });
  const hint=this.add.text(0,215,"Complete each game session to unlock the next Academy adventure.",{fontSize:"17px",color:"#46566f"}).setOrigin(.5);
  const close=this.panels.makeButton(0,260,"Close",()=>this.panels.close());
  this.panels.open([title,...rows,hint,close],{width:840,height:650});
};