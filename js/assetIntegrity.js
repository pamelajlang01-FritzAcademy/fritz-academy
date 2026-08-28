/* Fritz Academy production asset integrity. Runs after lesson content is loaded. */
(function(){
  if(typeof LEVELS==='undefined'||!Array.isArray(LEVELS)) return;
  const CANONICAL_IMAGES=new Set([
    'assets/academy.png','assets/alphabet-blocks.png','assets/bash.png','assets/bear.png','assets/captain_fritz.png','assets/nola.png','assets/rascal.png','assets/tony.png'
  ]);
  const ALPHABET_VIDEO='assets/alphabet-song-small.mp4';
  const WELCOME_VIDEO='assets/welcome-song-small.mp4';
  const report={ok:true,mediaFixed:0,missingCanonicalImages:[],nonCanonicalImages:[]};
  const normalizeMedia=(m,kind)=>{
    if(!m) return;
    const expected=kind==='welcome'?WELCOME_VIDEO:ALPHABET_VIDEO;
    if(m.videoPath!==expected||m.assetPath!==expected){m.videoPath=expected;m.assetPath=expected;report.mediaFixed++;}
  };
  LEVELS.forEach(l=>{
    if(!l) return;
    normalizeMedia(l.alphabetSong,'alphabet');
    if(l.closingSong) normalizeMedia(l.closingSong,'welcome');
    [l.story,l.reader1,l.reader2].forEach(section=>{
      if(!section||!Array.isArray(section.pages)) return;
      section.pages.forEach(p=>{
        if(!p||!p.image) return;
        if(!CANONICAL_IMAGES.has(p.image)) report.nonCanonicalImages.push({lesson:l.id,title:l.title,image:p.image});
      });
    });
  });
  report.ok=report.nonCanonicalImages.length===0;
  window.FRITZ_ASSET_CANON={images:Array.from(CANONICAL_IMAGES),alphabetVideo:ALPHABET_VIDEO,welcomeVideo:WELCOME_VIDEO};
  window.FRITZ_ASSET_REPORT=report;
  if(!report.ok) console.warn('Fritz asset integrity warnings',report);
})();