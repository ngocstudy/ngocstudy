/*==========================================================
Module    : lesson_result_renderer.js
Thư mục   : 06_result

Version   : 1.0
Status    : 🟡 TESTING
Ngày      : 03/08/2026

------------------------------------------------------------
Chức năng
- Render giao diện Lesson Result.
- Hiển thị điểm của từng kỹ năng.
- Hiển thị tổng điểm.
- Hiển thị Rating.
- Hiển thị các nút chức năng.

------------------------------------------------------------
Gồm các hàm
- renderLessonResult()
- renderLessonScoreTable()
- renderLessonButtons()

------------------------------------------------------------
Phụ thuộc
- config.js
- utils.js
- lesson_result_controller.js

------------------------------------------------------------
Ghi chú
- Chỉ Render giao diện.
- Không tính điểm.
- Không xử lý Event.
- Không điều hướng.
- Không xử lý AI.
- Không xử lý Review.
==========================================================*/

"use strict";

/* ==========================================================
   RENDER LESSON RESULT
========================================================== */

function renderLessonResult() {
const result = getLessonResultData();
const vocabulary = getVocabularyResult();
    let html = `

<div class="lesson-result">

    <h1 class="lesson-result-title">

        Lesson Result

    </h1>

    <div id="lessonResultBody">

    </div>

</div>

`;

    DOM.lessonResultContent.innerHTML = html;

    DOM.lessonResultBody =
        document.getElementById("lessonResultBody");

    DOM.lessonResultBody.innerHTML = "";

    renderVocabularyAttempts(vocabulary);
    
    renderLessonScoreTable(result);
    
    renderLessonButtons();
    
initializeLessonResultNavigation();
}
/* ==========================================================
   RENDER SCORE TABLE
========================================================== */

function renderLessonScoreTable(result) {

    let html = `

<div class="lesson-score-card">

    <div class="lesson-score-row">

        <span class="lesson-score-label">

            Reading 1

        </span>

        <span
            id="lessonReading1Score"
            class="lesson-score-value">

            ${result.reading1}

        </span>

    </div>

    <div class="lesson-score-row">

        <span class="lesson-score-label">

            Reading 2

        </span>

        <span
            id="lessonReading2Score"
            class="lesson-score-value">

            ${result.reading2}

        </span>

    </div>

    <div class="lesson-score-row">

        <span class="lesson-score-label">

            Listening

        </span>

        <span
            id="lessonListeningScore"
            class="lesson-score-value">

            ${result.listening}

        </span>

    </div>

    <hr class="lesson-divider">

    <div class="lesson-score-row total">

        <span class="lesson-score-label">

            Total Score

        </span>

        <span
            id="lessonTotalScore"
            class="lesson-score-value">

            ${result.total}

        </span>

    </div>

    <div class="lesson-score-row">

        <span class="lesson-score-label">

            Percentage

        </span>

        <span
            id="lessonPercentage"
            class="lesson-score-value">

            ${result.percentage}

        </span>

    </div>

    <div class="lesson-score-row">

        <span class="lesson-score-label">

            Rating

        </span>

        <span
            id="lessonRating"
            class="lesson-score-value">
            ${result.rating}
        </span>

    </div>

</div>

`;

    DOM.lessonResultBody.insertAdjacentHTML(

        "beforeend",

        html

    );

}
/* ==========================================================
   RENDER LESSON BUTTONS
========================================================== */

function renderLessonButtons() {

    let html = `

<div class="lesson-button-group">

    <button
        id="reviewMistakesBtn"
        class="lesson-button primary">

        Review Mistakes

    </button>

    <button
        id="copyToAIBtn"
        class="lesson-button secondary">

        Copy to AI

    </button>

    <button
        id="aiExplainBtn"
        class="lesson-button accent">

        AI Explain

        <span class="coming-soon">

            (Coming Soon)

        </span>

    </button>

    <button
        id="continueLessonBtn"
        class="lesson-button primary">

        Continue

    </button>

</div>

`;

    DOM.lessonResultBody.insertAdjacentHTML(

        "beforeend",

        html

    );

}
/* ==========================================================
   RENDER VOCABULARY ATTEMPTS
========================================================== */

function renderVocabularyAttempts(vocabulary) {

    let html = `

<div class="lesson-attempt-card">

    <h3>Vocabulary</h3>

    <div class="lesson-attempt-row">

        Mistakes : ${vocabulary.attempts}

    </div>

    <div class="lesson-attempt-row">

        Final score : ${vocabulary.finalScore}%${vocabulary.finalScore === 100 ? " ✅" : ""}

    </div>

</div>

`;

    DOM.lessonResultBody.insertAdjacentHTML(

        "beforeend",

        html

    );

}
/* ==========================================================
   RENDER WRONG QUESTIONS
========================================================== */

function renderWrongQuestions() {

    const wrongQuestions = getWrongQuestions();

    let html = `
        <div class="lesson-review-card">

            <h3>Review Mistakes</h3>
    `;

    if (wrongQuestions.length === 0) {

        html += `
            <div class="lesson-review-empty">
                No mistakes. Excellent! ✅
            </div>
        `;

    } else {

        wrongQuestions.forEach(mistake => {

            html += `
                <div class="lesson-review-item">

                    <div class="lesson-review-header">
                        ${mistake.section}
                        -
                        ${mistake.type}
                        -
                        Question ${mistake.questionNumber}
                    </div>

                    <div class="lesson-review-question">
                        ${mistake.question}
                    </div>

                    <div class="lesson-review-answer wrong">
                        Your answer:
                        <strong>
                            ${mistake.userAnswer}
                        </strong>
                    </div>

                    <div class="lesson-review-answer correct">
                        Correct answer:
                        <strong>
                            ${mistake.correctAnswer}
                        </strong>
                    </div>

                </div>
            `;

        });

    }

    html += `
        </div>
    `;

    DOM.reviewMistakesContent.insertAdjacentHTML(
        "beforeend",
        html
    );

}
/* ==========================================================
   END OF FILE
========================================================== */