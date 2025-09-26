
<?php
$config = require __DIR__ . '/config.php';
header('Content-Type: application/json');

// Read raw body and JSON
$raw = file_get_contents('php://input');
$body = json_decode($raw, true);
if (!$body) {
  http_response_code(400);
  echo json_encode(['success'=>false,'message'=>'Invalid JSON']);
  exit;
}

// Simple file-based logging for webhook debugging (optional)
@file_put_contents(__DIR__ . '/logs/tiptoppay_webhook_' . date('Ymd') . '.log', date(DATE_ATOM) . "\n" . $raw . "\n\n", FILE_APPEND);

// Validate webhook signature if TipTop provides it (HMAC in header expected)
$webhookSecret = $config['TIPTOP_WEBHOOK_SECRET'] ?? null;
$sigHeader = null;
// Common header names to check
$possibleHeaders = ['HTTP_X_TIPTOPPAY_SIGNATURE','X-TipTopPay-Signature','HTTP_X_SIGNATURE','X-Signature'];
foreach ($possibleHeaders as $h) {
  if (!empty($_SERVER[$h])) { $sigHeader = $_SERVER[$h]; break; }
  if (!empty(getallheaders()[$h] ?? null)) { $sigHeader = getallheaders()[$h]; break; }
}
if ($webhookSecret) {
  if (!$sigHeader) {
    @file_put_contents(__DIR__ . '/logs/tiptoppay_webhook_' . date('Ymd') . '.log', date(DATE_ATOM) . "\nMissing signature header\n", FILE_APPEND);
    http_response_code(400);
    echo json_encode(['success'=>false,'message'=>'Missing signature header']);
    exit;
  }
  // Expect signature as hex HMAC-SHA256 of raw body
  $expected = hash_hmac('sha256', $raw, $webhookSecret);
  // If header contains prefix like 'sha256=' strip
  if (strpos($sigHeader, '=') !== false) {
    $parts = explode('=', $sigHeader, 2);
    $sigHeader = $parts[1];
  }
  if (!hash_equals($expected, $sigHeader)) {
    @file_put_contents(__DIR__ . '/logs/tiptoppay_webhook_' . date('Ymd') . '.log', date(DATE_ATOM) . "\nInvalid signature. Expected $expected got $sigHeader\nRaw: $raw\n", FILE_APPEND);
    http_response_code(400);
    echo json_encode(['success'=>false,'message'=>'Invalid signature']);
    exit;
  }
}

// If there is no webhook secret available, attempt server-to-server verification
$verifyUrl = $config['TIPTOP_VERIFY_URL'] ?? null;
if (!$webhookSecret && $verifyUrl) {
  // Try to get a transaction id from possible fields
  $txId = null;
  $candidates = [
    $body['Model']['Id'] ?? null,
    $body['Model']['id'] ?? null,
    $body['Model']['TransactionId'] ?? null,
    $body['Model']['transaction_id'] ?? null,
    $body['Model']['PaymentId'] ?? null,
    $body['Model']['Payment']['Id'] ?? null,
    $body['Model']['Payment']['id'] ?? null,
    $body['Model']['ExternalId'] ?? null,
    $body['Model']['OrderId'] ?? null,
  ];
  foreach ($candidates as $cand) { if (!empty($cand)) { $txId = $cand; break; } }

  if ($txId) {
    @file_put_contents(__DIR__ . '/logs/tiptoppay_webhook_' . date('Ymd') . '.log', date(DATE_ATOM) . "\nAttempting server-to-server verify for tx: $txId\n", FILE_APPEND);

    // If verifyUrl contains {id} placeholder, do GET
    $ch = null;
    if (strpos($verifyUrl, '{id}') !== false) {
      $callUrl = str_replace('{id}', urlencode($txId), $verifyUrl);
      $ch = curl_init($callUrl);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
      curl_setopt($ch, CURLOPT_HTTPGET, true);
    } else {
      // POST JSON with id/transaction_id
      $ch = curl_init($verifyUrl);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
      curl_setopt($ch, CURLOPT_POST, true);
      curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(['id'=>$txId, 'transaction_id'=>$txId]));
      curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    }

    // Add Authorization if secret available
    if (!empty($config['TIPTOP_API_SECRET'])) {
      curl_setopt($ch, CURLOPT_HTTPHEADER, array_merge(curl_getinfo($ch, CURLINFO_HEADER_OUT) ? [] : [], ['Authorization: Bearer ' . $config['TIPTOP_API_SECRET']]));
    }

    $verifyResp = curl_exec($ch);
    $verifyHttp = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    @file_put_contents(__DIR__ . '/logs/tiptoppay_webhook_' . date('Ymd') . '.log', date(DATE_ATOM) . "\nVerify URL: $verifyUrl HTTP:$verifyHttp BODY: $verifyResp\n", FILE_APPEND);

    if ($verifyHttp >= 200 && $verifyHttp < 300 && $verifyResp) {
      $vbody = json_decode($verifyResp, true);
      // Look for status in response
      $status = $vbody['status'] ?? $vbody['Model']['Status'] ?? $vbody['model']['status'] ?? $vbody['Model']['status'] ?? null;
      if ($status && in_array($status, ['Completed','Authorized','completed','authorized','success','succeeded'])) {
        // mark success by injecting into $body so the rest of the handler proceeds
        $body['Model'] = $body['Model'] ?? [];
        $body['Model']['Status'] = 'Completed';
      }
    }
  } else {
    @file_put_contents(__DIR__ . '/logs/tiptoppay_webhook_' . date('Ymd') . '.log', date(DATE_ATOM) . "\nNo transaction id found to verify server-to-server\n", FILE_APPEND);
  }
}

// Interested in Pay / success events — TipTop uses different notification types.
// We consider non-empty Model or Success true as successful payment.
$isSuccess = false;
if (isset($body['Success']) && $body['Success']) $isSuccess = true;
if (!$isSuccess && !empty($body['Model']) && !empty($body['Model']['Status']) && in_array($body['Model']['Status'], ['Completed','Authorized'])) $isSuccess = true;

if ($isSuccess) {
  // Prepare payload expected by plantings/create.php
  // Determine trees quantity: prefer explicit metadata.treesCount, then metadata.unit_price division, then Model.amount fallback
  $treesCount = null;
  if (!empty($body['metadata']['treesCount'])) {
    $treesCount = (int)$body['metadata']['treesCount'];
  } elseif (!empty($body['metadata']['unit_price']) && !empty($body['Model']['amount'])) {
    // If widget provided unit_price metadata and model amount exists, compute count = amount / unit_price
    $treesCount = (int)round($body['Model']['amount'] / $body['metadata']['unit_price']);
  } elseif (!empty($body['Model']['amount']) && !empty($body['metadata']['unit_price'])) {
    $treesCount = (int)round($body['Model']['amount'] / $body['metadata']['unit_price']);
  } else {
    $treesCount = (int)($body['metadata']['treesCount'] ?? ($body['Model']['amount'] ?? 1));
  }

  // Prepare payload expected by plantings/create.php
  // If this payment was a gift, TipTop metadata may contain recipient details. Prefer them.
  $meta = $body['metadata'] ?? [];
  $recipientPhone = $meta['recipient_phone'] ?? null;
  $recipientName = $meta['recipient_name'] ?? null;
  $recipientSurname = $meta['recipient_surname'] ?? null;

  $plantingPayload = [
    'name' => $recipientName ?? $body['userInfo']['firstName'] ?? ($body['Model']['Payer']['FirstName'] ?? null),
    'surname' => $recipientSurname ?? $body['userInfo']['lastName'] ?? ($body['Model']['Payer']['LastName'] ?? null),
    'phone' => $recipientPhone ?? $body['userInfo']['phone'] ?? ($body['Model']['Payer']['Phone'] ?? null),
    'city' => $body['userInfo']['city'] ?? ($body['Model']['Payer']['City'] ?? null),
    'trees_quantity' => $treesCount,
    'metadata' => $meta,
    'payment' => [
      'provider' => 'tiptoppay',
      'transaction' => $body
    ]
  ];
  // Попытка извлечь transaction id для идемпотентности и добавить его в payload
  $txId = null;
  $txCandidates = [
    $body['Model']['Id'] ?? null,
    $body['Model']['id'] ?? null,
    $body['Model']['TransactionId'] ?? null,
    $body['Model']['transaction_id'] ?? null,
    $body['Model']['PaymentId'] ?? null,
    $body['Model']['Payment']['Id'] ?? null,
    $body['Model']['Payment']['id'] ?? null,
    $body['Model']['ExternalId'] ?? null,
    $body['Model']['OrderId'] ?? null,
    $body['id'] ?? null,
  ];
  foreach ($txCandidates as $c) { if (!empty($c)) { $txId = $c; break; } }
  if ($txId) $plantingPayload['payment_tx'] = (string)$txId;

  // Первичная попытка: переслать на внешний/локальный PLANTING_ENDPOINT (конфиг)
  if (!empty($config['PLANTING_ENDPOINT'])) {
    $ch = curl_init($config['PLANTING_ENDPOINT']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    $headers = ['Content-Type: application/json'];
    if (!empty($config['PLANTING_API_KEY'])) $headers[] = 'Authorization: Bearer ' . $config['PLANTING_API_KEY'];
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($plantingPayload));
    $resp = curl_exec($ch);
    $http = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlErr = curl_error($ch);
    curl_close($ch);

    @file_put_contents(__DIR__ . '/logs/tiptoppay_forward_' . date('Ymd') . '.log', date(DATE_ATOM) . " FORWARD ATTEMPT TO PLANTING_ENDPOINT: HTTP:" . $http . " ERR:" . $curlErr . " BODY:" . $resp . "\n", FILE_APPEND);

    if ($http >= 200 && $http < 300) {
      http_response_code(200);
      echo json_encode(['success'=>true,'forward'=>'external','plantResponseCode'=>$http,'plantResponseBody'=>$resp]);
      exit;
    }
  }

  // Если пересылка не удалась или ENDPOINT не указан — пытаемся локально вызвать helper
  try {
    require_once __DIR__ . '/plantings/create_local_helper.php';
    $localResp = try_local_planting_create($plantingPayload);
    @file_put_contents(__DIR__ . '/logs/tiptoppay_forward_' . date('Ymd') . '.log', date(DATE_ATOM) . " LOCAL RESPONSE: " . json_encode($localResp) . "\n", FILE_APPEND);
    http_response_code(200);
    echo json_encode(['success'=>true,'forward'=>'local','result'=>$localResp]);
    exit;
  } catch (Throwable $e) {
    @file_put_contents(__DIR__ . '/logs/tiptoppay_forward_' . date('Ymd') . '.log', date(DATE_ATOM) . " LOCAL ERROR: " . $e->getMessage() . "\n", FILE_APPEND);
  }

  // Если все способы не сработали — вернуть 200 с сообщением об ошибке обработки
  @file_put_contents(__DIR__ . '/logs/tiptoppay_forward_' . date('Ymd') . '.log', date(DATE_ATOM) . " ALL FORWARD ATTEMPTS FAILED\n", FILE_APPEND);
  http_response_code(200);
  echo json_encode(['success'=>false,'message'=>'Failed to forward or process planting']);
  exit;
}

http_response_code(200);
echo json_encode(['success'=>false,'message'=>'No actionable event']);
