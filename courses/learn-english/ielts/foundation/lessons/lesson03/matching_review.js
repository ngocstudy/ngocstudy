/* ==========================================================
   IELTS FOUNDATION 4.0
   Lesson Engine v2.0
   matching_review.js

   Chức năng
   ----------------------------------------------------------
   - Hiển thị Review
   - Hiển thị Word
   - Hiển thị IPA
   - Hiển thị Meaning
   - Hiển thị Synonyms
   - Hiển thị Word Family
========================================================== */

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
