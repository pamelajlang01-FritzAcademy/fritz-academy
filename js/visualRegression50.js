/* Fritz Academy visual regression checks v50.0 */
(function(){
  "use strict";
  window.FritzVisualRegression={
    version:"50.0",
    checkScene(objects,frame){
      const errors=[];
      if(!frame||!frame.getBounds)return errors;
      const bounds=frame.getBounds();
      (objects||[]).forEach((object,index)=>{
        if(!object||object===frame||!object.getBounds)return;
        const b=object.getBounds();
        if(b.right<bounds.left||b.left>bounds.right||b.bottom<bounds.top||b.top>bounds.bottom) errors.push(`Scene object ${index} is outside the illustration frame.`);
      });
      return errors;
    },
    checkBuilder(){
      const stage=document.querySelector(".fritz-builder-stage");if(!stage)return [];
      const s=stage.getBoundingClientRect(),errors=[];
      stage.querySelectorAll(".fritz-builder-object").forEach((node,index)=>{const b=node.getBoundingClientRect();if(b.left<s.left-2||b.right>s.right+2||b.top<s.top-2||b.bottom>s.bottom+2)errors.push(`Builder object ${index} is outside the board.`);});
      return errors;
    }
  };
})();