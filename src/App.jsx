import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import EliteModulesPage from "./pages/EliteModulesPage";
import MortgageSearchPage from "./pages/MortgageSearchPage";
import CompliancePage from "./pages/CompliancePage";
import MortgageLoanAudit from "./pages/audit/MortgageLoanAudit";
import Dashboard from "./pages/Dashboard";
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
        <Route path="/elite-modules" element={<ProtectedRoute><EliteModulesPage /></ProtectedRoute>} />
        <Route path="/mortgage" element={<ProtectedRoute><MortgageSearchPage /></ProtectedRoute>} />
        <Route path="/compliance" element={<ProtectedRoute><CompliancePage /></ProtectedRoute>} />
        <Route path="/audit-report" element={<ProtectedRoute><MortgageLoanAudit /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/risk-alerts" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/*" element={<Navigate to="/elite-modules" />} />
      </Routes>
    </Router>
  );
}