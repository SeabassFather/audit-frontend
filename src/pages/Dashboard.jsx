import React from "react";

export default function Dashboard() {
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
            {/* Metrics cards will go here (Step 2) */}
            <DashboardCard title="Active Audits" />
            <DashboardCard title="USDA Commodity Alerts" />
            <DashboardCard title="Mortgage Deals" />
            <DashboardCard title="Factoring Contracts" />
            <DashboardCard title="Compliance Violations" />
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

// Dashboard card stub
function DashboardCard({ title }) {
  return (
    <div className="rounded-xl bg-white shadow p-6 flex flex-col items-start">
      <div className="font-semibold text-lg mb-2">{title}</div>
      {/* Metric/graph goes here next */}
      <div className="text-gray-400">[Data coming soon]</div>
    </div>
  );
}