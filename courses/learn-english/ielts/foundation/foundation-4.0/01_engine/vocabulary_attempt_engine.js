/*==========================================================
Module    : vocabulary_attempt_engine.js
Thư mục   : 01_engine

Version   : 1.0
Status    : 🟡 TESTING
Ngày      : 04/08/2026

------------------------------------------------------------
Chức năng
- Quản lý lịch sử Attempt của Vocabulary.
- Lưu điểm từng lần Matching.
- Cung cấp dữ liệu cho Lesson Result.

------------------------------------------------------------
Gồm các hàm
- resetVocabularyAttempts()
- addVocabularyAttempt(score)
- getVocabularyAttempts()

------------------------------------------------------------
Ghi chú
- Chỉ quản lý dữ liệu.
- Không Render.
- Không Navigation.
- Chưa lưu LocalStorage.
==========================================================*/

"use strict";

/* ==========================================================
   DATA
========================================================== */

let vocabularyPracticeAttempts = 0;

let vocabularyFinalScore = 0;

/* ==========================================================
   RESET
========================================================== */

function resetVocabularyAttempts() {

    vocabularyPracticeAttempts = 0;

    vocabularyFinalScore = 0;

}

/* ==========================================================
   SAVE PRACTICE RESULT
========================================================== */

function saveVocabularyPractice(score) {

    if (score > vocabularyFinalScore) {

        vocabularyFinalScore = score;

    }

}
/* ==========================================================
   ADD PRACTICE ATTEMPT
========================================================== */

function addVocabularyPracticeAttempt() {

    vocabularyPracticeAttempts++;

}
/* ==========================================================
   GET RESULT
========================================================== */

function getVocabularyPracticeAttempts() {

    return vocabularyPracticeAttempts;

}

function getVocabularyFinalScore() {

    return vocabularyFinalScore;

}