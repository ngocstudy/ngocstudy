/*==========================================================
Module    : reading_renderer.js
Thư mục   : 04_reading

Version   : 2.0
Status    : 🔒 LOCKED
Ngày      : 01/08/2026

------------------------------------------------------------
Chức năng
- Điều phối hiển thị các bước của Reading.
- Gọi Renderer tương ứng theo từng Step.
- Hiển thị Reading 1 và Reading 2 thông qua
  question_controller.js.
- Không trực tiếp Render giao diện.

------------------------------------------------------------
Gồm các hàm
- showReadingScreen()
- renderReadingScreen()
- openReadingScreen()

------------------------------------------------------------
Phụ thuộc
- config.js
- utils.js
- question_state.js
- question_controller.js
- question_renderer.js

------------------------------------------------------------
Ghi chú
- Chỉ điều phối luồng hiển thị Reading.
- Không chứa code Render chi tiết.
- Không xử lý Event.
- Không xử lý Navigation.
- Không xử lý Score.
- Không truy cập lessonData trực tiếp.
- Dữ liệu luôn lấy thông qua question_controller.js.
- Toàn bộ Render chi tiết nằm trong:
      01_engine/question_renderer.js
- Module đã chuẩn hóa và khóa.

==========================================================*/

"use strict";

/* ==========================================================
   SHOW SCREEN
========================================================== */

function showReadingScreen() {

    hide(DOM.vocabularyScreen);
    hide(DOM.finishScreen);
    hide(DOM.matchingScreen);
    hide(DOM.reviewScreen);
    hide(DOM.readingFinishScreen);

    show(DOM.readingScreen);

}

/* ==========================================================
   RENDER READING
========================================================== */

function renderReadingScreen() {

    // Only the passage step preserves source line breaks.
    // All question/answer steps use normal whitespace so indentation in
    // renderer templates cannot become visible vertical spacing.
    if (DOM.readingContent) {
        DOM.readingContent.classList.toggle(
            "reading-passage",
            ReadingState.currentStep === 1
        );
    }

    let reading;
setText(
    DOM.readingTitle,
    ReadingState.currentReading === 1
        ? "Reading 1"
        : "Reading 2"
);
    switch (ReadingState.currentStep) {

        case 1:

    reading = getReadingPassage();

            setText(DOM.readingHeading, reading.title);

            setText(
                DOM.readingProgress,
                `Step ${ReadingState.currentStep} / ${ReadingState.totalSteps}`
            );

            setText(
                DOM.readingContent,
                reading.text
            );

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
   OPEN READING
========================================================== */

function openReadingScreen() {

    showReadingScreen();

    renderReadingScreen();

}