/* Fritz Academy Voice Routing Patch v50.11 */
(function(){
  "use strict";

  function speak(text){
    if(window.FritzVoiceSystem){
      return window.FritzVoiceSystem.speak(text,{rate:.78,pitch:.92});
    }
    return false;
  }

  if(window.LessonEngine){
    window.LessonEngine.prototype.speakText=function(text){
      speak(text);
    };
  }

  if(window.MediaEngine){
    window.MediaEngine.prototype.speak=function(text){
      this.stop();
      speak(text);
    };
  }
})();