/*==========================================================
Module    : question_controller.js
Thư mục   : 01_engine

Version   : 2.1
Status    : 🔒 LOCKED
Ngày      : 02/08/2026

------------------------------------------------------------
Chức năng
- Điều phối dữ liệu của hệ thống.
- Cung cấp dữ liệu cho Renderer.
- Tự động điều phối Reading 1 và Reading 2
  theo ReadingState.currentReading.
- Cung cấp dữ liệu cho Listening.
- Tái sử dụng cho Reading, Listening,
  Checkpoint và các Module mở rộng.

------------------------------------------------------------
Gồm các hàm
Reading
- getReadingPassage()
- getReadingMCQ()
- getReadingTFN()
- getReadingSummary()
- getReadingVocabulary()
- getReadingMatching()

Listening
- getListeningPassage()
- getListeningMCQ()
- getListeningTFN()
- getListeningGapFill()
- getListeningVocabulary()

------------------------------------------------------------
Phụ thuộc
- lessonData
- ReadingState

------------------------------------------------------------
Ghi chú
- Chỉ lấy và cung cấp dữ liệu.
- Không Render giao diện.
- Không thao tác DOM.
- Không bắt Event.
- Không điều hướng.
- Không xử lý Score.
- Không chứa dữ liệu Lesson.
- Không chứa logic nghiệp vụ.
- Renderer không truy cập lessonData trực tiếp.
- Mọi dữ liệu phải đi qua question_controller.js.
- Reading 1 và Reading 2 sử dụng chung API.
- Listening sử dụng chung Controller.
- Không thay đổi tên các hàm công khai.
- Module đã chuẩn hóa và khóa.

==========================================================*/
"use strict";
/* ==========================================================
   READING PASSAGE
========================================================== */

/* ==========================================================
   LOAD PASSAGE
========================================================== */

function getReadingPassage() {

    return ReadingState.currentReading === 1

        ? lessonData.reading1.passage

        : lessonData.reading2.passage;

}
/* ==========================================================
   MULTIPLE CHOICE
========================================================== */

function getReadingMCQ() {

    return ReadingState.currentReading === 1

        ? lessonData.reading1.quiz.mcq

        : lessonData.reading2.quiz.mcq;

}
/* ==========================================================
   TRUE / FALSE / NOT GIVEN
========================================================== */

function getReadingTFN() {

    if (ReadingState.currentReading === 1) {

        return lessonData.reading1.quiz.tfn;

    }

    return lessonData.reading2.quiz.tfn;

}
/* ==========================================================
   SUMMARY COMPLETION
========================================================== */

function getReadingSummary() {

    if (ReadingState.currentReading === 1) {

        return lessonData.reading1.quiz.summary;

    }

    return lessonData.reading2.quiz.summary;

}
/* ==========================================================
   VOCABULARY IN CONTEXT
========================================================== */

function getReadingVocabulary() {

    if (ReadingState.currentReading === 1) {

        return lessonData.reading1.quiz.vocabulary;

    }

    return lessonData.reading2.quiz.vocabulary;

}
/* ==========================================================
   MATCHING SYNONYMS
========================================================== */

function getReadingMatching() {

    if (ReadingState.currentReading === 1) {

        return lessonData.reading1.quiz.matching;

    }

    return lessonData.reading2.quiz.matching;

}
/* ==========================================================
   LISTENING PASSAGE
========================================================== */

function getListeningPassage() {

    return lessonData.listening.passage;

}

/* ==========================================================
   LISTENING MULTIPLE CHOICE
========================================================== */

function getListeningMCQ() {

    return lessonData.listening.quiz.mcq;

}

/* ==========================================================
   LISTENING TRUE / FALSE
========================================================== */

function getListeningTFN() {

    return lessonData.listening.quiz.tfn;

}

/* ==========================================================
   LISTENING GAP FILL
========================================================== */

function getListeningGapFill() {

    return lessonData.listening.quiz.gapFill;

}

/* ==========================================================
   LISTENING VOCABULARY
========================================================== */

function getListeningVocabulary() {

    return lessonData.listening.quiz.vocabulary;

}
/* ==========================================================
   LISTENING MATCHING
========================================================== */

function getListeningMatching() {

    return lessonData.listening.quiz.matching;

}