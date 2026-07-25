/* ==========================================================
   IELTS FOUNDATION 4.0
   Lesson Engine v2.0
   renderer.js

   Chức năng:
   - Hiển thị Vocabulary
   - Hiển thị Progress
   - Tự động phát âm
   - Cập nhật trạng thái nút Previous / Next

   Không chứa:
   - Fetch JSON
   - Logic Matching
   - Logic Review
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

    }

    else {

        disable(DOM.prevBtn);

    }

    if (hasNextWord()) {

        enable(DOM.nextBtn);

        setText(DOM.nextBtn, "Next");

    }

    else {

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

function showVocabularyScreen() {

    show(DOM.vocabularyScreen);

    hide(DOM.finishScreen);

    hide(DOM.matchingScreen);

    hide(DOM.reviewScreen);

    hide(DOM.readingLocked);

    hide(DOM.readingUnlocked);

    refreshVocabulary();

}

/* ==========================================================
   SHOW FINISH
========================================================== */
function showFinishScreen() {

    hide(DOM.vocabularyScreen);

    show(DOM.finishScreen);

}
/* ==========================================================
   EMPTY
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
