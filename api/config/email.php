<?php
// Конфигурация email для PHPMailer

return [
    // SMTP настройки
    'smtp' => [
        'host' => 'smtp.gmail.com',                    // SMTP сервер
        'username' => 'birch.eco.info@gmail.com',          // Ваш email
        'password' => 'grps rajf kljc ghoz',             // Пароль приложения Gmail (16 символов)
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
        'organization_requests' => 'duckn1ght04@gmail.com',  // Заявки от организаций 
        // TODO: Поменять почту на vladimir.o@birch.green
    ],
    
    // Дополнительные настройки
    'options' => [
        'charset' => 'UTF-8',
        'debug' => 2,                              // Включить для отладки (0-4) - временно установить 2
        'timeout' => 30,                               // Таймаут подключения
    ]
];
?>
