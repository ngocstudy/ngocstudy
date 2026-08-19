/*==========================================================
Module    : question_state.js
Thư mục   : 01_engine

Version   : 2.0
Status    : 🔒 LOCKED
Ngày      : 01/08/2026

------------------------------------------------------------
Chức năng
- Lưu toàn bộ trạng thái chạy của hệ thống.
- Quản lý trạng thái dùng chung cho Reading 1,
  Reading 2, Listening và Checkpoint.

------------------------------------------------------------
Quản lý
- currentReading
- currentStep
- totalSteps
- mcqAnswer
- tfnAnswer
- summaryAnswer
- vocabularyAnswer
- matchingAnswer

------------------------------------------------------------
Gồm các hàm
- currentReadingStep()
- totalReadingSteps()
- hasNextReadingStep()
- hasPreviousReadingStep()
- nextReadingStep()
- previousReadingStep()
- goToReadingStep()
- resetReading()

------------------------------------------------------------
Phụ thuộc
- Không phụ thuộc module nào.

------------------------------------------------------------
Ghi chú
- Chỉ lưu trạng thái (State).
- Không Render giao diện.
- Không bắt Event.
- Không điều hướng.
- Không điều phối luồng.
- Không xử lý Score.
- Không chứa dữ liệu Lesson.
- Không chứa logic nghiệp vụ.
- Chỉ được đọc/ghi trạng thái.
- Quản lý trạng thái Reading 1 và Reading 2 thông qua
  ReadingState.currentReading.
- Module có thể tái sử dụng cho Listening và các Module
  mở rộng khác.
- Module đã chuẩn hóa và khóa.

==========================================================*/
"use strict";

/* ==========================================================
   READING STATE
========================================================== */

const ReadingState = {

    currentReading: 1,

    currentStep: 1,

    totalSteps: 6,
mcqAnswer: [],
tfnAnswer: [],
summaryAnswer: [],
vocabularyAnswer: [],
matchingAnswer: [],


/* ======================================================
   READING HISTORY
====================================================== */

reading1McqAnswer: [],
reading1TfnAnswer: [],
reading1SummaryAnswer: [],
reading1VocabularyAnswer: [],
reading1MatchingAnswer: []
};
/* ==========================================================
   LISTENING STATE
========================================================== */

const ListeningState = {

    currentStep: 1,

    totalSteps: 6,

    started: false,

previewCompleted: false,
audioPlayCount: 0,

    listeningTtsCompleted: false,
// ==========================================================
// LISTENING TTS STATE
// ----------------------------------------------------------
// true  = TTS Listening đang được phép chạy.
// false = TTS đã dừng.
// Lesson Result sẽ chuyển giá trị này thành false.
// ==========================================================

listeningTtsActive: true,
previewTimer: null,
// ==========================================================
// LISTENING PREVIEW TIMER STATE
// ----------------------------------------------------------
// Lưu số giây còn lại của 2 phút Preview.
// Giúp Back qua lại giữa các Step mà không reset timer.
// Chỉ reset khi toàn bộ Listening/Lesson được reset.
// ==========================================================

previewRemaining: 120,
    mcqAnswer: [],
    tfnAnswer: [],
    gapFillAnswer: [],
    vocabularyAnswer: [],
    matchingAnswer: []

};

/* ==========================================================
   CURRENT STEP
========================================================== */

function currentReadingStep() {

    return ReadingState.currentStep;

}


/* ==========================================================
   TOTAL STEPS
========================================================== */

function totalReadingSteps() {

    return ReadingState.totalSteps;

}


/* ==========================================================
   HAS NEXT
========================================================== */

function hasNextReadingStep() {

    return ReadingState.currentStep < ReadingState.totalSteps;

}


/* ==========================================================
   HAS PREVIOUS
========================================================== */

function hasPreviousReadingStep() {

    return ReadingState.currentStep > 1;

}


/* ==========================================================
   NEXT STEP
========================================================== */

function nextReadingStep() {

    if (!hasNextReadingStep()) return;

    ReadingState.currentStep++;

}


/* ==========================================================
   PREVIOUS STEP
========================================================== */

function previousReadingStep() {

    if (!hasPreviousReadingStep()) return;

    ReadingState.currentStep--;

}


/* ==========================================================
   GO TO STEP
========================================================== */

function goToReadingStep(step) {

    if (step < 1) return;

    if (step > ReadingState.totalSteps) return;

    ReadingState.currentStep = step;

}


/* ==========================================================
   RESET
========================================================== */

function resetReading() {

    ReadingState.currentReading = 1;

    ReadingState.currentStep = 1;

}