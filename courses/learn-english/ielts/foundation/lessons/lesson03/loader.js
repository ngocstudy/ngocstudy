/* ==========================================================
   IELTS FOUNDATION 4.0
   Lesson Engine v2.1
   loader.js

   Chức năng
   ----------------------------------------------------------
   - Load lesson JSON
   - Chuẩn hóa dữ liệu
   - Tự sinh id
   - Kiểm tra dữ liệu
   - Khởi tạo Lesson State

========================================================== */

"use strict";

/* ==========================================================
   LOAD LESSON
========================================================== */

async function loadLesson() {

    try {

        const response = await fetch(Config.lessonFile);

        if (!response.ok) {

            throw new Error(
                `Cannot load ${Config.lessonFile}`
            );

        }

        const json = await response.json();

        initializeLesson(json);

    }

    catch (error) {

        console.error(error);

        showLoadError(error.message);

    }

}


/* ==========================================================
   INITIALIZE
========================================================== */

function initializeLesson(data) {

    if (!validateLesson(data)) {

        throw new Error("Invalid lesson data.");

    }

    vocabularyData = normalizeLesson(data);

    VocabularyState.currentIndex = 0;

    VocabularyState.totalWords = vocabularyData.length;

}


/* ==========================================================
   NORMALIZE
========================================================== */

function normalizeLesson(data) {

    return data.map((item, index) => ({

        id: index,

        word: item.word,

        ipa: item.ipa,

        meaning: item.meaning,

        synonyms: Array.isArray(item.synonyms)
            ? item.synonyms
            : [],

        family: Array.isArray(item.family)
            ? item.family
            : []

    }));

}


/* ==========================================================
   VALIDATE LESSON
========================================================== */

function validateLesson(data) {

    if (!Array.isArray(data)) {

        return false;

    }

    if (data.length === 0) {

        return false;

    }

    return data.every(validateWord);

}


/* ==========================================================
   VALIDATE WORD
========================================================== */

function validateWord(item) {

    if (!item) return false;

    if (typeof item.word !== "string") return false;

    if (typeof item.ipa !== "string") return false;

    if (typeof item.meaning !== "string") return false;

    return true;

}


/* ==========================================================
   CURRENT WORD
========================================================== */

function currentWord() {

    return vocabularyData[
        VocabularyState.currentIndex
    ];

}


/* ==========================================================
   GET WORD
========================================================== */

function getWord(index) {

    return vocabularyData[index];

}


/* ==========================================================
   GET WORD BY ID
========================================================== */

function getWordById(id) {

    return vocabularyData.find(

        item => item.id === Number(id)

    );

}


/* ==========================================================
   PREVIOUS
========================================================== */

function hasPreviousWord() {

    return VocabularyState.currentIndex > 0;

}


/* ==========================================================
   NEXT
========================================================== */

function hasNextWord() {

    return (

        VocabularyState.currentIndex <

        VocabularyState.totalWords - 1

    );

}


/* ==========================================================
   GO TO
========================================================== */

function goToWord(index) {

    if (index < 0) return;

    if (index >= VocabularyState.totalWords) return;

    VocabularyState.currentIndex = index;

}


/* ==========================================================
   NEXT WORD
========================================================== */

function nextWord() {

    if (!hasNextWord()) return;

    VocabularyState.currentIndex++;

}


/* ==========================================================
   PREVIOUS WORD
========================================================== */

function previousWord() {

    if (!hasPreviousWord()) return;

    VocabularyState.currentIndex--;

}


/* ==========================================================
   RESET LESSON
========================================================== */

function resetLesson() {

    VocabularyState.currentIndex = 0;

    resetMatchingState();

    clearCountdown();

}


/* ==========================================================
   LOAD ERROR
========================================================== */

function showLoadError(message) {

    alert(

        "Lesson loading failed.\n\n"

        + message

    );

}
