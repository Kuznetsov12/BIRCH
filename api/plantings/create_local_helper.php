<?php
// Lightweight local helper to reuse plantings/create.php logic from webhook
// Exposes try_local_planting_create(array $payload): array

function try_local_planting_create($payload) {
    // Normalize payload to object similar to plantings/create.php
    $data = new stdClass();
    $data->surname = $payload['surname'] ?? $payload['name'] ?? null;
    $data->name = $payload['name'] ?? $payload['surname'] ?? null;
    $data->phone = $payload['phone'] ?? null;
    $data->city = $payload['city'] ?? null;

    // Determine trees quantity: prefer explicit payload, then metadata.treesCount, then compute from payment amount / unit_price if available
    $treesQty = null;
    if (isset($payload['trees_quantity'])) {
        $treesQty = (int)$payload['trees_quantity'];
    } elseif (!empty($payload['payment']['transaction']['metadata']['treesCount'])) {
        $treesQty = (int)$payload['payment']['transaction']['metadata']['treesCount'];
    } elseif (!empty($payload['payment']['transaction']['Model']['amount']) && !empty($payload['payment']['transaction']['metadata']['unit_price'])) {
        $treesQty = (int)round($payload['payment']['transaction']['Model']['amount'] / $payload['payment']['transaction']['metadata']['unit_price']);
    } else {
        $treesQty = (int)($payload['trees_quantity'] ?? ($payload['payment']['transaction']['metadata']['treesCount'] ?? 1));
    }
    $data->trees_quantity = $treesQty;

    // Try to extract transaction id from payload for idempotency
    $txId = null;
    if (!empty($payload['payment']['transaction']['Model']['Id'])) $txId = $payload['payment']['transaction']['Model']['Id'];
    elseif (!empty($payload['payment']['transaction']['Model']['id'])) $txId = $payload['payment']['transaction']['Model']['id'];
    elseif (!empty($payload['payment']['transaction']['Model']['TransactionId'])) $txId = $payload['payment']['transaction']['Model']['TransactionId'];
    elseif (!empty($payload['payment']['transaction']['Model']['transaction_id'])) $txId = $payload['payment']['transaction']['Model']['transaction_id'];
    elseif (!empty($payload['payment']['transaction']['ExternalId'])) $txId = $payload['payment']['transaction']['ExternalId'];
    elseif (!empty($payload['payment']['transaction']['id'])) $txId = $payload['payment']['transaction']['id'];
    elseif (!empty($payload['payment']['transaction']['Model']['PaymentId'])) $txId = $payload['payment']['transaction']['Model']['PaymentId'];

    $data->payment_tx = $txId;

    // Debug log for webhook/local calls to aid investigation
    @file_put_contents(__DIR__ . '/logs/create_local_helper_incoming_' . date('Ymd') . '.log', date(DATE_ATOM) . " PAYLOAD: " . json_encode($payload) . "\n", FILE_APPEND);

    // Basic validation
    if (empty($data->surname) || empty($data->name) || empty($data->phone) || empty($data->city) || $data->trees_quantity <= 0) {
        return ['status'=>'error','message'=>'Invalid or incomplete data','required'=>['surname','name','phone','city','trees_quantity'],'provided'=>$payload];
    }

    include_once __DIR__ . '/../config/database.php';
    include_once __DIR__ . '/../models/User.php';
    include_once __DIR__ . '/../models/Planting.php';
    include_once __DIR__ . '/../models/HomepageStats.php';

    $database = new Database();
    $db = $database->getConnection();

    $user = new User($db);
    $planting = new Planting($db);
    $stats = new HomepageStats($db);

    try {
    $db->beginTransaction();

        $stats->ensureExists();

        $user->phone = $data->phone;
        $user_exists = $user->findByPhone();
        $user_was_created = false;

        // Если у нас есть tx id, проверим, не была ли уже создана посадка по нему
        if (!empty($data->payment_tx)) {
            $checkPlant = new Planting($db);
            $checkPlant->payment_tx = $data->payment_tx;
            if ($checkPlant->existsByPaymentTx()) {
                $db->commit();
                return ['status'=>'success','message'=>'Already processed','user_created'=>$user_was_created,'user_id'=>$user->id ?? null,'trees_planted'=>0,'idempotent'=>true];
            }
        }
        if (!$user_exists) {
            $user->surname = $data->surname;
            $user->name = $data->name;
            $user->phone = $data->phone;
            $user->city = $data->city;
            $user->emission_kg = 0;

            $user_id = $user->create();
            if (!$user_id) throw new Exception('Unable to create user');
            $user_was_created = true;
            $stats->incrementSupports();
        } else {
            $user_id = $user->id;
        }

        $planting->user_id = $user_id;
        $planting->trees_quantity = $data->trees_quantity;
        $planting->year = date('Y');
        $planting->city = $data->city;

        if ($planting->create()) {
            $stats->incrementTrees($data->trees_quantity);
            $db->commit();
            return ['status'=>'success','message'=>'Planting created','user_created'=>$user_was_created,'user_id'=>$user_id,'trees_planted'=>$data->trees_quantity];
        } else {
            throw new Exception('Unable to create planting');
        }

    } catch (Exception $e) {
        $db->rollback();
        return ['status'=>'error','message'=>$e->getMessage()];
    }
}

?>
