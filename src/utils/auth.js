import admins from "../data/admins.json";

// Check if user is already authenticated from localStorage
let authenticated = localStorage.getItem('isAuthenticated') === 'true';

export function login(username, password) {
  const admin = admins.find(a => a.username === username);
  if (!admin) return { success: false, message: "Invalid username" };
  if (admin.password !== password) return { success: false, message: "Invalid password" };
  
  authenticated = true;
  localStorage.setItem('isAuthenticated', 'true');
  localStorage.setItem('currentUser', JSON.stringify({ username: admin.username }));
  
  return { success: true };
}

export function useAuth() {
  return { isAuthenticated: authenticated };
}

export function logout() {
  authenticated = false;
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('currentUser');
}