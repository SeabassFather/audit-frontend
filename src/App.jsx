import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/NavBar";
import Ticker from "./components/Ticker";
import Footer from "./components/Footer";

// Lazy load pages for better performance
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Engines = lazy(() => import("./pages/Engines"));
const Findings = lazy(() => import("./pages/Findings"));
const Results = lazy(() => import("./pages/Results"));
const Uploads = lazy(() => import("./pages/Uploads"));
const Modules = lazy(() => import("./pages/Modules"));
const Admin = lazy(() => import("./pages/Admin"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Marketing = lazy(() => import("./pages/Marketing"));
const PitchDeck = lazy(() => import("./pages/PitchDeck"));
const Agreements = lazy(() => import("./pages/Agreements"));
const Tickers = lazy(() => import("./pages/Tickers"));
const UsdaSearch = lazy(() => import("./pages/UsdaSearch"));

function Spinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"></div>
      <span className="ml-3 text-slate-600">Loading...</span>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-gray-900">
      <Ticker />
      <Navbar />
      <main className="container py-6">
        <Suspense fallback={<Spinner />}>
          <Routes>
            {/* Main Pages */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/services" element={<Services />} />
            <Route path="/service/:id" element={<ServiceDetail />} />
            <Route path="/uploads" element={<Uploads />} />
            <Route path="/engines" element={<Engines />} />
            <Route path="/findings" element={<Findings />} />
            <Route path="/results" element={<Results />} />
            <Route path="/modules" element={<Modules />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            
            {/* New Core Pages */}
            <Route path="/chat" element={<Chat />} />
            <Route path="/marketing" element={<Marketing />} />
            <Route path="/pitch-deck" element={<PitchDeck />} />
            <Route path="/agreements" element={<Agreements />} />
            <Route path="/tickers" element={<Tickers />} />
            
            {/* USDA and Engine Routes */}
            <Route path="/engines/usda" element={<UsdaSearch />} />
            <Route path="/usda" element={<UsdaSearch />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}





