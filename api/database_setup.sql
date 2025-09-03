-- Создание базы данных
CREATE DATABASE IF NOT EXISTS birch_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE birch_db;

-- Таблица пользователей
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    surname VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL UNIQUE,
    city VARCHAR(255),
    emission_kg FLOAT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица посадок
CREATE TABLE plantings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    trees_quantity INT NOT NULL,
    year INT NOT NULL,
    city VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Вставка тестовых данных
INSERT INTO users (surname, name, phone, city, emission_kg) VALUES
('Иванов', 'Алексей', '+77771234567', 'Алматы', 1250.5),
('Петрова', 'Мария', '+77712345678', 'Астана', 980.3),
('Сидоров', 'Дмитрий', '+77723456789', 'Шымкент', 1450.8);

INSERT INTO plantings (user_id, trees_quantity, year, city) VALUES
(1, 50, 2024, 'Алматы'),
(1, 25, 2023, 'Астана'),
(2, 100, 2024, 'Шымкент'),
(3, 75, 2024, 'Караганда');
