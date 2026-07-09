const FRITZ_SAVE_KEY = "fritz_academy_save_v1";

function getSave(){
  const old = localStorage.getItem(FRITZ_SAVE_KEY);
  if(old) return JSON.parse(old);

  const fresh = {
    studentName: "",
    puppy: "fritz",
    currentLevel: "1-A",
    xp: 0,
    stars: 0,
    pack: {
      books: 0,
      bricks: 0,
      blueprints: 0,
      seeds: 0,
      tools: 0,
      keys: 0
    },
    completed: {},
    collected: {}
  };

  localStorage.setItem(FRITZ_SAVE_KEY, JSON.stringify(fresh));
  return fresh;
}

function saveGame(data){
  localStorage.setItem(FRITZ_SAVE_KEY, JSON.stringify(data));
}

function resetSave(){
  localStorage.removeItem(FRITZ_SAVE_KEY);
}
