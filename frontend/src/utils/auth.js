<<<<<<< HEAD
﻿export function login(username, password) {
=======
export function login(username, password) {
>>>>>>> my/push-branch
  if (username === "admin" && password === "password") {
    return { success: true, message: "Login successful!" };
  }
  return { success: false, message: "Invalid username or password." };
}
