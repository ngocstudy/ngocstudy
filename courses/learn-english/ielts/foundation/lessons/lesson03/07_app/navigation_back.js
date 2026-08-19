/*==========================================================
Module   : navigation_back.js
Thư mục  : 07_app

Version  : 3.3
Status   : 🔒 LOCKED
Ngày     : 04/08/2026

==========================================================

Chức năng
----------------------------------------------------------
- Quản lý nút Back.
- Điều hướng quay lại màn hình trước.
- Cập nhật trạng thái hiển thị của nút Back.
- Điều phối luồng Back giữa Vocabulary,
  Matching, Reading 1, Reading 2,
  Listening và Lesson Result.

----------------------------------------------------------
Gồm các hàm / thành phần
----------------------------------------------------------
- initNavigationBack()
- goBack()
- updateBackButton()

----------------------------------------------------------
Phụ thuộc
----------------------------------------------------------
- config.js
- utils.js
- navigation_history.js
- question_state.js
- reading_renderer.js
- listening_renderer.js
- lesson_result_renderer.js

----------------------------------------------------------
Bị phụ thuộc
----------------------------------------------------------
- navigation_engine.js

----------------------------------------------------------
Quy tắc
----------------------------------------------------------
- Chỉ xử lý chức năng Back.
- Không chứa Business Logic.
- Không Render giao diện.
- Không quản lý Home.
- Không quản lý History.
- Không đăng ký Event trực tiếp.
- Mọi xử lý chuyên biệt phải nằm trong
  module tương ứng.

----------------------------------------------------------
Luồng Back đã chuẩn hóa
----------------------------------------------------------
Vocabulary
    ↓
Finish
    ↓
Matching
    ↓
Reading 1
        Step 1 ←→ Step 6
             ↓
Reading 2
        Step 1 ←→ Step 6
             ↓
Listening
             ↓
Lesson Result

- Lesson Result → Listening.
- Listening Step 1 → Reading 2 Step 6.
- Reading 2 Step 1 → Reading 1 Step 6.
- Reading 1 Step 1 → Matching.
- Reading Step > 1 → Lùi từng Step.

----------------------------------------------------------
IMPORTANT
----------------------------------------------------------
Sau mỗi lần thay đổi màn hình bắt buộc phải gọi:

    updateBackButton();
    updateHomeButton();

Không được chuyển màn hình bằng Back mà
bỏ qua hai hàm trên.

----------------------------------------------------------
PASS
----------------------------------------------------------
✓ Back Lesson Result → Listening
✓ Back Listening → Reading 2
✓ Back Reading 2 → Reading 1
✓ Back Reading 1 → Matching
✓ Back Matching → Finish
✓ Back Finish → Vocabulary

"use strict";

/* ==========================================================
   INIT BACK
========================================================== */

function initNavigationBack() {

    // Sẽ bổ sung sau

}

/* ==========================================================
   GO BACK
========================================================== */

function goBack() {
/* ------------------------------------------
   Listening
------------------------------------------ */

if (DOM.listeningScreen &&
    !DOM.listeningScreen.classList.contains("hidden")) {

    if (ListeningState.currentStep > 1) {

        ListeningState.currentStep--;

        renderListeningScreen();

        updateBackButton();
        updateHomeButton();

        return;

    }

    // Chỉ khóa Back khi đang ở Question Preview và TTS chưa đủ 2 lần.
    if (ListeningState.currentStep === 1 &&
        !ListeningState.listeningTtsCompleted) {

        return;

    }

    ReadingState.currentReading = 2;
    ReadingState.currentStep = 6;

    hide(DOM.listeningScreen);

    show(DOM.readingScreen);

    renderReadingScreen();

    updateBackButton();
    updateHomeButton();

    return;

}
/* ------------------------------------------
   Lesson Result
------------------------------------------ */

if (DOM.lessonResultScreen &&
    !DOM.lessonResultScreen.classList.contains("hidden")) {

    hide(DOM.lessonResultScreen);

    show(DOM.listeningScreen);

    updateBackButton();
    updateHomeButton();

    return;

}
    /* ------------------------------------------
       Reading
    ------------------------------------------ */

    if (DOM.readingScreen &&
        !DOM.readingScreen.classList.contains("hidden")) {

        if (ReadingState.currentStep > 1) {

            ReadingState.currentStep--;

            renderReadingScreen();

            updateBackButton();
            updateHomeButton();

            return;

        }

    }

    /* ------------------------------------------
       Reading Step 1 -> Matching
    ------------------------------------------ */

    if (DOM.readingScreen &&
        !DOM.readingScreen.classList.contains("hidden")) {

        if (ReadingState.currentStep === 1) {

    /* ------------------------------------------
       Reading 2 → Reading 1 Step 6
    ------------------------------------------ */

    if (ReadingState.currentReading === 2) {

        ReadingState.currentReading = 1;
        ReadingState.currentStep = 6;

        renderReadingScreen();

        updateBackButton();
        updateHomeButton();

        return;

    }

    /* ------------------------------------------
       Reading 1 → Matching
    ------------------------------------------ */

    removeCurrentScreen();

    hide(DOM.readingScreen);

    show(DOM.matchingScreen);

    updateBackButton();
    updateHomeButton();

    return;

}
    }

    /* ------------------------------------------
       Matching -> Finish
    ------------------------------------------ */

    if (DOM.matchingScreen &&
        !DOM.matchingScreen.classList.contains("hidden")) {

        removeCurrentScreen();

        hide(DOM.matchingScreen);

        show(DOM.finishScreen);

        updateBackButton();
        updateHomeButton();

        return;

    }

    /* ------------------------------------------
       Finish -> Vocabulary
    ------------------------------------------ */

    if (DOM.finishScreen &&
    !DOM.finishScreen.classList.contains("hidden")) {

    removeCurrentScreen();

    hide(DOM.finishScreen);

    resetLesson();
    
    show(DOM.vocabularyScreen);

    refreshVocabulary();

    updateBackButton();
    updateHomeButton();

    return;

}

}

/* ==========================================================
   UPDATE BACK BUTTON
========================================================== */

function updateBackButton() {

    if (DOM.listeningScreen &&
        !DOM.listeningScreen.classList.contains("hidden") &&
        ListeningState.currentStep === 1 &&
        !ListeningState.listeningTtsCompleted) {

        hide(DOM.backBtn);
        return;

    }

    if (DOM.vocabularyScreen &&
        !DOM.vocabularyScreen.classList.contains("hidden")) {

        hide(DOM.backBtn);

        return;

    }

    show(DOM.backBtn);

}