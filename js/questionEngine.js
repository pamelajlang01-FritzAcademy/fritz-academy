/* Fritz Academy Question Engine v56 */
class QuestionEngine {
  constructor(scene,lessonEngine){
    this.scene=scene;this.lessonEngine=lessonEngine;this.questions=[];this.index=0;this.correct=0;this.title="Check Your Learning";this.onComplete=null;this.options={};
  }
  start(config={}){
    this.questions=Array.isArray(config.questions)?config.questions.filter(Boolean):[];
    this.index=0;this.correct=0;this.title=config.title||"Check Your Learning";this.onComplete=config.onComplete;
    this.options={requireCorrect:config.requireCorrect!==false,showProgress:config.showProgress!==false,successMessage:config.successMessage||"Great thinking!",retryMessage:config.retryMessage||"Look closely and try again.",width:config.width||780,height:config.height||540};
    if(!this.questions.length){this.finish();return;}this.showQuestion();
  }
  replace(value){
    const text=String(value??"");
    return this.lessonEngine&&typeof this.lessonEngine.replaceName==="function"?this.lessonEngine.replaceName(text):text;
  }
  normalizeQuestion(question){
    const source=question||{};
    return {prompt:this.replace(source.prompt||source.question||"Choose the best answer."),options:Array.isArray(source.options)?source.options.map(option=>this.replace(option)):[],answer:this.replace(source.answer),image:source.image||"",emoji:source.emoji||"",explanation:this.replace(source.explanation||"")};
  }
  showQuestion(){
    const raw=this.questions[this.index];if(!raw){this.finish();return;}
    const question=this.normalizeQuestion(raw);
    if(!question.options.length||typeof question.answer==="undefined"){this.index++;this.showQuestion();return;}
    const objects=[];
    objects.push(this.scene.add.text(0,-205,this.title,{fontSize:"32px",fontStyle:"bold",color:"#102342",align:"center",wordWrap:{width:680}}).setOrigin(.5));
    if(this.options.showProgress){objects.push(this.scene.add.text(0,-165,`Question ${this.index+1} of ${this.questions.length}`,{fontSize:"19px",fontStyle:"bold",color:"#46566f"}).setOrigin(.5));}
    if(question.emoji){objects.push(this.scene.add.text(0,-100,question.emoji,{fontSize:"64px"}).setOrigin(.5));}
    const promptY=question.emoji?-35:-90;
    objects.push(this.scene.add.text(0,promptY,question.prompt,{fontSize:"27px",fontStyle:"bold",color:"#102342",align:"center",wordWrap:{width:660}}).setOrigin(.5));
    const startY=question.emoji?45:20;const gap=question.options.length>3?50:65;
    question.options.forEach((option,i)=>objects.push(this.scene.panels.makeButton(0,startY+i*gap,String(option),()=>this.checkAnswer(option,question),{fontSize:question.options.length>3?"20px":"21px",padding:{x:22,y:question.options.length>3?7:9}})));
    this.scene.panels.open(objects,{width:this.options.width,height:this.options.height});
  }
  checkAnswer(selected,question){
    if(selected===question.answer){this.correct++;this.index++;const message=question.explanation?`${selected}\n\n${question.explanation}`:String(selected);this.lessonEngine.showCorrectAnswer(this.options.successMessage,message,()=>this.showQuestion());return;}
    if(!this.options.requireCorrect){this.index++;this.showQuestion();return;}
    this.lessonEngine.showTryAgain(()=>this.showQuestion(),this.options.retryMessage);
  }
  finish(){const callback=this.onComplete;const result={correct:this.correct,total:this.questions.length};this.onComplete=null;if(typeof callback==="function")callback(result);}
}
window.QuestionEngine=QuestionEngine;