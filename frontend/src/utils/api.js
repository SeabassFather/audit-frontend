<<<<<<< HEAD
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
=======
// Minimal API client for frontend. Uses REACT_APP_API_URL if set, otherwise defaults to localhost:4000
const API_BASE = (process.env.REACT_APP_API_URL || (typeof window !== 'undefined' && window.__REACT_APP_API_URL__) || 'http://localhost:4000').replace(/\/$/, '');

async function request(path, { method = 'GET', body = undefined, headers = {} } = {}) {
  const url = `${API_BASE}${path.startsWith('/') ? '' : '/'}${path}`;
  const opts = {
    method,
    headers: { 'Accept': 'application/json', ...headers },
    body: body && (body instanceof FormData ? body : JSON.stringify(body))
  };
  if (!(body instanceof FormData) && body) opts.headers['Content-Type'] = 'application/json';
  const res = await fetch(url, opts);
  const text = await res.text();
  try { return { ok: res.ok, status: res.status, data: text ? JSON.parse(text) : null }; } catch (e) { return { ok: res.ok, status: res.status, data: text }; }
}

export default {
  get: (p) => request(p, { method: 'GET' }),
  post: (p, body, headers) => request(p, { method: 'POST', body, headers }),
  put: (p, body, headers) => request(p, { method: 'PUT', body, headers }),
  del: (p) => request(p, { method: 'DELETE' })
};
>>>>>>> my/push-branch
