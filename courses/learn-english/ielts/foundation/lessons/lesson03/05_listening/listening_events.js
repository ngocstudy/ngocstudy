/*==========================================================
Module    : listening_events.js
Thư mục   : 05_listening

Version   : 1.0
Status    : 🟡 TESTING
Ngày      : 02/08/2026

------------------------------------------------------------
Chức năng
- Đăng ký Event cho Listening.
- Điều phối sự kiện của Listening.
- Không chứa Render.
- Không chứa Navigation.

------------------------------------------------------------
Gồm các hàm
- initListeningEvents()

------------------------------------------------------------
Phụ thuộc
- config.js
- listening_navigation.js

------------------------------------------------------------
Ghi chú
- Chỉ đăng ký Event.
- Không xử lý dữ liệu.
- Không Render giao diện.
- Chưa khóa.
==========================================================*/

"use strict";

/* ==========================================================
   INIT LISTENING EVENTS
========================================================== */

function initListeningEvents() {

    DOM.continueListeningBtn.addEventListener(

        "click",

        continueListening

    );

}