/* Fritz Academy pacing bridge: keep the complete game episode inside the 20–25 minute ceiling without removing core modes. */
(function(){
  if(typeof LessonEngine==='undefined')return;

  /* Reward pieces should feel rewarding without adding five separate stop screens per episode. */
  LessonEngine.prototype.rewardPiece=function(piece,message,callback){
    if(piece)this.earnPiece(piece);
    const cb=typeof callback==='function'?callback:function(){};
    const title=this.scene.add.text(0,-105,'Builder Piece Earned!',{fontSize:'29px',fontStyle:'bold',color:'#102342'}).setOrigin(.5);
    const icon=this.scene.add.text(-190,10,(piece&&piece.icon)||'⭐',{fontSize:'54px'}).setOrigin(.5);
    const name=this.scene.add.text(35,-5,(piece&&piece.name)||'Academy Piece',{fontSize:'25px',fontStyle:'bold',color:'#174ea6',align:'center',wordWrap:{width:430}}).setOrigin(.5);
    const body=this.scene.add.text(35,55,message||'Added to your Builder Pack.',{fontSize:'18px',fontStyle:'bold',color:'#102342',align:'center',wordWrap:{width:430}}).setOrigin(.5);
    const next=this.scene.panels.makeButton(0,135,'Keep Going',cb,{fontSize:'19px',padding:{x:22,y:8}});
    this.scene.panels.open([title,icon,name,body,next],{width:700,height:390});
  };

  /* Correct answers should advance immediately. Wrong answers get one compact retry screen. */
  LessonEngine.prototype.showCorrectAnswer=function(titleText,answer,callback){
    if(typeof callback==='function')callback();
  };
  LessonEngine.prototype.showTryAgain=function(callback){
    const title=this.scene.add.text(0,-45,'Try That Again',{fontSize:'31px',fontStyle:'bold',color:'#b5462d'}).setOrigin(.5);
    const body=this.scene.add.text(0,20,'Use the clue and choose again.',{fontSize:'21px',fontStyle:'bold',color:'#102342'}).setOrigin(.5);
    const next=this.scene.panels.makeButton(0,95,'Try Again',callback,{fontSize:'19px',padding:{x:20,y:7}});
    this.scene.panels.open([title,body,next],{width:600,height:280});
  };

  window.FRITZ_PACING={targetMinutes:20,hardCeilingMinutes:25,policy:'core modes stay; redundant transition screens are removed'};
})();