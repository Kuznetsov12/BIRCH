<?php
class Planting {
    private $conn;
    private $table_name = "plantings";

    public $id;
    public $user_id;
    public $trees_quantity;
    public $year;
    public $city;
    public $created_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Создать посадку
    function create() {
        $query = "INSERT INTO " . $this->table_name . "
                SET
                    user_id=:user_id, 
                    trees_quantity=:trees_quantity, 
                    year=:year, 
                    city=:city";

        $stmt = $this->conn->prepare($query);

        $this->user_id=htmlspecialchars(strip_tags($this->user_id));
        $this->trees_quantity=htmlspecialchars(strip_tags($this->trees_quantity));
        $this->year=htmlspecialchars(strip_tags($this->year));
        $this->city=htmlspecialchars(strip_tags($this->city));

        $stmt->bindParam(":user_id", $this->user_id);
        $stmt->bindParam(":trees_quantity", $this->trees_quantity);
        $stmt->bindParam(":year", $this->year);
        $stmt->bindParam(":city", $this->city);

        if($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Получить посадки пользователя
    function readByUserId() {
        $query = "SELECT * FROM " . $this->table_name . " 
                WHERE user_id = ? 
                ORDER BY created_at DESC";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->user_id);
        $stmt->execute();

        return $stmt;
    }
}
?>
