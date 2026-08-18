/*==========================================================
Module : matching_review.js
Thư mục: 03_vocabulary/matching

Version : 1.0
Status  : 🔒 LOCKED
Ngày    : 01/08/2026

------------------------------------------------------------
Chức năng

- Hiển thị màn hình Review
- Hiển thị thông tin từ vựng
- Hiển thị Synonyms
- Hiển thị Word Family
- Điều khiển Countdown
- Quay lại Matching

------------------------------------------------------------
Gồm các hàm

showReview()
hideReview()
renderReview()
renderReviewSynonyms()
renderReviewFamily()
continueMatching()
startCountdown()
updateCountdown()
resetCountdown()
initReviewEvents()
resetReview()
destroyReview()
initReviewEngine()
openReview()
closeReview()

------------------------------------------------------------
Phụ thuộc

config.js
utils.js
matching.js

------------------------------------------------------------
Ghi chú

Quản lý toàn bộ màn hình Review của Matching.

Không xử lý tạo card.

Không xử lý kiểm tra đáp án.

Không xử lý hoàn thành Matching.
==========================================================*/

"use strict";

/* ==========================================================
   SHOW REVIEW
========================================================== */

function showReview() {

    const word = currentReviewWord();

    if (!word) return;

    renderReview(word);

    hide(DOM.matchingScreen);

    show(DOM.reviewScreen);

    speakReviewWord();

    startCountdown();

}


/* ==========================================================
   HIDE REVIEW
========================================================== */

function hideReview() {

    clearCountdown();

    hide(DOM.reviewScreen);

    show(DOM.matchingScreen);

}


/* ==========================================================
   RENDER REVIEW
========================================================== */

function renderReview(word) {

    setText(DOM.reviewWord, word.word);

    setText(DOM.reviewIPA, word.ipa);

    setText(DOM.reviewMeaning, word.meaning);

    renderReviewSynonyms(word.synonyms);

    renderReviewFamily(word.family);

}


/* ==========================================================
   SYNONYMS
========================================================== */

function renderReviewSynonyms(list) {

    if (!Array.isArray(list)) {

        setHTML(DOM.reviewSynonyms, "");

        return;

    }

    setHTML(

        DOM.reviewSynonyms,

        list.join(", ")

    );

}


/* ==========================================================
   WORD FAMILY
========================================================== */

function renderReviewFamily(list) {

    if (!Array.isArray(list)) {

        setHTML(DOM.reviewFamily, "");

        return;

    }

    setHTML(

        DOM.reviewFamily,

        list.join(", ")

    );

}
/* ==========================================================
   CONTINUE BUTTON
========================================================== */

function continueMatching() {

    clearCountdown();

    hideReview();

    continueMatchingGame();

}


/* ==========================================================
   COUNTDOWN
========================================================== */

function startCountdown() {

    clearCountdown();

    ReviewState.countdown = Config.reviewDelay;

    updateCountdown();

    ReviewState.timer = setInterval(() => {

        ReviewState.countdown--;

        updateCountdown();

        if (ReviewState.countdown <= 0) {

            continueMatching();

        }

    }, 1000);

}


/* ==========================================================
   UPDATE COUNTDOWN
========================================================== */

function updateCountdown() {

    setText(

        DOM.countdownText,

        ReviewState.countdown

    );

}


/* ==========================================================
   RESET COUNTDOWN
========================================================== */

function resetCountdown() {

    clearCountdown();

    ReviewState.countdown = Config.reviewDelay;

    updateCountdown();

}
/* ==========================================================
   INIT EVENTS
========================================================== */

function initReviewEvents() {

    if (!DOM.continueMatchingBtn) return;

    DOM.continueMatchingBtn.addEventListener(

        "click",

        continueMatching

    );

}


/* ==========================================================
   RESET REVIEW
========================================================== */

function resetReview() {

    clearCountdown();

    hide(DOM.reviewScreen);

    MatchingState.reviewWord = null;

}


/* ==========================================================
   DESTROY REVIEW
========================================================== */

function destroyReview() {

    clearCountdown();

    hide(DOM.reviewScreen);

}


/* ==========================================================
   INIT REVIEW ENGINE
========================================================== */

function initReviewEngine() {

    initReviewEvents();

    resetReview();

}


/* ==========================================================
   PUBLIC
========================================================== */

function openReview() {

    showReview();

}


function closeReview() {

    continueMatching();

}
