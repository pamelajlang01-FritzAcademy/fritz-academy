/* Fritz Academy curriculum bridge v57.0 */
(function(){
  try{
    const catalog=(typeof LEVELS !== 'undefined' && Array.isArray(LEVELS)) ? LEVELS : [];
    window.FRITZ_LEVELS=catalog;
    window.LEVELS=catalog;
  }catch(_e){
    window.FRITZ_LEVELS=[];
    window.LEVELS=[];
  }
})();