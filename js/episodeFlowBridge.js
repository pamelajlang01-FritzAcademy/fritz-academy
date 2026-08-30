/* Fritz Academy episodic runtime bridge — compact 20–25 minute episode flow. */
(function(){
  if(typeof LessonEngine==='undefined')return;
  const originalClosingSong=LessonEngine.prototype.showClosingSong;

  LessonEngine.prototype.showMissionOpening=function(){
    this._episodeTagShown=false;
    this.setSection('opening');
    const hook=this.lesson&&this.lesson.episode&&this.lesson.episode.hook?this.lesson.episode.hook:'Captain Fritz has a new Academy mission.';
    const title=this.scene.add.text(0,-185,this.lesson.title,{fontSize:'35px',fontStyle:'bold',color:'#102342',align:'center',wordWrap:{width:700}}).setOrigin(.5);
    const ep=this.scene.add.text(0,-125,`Episode ${this.lesson.canonicalLesson||this.levelId}`,{fontSize:'20px',fontStyle:'bold',color:'#174ea6'}).setOrigin(.5);
    const body=this.scene.add.text(0,5,this.replaceName(hook),{fontSize:'25px',fontStyle:'bold',color:'#102342',align:'center',lineSpacing:8,wordWrap:{width:660}}).setOrigin(.5);
    const begin=this.scene.panels.makeButton(0,185,'Enter the Adventure',()=>this.showGreeting(),{fontSize:'24px'});
    this.scene.panels.open([title,ep,body,begin],{width:800,height:530});
  };

  /* One character scene rather than 5–7 separate dialogue screens. */
  LessonEngine.prototype.showGreeting=function(){
    this.setSection('character-opening');
    const conversation=Array.isArray(this.lesson.intro)&&this.lesson.intro.length?this.lesson.intro.slice(0,7):[{speaker:'Captain Fritz',text:'The mission is ready. Let’s see what happens.'}];
    const script=conversation.map(line=>`${line.speaker||'Fritz Academy'}: ${this.replaceName(line.text||'')}`).join('\n\n');
    const label=this.scene.add.text(0,-232,'THE TEAM',{fontSize:'19px',fontStyle:'bold',color:'#174ea6'}).setOrigin(.5);
    const dialogue=this.scene.add.text(0,-10,script,{fontSize:'20px',fontStyle:'bold',color:'#102342',align:'left',lineSpacing:3,wordWrap:{width:700}}).setOrigin(.5);
    const next=this.scene.panels.makeButton(0,232,'Solve It',()=>this.showFeelingsActivityIntro(),{fontSize:'22px'});
    this.scene.panels.open([label,dialogue,next],{width:820,height:610});
  };

  /* No redundant activity-intro screen: enter the first challenge immediately. */
  LessonEngine.prototype.showFeelingsActivityIntro=function(){
    this.setSection('episode-challenge');
    const a=this.lesson.feelingsActivity;
    if(!a||!Array.isArray(a.questions)||!a.questions.length){this.startStory();return;}
    this.questionIndex=0;this.correctAnswers=0;this.showFeelingQuestion();
  };

  LessonEngine.prototype.showFeelingQuestion=function(){
    const a=this.lesson.feelingsActivity,q=a.questions[this.questionIndex];
    if(!q){if(a.rewardPiece)this.rewardPiece(a.rewardPiece,'Challenge solved!',()=>this.startStory());else this.startStory();return;}
    const objects=[];
    objects.push(this.scene.add.text(0,-210,`${a.title||'Adventure Challenge'} — ${this.questionIndex+1}/${a.questions.length}`,{fontSize:'27px',fontStyle:'bold',color:'#46566f',align:'center',wordWrap:{width:700}}).setOrigin(.5));
    if(a.instructions)objects.push(this.scene.add.text(0,-158,a.instructions,{fontSize:'16px',fontStyle:'bold',color:'#6b5428',align:'center',wordWrap:{width:690}}).setOrigin(.5));
    objects.push(this.scene.add.text(0,-75,q.prompt||'Choose the best match.',{fontSize:'25px',fontStyle:'bold',color:'#102342',align:'center',wordWrap:{width:680}}).setOrigin(.5));
    const options=Array.isArray(q.options)?q.options:[],ys=options.length<=2?[55,135]:[25,90,155];
    options.forEach((option,i)=>objects.push(this.scene.panels.makeButton(0,ys[i]||155,option,()=>{
      if(option===q.answer){this.correctAnswers++;this.questionIndex++;this.showFeelingQuestion();}
      else this.showTryAgain(()=>this.showFeelingQuestion());
    },{fontSize:'20px',padding:{x:18,y:8}})));
    this.scene.panels.open(objects,{width:800,height:570});
  };

  LessonEngine.prototype.showClosingSong=function(){
    const tag=this.lesson&&this.lesson.episode&&this.lesson.episode.tag;
    if(tag&&!this._episodeTagShown){
      this._episodeTagShown=true;this.setSection('episode-tag');
      const label=this.scene.add.text(0,-145,'NEXT...',{fontSize:'23px',fontStyle:'bold',color:'#174ea6'}).setOrigin(.5);
      const text=this.scene.add.text(0,-10,this.replaceName(tag),{fontSize:'29px',fontStyle:'bold',color:'#102342',align:'center',lineSpacing:10,wordWrap:{width:660}}).setOrigin(.5);
      const next=this.scene.panels.makeButton(0,165,'Finish Episode',()=>originalClosingSong.call(this));
      this.scene.panels.open([label,text,next],{width:780,height:470});return;
    }
    originalClosingSong.call(this);
  };
})();