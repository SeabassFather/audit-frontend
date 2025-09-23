import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Uploads from "./pages/Uploads";
import Agreements from "./pages/Agreements";
import Marketing from "./pages/Marketing";
import PitchDeck from "./pages/PitchDeck";
import TickerFeedPage from "./pages/TickerFeedPage";
import AuditEnginesPage from "./pages/AuditEnginesPage";
import MexicoRealEstateLoanPage from "./pages/MexicoRealEstateLoanPage";
import PricingUSDA from "./pages/PricingUSDA";
import Admin from "./pages/Admin";
import ClientsList from "./pages/ClientsList";
import PartnersList from "./pages/PartnersList";
import SearchPage from "./pages/SearchPage";
import Documentation from "./pages/Documentation";
import BusinessStrategy from "./pages/BusinessStrategy";

// Search Engine Components
import SearchUSDAPage from "./pages/search/SearchUSDAPage";
import SearchMexicoPage from "./pages/search/SearchMexicoPage";
import SearchFactoringPage from "./pages/search/SearchFactoringPage";
import SearchWaterTechPage from "./pages/search/SearchWaterTechPage";
import SearchMortgagePage from "./pages/search/SearchMortgagePage";
import SearchAgMarketplacePage from "./pages/search/SearchAgMarketplacePage";
import SearchTradeFinancePage from "./pages/search/SearchTradeFinancePage";

// Search Engine Modules
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/home" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/uploads" element={<Uploads />} />
            <Route path="/agreements" element={<Agreements />} />
            <Route path="/marketing" element={<Marketing />} />
            <Route path="/pitchdeck" element={<PitchDeck />} />
            <Route path="/tickers" element={<TickerFeedPage />} />
            <Route path="/audit-engines" element={<AuditEnginesPage />} />
            <Route path="/mexico-loans" element={<MexicoRealEstateLoanPage />} />
            <Route path="/usda-pricing" element={<PricingUSDA />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/clients" element={<ClientsList />} />
            <Route path="/partners" element={<PartnersList />} />
            <Route path="/business-strategy" element={<BusinessStrategy />} />
            <Route path="/docs" element={<Documentation />} />

            {/* Explicit Search Engine Routes */}
            <Route path="/search/usda" element={<SearchUSDAPage />} />
            <Route path="/search/mexico" element={<SearchMexicoPage />} />
            <Route path="/search/factoring" element={<SearchFactoringPage />} />
            <Route path="/search/watertech" element={<SearchWaterTechPage />} />
            <Route path="/search/mortgage" element={<SearchMortgagePage />} />
            <Route path="/search/ag-marketplace" element={<SearchAgMarketplacePage />} />
            <Route path="/search/trade-finance" element={<SearchTradeFinancePage />} />

            {/* Generic SearchPage Routes for tabs */}
            <Route path="/usda-search" element={<SearchPage initialTab="usda" />} />
            <Route path="/factoring" element={<SearchPage initialTab="factoring" />} />
            <Route path="/mexico-search" element={<SearchPage initialTab="mexico" />} />

            {/* Default route */}
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}