import React, { useState, useEffect } from 'react';

// LIVE TICKERS
function LiveTicker({ data, title, icon }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (data.length === 0) return;
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % data.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [data.length]);

  if (!data[index]) return null;

  return (
    <div style={{
      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
      padding: '20px',
      borderRadius: '12px',
      minWidth: '280px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      border: '1px solid #e2e8f0'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
        <span style={{ fontSize: '24px' }}>{icon}</span>
        <span style={{ fontSize: '14px', fontWeight: '600', color: '#64748b' }}>{title}</span>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%' }}></div>
          <span style={{ fontSize: '11px', color: '#10b981', fontWeight: '600' }}>LIVE</span>
        </div>
      </div>
      <div>
        <div style={{ fontSize: '28px', fontWeight: '700', color: '#1a202c', marginBottom: '4px' }}>
          {data[index].value}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '13px', color: '#64748b' }}>{data[index].label}</span>
          <span style={{ 
            fontSize: '13px', 
            fontWeight: '600',
            color: data[index].isPositive ? '#10b981' : '#ef4444'
          }}>
            {data[index].change}
          </span>
        </div>
      </div>
    </div>
  );
}

// DASHBOARD
function Dashboard() {
  const [tickers, setTickers] = useState({ mortgage: [], commodities: [], markets: [] });

  useEffect(() => {
    fetch('http://localhost:5050/dashboard/stats')
      .then(res => res.json())
      .then(data => setTickers(data.tickers || { mortgage: [], commodities: [], markets: [] }))
      .catch(() => setTickers({
        mortgage: [
          { label: '30Y Fixed', value: '6.94%', change: '-0.02%', isPositive: false },
          { label: '15Y Fixed', value: '6.23%', change: '+0.01%', isPositive: true }
        ],
        commodities: [
          { label: 'Corn', value: '$473', change: '+1.10', isPositive: true },
          { label: 'Wheat', value: '$605', change: '+0.75', isPositive: true }
        ],
        markets: [
          { label: 'S&P 500', value: '5,510', change: '+12', isPositive: true },
          { label: 'NASDAQ', value: '23,784', change: '-31', isPositive: false }
        ]
      }));
  }, []);

  return (
    <div style={{ padding: '32px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1a202c', marginBottom: '8px' }}>
        AuditDNA Dashboard
      </h1>
      <p style={{ fontSize: '16px', color: '#718096', marginBottom: '32px' }}>
        Compliance, audit, trade, and finance in one ecosystem
      </p>
      <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '10px' }}>
        {tickers.mortgage.length > 0 && <LiveTicker data={tickers.mortgage} title="Mortgage" icon="Ã°Å¸ÂÂ " />}
        {tickers.commodities.length > 0 && <LiveTicker data={tickers.commodities} title="Commodities" icon="Ã°Å¸Å’Â¾" />}
        {tickers.markets.length > 0 && <LiveTicker data={tickers.markets} title="Markets" icon="Ã°Å¸â€œË†" />}
      </div>
    </div>
  );
}

// CONTACT CARD
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
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px'
    }} onClick={onClose}>
      <div style={{
        background: '#ffffff', borderRadius: '16px', padding: '32px',
        maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto'
      }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c', margin: 0 }}>
            {serviceName}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>Ãƒâ€”</button>
        </div>

        {success ? (
          <div style={{ textAlign: 'center', padding: '40px', background: '#f0fdf4', borderRadius: '12px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>Ã¢Å“â€¦</div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#166534' }}>Documents Submitted!</h3>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>Full Name *</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
                style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>Email *</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>Upload Documents *</label>
              <input type="file" multiple required onChange={(e) => setFiles(Array.from(e.target.files))}
                style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
            </div>
            <button type="submit" disabled={uploading}
              style={{
                padding: '12px', background: 'linear-gradient(135deg, #42a5f5 0%, #1976d2 100%)',
                color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer'
              }}>
              {uploading ? 'Uploading...' : 'Submit for Audit'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// SERVICES TAB
function ServicesTab() {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  const categories = [
    {
      name: 'USDA Pricing & Compliance', icon: 'Ã°Å¸Å’Â¾', color: '#10b981',
      desc: 'USDA API integration, fraud detection, 5-year pricing trends',
      services: ['USDA Weekly Pricing (W1-W26)', '5-Year Commodity Trends', 'Invoice Fraud Detection', 'Grading Standards', 'Organic Certification', 'GAP Compliance', 'Import/Export Rules']
    },
    {
      name: 'WaterTech & Soil Analysis', icon: 'Ã°Å¸â€™Â§', color: '#06b6d4',
      desc: 'Lab reports, EPA/SEMARNAT compliance, Agri-Maxx integration',
      services: ['Water Quality Analysis', 'Soil pH Testing', 'Heavy Metals Detection', 'Nitrate Compliance', 'EPA Standards', 'SEMARNAT Check', 'Agri-Maxx Protocol', 'Irrigation Audit']
    },
    {
      name: 'Mortgage & Real Estate', icon: 'Ã°Å¸ÂÂ ', color: '#667eea',
      desc: 'TRID, ECOA, RESPA, cross-border US-Mexico financing',
      services: ['TRID Compliance', 'ECOA Fair Lending', 'RESPA Validation', 'FHA Loans', 'VA Loans', 'USDA Rural Housing', 'Mexico Financing', 'APR Analysis', 'Predatory Lending', 'Title Insurance']
    },
    {
      name: 'Factoring & PO Finance', icon: 'Ã°Å¸â€™Â°', color: '#f59e0b',
      desc: 'Invoice verification, KYC/AML, risk scoring',
      services: ['Invoice Factoring', 'PO Finance', 'Fraud Detection', 'KYC/AML Check', 'Lien Detection', 'Buyer Scoring', 'FATCA Compliance']
    },
    {
      name: 'Insurance & Risk', icon: 'Ã°Å¸â€ºÂ¡Ã¯Â¸Â', color: '#14b8a6',
      desc: 'Policy compliance, CCPA/GLBA validation',
      services: ['Life Insurance Review', 'Crop Insurance', 'Property Audit', 'CCPA Check', 'GLBA Validation', 'Risk Assessment']
    },
    {
      name: 'Global Compliance', icon: 'Ã¢Å¡â€“Ã¯Â¸Â', color: '#8b5cf6',
      desc: 'GDPR, CCPA, PIPEDA, AML/KYC',
      services: ['GDPR Audit', 'CCPA Review', 'PIPEDA Check', 'AML/KYC', 'Contract Analysis', 'Risk Heatmap']
    },
    {
      name: 'Education & Records', icon: 'Ã°Å¸Å½â€œ', color: '#6366f1',
      services: ['FERPA Compliance', 'Transcript Validation', 'Scholarship Verification', 'Credit Transfer']
    },
    {
      name: 'Healthcare', icon: 'Ã°Å¸ÂÂ¥', color: '#ec4899',
      services: ['HIPAA Audit', 'Medical Billing', 'Insurance Claims', 'Provider Credentialing']
    },
    {
      name: 'Business', icon: 'Ã°Å¸ÂÂ¢', color: '#f43f5e',
      services: ['Tax Audit', 'Corporate Review', 'Lease Audit', 'Franchise Analysis']
    },
    {
      name: 'Consumer Protection', icon: 'Ã°Å¸â€ºâ€™', color: '#84cc16',
      services: ['Credit Report Audit', 'Identity Theft', 'Warranty Review', 'Fraud Investigation']
    }
  ];

  return (
    <div style={{ padding: '32px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1a202c', marginBottom: '8px' }}>
        Professional Services
      </h1>
      <p style={{ fontSize: '16px', color: '#718096', marginBottom: '32px' }}>
        300+ audit and compliance services with document upload
      </p>

      {categories.map((cat, idx) => (
        <div key={idx} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', marginBottom: '12px', overflow: 'hidden' }}>
          <button onClick={() => setExpandedCategory(expandedCategory === idx ? null : idx)}
            style={{ width: '100%', padding: '20px', background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ fontSize: '32px', padding: '12px', background: cat.color + '20', borderRadius: '12px' }}>{cat.icon}</div>
              <div style={{ textAlign: 'left' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c', margin: 0 }}>{cat.name}</h3>
                <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0 0' }}>{cat.desc || `${cat.services.length} services`}</p>
              </div>
            </div>
            <div style={{ fontSize: '20px', color: '#64748b', transform: expandedCategory === idx ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s' }}>Ã¢â€“Â¼</div>
          </button>
          {expandedCategory === idx && (
            <div style={{ padding: '0 24px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '12px' }}>
              {cat.services.map((svc, i) => (
                <div key={i} onClick={() => setSelectedService({ category: cat.name, service: svc })}
                  style={{ padding: '16px', background: '#f8f9fa', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>
                  {svc}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {selectedService && <ContactCard serviceName={`${selectedService.category} - ${selectedService.service}`} onClose={() => setSelectedService(null)} />}
    </div>
  );
}

// SEARCH ENGINES
function SearchEngines() {
  const [activeEngine, setActiveEngine] = useState('usda');
  const engines = [
    { key: 'usda', label: 'USDA Pricing', labelEs: 'Precios USDA', icon: 'Ã°Å¸Å’Â¾' },
    { key: 'watertech', label: 'WaterTech', labelEs: 'Agua y Suelo', icon: 'Ã°Å¸â€™Â§' },
    { key: 'mortgage', label: 'Mortgage', labelEs: 'Hipotecaria', icon: 'Ã°Å¸ÂÂ ' },
    { key: 'factoring', label: 'Factoring', labelEs: 'Factoraje', icon: 'Ã°Å¸â€™Â°' },
    { key: 'mexico', label: 'Mexico RE', labelEs: 'Bienes RaÃƒÂ­ces', icon: 'Ã°Å¸â€¡Â²Ã°Å¸â€¡Â½' },
    { key: 'compliance', label: 'Compliance', labelEs: 'Cumplimiento', icon: 'Ã¢Å¡â€“Ã¯Â¸Â' },
    { key: 'upload', label: 'Upload', labelEs: 'Subir', icon: 'Ã°Å¸â€œÂ¤' }
  ];

  return (
    <div style={{ padding: '32px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1a202c', marginBottom: '32px' }}>Search Engines</h1>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', overflowX: 'auto' }}>
        {engines.map(e => (
          <button key={e.key} onClick={() => setActiveEngine(e.key)}
            style={{
              padding: '12px 20px', background: activeEngine === e.key ? 'linear-gradient(135deg, #42a5f5, #1976d2)' : '#fff',
              border: `1px solid ${activeEngine === e.key ? '#1976d2' : '#e2e8f0'}`, borderRadius: '12px',
              color: activeEngine === e.key ? '#fff' : '#2d3748', cursor: 'pointer', whiteSpace: 'nowrap',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px'
            }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>{e.icon}</span>
              <span style={{ fontSize: '14px', fontWeight: '600' }}>{e.label}</span>
            </div>
            <span style={{ fontSize: '11px', color: activeEngine === e.key ? '#e3f2fd' : '#8892a0', fontStyle: 'italic' }}>{e.labelEs}</span>
          </button>
        ))}
      </div>
      <div style={{ background: '#fff', padding: '32px', borderRadius: '16px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>{engines.find(e => e.key === activeEngine)?.label}</h2>
        <p style={{ color: '#64748b' }}>Search engine interface coming soon</p>
      </div>
    </div>
  );
}

// SIDEBAR
function Sidebar({ sidebarOpen, activeTab, setActiveTab }) {
  const items = [
    { key: 'dashboard', label: 'Dashboard', icon: 'Ã°Å¸â€œÅ ' },
    { key: 'services', label: 'Services', icon: 'Ã°Å¸â€ºÂ¡Ã¯Â¸Â' },
    { key: 'search', label: 'Search', icon: 'Ã°Å¸â€Â' }
  ];

  return (
    <div style={{
      position: 'fixed', left: 0, top: 0, width: '280px', height: '100vh',
      background: 'linear-gradient(180deg, #2d3748, #1a202c)', padding: '24px', overflowY: 'auto',
      transform: sidebarOpen ? 'translateX(0)' : 'translateX(-280px)', transition: 'transform 0.3s', zIndex: 1000
    }}>
      <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#fff', marginBottom: '32px' }}>AuditDNA</h1>
      {items.map(item => (
        <button key={item.key} onClick={() => setActiveTab(item.key)}
          style={{
            width: '100%', padding: '12px 16px', background: activeTab === item.key ? 'rgba(66, 165, 245, 0.2)' : 'transparent',
            border: 'none', borderRadius: '8px', color: activeTab === item.key ? '#42a5f5' : '#cbd5e0',
            fontSize: '16px', fontWeight: '500', textAlign: 'left', cursor: 'pointer', marginBottom: '8px',
            display: 'flex', alignItems: 'center', gap: '12px'
          }}>
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}

// MAIN APP
export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div style={{ background: 'linear-gradient(135deg, #f0f4f8, #e1e8ed)', minHeight: '100vh' }}>
      <Sidebar sidebarOpen={sidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div style={{ marginLeft: sidebarOpen ? '280px' : '0', transition: 'margin-left 0.3s' }}>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            position: 'fixed', top: '20px', left: sidebarOpen ? '300px' : '20px',
            background: '#42a5f5', color: '#fff', border: 'none', borderRadius: '50%',
            width: '48px', height: '48px', fontSize: '20px', cursor: 'pointer', zIndex: 999, transition: 'left 0.3s'
          }}>
          {sidebarOpen ? 'Ã¢â€ Â' : 'Ã¢â€ â€™'}
        </button>
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'services' && <ServicesTab />}
        {activeTab === 'search' && <SearchEngines />}
      </div>
    </div>
  );
}


