const FRITZ_PROFILES_KEY = "fritz_academy_profiles_v3_clean";

function fritzDefaultPack(){
  return {books:0,bricks:0,blueprints:0,seeds:0,tools:0,keys:0};
}
function fritzStudentId(name){
  const base=String(name||"").trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");
  return base || `student-${Date.now()}`;
}
function fritzSpelling(name){
  return String(name||"").trim().toUpperCase().split("").filter(c=>c!==" ").join("-");
}
function fritzNewStudent(name,avatar=""){
  return {
    id:fritzStudentId(name),studentName:String(name||"").trim(),studentSpelling:fritzSpelling(name),
    homeLanguage:"",age:null,avatar:String(avatar||""),puppy:String(avatar||"")||"fritz",
    currentLevel:"1-A",currentCheckpoint:"opening",reviewMode:false,
    xp:0,stars:0,pack:fritzDefaultPack(),completed:{},collected:{},
    unlockedLevels:["1-A"],lessonProgress:{},academyBuilds:{},placedBuilds:{},builderWorlds:{},
    createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()
  };
}
function fritzLoadProfiles(){
  try{
    const parsed=JSON.parse(localStorage.getItem(FRITZ_PROFILES_KEY)||"null");
    if(parsed&&parsed.students) return parsed;
  }catch(e){ console.warn("Fritz Academy clean save could not be read.",e); }
  return {activeStudentId:"",students:{}};
}
function fritzStoreProfiles(data){localStorage.setItem(FRITZ_PROFILES_KEY,JSON.stringify(data));}
function listStudents(){return Object.values(fritzLoadProfiles().students||{}).sort((a,b)=>(a.createdAt||"").localeCompare(b.createdAt||""));}
function getActiveStudentId(){return fritzLoadProfiles().activeStudentId||"";}
function getSave(){
  const data=fritzLoadProfiles(),id=data.activeStudentId;
  if(id&&data.students[id]) return JSON.parse(JSON.stringify(data.students[id]));
  return fritzNewStudent("");
}
function saveGame(student){
  if(!student||!student.studentName) return student;
  const data=fritzLoadProfiles();
  student.updatedAt=new Date().toISOString();
  data.students[student.id]=JSON.parse(JSON.stringify(student));
  data.activeStudentId=student.id;
  fritzStoreProfiles(data);
  return student;
}
function createStudent(name,spelling="",avatar=""){
  const data=fritzLoadProfiles(),student=fritzNewStudent(name,avatar);
  if(spelling) student.studentSpelling=String(spelling);
  let id=student.id,n=2;
  while(data.students[id]) id=`${student.id}-${n++}`;
  student.id=id;
  data.students[id]=student;
  data.activeStudentId=id;
  fritzStoreProfiles(data);
  return JSON.parse(JSON.stringify(student));
}
function selectStudent(studentId){
  const data=fritzLoadProfiles();
  if(!data.students[studentId]) return null;
  data.activeStudentId=studentId;fritzStoreProfiles(data);
  return JSON.parse(JSON.stringify(data.students[studentId]));
}
function updateStudentAvatar(studentId,avatarId){
  const data=fritzLoadProfiles();
  if(!data.students[studentId]) return null;
  data.students[studentId].avatar=String(avatarId||"");
  data.students[studentId].puppy=String(avatarId||"")||"fritz";
  data.students[studentId].updatedAt=new Date().toISOString();
  fritzStoreProfiles(data);
  return JSON.parse(JSON.stringify(data.students[studentId]));
}
function deleteStudent(studentId){
  const data=fritzLoadProfiles();
  delete data.students[studentId];
  if(data.activeStudentId===studentId) data.activeStudentId=Object.keys(data.students)[0]||"";
  fritzStoreProfiles(data);return true;
}
window.FRITZ_SAVE_VERSION="60.0-clean-avatar-compatible";
