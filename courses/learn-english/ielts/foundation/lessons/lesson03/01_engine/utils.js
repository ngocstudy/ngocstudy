/*==========================================================
Module   : utils.js
Thư mục  : 01_engine

Version  : 1.0
Status   : 🔒 LOCKED
Ngày     : 01/08/2026
==========================================================

Chức năng

- Cung cấp các hàm tiện ích dùng chung cho toàn bộ Lesson Engine.
- Hỗ trợ thao tác DOM.
- Hỗ trợ xử lý mảng.
- Hỗ trợ xử lý chuỗi HTML.
- Hỗ trợ Random, Shuffle, Delay.
- Hỗ trợ các thao tác trạng thái dùng chung.

----------------------------------------------------------
Gồm các hàm / thành phần

- Query
- DOM
- Show / Hide
- Text
- Clear
- Button
- Active
- Random
- Shuffle
- Delay
- Percent
- Progress Bar
- Array to HTML
- Synonyms
- Word Family
- Matched
- Reset Selection
- Reset Matching
- Countdown

----------------------------------------------------------
Phụ thuộc

- config.js

----------------------------------------------------------
Bị phụ thuộc

- vocabulary
- matching
- reading
- listening
- checkpoint
- app
- Các module dùng chung khác

----------------------------------------------------------
Ghi chú

- Foundation Module.
- Chứa các hàm dùng chung của toàn bộ dự án.
- Không chứa luồng điều khiển (Controller).
- Không chứa điều hướng (Navigation).
- Một số hàm nghiệp vụ sẽ được xem xét chuyển sang module tương ứng khi chuẩn hóa các Feature, nhưng hiện giữ nguyên để bảo toàn logic theo Quy tắc 01.

==========================================================*/

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

