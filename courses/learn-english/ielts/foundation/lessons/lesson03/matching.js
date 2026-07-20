/* ==========================================================
   IELTS FOUNDATION 4.0
   Lesson Engine v2.0
   matching.js

   Chức năng:
   - Khởi động Matching Game
   - Reset trạng thái
   - Chuẩn bị dữ liệu
   - Hiển thị màn hình Matching
   - Điều phối các module Matching

   Không chứa:
   - Tạo Card
   - Xử lý Click
   - Review
   - Unlock Reading
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

    hide(DOM.finishScreen);

    hide(DOM.reviewScreen);

    hide(DOM.readingLocked);

    hide(DOM.readingUnlocked);

    show(DOM.matchingScreen);

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

    unlockReading();

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
