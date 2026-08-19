/*==========================================================
Module    : listening_renderer.js
Thư mục   : 05_listening

Version   : 1.1
Status    : 🔒 LOCKED
Ngày      : 02/08/2026

------------------------------------------------------------
Chức năng
- Điều phối hiển thị các bước của Listening.
- Gọi Renderer dùng chung theo từng Step.
- Không trực tiếp Render giao diện.

------------------------------------------------------------
Gồm các hàm
- showListeningScreen()
- renderListeningScreen()
- openListeningScreen()

------------------------------------------------------------
Phụ thuộc
- config.js
- utils.js
- question_state.js
- question_controller.js
- question_renderer.js

------------------------------------------------------------
Ghi chú
- Chỉ điều phối luồng hiển thị Listening.
- Không chứa code Render chi tiết.
- Không xử lý Event.
- Không xử lý Navigation.
- Không xử lý Score.
- Listening sử dụng Renderer dùng chung:
      01_engine/question_renderer.js
- Gap Fill sử dụng chung:
      renderSummary()
- Module đã chuẩn hóa và khóa.

==========================================================*/

"use strict";
/* ==========================================================
   SHOW LISTENING SCREEN
========================================================== */

function showListeningScreen() {

    hide(DOM.vocabularyScreen);
    hide(DOM.finishScreen);
    hide(DOM.matchingScreen);
    hide(DOM.reviewScreen);
    hide(DOM.readingScreen);
    hide(DOM.readingFinishScreen);

    show(DOM.listeningScreen);

}

/* ==========================================================
   RENDER LISTENING
========================================================== */

function renderListeningScreen() {

    if (DOM.continueListeningBtn) {

        DOM.continueListeningBtn.disabled =
            ListeningState.currentStep === 1 &&
            !ListeningState.previewCompleted;

    }

switch (ListeningState.currentStep) {

        case 1:

    setText(
        DOM.listeningHeading,
        "Question Preview"
    );

    setText(
        DOM.listeningProgress,
        `Step ${ListeningState.currentStep} / ${ListeningState.totalSteps}`
    );

    renderListeningQuestionPreview();

    break;

        case 2:

            renderMCQ();

            break;

        case 3:

            renderTFN();

            break;

        case 4:

            renderSummary();

            break;

                case 5:

            renderVocabularyInContext();

            break;

        case 6:

            renderMatching();

            break;

    }

}

/* ==========================================================
   OPEN LISTENING
========================================================== */

function openListeningScreen() {

    showListeningScreen();

    renderListeningScreen();

}
/* ==========================================================
   LISTENING QUESTION PREVIEW
========================================================== */
function renderListeningQuestionPreview() {

    const mcq = getListeningMCQ();
    const tfn = getListeningTFN();
    const gapFill = getListeningGapFill();
    const vocabulary = getListeningVocabulary();
    const matching = getListeningMatching();

    let html = `
        <h3>Read the questions before listening.</h3>
<div id="listeningPreviewTimer">
    ${
        ListeningState.previewCompleted
            ? "0:00"
            : "2:00"
    }
</div>
    `;

    /* =========================
       MULTIPLE CHOICE
    ========================= */

    html += `
        <h3>Part 1. Multiple Choice</h3>
    `;

    mcq.forEach((item, index) => {

        html += `
            <div class="preview-question">

                <p>
                    <strong>${index + 1}. ${item.question}</strong>
                </p>

                <ul>
                    ${item.options.map((option, optionIndex) => `
                        <li>
                            ${String.fromCharCode(65 + optionIndex)}. ${option}
                        </li>
                    `).join("")}
                </ul>

            </div>
        `;

    });


    /* =========================
       TRUE / FALSE / NOT GIVEN
    ========================= */

    html += `
        <h3>Part 2. True / False / Not Given</h3>
    `;

    tfn.forEach((item, index) => {

        html += `
            <div class="preview-question">

                <p>
                    <strong>${index + 3}. ${item.statement}</strong>
                </p>

            </div>
        `;

    });


    /* =========================
       GAP FILL
    ========================= */

    html += `
        <h3>Part 3. Summary Completion</h3>
    `;

    gapFill.forEach((item, index) => {

        html += `
            <div class="preview-question">

                <p>
                    <strong>${index + 6}. ${item.question}</strong>
                </p>

            </div>
        `;

    });


    /* =========================
       VOCABULARY
    ========================= */

    html += `
        <h3>Part 4. Vocabulary in Context</h3>
    `;

    vocabulary.forEach((item, index) => {

        html += `
            <div class="preview-question">

                <p>
                    <strong>${index + 11}. ${item.question}</strong>
                </p>

                <ul>
                    ${item.options.map((option, optionIndex) => `
                        <li>
                            ${String.fromCharCode(65 + optionIndex)}. ${option}
                        </li>
                    `).join("")}
                </ul>

            </div>
        `;

    });


    /* =========================
       MATCHING
    ========================= */

    html += `
        <h3>Part 5. Matching</h3>

        <p>
            ${matching.instruction}
        </p>

        <div class="preview-matching">

            <div>
                <strong>Words</strong>
                <ol>
                    ${matching.left.map(word => `
                        <li>${word}</li>
                    `).join("")}
                </ol>
            </div>

            <div>
                <strong>Meanings</strong>
                <ol type="A">
                    ${matching.right.map(meaning => `
                        <li>${meaning}</li>
                    `).join("")}
                </ol>
            </div>

        </div>
    `;


    // ==========================================================
// START LISTENING PREVIEW TIMER
// ==========================================================

// ==========================================================
// LISTENING PREVIEW TIMER CONTROL
// ----------------------------------------------------------
// Chỉ bắt đầu Preview Timer khi người học chưa hoàn thành
// thời gian đọc câu hỏi.
// Nếu Back về Step 1 sau khi Preview đã xong:
// - Không tạo lại timer
// - Không bắt đầu lại từ 2:00
// ==========================================================

setHTML(
    DOM.listeningContent,
    html
);

if (!ListeningState.previewCompleted) {

    startListeningPreviewTimer();

}
}
/* ==========================================================
   LISTENING QUESTION PREVIEW TIMER
   ----------------------------------------------------------
   Cho người học 2 phút đọc trước toàn bộ câu hỏi.
   Hết 2 phút:
   - Dừng timer
   - Đánh dấu previewCompleted = true
   - CHƯA phát TTS ở bước này
   ========================================================== */

function startListeningPreviewTimer() {

    // 2 phút = 120 giây
    let remaining = 120;

    const timerElement =
        document.getElementById("listeningPreviewTimer");

    if (!timerElement) return;

    // Xóa timer cũ nếu có
    clearInterval(ListeningState.previewTimer);

    const updateTimer = () => {

        const minutes =
            Math.floor(remaining / 60);

        const seconds =
            remaining % 60;

        timerElement.textContent =
            `${minutes}:${String(seconds).padStart(2, "0")}`;

        if (remaining <= 0) {

    clearInterval(
        ListeningState.previewTimer
    );

    ListeningState.previewTimer = null;

    // ======================================================
    // LISTENING PREVIEW COMPLETED
    // ------------------------------------------------------
    // Đủ 2 phút thì chỉ mở Continue.
    // TTS sẽ bắt đầu khi người học bấm Continue.
    // ======================================================

    ListeningState.previewCompleted = true;
    ListeningState.previewRemaining = 0;

    if (DOM.continueListeningBtn) {

        DOM.continueListeningBtn.disabled = false;

    }

    return;
}

        remaining--;

    };

    // Hiển thị 2:00 ngay khi bắt đầu
    updateTimer();

    // Đếm ngược mỗi 1 giây
    ListeningState.previewTimer =
        setInterval(updateTimer, 1000);

}