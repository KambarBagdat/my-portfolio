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
function toggleMenu() {
    let menu = document.getElementById("mobileMenu");
    menu.classList.toggle("active");
}
function toggleMenu() {
    var menu = document.getElementById("mobileMenu");
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}
function updatePrice() {
    let total = 0;

    // Собираем все выбранные чекбоксы
    document.querySelectorAll('#botCalculator input[type="checkbox"]:checked').forEach(el => {
        total += parseInt(el.getAttribute('data-price')) || 0;
    });

    // Обновляем цену на странице
    document.getElementById('totalPrice').textContent = total;
}

// Вешаем обработчики на чекбоксы
document.querySelectorAll('#botCalculator input[type="checkbox"]').forEach(el => {
    el.addEventListener('change', updatePrice);
});
document.querySelectorAll(".faq-question").forEach((question) => {
    question.addEventListener("click", function () {
        let answer = this.nextElementSibling;
        answer.style.display = answer.style.display === "block" ? "none" : "block";
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("game-modal");
    const startButton = document.getElementById("start-game");
    const closeButton = document.querySelector(".close");
    const submitButton = document.getElementById("submit-game");
    const resultText = document.getElementById("game-result");

    startButton.addEventListener("click", () => {
        modal.style.display = "block";
    });

    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
        resultText.innerHTML = "";
    });

    submitButton.addEventListener("click", () => {
        const commands = document.getElementById("module-commands").checked;
        const payments = document.getElementById("module-payments").checked;
        const ai = document.getElementById("module-ai").checked;
        const spam = document.getElementById("module-spam").checked;

        if (spam) {
            resultText.innerHTML = "Ваш бот попал в бан за спам!";
            resultText.style.color = "red";
        } else if (commands && (payments || ai)) {
            resultText.innerHTML = "Поздравляем! Вы собрали хорошего Telegram-бота!";
            resultText.style.color = "green";
            setTimeout(startGame, 1000); // Запуск мини-игры через 1 секунду
        } else {
            resultText.innerHTML = "Ошибка! Ваш бот не работает.";
            resultText.style.color = "orange";
        }
    });

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            resultText.innerHTML = "";
        }
    };

    // ---- Мини-игра ----
    const gameContainer = document.createElement("div");
    gameContainer.id = "game-container";
    document.body.appendChild(gameContainer);

    const bot = document.createElement("div");
    bot.id = "bot";
    gameContainer.appendChild(bot);

    let botPosition = 50; // Позиция бота
    let score = 0;
    let gameActive = false;

    document.addEventListener("keydown", function(event) {
        if (!gameActive) return;
        if (event.key === "ArrowLeft" && botPosition > 0) {
            botPosition -= 5;
        } else if (event.key === "ArrowRight" && botPosition < 90) {
            botPosition += 5;
        }
        bot.style.left = botPosition + "%";
    });

    function startGame() {
        gameActive = true;
        score = 0;
        gameContainer.style.display = "block";
        spawnObjects();
    }

    function spawnObjects() {
        if (!gameActive) return;

        const object = document.createElement("div");
        object.className = Math.random() > 0.2 ? "message" : "bug";
        object.style.left = Math.random() * 90 + "%";
        gameContainer.appendChild(object);

        let fallInterval = setInterval(function() {
            let top = parseInt(object.style.top || "0");
            if (top >= 90) {
                clearInterval(fallInterval);
                if (object.className === "message") {
                    score++;
                } else {
                    endGame();
                }
                object.remove();
            } else {
                object.style.top = (top + 5) + "%";
            }
        }, 200);

        setTimeout(spawnObjects, 1000);
    }

    function endGame() {
        gameActive = false;
        alert("Игра окончена! Ваши очки: " + score);
        gameContainer.innerHTML = "";
        gameContainer.style.display = "none";
    }
});