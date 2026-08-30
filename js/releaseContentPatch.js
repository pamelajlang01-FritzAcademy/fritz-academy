/* Targeted content corrections applied after all lesson arcs load and before canonical progression repair. */
(function(){
  if(typeof LEVELS==='undefined'||!Array.isArray(LEVELS))return;
  const byLesson=n=>LEVELS.find(l=>l&&l.canonicalLesson===n);
  const replaceText=(value,from,to)=>typeof value==='string'?value.split(from).join(to):value;
  const walk=(obj,fn)=>{if(!obj||typeof obj!=='object')return;for(const key of Object.keys(obj)){if(typeof obj[key]==='string')obj[key]=fn(obj[key]);else if(obj[key]&&typeof obj[key]==='object')walk(obj[key],fn);}};

  /* 27: keep voiced/voiceless TH contrast explicit rather than implying one TH sound. */
  const e27=byLesson(27);
  if(e27&&e27.phonics){
    e27.phonics.soundLabel='TH can represent two common sounds: think /θ/ and this /ð/.';
    e27.phonics.teacherCue='Teach the contrast explicitly: quiet-air TH in think, thin, bath; voice-on TH in this, that, the. The learner does not need terminology, only to hear, feel, and distinguish both patterns.';
    e27.objectives=e27.objectives||{};
    e27.objectives.phonics=['Hear and distinguish the two common TH sounds in familiar words.','Read supported TH words without claiming TH always makes one sound.'];
  }

  /* 28: WH is primarily a spelling pattern; avoid claiming one universal sound. */
  const e28=byLesson(28);
  if(e28&&e28.phonics){
    e28.phonics.soundLabel='WH question-word pattern';
    e28.phonics.teacherCue='Teach WH mainly as a visual pattern in high-frequency question words: what, when, where, which, why, who. Pronunciation varies by word and dialect; do not present WH as one fixed sound.';
  }

  /* 31–33: include natural family variants without overloading the learner. */
  [31,32,33].forEach(n=>{const l=byLesson(n);if(!l)return;walk(l,s=>replaceText(replaceText(s,'mother','mother/mom'),'father','father/dad'));});

  /* 60: dogs do not wear shoes/boots in established character canon. Replace boots with scarf. */
  const e60=byLesson(60);
  if(e60)walk(e60,s=>replaceText(replaceText(s,'boots','scarf'),'Boots','Scarf'));

  /* 65: no generic human ownership example; keep examples inside the dog cast. */
  const e65=byLesson(65);
  if(e65)walk(e65,s=>replaceText(replaceText(s,'A girl owns it','Nola owns it'),'the girl','Nola'));

  /* 69: remove ambiguous brother reference; Bash stops both would-be shortcut takers. */
  const e69=byLesson(69);
  if(e69)walk(e69,s=>replaceText(s,'both brothers','them both'));

  /* 80: remove meta production/canon wording from learner-facing content. */
  const e80=byLesson(80);
  if(e80)walk(e80,s=>replaceText(s,'No dog needs shoes for this mission.','The team packs only what the weather mission needs.'));

  /* 95: repair awkward needs-language line. */
  const e95=byLesson(95);
  if(e95)walk(e95,s=>replaceText(s,'He needs the game to breathe','He needs a break so he can keep playing'));

  window.FRITZ_RELEASE_CONTENT_PATCH={applied:true,lessons:[27,28,31,32,33,60,65,69,80,95]};
})();