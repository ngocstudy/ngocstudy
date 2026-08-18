/*==========================================================
Module    : question_events.js
Thư mục   : 01_engine

Version   : 1.1
Status    : 🔒 LOCKED
Ngày      : 02/08/2026

------------------------------------------------------------
Chức năng
- Quản lý Event dùng chung của các dạng câu hỏi.
- Tái sử dụng cho Reading, Listening,
  Checkpoint và các Module mở rộng.
- Chỉ xử lý tương tác người dùng.
- Không Render giao diện.
- Không xử lý Navigation.
- Không xử lý Score.

------------------------------------------------------------
Gồm các hàm
- bindMCQEvents()
- bindTFNEvents()
- bindSummaryEvents()
- bindVocabularyEvents()
- bindMatchingEvents()

------------------------------------------------------------
Phụ thuộc
- config.js
- utils.js
- question_state.js

------------------------------------------------------------
Ghi chú
- Chỉ chứa các hàm Event.
- Không Render giao diện.
- Không thao tác DOM ngoài Event.
- Không điều hướng.
- Không xử lý Score.
- Không chứa dữ liệu Lesson.
- Không thay đổi tên các hàm công khai.
- Reading và Listening sử dụng chung Event.
- Module đã chuẩn hóa và khóa.

------------------------------------------------------------
TODO (Stage Score)

Khi triển khai Listening Score:

- Chuẩn hóa toàn bộ Event dùng chung.
- Thay ReadingState.xxx bằng state.xxx.
- Chuyển getCurrentState() sang
  question_state.js (hoặc state_helper.js).
- Tránh để question_events.js phụ thuộc
  vào question_renderer.js.

Hiện tại KHÔNG sửa vì Listening chưa lưu
đáp án, nhằm tránh tạo phụ thuộc ngược
giữa các module.

==========================================================*/
"use strict";
/* ==========================================================
   MULTIPLE CHOICE EVENTS
========================================================== */

function bindMCQEvents() {

    const options = document.querySelectorAll(".mcq-option");

    options.forEach(option => {

        option.addEventListener("click", function () {

            const questionIndex = option.dataset.question;

            const optionIndex = option.dataset.option;

            document
                .querySelectorAll(
                    `.mcq-option[data-question="${questionIndex}"]`
                )
                .forEach(item => {

                    item.classList.remove("selected-test");

                });

            option.classList.add("selected-test");

            const state =
    getCurrentMode() === "reading"
        ? ReadingState
        : ListeningState;

state.mcqAnswer[questionIndex] = Number(optionIndex);

        });

    });

}
/* ==========================================================
   TRUE / FALSE / NOT GIVEN EVENTS
----------------------------------------------------------
   Chức năng
   - Bắt sự kiện chọn đáp án TFN.
   - Chỉ cho phép chọn một đáp án trong mỗi câu hỏi.
   - Hiển thị viền cho đáp án đã chọn.
   - Lưu đáp án vào ReadingState.
========================================================== */

function bindTFNEvents() {

    const options = document.querySelectorAll(".tfn-option");

    options.forEach(option => {

        option.addEventListener("click", function () {

            const questionIndex = option.dataset.question;

            const optionIndex = option.dataset.option;

            document
                .querySelectorAll(
                    `.tfn-option[data-question="${questionIndex}"]`
                )
                .forEach(item => {

                    item.classList.remove("selected-test");

                });

            option.classList.add("selected-test");

            const state =
    getCurrentMode() === "reading"
        ? ReadingState
        : ListeningState;

state.tfnAnswer[questionIndex] = Number(optionIndex);

        });

    });

}
/* ==========================================================
   BIND SUMMARY EVENTS
----------------------------------------------------------
   Chức năng
   - Bắt sự kiện nhập Summary
   - Lưu nội dung vào ReadingState
   - Chưa khôi phục nội dung
========================================================== */

function bindSummaryEvents() {

    const inputs = document.querySelectorAll(".summary-input");

    inputs.forEach(input => {

        input.addEventListener("input", () => {

            const index =
                Number(input.dataset.index);

            const state =
    getCurrentMode() === "reading"
        ? ReadingState
        : ListeningState;

if (getCurrentMode() === "reading") {

    state.summaryAnswer[index] =
        input.value;

} else {

    state.gapFillAnswer[index] =
        input.value;

}

        });

    });

}
/* ==========================================================
   BIND VOCABULARY EVENTS
----------------------------------------------------------
   Chức năng
   - Bắt sự kiện bấm đáp án Vocabulary
   - Hiển thị viền màu đáp án đã chọn
   - Chưa lưu đáp án
========================================================== */

function bindVocabularyEvents() {

    const options = document.querySelectorAll(".vocabulary-option");

    options.forEach(option => {

        option.addEventListener("click", () => {

            const question =
                Number(option.dataset.question);

            document
                .querySelectorAll(
                    `.vocabulary-option[data-question="${question}"]`
                )
                .forEach(item =>
                    item.classList.remove("selected-test")
                );

            option.classList.add("selected-test");

            /* ==========================================================
               SAVE VOCABULARY ANSWER
            ----------------------------------------------------------
               Chức năng
               - Lưu đáp án đã chọn
            ========================================================== */

            const state =
    getCurrentMode() === "reading"
        ? ReadingState
        : ListeningState;

state.vocabularyAnswer[question] =
    Number(option.dataset.option);

        });

    });

}
/* ==========================================================
   BIND MATCHING EVENTS
----------------------------------------------------------
   Chức năng
   - Bắt sự kiện bấm ô Matching
   - Mỗi hàng chỉ chọn một đáp án
   - Chưa lưu đáp án
========================================================== */

function bindMatchingEvents() {

    const options = document.querySelectorAll(".matching-option");

    options.forEach(option => {

        option.addEventListener("click", () => {

            const question =
                Number(option.dataset.question);

            /* ==========================================================
               UPDATE MATCHING CIRCLE
            ----------------------------------------------------------
               Chức năng
               - Chỉ đổi màu vòng tròn
               - Không đổi màu cả ô
            ========================================================== */

            document
                .querySelectorAll(
                    `.matching-option[data-question="${question}"]`
                )
                .forEach(item => {

                    item
                        .querySelector(".matching-circle")
                        .classList.remove("selected-test");

                });

            option
                .querySelector(".matching-circle")
                .classList.add("selected-test");

            /* ==========================================================
               SAVE MATCHING ANSWER
            ----------------------------------------------------------
               Chức năng
               - Lưu đáp án Matching đã chọn
            ========================================================== */

            const state =
    getCurrentMode() === "reading"
        ? ReadingState
        : ListeningState;

state.matchingAnswer[question] =
    Number(option.dataset.option);

        });

    });

}