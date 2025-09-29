import React, { useState, useEffect } from 'react';
import { BarChart3, Shield, Search, Settings, TrendingUp, TrendingDown, Users, DollarSign, Zap, Star } from 'lucide-react';
import { getServicesData, getDashboardStats, getMortgageRates, getCommoditiesData, getMarketsData, getLendersData, searchMortgages, searchFactoring } from './services/dataService';
import './styles/auditdna-premium.css';

// Premium Animated Components
function AnimatedBackground() {
  return (
    <div className="animated-bg">
      <div className="grid-overlay"></div>
      <div className="floating-particles">
        {[...Array(12)].map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`}></div>
        ))}
      </div>
      <div className="gradient-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>
    </div>
  );
}

function GlowingCard({ children, className = "", ...props }) {
  return (
    <div className={`premium-card ${className}`} {...props}>
      <div className="card-glow"></div>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}

// Live Tickers Component with Premium Effects
function useRotator(items, intervalMs = 3000) {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    if (items.length === 0) return;
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setIndex(prev => (prev + 1) % items.length);
        setIsAnimating(false);
      }, 150);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [items.length, intervalMs]);

  return { current: items[index] || null, isAnimating };
}

function PremiumTicker({ data, title, icon, color }) {
  const { current, isAnimating } = useRotator(data);

  if (!current) return null;

  return (
    <GlowingCard className={`ticker-card ${isAnimating ? 'ticker-updating' : ''}`}> 
      <div className="ticker-header">
        <div className="ticker-icon" style={{ color }}>
          {icon}
        </div>
        <span className="ticker-label">{title}</span>
        <div className="live-indicator">
          <div className="pulse-dot"></div>
          LIVE
        </div>
      </div>
      
      <div className={`ticker-value ${isAnimating ? 'value-updating' : ''}`}> 
        {current.value}
      </div>
      
      <div className="ticker-footer">
        <span className="ticker-type">{current.label}</span>
        <div className={`ticker-change ${current.isPositive ? 'positive' : 'negative'}`}> 
          {current.isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          <span className="change-value">{current.change}</span>
          <div className="change-sparkle"></div>
        </div>
      </div>
    </GlowingCard>
  );
}

// Ticker Components
function MortgageRatesTicker({ data }) {
  return <PremiumTicker data={data} title="Mortgage Rates" icon={<TrendingUp size={18} />} color="#00ff88" />;
}

function AgCommoditiesTicker({ data }) {
  return <PremiumTicker data={data} title="Ag Commodities" icon="🌾" color="#4a96ff" />;
}

function EquitiesTicker({ data }) {
  return <PremiumTicker data={data} title="Markets" icon="📈" color="#ff6b35" />;
}

// Main App Component with Real Data Integration
export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeSearch, setActiveSearch] = useState('mortgage');
  
  // Real data state
  const [servicesData, setServicesData] = useState(null);
  const [stats, setStats] = useState([]);
  const [mortgageRates, setMortgageRates] = useState([]);
  const [commoditiesData, setCommoditiesData] = useState([]);
  const [marketsData, setMarketsData] = useState([]);
  const [lendersData, setLendersData] = useState([]);
  
  // Search states
  const [searchCriteria, setSearchCriteria] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load real data on component mount
  useEffect(() => {
    async function loadData() {
      try {
        const [services, lenders, rates, commodities, markets] = await Promise.all([
          getServicesData(),
          getLendersData(),
          getMortgageRates(),
          getCommoditiesData(),
          getMarketsData()
        ]);

        setServicesData(services);
        setLendersData(lenders);
        setMortgageRates(rates);
        setCommoditiesData(commodities);
        setMarketsData(markets);

        // Calculate dashboard stats with real data
        const dashboardStats = await getDashboardStats(services);
        setStats(dashboardStats);
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Handle search functionality
  const handleSearch = async (criteria) => {
    setSearchLoading(true);
    try {
      let results = [];
      if (activeSearch === 'mortgage') {
        results = await searchMortgages(criteria);
      } else if (activeSearch === 'factoring') {
        results = await searchFactoring(criteria);
      }
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    }
    setSearchLoading(false);
  };

  const navItems = [
    { key: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { key: 'services', label: 'Services', icon: Shield },
    { key: 'search', label: 'Search', icon: Search },
    { key: 'admin', label: 'Admin', icon: Settings }
  ];

  if (loading) {
    return (
      <div className="auditdna-app loading-screen">
        <AnimatedBackground />
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <h2>Loading AuditDNA...</h2>
          <p>Connecting to data sources...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="auditdna-app">
      <AnimatedBackground />
      
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">
              <Zap className="logo-spark" />
            </div>
            <h1 className="app-title">
              <span className="title-main">AuditDNA</span>
              <span className="title-sub">PREMIUM</span>
            </h1>
          </div>
          
          <nav className="main-nav">
            {navItems.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                className={`nav-item ${activeTab === key ? 'active' : ''}`}
                onClick={() => setActiveTab(key)}
              >
                <Icon size={18} />
                <span>{label}</span>
                {activeTab === key && <div className="nav-indicator" />}
              </button>
            ))}
          </nav>
          
          <div className="header-actions">
            <div className="live-status">
              <div className="status-dot"></div>
              <span>LIVE</span>
            </div>
          </div>
        </div>
      </header>

      {/* Live Tickers */}
      <div className="tickers-section">
        <div className="tickers-container">
          <MortgageRatesTicker data={mortgageRates} />
          <AgCommoditiesTicker data={commoditiesData} />
          <EquitiesTicker data={marketsData} />
        </div>
      </div>

      {/* Main Content */}
      <main className="main-content">
        {activeTab === 'dashboard' && (
          <div className="dashboard-tab">
            <div className="dashboard-header">
              <h2>
                <BarChart3 size={24} />
                Dashboard Overview
              </h2>
              <p>Real-time analytics and system status</p>
            </div>
            
            <div className="stats-grid">
              {stats.map((stat, i) => (
                <GlowingCard key={i} className="stat-card">
                  <div className="stat-content">
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                  <div className="stat-icon">
                    {stat.icon === 'BarChart3' && <BarChart3 size={24} />}
                    {stat.icon === 'Users' && <Users size={24} />}
                    {stat.icon === 'DollarSign' && <DollarSign size={24} />}
                    {stat.icon === 'TrendingUp' && <TrendingUp size={24} />}
                    {stat.icon === 'Star' && <Star size={24} />}
                  </div>
                </GlowingCard>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'services' && servicesData && (
          <div className="services-tab">
            <div className="services-header">
              <h2>
                <Shield size={24} />
                Service Catalog
              </h2>
              <p>Premium audit and compliance services</p>
            </div>
            
            <div className="services-content">
              {Object.entries(servicesData.spartan || {}).map(([category, services]) => (
                <GlowingCard key={category} className="service-category">
                  <div className="category-header">
                    <h3>{category}</h3>
                    <span className="service-count">{services.length} services</span>
                  </div>
                  <div className="services-list">
                    {services.slice(0, 5).map((service, i) => (
                      <div key={i} className="service-item">
                        <span className="service-name">{service}</span>
                        <div className="service-badge">Premium</div>
                      </div>
                    ))}
                    {services.length > 5 && (
                      <div className="service-item more-services">
                        +{services.length - 5} more services
                      </div>
                    )}
                  </div>
                </GlowingCard>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'search' && (
          <div className="search-tab">
            <div className="search-header">
              <h2>
                <Search size={24} />
                Advanced Search
              </h2>
              <p>Find mortgages, factoring, and compliance solutions</p>
            </div>
            
            <div className="search-controls">
              <div className="search-type-selector">
                <button 
                  className={`search-type ${activeSearch === 'mortgage' ? 'active' : ''}`}
                  onClick={() => setActiveSearch('mortgage')}
                >
                  Mortgage Search
                </button>
                <button 
                  className={`search-type ${activeSearch === 'factoring' ? 'active' : ''}`}
                  onClick={() => setActiveSearch('factoring')}
                >
                  Factoring Search
                </button>
              </div>
            </div>

            <GlowingCard className="search-form">
              <div className="form-header">
                <h3>{activeSearch === 'mortgage' ? 'Mortgage Criteria' : 'Factoring Criteria'}</h3>
              </div>
              
              {activeSearch === 'mortgage' && (
                <div className="form-grid">
                  <input 
                    type="text" 
                    placeholder="State (CA, TX, FL...)" 
                    className="search-input"
                    onChange={(e) => setSearchCriteria({...searchCriteria, state: e.target.value})}
                  />
                  <input 
                    type="number" 
                    placeholder="Min FICO Score" 
                    className="search-input"
                    onChange={(e) => setSearchCriteria({...searchCriteria, minFico: e.target.value})}
                  />
                  <input 
                    type="number" 
                    placeholder="Loan Amount" 
                    className="search-input"
                    onChange={(e) => setSearchCriteria({...searchCriteria, loanAmount: e.target.value})}
                  />
                  <button 
                    className="search-button"
                    onClick={() => handleSearch(searchCriteria)}
                    disabled={searchLoading}
                  >
                    {searchLoading ? 'Searching...' : 'Search Lenders'}
                  </button>
                </div>
              )}

              {activeSearch === 'factoring' && (
                <div className="form-grid">
                  <input 
                    type="text" 
                    placeholder="Company Name" 
                    className="search-input"
                    onChange={(e) => setSearchCriteria({...searchCriteria, company: e.target.value})}
                  />
                  <input 
                    type="number" 
                    placeholder="Monthly A/R (USD)" 
                    className="search-input"
                    onChange={(e) => setSearchCriteria({...searchCriteria, monthlyAR: e.target.value})}
                  />
                  <select 
                    className="search-input"
                    onChange={(e) => setSearchCriteria({...searchCriteria, industry: e.target.value})}
                  >
                    <option value="">Select Industry</option>
                    <option value="produce">Produce</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="logistics">Logistics</option>
                  </select>
                  <button 
                    className="search-button"
                    onClick={() => handleSearch(searchCriteria)}
                    disabled={searchLoading}
                  >
                    {searchLoading ? 'Searching...' : 'Search Factors'}
                  </button>
                </div>
              )}
            </GlowingCard>

            {searchResults.length > 0 && (
              <GlowingCard className="search-results">
                <div className="results-header">
                  <h3>Search Results ({searchResults.length})</h3>
                </div>
                <div className="results-list">
                  {searchResults.slice(0, 10).map((result, i) => (
                    <div key={i} className="result-item">
                      <div className="result-name">{result.name || result.id}</div>
                      <div className="result-details">
                        {result.programs && <span>Programs: {result.programs.join(', ')}</span>}
                        {result.notes_excerpt && <span>Notes: {result.notes_excerpt}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </GlowingCard>
            )}
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="admin-tab">
            <div className="admin-header">
              <h2>
                <Settings size={24} />
                System Administration
              </h2>
              <p>Configure services and system settings</p>
            </div>
            
            <div className="admin-grid">
              <GlowingCard className="admin-card">
                <h3>Data Sources</h3>
                <div className="data-source">
                  <span>Lenders Database</span>
                  <div className="status-indicator active">Connected</div>
                </div>
                <div className="data-source">
                  <span>Services Catalog</span>
                  <div className="status-indicator active">Connected</div>
                </div>
                <div className="data-source">
                  <span>API Endpoints</span>
                  <div className="status-indicator warning">Fallback Mode</div>
                </div>
              </GlowingCard>
              
              <GlowingCard className="admin-card">
                <h3>System Status</h3>
                <div className="system-metric">
                  <span>Active Services</span>
                  <span>{Object.values(servicesData?.spartan || {}).flat().length}</span>
                </div>
                <div className="system-metric">
                  <span>Connected Lenders</span>
                  <span>{lendersData.length}</span>
                </div>
                <div className="system-metric">
                  <span>Uptime</span>
                  <span>99.9%</span>
                </div>
              </GlowingCard>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}