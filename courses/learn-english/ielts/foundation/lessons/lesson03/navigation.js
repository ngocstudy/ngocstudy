/* ==========================================================
   IELTS FOUNDATION 4.0
   Lesson Engine v2.0
   navigation.js

   Chức năng:
   - Previous
   - Next
   - Finish Vocabulary
   - Đăng ký sự kiện điều hướng

   Không chứa:
   - Load JSON
   - Render HTML
   - Matching
   - Review
========================================================== */

"use strict";

/* ==========================================================
   PREVIOUS
========================================================== */

function previousVocabulary() {

    if (!hasPreviousWord()) return;

    previousWord();

    refreshVocabulary();

}


/* ==========================================================
   NEXT
========================================================== */

function nextVocabulary() {

    if (hasNextWord()) {

        nextWord();

        refreshVocabulary();

        return;

    }

    finishVocabulary();

}


/* ==========================================================
   FINISH
========================================================== */

function finishVocabulary() {

    showFinishScreen();

}


/* ==========================================================
   START MATCHING
========================================================== */

function startMatchingGame() {

    hide(DOM.finishScreen);

    show(DOM.matchingScreen);

    resetMatchingState();

    createMatchingGame();

}


/* ==========================================================
   BUTTON EVENTS
========================================================== */

function registerNavigationEvents() {

    if (DOM.prevBtn) {

        DOM.prevBtn.addEventListener(

            "click",

            previousVocabulary

        );

    }

    if (DOM.nextBtn) {

        DOM.nextBtn.addEventListener(

            "click",

            nextVocabulary

        );

    }

    if (DOM.matchingBtn) {

        DOM.matchingBtn.addEventListener(

            "click",

            startMatchingGame

        );

    }

}


/* ==========================================================
   KEYBOARD
========================================================== */

function registerKeyboardEvents() {

    document.addEventListener(

        "keydown",

        event => {

            switch (event.key) {

                case "ArrowLeft":

                    previousVocabulary();

                    break;

                case "ArrowRight":

                    nextVocabulary();

                    break;

                default:

                    break;

            }

        }

    );

}


/* ==========================================================
   ENABLE / DISABLE
========================================================== */

function lockNavigation() {

    disable(DOM.prevBtn);

    disable(DOM.nextBtn);

}


function unlockNavigation() {

    updateNavigationButtons();

}


/* ==========================================================
   RESTART
========================================================== */

function restartVocabulary() {

    resetLesson();

    showVocabularyScreen();

}


/* ==========================================================
   INITIALIZE
========================================================== */

function initializeNavigation() {

    registerNavigationEvents();

    registerKeyboardEvents();

}
