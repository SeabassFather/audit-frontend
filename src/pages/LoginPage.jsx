import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/auth";
import AuditDNALogo from "../components/AuditDNALogo";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(username, password);
    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #87CEEB 0%, #FFFFFF 100%)' }}>
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8" style={{ border: '1px solid var(--border)' }}>
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <AuditDNALogo size="large" />
          </div>
          <h2 className="text-2xl font-bold text-primary">AuditDNA Login</h2>
          <p className="text-medium mt-2">Access your dashboard</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-dark mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-blue-500"
              style={{ borderColor: 'var(--border)' }}
              placeholder="Enter username"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-dark mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-blue-500"
              style={{ borderColor: 'var(--border)' }}
              placeholder="Enter password"
              required
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center px-4 py-3 rounded-lg" style={{ background: 'var(--light-yellow)', border: '1px solid #FFC107' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 rounded-lg text-white font-medium transition"
            style={{ 
              background: 'linear-gradient(135deg, var(--light-blue) 0%, var(--lime) 100%)',
              boxShadow: 'var(--shadow)'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-1px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-medium">
          Demo credentials: <strong>admin</strong> / <strong>password123</strong>
        </div>
      </div>
    </div>
  );
}