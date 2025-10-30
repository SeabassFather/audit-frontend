<<<<<<< HEAD
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import TradePortal from "./pages/TradePortal";
=======
﻿import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LanguageProvider } from './LanguageContext';
import { CartProvider } from './CartContext';
import audioSystem from './audioSystem';

// Import all components
import HomePage from './HomePage';
import BillingComponent from './BillingComponent';
import ContactCardComponent from './ContactCardComponent';
import ResultsPortal from './ResultsPortal';
import AlcoholAnalysisModule from './AlcoholAnalysisModule';
import EnginePerformanceModule from './EnginePerformanceModule';
import FuelOilAnalysisModule from './FuelOilAnalysisModule';
import FieldConditionsLogger from './FieldConditionsLogger';
import LabDashboard from './LabDashboard';
import AgScienceDashboard from './AgScienceDashboard';
import SoilAnalysisModule from './SoilAnalysisModule';
import WaterTechModuleAdvanced from './WaterTechModuleAdvanced';
import AuditDNAEnvAI from './AuditDNAEnvAI';
import TestingServicesHub from './TestingServicesHub';
import TraceabilityModule from './TraceabilityModule';
import CheckoutPage from './CheckoutPage';
import OrdersPage from './OrdersPage';
import CartPage from './CartPage';

const navStyle = {
  padding: '0.8rem 1.5rem',
  background: 'rgba(30, 41, 59, 0.6)',
  backdropFilter: 'blur(10px)',
  border: '2px solid rgba(6, 182, 212, 0.3)',
  borderRadius: '12px',
  color: '#fff',
  textDecoration: 'none',
  fontWeight: 'bold',
  transition: 'all 0.3s ease',
  display: 'inline-block',
  cursor: 'pointer'
};
>>>>>>> my/push-branch

function App() {
  return (
    <Router>
<<<<<<< HEAD
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/trade-portal" element={<TradePortal />} />
        </Routes>
      </Layout>
    </Router>
  );
}
=======
      <LanguageProvider>
        <CartProvider>
          <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
            
            {/* NAVIGATION BAR */}
            <nav style={{ 
              padding: '1rem 2rem', 
              background: 'rgba(15, 23, 42, 0.95)', 
              backdropFilter: 'blur(20px)',
              borderBottom: '2px solid rgba(6, 182, 212, 0.3)',
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
              flexWrap: 'wrap',
              position: 'sticky',
              top: 0,
              zIndex: 1000
            }}>
              <Link to="/" style={navStyle} onMouseEnter={() => audioSystem.playHover()} onClick={() => audioSystem.playClick()}>
                Home
              </Link>
              
              <div style={{ width: '2px', height: '30px', background: 'rgba(6, 182, 212, 0.3)', margin: '0 0.5rem' }}></div>
              
              <Link to="/billing" style={navStyle} onMouseEnter={() => audioSystem.playHover()} onClick={() => audioSystem.playClick()}>
                Billing
              </Link>
              <Link to="/contact" style={navStyle} onMouseEnter={() => audioSystem.playHover()} onClick={() => audioSystem.playClick()}>
                Contact
              </Link>
              <Link to="/results" style={navStyle} onMouseEnter={() => audioSystem.playHover()} onClick={() => audioSystem.playClick()}>
                Results
              </Link>
              
              <div style={{ width: '2px', height: '30px', background: 'rgba(6, 182, 212, 0.3)', margin: '0 0.5rem' }}></div>
              
              <Link to="/alcohol" style={navStyle} onMouseEnter={() => audioSystem.playHover()} onClick={() => audioSystem.playClick()}>
                Alcohol
              </Link>
              <Link to="/engine" style={navStyle} onMouseEnter={() => audioSystem.playHover()} onClick={() => audioSystem.playClick()}>
                Engine
              </Link>
              <Link to="/fuel" style={navStyle} onMouseEnter={() => audioSystem.playHover()} onClick={() => audioSystem.playClick()}>
                Fuel
              </Link>
              
              <div style={{ width: '2px', height: '30px', background: 'rgba(6, 182, 212, 0.3)', margin: '0 0.5rem' }}></div>
              
              <Link to="/field" style={navStyle} onMouseEnter={() => audioSystem.playHover()} onClick={() => audioSystem.playClick()}>
                Field Logger
              </Link>
              <Link to="/lab" style={navStyle} onMouseEnter={() => audioSystem.playHover()} onClick={() => audioSystem.playClick()}>
                Lab
              </Link>
              <Link to="/ag" style={navStyle} onMouseEnter={() => audioSystem.playHover()} onClick={() => audioSystem.playClick()}>
                AG Sciences
              </Link>
              <Link to="/soil" style={navStyle} onMouseEnter={() => audioSystem.playHover()} onClick={() => audioSystem.playClick()}>
                Soil
              </Link>
              <Link to="/water" style={navStyle} onMouseEnter={() => audioSystem.playHover()} onClick={() => audioSystem.playClick()}>
                Water
              </Link>
              
              <div style={{ width: '2px', height: '30px', background: 'rgba(6, 182, 212, 0.3)', margin: '0 0.5rem' }}></div>
              
              <Link to="/ai" style={navStyle} onMouseEnter={() => audioSystem.playHover()} onClick={() => audioSystem.playClick()}>
                AI Analysis
              </Link>
              <Link to="/testing" style={navStyle} onMouseEnter={() => audioSystem.playHover()} onClick={() => audioSystem.playClick()}>
                Testing Hub
              </Link>
              <Link to="/traceability" style={navStyle} onMouseEnter={() => audioSystem.playHover()} onClick={() => audioSystem.playClick()}>
                Traceability
              </Link>
              
              <div style={{ flex: 1 }}></div>
              
              <Link to="/cart" style={{...navStyle, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', border: '2px solid #10b981'}} onMouseEnter={() => audioSystem.playHover()} onClick={() => audioSystem.playClick()}>
                Cart
              </Link>
              <Link to="/orders" style={navStyle} onMouseEnter={() => audioSystem.playHover()} onClick={() => audioSystem.playClick()}>
                Orders
              </Link>
            </nav>

            {/* ROUTES */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/billing" element={<BillingComponent />} />
              <Route path="/contact" element={<ContactCardComponent />} />
              <Route path="/results" element={<ResultsPortal />} />
              <Route path="/alcohol" element={<AlcoholAnalysisModule />} />
              <Route path="/engine" element={<EnginePerformanceModule />} />
              <Route path="/fuel" element={<FuelOilAnalysisModule />} />
              <Route path="/field" element={<FieldConditionsLogger />} />
              <Route path="/lab" element={<LabDashboard />} />
              <Route path="/ag" element={<AgScienceDashboard />} />
              <Route path="/soil" element={<SoilAnalysisModule />} />
              <Route path="/water" element={<WaterTechModuleAdvanced />} />
              <Route path="/ai" element={<AuditDNAEnvAI />} />
              <Route path="/testing" element={<TestingServicesHub />} />
              <Route path="/traceability" element={<TraceabilityModule />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/orders" element={<OrdersPage />} />
            </Routes>
          </div>
        </CartProvider>
      </LanguageProvider>
    </Router>
  );
}

>>>>>>> my/push-branch
export default App;
