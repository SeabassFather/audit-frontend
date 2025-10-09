import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HomePage from "./HomePage";
import MortgageSearchPage from "./MortgageSearchPage";
import AgMarketplaceSearchPage from "./AgMarketplaceSearchPage";
import TradeFinanceSearchPage from "./TradeFinanceSearchPage";
import TickersPage from "./TickersPage";
import PartnerAgreementsPage from "./PartnerAgreementsPage";
import MarketingPage from "./MarketingPage";
import PitchDeckPage from "./PitchDeckPage";
import UploadPage from "./UploadPage";
import ScannerPage from "./ScannerPage";
import FacialRecognitionPage from "./FacialRecognitionPage";
import AuditCatalogPage from "./AuditCatalogPage";

// Simple Auth Context for demo
const AuthContext = React.createContext();
const useAuth = () => React.useContext(AuthContext);

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(true); // Demo mode - always logged in
  
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

function PrivateRoute({ children }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/mortgages" element={<MortgageSearchPage />} />
              <Route path="/ag-market" element={<AgMarketplaceSearchPage />} />
              <Route path="/trade-finance" element={<TradeFinanceSearchPage />} />
              <Route path="/tickers" element={<TickersPage />} />
              <Route path="/partner-agreements" element={<PartnerAgreementsPage />} />
              <Route path="/marketing" element={<MarketingPage />} />
              <Route path="/pitch-deck" element={<PitchDeckPage />} />
              <Route path="/upload" element={<UploadPage />} />
              <Route path="/scanner" element={<ScannerPage />} />
              <Route path="/facial-recognition" element={<FacialRecognitionPage />} />
              <Route path="/audit-catalog" element={<AuditCatalogPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
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
