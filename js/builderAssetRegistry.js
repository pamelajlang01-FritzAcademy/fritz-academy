/* Fritz Academy Builder visual registry — illustrated asset files only. No emoji/CSS-art fallbacks. */
(function(){
  'use strict';
  const B='assets/builder/';
  const A={
    sign:B+'academy-sign.svg',lantern:B+'academy-lantern.svg',book:B+'academy-book.svg',map:B+'academy-map.svg',
    backpack:B+'academy-backpack.svg',market:B+'academy-market.svg',calendar:B+'academy-calendar.svg',graduation:B+'academy-graduation.svg',
    care:B+'academy-care.svg',transport:B+'academy-transport.svg',weather:B+'academy-weather.svg',home:B+'academy-home.svg',food:B+'academy-food.svg',crate:B+'academy-builder-crate.svg'
  };
  const pieceAssets={
    'abc-sign':'assets/objects/question-garden-sign.svg','abc-gate':'assets/environments/welcome-garden-open.svg','abc-stones':'assets/alphabet-blocks.png','abc-reader-bench':A.book,'name-flag':A.sign,
    'friend-posts':A.sign,'def-friend-gate':'assets/environments/welcome-garden-open.svg','def-stones':'assets/alphabet-blocks.png','friend-book':A.book,'friend-lamp':A.lantern
  };
  const areaAssets={'welcome-garden':'assets/environments/welcome-garden-open.svg'};
  const test=(text,re)=>re.test(text);
  function fallbackFor(piece){
    const id=String(piece&&piece.id||'').toLowerCase(),name=String(piece&&piece.name||'').toLowerCase(),text=id+' '+name;
    if(test(text,/graduat|badge|diploma|gateway|finish|celebrat|rae/))return A.graduation;
    if(test(text,/calendar|planner|schedule|day|week|time|clock/))return A.calendar;
    if(test(text,/care|help|first.?aid|well|need|rest|water|safe/))return A.care;
    if(test(text,/market|shop|store|price|money|basket|stall|buy|sell/))return A.market;
    if(test(text,/map|direction|compass|route|path|trail|where|town|street|road/))return A.map;
    if(test(text,/backpack|bag|pack|pocket|supply|gear|kit/))return A.backpack;
    if(test(text,/bus|car|train|transport|ride|vehicle|travel|station|stop/))return A.transport;
    if(test(text,/weather|rain|sun|cloud|wind|storm|temperature|forecast/))return A.weather;
    if(test(text,/home|house|room|bed|door|window|family|shelf|table/))return A.home;
    if(test(text,/food|fruit|meal|snack|apple|bread|drink|kitchen|lunch|dinner|breakfast/))return A.food;
    if(test(text,/book|reader|story|page|library|note|card|profile/))return A.book;
    if(test(text,/lamp|lantern|light|beacon|signal/))return A.lantern;
    if(test(text,/sign|post|flag|marker|label|board|name|job|profession/))return A.sign;
    if(test(text,/letter|alphabet|phonics|sound|abc|def|ghi|jkl|mno|pqr|stu|vwx|yz|stone|word/))return 'assets/alphabet-blocks.png';
    return A.crate;
  }
  function areaPath(areaId){
    const id=String(areaId||'').toLowerCase();
    if(areaAssets[id])return areaAssets[id];
    if(/graduat|gateway|rae|beacon/.test(id))return A.graduation;
    if(/planner|schedule|calendar|day|week/.test(id))return A.calendar;
    if(/care|help|well/.test(id))return A.care;
    if(/market|shop|store/.test(id))return A.market;
    if(/direction|map|town|route|street/.test(id))return A.map;
    if(/backpack|package|pack/.test(id))return A.backpack;
    if(/transport|station|travel/.test(id))return A.transport;
    if(/weather/.test(id))return A.weather;
    if(/home|family/.test(id))return A.home;
    if(/food|kitchen/.test(id))return A.food;
    return 'assets/academy.png';
  }
  window.FRITZ_BUILDER_ASSETS={
    piecePath(piece){return pieceAssets[piece&&piece.id]||fallbackFor(piece);},
    areaPath,
    pieceAssets,areaAssets,illustratedAssets:A,
    policy:'illustrated-assets-only'
  };
})();