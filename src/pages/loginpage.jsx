import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function LoginPage() {
  const { isLoggedIn, login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  if (isLoggedIn) return <Navigate to="/" replace />;
  return (
    <div className="max-w-md mx-auto py-24">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form
        className="space-y-4"
        onSubmit={e => {
          e.preventDefault();
          if (login(username, password)) navigate("/");
          else setErr("Invalid credentials.");
        }}
      >
        <input className="block w-full border rounded p-2" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input className="block w-full border rounded p-2" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        {err && <div className="text-red-600">{err}</div>}
        <button className="w-full bg-blue-700 text-white py-2 rounded" type="submit">Login</button>
      </form>
    </div>
  );
}