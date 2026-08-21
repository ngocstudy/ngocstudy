/*==========================================================
Module    : learning_profile_storage.js
Thư mục   : 08_learning_profile
Version   : 1.0
Status    : 🟡 TESTING

Chức năng
- Lưu / đọc Learning Profile bằng localStorage.
- Không Render.
- Không Navigation.
- Không tính điểm.
==========================================================*/

"use strict";

const LEARNING_PROFILE_KEY = "ielts_foundation_learning_profile";
const LEARNING_PROFILE_VERSION = 1;

function createEmptyLearningProfile() {
    return {
        version: LEARNING_PROFILE_VERSION,
        updatedAt: null,
        lessons: []
    };
}

function getLearningProfile() {
    try {
        const raw = localStorage.getItem(LEARNING_PROFILE_KEY);

        if (!raw) {
            return createEmptyLearningProfile();
        }

        const parsed = JSON.parse(raw);

        if (!parsed || typeof parsed !== "object") {
            return createEmptyLearningProfile();
        }

        if (!Array.isArray(parsed.lessons)) {
            parsed.lessons = [];
        }

        if (!Number.isFinite(parsed.version)) {
            parsed.version = LEARNING_PROFILE_VERSION;
        }

        return parsed;

    } catch (error) {
        console.error("Learning Profile read error:", error);
        return createEmptyLearningProfile();
    }
}

function saveLearningProfile(profile) {
    try {
        const safeProfile = profile && typeof profile === "object"
            ? profile
            : createEmptyLearningProfile();

        safeProfile.version = LEARNING_PROFILE_VERSION;
        safeProfile.updatedAt = new Date().toISOString();

        localStorage.setItem(
            LEARNING_PROFILE_KEY,
            JSON.stringify(safeProfile)
        );

        return true;

    } catch (error) {
        console.error("Learning Profile save error:", error);
        return false;
    }
}

function clearLearningProfile() {
    localStorage.removeItem(LEARNING_PROFILE_KEY);
}
