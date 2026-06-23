import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Products
export const getProducts = (filters = {}) => api.get('/products', { params: filters });
export const getProductById = (id) => api.get(`/products/${id}`);
export const getCategories = () => api.get('/products/categories/all');

// Enquiries
export const submitEnquiry = (data) => api.post('/enquiry', data);
export const getEnquiries = () => api.get('/enquiry');
export const markEnquiryAsRead = (id) => api.put(`/enquiry/${id}/read`);
export const deleteEnquiry = (id) => api.delete(`/enquiry/${id}`);

// Settings
export const getSettings = () => api.get('/settings');
export const updateSettings = (data) => api.put('/settings', data);

// Admin
export const adminLogin = (credentials) => api.post('/admin/login', credentials);
export const getDashboard = () => api.get('/admin/dashboard');
export const addProduct = (data) => api.post('/admin/products', data);
export const updateProduct = (id, data) => api.put(`/admin/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/admin/products/${id}`);
export const getAdminCategories = () => api.get('/admin/categories');
export const addCategory = (data) => api.post('/admin/categories', data);
export const deleteCategory = (id) => api.delete(`/admin/categories/${id}`);

export default api;
