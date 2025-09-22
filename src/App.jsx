import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";
import Uploads from "./pages/Uploads";
import Agreements from "./pages/Agreements";
import Marketing from "./pages/Marketing";
import PitchDeck from "./pages/PitchDeck";
import TickerFeedPage from "./pages/TickerFeedPage";
import AuditEnginesPage from "./pages/AuditEnginesPage";
import MexicoRealEstateLoanPage from "./pages/MexicoRealEstateLoanPage";
import Admin from "./pages/Admin";
import ClientsList from "./pages/ClientsList";
import PartnersList from "./pages/PartnersList";
import SearchPage from "./pages/SearchPage";

// Import new comprehensive modules
import USDADashboard from "./pages/pricing/USDADashboard";
import MortgageSearchEngine from "./pages/mortgage/MortgageSearchEngine";
import AgFactoringMarketplace from "./pages/marketplace/AgFactoringMarketplace";
import ComprehensiveComplianceDashboard from "./pages/compliance/ComprehensiveComplianceDashboard";
import EcoWaterTechIntegration from "./pages/environmental/EcoWaterTechIntegration";
import ComprehensiveAdminPanel from "./pages/admin/ComprehensiveAdminPanel";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/services" element={<Services />} />
            <Route path="/uploads" element={<Uploads />} />
            <Route path="/agreements" element={<Agreements />} />
            <Route path="/marketing" element={<Marketing />} />
            <Route path="/pitchdeck" element={<PitchDeck />} />
            <Route path="/tickers" element={<TickerFeedPage />} />
            <Route path="/audit-engines" element={<AuditEnginesPage />} />
            <Route path="/mexico-loans" element={<MexicoRealEstateLoanPage />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/clients" element={<ClientsList />} />
            <Route path="/partners" element={<PartnersList />} />
            
            {/* Legacy Search Engine Routes */}
            <Route path="/usda-search" element={<SearchPage initialTab="usda" />} />
            <Route path="/factoring" element={<SearchPage initialTab="factoring" />} />
            <Route path="/mexico-search" element={<SearchPage initialTab="mexico" />} />
            
            {/* New Comprehensive Module Routes */}
            <Route path="/pricing/usda" element={<USDADashboard />} />
            <Route path="/pricing/usda-dashboard" element={<USDADashboard />} />
            <Route path="/mortgage/search-engine" element={<MortgageSearchEngine />} />
            <Route path="/mortgage/comprehensive-search" element={<MortgageSearchEngine />} />
            <Route path="/marketplace/ag-factoring" element={<AgFactoringMarketplace />} />
            <Route path="/marketplace/factoring" element={<AgFactoringMarketplace />} />
            <Route path="/compliance/comprehensive" element={<ComprehensiveComplianceDashboard />} />
            <Route path="/compliance/dashboard" element={<ComprehensiveComplianceDashboard />} />
            <Route path="/environmental/eco-tech" element={<EcoWaterTechIntegration />} />
            <Route path="/environmental/water-tech" element={<EcoWaterTechIntegration />} />
            <Route path="/admin/comprehensive" element={<ComprehensiveAdminPanel />} />
            <Route path="/admin/panel" element={<ComprehensiveAdminPanel />} />
            
            {/* Default route */}
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}
