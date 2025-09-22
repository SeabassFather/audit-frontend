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

// Search Engine Modules
import SearchPage from "./pages/SearchPage";
import SearchUSDA from "./features/search/SearchUSDA";
import SearchMexicoLoans from "./features/search/SearchMexicoLoans";
import SearchFactoring from "./features/search/SearchFactoring";
import MortgageSearch from "./pages/mortgage/MortgageSearch";
import MortgageSearchPage from "./pages/MortgageSearchPage";
import TradeFinanceSearchPage from "./pages/TradeFinanceSearchPage";
import AgMarketplaceSearchPage from "./pages/AgMarketplaceSearchPage";
import UsdaSearch from "./pages/UsdaSearch";
import UsdaCommoditySearch from "./features/usda/UsdaCommoditySearch";

// Legacy pages for hard nav
import MortgageMexico from "./pages/MortgageMexico";
import USDA from "./pages/USDA";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-200 via-yellow-100 to-cyan-100">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <Routes>
            {/* Main Navigation Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/services" element={<Services />} />
            <Route path="/uploads" element={<Uploads />} />
            <Route path="/agreements" element={<Agreements />} />
            <Route path="/marketing" element={<Marketing />} />
            <Route path="/pitchdeck" element={<PitchDeck />} />
            <Route path="/tickers" element={<TickerFeedPage />} />
            <Route path="/audit-engines" element={<AuditEnginesPage />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/clients" element={<ClientsList />} />
            <Route path="/partners" element={<PartnersList />} />

            {/* Search Engine Routes */}
            <Route path="/search" element={<SearchPage />} />
            <Route path="/search/usda" element={<div className="max-w-7xl mx-auto"><SearchUSDA /></div>} />
            <Route path="/search/mexico-loans" element={<div className="max-w-7xl mx-auto"><SearchMexicoLoans /></div>} />
            <Route path="/search/factoring" element={<div className="max-w-7xl mx-auto"><SearchFactoring /></div>} />
            <Route path="/search/mortgage" element={<div className="max-w-7xl mx-auto"><MortgageSearch /></div>} />
            <Route path="/search/trade-finance" element={<TradeFinanceSearchPage />} />
            <Route path="/search/ag-marketplace" element={<AgMarketplaceSearchPage />} />

            {/* Alternative Search Routes */}
            <Route path="/mortgage-search" element={<MortgageSearchPage />} />
            <Route path="/usda-search" element={<UsdaSearch />} />
            <Route path="/usda-commodity" element={<div className="max-w-7xl mx-auto"><UsdaCommoditySearch /></div>} />

            {/* AUDITDNA HARD NAV Routes */}
            <Route path="/mexico-loans" element={<MexicoRealEstateLoanPage />} />
            <Route path="/mortgage" element={<div className="max-w-7xl mx-auto"><MortgageMexico /></div>} />
            <Route path="/usda" element={<USDA />} />

            {/* Default Route */}
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}
