# BIRCH API Documentation

## Настройка базы данных

1. Измените настройки подключения в `config/database.php`
2. Импортируйте `database_setup.sql` для создания полной структуры БД
   - Создаст базу данных `birch_db`
   - Создаст таблицы: `users`, `plantings`, `homepage_stats`
   - Заполнит тестовыми данными

## Настройка email (PHPMailer)

1. **Установка зависимостей:**
   ```bash
   cd api
   composer install
   ```

2. **Настройка SMTP в `config/email.php`:**
   ```php
   'smtp' => [
       'host' => 'smtp.gmail.com',           // Ваш SMTP сервер
       'username' => 'your-email@gmail.com', // Ваш email
       'password' => 'your-app-password',    // Пароль приложения
       'port' => 587,
       'encryption' => 'tls',
   ],
   ```

3. **Для Gmail:**
   - Включите двухфакторную аутентификацию
   - Создайте пароль приложения в настройках Google
   - Используйте пароль приложения вместо основного пароля

4. **Настройка получателей:**
   ```php
   'recipients' => [
       'organization_requests' => 'info@birch-project.kz', // Замените на ваш email
   ],
   ```

5. **Для других почтовых провайдеров:**
   - **Yandex:** `smtp.yandex.ru`, порт 465 (SSL) или 587 (TLS)
   - **Mail.ru:** `smtp.mail.ru`, порт 465 (SSL) или 587 (TLS)
   - **Outlook:** `smtp-mail.outlook.com`, порт 587 (TLS)

## API Endpoints

### 1. Получение всех пользователей с их посадками

**URL:** `GET /api/users/read.php`

**Ответ:**
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "surname": "Иванов",
      "name": "Алексей",
      "phone": "+77771234567",
      "city": "Алматы",
      "emission_kg": 1250.5,
      "created_at": "2024-12-03 10:00:00",
      "plantings": [
        {
          "id": 1,
          "trees_quantity": 50,
          "year": 2024,
          "city": "Алматы",
          "created_at": "2024-12-03 10:30:00"
        }
      ]
    }
  ]
}
```

### 2. Получение пользователя по номеру телефона

**URL:** `GET /api/users/get_by_phone.php?phone=+77771234567`

**Параметры запроса:**
- `phone` (обязательный) - номер телефона пользователя

**Ответ при успехе:**
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "surname": "Иванов",
    "name": "Алексей",
    "phone": "+77771234567",
    "city": "Алматы",
    "emission_kg": 1250.5,
    "created_at": "2024-12-03 10:00:00",
    "total_trees": 75,
    "total_investment": 150000,
    "emission_tons": 1.251,
    "emission_cleared_percent": 50020.0,
    "plantings": [
      {
        "id": 1,
        "trees_quantity": 50,
        "year": 2024,
        "city": "Алматы",
        "created_at": "2024-12-03 10:30:00"
      },
      {
        "id": 2,
        "trees_quantity": 25,
        "year": 2023,
        "city": "Астана",
        "created_at": "2024-12-03 10:35:00"
      }
    ]
  }
}
```

**Дополнительные поля (только при наличии данных):**
- `total_trees` - общее количество посаженных деревьев (только если есть посадки)
- `total_investment` - общая сумма инвестиций в тенге (только если есть посадки: total_trees × 2000)
- `emission_tons` - значение эмиссии в тоннах (только если emission_kg > 0: emission_kg ÷ 1000)
- `emission_cleared_percent` - процент очищенной эмиссии (только если emission_kg > 0: emission_tons ÷ 0.025)

**Ответ при ошибке (пользователь не найден):**
```json
{
  "status": "error",
  "message": "User not found with phone number: +77771234567"
}
```

### 3. Создание посадки (с автоматической регистрацией пользователя)

**URL:** `POST /api/plantings/create.php`

**Описание:** При создании посадки происходит автоматическая регистрация пользователя, если он не найден по номеру телефона.

**Тело запроса:**
```json
{
  "surname": "Иванов",
  "name": "Алексей",
  "phone": "+77771234567",
  "city": "Алматы",
  "trees_quantity": 100
}
```

**Примечание:** Год посадки автоматически устанавливается как текущий год на сервере.

**Ответ:**
```json
{
  "status": "success",
  "message": "Planting was created successfully.",
  "user_created": true,
  "user_id": 1
}
```

### 4. Расчет эмиссии CO2

**URL:** `POST /api/emission/calculate.php`

**Описание:** Рассчитывает выбросы CO2 на основе данных о потреблении и активности пользователя.

**Формула:** `((электричество * коэф_электричества) + (км_авто * коэф_авто) + (общ_транспорт * 2.625) + (часы_авиа * 90) + (вес * физ_активность) + тип_питания) * сортировка_отходов`

**Тело запроса:**
```json
{
  "electricity": 150,
  "electricity_coefficient": 0.5,
  "car_km": 1000,
  "car_coefficient": 0.2,
  "public_transport_hours": 50,
  "flight_hours": 10,
  "diet_type": 800,
  "physical_activity": 1.2,
  "weight_kg": 70,
  "waste_sorting": 0.8
}
```

**Ответ:**
```json
{
  "status": "success",
  "data": {
    "total_emission_kg": 1416.25,
    "breakdown": {
      "electricity": 75.0,
      "car": 200.0,
      "public_transport": 131.25,
      "flight": 900.0,
      "physical_activity": 84.0,
      "diet_type": 800,
      "subtotal": 2190.25,
      "waste_sorting_multiplier": 0.8
    }
  },
  "formula": "((electricity * coeff) + (car_km * coeff) + (public_transport * 2.625) + (flight * 90) + (weight * activity) + diet) * waste_sorting"
}
```

### 5. Расчет и обновление эмиссии пользователя

**URL:** `POST /api/emission/update_user.php`

**Описание:** Рассчитывает выбросы CO2 и обновляет поле `emission_kg` пользователя по номеру телефона.

**Формула:** `((электричество * коэф_электричества) + (км_авто * коэф_авто) + (общ_транспорт * 2.625) + (часы_авиа * 90) + (вес * физ_активность) + тип_питания) * сортировка_отходов`

**Тело запроса:**
```json
{
  "phone": "+77771234567",
  "electricity": 150,
  "electricity_coefficient": 0.5,
  "car_km": 1000,
  "car_coefficient": 0.2,
  "public_transport_hours": 50,
  "flight_hours": 10,
  "diet_type": 800,
  "physical_activity": 1.2,
  "weight_kg": 70,
  "waste_sorting": 0.8
}
```

**Ответ при успехе:**
```json
{
  "status": "success",
  "message": "Emission calculated and user data updated successfully",
  "data": {
    "user_id": 1,
    "phone": "+77771234567",
    "user_name": "Иванов Алексей",
    "total_emission_kg": 1416.25,
    "breakdown": {
      "electricity": 75.0,
      "car": 200.0,
      "public_transport": 131.25,
      "flight": 900.0,
      "physical_activity": 84.0,
      "diet_type": 800,
      "subtotal": 2190.25,
      "waste_sorting_multiplier": 0.8
    }
  }
}
```

**Ответ при ошибке (пользователь не найден):**
```json
{
  "status": "error",
  "message": "Error: User not found with phone number: +77771234567"
}
```

### 6. Расчет эмиссии с автоматической регистрацией/обновлением пользователя

**URL:** `POST /api/emission/calculate_with_user.php`

**Описание:** Рассчитывает выбросы CO2 и автоматически создает нового пользователя или обновляет существующего по номеру телефона. Если пользователь с указанным номером телефона не найден, создается новый пользователь с рассчитанной эмиссией. Если пользователь найден, обновляется его эмиссия.

**Формула:** `((электричество * коэф_электричества) + (км_авто * коэф_авто) + (общ_транспорт * 2.625) + (часы_авиа * 90) + (вес * физ_активность) + тип_питания) * сортировка_отходов`

**Тело запроса:**
```json
{
  "phone": "+77771234567",
  "surname": "Иванов",
  "name": "Алексей",
  "city": "Алматы",
  "electricity": 150,
  "electricity_coefficient": 0.5,
  "car_km": 1000,
  "car_coefficient": 0.2,
  "public_transport_hours": 50,
  "flight_hours": 10,
  "diet_type": 800,
  "physical_activity": 1.2,
  "weight_kg": 70,
  "waste_sorting": 0.8
}
```

**Обязательные поля:**
- `phone` - номер телефона пользователя
- Все поля для расчета эмиссии (как в `/api/emission/calculate.php`)

**Опциональные поля:**
- `surname` - фамилия (используется только при создании нового пользователя)
- `name` - имя (используется только при создании нового пользователя)
- `city` - город (используется только при создании нового пользователя)

**Ответ при создании нового пользователя:**
```json
{
  "status": "success",
  "data": {
    "total_emission_kg": 1416.25,
    "user": {
      "id": 5,
      "phone": "+77771234567",
      "surname": "Иванов",
      "name": "Алексей",
      "city": "Алматы",
      "action": "created"
    },
    "breakdown": {
      "electricity": 75.0,
      "car": 200.0,
      "public_transport": 131.25,
      "flight": 900.0,
      "physical_activity": 84.0,
      "diet_type": 800,
      "subtotal": 2190.25,
      "waste_sorting_multiplier": 0.8
    }
  },
  "formula": "((electricity * coeff) + (car_km * coeff) + (public_transport * 2.625) + (flight * 90) + (weight * activity) + diet) * waste_sorting"
}
```

**Ответ при обновлении существующего пользователя:**
```json
{
  "status": "success",
  "data": {
    "total_emission_kg": 1416.25,
    "user": {
      "id": 1,
      "phone": "+77771234567",
      "surname": "Иванов",
      "name": "Алексей",
      "city": "Алматы",
      "action": "updated"
    },
    "breakdown": {
      "electricity": 75.0,
      "car": 200.0,
      "public_transport": 131.25,
      "flight": 900.0,
      "physical_activity": 84.0,
      "diet_type": 800,
      "subtotal": 2190.25,
      "waste_sorting_multiplier": 0.8
    }
  },
  "formula": "((electricity * coeff) + (car_km * coeff) + (public_transport * 2.625) + (flight * 90) + (weight * activity) + diet) * waste_sorting"
}
```

**Ответ при ошибке:**
```json
{
  "status": "error",
  "message": "Calculation error: Failed to create new user"
}
```

### 7. Получение статистики главной страницы

**URL:** `GET /api/stats/read.php`

**Описание:** Получает текущие значения статистики для отображения на главной странице.

**Ответ при успехе:**
```json
{
  "status": "success",
  "data": {
    "total_trees_planting": 15000,
    "total_supports": 2500,
    "company_partners": 45,
    "cleared_co_on_year": 180000,
    "last_updated": "2025-09-10 14:30:25"
  }
}
```

**Ответ при первом запросе (создание начальных данных):**
```json
{
  "status": "success",
  "data": {
    "total_trees_planting": 0,
    "total_supports": 0,
    "company_partners": 0,
    "cleared_co_on_year": 0,
    "last_updated": "2025-09-10 14:30:25"
  },
  "message": "Initial stats created"
}
```

**Ответ при ошибке:**
```json
{
  "status": "error",
  "message": "Database error: Connection failed"
}
```

### 8. Обновление статистики главной страницы

**URL:** `POST /api/stats/update.php`

**Описание:** Обновляет значения статистики для главной страницы. Если запись не существует, создает новую.

**Тело запроса:**
```json
{
  "total_trees_planting": 15000,
  "total_supports": 2500,
  "company_partners": 45,
  "cleared_co_on_year": 180000
}
```

**Обязательные поля:**
- `total_trees_planting` (число) - общее количество посаженных деревьев
- `total_supports` (число) - общее количество поддержавших проект
- `company_partners` (число) - количество компаний-партнеров
- `cleared_co_on_year` (число) - количество очищенного CO2 за год (в кг)

**Ответ при обновлении существующей записи:**
```json
{
  "status": "success",
  "message": "Homepage stats updated successfully",
  "data": {
    "total_trees_planting": 15000,
    "total_supports": 2500,
    "company_partners": 45,
    "cleared_co_on_year": 180000
  }
}
```

**Ответ при создании новой записи:**
```json
{
  "status": "success",
  "message": "Homepage stats created successfully",
  "data": {
    "id": 1,
    "total_trees_planting": 15000,
    "total_supports": 2500,
    "company_partners": 45,
    "cleared_co_on_year": 180000
  }
}
```

**Ответ при ошибке (неполные данные):**
```json
{
  "status": "error",
  "message": "Unable to update homepage stats. Data is incomplete.",
  "required_fields": [
    "total_trees_planting",
    "total_supports",
    "company_partners",
    "cleared_co_on_year"
  ]
}
```

### 9. Отправка заявки от организации

**URL:** `POST /api/email/send_organization_request.php`

**Описание:** Отправляет письмо с данными организации на указанную почту.

**Тело запроса:**
```json
{
  "organization_name": "ООО Зеленый Мир",
  "contact_person": "Иванов Алексей Петрович",
  "contact_info": "+77771234567",
  "potential_budget": "500000"
}
```

**Ответ при успехе:**
```json
{
  "status": "success",
  "message": "Email sent successfully",
  "data": {
    "organization_name": "ООО Зеленый Мир",
    "contact_person": "Иванов Алексей Петрович", 
    "contact_info": "+77771234567",
    "potential_budget": "500000",
    "sent_to": "info@birch-project.kz",
    "sent_at": "2025-09-04 15:30:25"
  }
}
```

**Ответ при ошибке:**
```json
{
  "status": "error",
  "message": "Email sending failed: Failed to send email"
}
```

## Примеры использования с fetch

### Получение статистики главной страницы
```javascript
fetch('/api/stats/read.php')
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      console.log('Статистика главной страницы:');
      console.log('Посажено деревьев:', data.data.total_trees_planting);
      console.log('Поддержали проект:', data.data.total_supports);
      console.log('Компаний-партнеров:', data.data.company_partners);
      console.log('Очищено CO2 за год:', data.data.cleared_co_on_year, 'кг');
      console.log('Последнее обновление:', data.data.last_updated);
      
      // Обновление элементов на странице
      document.getElementById('trees-count').textContent = data.data.total_trees_planting.toLocaleString();
      document.getElementById('supports-count').textContent = data.data.total_supports.toLocaleString();
      document.getElementById('partners-count').textContent = data.data.company_partners;
      document.getElementById('co2-cleared').textContent = data.data.cleared_co_on_year.toLocaleString();
    }
  })
  .catch(error => console.error('Error:', error));
```

### Обновление статистики главной страницы
```javascript
const statsData = {
  total_trees_planting: 15000,
  total_supports: 2500,
  company_partners: 45,
  cleared_co_on_year: 180000
};

fetch('/api/stats/update.php', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(statsData)
})
.then(response => response.json())
.then(data => {
  if (data.status === 'success') {
    console.log('Статистика обновлена успешно');
    console.log('Обновленные данные:', data.data);
    
    // Показать уведомление об успешном обновлении
    alert('Статистика главной страницы обновлена успешно!');
    
    // Обновить отображение на странице
    location.reload(); // или обновить конкретные элементы
  } else {
    console.error('Ошибка обновления:', data.message);
    if (data.required_fields) {
      console.log('Обязательные поля:', data.required_fields);
    }
  }
})
.catch(error => console.error('Error:', error));
```

### Отправка заявки от организации
```javascript
const organizationData = {
  organization_name: 'ООО Зеленый Мир',
  contact_person: 'Иванов Алексей Петрович',
  contact_info: '+77771234567',
  potential_budget: '500000'
};

fetch('/api/email/send_organization_request.php', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(organizationData)
})
.then(response => response.json())
.then(data => {
  if (data.status === 'success') {
    console.log('Заявка отправлена успешно');
    console.log('Отправлено на:', data.data.sent_to);
    console.log('Время отправки:', data.data.sent_at);
  }
})
.catch(error => console.error('Error:', error));
```

### Расчет эмиссии с автоматической регистрацией/обновлением пользователя
```javascript
const emissionWithUserData = {
  phone: '+77771234567',
  surname: 'Иванов',
  name: 'Алексей', 
  city: 'Алматы',
  electricity: 150,
  electricity_coefficient: 0.5,
  car_km: 1000,
  car_coefficient: 0.2,
  public_transport_hours: 50,
  flight_hours: 10,
  diet_type: 800,
  physical_activity: 1.2,
  weight_kg: 70,
  waste_sorting: 0.8
};

fetch('/api/emission/calculate_with_user.php', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(emissionWithUserData)
})
.then(response => response.json())
.then(data => {
  if (data.status === 'success') {
    console.log('Эмиссия рассчитана:', data.data.total_emission_kg, 'кг CO2');
    console.log('Действие с пользователем:', data.data.user.action); // "created" или "updated"
    console.log('Пользователь ID:', data.data.user.id);
    console.log('Детализация:', data.data.breakdown);
    
    if (data.data.user.action === 'created') {
      console.log('Создан новый пользователь:', data.data.user.surname, data.data.user.name);
    } else {
      console.log('Обновлен существующий пользователь:', data.data.user.surname, data.data.user.name);
    }
  }
})
.catch(error => console.error('Error:', error));
```

### Расчет и обновление эмиссии пользователя
```javascript
const emissionData = {
  phone: '+77771234567',
  electricity: 150,
  electricity_coefficient: 0.5,
  car_km: 1000,
  car_coefficient: 0.2,
  public_transport_hours: 50,
  flight_hours: 10,
  diet_type: 800,
  physical_activity: 1.2,
  weight_kg: 70,
  waste_sorting: 0.8
};

fetch('/api/emission/update_user.php', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(emissionData)
})
.then(response => response.json())
.then(data => {
  if (data.status === 'success') {
    console.log('Эмиссия рассчитана и данные пользователя обновлены');
    console.log('Пользователь:', data.data.user_name);
    console.log('Общая эмиссия:', data.data.total_emission_kg, 'кг CO2');
    console.log('Детализация:', data.data.breakdown);
  }
})
.catch(error => console.error('Error:', error));
```

### Расчет эмиссии CO2
```javascript
const emissionData = {
  electricity: 150,
  electricity_coefficient: 0.5,
  car_km: 1000,
  car_coefficient: 0.2,
  public_transport_hours: 50,
  flight_hours: 10,
  diet_type: 800,
  physical_activity: 1.2,
  weight_kg: 70,
  waste_sorting: 0.8
};

fetch('/api/emission/calculate.php', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(emissionData)
})
.then(response => response.json())
.then(data => {
  if (data.status === 'success') {
    console.log('Общая эмиссия CO2:', data.data.total_emission_kg, 'кг');
    console.log('Детализация:', data.data.breakdown);
  }
})
.catch(error => console.error('Error:', error));
```

### Получение пользователей
```javascript
fetch('/api/users/read.php')
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      console.log('Users:', data.data);
    }
  })
  .catch(error => console.error('Error:', error));
```

### Получение пользователя по телефону
```javascript
const phone = '+77771234567';

fetch(`/api/users/get_by_phone.php?phone=${encodeURIComponent(phone)}`)
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      console.log('User found:', data.data);
      console.log('User plantings:', data.data.plantings);
      
      // Отображение данных о деревьях если есть посадки
      if (data.data.total_trees) {
        console.log('Общее количество деревьев:', data.data.total_trees);
        console.log('Общая сумма инвестиций:', data.data.total_investment, 'тенге');
        
        // Обновление элементов интерфейса
        document.getElementById('user-trees').textContent = data.data.total_trees;
        document.getElementById('user-investment').textContent = data.data.total_investment.toLocaleString() + ' ₸';
      }
      
      // Отображение данных об эмиссии если есть эмиссия
      if (data.data.emission_kg > 0) {
        console.log('Эмиссия CO2:', data.data.emission_tons, 'тонн');
        console.log('Эмиссия CO2:', data.data.emission_kg, 'кг');
        console.log('Процент очищенной эмиссии:', data.data.emission_cleared_percent, '%');
        
        // Обновление элементов интерфейса
        document.getElementById('user-emission-tons').textContent = data.data.emission_tons + ' т';
        document.getElementById('user-emission-kg').textContent = data.data.emission_kg + ' кг';
        document.getElementById('user-emission-percent').textContent = data.data.emission_cleared_percent + '%';
      }
    } else {
      console.log('User not found:', data.message);
    }
  })
  .catch(error => console.error('Error:', error));
```

### Создание посадки (с автоматической регистрацией)
```javascript
const plantingData = {
  surname: 'Иванов',
  name: 'Алексей',
  phone: '+77771234567',
  city: 'Алматы',
  trees_quantity: 100
};

fetch('/api/plantings/create.php', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(plantingData)
})
.then(response => response.json())
.then(data => {
  if (data.status === 'success') {
    console.log('Посадка создана успешно');
    if (data.user_created) {
      console.log('Создан новый пользователь с ID:', data.user_id);
    } else {
      console.log('Использован существующий пользователь с ID:', data.user_id);
    }
  }
})
.catch(error => console.error('Error:', error));
```

## Структура файлов

```
api/
├── config/
│   ├── database.php         # Конфигурация базы данных
│   └── email.php            # Конфигурация email (PHPMailer)
├── models/
│   ├── User.php             # Модель пользователя
│   ├── Planting.php         # Модель посадки
│   └── HomepageStats.php    # Модель статистики главной страницы
├── users/
│   ├── read.php             # Получение всех пользователей
│   └── get_by_phone.php     # Получение пользователя по телефону
├── plantings/
│   └── create.php           # Создание посадки (с автоматической регистрацией)
├── emission/
│   ├── calculate.php             # Расчет эмиссии CO2
│   ├── calculate_with_user.php   # Расчет эмиссии с автоматической регистрацией/обновлением пользователя
│   └── update_user.php           # Расчет эмиссии и обновление пользователя
├── stats/
│   ├── read.php             # Получение статистики главной страницы
│   └── update.php           # Обновление статистики главной страницы
├── email/
│   └── send_organization_request.php  # Отправка заявки от организации (PHPMailer)
├── vendor/                  # Composer зависимости (PHPMailer)
├── composer.json            # Composer конфигурация
└── database_setup.sql       # SQL для создания полной структуры БД
```

## Требования

- PHP 7.4+
- MySQL 5.7+
- PDO расширение для PHP
