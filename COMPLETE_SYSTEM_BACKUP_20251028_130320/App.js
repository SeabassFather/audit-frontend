import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './LanguageContext';
import audioSystem from './audioSystem';
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
import ProduceIntelligenceModule from './ProduceIntelligenceModule';

function App() {
  const navStyle = {
    padding: '0.6rem 1.2rem',
    textDecoration: 'none',
    color: '#fff',
    background: 'rgba(30, 41, 59, 0.6)',
    border: '2px solid rgba(100, 116, 139, 0.3)',
    borderRadius: '10px',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    fontSize: '0.9rem'
  };

  return (
    <LanguageProvider>
      <Router>
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#fff' }}>
          <header style={{ background: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(10px)', padding: '1rem 2rem', borderBottom: '2px solid rgba(6, 182, 212, 0.3)', position: 'sticky', top: 0, zIndex: 1000 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h1 style={{ fontSize: '1.5rem', background: 'linear-gradient(135deg, #06b6d4 0%, #10b981 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                AuditDNA Complete
              </h1>
              <LanguageToggle />
            </div>
            
            <nav style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link to="/billing" style={navStyle} onMouseEnter={() => audioSystem.playHover()} onClick={() => audioSystem.playClick()}>Billing</Link>
              <Link to="/contact" style={navStyle} onMouseEnter={() => audioSystem.playHover()} onClick={() => audioSystem.playClick()}>Contact</Link>
              <Link to="/results" style={navStyle} onMouseEnter={() => audioSystem.playHover()} onClick={() => audioSystem.playClick()}>Results</Link>
              
              <div style={{ width: '2px', height: '30px', background: 'rgba(6, 182, 212, 0.3)', margin: '0 0.5rem' }}></div>
              
              <Link to="/alcohol" style={navStyle} onMouseEnter={() => audioSystem.playHover()} onClick={() => audioSystem.playClick()}>Alcohol</Link>
              <Link to="/engine" style={navStyle} onMouseEnter={() => audioSystem.playHover()} onClick={() => audioSystem.playClick()}>Engine</Link>
              <Link to="/fuel" style={navStyle} onMouseEnter={() => audioSystem.playHover()} onClick={() => audioSystem.playClick()}>Fuel</Link>
              
              <div style={{ width: '2px', height: '30px', background: 'rgba(6, 182, 212, 0.3)', margin: '0 0.5rem' }}></div>
              
              <Link to="/field" style={navStyle} onMouseEnter={() => audioSystem.playHover()} onClick={() => audioSystem.playClick()}>Field Logger</Link>
              <Link to="/lab" style={navStyle} onMouseEnter={() => audioSystem.playHover()} onClick={() => audioSystem.playClick()}>Lab</Link>
              
              <div style={{ width: '2px', height: '30px', background: 'rgba(6, 182, 212, 0.3)', margin: '0 0.5rem' }}></div>
              
              <Link to="/ag" style={navStyle} onMouseEnter={() => audioSystem.playHover()} onClick={() => audioSystem.playClick()}>AG Sciences</Link>
              <Link to="/soil" style={navStyle} onMouseEnter={() => audioSystem.playHover()} onClick={() => audioSystem.playClick()}>Soil</Link>
              <Link to="/water" style={navStyle} onMouseEnter={() => audioSystem.playHover()} onClick={() => audioSystem.playClick()}>Water</Link>
              
              <div style={{ width: '2px', height: '30px', background: 'rgba(6, 182, 212, 0.3)', margin: '0 0.5rem' }}></div>
              
              <Link to="/produce" style={navStyle} onMouseEnter={() => audioSystem.playHover()} onClick={() => audioSystem.playClick()}>Produce Intel</Link>`n              `n              <div style={{ width: '2px', height: '30px', background: 'rgba(6, 182, 212, 0.3)', margin: '0 0.5rem' }}></div>`n              `n              <Link to="/ai" style={navStyle} onMouseEnter={() => audioSystem.playHover()} onClick={() => audioSystem.playClick()}>AI Analysis</Link>
              <Link to="/testing" style={navStyle} onMouseEnter={() => audioSystem.playHover()} onClick={() => audioSystem.playClick()}>Testing Hub</Link>
              <Link to="/traceability" style={navStyle} onMouseEnter={() => audioSystem.playHover()} onClick={() => audioSystem.playClick()}>Traceability</Link>
              
              <div style={{ width: '2px', height: '30px', background: 'rgba(6, 182, 212, 0.3)', margin: '0 0.5rem' }}></div>
              
              <Link to="/" style={navStyle} onMouseEnter={() => audioSystem.playHover()} onClick={() => audioSystem.playClick()}>Home</Link>
            </nav>
          </header>

          <main>
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
              <Route path="/produce" element={<ProduceIntelligenceModule />} />`n              <Route path="/traceability" element={<TraceabilityModule />} />
            </Routes>
          </main>
        </div>
      </Router>
    </LanguageProvider>
  );
}

function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  return (
    <button
      onClick={() => {
        setLanguage(language === 'en' ? 'es' : 'en');
        audioSystem.playClick();
      }}
      style={{
        padding: '0.5rem 1rem',
        background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
        border: 'none',
        borderRadius: '8px',
        color: '#fff',
        fontWeight: 'bold',
        cursor: 'pointer'
      }}
    >
      {language === 'en' ? 'English -> ES' : 'Espanol -> EN'}
    </button>
  );
}

export default App;

