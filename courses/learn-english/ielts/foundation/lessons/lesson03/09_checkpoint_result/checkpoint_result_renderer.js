"use strict";

function renderCheckpointResult() {
    const result = getCheckpointResultData();

    DOM.checkpointResultContent.innerHTML = `
        <div class="lesson-result">
            <h1 class="lesson-result-title">Checkpoint Result</h1>
            <div id="checkpointResultBody"></div>
        </div>
    `;

    DOM.checkpointResultBody = document.getElementById("checkpointResultBody");

    renderCheckpointScoreTable(result);
    renderCheckpointAISection(result);
    renderCheckpointButtons();
}

function renderCheckpointScoreTable(result) {
    const vocabulary = result.vocabularyResult || {};
    const attempts = Number.isFinite(vocabulary.attempts) ? vocabulary.attempts : "--";
    const finalScore = Number.isFinite(vocabulary.finalScore) ? `${vocabulary.finalScore}%` : "--";

    DOM.checkpointResultBody.insertAdjacentHTML("beforeend", `
        <div class="lesson-attempt-card">
            <h3>Vocabulary</h3>
            <div class="lesson-attempt-row">Mistakes : ${attempts}</div>
            <div class="lesson-attempt-row">Average score : ${finalScore}</div>
        </div>

        <div class="lesson-score-card">
            <div class="lesson-score-row">
                <span class="lesson-score-label">Reading 1</span>
                <span class="lesson-score-value">${formatCheckpointSkill(result.reading1)}</span>
            </div>
            <div class="lesson-score-row">
                <span class="lesson-score-label">Reading 2</span>
                <span class="lesson-score-value">${formatCheckpointSkill(result.reading2)}</span>
            </div>
            <div class="lesson-score-row">
                <span class="lesson-score-label">Listening</span>
                <span class="lesson-score-value">${formatCheckpointSkill(result.listening)}</span>
            </div>
            <hr class="lesson-divider">
            <div class="lesson-score-row total">
                <span class="lesson-score-label">Total Score</span>
                <span class="lesson-score-value">${result.total}</span>
            </div>
            <div class="lesson-score-row">
                <span class="lesson-score-label">Percentage</span>
                <span class="lesson-score-value">${result.percentage}</span>
            </div>
            <div class="lesson-score-row">
                <span class="lesson-score-label">Rating</span>
                <span class="lesson-score-value">${result.rating}</span>
            </div>
        </div>
    `);
}

function renderCheckpointAISection(result) {
    DOM.checkpointResultBody.insertAdjacentHTML("beforeend", `
        <div class="checkpoint-ai-card">
            <h2>AI ĐÁNH GIÁ & ĐỀ XUẤT</h2>
            <p>Copy kết quả này và dán vào AI để được phân tích.</p>
            <button id="copyCheckpointToAIBtn" class="lesson-button secondary">
                Copy kết quả để hỏi AI
            </button>
        </div>
    `);
}

function renderCheckpointButtons() {
    DOM.checkpointResultBody.insertAdjacentHTML("beforeend", `
        <div class="lesson-button-group">
            <button id="continueCheckpointBtn" class="lesson-button primary">
                Continue
            </button>
        </div>
    `);
}
