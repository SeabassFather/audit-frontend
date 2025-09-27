import admins from "../data/admins.json";
let authenticated = false;
export function login(username, password) {
  const admin = admins.find(a => a.username === username);
  if (!admin) return { success: false, message: "Invalid username" };
  if (admin.password !== password) return { success: false, message: "Invalid password" };
  authenticated = true;
  return { success: true };
}
export function useAuth() {
  return { isAuthenticated: authenticated };
}
export function logout() {
  authenticated = false;
}