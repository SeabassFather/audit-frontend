import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    if (username === "admin" && password === "password123") {
      localStorage.setItem("auth", "true");
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <form onSubmit={handleLogin} className="bg-slate-800 p-6 rounded-lg">
        <h2 className="text-lg font-bold mb-4">Login</h2>
        <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username" className="mb-2 p-2 w-64" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="mb-4 p-2 w-64" />
        <button type="submit" className="bg-green-500 px-4 py-2 rounded">Login</button>
      </form>
    </div>
  );
}
