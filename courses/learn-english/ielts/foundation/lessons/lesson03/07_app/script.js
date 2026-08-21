/*==========================================================
Module   : script.js
Thư mục  : 07_app

Version  : 3.1
Status   : 🔒 LOCKED
Ngày     : 01/08/2026
==========================================================

Chức năng
----------------------------------------------------------
- Điểm khởi động duy nhất của Lesson.
- Khởi tạo toàn bộ module.
- Điều phối luồng hoạt động cấp ứng dụng.
- Tải dữ liệu và bắt đầu Lesson.
- Điều phối chuyển đổi giữa các giai đoạn của Lesson.

----------------------------------------------------------
Gồm các hàm / thành phần
----------------------------------------------------------
- initializeApp()
- initializeModules()
- startMatching()
- refreshLesson()
- goNextWord()
- goPreviousWord()
- finishVocabulary()
- openMatching()
- restartLesson()
- resetApp()
- destroyApp()

----------------------------------------------------------
Phụ thuộc
----------------------------------------------------------
- config.js
- utils.js
- loader.js
- audio.js

- vocabulary_navigation.js

- navigation_engine.js

- matching.js

- reading_renderer.js
- reading_events.js
- reading_navigation.js

----------------------------------------------------------
Bị phụ thuộc
----------------------------------------------------------
- index.html

----------------------------------------------------------
Quy tắc
----------------------------------------------------------
- Đây là điểm khởi động duy nhất của Lesson.
- Chỉ khởi tạo và điều phối các module.
- Không chứa Business Logic của từng module.
- Không chứa Render.
- Không chứa Event.
- Mọi chức năng chuyên biệt phải nằm trong module tương ứng.

----------------------------------------------------------
IMPORTANT
----------------------------------------------------------
Sau mỗi lần thay đổi màn hình hoặc trạng thái Lesson
bắt buộc phải cập nhật Navigation bằng:

    updateBackButton();
    updateHomeButton();

Đây là Logic đã kiểm thử.

Không xóa hoặc di chuyển nếu chưa kiểm tra toàn bộ
luồng chương trình.

Đã từng gây lỗi:
- Home hiện sai ở Vocabulary.
- Back/Home không cập nhật khi chuyển màn hình.

PASS : 01/08/2026

==========================================================*/

"use strict";

/* ==========================================================
   INIT APP
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    initializeApp

);
/* ==========================================================
   INITIALIZE
========================================================== */
async function initializeApp() {

    if (App.initialized) {

        return;

    }

    try {

await loadLesson();

renderLessonHeader();

initializeModules();

hide(DOM.readingLocked);

renderVocabulary();
/* ----------------------------------------------------------
   IMPORTANT

   Sau mỗi lần thay đổi màn hình hoặc trạng thái Lesson
   bắt buộc phải cập nhật Navigation.

   Không xóa hai dòng dưới nếu chưa kiểm tra toàn bộ luồng.

       updateBackButton();
       updateHomeButton();

   Đã từng gây lỗi:
   - Home hiện sai ở Vocabulary.
   - Back/Home không cập nhật khi chuyển màn hình.

   PASS : 01/08/2026
---------------------------------------------------------- */
updateBackButton();

updateHomeButton();

autoSpeakCurrentWord();

App.initialized = true;

    }

catch (error) {

console.error(error);

showLoadError(error.message);

    }

}

/* ==========================================================
   MODULES
========================================================== */

function initializeModules() {

    initAudioEvents();

    initializeVocabularyNavigation();

    initializeReadingNavigation();
    
    initializeListeningNavigation();
    
    initNavigationEngine();     // Navigation Engine v1.0

    initReviewEngine();

    initFinishEngine();

    initReadingEvents();
    
    initListeningEvents();
}


/* ==========================================================
   START MATCHING
========================================================== */

function startMatching() {

    createMatchingGame();

}
/* ==========================================================
   VOCABULARY
========================================================== */

function refreshLesson() {

    renderVocabulary();
/* ----------------------------------------------------------
   IMPORTANT

   Sau mỗi lần thay đổi màn hình hoặc trạng thái Lesson
   bắt buộc phải cập nhật Navigation.

   Không xóa hai dòng dưới nếu chưa kiểm tra toàn bộ luồng.

       updateBackButton();
       updateHomeButton();

   Đã từng gây lỗi:
   - Home hiện sai ở Vocabulary.
   - Back/Home không cập nhật khi chuyển màn hình.

   PASS : 01/08/2026
---------------------------------------------------------- */    
    updateBackButton();
    
    updateHomeButton();
    
    autoSpeakCurrentWord();

}


/* ==========================================================
   NEXT
========================================================== */

function goNextWord() {

if (!hasNextWord()) {

    finishVocabulary();

    return;

}

    nextWord();

    refreshLesson();

}


/* ==========================================================
   PREVIOUS
========================================================== */

function goPreviousWord() {

    if (!hasPreviousWord()) {

        return;

    }

    previousWord();

    refreshLesson();

}


/* ==========================================================
   FINISH VOCABULARY
========================================================== */

function finishVocabulary() {

    stopSpeaking();

    showFinishScreen();
/* ----------------------------------------------------------
   IMPORTANT

   Sau mỗi lần thay đổi màn hình hoặc trạng thái Lesson
   bắt buộc phải cập nhật Navigation.

   Không xóa hai dòng dưới nếu chưa kiểm tra toàn bộ luồng.

       updateBackButton();
       updateHomeButton();

   Đã từng gây lỗi:
   - Home hiện sai ở Vocabulary.
   - Back/Home không cập nhật khi chuyển màn hình.

   PASS : 01/08/2026
---------------------------------------------------------- */    
    updateBackButton();
    
    updateHomeButton();

}


/* ==========================================================
   MATCHING
========================================================== */

function openMatching() {

    startMatching();
/* ----------------------------------------------------------
   IMPORTANT

   Sau mỗi lần thay đổi màn hình hoặc trạng thái Lesson
   bắt buộc phải cập nhật Navigation.

   Không xóa hai dòng dưới nếu chưa kiểm tra toàn bộ luồng.

       updateBackButton();
       updateHomeButton();

   Đã từng gây lỗi:
   - Home hiện sai ở Vocabulary.
   - Back/Home không cập nhật khi chuyển màn hình.

   PASS : 01/08/2026
---------------------------------------------------------- */    
    updateBackButton();

    updateHomeButton();
}


/* ==========================================================
   RESTART LESSON
========================================================== */

function restartLesson() {

    resetLesson();

    renderVocabulary();
/* ----------------------------------------------------------
   IMPORTANT

   Sau mỗi lần thay đổi màn hình hoặc trạng thái Lesson
   bắt buộc phải cập nhật Navigation.

   Không xóa hai dòng dưới nếu chưa kiểm tra toàn bộ luồng.

       updateBackButton();
       updateHomeButton();

   Đã từng gây lỗi:
   - Home hiện sai ở Vocabulary.
   - Back/Home không cập nhật khi chuyển màn hình.

   PASS : 01/08/2026
---------------------------------------------------------- */
    updateBackButton();

    updateHomeButton();

    autoSpeakCurrentWord();

}

/* ==========================================================
   RESET APP
========================================================== */

function resetApp() {

    stopSpeaking();

    resetLesson();

    resetReview();

    resetFinish();

}
/* ==========================================================
   CLEANUP
========================================================== */

function destroyApp() {

    stopSpeaking();

    clearCountdown();

}


/* ==========================================================
   WINDOW EVENTS
========================================================== */

window.addEventListener(

    "beforeunload",

    destroyApp

);


/* ==========================================================
   PUBLIC
========================================================== */

window.LessonEngine = {

    initialize: initializeApp,

    restart: restartLesson,

    reset: resetApp,

    startMatching: openMatching

};


/* ==========================================================
   READY
========================================================== */

console.log(

    "Lesson Engine v2.0 (Stable) Ready."

);

