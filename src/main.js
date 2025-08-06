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

// Google Maps функциональность
let map;
let markers = [];

// Инициализация Google карты
function initMap() {
  // Координаты Алматы (центр карты)
  const almaty = { lat: 43.2220, lng: 76.8512 };
  
  // Создаем карту
  map = new google.maps.Map(document.getElementById("google-map"), {
    zoom: 11,
    center: almaty,
    styles: [
      {
        "featureType": "all",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "weight": "2.00"
          }
        ]
      },
      {
        "featureType": "all",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#9c9c9c"
          }
        ]
      },
      {
        "featureType": "all",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
          {
            "color": "#f2f2f2"
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
          {
            "saturation": -100
          },
          {
            "lightness": 45
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#7b7b7b"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
          {
            "color": "#46bcec"
          },
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#c8d7d4"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#070707"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      }
    ],
    disableDefaultUI: true, // Отключаем стандартные элементы управления
    gestureHandling: 'cooperative'
  });

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

  plantingAreas.forEach(area => {
    const marker = new google.maps.Marker({
      position: { lat: area.lat, lng: area.lng },
      map: map,
      title: area.title,
      icon: {
        url: '../../src/img/map-marker.svg', // Кастомная иконка маркера
        scaledSize: new google.maps.Size(40, 40),
        anchor: new google.maps.Point(20, 40)
      }
    });

    // Создаем информационное окно
    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div style="padding: 10px; font-family: Arial, sans-serif;">
          <h3 style="margin: 0 0 5px 0; color: #23B77F; font-size: 16px;">${area.title}</h3>
          <p style="margin: 0; color: #666; font-size: 14px;">${area.trees}</p>
        </div>
      `
    });

    // Открываем информационное окно при клике
    marker.addListener('click', () => {
      // Закрываем все открытые окна
      markers.forEach(m => m.infoWindow && m.infoWindow.close());
      infoWindow.open(map, marker);
    });

    // Сохраняем маркер и его информационное окно
    marker.infoWindow = infoWindow;
    markers.push(marker);
  });
}

// Функции управления картой
function zoomIn() {
  if (map) {
    const currentZoom = map.getZoom();
    map.setZoom(currentZoom + 1);
  }
}

function zoomOut() {
  if (map) {
    const currentZoom = map.getZoom();
    map.setZoom(currentZoom - 1);
  }
}

// Функция поиска по номеру телефона (заглушка)
function findUserTrees(phoneNumber) {
  // Здесь будет логика поиска деревьев пользователя по номеру телефона
  console.log('Поиск деревьев для номера:', phoneNumber);
  
  // Пример: фокусируемся на случайном маркере
  if (markers.length > 0) {
    const randomMarker = markers[Math.floor(Math.random() * markers.length)];
    map.setCenter(randomMarker.getPosition());
    map.setZoom(15);
    randomMarker.infoWindow.open(map, randomMarker);
  }
}

// Обработчик формы поиска на карте
document.addEventListener('DOMContentLoaded', () => {
  const mapSearchButton = document.querySelector('#google-map').parentElement.parentElement.querySelector('button');
  const mapSearchInput = document.querySelector('#google-map').parentElement.parentElement.querySelector('input[type="tel"]');
  
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
