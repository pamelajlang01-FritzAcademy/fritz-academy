/* Fritz Academy — optional 40-minute teacher-led classroom companion.
   Read-only lesson data. Does not touch student saves, unlocks, or canonical episodes.
   Main game continues to use its native 20–25 minute episode pacing. */
(function () {
  "use strict";
  const style = document.createElement("style");
  style.textContent = `
    #fritz-class-launch{position:fixed;bottom:14px;right:14px;z-index:99998;background:#f9ca49;color:#15243c;border:3px solid #12253e;border-radius:14px;padding:10px 15px;font:bold 15px Arial;cursor:pointer}
    #fritz-class-overlay{position:fixed;inset:0;z-index:100010;background:#071426ee;display:flex;justify-content:center;align-items:center;padding:12px;font-family:Arial,sans-serif;color:#162b48}
    #fritz-class-panel{width:min(860px,96vw);max-height:93vh;overflow:auto;background:#fffaf0;border:5px solid #f7c84b;border-radius:19px;padding:22px}
    #fritz-class-panel h2{margin:0 0 9px;font-size:27px}#fritz-class-panel p{line-height:1.45}
    #fritz-class-panel button,#fritz-class-panel select{font:inherit;padding:10px;border-radius:9px;border:2px solid #314867;background:white;color:#15243c;margin:3px;cursor:pointer}
    #fritz-class-panel button:focus-visible,#fritz-class-launch:focus-visible{outline:4px solid #3183d4}
    #fritz-class-panel .class-card{border:2px solid #d6e0e9;border-radius:12px;padding:15px;margin:12px 0;background:#fff}
    #fritz-class-panel .class-label{color:#475b71;font-weight:bold;font-size:14px}#fritz-class-panel .class-actions{display:flex;gap:6px;flex-wrap:wrap}
    #fritz-class-panel .class-reading{font-size:23px;line-height:1.65;background:#f0f6fc;padding:14px;border-radius:10px}
  `;
  document.head.appendChild(style);
  let overlay = null;
  const strip = s => String(s || "").replace(/<[^>]*>/g, "").trim();
  const esc = s => strip(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  function canonical() {
    return typeof LEVELS === "undefined" ? [] : LEVELS
      .filter(l => l && Number.isInteger(l.canonicalLesson) && l.canonicalLesson >= 1 && l.canonicalLesson <= 108)
      .sort((a,b) => a.canonicalLesson - b.canonicalLesson);
  }
  const pages = x => Array.isArray(x?.pages) ? x.pages.filter(p => p && strip(p.text)) : [];
  const sentences = arr => arr.map(p => strip(p.text));
  function open() {
    if (overlay) return;
    overlay = document.createElement("div"); overlay.id = "fritz-class-overlay"; overlay.setAttribute("role","dialog"); overlay.setAttribute("aria-modal","true");overlay.setAttribute("aria-label","Fritz Academy teacher classroom companion");
    const lessons=canonical();
    overlay.innerHTML = `<div id="fritz-class-panel"><div style="display:flex;justify-content:space-between;align-items:center;gap:10px"><h2>Fritz Academy · 40-minute class</h2><button id="fritz-class-close" aria-label="Close classroom companion">Close</button></div>
      <p>Teacher-led pacing: <strong>0–5</strong> review · <strong>5–25</strong> main game · <strong>25–33</strong> reader extension · <strong>33–38</strong> language mission · <strong>38–40</strong> recap. Game saves and rewards remain in the game itself.</p>
      <label for="fritz-class-lesson">Lesson</label> <select id="fritz-class-lesson">${lessons.map(l=>`<option value="${l.canonicalLesson}">${l.canonicalLesson} — ${esc(l.title)}</option>`).join("")}</select>
      <div id="fritz-class-content" aria-live="polite"></div></div>`;
    document.body.appendChild(overlay);
    const panel=overlay.querySelector("#fritz-class-panel");
    panel.querySelector("#fritz-class-close").addEventListener("click", close);
    overlay.addEventListener("keydown", e=>{if(e.key==="Escape")close()});
    panel.querySelector("#fritz-class-lesson").addEventListener("change", render);
    if (!lessons.length) panel.querySelector("#fritz-class-content").textContent="Canonical lessons are not loaded. This mode cannot generate an extension without real lesson content.";
    else render();
    panel.querySelector("#fritz-class-close").focus();
  }
  function close(){if(overlay){overlay.remove();overlay=null;document.querySelector("#fritz-class-launch")?.focus()}}
  function render(){
    const number=Number(overlay.querySelector("#fritz-class-lesson").value);
    const lesson=canonical().find(l=>l.canonicalLesson===number);
    if(!lesson)return;
    const reader=pages(lesson.reader2).length ? lesson.reader2 : lesson.reader1;
    const lines=sentences(pages(reader));
    const q=[...(lesson.story?.questions||[]),...(lesson.reader1?.check?[lesson.reader1.check]:[]),...(lesson.reader2?.check?[lesson.reader2.check]:[])].filter(x=>x&&x.prompt);
    const words=(lesson.vocabulary||[]).map(x=>typeof x==="string"?x:x.word||x.display).filter(Boolean);
    const phonics=lesson.phonics||{};
    const excerpt=lines.length?lines.map((line,i)=>`<p><strong>${i+1}.</strong> ${esc(line)}</p>`).join(""):"<p>Reader content missing — return to the main game or choose another lesson.</p>";
    overlay.querySelector("#fritz-class-content").innerHTML=`
      <div class="class-card"><span class="class-label">0–5 MIN · REVIEW AND CONVERSATION</span><h3>${esc(lesson.title)}</h3>
      <p>Ask the student: What do you remember from our last adventure? Who helped Fritz? What did you build? Give spoken sentence frames if needed.</p>
      <p><strong>Today's words:</strong> ${esc(words.slice(0,8).join(" · ")||"Review words from the main adventure")}</p></div>
      <div class="class-card"><span class="class-label">5–25 MIN · PLAY THE MAIN ADVENTURE</span><p>Close this companion, launch the student's next unlocked adventure in the game, and complete the normal lesson. Return here for the extension without marking any extra lessons complete.</p></div>
      <div class="class-card"><span class="class-label">25–33 MIN · READING EXTENSION</span><h3>${esc(reader?.title||"Second Reader")}</h3>
      <p>First reading: teacher models. Second: student reads with help. Third: student reads selected lines and identifies clues. Ask: Who? What? Where? Why?</p>
      <div class="class-reading">${excerpt}</div>
      <div class="class-actions"><button id="fritz-class-read">Read passage aloud</button><button id="fritz-class-stop">Stop reading</button></div></div>
      <div class="class-card"><span class="class-label">33–38 MIN · LANGUAGE AND PHONICS MISSION</span>
      <p><strong>Sound practice:</strong> ${esc(phonics.soundLabel||phonics.letterUpper||"Review phonics from today's lesson")}. Say the sound; find it in a word from the story; use that word in a spoken sentence.</p>
      <p><strong>Sentence challenge:</strong> Choose three story words. Make a sentence with each. Then give Fritz one instruction using today's vocabulary.</p>
      ${q.slice(0,3).map((item,i)=>`<p><strong>Question ${i+1}:</strong> ${esc(item.prompt)} ${item.answer?`<details><summary>Teacher answer</summary>${esc(item.answer)}</details>`:""}</p>`).join("")}</div>
      <div class="class-card"><span class="class-label">38–40 MIN · RECAP</span><p>Ask for two new words, one full answer and one favorite game moment. Confirm the main game saved progress and rewards. Do not manually unlock the next lesson here.</p></div>`;
    const speak=overlay.querySelector("#fritz-class-read"),stop=overlay.querySelector("#fritz-class-stop");
    speak.addEventListener("click",()=>{
      if(!("speechSynthesis" in window))return;
      window.speechSynthesis.cancel();
      const utterance=new SpeechSynthesisUtterance(lines.join(" "));
      utterance.lang="en-US";utterance.rate=.8;window.speechSynthesis.speak(utterance);
    });
    stop.addEventListener("click",()=>window.speechSynthesis?.cancel());
  }
  const launch=document.createElement("button");launch.id="fritz-class-launch";launch.textContent="40-min Teacher Mode";launch.addEventListener("click",open);document.body.appendChild(launch);
  window.FritzClassroom40={open,close,lessonCount:()=>canonical().length};
})();