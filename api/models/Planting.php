<?php
class Planting {
    private $conn;
    private $table_name = "plantings";

    public $id;
    public $user_id;
    public $trees_quantity;
    public $year;
    public $city;
    public $payment_tx;
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
                    city=:city,
                    payment_tx=:payment_tx";

        $stmt = $this->conn->prepare($query);

        $this->user_id=htmlspecialchars(strip_tags($this->user_id));
        $this->trees_quantity=htmlspecialchars(strip_tags($this->trees_quantity));
        $this->year=htmlspecialchars(strip_tags($this->year));
        $this->city=htmlspecialchars(strip_tags($this->city));
    $this->payment_tx=htmlspecialchars(strip_tags($this->payment_tx));

        $stmt->bindParam(":user_id", $this->user_id);
        $stmt->bindParam(":trees_quantity", $this->trees_quantity);
        $stmt->bindParam(":year", $this->year);
        $stmt->bindParam(":city", $this->city);
    $stmt->bindParam(":payment_tx", $this->payment_tx);

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

    // Проверить наличие посадки по payment_tx
    function existsByPaymentTx() {
        if (empty($this->payment_tx)) return false;
        $query = "SELECT id FROM " . $this->table_name . " WHERE payment_tx = ? LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->payment_tx);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return !empty($row);
    }
}
?>
