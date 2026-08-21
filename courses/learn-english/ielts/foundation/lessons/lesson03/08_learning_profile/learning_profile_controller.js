/*==========================================================
Module    : learning_profile_controller.js
Thư mục   : 08_learning_profile
Version   : 1.0
Status    : 🟡 TESTING

Chức năng
- Kết nối Lesson Result với Learning Profile.
- Ghi một Lesson Result hoàn thành vào Profile.
- Không Render.
- Không Navigation.
- Không chứa UI.

Luồng
Lesson Result → Controller → Engine → Storage → localStorage
==========================================================*/

"use strict";

let currentLessonProfileRecorded = false;

function saveCurrentLessonToLearningProfile() {
    if (currentLessonProfileRecorded) {
        return false;
    }

    if (typeof getLessonResultData !== "function" ||
        typeof getVocabularyResult !== "function") {
        console.error("Learning Profile: Lesson Result dependencies are not ready.");
        return false;
    }

    const result = getLessonResultData();
    const vocabulary = getVocabularyResult();
    const record = buildLessonProfileRecord(result, vocabulary);
    const profile = getLearningProfile();

    if (!Array.isArray(profile.lessons)) {
        profile.lessons = [];
    }

    /*
       Một lesson chỉ có một record trong Profile.
       Nếu lesson được test lại, record cũ được cập nhật thay vì
       tạo bản ghi trùng. Trong cùng phiên, cờ bên dưới ngăn việc
       ghi lại khi người học mở lại Lesson Result / Review Mistakes.
    */
    const existingIndex = profile.lessons.findIndex(
        item => item?.lessonId === record.lessonId
    );

    if (existingIndex >= 0) {
        profile.lessons[existingIndex] = record;
    } else {
        profile.lessons.push(record);
    }

    saveLearningProfile(profile);

    currentLessonProfileRecorded = true;
    return true;
}

function getLearningProfileSummary() {
    const profile = getLearningProfile();

    return {
        lessonCount: Array.isArray(profile.lessons)
            ? profile.lessons.length
            : 0,
        lastLesson: Array.isArray(profile.lessons) && profile.lessons.length
            ? profile.lessons[profile.lessons.length - 1]
            : null,
        updatedAt: profile.updatedAt || null
    };
}
