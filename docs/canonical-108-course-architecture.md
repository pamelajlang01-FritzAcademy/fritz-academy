# Fritz Academy — Canonical 108-Lesson Course Architecture

Status: CANONICAL curriculum/build contract

This document supersedes any earlier curriculum outline where the two conflict. It does not replace the existing stable game runtime or saved student progress.

## Fixed course shape

- 108 instructional lessons total.
- 36 instructional weeks × 3 lessons per week.
- Approximately 20–25 minutes per lesson.
- A learning objective may span as many weeks as instruction requires. Week boundaries do not force a topic change.
- Activity mode changes about every 2–4 minutes for attention and retrieval.
- Established Fritz dog cast only; no human characters.
- Existing runtime IDs and saved progress must be migrated/mapped rather than reset.
- Songs are reusable curriculum anchors, not one-song-per-lesson consumables.

## Instructional principle

Fritz Academy teaches a beginner learner how English works, rather than merely exposing the learner to vocabulary. The course develops listening, speaking, decoding, reading, comprehension, and functional response skills together. Previously learned language spirals into later stories, readers, games, questions, and builder missions.

Every production lesson must include or intentionally reuse:
1. a story/game episode beat;
2. explicit language target(s);
3. listening and speaking practice;
4. phonics/decoding or early-reading work appropriate to the sequence;
5. question comprehension and response practice;
6. controlled reader/key-story reinforcement;
7. interactive game task;
8. builder reward/progression;
9. cumulative review from earlier lessons.

## Lessons 1–9: Alphabet + Question Foundation

The first nine instructional lessons are reserved for the alphabet foundation. Introduce approximately 3–4 letters per lesson so all 26 letters receive first exposure by Lesson 9. Letter names and sounds are taught together from the beginning; sound work does not wait until the alphabet sequence ends.

Question language is taught concurrently because the learner must understand what a question is asking before being expected to answer it.

### Lesson 1 — A B C + WHAT
- Recognize/name A, B, C; first useful sounds and picture anchors.
- Greetings: hello/hi; My name is ___.
- Understand `what` as asking about a thing/name.
- Frames: What is this? It is a ___. What is your name? My name is ___.
- Early high-frequency words: I, a, my, is.

### Lesson 2 — D E F + WHO
- Recognize/name D, E, F; sounds and picture anchors; review A–C.
- Understand `who` as asking about a person/character identity.
- Frames: Who is this? This is ___. Who are you? I am ___.
- Early high-frequency words: this, am, you.

### Lesson 3 — G H I + WHAT/WHO REVIEW
- Recognize/name G, H, I; sounds; cumulative A–I recognition.
- Discriminate who vs. what in simple contexts.
- Yes/no response foundation: Is this ___? Yes, it is. / No, it is not.
- First Week 1 cumulative builder mission.

### Lesson 4 — J K L + WHERE
- Recognize/name J, K, L; sounds; review A–I.
- Understand `where` as asking about place/location.
- Frames: Where is ___? It is here/there/in/on/under ___.
- Begin location vocabulary through the Academy game world.

### Lesson 5 — M N O + HOW / HOW MANY
- Recognize/name M, N, O; sounds; cumulative review.
- Understand `how` in highly concrete frames and `how many` as asking for quantity.
- Count meaningful game objects; initially 1–5, expanding through repeated review.
- Frames: How many ___? There are ___. / I see ___.

### Lesson 6 — P Q R + WHICH
- Recognize/name P, Q, R; sounds; cumulative review.
- Understand `which` as choosing between known options.
- Frames: Which one? The ___ one. Which is ___? This one.
- Reinforce colors/shapes only as useful answer vocabulary, not as a topic boundary.

### Lesson 7 — S T U + WHEN
- Recognize/name S, T, U; sounds; cumulative review.
- Introduce `when` through concrete routine/time contrasts: now/later, morning/night, before/after where developmentally appropriate.
- Frames remain highly scaffolded; comprehension precedes independent production.

### Lesson 8 — V W X + WHY
- Recognize/name V, W, X; sounds; cumulative review.
- Introduce `why` as asking for a reason.
- Use visible cause/effect story situations and constrained answers: Because ___.
- Do not demand abstract explanations from a true beginner.

### Lesson 9 — Y Z + A–Z QUESTION MISSION
- Recognize/name Y and Z; sounds.
- Cumulative A–Z recognition and first-sound review.
- Mixed question comprehension: who, what, where, when, why, how, which, how many, plus yes/no forms.
- Student demonstrates understanding by selecting/constructing appropriate responses.
- Alphabet Foundation builder completion and Music Box celebration.

## Lesson 10 forward: decoding intensifies

Lesson 10 begins the concentrated phonics/decoding sequence while continuing alphabet retrieval and question language. The sequence must build a genuine beginner reading foundation, including:

- phonemic awareness;
- beginning and ending sounds;
- short vowels;
- blending and segmenting;
- CVC decoding;
- useful word families/patterns;
- progressively more complex phonics patterns;
- controlled high-frequency/sight words;
- basic phrases and sentence patterns;
- increasingly decodable readers;
- listening comprehension and functional spoken responses.

Sight/high-frequency language begins before Lesson 10 and spirals continuously. Priority early words include: I, a, am, is, my, you, this, it, the, can, see, like, yes, no, not, in, on, here, there, and other words required by the controlled readers and question frames.

## Question-language progression

Question words are never considered complete after their introduction lesson. They spiral through the entire course.

- WHAT — thing/action/information
- WHO — identity
- WHERE — place/location
- HOW / HOW MANY — manner/state/quantity in concrete beginner forms
- WHICH — selection
- WHEN — time/sequence
- WHY — reason/cause, introduced with strong visual/context support
- YES/NO FORMS — is/are, can, do and later appropriate auxiliaries

Early response progression:
1. point/select/match;
2. choose a complete model answer;
3. fill a sentence frame;
4. produce a short answer;
5. produce a complete sentence;
6. answer with two connected ideas when language level supports it.

## Reader contract

Readers are instructional, not decorative. Early readers use controlled language and the phonics/high-frequency material already taught. As decoding develops, the percentage of decodable text increases. Story interest remains important, but a reader must not casually depend on large amounts of untaught language.

## Existing-runtime reconciliation

Existing early Fritz lessons contain valuable finished content but their IDs/letter assignments do not exactly match this canonical instructional sequence. Do not delete them blindly and do not reset student saves.

Implementation must:
- preserve the stable runtime;
- preserve Nick/other student profile history;
- reuse suitable stories, art, questions, readers, games, and builder pieces;
- remap/resequence content to the canonical 3-lessons-per-week instructional course;
- treat extra legacy A/B/C/D/E runtime entries as migration-compatible internal stages/challenges where necessary rather than inflating the canonical course beyond 108 lessons;
- validate every unlock target before production deployment.

## Definition of complete

A lesson does not count as completed because its title or outline exists. It counts when the required content is implemented in the game data/runtime, its referenced assets are available or deliberately supported by a production-safe fallback, its unlock/progress behavior is valid, and the lesson can run through the intended learning/game loop without destroying prior student progress.