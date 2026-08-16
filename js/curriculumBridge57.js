/* Fritz Academy curriculum bridge v57.0 */
(function(){
  try{
    window.FRITZ_LEVELS = (typeof LEVELS !== 'undefined' && Array.isArray(LEVELS)) ? LEVELS : [];
  }catch(_e){
    window.FRITZ_LEVELS = [];
  }
})();