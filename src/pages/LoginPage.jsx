import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/auth";
export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = login(username, password);
    if (result.success) {
      navigate("/elite-modules");
    } else {
      setError(result.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-sm" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
        <input type="text" placeholder="Username" className="w-full mb-3 p-2 border rounded" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full mb-3 p-2 border rounded" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <div className="text-red-600 mb-3">{error}</div>}
        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded">Login</button>
      </form>
    </div>
  );
}