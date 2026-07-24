/* ==========================================================
   IELTS FOUNDATION 4.0
   Lesson Engine v2.0
   script.js

   Chức năng
   ----------------------------------------------------------
   - Khởi động Lesson Engine
   - Load dữ liệu
   - Khởi tạo các Engine
   - Khởi tạo sự kiện
========================================================== */

"use strict";
alert("script.js loaded");
/* ==========================================================
   INIT APP
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    alert("DOMContentLoaded");

    initializeApp();

});

/* ==========================================================
   INITIALIZE
========================================================== */

async function initializeApp() {
alert("1");

alert("1.5");

if (App.initialized) {

    alert("RETURN");

    return;

}

alert("2");
        await loadLesson();
alert("3");
        initializeModules();
alert("4");
        renderVocabulary();
alert("5");
        autoSpeakCurrentWord();

        App.initialized = true;

    }

    catch (error) {

    alert(error.stack);

    console.error(error);

}
}


/* ==========================================================
   MODULES
========================================================== */

function initializeModules() {

    initAudioEvents();

    initializeNavigation();

    initReviewEngine();

    initFinishEngine();

}


/* ==========================================================
   START MATCHING
========================================================== */

function startMatching() {

    createMatchingGame();

}
/* ==========================================================
   VOCABULARY
========================================================== */

function refreshLesson() {

    renderVocabulary();

    autoSpeakCurrentWord();

}


/* ==========================================================
   NEXT
========================================================== */

function goNextWord() {

if (!hasNextWord()) {

    finishVocabulary();

    return;

}

    nextWord();

    refreshLesson();

}


/* ==========================================================
   PREVIOUS
========================================================== */

function goPreviousWord() {

    if (!hasPreviousWord()) {

        return;

    }

    previousWord();

    refreshLesson();

}


/* ==========================================================
   FINISH VOCABULARY
========================================================== */

function finishVocabulary() {

    stopSpeaking();

    showFinishScreen();

}


/* ==========================================================
   MATCHING
========================================================== */

function openMatching() {

    startMatching();

}


/* ==========================================================
   RESTART LESSON
========================================================== */

function restartLesson() {

    resetLesson();

    renderVocabulary();

    autoSpeakCurrentWord();

}


/* ==========================================================
   RESET APP
========================================================== */

function resetApp() {

    stopSpeaking();

    resetLesson();

    resetReview();

    resetFinish();

}/* ==========================================================
   CLEANUP
========================================================== */

function destroyApp() {

    stopSpeaking();

    clearCountdown();

}


/* ==========================================================
   WINDOW EVENTS
========================================================== */

window.addEventListener(

    "beforeunload",

    destroyApp

);


/* ==========================================================
   PUBLIC
========================================================== */

window.LessonEngine = {

    initialize: initializeApp,

    restart: restartLesson,

    reset: resetApp,

    startMatching: openMatching

};


/* ==========================================================
   READY
========================================================== */

console.log(

    "Lesson Engine v2.0 (Stable) Ready."

);

