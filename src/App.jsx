import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
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

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-white">
          <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            <Routes>
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
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
