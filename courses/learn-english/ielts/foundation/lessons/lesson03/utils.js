/* ==========================================================
   IELTS FOUNDATION 4.0
   Lesson Engine v2.0
   utils.js

   Chứa:
   - Hàm hiển thị
   - Hàm xử lý mảng
   - Hàm DOM
   - Hàm Shuffle
   - Hàm Delay
========================================================== */

"use strict";

/* ==========================================================
   QUERY
========================================================== */

function $(id) {
    return document.getElementById(id);
}

function create(tag, className = "") {

    const element = document.createElement(tag);

    if (className) {
        element.className = className;
    }

    return element;

}


/* ==========================================================
   SHOW / HIDE
========================================================== */

function show(element) {

    if (!element) return;

    element.classList.remove("hidden");

}

function hide(element) {

    if (!element) return;

    element.classList.add("hidden");

}

function toggle(element) {

    if (!element) return;

    element.classList.toggle("hidden");

}


/* ==========================================================
   TEXT
========================================================== */

function setText(element, value = "") {

    if (!element) return;

    element.textContent = value;

}

function setHTML(element, value = "") {

    if (!element) return;

    element.innerHTML = value;

}


/* ==========================================================
   CLEAR
========================================================== */

function clear(element) {

    if (!element) return;

    element.innerHTML = "";

}


/* ==========================================================
   BUTTON
========================================================== */

function enable(button) {

    if (!button) return;

    button.disabled = false;

}

function disable(button) {

    if (!button) return;

    button.disabled = true;

}


/* ==========================================================
   ACTIVE
========================================================== */

function activate(element) {

    if (!element) return;

    element.classList.add("active");

}

function deactivate(element) {

    if (!element) return;

    element.classList.remove("active");

}


/* ==========================================================
   RANDOM
========================================================== */

function random(max) {

    return Math.floor(Math.random() * max);

}


/* ==========================================================
   SHUFFLE
========================================================== */

function shuffle(array) {

    const clone = [...array];

    for (let i = clone.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [clone[i], clone[j]] = [clone[j], clone[i]];

    }

    return clone;

}


/* ==========================================================
   DELAY
========================================================== */

function wait(ms) {

    return new Promise(resolve => {

        setTimeout(resolve, ms);

    });

}


/* ==========================================================
   PERCENT
========================================================== */

function percent(current, total) {

    if (total === 0) return 0;

    return Math.round((current / total) * 100);

}


/* ==========================================================
   PROGRESS BAR
========================================================== */

function updateProgressBar(current, total) {

    const p = percent(current, total);

    setText(DOM.progressText, `${current} / ${total}`);

    setText(DOM.progressPercent, `${p}%`);

    DOM.progressFill.style.width = `${p}%`;

}


/* ==========================================================
   ARRAY TO HTML
========================================================== */

function createItemHTML(item) {

    return `
        <div class="item">

            <strong>${item.word}</strong>

            <div>${item.ipa}</div>

            <div>${item.meaning}</div>

        </div>
    `;

}


/* ==========================================================
   SYNONYMS
========================================================== */

function renderSynonyms(list) {

    if (!list) return "";

    return list.map(createItemHTML).join("");

}


/* ==========================================================
   WORD FAMILY
========================================================== */

function renderFamily(list) {

    if (!list) return "";

    return list.map(item => {

        return `
            <div class="item">

                <strong>${item.word}</strong>

                <div>${item.ipa}</div>

                <div>${item.pos}</div>

                <div>${item.meaning}</div>

            </div>
        `;

    }).join("");

}


/* ==========================================================
   CARD LOOKUP
========================================================== */

function getWord(index) {

    return vocabularyData[index];

}


/* ==========================================================
   MATCHED
========================================================== */

function isMatched(id) {

    return MatchingState.matchedIds.has(id);

}

function addMatched(id) {

    MatchingState.matchedIds.add(id);

}


/* ==========================================================
   RESET SELECTION
========================================================== */

function resetSelection() {

    MatchingState.selectedEnglish = null;

    MatchingState.selectedMeaning = null;

}


/* ==========================================================
   RESET MATCHING
========================================================== */

function resetMatchingState() {

    MatchingState.cards = [];

    MatchingState.selectedEnglish = null;

    MatchingState.selectedMeaning = null;

    MatchingState.correctPairs = 0;

    MatchingState.matchedIds.clear();

    MatchingState.reviewWord = null;

}


/* ==========================================================
   COUNTDOWN
========================================================== */

function clearCountdown() {

    if (ReviewState.timer) {

        clearInterval(ReviewState.timer);

        ReviewState.timer = null;

    }

}

