/*==========================================================
Module   : question_score_engine.js
Thư mục  : 01_engine

Version  : 1.0
Status   : 🟡 TESTING
Ngày     : 04/08/2026

==========================================================

Chức năng
----------------------------------------------------------
- Engine chấm điểm dùng chung.
- Dùng cho Vocabulary.
- Dùng cho Reading.
- Dùng cho Listening.
- Dùng cho Checkpoint sau này.

----------------------------------------------------------
Gồm các hàm
----------------------------------------------------------
- calculateMCQ()
- calculateTFN()
- calculateGapFill()
- calculateMatching()
- calculateVocabulary()
- calculateSectionScore()

----------------------------------------------------------
Phụ thuộc
----------------------------------------------------------
- question_state.js

----------------------------------------------------------
Bị phụ thuộc
----------------------------------------------------------
- score_engine.js

----------------------------------------------------------
Quy tắc
----------------------------------------------------------
- Không Render.
- Không Navigation.
- Không Event.
- Không lưu điểm.
- Chỉ tính điểm.

----------------------------------------------------------
Ghi chú
----------------------------------------------------------
- Phiên bản 1.0 chỉ xây khung.
- Chưa triển khai thuật toán.
==========================================================*/

"use strict";

/* ==========================================================
   MULTIPLE CHOICE
========================================================== */

function calculateMCQ(userAnswers, correctAnswers) {

    let correct = 0;

    const total = correctAnswers.length;

    for (let i = 0; i < total; i++) {

        if (userAnswers[i] === correctAnswers[i]) {

            correct++;

        }

    }

    return {

        correct,

        total

    };

}

/* ==========================================================
   TRUE / FALSE
========================================================== */

function calculateTFN(userAnswers, correctAnswers) {

    let correct = 0;

    const total = correctAnswers.length;

    for (let i = 0; i < total; i++) {

        if (userAnswers[i] === correctAnswers[i]) {

            correct++;

        }

    }

    return {

        correct,

        total

    };

}

/* ==========================================================
   GAP FILL / SUMMARY
========================================================== */

function calculateGapFill(userAnswers, correctAnswers) {

    let correct = 0;

    const total = correctAnswers.length;

    for (let i = 0; i < total; i++) {

        const user = String(userAnswers[i] || "")
            .trim()
            .toLowerCase();

        const answer = String(correctAnswers[i] || "")
            .trim()
            .toLowerCase();

        if (user === answer) {

            correct++;

        }

    }

    return {

        correct,

        total

    };

}

/* ==========================================================
   MATCHING
========================================================== */

function calculateMatching(userAnswers, correctAnswers) {

    let correct = 0;

    const total = correctAnswers.length;

    for (let i = 0; i < total; i++) {

        if (userAnswers[i] === correctAnswers[i]) {

            correct++;

        }

    }

    return {

        correct,

        total

    };

}

/* ==========================================================
   VOCABULARY
========================================================== */

function calculateVocabulary(userScore) {

    return {

        correct : userScore === 100 ? 1 : 0,

        total : 1

    };

}

/* ==========================================================
   SECTION SCORE
========================================================== */

function calculateSectionScore(...sections) {

    let correct = 0;

    let total = 0;

    sections.forEach(section => {

        correct += section.correct;

        total += section.total;

    });

    return {

        correct,

        total

    };

}


/* ==========================================================
   CALCULATE READING RESULT
----------------------------------------------------------
   Dùng chung cho:
   - Reading 1
   - Reading 2

   Không Render.
   Không Navigation.
   Không lưu Score State.

   Trả về:
   {
       correct: XX,
       total: 17
   }
========================================================== */

function calculateReadingResult(
    readingData,
    answerState
) {

    /* ======================================================
       MCQ
    ====================================================== */

    const mcqAnswers =
        readingData.quiz.mcq.map(item => {

            const answer =
                String(item.answer).trim().toUpperCase();

            return answer.charCodeAt(0) - 65;

        });

    const mcqResult = calculateMCQ(
        answerState.mcqAnswer,
        mcqAnswers
    );


    /* ======================================================
       TRUE / FALSE / NOT GIVEN
    ====================================================== */

    const tfnAnswers =
        readingData.quiz.tfn.map(item => {

            const answer =
                String(item.answer)
                    .trim()
                    .toLowerCase();

            if (answer === "true") return 0;

            if (answer === "false") return 1;

            return 2;

        });

    const tfnResult = calculateTFN(
        answerState.tfnAnswer,
        tfnAnswers
    );


    /* ======================================================
       SUMMARY COMPLETION
    ====================================================== */

    const summaryAnswers =
    readingData.quiz.summary.answers.map(answer => {

        return String(answer)
            .trim()
            .toLowerCase();

    });

    const summaryResult = calculateGapFill(
        answerState.summaryAnswer,
        summaryAnswers
    );


    /* ======================================================
       VOCABULARY IN CONTEXT
    ====================================================== */

    const vocabularyAnswers =
        readingData.quiz.vocabulary.map(item => {

            const answer =
                String(item.answer).trim().toUpperCase();

            return answer.charCodeAt(0) - 65;

        });

    const vocabularyResult = calculateMCQ(
        answerState.vocabularyAnswer,
        vocabularyAnswers
    );


    /* ======================================================
       MATCHING SYNONYMS
    ====================================================== */

    const matchingData =
        readingData.quiz.matching;

    const matchingAnswers =
        Object.keys(matchingData.answers || {})
            .sort((a, b) => Number(a) - Number(b))
            .map(key => {

                const answer =
                    String(
                        matchingData.answers[key]
                    )
                    .trim()
                    .toUpperCase();

                return answer.charCodeAt(0) - 65;

            });

    const matchingResult = calculateMatching(
        answerState.matchingAnswer,
        matchingAnswers
    );


    /* ======================================================
       TOTAL READING
    ====================================================== */

    return calculateSectionScore(

        mcqResult,

        tfnResult,

        summaryResult,

        vocabularyResult,

        matchingResult

    );

}
/* ==========================================================
   CALCULATE LISTENING RESULT
----------------------------------------------------------
   Dùng cho:
   - Listening

   Không Render.
   Không Navigation.
   Không lưu Score State.

   Trả về:
   {
       correct: XX,
       total: 17
   }
========================================================== */

function calculateListeningResult(
    listeningData,
    answerState
) {

    /* ======================================================
       MULTIPLE CHOICE
    ====================================================== */

    const mcqAnswers =
        listeningData.quiz.mcq.map(item => {

            const answer =
                String(item.answer)
                    .trim()
                    .toUpperCase();

            return answer.charCodeAt(0) - 65;

        });

    const mcqResult = calculateMCQ(
        answerState.mcqAnswer,
        mcqAnswers
    );


    /* ======================================================
       TRUE / FALSE
    ====================================================== */

    const tfnAnswers =
        listeningData.quiz.tfn.map(item => {

            const answer =
                String(item.answer)
                    .trim()
                    .toLowerCase();

            if (answer === "true") return 0;

            return 1;

        });

    const tfnResult = calculateTFN(
        answerState.tfnAnswer,
        tfnAnswers
    );


    /* ======================================================
       GAP FILL
    ====================================================== */

    const gapFillAnswers =
        listeningData.quiz.gapFill.map(item => {

            return String(item.answer)
                .trim()
                .toLowerCase();

        });

    const gapFillResult = calculateGapFill(
        answerState.gapFillAnswer,
        gapFillAnswers
    );


    /* ======================================================
       VOCABULARY IN CONTEXT
    ====================================================== */

    const vocabularyAnswers =
        listeningData.quiz.vocabulary.map(item => {

            const answer =
                String(item.answer)
                    .trim()
                    .toUpperCase();

            return answer.charCodeAt(0) - 65;

        });

    const vocabularyResult = calculateMCQ(
        answerState.vocabularyAnswer,
        vocabularyAnswers
    );


    /* ======================================================
       MATCHING
    ====================================================== */

    const matchingData =
        listeningData.quiz.matching;

    const matchingAnswers =
        Object.keys(
            matchingData.answers || {}
        )
        .sort(
            (a, b) => Number(a) - Number(b)
        )
        .map(key => {

            const answer =
                String(
                    matchingData.answers[key]
                )
                .trim()
                .toUpperCase();

            return answer.charCodeAt(0) - 65;

        });

    const matchingResult = calculateMatching(
        answerState.matchingAnswer,
        matchingAnswers
    );


    /* ======================================================
       TOTAL LISTENING
    ====================================================== */

    return calculateSectionScore(

        mcqResult,
        tfnResult,
        gapFillResult,
        vocabularyResult,
        matchingResult

    );

}
/* ==========================================================
   END OF FILE
========================================================== */