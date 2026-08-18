/*==========================================================
Module    : reading_events.js
Thư mục   : 04_reading

Version   : 1.0
Status    : 🔒 LOCKED
Ngày      : 31/07/2026

------------------------------------------------------------
Chức năng
- Điều phối toàn bộ Event của Reading.
- Gọi các hàm Event tương ứng.
- Không trực tiếp xử lý Event.

------------------------------------------------------------
Gồm các hàm
- initReadingEvents()

------------------------------------------------------------
Phụ thuộc
- config.js
- utils.js
- state.js
- question_events.js

------------------------------------------------------------
Ghi chú
- Chỉ điều phối Event của Reading.
- Không chứa code Event chi tiết.
- Không Render giao diện.
- Không xử lý Navigation.
- Không xử lý Score.
- Toàn bộ Event nằm trong:
      01_engine/question_events.js
- Module đã kiểm thử và khóa.
==========================================================*/

"use strict";

/* ==========================================================
   INIT EVENTS
========================================================== */

function initReadingEvents() {

    bindMCQEvents();

    bindTFNEvents();

    bindSummaryEvents();

    bindVocabularyEvents();

    bindMatchingEvents();

}




