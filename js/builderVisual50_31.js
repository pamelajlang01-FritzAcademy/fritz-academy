/* Fritz Academy Builder Visual Upgrade v50.31 */
(function(){
  "use strict";

  function installStyles(){
    if(document.getElementById("fritz-builder-visual-50-31")) return;
    const style=document.createElement("style");
    style.id="fritz-builder-visual-50-31";
    style.textContent=`
      .fritz-builder-shell{
        width:min(1500px,99vw)!important;
        height:min(920px,98vh)!important;
        background:#f8f1df!important;
        border:5px solid #e7b938!important;
        border-radius:24px!important;
        box-shadow:0 24px 60px rgba(0,0,0,.38)!important;
        overflow:hidden!important;
      }
      .fritz-builder-header{
        min-height:78px!important;
        padding:14px 24px!important;
        background:linear-gradient(100deg,#0a2d61,#174f8e)!important;
        border-bottom:4px solid #e7b938!important;
      }
      .fritz-builder-title{font-size:34px!important;letter-spacing:.2px!important}
      .fritz-builder-subtitle{font-size:18px!important;color:#ffe27a!important}
      .fritz-builder-main{
        grid-template-columns:minmax(250px,310px) 1fr!important;
        min-height:0!important;
        background:#0a2d61!important;
      }
      .fritz-builder-tray{
        padding:14px 12px!important;
        background:linear-gradient(180deg,#fffaf0 0%,#edf5ff 100%)!important;
        border-right:4px solid #e7b938!important;
        overflow-y:auto!important;
      }
      .fritz-builder-tray h3{
        margin:0 0 12px!important;
        color:#103f78!important;
        font-size:25px!important;
      }
      .fritz-builder-piece{
        grid-template-columns:104px 1fr!important;
        min-height:108px!important;
        margin-bottom:10px!important;
        padding:8px!important;
        background:#fff!important;
        border:3px solid #d8b768!important;
        border-radius:18px!important;
        box-shadow:0 7px 16px rgba(16,35,66,.12)!important;
        transition:transform .14s ease,box-shadow .14s ease,border-color .14s ease!important;
      }
      .fritz-builder-piece:hover,.fritz-builder-piece.is-selected{
        transform:translateY(-2px)!important;
        border-color:#e7b938!important;
        box-shadow:0 10px 20px rgba(16,35,66,.2)!important;
      }
      .fritz-piece-preview{
        width:92px!important;
        height:86px!important;
        background:linear-gradient(#edf7ff,#dceecb)!important;
        border:2px solid #d6b45c!important;
        border-radius:14px!important;
        overflow:hidden!important;
      }
      .fritz-piece-preview img{
        width:96%!important;
        height:96%!important;
        object-fit:contain!important;
        filter:drop-shadow(0 5px 5px rgba(0,0,0,.18))!important;
      }
      .fritz-builder-stage-wrap{
        position:relative!important;
        padding:14px!important;
        background:linear-gradient(145deg,#0b2d5d,#061a39)!important;
      }
      .fritz-builder-stage{
        position:relative!important;
        min-height:590px!important;
        border:5px solid #e7b938!important;
        border-radius:24px!important;
        overflow:hidden!important;
        background-image:
          radial-gradient(circle at 27% 48%,rgba(255,255,255,.12) 0 9%,rgba(255,255,255,0) 10%),
          radial-gradient(circle at 74% 47%,rgba(255,255,255,.12) 0 9%,rgba(255,255,255,0) 10%),
          radial-gradient(circle at 44% 72%,rgba(255,255,255,.12) 0 9%,rgba(255,255,255,0) 10%),
          radial-gradient(circle at 67% 72%,rgba(255,255,255,.12) 0 9%,rgba(255,255,255,0) 10%),
          url("assets/environments/welcome_garden.png")!important;
        background-size:cover!important;
        background-position:center!important;
        background-repeat:no-repeat!important;
        box-shadow:inset 0 0 0 2px rgba(255,255,255,.22),0 16px 30px rgba(0,0,0,.28)!important;
      }
      .fritz-builder-stage:before{
        content:""!important;
        display:block!important;
        position:absolute!important;
        inset:0!important;
        pointer-events:none!important;
        background:linear-gradient(to bottom,rgba(3,22,48,.03),rgba(3,22,48,.12))!important;
        z-index:1!important;
      }
      .fritz-builder-stage:after{
        content:"Choose a piece, then place it anywhere in the garden"!important;
        display:block!important;
        position:absolute!important;
        left:50%!important;
        bottom:18px!important;
        transform:translateX(-50%)!important;
        width:max-content!important;
        max-width:80%!important;
        padding:10px 18px!important;
        border-radius:999px!important;
        background:rgba(7,29,62,.86)!important;
        border:2px solid #e7b938!important;
        color:#fff!important;
        font-size:15px!important;
        font-weight:700!important;
        text-align:center!important;
        pointer-events:none!important;
        z-index:3!important;
      }
      .fritz-builder-object{
        z-index:8!important;
        background:transparent!important;
        filter:drop-shadow(0 12px 10px rgba(0,0,0,.34))!important;
        transition:filter .15s ease,transform .15s ease!important;
      }
      .fritz-builder-object:hover,.fritz-builder-object.is-selected{
        filter:drop-shadow(0 0 4px #fff) drop-shadow(0 0 10px #e7b938) drop-shadow(0 12px 10px rgba(0,0,0,.34))!important;
      }
      .fritz-builder-object img{
        width:100%!important;
        height:100%!important;
        object-fit:contain!important;
        pointer-events:none!important;
      }
      .fritz-object-label{
        display:none!important;
      }
      .fritz-builder-footer{
        min-height:68px!important;
        padding:10px 16px!important;
        background:#fff6dc!important;
        border-top:4px solid #e7b938!important;
      }
      .fritz-builder-footer button{
        min-height:44px!important;
        border-radius:14px!important;
      }
      @media(max-width:900px){
        .fritz-builder-main{grid-template-columns:220px 1fr!important}
        .fritz-builder-stage{min-height:520px!important}
      }
      @media(max-width:700px){
        .fritz-builder-main{grid-template-columns:1fr!important;grid-template-rows:170px 1fr!important}
        .fritz-builder-tray{display:flex!important;gap:10px!important;overflow-x:auto!important;overflow-y:hidden!important}
        .fritz-builder-piece{min-width:220px!important}
        .fritz-builder-stage{min-height:430px!important}
      }
    `;
    document.head.appendChild(style);
  }

  function apply(){
    installStyles();
    const stage=document.querySelector(".fritz-builder-stage");
    if(stage){
      stage.style.removeProperty("background-image");
      stage.style.removeProperty("background-size");
      stage.style.removeProperty("background-position");
    }
  }

  installStyles();
  const observer=new MutationObserver(()=>requestAnimationFrame(apply));
  observer.observe(document.documentElement,{childList:true,subtree:true});
  window.addEventListener("load",apply);
  window.FritzBuilderVisualUpgrade={version:"50.31",apply};
})();
