/*==========================================================
Module   : navigation_engine.js
Thư mục  : 07_app

Version  : 3.1
Status   : 🔒 LOCKED
Ngày     : 01/08/2026
==========================================================

Chức năng
----------------------------------------------------------
- Khởi tạo Navigation Engine.
- Khởi tạo các module Navigation.
- Điều phối quá trình đăng ký Navigation.

----------------------------------------------------------
Gồm các hàm / thành phần
----------------------------------------------------------
- initNavigationEngine()

----------------------------------------------------------
Phụ thuộc
----------------------------------------------------------
- navigation_history.js
- navigation_back.js
- navigation_home.js

----------------------------------------------------------
Bị phụ thuộc
----------------------------------------------------------
- script.js

----------------------------------------------------------
Quy tắc
----------------------------------------------------------
- Chỉ khởi tạo các module Navigation.
- Không chứa Business Logic.
- Không xử lý Back.
- Không xử lý Home.
- Không xử lý History.
- Không Render.
- Mọi xử lý chuyên biệt phải nằm trong module tương ứng.

----------------------------------------------------------
IMPORTANT
----------------------------------------------------------
Đây là Engine trung tâm của Navigation.

Chỉ được phép khởi tạo module.

Không thêm xử lý nghiệp vụ vào file này.

Nếu bổ sung module Navigation mới thì chỉ đăng ký
(init...) tại đây.

==========================================================*/

"use strict";

/* ==========================================================
   INIT NAVIGATION
========================================================== */

function initNavigationEngine() {

    initNavigationHistory();

    initNavigationBack();

    initNavigationHome();


}