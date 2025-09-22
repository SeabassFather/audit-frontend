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

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-200 via-yellow-100 to-cyan-100">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
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
        </main>
      </div>
      <Footer />
    </div>
  );
}
