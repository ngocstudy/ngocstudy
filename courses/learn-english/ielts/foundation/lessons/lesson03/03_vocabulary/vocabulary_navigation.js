/*==========================================================
Module   : vocabulary_navigation.js
Thư mục  : 03_vocabulary

Version  : 3.0
Status   : 🔒 LOCKED
Ngày     : 01/08/2026
==========================================================

Chức năng

- Điều hướng Vocabulary.
- Chuyển Previous / Next.
- Kết thúc Vocabulary.
- Mở Matching.
- Đăng ký sự kiện điều hướng.

----------------------------------------------------------
Gồm các hàm / thành phần

- previousVocabulary()
- nextVocabulary()
- finishVocabulary()
- startMatchingGame()
- registerVocabularyNavigationEvents()
- registerVocabularyKeyboardEvents()
- lockVocabularyNavigation()
- unlockVocabularyNavigation()
- restartVocabulary()
- initializeVocabularyNavigation()

----------------------------------------------------------
Phụ thuộc

- config.js
- utils.js
- loader.js
- audio.js
- navigation_history.js
- navigation_back.js

----------------------------------------------------------
Bị phụ thuộc

- script.js

----------------------------------------------------------
Ghi chú

- Chỉ điều hướng Vocabulary.
- Không quản lý Reading.
- Không quản lý Listening.
- Không quản lý Checkpoint.
- Không quản lý Navigation của App.
- Không Render.
- Không quản lý History.

==========================================================*/

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
    resetScoreState();
ListeningState.mcqAnswer = [];
ListeningState.tfnAnswer = [];
ListeningState.gapFillAnswer = [];
ListeningState.vocabularyAnswer = [];
ListeningState.matchingAnswer = [];
    createMatchingGame();
    pushNavigationHistory("matching");
updateBackButton();
}


/* ==========================================================
   BUTTON EVENTS
========================================================== */

function registerVocabularyNavigationEvents() {

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

function registerVocabularyKeyboardEvents() {

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

function lockVocabularyNavigation() {

    disable(DOM.prevBtn);

    disable(DOM.nextBtn);

}


function unlockVocabularyNavigation() {

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

function initializeVocabularyNavigation() {

    registerVocabularyNavigationEvents();

    registerVocabularyKeyboardEvents();

    pushNavigationHistory("vocabulary");

}
