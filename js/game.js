class World extends Phaser.Scene {
  constructor(){
    super("World");
  }

  preload(){
    this.load.image("campus","assets/fritz_academy_world_map.png");
    this.load.image("fritz_raw","assets/captain_fritz.png");
    this.load.image("bash_raw","assets/bash.png");
  }

  create(){
    this.save = getSave();
    this.panels = new PanelManager(this);
    this.lessonEngine = new LessonEngine(this);
    this.worldW = 2048;
    this.worldH = 2048;
    this.currentZone = null;
    this.mobileDir = null;
    this.prompt = null;
    this.debugOn = false;
    this.physics.world.setBounds(0,0,this.worldW,this.worldH);
    this.cameras.main.setBounds(0,0,this.worldW,this.worldH);
    this.add.image(this.worldW/2,this.worldH/2,"campus").setDisplaySize(this.worldW,this.worldH).setDepth(0);
    this.makeCleanSprite("fritz_raw","fritz",238);
    this.makeCleanSprite("bash_raw","bash_player",238);
    this.prepareSaveData();
    this.createCollision();
    this.createPlayer();
    this.createCaptainFritz();
    this.createBuildingEntrances();
    this.createHUD();
    this.createMobileControls();
    this.createAdventureLogButton();
    this.keys=this.input.keyboard.addKeys({up:Phaser.Input.Keyboard.KeyCodes.UP,down:Phaser.Input.Keyboard.KeyCodes.DOWN,left:Phaser.Input.Keyboard.KeyCodes.LEFT,right:Phaser.Input.Keyboard.KeyCodes.RIGHT,w:Phaser.Input.Keyboard.KeyCodes.W,a:Phaser.Input.Keyboard.KeyCodes.A,s:Phaser.Input.Keyboard.KeyCodes.S,d:Phaser.Input.Keyboard.KeyCodes.D,space:Phaser.Input.Keyboard.KeyCodes.SPACE,escape:Phaser.Input.Keyboard.KeyCodes.ESC,menu:Phaser.Input.Keyboard.KeyCodes.M});
    this.input.keyboard.on("keydown-ESC",()=>{this.lessonEngine.stopMedia();this.panels.close();});
    this.input.keyboard.on("keydown-B",()=>this.toggleDebug());
    this.cameras.main.startFollow(this.player,true,0.08,0.08);
    this.cameras.main.setZoom(1.02);
    if(!this.save.studentName) this.showStudentSetup();
  }

  prepareSaveData(){
    if(!this.save.unlockedLevels) this.save.unlockedLevels=["1-A"];
    ["1-B","1-C","1-D"].forEach(lessonId=>{if(!this.save.unlockedLevels.includes(lessonId))this.save.unlockedLevels.push(lessonId);});
    if(!this.save.lessonProgress)this.save.lessonProgress={};
    if(!this.save.academyBuilds)this.save.academyBuilds={};
    if(!this.save.currentLevel)this.save.currentLevel="1-A";
    saveGame(this.save);
  }

  makeCleanSprite(sourceKey,newKey,whiteCutoff){
    const source=this.textures.get(sourceKey).getSourceImage();
    const temporaryCanvas=document.createElement("canvas");temporaryCanvas.width=source.width;temporaryCanvas.height=source.height;
    const temporaryContext=temporaryCanvas.getContext("2d");temporaryContext.drawImage(source,0,0);
    const imageData=temporaryContext.getImageData(0,0,source.width,source.height),pixels=imageData.data;
    let minX=source.width,minY=source.height,maxX=0,maxY=0;
    for(let y=0;y<source.height;y++){for(let x=0;x<source.width;x++){const index=(y*source.width+x)*4,red=pixels[index],green=pixels[index+1],blue=pixels[index+2];if(red>whiteCutoff&&green>whiteCutoff&&blue>whiteCutoff)pixels[index+3]=0;if(pixels[index+3]>20){minX=Math.min(minX,x);minY=Math.min(minY,y);maxX=Math.max(maxX,x);maxY=Math.max(maxY,y);}}}
    temporaryContext.putImageData(imageData,0,0);const padding=8;minX=Math.max(0,minX-padding);minY=Math.max(0,minY-padding);maxX=Math.min(source.width,maxX+padding);maxY=Math.min(source.height,maxY+padding);const cropWidth=maxX-minX,cropHeight=maxY-minY;const canvasTexture=this.textures.createCanvas(newKey,cropWidth,cropHeight),context=canvasTexture.getContext();context.drawImage(temporaryCanvas,minX,minY,cropWidth,cropHeight,0,0,cropWidth,cropHeight);canvasTexture.refresh();
  }

  createPlayer(){
    const startX=1080,startY=1810;
    this.playerShadow=this.add.ellipse(startX,startY+27,35,13,0x000000,0.28).setDepth(startY-1);
    /* The player moves through the Academy with Bash, the team's natural leader. Captain Fritz remains the mentor NPC. */
    this.player=this.physics.add.image(startX,startY,"bash_player").setScale(0.036).setDepth(startY);
    this.player.body.setCollideWorldBounds(true);this.player.body.setSize(38,52);this.physics.add.collider(this.player,this.walls);
  }

  createCaptainFritz(){
    const x=1015,y=1740;
    this.captainFritz=this.add.image(x,y,"fritz").setScale(0.052).setDepth(y).setInteractive({useHandCursor:true,pixelPerfect:true,alphaTolerance:10});
    this.captainBubble=this.add.text(x,y-78,"💬",{fontSize:"25px"}).setOrigin(0.5).setDepth(y+1).setInteractive({useHandCursor:true});
    const speak=()=>{const name=this.save.studentName||"Academy Student";this.panels.message("Captain Fritz",`Hello, ${name}! The Greenhouse holds your first Academy adventure.`);};
    this.captainFritz.on("pointerup",speak);this.captainBubble.on("pointerup",speak);
  }

  createCollision(){
    this.walls=this.physics.add.staticGroup();this.debugRects=[];
    const barriers=[[780,1335,480,250],[630,1510,230,190],[1010,1490,150,150],[315,390,620,590],[160,1450,320,360],[370,1285,170,240],[1235,1030,180,650],[1680,1420,510,500],[1840,1770,260,260]];
    barriers.forEach(([x,y,width,height])=>{const zone=this.add.zone(x,y,width,height);this.physics.add.existing(zone,true);this.walls.add(zone);const rect=this.add.rectangle(x,y,width,height,0xff0000,0.18).setDepth(9999).setVisible(false);this.debugRects.push(rect);});
  }

  createBuildingEntrances(){
    const entrances=[
      {name:"Greenhouse",x:705,y:1620,w:160,h:120,level:"1-A"},
      {name:"Library",x:1115,y:1390,w:160,h:120,level:"1-B"},
      {name:"Music Box",x:1515,y:1390,w:170,h:120,level:"1-C"},
      {name:"Builder Hall",x:1770,y:1660,w:170,h:120,level:"1-D"}
    ];
    this.entrances=[];
    entrances.forEach(info=>{const zone=this.add.zone(info.x,info.y,info.w,info.h);this.physics.add.existing(zone,true);zone.info=info;this.entrances.push(zone);});
  }

  createHUD(){
    this.hud=this.add.text(18,18,"",{fontSize:"18px",fontStyle:"bold",color:"#ffffff",backgroundColor:"#102342",padding:{x:12,y:8}}).setScrollFactor(0).setDepth(10000);this.refreshHUD();
  }
  refreshHUD(){const name=this.save.studentName||"Academy Student";this.hud.setText(`${name}   ⭐ ${Number(this.save.stars)||0}   XP ${Number(this.save.xp)||0}`);}
  createAdventureLogButton(){this.logButton=this.add.text(18,62,"Adventure Log",{fontSize:"17px",fontStyle:"bold",color:"#102342",backgroundColor:"#f6c744",padding:{x:12,y:8}}).setScrollFactor(0).setDepth(10000).setInteractive({useHandCursor:true});this.logButton.on("pointerup",()=>this.showAdventureLog());}
  showAdventureLog(){const levels=Array.isArray(LEVELS)?LEVELS:[],completed=this.save.completed||{},next=levels.find(l=>l&&this.save.unlockedLevels.includes(l.id)&&!completed[l.id]);const body=next?`Next adventure: ${next.title}\n\nFind its Academy entrance and keep the story moving.`:"Every available adventure is complete.";this.panels.message("Adventure Log",body);}
  createMobileControls(){
    const style={fontSize:"31px",fontStyle:"bold",color:"#102342",backgroundColor:"rgba(246,199,68,.92)",padding:{x:12,y:8}};
    const make=(x,y,label,dir)=>{const b=this.add.text(x,y,label,style).setOrigin(.5).setScrollFactor(0).setDepth(10000).setInteractive({useHandCursor:true});b.on("pointerdown",()=>this.mobileDir=dir);b.on("pointerup",()=>this.mobileDir=null);b.on("pointerout",()=>{if(this.mobileDir===dir)this.mobileDir=null;});return b;};
    make(82,window.innerHeight?520:520,"▲","up");make(82,600,"▼","down");make(34,560,"◀","left");make(130,560,"▶","right");
  }
  showStudentSetup(){if(typeof StudentProfileEngine!=="undefined"){this.studentProfileEngine=new StudentProfileEngine(this);this.studentProfileEngine.showChooser();}}
  toggleDebug(){this.debugOn=!this.debugOn;this.debugRects.forEach(r=>r.setVisible(this.debugOn));}
  update(){
    if(!this.player||!this.keys)return;let vx=0,vy=0;const speed=190;
    if(this.keys.left.isDown||this.keys.a.isDown||this.mobileDir==="left")vx=-speed;if(this.keys.right.isDown||this.keys.d.isDown||this.mobileDir==="right")vx=speed;if(this.keys.up.isDown||this.keys.w.isDown||this.mobileDir==="up")vy=-speed;if(this.keys.down.isDown||this.keys.s.isDown||this.mobileDir==="down")vy=speed;
    this.player.setVelocity(vx,vy);if(vx&&vy)this.player.setVelocity(vx*.707,vy*.707);this.player.setDepth(this.player.y);this.playerShadow.setPosition(this.player.x,this.player.y+27).setDepth(this.player.y-1);
    let nearest=null,nearestDistance=Infinity;this.entrances.forEach(zone=>{const d=Phaser.Math.Distance.Between(this.player.x,this.player.y,zone.x,zone.y);if(d<nearestDistance){nearestDistance=d;nearest=zone;}});
    if(nearest&&nearestDistance<135){if(!this.prompt){this.prompt=this.add.text(this.scale.width/2,this.scale.height-52,"SPACE / TAP: Enter Adventure",{fontSize:"19px",fontStyle:"bold",color:"#102342",backgroundColor:"#f6c744",padding:{x:14,y:8}}).setOrigin(.5).setScrollFactor(0).setDepth(10001).setInteractive({useHandCursor:true});this.prompt.on("pointerup",()=>this.enterEntrance(nearest));}if(Phaser.Input.Keyboard.JustDown(this.keys.space))this.enterEntrance(nearest);}else if(this.prompt){this.prompt.destroy();this.prompt=null;}
  }
  enterEntrance(zone){const levelId=zone.info.level;if(!this.save.unlockedLevels.includes(levelId)){this.panels.message("Adventure Locked","Complete the earlier adventure first.");return;}const lesson=LEVELS.find(l=>l&&l.id===levelId);if(lesson)this.lessonEngine.start(lesson);}
}

const config={type:Phaser.AUTO,parent:"game",width:960,height:640,backgroundColor:"#071426",physics:{default:"arcade",arcade:{debug:false}},scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},scene:[World]};
window.FRITZ_GAME=new Phaser.Game(config);