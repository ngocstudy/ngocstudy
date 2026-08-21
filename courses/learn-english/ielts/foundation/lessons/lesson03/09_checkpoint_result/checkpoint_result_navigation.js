"use strict";

function initializeCheckpointResultNavigation() {
    const copyButton = document.getElementById("copyCheckpointToAIBtn");
    const continueButton = document.getElementById("continueCheckpointBtn");

    if (copyButton) copyButton.addEventListener("click", copyCheckpointToAI);
    if (continueButton) continueButton.addEventListener("click", continueCheckpoint);
}

function openCheckpointResult() {
    stopListeningAudio();

    hide(DOM.vocabularyScreen);
    hide(DOM.readingScreen);
    hide(DOM.readingFinishScreen);
    hide(DOM.listeningScreen);
    hide(DOM.finishScreen);
    hide(DOM.reviewScreen);
    hide(DOM.matchingScreen);
    hide(DOM.lessonResultScreen);
    hide(DOM.reviewMistakesScreen);

    show(DOM.checkpointResultScreen);
    hide(DOM.backBtn);
    hide(DOM.homeBtn);

    renderCheckpointResult();
    initializeCheckpointResultNavigation();
}

function copyCheckpointToAI() {
    const result = getCheckpointResultData();
    const prompt = buildCheckpointAIPrompt(result);

    navigator.clipboard.writeText(prompt)
        .then(() => alert("Đã copy kết quả để hỏi AI! ✅"))
        .catch(() => alert("Không thể copy. Vui lòng thử lại."));
}

function continueCheckpoint() {
    window.location.href =
        "https://ngocstudy.github.io/ngocstudy/courses/learn-english/ielts/foundation/index.html";
}
