/* Fritz Academy reward flow 51.5 */
(function(){
  "use strict";
  if(typeof LessonEngine==="undefined") return;

  const originalFeelingQuestion=LessonEngine.prototype.showFeelingQuestion;
  LessonEngine.prototype.showFeelingQuestion=function(){
    const activity=this.lesson&&this.lesson.feelingsActivity;
    const question=activity&&Array.isArray(activity.questions)?activity.questions[this.questionIndex]:null;
    if(activity&&!question&&!activity.rewardPiece){
      this.startStory();
      return;
    }
    return originalFeelingQuestion.call(this);
  };

  LessonEngine.prototype.rewardPiece=function(piece,message,callback){
    if(!piece||!piece.id){
      if(typeof callback==="function")callback();
      return;
    }
    this.earnPiece(piece);

    const title=this.scene.add.text(0,-165,"Build Piece Earned!",{fontSize:"34px",fontStyle:"bold",color:"#102342"}).setOrigin(.5);
    const objects=[title];

    if(piece.image&&this.scene.textures&&this.scene.textures.exists(piece.image)){
      const image=this.scene.add.image(0,-65,piece.image).setOrigin(.5);
      image.setDisplaySize(150,150);
      objects.push(image);
    }else if(piece.image){
      const key=`reward-${String(piece.id).replace(/[^a-z0-9_-]/gi,"-")}`;
      if(!this.scene.textures.exists(key)) this.scene.load.image(key,piece.image);
      const addImage=()=>{
        if(!this.scene.textures.exists(key))return;
        const image=this.scene.add.image(0,-65,key).setOrigin(.5).setDisplaySize(150,150);
        objects.splice(1,0,image);
      };
      if(this.scene.load.isLoading()) this.scene.load.once(`filecomplete-image-${key}`,addImage);
      else {this.scene.load.once(`filecomplete-image-${key}`,addImage);this.scene.load.start();}
    }else{
      objects.push(this.scene.add.text(0,-65,piece.icon||"",{fontSize:"72px"}).setOrigin(.5));
    }

    const name=this.scene.add.text(0,35,piece.name||"Builder Piece",{fontSize:"29px",fontStyle:"bold",color:"#174ea6"}).setOrigin(.5);
    const body=this.scene.add.text(0,92,message||"You earned a new Builder piece!",{fontSize:"21px",fontStyle:"bold",color:"#102342",align:"center",wordWrap:{width:620}}).setOrigin(.5);
    const next=this.scene.panels.makeButton(0,175,"Add to Builder Pack",callback);
    objects.push(name,body,next);
    this.scene.panels.open(objects,{width:720,height:520});
  };
})();
