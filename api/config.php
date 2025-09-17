<?php
// Config for TipTop integration. Use env variables or set values here.
return [
  'TIPTOP_PUBLIC_ID' => getenv('TIPTOP_PUBLIC_ID') ?: 'your_public_id_here',
  'TIPTOP_API_SECRET' => getenv('TIPTOP_API_SECRET') ?: 'your_api_secret_here',
  'PLANTING_ENDPOINT' => getenv('PLANTING_ENDPOINT') ?: 'https://your-backend.example.com/api/plantings/create.php',
  'PLANTING_API_KEY' => getenv('PLANTING_API_KEY') ?: null,
];
