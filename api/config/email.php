<?php
// Конфигурация email для PHPMailer

return [
    // SMTP настройки
    'smtp' => [
        'host' => 'smtp.gmail.com',                    // SMTP сервер
        'username' => 'your-email@gmail.com',          // Ваш email
        'password' => 'your-app-password',             // Пароль приложения Gmail
        'port' => 587,                                 // Порт SMTP
        'encryption' => 'tls',                         // Тип шифрования (tls/ssl)
    ],
    
    // Настройки отправителя
    'from' => [
        'email' => 'noreply@birch-project.kz',
        'name' => 'BIRCH Project'
    ],
    
    // Получатели писем
    'recipients' => [
        'organization_requests' => 'info@birch-project.kz',  // Заявки от организаций
        'support' => 'support@birch-project.kz',             // Техподдержка
    ],
    
    // Дополнительные настройки
    'options' => [
        'charset' => 'UTF-8',
        'debug' => false,                              // Включить для отладки (0-4)
        'timeout' => 30,                               // Таймаут подключения
    ]
];
?>
