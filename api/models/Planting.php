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

            // sanitize common fields
            $this->user_id = isset($this->user_id) ? htmlspecialchars(strip_tags($this->user_id)) : null;
            $this->trees_quantity = isset($this->trees_quantity) ? htmlspecialchars(strip_tags($this->trees_quantity)) : null;
            $this->year = isset($this->year) ? htmlspecialchars(strip_tags($this->year)) : null;
            $this->city = isset($this->city) ? htmlspecialchars(strip_tags($this->city)) : null;
            $this->payment_tx = isset($this->payment_tx) && $this->payment_tx !== null ? htmlspecialchars(strip_tags($this->payment_tx)) : null;

            // Build INSERT dynamically: include payment_tx only if it's provided to avoid SQL errors on DB without that column
            $fields = [
                'user_id' => ':user_id',
                'trees_quantity' => ':trees_quantity',
                'year' => ':year',
                'city' => ':city'
            ];
            if ($this->payment_tx !== null) {
                $fields['payment_tx'] = ':payment_tx';
            }

            $setParts = [];
            foreach ($fields as $col => $param) {
                $setParts[] = "$col=$param";
            }

            $query = "INSERT INTO " . $this->table_name . " SET " . implode(', ', $setParts);

            try {
                $stmt = $this->conn->prepare($query);

                $stmt->bindParam(":user_id", $this->user_id);
                $stmt->bindParam(":trees_quantity", $this->trees_quantity);
                $stmt->bindParam(":year", $this->year);
                $stmt->bindParam(":city", $this->city);
                if ($this->payment_tx !== null) {
                    $stmt->bindParam(":payment_tx", $this->payment_tx);
                }

                if($stmt->execute()) {
                    return true;
                }
            } catch (PDOException $e) {
                // If insertion failed due to missing column or other DB issue, log to php error log and return false
                error_log('Planting::create DB error: ' . $e->getMessage());
                return false;
            }

            return false;

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
            try {
                $query = "SELECT id FROM " . $this->table_name . " WHERE payment_tx = ? LIMIT 1";
                $stmt = $this->conn->prepare($query);
                $stmt->bindParam(1, $this->payment_tx);
                $stmt->execute();
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                return !empty($row);
            } catch (PDOException $e) {
                // If column doesn't exist or other DB error, assume non-existent to avoid breaking flow
                error_log('Planting::existsByPaymentTx DB error: ' . $e->getMessage());
                return false;
            }
    }
}
?>
