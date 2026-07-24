/* Fritz Academy Illustrated Lesson Pages v50.7 */
(function(){
  "use strict";

  function specFor(engine,type){
    const lessonId=engine.lesson&&engine.lesson.id;
    const lessonSpecs=window.FritzLessonSceneSpecs&&window.FritzLessonSceneSpecs[lessonId];
    if(!lessonSpecs) return null;
    const list=lessonSpecs[type];
    return Array.isArray(list)?list[engine.pageIndex]||null:null;
  }

  function renderPage(engine,type,isReader){
    const collection=isReader?engine.reader:engine.story;
    if(engine.pageIndex>=collection.pages.length){
      if(isReader) engine.startCheck(); else engine.startQuestions();
      return;
    }

    const raw=collection.pages[engine.pageIndex];
    const page=typeof raw==="string"?{text:raw,image:""}:{text:(raw&&raw.text)||"",image:(raw&&raw.image)||""};
    const sceneSpec=specFor(engine,type);
    const objects=[];
    const titleY=isReader?-225:-220;
    objects.push(engine.scene.add.text(0,titleY,`${collection.title} — Page ${engine.pageIndex+1} of ${collection.pages.length}`,{
      fontSize:"20px",fontStyle:"bold",color:"#46566f",align:"center",wordWrap:{width:720}
    }).setOrigin(.5));

    if(isReader&&collection.level){
      objects.push(engine.scene.add.text(0,-190,collection.level,{fontSize:"17px",fontStyle:"bold",color:"#174ea6"}).setOrigin(.5));
    }

    const openPanel=()=>{
      objects.push(engine.scene.add.text(0,92,engine.lessonEngine.replaceName(page.text),{
        fontSize:"24px",fontStyle:"bold",color:"#102342",align:"center",lineSpacing:6,wordWrap:{width:700}
      }).setOrigin(.5).setDepth(40));

      if(engine.pageIndex>0){
        objects.push(engine.scene.panels.makeButton(-270,218,"Back Page",()=>{
          engine.lessonEngine.stopMedia();
          engine.pageIndex=Math.max(0,engine.pageIndex-1);
          engine.showPage();
        },{backgroundColor:"#eaf1ff"}));
      }

      objects.push(engine.scene.panels.makeButton(0,218,"Read Aloud",()=>{
        engine.lessonEngine.speakText(engine.lessonEngine.replaceName(page.text));
      },{backgroundColor:"#ffffff"}));

      objects.push(engine.scene.panels.makeButton(270,218,engine.pageIndex===collection.pages.length-1?(isReader?"Reader Check":"Story Check"):"Next Page",()=>{
        engine.lessonEngine.stopMedia();
        engine.pageIndex++;
        engine.showPage();
      }));

      engine.scene.panels.open(objects,{width:860,height:610});
    };

    if(sceneSpec&&window.IllustrationEngine){
      const illustrator=new IllustrationEngine(engine.scene);
      const validation=illustrator.validateScene(sceneSpec);
      if(validation.valid){
        illustrator.addScene(objects,page.text,{
          x:0,y:-70,width:680,height:285,scene:sceneSpec,label:sceneSpec.caption,onReady:openPanel
        });
        return;
      }
    }

    objects.push(engine.scene.add.rectangle(0,-70,680,285,0xdff2ff,1).setStrokeStyle(5,0x174ea6));
    objects.push(engine.scene.add.text(0,-70,"Illustration scene is being prepared.",{fontSize:"23px",fontStyle:"bold",color:"#102342"}).setOrigin(.5));
    openPanel();
  }

  if(typeof StoryEngine!=="undefined") StoryEngine.prototype.showPage=function(){ renderPage(this,"story",false); };
  if(typeof ReaderEngine!=="undefined") ReaderEngine.prototype.showPage=function(){ renderPage(this,this.readerKey,true); };
})();
