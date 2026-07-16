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
    reward: "Welcome Garden — Section 3"
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
