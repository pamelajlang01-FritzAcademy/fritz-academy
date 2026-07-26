/* Fritz Academy Lesson 3 sequence and reward correction v50.39 */
(function(){
  "use strict";

  function piece(id,name,icon){
    return {id,name,icon,area:"welcome-garden",lesson:"1-C"};
  }

  function applyLesson3(){
    if(typeof findLevel!=="function") return;
    const lesson=findLevel("1-C");
    if(!lesson) return;

    lesson.title="Follow the Garden Map";

    lesson.story={
      title:"The G-H-I Garden Clues",
      pages:[
        {text:"Captain Fritz opens the map beside the garden gate.",image:"assets/environments/welcome_garden.png"},
        {text:"The first clue shows green grapes under a tree.",image:"assets/nola.png"},
        {text:"Nola finds the grapes and points to a large G.",image:"assets/nola.png"},
        {text:"Bear follows the path and finds a blue hat beside the hedge.",image:"assets/bear.png"},
        {text:"Tony spots an insect near a small sign marked I.",image:"assets/tony.png"},
        {text:"The friends place G, H, and I on the map and open the reading corner.",image:"assets/captain_fritz.png"}
      ],
      questions:[
        {prompt:"Who opens the map?",options:["Captain Fritz","Bear","Nola"],answer:"Captain Fritz"},
        {prompt:"What does Nola find?",options:["Grapes","A book","A bell"],answer:"Grapes"},
        {prompt:"What does Bear find?",options:["A hat","A fish","A key"],answer:"A hat"},
        {prompt:"What does Tony see?",options:["An insect","A kite","A drum"],answer:"An insect"},
        {prompt:"Which letters open the corner?",options:["G, H, I","A, B, C","D, E, F"],answer:"G, H, I"}
      ],
      rewardPiece:piece("reading-chair","Garden Reading Chair","🪑")
    };

    lesson.phonics=Object.assign({},lesson.phonics||{}, {
      rewardPiece:piece("outdoor-story-stump","Outdoor Story Stump","🪵")
    });

    if(lesson.feelingsActivity) lesson.feelingsActivity.rewardPiece=null;
    if(lesson.reader1){
      lesson.reader1.check={prompt:"What is by the hedge?",options:["A hat","A fish","A bus"],answer:"A hat"};
      lesson.reader1.rewardPiece=null;
    }
    if(lesson.reader2){
      lesson.reader2.check={prompt:"What do the friends open?",options:["The reading corner","The classroom","The gate"],answer:"The reading corner"};
      lesson.reader2.rewardPiece=piece("book-shelf","Garden Book Shelf","📚");
    }

    lesson.build={
      areaId:"welcome-garden",
      stage:3,
      title:"Build the Reading Corner",
      requiredPieces:["reading-chair","outdoor-story-stump","book-shelf"],
      completionMessage:"You completed the Welcome Garden reading corner."
    };
  }

  applyLesson3();

  if(typeof LessonEngine!=="undefined"){
    const priorReward=LessonEngine.prototype.rewardPiece;
    LessonEngine.prototype.rewardPiece=function(pieceData,message,callback){
      if(!pieceData){
        if(typeof callback==="function") callback();
        return;
      }
      return priorReward.call(this,pieceData,message,callback);
    };

    const priorFeelingsIntro=LessonEngine.prototype.showFeelingsActivityIntro;
    LessonEngine.prototype.showFeelingsActivityIntro=function(){
      if(this.levelId==="1-C"){
        this.startStory();
        return;
      }
      return priorFeelingsIntro.apply(this,arguments);
    };

    const priorStartStory=LessonEngine.prototype.startStory;
    LessonEngine.prototype.startStory=function(){
      if(this.levelId==="1-C" && this.storyEngine){
        this.questionIndex=0;
        this.storyPage=0;
        this.storyEngine.start(this.lesson,()=>this.showAlphabetSong());
        return;
      }
      return priorStartStory.apply(this,arguments);
    };
  }

  window.FritzLesson3SequenceRewardFix5039={version:"50.39"};
})();