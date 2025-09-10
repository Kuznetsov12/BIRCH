<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../models/HomepageStats.php';

try {
    // Подключение к базе данных
    $database = new Database();
    $db = $database->getConnection();
    
    // Создание объекта статистики
    $stats = new HomepageStats($db);
    
    // Получение данных
    if($stats->read()) {
        http_response_code(200);
        echo json_encode(array(
            "status" => "success",
            "data" => array(
                "total_trees_planting" => intval($stats->total_trees_planting),
                "total_supports" => intval($stats->total_supports),
                "company_partners" => intval($stats->company_partners),
                "cleared_co_on_year" => intval($stats->cleared_co_on_year),
                "last_updated" => $stats->updated_at
            )
        ), JSON_UNESCAPED_UNICODE);
    } else {
        // Если данных нет, создаем начальную запись
        $stats->total_trees_planting = 0;
        $stats->total_supports = 0;
        $stats->company_partners = 0;
        $stats->cleared_co_on_year = 0;
        
        $new_id = $stats->create();
        if($new_id) {
            $stats->id = $new_id;
            http_response_code(200);
            echo json_encode(array(
                "status" => "success",
                "data" => array(
                    "total_trees_planting" => 0,
                    "total_supports" => 0,
                    "company_partners" => 0,
                    "cleared_co_on_year" => 0,
                    "last_updated" => date('Y-m-d H:i:s')
                ),
                "message" => "Initial stats created"
            ), JSON_UNESCAPED_UNICODE);
        } else {
            throw new Exception("Failed to create initial stats");
        }
    }
    
} catch(Exception $e) {
    http_response_code(500);
    echo json_encode(array(
        "status" => "error",
        "message" => "Database error: " . $e->getMessage()
    ), JSON_UNESCAPED_UNICODE);
}
?>
