<?php
// Proxy to TipTop payments API - creates a payment using widget-provided intent
$config = require __DIR__ . '/config.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['success'=>false,'message'=>'Method not allowed']);
  exit;
}

$body = json_decode(file_get_contents('php://input'), true);
if (!$body) {
  http_response_code(400);
  echo json_encode(['success'=>false,'message'=>'Invalid JSON']);
  exit;
}

$amount = $body['amount'] ?? null;
$externalId = $body['externalId'] ?? uniqid('order_');
$description = $body['description'] ?? 'Planting trees';
$currency = $body['currency'] ?? 'KZT';

// X-Request-ID for idempotency
$xRequestId = $body['x_request_id'] ?? bin2hex(random_bytes(16));

$intentPayload = [
  'publicTerminalId' => $config['TIPTOP_PUBLIC_ID'],
  'description' => $description,
  'paymentSchema' => $body['paymentSchema'] ?? 'Dual',
  'currency' => $currency,
  'amount' => $amount,
  'externalId' => $externalId,
  'paymentMethodSequence' => $body['paymentMethodSequence'] ?? ['Card','GooglePay'],
  'userInfo' => $body['userInfo'] ?? [],
  'items' => $body['items'] ?? [],
  'receipt' => $body['receipt'] ?? null,
  'metadata' => $body['metadata'] ?? null,
  'successRedirectUrl' => $body['successRedirectUrl'] ?? null,
  'failRedirectUrl' => $body['failRedirectUrl'] ?? null,
];

$ch = curl_init('https://api.tiptoppay.kz/test'); // use test endpoint to validate connectivity first
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_USERPWD, $config['TIPTOP_PUBLIC_ID'] . ':' . $config['TIPTOP_API_SECRET']);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  'Content-Type: application/json',
  'X-Request-ID: ' . $xRequestId
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($intentPayload));
curl_setopt($ch, CURLOPT_TIMEOUT, 300);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlErr = curl_error($ch);
curl_close($ch);

if ($response === false) {
  http_response_code(502);
  echo json_encode(['success'=>false,'message'=>'Network error: ' . $curlErr]);
  exit;
}

$respJson = json_decode($response, true);
if (!$respJson) {
  http_response_code(502);
  echo json_encode(['success'=>false,'message'=>'Invalid response from TipTop','raw'=>$response]);
  exit;
}

// Forward TipTop response to client. In production you'd call payments/intents or similar.
echo json_encode(['success'=>!empty($respJson['Success']), 'tiptop'=>$respJson, 'httpCode'=>$httpCode]);
