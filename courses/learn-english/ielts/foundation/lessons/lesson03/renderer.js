/* ==========================================================
   IELTS FOUNDATION 4.0
   Lesson Engine v2.0
   renderer.js
========================================================== */

"use strict";

/* ==========================================================
   RENDER VOCABULARY
========================================================== */

function renderVocabulary() {

    const word = currentWord();

    if (!word) return;

    renderWord(word);

    renderMeaning(word);

    renderSynonymsSection(word);

    renderFamilySection(word);

    renderProgressSection();

    updateNavigationButtons();
updateBackButton();
    autoSpeakCurrentWord();

}

/* ==========================================================
   WORD
========================================================== */
    function renderWord(word) {

    setText(DOM.word, word.word);

    setText(DOM.ipa, word.ipa);

}

/* ==========================================================
   MEANING
========================================================== */

function renderMeaning(word) {

    setText(DOM.meaning, word.meaning);

}

/* ==========================================================
   SYNONYMS
========================================================== */

function renderSynonymsSection(word) {

    if (!word.synonyms || word.synonyms.length === 0) {

        setHTML(DOM.synonyms, "");

        return;

    }

    setHTML(
        DOM.synonyms,
        renderSynonyms(word.synonyms)
    );

}

/* ==========================================================
   WORD FAMILY
========================================================== */

function renderFamilySection(word) {

    if (!word.family || word.family.length === 0) {

        setHTML(DOM.family, "");

        return;

    }

    setHTML(
        DOM.family,
        renderFamily(word.family)
    );

}

/* ==========================================================
   PROGRESS
========================================================== */

function renderProgressSection() {

    updateProgressBar(

        VocabularyState.currentIndex + 1,

        VocabularyState.totalWords

    );

}

/* ==========================================================
   NAVIGATION
========================================================== */

function updateNavigationButtons() {

    if (hasPreviousWord()) {

        enable(DOM.prevBtn);

    } else {

        disable(DOM.prevBtn);

    }

    if (hasNextWord()) {

        enable(DOM.nextBtn);

        setText(DOM.nextBtn, "Next");

    } else {

        enable(DOM.nextBtn);

        setText(DOM.nextBtn, "Finish");

    }

}

/* ==========================================================
   REFRESH
========================================================== */

function refreshVocabulary() {

    renderVocabulary();

}
/* ==========================================================
   SHOW VOCABULARY
========================================================== */

function showVocabularyScreen(fromMatching = false) {
document.querySelector(".progress-section").style.display = "block";
    show(DOM.vocabularyScreen);
hide(DOM.backBtn);
hide(DOM.homeBtn);
    hide(DOM.finishScreen);

    hide(DOM.matchingScreen);

    hide(DOM.reviewScreen);

    hide(DOM.readingLocked);

    hide(DOM.readingUnlocked);

    refreshVocabulary();

if (fromMatching) {

    hide(DOM.prevBtn);
    hide(DOM.nextBtn);

    show(DOM.continueMatchingBtn);

    DOM.continueMatchingBtn.onclick = () => {

        clearTimeout(window.returnMatchingTimer);

        hide(DOM.continueMatchingBtn);

        show(DOM.prevBtn);
        show(DOM.nextBtn);

        showMatchingScreen();

    };

} else {

    show(DOM.prevBtn);
    show(DOM.nextBtn);

    hide(DOM.continueMatchingBtn);

}
    /* =====================================
       QUAY TỪ MATCHING KHI GHÉP SAI
    ===================================== */

    if (fromMatching) {

        autoSpeakCurrentWord();

        if (DOM.matchingBtn) {

            show(DOM.matchingBtn);

            DOM.matchingBtn.textContent = "Continue Matching";

            DOM.matchingBtn.onclick = () => {

                showMatchingScreen();

            };

        }

        clearTimeout(window.returnMatchingTimer);

        window.returnMatchingTimer = setTimeout(() => {

            showMatchingScreen();

        }, 4000);

    }

}

/* ==========================================================
   SHOW MATCHING
========================================================== */

function showMatchingScreen() {

    hide(DOM.vocabularyScreen);

    hide(DOM.finishScreen);

    hide(DOM.reviewScreen);

    hide(DOM.readingLocked);

    hide(DOM.readingUnlocked);

    show(DOM.matchingScreen);

}
/* ==========================================================
   SHOW FINISH
========================================================== */

function showFinishScreen() {

    hide(DOM.vocabularyScreen);

    hide(DOM.matchingScreen);

    hide(DOM.reviewScreen);

    hide(DOM.readingLocked);

    hide(DOM.readingUnlocked);

    show(DOM.finishScreen);
    show(DOM.backBtn);
show(DOM.homeBtn);

updateBackButton();

}

/* ==========================================================
   CLEAR VOCABULARY
========================================================== */

function clearVocabulary() {

    setText(DOM.word, "");

    setText(DOM.ipa, "");

    setText(DOM.meaning, "");

    setHTML(DOM.synonyms, "");

    setHTML(DOM.family, "");

}

/* ==========================================================
   RELOAD
========================================================== */

function reloadVocabulary() {

    clearVocabulary();

    refreshVocabulary();

}

/* ==========================================================
   MATCHING RETURN
========================================================== */

function returnToMatching() {

    clearTimeout(window.returnMatchingTimer);

    showMatchingScreen();

}

/* ==========================================================
   CANCEL RETURN
========================================================== */

function cancelReturnMatching() {

    clearTimeout(window.returnMatchingTimer);

}

/* ==========================================================
   DESTROY
========================================================== */

window.addEventListener("beforeunload", () => {

    cancelReturnMatching();

});
