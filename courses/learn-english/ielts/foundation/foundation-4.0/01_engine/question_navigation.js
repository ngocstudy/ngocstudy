/*==========================================================
Module    : question_navigation.js
Thư mục   : 01_engine

Version   : 2.0
Status    : 🔒 LOCKED
Ngày      : 01/08/2026

------------------------------------------------------------
Chức năng
- Quản lý Navigation dùng chung.
- Điều phối Reading 1 và Reading 2.
- Chuẩn bị chuyển sang Listening sau Reading 2.
- Tái sử dụng cho Reading, Listening,
  Checkpoint và các Module khác.

------------------------------------------------------------
Gồm các hàm
- startReading1()
- startReading2()
- continueReading()

------------------------------------------------------------
Phụ thuộc
- config.js
- utils.js
- question_state.js
- reading_renderer.js

------------------------------------------------------------
Ghi chú
- Chỉ chứa Navigation dùng chung.
- Không Render giao diện.
- Không đăng ký Event.
- Không xử lý Score.
- Không chứa dữ liệu Lesson.
- Reading 1 tự động chuyển sang Reading 2.
- Reading 2 kết thúc sẽ chuyển sang Module tiếp theo.
- Không thay đổi tên hàm.
- Module đã kiểm thử và khóa.
==========================================================*/

"use strict";
/* ==========================================================
   START READING
========================================================== */

function startReading1() {

    resetReading();

    ReadingState.mcqAnswer = [];
    ReadingState.tfnAnswer = [];
    ReadingState.summaryAnswer = [];
    ReadingState.vocabularyAnswer = [];
    ReadingState.matchingAnswer = [];

    openReadingScreen();

    pushNavigationHistory("reading");

}
/* ==========================================================
   CONTINUE
========================================================== */

function continueReading() {

    /* ======================================================
       CHƯA HẾT READING
    ====================================================== */

    if (ReadingState.currentStep < ReadingState.totalSteps) {

        nextReadingStep();

        renderReadingScreen();

        return;

    }


    /* ======================================================
       ĐÃ HOÀN THÀNH READING HIỆN TẠI
    ====================================================== */

    const readingData =
        ReadingState.currentReading === 1
            ? lessonData.reading1
            : lessonData.reading2;


    const result =
        calculateReadingResult(
            readingData,
            ReadingState
        );


    /* ======================================================
       READING 1 → LƯU ĐIỂM → READING 2
    ====================================================== */

    if (ReadingState.currentReading === 1) {

        saveReading1Score(
            result.correct,
            result.total
        );

        startReading2();

        return;

    }


    /* ======================================================
       READING 2 → LƯU ĐIỂM → LISTENING
    ====================================================== */

    saveReading2Score(
        result.correct,
        result.total
    );

    startListening();

    return;

}

/* ==========================================================
   START READING 2
========================================================== */

/* ==========================================================
   START READING 2
========================================================== */

function startReading2() {

    /* ======================================================
       SAVE READING 1 ANSWERS
       Lưu lại trước khi reset bộ answer hiện tại.
    ====================================================== */

    ReadingState.reading1McqAnswer =
        [...ReadingState.mcqAnswer];

    ReadingState.reading1TfnAnswer =
        [...ReadingState.tfnAnswer];

    ReadingState.reading1SummaryAnswer =
        [...ReadingState.summaryAnswer];

    ReadingState.reading1VocabularyAnswer =
        [...ReadingState.vocabularyAnswer];

    ReadingState.reading1MatchingAnswer =
        [...ReadingState.matchingAnswer];


    /* ======================================================
       START READING 2
    ====================================================== */

    ReadingState.currentReading = 2;

    ReadingState.currentStep = 1;


    /* ======================================================
       RESET CURRENT ANSWERS
       Bộ này sẽ dùng riêng cho Reading 2.
    ====================================================== */

    ReadingState.mcqAnswer = [];

    ReadingState.tfnAnswer = [];

    ReadingState.summaryAnswer = [];

    ReadingState.vocabularyAnswer = [];

    ReadingState.matchingAnswer = [];


    openReadingScreen();

}