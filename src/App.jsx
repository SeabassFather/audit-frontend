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
import PartnerAgreementsPage from "./pages/PartnerAgreementsPage";
import MarketingPage from "./pages/MarketingPage";
import PitchDeckPage from "./pages/PitchDeckPage";
import UploadPage from "./pages/UploadPage";
import ScannerPage from "./pages/ScannerPage";
import FacialRecognitionPage from "./pages/FacialRecognitionPage";
import AuditCatalogPage from "./pages/AuditCatalogPage";
import SearchEnginesPage from "./pages/SearchEnginesPage";

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
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200">
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
              <Route path="/search-engines" element={<SearchEnginesPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
