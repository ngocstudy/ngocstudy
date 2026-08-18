/*==========================================================
Module    : reading_navigation.js
Thư mục   : 04_reading

Version   : 1.1
Status    : 🔒 LOCKED
Ngày      : 02/08/2026

------------------------------------------------------------
Chức năng
- Điều phối Navigation riêng của Reading.
- Đăng ký Event cho các nút Reading.
- Khởi tạo Navigation của Reading.
- Chuyển điều khiển sang Navigation dùng chung.

------------------------------------------------------------
Gồm các hàm
- registerReadingEvents()
- initializeReadingNavigation()

------------------------------------------------------------
Phụ thuộc
- config.js
- question_navigation.js

------------------------------------------------------------
Ghi chú
- Chỉ chứa Navigation riêng của Reading.
- Không Render giao diện.
- Không chứa Navigation dùng chung.
- Không xử lý Event của câu hỏi.
- Không xử lý Score.
- Không chứa dữ liệu Lesson.
- Toàn bộ Navigation dùng chung nằm trong:
      01_engine/question_navigation.js
- Module đã chuẩn hóa và khóa.

==========================================================*/

"use strict";




/* ==========================================================
   REGISTER EVENTS
========================================================== */

function registerReadingEvents() {

    if (DOM.readingBtn) {

        DOM.readingBtn.addEventListener(

            "click",

            startReading1

        );

    }

    if (DOM.readingFinishBtn) {

        DOM.readingFinishBtn.addEventListener(

            "click",

            startReading1

        );

    }

    if (DOM.continueReadingBtn) {

        DOM.continueReadingBtn.addEventListener(

            "click",

            continueReading

        );

    }
/* ==========================================================
   BACK BUTTON
========================================================== */

if (DOM.backBtn) {

    DOM.backBtn.addEventListener(

        "click",

        goBack

    );

}
}

/* ==========================================================
   INITIALIZE
========================================================== */

function initializeReadingNavigation() {

    registerReadingEvents();

}