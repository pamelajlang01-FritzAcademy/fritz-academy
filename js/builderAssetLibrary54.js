/* Fritz Academy 54.0 — image-backed Academy Builder asset library */
(function(){
'use strict';

const esc = s => encodeURIComponent(s)
  .replace(/'/g,'%27').replace(/%0A/g,'').replace(/%20/g,' ');

function svg(w,h,body){
  const doc=`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <filter id="s" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#071426" flood-opacity=".35"/></filter>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff1a6"/><stop offset=".55" stop-color="#e8b83d"/><stop offset="1" stop-color="#b77b18"/></linearGradient>
    <linearGradient id="wood" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#b87836"/><stop offset="1" stop-color="#74421f"/></linearGradient>
    <linearGradient id="stone" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#e4e0d5"/><stop offset="1" stop-color="#98958e"/></linearGradient>
    <linearGradient id="navy" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#244d7f"/><stop offset="1" stop-color="#102342"/></linearGradient>
  </defs>${body}</svg>`;
  return `data:image/svg+xml;charset=UTF-8,${esc(doc)}`;
}

const A = {
  'welcome-flowers':'assets/objects/question-flower-bed-premium.svg',
  'flower-bed':'assets/objects/question-flower-bed-premium.svg',
  'four-flowers':'assets/objects/question-flower-bed-premium.svg',
  'garden-lantern':'assets/objects/question-lantern-premium.svg',
  'map-post':'assets/objects/question-garden-sign.svg',
  'letter-stones-cd':'assets/alphabet-blocks.png',
  'letter-stones-ef':'assets/alphabet-blocks.png',
  'ip-letter-stones':'assets/alphabet-blocks.png',

  'stone-path': svg(220,140,`
    <g filter="url(#s)" stroke="#67645e" stroke-width="4">
      <path d="M20 118 C52 95 59 63 94 49 C130 35 145 24 198 18 L205 55 C165 61 147 76 126 84 C91 98 79 122 55 133Z" fill="url(#stone)"/>
      <path d="M47 105l37-19 26 13-35 20zM93 77l39-19 25 12-39 20zM139 51l39-18 19 9-37 20z" fill="#cbc7bd" stroke="#8e8a82"/>
    </g>`),
  'reading-bench': svg(250,170,`
    <g filter="url(#s)" stroke="#4c2d18" stroke-width="5" stroke-linejoin="round">
      <path d="M42 75h164v31H42z" fill="url(#wood)"/><path d="M55 38h139v27H55z" fill="#a96831"/>
      <path d="M61 105l-10 50h20l10-50M186 105l10 50h-20l-10-50" fill="#5b371e"/>
      <path d="M48 68v-35M200 68v-35" fill="none"/>
      <circle cx="67" cy="89" r="4" fill="#e8b83d"/><circle cx="181" cy="89" r="4" fill="#e8b83d"/>
    </g>`),
  'welcome-tree': svg(250,300,`
    <g filter="url(#s)">
      <ellipse cx="126" cy="270" rx="80" ry="17" fill="#234a2c" opacity=".25"/>
      <path d="M105 264c12-65 12-104 5-137h34c-5 43-1 86 10 137z" fill="url(#wood)" stroke="#5c341c" stroke-width="5"/>
      <path d="M124 145C87 122 72 94 80 70M130 143c28-22 45-45 47-72" fill="none" stroke="#6e411f" stroke-width="16" stroke-linecap="round"/>
      <g fill="#4f9c45" stroke="#2c6e37" stroke-width="5">
        <circle cx="78" cy="86" r="49"/><circle cx="124" cy="62" r="55"/><circle cx="174" cy="88" r="48"/><circle cx="126" cy="111" r="52"/>
      </g>
      <g fill="#f4c542"><circle cx="77" cy="79" r="6"/><circle cx="155" cy="66" r="6"/><circle cx="120" cy="101" r="6"/></g>
    </g>`),
  'garden-fence': svg(300,150,`
    <g filter="url(#s)" fill="#f5ecd2" stroke="#8b6b3e" stroke-width="4">
      <path d="M20 62h260v20H20zM20 105h260v18H20z"/>
      ${[35,80,125,170,215,260].map(x=>`<path d="M${x} 125V32l14-18 14 18v93z"/>`).join('')}
    </g>`),
  'watering-can': svg(220,180,`
    <g filter="url(#s)" stroke="#315b69" stroke-width="5" stroke-linejoin="round">
      <path d="M55 72h95v79H55z" rx="16" fill="#74b7c8"/>
      <path d="M150 90l49-30 7 16-51 38z" fill="#8ac8d5"/>
      <path d="M63 72c5-49 75-50 82 0" fill="none" stroke-width="12"/>
      <path d="M45 77h20v25H45z" fill="#e8b83d"/>
      <circle cx="203" cy="67" r="13" fill="#d7eef2"/>
    </g>`),
  'birdhouse': svg(210,250,`
    <g filter="url(#s)" stroke="#5a371d" stroke-width="5" stroke-linejoin="round">
      <path d="M48 102l57-56 58 56v88H48z" fill="#f0c76d"/><path d="M37 102l68-68 69 68" fill="none" stroke="#8d4e2b" stroke-width="18"/>
      <circle cx="105" cy="118" r="24" fill="#243b4f"/><path d="M91 151h29" stroke="#5a371d" stroke-width="9" stroke-linecap="round"/>
      <path d="M99 190v52h13v-52" fill="#6d4528"/>
    </g>`),
  'clue-door': svg(180,260,`
    <g filter="url(#s)">
      <path d="M27 241V93C27 41 153 41 153 93v148z" fill="#30527d" stroke="#d6ad43" stroke-width="8"/>
      <path d="M46 235V100c0-35 88-35 88 0v135z" fill="#8d542f" stroke="#5c331b" stroke-width="6"/>
      <circle cx="117" cy="166" r="8" fill="#f5cf62" stroke="#805b19" stroke-width="4"/>
      <text x="90" y="120" text-anchor="middle" font-size="28" font-weight="900" fill="#f8df86">C • D</text>
    </g>`),
  'cat-statue': svg(190,230,`
    <g filter="url(#s)" fill="url(#stone)" stroke="#6d6b67" stroke-width="5">
      <ellipse cx="95" cy="205" rx="68" ry="19"/><path d="M60 183c3-54 15-91 35-95 24 3 34 39 36 95z"/>
      <circle cx="95" cy="69" r="43"/><path d="M63 39L68 8l24 24M127 39l-5-31-24 24" stroke-linejoin="round"/>
      <circle cx="80" cy="69" r="4" fill="#313131"/><circle cx="110" cy="69" r="4" fill="#313131"/>
      <path d="M89 81q6 7 12 0" fill="none" stroke="#313131"/>
      <path d="M130 167q38-3 34-39" fill="none" stroke-width="12" stroke-linecap="round"/>
    </g>`),
  'direction-arrows': svg(260,180,`
    <g filter="url(#s)" stroke="#102342" stroke-width="5" stroke-linejoin="round">
      <path d="M20 90l65-52v30h62v44H85v30z" fill="#f4c542"/>
      <path d="M240 90l-65-52v30h-62v44h62v30z" fill="#7bc7ee"/>
      <circle cx="130" cy="90" r="22" fill="#fff8db"/>
    </g>`),
  'flower-arch': svg(280,260,`
    <g filter="url(#s)">
      <path d="M55 240V103c0-101 170-101 170 0v137" fill="none" stroke="#5d7d3f" stroke-width="18"/>
      <path d="M76 240V108c0-72 128-72 128 0v132" fill="none" stroke="#d4b04e" stroke-width="6"/>
      ${[[63,107],[76,73],[104,48],[142,42],[178,55],[205,82],[217,119]].map(([x,y],i)=>`<g transform="translate(${x} ${y})"><circle r="16" fill="${i%2?'#f4a8c3':'#f7d45d'}"/><circle r="6" fill="#fff5c0"/></g>`).join('')}
    </g>`),
  'fish-pond': svg(300,190,`
    <g filter="url(#s)">
      <ellipse cx="150" cy="112" rx="126" ry="61" fill="#7b7670" stroke="#55514d" stroke-width="7"/>
      <ellipse cx="150" cy="105" rx="108" ry="46" fill="#66c4df" stroke="#d9f4f7" stroke-width="5"/>
      <g fill="#f2a33c" stroke="#995319" stroke-width="3">
        <path d="M93 95q22-20 43 0-21 20-43 0l-17 13 5-22z"/>
        <path d="M166 116q22-20 43 0-21 20-43 0l-17 13 5-22z"/>
      </g>
      <g fill="#4f9c45"><ellipse cx="66" cy="74" rx="23" ry="9"/><ellipse cx="227" cy="88" rx="25" ry="9"/></g>
    </g>`),
  'proud-banner': svg(280,190,`
    <g filter="url(#s)">
      <path d="M37 25v150M243 25v150" stroke="#6c4526" stroke-width="10"/>
      <path d="M41 35h198v93l-31-20-33 20-35-20-35 20-33-20-31 20z" fill="url(#navy)" stroke="#e8b83d" stroke-width="6"/>
      <text x="140" y="72" text-anchor="middle" fill="#fff7cf" font-size="21" font-weight="900">FRITZ ACADEMY</text>
      <text x="140" y="100" text-anchor="middle" fill="#f4c542" font-size="18" font-weight="900">PROUD BUILDERS</text>
    </g>`),
  'academy-team-banner': svg(280,190,`
    <g filter="url(#s)">
      <path d="M37 25v150M243 25v150" stroke="#6c4526" stroke-width="10"/>
      <path d="M41 35h198v93l-28-17-35 17-36-17-36 17-35-17-28 17z" fill="url(#navy)" stroke="#e8b83d" stroke-width="6"/>
      <text x="140" y="77" text-anchor="middle" fill="#fff" font-size="22" font-weight="900">ACADEMY TEAM</text>
      <text x="140" y="104" text-anchor="middle" fill="#f4c542" font-size="16" font-weight="800">WE WORK TOGETHER</text>
    </g>`),
  'alphabet-gate': svg(320,300,`
    <g filter="url(#s)">
      <path d="M35 280V116C35 35 285 35 285 116v164" fill="none" stroke="#8b572d" stroke-width="28"/>
      <path d="M55 280V122c0-56 210-56 210 0v158" fill="none" stroke="#e8b83d" stroke-width="8"/>
      <g fill="#fff2aa" stroke="#7b5520" stroke-width="3">${'ABCDEFGH'.split('').map((l,i)=>`<g transform="translate(${58+i*29} 218)"><rect width="25" height="38" rx="5"/><text x="12.5" y="27" text-anchor="middle" font-size="20" font-weight="900" fill="#102342">${l}</text></g>`).join('')}</g>
      <path d="M160 64l19 30 35 8-24 26 4 36-34-15-34 15 4-36-24-26 35-8z" fill="#f4c542" stroke="#102342" stroke-width="5"/>
    </g>`),
  'question-fountain': svg(300,260,`
    <g filter="url(#s)">
      <ellipse cx="150" cy="223" rx="117" ry="28" fill="#9b9388" stroke="#5e5a55" stroke-width="6"/>
      <ellipse cx="150" cy="212" rx="98" ry="22" fill="#6fc9df"/>
      <path d="M109 205h82l-13-60h-56z" fill="url(#stone)" stroke="#706c66" stroke-width="5"/>
      <ellipse cx="150" cy="145" rx="64" ry="17" fill="#bcb8b1" stroke="#706c66" stroke-width="5"/>
      <path d="M150 143V75" stroke="#7bc7ee" stroke-width="8" stroke-linecap="round"/>
      <path d="M150 77c-25 20-42 31-63 36M150 77c25 20 42 31 63 36" fill="none" stroke="#7bc7ee" stroke-width="6" stroke-linecap="round"/>
      <text x="150" y="67" text-anchor="middle" font-size="60" font-weight="900" fill="#f4c542" stroke="#102342" stroke-width="3">?</text>
    </g>`),
  'kite-workshop-sign': svg(300,210,`
    <g filter="url(#s)">
      <path d="M43 185V36h214v149" fill="none" stroke="#6c4526" stroke-width="12"/>
      <rect x="55" y="28" width="190" height="100" rx="18" fill="url(#navy)" stroke="#e8b83d" stroke-width="7"/>
      <text x="150" y="67" text-anchor="middle" fill="#fff" font-size="22" font-weight="900">KITE WORKSHOP</text>
      <text x="150" y="94" text-anchor="middle" fill="#f4c542" font-size="15" font-weight="800">BUILD • SHARE • FLY</text>
      <path d="M110 142l28-28 28 28-28 29z" fill="#f4c542" stroke="#102342" stroke-width="4"/>
      <path d="M138 171q22 8 7 28" fill="none" stroke="#7b4a2d" stroke-width="4"/>
    </g>`),
  'safe-path-marker': svg(190,240,`
    <g filter="url(#s)">
      <path d="M88 217V104h14v113" fill="#6d4528"/>
      <path d="M30 32h130v84H30z" rx="16" fill="#fff7dc" stroke="#e8b83d" stroke-width="7"/>
      <path d="M61 74h68" stroke="#174ea6" stroke-width="10" stroke-linecap="round"/>
      <path d="M58 74l22-19v38zM132 74l-22-19v38z" fill="#174ea6"/>
      <text x="95" y="50" text-anchor="middle" font-size="13" font-weight="900" fill="#102342">SAFE PATH</text>
      <text x="95" y="107" text-anchor="middle" font-size="12" font-weight="800" fill="#102342">LOOK • STOP • SHARE</text>
    </g>`),
  'six-kite-display': svg(320,250,`
    <g filter="url(#s)">
      <path d="M36 224h248" stroke="#6b4729" stroke-width="9" stroke-linecap="round"/>
      ${[[50,60,'#f4c542'],[95,38,'#62b8ef'],[142,68,'#ec7fa0'],[188,35,'#75bd72'],[233,67,'#f19a44'],[276,30,'#9f83d6']].map(([x,y,c],i)=>`
      <g transform="translate(${x} ${y})"><path d="M0 42L28 0l28 42-28 42z" fill="${c}" stroke="#102342" stroke-width="4"/><path d="M28 84q${i%2?18:-18} 26 0 52" fill="none" stroke="#6b4729" stroke-width="3"/></g>`).join('')}
      <rect x="75" y="188" width="170" height="40" rx="12" fill="url(#navy)" stroke="#e8b83d" stroke-width="5"/>
      <text x="160" y="214" text-anchor="middle" fill="#fff" font-size="16" font-weight="900">SIX KITES — ONE TEAM</text>
    </g>`)
};

window.FRITZ_BUILDER_ASSETS = Object.freeze(A);
window.FRITZ_BUILDER_ASSET_VERSION='54.0';
})();