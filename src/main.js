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
  
  // Initialize projects page if we're on it
  if (document.getElementById('projects-container')) {
    renderProjects(projectsData.startups.projects);
  }
});

// Функционал для страницы проектов
const projectsData = {
  startups: {
    background: '../../src/img/projectOne.png',
    projects: [
      {
        id: 1,
        title: 'Переработка твердых мусор',
        description: 'Карла мусор — это вас понятимся управления твердых отходов бизнеса компенсировать выбросы СО2',
        image: '../../src/img/usProjectOne.png'
      },
      {
        id: 2,
        title: 'Переработка твердых мусор',
        description: 'Карла мусор — это вас понятимся управления твердых отходов бизнеса компенсировать выбросы СО2',
        image: '../../src/img/usProjectTwo.png'
      },
      {
        id: 3,
        title: 'Переработка твердых мусор',
        description: 'Карла мусор — это вас понятимся управления твердых отходов бизнеса компенсировать выбросы СО2',
        image: '../../src/img/usProjectThree.png'
      },
      {
        id: 4,
        title: 'Переработка твердых мусор',
        description: 'Карла мусор — это вас понятимся управления твердых отходов бизнеса компенсировать выбросы СО2',
        image: '../../src/img/usProjectFour.png'
      }
    ]
  },
  technology: {
    background: '../../src/img/projectTwo.png',
    projects: [
      {
        id: 5,
        title: 'Технология AI мониторинга',
        description: 'Искусственный интеллект для отслеживания роста деревьев и анализа экосистемы лесных массивов',
        image: '../../src/img/usProjectOne.png'
      },
      {
        id: 6,
        title: 'Дроны для посадки семян',
        description: 'Автоматизированная система посадки деревьев с использованием беспилотных летательных аппаратов',
        image: '../../src/img/usProjectTwo.png'
      },
      {
        id: 7,
        title: 'Блокчейн сертификация',
        description: 'Прозрачная система сертификации углеродных кредитов на основе блокчейн технологии',
        image: '../../src/img/usProjectThree.png'
      },
      {
        id: 8,
        title: 'IoT сенсоры экосистемы',
        description: 'Сеть интернет вещей для мониторинга состояния почвы, влажности и роста растений',
        image: '../../src/img/usProjectFour.png'
      }
    ]
  },
  investment: {
    background: '../../src/img/projectThree.png',
    projects: [
      {
        id: 9,
        title: 'Лесной фонд $50M',
        description: 'Крупномасштабный инвестиционный фонд для финансирования проектов лесовосстановления',
        image: '../../src/img/usProjectOne.png'
      },
      {
        id: 10,
        title: 'Зеленые облигации',
        description: 'Выпуск экологических облигаций для привлечения средств на устойчивые проекты',
        image: '../../src/img/usProjectTwo.png'
      },
      {
        id: 11,
        title: 'Карбоновые кредиты',
        description: 'Инвестиционная платформа для торговли сертифицированными углеродными кредитами',
        image: '../../src/img/usProjectThree.png'
      },
      {
        id: 12,
        title: 'ESG портфель',
        description: 'Диверсифицированный портфель инвестиций в компании с высокими ESG показателями',
        image: '../../src/img/usProjectFour.png'
      }
    ]
  }
};

let currentCategory = 'startups';

function switchCategory(category) {
  if (currentCategory === category) return;
  
  currentCategory = category;
  const data = projectsData[category];
  
  // Update hero background only
  const heroSection = document.getElementById('hero-section');
  heroSection.style.backgroundImage = `url('${data.background}')`;
  
  // Update category buttons
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.remove('active');
    btn.classList.add('bg-white/10', 'backdrop-blur-md', 'text-white');
    btn.classList.remove('bg-white', 'text-black', 'border-gray-300');
  });
  
  const activeBtn = document.getElementById(`btn-${category}`);
  activeBtn.classList.add('active');
  activeBtn.classList.remove('bg-white/10', 'backdrop-blur-md', 'text-white');
  activeBtn.classList.add('bg-white', 'text-black', 'border-gray-300');
  
  // Update projects
  renderProjects(data.projects);
}

function renderProjects(projects) {
  const container = document.getElementById('projects-container');
  
  // Fade out
  container.style.opacity = '0';
  
  setTimeout(() => {
    container.innerHTML = `
      <div class="min-w-full grid grid-cols-2 gap-8 flex-shrink-0">
        ${projects.map(project => `
          <div class="rounded-[20px] overflow-hidden w-full relative h-[469px] bg-cover bg-center bg-no-repeat project-card" style="background-image: url('${project.image}');">
            <div class="absolute inset-0"></div>
            <div class="p-6 text-white relative h-full flex flex-col justify-end">
              <div class="flex justify-between items-end">
                <div class="flex-1">
                  <h3 class="text-xl font-normal text-white mb-3">${project.title}</h3>
                  <p class="text-[#BFBFBF] text-base leading-relaxed">${project.description}</p>
                </div>
                <button onclick="openProjectInfo(${project.id})" class="bg-white backdrop-blur-md text-[#5F6161] px-6 py-2 rounded-full h-[74px] text-xl font-bold flex items-center gap-2 ml-4">
                  Узнать подробнее
                  <img src="../../src/img/arrowdown.svg" alt="" class="w-10 h-10 text-white">
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    
    // Fade in
    container.style.opacity = '1';
  }, 300);
}

// Make functions global for onclick handlers
window.switchCategory = switchCategory;

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
  const yearsImageGroup = document.getElementById('yearsImageGroup');
  
  if (yearWheel && yearsImageGroup) {
    // Картинка уже анимируется через CSS, но можем добавить дополнительную логику
    
    // Запускаем анимацию только когда секция в viewport для оптимизации
    const wheelObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Активируем CSS анимацию
          yearsImageGroup.style.animationPlayState = 'running';
        } else {
          // Приостанавливаем для экономии ресурсов
          yearsImageGroup.style.animationPlayState = 'paused';
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

// OpenStreetMap функциональность
let map;
let markers = [];

// Инициализация OpenStreetMap
function initMap() {
  // Координаты Алматы (центр карты)
  const almaty = [43.2220, 76.8512];
  
  // Создаем карту
  map = L.map('openstreet-map', {
    zoomControl: false // Отключаем стандартные элементы управления
  }).setView(almaty, 11);
  
  // Добавляем слой OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
    minZoom: 5
  }).addTo(map);

  // Добавляем маркеры районов высадки
  addTreePlantingMarkers();
}

// Функция добавления маркеров районов высадки
function addTreePlantingMarkers() {
  const plantingAreas = [
    { lat: 43.2567, lng: 76.9286, title: "Район Степняка", trees: "465 деревьев" },
    { lat: 43.2220, lng: 76.8512, title: "Район Степняка", trees: "465 деревьев" },
    { lat: 43.1920, lng: 76.7812, title: "Район Степняка", trees: "465 деревьев" },
    { lat: 43.2820, lng: 76.8212, title: "Район Степняка", trees: "465 деревьев" },
    { lat: 43.2120, lng: 76.9012, title: "Район Степняка", trees: "465 деревьев" },
    { lat: 43.1720, lng: 76.8712, title: "Район Степняка", trees: "465 деревьев" },
    { lat: 43.2420, lng: 76.7912, title: "Район Степняка", trees: "465 деревьев" },
    { lat: 43.2020, lng: 76.8312, title: "Район Степняка", trees: "465 деревьев" }
  ];

  // Создаем кастомную иконку
  const customIcon = L.icon({
    iconUrl: '../../src/img/customMarker.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, 100]
  });

  plantingAreas.forEach(area => {
    const marker = L.marker([area.lat, area.lng], { icon: customIcon }).addTo(map);
    
    // Создаем стильный popup с белым полупрозрачным фоном как на скриншоте
    const popupContent = `
      <div style="
        background: black/80 !important;
        color: white !important;
        padding: 12px 16px !important;
        border-radius: 12px !important;
        text-align: center !important;
        min-width: 200px !important;
        border: none !important;
        box-shadow: none !important;
        backdrop-filter: blur(10px) !important;
        margin: 0 !important;
      ">
        <div style="font-size: 16px !important; font-weight: normal !important; margin-bottom: 4px !important; color: white !important;">
          ${area.title}
        </div>
        <div style="font-size: 14px !important; color: white !important;">
          ${area.trees}
        </div>
      </div>
    `;
    
    marker.bindPopup(popupContent, {
      closeButton: false,
      className: 'custom-tree-popup',
      offset: [0, -10],
      autoPan: false,
      closeOnClick: false,
      autoClose: false,
      maxWidth: 'none',
      minWidth: 0
    });

    // Показываем попап постоянно (не при наведении)
    marker.openPopup();

    markers.push(marker);
  });
}

// Функции управления картой
function zoomInMap() {
  if (map) {
    map.zoomIn();
  }
}

function zoomOutMap() {
  if (map) {
    map.zoomOut();
  }
}

// Функция поиска по номеру телефона (заглушка)
function findUserTrees(phoneNumber) {
  // Здесь будет логика поиска деревьев пользователя по номеру телефона
  console.log('Поиск деревьев для номера:', phoneNumber);
  
  // Пример: фокусируемся на случайном маркере
  if (markers.length > 0) {
    const randomMarker = markers[Math.floor(Math.random() * markers.length)];
    const latlng = randomMarker.getLatLng();
    map.setView([latlng.lat, latlng.lng], 15);
    randomMarker.openPopup();
  }
}

// Инициализация карты при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  // Проверяем, есть ли контейнер для карты
  if (document.getElementById('openstreet-map')) {
    initMap();
  }
});

// Обработчик формы поиска на карте
document.addEventListener('DOMContentLoaded', () => {
  const mapSearchButton = document.querySelector('#openstreet-map').parentElement.querySelector('.absolute button');
  const mapSearchInput = document.querySelector('#openstreet-map').parentElement.querySelector('.absolute input[type="tel"]');
  
  if (mapSearchButton && mapSearchInput) {
    mapSearchButton.addEventListener('click', (e) => {
      e.preventDefault();
      const phoneNumber = mapSearchInput.value.trim();
      if (phoneNumber) {
        findUserTrees(phoneNumber);
      }
    });
    
    mapSearchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const phoneNumber = mapSearchInput.value.trim();
        if (phoneNumber) {
          findUserTrees(phoneNumber);
        }
      }
    });
  }
});

// Навигация между страницами
document.addEventListener('DOMContentLoaded', () => {
  // Обработка всех ссылок навигации
  const navLinks = document.querySelectorAll('nav a, footer a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    
    // Добавляем плавный переход для внутренних ссылок
    if (href && (href.includes('MainPage.html') || href.includes('donate.html'))) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Добавляем эффект загрузки
        document.body.style.opacity = '0.8';
        document.body.style.transition = 'opacity 0.3s ease';
        
        // Переходим на страницу через небольшую задержку для плавности
        setTimeout(() => {
          window.location.href = href;
        }, 150);
      });
    }
  });
  
  // Восстанавливаем прозрачность при загрузке страницы
  document.body.style.opacity = '1';
  document.body.style.transition = 'opacity 0.3s ease';
  
  // Устанавливаем активную навигацию
  setActiveNavigation();
});

// Функция определения текущей страницы для активной навигации
function setActiveNavigation() {
  const currentPath = window.location.pathname;
  const navItems = document.querySelectorAll('nav a');
  
  navItems.forEach(item => {
    const href = item.getAttribute('href');
    
    // Удаляем активные классы
    item.classList.remove('font-bold', 'border-b-2', 'border-white', 'pb-1');
    item.classList.add('hover:underline');
    
    // Проверяем соответствие текущей странице
    if (currentPath.includes('Donate.html') && href.includes('Donate.html')) {
      item.classList.add('font-bold', 'border-b-2', 'border-white', 'pb-1');
      item.classList.remove('hover:underline');
      item.setAttribute('aria-current', 'page');
    } else if (currentPath.includes('MainPage.html') && href.includes('MainPage.html')) {
      item.classList.add('font-bold', 'border-b-2', 'border-white', 'pb-1');
      item.classList.remove('hover:underline');
      item.setAttribute('aria-current', 'page');
    }
  });
}

// Функция для динамического обновления эмиссии
function updateEmissionPercentage(percentage) {
  // Ограничиваем процент от 0 до 100
  const percent = Math.max(0, Math.min(100, percentage));
  
  // Получаем элементы
  const grayImage = document.getElementById('grayImage');
  const colorImage = document.getElementById('colorImage');
  const percentageText = document.getElementById('percentageText');
  const percentageIndicator = document.getElementById('percentageIndicator');
  
  if (!grayImage || !colorImage || !percentageText || !percentageIndicator) {
    console.warn('Emission elements not found');
    return;
  }
  
  // Рассчитываем позиции
  const imageHeight = 950; // высота картинки
  const grayPercentage = 100 - percent; // процент серой части сверху
  
  // Обновляем clip-path для серой части (сверху)
  grayImage.style.clipPath = `polygon(0 0, 100% 0, 100% ${grayPercentage}%, 0 ${grayPercentage}%)`;
  
  // Обновляем clip-path для цветной части (снизу)
  colorImage.style.clipPath = `polygon(0 ${grayPercentage}%, 100% ${grayPercentage}%, 100% 100%, 0 100%)`;
  
  // Обновляем текст процента
  percentageText.textContent = `${percent}%`;
  
  // Обновляем позицию индикатора процента (на границе между серой и цветной частями)
  const topPosition = (imageHeight * grayPercentage / 100) - 60;
  percentageIndicator.style.top = `${topPosition}px`;
}

// Пример использования: вызываем функцию при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  // Проверяем, находимся ли мы на странице EmissionAuth
  const isEmissionAuthPage = window.location.pathname.includes('EmissionAuth.html');
  
  if (!isEmissionAuthPage) {
    // Устанавливаем начальное значение (67%) только если НЕ на странице EmissionAuth
    setTimeout(() => {
      updateEmissionPercentage(67);
    }, 100);
  }
  // Для страницы EmissionAuth оставляем статичное отображение "? %" и закрашенность на 33%
});

// Экспортируем функцию для использования из других скриптов
window.updateEmissionPercentage = updateEmissionPercentage;

// ===== PROJECT INFO PAGE FUNCTIONALITY =====

// Массив с данными проектов для ProjectInfo.html (синхронизирован с projectsData)
const projects = [
    // Стартапы
    {
        id: 1,
        category: "НАШИ ПРОЕКТЫ",
        title: "Переработка твердых мусор<br>Устойчивое управление<br>отходами для бизнеса",
        description: "Карла мусор — это вас понятимся управления твердых отходов бизнеса компенсировать выбросы СО2. <br>Инновационная система переработки для снижения углеродного следа.",
        backgroundImage: "../../src/img/projectOne.png",
        type: "startups"
    },
    {
        id: 2,
        category: "НАШИ ПРОЕКТЫ", 
        title: "Переработка твердых мусор<br>Экологические решения<br>для промышленности",
        description: "Карла мусор — это вас понятимся управления твердых отходов бизнеса компенсировать выбросы СО2. <br>Комплексный подход к утилизации промышленных отходов.",
        backgroundImage: "../../src/img/projectTwo.png",
        type: "startups"
    },
    {
        id: 3,
        category: "НАШИ ПРОЕКТЫ",
        title: "Переработка твердых мусор<br>Зеленые технологии<br>переработки отходов",
        description: "Карла мусор — это вас понятимся управления твердых отходов бизнеса компенсировать выбросы СО2. <br>Современные методы утилизации для чистой экологии.",
        backgroundImage: "../../src/img/projectThree.png",
        type: "startups"
    },
    {
        id: 4,
        category: "НАШИ ПРОЕКТЫ",
        title: "Переработка твердых мусор<br>Циркулярная экономика<br>и устойчивое развитие",
        description: "Карла мусор — это вас понятимся управления твердых отходов бизнеса компенсировать выбросы СО2. <br>Создание замкнутого цикла производства и потребления.",
        backgroundImage: "../../src/img/projectOne.png",
        type: "startups"
    },
    // Технологии
    {
        id: 5,
        category: "НАШИ ПРОЕКТЫ",
        title: "Технология AI мониторинга<br>Искусственный интеллект<br>для экосистем",
        description: "Искусственный интеллект для отслеживания роста деревьев и анализа экосистемы лесных массивов. <br>Умные алгоритмы для сохранения природы.",
        backgroundImage: "../../src/img/projectTwo.png",
        type: "technology"
    },
    {
        id: 6,
        category: "НАШИ ПРОЕКТЫ",
        title: "Дроны для посадки семян<br>Автоматизированная система<br>лесовосстановления",
        description: "Автоматизированная система посадки деревьев с использованием беспилотных летательных аппаратов. <br>Высокоточная технология восстановления лесов.",
        backgroundImage: "../../src/img/projectThree.png",
        type: "technology"
    },
    {
        id: 7,
        category: "НАШИ ПРОЕКТЫ",
        title: "Блокчейн сертификация<br>Прозрачная система<br>углеродных кредитов",
        description: "Прозрачная система сертификации углеродных кредитов на основе блокчейн технологии. <br>Надежная верификация экологических проектов.",
        backgroundImage: "../../src/img/projectOne.png",
        type: "technology"
    },
    {
        id: 8,
        category: "НАШИ ПРОЕКТЫ",
        title: "IoT сенсоры экосистемы<br>Умный мониторинг<br>окружающей среды",
        description: "Сеть интернет вещей для мониторинга состояния почвы, влажности и роста растений. <br>Цифровое управление экологическими параметрами.",
        backgroundImage: "../../src/img/projectTwo.png",
        type: "technology"
    },
    // Инвестиции
    {
        id: 9,
        category: "НАШИ ПРОЕКТЫ",
        title: "Лесной фонд $50M<br>Крупномасштабный<br>инвестиционный проект",
        description: "Крупномасштабный инвестиционный фонд для финансирования проектов лесовосстановления. <br>Стратегические инвестиции в экологическое будущее.",
        backgroundImage: "../../src/img/projectThree.png",
        type: "investment"
    },
    {
        id: 10,
        category: "НАШИ ПРОЕКТЫ",
        title: "Зеленые облигации<br>Финансовые инструменты<br>для устойчивого развития",
        description: "Выпуск экологических облигаций для привлечения средств на устойчивые проекты. <br>Современные финансовые решения для экологии.",
        backgroundImage: "../../src/img/projectOne.png",
        type: "investment"
    },
    {
        id: 11,
        category: "НАШИ ПРОЕКТЫ",
        title: "Карбоновые кредиты<br>Инвестиционная платформа<br>углеродной торговли",
        description: "Инвестиционная платформа для торговли сертифицированными углеродными кредитами. <br>Прибыльные инвестиции в климатические решения.",
        backgroundImage: "../../src/img/projectTwo.png",
        type: "investment"
    },
    {
        id: 12,
        category: "НАШИ ПРОЕКТЫ",
        title: "ESG портфель<br>Диверсифицированные<br>экологические инвестиции",
        description: "Диверсифицированный портфель инвестиций в компании с высокими ESG показателями. <br>Устойчивая доходность и экологическая ответственность.",
        backgroundImage: "../../src/img/projectThree.png",
        type: "investment"
    }
];

let currentProjectIndex = 0;

// Функция для ProjectInfo.html - обновление содержимого проекта
function updateProject(index) {
    const project = projects[index];
    
    // Элементы DOM
    const heroSection = document.getElementById('project-hero');
    const categoryElement = document.getElementById('project-category');
    const titleElement = document.getElementById('project-title');
    const descriptionElement = document.getElementById('project-description');
    const leftArrow = document.getElementById('leftProject');
    const rightArrow = document.getElementById('rightProject');
    
    if (!heroSection || !categoryElement || !titleElement || !descriptionElement) {
        return; // Не на странице ProjectInfo
    }
    
    // Добавляем класс loading для анимации стрелочек
    if (leftArrow) leftArrow.classList.add('loading');
    if (rightArrow) rightArrow.classList.add('loading');
    
    // Предзагружаем изображение для лучшего качества
    const img = new Image();
    img.onload = function() {
        // Когда изображение загружено, плавно меняем фон с улучшенным качеством
        heroSection.style.backgroundImage = `url('${project.backgroundImage}')`;
        heroSection.style.backgroundSize = 'cover';
        heroSection.style.backgroundPosition = 'center center';
        heroSection.style.backgroundRepeat = 'no-repeat';
        heroSection.style.backgroundAttachment = 'scroll';
        heroSection.style.imageRendering = 'auto';
        heroSection.style.imageRendering = '-webkit-optimize-contrast';
        // Добавляем дополнительные свойства для качества
        heroSection.style.backfaceVisibility = 'hidden';
        heroSection.style.webkitBackfaceVisibility = 'hidden';
        heroSection.style.transform = 'translateZ(0)';
        heroSection.style.webkitTransform = 'translateZ(0)';
    };
    img.crossOrigin = 'anonymous'; // Для избежания CORS ошибок
    img.src = project.backgroundImage + '?v=' + Date.now(); // Добавляем версию для обхода кеша
    
    // Обновляем текстовое содержимое
    setTimeout(() => {
        categoryElement.textContent = project.category;
        titleElement.innerHTML = `<span class="font-light leading-[100%]">${project.title}</span>`;
        descriptionElement.innerHTML = project.description;
        
        // Убираем класс loading
        if (leftArrow) leftArrow.classList.remove('loading');
        if (rightArrow) rightArrow.classList.remove('loading');
    }, 400);
}

// Функция перехода к предыдущему проекту
function previousProject() {
    const leftArrow = document.getElementById('leftProject');
    const leftBlurCircle = document.getElementById('leftBlurCircle');
    
    if (leftArrow) leftArrow.classList.add('active');
    
    // Анимируем размытый круг
    if (leftBlurCircle) {
        leftBlurCircle.classList.remove('animate');
        // Форсируем reflow для рестарта анимации
        leftBlurCircle.offsetHeight;
        leftBlurCircle.classList.add('animate');
    }
    
    currentProjectIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
    updateProject(currentProjectIndex);
    
    setTimeout(() => {
        if (leftArrow) leftArrow.classList.remove('active');
    }, 200);
}

// Функция перехода к следующему проекту
function nextProject() {
    const rightArrow = document.getElementById('rightProject');
    const rightBlurCircle = document.getElementById('rightBlurCircle');
    
    if (rightArrow) rightArrow.classList.add('active');
    
    // Анимируем размытый круг
    if (rightBlurCircle) {
        rightBlurCircle.classList.remove('animate');
        // Форсируем reflow для рестарта анимации
        rightBlurCircle.offsetHeight;
        rightBlurCircle.classList.add('animate');
    }
    
    currentProjectIndex = (currentProjectIndex + 1) % projects.length;
    updateProject(currentProjectIndex);
    
    setTimeout(() => {
        if (rightArrow) rightArrow.classList.remove('active');
    }, 200);
}

// ===== PROJECT PAGE FUNCTIONALITY =====

// Функция переключения категорий на странице Project.html  
function switchCategory(category) {
    const buttons = document.querySelectorAll('.category-btn');
    const container = document.getElementById('projects-container');
    
    if (!container) return; // Не на странице Project
    
    // Обновляем активную кнопку
    buttons.forEach(btn => {
        btn.classList.remove('active', 'bg-white', 'text-black');
        btn.classList.add('bg-white/10', 'backdrop-blur-md', 'text-white');
    });
    
    const activeBtn = document.getElementById(`btn-${category}`);
    if (activeBtn) {
        activeBtn.classList.add('active', 'bg-white', 'text-black');
        activeBtn.classList.remove('bg-white/10', 'backdrop-blur-md', 'text-white');
    }
    
    // Используем старые данные проектов из projectsData
    const data = projectsData[category];
    if (data) {
        // Обновляем фон героя
        const heroSection = document.getElementById('hero-section');
        if (heroSection) {
            heroSection.style.backgroundImage = `url('${data.background}')`;
        }
        
        // Рендерим проекты с старой функцией
        renderProjects(data.projects);
    }
}

// Функция генерации HTML для карточек проектов
function generateProjectCards(projectList) {
    return `
        <div class="min-w-full grid grid-cols-2 gap-8 flex-shrink-0">
            ${projectList.map(project => `
                <div class="rounded-[20px] overflow-hidden w-full relative h-[469px] bg-cover bg-center bg-no-repeat project-card" style="background-image: url('${project.backgroundImage}');">
                    <div class="absolute inset-0"></div>
                    <div class="p-6 text-white relative h-full flex flex-col justify-end">
                        <div class="flex justify-between items-end">
                            <div class="flex-1">
                                <h3 class="text-xl font-normal text-white mb-3">${project.title.replace(/<br>/g, ' ')}</h3>
                                <p class="text-[#BFBFBF] text-base leading-relaxed">${project.description.replace(/<br>/g, ' ').substring(0, 100)}...</p>
                            </div>
                            <button onclick="openProjectInfo(${project.id})" class="bg-white backdrop-blur-md text-[#5F6161] px-6 py-2 rounded-full h-[74px] text-xl font-bold flex items-center gap-2 ml-4">
                                Узнать подробнее
                                <img src="../../src/img/arrowdown.svg" alt="" class="w-10 h-10 text-white">
                            </button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Функция перехода на страницу ProjectInfo с определенным проектом
function openProjectInfo(projectId) {
    window.location.href = `./ProjectInfo.html?id=${projectId}`;
}

// Инициализация страниц
document.addEventListener('DOMContentLoaded', () => {
    // Инициализация страницы Project.html (старая логика)
    if (document.getElementById('projects-container')) {
        // Загружаем стартапы по умолчанию используя старую логику
        renderProjects(projectsData.startups.projects);
        
        // Делаем функцию switchCategory глобальной
        window.switchCategory = switchCategory;
    }
    
    // Инициализация страницы ProjectInfo.html
    if (document.getElementById('project-hero')) {
        // Предзагружаем все изображения проектов для лучшего качества
        projects.forEach(project => {
            const img = new Image();
            img.src = project.backgroundImage;
        });
        
        const leftArrow = document.getElementById('leftProject');
        const rightArrow = document.getElementById('rightProject');
        const leftBlurCircle = document.getElementById('leftBlurCircle');
        const rightBlurCircle = document.getElementById('rightBlurCircle');
        
        // Добавляем обработчики для очистки анимации
        if (leftBlurCircle) {
            leftBlurCircle.addEventListener('animationend', () => {
                leftBlurCircle.classList.remove('animate');
            });
        }
        
        if (rightBlurCircle) {
            rightBlurCircle.addEventListener('animationend', () => {
                rightBlurCircle.classList.remove('animate');
            });
        }
        
        // Добавляем обработчики событий для стрелочек
        if (leftArrow) leftArrow.addEventListener('click', previousProject);
        if (rightArrow) rightArrow.addEventListener('click', nextProject);
        
        // Добавляем поддержку клавиатуры
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                previousProject();
            } else if (e.key === 'ArrowRight') {
                nextProject();
            }
        });
        
        // Получаем ID проекта из URL
        const urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get('id');
        
        if (projectId) {
            const projectIndex = projects.findIndex(p => p.id === parseInt(projectId));
            if (projectIndex !== -1) {
                currentProjectIndex = projectIndex;
                updateProject(currentProjectIndex);
            }
        }
    }
});

// Делаем функции глобальными для использования в HTML
window.openProjectInfo = openProjectInfo;
window.previousProject = previousProject;
window.nextProject = nextProject;

// Функция для прокрутки наверх (используется в футере)
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

window.scrollToTop = scrollToTop;
