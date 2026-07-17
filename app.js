document.addEventListener("DOMContentLoaded", () => {

    // Tiến độ học
    let completedLessons = 0;
    let totalLessons = 50;

    // XP
    let xp = 0;

    // Cập nhật thanh tiến độ
    let percent = (completedLessons / totalLessons) * 100;

    document.querySelector(".progress").style.width = percent + "%";

    document.getElementById("xp").textContent = xp;

    // Nút tiếp tục học
    document.querySelector(".continue-btn").addEventListener("click", () => {

        alert("Lesson 03 sẽ được mở ở bước tiếp theo.");

    });

});
