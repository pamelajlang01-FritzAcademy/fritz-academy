/* Fritz Academy avatar path repair v50.51 */
(function(){
  "use strict";

  function canonical(src){
    return String(src || "").replace("assets/assets/avatars/", "assets/avatars/");
  }

  function install(){
    if(Array.isArray(window.FRITZ_AVATARS)){
      window.FRITZ_AVATARS.forEach(avatar => {
        avatar.src = canonical(avatar.src);
      });
    }

    document.addEventListener("error", event => {
      const img = event.target;
      if(!(img instanceof HTMLImageElement)) return;
      const src = img.getAttribute("src") || "";
      if(src.includes("assets/assets/avatars/")){
        img.src = canonical(src);
      }
    }, true);
  }

  install();
})();
