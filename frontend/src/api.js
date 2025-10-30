<<<<<<< HEAD
import axios from "axios";
const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
  timeout: 30000,
});
export default api;
=======
const BASE_URL = 'http://localhost:8001/api';

export async function fetchTests(category = '') {
  try {
    const url = category ? ${BASE_URL}/tests/?category= : ${BASE_URL}/tests/;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch tests');
    return await res.json();
  } catch (err) {
    console.error('API error:', err);
    return [];
  }
}

export async function pingBackend() {
  try {
    const res = await fetch(BASE_URL + '/tests/');
    return res.ok;
  } catch {
    return false;
  }
}
>>>>>>> my/push-branch
