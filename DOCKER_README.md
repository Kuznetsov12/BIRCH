# BIRCH Backend - Docker Setup

## Быстрый запуск с Docker

### Предварительные требования
- Docker Desktop установлен и запущен
- Docker Compose доступен

### Запуск базы данных MySQL

1. **Запустить MySQL и PHPMyAdmin:**
```bash
docker-compose up -d
```

2. **Проверить статус контейнеров:**
```bash
docker-compose ps
```

3. **Доступ к сервисам:**
- **MySQL**: `localhost:3306`
  - Пользователь: `root`
  - Пароль: `rootpassword`
  - База данных: `birch_db`
  
- **PHPMyAdmin**: http://localhost:8080
  - Пользователь: `root`
  - Пароль: `rootpassword`

### Тестирование API

После запуска MySQL контейнера, вы можете тестировать API endpoints:

1. **Открыть test.html** в браузере: `api/test.html`

2. **Доступные endpoints:**
   - `GET /api/users/read.php` - получить всех пользователей
   - `GET /api/users/get_by_phone.php?phone=+77771234567` - найти пользователя по телефону
   - `POST /api/plantings/create.php` - создать посадку
   - `POST /api/emission/calculate.php` - рассчитать выбросы CO2
   - `POST /api/emission/update_user.php` - обновить выбросы пользователя
   - `POST /api/email/send_organization_request.php` - отправить email

### Управление контейнерами

**Остановить все сервисы:**
```bash
docker-compose down
```

**Остановить с удалением данных:**
```bash
docker-compose down -v
```

**Просмотр логов:**
```bash
docker-compose logs mysql
docker-compose logs phpmyadmin
```

**Подключение к MySQL контейнеру:**
```bash
docker exec -it birch_mysql mysql -u root -p birch_db
```

### Структура базы данных

База данных автоматически создается с тестовыми данными:

**Таблица users:**
- id (AUTO_INCREMENT)
- surname, name (VARCHAR)
- phone (VARCHAR, UNIQUE)
- city (VARCHAR)
- emission_kg (FLOAT)
- created_at (TIMESTAMP)

**Таблица plantings:**
- id (AUTO_INCREMENT)
- user_id (INT, FK)
- trees_quantity (INT)
- year (INT)
- city (VARCHAR)
- created_at (TIMESTAMP)

### Troubleshooting

**Если порт 3306 занят:**
1. Измените порт в docker-compose.yml на другой (например, 3307:3306)
2. Обновите настройки в `config/database.php`

**Если PHPMyAdmin не загружается:**
- Подождите несколько секунд после запуска MySQL
- Проверьте логи: `docker-compose logs phpmyadmin`

**Пересоздание базы данных:**
```bash
docker-compose down -v
docker-compose up -d
```
