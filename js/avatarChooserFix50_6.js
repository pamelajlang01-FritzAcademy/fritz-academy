/* Fritz Academy avatar chooser repair v50.6 */
(function(){
  "use strict";

  const candidates = src => {
    const value = String(src || "");
    const list = [value];
    if(value.includes("assets/assets/")) list.push(value.replace("assets/assets/", "assets/"));
    else if(value.includes("assets/avatars/")) list.push(value.replace("assets/avatars/", "assets/assets/avatars/"));
    return [...new Set(list.filter(Boolean))];
  };

  function repairImage(img){
    if(!img || img.dataset.fritzAvatarRepair === "1") return;
    img.dataset.fritzAvatarRepair = "1";
    const options = candidates(img.getAttribute("src"));
    let index = 0;
    const tryNext = () => {
      index += 1;
      if(index < options.length) img.src = options[index];
      else {
        img.style.display = "none";
        const choice = img.closest(".fritz-avatar-choice");
        if(choice) choice.classList.add("avatar-image-missing");
      }
    };
    img.addEventListener("error", tryNext);
    if(options[0] && img.getAttribute("src") !== options[0]) img.src = options[0];
  }

  function repairAvatarViews(root=document){
    root.querySelectorAll(".fritz-avatar-grid img, .fritz-profile-avatar img").forEach(repairImage);
  }

  function installStyles(){
    if(document.getElementById("fritz-avatar-chooser-fix-style")) return;
    const style = document.createElement("style");
    style.id = "fritz-avatar-chooser-fix-style";
    style.textContent = `
      .fritz-avatar-grid{display:grid!important;grid-template-columns:repeat(auto-fit,minmax(120px,1fr))!important;gap:14px!important;max-height:52vh!important;overflow:auto!important;padding:8px!important}
      .fritz-avatar-choice{display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:flex-start!important;min-height:180px!important;visibility:visible!important;opacity:1!important}
      .fritz-avatar-choice img{display:block;max-width:100%;width:108px;height:132px;object-fit:contain;visibility:visible!important;opacity:1!important}
      .fritz-avatar-choice.avatar-image-missing::before{content:"Avatar image unavailable";display:flex;align-items:center;justify-content:center;width:108px;height:132px;background:#f5f0df;color:#173b6c;font-weight:700;text-align:center;border-radius:10px}
    `;
    document.head.appendChild(style);
  }

  function install(){
    installStyles();
    repairAvatarViews();
    new MutationObserver(mutations => {
      mutations.forEach(mutation => mutation.addedNodes.forEach(node => {
        if(node.nodeType !== 1) return;
        if(node.matches && node.matches(".fritz-avatar-grid img, .fritz-profile-avatar img")) repairImage(node);
        if(node.querySelectorAll) repairAvatarViews(node);
      }));
    }).observe(document.body, {childList:true, subtree:true});
  }

  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", install);
  else install();
})();
