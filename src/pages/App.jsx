import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import MortgageSearchPage from "./pages/MortgageSearchPage";
import AgMarketplaceSearchPage from "./pages/AgMarketplaceSearchPage";
import TradeFinanceSearchPage from "./pages/TradeFinanceSearchPage";
import TickersPage from "./pages/TickersPage";
import AuditDNAPage from "./pages/AuditDNAPage";
import CompliancePage from "./pages/CompliancePage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider, useAuth } from "./auth/AuthContext";

function PrivateRoute({ children }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/mortgages"
              element={
                <PrivateRoute>
                  <MortgageSearchPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/ag-market"
              element={
                <PrivateRoute>
                  <AgMarketplaceSearchPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/trade-finance"
              element={
                <PrivateRoute>
                  <TradeFinanceSearchPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/tickers"
              element={
                <PrivateRoute>
                  <TickersPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/auditdna"
              element={
                <PrivateRoute>
                  <AuditDNAPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/compliance"
              element={
                <PrivateRoute>
                  <CompliancePage />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}
