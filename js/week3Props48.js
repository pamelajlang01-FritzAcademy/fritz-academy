/* Fritz Academy Week 3 reusable props v48.0 */
(function(){
  "use strict";
  if(typeof IllustrationEngine==="undefined") return;
  const prior=IllustrationEngine.prototype.makeProp;
  const symbols={
    "mixed-supplies":"📚✏️📄🎒","chair":"🪑","pencil":"✏️","table":"🪵","books":"📚","shelf":"🗄️","paper-stack":"📄📄","supply-box":"📦","label-board":"🏷️ BOOK  PENCIL  PAPER","organized-room":"📚  ✏️  📄  🎒","paper":"📄","writing-set":"✏️📄","bag":"🎒","picture-label":"🖼️ BOOK","object-cards":"📘 ✏️ 📄 🪑","pencil-cup":"✏️✏️","two-step-card":"1. OPEN  2. SHOW","open-book":"📖","page-two":"PAGE 2","listen-first":"👂 LISTEN FIRST","blue-book":"📘","page-four":"PAGE 4","thank-you":"THANK YOU","red-box":"🟥📦","open-red-box":"📦✨","quilt-card":"Q  QUILT","listening-ears":"👂","number-one":"1","number-two":"2","closed-box":"📦","check-marks":"✅✅","listening-signal":"👂 READY"
  };
  window.FritzIllustrationPropKinds=Object.freeze(Array.from(new Set([...(window.FritzIllustrationPropKinds||[]),...Object.keys(symbols)])));
  IllustrationEngine.prototype.makeProp=function(spec,x,y,width,height,index){
    if(!symbols[spec.kind]) return prior.call(this,spec,x,y,width,height,index);
    const label=/label|card|page-|listen|thank|number-|check|signal|organized/.test(spec.kind||"");
    const style={fontSize:`${Math.round((label?28:42)*(Number(spec.scale)||1))}px`,fontStyle:label?"bold":"normal",color:"#102342",align:"center",backgroundColor:label?"rgba(255,255,255,.92)":undefined,padding:label?{x:8,y:5}:undefined,wordWrap:{width:Math.max(120,width*.34)}};
    return this.scene.add.text(x+(Number(spec.x)||0)*width,y+(Number(spec.y)||0)*height,symbols[spec.kind],style).setOrigin(.5).setDepth(5+index);
  };
})();
