/* Fritz Academy Builder visual registry — uses owned/canonical Fritz assets first. */
(function(){
  'use strict';
  const pieceAssets={
    'abc-sign':'assets/objects/question-garden-sign.svg',
    'abc-gate':'assets/environments/welcome-garden-open.svg',
    'abc-stones':'assets/alphabet-blocks.png',
    'abc-reader-bench':'assets/objects/question-flower-bed-premium.svg',
    'name-flag':'assets/objects/question-sign-premium.svg',
    'friend-posts':'assets/objects/question-sign-premium.svg',
    'def-friend-gate':'assets/environments/welcome-garden-open.svg',
    'def-stones':'assets/alphabet-blocks.png',
    'friend-book':'assets/board-game.png',
    'friend-lamp':'assets/objects/question-lantern-premium.svg'
  };
  const areaAssets={
    'welcome-garden':'assets/environments/welcome-garden-open.svg'
  };
  function fallbackFor(piece){
    const id=String(piece&&piece.id||'').toLowerCase(),name=String(piece&&piece.name||'').toLowerCase();
    const text=id+' '+name;
    if(/letter|alphabet|abc|def|ghi|stone/.test(text))return 'assets/alphabet-blocks.png';
    if(/lamp|lantern|light/.test(text))return 'assets/objects/question-lantern-premium.svg';
    if(/sign|post|flag|marker/.test(text))return 'assets/objects/question-sign-premium.svg';
    if(/garden|gate|path|flower|plant/.test(text))return 'assets/objects/question-flower-bed-premium.svg';
    if(/book|reader|game|card/.test(text))return 'assets/board-game.png';
    return '';
  }
  window.FRITZ_BUILDER_ASSETS={
    piecePath(piece){return pieceAssets[piece&&piece.id]||fallbackFor(piece);},
    areaPath(areaId){return areaAssets[areaId]||'assets/academy.png';},
    pieceAssets,areaAssets
  };
})();