import React, { useEffect, useState } from "react";

// Helper for authenticated fetch
async function fetchApi(url, options = {}) {
  const token = localStorage.getItem('token'); // assumes JWT stored here
  const headers = { ...options.headers, Authorization: token ? `Bearer ${token}` : undefined };
  const response = await fetch(url, { ...options, headers });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
}

export default function Dashboard() {
  // State for real metrics
  const [audits, setAudits] = useState({ count: 0, pass: 0, fail: 0 });
  const [usda, setUsda] = useState({ alerts: [], count: 0 });
  const [mortgage, setMortgage] = useState({ deals: 0, pending: 0 });
  const [factoring, setFactoring] = useState({ active: 0, pending: 0, payout: 0 });
  const [compliance, setCompliance] = useState({ violations: 0, score: "", color: "gray" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMetrics() {
      setLoading(true);
      try {
        // 1. Active audits
        const auditsData = await fetchApi('/api/audits');
        const auditsCount = auditsData.length;
        const pass = auditsData.filter(a => a.status === 'pass').length;
        const fail = auditsData.filter(a => a.status === 'fail').length;
        setAudits({ count: auditsCount, pass, fail });

        // 2. USDA alerts
        const usdaData = await fetchApi('/api/usda/prices');
        setUsda({
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
        });

        // 5. Compliance violations
        const complianceData = await fetchApi('/api/compliance/search');
        setCompliance({
          violations: complianceData.violations || 0,
          score: complianceData.score || "",
          color: complianceData.color || "gray",
        });
      } catch (e) {
        // If any endpoint fails, show as empty
        setAudits({ count: 0, pass: 0, fail: 0 });
        setUsda({ alerts: [], count: 0 });
        setMortgage({ deals: 0, pending: 0 });
        setFactoring({ active: 0, pending: 0, payout: 0 });
        setCompliance({ violations: 0, score: "", color: "gray" });
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
          <SidebarIcon label="Home" />
          <SidebarIcon label="USDA" />
          <SidebarIcon label="Mortgage" />
          <SidebarIcon label="Factoring" />
          <SidebarIcon label="WaterTech" />
          <SidebarIcon label="Compliance" />
          <SidebarIcon label="Docs" />
          <SidebarIcon label="Admin" />
        </nav>
      </aside>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6">
          <h1 className="text-3xl font-bold mb-6">AuditDNA OS Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
            />
            <DashboardCard
              title="Mortgage Deals"
              value={loading ? "…" : mortgage.deals}
              subtitle={`Pending: ${mortgage.pending}`}
              color="bg-green-100 text-green-900"
              icon="🏠"
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
        </main>
      </div>
    </div>
  );
}

// Sidebar icon stub
function SidebarIcon({ label }) {
  return (
    <div className="flex flex-col items-center group cursor-pointer">
      <div className="h-8 w-8 bg-slate-800 rounded-lg mb-1 flex items-center justify-center group-hover:bg-blue-600 transition">
        {/* Put SVG icon here per label for Step 4 */}
      </div>
      <span className="text-xs">{label}</span>
    </div>
  );
}

// Header stub
function Header() {
  return (
    <header className="w-full h-16 bg-white shadow flex items-center px-8 justify-between">
      <div className="flex items-center gap-3">
        <span className="font-bold text-xl text-blue-700">AuditDNA OS</span>
      </div>
      {/* Topbar features: search, notifications, avatar go here (Step 4) */}
    </header>
  );
}

// Enhanced card w/ metric, subtitle, color, and icon
function DashboardCard({ title, value, subtitle, color, icon }) {
  return (
    <div className={`rounded-xl shadow p-6 flex flex-col items-start ${color}`}> 
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{icon}</span>
        <span className="font-semibold text-lg">{title}</span>
      </div>
      <span className="text-3xl font-bold mb-1">{value}</span>
      <span className="text-sm opacity-70">{subtitle}</span>
    </div>
  );
}