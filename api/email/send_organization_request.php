<?php
// Ensure we don't output PHP warnings/notices as HTML (which breaks JSON responses)
ini_set('display_errors', 0);
ini_set('log_errors', 1);
// Ensure logs directory exists
$logDir = __DIR__ . '/../logs';
if (!is_dir($logDir)) {
    @mkdir($logDir, 0755, true);
}
ini_set('error_log', $logDir . '/email_errors.log');
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST , OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Обработка preflight OPTIONS запроса
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Подключаем PHPMailer и конфигурацию
$autoloadPath = __DIR__ . '/../vendor/autoload.php';
if (!file_exists($autoloadPath)) {
    http_response_code(500);
    echo json_encode(array(
        "status" => "error",
        "message" => "Composer autoloader not found. Run 'composer install' in the api directory."
    ));
    exit;
}

require_once $autoloadPath;
$emailConfig = require_once __DIR__ . '/../config/email.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Получить данные
$data = json_decode(file_get_contents("php://input"));

// Проверить, что все необходимые данные получены
if(
    !empty($data->organization_name) &&
    !empty($data->contact_person) &&
    !empty($data->contact_info) &&
    !empty($data->potential_budget)
){
    try {
        // Создаем экземпляр PHPMailer
        $mail = new PHPMailer(true);

        // Настройки сервера из конфигурации
        $mail->isSMTP();
        $mail->Host       = $emailConfig['smtp']['host'];
        $mail->SMTPAuth   = true;
        $mail->Username   = $emailConfig['smtp']['username'];
        $mail->Password   = $emailConfig['smtp']['password'];
        $mail->SMTPSecure = $emailConfig['smtp']['encryption'] === 'tls' ? PHPMailer::ENCRYPTION_STARTTLS : PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = $emailConfig['smtp']['port'];

        // Настройки отправителя и получателя
        $mail->setFrom($emailConfig['from']['email'], $emailConfig['from']['name']);
        $mail->addAddress($emailConfig['recipients']['organization_requests']);
        
        // Добавляем Reply-To только если contact_info содержит email адрес
        if (filter_var($data->contact_info, FILTER_VALIDATE_EMAIL)) {
            $mail->addReplyTo($data->contact_info, $data->contact_person);
        }

        // Настройки письма
        $mail->isHTML(true);
        $mail->CharSet = $emailConfig['options']['charset'];
        $mail->Timeout = $emailConfig['options']['timeout'];
        
        // Включаем отладку если нужно
        if($emailConfig['options']['debug']) {
            $mail->SMTPDebug = SMTP::DEBUG_SERVER;
        }
        $mail->Subject = 'Новая заявка от организации: ' . $data->organization_name;
        
        // HTML содержимое письма
        $mail->Body = "
        <html>
        <head>
            <title>Новая заявка от организации</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    line-height: 1.6;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    box-shadow: 0 0 10px rgba(0,0,0,0.1);
                }
                .header { 
                    background: linear-gradient(135deg, #4CAF50, #45a049);
                    color: white; 
                    padding: 30px; 
                    text-align: center;
                    border-radius: 5px 5px 0 0;
                }
                .header h1 {
                    margin: 0;
                    font-size: 28px;
                    font-weight: bold;
                }
                .content { 
                    padding: 30px; 
                    background-color: #ffffff;
                }
                .field { 
                    margin-bottom: 20px; 
                    padding: 15px;
                    background-color: #f9f9f9;
                    border-radius: 5px;
                    border-left: 4px solid #4CAF50;
                }
                .field-label { 
                    font-weight: bold; 
                    color: #2d5a2d; 
                    font-size: 14px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 8px;
                    display: block;
                }
                .field-value { 
                    font-size: 16px;
                    color: #333;
                    font-weight: 500;
                }
                .budget {
                    background: linear-gradient(135deg, #ff6b6b, #ee5a52);
                    color: white;
                    padding: 15px;
                    border-radius: 5px;
                    text-align: center;
                    font-size: 18px;
                    font-weight: bold;
                    margin: 20px 0;
                }
                .footer { 
                    background-color: #2d5a2d; 
                    color: #a8d5a8;
                    padding: 20px; 
                    text-align: center; 
                    font-size: 12px;
                    border-radius: 0 0 5px 5px;
                }
                .footer a {
                    color: #4CAF50;
                    text-decoration: none;
                }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>🌱 BIRCH PROJECT</h1>
                    <p style='margin: 10px 0 0 0; font-size: 16px;'>Новая заявка от организации</p>
                </div>
                
                <div class='content'>
                    <div class='field'>
                        <span class='field-label'>🏢 Наименование организации</span>
                        <div class='field-value'>" . htmlspecialchars($data->organization_name) . "</div>
                    </div>
                    
                    <div class='field'>
                        <span class='field-label'>👤 ФИО контактного лица</span>
                        <div class='field-value'>" . htmlspecialchars($data->contact_person) . "</div>
                    </div>
                    
                    <div class='field'>
                        <span class='field-label'>📞 Контактная информация</span>
                        <div class='field-value'>" . htmlspecialchars($data->contact_info) . "</div>
                    </div>
                    
                    <div class='budget'>
                        💰 Потенциальный бюджет: " . number_format(floatval($data->potential_budget), 0, ',', ' ') . " ₸
                    </div>
                </div>
                
                <div class='footer'>
                    <p><strong>BIRCH PROJECT</strong> - Эко-система для зеленого будущего</p>
                    <p>Письмо отправлено автоматически • " . date('d.m.Y в H:i:s') . "</p>
                    <p>Не отвечайте на это письмо. Для связи используйте контактные данные выше.</p>
                </div>
            </div>
        </body>
        </html>";

        // Альтернативный текстовый контент
        $mail->AltBody = "
BIRCH PROJECT - Новая заявка от организации

Наименование организации: " . $data->organization_name . "
ФИО контактного лица: " . $data->contact_person . "
Контактная информация: " . $data->contact_info . "
Потенциальный бюджет: " . number_format(floatval($data->potential_budget), 0, ',', ' ') . " ₸

Дата отправки: " . date('d.m.Y в H:i:s') . "
        ";

        // Отправляем письмо
        $mail->send();
        
        http_response_code(200);
        echo json_encode(array(
            "status" => "success",
            "message" => "Email sent successfully via PHPMailer",
            "data" => array(
                "organization_name" => $data->organization_name,
                "contact_person" => $data->contact_person,
                "contact_info" => $data->contact_info,
                "potential_budget" => $data->potential_budget,
                "sent_to" => $emailConfig['recipients']['organization_requests'],
                "sent_at" => date('Y-m-d H:i:s'),
                "method" => "PHPMailer SMTP"
            )
        ));
        
    } catch (Exception $e) {
        // Log full exception for server-side debugging
        error_log("PHPMailer exception: " . $e->getMessage() . " -- ErrorInfo: " . $mail->ErrorInfo);

        // Try fallback using PHP mail() if available
        $to = $emailConfig['recipients']['organization_requests'];
        $subject = 'Новая заявка от организации: ' . ($data->organization_name ?? 'No name');
        $plainMessage = "Новая заявка от организации\n\n" .
            "Наименование организации: " . ($data->organization_name ?? '') . "\n" .
            "ФИО контактного лица: " . ($data->contact_person ?? '') . "\n" .
            "Контактная информация: " . ($data->contact_info ?? '') . "\n" .
            "Потенциальный бюджет: " . ($data->potential_budget ?? '') . "\n\n" .
            "Отправлено автоматически.";

        $headers = "From: " . ($emailConfig['from']['email'] ?? 'no-reply@' . $_SERVER['SERVER_NAME']) . "\r\n" .
                   "Reply-To: " . ($data->contact_info ?? ($emailConfig['from']['email'] ?? '')) . "\r\n" .
                   "Content-Type: text/plain; charset=UTF-8\r\n" .
                   "X-Mailer: PHP/" . phpversion();

        $mailSent = false;
        try {
            $mailSent = @mail($to, $subject, $plainMessage, $headers);
        } catch (Exception $mailEx) {
            error_log('PHP mail() exception: ' . $mailEx->getMessage());
            $mailSent = false;
        }

        if ($mailSent) {
            http_response_code(200);
            echo json_encode(array(
                "status" => "success",
                "message" => "Email sent via PHP mail() fallback",
                "data" => array(
                    "organization_name" => $data->organization_name,
                    "contact_person" => $data->contact_person,
                    "contact_info" => $data->contact_info,
                    "potential_budget" => $data->potential_budget,
                    "sent_to" => $to,
                    "sent_at" => date('Y-m-d H:i:s'),
                    "method" => "php_mail_fallback"
                )
            ));
            exit;
        }

        // If fallback also failed, return structured JSON error
        http_response_code(500);
        echo json_encode(array(
            "status" => "error",
            "message" => "Email sending failed via PHPMailer and fallback mail().",
            "debug" => $mail->ErrorInfo,
            "exception" => $e->getMessage()
        ));
    }
    
} else {
    http_response_code(400);
    echo json_encode(array(
        "status" => "error",
        "message" => "Unable to send email. Data is incomplete.",
        "required_fields" => array(
            "organization_name",
            "contact_person", 
            "contact_info",
            "potential_budget"
        )
    ));
}
?>
