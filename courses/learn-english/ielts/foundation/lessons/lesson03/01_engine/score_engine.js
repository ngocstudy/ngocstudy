/*==========================================================
Module   : score_engine.js
Thư mục  : 01_engine

Version  : 1.0
Status   : 🟡 TESTING
Ngày     : 04/08/2026

==========================================================

Chức năng
----------------------------------------------------------
- Engine tính điểm dùng chung.
- Cung cấp Score cho toàn bộ hệ thống.
- Tính Total Score.
- Tính Percentage.
- Tính Rating.

----------------------------------------------------------
Gồm các hàm
----------------------------------------------------------
- getVocabularyScore()
- getReading1Score()
- getReading2Score()
- getListeningScore()
- getTotalScore()
- getPercentage()
- getRating()

----------------------------------------------------------
Phụ thuộc
----------------------------------------------------------
- question_state.js

----------------------------------------------------------
Bị phụ thuộc
----------------------------------------------------------
- lesson_result_controller.js
- checkpoint_controller.js (sau này)

----------------------------------------------------------
Quy tắc
----------------------------------------------------------
- Đây là Engine dùng chung.
- Không Render.
- Không Navigation.
- Không Event.
- Chỉ xử lý Score.

----------------------------------------------------------
Ghi chú
----------------------------------------------------------
- Phiên bản 1.0 chỉ xây khung.
- Chưa tính điểm thật.
- Chưa xử lý AI.
==========================================================*/

"use strict";
/* ==========================================================
   SCORE DATA
========================================================== */

let vocabularyScoreState = {

    score : 0

};

let reading1ScoreState = {

    correct : 0,

    total : 0

};

let reading2ScoreState = {

    correct : 0,

    total : 0

};

let listeningScoreState = {

    correct : 0,

    total : 0

};
function resetScoreState() {

    reading1ScoreState.correct = 0;
    reading1ScoreState.total = 0;

    reading2ScoreState.correct = 0;
    reading2ScoreState.total = 0;

    listeningScoreState.correct = 0;
    listeningScoreState.total = 0;

}
/* ==========================================================
   SAVE SCORE
========================================================== */

function saveVocabularyScore(score) {

    vocabularyScoreState.score = score;

}

function saveReading1Score(correct, total) {

    reading1ScoreState.correct = correct;

    reading1ScoreState.total = total;

}

function saveReading2Score(correct, total) {

    reading2ScoreState.correct = correct;

    reading2ScoreState.total = total;

}

function saveListeningScore(correct, total) {

    listeningScoreState.correct = correct;

    listeningScoreState.total = total;

}
/* ==========================================================
   VOCABULARY
========================================================== */

function getVocabularyScore() {

    return "--";

}

/* ==========================================================
   READING 1 SCORE
----------------------------------------------------------
   Chức năng
   - Lấy kết quả Reading 1 từ Score State.
   - Dùng chung cho Lesson Result.
   - Không tự tính điểm.
   - Chỉ trả về số câu đúng / tổng số câu.
========================================================== */

function getReading1Score() {

    if (reading1ScoreState.total === 0) {

        return "-- / 17";

    }

    return `${reading1ScoreState.correct} / ${reading1ScoreState.total}`;

}

/* ==========================================================
   READING 2 SCORE
----------------------------------------------------------
   Chức năng
   - Lấy kết quả Reading 2 từ Score State.
   - Dùng chung cho Lesson Result.
   - Không tự tính điểm.
========================================================== */

function getReading2Score() {

    if (reading2ScoreState.total === 0) {

        return "-- / 17";

    }

    return `${reading2ScoreState.correct} / ${reading2ScoreState.total}`;

}

/* ==========================================================
   LISTENING SCORE
----------------------------------------------------------
   Chức năng
   - Lấy kết quả Listening từ Score State.
   - Dùng chung cho Lesson Result.
   - Không tự tính điểm.
========================================================== */

function getListeningScore() {

    if (listeningScoreState.total === 0) {

        return "-- / 17";

    }

    return `${listeningScoreState.correct} / ${listeningScoreState.total}`;

}

/* ==========================================================
   TOTAL
========================================================== */

function getTotalScore() {

    const vocabularyMistakes =
        getVocabularyPracticeAttempts();

    const vocabularyCorrect =
        Math.max(0, 10 - vocabularyMistakes);

    const totalCorrect =
        vocabularyCorrect +
        reading1ScoreState.correct +
        reading2ScoreState.correct +
        listeningScoreState.correct;

    const totalQuestions =
        10 +
        reading1ScoreState.total +
        reading2ScoreState.total +
        listeningScoreState.total;

    if (totalQuestions === 0) {

        return "--";

    }

    return `${totalCorrect} / ${totalQuestions}`;

}

/* ==========================================================
   PERCENTAGE
========================================================== */

function getPercentage() {

    const vocabularyMistakes =
        getVocabularyPracticeAttempts();

    const vocabularyCorrect =
        Math.max(0, 10 - vocabularyMistakes);

    const totalCorrect =
        vocabularyCorrect +
        reading1ScoreState.correct +
        reading2ScoreState.correct +
        listeningScoreState.correct;

    const totalQuestions =
        10 +
        reading1ScoreState.total +
        reading2ScoreState.total +
        listeningScoreState.total;

    if (totalQuestions === 0) {

        return "--";

    }

    return `${((totalCorrect / totalQuestions) * 100).toFixed(1)}%`;

}

/* ==========================================================
   RATING
========================================================== */

function getRating() {

    const percentageText =
        getPercentage();

    if (percentageText === "--") {

        return "☆☆☆☆☆";

    }

    const percentage =
        parseFloat(percentageText);

    if (percentage >= 90) {

        return "★★★★★";

    }

    if (percentage >= 80) {

        return "★★★★☆";

    }

    if (percentage >= 70) {

        return "★★★☆☆";

    }

    if (percentage >= 60) {

        return "★★☆☆☆";

    }

    return "★☆☆☆☆";

}
