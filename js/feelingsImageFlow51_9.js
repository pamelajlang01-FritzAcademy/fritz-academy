/* Fritz Academy 51.9 — render authored feeling images in the legacy feelings flow */
(function(){
  "use strict";
  if(typeof LessonEngine==="undefined") return;

  LessonEngine.prototype.showFeelingQuestion=function(){
    const activity=this.lesson&&this.lesson.feelingsActivity;
    const question=activity&&activity.questions&&activity.questions[this.questionIndex];

    if(!question){
      if(activity&&activity.rewardPiece){
        this.rewardPiece(activity.rewardPiece,"You matched the feelings!",()=>this.startStory());
      }else{
        this.startStory();
      }
      return;
    }

    const render=(imageKey)=>{
      const objects=[];
      objects.push(this.scene.add.text(0,-205,`Question ${this.questionIndex+1} of ${activity.questions.length}`,{
        fontSize:"19px",fontStyle:"bold",color:"#46566f"
      }).setOrigin(.5));

      let promptY=-70;
      let optionStart=20;
      if(imageKey){
        const image=this.scene.add.image(0,-95,imageKey).setOrigin(.5);
        const scale=Math.min(330/image.width,210/image.height,1);
        image.setScale(scale);
        objects.push(image);
        promptY=55;
        optionStart=115;
      }

      objects.push(this.scene.add.text(0,promptY,question.prompt||"How does this student feel?",{
        fontSize:"25px",fontStyle:"bold",color:"#102342",align:"center",wordWrap:{width:660}
      }).setOrigin(.5));

      const options=Array.isArray(question.options)?question.options:[];
      const gap=54;
      options.forEach((option,index)=>{
        objects.push(this.scene.panels.makeButton(0,optionStart+index*gap,String(option),()=>{
          if(option===question.answer){
            this.correctAnswers++;
            this.questionIndex++;
            this.showCorrectAnswer("Correct!",question.answer,()=>this.showFeelingQuestion());
          }else{
            this.showTryAgain(()=>this.showFeelingQuestion());
          }
        },{fontSize:"20px",padding:{x:22,y:7}}));
      });

      this.scene.panels.open(objects,{width:780,height:imageKey?620:540});
    };

    const path=String(question.image||"").trim();
    if(!path){render(null);return;}

    const key=`feeling-${this.levelId||"lesson"}-${this.questionIndex}-${path.split('/').pop().replace(/\W/g,'-')}`;
    if(this.scene.textures.exists(key)){render(key);return;}

    const isSvg=/\.svg(?:$|\?)/i.test(path);
    const complete=`filecomplete-${isSvg?"svg":"image"}-${key}`;
    const done=()=>{this.scene.load.off("loaderror",failed);render(key);};
    const failed=(file)=>{if(file&&file.key===key){this.scene.load.off(complete,done);render(null);}};
    this.scene.load.once(complete,done);
    this.scene.load.once("loaderror",failed);
    if(isSvg)this.scene.load.svg(key,path);else this.scene.load.image(key,path);
    this.scene.load.start();
  };
})();
