<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../models/User.php';

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

$stmt = $user->readAll();
$num = $stmt->rowCount();

if($num > 0) {
    $users_arr = array();
    $users_data = array();
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        
        // Если пользователя еще нет в массиве, добавляем его
        if (!isset($users_data[$user_id])) {
            $users_data[$user_id] = array(
                "id" => $user_id,
                "surname" => $user_surname,
                "name" => $user_name,
                "phone" => $phone,
                "city" => $user_city,
                "emission_kg" => floatval($emission_kg),
                "created_at" => $user_created_at,
                "plantings" => array()
            );
        }
        
        // Если есть посадка, добавляем её
        if ($planting_id !== null) {
            $planting_item = array(
                "id" => $planting_id,
                "trees_quantity" => $trees_quantity,
                "year" => $year,
                "city" => $city,
                "created_at" => $planting_created_at
            );
            
            array_push($users_data[$user_id]["plantings"], $planting_item);
        }
    }
    
    // Преобразуем ассоциативный массив в индексированный
    foreach($users_data as $user_data) {
        array_push($users_arr, $user_data);
    }
    
    http_response_code(200);
    echo json_encode(array(
        "status" => "success",
        "data" => $users_arr
    ), JSON_UNESCAPED_UNICODE);
} else {
    http_response_code(404);
    echo json_encode(array(
        "status" => "error",
        "message" => "No users found."
    ), JSON_UNESCAPED_UNICODE);
}
?>
