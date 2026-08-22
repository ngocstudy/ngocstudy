/*==========================================================
Module    : question_renderer.js
Thư mục   : 01_engine

Version   : 3.1
Status    : 🔒 LOCKED
Ngày      : 02/08/2026

------------------------------------------------------------
Chức năng
- Renderer dùng chung cho Reading và Listening.
- Tự động xác định Module đang hoạt động.
- Chỉ Render giao diện theo dữ liệu được cung cấp.
- Không chứa Business Logic.
- Không điều hướng.
- Không xử lý Event.
- Không xử lý Score.

------------------------------------------------------------
Render
- renderMCQ()
- renderTFN()
- renderSummary()
- renderVocabularyInContext()
- renderMatching()

------------------------------------------------------------
Helper
- getCurrentMode()
- getCurrentState()
- getCurrentDOM()
- getCurrentQuestionData()

------------------------------------------------------------
Phụ thuộc
- config.js
- utils.js
- question_controller.js
- question_events.js
- question_state.js

------------------------------------------------------------
Ghi chú
- Reading và Listening sử dụng chung Renderer.
- Summary Completion (Reading) và Gap Fill (Listening)
  dùng chung hàm renderSummary().
- Renderer chỉ nhận dữ liệu từ question_controller.js.
- Không truy cập lessonData trực tiếp.
- Không chứa dữ liệu Lesson.
- Module đã chuẩn hóa và khóa.

==========================================================*/

"use strict";

/* ==========================================================
   CURRENT MODE
========================================================== */

function getCurrentMode() {

    if (
        DOM.listeningScreen &&
        !DOM.listeningScreen.classList.contains("hidden")
    ) {

        return "listening";

    }

    return "reading";

}

/* ==========================================================
   CURRENT STATE
========================================================== */

function getCurrentState() {

    return getCurrentMode() === "reading"

        ? ReadingState

        : ListeningState;

}

/* ==========================================================
   CURRENT DOM
========================================================== */

function getCurrentDOM() {

    if (getCurrentMode() === "reading") {

        return {

            heading: DOM.readingHeading,

            progress: DOM.readingProgress,

            content: DOM.readingContent

        };

    }

    return {

        heading: DOM.listeningHeading,

        progress: DOM.listeningProgress,

        content: DOM.listeningContent

    };

}
/* ==========================================================
   GET CURRENT QUESTION DATA
========================================================== */

function getCurrentQuestionData(type) {

    const mode = getCurrentMode();

    if (mode === "reading") {

    switch (type) {

        case "mcq":
            return getReadingMCQ();

        case "tfn":
            return getReadingTFN();

        case "summary":
            return getReadingSummary();

        case "vocabulary":
            return getReadingVocabulary();

        case "matching":
            return getReadingMatching();

    }

}

    switch (type) {

    case "mcq":
        return getListeningMCQ();

    case "tfn":
        return getListeningTFN();

    case "summary":
        return getListeningGapFill();

    case "vocabulary":
        return getListeningVocabulary();

    case "matching":
        return getListeningMatching();

}
    return null;

}
/* ==========================================================
   RENDER MULTIPLE CHOICE
========================================================== */

function renderMCQ() {

    const state = getCurrentState();
    const dom = getCurrentDOM();

    const data = getCurrentQuestionData("mcq");

    setText(
        dom.heading,
        "Multiple Choice"
    );

    setText(
        dom.progress,
        `Step ${state.currentStep} / ${state.totalSteps}`
    );

    let html = "";

    data.forEach((question, index) => {

        html += `

        <div class="mcq-question">

            <h3>${index + 1}. ${question.question}</h3>

            <p class="mcq-option"
               data-question="${index}"
               data-option="0">

                A. ${question.options[0]}

            </p>

            <p class="mcq-option"
               data-question="${index}"
               data-option="1">

                B. ${question.options[1]}

            </p>

            <p class="mcq-option"
               data-question="${index}"
               data-option="2">

                C. ${question.options[2]}

            </p>

            <p class="mcq-option"
               data-question="${index}"
               data-option="3">

                D. ${question.options[3]}

            </p>

        </div>

        `;

    });

    dom.content.innerHTML = html;

    state.mcqAnswer.forEach((optionIndex, questionIndex) => {

        const selected = document.querySelector(

            `.mcq-option[data-question="${questionIndex}"][data-option="${optionIndex}"]`

        );

        if (selected) {

            selected.classList.add("selected-test");

        }

    });

    bindMCQEvents();

}
/* ==========================================================
   RENDER TRUE / FALSE / NOT GIVEN
========================================================== */

function renderTFN() {

    const state = getCurrentState();
    const dom = getCurrentDOM();

    const data = getCurrentQuestionData("tfn");

    setText(
        dom.heading,
        "True / False / Not Given"
    );

    setText(
        dom.progress,
        `Step ${state.currentStep} / ${state.totalSteps}`
    );

    let html = "";

    data.forEach((question, index) => {

        html += `

        <div class="tfn-question">

            <h3>${index + 1}. ${question.statement}</h3>

            <p class="tfn-option"
               data-question="${index}"
               data-option="0">

                True

            </p>

            <p class="tfn-option"
               data-question="${index}"
               data-option="1">

                False

            </p>

            <p class="tfn-option"
               data-question="${index}"
               data-option="2">

                Not Given

            </p>

        </div>

        `;

    });

    dom.content.innerHTML = html;

    state.tfnAnswer.forEach((optionIndex, questionIndex) => {

        const selected = document.querySelector(

            `.tfn-option[data-question="${questionIndex}"][data-option="${optionIndex}"]`

        );

        if (selected) {

            selected.classList.add("selected-test");

        }

    });

    bindTFNEvents();

}
/* ==========================================================
   RENDER SUMMARY COMPLETION
========================================================== */

function renderSummary() {

    const mode = getCurrentMode();
    const state = getCurrentState();
    const dom = getCurrentDOM();

    const data = getCurrentQuestionData("summary");

    setText(
        dom.heading,
        mode === "reading"
            ? "Summary Completion"
            : "Gap Fill"
    );

    setText(
        dom.progress,
        `Step ${state.currentStep} / ${state.totalSteps}`
    );

    /* ======================================================
       READING SUMMARY
    ====================================================== */

    if (mode === "reading") {

        let summaryIndex = 0;
        let text = String(data.text || "").replace(/_{4,}/g, () => {

            const index = summaryIndex++;
            const answer = state.summaryAnswer[index] || "";

            return `<input class="summary-input"
                           data-index="${index}"
                           value="${answer}">`;

        });

        dom.content.innerHTML = `

            <div class="summary">

                <p>
                    ${data.instruction}
                </p>

                <br>

                <p>
                    ${text}
                </p>

            </div>

        `;

    }

    /* ======================================================
       LISTENING GAP FILL
    ====================================================== */

    else {

        let html = `

            <div class="summary">

        `;

        data.forEach((question, index) => {

            html += `

                <div class="summary-question">

                    <h3>
                        ${index + 6}. ${question.question}
                    </h3>
<input
    class="summary-input"
    data-index="${index}"
    value="${state.gapFillAnswer[index] || ""}"
>

                </div>

            `;

        });

        html += `

            </div>

        `;

        dom.content.innerHTML = html;

    }

    bindSummaryEvents();

}
/* ==========================================================
   RENDER VOCABULARY IN CONTEXT
========================================================== */

function renderVocabularyInContext() {

    const state = getCurrentState();
    const dom = getCurrentDOM();

    const data = getCurrentQuestionData("vocabulary");

    setText(
        dom.heading,
        "Vocabulary in Context"
    );

    setText(
        dom.progress,
        `Step ${state.currentStep} / ${state.totalSteps}`
    );

    let html = "";

    data.forEach((question, index) => {

        html += `

        <div class="vocab-question">

            <h3>${index + 1}. ${question.question}</h3>

            <p class="vocabulary-option"
               data-question="${index}"
               data-option="0">

                A. ${question.options[0]}

            </p>

            <p class="vocabulary-option"
               data-question="${index}"
               data-option="1">

                B. ${question.options[1]}

            </p>

            <p class="vocabulary-option"
               data-question="${index}"
               data-option="2">

                C. ${question.options[2]}

            </p>

            <p class="vocabulary-option"
               data-question="${index}"
               data-option="3">

                D. ${question.options[3]}

            </p>

        </div>

        `;

    });

    dom.content.innerHTML = html;

    state.vocabularyAnswer.forEach((optionIndex, questionIndex) => {

        const selected = document.querySelector(

            `.vocabulary-option[data-question="${questionIndex}"][data-option="${optionIndex}"]`

        );

        if (selected) {

            selected.classList.add("selected-test");

        }

    });

    bindVocabularyEvents();

}
/* ==========================================================
   RENDER MATCHING
========================================================== */

function renderMatching() {

    const mode = getCurrentMode();
    const state = getCurrentState();
    const dom = getCurrentDOM();

    /* ------------------------------------------
       Reading Matching
    ------------------------------------------ */

    const data = getCurrentQuestionData("matching");

    setText(
        dom.heading,
        "Matching Synonyms"
    );

    setText(
        dom.progress,
        `Step ${state.currentStep} / ${state.totalSteps}`
    );

    let html = `

        <p>${data.instruction}</p>

        <table class="matching-table">

            <tr>

                <th>Words</th>

                <th>${data.right[0]}</th>

                <th>${data.right[1]}</th>

                <th>${data.right[2]}</th>

                <th>${data.right[3]}</th>

            </tr>

    `;

    for (let i = 0; i < data.left.length; i++) {

        const saved = state.matchingAnswer[i];

        html += `

            <tr>

                <td>${i + 14}. ${data.left[i]}</td>

                <td class="matching-option"
                    data-question="${i}"
                    data-option="0">

                    <div class="matching-circle ${saved === 0 ? "selected-test" : ""}"></div>

                </td>

                <td class="matching-option"
                    data-question="${i}"
                    data-option="1">

                    <div class="matching-circle ${saved === 1 ? "selected-test" : ""}"></div>

                </td>

                <td class="matching-option"
                    data-question="${i}"
                    data-option="2">

                    <div class="matching-circle ${saved === 2 ? "selected-test" : ""}"></div>

                </td>

                <td class="matching-option"
                    data-question="${i}"
                    data-option="3">

                    <div class="matching-circle ${saved === 3 ? "selected-test" : ""}"></div>

                </td>

            </tr>

        `;

    }

    html += `

        </table>

    `;

    dom.content.innerHTML = html;

    bindMatchingEvents();

}
