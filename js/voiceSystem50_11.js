/* Fritz Academy Voice System v50.11 */
(function(){
  "use strict";

  const preferredNames = [
    "Microsoft David",
    "Microsoft Guy",
    "Google US English Male",
    "Aaron",
    "Daniel",
    "Fred",
    "Alex"
  ];

  function availableVoices(){
    if(!("speechSynthesis" in window)) return [];
    return window.speechSynthesis.getVoices() || [];
  }

  function scoreVoice(voice){
    const name=String(voice&&voice.name||"");
    const lang=String(voice&&voice.lang||"").toLowerCase();
    let score=0;
    if(lang==="en-us") score+=100;
    else if(lang.startsWith("en")) score+=60;
    preferredNames.forEach((preferred,index)=>{
      if(name.toLowerCase().includes(preferred.toLowerCase())) score+=80-index;
    });
    if(/male|david|guy|aaron|daniel|fred|alex/i.test(name)) score+=35;
    if(/child|girl|female|samantha|victoria|zira/i.test(name)) score-=30;
    if(voice&&voice.localService) score+=5;
    return score;
  }

  function selectVoice(){
    return availableVoices().slice().sort((a,b)=>scoreVoice(b)-scoreVoice(a))[0]||null;
  }

  function speak(text,options={}){
    if(!text||!("speechSynthesis" in window)) return false;
    window.speechSynthesis.cancel();
    const utterance=new SpeechSynthesisUtterance(String(text));
    utterance.lang="en-US";
    utterance.rate=Number(options.rate)||0.78;
    utterance.pitch=Number(options.pitch)||0.92;
    utterance.volume=1;
    const voice=selectVoice();
    if(voice) utterance.voice=voice;
    window.speechSynthesis.speak(utterance);
    return true;
  }

  window.FritzVoiceSystem={version:"50.11",selectVoice,speak};
})();