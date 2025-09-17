<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Обработка preflight OPTIONS запроса
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once '../config/database.php';
include_once '../models/User.php';
include_once '../models/Planting.php';
include_once '../models/HomepageStats.php';

$database = new Database();
$db = $database->getConnection();

$user = new User($db);
$planting = new Planting($db);
$stats = new HomepageStats($db);

// Получить данные
$data = json_decode(file_get_contents("php://input"));
// DEBUG: лог входящих данных для локальной отладки
@file_put_contents(__DIR__ . '/logs/plantings_create_incoming_' . date('Ymd') . '.log', date(DATE_ATOM) . " RAW: " . file_get_contents('php://input') . "\n", FILE_APPEND);

// Проверить, что все необходимые данные получены
if(
    !empty($data->surname) &&
    !empty($data->name) &&
    !empty($data->phone) &&
    !empty($data->city) &&
    !empty($data->trees_quantity) &&
    $data->trees_quantity > 0
){
    try {
        // Начинаем транзакцию
        $db->beginTransaction();
        
        // Обеспечиваем существование записи статистики
        $stats->ensureExists();
        
        // Ищем пользователя по номеру телефона
        $user->phone = $data->phone;
        $user_exists = $user->findByPhone();
        $user_was_created = false;
        
        if(!$user_exists) {
            // Если пользователь не найден, создаем нового
            $user->surname = $data->surname;
            $user->name = $data->name;
            $user->phone = $data->phone;
            $user->city = $data->city;
            $user->emission_kg = 0; // По умолчанию
            
            $user_id = $user->create();
            
            if(!$user_id) {
                throw new Exception("Unable to create user");
            }
            
            $user_was_created = true;
            // Увеличиваем счетчик поддерживающих при создании нового пользователя
            $stats->incrementSupports();
        } else {
            // Пользователь найден, используем его ID
            $user_id = $user->id;
        }
        
        // Создаем посадку
        $planting->user_id = $user_id;
        $planting->trees_quantity = $data->trees_quantity;
        $planting->year = date('Y'); // Текущий год с сервера
        $planting->city = $data->city;
        
        if($planting->create()) {
            // Увеличиваем счетчик посаженных деревьев
            $stats->incrementTrees($data->trees_quantity);
            
            // Коммитим транзакцию
            $db->commit();
            
            http_response_code(201);
            echo json_encode(array(
                "status" => "success",
                "message" => "Planting was created successfully.",
                "user_created" => $user_was_created,
                "user_id" => $user_id,
                "trees_planted" => $data->trees_quantity,
                "stats_updated" => array(
                    "trees_counter_increased" => true,
                    "supports_counter_increased" => $user_was_created
                )
            ));
            @file_put_contents(__DIR__ . '/logs/plantings_create_success_' . date('Ymd') . '.log', date(DATE_ATOM) . " CREATED user_id:" . $user_id . " trees:" . $data->trees_quantity . "\n", FILE_APPEND);
        } else {
            throw new Exception("Unable to create planting");
        }
        
    } catch(Exception $e) {
        // Откатываем транзакцию в случае ошибки
        $db->rollback();
        
        http_response_code(503);
        $errMsg = $e->getMessage();
        echo json_encode(array(
            "status" => "error",
            "message" => $errMsg
        ));
        @file_put_contents(__DIR__ . '/logs/plantings_create_error_' . date('Ymd') . '.log', date(DATE_ATOM) . " ERROR: " . $errMsg . "\n", FILE_APPEND);
    }
    
} else {
    http_response_code(400);
    echo json_encode(array(
        "status" => "error",
        "message" => "Unable to create planting. Data is incomplete.",
        "required_fields" => array("surname", "name", "phone", "city", "trees_quantity")
    ));
}
?>
