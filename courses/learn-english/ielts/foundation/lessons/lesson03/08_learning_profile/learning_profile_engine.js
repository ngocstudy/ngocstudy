/*==========================================================
Module    : learning_profile_engine.js
Thư mục   : 08_learning_profile
Version   : 1.0
Status    : 🟡 TESTING

Chức năng
- Chuẩn hóa điểm Lesson Result thành dữ liệu Profile.
- Không Render.
- Không Navigation.
- Không lưu trực tiếp localStorage.
==========================================================*/

"use strict";

function parseScorePair(value) {
    if (typeof value === "number" && Number.isFinite(value)) {
        return { percentage: value };
    }

    if (typeof value !== "string") {
        return null;
    }

    const match = value.match(/(-?\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)/);

    if (!match) {
        const percentage = parseFloat(value);
        return Number.isFinite(percentage)
            ? { percentage }
            : null;
    }

    return {
        correct: Number(match[1]),
        total: Number(match[2]),
        percentage: Number(match[2]) > 0
            ? Number(((Number(match[1]) / Number(match[2])) * 100).toFixed(1))
            : null
    };
}

function getCurrentLessonId() {
    const file = String(Config?.lessonFile || "lesson");
    const fileName = file.split("/").pop() || "lesson";
    return fileName.replace(/\.json$/i, "") || "lesson";
}

function getCurrentLessonNumber() {
    const match = getCurrentLessonId().match(/lesson\s*0*(\d+)/i);
    return match ? Number(match[1]) : null;
}

function buildLessonProfileRecord(result, vocabulary) {
    const now = new Date().toISOString();

    const reading1 = parseScorePair(result?.reading1);
    const reading2 = parseScorePair(result?.reading2);
    const listening = parseScorePair(result?.listening);

    return {
        lessonId: getCurrentLessonId(),
        lessonNumber: getCurrentLessonNumber(),
        completedAt: now,

        vocabulary: {
            attempts: Number(vocabulary?.attempts) || 0,
            finalScore: Number(vocabulary?.finalScore) || 0
        },

        reading1,
        reading2,
        listening,

        total: result?.total ?? "--",
        percentage: result?.percentage ?? "--",
        rating: result?.rating ?? "☆☆☆☆☆"
    };
}

function hasSameLessonRecord(profile, lessonId) {
    return Array.isArray(profile?.lessons)
        && profile.lessons.some(record => record?.lessonId === lessonId);
}
