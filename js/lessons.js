const LEVELS = [
  {
    id: "1-A",
    chapter: "Week 1",
    title: "Welcome to Fritz Academy",
    unlocked: true,
    reward: "Welcome Garden — Section 1",
    buildArea: "welcome-garden",
    buildStage: 1,

    objectives: {
      speaking: [
        "Introduce yourself.",
        "Say and spell your name.",
        "Describe how you feel."
      ],
      listening: [
        "Understand basic greetings.",
        "Recognize feeling words.",
        "Follow short spoken directions."
      ],
      reading: [
        "Read familiar greeting sentences.",
        "Read feeling words.",
        "Read two short connected stories."
      ],
      writing: [
        "Identify uppercase A.",
        "Identify lowercase a.",
        "Copy or type A and a."
      ],
      phonics: [
        "Recognize the letter A.",
        "Produce the short-a sound.",
        "Connect short a with apple, ant, and map."
      ]
    },

    vocabulary: [
      {
        word: "hello",
        display: "Hello!",
        picture: "👋"
      },
      {
        word: "name",
        display: "My name is...",
        picture: "🏷️"
      },
      {
        word: "happy",
        display: "I am happy.",
        picture: "😀"
      },
      {
        word: "sad",
        display: "I am sad.",
        picture: "😢"
      },
      {
        word: "fine",
        display: "I am fine.",
        picture: "🙂"
      },
      {
        word: "friend",
        display: "friend",
        picture: "🐾"
      }
    ],

    intro: [
      {
        speaker: "Captain Fritz",
        text: "Hello! My name is Captain Fritz."
      },
      {
        speaker: "Captain Fritz",
        text: "What is your name?",
        responseType: "name"
      },
      {
        speaker: "Captain Fritz",
        text: "How do you spell your name?",
        responseType: "spelling"
      },
      {
        speaker: "Captain Fritz",
        text: "It is nice to meet you, {studentName}!"
      },
      {
        speaker: "Captain Fritz",
        text: "How are you today?",
        responseType: "feeling"
      }
    ],

    feelingChoices: [
      {
        id: "happy",
        label: "I am happy.",
        emoji: "😀"
      },
      {
        id: "fine",
        label: "I am fine.",
        emoji: "🙂"
      },
      {
        id: "sad",
        label: "I am sad.",
        emoji: "😢"
      }
    ],

    feelingsActivity: {
      title: "Match the Feelings",
      instructions:
        "Choose the sentence that matches each face.",
      questions: [
        {
          emoji: "😀",
          answer: "I am happy.",
          options: [
            "I am happy.",
            "I am sad.",
            "I am fine."
          ]
        },
        {
          emoji: "😢",
          answer: "I am sad.",
          options: [
            "I am fine.",
            "I am sad.",
            "I am happy."
          ]
        },
        {
          emoji: "🙂",
          answer: "I am fine.",
          options: [
            "I am happy.",
            "I am fine.",
            "I am sad."
          ]
        }
      ],
      rewardPiece: {
        id: "welcome-flowers",
        name: "Welcome Flowers",
        icon: "🌼",
        area: "welcome-garden",
        lesson: "1-A"
      }
    },

    story: {
      title: "A New Builder Arrives",
      imageBasePath:
        "assets/readers/lesson-1a/teacher-story",
      pages: [
        {
          text:
            "Captain Fritz waits beside the Academy gate.",
          image:
            "assets/readers/lesson-1a/teacher-story/page-1.png"
        },
        {
          text:
            "A new Academy Builder walks up the path.",
          image:
            "assets/readers/lesson-1a/teacher-story/page-2.png"
        },
        {
          text:
            "Captain Fritz waves and says, “Hello!”",
          image:
            "assets/readers/lesson-1a/teacher-story/page-3.png"
        },
        {
          text:
            "The student answers, “Hello! My name is {studentName}.”",
          image:
            "assets/readers/lesson-1a/teacher-story/page-4.png"
        },
        {
          text:
            "Captain Fritz smiles. “It is nice to meet you.”",
          image:
            "assets/readers/lesson-1a/teacher-story/page-5.png"
        },
        {
          text:
            "Together, they walk toward the unfinished Welcome Garden.",
          image:
            "assets/readers/lesson-1a/teacher-story/page-6.png"
        }
      ],
      questions: [
        {
          prompt: "Who waits at the Academy gate?",
          options: [
            "Captain Fritz",
            "Rascal",
            "Tony"
          ],
          answer: "Captain Fritz"
        },
        {
          prompt: "What does Captain Fritz say?",
          options: [
            "Hello!",
            "Good night!",
            "Stop!"
          ],
          answer: "Hello!"
        },
        {
          prompt: "Where do they walk?",
          options: [
            "Toward the Welcome Garden",
            "Toward the beach",
            "Toward a city"
          ],
          answer: "Toward the Welcome Garden"
        }
      ],
      rewardPiece: {
        id: "stone-path",
        name: "Stone Garden Path",
        icon: "🪨",
        area: "welcome-garden",
        lesson: "1-A"
      }
    },

    alphabetSong: {
      title: "Fritz Academy Alphabet Song",
      rewardMessage:
        "You unlocked the Academy Music Box!",
      assetPath:
        "assets/audio/alphabet-song.mp3",
      videoPath:
        "assets/video/alphabet-song.mp4"
    },

    phonics: {
      letterUpper: "A",
      letterLower: "a",
      soundLabel: "short a",
      teacherCue:
        "Open your mouth gently and say: a, a, apple.",
      examples: [
        {
          word: "apple",
          icon: "🍎"
        },
        {
          word: "ant",
          icon: "🐜"
        },
        {
          word: "map",
          icon: "🗺️"
        }
      ],
      recognitionQuestion: {
        prompt: "Choose uppercase A.",
        options: ["A", "B", "D"],
        answer: "A"
      },
      lowercaseQuestion: {
        prompt: "Choose lowercase a.",
        options: ["e", "a", "o"],
        answer: "a"
      },
      wordQuestion: {
        prompt: "Which word has the short-a sound?",
        options: [
          "apple",
          "moon",
          "tree"
        ],
        answer: "apple"
      },
      rewardPiece: {
        id: "reading-bench",
        name: "Garden Reading Bench",
        icon: "🪑",
        area: "welcome-garden",
        lesson: "1-A"
      }
    },

    reader1: {
      title: "Reader 1: Tony's First Hello",
      level: "Easy",
      imageBasePath:
        "assets/readers/lesson-1a/reader-1",
      pages: [
        {
          text: "Tony is near the gate.",
          image:
            "assets/readers/lesson-1a/reader-1/page-1.png"
        },
        {
          text: "He sees a new friend.",
          image:
            "assets/readers/lesson-1a/reader-1/page-2.png"
        },
        {
          text: "Tony says, “Hello!”",
          image:
            "assets/readers/lesson-1a/reader-1/page-3.png"
        },
        {
          text: "The new friend waves.",
          image:
            "assets/readers/lesson-1a/reader-1/page-4.png"
        },
        {
          text: "Tony is happy.",
          image:
            "assets/readers/lesson-1a/reader-1/page-5.png"
        }
      ],
      check: {
        prompt: "How does Tony feel?",
        options: [
          "Happy",
          "Sad",
          "Angry"
        ],
        answer: "Happy"
      },
      rewardPiece: {
        id: "welcome-tree",
        name: "Welcome Tree",
        icon: "🌳",
        area: "welcome-garden",
        lesson: "1-A"
      }
    },

    reader2: {
      title: "Reader 2: Friends at the Garden",
      level: "Stretch",
      imageBasePath:
        "assets/readers/lesson-1a/reader-2",
      pages: [
        {
          text:
            "Tony and {studentName} walk to the garden.",
          image:
            "assets/readers/lesson-1a/reader-2/page-1.png"
        },
        {
          text:
            "The garden has a path, but it needs flowers.",
          image:
            "assets/readers/lesson-1a/reader-2/page-2.png"
        },
        {
          text:
            "Nola brings a basket of bright flowers.",
          image:
            "assets/readers/lesson-1a/reader-2/page-3.png"
        },
        {
          text:
            "Bash carries a small tree to the garden.",
          image:
            "assets/readers/lesson-1a/reader-2/page-4.png"
        },
        {
          text:
            "The friends are ready to build together.",
          image:
            "assets/readers/lesson-1a/reader-2/page-5.png"
        }
      ],
      check: {
        prompt: "What does Nola bring?",
        options: [
          "A basket of flowers",
          "A red ball",
          "A blue book"
        ],
        answer: "A basket of flowers"
      },
      rewardPiece: {
        id: "garden-fence",
        name: "Garden Fence",
        icon: "🪵",
        area: "welcome-garden",
        lesson: "1-A"
      }
    },

    build: {
      areaId: "welcome-garden",
      stage: 1,
      title: "Build the First Garden Section",
      requiredPieces: [
        "welcome-flowers",
        "stone-path",
        "reading-bench",
        "welcome-tree",
        "garden-fence"
      ],
      completionMessage:
        "You completed the first section of your Welcome Garden. Your work will stay in your Academy."
    },

    closingSong: {
      title: "Fritz Academy Welcome Theme",
      assetPath:
        "assets/audio/fritz-academy-theme.mp3",
      videoPath:
        "assets/video/fritz-academy-theme.mp4",
      rewardMessage:
        "Your first garden section is ready. Sing with the Academy cast!"
    },

    completion: {
      xp: 25,
      stars: 1,
      unlocks: "1-B",
      message:
        "Level 1-A complete! Level 1-B is now unlocked."
    }
  },

    {
    id: "1-B",
    chapter: "Week 1",
    title: "How Was Your Week?",
    unlocked: false,
    reward: "Welcome Garden — Section 2",
    buildArea: "welcome-garden",
    buildStage: 2,

    objectives: {
      speaking: [
        "Answer: How are you today?",
        "Answer: What did you do this week?",
        "Speak in a short complete sentence."
      ],
      listening: [
        "Understand questions about recent activities.",
        "Recognize common action phrases.",
        "Follow two-step directions."
      ],
      reading: [
        "Read short sentences about familiar activities.",
        "Identify the main event in a story.",
        "Read two connected but distinct readers."
      ],
      writing: [
        "Identify uppercase B.",
        "Identify lowercase b.",
        "Copy or type B and b."
      ],
      phonics: [
        "Recognize the letter B.",
        "Produce the /b/ sound.",
        "Connect B with book, ball, and backpack."
      ]
    },

    vocabulary: [
      {
        word: "played",
        display: "I played a game.",
        picture: "🎮"
      },
      {
        word: "read",
        display: "I read a book.",
        picture: "📘"
      },
      {
        word: "helped",
        display: "I helped at home.",
        picture: "🏠"
      },
      {
        word: "visited",
        display: "I visited my family.",
        picture: "👨‍👩‍👧"
      },
      {
        word: "built",
        display: "I built something.",
        picture: "🧱"
      },
      {
        word: "week",
        display: "this week",
        picture: "📅"
      }
    ],

    intro: [
      {
        speaker: "Captain Fritz",
        text:
          "Welcome back, {studentName}! How are you today?",
        responseType: "feeling"
      },
      {
        speaker: "Captain Fritz",
        text:
          "What did you do this week?",
        responseType: "weekly-activity"
      },
      {
        speaker: "Captain Fritz",
        text:
          "That sounds interesting. Today, we will help Bear find something important."
      }
    ],

    feelingChoices: [
      {
        id: "great",
        label: "I am great.",
        emoji: "😄"
      },
      {
        id: "fine",
        label: "I am fine.",
        emoji: "🙂"
      },
      {
        id: "tired",
        label: "I am tired.",
        emoji: "😴"
      }
    ],

    conversationActivity: {
      title: "What Did You Do?",
      instructions:
        "Listen to the question. Choose or say a complete answer.",
      prompt:
        "What did you do this week?",
      responseChoices: [
        {
          id: "played",
          label: "I played a game.",
          emoji: "🎮"
        },
        {
          id: "read",
          label: "I read a book.",
          emoji: "📘"
        },
        {
          id: "helped",
          label: "I helped at home.",
          emoji: "🏠"
        },
        {
          id: "visited",
          label: "I visited my family.",
          emoji: "👨‍👩‍👧"
        }
      ],
      questions: [
        {
          prompt:
            "Which answer is a complete sentence?",
          picture: "🎮",
          options: [
            "I played a game.",
            "Played.",
            "A game."
          ],
          answer:
            "I played a game."
        },
        {
          prompt:
            "Choose the sentence about reading.",
          picture: "📘",
          options: [
            "I read a book.",
            "I played a game.",
            "I helped at home."
          ],
          answer:
            "I read a book."
        },
        {
          prompt:
            "Choose the sentence about helping.",
          picture: "🏠",
          options: [
            "I visited my family.",
            "I helped at home.",
            "I built a garden."
          ],
          answer:
            "I helped at home."
        }
      ],
      rewardPiece: {
        id: "watering-can",
        name: "Garden Watering Can",
        icon: "🚿",
        area: "welcome-garden",
        lesson: "1-B"
      }
    },

    /*
      This duplicate field keeps Lesson 1-B compatible
      with the current working lesson engine.
    */
    feelingsActivity: {
      title: "What Did You Do?",
      instructions:
        "Choose the complete sentence that matches each picture.",
      questions: [
        {
          emoji: "🎮",
          answer: "I played a game.",
          options: [
            "I played a game.",
            "I read a book.",
            "I helped at home."
          ]
        },
        {
          emoji: "📘",
          answer: "I read a book.",
          options: [
            "I helped at home.",
            "I read a book.",
            "I played a game."
          ]
        },
        {
          emoji: "🏠",
          answer: "I helped at home.",
          options: [
            "I read a book.",
            "I played a game.",
            "I helped at home."
          ]
        }
      ],
      rewardPiece: {
        id: "watering-can",
        name: "Garden Watering Can",
        icon: "🚿",
        area: "welcome-garden",
        lesson: "1-B"
      }
    },

    story: {
      title: "Bear's Missing Backpack",
      pages: [
        {
          text:
            "Bear runs into the courtyard. His backpack is missing."
        },
        {
          text:
            "“I had it this morning,” Bear says."
        },
        {
          text:
            "Bash asks, “What did you do before you came here?”"
        },
        {
          text:
            "Bear thinks. “I read a book near the garden.”"
        },
        {
          text:
            "The friends look beside the reading bench."
        },
        {
          text:
            "The backpack is under the bench. Bear smiles. “Thank you!”"
        }
      ],
      questions: [
        {
          prompt: "What is missing?",
          options: [
            "Bear's backpack",
            "Bash's book",
            "Tony's hat"
          ],
          answer:
            "Bear's backpack"
        },
        {
          prompt:
            "What did Bear do near the garden?",
          options: [
            "He read a book.",
            "He played music.",
            "He ate lunch."
          ],
          answer:
            "He read a book."
        },
        {
          prompt:
            "Where is the backpack?",
          options: [
            "Under the bench",
            "Inside the greenhouse",
            "Behind the gate"
          ],
          answer:
            "Under the bench"
        }
      ],
      rewardPiece: {
        id: "flower-bed",
        name: "Garden Flower Bed",
        icon: "🌷",
        area: "welcome-garden",
        lesson: "1-B"
      }
    },

    alphabetSong: {
      title: "Fritz Academy Alphabet Song",
      rewardMessage:
        "The Academy Music Box is ready again!",
      assetPath:
        "assets/audio/alphabet-song.mp3",
      videoPath:
        "assets/video/alphabet-song.mp4"
    },

    phonics: {
      letterUpper: "B",
      letterLower: "b",
      soundLabel: "/b/",
      teacherCue:
        "Press your lips together, release the air, and say: b, b, book.",
      examples: [
        {
          word: "book",
          icon: "📘"
        },
        {
          word: "ball",
          icon: "⚽"
        },
        {
          word: "backpack",
          icon: "🎒"
        }
      ],
      recognitionQuestion: {
        prompt: "Choose uppercase B.",
        options: ["B", "D", "P"],
        answer: "B"
      },
      lowercaseQuestion: {
        prompt: "Choose lowercase b.",
        options: ["d", "b", "p"],
        answer: "b"
      },
      wordQuestion: {
        prompt:
          "Which word begins with the /b/ sound?",
        options: [
          "book",
          "apple",
          "map"
        ],
        answer:
          "book"
      },
      rewardPiece: {
        id: "garden-lantern",
        name: "Garden Lantern",
        icon: "🏮",
        area: "welcome-garden",
        lesson: "1-B"
      }
    },

    reader1: {
      title: "Reader 1: Tony Finds a Book",
      level: "Easy",
      pages: [
        "Tony walks beside the garden.",
        "He sees a blue book.",
        "The book is near a bush.",
        "Tony picks up the book.",
        "“This book belongs to Bear,” he says."
      ],
      check: {
        prompt: "What does Tony find?",
        options: [
          "A blue book",
          "A yellow ball",
          "A red backpack"
        ],
        answer:
          "A blue book"
      },
      rewardPiece: {
        id: "birdhouse",
        name: "Garden Birdhouse",
        icon: "🐦",
        area: "welcome-garden",
        lesson: "1-B"
      }
    },

    reader2: {
      title: "Reader 2: The Clue in the Book",
      level: "Stretch",
      pages: [
        "Tony carries the blue book to Bear.",
        "A small garden map falls from the pages.",
        "The map shows a path, a bench, and a tall tree.",
        "Rascal points to a mark beside the tree.",
        "“Maybe this is our next garden clue,” Nola says.",
        "The friends decide to follow the map next time."
      ],
      check: {
        prompt:
          "What falls from the book?",
        options: [
          "A garden map",
          "A flower",
          "A letter"
        ],
        answer:
          "A garden map"
      },
      rewardPiece: {
        id: "welcome-sign",
        name: "Welcome Garden Sign",
        icon: "🪧",
        area: "welcome-garden",
        lesson: "1-B"
      }
    },

    build: {
      areaId: "welcome-garden",
      stage: 2,
      title:
        "Add to Your Welcome Garden",
      requiredPieces: [
        "watering-can",
        "flower-bed",
        "garden-lantern",
        "birdhouse",
        "welcome-sign"
      ],
      completionMessage:
        "You completed the second section of your Welcome Garden. Every piece will remain in your Academy."
    },

    closingSong: {
      title:
        "Fritz Academy Welcome Theme",
      assetPath:
        "assets/audio/fritz-academy-theme.mp3",
      videoPath:
        "assets/video/fritz-academy-theme.mp4",
      rewardMessage:
        "Your Welcome Garden is growing. Sing with the Academy cast!"
    },

    completion: {
      xp: 25,
      stars: 1,
      unlocks: "1-C",
      message:
        "Level 1-B complete! Level 1-C is now unlocked."
    }
  },

  {
    id: "1-C",
    chapter: "Week 1",
    title: "Follow the Garden Map",
    unlocked: false,
    reward: "Welcome Garden — Section 3",
    buildArea: "welcome-garden",
    buildStage: 3,
    objectives: {
      speaking: ["Say how you feel using a complete sentence.", "Give and follow simple directions.", "Name objects that begin with C and D."],
      listening: ["Match feeling words to faces.", "Follow left, right, forward, and stop.", "Recognize the beginning sounds /k/ and /d/."],
      reading: ["Read short map directions.", "Read two connected stories.", "Answer literal comprehension questions."],
      writing: ["Identify and form C, c, D, and d."],
      phonics: ["Recognize C and D.", "Produce hard-c /k/ and /d/.", "Connect sounds to cat, cup, dog, and door."]
    },
    vocabulary: [
      { word:"excited", display:"I am excited.", picture:"🤩" },
      { word:"worried", display:"I am worried.", picture:"😟" },
      { word:"calm", display:"I am calm.", picture:"😌" },
      { word:"left", display:"Turn left.", picture:"⬅️" },
      { word:"right", display:"Turn right.", picture:"➡️" },
      { word:"map", display:"Follow the map.", picture:"🗺️" }
    ],
    intro: [
      { speaker:"Captain Fritz", text:"Welcome back, {studentName}! How do you feel today?", responseType:"feeling" },
      { speaker:"Captain Fritz", text:"Tony found a garden map. Today we will follow its directions." },
      { speaker:"Captain Fritz", text:"Listen carefully: left, right, forward, and stop!" }
    ],
    feelingChoices: [
      { id:"excited", label:"I am excited.", emoji:"🤩" },
      { id:"worried", label:"I am worried.", emoji:"😟" },
      { id:"calm", label:"I am calm.", emoji:"😌" }
    ],
    feelingsActivity: {
      title:"Match the Feelings",
      instructions:"Choose the sentence that truly matches each face.",
      questions:[
        { emoji:"🤩", answer:"I am excited.", options:["I am excited.","I am worried.","I am calm."] },
        { emoji:"😟", answer:"I am worried.", options:["I am calm.","I am worried.","I am excited."] },
        { emoji:"😌", answer:"I am calm.", options:["I am worried.","I am excited.","I am calm."] }
      ],
      rewardPiece:{ id:"map-post", name:"Garden Map Post", icon:"🗺️", area:"welcome-garden", lesson:"1-C" }
    },
    story: {
      title:"The Map Under the Tree",
      pages:[
        { text:"Tony opens the garden map beside the reading bench.", image:"assets/tony.png" },
        { text:"The first arrow points left toward a tall tree.", image:"assets/academy.png" },
        { text:"Bear feels excited, but Nola feels worried about taking the wrong path.", image:"assets/bear.png" },
        { text:"Captain Fritz says, “Stay calm. We will read one direction at a time.”", image:"assets/captain_fritz.png" },
        { text:"They turn right at the tree and find a small wooden door.", image:"assets/bash.png" },
        { text:"A letter C and a letter D are carved on the door. The next clue is inside!", image:"assets/alphabet-blocks.png" }
      ],
      questions:[
        { prompt:"Where does the first arrow point?", options:["Left toward a tree","Back to the gate","Into the classroom"], answer:"Left toward a tree" },
        { prompt:"Who feels worried?", options:["Nola","Tony","Captain Fritz"], answer:"Nola" },
        { prompt:"What is carved on the door?", options:["C and D","A and B","E and F"], answer:"C and D" }
      ],
      rewardPiece:{ id:"clue-door", name:"Little Clue Door", icon:"🚪", area:"welcome-garden", lesson:"1-C" }
    },
    alphabetSong:{ title:"Fritz Academy Alphabet Song", rewardMessage:"Sing and point to every letter!", assetPath:"assets/video/alphabet-song.mp4", videoPath:"assets/video/alphabet-song.mp4" },
    phonics: {
      letterUpper:"C & D", letterLower:"c & d", soundLabel:"/k/ and /d/",
      teacherCue:"Say: c, c, cat. Then say: d, d, dog.",
      examples:[{word:"cat",icon:"🐱"},{word:"cup",icon:"🥤"},{word:"dog",icon:"🐶"},{word:"door",icon:"🚪"}],
      recognitionQuestion:{ prompt:"Choose the two uppercase letters for this lesson.", options:["C and D","A and B","E and F"], answer:"C and D" },
      lowercaseQuestion:{ prompt:"Choose the matching lowercase letters.", options:["c and d","a and b","e and f"], answer:"c and d" },
      wordQuestion:{ prompt:"Which pair begins with C and D sounds?", options:["cat and dog","apple and ball","fish and egg"], answer:"cat and dog" },
      rewardPiece:{ id:"letter-stones-cd", name:"C and D Letter Stones", icon:"🔤", area:"welcome-garden", lesson:"1-C" }
    },
    reader1:{
      title:"Reader 1: Cat by the Door", level:"Easy",
      pages:[
        {text:"A cat sits by the door.",image:"assets/academy.png"},
        {text:"The cat sees a dog.",image:"assets/bear.png"},
        {text:"The dog does not run.",image:"assets/bash.png"},
        {text:"The cat and dog look at the map.",image:"assets/alphabet-blocks.png"},
        {text:"They wait calmly by the door.",image:"assets/captain_fritz.png"}
      ],
      check:{prompt:"Where does the cat sit?",options:["By the door","On a bus","Under a bed"],answer:"By the door"},
      rewardPiece:{id:"cat-statue",name:"Friendly Cat Statue",icon:"🐱",area:"welcome-garden",lesson:"1-C"}
    },
    reader2:{
      title:"Reader 2: The Direction Challenge", level:"Stretch",
      pages:[
        {text:"Captain Fritz gives each friend one direction.",image:"assets/captain_fritz.png"},
        {text:"Tony walks forward to the corner.",image:"assets/tony.png"},
        {text:"Nola turns left beside the door.",image:"assets/nola.png"},
        {text:"Bear turns right and discovers a covered garden circle.",image:"assets/bear.png"},
        {text:"The map says, “Bring the next two letters to open this place.”",image:"assets/alphabet-blocks.png"}
      ],
      check:{prompt:"What does Bear discover?",options:["A covered garden circle","A blue backpack","A classroom"],answer:"A covered garden circle"},
      rewardPiece:{id:"direction-arrows",name:"Garden Direction Arrows",icon:"↔️",area:"welcome-garden",lesson:"1-C"}
    },
    build:{ areaId:"welcome-garden", stage:3, title:"Build the Map Corner", requiredPieces:["map-post","clue-door","letter-stones-cd","cat-statue","direction-arrows"], completionMessage:"You completed the map corner of your Welcome Garden." },
    closingSong:{ title:"Fritz Academy Welcome Song", assetPath:"assets/video/welcome-song.mp4", videoPath:"assets/video/welcome-song.mp4", rewardMessage:"Celebrate your map adventure with Fritz!" },
    completion:{ xp:30, stars:1, unlocks:"1-D", message:"Level 1-C complete! Level 1-D is now unlocked." }
  },

  {
    id: "1-D",
    chapter: "Week 1",
    title: "Open the Garden Circle",
    unlocked: false,
    reward: "Welcome Garden — Section 4",
    buildArea:"welcome-garden", buildStage:4,
    objectives:{
      speaking:["Describe a feeling accurately.","Ask and answer: What do you see?","Name words beginning with E and F."],
      listening:["Distinguish surprised, proud, and confused.","Follow short clue directions.","Recognize /e/ and /f/."],
      reading:["Read a short clue sequence.","Read two connected readers.","Use story details to answer questions."],
      writing:["Identify and form E, e, F, and f."],
      phonics:["Recognize E and F.","Produce short-e /e/ and /f/.","Connect sounds to egg, elephant, fish, and flower."]
    },
    vocabulary:[
      {word:"surprised",display:"I am surprised.",picture:"😮"},{word:"proud",display:"I am proud.",picture:"😊"},{word:"confused",display:"I am confused.",picture:"😕"},{word:"see",display:"What do you see?",picture:"👀"},{word:"flower",display:"I see a flower.",picture:"🌸"},{word:"circle",display:"a garden circle",picture:"⭕"}
    ],
    intro:[
      {speaker:"Captain Fritz",text:"Hello, {studentName}! How do you feel today?",responseType:"feeling"},
      {speaker:"Captain Fritz",text:"The covered garden circle needs two new letters: E and F."},
      {speaker:"Captain Fritz",text:"What do you see? Look closely for clues."}
    ],
    feelingChoices:[{id:"surprised",label:"I am surprised.",emoji:"😮"},{id:"proud",label:"I am proud.",emoji:"😊"},{id:"confused",label:"I am confused.",emoji:"😕"}],
    feelingsActivity:{
      title:"Match the Feelings",instructions:"Match each face with the correct feeling sentence.",
      questions:[
        {emoji:"😮",answer:"I am surprised.",options:["I am surprised.","I am proud.","I am confused."]},
        {emoji:"😊",answer:"I am proud.",options:["I am confused.","I am proud.","I am surprised."]},
        {emoji:"😕",answer:"I am confused.",options:["I am proud.","I am surprised.","I am confused."]}
      ],
      rewardPiece:{id:"flower-arch",name:"Flower Arch",icon:"🌸",area:"welcome-garden",lesson:"1-D"}
    },
    story:{
      title:"The Flowers Behind the Cover",
      pages:[
        {text:"The friends stand around the covered garden circle.",image:"assets/academy.png"},
        {text:"Nola finds an envelope marked with a large E.",image:"assets/nola.png"},
        {text:"Inside is a clue: “Find four flowers beside the fence.”",image:"assets/alphabet-blocks.png"},
        {text:"Bear looks confused because he sees five flowers.",image:"assets/bear.png"},
        {text:"Tony notices that one is a paper flower. Four are real.",image:"assets/tony.png"},
        {text:"The cover opens. Everyone is surprised, and Captain Fritz says, “Be proud—you solved the clue!”",image:"assets/captain_fritz.png"}
      ],
      questions:[
        {prompt:"What letter is on the envelope?",options:["E","C","F"],answer:"E"},
        {prompt:"Why is Bear confused?",options:["He sees five flowers","He lost the map","He cannot find the door"],answer:"He sees five flowers"},
        {prompt:"How many flowers are real?",options:["Four","Five","Three"],answer:"Four"}
      ],
      rewardPiece:{id:"four-flowers",name:"Four Bright Flowers",icon:"💐",area:"welcome-garden",lesson:"1-D"}
    },
    alphabetSong:{title:"Fritz Academy Alphabet Song",rewardMessage:"Sing E and F clearly!",assetPath:"assets/video/alphabet-song.mp4",videoPath:"assets/video/alphabet-song.mp4"},
    phonics:{
      letterUpper:"E & F",letterLower:"e & f",soundLabel:"short e and /f/",teacherCue:"Say: e, e, egg. Then say: f, f, fish.",
      examples:[{word:"egg",icon:"🥚"},{word:"elephant",icon:"🐘"},{word:"fish",icon:"🐟"},{word:"flower",icon:"🌸"}],
      recognitionQuestion:{prompt:"Choose the two uppercase letters for this lesson.",options:["E and F","C and D","G and H"],answer:"E and F"},
      lowercaseQuestion:{prompt:"Choose the matching lowercase letters.",options:["e and f","c and d","g and h"],answer:"e and f"},
      wordQuestion:{prompt:"Which pair begins with E and F sounds?",options:["egg and fish","cat and dog","apple and ball"],answer:"egg and fish"},
      rewardPiece:{id:"letter-stones-ef",name:"E and F Letter Stones",icon:"🔤",area:"welcome-garden",lesson:"1-D"}
    },
    reader1:{
      title:"Reader 1: Four Fish",level:"Easy",
      pages:[{text:"Four fish swim in a pond.",image:"assets/academy.png"},{text:"Each fish is fast.",image:"assets/rascal.png"},{text:"An egg is near the pond.",image:"assets/alphabet-blocks.png"},{text:"The friends look, but they do not touch it.",image:"assets/captain_fritz.png"},{text:"They tell Nola what they see.",image:"assets/nola.png"}],
      check:{prompt:"How many fish swim in the pond?",options:["Four","Two","Five"],answer:"Four"},
      rewardPiece:{id:"fish-pond",name:"Little Fish Pond",icon:"🐟",area:"welcome-garden",lesson:"1-D"}
    },
    reader2:{
      title:"Reader 2: Everyone Helps",level:"Stretch",
      pages:[{text:"Everyone helps finish the new garden circle.",image:"assets/academy.png"},{text:"Fritz places the flower arch near the entrance.",image:"assets/captain_fritz.png"},{text:"Nola plants four flowers beside the fence.",image:"assets/nola.png"},{text:"Tony checks the map, and Bear carries the final stone.",image:"assets/tony.png"},{text:"The friends feel proud because careful reading helped them succeed.",image:"assets/bear.png"}],
      check:{prompt:"Why do the friends feel proud?",options:["They completed the garden circle","They found a backpack","They won a race"],answer:"They completed the garden circle"},
      rewardPiece:{id:"proud-banner",name:"Proud Builders Banner",icon:"🏳️",area:"welcome-garden",lesson:"1-D"}
    },
    build:{areaId:"welcome-garden",stage:4,title:"Complete the Garden Circle",requiredPieces:["flower-arch","four-flowers","letter-stones-ef","fish-pond","proud-banner"],completionMessage:"You completed the fourth section of your Welcome Garden."},
    closingSong:{title:"Fritz Academy Welcome Song",assetPath:"assets/video/welcome-song.mp4",videoPath:"assets/video/welcome-song.mp4",rewardMessage:"Celebrate a strong week of learning!"},
    completion:{xp:30,stars:1,unlocks:"2-A",message:"Level 1-D complete! Week 2 is now unlocked."}
  },

  {
    id: "2-A",
    chapter: "Week 2",
    title: "Colors in the Garden",
    unlocked: false,
    reward: "Welcome Garden — Section 4"
  },

  {
    id: "2-B",
    chapter: "Week 2",
    title: "Count the Flowers",
    unlocked: false,
    reward: "Welcome Garden — Section 5"
  },

  {
    id: "2-C",
    chapter: "Week 2",
    title: "The Welcome Celebration",
    unlocked: false,
    reward: "Welcome Garden — Final Section"
  },

  {
    id: "3-A",
    chapter: "Week 3",
    title: "The Greenhouse Door",
    unlocked: false,
    reward: "Greenhouse Learning Area — Section 1"
  },

  {
    id: "3-B",
    chapter: "Week 3",
    title: "What Plants Need",
    unlocked: false,
    reward: "Greenhouse Learning Area — Section 2"
  },

  {
    id: "3-C",
    chapter: "Week 3",
    title: "Rascal's Watering Machine",
    unlocked: false,
    reward: "Greenhouse Learning Area — Section 3"
  },

  {
    id: "4-A",
    chapter: "Week 4",
    title: "Seeds and Sprouts",
    unlocked: false,
    reward: "Greenhouse Learning Area — Section 4"
  },

  {
    id: "4-B",
    chapter: "Week 4",
    title: "A Garden for Everyone",
    unlocked: false,
    reward: "Greenhouse Learning Area — Section 5"
  },

  {
    id: "4-C",
    chapter: "Week 4",
    title: "The Greenhouse Opens",
    unlocked: false,
    reward: "Greenhouse Learning Area — Final Section"
  }
];

function findLevel(id){
  return LEVELS.find(
    level => level.id === id
  );
}

function replaceStudentName(
  text,
  studentName
){
  return String(text || "")
    .replaceAll(
      "{studentName}",
      studentName ||
        "Academy Student"
    );
}
