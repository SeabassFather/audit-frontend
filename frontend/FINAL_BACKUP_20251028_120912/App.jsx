import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './LanguageContext';
import './App.css';

// Module Imports
import AlcoholAnalysisModule from './AlcoholAnalysisModule';
import AuditDNAEnvAI from './AuditDNAEnvAI';
import EnginePerformanceModule from './EnginePerformanceModule';
import FuelOilAnalysisModule from './FuelOilAnalysisModule';
import SoilAnalysisModule from './SoilAnalysisModule';
import TestingServicesHub from './TestingServicesHub';
import WaterTechModuleAdvanced from './WaterTechModuleAdvanced';

// NEW: Results System Components
import LabDashboard from './LabDashboard';
import ResultsPortal from './ResultsPortal';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="app">
          <Header />
          <Navigation />
          <main className="main-container">
            <Routes>
              {/* Main Routes */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/alcohol-analysis" element={<AlcoholAnalysisModule />} />
              <Route path="/engine-performance" element={<EnginePerformanceModule />} />
              <Route path="/environment-ai" element={<AuditDNAEnvAI />} />
              <Route path="/fuel-oil-analysis" element={<FuelOilAnalysisModule />} />
              <Route path="/soil-analysis" element={<SoilAnalysisModule />} />
              <Route path="/testing-services" element={<TestingServicesHub />} />
              <Route path="/water-tech" element={<WaterTechModuleAdvanced />} />
              
              {/* NEW: Results System Routes */}
              <Route path="/dashboard" element={<LabDashboard />} />
              <Route path="/results" element={<ResultsPortal />} />
            </Routes>
          </main>
        </div>
      </Router>
    </LanguageProvider>
  );
}

function Header() {
  const { language, changeLanguage } = useLanguage();

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="brand-section">
          <div className="brand-logo">Ã°Å¸Å’Â</div>
          <div className="brand-text">
            <h1>AuditDNA Complete Platform</h1>
            <p>Water | Soil | Engine | Fuel | Alcohol Analysis with File Upload</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Language Switcher */}
          <div style={{
            display: 'flex',
            gap: '10px',
            background: '#1e293b',
            padding: '8px',
            borderRadius: '10px',
            border: '2px solid #334155'
          }}>
            <button
              onClick={() => changeLanguage('en')}
              style={{
                padding: '8px 16px',
                background: language === 'en' ? '#06b6d4' : 'transparent',
                border: 'none',
                borderRadius: '6px',
                color: language === 'en' ? 'white' : '#94a3b8',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              Ã°Å¸â€¡ÂºÃ°Å¸â€¡Â¸ EN
            </button>
            <button
              onClick={() => changeLanguage('es')}
              style={{
                padding: '8px 16px',
                background: language === 'es' ? '#06b6d4' : 'transparent',
                border: 'none',
                borderRadius: '6px',
                color: language === 'es' ? 'white' : '#94a3b8',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              Ã°Å¸â€¡Â²Ã°Å¸â€¡Â½ ES
            </button>
          </div>

          {/* Status Indicators */}
          <div style={{
            padding: '8px 16px',
            background: 'rgba(16, 185, 129, 0.2)',
            border: '2px solid #10b981',
            borderRadius: '8px',
            color: '#10b981',
            fontSize: '0.85rem',
            fontWeight: '600'
          }}>
            Ã¢Å“â€¦ Backend: Port 8001
          </div>
          <div style={{
            padding: '8px 16px',
            background: 'rgba(6, 182, 212, 0.2)',
            border: '2px solid #06b6d4',
            borderRadius: '8px',
            color: '#06b6d4',
            fontSize: '0.85rem',
            fontWeight: '600'
          }}>
            Ã°Å¸â€œÂ¤ Upload Ready
          </div>
        </div>
      </div>
    </header>
  );
}

function Navigation() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  const tabs = [
    { path: '/', label: language === 'es' ? 'Ã°Å¸â€œÅ  Panel' : 'Ã°Å¸â€œÅ  Dashboard' },
    { path: '/dashboard', label: language === 'es' ? 'Ã°Å¸â€Â¬ Lab Dashboard' : 'Ã°Å¸â€Â¬ Lab Dashboard' },
    { path: '/results', label: language === 'es' ? 'Ã°Å¸â€œâ€¹ Resultados' : 'Ã°Å¸â€œâ€¹ Results' },
    { path: '/alcohol-analysis', label: 'Ã°Å¸Â§Âª Alcohol' },
    { path: '/engine-performance', label: language === 'es' ? 'Ã°Å¸Å¡Å“ Motor' : 'Ã°Å¸Å¡Å“ Engine' },
    { path: '/environment-ai', label: language === 'es' ? 'Ã°Å¸Å’Â¿ IA Ambiental' : 'Ã°Å¸Å’Â¿ Environment AI' },
    { path: '/fuel-oil-analysis', label: language === 'es' ? 'Ã¢â€ºÂ½ Combustible' : 'Ã¢â€ºÂ½ Fuel/Oil' },
    { path: '/soil-analysis', label: language === 'es' ? 'Ã°Å¸Å’Â± Suelo' : 'Ã°Å¸Å’Â± Soil' },
    { path: '/testing-services', label: language === 'es' ? 'Ã°Å¸â€Â¬ Laboratorio' : 'Ã°Å¸â€Â¬ Testing' },
    { path: '/water-tech', label: language === 'es' ? 'Ã°Å¸â€™Â§ Agua' : 'Ã°Å¸â€™Â§ Water Tech' }
  ];

  return (
    <nav className="main-nav">
      <div className="nav-tabs">
        {tabs.map(tab => (
          <button
            key={tab.path}
            className="nav-tab"
            onClick={() => navigate(tab.path)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

function Dashboard() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <div style={{
      padding: '40px',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-10%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'float 20s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-30%',
        left: '-10%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'float 15s ease-in-out infinite reverse'
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: '900',
            background: 'linear-gradient(135deg, #06b6d4, #10b981)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '20px'
          }}>
            Ã°Å¸Å¡â‚¬ {language === 'es' ? 'Plataforma Completa AuditDNA' : 'AuditDNA Complete Platform'}
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.3rem' }}>
            {language === 'es' 
              ? 'AnÃƒÂ¡lisis profesional de agricultura y medio ambiente' 
              : 'Professional agricultural and environmental analysis'}
          </p>
        </div>

        {/* NEW: Results System Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '25px', marginBottom: '25px' }}>
          <DashCard
            icon="Ã°Å¸â€Â¬"
            title={language === 'es' ? 'Dashboard de Laboratorio' : 'Lab Dashboard'}
            desc={language === 'es' ? 'GestiÃƒÂ³n de ÃƒÂ³rdenes y resultados' : 'Manage orders and results'}
            color="#06b6d4"
            onClick={() => navigate('/dashboard')}
          />
          <DashCard
            icon="Ã°Å¸â€œâ€¹"
            title={language === 'es' ? 'Portal de Resultados' : 'Results Portal'}
            desc={language === 'es' ? 'Ver resultados de pruebas' : 'View test results'}
            color="#10b981"
            onClick={() => navigate('/results')}
          />
        </div>

        {/* Module Cards Row 1 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '25px', marginBottom: '25px' }}>
          <DashCard
            icon="Ã°Å¸Â§Âª"
            title={language === 'es' ? 'AnÃƒÂ¡lisis de Alcohol' : 'Alcohol Analysis'}
            desc={language === 'es' ? 'Pruebas de pureza' : 'Purity tests'}
            color="#ec4899"
            onClick={() => navigate('/alcohol-analysis')}
          />
          <DashCard
            icon="Ã°Å¸Å¡Å“"
            title={language === 'es' ? 'Rendimiento del Motor' : 'Engine Performance'}
            desc={language === 'es' ? 'DiagnÃƒÂ³sticos' : 'Diagnostics'}
            color="#f97316"
            onClick={() => navigate('/engine-performance')}
          />
          <DashCard
            icon="Ã°Å¸Å’Â¿"
            title={language === 'es' ? 'IA Ambiental' : 'Environment AI'}
            desc={language === 'es' ? 'AnÃƒÂ¡lisis completo' : 'Complete analysis'}
            color="#10b981"
            onClick={() => navigate('/environment-ai')}
          />
          <DashCard
            icon="Ã¢â€ºÂ½"
            title={language === 'es' ? 'Combustible/Aceite' : 'Fuel/Oil'}
            desc={language === 'es' ? 'AnÃƒÂ¡lisis de calidad' : 'Quality analysis'}
            color="#8b5cf6"
            onClick={() => navigate('/fuel-oil-analysis')}
          />
        </div>

        {/* Module Cards Row 2 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '25px' }}>
          <DashCard
            icon="Ã°Å¸Å’Â±"
            title={language === 'es' ? 'AnÃƒÂ¡lisis de Suelo' : 'Soil Analysis'}
            desc={language === 'es' ? 'Fertilidad' : 'Fertility'}
            color="#10b981"
            onClick={() => navigate('/soil-analysis')}
          />
          <DashCard
            icon="Ã°Å¸â€Â¬"
            title={language === 'es' ? 'Servicios de Lab' : 'Testing Services'}
            desc={language === 'es' ? 'Ãƒâ€œrdenes de lab' : 'Lab orders'}
            color="#3b82f6"
            onClick={() => navigate('/testing-services')}
          />
          <DashCard
            icon="Ã°Å¸â€œÅ "
            title={language === 'es' ? 'Ver Datos' : 'View Data'}
            desc={language === 'es' ? 'PrÃƒÂ³ximamente' : 'Coming soon'}
            color="#64748b"
            onClick={() => alert('Coming soon!')}
          />
          <DashCard
            icon="Ã°Å¸â€™Â§"
            title={language === 'es' ? 'AnÃƒÂ¡lisis de Agua' : 'Water Analysis'}
            desc={language === 'es' ? 'Calidad' : 'Quality'}
            color="#06b6d4"
            onClick={() => navigate('/water-tech')}
          />
        </div>
      </div>

      {/* Animation Keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% { 
            transform: translate(0, 0) rotate(0deg); 
          }
          33% { 
            transform: translate(30px, -30px) rotate(120deg); 
          }
          66% { 
            transform: translate(-20px, 20px) rotate(240deg); 
          }
        }
      `}</style>
    </div>
  );
}

function DashCard({ icon, title, desc, color, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        padding: '35px',
        borderRadius: '20px',
        border: `2px solid ${color}40`,
        cursor: 'pointer',
        textAlign: 'center',
        transition: 'all 0.4s',
        boxShadow: `0 4px 20px ${color}20`
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-10px)';
        e.currentTarget.style.boxShadow = `0 20px 50px ${color}60`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = `0 4px 20px ${color}20`;
      }}
    >
      <div style={{ fontSize: '4rem', marginBottom: '15px' }}>{icon}</div>
      <h3 style={{
        color: color,
        fontSize: '1.3rem',
        fontWeight: '800',
        marginBottom: '10px'
      }}>
        {title}
      </h3>
      <p style={{
        color: '#94a3b8',
        fontSize: '0.95rem',
        marginBottom: '20px'
      }}>
        {desc}
      </p>
      <div style={{
        display: 'inline-block',
        padding: '6px 16px',
        background: `${color}20`,
        border: `2px solid ${color}`,
        borderRadius: '8px',
        color: color,
        fontSize: '0.8rem',
        fontWeight: '700'
      }}>
        Ã°Å¸â€œÂ¤ READY
      </div>
    </div>
  );
}

export default App;