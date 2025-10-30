<<<<<<< HEAD
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { NotificationProvider, NotificationBell } from './components/NotificationCenter';
import Dashboard from './pages/Dashboard';
import Services from './pages/Services';
import USDAGrowerSearch from './pages/USDAGrowerSearch';
import MoneyTracker from './pages/MoneyTracker';
import './App.css';

function App() {
  return (
    <NotificationProvider>
      <BrowserRouter>
        <div className="app">
          {/* Header */}
          <header className="app-header">
            <div className="header-left">
              <div className="logo">🧬 AuditDNA</div>
            </div>

            <nav className="header-nav">
              <Link to="/dashboard" className="nav-link">
                📊 Dashboard
              </Link>
              <Link to="/services" className="nav-link">
                🌾 Services
              </Link>
              <Link to="/search" className="nav-link">
                🔍 Search
              </Link>
              <Link to="/money" className="nav-link">
                💰 Money
              </Link>
            </nav>

            <div className="header-right">
              <NotificationBell />
            </div>
          </header>

          {/* Main Content */}
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/services" element={<Services />} />
              <Route path="/search" element={<USDAGrowerSearch />} />
              <Route path="/money" element={<MoneyTracker />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </NotificationProvider>
  );
}

export default App;
=======
﻿import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './LanguageContext';
import { CartProvider } from './CartContext';
import Navbar from './Navbar';
import HomePage from './HomePage';
import AlcoholTestingModule from './AlcoholTestingModule';
import FuelTestingModule from './FuelTestingModule';
import EnginePerformanceModule from './EnginePerformanceModule';
import WaterTechModuleAdvanced from './WaterTechModuleAdvanced';
import SoilAnalysisModule from './SoilAnalysisModule';
import AGSciencesModule from './AGSciencesModule';
import AuditDNAEnvAI from './AuditDNAEnvAI';
import TestingServicesHub from './TestingServicesHub';
import CartPage from './CartPage';
import ProduceScienceVerification from './ProduceScienceVerification';
import OrdersPage from './OrdersPage';
import ContactPage from './ContactPage';
import Footer from './Footer';

function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <Router>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <div style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/alcohol" element={<AlcoholTestingModule />} />
                <Route path="/fuel" element={<FuelTestingModule />} />
                <Route path="/engine" element={<EnginePerformanceModule />} />
                <Route path="/water" element={<WaterTechModuleAdvanced />} />
                <Route path="/soil" element={<SoilAnalysisModule />} />
                <Route path="/ag" element={<AGSciencesModule />} />
                <Route path="/ai" element={<AuditDNAEnvAI />} />
                <Route path="/testing" element={<TestingServicesHub />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/produce-science" element={<ProduceScienceVerification />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/field" element={<div style={{ padding: '2rem', color: '#fff' }}>Field Logger - Coming Soon</div>} />
                <Route path="/lab" element={<div style={{ padding: '2rem', color: '#fff' }}>Lab Dashboard - Coming Soon</div>} />
                <Route path="/traceability" element={<div style={{ padding: '2rem', color: '#fff' }}>Traceability - Coming Soon</div>} />
                <Route path="/results" element={<div style={{ padding: '2rem', color: '#fff' }}>Results - Coming Soon</div>} />
                <Route path="/billing" element={<div style={{ padding: '2rem', color: '#fff' }}>Billing - Coming Soon</div>} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </LanguageProvider>
  );
}

export default App;

>>>>>>> my/push-branch
