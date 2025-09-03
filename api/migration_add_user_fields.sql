-- Миграция для обновления структуры таблицы users
-- Выполните этот файл если у вас уже есть существующая база данных

USE birch_db;

-- Удаляем поле email и iin если они существуют (безопасный способ)
-- Проверяем существование колонок перед удалением
SET @col_exists_email = 0;
SELECT COUNT(*) INTO @col_exists_email 
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() 
  AND TABLE_NAME = 'users' 
  AND COLUMN_NAME = 'email';

SET @sql = IF(@col_exists_email > 0, 'ALTER TABLE users DROP COLUMN email', 'SELECT 1');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @col_exists_iin = 0;
SELECT COUNT(*) INTO @col_exists_iin 
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() 
  AND TABLE_NAME = 'users' 
  AND COLUMN_NAME = 'iin';

SET @sql = IF(@col_exists_iin > 0, 'ALTER TABLE users DROP COLUMN iin', 'SELECT 1');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Добавляем поле surname в начало
ALTER TABLE users ADD COLUMN surname VARCHAR(255) NOT NULL AFTER id;

-- Изменяем phone на NOT NULL и UNIQUE
ALTER TABLE users MODIFY COLUMN phone VARCHAR(20) NOT NULL UNIQUE;

-- Добавляем недостающие поля если их нет
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS city VARCHAR(255) AFTER phone,
ADD COLUMN IF NOT EXISTS emission_kg FLOAT DEFAULT 0 AFTER city;

-- Обновляем существующие записи тестовыми данными
UPDATE users SET 
    surname = 'Иванов',
    phone = '+77771234567', 
    city = 'Алматы', 
    emission_kg = 1250.5 
WHERE id = 1;

UPDATE users SET 
    surname = 'Петрова',
    phone = '+77712345678', 
    city = 'Астана', 
    emission_kg = 980.3 
WHERE id = 2;

UPDATE users SET 
    surname = 'Сидоров',
    phone = '+77723456789', 
    city = 'Шымкент', 
    emission_kg = 1450.8 
WHERE id = 3;
