"use strict";

/*
   Checkpoint Result - lấy dữ liệu từ Learning Profile.
   Không tính điểm từ câu hỏi hiện tại.
*/

function getLearningProfileForCheckpoint() {
    try {
        const raw = localStorage.getItem(LEARNING_PROFILE_KEY);
        if (!raw) return null;
        const profile = JSON.parse(raw);
        return profile && typeof profile === "object" ? profile : null;
    } catch (error) {
        return null;
    }
}

function getLastFiveLessonRecords() {
    const profile = getLearningProfileForCheckpoint();
    const lessons = Array.isArray(profile?.lessons) ? profile.lessons : [];
    return lessons.slice(-5);
}

function parseScore(value) {
    if (typeof value === "number") return value;
    if (typeof value !== "string") return null;
    const match = value.match(/(-?\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)/);
    if (!match) return null;
    return { correct: Number(match[1]), total: Number(match[2]) };
}

function getRecordSkillScore(record, key) {
    const value = record?.[key];

    if (value && typeof value === "object") {
        const correct = Number(value.correct);
        const total = Number(value.total);
        if (Number.isFinite(correct) && Number.isFinite(total) && total > 0) {
            return { correct, total };
        }

        const finalScore = Number(value.finalScore ?? value.score);
        if (Number.isFinite(finalScore)) {
            return { percentage: finalScore };
        }
    }

    const parsed = parseScore(value);
    if (parsed) return parsed;

    if (typeof value === "number" && Number.isFinite(value)) {
        return { percentage: value };
    }

    return null;
}

function combineSkill(records, key) {
    let correct = 0;
    let total = 0;
    let percentageSum = 0;
    let percentageCount = 0;

    records.forEach(record => {
        const score = getRecordSkillScore(record, key);
        if (!score) return;

        if (Number.isFinite(score.correct) && Number.isFinite(score.total) && score.total > 0) {
            correct += score.correct;
            total += score.total;
            return;
        }

        if (Number.isFinite(score.percentage)) {
            percentageSum += score.percentage;
            percentageCount += 1;
        }
    });

    if (total > 0) {
        return {
            correct,
            total,
            percentage: Number(((correct / total) * 100).toFixed(1))
        };
    }

    if (percentageCount > 0) {
        return {
            correct: null,
            total: null,
            percentage: Number((percentageSum / percentageCount).toFixed(1))
        };
    }

    return null;
}

function getCheckpointVocabularyResult(records) {
    let attempts = 0;
    let scoreSum = 0;
    let scoreCount = 0;

    records.forEach(record => {
        const vocabulary = record?.vocabulary;
        if (!vocabulary) return;

        const attemptValue = Number(vocabulary.attempts);
        if (Number.isFinite(attemptValue)) attempts += attemptValue;

        const scoreValue = Number(vocabulary.finalScore ?? vocabulary.score);
        if (Number.isFinite(scoreValue)) {
            scoreSum += scoreValue;
            scoreCount += 1;
        }
    });

    return {
        attempts,
        finalScore: scoreCount ? Number((scoreSum / scoreCount).toFixed(1)) : null
    };
}

function getCheckpointResultData() {
    const lessons = getLastFiveLessonRecords();

    const reading1 = combineSkill(lessons, "reading1");
    const reading2 = combineSkill(lessons, "reading2");
    const listening = combineSkill(lessons, "listening");
    const vocabulary = combineSkill(lessons, "vocabulary");
    const vocabularyResult = getCheckpointVocabularyResult(lessons);

    const allSkills = [reading1, reading2, listening, vocabulary].filter(Boolean);
    const correct = allSkills.every(item => Number.isFinite(item.correct))
        ? allSkills.reduce((sum, item) => sum + item.correct, 0)
        : null;
    const total = allSkills.every(item => Number.isFinite(item.total))
        ? allSkills.reduce((sum, item) => sum + item.total, 0)
        : null;

    let percentage = null;
    if (total > 0 && correct !== null) {
        percentage = Number(((correct / total) * 100).toFixed(1));
    } else if (allSkills.length) {
        percentage = Number((allSkills.reduce((sum, item) => sum + item.percentage, 0) / allSkills.length).toFixed(1));
    }

    return {
        lessons,
        lessonCount: lessons.length,
        vocabulary,
        vocabularyResult,
        reading1,
        reading2,
        listening,
        total: correct !== null && total !== null ? `${correct} / ${total}` : "--",
        percentage: percentage !== null ? `${percentage}%` : "--",
        rating: getCheckpointRating(percentage)
    };
}

function getCheckpointRating(percentage) {
    if (!Number.isFinite(percentage)) return "☆☆☆☆☆";
    if (percentage >= 90) return "★★★★★";
    if (percentage >= 80) return "★★★★☆";
    if (percentage >= 70) return "★★★☆☆";
    if (percentage >= 60) return "★★☆☆☆";
    return "★☆☆☆☆";
}

function formatCheckpointSkill(score) {
    if (!score) return "--";
    if (Number.isFinite(score.correct) && Number.isFinite(score.total)) {
        return `${score.correct} / ${score.total}`;
    }
    if (Number.isFinite(score.percentage)) {
        return `${score.percentage}%`;
    }
    return "--";
}

function buildCheckpointAIPrompt(result) {
    return `You are my IELTS teacher.

Please analyse my Checkpoint result for a Band 4.0–4.5 learner.

This Checkpoint combines my latest ${result.lessonCount} completed lessons.

Results:
- Vocabulary: ${formatCheckpointSkill(result.vocabulary)}
- Reading 1: ${formatCheckpointSkill(result.reading1)}
- Reading 2: ${formatCheckpointSkill(result.reading2)}
- Listening: ${formatCheckpointSkill(result.listening)}
- Overall: ${result.total} (${result.percentage})
- Rating: ${result.rating}

Please tell me:
1. My strongest areas.
2. My weakest areas.
3. What I should practise first.
4. A simple study plan for the next lessons.
5. Three clear tips to improve my IELTS score.
`;
}
