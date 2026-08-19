/*==========================================================
Module    : listening_navigation.js
Thư mục   : 05_listening

Version   : 1.1
Status    : 🔒 LOCKED
Ngày      : 03/08/2026

------------------------------------------------------------
Chức năng
- Điều hướng của Listening.
- Khởi động Listening.
- Điều phối các bước Listening.
- Mở Lesson Result khi hoàn thành.

------------------------------------------------------------
Gồm các hàm
- initializeListeningNavigation()
- startListening()
- continueListening()

------------------------------------------------------------
Phụ thuộc
- config.js
- question_state.js
- listening_renderer.js
- lesson_result_navigation.js

------------------------------------------------------------
Ghi chú
- Chỉ điều hướng.
- Không Render giao diện.
- Không xử lý Event.
- Không xử lý Score.
- Khi hoàn thành Listening sẽ chuyển sang Lesson Result.
- Module đã kiểm thử và khóa.
==========================================================*/

"use strict";

/* ==========================================================
   INITIALIZE
========================================================== */

function initializeListeningNavigation() {

}

/* ==========================================================
   START LISTENING
========================================================== */

function startListening() {

    if (!ListeningState.started) {

        ListeningState.currentStep = 1;

        ListeningState.mcqAnswer = [];
        ListeningState.tfnAnswer = [];
        ListeningState.gapFillAnswer = [];
        ListeningState.vocabularyAnswer = [];
        ListeningState.matchingAnswer = [];

        ListeningState.started = true;

    }

    showListeningScreen();

    renderListeningScreen();

}

/* ==========================================================
   CONTINUE
========================================================== */

function continueListening() {

    // Chưa hết 2 phút thì chưa được rời Question Preview.
    if (ListeningState.currentStep === 1 &&
        !ListeningState.previewCompleted) {

        return;

    }

    if (ListeningState.currentStep < ListeningState.totalSteps) {

        ListeningState.currentStep++;

        renderListeningScreen();

        updateBackButton();

        return;

    }


    /* ======================================================
       LISTENING FINISHED
    ====================================================== */

    const listeningData =
        lessonData.listening;


    const result =
        calculateListeningResult(
            listeningData,
            ListeningState
        );


    saveListeningScore(
        result.correct,
        result.total
    );


    openLessonResult();

}