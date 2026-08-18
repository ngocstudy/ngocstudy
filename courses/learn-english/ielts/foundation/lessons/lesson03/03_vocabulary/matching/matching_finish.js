/*==========================================================
Module : matching_finish.js
Thư mục: 03_vocabulary/matching

Version : 1.0
Status  : 🔒 LOCKED
Ngày    : 01/08/2026

------------------------------------------------------------
Chức năng

- Hoàn thành Matching
- Khóa/Mở Reading
- Chuyển sang màn hình Reading
- Khởi tạo trạng thái Finish

------------------------------------------------------------
Gồm các hàm

unlockReading()
lockReading()
finishMatching()
resetFinish()
initFinishEngine()

------------------------------------------------------------
Phụ thuộc

config.js
utils.js

------------------------------------------------------------
Ghi chú

Module chỉ quản lý trạng thái sau khi hoàn thành Matching.

Không tạo card.

Không xử lý sự kiện Matching.

Không hiển thị Review.
==========================================================*/

"use strict";

/* ==========================================================
   UNLOCK READING
========================================================== */

function unlockReading() {

    hide(DOM.readingLocked);

    show(DOM.readingUnlocked);

    enable(DOM.readingBtn);

}


/* ==========================================================
   LOCK READING
========================================================== */

function lockReading() {

    show(DOM.readingLocked);

    hide(DOM.readingUnlocked);

    disable(DOM.readingBtn);

}


/* ==========================================================
   FINISH MATCHING
========================================================== */

function finishMatching() {

    hide(DOM.matchingScreen);

    show(DOM.readingFinishScreen);

    updateBackButton();

    updateHomeButton();

}

/* ==========================================================
   RESET FINISH
========================================================== */

function resetFinish() {

    lockReading();

}


/* ==========================================================
   INIT FINISH ENGINE
========================================================== */

function initFinishEngine() {

    resetFinish();

}
