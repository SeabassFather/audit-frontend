import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import AuditDNALogo from "./AuditDNALogo";

// Shared Dashboard Layout Component
export default function DashboardLayout({ children, title = "AuditDNA OS Dashboard", activeSection = "" }) {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen" style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FFFE 100%)' }}>
      {/* Sidebar - Fixed overlapping issues */}
      <aside className="sidebar-modern flex flex-col items-center py-6 shadow-lg" style={{ width: '280px', position: 'fixed', height: '100vh', left: 0, top: 0, zIndex: 10 }}>
        <div className="mb-8">
          <AuditDNALogo size="medium" />
        </div>
        <nav className="flex flex-col gap-6 w-full px-4">
          <SidebarIcon label="Home" onClick={() => navigate("/dashboard")} active={activeSection === "dashboard"} />
          <SidebarIcon label="USDA" onClick={() => navigate("/usda-pricing")} active={activeSection === "usda"} />
          <SidebarIcon label="Mortgage" onClick={() => navigate("/mortgage-search")} active={activeSection === "mortgage"} />
          <SidebarIcon label="Factoring" onClick={() => alert("Factoring module coming soon")} />
          <SidebarIcon label="WaterTech" onClick={() => alert("WaterTech module coming soon")} />
          <SidebarIcon label="Compliance" onClick={() => alert("Compliance module coming soon")} />
          <SidebarIcon label="Docs" onClick={() => alert("Docs module coming soon")} />
          <SidebarIcon label="Admin" onClick={() => navigate("/elite-modules")} active={activeSection === "admin"} />
        </nav>
      </aside>
      {/* Main Content - Fixed margin to account for fixed sidebar */}
      <div className="flex-1 flex flex-col" style={{ marginLeft: '280px' }}>
        <Header onLogout={() => {
          logout();
          navigate("/login");
        }} />
        <main className="p-6" style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FFFE 100%)', minHeight: 'calc(100vh - 4rem)' }}>
          <h1 className="text-3xl font-bold mb-6 text-primary">{title}</h1>
          {children}
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