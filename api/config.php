<?php
// Config for TipTop integration. Use env variables or set values here.
// Helper to read env aliases
$env = function($names, $default = null) {
  foreach ((array)$names as $n) {
    $v = getenv($n);
    if ($v !== false && $v !== null && $v !== '') return $v;
  }
  return $default;
};

return [
  // Public key / id (accept old and new names)
  'TIPTOP_PUBLIC_ID' => $env(['TIPTOP_PUBLIC_ID','TIPTOPPAY_PUBLIC_KEY'], 'your_public_id_here'),
  // Secret key used server-side
  'TIPTOP_API_SECRET' => $env(['TIPTOP_API_SECRET','TIPTOPPAY_SECRET_KEY'], 'your_api_secret_here'),
  // Webhook secret for verifying signatures
  'TIPTOP_WEBHOOK_SECRET' => $env(['TIPTOP_WEBHOOK_SECRET','TIPTOPPAY_WEBHOOK_SECRET'], null),

  'TIPTOP_VERIFY_URL' => $env(['TIPTOP_VERIFY_URL','TIPTOPPAY_VERIFY_URL'], null),

  'PLANTING_ENDPOINT' => $env(['PLANTING_ENDPOINT'], 'https://your-backend.example.com/api/plantings/create.php'),
  'PLANTING_API_KEY' => $env(['PLANTING_API_KEY'], null),
];
