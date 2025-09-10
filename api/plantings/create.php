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

$database = new Database();
$db = $database->getConnection();

$user = new User($db);
$planting = new Planting($db);

// Получить данные
$data = json_decode(file_get_contents("php://input"));

// Проверить, что все необходимые данные получены
if(
    !empty($data->firstName) &&
    !empty($data->lastName) &&
    !empty($data->phone) &&
    !empty($data->city) &&
    !empty($data->treeCount) &&
    $data->treeCount > 0
){
    try {
        // Начинаем транзакцию
        $db->beginTransaction();
        
        // Ищем пользователя по номеру телефона
        $user->phone = $data->phone;
        $user_exists = $user->findByPhone();
        
        if(!$user_exists) {
            // Если пользователь не найден, создаем нового
            $user->surname = $data->lastName;
            $user->name = $data->firstName;
            $user->phone = $data->phone;
            $user->city = $data->city;
            $user->emission_kg = 0; // По умолчанию
            
            $user_id = $user->create();
            
            if(!$user_id) {
                throw new Exception("Unable to create user");
            }
        } else {
            // Пользователь найден, используем его ID
            $user_id = $user->id;
        }
        
        // Создаем посадку
        $planting->user_id = $user_id;
        $planting->trees_quantity = $data->treeCount;
        $planting->year = date('Y'); // Текущий год с сервера
        $planting->city = $data->city;
        
        if($planting->create()) {
            // Коммитим транзакцию
            $db->commit();
            
            http_response_code(201);
            echo json_encode(array(
                "status" => "success",
                "message" => "Planting was created successfully.",
                "user_created" => !$user_exists,
                "user_id" => $user_id
            ));
        } else {
            throw new Exception("Unable to create planting");
        }
        
    } catch(Exception $e) {
        // Откатываем транзакцию в случае ошибки
        $db->rollback();
        
        http_response_code(503);
        echo json_encode(array(
            "status" => "error",
            "message" => $e->getMessage()
        ));
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
