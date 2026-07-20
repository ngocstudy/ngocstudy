/**
 * ==========================================================
 * matching_events.js
 * Lesson Engine v2.0
 * ----------------------------------------------------------
 * Quản lý sự kiện Matching.
 * Không render UI.
 * Không quản lý Review UI.
 * Không điều hướng Reading.
 * ==========================================================
 */

import {
    showReview
} from "./matching_review.js";

import {
    finishMatching
} from "./matching_finish.js";

/**
 * Gắn sự kiện cho toàn bộ Matching Card.
 *
 * @param {HTMLElement[]} cards
 */
export function attachMatchingEvent(cards = []) {

    cards.forEach(card => {

        card.addEventListener("click", () => {

            checkMatching(card);

        });

    });

}

/**
 * Kiểm tra kết quả ghép.
 *
 * @param {Object} result
 */
export function checkMatching(result) {

    // matching.js sẽ truyền vào kết quả đã kiểm tra.
    // Chỉ điều phối.

    if (!result) return;

    if (result.correct) {
        handleCorrect(result);
    } else {
        handleWrong(result);
    }

}

/**
 * Xử lý khi ghép đúng.
 *
 * @param {Object} result
 */
export function handleCorrect(result) {

    // Callback cập nhật UI nếu có.
    if (typeof result.onCorrect === "function") {
        result.onCorrect(result);
    }

    // Hoàn thành toàn bộ Matching.
    if (result.finished === true) {
        finishMatching();
    }

}

/**
 * Xử lý khi ghép sai.
 *
 * @param {Object} result
 */
export function handleWrong(result) {

    showReview({

        word: result.word,
        ipa: result.ipa,
        meaning: result.meaning,
        audio: result.audio

    });

}
