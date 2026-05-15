import axios from 'axios';

const API_BASE_URL = import.meta.env.PROD
  ? '/api' 
  : 'http://localhost:5003/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  googleLogin: () => window.location.href = `${API_BASE_URL}/auth/google`,
  getMe: () => api.get('/auth/me'),
  updateProfile: (profileData) => api.put('/auth/profile', profileData),
};

export const paymentAPI = {
  createOrder: (orderData) => api.post('/payments/create-order', orderData),
  verifyPayment: (paymentData) => api.post('/payments/verify-payment', paymentData),
};

export const uploadAPI = {
  uploadPalmImages: (formData) => api.post('/upload/palm-images', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

export const requestAPI = {
  createRequest: (requestData) => api.post('/requests', requestData),
  getRequests: (status) => api.get(`/requests${status ? `?status=${status}` : ''}`),
  getRequest: (id) => api.get(`/requests/${id}`),
  submitAnswer: (id, answer) => api.put(`/requests/${id}/answer`, { answer }),
};

export const ordersAPI = {
  getMyOrders: () => api.get('/orders/my-orders'),
};

export default api;
