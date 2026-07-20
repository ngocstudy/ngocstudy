/**
 * ==========================================================
 * matching_finish.js
 * Lesson Engine v2.0
 * ----------------------------------------------------------
 * Quản lý giai đoạn hoàn tất Matching.
 * Chỉ chịu trách nhiệm mở khóa và chuyển sang Reading.
 * ==========================================================
 */

let readingUnlocked = false;

/**
 * Mở khóa Reading.
 */
export function unlockReading() {

    if (readingUnlocked) return;

    readingUnlocked = true;

    // Cập nhật trạng thái nếu hệ thống có API tương ứng.
    if (typeof VocabularyState !== "undefined") {
        VocabularyState.readingUnlocked = true;
    }

    // Cập nhật giao diện nếu renderer có hỗ trợ.
    if (typeof updateReadingStatus === "function") {
        updateReadingStatus(true);
    }

}

/**
 * Hiển thị Reading.
 */
export function showReading() {

    if (!readingUnlocked) {
        return;
    }

    // navigation.js sẽ chịu trách nhiệm điều hướng.
    if (typeof navigateToReading === "function") {
        navigateToReading();
    }

}

/**
 * Hoàn tất Matching.
 */
export function finishMatching() {

    unlockReading();

    // Có thể hiển thị màn hình hoàn thành nếu renderer hỗ trợ.
    if (typeof showMatchingCompleted === "function") {
        showMatchingCompleted();
    }

    showReading();

}
