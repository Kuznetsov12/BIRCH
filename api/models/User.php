<?php
class User {
    private $conn;
    private $table_name = "users";

    public $id;
    public $surname;
    public $name;
    public $phone;
    public $city;
    public $emission_kg;
    public $created_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Получить всех пользователей с их посадками
    function readAll() {
        $query = "SELECT 
                    u.id as user_id, 
                    u.surname as user_surname,
                    u.name as user_name, 
                    u.phone,
                    u.city as user_city,
                    u.emission_kg,
                    u.created_at as user_created_at,
                    p.id as planting_id,
                    p.trees_quantity,
                    p.year,
                    p.city,
                    p.created_at as planting_created_at
                  FROM " . $this->table_name . " u
                  LEFT JOIN plantings p ON u.id = p.user_id
                  ORDER BY u.id, p.created_at DESC";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    // Создать пользователя
    function create() {
        $query = "INSERT INTO " . $this->table_name . "
                SET
                    surname=:surname,
                    name=:name, 
                    phone=:phone, 
                    city=:city, 
                    emission_kg=:emission_kg";

        $stmt = $this->conn->prepare($query);

        $this->surname=htmlspecialchars(strip_tags($this->surname));
        $this->name=htmlspecialchars(strip_tags($this->name));
        $this->phone=htmlspecialchars(strip_tags($this->phone));
        $this->city=htmlspecialchars(strip_tags($this->city));
        $this->emission_kg=floatval($this->emission_kg);

        $stmt->bindParam(":surname", $this->surname);
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":phone", $this->phone);
        $stmt->bindParam(":city", $this->city);
        $stmt->bindParam(":emission_kg", $this->emission_kg);

        if($stmt->execute()) {
            return $this->conn->lastInsertId();
        }

        return false;
    }

    // Найти пользователя по номеру телефона
    function findByPhone() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE phone = ? LIMIT 1";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->phone);
        $stmt->execute();
        
        if($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            
            $this->id = $row['id'];
            $this->surname = $row['surname'];
            $this->name = $row['name'];
            $this->phone = $row['phone'];
            $this->city = $row['city'];
            $this->emission_kg = $row['emission_kg'];
            $this->created_at = $row['created_at'];
            
            return true;
        }
        
        return false;
    }

    // Обновить эмиссию пользователя
    function updateEmission() {
        $query = "UPDATE " . $this->table_name . " 
                SET emission_kg = :emission_kg 
                WHERE id = :id";
        
        $stmt = $this->conn->prepare($query);
        
        $this->emission_kg = floatval($this->emission_kg);
        $this->id = intval($this->id);
        
        $stmt->bindParam(":emission_kg", $this->emission_kg);
        $stmt->bindParam(":id", $this->id);
        
        return $stmt->execute();
    }
}
?>
