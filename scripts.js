document.addEventListener("DOMContentLoaded", function () {
    // Переключение вкладок без перезагрузки страницы
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(button => {
        button.addEventListener("click", function () {
            let sectionId = this.dataset.section;

            // Убираем активность у всех кнопок и секций
            tabButtons.forEach(btn => btn.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));

            // Добавляем активность текущей кнопке и секции
            this.classList.add("active");
            document.getElementById(sectionId).classList.add("active");
        });
    });

    // Переключение темной/светлой темы
    const themeButton = document.getElementById("switch-theme");
    themeButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-theme");
        if (document.body.classList.contains("dark-theme")) {
            themeButton.textContent = "☀️";
        } else {
            themeButton.textContent = "🌙";
        }
    });

    // Переключение языков
    const switchToEn = document.getElementById("switch-to-en");
    const switchToRu = document.getElementById("switch-to-ru");
    const ruTexts = document.querySelectorAll(".ru");
    const enTexts = document.querySelectorAll(".en");

    switchToEn.addEventListener("click", function () {
        ruTexts.forEach(el => el.style.display = "none");
        enTexts.forEach(el => el.style.display = "block");
    });

    switchToRu.addEventListener("click", function () {
        enTexts.forEach(el => el.style.display = "none");
        ruTexts.forEach(el => el.style.display = "block");
    });

    // Обработчики модальных окон
    const modals = document.querySelectorAll(".modal");
    const openButtons = document.querySelectorAll(".details-btn");
    const closeButtons = document.querySelectorAll(".modal .close");

    openButtons.forEach(button => {
        button.addEventListener("click", function () {
            const targetModalId = this.dataset.target;
            const modal = document.getElementById(targetModalId);
            if (modal) {
                modal.style.display = "block";
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener("click", function () {
            this.closest(".modal").style.display = "none";
        });
    });

    // Закрытие модального окна по клику вне его
    window.addEventListener("click", function (event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll(".details-btn");
    const modals = document.querySelectorAll(".modal");
    const closeButtons = document.querySelectorAll(".close");

    // Открытие модального окна
    buttons.forEach(button => {
        button.addEventListener("click", function() {
            const targetId = this.getAttribute("data-target");
            document.getElementById(targetId).style.display = "block";
        });
    });

    // Закрытие модального окна
    closeButtons.forEach(button => {
        button.addEventListener("click", function() {
            this.closest(".modal").style.display = "none";
        });
    });

    // Закрытие модального окна при клике вне контента
    window.addEventListener("click", function(event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    });
});