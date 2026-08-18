/*==========================================================
Module   : question_review_engine.js
Thư mục  : 01_engine

Version  : 1.0
Status   : 🟡 TESTING
Ngày     : 16/08/2026

------------------------------------------------------------
Chức năng
- Tìm các câu trả lời sai.
- Dùng chung cho Reading 1.
- Dùng chung cho Reading 2.
- Dùng chung cho Listening.
- Chuẩn bị dữ liệu cho Review Mistakes.

------------------------------------------------------------
Quy tắc
- Không Render.
- Không Navigation.
- Không Event.
- Không AI.
- Không tính lại Score.
==========================================================*/

"use strict";


/* ==========================================================
   BUILD WRONG QUESTIONS
========================================================== */

function buildWrongQuestions(
    section,
    sectionData,
    answerState
) {

    const wrongQuestions = [];


    /* ======================================================
       MULTIPLE CHOICE
    ====================================================== */

    sectionData.quiz.mcq.forEach(
        (item, index) => {

            const correct =
                String(item.answer)
                    .trim()
                    .toUpperCase();

            const correctIndex =
                correct.charCodeAt(0) - 65;

            const userAnswer =
                answerState.mcqAnswer[index];

            if (userAnswer !== correctIndex) {

                wrongQuestions.push({

                    section,

                    type: "Multiple Choice",

                    questionNumber: index + 1,

                    question: item.question,

                    userAnswer:
                        getOptionText(
                            item.options,
                            userAnswer
                        ),

                    correctAnswer:
                        getOptionText(
                            item.options,
                            correctIndex
                        )

                });

            }

        }
    );


    /* ======================================================
       TRUE / FALSE / NOT GIVEN
    ====================================================== */

    sectionData.quiz.tfn.forEach(
        (item, index) => {

            const correct =
                String(item.answer)
                    .trim()
                    .toLowerCase();

            let correctIndex;

            if (correct === "true") {

                correctIndex = 0;

            } else if (correct === "false") {

                correctIndex = 1;

            } else {

                correctIndex = 2;

            }

            const userAnswer =
                answerState.tfnAnswer[index];

            const options = [
                "True",
                "False",
                "Not Given"
            ];

            if (userAnswer !== correctIndex) {

                wrongQuestions.push({

                    section,

                    type:
                        "True / False / Not Given",

                    questionNumber:
                        index + 1,

                    question:
                        item.statement,

                    userAnswer:
                        options[userAnswer] ??
                        "No answer",

                    correctAnswer:
                        options[correctIndex]

                });

            }

        }
    );


/* ======================================================
   SUMMARY / GAP FILL
====================================================== */

if (section === "Listening") {

    /* ==================================================
       LISTENING GAP FILL
    ================================================== */

    sectionData.quiz.gapFill.forEach(
        (item, index) => {

            const correct =
                String(item.answer)
                    .trim()
                    .toLowerCase();

            const userAnswer =
                String(
                    answerState.gapFillAnswer[index] || ""
                )
                .trim()
                .toLowerCase();

            if (userAnswer !== correct) {

                wrongQuestions.push({

                    section,

                    type: "Gap Fill",

                    questionNumber:
                        index + 1,

                    question:
                        item.question,

                    userAnswer:
                        userAnswer || "No answer",

                    correctAnswer:
                        item.answer

                });

            }

        }
    );

} else {

    /* ==================================================
       READING SUMMARY COMPLETION
    ================================================== */

    sectionData.quiz.summary.answers.forEach(
        (item, index) => {

            const correct =
                String(item)
                    .trim()
                    .toLowerCase();

            const userAnswer =
                String(
                    answerState.summaryAnswer[index] || ""
                )
                .trim()
                .toLowerCase();

            if (userAnswer !== correct) {

                wrongQuestions.push({

                    section,

                    type: "Summary Completion",

                    questionNumber:
                        index + 1,

                    question:
                        sectionData.quiz.summary.text,

                    userAnswer:
                        userAnswer || "No answer",

                    correctAnswer:
                        item

                });

            }

        }
    );

}


    /* ======================================================
       VOCABULARY IN CONTEXT
    ====================================================== */

    sectionData.quiz.vocabulary.forEach(
        (item, index) => {

            const correct =
                String(item.answer)
                    .trim()
                    .toUpperCase();

            const correctIndex =
                correct.charCodeAt(0) - 65;

            const userAnswer =
                answerState.vocabularyAnswer[index];

            if (userAnswer !== correctIndex) {

                wrongQuestions.push({

                    section,

                    type:
                        "Vocabulary in Context",

                    questionNumber:
                        index + 1,

                    question:
                        item.question,

                    userAnswer:
                        getOptionText(
                            item.options,
                            userAnswer
                        ),

                    correctAnswer:
                        getOptionText(
                            item.options,
                            correctIndex
                        )

                });

            }

        }
    );


    /* ======================================================
       MATCHING
    ====================================================== */

    const matching =
        sectionData.quiz.matching;

    const matchingAnswers =
        matching.answers || {};

    Object.keys(matchingAnswers)
        .sort(
            (a, b) =>
                Number(a) - Number(b)
        )
        .forEach(key => {

            const index =
                Number(key);

            const correct =
                String(
                    matchingAnswers[key]
                )
                .trim()
                .toUpperCase();

            const correctIndex =
                correct.charCodeAt(0) - 65;

            const userAnswer =
                answerState.matchingAnswer[index];

            if (userAnswer !== correctIndex) {

                wrongQuestions.push({

                    section,

                    type:
                        "Matching",

                    questionNumber:
                        index + 1,

                    question:
                        matching.left[index],

                    userAnswer:
                        getMatchingText(
                            matching.right,
                            userAnswer
                        ),

                    correctAnswer:
                        getMatchingText(
                            matching.right,
                            correctIndex
                        )

                });

            }

        });


    return wrongQuestions;

}


/* ==========================================================
   OPTION TEXT
========================================================== */

function getOptionText(
    options,
    index
) {

    if (
        index === undefined ||
        index === null ||
        !options[index]
    ) {

        return "No answer";

    }

    return options[index];

}


/* ==========================================================
   MATCHING TEXT
========================================================== */

function getMatchingText(
    options,
    index
) {

    if (
        index === undefined ||
        index === null ||
        !options[index]
    ) {

        return "No answer";

    }

    return options[index];

}


/* ==========================================================
   END OF FILE
========================================================== */