<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../models/User.php';

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

// Получить номер телефона из параметров запроса
$phone = isset($_GET['phone']) ? $_GET['phone'] : '';

if(!empty($phone)) {
    $user->phone = $phone;
    
    if($user->findByPhone()) {
        // Получаем посадки пользователя
        $planting_query = "SELECT * FROM plantings WHERE user_id = ? ORDER BY created_at DESC";
        $planting_stmt = $db->prepare($planting_query);
        $planting_stmt->bindParam(1, $user->id);
        $planting_stmt->execute();
        
        $plantings = array();
        while ($planting_row = $planting_stmt->fetch(PDO::FETCH_ASSOC)) {
            $planting_item = array(
                "id" => $planting_row['id'],
                "trees_quantity" => $planting_row['trees_quantity'],
                "year" => $planting_row['year'],
                "city" => $planting_row['city'],
                "created_at" => $planting_row['created_at']
            );
            array_push($plantings, $planting_item);
        }
        
        // Вычисляем общее количество деревьев
        $total_trees = 0;
        foreach ($plantings as $planting) {
            $total_trees += $planting['trees_quantity'];
        }
        
        // Формируем ответ
        $user_item = array(
            "id" => $user->id,
            "surname" => $user->surname,
            "name" => $user->name,
            "phone" => $user->phone,
            "city" => $user->city,
            "emission_kg" => floatval($user->emission_kg),
            "created_at" => $user->created_at,
            "plantings" => $plantings
        );
        
        // Добавляем дополнительные расчёты если у пользователя есть деревья
        if ($total_trees > 0) {
            $user_item["total_trees"] = $total_trees; // общее количество деревьев
            $user_item["total_investment"] = $total_trees * 2000; // общая сумма инвестиций
        }
        
        // Добавляем расчёты по эмиссии если у пользователя есть эмиссия
        if ($user->emission_kg > 0) {
            $emission_tons = round(floatval($user->emission_kg) / 1000, 3); // эмиссия в тоннах
            $trees_need = ceil($emission_tons / 0.025); // деревьев необходимых для компенсации
            $user_item["emission_tons"] = $emission_tons;
            $user_item["trees_need"] = $trees_need;
            $user_item["price_need"] = $trees_need * 2000; // деревьев посажено
            $user_item["emission_cleared_percent"] = round($total_trees * 100 / $trees_need, 2); // процент очищенной эмиссии
        }
        
        http_response_code(200);
        echo json_encode(array(
            "status" => "success",
            "data" => $user_item
        ), JSON_UNESCAPED_UNICODE);
    } else {
        http_response_code(404);
        echo json_encode(array(
            "status" => "error",
            "message" => "User not found with phone number: " . $phone
        ), JSON_UNESCAPED_UNICODE);
    }
} else {
    http_response_code(400);
    echo json_encode(array(
        "status" => "error",
        "message" => "Phone parameter is required.",
        "usage" => "GET /api/users/get_by_phone.php?phone=+77771234567"
    ), JSON_UNESCAPED_UNICODE);
}
?>
