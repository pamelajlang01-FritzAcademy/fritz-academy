/* Fritz Academy 53.9 — cast identity, scale, and welcome-flow lock */
(function(){
'use strict';

window.FRITZ_CAST = Object.freeze({
  captainFritz:{name:'Captain Fritz',breed:'Dalmatian',role:'Mentor / Teacher / Retired Boat Captain',leader:false,scale:1.00,look:'white nautical captain uniform with gold trim'},
  bash:{name:'Bash',breed:'German Shepherd',role:'Actual puppy leader',leader:true,scale:1.18,ageOrder:'younger brother',eyes:'brown',look:'oversized puppy face; mostly black with tan markings; one floppy ear',asset:'assets/characters/approved/bash/sweatsuit-idle.png'},
  bear:{name:'Bear',breed:'German Shepherd',role:'Older brother / adventurous helper',leader:false,scale:0.92,ageOrder:'older brother',eyes:'brown',look:'full shepherd; tan dominant with black saddle/markings; smaller than Bash',asset:'assets/characters/approved/bear/sweatsuit-idle.png'},
  nola:{name:'Nola',breed:'Cane Corso',role:'Observer / connector',leader:false,scale:1.00,look:'Cane Corso puppy; notices trouble and gets Bash and Tony'},
  tony:{name:'Tony',breed:'Schnoodle',role:'Oldest puppy / talker / self-appointed boss',leader:false,scale:0.62,look:'small white fluffy Schnoodle; round glasses always'},
  rascal:{name:'Rascal',breed:'Golden Retriever',role:'Troublemaker / adventure starter',leader:false,scale:0.82,look:'Golden Retriever puppy; energetic and mischievous'}
});

// Story behavior rules used by new lesson scripts and scene validators.
window.FRITZ_CAST_BEHAVIOR = Object.freeze({
  trouble:['rascal','bear'],
  notices:'nola',
  talksFirst:'tony',
  decides:'bash',
  mentors:'captainFritz',
  mentorRule:'Captain Fritz gives clues, asks questions, and lets the puppies and student solve the problem.'
});

// Never use the welcome song/video as a generic closing song.
function removeWelcomeFromClosings(){
  if(!Array.isArray(window.LEVELS)) return;
  window.LEVELS.forEach(level=>{
    if(!level) return;
    if(level.closingSong){
      const path=String(level.closingSong.videoPath||level.closingSong.assetPath||level.closingSong.audioPath||'');
      if(path.includes('welcome-song-small.mp4')) level.closingSong=null;
    }
  });
}
removeWelcomeFromClosings();

// Defensive override: completion goes to the lesson completion screen, not Welcome video.
if(window.LessonEngine){
  const originalClosing=LessonEngine.prototype.showClosingSong;
  LessonEngine.prototype.showClosingSong=function(){
    const closing=this.lesson&&this.lesson.closingSong;
    const p=closing&&String(closing.videoPath||closing.assetPath||closing.audioPath||'');
    if(!closing || p.includes('welcome-song-small.mp4')){
      if(typeof this.showCompletion==='function') return this.showCompletion();
      if(typeof this.completeLesson==='function') return this.completeLesson();
      return;
    }
    return originalClosing.call(this);
  };
}

window.FRITZ_CAST_LOCK='53.9';
})();
