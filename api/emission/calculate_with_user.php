<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Обрабатываем preflight OPTIONS запрос
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once '../config/database.php';
include_once '../models/User.php';
include_once '../models/HomepageStats.php';

// Получить данные
$data = json_decode(file_get_contents("php://input"));

// Проверить, что все необходимые данные получены
if(
    isset($data->phone) &&
    isset($data->electricity) &&
    isset($data->electricity_coefficient) &&
    isset($data->car_km) &&
    isset($data->car_coefficient) &&
    isset($data->public_transport_hours) &&
    isset($data->flight_hours) &&
    isset($data->diet_type) &&
    isset($data->physical_activity) &&
    isset($data->weight_kg) &&
    isset($data->waste_sorting)
){
    try {
        // Подключение к базе данных
        $database = new Database();
        $db = $database->getConnection();
        
        // Преобразуем все значения в числа
        $electricity = floatval($data->electricity);
        $electricity_coefficient = floatval($data->electricity_coefficient);
        $car_km = floatval($data->car_km);
        $car_coefficient = floatval($data->car_coefficient);
        $public_transport_hours = floatval($data->public_transport_hours);
        $flight_hours = floatval($data->flight_hours);
        $diet_type = floatval($data->diet_type);
        $physical_activity = floatval($data->physical_activity);
        $weight_kg = floatval($data->weight_kg);
        $waste_sorting = floatval($data->waste_sorting);
        
        // Расчет по формуле:
        // ((Эл. * коэф электричества) + (Км авто * коэф авто) + (общ транспорт * 2,625) + (часы авиа * 90) + (вес * физ активность) + тип питания) * сортирую отходы
        
        $electricity_emission = $electricity * $electricity_coefficient;
        $car_emission = $car_km * $car_coefficient;
        $public_transport_emission = $public_transport_hours * 2.625;
        $flight_emission = $flight_hours * 90;
        $physical_emission = $weight_kg * $physical_activity;
        
        // Промежуточный расчет
        $subtotal = $electricity_emission + $car_emission + $public_transport_emission + $flight_emission + $physical_emission + $diet_type;
        
        // Итоговый расчет с учетом сортировки отходов
        $total_emission = $subtotal * $waste_sorting;
        
        // Округляем до 2 знаков после запятой
        $total_emission = round($total_emission, 2);
        
        // Работа с пользователем
        $user = new User($db);
        $user->phone = $data->phone;
        
        // Инициализация статистики
        $stats = new HomepageStats($db);
        $stats->ensureExists();
        
        $user_action = "";
        
        // Ищем пользователя по номеру телефона
        if($user->findByPhone()) {
            // Пользователь найден - обновляем эмиссию
            $user->emission_kg = $total_emission;
            if($user->updateEmission()) {
                $user_action = "updated";
            } else {
                throw new Exception("Failed to update user emission");
            }
        } else {
            // Пользователь не найден - создаем нового
            $user->surname = isset($data->surname) ? $data->surname : "";
            $user->name = isset($data->name) ? $data->name : "";
            $user->city = isset($data->city) ? $data->city : "";
            $user->emission_kg = $total_emission;
            
            $user_id = $user->create();
            if($user_id) {
                $user->id = $user_id;
                $user_action = "created";
                
                // Увеличиваем счетчик поддерживающих при создании нового пользователя
                $stats->incrementSupports();
            } else {
                throw new Exception("Failed to create new user");
            }
        }
        
        http_response_code(200);
        echo json_encode(array(
            "status" => "success",
            "data" => array(
                "total_emission_kg" => $total_emission,
                "user" => array(
                    "id" => $user->id,
                    "phone" => $user->phone,
                    "surname" => $user->surname,
                    "name" => $user->name,
                    "city" => $user->city,
                    "action" => $user_action
                ),
                "breakdown" => array(
                    "electricity" => round($electricity_emission, 2),
                    "car" => round($car_emission, 2),
                    "public_transport" => round($public_transport_emission, 2),
                    "flight" => round($flight_emission, 2),
                    "physical_activity" => round($physical_emission, 2),
                    "diet_type" => $diet_type,
                    "subtotal" => round($subtotal, 2),
                    "waste_sorting_multiplier" => $waste_sorting
                )
            ),
            "formula" => "((electricity * coeff) + (car_km * coeff) + (public_transport * 2.625) + (flight * 90) + (weight * activity) + diet) * waste_sorting"
        ), JSON_UNESCAPED_UNICODE);
        
    } catch(Exception $e) {
        http_response_code(500);
        echo json_encode(array(
            "status" => "error",
            "message" => "Calculation error: " . $e->getMessage()
        ), JSON_UNESCAPED_UNICODE);
    }
    
} else {
    http_response_code(400);
    echo json_encode(array(
        "status" => "error",
        "message" => "Unable to calculate emission. Data is incomplete.",
        "required_fields" => array(
            "phone",
            "electricity",
            "electricity_coefficient", 
            "car_km",
            "car_coefficient",
            "public_transport_hours",
            "flight_hours",
            "diet_type",
            "physical_activity", 
            "weight_kg",
            "waste_sorting"
        ),
        "optional_fields" => array(
            "surname",
            "name", 
            "city"
        )
    ), JSON_UNESCAPED_UNICODE);
}
?>
