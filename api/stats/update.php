<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, PUT");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../models/HomepageStats.php';

// Получить данные
$data = json_decode(file_get_contents("php://input"));

// Проверить, что все необходимые данные получены
if(
    isset($data->total_trees_planting) &&
    isset($data->total_supports) &&
    isset($data->company_partners) &&
    isset($data->cleared_co_on_year)
){
    try {
        // Подключение к базе данных
        $database = new Database();
        $db = $database->getConnection();
        
        // Создание объекта статистики
        $stats = new HomepageStats($db);
        
        // Проверяем, есть ли уже записи
        if($stats->read()) {
            // Обновляем существующую запись
            $stats->total_trees_planting = $data->total_trees_planting;
            $stats->total_supports = $data->total_supports;
            $stats->company_partners = $data->company_partners;
            $stats->cleared_co_on_year = $data->cleared_co_on_year;
            
            if($stats->update()) {
                http_response_code(200);
                echo json_encode(array(
                    "status" => "success",
                    "message" => "Homepage stats updated successfully",
                    "data" => array(
                        "total_trees_planting" => intval($stats->total_trees_planting),
                        "total_supports" => intval($stats->total_supports),
                        "company_partners" => intval($stats->company_partners),
                        "cleared_co_on_year" => intval($stats->cleared_co_on_year)
                    )
                ), JSON_UNESCAPED_UNICODE);
            } else {
                throw new Exception("Failed to update stats");
            }
        } else {
            // Создаем новую запись
            $stats->total_trees_planting = $data->total_trees_planting;
            $stats->total_supports = $data->total_supports;
            $stats->company_partners = $data->company_partners;
            $stats->cleared_co_on_year = $data->cleared_co_on_year;
            
            $new_id = $stats->create();
            if($new_id) {
                http_response_code(201);
                echo json_encode(array(
                    "status" => "success",
                    "message" => "Homepage stats created successfully",
                    "data" => array(
                        "id" => $new_id,
                        "total_trees_planting" => intval($stats->total_trees_planting),
                        "total_supports" => intval($stats->total_supports),
                        "company_partners" => intval($stats->company_partners),
                        "cleared_co_on_year" => intval($stats->cleared_co_on_year)
                    )
                ), JSON_UNESCAPED_UNICODE);
            } else {
                throw new Exception("Failed to create stats");
            }
        }
        
    } catch(Exception $e) {
        http_response_code(500);
        echo json_encode(array(
            "status" => "error",
            "message" => "Database error: " . $e->getMessage()
        ), JSON_UNESCAPED_UNICODE);
    }
    
} else {
    http_response_code(400);
    echo json_encode(array(
        "status" => "error",
        "message" => "Unable to update homepage stats. Data is incomplete.",
        "required_fields" => array(
            "total_trees_planting",
            "total_supports",
            "company_partners",
            "cleared_co_on_year"
        )
    ), JSON_UNESCAPED_UNICODE);
}
?>
