// Функция для переключения мобильного меню
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu.style.display === 'flex') {
    // Плавно скрываем меню
    mobileMenu.style.opacity = '0';
    setTimeout(() => {
      mobileMenu.style.display = 'none';
      document.body.style.overflow = 'auto'; // Разрешаем прокрутку страницы
    }, 300);
  } else {
    // Плавно показываем меню
    mobileMenu.style.display = 'flex';
    mobileMenu.style.opacity = '0';
    setTimeout(() => {
      mobileMenu.style.opacity = '1';
    }, 10);
    document.body.style.overflow = 'hidden'; // Запрещаем прокрутку страницы когда меню открыто
  }
}

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
  
  // Добавляем обработчик для стрелки прокрутки проектов на странице Donate
  if (document.querySelector('body.donate-mobile')) {
    const projectHeaderArrow = document.querySelector('body.donate-mobile footer.relative.bg-black.overflow-hidden.py-20 .mb-16::after');
    const headerProjectsSection = document.querySelector('body.donate-mobile footer.relative.bg-black.overflow-hidden.py-20 .mb-16');
    
    if (headerProjectsSection) {
      headerProjectsSection.addEventListener('click', function(e) {
        // Проверяем, что клик был по стрелке (или примерно в той области)
        if (e.offsetX > headerProjectsSection.offsetWidth - 50) {
          scrollProjectCards('right');
        }
      });
    }
  }
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
    renderProjects(projectsData.technology.projects);
  }
});

// Функционал для страницы проектов
const projectsData = {
  technology: {
    background: '../../src/img/projectTwo.png',
    projects: [
      {
        id: 1,
        title: 'AirSorb - башня для чистого воздуха в городах',
        description: 'AirSorb - это вертикальная городская установка, обеспечивающая 360° очистку воздуха',
        image: '../../src/img/thirdProject.png'
      },
      {
        id: 2,
        title: 'TQ-Drone - дроны для массового посева деревьев',
        description: 'TQ-Drone - инновационный казахстанский стартап, использующий дроны для автоматизированного посева семян деревьев и медоносных культур',
        image: '../../src/img/fiveProject.png'
      },
      {
        id: 3,
        title: 'Завод по утилизации твердых бытовых отходов',
        description: 'ТОО «Krintel» разработало и внедряет технологию полной утилизации ТБО с использованием установок термохимической деструкции углеродсодержащего сырья',
        image: '../../src/img/sixProject.png'
      },
      {
        id: 4,
        title: 'Beelieve — умные ульи для сохранения пчёл',
        description: 'Beelieve — это инновационная система «умных» ульев, оснащённых датчиками температуры, влажности, уровня шума, газов, спиртов, пестицидов',
        image: '../../src/img/nineProject.png'
      },
      {
        id: 5,
        title: 'Комплексная система очистки выбросов ТЭЦ',
        description: 'АО «Институт топлива, катализа и электрохимии им. Д.В. Сокольского» разработал и внедряет многоступенчатую комплексную систему очистки (КСО) отходящих газов',
        image: '../../src/img/tenProject.png'
      }
    ]
  },
  investment: {
    background: '../../src/img/projectThree.png',
    projects: [
      {
        id: 6,
        title: 'Масштабное облесение в Карагандинской области, Казахстан',
        description: 'Проект направлен на создание лесных насаждений на площади до 25 000 гектаров в Карагандинской области с использованием сосны, вяза и холодостойких плодовых деревьев (яблоня, слива) для повышения биоразнообразия и социально-экономической отдачи.',
        image: '../../src/img/eightProject.png'
      },
      {
        id: 7,
        title: 'Строительство 100 автономных экопоселений',
        description: 'Проект предусматривает создание 100 энергонезависимых экопоселений на территории 600 гектаров живописных ландшафтов Казахстана.',
        image: '../../src/img/sevenProject.png'
      },
      {
        id: 8,
        title: 'Apple Bee: «Посади свой яблоневый сад»',
        description: 'ESG-инициатива, направленная на восстановление яблоневых садов в Алматинской области через корпоративные тимбилдинги',
        image: '../../src/img/fourProject.png'
      },
      {
        id: 9,
        title: 'BOLEK',
        description: 'BOLEK - это масштабируемая сеть компактных локальных сортировочных пунктов площадью около 80 м²',
        image: '../../src/img/secondProject.png'
      },
      {
        id: 10,
        title: 'Строительство трёх гидроэлектростанций на реке Тентек',
        description: 'Проект предусматривает строительство трёх гидроэлектростанций общей мощностью 10 МВт (1 ГЭС – 6 МВт, 2 ГЭС – по 2 МВт) для обеспечения стабильной и чистой энергии',
        image: '../../src/img/firstProject.png'
      }
    ]
  }
};

let currentCategory = 'technology';

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
  const carousel = document.getElementById('projectCarousel');
  const container = carousel || document.getElementById('projects-container');
  
  // Fade out
  container.style.opacity = '0';
  
  setTimeout(() => {
    // Проверяем размер экрана для определения мобильной версии
    const isMobile = window.innerWidth <= 768;
    const isProjectPage = window.location.pathname.includes('Project.html');
    
    let content;
    if (isMobile && isProjectPage) {
      // Для мобильной версии Project.html создаем flex структуру для горизонтального скролла
      content = `
        <div class="flex overflow-x-auto overflow-y-hidden gap-4 pb-4" style="scroll-snap-type: x mandatory; scrollbar-width: none; -ms-overflow-style: none;">
          ${projects.map(project => `
            <div class="rounded-[20px] overflow-hidden relative h-[455px] bg-cover bg-center bg-no-repeat project-card flex-shrink-0" style="background-image: url('${project.image}'); width: 300px; scroll-snap-align: start;">
              <div class="absolute inset-0"></div>
              <div class="p-6 text-white relative h-full flex flex-col justify-end">
                <div class="flex justify-between items-end">
                  <div class="flex-1">
                    <h3 class="text-xl font-normal text-white mb-3">${project.title}</h3>
                    <p class="text-[#BFBFBF] text-base leading-relaxed">${project.description}</p>
                  </div>
                  <button onclick="openProjectInfo(${project.id})" class="bg-white backdrop-blur-md text-[#5F6161] px-8 py-3 rounded-full h-[80px] text-xl font-bold flex items-center gap-2 ml-4">
                    Узнать подробнее
                    <img src="../../src/img/arrowdown.svg" alt="" class="w-10 h-10 text-white">
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    } else {
      // Для десктопной версии используем grid с 2 колонками
      content = `
        <div class="grid grid-cols-2 gap-8">
          ${projects.map(project => `
            <div class="rounded-[20px] overflow-hidden w-full relative h-[455px] bg-cover bg-center bg-no-repeat project-card" style="background-image: url('${project.image}');">
              <div class="absolute inset-0"></div>
              <div class="p-6 text-white relative h-full flex flex-col justify-end">
                <div class="flex justify-between items-end">
                  <div class="flex-1">
                    <h3 class="text-xl font-normal text-white mb-3">${project.title}</h3>
                    <p class="text-[#BFBFBF] text-base leading-relaxed">${project.description}</p>
                  </div>
                  <button onclick="openProjectInfo(${project.id})" class="bg-white backdrop-blur-md text-[#5F6161] px-8 py-3 rounded-full h-[80px] text-xl font-bold flex items-center gap-2 ml-4">
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
    
    container.innerHTML = content;
    
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
const totalProjectPages = 3; // Три страницы (первая, вторая и третья с 4, 4 и 2 карточками соответственно)

// Функция для реструктуризации карусели проектов на мобильных устройствах
function restructureProjectCarousel() {
    const carousel = document.getElementById('projectCarousel');
    const isMobile = window.innerWidth <= 767;
    
    if (!carousel) return;
    
    if (isMobile) {
        // Собираем все карточки проектов
        const allCards = [];
        const pages = carousel.querySelectorAll('.min-w-full');
        
        pages.forEach(page => {
            const cards = page.querySelectorAll('[class*="rounded-[20px]"]');
            cards.forEach(card => {
                allCards.push(card.cloneNode(true));
            });
        });
        
        // Очищаем карусель
        carousel.innerHTML = '';
        
        // Создаем новую структуру для мобильных - каждая карточка в отдельном контейнере
        allCards.forEach(card => {
            const wrapper = document.createElement('div');
            wrapper.className = 'min-w-full flex-shrink-0';
            wrapper.appendChild(card);
            carousel.appendChild(wrapper);
        });
        
        // Добавляем обработчики свайпа для мобильных
        addMobileSwipeHandlers(carousel.parentElement);
    }
}

// Функция для добавления свайп-жестов на мобильных
function addMobileSwipeHandlers(carousel) {
    let startX = 0;
    let scrollLeft = 0;
    let isDown = false;

    carousel.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.touches[0].pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });

    carousel.addEventListener('touchend', () => {
        isDown = false;
    });
}

function scrollProjectCards(direction) {
    const carousel = document.getElementById('projectCarousel');
    const isTablet = window.innerWidth <= 1366; // Определяем планшетный режим
    const isMobile = window.innerWidth <= 767; // Определяем мобильный режим
    
    // Проверяем, что карусель существует
    if (!carousel) return;
    
    // Для мобильных устройств используем нативный скролл вместо трансформации
    if (isMobile) {
        const cardWidth = carousel.querySelector('.min-w-full').offsetWidth;
        const scrollAmount = direction === 'right' ? cardWidth + 12 : -(cardWidth + 12); // 12px - это отступ между карточками
        carousel.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
        return;
    }
    
    if (direction === 'right' && currentProjectPage < totalProjectPages - 1) {
        currentProjectPage++;
    } else if (direction === 'left' && currentProjectPage > 0) {
        currentProjectPage--;
    } else if (isTablet && direction === 'right' && currentProjectPage >= totalProjectPages - 1) {
        // На планшетах делаем круговое листание
        currentProjectPage = 0;
    } else if (isTablet && direction === 'left' && currentProjectPage <= 0) {
        currentProjectPage = totalProjectPages - 1;
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

// Простая функция для скролла мобильных проектов
function scrollMobileProjects() {
  console.log("Mobile arrow clicked");
  
  // Для Project.html используем специальную логику
  if (window.location.pathname.includes('Project.html')) {
    const projectsContainer = document.getElementById('projects-container');
    const scrollContainer = projectsContainer ? projectsContainer.querySelector('.flex.overflow-x-auto') : null;
    
    console.log("Projects container found:", projectsContainer);
    console.log("Scroll container found:", scrollContainer);
    
    if (scrollContainer) {
      const cards = scrollContainer.querySelectorAll('.project-card');
      console.log("Number of cards found:", cards.length);
      
      if (cards.length > 0) {
        // Получаем ширину одной карточки + gap
        const cardWidth = 300; // Фиксированная ширина карточки
        const gap = 16; // gap-4 = 16px
        const scrollDistance = cardWidth + gap;
        
        console.log("Card width:", cardWidth);
        console.log("Scroll distance:", scrollDistance);
        console.log("Current scroll position:", scrollContainer.scrollLeft);
        
        // Прокручиваем контейнер на одну карточку вправо
        scrollContainer.scrollBy({
          left: scrollDistance,
          behavior: 'smooth'
        });
        
        console.log("Scrolling container by:", scrollDistance);
      }
    }
    return;
  }
  
  // Для других страниц (PlantForest.html и т.д.)
  let projectsSection = null;
  let scrollContainer = null;
  
  // Для PlantForest.html ищем секцию с id forestProjectsSection
  if (window.location.pathname.includes('PlantForest.html')) {
    projectsSection = document.querySelector('#forestProjectsSection');
    scrollContainer = projectsSection ? projectsSection.querySelector('.overflow-hidden') : null;
  } else {
    // Для других страниц используем старый селектор
    projectsSection = document.querySelector('section.relative.bg-black.overflow-hidden.py-20:last-of-type');
    scrollContainer = projectsSection ? projectsSection.querySelector('.overflow-hidden') : null;
  }
  
  console.log("Projects section found:", projectsSection);
  console.log("Scroll container found:", scrollContainer);
  
  if (scrollContainer) {
    const carousel = document.getElementById('projectCarousel');
    const cards = carousel ? carousel.querySelectorAll('.min-w-full') : [];
    
    console.log("Carousel found:", carousel);
    console.log("Number of cards found:", cards.length);
    
    if (cards.length > 0) {
      // Получаем ширину одной карточки (75% экрана + gap)
      const cardWidth = cards[0].offsetWidth;
      const gap = 12; // gap из CSS
      const scrollDistance = cardWidth + gap;
      
      console.log("Card width:", cardWidth);
      console.log("Scroll distance:", scrollDistance);
      console.log("Current scroll position:", scrollContainer.scrollLeft);
      
      // Прокручиваем контейнер на одну карточку вправо
      scrollContainer.scrollBy({
        left: scrollDistance,
        behavior: 'smooth'
      });
      
      console.log("Scrolling container by:", scrollDistance);
    }
  }
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
        background: rgba(0,0,0,0.8) !important;
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
        title: "AirSorb - башня <br> для чистого воздуха в городах",
        description: "AirSorb - это вертикальная городская установка, обеспечивающая 360° очистку воздуха от PM2.5, PM10, NO₂, SO₂, NO и CO. Эффективность очистки достигает 85–95%, а радиус покрытия составляет до 300 м. Проект направлен на защиту здоровья населения, снижение смога и улучшение качества городской среды. ",
        backgroundImage: "../../src/img/projectOne.png",
        type: "startups"
    },
    {
        id: 2,
        category: "НАШИ ПРОЕКТЫ", 
        title: "TQ-Drone - дроны для массового посева <br> деревьев и медоносных культур",
        description: "TQ-Drone - инновационный казахстанский стартап, использующий дроны для автоматизированного посева семян деревьев и медоносных культур на различных территориях, включая труднодоступные и деградированные земли. Технология позволяет проводить посев быстрее, дешевле и с высокой точностью, существенно ускоряя процесс восстановления экосистем и борьбы с деградацией земель.",
        backgroundImage: "../../src/img/projectTwo.png",
        type: "startups"
    },
    {
        id: 3,
        category: "НАШИ ПРОЕКТЫ",
        title: "Завод по утилизации твердых бытовых отходов <br> на базе установок термохимической деструкции (УТДС)",
        description: " ТОО «Krintel» разработало и внедряет технологию полной утилизации ТБО с использованием установок термохимической деструкции углеродсодержащего сырья. После сортировки отходов до 80% направляется на переработку как вторичное сырьё, а оставшиеся 20% проходят термохимическую переработку в газогенераторах УТДС с образованием пиролизного газа. Этот газ используется для производства тепловой или электрической энергии, а зольный остаток — для изготовления строительных материалов.",
        backgroundImage: "../../src/img/projectThree.png",
        type: "startups"
    },
    {
        id: 4,
        category: "НАШИ ПРОЕКТЫ",
        title: "Beelieve — умные ульи <br> для сохранения пчёл",
        description: "Beelieve — это инновационная система «умных» ульев, оснащённых датчиками температуры, влажности, уровня шума, газов, спиртов, пестицидов, а также весовыми сенсорами и солнечными панелями для автономной работы. Система позволяет пчеловодам дистанционно контролировать состояние ульев и пасек, получать уведомления о критических изменениях, выявлять паразитов с помощью технологии Computer Vision и оптимизировать сбор мёда.",
        backgroundImage: "../../src/img/projectOne.png",
        type: "startups"
    },
    {
        id: 5,
        category: "НАШИ ПРОЕКТЫ",
        title: "Комплексная система очистки <br> выбросов ТЭЦ и промышленных установок <br> с улавливанием CO₂",
        description: " АО «Институт топлива, катализа и электрохимии им. Д.В. Сокольского» разработал и внедряет многоступенчатую комплексную систему очистки (КСО) отходящих газов, основанную на запатентованной технологии с применением отечественных каталитических нейтрализаторов. Система удаляет до 100% SO₂, 87% CO и 80% NOx, а также пыль, твёрдые частицы, углеводороды и H₂S, с возможностью улавливания и переработки CO₂ в полезные продукты (топливо, стройматериалы, удобрения).",
        backgroundImage: "../../src/img/projectTwo.png",
        type: "technology"
    },
    {
        id: 6,
        category: "НАШИ ПРОЕКТЫ",
        title: "Масштабное облесение в <br> Карагандинской области, Казахстан",
        description: " Проект направлен на создание лесных насаждений на площади до 25 000 гектаров в Карагандинской области с использованием сосны, вяза и холодостойких плодовых деревьев (яблоня, слива) для повышения биоразнообразия и социально-экономической отдачи. В 2025 году планируется пилотная посадка 300–400 гектаров (около 1,5 млн саженцев). Инициатива реализуется по стандарту ISOMETRIC с применением протокола лесовосстановления, обеспечивая прозрачность и получение углеродных кредитов как ключевого источника финансирования. Уже инвестировано около 2 млн долларов в запуск питомника и подготовку первых 5 000 гектаров.",
        backgroundImage: "../../src/img/projectThree.png",
        type: "technology"
    },
    {
        id: 7,
        category: "НАШИ ПРОЕКТЫ",
        title: "Строительство 100 автономных <br> экопоселений по стандартам BREED <br> и LEED в Казахстане",
        description: "Проект предусматривает создание 100 энергонезависимых экопоселений на территории 600 гектаров живописных ландшафтов Казахстана. Каждое поселение будет соответствовать международным стандартам BREED и LEED, включать солнечные панели, системы сбора дождевой воды, тепличное хозяйство и инфраструктуру для получения пассивного дохода жителями. Концепция направлена на устойчивое развитие, минимальное воздействие на окружающую среду и повышение качества жизни.",
        backgroundImage: "../../src/img/projectOne.png",
        type: "technology"
    },
    {
        id: 8,
        category: "НАШИ ПРОЕКТЫ",
        title: "Apple Bee: «Посади свой яблоневый сад»",
        description: "ESG-инициатива, направленная на восстановление яблоневых садов в Алматинской области через корпоративные тимбилдинги: компании приглашаются провести однодневное выездное мероприятие, где сотрудники совместно с экспертами питомника Apple Bee высаживают яблони, посещают экскурсию по интенсивным садам и вносят реальный вклад в озеленение региона и развитие экологической культуры.",
        backgroundImage: "../../src/img/projectTwo.png",
        type: "technology"
    },
    {
        id: 9,
        category: "НАШИ ПРОЕКТЫ",
        title: "BOLEK",
        description: "BOLEK - это масштабируемая сеть компактных локальных сортировочных пунктов площадью около 80 м², которые устанавливаются непосредственно на контейнерных площадках без необходимости выкупа земли. Такая модель позволяет внедрять раздельный сбор отходов максимально близко к источнику их образования, сокращая затраты на транспортировку и повышая эффективность переработки. Каждый пункт оснащён оборудованием для оперативного отбора до 30 % вторичных материалов, что увеличивает общий уровень переработки отходов на 24 процентных пункта.",
        backgroundImage: "../../src/img/projectThree.png",
        type: "investment"
    },
    {
        id: 10,
        category: "НАШИ ПРОЕКТЫ",
        title: "Строительство трёх гидроэлектростанций <br> на реке Тентек, <br> Алматинская область, Казахстан",
        description: "Проект предусматривает строительство трёх гидроэлектростанций общей мощностью 10 МВт (1 ГЭС – 6 МВт, 2 ГЭС – по 2 МВт) для обеспечения стабильной и чистой энергии в рамках энергетического перехода Казахстана. Реализация включает использование чешского и болгарского высокоэффективного оборудования (KPI 98%), что обеспечит ежегодную выработку около 17,3 млн кВт∙ч и окупаемость инвестиций за 4 года. Уже проведены изыскания, заключён долгосрочный договор купли-продажи электроэнергии (PPA), выполнены гидрологические и геологические исследования.",
        backgroundImage: "../../src/img/projectTwo.png",
        type: "investment"
    },
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
        
        // Обновляем изображение для модального окна
        const modalImage = document.getElementById('modal-image');
        if (modalImage) {
            // Используем изображение из projectsData, а не backgroundImage
            const projectData = Object.values(projectsData).find(category => 
                category.projects.find(p => p.id === project.id)
            );
            const currentProject = projectData?.projects.find(p => p.id === project.id);
            if (currentProject && currentProject.image) {
                modalImage.src = currentProject.image;
                modalImage.alt = project.title.replace(/<br>/g, ' ');
            }
        }
        
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
                <div class="rounded-[20px] overflow-hidden w-full relative h-[469px] bg-cover bg-center bg-no-repeat project-card" style="background-image: url('${project.image}');">
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
window.switchCategory = switchCategory;
window.openProjectInfo = openProjectInfo;

// Модальное окно для просмотра проекта
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('project-modal');
    const viewProjectBtn = document.getElementById('view-project-btn');
    const closeModalBtn = document.getElementById('close-modal');
    const modalImage = document.getElementById('modal-image');
    
    // Открытие модального окна
    if (viewProjectBtn) {
        viewProjectBtn.addEventListener('click', function() {
            if (modal) {
                modal.classList.remove('hidden');
                document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
            }
        });
    }
    
    // Закрытие модального окна
    function closeModal() {
        if (modal) {
            modal.classList.add('fade-out');
            setTimeout(() => {
                modal.classList.add('hidden');
                modal.classList.remove('fade-out');
                document.body.style.overflow = 'auto'; // Возвращаем скролл
            }, 300);
        }
    }
    
    // Закрытие по клику на кнопку
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    // Закрытие по клику вне изображения
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Закрытие по Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
});

// Функция для показа/скрытия мобильного блока "И что делает BIRCH"
function toggleMobileBirchInfo() {
  const birchMobileInfo = document.querySelector('.birch-mobile-info');
  if (!birchMobileInfo) return;
  
  if (window.innerWidth <= 767) {
    birchMobileInfo.classList.remove('hidden');
  } else {
    birchMobileInfo.classList.add('hidden');
  }
}

// Вызываем функцию при загрузке и при изменении размера окна
window.addEventListener('DOMContentLoaded', toggleMobileBirchInfo);
window.addEventListener('resize', toggleMobileBirchInfo);

// Функция для прокрутки наверх (используется в футере)
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

window.scrollToTop = scrollToTop;

// Функционал свайпа для команды на мобильных устройствах
document.addEventListener('DOMContentLoaded', function() {
    const teamCarousel = document.getElementById('teamCarousel');
    
    if (teamCarousel) {
        // Проверяем, если мы на мобильном устройстве
        const isMobile = window.innerWidth <= 767;
        
        if (isMobile) {
            // Отключаем стандартную навигацию стрелками для мобильных
            // и включаем свайп-навигацию
            
            // Добавляем индикаторы слайдов
            const teamCards = teamCarousel.querySelectorAll('.min-w-[350px]');
            const indicatorsContainer = document.createElement('div');
            indicatorsContainer.className = 'flex justify-center gap-3 mt-4';
            
            // Создаем индикаторы для каждой карточки
            teamCards.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.className = 'w-3 h-3 rounded-full bg-gray-300';
                if (index === 0) {
                    dot.classList.add('bg-gray-800'); // Активный индикатор
                }
                indicatorsContainer.appendChild(dot);
            });
            
            // Добавляем индикаторы после карусели
            teamCarousel.parentNode.parentNode.appendChild(indicatorsContainer);
            
            // Отслеживаем прокрутку для обновления индикаторов
            teamCarousel.parentNode.addEventListener('scroll', function() {
                const scrollPosition = this.scrollLeft;
                const cardWidth = teamCards[0].offsetWidth + 16; // Ширина + gap
                
                // Вычисляем текущий активный индекс на основе прокрутки
                // Используем более точную формулу для расчета индекса с учетом 85% ширины карточки
                const activeIndex = Math.round(scrollPosition / (cardWidth * 0.85));
                
                // Обновляем индикаторы
                const dots = indicatorsContainer.querySelectorAll('div');
                dots.forEach((dot, index) => {
                    if (index === activeIndex) {
                        dot.classList.add('bg-gray-800');
                        dot.classList.remove('bg-gray-300');
                    } else {
                        dot.classList.add('bg-gray-300');
                        dot.classList.remove('bg-gray-800');
                    }
                });
            });
        }
    }
});

// Инициализация мобильной карусели проектов
document.addEventListener('DOMContentLoaded', function() {
    // Инициализируем карусель проектов при загрузке
    restructureProjectCarousel();
    
    // Добавляем класс donate-mobile для страницы Donate.html на мобильных устройствах
    function checkAndAddDonateClass() {
        if (window.location.pathname.includes('Donate.html') && window.innerWidth <= 767) {
            document.body.classList.add('donate-mobile');
        } else if (window.location.pathname.includes('Donate.html') && window.innerWidth > 767) {
            document.body.classList.remove('donate-mobile');
        }
    }
    
    // Проверяем при загрузке
    checkAndAddDonateClass();
    
    // Переинициализируем при изменении размера окна
    window.addEventListener('resize', function() {
        // Добавляем небольшую задержку, чтобы избежать частых вызовов
        clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(function() {
            restructureProjectCarousel();
            checkAndAddDonateClass();
        }, 250);
    });
});

// === Код для динамической бегущей строки ===

// Получаем API URL из переменных окружения или используем fallback
const getApiConfig = () => {
    // Используем переменные из .env файла через глобальные переменные или fallback
    return {
        apiBaseUrl: window.VITE_API_BASE_URL || 'http://localhost:3000',
        isDebug: window.VITE_APP_DEBUG === 'true' || false
    };
};

// Функция для загрузки пользователей из API
async function loadUsersForMarquee() {
    const config = getApiConfig();
    
    try {
        if (config.isDebug) {
            console.log('Загружаем данные пользователей из API...');
        }
        
        const apiUrl = `${config.apiBaseUrl}/api/users/read.php`;
        console.log('Запрос к API:', apiUrl);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (config.isDebug) {
            console.log('Получены данные из API:', data);
        }
        
        if (data.status === 'success' && data.data && data.data.length > 0) {
            console.log(`Загружено ${data.data.length} пользователей`);
            generateMarqueeContent(data.data);
        } else {
            console.warn('API вернул пустые данные, используем статичные данные');
            // Оставляем статичные данные если API вернул пустой результат
        }
    } catch (error) {
        console.warn('Ошибка загрузки пользователей:', error.message);
        console.log('Используем статичные данные как fallback');
        // Оставляем статичные данные при ошибке
    }
}

// Функция для генерации контента бегущей строки
function generateMarqueeContent(users) {
    // Проверяем какая страница открыта и какой контейнер использовать
    const mainMarqueeContainer = document.getElementById('dynamic-marquee');
    const forestMarqueeContainer = document.getElementById('forest-dynamic-marquee');
    
    let marqueeContainer = null;
    let isForestPage = false;
    
    if (forestMarqueeContainer) {
        marqueeContainer = forestMarqueeContainer;
        isForestPage = true;
    } else if (mainMarqueeContainer) {
        marqueeContainer = mainMarqueeContainer;
        isForestPage = false;
    }
    
    if (!marqueeContainer) {
        console.warn('Контейнер бегущей строки не найден');
        return;
    }
    
    // Очищаем контейнер
    marqueeContainer.innerHTML = '';
    
    // Функция для создания карточки пользователя
    function createUserCard(user) {
        // Считаем общее количество деревьев
        const totalTrees = user.plantings.reduce((sum, planting) => sum + planting.trees_quantity, 0);
        
        // Формируем короткое имя (Имя + первая буква фамилии)
        const shortName = `${user.name} ${user.surname.charAt(0)}.`;
        
        if (isForestPage) {
            // Формат для лесной страницы (карточки с деревьями)
            return `
                <div class="flex items-center px-12 py-6 border-r border-gray-400/30 min-w-fit">
                    <div class="text-left">
                        <div class="text-6xl font-normal text-white flex items-center gap-2">
                            ${totalTrees}
                            <span class="text-6xl">🌳</span>
                        </div>
                        <div class="text-lg text-gray-300 mt-1">${shortName}</div>
                    </div>
                </div>
            `;
        } else {
            // Формат для главной страницы (простые карточки)
            return `
                <div class="flex items-center px-12 py-6 border-r border-gray-400/30 min-w-fit">
                    <div class="text-left">
                        <div class="text-6xl font-normal text-white flex items-center gap-2">
                            ${totalTrees}
                            <span class="text-6xl">🌳</span>
                        </div>
                        <div class="text-lg text-gray-300 mt-1">${shortName}</div>
                    </div>
                </div>
            `;
        }
    }
    
    // Фильтруем пользователей у которых есть посадки
    const usersWithPlantings = users.filter(user => user.plantings && user.plantings.length > 0);
    
    if (usersWithPlantings.length === 0) {
        console.warn('Нет пользователей с посадками, оставляем статичные данные');
        return;
    }
    
    // Создаем карточки для пользователей
    let content = '';
    usersWithPlantings.forEach(user => {
        content += createUserCard(user);
    });
    
    // Дублируем контент для бесконечной прокрутки (минимум 2 раза)
    const duplicatedContent = content + content + content;
    
    // Если пользователей мало, дублируем еще раз для плавной анимации
    if (usersWithPlantings.length < 8) {
        marqueeContainer.innerHTML = duplicatedContent + content;
    } else {
        marqueeContainer.innerHTML = duplicatedContent;
    }
    
    console.log(`Динамическая бегущая строка обновлена с данными из API (${isForestPage ? 'лесная' : 'главная'} страница)`);
}

// Инициализация загрузки пользователей для главной страницы
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, что мы на главной странице
    const isMainPage = window.location.pathname === '/' || 
                      window.location.pathname.includes('index.html') || 
                      window.location.pathname === '';
    
    if (isMainPage && document.getElementById('dynamic-marquee')) {
        console.log('Инициализируем загрузку пользователей для бегущей строки главной страницы...');
        
        // Загружаем пользователей сразу
        loadUsersForMarquee();
        
        // Обновляем данные каждые 5 минут
        setInterval(loadUsersForMarquee, 5 * 60 * 1000);
    }
    
    // Проверяем, что мы на странице PlantForest
    const isForestPage = window.location.pathname.includes('PlantForest.html');
    
    if (isForestPage && document.getElementById('forest-dynamic-marquee')) {
        console.log('Инициализируем загрузку пользователей для бегущей строки лесной страницы...');
        
        // Загружаем пользователей сразу
        loadUsersForMarquee();
        
        // Обновляем данные каждые 5 минут
        setInterval(loadUsersForMarquee, 5 * 60 * 1000);
    }
});
