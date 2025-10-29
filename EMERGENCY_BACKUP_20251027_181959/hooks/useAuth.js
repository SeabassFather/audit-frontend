import { useState, useCallback, useEffect } from "react";
import { api } from "../utils/api";

export default function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          // Verify token with backend
          const userData = await api.get('/api/auth/verify');
          setUser(userData);
          setIsLoggedIn(true);
        } catch (err) {
          localStorage.removeItem('authToken');
          setUser(null);
          setIsLoggedIn(false);
        }
      }
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.auth.login(credentials);
      const { token, user: userData } = response;
      
      localStorage.setItem('authToken', token);
      setUser(userData);
      setIsLoggedIn(true);
      
      return { ok: true, user: userData };
    } catch (err) {
      setError(err.message);
      return { ok: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    setUser(null);
    setIsLoggedIn(false);
  }, []);

  return {
    isLoggedIn,
    user,
    loading,
    error,
    login,
    logout,
  };
}