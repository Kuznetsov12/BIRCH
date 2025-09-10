/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Database Configuration
  readonly VITE_DB_HOST: string
  readonly VITE_DB_PORT: string
  readonly VITE_DB_NAME: string
  readonly VITE_DB_USERNAME: string
  readonly VITE_DB_PASSWORD: string
  
  // API Configuration
  readonly VITE_API_BASE_URL: string
  readonly VITE_API_TIMEOUT: string
  
  // Application Environment
  readonly VITE_APP_ENV: 'development' | 'production' | 'staging'
  readonly VITE_APP_DEBUG: string
  
  // External Services
  readonly VITE_GOOGLE_MAPS_API_KEY: string
  readonly VITE_ANALYTICS_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
