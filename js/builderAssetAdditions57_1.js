/* Fritz Academy Builder object additions v57.1 */
(function(){
'use strict';
if(!window.FRITZ_BUILDER_ART)return;
const esc=s=>encodeURIComponent(s).replace(/'/g,'%27').replace(/%0A/g,'').replace(/%20/g,' ');
function svg(w,h,body){return `data:image/svg+xml;charset=UTF-8,${esc(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><filter id="s" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#071426" flood-opacity=".32"/></filter><linearGradient id="wood" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#c18448"/><stop offset="1" stop-color="#70401f"/></linearGradient><linearGradient id="navy" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#244d7f"/><stop offset="1" stop-color="#102342"/></linearGradient><linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff1a6"/><stop offset=".55" stop-color="#e8b83d"/><stop offset="1" stop-color="#b77b18"/></linearGradient></defs>${body}</svg>`)}`;}
const EXTRA={
 door:svg(180,250,`<g filter="url(#s)"><path d="M25 238V82C25 30 155 30 155 82v156z" fill="#2d517d" stroke="#e8b83d" stroke-width="8"/><path d="M46 231V91c0-30 88-30 88 0v140z" fill="url(#wood)" stroke="#5b3219" stroke-width="6"/><circle cx="116" cy="162" r="8" fill="#f4c542" stroke="#7d5919" stroke-width="4"/><path d="M74 61h34" stroke="#fff2aa" stroke-width="6" stroke-linecap="round"/></g>`),
 table:svg(300,190,`<g filter="url(#s)" stroke="#5b3219" stroke-width="6" stroke-linejoin="round"><rect x="30" y="45" width="240" height="55" rx="12" fill="url(#wood)"/><path d="M58 98l-10 76h24l13-76M242 98l10 76h-24l-13-76" fill="#70401f"/><rect x="85" y="22" width="130" height="28" rx="7" fill="#e8b83d"/><text x="150" y="42" text-anchor="middle" font-size="16" font-weight="900" fill="#102342">ACADEMY WORK TABLE</text></g>`),
 rack:svg(260,240,`<g filter="url(#s)" stroke="#5b3219" stroke-width="6"><path d="M42 218V38M218 218V38"/><path d="M35 62h190v22H35zM35 118h190v22H35zM35 174h190v22H35z" fill="url(#wood)"/><g fill="#f5ecd2" stroke="#8b6b3e" stroke-width="3"><rect x="58" y="33" width="42" height="23"/><rect x="112" y="33" width="42" height="23"/><rect x="166" y="33" width="32" height="23"/></g></g>`),
 cart:svg(290,210,`<g filter="url(#s)" stroke="#102342" stroke-width="6" stroke-linejoin="round"><path d="M50 45h176l-18 95H68z" fill="#d9a34f"/><path d="M50 45L32 25H12" fill="none" stroke-linecap="round"/><circle cx="85" cy="165" r="23" fill="#40536a"/><circle cx="195" cy="165" r="23" fill="#40536a"/><path d="M83 75h110M76 105h124" stroke="#8b572d"/></g>`),
 shed:svg(300,250,`<g filter="url(#s)" stroke="#5a371d" stroke-width="6" stroke-linejoin="round"><path d="M38 100L150 24l112 76v132H38z" fill="#d6a45f"/><path d="M25 103L150 14l125 89" fill="none" stroke="#244d7f" stroke-width="22"/><rect x="112" y="126" width="76" height="106" fill="#8d542f"/><circle cx="172" cy="181" r="7" fill="#f4c542"/><rect x="57" y="130" width="44" height="48" fill="#bfe0f2"/><path d="M79 130v48M57 154h44" stroke="#244d7f" stroke-width="4"/></g>`),
 vane:svg(250,300,`<g filter="url(#s)"><path d="M125 278V96" stroke="#6b4729" stroke-width="11"/><path d="M53 92h144" stroke="#102342" stroke-width="7" stroke-linecap="round"/><path d="M195 92l-36-22v44z" fill="#f4c542" stroke="#102342" stroke-width="5"/><path d="M56 92l24-18v36z" fill="#244d7f" stroke="#102342" stroke-width="5"/><text x="125" y="53" text-anchor="middle" font-size="42" font-weight="900" fill="#102342">N</text><text x="125" y="135" text-anchor="middle" font-size="28" font-weight="900" fill="#102342">S</text><text x="34" y="102" font-size="27" font-weight="900" fill="#102342">W</text><text x="207" y="102" font-size="27" font-weight="900" fill="#102342">E</text></g>`),
 weatherbox:svg(260,200,`<g filter="url(#s)" stroke="#5b3219" stroke-width="6" stroke-linejoin="round"><path d="M35 74l95-50 95 50-95 50z" fill="#c88d4d"/><path d="M35 74v80l95 45v-75z" fill="#9d642f"/><path d="M225 74v80l-95 45v-75z" fill="#b9793b"/><rect x="104" y="83" width="52" height="32" rx="5" fill="#f4c542" stroke="#102342" stroke-width="3"/><text x="130" y="105" text-anchor="middle" font-size="15" font-weight="900" fill="#102342">WEATHER</text></g>`)
};
const old=window.FRITZ_BUILDER_ART.resolve;
window.FRITZ_BUILDER_ART.resolve=function(piece){
 const n=String(piece&&piece.name||'').toLowerCase();
 if(n.includes('door'))return EXTRA.door;
 if(n.includes('desk')||n.includes('table'))return EXTRA.table;
 if(n.includes('rack')||n.includes('shelf'))return EXTRA.rack;
 if(n.includes('cart'))return EXTRA.cart;
 if(n.includes('shed'))return EXTRA.shed;
 if(n.includes('weather vane'))return EXTRA.vane;
 if(n.includes('weather box'))return EXTRA.weatherbox;
 return old(piece);
};
window.FRITZ_BUILDER_EXTRA=Object.freeze(EXTRA);
})();