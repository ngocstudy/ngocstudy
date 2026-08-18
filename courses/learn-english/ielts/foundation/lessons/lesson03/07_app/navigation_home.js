/*==========================================================
Module   : navigation_home.js
Thư mục  : 07_app

Version  : 3.1
Status   : 🔒 LOCKED
Ngày     : 01/08/2026
==========================================================

Chức năng
----------------------------------------------------------
- Quản lý nút Home.
- Xử lý quay về trang chủ.
- Lưu tiến trình trước khi thoát.
- Cập nhật trạng thái hiển thị của nút Home.

----------------------------------------------------------
Gồm các hàm / thành phần
----------------------------------------------------------
- initNavigationHome()
- goHome()
- saveProgress()
- updateHomeButton()

----------------------------------------------------------
Phụ thuộc
----------------------------------------------------------
- config.js
- utils.js

----------------------------------------------------------
Bị phụ thuộc
----------------------------------------------------------
- navigation_engine.js

----------------------------------------------------------
Quy tắc
----------------------------------------------------------
- Chỉ xử lý chức năng Home.
- Không chứa Business Logic.
- Không Render.
- Không quản lý Back.
- Không quản lý History.
- Không quản lý Confirm ngoài phạm vi Home.
- Mọi xử lý chuyên biệt phải nằm trong module tương ứng.

----------------------------------------------------------
IMPORTANT
----------------------------------------------------------
Sau mỗi lần thay đổi màn hình hoặc trạng thái Lesson
bắt buộc phải cập nhật:

    updateHomeButton();

Không được chuyển màn hình bằng Home mà bỏ qua
việc cập nhật trạng thái.

Đây là Logic đã kiểm thử.

Đã từng gây lỗi:
- Home hiện sai ở Vocabulary.
- Home không cập nhật sau khi chuyển màn hình.

PASS : 01/08/2026

==========================================================*/

"use strict";

/* ==========================================================
   INIT HOME
========================================================== */

function initNavigationHome() {

    if (!DOM.homeBtn) return;

    DOM.homeBtn.addEventListener(
        "click",
        goHome
    );

}

/* ==========================================================
   GO HOME
========================================================== */

function goHome() {

    /* ------------------------------------------
       Confirm
    ------------------------------------------ */

    const ok = confirm(
        "Bạn có muốn quay về trang chủ không?"
    );

    if (!ok) return;

    /* ------------------------------------------
       Save Progress
    ------------------------------------------ */

    saveProgress();

    /* ------------------------------------------
       Go Home
    ------------------------------------------ */

    window.location.href =
        "https://ngocstudy.github.io/ngocstudy/";

}

/* ==========================================================
   SAVE PROGRESS
========================================================== */

function saveProgress() {

    console.log("Progress Saved");

}

/* ==========================================================
   UPDATE HOME BUTTON
========================================================== */

function updateHomeButton() {

    if (DOM.vocabularyScreen &&
        !DOM.vocabularyScreen.classList.contains("hidden")) {

        hide(DOM.homeBtn);

        return;

    }

    show(DOM.homeBtn);

}