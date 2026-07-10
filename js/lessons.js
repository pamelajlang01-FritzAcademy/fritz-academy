const LEVELS = [
  {id:"1-A", title:"Welcome to Fritz Academy", focus:"hello / I am / A B C", reward:"Bronze Key", chapter:"Chapter 1"},
  {id:"1-B", title:"Hello, My Name Is...", focus:"name / my / your / friend", reward:"Friendship Star", chapter:"Chapter 1"},
  {id:"1-C", title:"Colors Around Us", focus:"red / blue / green / yellow", reward:"Color Badge", chapter:"Chapter 1"},

  {id:"2-A", title:"Bear's Lost Backpack", focus:"book / bag / pencil / where", reward:"Book", chapter:"Chapter 2"},
  {id:"2-B", title:"What's In My Backpack?", focus:"school items", reward:"Pencil Box", chapter:"Chapter 2"},
  {id:"2-C", title:"Classroom Treasure Hunt", focus:"here / there / find / look", reward:"Map Piece", chapter:"Chapter 2"},

  {id:"3-A", title:"Nola's Garden Gate", focus:"seed / water / flower / grow", reward:"Seed Pack", chapter:"Chapter 3"},
  {id:"3-B", title:"Counting Flowers", focus:"one / two / three / four / five", reward:"Garden Star", chapter:"Chapter 3"},
  {id:"3-C", title:"Nature Colors", focus:"green / brown / sky / tree", reward:"Nature Badge", chapter:"Chapter 3"},

  {id:"4-A", title:"The Library Light", focus:"read / page / word / open", reward:"Blueprint", chapter:"Chapter 4"},
  {id:"4-B", title:"Story Time", focus:"story / listen / page / again", reward:"Library Book", chapter:"Chapter 4"},
  {id:"4-C", title:"Reading Adventure", focus:"I see / I have / I can", reward:"Library Key", chapter:"Chapter 4"}
];

function findLevel(id){
  return LEVELS.find(level => level.id === id);
}
