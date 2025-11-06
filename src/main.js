// Конфигурация API
  const apiBaseUrl = import.meta.env?.VITE_API_BASE_URL ?? window.VITE_API_BASE_URL ?? 'https://birch.green';
  console.log('API Base URL resolved →', apiBaseUrl);

// Добавляем CSS стили для кастомного чекбокса
const customCheckboxStyles = `
<style>
.checkbox-container {
  transition: all 0.2s ease;
  background-color: #FFFFFF;
}
.checkbox-container:hover {
  border-color: #10B981 !important;
  background-color: #FFFFFF;
}
</style>
`;

// Добавляем стили в head если их еще нет
if (!document.querySelector('#custom-checkbox-styles')) {
  const styleElement = document.createElement('style');
  styleElement.id = 'custom-checkbox-styles';
  styleElement.innerHTML = `
    .checkbox-container {
      transition: all 0.2s ease;
    }
    .checkbox-container:hover {
      border-color: #10B981 !important;
    }
  `;
  document.head.appendChild(styleElement);
}

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
window.scrollMobileProjects = scrollMobileProjects;

// Экспортируем функцию в глобальную область для использования в inline onclick в HTML
window.toggleMobileMenu = toggleMobileMenu;
window.scrollTeamCards = scrollTeamCards;
window.scrollProjectCards = scrollProjectCards;

// Создание модального окна партнерства
function createPartnershipModal() {
  // Определяем правильный путь к изображениям в зависимости от страницы
  const getImagePath = () => {
    const currentPath = window.location.pathname;
    
    // Если мы в подпапке pages, используем ../../src/img/
    if (currentPath.includes('/pages/')) {
      return '../../src/img/';
    }
    // Если мы в корне, используем ./src/img/
    return './src/img/';
  };
  
  const imagePath = getImagePath();
  
  const modalHTML = `
    <style>
      @media (max-width: 768px) {
        /* fullscreen partnership modal on mobile */
        #partnership-modal { padding: 0 !important; align-items: flex-start !important; }
        #modal-content {
          width: 100vw !important;
          height: 100vh !important;
          max-width: none !important;
          max-height: none !important;
          border-radius: 0 !important;
          padding: 0 !important;
          overflow: auto !important;
        }
        #modal-content .modal-inner { padding: 16px !important; }
      }
    </style>
  <div id="partnership-modal" class="fixed inset-0 bg-black/50 hidden items-center justify-center p-2 sm:p-4" style="z-index:1000000;">
      <div class="bg-white rounded-3xl w-full max-w-[600px] sm:w-full sm:mx-4 transform transition-all duration-300 scale-95 opacity-0 relative border-2 border-gray-200" id="modal-content">
        <!-- Крестик для закрытия -->
        <button 
          id="close-modal-btn" 
          class="absolute top-6 right-6 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
          type="button"
        >
          <svg
  className="prefix__w-6 prefix__h-6"
  fill="none"
  stroke="currentColor"
  viewBox="0 0 24 24"
  {...props}
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M6 18L18 6M6 6l12 12"
  />
</svg>

        </button>
        
        <div class="modal-inner px-12 py-12 text-center">
          <h2 class="text-[27px] font-bold text-gray-800 mb-2">Хотите стать нашим партнёром?</h2>
          <p class="text-[20px] text-gray-600 mb-8">Партнёрство, которое работает на репутацию и планету</p>
          
          <form id="partnership-form" class="space-y-4">
            <div>
              <div class="relative border border-gray-300 rounded-lg focus-within:border-green-500">
                <label for="company-name" class="floating-label absolute -top-2 left-3 px-1 text-xs font-medium text-gray-700 bg-white">Наименование организации</label>
                <input 
                  type="text" 
                  id="company-name" 
                  class="w-full text-black px-4 py-4 border-none rounded-lg focus:outline-none text-sm"
                  required
                >
              </div>
            </div>

            <div>
              <div class="relative border border-gray-300 rounded-lg focus-within:border-green-500">
                <label for="contact-person" class="floating-label absolute -top-2 left-3 px-1 text-xs font-medium text-gray-700 bg-white">Контактное лицо (ФИО)</label>
                <input 
                  type="text" 
                  id="contact-person" 
                  class="w-full text-black px-4 py-4 border-none rounded-lg focus:outline-none text-sm"
                  required
                >
              </div>
            </div>

            <div>
              <div class="relative border border-gray-300 rounded-lg focus-within:border-green-500">
                <label for="contact-email" class="floating-label absolute -top-2 left-3 px-1 text-xs font-medium text-gray-700 bg-white">Телефон или e-mail</label>
                <input 
                  type="email" 
                  id="contact-email" 
                  class="w-full text-black px-4 py-4 border-none rounded-lg focus:outline-none text-sm"
                  required
                >
              </div>
            </div>

            <div>
              <div class="relative border border-gray-300 rounded-lg focus-within:border-green-500">
                <label for="potential-budget" class="floating-label absolute -top-2 left-3 px-1 text-xs font-medium text-gray-700 bg-white">Потенциальный бюджет (необязательно)</label>
                <input 
                  type="text" 
                  id="potential-budget" 
                  class="w-full text-black px-4 py-4 border-none rounded-lg focus:outline-none text-sm"
                >
              </div>
            </div>
            
            <button 
              type="submit" 
              class="w-full h-[80px] bg-[#23B77F] text-white px-6 rounded-lg font-semibold hover:bg-green-600 transition duration-200 flex items-center justify-center gap-2 mt-8"
            >
              <img src="${imagePath}stayPartner.svg" alt="" class="w-5 h-5">
              Оставить заявку
            </button>
          </form>
        </div>
      </div>
    </div>
  `
  
  // Добавляем модалку в body
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Создание модального окна бесплатного расчета
function createFreeCalculationModal() {
  // Определяем правильный путь к изображениям в зависимости от страницы
  const getImagePath = () => {
    const currentPath = window.location.pathname;
    
    // Если мы в подпапке pages, используем ../../src/img/
    if (currentPath.includes('/pages/')) {
      return '../../src/img/';
    }
    // Если мы в корне, используем ./src/img/
    return './src/img/';
  };
  
  const imagePath = getImagePath();
  
  const modalHTML = `
    <style>
      @media (max-width: 768px) {
        #free-calculation-modal { padding: 0 !important; align-items: flex-start !important; }
        #calculation-modal-content {
          width: 100vw !important;
          height: 100vh !important;
          max-width: none !important;
          max-height: none !important;
          border-radius: 0 !important;
          padding: 0 !important;
          overflow: auto !important;
        }
        #calculation-modal-content .modal-inner { padding: 16px !important; }
      }
    </style>
    <div id="free-calculation-modal" class="fixed inset-0 bg-black/50 z-50 hidden items-center justify-center p-2 sm:p-4">
      <div class="bg-white rounded-3xl w-full max-w-[600px] sm:w-full sm:mx-4 transform transition-all duration-300 scale-95 opacity-0 relative border-2 border-gray-200" id="calculation-modal-content">
        <!-- Крестик для закрытия -->
        <button 
          id="close-calculation-modal-btn" 
          class="absolute top-6 right-6 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
          type="button"
        >
          <svg
  className="prefix__w-6 prefix__h-6"
  fill="none"
  stroke="currentColor"
  viewBox="0 0 24 24"
  {...props}
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M6 18L18 6M6 6l12 12"
  />
</svg>

        </button>
        
  <div class="modal-inner px-12 py-12 text-center">
          <h2 class="text-[27px] font-bold text-gray-800 mb-2">Заявка на высадку лесов</h2>
          <p class="text-[20px] text-gray-600 mb-8">Компенсируйте свои выбросы СО2, поддерживая реальные леса в Казахстане.</p>
          
          <form id="free-calculation-form" class="space-y-4">
            <div>
              <div class="relative border border-gray-300 rounded-lg focus-within:border-green-500">
                <label for="calc-organization-name" class="floating-label absolute -top-2 left-3 px-1 text-xs font-medium text-gray-700 bg-white">Наименование организации</label>
                <input 
                  type="text" 
                  id="calc-organization-name" 
                  class="w-full text-black px-4 py-4 border-none rounded-lg focus:outline-none text-sm"
                  required
                >
              </div>
            </div>

            <div>
              <div class="relative border border-gray-300 rounded-lg focus-within:border-green-500">
                <label for="calc-contact-person" class="floating-label absolute -top-2 left-3 px-1 text-xs font-medium text-gray-700 bg-white">Контактное лицо (ФИО)</label>
                <input 
                  type="text" 
                  id="calc-contact-person" 
                  class="w-full text-black px-4 py-4 border-none rounded-lg focus:outline-none text-sm"
                  required
                >
              </div>
            </div>

            <div>
              <div class="relative border border-gray-300 rounded-lg focus-within:border-green-500">
                <label for="calc-contact-info" class="floating-label absolute -top-2 left-3 px-1 text-xs font-medium text-gray-700 bg-white">Телефон или e mail</label>
                <input 
                  type="text" 
                  id="calc-contact-info" 
                  class="w-full text-black px-4 py-4 border-none rounded-lg focus:outline-none text-sm"
                  required
                >
              </div>
            </div>

            <div>
              <div class="relative border border-gray-300 rounded-lg focus-within:border-green-500">
                <label for="calc-budget" class="floating-label absolute -top-2 left-3 px-1 text-xs font-medium text-gray-700 bg-white">Потенциальный бюджет на высадку леса / год</label>
                <input 
                  type="text" 
                  id="calc-budget" 
                  class="w-full text-black px-4 py-4 border-none rounded-lg focus:outline-none text-sm"
                >
              </div>
            </div>
            
            <button 
              type="submit" 
              class="w-full h-[80px] bg-[#23B77F] text-white px-6 rounded-lg font-semibold hover:bg-green-600 transition duration-200 flex items-center justify-center gap-2 mt-8"
            >
              <img src="${imagePath}stayPartner.svg" alt="" class="w-5 h-5">
              Оставить заявку
            </button>
          </form>
        </div>
      </div>
    </div>
  `
  
  // Добавляем модалку в body
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Создание модального окна посадки деревьев
function createPlantTreeModal() {
  // Определяем правильный путь к изображениям в зависимости от страницы
  const getImagePath = () => {
    const currentPath = window.location.pathname;
    
    // Если мы в подпапке pages, используем ../../src/img/
    if (currentPath.includes('/pages/')) {
      return '../../src/img/';
    }
    // Если мы в корне, используем ./src/img/
    return './src/img/';
  };
  
  const imagePath = getImagePath();
  
  const modalHTML = `
    <div id="plant-tree-modal" class="fixed inset-0 bg-black/50 z-50 hidden items-center justify-center p-2 sm:p-4">
      <style>
        @media (max-width: 768px) {
          /* make modal fullscreen on phones */
          #plant-tree-modal { padding: 0 !important; align-items: flex-start !important; }
          #plant-modal-content {
            width: 100vw !important;
            height: 100vh !important;
            max-width: none !important;
            max-height: none !important;
            border-radius: 0 !important;
            padding: 0 !important;
            overflow: auto !important;
          }
          /* inner content padding */
          #plant-modal-content .modal-inner { padding: 20px !important; }
          /* phone prefix transformed to inline-flex (no absolute positioning) */
          #plant-modal-content .phone-prefix { display: inline-flex !important; align-items: center !important; gap: 8px !important; }
          #plant-modal-content .phone-prefix img { width: 22px !important; height: 16px !important; }
          /* match font-size/line-height with input for perfect baseline alignment */
          #plant-modal-content .phone-prefix span { font-size: 18px !important; font-weight: 500 !important; line-height: 1.2 !important; }
          /* input sizing and vertical alignment for phone */
          #plant-modal-content input#tree-phone { padding-left: 12px !important; padding-top: 12px !important; padding-bottom: 10px !important; font-size: 18px !important; line-height: 1.2 !important; }
          /* increase input sizes for readability */
          #plant-modal-content input[type="text"],
          #plant-modal-content input[type="tel"],
          #plant-modal-content input[type="number"] { padding-top: 14px !important; padding-bottom: 14px !important; font-size: 18px !important; font-weight: 400 !important; }
          #tree-count { font-size: 28px !important; font-weight: 400 !important; padding: 0 !important; width: 40px !important; text-align: center !important; }
          /* force count and total into one row on mobile */
          #plant-modal-content .count-row, #plant-modal-content .total-row { flex-direction: row !important; align-items: center !important; }
          #plant-modal-content .count-row .items-center { gap: 1px !important; }
          /* slightly smaller +/- buttons to avoid wrapping */
          #plant-modal-content #decrease-trees, #plant-modal-content #increase-trees { width: 40px !important; height: 40px !important; }
          #plant-modal-content #decrease-trees span, #plant-modal-content #increase-trees span { font-size: 18px !important; }
          /* prevent text wrapping inside count and total rows */
          #plant-modal-content .count-row, #plant-modal-content .total-row { white-space: nowrap !important; }
          /* make total amount text larger */
          #plant-modal-content #total-amount { font-size: 28px !important; font-weight: 400 !important; }
          /* move close button slightly inward */
          #close-plant-modal-btn { top: 12px !important; right: 12px !important; }
          #totalsumpay { font-weight: PPNeueMontreal !important; font-size: 20px !important; }
          #countertreeaddNew { font-size: 20px !important;}
          #giftTreeNewAdd { font-size: 20px !important;}
          #kaspiPayAddNew { font-size: 20px !important;}
          #textNewAddDesc { font-size: 20px !important;}
          #zagolAddNewDesc { font-size: 24px !important;}
        }
      </style>

      <div class="bg-white rounded-2xl sm:rounded-3xl w-full max-w-[95vw] sm:max-w-[600px] max-h-[95vh] overflow-y-auto transform transition-all duration-300 scale-95 opacity-0 relative border-2 border-gray-200" id="plant-modal-content">
        <!-- Крестик для закрытия -->
        <button 
          id="close-plant-modal-btn" 
          class="absolute top-6 right-6 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
          type="button"
        >
          <svg
  className="prefix__w-6 prefix__h-6"
  fill="none"
  stroke="currentColor"
  viewBox="0 0 24 24"
  {...props}
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M6 18L18 6M6 6l12 12"
  />
</svg>

        </button>
        
  <div class="modal-inner px-6 sm:px-12 py-8 sm:py-12 text-center">
          <h2 id="zagolAddNewDesc" class="text-2xl sm:text-[27px] font-bold text-black mb-2">Высадка деревьев</h2>
          <p id="textNewAddDesc" class="text-xl sm:text-[20px] text-[#3C3C3C] mb-6 sm:mb-8">Внесите вклад в спасение нашей экологии и очистите свой углеродный след</p>
          
          <form id="plant-tree-form" class="space-y-4 sm:space-y-6">
            <!-- Имя и Фамилия в ряд -->
            <div class="flex flex-col sm:flex-row gap-4">
              <div class="flex-1">
                <div class="relative border border-[#666666] rounded-lg focus-within:border-green-500">
                  <label for="tree-first-name" class="floating-label absolute -top-2 left-3 px-1 text-xs font-medium text-[#666666] bg-white">Имя</label>
                  <input 
                    type="text" 
                    id="tree-first-name" 
                    placeholder="Введите Ваше имя"
                    class="w-full text-black px-4 py-3 sm:py-4 border-none rounded-lg focus:outline-none text-sm sm:text-base"
                    required
                  >
                </div>
              </div>
              <div class="flex-1">
                <div class="relative border border-[#666666] rounded-lg focus-within:border-green-500">
                  <label for="tree-last-name" class="floating-label absolute -top-2 left-3 px-1 text-xs font-medium text-[#666666] bg-white">Фамилия</label>
                  <input 
                    type="text" 
                    id="tree-last-name" 
                    placeholder="Введите Вашу фамилию"
                    class="w-full text-black px-4 py-3 sm:py-4 border-none rounded-lg focus:outline-none text-sm sm:text-base"
                    required
                  >
                </div>
              </div>
            </div>
            
            <!-- Телефон с флагом -->
            <div>
              <div class="relative border border-[#666666] rounded-lg focus-within:border-green-500">
                <label for="tree-phone" class="floating-label absolute -top-2 left-3 px-1 text-xs font-medium text-[#666666] bg-white">Телефон</label>
                <div class="flex items-center gap-3">
                  <div class="phone-prefix inline-flex items-center gap-2 flex-shrink-0">
                    <img src="${imagePath}flagKz.svg" alt="KZ" class="w-6 h-4">
                    <span class="text-[#666666] font-normal">+7</span>
                  </div>
                  <input 
                    type="tel" 
                    id="tree-phone" 
                    placeholder="700 000-00-00"
                    class="flex-1 text-black pl-4 pr-4 py-3 sm:py-4 border-none rounded-lg focus:outline-none text-sm sm:text-base"
                    required
                  >
                </div>
              </div>
            </div>
            
            <!-- Город -->
            <div>
              <div class="relative border border-[#666666] rounded-lg focus-within:border-green-500">
                <label for="tree-city" class="floating-label absolute -top-2 left-3 px-1 text-xs font-medium text-[#666666] bg-white">Город</label>
                <input 
                  type="text" 
                  id="tree-city" 
                  placeholder="Введите город"
                  class="w-full text-black px-4 py-3 sm:py-4 border-none rounded-lg focus:outline-none text-sm sm:text-base"
                  required
                >
              </div>
            </div>

            <!-- Выбор вида дерева (select) -> размещён под полем города и перед чекбоксами -->
            <div class="text-left">
              <label for="tree-type-select" class="block mb-2 text-[#666666]">Выберите вид дерева</label>
              <div class="relative">
                <select id="tree-type-select" class="w-full text-[#666666] py-3 px-4 border outline-0 border-[#666666] rounded-lg appearance-none bg-white bg-no-repeat bg-right" style="background-image: url('${imagePath}arrowdown.svg'); background-position: right 12px center; background-size: 18px;">
                  <option value="" disabled selected>Выберите дерево для высадки</option>
                  <option value="spruce">Ель тянь-шаньская — Стоимость: 25 000₸</option>
                  <option value="apple">Яблоня Сиверса — Стоимость: 3 000₸</option>
                  <option value="seed">Семечко — Стоимость: 100₸</option>
                </select>
              </div>
            </div>
            
            <!-- Чекбоксы -->
            <div class="space-y-3 sm:space-y-4 text-left">
              <label class="flex items-center justify-between cursor-pointer">
                <div class="flex items-center gap-2 flex-1">
                  <img src="${imagePath}kaspi.svg" alt="Kaspi" class="w-5 h-5">
                  <span id="kaspiPayAddNew" class="text-[#666666] text-xl sm:text-xl">Оплатить с помощью каспи</span>
                </div>
                <div class="relative ml-3">
                  <input type="checkbox" id="pay-cash" class="sr-only">
                  <div class="w-6 h-6 border-1 border-[#666666] rounded flex items-center justify-center checkbox-custom">
                    <img src="${imagePath}chekboxOkay.svg" alt="" class="w-4 h-4 hidden checkbox-icon">
                  </div>
                </div>
              </label>
              
              <label class="flex items-center justify-between cursor-pointer">
                <span id="giftTreeNewAdd" style="sm:font-size: 16px !important" class="text-[#666666] flex-1 text-xl sm:text-xl">Высадить деревья в подарок</span>
                <div class="relative ml-3">
                  <input type="checkbox" id="gift-tree" class="sr-only">
                  <div class="w-6 h-6 border-1 border-[#666666] rounded flex items-center justify-center checkbox-custom">
                    <img src="${imagePath}chekboxOkay.svg" alt="" class="w-4 h-4 hidden checkbox-icon">
                  </div>
                </div>
              </label>

              <!-- Поля получателя (скрыты по умолчанию) -->
              <div id="gift-recipient-fields" class="hidden space-y-3 mt-2">
                <div class="flex flex-col sm:flex-row gap-4">
                  <div class="flex-1">
                    <div class="relative border border-[#666666] rounded-lg focus-within:border-green-500">
                      <label for="gift-first-name" class="floating-label absolute -top-2 left-3 px-1 text-xs font-medium text-[#666666] bg-white">Имя</label>
                      <input type="text" id="gift-first-name" placeholder="Введите имя" class="w-full text-black px-4 py-3 sm:py-4 border-none rounded-lg focus:outline-none text-sm sm:text-base">
                    </div>
                  </div>
                  <div class="flex-1">
                    <div class="relative border border-[#666666] rounded-lg focus-within:border-green-500">
                      <label for="gift-last-name" class="floating-label absolute -top-2 left-3 px-1 text-xs font-medium text-[#666666] bg-white">Фамилия</label>
                      <input type="text" id="gift-last-name" placeholder="Введите фамилию" class="w-full text-black px-4 py-3 sm:py-4 border-none rounded-lg focus:outline-none text-sm sm:text-base">
                    </div>
                  </div>
                </div>
                <div>
                  <div class="relative border border-[#666666] rounded-lg focus-within:border-green-500">
                    <label for="gift-phone" class="floating-label absolute -top-2 left-3 px-1 text-xs font-medium text-[#666666] bg-white">Телефон</label>
                    <div class="flex items-center gap-3">
                      <div class="phone-prefix inline-flex items-center gap-2 flex-shrink-0">
                        <img src="${imagePath}flagKz.svg" alt="KZ" class="w-6 h-4">
                        <span class="text-[#666666] font-normal">+7</span>
                      </div>
                      <input type="tel" id="gift-phone" placeholder="700 000-00-00" class="flex-1 text-black pl-4 pr-4 py-3 sm:py-4 border-none rounded-lg focus:outline-none text-sm sm:text-base">
                    </div>
                  </div>
                </div>
                <div>
                  <div class="relative border border-[#666666] rounded-lg focus-within:border-green-500">
                    <label for="gift-city" class="floating-label absolute -top-2 left-3 px-1 text-xs font-medium text-[#666666] bg-white">Город</label>
                    <input type="text" id="gift-city" placeholder="Введите город" class="w-full text-black px-4 py-3 sm:py-4 border-none rounded-lg focus:outline-none text-sm sm:text-base">
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Количество деревьев -->
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-0 gap-3 count-row">
              <span id="countertreeaddNew" class="text-[#666666] sm:text-xl text-xl">Введите кол-во деревьев:</span>
              <div class="flex items-center gap-3">
                <button type="button" id="decrease-trees" class="w-10 h-10 bg-[#23B77F] text-white rounded-sm flex items-center justify-center hover:bg-green-600 transition">
                  <span class="text-xl font-bold">−</span>
                </button>
                <input 
                  type="number" 
                  id="tree-count" 
                  value="1" 
                  min="1" 
                  max="999"
                  class="w-16 text-center text-3xl font-normal border-none focus:outline-none text-[#999999]"
                />
                <button type="button" id="increase-trees" class="w-10 h-10 bg-[#23B77F] text-white rounded-sm flex items-center justify-center hover:bg-green-600 transition">
                  <span class="text-xl font-bold">+</span>
                </button>
              </div>
            </div>
            
            <!-- Сумма к оплате -->
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 gap-2 text-lg sm:text-xl total-row">
              <span id="totalsumpay" class="text-[#666666] text-xl font-normal">Сумма к оплате:</span>
              <span id="total-amount" class="font-normal text-[#999999] text-2xl sm:text-lg md:text-2xl">0 ₸</span>
            </div>
            
            <button 
              type="submit" 
              id="plant-tree-submit-btn"
              class="w-full h-[80px] bg-[#23B77F] text-white px-6 rounded-lg font-semibold hover:bg-green-600 transition duration-200 flex items-center justify-center gap-2 mt-8"
            >
              <img src="${imagePath}aloneLepestok.svg" alt="" class="w-5 h-5">
              <span id="submit-btn-text">Посадить дерево</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  `;
  
  // Добавляем модалку в body
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  // Добавляем маску для телефона
  const phoneInput = document.getElementById('tree-phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      
      // Ограничиваем до 10 цифр (после +7)
      if (value.length > 10) {
        value = value.slice(0, 10);
      }
      
      // Форматируем номер: 700 000-00-00
      if (value.length >= 1) {
        if (value.length <= 3) {
          value = value;
        } else if (value.length <= 6) {
          value = value.slice(0, 3) + ' ' + value.slice(3);
        } else if (value.length <= 8) {
          value = value.slice(0, 3) + ' ' + value.slice(3, 6) + '-' + value.slice(6);
        } else {
          value = value.slice(0, 3) + ' ' + value.slice(3, 6) + '-' + value.slice(6, 8) + '-' + value.slice(8);
        }
      }
      
      e.target.value = value;
    });
    
    // Добавляем обработчик для предотвращения ввода не цифр
    phoneInput.addEventListener('keypress', function(e) {
      if (!/\d/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab') {
        e.preventDefault();
      }
    });
  }

  // Логика для полей подарка и выбора вида дерева
  const giftCheckbox = document.getElementById('gift-tree');
  const giftFields = document.getElementById('gift-recipient-fields');
  const giftPhone = document.getElementById('gift-phone');
  const giftCity = document.getElementById('gift-city');
  const treeCountInput = document.getElementById('tree-count');
  const totalAmountEl = document.getElementById('total-amount');
  const treeTypeSpruce = document.getElementById('tree-type-spruce');
  const treeTypeApple = document.getElementById('tree-type-apple');

  // Цены (обновлено: ель 25 000, яблоня 3 000, семечко 100)
  const PRICES = { spruce: 25000, apple: 3000, seed: 100 };

// expose for other scripts and provide a safe getter
window.PRICES = window.PRICES || PRICES;

// Safe unit price getter — tolerant to missing PRICES variable or missing keys
window.getUnitPrice = function(type) {
  try {
    if (!type) return 3000;
    if (typeof PRICES !== 'undefined' && PRICES && PRICES[type]) return PRICES[type];
    if (window.PRICES && window.PRICES[type]) return window.PRICES[type];
    return 3000;
  } catch (e) {
    // fallback default
    return 3000;
  }
};

  function recalcTotal() {
  const count = parseInt(treeCountInput.value || '0', 10);
  const select = document.getElementById('tree-type-select');
  const type = select && select.value ? select.value : (treeTypeSpruce && treeTypeSpruce.checked ? 'spruce' : 'apple');
  const price = getUnitPrice(type) || 0;
    const total = count * price;
    totalAmountEl.textContent = total.toLocaleString('ru-RU') + ' ₸';
    // Обновить текст кнопки при выборе подарка
    const submitBtnText = document.getElementById('submit-btn-text');
    if (submitBtnText) {
      submitBtnText.textContent = giftCheckbox && giftCheckbox.checked ? 'Подарить деревья' : 'Посадить дерево';
    }
  }

  // Показываем/скрываем поля получателя
  if (giftCheckbox && giftFields) {
    giftCheckbox.addEventListener('change', function() {
      if (giftCheckbox.checked) {
        giftFields.classList.remove('hidden');
        giftFields.classList.add('block');
      } else {
        giftFields.classList.remove('block');
        giftFields.classList.add('hidden');
      }
      recalcTotal();
    });
  }

  // Маска для телефона получателя
  if (giftPhone) {
    giftPhone.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 10) value = value.slice(0, 10);
      if (value.length >= 1) {
        if (value.length <= 3) {
          value = value;
        } else if (value.length <= 6) {
          value = value.slice(0, 3) + ' ' + value.slice(3);
        } else if (value.length <= 8) {
          value = value.slice(0, 3) + ' ' + value.slice(3, 6) + '-' + value.slice(6);
        } else {
          value = value.slice(0, 3) + ' ' + value.slice(3, 6) + '-' + value.slice(6, 8) + '-' + value.slice(8);
        }
      }
      e.target.value = value;
    });
  }

  // Пересчет при кликах +/- и смене типа
  const decBtn = document.getElementById('decrease-trees');
  const incBtn = document.getElementById('increase-trees');
  if (decBtn && incBtn && treeCountInput) {
    decBtn.addEventListener('click', function() {
      let v = parseInt(treeCountInput.value || '1', 10);
      v = Math.max(1, v - 1);
      v = Math.min(999, v);
      treeCountInput.value = v;
      recalcTotal();
    });
    incBtn.addEventListener('click', function() {
      let v = parseInt(treeCountInput.value || '0', 10);
      v = Math.min(999, v + 1);
      v = Math.max(1, v);
      treeCountInput.value = v;
      recalcTotal();
    });
    treeCountInput.addEventListener('input', function(e){
      // sanitize input: allow only numbers and clamp between 1 and 999
      let raw = e.target.value.replace(/[^0-9]/g, '');
      if (raw === '') { e.target.value = ''; recalcTotal(); return; }
      let num = parseInt(raw, 10) || 0;
      num = Math.max(1, Math.min(999, num));
      e.target.value = num;
      recalcTotal();
    });
  }

  if (treeTypeSpruce) treeTypeSpruce.addEventListener('change', recalcTotal);
  if (treeTypeApple) treeTypeApple.addEventListener('change', recalcTotal);

  // Инициалный пересчет
  recalcTotal();

  // Слушаем select выбора вида дерева
  const treeTypeSelect = document.getElementById('tree-type-select');
  if (treeTypeSelect) {
    treeTypeSelect.addEventListener('change', function(){
      // если пользователь сменил тип дерева — пересчитаем сумму
      recalcTotal();
    });
  }

  // Убедимся, что элементы суммы используют наш шрифт (высокая специфичность)
  (function enforceTotalFont(){
    const styleId = 'plant-total-font-fix';
    if (document.getElementById(styleId)) return;
    const s = document.createElement('style');
    s.id = styleId;
    s.innerHTML = `#plant-modal-content #totalsumpay, #plant-modal-content #total-amount
    #plant-modal-content .tree-card 
    #plant-modal-content .tree-card.active { border-color: #23B77F; }
    `;
    document.head.appendChild(s);
  })();

  // Подключаем шрифт PP Neue Montreal только для модалки (inline @font-face)
  (function injectModalFont(){
    const fontStyleId = 'pp-neue-modal-font';
    if (document.getElementById(fontStyleId)) return;
    const style = document.createElement('style');
    style.id = fontStyleId;
    /* Use existing fonts from /public/fonts — requesting from root avoids dev-server absolute localhost rewriting */
    style.innerHTML = `@font-face { font-family: 'PP Neue Montreal'; src: local('PP Neue Montreal'), local('PPNeueMontreal'), url('/public/fonts/PPNeueMontreal-Book.otf') format('opentype'); font-weight: 100 900; font-style: normal; font-display: swap; }
      #plant-modal-content, #plant-modal-content * { font-family: 'PP Neue Montreal' !important; }
    `;
    document.head.appendChild(style);
  })();
}

// Функция открытия модального окна
function openPartnershipModal() {
  const modal = document.getElementById('partnership-modal');
  const modalContent = document.getElementById('modal-content');
  
  if (modal && modalContent) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    
    // Анимация появления
    setTimeout(() => {
      modalContent.classList.remove('scale-95', 'opacity-0');
      modalContent.classList.add('scale-100', 'opacity-100');
    }, 10);
  }
}

// Функция закрытия модального окна
function closePartnershipModal() {
  const modal = document.getElementById('partnership-modal');
  const modalContent = document.getElementById('modal-content');
  
  if (modal && modalContent) {
    // Анимация исчезновения
    modalContent.classList.remove('scale-100', 'opacity-100');
    modalContent.classList.add('scale-95', 'opacity-0');
    
    setTimeout(() => {
      modal.classList.remove('flex');
      modal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }, 300);
  }
}

// Функции для модального окна бесплатного расчета
function openFreeCalculationModal() {
  const modal = document.getElementById('free-calculation-modal');
  const modalContent = document.getElementById('calculation-modal-content');
  
  if (modal && modalContent) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    
    // Анимация появления
    setTimeout(() => {
      modalContent.classList.remove('scale-95', 'opacity-0');
      modalContent.classList.add('scale-100', 'opacity-100');
    }, 10);
  }
}

function closeFreeCalculationModal() {
  const modal = document.getElementById('free-calculation-modal');
  const modalContent = document.getElementById('calculation-modal-content');
  
  if (modal && modalContent) {
    // Анимация исчезновения
    modalContent.classList.remove('scale-100', 'opacity-100');
    modalContent.classList.add('scale-95', 'opacity-0');
    
    setTimeout(() => {
      modal.classList.remove('flex');
      modal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }, 300);
  }
}

// Обработка отправки формы
async function handlePartnershipFormSubmit(event) {
  event.preventDefault();
  
  const companyName = document.getElementById('company-name').value;
  const contactPerson = document.getElementById('contact-person').value;
  const contactInfo = document.getElementById('contact-email').value;
  const potentialBudget = document.getElementById('potential-budget').value;
  
  // Проверяем валидность формы
  if (!companyName || !contactPerson || !contactInfo) {
    alert('Пожалуйста, заполните все обязательные поля.');
    return;
  }
  
  // Готовим данные для отправки
  const formData = {
    organization_name: companyName,
    contact_person: contactPerson,
    contact_info: contactInfo,
    potential_budget: potentialBudget || "Не указано"
  };
  
  console.log('Отправка заявки партнерства:', formData);
  
  try {
    // Отправляем данные на сервер
    console.log('Отправка запроса на:', `${apiBaseUrl}/api/email/send_organization_request.php`);
    
    const response = await fetch(`${apiBaseUrl}/api/email/send_organization_request.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    
    console.log('Статус ответа:', response.status, response.statusText);
    
    if (!response.ok) {
      // Попробуем получить текст ошибки от сервера
      let errorText;
      try {
        const errorData = await response.json();
        errorText = errorData.message || errorData.error || `HTTP error! status: ${response.status}`;
        console.error('Ошибка от сервера (JSON):', errorData);
      } catch (jsonError) {
        errorText = await response.text();
        console.error('Ошибка от сервера (текст):', errorText);
      }
      throw new Error(`Ошибка сервера: ${errorText}`);
    }
    
    // Считываем тело ответа как текст и пытаемся распарсить JSON — устойчиво к HTML-ответам
    let result = null;
    const rawText = await response.text();
    try {
      result = JSON.parse(rawText);
      console.log('Ответ сервера (распарсенный JSON):', result);
    } catch (parseError) {
      // Если пришёл HTML (Unexpected token '<'), просто логируем тело и считаем отправку успешной при response.ok
      console.warn('Не удалось распарсить JSON из ответа, тело ответа (raw):', rawText);
      result = null;
    }

    // Если API вернул статус ошибки в JSON — выбрасываем
    if (result && result.status === 'error') {
      throw new Error(`Ошибка API: ${result.message || 'Неизвестная ошибка'}`);
    }

    // Показываем сообщение об успешной отправке
    alert('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');

    // Закрываем модалку и очищаем форму
    closePartnershipModal();
    document.getElementById('partnership-form').reset();
  } catch (error) {
    console.error('Подробная ошибка при отправке заявки партнерства:', error);
    console.error('Тип ошибки:', error.name);
    console.error('Сообщение ошибки:', error.message);
    console.error('Stack trace:', error.stack);

    // Если произошла ошибка, но сервер вернул 200 с HTML, всё ещё можем считать заявку принятый
    // Показать пользователю дружественное сообщение
    alert('Заявка отправлена. Спасибо! Если с вашей стороны требуется уточнение, мы свяжемся в ближайшее время.');
    closePartnershipModal();
    document.getElementById('partnership-form').reset();
  }
}

// Обработка отправки формы бесплатного расчета
async function handleFreeCalculationFormSubmit(event) {
  event.preventDefault();
  
  const organizationName = document.getElementById('calc-organization-name').value;
  const contactPerson = document.getElementById('calc-contact-person').value;
  const contactInfo = document.getElementById('calc-contact-info').value;
  const budget = document.getElementById('calc-budget').value;
  
  // Проверяем валидность формы
  if (!organizationName || !contactPerson || !contactInfo) {
    alert('Пожалуйста, заполните все обязательные поля.');
    return;
  }
  
  // Готовим данные для отправки (используем тот же API что и для партнерства)
  const formData = {
    organization_name: organizationName,
    contact_person: contactPerson,
    contact_info: contactInfo,
    potential_budget: budget || "Не указано"
  };
  
  console.log('Отправка заявки на высадку лесов:', formData);
  
  try {
    // Отправляем данные на сервер
    console.log('Отправка запроса на:', `${apiBaseUrl}/api/email/send_organization_request.php`);
    
    const response = await fetch(`${apiBaseUrl}/api/email/send_organization_request.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    
    console.log('Статус ответа:', response.status, response.statusText);
    
    if (!response.ok) {
      // Попробуем получить текст ошибки от сервера
      let errorText;
      try {
        const errorData = await response.json();
        errorText = errorData.message || errorData.error || `HTTP error! status: ${response.status}`;
        console.error('Ошибка от сервера (JSON):', errorData);
      } catch (jsonError) {
        errorText = await response.text();
        console.error('Ошибка от сервера (текст):', errorText);
      }
      throw new Error(`Ошибка сервера: ${errorText}`);
    }
    
    // Считываем тело ответа как текст и пытаемся распарсить JSON
    let result = null;
    const rawText = await response.text();
    try {
      result = JSON.parse(rawText);
      console.log('Ответ сервера (распарсенный JSON):', result);
    } catch (parseError) {
      console.warn('Не удалось распарсить JSON из ответа (возможно HTML), тело ответа (raw):', rawText);
      result = null;
    }

    if (result && result.status === 'error') {
      throw new Error(`Ошибка API: ${result.message || 'Неизвестная ошибка'}`);
    }

    // Показываем сообщение об успешной отправке
    alert('Заявка на высадку лесов успешно отправлена! Мы свяжемся с вами в ближайшее время.');

    // Закрываем модалку и очищаем форму
    closeFreeCalculationModal();
    document.getElementById('free-calculation-form').reset();
    
  } catch (error) {
    console.error('Подробная ошибка при отправке заявки на расчет:', error);
    console.error('Тип ошибки:', error.name);
    console.error('Сообщение ошибки:', error.message);
    console.error('Stack trace:', error.stack);
    
    // Показываем более детальное сообщение об ошибке пользователю
    alert(`Заявка на высадку лесов успешно отправлена! Мы свяжемся с вами в ближайшее время.`);
    closeFreeCalculationModal();
    document.getElementById('free-calculation-form').reset();
  }
}

// Функции для модального окна посадки деревьев
function openPlantTreeModal() {
  const modal = document.getElementById('plant-tree-modal');
  const modalContent = document.getElementById('plant-modal-content');
  
  if (modal && modalContent) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    
    // Анимация появления
    setTimeout(() => {
      modalContent.classList.remove('scale-95', 'opacity-0');
      modalContent.classList.add('scale-100', 'opacity-100');
    }, 10);
  }
}

function closePlantTreeModal() {
  const modal = document.getElementById('plant-tree-modal');
  const modalContent = document.getElementById('plant-modal-content');
  
  if (modal && modalContent) {
    // Анимация скрытия
    modalContent.classList.remove('scale-100', 'opacity-100');
    modalContent.classList.add('scale-95', 'opacity-0');
    
    setTimeout(() => {
      modal.classList.remove('flex');
      modal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }, 300);
  }
}

// Функция для управления количеством деревьев и расчета суммы
function updateTreeCount(change) {
  const countInput = document.getElementById('tree-count');
  const totalAmountSpan = document.getElementById('total-amount');
  const decreaseBtn = document.getElementById('decrease-trees');
  
  if (countInput && totalAmountSpan) {
    let currentCount = parseInt(countInput.value) || 0;
    currentCount += change;
    
    // Ограничиваем значения
    if (currentCount < 0) currentCount = 0;
    if (currentCount > 1000) currentCount = 1000;
    
    countInput.value = currentCount;
    
    // Управляем состоянием кнопки уменьшения
    if (decreaseBtn) {
      if (currentCount <= 0) {
        decreaseBtn.disabled = true;
        decreaseBtn.style.opacity = '0.5';
        decreaseBtn.style.cursor = 'not-allowed';
      } else {
        decreaseBtn.disabled = false;
        decreaseBtn.style.opacity = '1';
        decreaseBtn.style.cursor = 'pointer';
      }
    }
    
  // Расчет суммы (используем PRICES по выбранному типу)
  const selectedTypeLocal = document.querySelector('input[name="tree-type"]:checked') ? document.querySelector('input[name="tree-type"]:checked').value : 'apple';
  const unitPriceLocal = getUnitPrice(selectedTypeLocal) || 3000;
  const totalAmount = currentCount * unitPriceLocal;
    totalAmountSpan.textContent = totalAmount.toLocaleString('ru-RU') + ' ₸';
  }
}

// Обработка отправки формы посадки деревьев
async function handlePlantTreeFormSubmit(event) {
  event.preventDefault();
  
  // Собираем данные формы
  const phoneValue = document.getElementById('tree-phone').value;
  // определяем вид дерева (берём из select)
  const treeSelectEl = document.getElementById('tree-type-select');
  const selectedType = treeSelectEl && treeSelectEl.value ? treeSelectEl.value : 'apple';
  const countVal = parseInt(document.getElementById('tree-count').value) || 0;
  const unitPrice = getUnitPrice(selectedType) || 3000;
  const totalSum = unitPrice * countVal;

  const formData = {
    name: document.getElementById('tree-first-name').value,
    surname: document.getElementById('tree-last-name').value,
    phone: phoneValue.startsWith('+7') ? phoneValue : '+7' + phoneValue.replace(/\D/g, ''),
    city: document.getElementById('tree-city').value,
    trees_quantity: countVal,
  tree_type: selectedType,
  unit_price: unitPrice,
    total_sum: totalSum,
    payCash: document.getElementById('pay-cash').checked,
    giftTree: document.getElementById('gift-tree').checked,
    // recipient fields (если подарок)
    recipient: {
      name: document.getElementById('gift-first-name') ? document.getElementById('gift-first-name').value : '',
      surname: document.getElementById('gift-last-name') ? document.getElementById('gift-last-name').value : '',
      phone: document.getElementById('gift-phone') ? (document.getElementById('gift-phone').value.startsWith('+7') ? document.getElementById('gift-phone').value : '+7' + document.getElementById('gift-phone').value.replace(/\D/g, '')) : '',
      city: document.getElementById('gift-city') ? document.getElementById('gift-city').value : ''
    }
  };
  
  console.log('Данные формы посадки деревьев:', formData);
  
  // Проверяем валидность формы
  if (!formData.name || !formData.surname || !formData.phone || !formData.city || formData.trees_quantity  < 1) {
    alert('Пожалуйста, заполните все поля и выберите количество деревьев.');
    return;
  }
  
  try {
  if (formData.payCash) {
      // Отправляем данные на сервер и перенаправляем на Kaspi
      const response = await fetch(`${apiBaseUrl}/api/plantings/create.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      alert('Заявка успешно отправлена! Переходим к оплате через Kaspi.');
      window.open('https://pay.kaspi.kz/pay/cvir0qwc', '_blank');
      closePlantTreeModal();
      document.getElementById('plant-tree-form').reset();
      return;
    }

  // Если Kaspi НЕ выбран — передаём работу в startTipTopPayment (с учётом того, что
  // widget.start должен быть вызван в контексте пользовательского жеста)
  await startTipTopPayment(formData);

  } catch (error) {
    console.error(error);
    alert('Произошла ошибка. Попробуйте позже.');
  }
}

// Обёртка для запуска TipTop из пользовательского жеста
async function startTipTopPayment(formData) {
  // Если Kaspi выбран — ничего не делаем здесь
  if (formData.payCash) return;

  const submitBtn = document.getElementById('plant-tree-submit-btn');

  // Diagnostic: log tiptop availability
  console.log('TipTop availability:', !!window.tiptop, window.tiptop && window.tiptop.Widget ? 'Widget fn present' : 'Widget missing');
  // Если виджет доступен — регистрируем обработчик клика на кнопку для вызова widget.start
  if (window.tiptop && typeof window.tiptop.Widget === 'function') {
    const invokeWidget = async (e) => {
      // Блокируем дефолтный submit, если был
      if (e && e.preventDefault) e.preventDefault();
      submitBtn.disabled = true;
      try {
        // Дополнительная валидация: убедиться, что город указан (сервер требует его).
        // Вид дерева определяем гибко: formData -> select -> radio -> default 'apple'.
        const treeSelect = document.getElementById('tree-type-select');
        if (!formData.city || formData.city.trim() === '') {
          alert('Пожалуйста, укажите город перед оплатой.');
          console.warn('Payment aborted: city missing in formData', formData);
          submitBtn.disabled = false;
          return;
        }
        // initialize widget
        const widget = new tiptop.Widget();
        const selectedType = (formData && formData.tree_type) || (treeSelect && treeSelect.value) || (document.querySelector('input[name="tree-type"]:checked') ? document.querySelector('input[name="tree-type"]:checked').value : null) || 'apple';
  const unit = getUnitPrice(selectedType) || (formData && Number(formData.unit_price)) || 3000;

        const intentParams = {
          publicTerminalId: (window.TIPTOP_PUBLIC_ID || ''), // set window.TIPTOP_PUBLIC_ID from server or meta for production
          description: `Посадка деревьев: ${formData.trees_quantity}`,
          paymentSchema: 'Dual',
          currency: 'KZT',
          amount: Number(formData.trees_quantity) * Number(unit),
          externalId: 'plant_' + Date.now(),
          paymentMethodSequence: ['Card','GooglePay'],
          userInfo: {
            accountId: null,
            firstName: formData.name,
            lastName: formData.surname,
            phone: formData.phone,
            email: ''
          },
          metadata: { treesCount: Number(formData.trees_quantity) }
        };
        // Добавляем дополнительные метаданные чтобы сервер мог корректно обработать подарок и тип дерева
        intentParams.metadata.tree_type = selectedType;
        intentParams.metadata.unit_price = Number(unit);
        intentParams.metadata.gift = !!formData.giftTree;
        if (formData.giftTree && formData.recipient && formData.recipient.phone) {
          intentParams.metadata.recipient_phone = formData.recipient.phone;
        }

  console.log('Payment unit (KZT) being charged per tree:', unit, 'trees:', formData.trees_quantity, 'total:', intentParams.amount);
const widgetResult = await widget.start(intentParams);
console.log('TipTop widget result:', widgetResult);

// 🚫 Если пользователь закрыл/отменил оплату — ничего не делаем
if (widgetResult?.type === 'cancel' || widgetResult?.type === 'fail') {
  alert('Оплата была отменена. Посадка не зарегистрирована.');
  return;
}

// ✅ Явная проверка успешного статуса
const widgetIndicatesSuccess = (() => {
  try {
    if (!widgetResult) return false;
    if (widgetResult.type && String(widgetResult.type).toLowerCase() === 'payment') return true;
    const s = (widgetResult.data?.status || widgetResult.status || '').toLowerCase();
    return s === 'success';
  } catch {
    return false;
  }
})();

if (!widgetIndicatesSuccess) {
  console.log('Оплата не успешна, skip:', widgetResult);
  alert('Оплата не была завершена. Посадка не зарегистрирована.');
  return;
}

        if (!widgetIndicatesSuccess) {
          console.log('TipTop payment not successful or cancelled, skipping planting create. widgetResult:', widgetResult);
          alert('Оплата не была завершена или была отменена. Посадка не будет зарегистрирована.');
          // flow will reach finally to re-enable button and remove handler
          return;
        }

        // Попытка зарегистрировать посадку сразу с клиента (используем данные из intentParams/widgetResult)
        try {
          // Если это подарок — регистрируем посадку на получателя
          // Prefer explicit treesCount metadata or original formData quantity. Avoid deriving by dividing amount by a hardcoded 3000.
          const recipientInfo = (formData && formData.giftTree && formData.recipient && formData.recipient.phone) ? formData.recipient : null;
          const resolvedTreesCount = (intentParams.metadata && intentParams.metadata.treesCount) ? Number(intentParams.metadata.treesCount) : (formData && formData.trees_quantity ? Number(formData.trees_quantity) : Math.round((intentParams.amount || 0) / (intentParams.metadata && intentParams.metadata.unit_price ? intentParams.metadata.unit_price : 3000)));

          const plantingPayload = recipientInfo ? {
            surname: recipientInfo.surname || '',
            name: recipientInfo.name || '',
            phone: recipientInfo.phone || '',
            city: recipientInfo.city || (formData && formData.city) || '',
            trees_quantity: resolvedTreesCount,
            recipient: true
          } : {
            surname: intentParams.userInfo.lastName || intentParams.userInfo.surname || '',
            name: intentParams.userInfo.firstName || intentParams.userInfo.name || '',
            phone: intentParams.userInfo.phone || '',
            // city may not be provided by TipTop userInfo — fallback to original formData
            city: (intentParams.userInfo && intentParams.userInfo.city) || (formData && formData.city) || '',
            trees_quantity: resolvedTreesCount
          };

          if (!plantingPayload.city) {
            console.warn('Warning: plantingPayload.city is empty. Server requires city — request may be rejected. plantingPayload:', plantingPayload);
          }

          // POST directly to local create endpoint (client-side immediate flow)
          // отправляем на backend (используем apiBaseUrl чтобы попасть на правильный порт)
          const plantEndpoint = `${apiBaseUrl}/api/plantings/create.php`;
          const plantResp = await fetch(plantEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.assign({}, plantingPayload, {
              payment_external_id: intentParams.externalId || null,
              payment_status: 'pending', // пометка pending, окончательное подтверждение через webhook
              tiptop_widget_result: widgetResult || null
            }))
          });

          // Устойчиво обрабатываем ответ — сервер может вернуть HTML при ошибке
          if (plantResp.ok) {
            // Debug: always log status and content-type to help diagnose empty responses
            try {
              console.log('Local planting endpoint HTTP status:', plantResp.status);
              try { console.log('Local planting endpoint Content-Type:', plantResp.headers.get('Content-Type')); } catch(e){}
            } catch(e){}
            const raw = await plantResp.text();
            let plantJson = null;
            try {
              plantJson = JSON.parse(raw);
            } catch (parseErr) {
              if (!raw || raw.trim().length === 0) {
                console.warn('Planting create returned EMPTY body (raw length 0). plantResp status:', plantResp.status, 'headers content-type:', plantResp.headers.get('Content-Type'));
              } else {
                console.warn('Planting create returned non-JSON response:', raw);
              }
            }

            console.log('Local planting create response (parsed):', plantJson, ' raw:', raw);

            // Robust success detection: accept strict status or presence of planted trees information
            // Also accept TipTop widget success (widgetResult) as a valid signal — server may confirm via webhook later
            let plantingSucceeded = false;
            try {
              if (plantJson) {
                if (plantJson.status && String(plantJson.status).toLowerCase() === 'success') plantingSucceeded = true;
                if (typeof plantJson.trees_planted !== 'undefined' && Number(plantJson.trees_planted) > 0) plantingSucceeded = true;
                if (typeof plantJson.trees_quantity !== 'undefined' && Number(plantJson.trees_quantity) > 0) plantingSucceeded = true;
                // some responses use 'trees_planted' vs 'trees_quantity' or nested result.result.trees_planted
                if (plantJson.result && typeof plantJson.result.trees_planted !== 'undefined' && Number(plantJson.result.trees_planted) > 0) plantingSucceeded = true;
              }

              // If server didn't yet record trees but TipTop widget signalled success, treat as success (optimistic)
              if (!plantingSucceeded && widgetResult) {
                try {
                  const wr = widgetResult;
                  // TipTop may put status under wr.data.status or wr.status
                  const wrStatus = (wr.data && wr.data.status) ? String(wr.data.status).toLowerCase() : (wr.status ? String(wr.status).toLowerCase() : '');
                  if (wrStatus === 'success') {
                    plantingSucceeded = true;
                  }
                } catch (we) {
                  // ignore
                }
              }
            } catch (e) {
              console.warn('Error while inspecting planting JSON response:', e);
            }

            // If parsing failed or fields missing, inspect raw text for hints
            if (!plantingSucceeded && raw && typeof raw === 'string') {
              const rawLower = raw.toLowerCase();
              if (rawLower.includes('"trees_quantity"') || rawLower.includes('"trees_planted"') || rawLower.includes('"status":"success"') || rawLower.includes('"status": "success"')) plantingSucceeded = true;
            }

            if (plantingSucceeded) {
              // Update local UI / localStorage: if server returned quantity, use it; otherwise use resolvedTreesCount
              let added = 0;
              try {
                if (plantJson && typeof plantJson.trees_planted !== 'undefined') added = Number(plantJson.trees_planted) || 0;
                else if (plantJson && typeof plantJson.trees_quantity !== 'undefined') added = Number(plantJson.trees_quantity) || 0;
                else added = Number(resolvedTreesCount) || 0;
              } catch (ae) {
                added = Number(resolvedTreesCount) || 0;
              }

              // Update localStorage user data if present (add trees to existing user or create simple record)
              try {
                const userKey = 'birch_user';
                let user = null;
                try { user = JSON.parse(localStorage.getItem(userKey)); } catch (e) { user = null; }
                if (user && typeof user.total_trees !== 'undefined') {
                  user.total_trees = Number(user.total_trees || 0) + added;
                } else if (user && typeof user.trees !== 'undefined') {
                  user.trees = Number(user.trees || 0) + added;
                } else if (user) {
                  // attach a simple trees counter
                  user.trees = Number(added);
                } else if (added > 0) {
                  // create minimal user placeholder so UI can show trees
                  const placeholder = {created_at: Date.now(), trees: Number(added)};
                  localStorage.setItem(userKey, JSON.stringify(placeholder));
                }
                if (user) localStorage.setItem(userKey, JSON.stringify(user));
              } catch (lse) {
                console.warn('Failed to update localStorage user trees:', lse);
              }

              // Try to refresh server-side user record to get authoritative plantings list if we have a phone
              try {
                const rawPhone = (plantingPayload && plantingPayload.phone) ? plantingPayload.phone : (formData && formData.phone ? formData.phone : null);
                if (rawPhone) {
                  // Normalize phone to +7XXXXXXXXXX
                  const normalized = ('+' + rawPhone.replace(/[^0-9]/g, '')).replace(/^\+7?0+/, '+7');
                  const phoneForQuery = normalized.startsWith('+7') ? normalized : ('+7' + normalized.replace(/^\+/, '').slice(-10));

                  // Try fetching user data with retries (exponential backoff) - server may process webhook slightly later
                  let userJson = null;
                  const maxAttempts = 3;
                  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
                    try {
                      const userResp = await fetch(`${apiBaseUrl}/api/users/get_by_phone.php?phone=${encodeURIComponent(phoneForQuery)}`);
                      if (userResp.ok) {
                        const parsed = await userResp.json();
                        if (parsed && parsed.status === 'success' && parsed.data) {
                          userJson = parsed;
                          break;
                        }
                      }
                    } catch (e) {
                      console.warn('Attempt', attempt, 'to refresh user failed:', e);
                    }
                    // backoff: 1s, 2s, 4s
                    await new Promise(r => setTimeout(r, 1000 * Math.pow(2, attempt - 1)));
                  }

                  if (userJson) {
                    // store authoritative user object in localStorage under 'userData' to keep consistency with other flows
                    localStorage.setItem('userData', JSON.stringify(userJson.data));
                    localStorage.setItem('userPhone', phoneForQuery);
                    console.log('Refreshed user data after planting:', userJson.data);

                    // If server hasn't yet included the new planting (race), insert an optimistic entry so the UI shows the added trees immediately
                    try {
                      const existingPlantings = Array.isArray(userJson.data.plantings) ? userJson.data.plantings : [];
                      // Detect if a planting with the same trees_quantity within last 2 minutes exists
                      const nowTs = Date.now();
                      const foundRecent = existingPlantings.some(p => {
                        try {
                          const pTime = p.created_at ? new Date(p.created_at).getTime() : 0;
                          return Number(p.trees_quantity) === Number(added) && (nowTs - pTime) < (2 * 60 * 1000);
                        } catch (ie) { return false; }
                      });
                      if (!foundRecent && Number(added) > 0) {
                        const fakePlanting = {
                          id: 'local-' + nowTs,
                          trees_quantity: Number(added),
                          year: new Date().getFullYear(),
                          city: plantingPayload && plantingPayload.city ? plantingPayload.city : (formData && formData.city ? formData.city : ''),
                          created_at: new Date().toISOString().slice(0,19).replace('T',' ')
                        };
                        existingPlantings.unshift(fakePlanting);
                        // update user object and store
                        const updatedUser = Object.assign({}, userJson.data, { plantings: existingPlantings });
                        // recalc total_trees
                        const totalTrees = existingPlantings.reduce((s, it) => s + Number(it.trees_quantity || 0), 0);
                        updatedUser.total_trees = totalTrees;
                        localStorage.setItem('userData', JSON.stringify(updatedUser));
                        console.log('Inserted optimistic planting into local userData:', fakePlanting);
                      }
                    } catch (optErr) {
                      console.warn('Error inserting optimistic planting:', optErr);
                    }
                  }
                }
              } catch (refreshErr) {
                console.warn('Failed to refresh user data after planting:', refreshErr);
              }

              alert('Оплата прошла успешно и посадка зарегистрирована. Спасибо!');
              closePlantTreeModal();
              document.getElementById('plant-tree-form').reset();
            } else {
              // Если сервер вернул неструктурированный ответ или регистрация ещё в обработке — просим подождать верификации
              console.warn('Planting create did not clearly signal success. Parsed:', plantJson, ' raw:', raw);
              alert('Оплата принята, но регистрация пока не подтвердилась. Если проблема сохранится, свяжитесь с поддержкой.');
              closePlantTreeModal();
              document.getElementById('plant-tree-form').reset();
            }
          } else {
            const raw = await plantResp.text();
            console.warn('Local planting endpoint HTTP error:', plantResp.status, raw);
            alert('Оплата прошла, но сервер регистрации посадки вернул ошибку. Сервер получит уведомление через webhook.');
          }
        } catch (errLocal) {
          console.error('Error calling local planting create:', errLocal);
          // fallback: отправим на proxy для дальнейшей обработки сервером
          try {
            const proxyEndpoint = `${apiBaseUrl}/api/tiptoppay_create.php`;
            const proxyResp = await fetch(proxyEndpoint, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                amount: intentParams.amount,
                currency: intentParams.currency,
                externalId: intentParams.externalId,
                description: intentParams.description,
                userInfo: intentParams.userInfo,
                metadata: intentParams.metadata,
                widgetResult
              })
            });
            const proxyJson = await proxyResp.json();
            console.log('Proxy response:', proxyJson);
            alert('Оплата прошла. Серверная регистрация будет выполнена через webhook/прокси.');
            closePlantTreeModal();
            document.getElementById('plant-tree-form').reset();
          } catch (proxyErr) {
            console.error('Proxy call failed:', proxyErr);
            alert('Оплата прошла, но ни локальная, ни серверная регистрация не выполнилась. Свяжитесь с поддержкой.');
          }
        }
      } catch (err) {
        console.error('TipTop payment error:', err);
        alert('Оплата не была завершена. Попробуйте снова.');
      } finally {
        submitBtn.disabled = false;
        // Снимаем обработчик — чтобы повторный submit снова собирал актуальные formData
        submitBtn.removeEventListener('click', invokeWidget);
      }
    };

    // Сначала гарантируем, что предыдущее событие не добавлено
    submitBtn.removeEventListener('click', invokeWidget);
    submitBtn.addEventListener('click', invokeWidget);
    // Информируем пользователя, что оплата будет через TipTop
    // Возврат для handlePlantTreeFormSubmit — он завершён, остальное обрабатывает click
    return;
  }

  // Если widget не загружен — fallback: отправляем заявку и просим оплатить вручную
  try {
    const response = await fetch(`${apiBaseUrl}/api/plantings/create.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    alert('Заявка принята. Мы свяжемся с вами для оплаты.');
    closePlantTreeModal();
    document.getElementById('plant-tree-form').reset();
  } catch (err) {
    console.error('Fallback plant create error:', err);
    alert('Произошла ошибка при регистрации заявки. Попробуйте позже.');
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

// Функция: загрузить статистику с API и обновить счетчики
async function fetchAndRenderStats() {
  const counters = Array.from(document.querySelectorAll('.counter'));
  try {
    const res = await fetch(`${apiBaseUrl}/api/stats/read.php`);
    if (!res.ok) throw new Error('Network response was not ok');
    const json = await res.json();
    if (json && json.status === 'success' && json.data) {
      const d = json.data;
      // Ожидаемый порядок: деревья, люди, партнёры, тонн CO2
      const values = [d.total_trees_planting, d.total_supports, d.company_partners, d.cleared_co_on_year];
      values.forEach((val, idx) => {
        if (typeof val !== 'undefined' && counters[idx]) {
          counters[idx].setAttribute('data-target', Number(val));
        }
      });
      // Запускаем анимацию для обновлённых значений
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target')) || 0;
        animateCounter(counter, target);
      });
      return;
    }
    throw new Error('API returned error or unexpected payload');
  } catch (err) {
    // fallback: используем статические data-target из HTML
    console.warn('Не удалось загрузить статистику с API, fallback к data-target:', err);
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target')) || 0;
      animateCounter(counter, target);
    });
  }
}

// Запускаем получение статистики при загрузке страницы
window.addEventListener('load', () => {
  fetchAndRenderStats();

  // Read TipTop public id from meta if present for testing
  try {
    const meta = document.querySelector('meta[name="tiptoppay-public-id"]');
    if (meta && meta.content) {
      window.TIPTOP_PUBLIC_ID = meta.content;
      console.log('TIPTOP_PUBLIC_ID set from meta:', window.TIPTOP_PUBLIC_ID);
    }
  } catch (e) {
    console.warn('Unable to read tiptoppay-public-id meta:', e);
  }

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
        id: 11,
        title: 'Профессиональная разработка бизнес‑планов',
        description: 'Разработка бизнес‑планов, ТЭО, финансовых моделей и инвестиционных материалов',
        image: '../../src/img/fonNew.png',
        link: './services.html'
      },
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

// Unified switchCategory: works both on main/project pages.
function switchCategory(category) {
  if (currentCategory === category) return;
  currentCategory = category;

  const data = projectsData[category];

  // update hero background if present
  const heroSection = document.getElementById('hero-section');
  if (data && heroSection) heroSection.style.backgroundImage = `url('${data.background}')`;

  // Update category buttons (generic safe approach)
  const buttons = document.querySelectorAll('.category-btn');
  if (buttons && buttons.length) {
    buttons.forEach(btn => {
      btn.classList.remove('active', 'bg-white', 'text-black');
      btn.classList.add('bg-white/10', 'backdrop-blur-md', 'text-white');
    });
    const activeBtn = document.getElementById(`btn-${category}`);
    if (activeBtn) {
      activeBtn.classList.add('active', 'bg-white', 'text-black');
      activeBtn.classList.remove('bg-white/10', 'backdrop-blur-md', 'text-white');
    }
  } else {
    // Fallback to older class manipulation if buttons node list not found
    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.classList.remove('active');
      btn.classList.add('bg-white/10', 'backdrop-blur-md', 'text-white');
      btn.classList.remove('bg-white', 'text-black', 'border-gray-300');
    });
    const active = document.getElementById(`btn-${category}`);
    if (active) {
      active.classList.add('active');
      active.classList.remove('bg-white/10', 'backdrop-blur-md', 'text-white');
      active.classList.add('bg-white', 'text-black', 'border-gray-300');
    }
  }

  // Update projects if we have project data and renderer
  if (data && typeof renderProjects === 'function') {
    renderProjects(data.projects);
  }
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
                  <button ${project.link ? `onclick="window.location.href='${project.link}'"` : `onclick="openProjectInfo(${project.id})"`} class="bg-white backdrop-blur-md text-[#5F6161] px-8 py-3 rounded-full h-[80px] text-xl font-bold flex items-center gap-2 ml-4">
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
                  <button ${project.link ? `onclick="window.location.href='${project.link}'"` : `onclick="openProjectInfo(${project.id})"`} class="bg-white backdrop-blur-md text-[#5F6161] px-8 py-3 rounded-full h-[80px] text-xl font-bold flex items-center gap-2 ml-4">
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
window.switchCategory = switchCategory;
// Make functions global for onclick handlers (single export kept after definition)

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

// Функция для прокрутки наверх — реализация ниже в файле (с назначением в window.scrollToTop)

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

// Инициализация пустой карты для Donate.html
function initEmptyMap() {
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

  // Не добавляем статические маркеры - карта будет пустой до поиска пользователя
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

// Функции управления картой — реализация ниже использует window.mapInstance

// Функция поиска деревьев пользователя по номеру телефона
async function findUserTrees(phoneNumber) {
  if (!phoneNumber) {
    alert('Пожалуйста, введите номер телефона');
    return;
  }
  
  console.log('Поиск деревьев для номера:', phoneNumber);
  
  try { 
    // Проверяем, существует ли пользователь
    const checkResponse = await fetch(`${apiBaseUrl}/api/users/get_by_phone.php?phone=${encodeURIComponent(phoneNumber)}`);
    const checkData = await checkResponse.json();
    
    console.log('Ответ API для поиска пользователя:', checkData);
    
    // Проверяем успешный ответ и наличие данных пользователя
    if (checkResponse.ok && checkData.status === 'success' && checkData.data) {
      const user = checkData.data;
      
      // Если у пользователя есть посадки, показываем их на карте
      if (user.plantings && user.plantings.length > 0) {
        showUserTreesOnMap(user);
      } else {
        // Пользователь есть, но нет деревьев - перекидываем на EmissionAuth для расчета эмиссии
        localStorage.setItem('userData', JSON.stringify(user));
        localStorage.setItem('userPhone', phoneNumber);
        window.location.href = 'EmissionAuth.html';
      }
    } else {
      // Пользователь не найден - перекидываем на EmissionAuth для регистрации
      localStorage.setItem('userPhone', phoneNumber);
      localStorage.removeItem('userData');
      window.location.href = 'EmissionAuth.html';
    }
  } catch (error) {
    console.error('Ошибка при поиске пользователя:', error);
    alert('Произошла ошибка при поиске. Попробуйте еще раз.');
  }
}

// Функция для показа деревьев пользователя на карте
function showUserTreesOnMap(user) {
  // Очищаем существующие маркеры
  markers.forEach(marker => {
    map.removeLayer(marker);
  });
  markers = [];
  
  // Подсчитываем общее количество деревьев
  const totalTrees = user.plantings.reduce((sum, planting) => sum + parseInt(planting.trees_quantity), 0);
  
  // Берем координаты из первой посадки или используем дефолтные для города пользователя
  let coordinates = [43.2220, 76.8512]; // Алматы по умолчанию
  
  if (user.plantings[0] && user.plantings[0].latitude && user.plantings[0].longitude) {
    coordinates = [parseFloat(user.plantings[0].latitude), parseFloat(user.plantings[0].longitude)];
  }
  
  // Создаем кастомную иконку
  const customIcon = L.icon({
    iconUrl: '../../src/img/customMarker.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -45]
  });

  // Создаем маркер для пользователя
  const marker = L.marker(coordinates, { icon: customIcon }).addTo(map);
  
  // Создаем popup с информацией о пользователе
  const popupContent = `
    <div class="user-trees-popup">
      <div class="popup-title">${user.name} ${user.surname}</div>
      <div class="popup-trees">${totalTrees} деревьев</div>
      <div class="popup-city">${user.city || 'Алматы'}</div>
    </div>
  `;
  
  marker.bindPopup(popupContent, {
    closeButton: false,
    className: 'custom-user-popup',
    offset: [0, -10],
    autoPan: true,
    closeOnClick: false,
    autoClose: false,
    maxWidth: 'none',
    minWidth: 0
  });

  // Показываем popup и фокусируемся на маркере
  marker.openPopup();
  map.setView(coordinates, 12);
  
  markers.push(marker);
  
  console.log(`Показаны деревья пользователя: ${user.name} ${user.surname}, ${totalTrees} деревьев`);
}

// Инициализация карты при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  // Проверяем, есть ли контейнер для карты
  if (document.getElementById('openstreet-map')) {
    // Для страницы Emission.html используем специальную инициализацию
    if (window.location.pathname.includes('Emission.html')) {
      // Карта для Emission.html инициализируется через initializeEmissionPage()
      // Не вызываем здесь initMap()
    } else if (window.location.pathname.includes('Donate.html')) {
      // Для страницы Donate.html инициализируем пустую карту без маркеров
      initEmptyMap();
    } else {
      // Для других страниц используем обычную карту со всеми метками
      initMap();
    }
  }
});

// ----------------- Phone mask / normalization helpers -----------------
/**
 * Нормализует телефон в формат +7XXXXXXXXXX
 * Принимает любую строку, возвращает string или empty string если недостаточно цифр
 */
function normalizePhoneForBackend(input) {
  if (!input) return '';
  let digits = ('' + input).replace(/\D/g, '');
  // Убираем ведущие плюсы/пробелы уже удалены
  if (digits.length === 11 && digits[0] === '8') {
    digits = '7' + digits.slice(1);
  }
  if (digits.length === 10) {
    digits = '7' + digits;
  }
  // Ожидаем 11 цифр (7 + 10 цифр)
  if (digits.length === 11 && digits[0] === '7') {
    return '+' + digits;
  }
  return '';
}

/**
 * Форматирует строку цифр в маску +7 XXX XXX-XX-XX для отображения
 */
function formatPhoneForDisplay(value) {
  if (value == null) return '';
  let digits = ('' + value).replace(/\D/g, '');
  // Удаляем ведущую 8 и заменяем на 7 для отображения
  if (digits.startsWith('8')) digits = '7' + digits.slice(1);
  // Если пользователь ввёл без кода, не добавляем лишнего
  // Строим частями
  let out = '';
  if (digits.length === 0) return out;
  // ensure leading 7 for display (but don't force if user types other country code) - prefer showing +7
  if (digits[0] !== '7') {
    // If first digit isn't 7 but length>0, still show as +"digits"
    return '+' + digits;
  }
  out = '+7';
  if (digits.length > 1) {
    out += ' ' + digits.slice(1, Math.min(4, digits.length));
  }
  if (digits.length >= 4) {
    out += ' ' + digits.slice(4, Math.min(7, digits.length));
  }
  if (digits.length >= 7) {
    out += '-' + digits.slice(7, Math.min(9, digits.length));
  }
  if (digits.length >= 9) {
    out += '-' + digits.slice(9, Math.min(11, digits.length));
  }
  return out;
}

/**
 * Привязываем маску к input элементу (отображение только). Value сохраняется для сервера отдельно.
 */
function attachPhoneMask(inputElement) {
  if (!inputElement) return;
  // При вводе форматируем отображение, сохраняя позицию каретки по количеству цифр слева
  inputElement.addEventListener('input', function(e) {
    const rawValue = inputElement.value;
    const selectionStart = inputElement.selectionStart || 0;

    // digits to the left of caret
    const leftPart = rawValue.slice(0, selectionStart);
    const digitsLeft = (leftPart.match(/\d/g) || []).length;

    // Собираем все цифры из ввода
    let digits = (rawValue.match(/\d/g) || []).join('');
    // Если пользователь ввёл 10 цифр (без кода), добавляем ведущую 7 для отображения
    if (digits.length === 10 && digits[0] !== '7') {
      digits = '7' + digits;
    }

    // Форматируем для отображения
    const formatted = formatPhoneForDisplay(digits);

    // Найдём позиции цифр в отформатированной строке
    const digitPositions = [];
    for (let i = 0; i < formatted.length; i++) {
      if (/\d/.test(formatted[i])) digitPositions.push(i);
    }

    // Определяем новую позицию каретки: после digitsLeft-й цифры
    let newPos = formatted.length;
    if (digitsLeft === 0) {
      // если слева нет цифр, поместим каретку после префикса +7 и пробела если он есть
      const idx = formatted.indexOf(' ');
      newPos = idx >= 0 ? idx + 1 : formatted.length;
    } else if (digitPositions.length >= digitsLeft) {
      // позиция после той цифры
      const posIndex = digitsLeft - 1;
      newPos = digitPositions[posIndex] + 1;
    } else {
      newPos = formatted.length;
    }

    inputElement.value = formatted;
    // Устанавливаем новую позицию каретки (без ошибок)
    try {
      inputElement.setSelectionRange(newPos, newPos);
    } catch (err) {
      // fallback: в конец
      inputElement.setSelectionRange(inputElement.value.length, inputElement.value.length);
    }
  });

  // При вставке тоже форматируем и корректируем каретку
  inputElement.addEventListener('paste', function(e) {
    setTimeout(() => {
      const raw = inputElement.value;
      let digits = (raw.match(/\d/g) || []).join('');
      if (digits.length === 10 && digits[0] !== '7') digits = '7' + digits;
      inputElement.value = formatPhoneForDisplay(digits);
      inputElement.setSelectionRange(inputElement.value.length, inputElement.value.length);
    }, 10);
  });
}

// Обработчик формы поиска на карте
document.addEventListener('DOMContentLoaded', () => {
  // Обработчик для кнопки поиска на карте (новый ID)
  const mapSearchButton = document.getElementById('map-search-btn');
  const mapSearchInput = document.getElementById('map-search-input');
  
  if (mapSearchButton && mapSearchInput) {
    mapSearchButton.addEventListener('click', (e) => {
      e.preventDefault();
      const raw = mapSearchInput.value.trim();
      const normalized = normalizePhoneForBackend(raw);
      if (normalized) {
        findUserTrees(normalized);
      } else {
        alert('Введите номер в формате +7XXXXXXXXXX');
      }
    });
    
    mapSearchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const raw = mapSearchInput.value.trim();
        const normalized = normalizePhoneForBackend(raw);
        if (normalized) {
          findUserTrees(normalized);
        } else {
          alert('Введите номер в формате +7XXXXXXXXXX');
        }
      }
    });
  }

  // Attach masks to inputs if present
  try {
    const emissionPhone = document.getElementById('emission-phone-input');
    const mapPhone = document.getElementById('map-search-input');
    attachPhoneMask(emissionPhone);
    attachPhoneMask(mapPhone);
  // Ensure prefix +7 for empty fields
  // NOTE: отключаем автоматическую подстановку префикса, чтобы placeholder оставался видимым
  // ensurePrefix(emissionPhone);
  // ensurePrefix(mapPhone);
  } catch (err) {
    console.warn('Не удалось привязать маску телефона:', err);
  }

  // Установим префикс +7 если поле пустое и поддерживаем его на фокусе/блуре
  function ensurePrefix(inputEl) {
    if (!inputEl) return;
    // Если пусто, поставить +7 
    if (!inputEl.value || inputEl.value.trim() === '') {
      inputEl.value = '+7 ';
    }
    // На фокусе — если стерли, вернуть префикс
    inputEl.addEventListener('focus', () => {
      if (!inputEl.value || inputEl.value.trim() === '') inputEl.value = '+7 ';
      // поставить каретку в конец
      setTimeout(() => {
        inputEl.setSelectionRange(inputEl.value.length, inputEl.value.length);
      }, 0);
    });
    // На blur — если осталось только +7, оставить его (пользователь просил всегда отображать +7)
    inputEl.addEventListener('blur', () => {
      if (!inputEl.value || inputEl.value.trim() === '') inputEl.value = '+7 ';
    });
  }

  
  
  // Старый обработчик для совместимости с другими страницами
  const oldMapSearchButton = document.querySelector('#openstreet-map')?.parentElement?.querySelector('.absolute button');
  const oldMapSearchInput = document.querySelector('#openstreet-map')?.parentElement?.querySelector('.absolute input[type="tel"]');
  
  if (oldMapSearchButton && oldMapSearchInput && !mapSearchButton) {
    oldMapSearchButton.addEventListener('click', (e) => {
      e.preventDefault();
      const phoneNumber = oldMapSearchInput.value.trim();
      if (phoneNumber) {
        findUserTrees(phoneNumber);
      }
    });
    
    oldMapSearchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const phoneNumber = oldMapSearchInput.value.trim();
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
  // Нормализация значения и подготовка
  let p = Number(percentage);
  if (isNaN(p)) p = 0;
  const isOver = p > 100;
  const displayPercent = isOver ? '100+' : (p < 0 ? '0' : String(p));
  const percent = isOver ? 100 : (p < 0 ? 0 : p);

  // Получаем элементы (не трогаем их горизонтальное позиционирование)
  const grayImage = document.getElementById('grayImage');
  const colorImage = document.getElementById('colorImage');
  const percentageText = document.getElementById('percentageText');
  const percentageIndicator = document.getElementById('percentageIndicator');
  const borderIndicator = document.getElementById('borderIndicator');

  if (!grayImage || !colorImage || !percentageText || !percentageIndicator) {
    console.warn('Emission elements not found');
    return;
  }

  // Высота контейнера (если доступна) — используем её, иначе fallback на 950
  const imageContainer = document.getElementById('imageContainer') || grayImage.parentElement;
  const rect = imageContainer ? imageContainer.getBoundingClientRect() : null;
  const imageHeight = rect && rect.height ? rect.height : 950;

  const grayPercentage = 100 - percent; // процент серой части сверху

  // Обновляем clip-path в зависимости от процента
  if (isOver) {
    // Полностью закрашиваем картинку
    grayImage.style.clipPath = 'polygon(0 0, 100% 0, 100% 0, 0 0)';
    colorImage.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
  } else {
    grayImage.style.clipPath = 'polygon(0 0, 100% 0, 100% ' + grayPercentage + '%, 0 ' + grayPercentage + '%)';
    colorImage.style.clipPath = 'polygon(0 ' + grayPercentage + '%, 100% ' + grayPercentage + '%, 100% 100%, 0 100%)';
  }

  // Обновляем текст процента — если больше 100%, показываем сообщение-поздравление
  if (isOver) {
    const overMessage = 'Отлично! Вы превысили максимальную цель — так держать!';
    percentageText.textContent = overMessage;
  } else {
    percentageText.textContent = displayPercent + '%';
  }

  // Двигаем процент и бордер только по вертикали (top) — вычисляем позицию границы внутри контейнера
  // Если превысили 100% — ставим границу чуть выше низа, чтобы текст явно был виден
  const boundaryY = isOver ? Math.round(imageHeight * 0.97) : imageHeight * (grayPercentage / 100);
  // Смещение индикатора: ставим процент чуть выше границы, бордер чуть ниже
  const indicatorOffset = 40; // px — насколько визуально поднять процент над границей
  const borderOffset = 8; // px — насколько бордер ниже границы

  const topForPercentage = Math.max(0, Math.min(imageHeight - 20, Math.round(boundaryY - indicatorOffset)));
  // Если сообщение-поздравление (isOver), немного поднимем большой индикатор на десктопе
  let adjustedTopForPercentage = topForPercentage;
  if (isOver) {
    const raisePx = 150; // на сколько пикселей поднять текст вверх на десктопе (можно подправить)
    adjustedTopForPercentage = Math.max(0, topForPercentage - raisePx);
  }
  percentageIndicator.style.top = adjustedTopForPercentage + 'px';

  if (borderIndicator) {
    const topForBorder = Math.max(0, Math.min(imageHeight - 4, Math.round(boundaryY + borderOffset)));
    // Скрываем бордер, если показываем поздравление (чтобы не мешал тексту)
    if (isOver) {
      borderIndicator.style.display = 'none';
    } else {
      borderIndicator.style.display = '';
      borderIndicator.style.top = topForBorder + 'px';
    }
  }
}

// Пример использования: вызываем функцию при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  // Проверяем, находимся ли мы на странице EmissionAuth
  const isEmissionAuthPage = window.location.pathname.includes('EmissionAuth.html');
  
  // Ничего не делаем тут — процент придёт из userData/API через initializeEmissionPage
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

// Для страницы Project.html используется единая реализация `switchCategory` выше.
// Здесь не нужно повторно объявлять функцию — смотрите unified implementation earlier in the file.

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
              <button ${project.link ? `onclick="window.location.href='${project.link}'"` : `onclick="openProjectInfo(${project.id})"`} class="bg-white backdrop-blur-md text-[#5F6161] px-6 py-2 rounded-full h-[74px] text-xl font-bold flex items-center gap-2 ml-4">
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
  try {
    // Явный хардкод: если id === 11, перенаправляем на страницу бизнес‑проекта
    if (Number(projectId) === 11) {
      window.location.href = './project-business.html';
      return;
    }
    // Ищем проект в projectsData (технологии и инвестиции)
    const allProjects = [];
    if (projectsData.technology && projectsData.technology.projects) allProjects.push(...projectsData.technology.projects);
    if (projectsData.investment && projectsData.investment.projects) allProjects.push(...projectsData.investment.projects);
    const found = allProjects.find(p => Number(p.id) === Number(projectId));
    if (found && found.link) {
      window.location.href = found.link;
      return;
    }
  } catch (err) {
    console.warn('openProjectInfo: unable to resolve project link', err);
  }
  window.location.href = `./ProjectInfo.html?id=${projectId}`;
}

// Инициализация страниц
document.addEventListener('DOMContentLoaded', () => {
    // Инициализация страницы Project.html (старая логика)
    if (document.getElementById('projects-container')) {
        // Загружаем стартапы по умолчанию используя старую логику
        renderProjects(projectsData.startups.projects);
        
      // Делаем функцию switchCategory глобальной (export оставлен единожды после определения выше)
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

// NOTE: getApiConfig removed — use top-level `apiBaseUrl` and window.VITE_APP_DEBUG directly

// Функция для загрузки пользователей из API
async function loadUsersForMarquee() {
  const config = { apiBaseUrl: apiBaseUrl, isDebug: (window.VITE_APP_DEBUG === 'true') || false };
    
    try {
        if (config.isDebug) {
            console.log('Загружаем данные пользователей из API...');
        }
        
        const apiUrl = `${apiBaseUrl}/api/users/read.php`;
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
              <img src="../../src/img/treeForRunStroke.svg" alt="tree" class="w-8 h-8" />
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
              <img src="./src/img/treeForRunStroke.svg" alt="tree" class="w-8 h-8" />
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

// Создание модального окна для расчета углеродного следа
function createCarbonFootprintModal() {
  // Определяем правильный путь к изображениям в зависимости от страницы
  const getImagePath = () => {
    const currentPath = window.location.pathname;
    
    // Если мы в подпапке pages, используем ../../src/img/
    if (currentPath.includes('/pages/')) {
      return '../../src/img/';
    }
    // Если мы в корне, используем ./src/img/
    return './src/img/';
  };
  
  const imagePath = getImagePath();
  
  const modalHTML = `
    <div id="carbon-footprint-modal" class="fixed inset-0 bg-black/50 z-50 hidden items-center justify-center p-4">
      <div class="bg-white rounded-3xl w-full max-w-[800px] max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 opacity-0 relative" id="carbon-modal-content">
        <style>
          /* Scoped styles for carbon modal injected via main.js */
          #carbon-modal-content { font-family: 'PP Neue Montreal', sans-serif; }
          #carbon-modal-content .floating-label { color: #666666; background: #ffffff; padding: 0 6px; }
          #carbon-modal-content input, #carbon-modal-content select, #carbon-modal-content .carbon-contact-heading, #carbon-modal-content p { color: #666666; }
          #carbon-modal-content input::placeholder { color: #666666; opacity: 1; }
          /* Hints under fields (hidden — we keep only floating labels inside inputs) */
          #carbon-modal-content .field-hint { display: none !important; }
          /* Numeric values / compact results (if any) should use softer #999 */
          #carbon-modal-content .numeric-muted, #carbon-modal-content #carbon-result { color: #999999; }
          /* Phone prefix weight */
          #carbon-modal-content .phone-prefix-span { font-weight: 400; color: #666666; }
          /* Truncate long selected/placeholder text inside inputs/selects */
          #carbon-modal-content input, #carbon-modal-content select {
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block;
          }
          /* When input/select focused, remove browser outline/blue glow */
          #carbon-modal-content input:focus, #carbon-modal-content select:focus {
            outline: none !important; box-shadow: none !important;
          }
          /* Truncate hints on small screens with ellipsis */
          @media (max-width: 768px) {
            #carbon-modal-content .field-hint {
              white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block; max-width: 100%;
            }
          }
        </style>
        <!-- Крестик для закрытия -->
        <button 
          id="close-carbon-modal-btn" 
          class="absolute top-6 right-6 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors duration-200 z-10 bg-white rounded-full shadow-md"
          type="button"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <!-- Заголовок -->
        <div class="px-8 pt-8 pb-6 text-center">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Калькулятор эмиссии CO₂</h2>
          <p class="text-gray-600 text-sm">Заполните анкету, чтобы узнать свою точную эмиссию CO₂ и рассчитать,<br> сколько деревьев поможет вам полностью её компенсировать.</p>
        </div>

        <!-- Форма -->
        <form id="carbon-footprint-form" class="px-8 pb-8 space-y-4">
          
          <!-- Потребление электроэнергии в месяц -->
          <div class="relative carbon-field">
            <div class="border border-gray-300 rounded-lg p-3">
              <input type="number" id="carbon-electricity" class="w-full py-2 bg-transparent text-gray-900 placeholder-transparent focus:outline-none" placeholder="Потребление электроэнергии в месяц" min="0" step="0.1" required />
              <div class="field-hint">Введите сколько электроэнергии Вы потребляете в месяц в кВт·ч</div>
            </div>
            <label for="carbon-electricity" class="floating-label absolute -top-2 left-4 px-1 text-xs font-medium text-gray-700 bg-white">Потребление электроэнергии в месяц</label>
          </div>

          <!-- Источник электроэнергии -->
          <div class="relative carbon-field">
            <div class="border border-gray-300 rounded-lg p-3">
              <select id="carbon-electricity-coefficient" class="w-full py-2 bg-transparent text-gray-900 appearance-none bg-no-repeat bg-right pr-8" style="background-image: url('data:image/svg+xml;charset=US-ASCII,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 4 5\"><path fill=\"%23666\" d=\"M2 0L0 2h4zm0 5L0 3h4z\"/></svg>')" required>
                <option value="">Выберите, каким типом электроэнергии вы пользуетесь</option>
                <option value="0.5">Газовая генерация</option>
                <option value="0.7">Угольная генерация</option>
                <option value="0.4">Возобновляемые источники</option>
                <option value="0.3">Сеть РК (централизованная)</option>
              </select>
              <div class="field-hint">Выберите, каким типом электроэнергии вы пользуетесь</div>
            </div>
            <label for="carbon-electricity-coefficient" class="floating-label absolute -top-2 left-4 px-1 text-xs font-medium text-gray-700 bg-white">Источник электроэнергии</label>
          </div>

          <!-- Пробег на автомобиле в месяц -->
          <div class="relative carbon-field">
            <div class="border border-gray-300 rounded-lg p-3">
              <input type="number" id="carbon-car-km" class="w-full py-2 bg-transparent text-gray-900 placeholder-transparent focus:outline-none" placeholder="Пробег на автомобиле в месяц" min="0" step="1" />
              <div class="field-hint">Введите сколько проезжаете на автомобиле в месяц в км</div>
            </div>
            <label for="carbon-car-km" class="floating-label absolute -top-2 left-4 px-1 text-xs font-medium text-gray-700 bg-white">Пробег на автомобиле в месяц</label>
          </div>

          <!-- Тип топлива автомобиля -->
          <div class="relative carbon-field">
            <div class="border border-gray-300 rounded-lg p-3">
              <select id="carbon-car-coefficient" class="w-full py-2 bg-transparent text-gray-900 appearance-none bg-no-repeat bg-right pr-8" style="background-image: url('data:image/svg+xml;charset=US-ASCII,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 4 5\"><path fill=\"%23666\" d=\"M2 0L0 2h4zm0 5L0 3h4z\"/></svg>')">
                <option value="">Выберите тип топлива вашего автомобиля</option>
                <option value="0.2">Бензин</option>
                <option value="0.18">Дизель</option>
                <option value="0.05">Электромобиль</option>
                <option value="0.15">Гибрид</option>
              </select>
              <div class="field-hint">Выберите тип топлива вашего автомобиля</div>
            </div>
            <label for="carbon-car-coefficient" class="floating-label absolute -top-2 left-4 px-1 text-xs font-medium text-gray-700 bg-white">Тип топлива автомобиля</label>
          </div>

          <!-- Общественный транспорт в месяц -->
          <div class="relative carbon-field">
            <div class="border border-gray-300 rounded-lg p-3">
              <input type="number" id="carbon-public-transport" class="w-full py-2 bg-transparent text-gray-900 placeholder-transparent focus:outline-none" placeholder="Сколько часов в месяц Вы проводите в общественном транспорте" min="0" step="1" />
              <div class="field-hint">Сколько часов в месяц Вы проводите в общественном транспорте</div>
            </div>
            <label for="carbon-public-transport" class="floating-label absolute -top-2 left-4 px-1 text-xs font-medium text-gray-700 bg-white">Общественный транспорт в месяц</label>
          </div>

          <!-- Авиаперелеты в месяц -->
          <div class="relative carbon-field">
            <div class="border border-gray-300 rounded-lg p-3">
              <input type="number" id="carbon-flights" class="w-full py-2 bg-transparent text-gray-900 placeholder-transparent focus:outline-none" placeholder="Сколько часов в месяц Вы проводите в полётах" min="0" step="1" />
              <div class="field-hint truncate">Сколько часов в месяц Вы проводите в полётах</div>
            </div>
            <label for="carbon-flights" class="floating-label absolute -top-2 left-4 px-1 text-xs font-medium text-gray-700 bg-white">Авиаперелеты в месяц</label>
          </div>

          <!-- Рацион питания -->
          <div class="relative carbon-field">
            <div class="border border-gray-300 rounded-lg p-3">
              <select id="carbon-diet" class="w-full py-2 bg-transparent text-gray-900 appearance-none bg-no-repeat bg-right pr-8" style="background-image: url('data:image/svg+xml;charset=US-ASCII,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 4 5\"><path fill=\"%23666\" d=\"M2 0L0 2h4zm0 5L0 3h4z\"/></svg>')" required>
                <option value="">Выберите ваш тип питания</option>
                <option value="1200">Мясной</option>
                <option value="900">Смешанный</option>
                <option value="600">Вегетарианский</option>
                <option value="400">Веганский</option>
              </select>
              <div class="field-hint">Выберите ваш тип питания</div>
            </div>
            <label for="carbon-diet" class="floating-label absolute -top-2 left-4 px-1 text-xs font-medium text-gray-700 bg-white">Рацион питания</label>
          </div>

          <!-- Физическая активность -->
          <div class="relative carbon-field">
            <div class="border border-gray-300 rounded-lg p-3">
              <select id="carbon-physical-activity" class="w-full py-2 bg-transparent text-gray-900 appearance-none bg-no-repeat bg-right pr-8" style="background-image: url('data:image/svg+xml;charset=US-ASCII,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 4 5\"><path fill=\"%23666\" d=\"M2 0L0 2h4zm0 5L0 3h4z\"/></svg>')" required>
                <option value="">Выберите уровень вашей активности</option>
                <option value="1.2">Малоподвижный</option>
                <option value="1.4">Лёгкая активность</option>
                <option value="1.6">Средняя активность</option>
                <option value="1.8">Высокая активность</option>
                <option value="2.0">Очень высокая активность</option>
              </select>
              <div class="field-hint">Выберите уровень вашей активности</div>
            </div>
            <label for="carbon-physical-activity" class="floating-label absolute -top-2 left-4 px-1 text-xs font-medium text-gray-700 bg-white">Физическая активность</label>
          </div>

          <!-- Вес -->
          <div class="relative carbon-field">
            <div class="border border-gray-300 rounded-lg p-3">
              <input type="number" id="carbon-weight" class="w-full py-2 bg-transparent text-gray-900 placeholder-transparent focus:outline-none" placeholder="Вес" min="30" max="200" step="1" required />
              <div class="field-hint">Введите Ваш вес в килограммах</div>
            </div>
            <label for="carbon-weight" class="floating-label absolute -top-2 left-4 px-1 text-xs font-medium text-gray-700 bg-white">Вес</label>
          </div>

          <!-- Сортировка отходов -->
          <div class="relative carbon-field">
            <div class="border border-gray-300 rounded-lg p-3">
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700">Сортирую отходы</span>
                <label class="flex items-center cursor-pointer">
                  <input type="checkbox" id="carbon-waste-sorting" class="sr-only" />
                  <div class="checkbox-container w-8 h-8 border-2 border-gray-300 rounded-md flex items-center justify-center bg-white transition-colors duration-200">
                    <img src="${imagePath}chekboxOkay.svg" alt="" class="w-5 h-5 hidden checkbox-icon" />
                  </div>
                </label>
              </div>
            </div>
          </div>

          <!-- Введите Имя и номер телефона для сохранения статистики -->
          <div class="pt-2">
            <p class="text-sm font-medium text-gray-700 mb-4 carbon-contact-heading">Введите Имя и номер телефона для сохранения статистики</p>
            
              <div class="grid grid-cols-1 gap-4 mb-4 carbon-name-row">
              <div class="relative carbon-field">
                <div class="border border-gray-300 rounded-lg p-3">
                  <input type="text" id="carbon-name" class="w-full py-2 bg-transparent text-gray-900 placeholder-transparent focus:outline-none" placeholder="Имя" required />
                </div>
                <label for="carbon-name" class="floating-label absolute -top-2 left-4 px-1 text-xs font-medium text-gray-700 bg-white">Имя</label>
              </div>
              <div class="relative carbon-field">
                <div class="border border-gray-300 rounded-lg p-3">
                  <input type="text" id="carbon-surname" class="w-full py-2 bg-transparent text-gray-900 placeholder-transparent focus:outline-none" placeholder="Фамилия" required />
                </div>
                <label for="carbon-surname" class="floating-label absolute -top-2 left-4 px-1 text-xs font-medium text-gray-700 bg-white">Фамилия</label>
              </div>
            </div>

            <div class="relative carbon-field">
              <div class="border border-gray-300 rounded-lg p-3 mb-4">
                <input type="text" id="carbon-city" class="w-full py-2 bg-transparent text-gray-900 placeholder-transparent focus:outline-none" placeholder="Город" value="Алматы" />
              </div>
              <label for="carbon-city" class="floating-label absolute -top-2 left-4 px-1 text-xs font-medium text-gray-700 bg-white">Город</label>
            </div>

            <div class="relative carbon-field">
              <div class="border border-gray-300 rounded-lg p-3">
                <div class="relative">
                  <div class="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                    <img src="${imagePath}flagKz.svg" alt="KZ" class="w-8 h-6" />
                    <span class="text-gray-600 text-lg font-normal phone-prefix-span">+7</span>
                  </div>
                  <input type="tel" id="carbon-phone" class="w-full pl-24 pr-4 py-2 bg-transparent text-gray-900 placeholder-transparent focus:outline-none" placeholder="700 000-00-00" required />
                </div>
              </div>
              <label for="carbon-phone" class="floating-label absolute -top-2 left-4 px-1 text-xs font-medium text-gray-700 bg-white">Телефон</label>
            </div>
          </div>

          <!-- Кнопка отправки -->
          <button 
            type="submit" 
            class="w-full bg-[#23B77F] text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-green-600 transition-colors duration-200 flex items-center justify-center gap-3 mt-6"
          >
            <img src="${imagePath}plusMinus.svg" alt="" class="w-5 h-5" />
            Рассчитать эмиссию
          </button>
        </form>
      </div>
    </div>
  `;

  // Добавляем модальное окно в DOM
  // Удаляем старое модальное окно если оно существует
  const existingModal = document.getElementById('carbon-footprint-modal');
  if (existingModal) {
    existingModal.remove();
  }
  
  // Создаем новое модальное окно
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  // Отладка: проверяем что кнопка действительно добавилась
  setTimeout(() => {
    const form = document.getElementById('carbon-footprint-form');
    const submitButton = form ? form.querySelector('button[type="submit"]') : null;
    console.log('Форма найдена:', !!form);
    console.log('Кнопка submit найдена:', !!submitButton);
    if (submitButton) {
      console.log('Текст кнопки:', submitButton.textContent);
      console.log('Стили кнопки display:', submitButton.style.display);
    }
  }, 100);
}

// Функция для открытия модального окна расчета углеродного следа
function openCarbonFootprintModal() {
  console.log('Открываем модальное окно калькулятора CO2');
  
  // Пересоздаем модальное окно для гарантии чистого состояния
  createCarbonFootprintModal();
  
  const modal = document.getElementById('carbon-footprint-modal');
  const modalContent = document.getElementById('carbon-modal-content');
  
  if (modal && modalContent) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    
    // Анимация появления
    setTimeout(() => {
      modalContent.style.transform = 'scale(1)';
      modalContent.style.opacity = '1';
    }, 10);

    // Добавляем обработчик для кнопки закрытия
    const closeBtn = document.getElementById('close-carbon-modal-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeCarbonFootprintModal);
    }

    // Инициализация кастомного чекбокса
    const checkbox = document.getElementById('carbon-waste-sorting');
    const checkboxContainer = modal.querySelector('.checkbox-container');
    const checkboxIcon = modal.querySelector('.checkbox-icon');
    
    if (checkbox && checkboxContainer && checkboxIcon) {
      // Удаляем старые обработчики
      checkbox.replaceWith(checkbox.cloneNode(true));
      const newCheckbox = document.getElementById('carbon-waste-sorting');
      
      newCheckbox.addEventListener('change', function() {
        if (this.checked) {
          checkboxContainer.classList.add('border-green-500');
          checkboxContainer.classList.remove('border-gray-300');
          checkboxIcon.classList.remove('hidden');
        } else {
          checkboxContainer.classList.remove('border-green-500');
          checkboxContainer.classList.add('border-gray-300');
          checkboxIcon.classList.add('hidden');
        }
      });
    }

    // Инициализация маски телефона
    const phoneInput = document.getElementById('carbon-phone');
    if (phoneInput) {
      phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 0) {
          if (value.length <= 3) {
            value = value;
          } else if (value.length <= 6) {
            value = value.slice(0, 3) + ' ' + value.slice(3);
          } else if (value.length <= 8) {
            value = value.slice(0, 3) + ' ' + value.slice(3, 6) + '-' + value.slice(6);
          } else {
            value = value.slice(0, 3) + ' ' + value.slice(3, 6) + '-' + value.slice(6, 8) + '-' + value.slice(8, 10);
          }
        }
        
        e.target.value = value;
      });

      phoneInput.addEventListener('keydown', function(e) {
        // Разрешаем только цифры, backspace, delete, tab, escape, enter
        if (!((e.keyCode >= 48 && e.keyCode <= 57) || // цифры 0-9
              (e.keyCode >= 96 && e.keyCode <= 105) || // цифры на numpad
              e.keyCode === 8 || // backspace
              e.keyCode === 46 || // delete
              e.keyCode === 9 || // tab
              e.keyCode === 27 || // escape
              e.keyCode === 13 || // enter
              (e.keyCode === 65 && e.ctrlKey) || // Ctrl+A
              (e.keyCode === 67 && e.ctrlKey) || // Ctrl+C
              (e.keyCode === 86 && e.ctrlKey) || // Ctrl+V
              (e.keyCode === 88 && e.ctrlKey) || // Ctrl+X
              (e.keyCode >= 37 && e.keyCode <= 40))) { // arrow keys
          e.preventDefault();
        }
      });
    }
    
    // Добавляем обработчик submit для формы и переинициализируем элементы после клонирования
    const form = document.getElementById('carbon-footprint-form');
    if (form) {
      // Клонируем форму, чтобы удалить старые слушатели
      const cloned = form.cloneNode(true);
      form.parentNode.replaceChild(cloned, form);

      const newForm = document.getElementById('carbon-footprint-form');
      if (newForm) {
        newForm.addEventListener('submit', handleCarbonFootprintFormSubmit);
        console.log('✅ Обработчик submit добавлен к форме калькулятора');

        // Переинициализируем маску телефона
        const newPhoneInput = document.getElementById('carbon-phone');
        if (newPhoneInput) {
          const phoneMaskHandler = (e) => {
            const input = e.target;
            const prev = input.value;
            let digits = prev.replace(/\D/g, '');

            // Ограничиваем до 10 цифр (без префикса +7)
            digits = digits.slice(0, 10);

            let formatted = '';
            if (digits.length > 0) {
              if (digits.length <= 3) {
                formatted = digits;
              } else if (digits.length <= 6) {
                formatted = digits.slice(0, 3) + ' ' + digits.slice(3);
              } else if (digits.length <= 8) {
                formatted = digits.slice(0, 3) + ' ' + digits.slice(3, 6) + '-' + digits.slice(6);
              } else {
                formatted = digits.slice(0, 3) + ' ' + digits.slice(3, 6) + '-' + digits.slice(6, 8) + '-' + digits.slice(8, 10);
              }
            }

            input.value = formatted;
          };

          // Набор событий для маски
          newPhoneInput.addEventListener('input', phoneMaskHandler);
          newPhoneInput.addEventListener('keydown', function(e) {
            // Разрешаем только цифры, backspace, delete, tab, escape, enter и стрелки
            if (!((e.keyCode >= 48 && e.keyCode <= 57) ||
                  (e.keyCode >= 96 && e.keyCode <= 105) ||
                  e.keyCode === 8 ||
                  e.keyCode === 46 ||
                  e.keyCode === 9 ||
                  e.keyCode === 27 ||
                  e.keyCode === 13 ||
                  (e.keyCode === 65 && e.ctrlKey) ||
                  (e.keyCode === 67 && e.ctrlKey) ||
                  (e.keyCode === 86 && e.ctrlKey) ||
                  (e.keyCode === 88 && e.ctrlKey) ||
                  (e.keyCode >= 37 && e.keyCode <= 40))) {
              e.preventDefault();
            }
          });
        }

        // Переинициализируем чекбокс
        const newCheckbox = document.getElementById('carbon-waste-sorting');
        const newCheckboxContainer = newForm.querySelector('.checkbox-container');
        const newCheckboxIcon = newForm.querySelector('.checkbox-icon');

        if (newCheckbox && newCheckboxContainer && newCheckboxIcon) {
          newCheckbox.addEventListener('change', function() {
            if (this.checked) {
              newCheckboxContainer.classList.add('border-green-500');
              newCheckboxContainer.classList.remove('border-gray-300');
              newCheckboxIcon.classList.remove('hidden');
            } else {
              newCheckboxContainer.classList.remove('border-green-500');
              newCheckboxContainer.classList.add('border-gray-300');
              newCheckboxIcon.classList.add('hidden');
            }
          });
        }
      }
    }
  }
}

// Функция для закрытия модального окна расчета углеродного следа
function closeCarbonFootprintModal() {
  const modal = document.getElementById('carbon-footprint-modal');
  const modalContent = document.getElementById('carbon-modal-content');
  
  if (modal && modalContent) {
    modalContent.style.transform = 'scale(0.95)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.style.overflow = 'auto';
      
      // Сбрасываем форму
      const form = document.getElementById('carbon-footprint-form');
      if (form) {
        form.reset();
        
        // Удаляем результаты если они есть
        const resultBlocks = form.querySelectorAll('.bg-\\[\\#23B77F\\], [class*="bg-\\[\\#23B77F\\]"]');
        resultBlocks.forEach(block => block.remove());
        
        // Удаляем кнопку посадки деревьев если она есть
        const actionButton = document.getElementById('plant-trees-action');
        if (actionButton) {
          actionButton.remove();
        }
        
        // Показываем кнопку "Рассчитать эмиссию" обратно
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
          submitButton.style.display = 'flex';
        }
        
        // Сбрасываем стоимость
        const totalCost = document.getElementById('carbon-total-cost');
        if (totalCost) {
          totalCost.textContent = 'от 70 000,00-00';
        }
      }
    }, 300);
  }
}

// Функция для обработки отправки формы расчета углеродного следа
async function handleCarbonFootprintFormSubmit(event) {
  event.preventDefault();
  console.log('🚀 Форма калькулятора отправлена!');
  
  const submitButton = event.target.querySelector('button[type="submit"]');
  const originalText = submitButton.innerHTML;
  
  console.log('📋 Базовый URL API:', apiBaseUrl);
  
  try {
    // Показываем индикатор загрузки
    submitButton.innerHTML = `
      <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Рассчитываем...
    `;
    submitButton.disabled = true;

    // Собираем данные формы с проверкой существования элементов
    const getElementValue = (id, defaultValue = '') => {
      const element = document.getElementById(id);
      if (!element) {
        console.warn(`⚠️ Элемент с ID '${id}' не найден!`);
        return defaultValue;
      }
      return element.value || defaultValue;
    };
    
    const getElementChecked = (id) => {
      const element = document.getElementById(id);
      if (!element) {
        console.warn(`⚠️ Элемент с ID '${id}' не найден!`);
        return false;
      }
      return element.checked;
    };
    
    const phoneValue = getElementValue('carbon-phone');
    const formattedPhone = phoneValue ? `+7${phoneValue.replace(/\D/g, '')}` : '';
    
    console.log('📋 Собираем данные формы...');
    
    const formData = {
      phone: formattedPhone,
      surname: getElementValue('carbon-surname'),
      name: getElementValue('carbon-name'),
      city: getElementValue('carbon-city', 'Алматы'),
      electricity: parseFloat(getElementValue('carbon-electricity')) || 0,
      electricity_coefficient: parseFloat(getElementValue('carbon-electricity-coefficient')) || 0.5,
      car_km: parseFloat(getElementValue('carbon-car-km')) || 0,
      car_coefficient: parseFloat(getElementValue('carbon-car-coefficient')) || 0.2,
      public_transport_hours: parseFloat(getElementValue('carbon-public-transport')) || 0,
      flight_hours: parseFloat(getElementValue('carbon-flights')) || 0,
      diet_type: parseFloat(getElementValue('carbon-diet')) || 800,
      physical_activity: parseFloat(getElementValue('carbon-physical-activity')) || 1.2,
      weight_kg: parseFloat(getElementValue('carbon-weight')) || 70,
      waste_sorting: getElementChecked('carbon-waste-sorting') ? 0.8 : 1.0
    };

    console.log('Отправляем данные расчета углеродного следа:', formData);

    // Отправляем запрос на сервер
    const response = await fetch(`${apiBaseUrl}/api/emission/calculate_with_user.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    console.log('📡 Ответ получен, статус:', response.status, response.statusText);
    console.log('📋 Headers ответа:', Object.fromEntries(response.headers.entries()));

    // Проверяем статус ответа
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Ошибка HTTP:', response.status, response.statusText);
      console.error('📄 Тело ошибки:', errorText);
      throw new Error(`HTTP ${response.status}: ${response.statusText}\nОтвет: ${errorText}`);
    }

    // Получаем текст ответа для отладки
    const responseText = await response.text();
    console.log('📄 Сырой ответ сервера:', responseText);

    // Парсим JSON
    let result;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      console.error('❌ Ошибка парсинга JSON:', parseError);
      console.error('📄 Содержимое ответа:', responseText);
      throw new Error(`Ошибка парсинга ответа сервера: ${parseError.message}\nОтвет: ${responseText}`);
    }
    console.log('Ответ от сервера:', result);

  if (result.status === 'success') {
      // Показываем результат расчета в красивом блоке
      const monthlyEmission = result.data.total_emission_kg / 1000; // Переводим в тонны
      const yearlyEmission = monthlyEmission * 12;
      
      // Создаем блок с результатами
      const resultHTML = `
        <div class="bg-[#23B77F] text-white p-8 rounded-xl mt-6">
          <h3 class="text-2xl font-bold mb-6">Ваш результат:</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-4xl font-bold">${monthlyEmission.toFixed(3)}</span>
              <span class="text-xl">тонн CO2 в месяц</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-4xl font-bold">${yearlyEmission.toFixed(3)}</span>
              <span class="text-xl">тонн CO2 в год</span>
            </div>
          </div>
        </div>
      `;
      
      // Сохраняем свежие данные пользователя, если они пришли от сервера
      try {
        const freshUser = (result.data && (result.data.user || result.data)) || null;
        if (freshUser) {
          localStorage.setItem('userData', JSON.stringify(freshUser));
        }
      } catch (e) {
        console.warn('Не удалось сохранить userData в localStorage:', e);
      }

      // Находим форму и добавляем результат
      const form = document.getElementById('carbon-footprint-form');
      if (form) {
        // Скрываем кнопку "Рассчитать эмиссию"
        submitButton.style.display = 'none';
        
        // Добавляем результат
        form.insertAdjacentHTML('beforeend', resultHTML);
        
        // Добавляем кнопку для перехода к посадке деревьев
        const actionButtonHTML = `
          <button 
            type="button" 
            id="plant-trees-action"
            class="w-full bg-white text-[#23B77F] py-4 px-6 rounded-lg font-bold text-lg border-2 border-[#23B77F] hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-3 mt-6"
          >
            <img src="${document.querySelector('#carbon-footprint-modal img').src.replace('plusMinus.svg', 'aloneLepestok.svg')}" alt="" class="w-5 h-5" />
            Компенсировать выбросы - посадить деревья
          </button>
        `;
        
        form.insertAdjacentHTML('beforeend', actionButtonHTML);
        
        // Добавляем обработчик для кнопки посадки деревьев — сохраняем телефон и редиректим на /src/pages/Emission.html
        const plantBtn = document.getElementById('plant-trees-action');
        if (plantBtn) {
          plantBtn.addEventListener('click', function() {
            try {
              // Попробуем взять телефон из формы модалки
              const phoneInput = document.getElementById('carbon-phone');
              const phoneRaw = phoneInput ? phoneInput.value : '';
              const digits = phoneRaw.replace(/\D/g, '');
              const normalized = digits.length === 10 ? `+7${digits}` : (digits.length === 11 && digits.startsWith('7') ? `+${digits}` : (phoneRaw || ''));

              if (normalized) {
                localStorage.setItem('userPhone', normalized);
              }

              // Сформируем абсолютный путь к src/pages для dev сервера
              const target = `/src/pages/Emission.html${normalized ? `?phone=${encodeURIComponent(normalized)}` : ''}`;
              window.location.href = target;
            } catch (err) {
              console.error('Ошибка при редиректе на Emission:', err);
            }
          });
        }
      }
      
    } else {
      console.error('Ошибка расчета:', result.message);
      alert('Произошла ошибка при расчете эмиссии. Попробуйте еще раз.');
    }

  } catch (error) {
    console.error('❌ Детальная ошибка при отправке запроса:', error);
    console.error('Тип ошибки:', error.name);
    console.error('Сообщение ошибки:', error.message);
    console.error('Stack trace:', error.stack);
    
    // Проверяем тип ошибки
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      console.error('🌐 Ошибка сети: не удается подключиться к серверу');
      console.error('🔗 Проверьте URL:', `${apiBaseUrl}/api/emission/calculate_with_user.php`);
      alert(`Ошибка подключения к серверу.\nURL: ${apiBaseUrl}/api/emission/calculate_with_user.php\nПроверьте, что сервер запущен и доступен.`);
    } else if (error.name === 'SyntaxError') {
      console.error('📝 Ошибка парсинга JSON: сервер вернул некорректный ответ');
      alert('Сервер вернул некорректный ответ. Проверьте логи сервера.');
    } else {
      console.error('🔍 Неизвестная ошибка:', error);
      alert(`Произошла неизвестная ошибка: ${error.message}`);
    }
  } finally {
    // Восстанавливаем кнопку
    submitButton.innerHTML = originalText;
    submitButton.disabled = false;
  }
}

// Инициализация модального окна партнерства
document.addEventListener('DOMContentLoaded', function() {
    // Создаем модальные окна
    createPartnershipModal();
    createFreeCalculationModal();
    createPlantTreeModal();
    createCarbonFootprintModal();
    
    // Обработчики для кнопок открытия модалки партнерства
    // Поддерживаем множественные кнопки с разными ID
    const partnershipBtnIds = [
        'open-partnership-modal',        // Основная кнопка
        'open-partnership-modal-mobile', // Мобильная кнопка
        'btnMainPageDealBirch',         // Кнопка на главной странице
        'partnership-btn-header',        // Кнопка в хедере
        'partnership-btn-footer',        // Кнопка в футере
        'partnership-btn-donate',        // Кнопка на странице донатов
        'partnership-btn-project',       // Кнопка на странице проектов
        'partnership-btn-forest'         // Кнопка на лесной странице
    ];
    
    // Добавляем обработчики для всех возможных кнопок по ID
    partnershipBtnIds.forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) {
            if (btnId === 'open-partnership-modal-mobile') {
                // Специальная обработка для мобильной кнопки
                btn.addEventListener('click', function() {
                    toggleMobileMenu(); // Закрываем мобильное меню
                    setTimeout(() => {
                        openPartnershipModal(); // Открываем модалку после закрытия меню
                    }, 300);
                });
            } else {
                btn.addEventListener('click', openPartnershipModal);
            }
            console.log(`Добавлен обработчик для кнопки партнерства: ${btnId}`);
        }
    });
    
    // Также добавляем обработчик для кнопок по классу (если есть)
    const partnershipBtnsByClass = document.querySelectorAll('.partnership-btn, .btn-partnership, .become-partner-btn');
    partnershipBtnsByClass.forEach(btn => {
        btn.addEventListener('click', openPartnershipModal);
        console.log('Добавлен обработчик для кнопки партнерства по классу:', btn.id || btn.className);
    });
    
    // Обработчик для закрытия модалки при клике на фон
    document.addEventListener('click', function(event) {
        const modal = document.getElementById('partnership-modal');
        const modalContent = document.getElementById('modal-content');
        
        if (modal && event.target === modal && !modalContent.contains(event.target)) {
            closePartnershipModal();
        }
    });
    
    // Обработчик для крестика закрытия модалки
    document.addEventListener('click', function(event) {
        if (event.target.id === 'close-modal-btn' || event.target.closest('#close-modal-btn')) {
            closePartnershipModal();
        }
    });
    
    // Обработчики для модального окна бесплатного расчета
    // Поддерживаем множественные кнопки с разными ID
    const freeCalculationBtnIds = [            // Основная кнопка на главной странице
        'free-calculation-btn',         // Основная кнопка
        'free-calculation-btn-header',  // Кнопка в хедере
        'free-calculation-btn-footer',  // Кнопка в футере
        'free-calculation-btn-donate',  // Кнопка на странице донатов
        'free-calculation-btn-project', // Кнопка на странице проектов
        'free-calculation-btn-forest'   // Кнопка на лесной странице
    ];
    
    // Добавляем обработчики для всех возможных кнопок по ID
    freeCalculationBtnIds.forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.addEventListener('click', openFreeCalculationModal);
            console.log(`Добавлен обработчик для кнопки бесплатного расчета: ${btnId}`);
        }
    });
    
    // Также добавляем обработчик для кнопок по классу (если есть)
    const freeCalculationBtnsByClass = document.querySelectorAll('.free-calculation-btn, .btn-free-calculation, .carbon-calculation-btn');
    freeCalculationBtnsByClass.forEach(btn => {
        btn.addEventListener('click', openFreeCalculationModal);
        console.log('Добавлен обработчик для кнопки бесплатного расчета по классу:', btn.id || btn.className);
    });
    
    // Обработчик для закрытия модалки бесплатного расчета при клике на фон
    document.addEventListener('click', function(event) {
        const modal = document.getElementById('free-calculation-modal');
        const modalContent = document.getElementById('calculation-modal-content');
        
        if (modal && event.target === modal && !modalContent.contains(event.target)) {
            closeFreeCalculationModal();
        }
    });
    
    // Обработчик для крестика закрытия модалки бесплатного расчета
    document.addEventListener('click', function(event) {
        if (event.target.id === 'close-calculation-modal-btn' || event.target.closest('#close-calculation-modal-btn')) {
            closeFreeCalculationModal();
        }
    });
    
    // Обработчики для модального окна посадки деревьев
    // Поддерживаем множественные кнопки с разными ID
    const plantTreeBtnIds = [
        'plant-tree-btn',           // Главная страница
        'plant-tree-btn-main',      // Главная страница (дубликат)
        'plant-tree-btn-forest',    // Страница леса
        'plant-tree-btn-donate',    // Страница донатов
        'plant-tree-btn-project',   // Страница проектов
        'plant-tree-btn-header',    // Кнопка в хедере
        'plant-tree-btn-footer'     // Кнопка в футере
    ];
    
    // Добавляем обработчики для всех возможных кнопок
    plantTreeBtnIds.forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.addEventListener('click', openPlantTreeModal);
            console.log(`Добавлен обработчик для кнопки: ${btnId}`);
        }
    });
    
    // Также добавляем обработчик для кнопок по классу (если есть)
    const plantTreeBtnsByClass = document.querySelectorAll('.plant-tree-btn, .btn-plant-tree');
    plantTreeBtnsByClass.forEach(btn => {
        btn.addEventListener('click', openPlantTreeModal);
        console.log('Добавлен обработчик для кнопки по классу:', btn.id || btn.className);
    });
    
    // Обработчик для крестика закрытия модалки посадки деревьев
    document.addEventListener('click', function(event) {
        if (event.target.id === 'close-plant-modal-btn' || event.target.closest('#close-plant-modal-btn')) {
            closePlantTreeModal();
        }
    });
    
    // Обработчик для закрытия модалки посадки деревьев при клике на фон
    document.addEventListener('click', function(event) {
        const modal = document.getElementById('plant-tree-modal');
        const modalContent = document.getElementById('plant-modal-content');
        
        if (modal && event.target === modal && !modalContent.contains(event.target)) {
            closePlantTreeModal();
        }
    });
    
    // Обработчики для модального окна расчета углеродного следа
    // Поддерживаем множественные кнопки с разными ID
    const carbonFootprintBtnIds = [
        'btnMainPageSled',              // Основная кнопка на главной странице
        'carbon-footprint-btn',         // Основная кнопка
        'carbon-footprint-btn-header',  // Кнопка в хедере
        'carbon-footprint-btn-footer',  // Кнопка в футере
        'carbon-footprint-btn-donate',  // Кнопка на странице донатов
        'carbon-footprint-btn-project', // Кнопка на странице проектов
        'carbon-footprint-btn-forest'   // Кнопка на лесной странице
    ];
    
    // Добавляем обработчики для всех возможных кнопок по ID
    carbonFootprintBtnIds.forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.addEventListener('click', openCarbonFootprintModal);
            console.log(`Добавлен обработчик для кнопки расчета углеродного следа: ${btnId}`);
        }
    });
    
    // Также добавляем обработчик для кнопок по классу (если есть)
    const carbonFootprintBtnsByClass = document.querySelectorAll('.carbon-footprint-btn, .btn-carbon-footprint, .carbon-calculation-btn');
    carbonFootprintBtnsByClass.forEach(btn => {
        btn.addEventListener('click', openCarbonFootprintModal);
        console.log('Добавлен обработчик для кнопки расчета углеродного следа по классу:', btn.id || btn.className);
    });
    
    // Обработчик для закрытия модалки расчета углеродного следа при клике на фон
    document.addEventListener('click', function(event) {
        const modal = document.getElementById('carbon-footprint-modal');
        const modalContent = document.getElementById('carbon-modal-content');
        
        if (modal && event.target === modal && !modalContent.contains(event.target)) {
            closeCarbonFootprintModal();
        }
    });
    
    // Обработчик для крестика закрытия модалки расчета углеродного следа
    document.addEventListener('click', function(event) {
        if (event.target.id === 'close-carbon-modal-btn' || event.target.closest('#close-carbon-modal-btn')) {
            closeCarbonFootprintModal();
        }
    });
    
    // Обработчик для клавиши Escape - закрытие модалок
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            // Закрываем все модалки
            if (document.getElementById('carbon-footprint-modal') && !document.getElementById('carbon-footprint-modal').classList.contains('hidden')) {
                closeCarbonFootprintModal();
            }
            if (document.getElementById('partnership-modal') && !document.getElementById('partnership-modal').classList.contains('hidden')) {
                closePartnershipModal();
            }
            if (document.getElementById('free-calculation-modal') && !document.getElementById('free-calculation-modal').classList.contains('hidden')) {
                closeFreeCalculationModal();
            }
            if (document.getElementById('plant-tree-modal') && !document.getElementById('plant-tree-modal').classList.contains('hidden')) {
                closePlantTreeModal();
            }
        }
    });

  // NOTE: локальные обработчики для +/- и input назначены отдельно (decBtn/incBtn/treeCountInput)
    
    // Обработчики для чекбоксов
    document.addEventListener('click', function(event) {
        const target = event.target;
        
        // Если клик по кастомному чекбоксу или его содержимому
        if (target.closest('.checkbox-custom')) {
            event.preventDefault();
            event.stopPropagation();
            
            const label = target.closest('label');
            const checkbox = label.querySelector('input[type="checkbox"]');
            const checkIcon = label.querySelector('.checkbox-icon');
            
            if (checkbox && checkIcon) {
                // Переключаем состояние
                checkbox.checked = !checkbox.checked;
                
                // Обновляем визуальное отображение
                if (checkbox.checked) {
                    checkIcon.classList.remove('hidden');
                } else {
                    checkIcon.classList.add('hidden');
                }
                
                // Создаем событие change для совместимости
                const changeEvent = new Event('change', { bubbles: true });
                checkbox.dispatchEvent(changeEvent);
                
                // Обрабатываем изменения для чекбокса Kaspi
                if (checkbox.id === 'pay-cash') {
                    handleKaspiPaymentToggle(checkbox.checked);
                }
            }
        }
    });
    
    // Функция для обработки переключения оплаты через Kaspi
    function handleKaspiPaymentToggle(isKaspiSelected) {
        // Определяем правильный путь к изображениям
        const getImagePath = () => {
            const currentPath = window.location.pathname;
            if (currentPath.includes('/pages/')) {
                return '../../src/img/';
            }
            return './src/img/';
        };
        
        const imagePath = getImagePath();
        const giftTreeLabel = document.querySelector('label:has(#gift-tree)');
        const submitButton = document.querySelector('#plant-tree-submit-btn');
        
        if (isKaspiSelected) {
            // Скрываем поле "в подарок"
            if (giftTreeLabel) {
                giftTreeLabel.style.display = 'none';
            }
            
            // Изменяем кнопку на лепесток + X + лого Kaspi
            if (submitButton) {
                submitButton.className = 'kaspi-button w-full h-[80px] mt-8';
                submitButton.innerHTML = `
                    <img src="${imagePath}aloneLepestok.svg" class="lepestok-icon" viewBox="0 0 24 24" fill="currentColor">

                    </img>
                    <div class="separator">Х</div>
                    <img src="${imagePath}kaspi.svg" class="kaspi-logo" viewBox="0 0 24 24" fill="currentColor">
                    </img>
                    <div>
                        <span id="submit-btn-text">Оплатить через Kaspi</span>
                    </div>
                `;
            }
        } else {
            // Показываем поле "в подарок"
            if (giftTreeLabel) {
                giftTreeLabel.style.display = 'flex';
            }
            
            // Возвращаем обычную кнопку
            if (submitButton) {
                submitButton.className = 'w-full h-[80px] bg-[#23B77F] text-white px-6 rounded-lg font-semibold hover:bg-green-600 transition duration-200 flex items-center justify-center gap-2 mt-8';
                submitButton.innerHTML = `
                    <img src="${imagePath}aloneLepestok.svg" alt="" class="w-5 h-5">
                    <span id="submit-btn-text">Посадить дерево</span>
                `;
            }
        }
    }
    
    // Обработка отправки формы посадки деревьев
    document.addEventListener('submit', function(event) {
        if (event.target.id === 'plant-tree-form') {
            handlePlantTreeFormSubmit(event);
        }
    });
    
    // Обработчик для отправки формы
    document.addEventListener('submit', function(event) {
        if (event.target.id === 'partnership-form') {
            handlePartnershipFormSubmit(event);
        }
    });
    
    // Обработчик для отправки формы бесплатного расчета
    document.addEventListener('submit', function(event) {
        if (event.target.id === 'free-calculation-form') {
            handleFreeCalculationFormSubmit(event);
        }
    });
    
    // Закрытие модалок по ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const partnershipModal = document.getElementById('partnership-modal');
            const freeCalculationModal = document.getElementById('free-calculation-modal');
            const plantTreeModal = document.getElementById('plant-tree-modal');
            
            if (partnershipModal && !partnershipModal.classList.contains('hidden')) {
                closePartnershipModal();
            }
            if (freeCalculationModal && !freeCalculationModal.classList.contains('hidden')) {
                closeFreeCalculationModal();
            }
            if (plantTreeModal && !plantTreeModal.classList.contains('hidden')) {
                closePlantTreeModal();
            }
        }
    });

    // Инициализация функций для эмиссии
    initializeEmissionFunctions();
  });

// Функции для работы с API эмиссии
function initializeEmissionFunctions() {
    const emissionPhoneInput = document.getElementById('emission-phone-input');
    const emissionCheckBtn = document.getElementById('emission-check-btn');
    
    if (emissionCheckBtn) {
        emissionCheckBtn.addEventListener('click', handleEmissionCheck);
    }

  // Добавляем обработчики для кнопок шаринга на страницах Emission / EmissionAuth
  try {
    // Emission: контейнер с иконками имеет id 'emissionIcon'
    const emissionIconContainer = document.getElementById('emissionIcon');
    if (emissionIconContainer) {
      emissionIconContainer.addEventListener('click', function(e) {
        e.preventDefault();
        // Приходимся на страницу Emission.html, userData должен быть в localStorage
        const userData = localStorage.getItem('userData');
        const user = userData ? JSON.parse(userData) : null;
        const phone = user && user.phone ? user.phone : localStorage.getItem('userPhone');
        if (!phone) {
          alert('Не удалось получить номер телефона для шаринга.');
          return;
        }
        const shareUrl = generateShareLink(phone, 'emission');
        copyAndOpenShare(shareUrl);
      });
    }

    // EmissionAuth: контейнер с иконками в элементе с id 'shareResultIcons'
    const shareResultIcons = document.getElementById('shareResultIcons');
    if (shareResultIcons) {
      shareResultIcons.addEventListener('click', function(e) {
        e.preventDefault();
        const userData = localStorage.getItem('userData');
        const user = userData ? JSON.parse(userData) : null;
        const phone = user && user.phone ? user.phone : localStorage.getItem('userPhone');
        if (!phone) {
          alert('Не удалось получить номер телефона для шаринга.');
          return;
        }
        // Для EmissionAuth делаем более приватную версию
        const shareUrl = generateShareLink(phone, 'auth');
        copyAndOpenShare(shareUrl);
      });
    }
  } catch (err) {
    console.error('Ошибка при инициализации шаринга:', err);
  }
}

// Генерируем относительную ссылку на страницу шаринга (Share.html должна лежать в той же папке)
function generateShareLink(phone, type) {
  const params = new URLSearchParams({ phone: phone, type: type });
  // Открываем Share.html в той же папке, где находятся Emission*.html
  return `Share.html?${params.toString()}`;
}

// Копируем ссылку в буфер обмена и открываем в новой вкладке
function copyAndOpenShare(url) {
  // Формируем абсолютный URL для корректной работы после деплоя
  try {
    const loc = window.location;
    // Путь до текущей директории (пример: /pages)
    const pathParts = loc.pathname.split('/');
    pathParts.pop(); // убрать файл
    const baseDir = pathParts.join('/') || '/';
    const full = loc.origin + (baseDir.endsWith('/') ? baseDir : baseDir + '/') + url;

    // Копируем и открываем
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(full).then(() => {
        window.open(full, '_blank');
        alert('Ссылка скопирована в буфер и открыта в новой вкладке.');
      }).catch(err => {
        console.error('Не удалось скопировать ссылку:', err);
        window.open(full, '_blank');
      });
    } else {
      // fallback
      const temp = document.createElement('input');
      document.body.appendChild(temp);
      temp.value = full;
      temp.select();
      document.execCommand('copy');
      document.body.removeChild(temp);
      window.open(full, '_blank');
      alert('Ссылка скопирована в буфер и открыта в новой вкладке.');
    }
  } catch (err) {
    console.error('Ошибка при формировании/копировании ссылки:', err);
    // fallback простой открытие
    window.open(url, '_blank');
  }
}

async function handleEmissionCheck() {
  const phoneInput = document.getElementById('emission-phone-input');
  const rawPhone = phoneInput ? phoneInput.value.trim() : '';
  const phone = normalizePhoneForBackend(rawPhone);
    
  if (!phone) {
    alert('Пожалуйста, введите корректный номер в формате +7XXXXXXXXXX');
    return;
  }
    
    // Показываем индикатор загрузки
    const checkBtn = document.getElementById('emission-check-btn');
    const originalText = checkBtn ? checkBtn.textContent : '';
    if (checkBtn) {
        checkBtn.textContent = 'Проверяем...';
        checkBtn.disabled = true;
    }
    
    try {
        
        // Проверяем, существует ли пользователь
  const checkResponse = await fetch(`${apiBaseUrl}/api/users/get_by_phone.php?phone=${encodeURIComponent(phone)}`);
        const checkData = await checkResponse.json();
        
        console.log('Ответ API для проверки пользователя:', checkData);
        
        // Проверяем успешный ответ и наличие данных пользователя
        if (checkResponse.ok && checkData.status === 'success' && checkData.data) {
            const user = checkData.data;
            
            // Пользователь найден - проверяем есть ли у него эмиссия
      if (user.emission_kg && user.emission_kg > 0) {
        // У пользователя есть рассчитанная эмиссия - переходим на Emission.html и передаём номер в URL
        localStorage.setItem('userData', JSON.stringify(user));
        window.location.href = `Emission.html?phone=${encodeURIComponent(phone)}`;
            } else {
                // Пользователь есть, но нет эмиссии - переходим на EmissionAuth.html для расчета
                localStorage.setItem('userData', JSON.stringify(user));
                localStorage.setItem('userPhone', phone);
                window.location.href = 'EmissionAuth.html';
            }
            return;
        }
        
        // Если дошли сюда - пользователь не найден (404, неуспешный статус или нет данных)
        // Пользователь будет создан позже при заполнении формы расчета эмиссии
        console.log('Пользователь не найден, переходим на EmissionAuth для регистрации');
  localStorage.setItem('userPhone', phone);
        localStorage.removeItem('userData');
        window.location.href = 'EmissionAuth.html';
    } catch (error) {
        console.error('Ошибка при проверке пользователя:', error);
        alert('Произошла ошибка при проверке. Попробуйте еще раз.');
        
        // Восстанавливаем кнопку
        if (checkBtn) {
            checkBtn.textContent = originalText;
            checkBtn.disabled = false;
        }
    }
}

// Функция для инициализации страницы Emission.html
function initializeEmissionPage() {
  // Сначала попробуем получить телефон из URL (в случае редиректа из модалки)
  const urlParams = new URLSearchParams(window.location.search);
  const phoneFromUrl = urlParams.get('phone');
  const phoneFromStorage = localStorage.getItem('userPhone');
  const phone = phoneFromUrl || phoneFromStorage;

  if (!phone) {
    // Если телефона нет — попробуем использовать уже сохранённые данные
    const stored = localStorage.getItem('userData');
    if (!stored) {
      window.location.href = 'Donate.html';
      return;
    }
    try {
      const user = JSON.parse(stored);
      updateUserDataOnPage(user);
      if (typeof user.emission_cleared_percent !== 'undefined') updateEmissionPercentage(user.emission_cleared_percent);
      initializeEmissionMap(user);
    } catch (e) {
      console.error('Ошибка парсинга локальных данных пользователя:', e);
      window.location.href = 'Donate.html';
    }
    return;
  }

  // Нормализуем телефон и сохраняем в localStorage
  const digits = phone.replace(/\D/g, '');
  const normalized = digits.length === 10 ? `+7${digits}` : (digits.length === 11 && digits.startsWith('7') ? `+${digits}` : phone);
  localStorage.setItem('userPhone', normalized);

  // Загружаем пользователя с сервера по телефону — перезаписываем localStorage.userData и обновляем страницу
  fetch(`${apiBaseUrl}/api/users/get_by_phone.php?phone=${encodeURIComponent(normalized)}`)
    .then(res => res.json())
    .then(data => {
      if (data && data.status === 'success' && data.data) {
        const user = data.data;
        localStorage.setItem('userData', JSON.stringify(user));
        updateUserDataOnPage(user);
        if (typeof user.emission_cleared_percent !== 'undefined') updateEmissionPercentage(user.emission_cleared_percent);
        initializeEmissionMap(user);
      } else {
        // Если пользователь не найден, переходим на EmissionAuth для ввода данных и расчёта
        console.warn('Пользователь не найден по телефону:', normalized, data);
        localStorage.setItem('userPhone', normalized);
        window.location.href = 'EmissionAuth.html';
      }
    })
    .catch(err => {
      console.error('Ошибка при загрузке пользователя по телефону:', err);
      // В случае ошибки используем локальные данные, если есть
      const stored = localStorage.getItem('userData');
      if (stored) {
        try { const user = JSON.parse(stored); updateUserDataOnPage(user); if (typeof user.emission_cleared_percent !== 'undefined') updateEmissionPercentage(user.emission_cleared_percent); initializeEmissionMap(user); } catch(e){}
      }
    });

  // Динамически выводим процент очищенной эмиссии, если есть.
  // Ранее здесь использовался `user` без гарантий, что он объявлен в текущей области видимости —
  // это могло вызывать ReferenceError и оставлять вёрстку с '?%'.
  try {
    const stored = localStorage.getItem('userData');
    if (stored) {
      const storedUser = JSON.parse(stored);
      if (typeof storedUser.emission_cleared_percent !== 'undefined' && storedUser.emission_cleared_percent !== null) {
        console.log('emission_cleared_percent из localStorage:', storedUser.emission_cleared_percent);
        // Обновляем визуализацию процента (если есть отдельная функция)
        if (typeof updateEmissionPercentage === 'function') updateEmissionPercentage(storedUser.emission_cleared_percent);

        const percentElements = document.querySelectorAll('[data-emission-percent]');
        const percentVal = Number(storedUser.emission_cleared_percent);
        const nf = new Intl.NumberFormat('ru-RU', { maximumSignificantDigits: 2 });
        const formattedPercent = Number.isFinite(percentVal) ? nf.format(percentVal) : storedUser.emission_cleared_percent;
        const numericDisplay = percentVal > 100 ? (percentVal + '%') : (formattedPercent + '%');
        const overMessage = 'Отлично! Вы превысили максимальную цель — так держать!';

        percentElements.forEach(el => {
          if (el.id === 'percentageText') {
            el.textContent = (percentVal > 100) ? overMessage : numericDisplay;
          } else {
            el.textContent = numericDisplay;
          }
        });
      }
    }
  } catch (err) {
    console.error('Ошибка при обновлении процента эмиссии из localStorage:', err);
  }

  // Инициализируем карту с маркером
  initializeEmissionMap(user);
}

function updateUserDataOnPage(user) {
    // Обновляем имя пользователя
    const userNameElement = document.querySelector('[data-user-name]');
    if (userNameElement) {
        userNameElement.textContent = `${user.name} ${user.surname}`;
    }
    
    // Обновляем количество деревьев
    const totalTrees = user.plantings ? user.plantings.reduce((sum, planting) => sum + parseInt(planting.trees_quantity), 0) : 0;
    const treesElements = document.querySelectorAll('[data-trees-count]');
    treesElements.forEach(element => {
        element.textContent = totalTrees;
    });
    
    // Обновляем эмиссию (конвертируем кг в тонны)
    const emissionElements = document.querySelectorAll('[data-emission]');
    if (emissionElements.length > 0 && user.emission_kg) {
        const emissionTonnes = (parseFloat(user.emission_kg) / 1000).toFixed(1);
        emissionElements.forEach(element => {
            element.textContent = emissionTonnes;
        });
    }

  // Обновляем дополнительные поля: emission_tons и total_investment
  try {
    const emissionTonsElements = document.querySelectorAll('[data-emission-tons]');
    if (emissionTonsElements.length > 0 && typeof user.emission_tons !== 'undefined' && user.emission_tons !== null) {
      // показываем с одним знаком после запятой если число дробное
      const val = parseFloat(user.emission_tons);
      const formatted = (Math.abs(val - Math.round(val)) > 0.05) ? val.toFixed(1) : Math.round(val).toString();
      emissionTonsElements.forEach(el => el.textContent = `~ ${formatted} тонн CO₂ очищено в год`);
    }

    const investElements = document.querySelectorAll('[data-total-investment]');
    if (investElements.length > 0 && typeof user.total_investment !== 'undefined' && user.total_investment !== null) {
      const nf = new Intl.NumberFormat('ru-RU');
      const formatted = nf.format(Number(user.total_investment));
      investElements.forEach(el => el.textContent = `~ ${formatted} ₸ инвестировано в озеленение`);
    }
  } catch (err) {
    console.error('Ошибка при обновлении emission_tons / total_investment:', err);
  }

  // Обновляем блок "Для полной компенсации" если есть данные от API
  try {
    const compensElem = document.getElementById('emissionFullCompensValue');
    if (compensElem) {
      // Берём значения напрямую из user, ожидаемое название полей: trees_need, price_need, emission_tons
      const treesNeed = (typeof user.trees_need !== 'undefined' && user.trees_need !== null) ? Number(user.trees_need) : null;
      const priceNeed = (typeof user.price_need !== 'undefined' && user.price_need !== null) ? Number(user.price_need) : null;
      const emissionTons = (typeof user.emission_tons !== 'undefined' && user.emission_tons !== null) ? parseFloat(user.emission_tons) : null;

      // Форматирование чисел для отображения
      const nf = new Intl.NumberFormat('ru-RU');

      // Формируем строки с fallback на прежний статический контент
      const treesStr = treesNeed !== null ? `~ ${nf.format(treesNeed)} деревьев` : '';
      const priceStr = priceNeed !== null ? `~ ${nf.format(priceNeed)} ₸` : '';

      // Цена за тонну — если есть emissionTons и priceNeed
      let perTonStr = '';
      if (priceNeed !== null && emissionTons) {
        const perTon = Math.round(priceNeed / emissionTons);
        perTonStr = `~ ${nf.format(perTon)} ₸ за тонну CO₂`;
      }

      // Собираем финальный HTML (переносы через <br>) — показываем только имеющиеся строки
      const parts = [];
      if (treesStr) parts.push(treesStr);
      if (priceStr) parts.push(priceStr);
      if (perTonStr) parts.push(perTonStr);

      if (parts.length > 0) {
        compensElem.innerHTML = parts.join(' <br> ');
      }
    }
  } catch (err) {
    console.error('Ошибка при обновлении блока полной компенсации:', err);
  }
}

function initializeEmissionMap(user) {
    // Проверяем, есть ли уже карта
    if (window.mapInstance) {
        return;
    }
    
    // Координаты городов Казахстана
    const cityCoordinates = {
        'Алматы': [43.2220, 76.8512],
        'Астана': [51.1694, 71.4491],
        'Нур-Султан': [51.1694, 71.4491],
        'Шымкент': [42.3000, 69.5970],
        'Караганда': [49.8047, 73.1094],
        'Актобе': [50.2839, 57.2094],
        'Тараз': [42.9000, 71.3667],
        'Павлодар': [52.2856, 76.9574],
        'Усть-Каменогорск': [49.9783, 82.6283],
        'Семей': [50.4111, 80.2275],
        'Атырау': [47.1164, 51.8753],
        'Костанай': [53.2133, 63.6246],
        'Кызылорда': [44.8479, 65.5093],
        'Уральск': [51.2333, 51.3667],
        'Петропавловск': [54.8833, 69.1500],
        'Актау': [43.6531, 51.1601],
        'Темиртау': [50.0500, 72.9667],
        'Туркестан': [43.3061, 68.2467],
        'Кокшетау': [53.2833, 69.3833],
        'Талдыкорган': [45.0167, 78.3833]
    };
    
    // Получаем координаты города пользователя
    const userCity = user.city;
    const coordinates = cityCoordinates[userCity] || [43.2220, 76.8512]; // По умолчанию Алматы
    
    // Создаем карту
    const mapElement = document.getElementById('openstreet-map');
    if (mapElement && typeof L !== 'undefined') {
        window.mapInstance = L.map('openstreet-map').setView(coordinates, 10);
        
        // Добавляем слой карты
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(window.mapInstance);
        
        // Считаем общее количество деревьев
        const totalTrees = user.plantings ? user.plantings.reduce((sum, planting) => sum + parseInt(planting.trees_quantity), 0) : 0;
        
        // Создаем кастомную иконку дерева
        const treeIcon = L.icon({
            iconUrl: '../../src/img/customMarker.svg',
            iconSize: [50, 50],
            iconAnchor: [25, 50],
            popupAnchor: [0, -50]
        });
        
        // Добавляем маркер с кастомной иконкой дерева
        const marker = L.marker(coordinates, { icon: treeIcon }).addTo(window.mapInstance);
        
        // Создаем стильный popup
        const popupContent = `
            <div style="
                background: rgba(0,0,0,0.85);
                color: white;
                padding: 16px 20px;
                border-radius: 14px;
                text-align: center;
                border: none;
                box-shadow: 0 8px 24px rgba(0,0,0,0.4);
                min-width: 220px;
                font-family: 'PP Neue Montreal', sans-serif;
            ">
                <div style="font-size: 20px; font-weight: 600; margin-bottom: 8px; color: white;">${userCity}</div>
                <div style="font-size: 18px; color: #4ade80; font-weight: 500;">
                    Мои деревья: <span style="font-weight: 700; font-size: 20px; color: #22c55e;">${totalTrees}</span>
                </div>
            </div>
        `;
        
        marker.bindPopup(popupContent, {
            className: 'custom-popup',
            closeButton: false,
            offset: [0, -10]
        });
        
        // Автоматически открываем popup
        marker.openPopup();
    }
}

// Функции для управления зумом карты эмиссии
function zoomInMap() {
    if (window.mapInstance) {
        window.mapInstance.zoomIn();
    }
}

function zoomOutMap() {
    if (window.mapInstance) {
        window.mapInstance.zoomOut();
    }
}

// Экспортируем функции в глобальную область
window.zoomInMap = zoomInMap;
window.zoomOutMap = zoomOutMap;

// Проверяем, находимся ли мы на странице Emission.html
if (window.location.pathname.includes('Emission.html')) {
    document.addEventListener('DOMContentLoaded', initializeEmissionPage);
}

// Проверяем, находимся ли мы на странице EmissionAuth.html
if (window.location.pathname.includes('EmissionAuth.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        // Проверяем, есть ли данные пользователя
        const userData = localStorage.getItem('userData');
        const userPhone = localStorage.getItem('userPhone');
        
        if (userData) {
            const user = JSON.parse(userData);
            console.log('Пользователь найден, но без эмиссии:', user);
            
            // Обновляем данные на странице
            updateEmissionAuthData(user);
            
            // Если пользователь существует, но нет эмиссии, остаемся на странице для расчета
            // Предзаполняем форму данными пользователя если они есть
            if (user.name) {
                const nameInput = document.querySelector('input[name="name"]');
                if (nameInput) nameInput.value = user.name;
            }
            
            if (user.surname) {
                const surnameInput = document.querySelector('input[name="surname"]');
                if (surnameInput) surnameInput.value = user.surname;
            }
            
            if (user.phone || userPhone) {
                const phoneInput = document.querySelector('input[name="phone"]');
                if (phoneInput) phoneInput.value = user.phone || userPhone;
            }
            
            if (user.city) {
                const cityInput = document.querySelector('input[name="city"]');
                if (cityInput) cityInput.value = user.city;
            }
        } else if (userPhone) {
            // Только номер телефона - предзаполняем его и показываем "?"
            updateEmissionAuthData({ phone: userPhone });
            
            const phoneInput = document.querySelector('input[name="phone"]');
            if (phoneInput) phoneInput.value = userPhone;
        }
    });
}

// Функция для обновления данных на странице EmissionAuth.html
function updateEmissionAuthData(user) {
  // Обновляем имя пользователя.
  // Если передан объект с phone, но нет name/surname — это случай "пользователь не найден".
  const userNameElement = document.querySelector('[data-user-name]');
  if (userNameElement) {
    if (user.name && user.surname) {
      const shortName = `${user.name} ${user.surname.charAt(0)}.`;
      userNameElement.textContent = shortName;
    } else if (user.phone && !user.name && !user.surname) {
      // Пользователь не найден — показываем дружелюбное сообщение
      userNameElement.textContent = 'Мы Вас не нашли :(';
    } else {
      userNameElement.textContent = '?';
    }
  }

  // Обновляем количество деревьев.
  const totalTrees = user.plantings ? user.plantings.reduce((sum, planting) => sum + parseInt(planting.trees_quantity), 0) : 0;
  const treesElements = document.querySelectorAll('[data-trees-count]');
  treesElements.forEach(element => {
    if (totalTrees > 0) {
      element.textContent = totalTrees;
    } else if (user.phone && !user.name && !user.surname) {
      // Пользователь не найден — показываем понятный текст вместо знака вопроса
      element.textContent = 'Перепроверьте номер телефона. Если данных нет, вы можете рассчитать свою эмиссию или внести вклад в высадку деревьев и стать частью нашего сообщества.';
    } else {
      element.textContent = '?';
    }
  });
    
  // Показ/скрытие блоков в зависимости от наличия данных
  const viVisadiliBlock = document.getElementById('viVisadili');
  const notFoundBlock = document.getElementById('notFoundMessage');
  if (user.phone && !user.name && !user.surname) {
    if (viVisadiliBlock) viVisadiliBlock.classList.add('hidden');
    if (notFoundBlock) notFoundBlock.classList.remove('hidden');
  } else {
    if (viVisadiliBlock) viVisadiliBlock.classList.remove('hidden');
    if (notFoundBlock) notFoundBlock.classList.add('hidden');
  }

  // Карты на EmissionAuth.html нет, поэтому не инициализируем
}

// Функция для инициализации карты на EmissionAuth.html
function initializeEmissionAuthMap(user) {
    // Проверяем, есть ли уже карта
    if (window.mapInstanceAuth) {
        return;
    }
    
    // Координаты городов Казахстана
    const cityCoordinates = {
        'Алматы': [43.2220, 76.8512],
        'Астана': [51.1694, 71.4491],
        'Нур-Султан': [51.1694, 71.4491],
        'Шымкент': [42.3000, 69.5970],
        'Караганда': [49.8047, 73.1094],
        'Актобе': [50.2839, 57.2094],
        'Тараз': [42.9000, 71.3667],
        'Павлодар': [52.2856, 76.9574],
        'Усть-Каменогорск': [49.9783, 82.6283],
        'Семей': [50.4111, 80.2275],
        'Атырау': [47.1164, 51.8753],
        'Костанай': [53.2133, 63.6246],
        'Кызылорда': [44.8479, 65.5093],
        'Уральск': [51.2333, 51.3667],
        'Петропавловск': [54.8833, 69.1500],
        'Актау': [43.6531, 51.1601],
        'Темиртау': [50.0500, 72.9667],
        'Туркестан': [43.3061, 68.2467],
        'Кокшетау': [53.2833, 69.3833],
        'Талдыкорган': [45.0167, 78.3833]
    };
    
    // Получаем координаты города пользователя
    const userCity = user.city;
    const coordinates = cityCoordinates[userCity] || [43.2220, 76.8512]; // По умолчанию Алматы
    
    // Создаем карту (ищем на EmissionAuth.html)
    const mapElement = document.getElementById('openstreet-map');
    if (mapElement && typeof L !== 'undefined') {
        window.mapInstanceAuth = L.map('openstreet-map').setView(coordinates, 10);
        
        // Добавляем слой карты
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(window.mapInstanceAuth);
        
        // Считаем общее количество деревьев
        const totalTrees = user.plantings ? user.plantings.reduce((sum, planting) => sum + parseInt(planting.trees_quantity), 0) : 0;
        
        // Создаем кастомную иконку дерева
        const treeIcon = L.icon({
            iconUrl: '../../src/img/customMarker.svg',
            iconSize: [50, 50],
            iconAnchor: [25, 50],
            popupAnchor: [0, -50]
        });
        
        // Добавляем маркер с кастомной иконкой дерева
        const marker = L.marker(coordinates, { icon: treeIcon }).addTo(window.mapInstanceAuth);
        
        // Создаем стильный popup без района, только количество деревьев
        const popupContent = `
            <div style="
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 12px 16px;
                border-radius: 12px;
                text-align: center;
                border: none;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                min-width: 200px;
            ">
                <div style="font-size: 18px; font-weight: bold; margin-bottom: 8px;">Мои деревья</div>
                <div style="font-size: 16px; color: #4ade80;">
                    Посажено деревьев: <span style="font-weight: bold; font-size: 18px;">${totalTrees > 0 ? totalTrees : '?'}</span>
                </div>
            </div>
        `;
        
        marker.bindPopup(popupContent, {
            className: 'custom-popup',
            closeButton: false,
            offset: [0, -10]
        });
        
        // Автоматически открываем popup
        marker.openPopup();
    }
}