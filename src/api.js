
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://backend-z1qz.onrender.com/api', // Make sure this is correct
});

// Automatically attach the JWT token if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
