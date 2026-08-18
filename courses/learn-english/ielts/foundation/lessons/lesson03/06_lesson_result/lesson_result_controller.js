/*==========================================================
Module    : lesson_result_controller.js
Thư mục   : 06_result

Version   : 2.0
Status    : 🟡 TESTING
Ngày      : 04/08/2026

------------------------------------------------------------
Chức năng
- Cung cấp dữ liệu cho Lesson Result.
- Lấy dữ liệu từ Score Engine.
- Không Render.
- Không Navigation.
- Không Event.
- Không AI.

------------------------------------------------------------
Gồm các hàm
- getLessonResultData()
- getWrongQuestions()

------------------------------------------------------------
Phụ thuộc
- config.js
- question_state.js
- score_engine.js

------------------------------------------------------------
Ghi chú
- Controller chỉ lấy dữ liệu.
- Không tự tính điểm.
- Mọi phép tính nằm trong Score Engine.
==========================================================*/

"use strict";

/* ==========================================================
   LESSON RESULT DATA
========================================================== */

function getLessonResultData() {

    return {

        vocabulary : getVocabularyScore(),

        reading1 : getReading1Score(),

        reading2 : getReading2Score(),

        listening : getListeningScore(),

        total : getTotalScore(),

        percentage : getPercentage(),

        rating : getRating()

    };

}

/* ==========================================================
   WRONG QUESTIONS
========================================================== */

function getWrongQuestions() {

    /* ======================================================
       READING 1 ANSWERS
    ====================================================== */

    const reading1AnswerState = {

        mcqAnswer:
            ReadingState.reading1McqAnswer,

        tfnAnswer:
            ReadingState.reading1TfnAnswer,

        summaryAnswer:
            ReadingState.reading1SummaryAnswer,

        vocabularyAnswer:
            ReadingState.reading1VocabularyAnswer,

        matchingAnswer:
            ReadingState.reading1MatchingAnswer

    };


    /* ======================================================
       READING 2 ANSWERS
    ====================================================== */

    const reading2AnswerState = {

        mcqAnswer:
            ReadingState.mcqAnswer,

        tfnAnswer:
            ReadingState.tfnAnswer,

        summaryAnswer:
            ReadingState.summaryAnswer,

        vocabularyAnswer:
            ReadingState.vocabularyAnswer,

        matchingAnswer:
            ReadingState.matchingAnswer

    };


    /* ======================================================
       BUILD MISTAKES
    ====================================================== */

    const reading1Mistakes =
        buildWrongQuestions(
            "Reading 1",
            lessonData.reading1,
            reading1AnswerState
        );


    const reading2Mistakes =
        buildWrongQuestions(
            "Reading 2",
            lessonData.reading2,
            reading2AnswerState
        );


    const listeningMistakes =
        buildWrongQuestions(
            "Listening",
            lessonData.listening,
            ListeningState
        );


    /* ======================================================
       RETURN ALL MISTAKES
    ====================================================== */

    return [

        ...reading1Mistakes,

        ...reading2Mistakes,

        ...listeningMistakes

    ];

}
/* ==========================================================
   VOCABULARY RESULT
========================================================== */

function getVocabularyResult() {

    return {

        attempts : getVocabularyPracticeAttempts(),

        finalScore : getVocabularyFinalScore()

    };

}
/* ==========================================================
   END OF FILE
========================================================== */