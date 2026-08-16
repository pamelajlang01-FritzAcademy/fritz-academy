/* Fritz Academy production Builder art resolver v58
   Uses the real illustrated object library from recovery-v50-1-exact.
   No CSS/vector stand-ins for core Academy rewards. */
(function(){
'use strict';
const RAW='https://raw.githubusercontent.com/pamelajlang01-FritzAcademy/fritz-academy/recovery-v50-1-exact/';
const A={
  flowers:RAW+'assets/objects/welcome_flowers.png',
  bench:RAW+'assets/objects/reading_bench.png',
  tree:RAW+'assets/objects/garden_tree.png',
  path:RAW+'assets/objects/stone_path.png',
  pawPath:RAW+'assets/objects/paw_print_stepping_stones.png',
  fence:RAW+'assets/objects/garden_fence.png',
  readingCircle:RAW+'assets/objects/reading_circle.png',
  chair:RAW+'assets/objects/reading_chair.png',
  cart:RAW+'assets/objects/book_cart.png',
  shelf:RAW+'assets/objects/book_shelf.png',
  flag:RAW+'assets/objects/academy_flag.png',
  bell:RAW+'assets/objects/academy_bell.png',
  mailbox:RAW+'assets/objects/academy_mailbox.png',
  stump:RAW+'assets/objects/outdoor_story_stump.png',
  trophy:RAW+'assets/objects/trophy_display.png',
  fritzStatue:RAW+'assets/objects/captain_fritz_statue.png',
  gate:RAW+'assets/environments/academy_gate.png',
  academyFront:RAW+'assets/environments/academy_front.png',
  bridge:RAW+'assets/environments/bridge.png',
  workshop:RAW+'assets/environments/builder_workshop.png',
  pond:RAW+'assets/environments/stream.png',
  letters:'assets/alphabet-blocks.png'
};
function resolve(piece){
  const n=String(piece&&piece.name||'').toLowerCase();
  const id=String(piece&&piece.id||'').toLowerCase();
  if(id.includes('letter')||n.includes('letter')||n.includes('alphabet gate')) return n.includes('gate')?A.gate:A.letters;
  if(n.includes('flower')||n.includes('rose')||n.includes('butterfly')||n.includes('garden bed')) return A.flowers;
  if(n.includes('bench')) return A.bench;
  if(n.includes('tree')) return A.tree;
  if(n.includes('path')||n.includes('trail')||n.includes('stepping')) return n.includes('paw')?A.pawPath:A.path;
  if(n.includes('fence')) return A.fence;
  if(n.includes('reading circle')||n.includes('picnic')) return A.readingCircle;
  if(n.includes('chair')) return A.chair;
  if(n.includes('cart')) return A.cart;
  if(n.includes('rack')||n.includes('shelf')||n.includes('desk')||n.includes('table')) return A.shelf;
  if(n.includes('flag')||n.includes('banner')) return A.flag;
  if(n.includes('bell')) return A.bell;
  if(n.includes('mail')||n.includes('post')||n.includes('sign')||n.includes('marker')||n.includes('map')) return A.mailbox;
  if(n.includes('stump')||n.includes('story tree')) return A.stump;
  if(n.includes('trophy')||n.includes('festival')) return A.trophy;
  if(n.includes('fritz statue')) return A.fritzStatue;
  if(n.includes('gate')||n.includes('door')||n.includes('arch')) return A.gate;
  if(n.includes('bridge')||n.includes('dock')) return A.bridge;
  if(n.includes('workshop')||n.includes('tool shed')||n.includes('storm-safe shed')||n.includes('shed')) return A.workshop;
  if(n.includes('pond')||n.includes('fish')||n.includes('water')||n.includes('weather')||n.includes('windmill')) return A.pond;
  if(n.includes('kite')) return A.flag;
  return A.mailbox;
}
window.FRITZ_BUILDER_ART=Object.freeze({...A,resolve});
window.FRITZ_BUILDER_ART_VERSION='58.0-real-png';
})();