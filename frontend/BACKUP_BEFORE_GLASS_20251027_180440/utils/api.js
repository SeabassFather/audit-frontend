const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const apiGet = async (endpoint) => {
  const response = await fetch(API_BASE + endpoint);
  return response.json();
};

export const apiUpload = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch(API_BASE + '/upload', { method: 'POST', body: formData });
  return response.json();
};

export const fetchRealStocks = () => Promise.resolve([]);

export const endpoints = {
  produce: '/api/produce',
  usda: '/api/usda',
  mortgage: '/api/mortgage',
};

export const api = {
  get: async (url) => {
    const response = await fetch(url);
    return response.json();
  }
};

export default { apiGet, apiUpload, endpoints, fetchRealStocks, api };
