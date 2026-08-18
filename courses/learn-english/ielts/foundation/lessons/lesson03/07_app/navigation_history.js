/*==========================================================
Module   : navigation_history.js
Thư mục  : 07_app

Version  : 3.1
Status   : 🔒 LOCKED
Ngày     : 01/08/2026
==========================================================

Chức năng
----------------------------------------------------------
- Quản lý Navigation History.
- Lưu Stack màn hình.
- Cung cấp API truy cập History.
- Quản lý màn hình hiện tại và màn hình trước.

----------------------------------------------------------
Gồm các hàm / thành phần
----------------------------------------------------------
- NavigationHistory
- initNavigationHistory()
- pushNavigationHistory()
- getNavigationHistory()
- getCurrentScreen()
- removeCurrentScreen()
- getPreviousScreen()

----------------------------------------------------------
Phụ thuộc
----------------------------------------------------------
- Không

----------------------------------------------------------
Bị phụ thuộc
----------------------------------------------------------
- navigation_engine.js
- navigation_back.js
- navigation_home.js

----------------------------------------------------------
Quy tắc
----------------------------------------------------------
- Foundation Module.
- Chỉ quản lý History Stack.
- Không chứa Business Logic.
- Không Render.
- Không xử lý Back.
- Không xử lý Home.
- Mọi xử lý chuyên biệt phải nằm trong module tương ứng.

----------------------------------------------------------
IMPORTANT
----------------------------------------------------------
Đây là Foundation Module của toàn bộ Navigation.

Không thao tác trực tiếp với NavigationHistory
ở module khác.

Mọi thao tác phải thông qua các API:

    pushNavigationHistory()
    getNavigationHistory()
    getCurrentScreen()
    removeCurrentScreen()
    getPreviousScreen()

Không thay đổi cấu trúc Stack nếu chưa kiểm tra
toàn bộ luồng Navigation.

==========================================================*/

"use strict";

/* ==========================================================
   NAVIGATION HISTORY
========================================================== */

const NavigationHistory = [];

/* ==========================================================
   INIT HISTORY
========================================================== */

function initNavigationHistory() {

    NavigationHistory.length = 0;

}
/* ==========================================================
   PUSH HISTORY
========================================================== */

function pushNavigationHistory(screen) {

    NavigationHistory.push(screen);

}
/* ==========================================================
   GET CURRENT HISTORY
========================================================== */

function getNavigationHistory() {

    return NavigationHistory;

}
/* ==========================================================
   GET CURRENT SCREEN
========================================================== */

function getCurrentScreen() {

    if (NavigationHistory.length === 0) {

        return null;

    }

    return NavigationHistory[NavigationHistory.length - 1];

}
/* ==========================================================
   REMOVE CURRENT SCREEN
========================================================== */

function removeCurrentScreen() {

    if (NavigationHistory.length === 0) {

        return null;

    }

    return NavigationHistory.pop();

}
/* ==========================================================
   GET PREVIOUS SCREEN
========================================================== */

function getPreviousScreen() {

    if (NavigationHistory.length === 0) {

        return null;

    }

    return NavigationHistory[NavigationHistory.length - 1];

}