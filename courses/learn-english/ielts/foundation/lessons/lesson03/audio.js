/* ==========================================================
   IELTS FOUNDATION 4.0
   Lesson Engine v2.0
   audio.js

   Chức năng:
   - Speech Synthesis
   - Tự tìm giọng tiếng Anh
   - Phát âm Vocabulary
   - Phát âm Matching
   - Phát âm Review
========================================================== */

"use strict";

/* ==========================================================
   SPEECH ENGINE
========================================================== */

let speechVoice = null;


/* ==========================================================
   LOAD VOICES
========================================================== */

function loadVoices() {

    const voices = window.speechSynthesis.getVoices();

    if (!voices.length) return;

    speechVoice =
        voices.find(v => v.lang === "en-US") ||
        voices.find(v => v.lang.startsWith("en")) ||
        voices[0];

}

loadVoices();

if ("speechSynthesis" in window) {

    window.speechSynthesis.onvoiceschanged = loadVoices;

}


/* ==========================================================
   STOP SPEAKING
========================================================== */

function stopSpeaking() {

    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

}


/* ==========================================================
   CREATE UTTERANCE
========================================================== */

function createSpeech(text) {

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = SpeechConfig.language;
    speech.rate = SpeechConfig.rate;
    speech.pitch = SpeechConfig.pitch;
    speech.volume = SpeechConfig.volume;

    if (speechVoice) {

        speech.voice = speechVoice;

    }

    return speech;

}


/* ==========================================================
   SPEAK TEXT
========================================================== */

function speak(text) {

    if (!text) return;

    if (!("speechSynthesis" in window)) {

        console.warn("Speech API is not supported.");

        return;

    }

    stopSpeaking();

    const speech = createSpeech(text);

    window.speechSynthesis.speak(speech);

}


/* ==========================================================
   SPEAK WORD BY INDEX
========================================================== */

function speakWord(index = VocabularyState.currentIndex) {

    const word = getWord(index);

    if (!word) return;

    speak(word.word);

}


/* ==========================================================
   SPEAK REVIEW WORD
========================================================== */

function speakReviewWord() {

    if (!MatchingState.reviewWord) return;

    speak(MatchingState.reviewWord.word);

}


/* ==========================================================
   AUTO SPEAK
========================================================== */

function autoSpeakCurrentWord() {

    if (!Config.autoSpeak) return;

    speakWord();

}


/* ==========================================================
   BUTTON EVENTS
========================================================== */

function initAudioEvents() {

    if (DOM.speakWord) {

        DOM.speakWord.addEventListener("click", () => {

            speakWord();

        });

    }

    if (DOM.reviewSpeaker) {

        DOM.reviewSpeaker.addEventListener("click", () => {

            speakReviewWord();

        });

    }

}


/* ==========================================================
   CARD SPEAK
========================================================== */

function attachSpeakToCard(cardElement, wordText) {

    if (!cardElement) return;

    cardElement.addEventListener("click", () => {

        speak(wordText);

    });

}


/* ==========================================================
   CLEANUP
========================================================== */

window.addEventListener("beforeunload", () => {

    stopSpeaking();

});

