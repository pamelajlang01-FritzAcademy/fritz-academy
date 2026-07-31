/* Fritz Academy 51.10 — labeled greeting charts for feelings and activities */
(function(){
  "use strict";
  if(typeof LessonEngine==="undefined") return;

  const originalShowGreeting=LessonEngine.prototype.showGreeting;
  const feelingChoices=[
    {id:"happy",label:"I am happy."},
    {id:"tired",label:"I am tired."},
    {id:"excited",label:"I am excited."},
    {id:"sad",label:"I am sad."},
    {id:"angry",label:"I am angry."},
    {id:"nervous",label:"I am nervous."}
  ];
  const activityChoices=[
    {id:"played",label:"I played."},
    {id:"read",label:"I read."},
    {id:"watched-tv",label:"I watched TV."},
    {id:"studied",label:"I studied."},
    {id:"ate",label:"I ate."},
    {id:"slept",label:"I slept."}
  ];

  function loadSvg(engine,key,path,callback){
    if(engine.scene.textures.exists(key)){callback(key);return;}
    const complete=`filecomplete-svg-${key}`;
    const done=()=>{engine.scene.load.off("loaderror",failed);callback(key);};
    const failed=(file)=>{if(file&&file.key===key){engine.scene.load.off(complete,done);callback(null);}};
    engine.scene.load.once(complete,done);
    engine.scene.load.once("loaderror",failed);
    engine.scene.load.svg(key,path);
    engine.scene.load.start();
  }

  function showChoiceChart(engine,config){
    loadSvg(engine,config.key,config.image,(imageKey)=>{
      const objects=[];
      objects.push(engine.scene.add.text(0,-292,config.title,{fontSize:"30px",fontStyle:"bold",color:"#102342",align:"center",wordWrap:{width:780}}).setOrigin(.5));
      if(imageKey){
        const image=engine.scene.add.image(0,-82,imageKey).setOrigin(.5);
        const scale=Math.min(650/image.width,360/image.height,1);
        image.setScale(scale);
        objects.push(image);
      }
      const xs=[-245,0,245];
      const ys=[155,220];
      config.choices.forEach((choice,index)=>{
        const x=xs[index%3];
        const y=ys[Math.floor(index/3)];
        objects.push(engine.scene.panels.makeButton(x,y,choice.label,()=>config.onChoose(choice),{fontSize:"19px",padding:{x:14,y:8}}));
      });
      engine.scene.panels.open(objects,{width:900,height:680});
    });
  }

  LessonEngine.prototype.showGreeting=function(index){
    if(this.levelId!=="1-D" || index!==3){
      return originalShowGreeting.call(this,index);
    }
    this.setSection("greeting-feelings-chart");
    showChoiceChart(this,{
      key:"fritz-feelings-chart-51-10",
      image:"assets/charts/feelings-chart.svg",
      title:`Captain Fritz: How are you today, ${this.studentName}?`,
      choices:feelingChoices,
      onChoose:(choice)=>{
        this.progress().feeling=choice.id;
        saveGame(this.scene.save);
        this.showGreetingFeelingAnswer(choice);
      }
    });
  };

  LessonEngine.prototype.showGreetingFeelingAnswer=function(choice){
    const title=this.scene.add.text(0,-125,"Great speaking!",{fontSize:"36px",fontStyle:"bold",color:"#2f7d32"}).setOrigin(.5);
    const sentence=this.scene.add.text(0,-25,choice.label,{fontSize:"32px",fontStyle:"bold",color:"#102342"}).setOrigin(.5);
    const response=this.scene.add.text(0,55,`Captain Fritz: Thank you, ${this.studentName}.`,{fontSize:"23px",fontStyle:"bold",color:"#174ea6"}).setOrigin(.5);
    const next=this.scene.panels.makeButton(0,145,"Next Question",()=>this.showBetweenClassActivityChart());
    this.scene.panels.open([title,sentence,response,next],{width:720,height:430});
  };

  LessonEngine.prototype.showBetweenClassActivityChart=function(){
    this.setSection("greeting-activities-chart");
    showChoiceChart(this,{
      key:"fritz-activity-chart-51-10",
      image:"assets/charts/activity-chart.svg",
      title:"Captain Fritz: What did you do between classes?",
      choices:activityChoices,
      onChoose:(choice)=>{
        this.progress().betweenClassActivity=choice.id;
        saveGame(this.scene.save);
        this.showActivityAnswer(choice);
      }
    });
  };

  LessonEngine.prototype.showActivityAnswer=function(choice){
    const title=this.scene.add.text(0,-125,"Good answer!",{fontSize:"36px",fontStyle:"bold",color:"#2f7d32"}).setOrigin(.5);
    const sentence=this.scene.add.text(0,-25,choice.label,{fontSize:"32px",fontStyle:"bold",color:"#102342"}).setOrigin(.5);
    const response=this.scene.add.text(0,55,"Captain Fritz: Thank you for telling me.",{fontSize:"23px",fontStyle:"bold",color:"#174ea6"}).setOrigin(.5);
    const next=this.scene.panels.makeButton(0,145,"Start Lesson",()=>this.showFeelingsActivityIntro());
    this.scene.panels.open([title,sentence,response,next],{width:720,height:430});
  };
})();
