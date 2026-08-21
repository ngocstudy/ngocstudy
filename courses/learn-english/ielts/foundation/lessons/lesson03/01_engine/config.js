/*==========================================================
Module   : config.js
Thư mục  : 01_engine

Version  : 1.1
Status   : 🔒 LOCKED
Ngày      : 03/08/2026

==========================================================

Chức năng
- Quản lý DOM Elements
- Quản lý Global State
- Quản lý Config
- Quản lý Speech Config

----------------------------------------------------------
Gồm các thành phần

DOM
VocabularyState
MatchingState
ReviewState
SpeechConfig
Config
App

----------------------------------------------------------
Phụ thuộc

Không

----------------------------------------------------------
Bị phụ thuộc

Hầu hết các module trong dự án

----------------------------------------------------------
Ghi chú

Foundation Module.
Không chứa business logic.

Toàn bộ DOM dùng chung được khai báo tại đây.

Bao gồm:

- Vocabulary
- Matching
- Review
- Reading
- Listening
- Lesson Result

==========================================================*/
"use strict";

/* ==========================================================
   DOM
========================================================== */

const DOM = {

    // Header
    backBtn: document.getElementById("backBtn"),
    homeBtn: document.getElementById("homeBtn"),

    // Vocabulary
   vocabularyScreen: document.getElementById("vocabularyScreen"),
    word: document.getElementById("word"),
    ipa: document.getElementById("ipa"),
    meaning: document.getElementById("meaning"),
    synonyms: document.getElementById("synonyms"),
    family: document.getElementById("family"),

    // Speaker
    speakWord: document.getElementById("speakWord"),

    // Navigation
    prevBtn: document.getElementById("prevBtn"),
    nextBtn: document.getElementById("nextBtn"),

    // Progress
    progressText: document.getElementById("progressText"),
    progressPercent: document.getElementById("progressPercent"),
    progressFill: document.getElementById("progressFill"),

    // Finish
    finishScreen: document.getElementById("finishScreen"),
    matchingBtn: document.getElementById("matchingBtn"),
continueMatchingBtn: document.getElementById("continueMatchingBtn"),
    // Matching
    matchingScreen: document.getElementById("matchingScreen"),
    matchingContainer: document.getElementById("matchingContainer"),
    matchingMessage: document.getElementById("matchingMessage"),
    correctCount: document.getElementById("correctCount"),

    // Review
    reviewScreen: document.getElementById("reviewScreen"),
    reviewSpeaker: document.getElementById("reviewSpeaker"),
    reviewWord: document.getElementById("reviewWord"),
    reviewIPA: document.getElementById("reviewIPA"),
    reviewMeaning: document.getElementById("reviewMeaning"),
    reviewSynonyms: document.getElementById("reviewSynonyms"),
    reviewFamily: document.getElementById("reviewFamily"),
    countdownText: document.getElementById("countdownText"),

// Reading
readingLocked: document.getElementById("readingLocked"),
readingUnlocked: document.getElementById("readingUnlocked"),

readingScreen: document.getElementById("readingScreen"),
readingTitle: document.getElementById("readingTitle"),
readingHeading: document.getElementById("readingHeading"),
readingProgress: document.getElementById("readingProgress"),
readingContent: document.getElementById("readingContent"),
continueReadingBtn: document.getElementById("continueReadingBtn"),

readingFinishScreen: document.getElementById("readingFinishScreen"),
readingFinishBtn: document.getElementById("readingFinishBtn"),

readingBtn: document.getElementById("readingBtn"),

/* Listening */
listeningScreen: document.getElementById("listeningScreen"),
listeningHeading: document.getElementById("listeningHeading"),
listeningProgress: document.getElementById("listeningProgress"),
listeningContent: document.getElementById("listeningContent"),
continueListeningBtn: document.getElementById("continueListeningBtn"),
listeningBtn: document.getElementById("listeningBtn"),

/* Lesson Result */
lessonResultScreen: document.getElementById("lessonResultScreen"),
lessonResultContent: document.getElementById("lessonResultContent"),
reviewMistakesScreen: document.getElementById("reviewMistakesScreen"),
reviewMistakesContent: document.getElementById("reviewMistakesContent"),
backToLessonResultBtn: document.getElementById("backToLessonResultBtn"),

/* Checkpoint Result */
checkpointResultScreen: document.getElementById("checkpointResultScreen"),
checkpointResultContent: document.getElementById("checkpointResultContent"),
checkpointResultBody: null,

lessonResultBody: null,
};

/* ==========================================================
   LESSON DATA
========================================================== */

let vocabularyData = [];


/* ==========================================================
   VOCABULARY STATE
========================================================== */

const VocabularyState = {

    currentIndex: 0,
    totalWords: 0

};


/* ==========================================================
   MATCHING STATE
========================================================== */

const MatchingState = {

    cards: [],

    selectedEnglish: null,
    selectedMeaning: null,

    correctPairs: 0,

    matchedIds: new Set(),

    reviewWord: null

};


/* ==========================================================
   REVIEW STATE
========================================================== */

const ReviewState = {

    countdown: 4,
    timer: null

};


/* ==========================================================
   SPEECH
========================================================== */

const SpeechConfig = {

    language: "en-US",
    rate: 0.9,
    pitch: 1,
    volume: 1

};


/* ==========================================================
   PATH
========================================================== */

const Config = {

    // Lesson mặc định để giữ nguyên luồng hiện tại.
    // Khi người học chọn Lesson khác, loader sẽ lấy lessonId từ URL.
    defaultLessonFile: "02_data/lesson03.json",

    autoSpeak: true,

    reviewDelay: 4

};


/* ==========================================================
   APP
========================================================== */

const App = {

    initialized: false

};

