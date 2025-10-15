import axios from "axios";
const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
  timeout: 30000,
});
export default api;

// Dummy apiUpload function for compatibility
export const apiUpload = (...args) => api.post(...args);
export const apiGet = (...args) => api.get(...args);

export const endpoints = {};

export const fetchRealStocks = () => Promise.resolve([]);