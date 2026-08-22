/* ==========================================================
   IELTS FOUNDATION 4.0
   Lesson Selection Catalog

   Purpose
   - Keep Lesson Selection titles synchronized with lesson JSON.
   - Keep Lesson icons consistent across the selector.
   - Do not contain lesson-learning logic.
========================================================== */

"use strict";

const LESSON_SELECTION_ICONS = Object.freeze({
    lesson01: "📘",
    lesson02: "💡",
    lesson03: "🧪",
    lesson04: "📱",
    lesson05: "❤️",
    lesson06: "🌱",
    lesson07: "🎓",
    lesson08: "💰",
    lesson09: "🦁",
    lesson10: "🚦",
    lesson11: "🏛️",
    lesson12: "💼",
    lesson13: "🔬",
    lesson14: "✈️",
    lesson15: "🏙️",
    lesson16: "🚨",
    lesson17: "🩺",
    lesson18: "📺",
    lesson19: "🌾",
    lesson20: "🏺",
    lesson21: "🧠",
    lesson22: "⚖️",
    lesson23: "🌍"
});

async function syncLessonSelection() {
    const cards = Array.from(document.querySelectorAll(".feature-card"));

    const lessonCards = cards.filter(card => {
        const heading = card.querySelector("h3");
        return /^Lesson\s+\d+$/i.test(heading?.textContent.trim() || "");
    });

    await Promise.all(lessonCards.map(async card => {
        const heading = card.querySelector("h3");
        const match = heading?.textContent.trim().match(/Lesson\s+(\d+)/i);
        if (!match) return;

        const number = Number(match[1]);
        if (number < 1 || number > 23) return;

        const lessonId = `lesson${String(number).padStart(2, "0")}`;
        const dataUrl = `lessons/lesson03/02_data/${lessonId}.json`;

        try {
            const response = await fetch(dataUrl, { cache: "no-store" });
            if (!response.ok) throw new Error(`Cannot load ${dataUrl}`);

            const data = await response.json();
            const meta = data?.meta;
            if (!meta) return;

            heading.textContent = `Lesson ${String(meta.number).padStart(2, "0")}`;

            const english = card.querySelector(".lesson-en");
            const vietnamese = card.querySelector(".lesson-vi");
            const icon = card.querySelector(".emoji");

            if (english) english.textContent = meta.title || "";
            if (vietnamese) vietnamese.textContent = meta.titleVi || "";
            if (icon) icon.textContent = LESSON_SELECTION_ICONS[lessonId] || "📘";

            card.dataset.lessonId = lessonId;
        } catch (error) {
            console.warn("Lesson Selection sync skipped:", error);
        }
    }));
}

document.addEventListener("DOMContentLoaded", syncLessonSelection);
