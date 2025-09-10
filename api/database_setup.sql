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

-- Таблица статистики главной страницы
CREATE TABLE homepage_stats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    total_trees_planting INT NOT NULL DEFAULT 0 COMMENT 'Общее количество посаженных деревьев',
    total_supports INT NOT NULL DEFAULT 0 COMMENT 'Общее количество поддержавших',
    company_partners INT NOT NULL DEFAULT 0 COMMENT 'Количество компаний-партнеров',
    cleared_co_on_year INT NOT NULL DEFAULT 0 COMMENT 'Очищено CO2 за год',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
