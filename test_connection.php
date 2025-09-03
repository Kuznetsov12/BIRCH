<?php
// Тест подключения к базе данных
try {
    $pdo = new PDO("mysql:host=localhost:3306;dbname=birch_db", "root", "rootpassword");
    $pdo->exec("set names utf8");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "✅ Подключение к базе данных успешно!\n";
    
    // Проверим таблицы
    $stmt = $pdo->query("SHOW TABLES");
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
    echo "📋 Найденные таблицы: " . implode(", ", $tables) . "\n";
    
} catch(PDOException $e) {
    echo "❌ Ошибка подключения: " . $e->getMessage() . "\n";
}
?>
