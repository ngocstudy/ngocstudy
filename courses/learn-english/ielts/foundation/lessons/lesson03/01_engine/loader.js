/*==========================================================
Module   : loader.js
Thư mục  : 01_engine

Version  : 2.1
Status   : 🔒 LOCKED
Ngày     : 01/08/2026
==========================================================

Chức năng

- Nạp dữ liệu Lesson.
- Chuẩn hóa dữ liệu.
- Kiểm tra dữ liệu.
- Khởi tạo Lesson State.
- Cung cấp các hàm truy cập dữ liệu Lesson.

----------------------------------------------------------
Gồm các hàm / thành phần

- Lesson Data
- Load Lesson
- Initialize
- Normalize
- Validate Lesson
- Validate Word
- Current Word
- Get Word
- Get Word By ID
- Previous
- Next
- Go To
- Next Word
- Previous Word
- Reset Lesson
- Load Error

----------------------------------------------------------
Phụ thuộc

- config.js
- utils.js

----------------------------------------------------------
Bị phụ thuộc

- vocabulary
- matching
- reading
- listening
- checkpoint
- app

----------------------------------------------------------
Ghi chú

- Foundation Module.
- Chỉ chịu trách nhiệm quản lý dữ liệu Lesson.
- Không chứa logic giao diện.
- Không chứa điều hướng.
- Là cầu nối giữa Lesson Data và Engine.

==========================================================*/

"use strict";
/* ==========================================================
   LESSON DATA
========================================================== */

let lessonData = {};

/* ==========================================================
   LOAD LESSON
========================================================== */

function getRequestedLessonFile() {

    const params = new URLSearchParams(window.location.search);
    const lessonParam = params.get("lesson");

    // Không có lesson trên URL → giữ nguyên Lesson 03 hiện tại.
    if (!lessonParam) {
        return Config.defaultLessonFile;
    }

    // Chấp nhận cả "lesson01" và "01" để màn hình Lesson
    // có thể truyền ID theo cách đơn giản.
    const lessonId = lessonParam.toLowerCase().startsWith("lesson")
        ? lessonParam.toLowerCase()
        : `lesson${lessonParam.padStart(2, "0")}`;

    // Chỉ cho phép ID Lesson dạng lesson01, lesson02...
    if (!/^lesson\d{2,}$/.test(lessonId)) {
        throw new Error(`Invalid lesson ID: ${lessonParam}`);
    }

    return `02_data/${lessonId}.json`;
}

async function loadLesson() {

    try {

        const lessonFile = getRequestedLessonFile();

        const response = await fetch(lessonFile);

        if (!response.ok) {

            throw new Error(
                `Cannot load ${lessonFile}`
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
lessonData = data;
    vocabularyData = normalizeLesson(data.vocabulary);

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

    if (!data) return false;

    if (!Array.isArray(data.vocabulary)) {

        return false;

    }

    if (data.vocabulary.length === 0) {

        return false;

    }

    return data.vocabulary.every(validateWord);

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
ListeningState.started = false;
ListeningState.currentStep = 1;
ListeningState.previewCompleted = false;
ListeningState.audioPlayCount = 0;
ListeningState.listeningTtsCompleted = false;
ListeningState.listeningTtsActive = true;
ListeningState.previewTimer = null;
ListeningState.previewRemaining = 120;

ListeningState.mcqAnswer = [];
ListeningState.tfnAnswer = [];
ListeningState.gapFillAnswer = [];
ListeningState.vocabularyAnswer = [];
ListeningState.matchingAnswer = [];
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
