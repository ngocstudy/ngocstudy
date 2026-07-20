/* ==========================================================
   IELTS FOUNDATION 4.0
   Lesson Engine v2.0
   matching_cards.js

   Chức năng:
   - Tạo card English
   - Tạo card Meaning
   - Trộn độc lập
   - Gắn data-id
   - Gắn data-type
   - Click English tự phát âm
   - Không xử lý đúng/sai
========================================================== */

"use strict";

/* ==========================================================
   BUILD ALL CARDS
========================================================== */

function buildMatchingCards() {

    clear(DOM.matchingContainer);

    const englishCards = buildEnglishCards();

    const meaningCards = buildMeaningCards();

    const leftColumn = create("div", "matching-column");

    const rightColumn = create("div", "matching-column");

    englishCards.forEach(card => {

        leftColumn.appendChild(card);

    });

    meaningCards.forEach(card => {

        rightColumn.appendChild(card);

    });

    DOM.matchingContainer.appendChild(leftColumn);

    DOM.matchingContainer.appendChild(rightColumn);

}


/* ==========================================================
   BUILD ENGLISH
========================================================== */

function buildEnglishCards() {

    const words = shuffle([...MatchingState.cards]);

    return words.map(item => createEnglishCard(item));

}


/* ==========================================================
   BUILD MEANING
========================================================== */

function buildMeaningCards() {

    const meanings = shuffle([...MatchingState.cards]);

    return meanings.map(item => createMeaningCard(item));

}


/* ==========================================================
   ENGLISH CARD
========================================================== */

function createEnglishCard(item) {

    const card = create("div", "matching-card");

    card.textContent = item.word;

    card.dataset.id = item.id;

    card.dataset.type = "english";

    attachSpeakToCard(card, item.word);

    attachMatchingEvent(card);

    return card;

}


/* ==========================================================
   MEANING CARD
========================================================== */

function createMeaningCard(item) {

    const card = create("div", "matching-card");

    card.textContent = item.meaning;

    card.dataset.id = item.id;

    card.dataset.type = "meaning";

    attachMatchingEvent(card);

    return card;

}


/* ==========================================================
   CARD STATE
========================================================== */

function selectCard(card) {

    card.classList.add("selected");

}


function unselectCard(card) {

    card.classList.remove("selected");

}


function markMatched(card) {

    card.classList.remove("selected");

    card.classList.add("matched");

}


/* ==========================================================
   REMOVE CARD
========================================================== */

function hideMatchedCard(card) {

    card.classList.add("hidden");

}


/* ==========================================================
   REMOVE PAIR
========================================================== */

function hideMatchedPair(cardA, cardB) {

    markMatched(cardA);

    markMatched(cardB);

    setTimeout(() => {

        hideMatchedCard(cardA);

        hideMatchedCard(cardB);

    }, 250);

}


/* ==========================================================
   LOOKUP
========================================================== */

function findCard(id, type) {

    return DOM.matchingContainer.querySelector(

        `.matching-card[data-id="${id}"][data-type="${type}"]`

    );

}


/* ==========================================================
   ENABLE
========================================================== */

function enableMatchingCards() {

    DOM.matchingContainer

        .querySelectorAll(".matching-card")

        .forEach(card => {

            card.classList.remove("disabled");

        });

}


/* ==========================================================
   DISABLE
========================================================== */

function disableMatchingCards() {

    DOM.matchingContainer

        .querySelectorAll(".matching-card")

        .forEach(card => {

            card.classList.add("disabled");

        });

}
