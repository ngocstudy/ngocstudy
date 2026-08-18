/*==========================================================
Module    : lesson_result_navigation.js
Thư mục   : 06_lesson_result

Version   : 1.1
Status    : 🔒 LOCKED
Ngày      : 04/08/2026

------------------------------------------------------------
Chức năng
- Điều hướng Lesson Result.
- Mở Lesson Result.
- Review Mistakes (Coming Soon).
- Copy To AI (Coming Soon).
- AI Explain (Coming Soon).
- Continue → Lesson Selection.

------------------------------------------------------------
Gồm các hàm
- initializeLessonResultNavigation()
- openLessonResult()
- openReviewMistakes()
- copyToAI()
- openAIExplain()
- continueLesson()

------------------------------------------------------------
Phụ thuộc
- config.js
- lesson_result_renderer.js
- lesson_result_controller.js

------------------------------------------------------------
Ghi chú
- Chỉ điều hướng.
- Không Render.
- Không xử lý Score.
- Không xử lý AI.
- Continue mở Lesson Selection của hệ thống.
- Module đã kiểm thử và khóa.
==========================================================*/
"use strict";

/* ==========================================================
   INITIALIZE
========================================================== */

function initializeLessonResultNavigation() {

    DOM.reviewMistakesBtn =
        document.getElementById("reviewMistakesBtn");

    DOM.copyToAIBtn =
        document.getElementById("copyToAIBtn");

    DOM.aiExplainBtn =
        document.getElementById("aiExplainBtn");
const continueBtn =
    document.getElementById("continueLessonBtn");
    if (DOM.reviewMistakesBtn) {

        DOM.reviewMistakesBtn.addEventListener(

            "click",

            openReviewMistakes

        );
DOM.backToLessonResultBtn.addEventListener(
    "click",
    backToLessonResult
);
    }

    if (DOM.copyToAIBtn) {

        DOM.copyToAIBtn.addEventListener(

            "click",

            copyToAI

        );

    }

    if (DOM.aiExplainBtn) {

        DOM.aiExplainBtn.addEventListener(

            "click",

            openAIExplain

        );

    }
if (continueBtn) {

    continueBtn.addEventListener(

        "click",

        continueLesson

    );

}
}
/* ==========================================================
   OPEN LESSON RESULT
========================================================== */

function openLessonResult() {

    /* ======================================================
       HIDE OTHER SCREENS
    ====================================================== */

    hide(DOM.vocabularyScreen);
    hide(DOM.readingScreen);
    hide(DOM.readingFinishScreen);
    hide(DOM.listeningScreen);
    hide(DOM.finishScreen);
    hide(DOM.reviewScreen);
    hide(DOM.matchingScreen);

    /* ======================================================
       SHOW RESULT SCREEN
    ====================================================== */

    show(DOM.lessonResultScreen);
    hide(DOM.backBtn);
    hide(DOM.homeBtn);
    /* ======================================================
       RENDER RESULT
    ====================================================== */

    renderLessonResult();

}
/* ==========================================================
   OPEN REVIEW MISTAKES
========================================================== */

function openReviewMistakes() {

    DOM.lessonResultScreen.classList.add("hidden");

    DOM.reviewMistakesScreen.classList.remove("hidden");

    renderWrongQuestions();

}

/* ==========================================================
   COPY TO AI
========================================================== */

function copyToAI() {

    const wrongQuestions = getWrongQuestions();

    if (wrongQuestions.length === 0) {

        alert("No mistakes to copy.");

        return;

    }

    let prompt = `You are my IELTS teacher.

Please explain my mistakes below in simple English for a Band 4.0–4.5 learner.

For each mistake:
- Question
- My answer
- Correct answer
- Why I was wrong
- Why the correct answer is right
- Important vocabulary
- One tip for next time

`;

    wrongQuestions.forEach((mistake, index) => {

        prompt += `

${index + 1}. ${mistake.section} - ${mistake.type} - Question ${mistake.questionNumber}

Question:
${mistake.question}

My answer:
${mistake.userAnswer}

Correct answer:
${mistake.correctAnswer}

`;

    });

    navigator.clipboard.writeText(prompt)
        .then(() => {

            alert("Copied to AI successfully! ✅");

        })
        .catch(() => {

            alert("Unable to copy. Please try again.");

        });

}

/* ==========================================================
   AI EXPLAIN
========================================================== */

function openAIExplain() {

    alert("AI Explain - Coming Soon");

}
/* ==========================================================
   CONTINUE LESSON
------------------------------------------------------------
   Chức năng
   - Hiện tại:
     Quay về Lesson Selection.

   Sau này:
     1. Đánh dấu Lesson Completed.
     2. Mở khóa Lesson tiếp theo.
     3. Lưu Progress.
     4. Quay về Lesson Selection.

   TODO:
   - completeLesson()
   - unlockNextLesson()
   - saveProgress()
========================================================== */

function continueLesson() {
resetVocabularyAttempts();
    window.location.href =
    "https://ngocstudy.github.io/ngocstudy/courses/learn-english/ielts/foundation/index.html";

}
/* ==========================================================
   BACK TO LESSON RESULT
========================================================== */

function backToLessonResult() {

    DOM.reviewMistakesScreen.classList.add("hidden");

    DOM.lessonResultScreen.classList.remove("hidden");

}