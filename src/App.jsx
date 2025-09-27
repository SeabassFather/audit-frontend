import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import MortgageSearch from "./pages/MortgageSearch";
import USDApricing from "./pages/USDApricing";
import EliteModulesPage from "./pages/EliteModulesPage";
import { useAuth } from "./utils/auth";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/mortgage-search" element={<ProtectedRoute><MortgageSearch /></ProtectedRoute>} />
        <Route path="/usda-pricing" element={<ProtectedRoute><USDApricing /></ProtectedRoute>} />
        <Route path="/elite-modules" element={<ProtectedRoute><EliteModulesPage /></ProtectedRoute>} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}