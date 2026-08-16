/* Fritz Academy production Builder art resolver v57.0 */
(function(){
'use strict';
const esc=s=>encodeURIComponent(s).replace(/'/g,'%27').replace(/%0A/g,'').replace(/%20/g,' ');
function svg(w,h,body){
 const doc=`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><filter id="s" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#071426" flood-opacity=".32"/></filter><linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff1a6"/><stop offset=".55" stop-color="#e8b83d"/><stop offset="1" stop-color="#b77b18"/></linearGradient><linearGradient id="wood" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#b87836"/><stop offset="1" stop-color="#74421f"/></linearGradient><linearGradient id="stone" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#e4e0d5"/><stop offset="1" stop-color="#98958e"/></linearGradient><linearGradient id="navy" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#244d7f"/><stop offset="1" stop-color="#102342"/></linearGradient></defs>${body}</svg>`;
 return `data:image/svg+xml;charset=UTF-8,${esc(doc)}`;
}
const ART={
 flowers:'assets/objects/question-flower-bed-premium.svg',
 lantern:'assets/objects/question-lantern-premium.svg',
 sign:'assets/objects/question-garden-sign.svg',
 letters:'assets/alphabet-blocks.png',
 bench:svg(250,170,`<g filter="url(#s)" stroke="#4c2d18" stroke-width="5" stroke-linejoin="round"><path d="M42 75h164v31H42z" fill="url(#wood)"/><path d="M55 38h139v27H55z" fill="#a96831"/><path d="M61 105l-10 50h20l10-50M186 105l10 50h-20l-10-50" fill="#5b371e"/><path d="M48 68v-35M200 68v-35" fill="none"/><circle cx="67" cy="89" r="4" fill="#e8b83d"/><circle cx="181" cy="89" r="4" fill="#e8b83d"/></g>`),
 tree:svg(250,300,`<g filter="url(#s)"><ellipse cx="126" cy="270" rx="80" ry="17" fill="#234a2c" opacity=".25"/><path d="M105 264c12-65 12-104 5-137h34c-5 43-1 86 10 137z" fill="url(#wood)" stroke="#5c341c" stroke-width="5"/><path d="M124 145C87 122 72 94 80 70M130 143c28-22 45-45 47-72" fill="none" stroke="#6e411f" stroke-width="16" stroke-linecap="round"/><g fill="#4f9c45" stroke="#2c6e37" stroke-width="5"><circle cx="78" cy="86" r="49"/><circle cx="124" cy="62" r="55"/><circle cx="174" cy="88" r="48"/><circle cx="126" cy="111" r="52"/></g></g>`),
 path:svg(220,140,`<g filter="url(#s)" stroke="#67645e" stroke-width="4"><path d="M20 118 C52 95 59 63 94 49 C130 35 145 24 198 18 L205 55 C165 61 147 76 126 84 C91 98 79 122 55 133Z" fill="url(#stone)"/><path d="M47 105l37-19 26 13-35 20zM93 77l39-19 25 12-39 20zM139 51l39-18 19 9-37 20z" fill="#cbc7bd" stroke="#8e8a82"/></g>`),
 fence:svg(300,150,`<g filter="url(#s)" fill="#f5ecd2" stroke="#8b6b3e" stroke-width="4"><path d="M20 62h260v20H20zM20 105h260v18H20z"/>${[35,80,125,170,215,260].map(x=>`<path d="M${x} 125V32l14-18 14 18v93z"/>`).join('')}</g>`),
 pond:svg(300,190,`<g filter="url(#s)"><ellipse cx="150" cy="112" rx="126" ry="61" fill="#7b7670" stroke="#55514d" stroke-width="7"/><ellipse cx="150" cy="105" rx="108" ry="46" fill="#66c4df" stroke="#d9f4f7" stroke-width="5"/><g fill="#f2a33c" stroke="#995319" stroke-width="3"><path d="M93 95q22-20 43 0-21 20-43 0l-17 13 5-22z"/><path d="M166 116q22-20 43 0-21 20-43 0l-17 13 5-22z"/></g></g>`),
 arch:svg(280,260,`<g filter="url(#s)"><path d="M55 240V103c0-101 170-101 170 0v137" fill="none" stroke="#5d7d3f" stroke-width="18"/><path d="M76 240V108c0-72 128-72 128 0v132" fill="none" stroke="#d4b04e" stroke-width="6"/>${[[63,107],[76,73],[104,48],[142,42],[178,55],[205,82],[217,119]].map(([x,y],i)=>`<g transform="translate(${x} ${y})"><circle r="16" fill="${i%2?'#f4a8c3':'#f7d45d'}"/><circle r="6" fill="#fff5c0"/></g>`).join('')}</g>`),
 banner:svg(280,190,`<g filter="url(#s)"><path d="M37 25v150M243 25v150" stroke="#6c4526" stroke-width="10"/><path d="M41 35h198v93l-31-20-33 20-35-20-35 20-33-20-31 20z" fill="url(#navy)" stroke="#e8b83d" stroke-width="6"/><text x="140" y="72" text-anchor="middle" fill="#fff7cf" font-size="21" font-weight="900">FRITZ ACADEMY</text><text x="140" y="100" text-anchor="middle" fill="#f4c542" font-size="18" font-weight="900">BUILDERS</text></g>`),
 gate:svg(320,300,`<g filter="url(#s)"><path d="M35 280V116C35 35 285 35 285 116v164" fill="none" stroke="#8b572d" stroke-width="28"/><path d="M55 280V122c0-56 210-56 210 0v158" fill="none" stroke="#e8b83d" stroke-width="8"/><g fill="#fff2aa" stroke="#7b5520" stroke-width="3">${'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').slice(0,9).map((l,i)=>`<g transform="translate(${35+i*28} 218)"><rect width="24" height="38" rx="5"/><text x="12" y="27" text-anchor="middle" font-size="18" font-weight="900" fill="#102342">${l}</text></g>`).join('')}</g><path d="M160 64l19 30 35 8-24 26 4 36-34-15-34 15 4-36-24-26 35-8z" fill="#f4c542" stroke="#102342" stroke-width="5"/></g>`),
 fountain:svg(300,260,`<g filter="url(#s)"><ellipse cx="150" cy="223" rx="117" ry="28" fill="#9b9388" stroke="#5e5a55" stroke-width="6"/><ellipse cx="150" cy="212" rx="98" ry="22" fill="#6fc9df"/><path d="M109 205h82l-13-60h-56z" fill="url(#stone)" stroke="#706c66" stroke-width="5"/><ellipse cx="150" cy="145" rx="64" ry="17" fill="#bcb8b1" stroke="#706c66" stroke-width="5"/><path d="M150 143V75" stroke="#7bc7ee" stroke-width="8" stroke-linecap="round"/><path d="M150 77c-25 20-42 31-63 36M150 77c25 20 42 31 63 36" fill="none" stroke="#7bc7ee" stroke-width="6" stroke-linecap="round"/></g>`),
 kite:svg(260,220,`<g filter="url(#s)"><path d="M130 18l74 78-74 78-74-78z" fill="#f4c542" stroke="#102342" stroke-width="6"/><path d="M130 18v156M56 96h148" stroke="#102342" stroke-width="4"/><path d="M130 174q-34 24 0 48q34-24 0-48" fill="none" stroke="#6b4729" stroke-width="4"/><path d="M115 196l-18 10 18 8M145 196l18 10-18 8" fill="#ec7fa0" stroke="#102342" stroke-width="3"/></g>`),
 workshop:svg(300,210,`<g filter="url(#s)"><path d="M43 185V36h214v149" fill="none" stroke="#6c4526" stroke-width="12"/><rect x="55" y="28" width="190" height="100" rx="18" fill="url(#navy)" stroke="#e8b83d" stroke-width="7"/><text x="150" y="67" text-anchor="middle" fill="#fff" font-size="22" font-weight="900">KITE WORKSHOP</text><text x="150" y="94" text-anchor="middle" fill="#f4c542" font-size="15" font-weight="800">BUILD • SHARE • FLY</text></g>`),
 bridge:svg(300,180,`<g filter="url(#s)"><path d="M25 125q125-100 250 0" fill="none" stroke="#74421f" stroke-width="25"/><path d="M28 119q122-78 244 0" fill="none" stroke="#c58b4b" stroke-width="13"/><path d="M55 107v45M245 107v45" stroke="#5b371e" stroke-width="10"/><path d="M48 136h204" stroke="#8b572d" stroke-width="7"/></g>`),
 stage:svg(320,220,`<g filter="url(#s)"><rect x="35" y="125" width="250" height="60" rx="10" fill="#8d542f" stroke="#5c331b" stroke-width="6"/><path d="M55 125V45h210v80" fill="#244d7f" stroke="#e8b83d" stroke-width="7"/><path d="M70 60h180" stroke="#f4c542" stroke-width="5"/><text x="160" y="100" text-anchor="middle" fill="#fff" font-size="24" font-weight="900">ACADEMY STAGE</text></g>`),
 windmill:svg(280,300,`<g filter="url(#s)"><path d="M115 285l18-145h30l18 145z" fill="#d9c7a1" stroke="#6f563d" stroke-width="6"/><circle cx="148" cy="110" r="20" fill="#f4c542" stroke="#102342" stroke-width="5"/><g transform="translate(148 110)" fill="#f5ecd2" stroke="#6f563d" stroke-width="4"><path d="M0 0L-22-92L15-80L8-8z"/><path d="M0 0L92-22L80 15L8 8z"/><path d="M0 0L22 92L-15 80L-8 8z"/><path d="M0 0L-92 22L-80-15L-8-8z"/></g></g>`)
};
function resolve(piece){
 const n=String(piece&&piece.name||'').toLowerCase();
 const id=String(piece&&piece.id||'').toLowerCase();
 if(id.includes('letter-stones')||n.includes('letter')) return ART.letters;
 if(n.includes('bench')) return ART.bench;
 if(n.includes('tree')) return ART.tree;
 if(n.includes('flower')||n.includes('garden bed')||n.includes('rose')||n.includes('butterfly')) return ART.flowers;
 if(n.includes('path')||n.includes('marker')) return ART.path;
 if(n.includes('fence')) return ART.fence;
 if(n.includes('pond')||n.includes('fish')||n.includes('water')) return ART.pond;
 if(n.includes('arch')) return ART.arch;
 if(n.includes('banner')||n.includes('flag')) return ART.banner;
 if(n.includes('gate')) return ART.gate;
 if(n.includes('fountain')) return ART.fountain;
 if(n.includes('kite')) return n.includes('workshop')?ART.workshop:ART.kite;
 if(n.includes('bridge')||n.includes('dock')) return ART.bridge;
 if(n.includes('stage')||n.includes('music')) return ART.stage;
 if(n.includes('windmill')) return ART.windmill;
 if(n.includes('lantern')) return ART.lantern;
 if(n.includes('sign')||n.includes('map')) return ART.sign;
 return ART.sign;
}
window.FRITZ_BUILDER_ART=Object.freeze({...ART,resolve});
window.FRITZ_BUILDER_ART_VERSION='57.0';
})();