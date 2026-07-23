/* ==========================================================
   IELTS FOUNDATION 4.0
   Lesson Engine v2.0
   config.js

   Chứa:
   - DOM Elements
   - Global State
   - Constants
========================================================== */

"use strict";

/* ==========================================================
   DOM
========================================================== */

const DOM = {

    // Header
    backBtn: document.getElementById("backBtn"),
    homeBtn: document.getElementById("homeBtn"),

    // Vocabulary
   vocabularyScreen: $("vocabularyScreen"),
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
    continueMatchingBtn: document.getElementById("continueMatchingBtn"),
    countdownText: document.getElementById("countdownText"),

    // Reading
    readingLocked: document.getElementById("readingLocked"),
    readingUnlocked: document.getElementById("readingUnlocked"),
    readingBtn: document.getElementById("readingBtn")

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

    lessonFile: "lesson03.json",

    autoSpeak: true,

    reviewDelay: 4

};


/* ==========================================================
   APP
========================================================== */

const App = {

    initialized: false

};

