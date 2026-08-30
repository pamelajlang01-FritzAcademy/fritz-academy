/* Fritz Academy production asset integrity. Runs after lesson content is loaded. */
(function(){
  'use strict';
  if(typeof LEVELS==='undefined'||!Array.isArray(LEVELS)) return;

  const CHARACTER_IMAGES=new Set([
    'assets/bash.png','assets/bear.png','assets/captain_fritz.png',
    'assets/nola.png','assets/rascal.png','assets/tony.png'
  ]);
  const WORLD_IMAGES=new Set([
    'assets/academy.png','assets/alphabet-blocks.png','assets/badges.png',
    'assets/board-game.png','assets/fritz_academy_world_map.png',
    'assets/environments/welcome-garden-open.svg',
    'assets/environments/question-garden-premium.svg',
    'assets/charts/activity-chart.svg','assets/charts/feelings-chart.svg',
    'assets/objects/question-flower-bed-premium.svg',
    'assets/objects/question-flower-bed.svg',
    'assets/objects/question-garden-sign.svg',
    'assets/objects/question-lantern-premium.svg',
    'assets/objects/question-lantern.svg',
    'assets/objects/question-sign-premium.svg',
    'assets/scenes/lesson4-how.svg','assets/scenes/lesson4-what.svg',
    'assets/scenes/lesson4-when.svg','assets/scenes/lesson4-where.svg',
    'assets/scenes/lesson4-who.svg','assets/scenes/lesson4-why.svg',
    'assets/feelings/excited-face.svg','assets/feelings/happy-face.svg',
    'assets/feelings/tired-face.svg'
  ]);
  const CANONICAL_IMAGES=new Set([...CHARACTER_IMAGES,...WORLD_IMAGES]);
  const ALPHABET_VIDEO='assets/alphabet-song-small.mp4';
  const WELCOME_VIDEO='assets/welcome-song-small.mp4';
  const HUMAN_PATH=/\/avatars\/(?:girl|boy)\//i;
  const report={ok:true,mediaFixed:0,humanReferences:[],unknownImages:[],knownImagesUsed:[]};

  const normalizeMedia=(m,kind)=>{
    if(!m) return;
    const expected=kind==='welcome'?WELCOME_VIDEO:ALPHABET_VIDEO;
    if(m.videoPath!==expected||m.assetPath!==expected){m.videoPath=expected;m.assetPath=expected;report.mediaFixed++;}
  };
  const inspectImage=(lesson,section,page)=>{
    if(!page||!page.image) return;
    const image=String(page.image);
    if(HUMAN_PATH.test(image)){
      report.humanReferences.push({lesson:lesson.id,title:lesson.title,section,image});
      /* Never render obsolete human avatars in Fritz. Use the Academy world as the safe canonical fallback. */
      page.image='assets/academy.png';
      return;
    }
    if(CANONICAL_IMAGES.has(image)) report.knownImagesUsed.push({lesson:lesson.id,section,image});
    else report.unknownImages.push({lesson:lesson.id,title:lesson.title,section,image});
  };

  LEVELS.forEach(l=>{
    if(!l) return;
    normalizeMedia(l.alphabetSong,'alphabet');
    if(l.closingSong) normalizeMedia(l.closingSong,'welcome');
    [['story',l.story],['reader1',l.reader1],['reader2',l.reader2]].forEach(([name,section])=>{
      if(!section||!Array.isArray(section.pages)) return;
      section.pages.forEach(p=>inspectImage(l,name,p));
    });
  });

  report.ok=report.humanReferences.length===0;
  window.FRITZ_ASSET_CANON={
    characters:Array.from(CHARACTER_IMAGES),
    world:Array.from(WORLD_IMAGES),
    images:Array.from(CANONICAL_IMAGES),
    alphabetVideo:ALPHABET_VIDEO,
    welcomeVideo:WELCOME_VIDEO,
    dogsOnly:true
  };
  window.FRITZ_ASSET_REPORT=report;
  if(report.humanReferences.length) console.warn('Fritz human assets were blocked and replaced',report.humanReferences);
  if(report.unknownImages.length) console.info('Fritz images outside the registered visual library',report.unknownImages);
})();