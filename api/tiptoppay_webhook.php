
<?php
$config = require __DIR__ . '/config.php';
header('Content-Type: application/json');

$raw = file_get_contents('php://input');
$body = json_decode($raw, true);
if (!$body) {
  http_response_code(400);
  echo json_encode(['success'=>false,'message'=>'Invalid JSON']);
  exit;
}

// Simple file-based logging for webhook debugging (optional)
@file_put_contents(__DIR__ . '/logs/tiptoppay_webhook_' . date('Ymd') . '.log', date(DATE_ATOM) . "\n" . $raw . "\n\n", FILE_APPEND);

// TODO: Validate webhook signature if TipTop provides it (header)

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

  // Try to call local create flow directly (avoid external HTTP when webhook and app share filesystem)
  try {
    // include models and database and call the same logic as plantings/create.php
    require_once __DIR__ . '/plantings/create_local_helper.php';
    $localResp = try_local_planting_create($plantingPayload);
    // Log local response
    @file_put_contents(__DIR__ . '/logs/tiptoppay_forward_' . date('Ymd') . '.log', date(DATE_ATOM) . " LOCAL RESPONSE: " . json_encode($localResp) . "\n", FILE_APPEND);
    http_response_code(200);
    echo json_encode(['success'=>true,'forward'=>'local','result'=>$localResp]);
    exit;
  } catch (Throwable $e) {
    // If local call fails, fallback to forwarding via HTTP
    @file_put_contents(__DIR__ . '/logs/tiptoppay_forward_' . date('Ymd') . '.log', date(DATE_ATOM) . " LOCAL ERROR: " . $e->getMessage() . "\n", FILE_APPEND);
  }

  // Fallback: send to configured PLANTING_ENDPOINT
  $ch = curl_init($config['PLANTING_ENDPOINT']);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_POST, true);
  $headers = ['Content-Type: application/json'];
  if (!empty($config['PLANTING_API_KEY'])) $headers[] = 'Authorization: Bearer ' . $config['PLANTING_API_KEY'];
  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
  curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($plantingPayload));
  $resp = curl_exec($ch);
  $http = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  curl_close($ch);

  @file_put_contents(__DIR__ . '/logs/tiptoppay_forward_' . date('Ymd') . '.log', date(DATE_ATOM) . " FORWARD RESPONSE CODE: " . $http . " BODY: " . $resp . "\n", FILE_APPEND);

  http_response_code(200);
  echo json_encode(['success'=>true,'forward'=>true,'plantResponseCode'=>$http,'plantResponseBody'=>$resp]);
  exit;
}

http_response_code(200);
echo json_encode(['success'=>false,'message'=>'No actionable event']);
