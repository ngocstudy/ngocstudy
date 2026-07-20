/* ==========================================================
   IELTS FOUNDATION 4.0
   Lesson Engine v2.0
   matching_finish.js

   Chức năng
   ----------------------------------------------------------
   - Hoàn thành Matching
   - Unlock Reading
   - Hiển thị Reading
   - Reset Finish
========================================================== */

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

    unlockReading();

    hide(DOM.matchingScreen);

    show(DOM.finishScreen);

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
