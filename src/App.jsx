import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Sidebar from "./components/Sidebar.jsx";
import HomePage from "./pages/HomePage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Services from "./pages/Services.jsx";
import ServiceDetails from "./pages/ServiceDetails.jsx";
import Uploads from "./pages/Uploads.jsx";
import Agreements from "./pages/Agreements.jsx";
import Marketing from "./pages/Marketing.jsx";
import PitchDeck from "./pages/PitchDeck.jsx";
import Tickers from "./pages/Tickers.jsx";
import Admin from "./pages/Admin.jsx";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-brand-green via-brand-yellow to-brand-blue text-gray-900">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 py-8 space-y-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:serviceId" element={<ServiceDetails />} />
            <Route path="/uploads" element={<Uploads />} />
            <Route path="/agreements" element={<Agreements />} />
            <Route path="/marketing" element={<Marketing />} />
            <Route path="/pitchdeck" element={<PitchDeck />} />
            <Route path="/tickers" element={<Tickers />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}
