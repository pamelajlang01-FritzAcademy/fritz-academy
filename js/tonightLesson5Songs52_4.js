/* Fritz Academy 52.4 — explicit song safeguard for tonight's fifth adventure */
(function(){
  'use strict';
  const level = typeof findLevel === 'function' ? findLevel('2-A') : null;
  if(!level) return;

  level.alphabetSong = {
    title: 'Fritz Academy Alphabet Song — A through H Review',
    assetPath: 'assets/audio/alphabet-song.mp3',
    videoPath: 'assets/video/alphabet-song.mp4',
    rewardMessage: 'Sing the alphabet with Captain Fritz and review A through H.'
  };

  level.closingSong = {
    title: 'Fritz Academy Welcome Song — Academy Celebration',
    assetPath: 'assets/audio/welcome-song.mp3',
    videoPath: 'assets/video/welcome-song.mp4',
    rewardMessage: 'Celebrate the new pieces added to your Academy.'
  };

  window.FRITZ_TONIGHT_SONG_REPORT = {
    lessonId: '2-A',
    alphabetSong: level.alphabetSong.videoPath,
    closingSong: level.closingSong.videoPath,
    audioFallbacks: [level.alphabetSong.assetPath, level.closingSong.assetPath]
  };
})();
