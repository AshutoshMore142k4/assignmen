// Environment Configuration
export const config = {
  // API URL - will be replaced with actual backend URL after deployment
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  
  // App Configuration
  appName: import.meta.env.VITE_APP_NAME || 'Real-Time Collaborative To-Do Board',
  
  // Environment
  isProduction: import.meta.env.PROD,
  isDevelopment: import.meta.env.DEV,
  
  // Features
  enableSocketIO: true,
  enableRealTime: true
};

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${config.apiUrl}/api/auth/login`,
    REGISTER: `${config.apiUrl}/api/auth/register`,
    LOGOUT: `${config.apiUrl}/api/auth/logout`,
  },
  TASKS: {
    GET_ALL: `${config.apiUrl}/api/tasks`,
    CREATE: `${config.apiUrl}/api/tasks`,
    UPDATE: (id: string) => `${config.apiUrl}/api/tasks/${id}`,
    DELETE: (id: string) => `${config.apiUrl}/api/tasks/${id}`,
  },
  ACTIONS: {
    GET_LOGS: `${config.apiUrl}/api/actions`,
  }
}; 