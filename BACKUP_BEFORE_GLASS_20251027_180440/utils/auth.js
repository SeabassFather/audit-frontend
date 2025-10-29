export function login(username, password) {
  if (username === "admin" && password === "password") {
    return { success: true, message: "Login successful!" };
  }
  return { success: false, message: "Invalid username or password." };
}
