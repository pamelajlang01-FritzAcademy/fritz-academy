/* Fritz Academy 53.2 — reliably launch the approved Alphabet Gate game after Reader 2 */
(function(){
'use strict';
if(typeof LessonEngine==='undefined'||typeof BuilderEngine==='undefined')return;
const original=LessonEngine.prototype.showBuildSummary;
LessonEngine.prototype.showBuildSummary=function(){
  if(this.levelId!=='2-A') return original.call(this);
  this.setSection('build');
  this.scene.panels.close();
  const builder=new BuilderEngine(this.scene,this);
  this.builderEngine=builder;
  builder.start(this.lesson,()=>this.showClosingSong());
};
window.FRITZ_2A_BUILDER_TRIGGER='53.2';
})();
