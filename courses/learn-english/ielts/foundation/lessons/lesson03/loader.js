/* ==========================================================
   IELTS FOUNDATION 4.0
   Lesson Engine v2.0
   loader.js

   Chức năng:
   - Load lesson JSON
   - Kiểm tra dữ liệu
   - Khởi tạo vocabularyData
   - Cập nhật trạng thái bài học
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
   INITIALIZE LESSON
========================================================== */

function initializeLesson(data) {

    if (!validateLesson(data)) {

        throw new Error("Invalid lesson data.");

    }

    vocabularyData = [...data];

    VocabularyState.currentIndex = 0;
    VocabularyState.totalWords = vocabularyData.length;

}


/* ==========================================================
   VALIDATE
========================================================== */

function validateLesson(data) {

    if (!Array.isArray(data)) {

        return false;

    }

    if (data.length === 0) {

        return false;

    }

    for (const item of data) {

        if (!validateWord(item)) {

            return false;

        }

    }

    return true;

}


/* ==========================================================
   VALIDATE WORD
========================================================== */

function validateWord(item) {

    if (!item) return false;

    if (!item.word) return false;

    if (!item.ipa) return false;

    if (!item.meaning) return false;

    if (!Array.isArray(item.synonyms)) return false;

    if (!Array.isArray(item.family)) return false;

    return true;

}


/* ==========================================================
   LOAD ERROR
========================================================== */

function showLoadError(message) {

    alert(
        "Lesson loading failed.\n\n" +
        message
    );

}


/* ==========================================================
   GET CURRENT WORD
========================================================== */

function currentWord() {

    return vocabularyData[
        VocabularyState.currentIndex
    ];

}


/* ==========================================================
   CHECK INDEX
========================================================== */

function hasPreviousWord() {

    return VocabularyState.currentIndex > 0;

}

function hasNextWord() {

    return (
        VocabularyState.currentIndex <
        VocabularyState.totalWords - 1
    );

}


/* ==========================================================
   INDEX CONTROL
========================================================== */

function goToWord(index) {

    if (index < 0) return;

    if (index >= VocabularyState.totalWords) return;

    VocabularyState.currentIndex = index;

}

function nextWord() {

    if (!hasNextWord()) return;

    VocabularyState.currentIndex++;

}

function previousWord() {

    if (!hasPreviousWord()) return;

    VocabularyState.currentIndex--;

}


/* ==========================================================
   LESSON STATUS
========================================================== */

function lessonCompleted() {

    return (
        VocabularyState.currentIndex >=
        VocabularyState.totalWords - 1
    );

}


/* ==========================================================
   RESET LESSON
========================================================== */

function resetLesson() {

    VocabularyState.currentIndex = 0;

    resetMatchingState();

    clearCountdown();

}
