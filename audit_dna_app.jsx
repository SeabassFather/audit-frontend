import React, { useState, useEffect } from 'react';
import { BarChart3, Shield, Search, Settings, TrendingUp, TrendingDown, Users, DollarSign, ChevronDown, ChevronRight, Play, FileText, Filter } from 'lucide-react';

// Live Tickers Component
function useRotator(items, intervalMs = 3000) {
  const [index, setIndex] = useState(0);
  
  useEffect(() => {
    if (items.length === 0) return;
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % items.length);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [items.length, intervalMs]);

  return items[index] || null;
}

function MortgageRatesTicker() {
  const rates = [
    { label: "30Y Fixed", value: "6.94%", change: "-0.02", isPositive: false },
    { label: "15Y Fixed", value: "6.23%", change: "+0.01", isPositive: true },
    { label: "5/1 ARM", value: "5.85%", change: "-0.05", isPositive: false },
    { label: "Jumbo 30Y", value: "7.12%", change: "+0.03", isPositive: true },
  ];
  
  const current = useRotator(rates);

  if (!current) return null;

  return (
    <div className="ticker-card">
      <div className="ticker-header">
        <TrendingUp size={16} className="text-green-400" />
        <span className="ticker-label">Mortgage Rates</span>
      </div>
      <div className="ticker-value">{current.value}</div>
      <div className="ticker-footer">
        <span className="ticker-type">{current.label}</span>
        <div className="ticker-change-container">
          {current.isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          <span className={`ticker-change ${current.isPositive ? "positive" : "negative"}`}>{current.change}</span>
        </div>
      </div>
    </div>
  );
}

function AgCommoditiesTicker() {
  const commodities = [
    { label: "Corn", value: "$473.25", change: "+1.10", isPositive: true },
    { label: "Soybeans", value: "$1,264.50", change: "-3.25", isPositive: false },
    { label: "Wheat", value: "$604.75", change: "+0.75", isPositive: true },
    { label: "Cotton", value: "$67.80", change: "+0.45", isPositive: true },
  ];
  
  const current = useRotator(commodities);

  if (!current) return null;

  return (
    <div className="ticker-card">
      <div className="ticker-header">
        <span className="text-xl">🌾</span>
        <span className="ticker-label">Ag Commodities</span>
      </div>
      <div className="ticker-value">{current.value}</div>
      <div className="ticker-footer">
        <span className="ticker-type">{current.label}</span>
        <div className="ticker-change-container">
          {current.isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          <span className={`ticker-change ${current.isPositive ? "positive" : "negative"}`}>{current.change}</span>
        </div>
      </div>
    </div>
  );
}

function EquitiesTicker() {
  const markets = [
    { label: "S&P 500", value: "5,510", change: "+12", isPositive: true },
    { label: "NASDAQ", value: "23,784", change: "-31", isPositive: false },
    { label: "DOW", value: "39,210", change: "+48", isPositive: true },
    { label: "Gold", value: "$2,031", change: "+15", isPositive: true }
  ];
  
  const current = useRotator(markets);

  if (!current) return null;

  return (
    <div className="ticker-card">
      <div className="ticker-header">
        <span className="text-xl">📈</span>
        <span className="ticker-label">Markets</span>
      </div>
      <div className="ticker-value">{current.value}</div>
      <div className="ticker-footer">
        <span className="ticker-type">{current.label}</span>
        <div className="ticker-change-container">
          {current.isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          <span className={`ticker-change ${current.isPositive ? "positive" : "negative"}`}>{current.change}</span>
        </div>
      </div>
    </div>
  );
}

// Service Data
const auditDNAServices = {
  consumer: {
    title: "Consumer Protection Services",
    description: "Individual & Family Financial Auditing",
    icon: "🛡️",
    count: 39,
    services: [
      {
        id: "CS001",
        name: "Mortgage Escrow Reconciliation Audit",
        price: "$1,247",
        recovery: "Average recovery: $12,450 per case",
        timeframe: "30-45 business days",
        successRate: "94.2%",
        requirements: ["Mortgage statements (12 months)", "Escrow analysis statements", "Property tax records"]
      },
      {
        id: "CS002", 
        name: "Utility Overcharge Audit",
        price: "$897",
        recovery: "Average recovery: $3,250 per case",
        timeframe: "21-30 business days",
        successRate: "87.5%",
        requirements: ["12 months utility bills", "Service agreements", "Rate schedules"]
      },
      {
        id: "CS003",
        name: "Telecom Billing Audit",
        price: "$647",
        recovery: "Average recovery: $2,180 per case", 
        timeframe: "14-21 business days",
        successRate: "91.3%",
        requirements: ["6 months billing statements", "Service contracts"]
      }
    ]
  },
  commercial: {
    title: "Elite Commercial & Business Services",
    description: "Enterprise & Government Compliance",
    icon: "🏢",
    count: 28,
    services: [
      {
        id: "EC001",
        name: "Commercial Lease Audit",
        price: "$2,497",
        recovery: "Average recovery: $47,200 per case",
        timeframe: "60-90 business days",
        successRate: "91.8%",
        requirements: ["Lease agreements", "CAM reconciliations", "Property tax statements"]
      },
      {
        id: "EC002",
        name: "Vendor Contract Audit",
        price: "$1,897",
        recovery: "Average recovery: $28,500 per case",
        timeframe: "45-60 business days",
        successRate: "88.7%",
        requirements: ["Vendor agreements", "Service level agreements", "Payment records"]
      }
    ]
  },
  agriculture: {
    title: "Agriculture & Water Services",
    description: "Partnered with AgriMAXX for crop yield & water integrity audits",
    icon: "🌾",
    count: 6,
    partnership: "AgriMAXX Technology Integration",
    services: [
      {
        id: "AG001",
        name: "Water Usage Audit & Compliance Review",
        price: "$1,897",
        recovery: "Average savings: $8,500 per growing season",
        timeframe: "30-45 business days",
        successRate: "91.2%",
        requirements: ["Water usage records", "Irrigation system documentation", "Well permits"]
      },
      {
        id: "AG002",
        name: "Crop Yield Optimization Audit",
        price: "$2,247",
        recovery: "Average yield improvement: $12,000 per season",
        timeframe: "45-60 business days",
        successRate: "93.4%",
        requirements: ["Historical yield data", "Planting records", "Weather data"]
      }
    ]
  },
  elite: {
    title: "Elite Financial Regulations",
    description: "Premium regulatory compliance and advanced audit services",
    icon: "👑",
    count: 15,
    services: [
      {
        id: "EF001",
        name: "Margin Requirements Audit (Regulation T)",
        price: "$4,997",
        recovery: "Average recovery: $125,000+ per case",
        timeframe: "90-120 business days",
        successRate: "94.7%",
        requirements: ["Account statements", "Margin agreements", "Trade confirmations"]
      }
    ]
  }
};

// Search Engine Components
function MortgageSearchEngine() {
  const [criteria, setCriteria] = useState({
    loanAmount: "",
    creditScore: "",
    loanType: "conventional"
  });
  
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    const mockResults = [
      {
        lender: "Everwise Home Loans",
        rate: "6.875%",
        apr: "6.901%",
        monthlyPayment: "$2,648",
        closingCosts: "$3,200"
      },
      {
        lender: "Premium Mortgage Corp",
        rate: "6.750%",
        apr: "6.823%",
        monthlyPayment: "$2,607",
        closingCosts: "$2,850"
      }
    ];
    setResults(mockResults);
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Mortgage Search Engine</h3>
          <Search size={20} />
        </div>
        
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Loan Amount</label>
            <input
              type="number"
              className="form-input"
              value={criteria.loanAmount}
              onChange={(e) => setCriteria(prev => ({ ...prev, loanAmount: e.target.value }))}
              placeholder="$400,000"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Credit Score</label>
            <input
              type="number"
              className="form-input"
              value={criteria.creditScore}
              onChange={(e) => setCriteria(prev => ({ ...prev, creditScore: e.target.value }))}
              placeholder="720"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Loan Type</label>
            <select
              className="form-select"
              value={criteria.loanType}
              onChange={(e) => setCriteria(prev => ({ ...prev, loanType: e.target.value }))}
            >
              <option value="conventional">Conventional</option>
              <option value="fha">FHA</option>
              <option value="va">VA</option>
              <option value="jumbo">Jumbo</option>
            </select>
          </div>
        </div>
        
        <button className="btn btn-primary" onClick={handleSearch}>
          Search Lenders
        </button>
      </div>

      {results.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Search Results</h4>
          {results.map((result, index) => (
            <div key={index} className="card">
              <div className="result-header">
                <div>
                  <h5 className="font-semibold">{result.lender}</h5>
                  <p className="text-sm text-gray-400">Conventional 30-Year Fixed</p>
                </div>
                <div className="result-rate">
                  <div className="text-xl font-bold text-green-400">{result.rate}</div>
                  <div className="text-sm text-gray-400">APR: {result.apr}</div>
                </div>
              </div>
              
              <div className="result-details">
                <div>
                  <span className="detail-label">Monthly Payment</span>
                  <div className="detail-value">{result.monthlyPayment}</div>
                </div>
                <div>
                  <span className="detail-label">Closing Costs</span>
                  <div className="detail-value">{result.closingCosts}</div>
                </div>
              </div>
              
              <button className="btn btn-primary mt-4">
                Get Pre-Approved
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AgricultureSearchEngine() {
  return (
    <div className="space-y-6">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Agriculture Marketplace</h3>
          <span className="text-2xl">🌾</span>
        </div>
        
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">I am a</label>
            <select className="form-select">
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Commodity</label>
            <select className="form-select">
              <option value="">Select Commodity</option>
              <option value="tomatoes">Tomatoes</option>
              <option value="lettuce">Lettuce</option>
              <option value="strawberries">Strawberries</option>
              <option value="almonds">Almonds</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Certification</label>
            <select className="form-select">
              <option value="">Any Certification</option>
              <option value="usda-organic">USDA Organic</option>
              <option value="globalgap">GlobalG.A.P.</option>
              <option value="primus">PrimusGFS</option>
            </select>
          </div>
        </div>
        
        <button className="btn btn-primary">
          <Filter size={16} />
          Search Marketplace
        </button>
      </div>
      
      <div className="partnership-banner">
        <h4 className="partnership-title">🌾 AgriMAXX Partnership</h4>
        <p className="partnership-description">Advanced agricultural technology integration for enhanced crop yield and compliance</p>
      </div>
    </div>
  );
}

// Main App Component
export default function AuditDNAApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeCategory, setActiveCategory] = useState('consumer');
  const [activeSearch, setActiveSearch] = useState('mortgage');
  const [openServices, setOpenServices] = useState(new Set());

  const toggleService = (serviceId) => {
    const newOpen = new Set(openServices);
    if (newOpen.has(serviceId)) {
      newOpen.delete(serviceId);
    } else {
      newOpen.add(serviceId);
    }
    setOpenServices(newOpen);
  };

  const navItems = [
    { key: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { key: 'services', label: 'Services', icon: Shield },
    { key: 'search', label: 'Search', icon: Search },
    { key: 'admin', label: 'Admin', icon: Settings }
  ];

  const stats = [
    { label: "Total Services", value: "255+", icon: BarChart3 },
    { label: "Active Cases", value: "247", icon: Users },
    { label: "Recovery", value: "$2.8M", icon: DollarSign },
    { label: "Success Rate", value: "94.2%", icon: TrendingUp }
  ];

  const categoryTabs = [
    { key: "consumer", label: "Consumer Protection" },
    { key: "commercial", label: "Elite Commercial" },
    { key: "agriculture", label: "Agriculture & Water" },
    { key: "elite", label: "Elite Financial" }
  ];

  return (
    <>  
      ...[snip]... (full code as provided above)
    </>
  );
}