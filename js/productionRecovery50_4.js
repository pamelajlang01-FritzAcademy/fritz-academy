/* Fritz Academy production recovery v50.4 */
(function(){
  "use strict";

  function activeSave(){
    try { return typeof getSave === "function" ? getSave() : null; }
    catch { return null; }
  }

  function forceProfileChooser(){
    const profiles = window.fritzStudentProfiles;
    const save = activeSave();
    if(!profiles || !save) return;
    profiles.injectStyles?.();
    profiles.createSwitchButton?.();
    const needsAvatar = !save.avatar;
    if(needsAvatar || !document.querySelector(".fritz-profile-overlay")){
      profiles.showChooser();
    }
  }

  function avatarSource(save){
    if(!save || !save.avatar) return "";
    const library = window.FritzIllustrationLibrary;
    const avatar = library && Array.isArray(library.avatars)
      ? library.avatars.find(item => item.id === save.avatar)
      : null;
    return avatar ? avatar.src : (String(save.avatar).includes("/") ? save.avatar : "");
  }

  function installStudentToken(){
    const game = window.game || (window.Phaser && Phaser.GAMES && Phaser.GAMES[0]);
    const scene = game && game.scene && game.scene.getScene ? game.scene.getScene("World") : null;
    if(!scene || !scene.player) return false;
    const save = scene.save || activeSave();
    const src = avatarSource(save);
    if(!src){ forceProfileChooser(); return true; }

    const key = `fa-player-${save.avatar}`;
    const apply = () => {
      if(!scene.player || !scene.textures.exists(key)) return;
      scene.player.setTexture(key);
      scene.player.setDisplaySize(54, 76);
      if(scene.player.body) scene.player.body.setSize(42, 58, true);
    };

    if(scene.textures.exists(key)) apply();
    else {
      scene.load.image(key, src);
      scene.load.once("complete", apply);
      scene.load.start();
    }
    return true;
  }

  function boot(){
    forceProfileChooser();
    let attempts = 0;
    const timer = setInterval(() => {
      attempts += 1;
      const ready = installStudentToken();
      if(ready || attempts > 80) clearInterval(timer);
    }, 125);
  }

  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once:true });
  else boot();
})();
