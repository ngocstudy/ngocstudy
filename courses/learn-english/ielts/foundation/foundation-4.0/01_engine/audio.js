/*==========================================================
Module   : audio.js
Thư mục  : 01_engine

Version  : 2.0
Status   : 🔒 LOCKED
Ngày     : 01/08/2026
==========================================================

Chức năng

- Quản lý Speech Synthesis.
- Tự động chọn giọng đọc tiếng Anh.
- Phát âm Vocabulary.
- Phát âm Matching.
- Phát âm Review.
- Quản lý Audio Events.

----------------------------------------------------------
Gồm các hàm / thành phần

- Speech Engine
- Load Voices
- Stop Speaking
- Create Utterance
- Speak Text
- Speak Word By Index
- Speak Review Word
- Auto Speak
- Button Events
- Card Speak
- Cleanup

----------------------------------------------------------
Phụ thuộc

- config.js
- loader.js

----------------------------------------------------------
Bị phụ thuộc

- vocabulary
- matching
- review
- reading
- listening
- checkpoint
- app

----------------------------------------------------------
Ghi chú

- Foundation Module.
- Là lớp quản lý phát âm chung cho toàn bộ dự án.
- Không chứa logic giao diện.
- Không chứa điều hướng.
- Không chứa xử lý dữ liệu Lesson.

==========================================================*/

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
   LISTENING TTS - PLAY TWICE
   ----------------------------------------------------------
   Đọc transcript của Listening tối đa 2 lần.

   audioPlayCount:
   0 = chưa nghe
   1 = đã nghe lần 1
   2 = đã nghe đủ 2 lần

   Hàm này KHÔNG reset audioPlayCount.
   Việc reset sẽ do reset Lesson xử lý.
   ========================================================== */

function playListeningAudioTwice() {

    // ==========================================================
// LISTENING TTS - GET TRANSCRIPT
// ----------------------------------------------------------
// Transcript thực tế nằm trong listening.passage.
// ==========================================================

const transcript =
    lessonData &&
    lessonData.listening &&
    lessonData.listening.passage &&
    lessonData.listening.passage.transcript;

    if (!transcript) return;

    if (!("speechSynthesis" in window)) {

        console.warn("Speech API is not supported.");

        return;

    }

    // Nếu đã nghe đủ 2 lần thì không đọc lại
    if (ListeningState.audioPlayCount >= 2) {

        return;

    }

    stopSpeaking();

    const speech =
        createSpeech(transcript);

    speech.onend = () => {

        ListeningState.audioPlayCount++;

        // Nếu mới nghe lần 1 → đọc lần 2
        if (ListeningState.audioPlayCount < 2) {

            playListeningAudioTwice();

        }

    };

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

