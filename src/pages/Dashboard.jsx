import React, { useEffect, useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

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
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-20 bg-slate-900 text-white flex flex-col items-center py-6 shadow-lg">
        <div className="mb-8 text-2xl font-bold">AD</div>
        <nav className="flex flex-col gap-6">
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
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header onLogout={() => {
          logout();
          navigate("/login");
        }} />
        <main className="p-6">
          <h1 className="text-3xl font-bold mb-6">AuditDNA OS Dashboard</h1>
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
            <h2 className="text-xl font-bold mb-2">USDA Price Trend</h2>
            <div className="bg-white rounded-xl shadow p-4" style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={usda.prices}>
                  <Line type="monotone" dataKey="price" stroke="#2563eb" name="Price" />
                  <Line type="monotone" dataKey="avg5yr" stroke="#f59e42" name="5yr Avg" />
                  <CartesianGrid stroke="#ccc" />
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
            <h2 className="text-xl font-bold mb-2">Factoring Cash Flow</h2>
            <div className="bg-white rounded-xl shadow p-4" style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={factoring.cashflow}>
                  <Line type="monotone" dataKey="value" stroke="#a21caf" name="Payout" />
                  <CartesianGrid stroke="#ccc" />
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
            <h2 className="text-xl font-bold mb-2">Risk Heatmap</h2>
            <div className="bg-white rounded-xl shadow p-4" style={{ height: 300 }}>
              {/* Placeholder: use compliance.heatmap for real chart */}
              {compliance.heatmap.length === 0 ? (
                <div className="text-gray-400 flex items-center justify-center h-full">No heatmap data.</div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={compliance.heatmap}>
                    <Line type="monotone" dataKey="score" stroke="#e11d48" name="Risk" />
                    <CartesianGrid stroke="#ccc" />
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

// Sidebar icon stub
function SidebarIcon({ label, onClick, active = false }) {
  return (
    <div 
      className={`flex flex-col items-center group cursor-pointer ${active ? 'text-blue-400' : ''}`}
      onClick={onClick}
    >
      <div className={`h-8 w-8 rounded-lg mb-1 flex items-center justify-center transition ${active ? 'bg-blue-600' : 'bg-slate-800 group-hover:bg-blue-600'}`}>
        {/* Put SVG icon here per label for Step 4 */}
      </div>
      <span className="text-xs">{label}</span>
    </div>
  );
}

// Header stub
function Header({ onLogout }) {
  return (
    <header className="w-full h-16 bg-white shadow flex items-center px-8 justify-between">
      <div className="flex items-center gap-3">
        <span className="font-bold text-xl text-blue-700">AuditDNA OS</span>
      </div>
      {/* Topbar features: search, notifications, avatar go here (Step 4) */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Quick search..."
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button className="relative p-2 text-gray-600 hover:text-blue-600 transition">
          🔔
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
            3
          </span>
        </button>
        <button 
          onClick={onLogout}
          className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

// Enhanced card w/ metric, subtitle, color, and icon
function DashboardCard({ title, value, subtitle, color, icon, onClick }) {
  return (
    <div 
      className={`rounded-xl shadow p-6 flex flex-col items-start transition-transform cursor-pointer hover:scale-105 ${color}`}
      onClick={onClick}
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