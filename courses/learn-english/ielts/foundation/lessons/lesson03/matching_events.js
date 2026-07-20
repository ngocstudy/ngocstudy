/* ==========================================================
   IELTS FOUNDATION 4.0
   Lesson Engine v2.0
   matching_events.js

   Chức năng
   ----------------------------------------------------------
   - Xử lý click card
   - Quản lý lựa chọn
   - Kiểm tra ghép đúng/sai
   - Không xử lý Review UI
   - Không Unlock Reading
========================================================== */

"use strict";

/* ==========================================================
   ATTACH EVENT
========================================================== */

function attachMatchingEvent(card) {

    if (!card) return;

    card.addEventListener("click", () => {

        handleCardClick(card);

    });

}


/* ==========================================================
   CARD CLICK
========================================================== */

function handleCardClick(card) {

    if (!card) return;

    if (card.classList.contains("matched")) return;

    if (card.classList.contains("disabled")) return;

    const id = Number(card.dataset.id);

    if (isMatched(id)) return;

    const type = card.dataset.type;

    if (type === "english") {

        selectEnglish(card);

    }
    else {

        selectMeaning(card);

    }

    checkMatching();

}


/* ==========================================================
   SELECT ENGLISH
========================================================== */

function selectEnglish(card) {

    if (MatchingState.selectedEnglish) {

        unselectCard(MatchingState.selectedEnglish);

    }

    MatchingState.selectedEnglish = card;

    selectCard(card);

}


/* ==========================================================
   SELECT MEANING
========================================================== */

function selectMeaning(card) {

    if (MatchingState.selectedMeaning) {

        unselectCard(MatchingState.selectedMeaning);

    }

    MatchingState.selectedMeaning = card;

    selectCard(card);

}


/* ==========================================================
   READY ?
========================================================== */

function hasSelectedPair() {

    return (

        MatchingState.selectedEnglish &&

        MatchingState.selectedMeaning

    );

}


/* ==========================================================
   CHECK MATCH
========================================================== */

function checkMatching() {

    if (!hasSelectedPair()) return;

    const englishId = Number(

        MatchingState.selectedEnglish.dataset.id

    );

    const meaningId = Number(

        MatchingState.selectedMeaning.dataset.id

    );

    if (englishId === meaningId) {

        handleCorrect();

    }
    else {

        handleWrong();

    }

}
/* ==========================================================
   HANDLE CORRECT
========================================================== */

function handleCorrect() {

    const englishCard = MatchingState.selectedEnglish;

    const meaningCard = MatchingState.selectedMeaning;

    const id = Number(englishCard.dataset.id);

    addMatched(id);

    increaseCorrectPair();

    MatchingState.reviewWord = getWordById(id);

    disableMatchingCards();

    hideMatchedPair(

        englishCard,

        meaningCard

    );

    resetSelection();

    setTimeout(() => {

        showReview();

    }, 300);

}


/* ==========================================================
   HANDLE WRONG
========================================================== */

function handleWrong() {

    const englishCard = MatchingState.selectedEnglish;

    const meaningCard = MatchingState.selectedMeaning;

    englishCard.classList.add("wrong");

    meaningCard.classList.add("wrong");

    disableMatchingCards();

    setTimeout(() => {

        englishCard.classList.remove("wrong");

        meaningCard.classList.remove("wrong");

        unselectCard(englishCard);

        unselectCard(meaningCard);

        resetSelection();

        enableMatchingCards();

    }, 600);

}


/* ==========================================================
   CANCEL CURRENT
========================================================== */

function cancelCurrentSelection() {

    if (MatchingState.selectedEnglish) {

        unselectCard(

            MatchingState.selectedEnglish

        );

    }

    if (MatchingState.selectedMeaning) {

        unselectCard(

            MatchingState.selectedMeaning

        );

    }

    resetSelection();

}


/* ==========================================================
   LOCK
========================================================== */

function lockMatching() {

    disableMatchingCards();

}


/* ==========================================================
   UNLOCK
========================================================== */

function unlockMatching() {

    enableMatchingCards();

}
/* ==========================================================
   AFTER REVIEW
========================================================== */

function resumeMatching() {

    MatchingState.reviewWord = null;

    unlockMatching();

    if (matchingCompleted()) {

        finishMatchingGame();

        return;

    }

}


/* ==========================================================
   CONTINUE
========================================================== */

function continueMatchingGame() {

    hideReview();

    resumeMatching();

}


/* ==========================================================
   CHECK FINISH
========================================================== */

function checkFinishMatching() {

    if (!matchingCompleted()) {

        return false;

    }

    finishMatchingGame();

    return true;

}


/* ==========================================================
   GET SELECTED
========================================================== */

function getSelectedEnglish() {

    return MatchingState.selectedEnglish;

}


function getSelectedMeaning() {

    return MatchingState.selectedMeaning;

}


/* ==========================================================
   HAS SELECTION
========================================================== */

function hasEnglishSelected() {

    return MatchingState.selectedEnglish !== null;

}


function hasMeaningSelected() {

    return MatchingState.selectedMeaning !== null;

}


/* ==========================================================
   CLEAR REVIEW WORD
========================================================== */

function clearReviewWord() {

    MatchingState.reviewWord = null;

}


/* ==========================================================
   CURRENT REVIEW WORD
========================================================== */

function currentReviewWord() {

    return MatchingState.reviewWord;

}
/* ==========================================================
   IGNORE CLICK
========================================================== */

function canSelectCard(card) {

    if (!card) return false;

    if (card.classList.contains("matched")) return false;

    if (card.classList.contains("disabled")) return false;

    const id = Number(card.dataset.id);

    if (isMatched(id)) return false;

    return true;

}


/* ==========================================================
   RESET EVENTS
========================================================== */

function resetMatchingEvents() {

    cancelCurrentSelection();

    clearReviewWord();

    unlockMatching();

}


/* ==========================================================
   RESTART EVENTS
========================================================== */

function restartMatchingEvents() {

    resetMatchingEvents();

    updateMatchingScore();

}


/* ==========================================================
   COMPLETE
========================================================== */

function completeCurrentPair() {

    if (checkFinishMatching()) {

        return;

    }

    unlockMatching();

}


/* ==========================================================
   DESTROY
========================================================== */

function destroyMatchingEvents() {

    resetMatchingEvents();

}


/* ==========================================================
   PUBLIC ENTRY
========================================================== */

function initMatchingEvents() {

    resetMatchingEvents();

}
