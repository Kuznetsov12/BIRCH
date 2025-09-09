<?php
// Конфигурация email для PHPMailer

return [
    // SMTP настройки
    'smtp' => [
        'host' => 'smtp.gmail.com',                    // SMTP сервер
        'username' => 'birch.eco.info@gmail.com',          // Ваш email
        'password' => 'ЗАМЕНИТЕ_НА_ВАШ_ПАРОЛЬ_ПРИЛОЖЕНИЯ',             // Пароль приложения Gmail (16 символов)
        'port' => 587,                                 // Порт SMTP
        'encryption' => 'tls',                         // Тип шифрования (tls/ssl)
    ],
    
    // Настройки отправителя
    'from' => [
        'email' => 'birch.eco.info@gmail.com',
        'name' => 'BIRCH Project'
    ],
    
    // Получатели писем
    'recipients' => [
        'organization_requests' => 'vladimir.o@birch.green',  // Заявки от организаций
    ],
    
    // Дополнительные настройки
    'options' => [
        'charset' => 'UTF-8',
        'debug' => 2,                              // Включить для отладки (0-4) - временно установить 2
        'timeout' => 30,                               // Таймаут подключения
    ]
];
?>
