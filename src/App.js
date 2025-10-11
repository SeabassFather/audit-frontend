import React, { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import Services from './pages/Services';
import spartanServices from './data/spartan_services.json';
import USDA from './pages/USDA';
import WaterTech from './pages/WaterTech';
import Mortgage from './pages/Mortgage';
import USDAGrowerSearchEngine from './pages/USDAGrowerSearchEngine';

// ---------------- CONTACT CARD ----------------
function ContactCard({ serviceName, onClose }) {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setTimeout(() => {
      setSuccess(true);
      setTimeout(() => onClose(), 2000);
    }, 1000);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '32px',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{serviceName}</h2>
        {success ? (
          <div>✅ Documents Submitted!</div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            <input
              type="text"
              placeholder="Full Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="file"
              multiple
              required
              onChange={(e) => setFiles(Array.from(e.target.files))}
            />
            {files.length > 0 && (
              <ul>
                {files.map((f, i) => (
                  <li key={i}>{f.name}</li>
                ))}
              </ul>
            )}
            <button type="submit">
              {uploading ? 'Uploading...' : 'Submit for Audit'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ---------------- SEARCH ENGINES ----------------
function SearchEngines() {
  const [activeEngine, setActiveEngine] = useState('grower');
  const engines = [
    { key: 'grower', label: 'Grower Search', icon: '🌾' },
    { key: 'usda', label: 'USDA Pricing', icon: '💵' },
    { key: 'watertech', label: 'WaterTech', icon: '💧' },
    { key: 'mortgage', label: 'Mortgage', icon: '🏠' },
    { key: 'factoring', label: 'Factoring', icon: '💰' },
  ];

  return (
    <div style={{ padding: '32px' }}>
      <h1>Search Engines</h1>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
        {engines.map((e) => (
          <button key={e.key} onClick={() => setActiveEngine(e.key)}>
            {e.icon} {e.label}
          </button>
        ))}
      </div>
      <div>
        {activeEngine === 'grower' && <USDAGrowerSearchEngine />}
        {activeEngine === 'usda' && <USDA />}
        {activeEngine === 'watertech' && <WaterTech />}
        {activeEngine === 'mortgage' && <Mortgage />}
        {activeEngine === 'factoring' && <p>Factoring engine coming soon...</p>}
      </div>
    </div>
  );
}

// ---------------- SIDEBAR ----------------
function Sidebar({ sidebarOpen, activeTab, setActiveTab }) {
  const items = [
    { key: 'dashboard', label: 'Dashboard', icon: '📊' },
    { key: 'services', label: 'Services', icon: '🛡️' },
    { key: 'search', label: 'Search', icon: '🔍' },
  ];
  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '280px',
        height: '100vh',
        background: '#1a202c',
        padding: '24px',
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(-280px)',
        transition: 'transform 0.3s ease',
      }}
    >
      <h1 style={{ color: '#fff', marginBottom: '20px' }}>AuditDNA</h1>
      {items.map((item) => (
        <button
          key={item.key}
          onClick={() => setActiveTab(item.key)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: '#fff',
            background: activeTab === item.key ? '#2d3748' : 'transparent',
            border: 'none',
            padding: '10px',
            borderRadius: '8px',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          <span>{item.icon}</span> {item.label}
        </button>
      ))}
    </div>
  );
}

// ---------------- MAIN APP ----------------
export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div>
      <Sidebar sidebarOpen={sidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div style={{ marginLeft: sidebarOpen ? '280px' : '0', padding: '20px' }}>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ marginBottom: '20px' }}>
          {sidebarOpen ? '←' : '→'}
        </button>
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'services' && <Services />}
        {activeTab === 'search' && <SearchEngines />}
      </div>
    </div>
  );
}