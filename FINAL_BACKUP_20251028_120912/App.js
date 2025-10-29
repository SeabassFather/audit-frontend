import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

// Module Imports
import AgScienceDashboard from './AgScienceDashboard';
import AlcoholAnalysisModule from './AlcoholAnalysisModule';
import AuditDNAEnvAI from './AuditDNAEnvAI';
import BillingComponent from './BillingComponent';
import ContactCardComponent from './ContactCardComponent';
import EnginePerformanceModule from './EnginePerformanceModule';
import FieldConditionsLogger from './FieldConditionsLogger';
import FuelOilAnalysisModule from './FuelOilAnalysisModule';
import LabDashboard from './LabDashboard';
import ResultsPortal from './ResultsPortal';
import SoilAnalysisModule from './SoilAnalysisModule';
import TestingServicesHub from './TestingServicesHub';
import TraceabilityModule from './TraceabilityModule';
import WaterTechModuleAdvanced from './WaterTechModuleAdvanced';

// Language & Audio
import { LanguageProvider } from './LanguageContext';
import LanguageToggle from './LanguageToggle';
import audioSystem from './audioSystem';

// HomePage fallback
const HomePage = () => (
  <div style={{
    padding: '4rem 2rem',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    minHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    <h1 style={{
      fontSize: '4rem',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 50%, #10b981 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '1rem'
    }}>
      AuditDNA Complete
    </h1>
    <p style={{ fontSize: '1.5rem', color: '#94a3b8', marginBottom: '2rem' }}>
      220+ Premium Tests | Real-Time Analysis | AI-Powered
    </p>
  </div>
);

function App() {
  const [soundEnabled, setSoundEnabled] = useState(true);

  const toggleSound = () => {
    const newState = audioSystem.toggle();
    setSoundEnabled(newState);
    audioSystem.playToggle();
  };

  return (
    <LanguageProvider>
      <Router>
        <div style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
          color: '#fff'
        }}>
          
          {/* HEADER */}
          <header style={{
            background: 'rgba(30, 41, 59, 0.95)',
            backdropFilter: 'blur(20px)',
            borderBottom: '2px solid rgba(6, 182, 212, 0.3)',
            padding: '1rem 2rem',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
          }}>
            
            {/* Top Section - Logo & Controls */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem'
            }}>
              
              {/* Logo */}
              <div>
                <div style={{
                  fontSize: '1.8rem',
                  fontWeight: 'bold',
                  color: '#06b6d4',
                  letterSpacing: '2px'
                }}>
                  AuditDNA Complete
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#94a3b8',
                  marginTop: '0.2rem'
                }}>
                  220 Premium Tests | Real-Time Analysis | AI-Powered | QR Tracking
                </div>
              </div>

              {/* Right Controls */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <button
                  onClick={toggleSound}
                  onMouseEnter={() => audioSystem.playHover()}
                  style={{
                    padding: '0.6rem 1.2rem',
                    background: soundEnabled 
                      ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                      : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  {soundEnabled ? '🔊 Sound ON' : '🔇 Sound OFF'}
                </button>

                <LanguageToggle />

                <div style={{
                  padding: '0.6rem 1.2rem',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: '#fff',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                }}>
                  ● ONLINE
                </div>

                <div style={{
                  padding: '0.6rem 1.2rem',
                  background: 'rgba(59, 130, 246, 0.2)',
                  border: '1px solid #3b82f6',
                  color: '#60a5fa',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  fontSize: '0.9rem'
                }}>
                  PORT: 8001
                </div>
              </div>
            </div>

            {/* NAVIGATION - ORGANIZED BY GROUPS */}
            <nav style={{
              display: 'flex',
              gap: '0.5rem',
              flexWrap: 'wrap',
              alignItems: 'center'
            }}>
              
              {/* GROUP 1: CORE PAGES (Far Left) */}
              <NavButton to="/billing" label="💳 Billing" color="#047857" />
              <NavButton to="/contact" label="📧 Contact" color="#1e40af" />
              <NavButton to="/" label="🏠 Home" color="#3b82f6" />
              <NavButton to="/results" label="📊 Results" color="#831843" />

              {/* Separator */}
              <div style={{ width: '2px', height: '30px', background: 'rgba(6, 182, 212, 0.3)', margin: '0 0.5rem' }}></div>

              {/* GROUP 2: TESTING MODULES (Alphabetical) */}
              <NavButton to="/alcohol" label="🍷 Alcohol" color="#854d0e" />
              <NavButton to="/engine" label="🔧 Engine" color="#4c1d95" />
              <NavButton to="/fuel" label="⛽ Fuel" color="#1e3a8a" />

              {/* Separator */}
              <div style={{ width: '2px', height: '30px', background: 'rgba(6, 182, 212, 0.3)', margin: '0 0.5rem' }}></div>

              {/* GROUP 3: LAB & FIELD */}
              <NavButton to="/field" label="📝 Field Logger" color="#854d0e" />
              <NavButton to="/lab" label="🔬 Lab" color="#0e7490" />

              {/* Separator */}
              <div style={{ width: '2px', height: '30px', background: 'rgba(6, 182, 212, 0.3)', margin: '0 0.5rem' }}></div>

              {/* GROUP 4: ENVIRONMENTAL (Alphabetical) */}
              <NavButton to="/ag" label="🌾 AG Sciences" color="#059669" />
              <NavButton to="/soil" label="🌱 Soil" color="#065f46" />
              <NavButton to="/water" label="💧 Water" color="#0e7490" />

              {/* Separator */}
              <div style={{ width: '2px', height: '30px', background: 'rgba(6, 182, 212, 0.3)', margin: '0 0.5rem' }}></div>

              {/* GROUP 5: SERVICES (Alphabetical) */}
              <NavButton to="/ai" label="🤖 AI Analysis" color="#be185d" />
              <NavButton to="/testing" label="🧪 Testing Hub" color="#b45309" />
              <NavButton to="/traceability" label="📍 Traceability" color="#047857" />
            </nav>
          </header>

          {/* ROUTES */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ag" element={<AgScienceDashboard />} />
            <Route path="/ai" element={<AuditDNAEnvAI />} />
            <Route path="/alcohol" element={<AlcoholAnalysisModule />} />
            <Route path="/billing" element={<BillingComponent />} />
            <Route path="/contact" element={<ContactCardComponent />} />
            <Route path="/engine" element={<EnginePerformanceModule />} />
            <Route path="/field" element={<FieldConditionsLogger />} />
            <Route path="/fuel" element={<FuelOilAnalysisModule />} />
            <Route path="/lab" element={<LabDashboard />} />
            <Route path="/results" element={<ResultsPortal />} />
            <Route path="/soil" element={<SoilAnalysisModule />} />
            <Route path="/testing" element={<TestingServicesHub />} />
            <Route path="/traceability" element={<TraceabilityModule />} />
            <Route path="/water" element={<WaterTechModuleAdvanced />} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

const NavButton = ({ to, label, color }) => {
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return '100, 100, 100';
    return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
  };

  return (
    <Link 
      to={to}
      onMouseEnter={() => audioSystem.playHover()}
      onClick={() => audioSystem.playClick()}
      style={{
        padding: '0.6rem 1rem',
        background: `rgba(${hexToRgb(color)}, 0.3)`,
        border: `1px solid ${color}`,
        color: '#fff',
        textDecoration: 'none',
        borderRadius: '8px',
        fontSize: '0.85rem',
        fontWeight: '600',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        whiteSpace: 'nowrap'
      }}
    >
      {label}
    </Link>
  );
};

export default App;
