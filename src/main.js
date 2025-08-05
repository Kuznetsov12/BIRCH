// Анимация счетчиков
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16); // 60 FPS
  
  function updateCounter() {
    start += increment;
    if (start < target) {
      // Форматируем число с пробелами для больших чисел
      const formatted = Math.floor(start).toLocaleString('ru-RU').replace(/,/g, ' ');
      element.textContent = formatted;
      requestAnimationFrame(updateCounter);
    } else {
      // Финальное значение
      const formatted = target.toLocaleString('ru-RU').replace(/,/g, ' ');
      element.textContent = formatted;
    }
  }
  
  requestAnimationFrame(updateCounter);
}

// Запускаем анимацию при загрузке страницы
window.addEventListener('load', () => {
  const counters = document.querySelectorAll('.counter');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    animateCounter(counter, target);
  });
});

// Плавная прокрутка для навигации (SEO-friendly)
document.addEventListener('DOMContentLoaded', () => {
  // Добавляем обработчики для плавной навигации если понадобится
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// Ограничение ввода возраста до 100
document.addEventListener('DOMContentLoaded', () => {
  const ageInput = document.querySelector('input[type="number"][placeholder*="возраст"]');
  
  if (ageInput) {
    ageInput.addEventListener('input', function() {
      let value = parseInt(this.value);
      
      // Если значение больше 100, устанавливаем 100
      if (value > 100) {
        this.value = 100;
      }
      
      // Если значение меньше 1, устанавливаем 1
      if (value < 1 && this.value !== '') {
        this.value = 1;
      }
    });
    
    // Обработка события paste (вставка)
    ageInput.addEventListener('paste', function(e) {
      setTimeout(() => {
        let value = parseInt(this.value);
        if (value > 100) {
          this.value = 100;
        }
        if (value < 1 && this.value !== '') {
          this.value = 1;
        }
      }, 0);
    });
  }
});

// Анимация концентрических кругов
document.addEventListener('DOMContentLoaded', () => {
  // Инициализация анимации кругов при появлении в viewport
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const circleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const circles = entry.target.querySelectorAll('.circle-rotate-slow, .circle-rotate-medium, .circle-rotate-fast');
        circles.forEach(circle => {
          circle.style.animationPlayState = 'running';
        });
      }
    });
  }, observerOptions);

  const timelineSection = document.querySelector('section:has(.circle-rotate-slow)');
  if (timelineSection) {
    circleObserver.observe(timelineSection);
  }
});

// Анимация колеса с годами
document.addEventListener('DOMContentLoaded', () => {
  const yearWheel = document.getElementById('yearWheel');
  const outerYears = document.getElementById('outerYears');
  
  if (yearWheel && outerYears) {
    let rotation = 0;
    
    function animateWheel() {
      // Вращаем весь круг с годами медленно
      rotation += 0.1;
      
      // Применяем трансформацию к группе
      outerYears.style.transform = `rotate(${rotation}deg)`;
      outerYears.style.transformOrigin = '500px 500px';
      
      requestAnimationFrame(animateWheel);
    }
    
    // Запускаем анимацию только когда секция в viewport
    const wheelObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateWheel();
          wheelObserver.unobserve(entry.target); // Запускаем только один раз
        }
      });
    }, {
      threshold: 0.3
    });
    
    const timelineSection = document.querySelector('section:has(#yearWheel)');
    if (timelineSection) {
      wheelObserver.observe(timelineSection);
    }
  }
});

// Функциональность карусели команды
let currentSlide = 0;
const totalSlides = 7; // Общее количество карточек
const visibleSlides = 4; // Количество видимых карточек одновременно
const maxSlide = totalSlides - visibleSlides; // Максимальный индекс слайда

function scrollTeamCards(direction) {
    const carousel = document.getElementById('teamCarousel');
    const slideWidth = 358; // 350px ширина карточки + 8px gap
    
    if (direction === 'right' && currentSlide < maxSlide) {
        currentSlide++;
    } else if (direction === 'left' && currentSlide > 0) {
        currentSlide--;
    }
    
    const translateX = currentSlide * slideWidth;
    carousel.style.transform = `translateX(-${translateX}px)`;
}

// Инициализация карусели при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Карусель команды уже готова к использованию
});

// Функциональность карусели проектов
let currentProjectPage = 0;
const totalProjectPages = 2; // Две страницы (первая и вторая с 4 карточками каждая)

function scrollProjectCards(direction) {
    const carousel = document.getElementById('projectCarousel');
    
    if (direction === 'right' && currentProjectPage < totalProjectPages - 1) {
        currentProjectPage++;
    } else if (direction === 'left' && currentProjectPage > 0) {
        currentProjectPage--;
    }
    const translateX = currentProjectPage * 100; // Перемещаем на 100% ширины контейнера
    carousel.style.transform = `translateX(-${translateX}%)`;
}

// Функция для прокрутки наверх
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
