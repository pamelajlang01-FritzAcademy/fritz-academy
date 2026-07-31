/* Fritz Academy 51.8 — authored question images, no emoji placeholders */
(function(){
  "use strict";

  if(typeof findLevel==="function"){
    const lesson=findLevel("1-D");
    if(lesson){
      lesson.feelingChoices=[
        {id:"happy",label:"I am happy.",image:"assets/feelings/happy-face.svg"},
        {id:"tired",label:"I am tired.",image:"assets/feelings/tired-face.svg"},
        {id:"excited",label:"I am excited.",image:"assets/feelings/excited-face.svg"}
      ];
      lesson.feelingsActivity={
        title:"How Do You Feel?",
        instructions:"Look at each face. Choose the matching sentence.",
        questions:[
          {prompt:"How does this student feel?",image:"assets/feelings/happy-face.svg",options:["I am happy.","I am tired.","I am excited."],answer:"I am happy."},
          {prompt:"How does this student feel?",image:"assets/feelings/tired-face.svg",options:["I am excited.","I am tired.","I am happy."],answer:"I am tired."},
          {prompt:"How does this student feel?",image:"assets/feelings/excited-face.svg",options:["I am tired.","I am happy.","I am excited."],answer:"I am excited."}
        ]
      };
    }
  }

  if(typeof QuestionEngine==="undefined") return;

  QuestionEngine.prototype.normalizeQuestion=function(question){
    const source=question||{};
    return {
      prompt:source.prompt||source.question||"Choose the best answer.",
      options:Array.isArray(source.options)?source.options:[],
      answer:source.answer,
      image:source.image||"",
      emoji:"",
      explanation:source.explanation||""
    };
  };

  QuestionEngine.prototype.showQuestion=function(){
    const raw=this.questions[this.index];
    if(!raw){this.finish();return;}
    const question=this.normalizeQuestion(raw);
    if(question.options.length===0||typeof question.answer==="undefined"){
      this.index++;this.showQuestion();return;
    }

    const render=(imageKey)=>{
      const objects=[];
      const title=this.scene.add.text(0,-215,this.title,{fontSize:"30px",fontStyle:"bold",color:"#102342",align:"center",wordWrap:{width:680}}).setOrigin(.5);
      objects.push(title);
      if(this.options.showProgress){
        objects.push(this.scene.add.text(0,-178,`Question ${this.index+1} of ${this.questions.length}`,{fontSize:"18px",fontStyle:"bold",color:"#46566f"}).setOrigin(.5));
      }
      let promptY=-90;
      let startY=20;
      if(imageKey){
        const image=this.scene.add.image(0,-70,imageKey).setOrigin(.5);
        const scale=Math.min(350/image.width,210/image.height,1);
        image.setScale(scale);
        objects.push(image);
        promptY=65;
        startY=115;
      }
      objects.push(this.scene.add.text(0,promptY,question.prompt,{fontSize:"25px",fontStyle:"bold",color:"#102342",align:"center",wordWrap:{width:660}}).setOrigin(.5));
      const count=question.options.length;
      const gap=count>3?46:54;
      question.options.forEach((option,i)=>{
        objects.push(this.scene.panels.makeButton(0,startY+i*gap,String(option),()=>this.checkAnswer(option,question),{fontSize:count>3?19:"20px",padding:{x:22,y:7}}));
      });
      this.scene.panels.open(objects,{width:this.options.width,height:imageKey?620:this.options.height});
    };

    if(!question.image){render(null);return;}
    const key=`question-${this.lessonEngine.levelId||"lesson"}-${this.index}-${question.image.split('/').pop().replace(/\W/g,'-')}`;
    if(this.scene.textures.exists(key)){render(key);return;}
    const complete=`filecomplete-svg-${key}`;
    const done=()=>{this.scene.load.off("loaderror",failed);render(key);};
    const failed=(file)=>{if(file&&file.key===key){this.scene.load.off(complete,done);render(null);}};
    this.scene.load.once(complete,done);
    this.scene.load.once("loaderror",failed);
    this.scene.load.svg(key,question.image);
    this.scene.load.start();
  };
})();
