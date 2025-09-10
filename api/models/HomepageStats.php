<?php
class HomepageStats {
    private $conn;
    private $table_name = "homepage_stats";

    public $id;
    public $total_trees_planting;
    public $total_supports;
    public $company_partners;
    public $cleared_co_on_year;
    public $created_at;
    public $updated_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Получить текущую статистику
    function read() {
        $query = "SELECT 
                    id,
                    total_trees_planting,
                    total_supports,
                    company_partners,
                    cleared_co_on_year,
                    created_at,
                    updated_at
                  FROM " . $this->table_name . " 
                  ORDER BY id DESC 
                  LIMIT 1";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        if($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            
            $this->id = $row['id'];
            $this->total_trees_planting = $row['total_trees_planting'];
            $this->total_supports = $row['total_supports'];
            $this->company_partners = $row['company_partners'];
            $this->cleared_co_on_year = $row['cleared_co_on_year'];
            $this->created_at = $row['created_at'];
            $this->updated_at = $row['updated_at'];
            
            return true;
        }
        
        return false;
    }

    // Обновить статистику
    function update() {
        $query = "UPDATE " . $this->table_name . " 
                SET 
                    total_trees_planting = :total_trees_planting,
                    total_supports = :total_supports,
                    company_partners = :company_partners,
                    cleared_co_on_year = :cleared_co_on_year
                WHERE id = :id";

        $stmt = $this->conn->prepare($query);

        $this->total_trees_planting = intval($this->total_trees_planting);
        $this->total_supports = intval($this->total_supports);
        $this->company_partners = intval($this->company_partners);
        $this->cleared_co_on_year = intval($this->cleared_co_on_year);
        $this->id = intval($this->id);

        $stmt->bindParam(":total_trees_planting", $this->total_trees_planting);
        $stmt->bindParam(":total_supports", $this->total_supports);
        $stmt->bindParam(":company_partners", $this->company_partners);
        $stmt->bindParam(":cleared_co_on_year", $this->cleared_co_on_year);
        $stmt->bindParam(":id", $this->id);

        return $stmt->execute();
    }

    // Создать новую запись статистики
    function create() {
        $query = "INSERT INTO " . $this->table_name . "
                SET
                    total_trees_planting = :total_trees_planting,
                    total_supports = :total_supports,
                    company_partners = :company_partners,
                    cleared_co_on_year = :cleared_co_on_year";

        $stmt = $this->conn->prepare($query);

        $this->total_trees_planting = intval($this->total_trees_planting);
        $this->total_supports = intval($this->total_supports);
        $this->company_partners = intval($this->company_partners);
        $this->cleared_co_on_year = intval($this->cleared_co_on_year);

        $stmt->bindParam(":total_trees_planting", $this->total_trees_planting);
        $stmt->bindParam(":total_supports", $this->total_supports);
        $stmt->bindParam(":company_partners", $this->company_partners);
        $stmt->bindParam(":cleared_co_on_year", $this->cleared_co_on_year);

        if($stmt->execute()) {
            return $this->conn->lastInsertId();
        }

        return false;
    }

    // Увеличить количество поддерживающих (при регистрации пользователя)
    function incrementSupports() {
        $query = "UPDATE " . $this->table_name . " 
                SET total_supports = total_supports + 1 
                WHERE id = (SELECT id FROM (SELECT id FROM " . $this->table_name . " ORDER BY id DESC LIMIT 1) as temp)";

        $stmt = $this->conn->prepare($query);
        return $stmt->execute();
    }

    // Увеличить количество посаженных деревьев
    function incrementTrees($quantity) {
        $query = "UPDATE " . $this->table_name . " 
                SET total_trees_planting = total_trees_planting + :quantity 
                WHERE id = (SELECT id FROM (SELECT id FROM " . $this->table_name . " ORDER BY id DESC LIMIT 1) as temp)";

        $stmt = $this->conn->prepare($query);
        $quantity = intval($quantity);
        $stmt->bindParam(":quantity", $quantity);
        return $stmt->execute();
    }

    // Обеспечить существование записи статистики (создать если не существует)
    function ensureExists() {
        if (!$this->read()) {
            // Если записи нет, создаем с нулевыми значениями
            $this->total_trees_planting = 0;
            $this->total_supports = 0;
            $this->company_partners = 0;
            $this->cleared_co_on_year = 0;
            return $this->create();
        }
        return true;
    }
}
?>
