import React, { useEffect, useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import AuditDNALogo from "../components/AuditDNALogo";

// Helper for authenticated fetch
async function fetchApi(url, options = {}) {
  const token = localStorage.getItem('token');
  const headers = { ...options.headers, Authorization: token ? `Bearer ${token}` : undefined };
  const response = await fetch(url, { ...options, headers });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
}

export default function Dashboard() {
  const navigate = useNavigate();
  // State for real metrics
  const [audits, setAudits] = useState({ count: 0, pass: 0, fail: 0 });
  const [usda, setUsda] = useState({ prices: [], avg5yr: [], alerts: [], count: 0 });
  const [mortgage, setMortgage] = useState({ deals: 0, pending: 0 });
  const [factoring, setFactoring] = useState({ active: 0, pending: 0, payout: 0, cashflow: [] });
  const [compliance, setCompliance] = useState({ violations: 0, score: "", color: "gray", heatmap: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMetrics() {
      setLoading(true);
      try {
        // 1. Active audits
        const auditsData = await fetchApi('/api/audits');
        setAudits({
          count: auditsData.length,
          pass: auditsData.filter(a => a.status === 'pass').length,
          fail: auditsData.filter(a => a.status === 'fail').length,
        });

        // 2. USDA prices/alerts
        const usdaData = await fetchApi('/api/usda/prices');
        setUsda({
          prices: usdaData.weekly || [],
          avg5yr: usdaData.avg5yr || [],
          alerts: usdaData.alerts || [],
          count: usdaData.alerts ? usdaData.alerts.length : 0,
        });

        // 3. Mortgage deals
        const mortgageData = await fetchApi('/api/lenders');
        setMortgage({
          deals: mortgageData.length,
          pending: mortgageData.filter(l => l.status === 'pending').length,
        });

        // 4. Factoring contracts
        const factoringData = await fetchApi('/api/factoring/contracts');
        setFactoring({
          active: factoringData.filter(f => f.status === 'active').length,
          pending: factoringData.filter(f => f.status === 'pending').length,
          payout: factoringData.reduce((sum, f) => sum + (f.payout || 0), 0),
          cashflow: factoringData.map(f => ({ name: f.contractId || f.grower, value: f.payout || 0 })),
        });

        // 5. Compliance violations
        const complianceData = await fetchApi('/api/compliance/search');
        setCompliance({
          violations: complianceData.violations || 0,
          score: complianceData.score || "",
          color: complianceData.color || "gray",
          heatmap: complianceData.heatmap || [],
        });
      } catch (e) {
        setAudits({ count: 0, pass: 0, fail: 0 });
        setUsda({ prices: [], avg5yr: [], alerts: [], count: 0 });
        setMortgage({ deals: 0, pending: 0 });
        setFactoring({ active: 0, pending: 0, payout: 0, cashflow: [] });
        setCompliance({ violations: 0, score: "", color: "gray", heatmap: [] });
      }
      setLoading(false);
    }
    loadMetrics();
  }, []);

  return (
    <div className="flex min-h-screen" style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FFFE 100%)' }}>
      {/* Sidebar - Fixed overlapping issues */}
      <aside className="sidebar-modern flex flex-col items-center py-6 shadow-lg" style={{ width: '280px', position: 'fixed', height: '100vh', left: 0, top: 0, zIndex: 10 }}>
        <div className="mb-8">
          <AuditDNALogo size="medium" />
        </div>
        <nav className="flex flex-col gap-6 w-full px-4">
          <SidebarIcon label="Home" onClick={() => navigate("/dashboard")} active={true} />
          <SidebarIcon label="USDA" onClick={() => navigate("/usda-pricing")} />
          <SidebarIcon label="Mortgage" onClick={() => navigate("/mortgage-search")} />
          <SidebarIcon label="Factoring" onClick={() => alert("Factoring module coming soon")} />
          <SidebarIcon label="WaterTech" onClick={() => alert("WaterTech module coming soon")} />
          <SidebarIcon label="Compliance" onClick={() => alert("Compliance module coming soon")} />
          <SidebarIcon label="Docs" onClick={() => alert("Docs module coming soon")} />
          <SidebarIcon label="Admin" onClick={() => navigate("/elite-modules")} />
        </nav>
      </aside>
      {/* Main Content - Fixed margin to account for fixed sidebar */}
      <div className="flex-1 flex flex-col" style={{ marginLeft: '280px' }}>
        <Header onLogout={() => {
          logout();
          navigate("/login");
        }} />
        <main className="p-6" style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FFFE 100%)', minHeight: 'calc(100vh - 4rem)' }}>
          <h1 className="text-3xl font-bold mb-6 text-primary">AuditDNA OS Dashboard</h1>
          {/* Metrics cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            <DashboardCard
              title="Active Audits"
              value={loading ? "…" : audits.count}
              subtitle={`Pass: ${audits.pass} / Fail: ${audits.fail}`}
              color="bg-blue-100 text-blue-800"
              icon="📝"
            />
            <DashboardCard
              title="USDA Commodity Alerts"
              value={loading ? "…" : usda.count}
              subtitle={usda.alerts.map(a => a.message).join(", ")}
              color="bg-yellow-100 text-yellow-900"
              icon="🥑"
              onClick={() => navigate("/usda-pricing")}
            />
            <DashboardCard
              title="Mortgage Deals"
              value={loading ? "…" : mortgage.deals}
              subtitle={`Pending: ${mortgage.pending}`}
              color="bg-green-100 text-green-900"
              icon="🏠"
              onClick={() => navigate("/mortgage-search")}
            />
            <DashboardCard
              title="Factoring Contracts"
              value={loading ? "…" : factoring.active}
              subtitle={`Pending: ${factoring.pending}, Payout: $${factoring.payout.toLocaleString()}`}
              color="bg-purple-100 text-purple-900"
              icon="💵"
            />
            <DashboardCard
              title="Compliance Violations"
              value={loading ? "…" : compliance.violations}
              subtitle={`Score: ${compliance.score}`}
              color={
                compliance.color === "red"
                  ? "bg-red-100 text-red-900"
                  : compliance.color === "yellow"
                  ? "bg-yellow-100 text-yellow-900"
                  : "bg-green-100 text-green-900"
              }
              icon="⚠️"
            />
          </div>
          {/* USDA Price Trend (Line Chart) */}
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-2 text-primary">USDA Price Trend</h2>
            <div className="bg-white rounded-xl shadow p-4" style={{ height: 300, border: '1px solid var(--border)' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={usda.prices}>
                  <Line type="monotone" dataKey="price" stroke="#87CEEB" strokeWidth={3} name="Price" />
                  <Line type="monotone" dataKey="avg5yr" stroke="#32CD32" strokeWidth={3} name="5yr Avg" />
                  <CartesianGrid stroke="#E2E8F0" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>
          {/* Factoring Cash Flow (Bar Chart) */}
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-2 text-primary">Factoring Cash Flow</h2>
            <div className="bg-white rounded-xl shadow p-4" style={{ height: 300, border: '1px solid var(--border)' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={factoring.cashflow}>
                  <Line type="monotone" dataKey="value" stroke="#32CD32" strokeWidth={3} name="Payout" />
                  <CartesianGrid stroke="#E2E8F0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>
          {/* Risk Heatmap (Compliance) */}
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-2 text-primary">Risk Heatmap</h2>
            <div className="bg-white rounded-xl shadow p-4" style={{ height: 300, border: '1px solid var(--border)' }}>
              {/* Placeholder: use compliance.heatmap for real chart */}
              {compliance.heatmap.length === 0 ? (
                <div className="text-medium flex items-center justify-center h-full">No heatmap data.</div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={compliance.heatmap}>
                    <Line type="monotone" dataKey="score" stroke="#32CD32" strokeWidth={3} name="Risk" />
                    <CartesianGrid stroke="#E2E8F0" />
                    <XAxis dataKey="region" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

// Sidebar icon with improved styling
function SidebarIcon({ label, onClick, active = false }) {
  return (
    <div 
      className={`flex items-center gap-3 w-full p-3 rounded-lg cursor-pointer transition group ${
        active ? 'bg-white shadow text-primary font-semibold' : 'text-dark hover:bg-white hover:bg-opacity-20'
      }`}
      onClick={onClick}
    >
      <div className={`h-8 w-8 rounded-lg flex items-center justify-center transition ${
        active ? 'bg-primary text-white' : 'bg-white bg-opacity-20 group-hover:bg-white group-hover:bg-opacity-40'
      }`}>
        {getIconForLabel(label)}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

// Helper function to get icons for each label
function getIconForLabel(label) {
  const icons = {
    'Home': '🏠',
    'USDA': '🌾',
    'Mortgage': '🏘️',
    'Factoring': '💼',
    'WaterTech': '💧',
    'Compliance': '📋',
    'Docs': '📄',
    'Admin': '⚙️'
  };
  return icons[label] || '📊';
}

// Header with AuditDNA branding
function Header({ onLogout }) {
  return (
    <header className="w-full h-16 bg-white shadow flex items-center px-8 justify-between" style={{ borderBottom: '2px solid var(--light-silver)' }}>
      <div className="flex items-center gap-3">
        <AuditDNALogo size="small" />
        <span className="font-bold text-xl text-primary">AuditDNA OS</span>
      </div>
      {/* Enhanced topbar features */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Quick search..."
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:border-blue-500"
            style={{ borderColor: 'var(--border)' }}
          />
        </div>
        <button className="relative p-2 text-medium hover:text-primary transition">
          🔔
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full text-xs text-white flex items-center justify-center" style={{ background: 'var(--lime)' }}>
            3
          </span>
        </button>
        <button 
          onClick={onLogout}
          className="px-4 py-2 text-sm rounded-lg transition"
          style={{ background: 'var(--light-silver)', color: 'var(--text-dark)' }}
          onMouseOver={(e) => e.target.style.background = 'var(--light-blue)'}
          onMouseOut={(e) => e.target.style.background = 'var(--light-silver)'}
        >
          Logout
        </button>
      </div>
    </header>
  );
}

// Enhanced card with new color scheme
function DashboardCard({ title, value, subtitle, color, icon, onClick }) {
  return (
    <div 
      className={`card-modern rounded-xl p-6 flex flex-col items-start cursor-pointer ${color}`}
      onClick={onClick}
      style={{ 
        minHeight: '140px',
        border: '1px solid var(--border)',
        transition: 'all 0.2s ease-in-out'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow)';
      }}
    > 
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{icon}</span>
        <span className="font-semibold text-lg">{title}</span>
      </div>
      <span className="text-3xl font-bold mb-1">{value}</span>
      <span className="text-sm opacity-70">{subtitle}</span>
      {onClick && (
        <div className="mt-3 text-sm font-medium opacity-60">
          Click to view details →
        </div>
      )}
    </div>
  );
}