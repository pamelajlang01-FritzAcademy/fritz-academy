const FRITZ_LEGACY_SAVE_KEY = "fritz_academy_save_v1";
const FRITZ_PROFILES_KEY = "fritz_academy_profiles_v2";

function createDefaultPack(){
  return {
    books: 0,
    bricks: 0,
    blueprints: 0,
    seeds: 0,
    tools: 0,
    keys: 0
  };
}

function createDefaultStudent(
  name = "",
  spelling = "",
  avatar = ""
){
  return {
    id: createStudentId(name),

    studentName: name,
    studentSpelling:
      spelling ||
      formatSpelling(name),

    avatar: avatar,

    /*
      Kept for compatibility with the existing
      Version 31 game.js code.
    */
    puppy: avatar || "fritz",

    currentLevel: "1-A",
    currentCheckpoint: "opening",
    reviewMode: false,

    xp: 0,
    stars: 0,

    pack: createDefaultPack(),

    completed: {},
    collected: {},

    unlockedLevels: ["1-A"],
    lessonProgress: {},
    academyBuilds: {},
    placedBuilds: {},

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

function createProfilesData(){
  return {
    activeStudentId: "",
    students: {}
  };
}

function createStudentId(name){
  const cleaned = String(name || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if(cleaned){
    return cleaned;
  }

  return `student-${Date.now()}`;
}

function formatSpelling(name){
  return String(name || "")
    .trim()
    .toUpperCase()
    .split("")
    .filter(character => character !== " ")
    .join("-");
}

function safeParse(value){
  if(!value){
    return null;
  }

  try{
    return JSON.parse(value);
  }catch(error){
    console.warn(
      "Fritz Academy could not read saved data:",
      error
    );

    return null;
  }
}

function cloneData(value){
  return JSON.parse(
    JSON.stringify(value)
  );
}

function normalizePack(pack){
  return {
    ...createDefaultPack(),
    ...(pack || {})
  };
}

function normalizeStudent(student){
  const source = student || {};

  const normalizedName =
    source.studentName ||
    source.name ||
    "";

  const base = createDefaultStudent(
    normalizedName,
    source.studentSpelling ||
      source.spelling ||
      "",
    source.avatar ||
      (
        source.puppy &&
        source.puppy !== "fritz"
          ? source.puppy
          : ""
      )
  );

  const normalized = {
    ...base,
    ...source,

    id:
      source.id ||
      createStudentId(normalizedName),

    studentName: normalizedName,

    studentSpelling:
      source.studentSpelling ||
      source.spelling ||
      formatSpelling(normalizedName),

    avatar:
      source.avatar ||
      (
        source.puppy &&
        source.puppy !== "fritz"
          ? source.puppy
          : ""
      ),

    puppy:
      source.avatar ||
      source.puppy ||
      "fritz",

    currentLevel:
      source.currentLevel ||
      "1-A",

    currentCheckpoint:
      source.currentCheckpoint ||
      source.checkpoint ||
      "opening",

    reviewMode:
      Boolean(source.reviewMode),

    xp:
      Number(source.xp) || 0,

    stars:
      Number(source.stars) || 0,

    pack:
      normalizePack(source.pack),

    completed:
      source.completed || {},

    collected:
      source.collected || {},

    unlockedLevels:
      Array.isArray(source.unlockedLevels)
        ? source.unlockedLevels
        : ["1-A"],

    lessonProgress:
      source.lessonProgress || {},

    academyBuilds:
      source.academyBuilds || {},

    placedBuilds:
      source.placedBuilds || {},

    createdAt:
      source.createdAt ||
      new Date().toISOString(),

    updatedAt:
      source.updatedAt ||
      new Date().toISOString()
  };

  /*
    One-time migration:
    the classroom test profile becomes Nick,
    while retaining every item and checkpoint.
  */
  if(
    normalized.studentName
      .trim()
      .toLowerCase() === "test"
  ){
    normalized.studentName = "Nick";
    normalized.studentSpelling = "N-I-C-K";
    normalized.id = "nick";
  }

  return normalized;
}

function loadProfilesData(){
  const storedProfiles = safeParse(
    localStorage.getItem(
      FRITZ_PROFILES_KEY
    )
  );

  if(
    storedProfiles &&
    storedProfiles.students
  ){
    const normalizedProfiles =
      createProfilesData();

    Object.values(
      storedProfiles.students
    ).forEach(student => {
      const normalized =
        normalizeStudent(student);

      normalizedProfiles.students[
        normalized.id
      ] = normalized;
    });

    let activeStudentId =
      storedProfiles.activeStudentId;

    /*
      If the old active ID was "test",
      point it to the migrated Nick profile.
    */
    if(activeStudentId === "test"){
      activeStudentId = "nick";
    }

    if(
      activeStudentId &&
      normalizedProfiles.students[
        activeStudentId
      ]
    ){
      normalizedProfiles.activeStudentId =
        activeStudentId;
    }else{
      normalizedProfiles.activeStudentId =
        Object.keys(
          normalizedProfiles.students
        )[0] || "";
    }

    saveProfilesData(
      normalizedProfiles
    );

    return normalizedProfiles;
  }

  return migrateLegacySave();
}

function migrateLegacySave(){
  const profiles = createProfilesData();

  const legacy = safeParse(
    localStorage.getItem(
      FRITZ_LEGACY_SAVE_KEY
    )
  );

  if(legacy){
    const migrated =
      normalizeStudent(legacy);

    /*
      The existing classroom profile was called
      Test. It becomes Nick automatically.
    */
    if(
      !migrated.studentName ||
      migrated.studentName
        .trim()
        .toLowerCase() === "test"
    ){
      migrated.studentName = "Nick";
      migrated.studentSpelling = "N-I-C-K";
      migrated.id = "nick";
    }

    profiles.students[
      migrated.id
    ] = migrated;

    profiles.activeStudentId =
      migrated.id;
  }

  saveProfilesData(profiles);

  return profiles;
}

function saveProfilesData(profiles){
  localStorage.setItem(
    FRITZ_PROFILES_KEY,
    JSON.stringify(profiles)
  );
}

function getProfiles(){
  return loadProfilesData();
}

function listStudents(){
  const profiles =
    loadProfilesData();

  return Object.values(
    profiles.students
  ).sort((first, second) => {
    return first.studentName.localeCompare(
      second.studentName
    );
  });
}

function getActiveStudentId(){
  const profiles =
    loadProfilesData();

  return profiles.activeStudentId;
}

function getActiveStudent(){
  const profiles =
    loadProfilesData();

  if(
    profiles.activeStudentId &&
    profiles.students[
      profiles.activeStudentId
    ]
  ){
    return profiles.students[
      profiles.activeStudentId
    ];
  }

  return null;
}

/*
  Existing Version 31 compatibility:
  game.js calls getSave() and expects one student save.
*/
function getSave(){
  const profiles =
    loadProfilesData();

  let student =
    profiles.students[
      profiles.activeStudentId
    ];

  if(!student){
    student =
      createDefaultStudent();

    profiles.students[
      student.id
    ] = student;

    profiles.activeStudentId =
      student.id;

    saveProfilesData(profiles);
  }

  return cloneData(student);
}

/*
  Existing Version 31 compatibility:
  game.js and lessonEngine.js call saveGame(save).
*/
function saveGame(data){
  const profiles =
    loadProfilesData();

  const normalized =
    normalizeStudent(data);

  normalized.updatedAt =
    new Date().toISOString();

  /*
    If a blank temporary profile later receives
    a real name, update its ID safely.
  */
  const oldActiveId =
    profiles.activeStudentId;

  const newId =
    normalized.id ||
    createStudentId(
      normalized.studentName
    );

  normalized.id = newId;

  if(
    oldActiveId &&
    oldActiveId !== newId
  ){
    delete profiles.students[
      oldActiveId
    ];
  }

  profiles.students[
    newId
  ] = normalized;

  profiles.activeStudentId =
    newId;

  saveProfilesData(profiles);

  /*
    Keep the legacy key synchronized as a backup
    while Version 31 is still our fallback.
  */
  localStorage.setItem(
    FRITZ_LEGACY_SAVE_KEY,
    JSON.stringify(normalized)
  );

  return cloneData(normalized);
}

function createStudent(
  name,
  spelling = "",
  avatar = ""
){
  const trimmedName =
    String(name || "").trim();

  if(!trimmedName){
    throw new Error(
      "A student name is required."
    );
  }

  const profiles =
    loadProfilesData();

  let studentId =
    createStudentId(trimmedName);

  /*
    Prevent accidental overwriting when two
    students have the same first name.
  */
  if(profiles.students[studentId]){
    let suffix = 2;

    while(
      profiles.students[
        `${studentId}-${suffix}`
      ]
    ){
      suffix++;
    }

    studentId =
      `${studentId}-${suffix}`;
  }

  const student =
    createDefaultStudent(
      trimmedName,
      spelling,
      avatar
    );

  student.id = studentId;

  profiles.students[
    studentId
  ] = student;

  profiles.activeStudentId =
    studentId;

  saveProfilesData(profiles);

  return cloneData(student);
}

function selectStudent(studentId){
  const profiles =
    loadProfilesData();

  if(!profiles.students[studentId]){
    return null;
  }

  profiles.activeStudentId =
    studentId;

  saveProfilesData(profiles);

  localStorage.setItem(
    FRITZ_LEGACY_SAVE_KEY,
    JSON.stringify(
      profiles.students[studentId]
    )
  );

  return cloneData(
    profiles.students[studentId]
  );
}

function updateStudentAvatar(
  studentId,
  avatarId
){
  const profiles =
    loadProfilesData();

  const student =
    profiles.students[studentId];

  if(!student){
    return null;
  }

  student.avatar = avatarId;
  student.puppy = avatarId;
  student.updatedAt =
    new Date().toISOString();

  saveProfilesData(profiles);

  if(
    profiles.activeStudentId ===
    studentId
  ){
    localStorage.setItem(
      FRITZ_LEGACY_SAVE_KEY,
      JSON.stringify(student)
    );
  }

  return cloneData(student);
}

function renameStudent(
  studentId,
  newName,
  newSpelling = ""
){
  const profiles =
    loadProfilesData();

  const existing =
    profiles.students[studentId];

  if(!existing){
    return null;
  }

  const trimmedName =
    String(newName || "").trim();

  if(!trimmedName){
    return null;
  }

  existing.studentName =
    trimmedName;

  existing.studentSpelling =
    newSpelling ||
    formatSpelling(trimmedName);

  existing.updatedAt =
    new Date().toISOString();

  /*
    Keep Nick's stable ID once created so all
    saved builds remain linked correctly.
  */
  profiles.students[
    studentId
  ] = existing;

  saveProfilesData(profiles);

  return cloneData(existing);
}

function setStudentCheckpoint(
  levelId,
  checkpoint
){
  const save = getSave();

  save.currentLevel =
    levelId || save.currentLevel;

  save.currentCheckpoint =
    checkpoint || "opening";

  return saveGame(save);
}

function setReviewMode(enabled){
  const save = getSave();

  save.reviewMode =
    Boolean(enabled);

  return saveGame(save);
}

function resetActiveStudentProgress(){
  const profiles =
    loadProfilesData();

  const activeId =
    profiles.activeStudentId;

  const existing =
    profiles.students[activeId];

  if(!existing){
    return;
  }

  const replacement =
    createDefaultStudent(
      existing.studentName,
      existing.studentSpelling,
      existing.avatar
    );

  replacement.id =
    existing.id;

  replacement.createdAt =
    existing.createdAt;

  profiles.students[
    activeId
  ] = replacement;

  saveProfilesData(profiles);

  localStorage.setItem(
    FRITZ_LEGACY_SAVE_KEY,
    JSON.stringify(replacement)
  );
}

function deleteStudent(studentId){
  const profiles =
    loadProfilesData();

  delete profiles.students[
    studentId
  ];

  if(
    profiles.activeStudentId ===
    studentId
  ){
    profiles.activeStudentId =
      Object.keys(
        profiles.students
      )[0] || "";
  }

  saveProfilesData(profiles);
}

/*
  Full reset. Use only when intentionally removing
  every student and every saved Academy.
*/
function resetSave(){
  localStorage.removeItem(
    FRITZ_PROFILES_KEY
  );

  localStorage.removeItem(
    FRITZ_LEGACY_SAVE_KEY
  );
}
