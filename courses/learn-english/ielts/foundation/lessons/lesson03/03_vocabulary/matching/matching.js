/* ==========================================================
   IELTS FOUNDATION 4.0
   Lesson Engine v3.0

   Module: matching.js
   Version: 1.0 (LOCKED)

   Chức năng
   ----------------------------------------------------------
   - Điều phối toàn bộ Matching Game
   - Khởi động Matching
   - Reset Engine
   - Chuẩn bị dữ liệu
   - Chuyển sang màn hình Matching
   - Cập nhật điểm
   - Kiểm tra hoàn thành
   - Kết thúc / Khởi động lại / Thoát Matching

   Không chứa
   ----------------------------------------------------------
   - Render Card
   - Xử lý Click
   - Review
   - Unlock Reading
   - Logic Navigation
   - Logic Card

   Quy tắc
   ----------------------------------------------------------
   - Chỉ điều phối luồng Matching.
   - Mọi chuyển màn hình sang Matching phải thông qua
     showMatchingScreen().
   - Không hide/show Matching trực tiếp ở module khác.

   IMPORTANT
   ----------------------------------------------------------
   showMatchingScreen() là điểm vào duy nhất của màn hình
   Matching.

   Sau mỗi lần chuyển sang Matching bắt buộc phải cập nhật:

       updateBackButton();
       updateHomeButton();

   Không được xóa hai dòng trên nếu chưa kiểm tra toàn bộ
   luồng chương trình.

   Đã từng gây lỗi:
   - Home hiện sai ở Vocabulary.
   - Back/Home không cập nhật khi tự động quay từ
     Vocabulary → Matching.

   Đã kiểm thử:
   PASS (31/07/2026)

   Trạng thái
   ----------------------------------------------------------
   LOCKED
   Không chỉnh sửa nếu không thay đổi kiến trúc Matching.
========================================================== */

"use strict";

/* ==========================================================
   START MATCHING
========================================================== */

function createMatchingGame() {

    resetMatchingEngine();

    prepareMatchingData();

    showMatchingScreen();

    buildMatchingCards();

}


/* ==========================================================
   RESET ENGINE
========================================================== */

function resetMatchingEngine() {

    resetMatchingState();

    clear(DOM.matchingContainer);

    setText(DOM.matchingMessage, "");

    setText(
        DOM.correctCount,
        `0 / ${VocabularyState.totalWords}`
    );

}


/* ==========================================================
   PREPARE DATA
========================================================== */

function prepareMatchingData() {

    MatchingState.cards = shuffle(
        [...vocabularyData]
    );

}


/* ==========================================================
   SHOW SCREEN
========================================================== */

function showMatchingScreen() {

    hide(DOM.vocabularyScreen);

    hide(DOM.finishScreen);

    hide(DOM.reviewScreen);

    hide(DOM.readingLocked);

    hide(DOM.readingUnlocked);

    show(DOM.matchingScreen);
 /* ----------------------------------------------------------
   IMPORTANT
   ----------------------------------------------------------
   Sau mỗi lần chuyển sang Matching bắt buộc phải cập nhật
   trạng thái Navigation.

   Không được xóa hai dòng dưới.

   Nếu bỏ:
   - Home sẽ hiện sai ở Vocabulary.
   - Back/Home sẽ không hiện khi tự động quay từ
     Vocabulary → Matching (Review/Countdown).

   Mọi luồng chuyển sang Matching đều phải đi qua đây
   hoặc phải gọi:

       updateBackButton();
       updateHomeButton();

   Đã kiểm thử: PASS (31/07/2026)
---------------------------------------------------------- */
    updateBackButton();
    
    updateHomeButton();
    
document.querySelector(".progress-section").style.display = "none";
}


/* ==========================================================
   UPDATE SCORE
========================================================== */

function updateMatchingScore() {

    setText(

        DOM.correctCount,

        `${MatchingState.correctPairs} / ${VocabularyState.totalWords}`

    );

}


/* ==========================================================
   ADD CORRECT
========================================================== */

function increaseCorrectPair() {

    MatchingState.correctPairs++;

    updateMatchingScore();

}


/* ==========================================================
   REMOVE MATCHED CARD
========================================================== */

function removeMatchedCards(cardA, cardB) {

    if (cardA) {

        cardA.classList.add("matched");

    }

    if (cardB) {

        cardB.classList.add("matched");

    }

}


/* ==========================================================
   CHECK FINISH
========================================================== */

function matchingCompleted() {

    return (

        MatchingState.correctPairs >=

        VocabularyState.totalWords

    );

}


/* ==========================================================
   FINISH
========================================================== */

function finishMatchingGame() {

    if (!matchingCompleted()) {

        return;

    }

    /* ==========================================================
       SAVE VOCABULARY ATTEMPT
    ========================================================== */

    const score = Math.round(

        (MatchingState.correctPairs / VocabularyState.totalWords) * 100

    );

    saveVocabularyPractice(score);

    finishMatching();

}


/* ==========================================================
   RESTART
========================================================== */

function restartMatchingGame() {

    createMatchingGame();

}


/* ==========================================================
   EXIT
========================================================== */

function exitMatchingGame() {

    resetMatchingEngine();

    showVocabularyScreen();

}
