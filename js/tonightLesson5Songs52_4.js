/* Fritz Academy 52.4 — preserve both songs in tonight's fifth adventure */
(function(){
  'use strict';

  const level = typeof findLevel === 'function' ? findLevel('2-A') : null;
  if(level){
    level.alphabetSong = Object.assign({}, level.alphabetSong, {
      title: 'Fritz Academy Alphabet Song — A through H Review',
      assetPath: 'assets/video/alphabet-song.mp4',
      videoPath: 'assets/video/alphabet-song.mp4',
      rewardMessage: 'Sing A through H with Captain Fritz before the phonics challenge.'
    });
    level.closingSong = {
      title: 'Fritz Academy Welcome Song',
      assetPath: 'assets/video/welcome-song.mp4',
      videoPath: 'assets/video/welcome-song.mp4',
      rewardMessage: 'Celebrate the new pieces saved in your Academy.'
    };
  }

  if(typeof CompletionEngine === 'undefined') return;
  const original = CompletionEngine.prototype.showSummary;
  if(original.__lesson2ASongs52_4) return;

  CompletionEngine.prototype.showSummary = function(lesson, completion, wasComplete){
    if(!lesson || lesson.id !== '2-A' || !lesson.closingSong){
      return original.call(this, lesson, completion, wasComplete);
    }

    const song = lesson.closingSong;
    const title = this.scene.add.text(0,-195,'Academy Adventure Complete!',{
      fontSize:'38px',fontStyle:'bold',color:'#2f7d32'
    }).setOrigin(0.5);
    const stars = this.scene.add.text(0,-112,'⭐'.repeat(Math.max(1,Number(completion.stars)||1)),{
      fontSize:'56px'
    }).setOrigin(0.5);
    const body = this.scene.add.text(0,-5,
      `${completion.message || 'Excellent work!'}\n\n${song.rewardMessage}`,
      {fontSize:'24px',fontStyle:'bold',color:'#102342',align:'center',wordWrap:{width:680},lineSpacing:8}
    ).setOrigin(0.5);

    const play = this.scene.panels.makeButton(-170,165,'Play Celebration Song',()=>{
      this.lessonEngine.playMedia(song.videoPath,song.assetPath);
    });
    const finish = this.scene.panels.makeButton(170,165,'Return to Academy',()=>{
      this.lessonEngine.stopMedia();
      this.scene.panels.close();
      if(typeof this.scene.refreshHUD === 'function') this.scene.refreshHUD();
      if(typeof this.scene.showAdventureLog === 'function') this.scene.showAdventureLog();
    });

    this.scene.panels.open([title,stars,body,play,finish],{width:820,height:560});
  };

  CompletionEngine.prototype.showSummary.__lesson2ASongs52_4 = true;
  CompletionEngine.prototype.showSummary.__original = original;

  window.FRITZ_LESSON5_SONG_REPORT = {
    lessonId:'2-A',
    alphabetSong:'assets/video/alphabet-song.mp4',
    closingSong:'assets/video/welcome-song.mp4',
    sequence:['story questions','story reward','alphabet song','phonics','reader 1','reader 1 reward','reader 2','reader 2 reward','builder','closing song']
  };
})();
