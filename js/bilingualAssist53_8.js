/* Fritz Academy 53.8 — in-game English <-> Mandarin classroom assist */
(function(){
'use strict';
const API='https://api.mymemory.translated.net/get';
const SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;
let voices=[];
function loadVoices(){voices=window.speechSynthesis?window.speechSynthesis.getVoices():[];}
loadVoices(); if(window.speechSynthesis) window.speechSynthesis.onvoiceschanged=loadVoices;
function decode(v){const t=document.createElement('textarea');t.innerHTML=v||'';return t.value;}
async function translate(text,from,to){
 const q=String(text||'').trim(); if(!q) return '';
 const p=new URLSearchParams({q,langpair:`${from}|${to}`});
 const r=await fetch(`${API}?${p.toString()}`,{headers:{Accept:'application/json'}});
 if(!r.ok) throw new Error('Translation service unavailable');
 const d=await r.json(); const out=decode(d?.responseData?.translatedText||'');
 if(!out) throw new Error('No translation returned'); return out;
}
function voice(lang){
 const codes=lang==='zh-CN'?['zh-CN','cmn-CN','zh']:['en-US','en'];
 return voices.find(v=>codes.some(c=>v.lang?.toLowerCase()===c.toLowerCase()))||voices.find(v=>codes.some(c=>v.lang?.toLowerCase().startsWith(c.split('-')[0].toLowerCase())))||null;
}
function speak(text,lang){
 const clean=String(text||'').trim(); if(!clean||!window.speechSynthesis)return;
 window.speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(clean);u.lang=lang==='zh-CN'?'zh-CN':'en-US';u.rate=lang==='zh-CN'?0.8:0.88;u.pitch=1;const v=voice(lang);if(v)u.voice=v;window.speechSynthesis.speak(u);
}
function css(){if(document.getElementById('fa538css'))return;const s=document.createElement('style');s.id='fa538css';s.textContent=`
#fa538btn{position:fixed;right:14px;bottom:14px;z-index:1100000;border:3px solid #f6c744;background:#102342;color:white;border-radius:18px;padding:11px 15px;font:900 15px Arial;box-shadow:0 8px 22px #0006;cursor:pointer}
.fa538{position:fixed;inset:0;z-index:1100001;background:#061326df;display:grid;place-items:center;padding:10px;font-family:Arial,sans-serif}.fa538box{width:min(880px,97vw);max-height:94vh;overflow:auto;background:#fffdf4;border:5px solid #f6c744;border-radius:22px;box-shadow:0 20px 70px #000a}.fa538head{background:#102342;color:white;padding:12px 16px;display:flex;justify-content:space-between;align-items:center}.fa538head h2{margin:0;font-size:23px}.fa538close{background:white;border:0;border-radius:9px;padding:7px 11px;font-weight:900;cursor:pointer}.fa538body{padding:14px}.fa538mics{display:grid;grid-template-columns:1fr 1fr;gap:10px}.fa538mic{padding:14px;border:3px solid #174ea6;border-radius:14px;background:#edf5ff;font-weight:900;font-size:17px;cursor:pointer}.fa538mic.zh{border-color:#b13a32;background:#fff0ed}.fa538status{margin:10px 0;font-weight:800;color:#315b87;min-height:20px}.fa538grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.fa538card{border:3px solid #d2dce8;border-radius:14px;padding:11px;background:white}.fa538card h3{margin:0 0 7px;color:#102342}.fa538card textarea{width:100%;min-height:125px;box-sizing:border-box;border:2px solid #9fb3c8;border-radius:10px;padding:10px;font-size:18px;resize:vertical}.fa538out{min-height:125px;border:2px solid #9fb3c8;border-radius:10px;padding:10px;font-size:20px;background:#fffef8;white-space:pre-wrap}.fa538actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px}.fa538actions button{border:2px solid #102342;background:white;border-radius:9px;padding:8px 10px;font-weight:900;cursor:pointer}.fa538actions .primary{background:#f6c744}.fa538quick{margin-top:12px;padding-top:10px;border-top:2px solid #d2dce8;display:flex;gap:7px;flex-wrap:wrap}.fa538quick button{border:2px solid #174ea6;background:#edf5ff;border-radius:10px;padding:7px 9px;font-weight:800;cursor:pointer}@media(max-width:700px){.fa538grid,.fa538mics{grid-template-columns:1fr}.fa538card textarea,.fa538out{min-height:95px}}
`;document.head.appendChild(s);}
function build(){css();if(document.getElementById('fa538btn'))return;const b=document.createElement('button');b.id='fa538btn';b.textContent='🌐 English ⇄ 中文';document.body.appendChild(b);b.onclick=open;}
function open(prefill='',direction='en-zh'){
 document.querySelector('.fa538')?.remove();
 const ov=document.createElement('div');ov.className='fa538';ov.innerHTML=`<section class="fa538box"><header class="fa538head"><h2>Fritz Academy Language Helper</h2><button class="fa538close">Close</button></header><div class="fa538body"><div class="fa538mics"><button class="fa538mic" data-teacher>🎤 Teacher speaks English → 中文</button><button class="fa538mic zh" data-student>🎤 学生说中文 → English</button></div><div class="fa538status">Use English as the teaching language. Use Mandarin support when needed.</div><div class="fa538grid"><section class="fa538card"><h3>English</h3><textarea data-en placeholder="Type or speak English here..."></textarea><div class="fa538actions"><button class="primary" data-en2zh>Translate to 中文</button><button data-speak-en>🔊 Speak English</button></div></section><section class="fa538card"><h3>简体中文</h3><div class="fa538out" data-zh></div><div class="fa538actions"><button class="primary" data-zh2en>Translate to English</button><button data-speak-zh>🔊 播放中文</button></div></section></div><div class="fa538quick"><button data-q="Do you understand?">Do you understand?</button><button data-q="Please say that again.">Please say that again.</button><button data-q="Please speak slowly.">Please speak slowly.</button><button data-q="What do you think?">What do you think?</button><button data-q="Great job!">Great job!</button></div></div></section>`;
 document.body.appendChild(ov);const en=ov.querySelector('[data-en]'),zh=ov.querySelector('[data-zh]'),status=ov.querySelector('.fa538status');en.value=prefill||'';
 const setStatus=t=>status.textContent=t;
 async function en2zh(){const t=en.value.trim();if(!t)return;setStatus('Translating English to Mandarin...');try{zh.textContent=await translate(t,'en','zh-CN');setStatus('Ready.');}catch(e){setStatus('Translation is unavailable. Check the internet connection.');}}
 async function zh2en(){const t=zh.textContent.trim();if(!t)return;setStatus('Translating Mandarin to English...');try{en.value=await translate(t,'zh-CN','en');setStatus('Ready.');}catch(e){setStatus('Translation is unavailable. Check the internet connection.');}}
 function listen(lang,target,after){if(!SpeechRecognition){setStatus('Speech recognition is not supported by this browser. You can still type and use spoken playback.');return;}const r=new SpeechRecognition();r.lang=lang;r.interimResults=false;r.maxAlternatives=1;setStatus(lang==='zh-CN'?'Listening to the student in Mandarin...':'Listening to the teacher in English...');r.onresult=e=>{const t=e.results[0][0].transcript;if(target==='en'){en.value=t;en2zh();}else{zh.textContent=t;zh2en();}};r.onerror=()=>setStatus('Microphone recognition did not complete. Try again or type the sentence.');r.start();}
 ov.querySelector('.fa538close').onclick=()=>ov.remove();ov.addEventListener('click',e=>{if(e.target===ov)ov.remove()});
 ov.querySelector('[data-en2zh]').onclick=en2zh;ov.querySelector('[data-zh2en]').onclick=zh2en;ov.querySelector('[data-speak-en]').onclick=()=>speak(en.value,'en');ov.querySelector('[data-speak-zh]').onclick=()=>speak(zh.textContent,'zh-CN');ov.querySelector('[data-teacher]').onclick=()=>listen('en-US','en');ov.querySelector('[data-student]').onclick=()=>listen('zh-CN','zh');
 ov.querySelectorAll('[data-q]').forEach(x=>x.onclick=()=>{en.value=x.dataset.q;en2zh();});
 if(prefill){if(direction==='zh-en'){zh.textContent=prefill;en.value='';zh2en();}else en2zh();}
}
window.FritzBilingualAssist={open,translate,speak,teacherToMandarin:text=>open(text,'en-zh'),studentToEnglish:text=>open(text,'zh-en')};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else build();
})();
