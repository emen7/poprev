import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to attach auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    
    // Handle unauthorized errors (token expired)
    if (response && response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Redirect to login page if not already there
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// Authentication API
export const authAPI = {
  register: (userData: any) => api.post('/auth/register', userData),
  login: (credentials: any) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (userData: any) => api.put('/auth/profile', userData),
  changePassword: (passwordData: any) => api.post('/auth/change-password', passwordData),
};

// Responses API
export const responsesAPI = {
  getResponses: (params?: any) => api.get('/responses', { params }),
  getResponseById: (id: string) => api.get(`/responses/${id}`),
  createResponse: (responseData: any) => api.post('/responses', responseData),
  updateResponse: (id: string, responseData: any) => api.put(`/responses/${id}`, responseData),
  deleteResponse: (id: string) => api.delete(`/responses/${id}`),
  searchResponses: (query: string) => api.get(`/responses/search`, { params: { q: query } }),
  generatePdf: (id: string) => api.get(`/responses/${id}/pdf`),
};

// Categories API
export const categoriesAPI = {
  getCategories: () => api.get('/categories'),
  getCategoryById: (id: string) => api.get(`/categories/${id}`),
  createCategory: (categoryData: any) => api.post('/categories', categoryData),
  updateCategory: (id: string, categoryData: any) => api.put(`/categories/${id}`, categoryData),
  deleteCategory: (id: string) => api.delete(`/categories/${id}`),
  getCategoryResponses: (id: string, params?: any) => 
    api.get(`/categories/${id}/responses`, { params }),
};

export default api;
