/**
 * ==========================================================
 * matching_review.js
 * Lesson Engine v2.0
 * ----------------------------------------------------------
 * Quản lý màn hình Review khi Matching sai.
 * Không xử lý logic Matching hoặc Reading.
 * ==========================================================
 */

let reviewContainer = null;
let countdownElement = null;
let continueButton = null;

let countdownTimer = null;

/**
 * Khởi tạo các phần tử DOM.
 * Chỉ gọi nội bộ trong module.
 */
function initReviewElements() {
    if (!reviewContainer) {
        reviewContainer = document.getElementById("review-screen");
    }

    if (!countdownElement) {
        countdownElement = document.getElementById("review-countdown");
    }

    if (!continueButton) {
        continueButton = document.getElementById("continue-matching-btn");
    }
}

/**
 * Hiển thị màn hình Review.
 *
 * @param {Object} reviewData
 */
export function showReview(reviewData) {

    initReviewElements();

    if (!reviewContainer) return;

    reviewContainer.classList.remove("hidden");

    // Hiển thị dữ liệu Review.
    // renderer.js sẽ chịu trách nhiệm render nội dung chi tiết.
    if (typeof renderReviewCard === "function") {
        renderReviewCard(reviewData);
    }

    startCountdown();
}

/**
 * Ẩn màn hình Review.
 */
export function hideReview() {

    initReviewElements();

    if (!reviewContainer) return;

    reviewContainer.classList.add("hidden");

    if (countdownTimer) {
        clearInterval(countdownTimer);
        countdownTimer = null;
    }
}

/**
 * Tiếp tục Matching.
 */
export function continueMatching() {

    hideReview();

    if (typeof showMatchingScreen === "function") {
        showMatchingScreen();
    }
}

/**
 * Đếm ngược tự động quay lại Matching.
 *
 * @param {number} seconds
 */
export function startCountdown(seconds = 4) {

    initReviewElements();

    if (countdownTimer) {
        clearInterval(countdownTimer);
    }

    let remaining = seconds;

    if (countdownElement) {
        countdownElement.textContent = remaining;
    }

    countdownTimer = setInterval(() => {

        remaining--;

        if (countdownElement) {
            countdownElement.textContent = remaining;
        }

        if (remaining <= 0) {
            clearInterval(countdownTimer);
            countdownTimer = null;
            continueMatching();
        }

    }, 1000);

    if (continueButton) {

        continueButton.onclick = () => {

            clearInterval(countdownTimer);
            countdownTimer = null;

            continueMatching();

        };

    }

}
