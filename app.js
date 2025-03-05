document.addEventListener("DOMContentLoaded", () => {
  // Инициализация библиотеки анимаций
  AOS.init({
    duration: 1000,
    once: true,
  });

  // Обработчик переключения языков
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      switchLanguage(btn.dataset.lang);
    });
  });

  updateCountdown();

  // Добавляем плавную прокрутку для всех ссылок (удалены дубликаты)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Добавляем анимацию для галереи
  document.querySelectorAll(".gallery__item").forEach((item) => {
    item.addEventListener("mouseover", () => (item.style.transform = "scale(1.02)"));
    item.addEventListener("mouseout", () => (item.style.transform = "scale(1)"));
  });

  // Обработка видео
  const video = document.querySelector(".video-wrapper video");
  if (video) {
    Object.assign(video.style, {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      objectFit: "cover",
    });

    // Отключаем mute при старте, но не трогаем volume
    video.addEventListener("play", () => {
      video.muted = false;
    });
  }
});

// Объект с переводами
const translations = {
  ru: { countdown: "До свадьбы осталось", days: "дней", hours: "часов", minutes: "минут", seconds: "секунд" },
  kz: { countdown: "Тойға дейін қалды", days: "күн", hours: "сағат", minutes: "минут", seconds: "секунд" },
};

// Функция переключения языка
function switchLanguage(lang) {
  document.querySelectorAll("[data-translate]").forEach((element) => {
    const key = element.dataset.translate;
    if (translations[lang] && translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });
}

// Функция обновления таймера
function updateCountdown() {
  const weddingDate = new Date("2025-04-06T17:00:00").getTime();

  function update() {
    const now = Date.now();
    const distance = weddingDate - now;

    if (distance < 0) return; // Если дата прошла, ничего не делаем

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const elements = {
      days: document.getElementById("days"),
      hours: document.getElementById("hours"),
      minutes: document.getElementById("minutes"),
      seconds: document.getElementById("seconds"),
    };

    for (const key in elements) {
      if (elements[key]) {
        elements[key].textContent = String(eval(key)).padStart(2, "0");
      }
    }
  }

  update();
  setInterval(update, 1000);
}
