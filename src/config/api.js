// API Configuration
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
  isDebug: import.meta.env.VITE_APP_DEBUG === 'true',
  environment: import.meta.env.VITE_APP_ENV || 'development'
};

// API Endpoints
export const API_ENDPOINTS = {
  users: {
    read: '/api/users/read.php',
    getByPhone: '/api/users/get_by_phone.php'
  },
  plantings: {
    create: '/api/plantings/create.php'
  },
  emission: {
    calculate: '/api/emission/calculate.php',
    updateUser: '/api/emission/update_user.php'
  },
  email: {
    sendOrganizationRequest: '/api/email/send_organization_request.php'
  }
};

// Helper function to build full API URL
export function buildApiUrl(endpoint) {
  return `${API_CONFIG.baseURL}${endpoint}`;
}

// Helper function for API requests with error handling
export async function apiRequest(endpoint, options = {}) {
  const url = buildApiUrl(endpoint);
  
  try {
    const response = await fetch(url, {
      timeout: API_CONFIG.timeout,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (API_CONFIG.isDebug) {
      console.log(`API Request to ${endpoint}:`, data);
    }
    
    return data;
  } catch (error) {
    if (API_CONFIG.isDebug) {
      console.error(`API Error for ${endpoint}:`, error);
    }
    throw error;
  }
}
