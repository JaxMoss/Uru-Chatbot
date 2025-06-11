import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  console.error('NEXT_PUBLIC_API_URL is not defined');
}

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Add timeout to prevent hanging requests
  timeout: 10000,
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Response Error:', error);
    
    // Handle network errors
    if (!error.response) {
      console.error('Network Error - Unable to reach the server');
      return Promise.reject(new Error('Unable to connect to the server. Please check your internet connection.'));
    }
    
    // Handle 401 Unauthorized errors
    if (error.response.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      window.location.href = '/login';
    }
    
    // Handle other errors
    const errorMessage = error.response?.data?.detail || 'An unexpected error occurred';
    return Promise.reject(new Error(errorMessage));
  }
);

export const api = {
  // Auth endpoints
  login: async (email: string, password: string) => {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    
    const response = await apiClient.post('/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  },
  
  register: async (email: string, password: string) => {
    const response = await apiClient.post('/auth/register', { email, password });
    return response.data;
  },
  
  // Conversation endpoints
  getConversations: async () => {
    const response = await apiClient.get('/conversations');
    return response.data;
  },
  
  getConversation: async (id: string) => {
    const response = await apiClient.get(`/conversations/${id}`);
    return response.data;
  },
  
  createConversation: async (model: string) => {
    const response = await apiClient.post('/conversations', { 
      title: 'New conversation',
      model 
    });
    return response.data;
  },
  
  updateConversation: async (id: string, data: { title?: string, model?: string }) => {
    const response = await apiClient.patch(`/conversations/${id}`, data);
    return response.data;
  },
  
  deleteConversation: async (id: string) => {
    const response = await apiClient.delete(`/conversations/${id}`);
    return response.data;
  },
  
  // Chat endpoints
  sendMessage: async (conversationId: string, message: string, apiKey: string, model?: string) => {
    const response = await apiClient.post('/chat/message', {
      conversationId,
      message,
      apiKey,
      model
    });
    return response.data;
  },
  
  validateApiKey: async (apiKey: string) => {
    const response = await apiClient.post('/chat/validate-key', { apiKey });
    return response.data;
  },
  
  // Generic request method
  get: async (url: string) => {
    const response = await apiClient.get(url);
    return response;
  },
  
  post: async (url: string, data: any) => {
    const response = await apiClient.post(url, data);
    return response;
  },
  
  patch: async (url: string, data: any) => {
    const response = await apiClient.patch(url, data);
    return response;
  },
  
  delete: async (url: string) => {
    const response = await apiClient.delete(url);
    return response;
  }
};
