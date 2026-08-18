/*==========================================================
Module   : matching_events.js
Thư mục  : 03_vocabulary/matching

Version  : 3.1
Status   : 🔒 LOCKED
Ngày     : 01/08/2026
==========================================================

Chức năng
----------------------------------------------------------
- Quản lý toàn bộ Event của Matching.
- Xử lý Click Card.
- Quản lý lựa chọn.
- Kiểm tra ghép cặp.
- Xử lý ghép đúng / ghép sai.
- Điều phối chuyển đổi giữa Matching và Vocabulary.
- Quản lý trạng thái khóa / mở khóa Matching.

----------------------------------------------------------
Gồm các hàm / thành phần
----------------------------------------------------------
- attachMatchingEvent()
- handleCardClick()
- selectEnglish()
- selectMeaning()
- hasSelectedPair()
- checkMatching()
- handleCorrect()
- handleWrong()
- continueMatchingGame()
- checkFinishMatching()
- getSelectedEnglish()
- getSelectedMeaning()
- hasEnglishSelected()
- hasMeaningSelected()
- lockMatching()
- unlockMatching()
- canSelectCard()
- resetMatchingEvents()
- destroyMatchingEvents()
- initMatchingEvents()

----------------------------------------------------------
Phụ thuộc
----------------------------------------------------------
- matching.js
- matching_state.js
- matching_cards.js
- vocabulary_navigation.js

----------------------------------------------------------
Bị phụ thuộc
----------------------------------------------------------
- matching.js

----------------------------------------------------------
Quy tắc
----------------------------------------------------------
- Chỉ xử lý Event của Matching.
- Không Render Card.
- Không quản lý Navigation.
- Không chứa Business Logic ngoài phạm vi Event.
- Mọi xử lý chuyên biệt phải nằm trong module tương ứng.

----------------------------------------------------------
IMPORTANT
----------------------------------------------------------
Sau khi chuyển từ Matching → Vocabulary phải cập nhật
Navigation theo đúng luồng đã kiểm thử.

Không xóa hoặc thay đổi các đoạn đã đánh dấu
IMPORTANT nếu chưa kiểm tra toàn bộ luồng.

Đã từng gây lỗi:
- Home hiện sai ở Vocabulary.
- Back/Home không cập nhật sau Review.

PASS : 01/08/2026

==========================================================*/

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

    if (!canSelectCard(card)) return;

    const type = card.dataset.type;

    if (type === "english") {

        selectEnglish(card);

    } else {

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
   READY
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

    } else {

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

    englishCard.classList.add("matched");

    meaningCard.classList.add("matched");

    disableMatchingCards();

    setTimeout(() => {

        hideMatchedPair(

            englishCard,

            meaningCard

        );

        resetSelection();

        enableMatchingCards();

        if (matchingCompleted()) {

            finishMatchingGame();

        }

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

        VocabularyState.currentIndex = Number(

        englishCard.dataset.id

);
        addVocabularyPracticeAttempt();
        showVocabularyScreen(true);
/* ----------------------------------------------------------
   IMPORTANT

   Sau khi quay từ Matching → Vocabulary bắt buộc phải
   cập nhật Navigation.

   Không xóa hai dòng dưới nếu chưa kiểm tra toàn bộ luồng.

   Đã từng gây lỗi:
   - Back/Home không cập nhật sau Review.

   PASS : 01/08/2026
---------------------------------------------------------- */
        updateBackButton();
         
        updateHomeButton();

    }, 600);

}
/* ==========================================================
   CONTINUE MATCHING
========================================================== */

function continueMatchingGame() {

    showMatchingScreen();

    enableMatchingCards();

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
   LOCK / UNLOCK
========================================================== */

function lockMatching() {

    disableMatchingCards();

}

function unlockMatching() {

    enableMatchingCards();

}

/* ==========================================================
   IGNORE CLICK
========================================================== */

function canSelectCard(card) {

    if (!card) return false;

    if (card.classList.contains("matched")) return false;

    if (card.classList.contains("disabled")) return false;

    return !isMatched(Number(card.dataset.id));

}

/* ==========================================================
   RESET
========================================================== */

function resetMatchingEvents() {

    resetSelection();

    unlockMatching();

}

/* ==========================================================
   DESTROY
========================================================== */

function destroyMatchingEvents() {

    resetMatchingEvents();

}

/* ==========================================================
   INIT
========================================================== */

function initMatchingEvents() {

    resetMatchingEvents();

}