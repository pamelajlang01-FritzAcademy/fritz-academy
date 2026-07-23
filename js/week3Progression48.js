/* Fritz Academy Week 3 progression guard v48.0 */
(function(){
  "use strict";
  if(!Array.isArray(window.LEVELS)) return;
  const order=["2-D","3-A","3-B","3-C"];
  for(let i=0;i<order.length-1;i++){
    const lesson=window.LEVELS.find(item=>item&&item.id===order[i]);
    if(lesson&&lesson.completion) lesson.completion.unlocks=order[i+1];
  }
})();
