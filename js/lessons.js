const LEVELS = [
  {
    id: "1-A",
    chapter: "Chapter 1",
    title: "Welcome to Fritz Academy",
    unlocked: true,
    reward: "Welcome Garden",

    objectives: {
      speaking: [
        "Hello.",
        "My name is...",
        "I am happy.",
        "I am sad.",
        "I am fine."
      ],
      listening: [
        "Recognize basic greetings.",
        "Recognize feeling words.",
        "Follow short spoken directions."
      ],
      reading: [
        "Read familiar greeting sentences.",
        "Read three feeling words.",
        "Read two short controlled readers."
      ],
      writing: [
        "Identify uppercase A.",
        "Identify lowercase a.",
        "Type or copy A and a."
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
      instructions: "Choose the sentence that matches the face.",
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
        id: "flowers",
        name: "Garden Flowers",
        icon: "🌼"
      }
    },

    story: {
      title: "A New Friend at the Academy",
      pages: [
        {
          text: "Captain Fritz is at the Academy gate."
        },
        {
          text: "A new student walks to the gate."
        },
        {
          text: "Captain Fritz says, “Hello!”"
        },
        {
          text: "The student says, “Hello! My name is {studentName}.”"
        },
        {
          text: "Captain Fritz says, “It is nice to meet you.”"
        },
        {
          text: "The student smiles. A new adventure begins."
        }
      ],
      questions: [
        {
          prompt: "Who says hello?",
          options: [
            "Captain Fritz",
            "A tree",
            "A book"
          ],
          answer: "Captain Fritz"
        },
        {
          prompt: "Where is Captain Fritz?",
          options: [
            "At the Academy gate",
            "In a boat",
            "At the moon"
          ],
          answer: "At the Academy gate"
        }
      ],
      rewardPiece: {
        id: "path",
        name: "Garden Path",
        icon: "🪨"
      }
    },

    alphabetSong: {
      title: "Alphabet Song",
      rewardMessage: "You found the Academy Music Box!",
      assetPath: "assets/audio/alphabet-song.mp3",
      videoPath: "assets/video/alphabet-song.mp4"
    },

    phonics: {
      letterUpper: "A",
      letterLower: "a",
      soundLabel: "short a",
      teacherCue: "Open your mouth gently and say: a, a, apple.",
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
      rewardPiece: {
        id: "bench",
        name: "Garden Bench",
        icon: "🪑"
      }
    },

    reader1: {
      title: "Reader 1: Hello, Friend!",
      level: "Easy",
      pages: [
        "Hello.",
        "My name is {studentName}.",
        "I am happy.",
        "Hello, Fritz.",
        "Fritz is my friend."
      ],
      check: {
        prompt: "How does the student feel?",
        options: [
          "Happy",
          "Sad",
          "Tired"
        ],
        answer: "Happy"
      },
      rewardPiece: {
        id: "tree",
        name: "Welcome Tree",
        icon: "🌳"
      }
    },

    reader2: {
      title: "Reader 2: A New Day",
      level: "Stretch",
      pages: [
        "Hello! My name is {studentName}.",
        "I am at Fritz Academy.",
        "Captain Fritz is at the gate.",
        "He says, “Hello, my friend!”",
        "I am happy to be here."
      ],
      check: {
        prompt: "Where is the student?",
        options: [
          "At Fritz Academy",
          "At the beach",
          "At home"
        ],
        answer: "At Fritz Academy"
      },
      rewardPiece: {
        id: "fence",
        name: "Garden Fence",
        icon: "🪵"
      }
    },

    build: {
      title: "Build the Welcome Garden",
      requiredPieces: [
        "flowers",
        "path",
        "bench",
        "tree",
        "fence"
      ],
      completionMessage:
        "You built the Welcome Garden! It will stay at your Academy."
    },

    closingSong: {
      title: "Hello and Goodbye Song",
      assetPath: "assets/audio/hello-goodbye-song.mp3",
      rewardMessage:
        "The Welcome Garden is complete. Sing with the Academy cast!"
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
    chapter: "Chapter 1",
    title: "Hello, My Name Is...",
    unlocked: false,
    reward: "Academy Sign"
  },

  {
    id: "1-C",
    chapter: "Chapter 1",
    title: "Colors Around Us",
    unlocked: false,
    reward: "Color Flags"
  },

  {
    id: "2-A",
    chapter: "Chapter 2",
    title: "Bear's Lost Backpack",
    unlocked: false,
    reward: "Library Books"
  },

  {
    id: "2-B",
    chapter: "Chapter 2",
    title: "What's in My Backpack?",
    unlocked: false,
    reward: "Classroom Shelf"
  },

  {
    id: "2-C",
    chapter: "Chapter 2",
    title: "Classroom Treasure Hunt",
    unlocked: false,
    reward: "Map Table"
  },

  {
    id: "3-A",
    chapter: "Chapter 3",
    title: "Nola's Garden Gate",
    unlocked: false,
    reward: "Greenhouse Gate"
  },

  {
    id: "3-B",
    chapter: "Chapter 3",
    title: "Counting Flowers",
    unlocked: false,
    reward: "Flower Beds"
  },

  {
    id: "3-C",
    chapter: "Chapter 3",
    title: "Nature Colors",
    unlocked: false,
    reward: "Garden Pond"
  },

  {
    id: "4-A",
    chapter: "Chapter 4",
    title: "The Library Light",
    unlocked: false,
    reward: "Library Lamp"
  },

  {
    id: "4-B",
    chapter: "Chapter 4",
    title: "Story Time",
    unlocked: false,
    reward: "Reading Chair"
  },

  {
    id: "4-C",
    chapter: "Chapter 4",
    title: "Reading Adventure",
    unlocked: false,
    reward: "Library Key"
  }
];

function findLevel(id){
  return LEVELS.find(level => level.id === id);
}

function replaceStudentName(text, studentName){
  return text.replaceAll(
    "{studentName}",
    studentName || "Academy Student"
  );
}
