import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { NotificationProvider, NotificationBell } from './components/NotificationCenter';
import Dashboard from './pages/Dashboard';
import Services from './pages/Services';
import USDAGrowerSearch from './pages/USDAGrowerSearch';
import MoneyTracker from './pages/MoneyTracker';
import './App.css';

function App() {
  return (
    <NotificationProvider>
      <BrowserRouter>
        <div className="app">
          {/* Header */}
          <header className="app-header">
            <div className="header-left">
              <div className="logo">🧬 AuditDNA</div>
            </div>

            <nav className="header-nav">
              <Link to="/dashboard" className="nav-link">
                📊 Dashboard
              </Link>
              <Link to="/services" className="nav-link">
                🌾 Services
              </Link>
              <Link to="/search" className="nav-link">
                🔍 Search
              </Link>
              <Link to="/money" className="nav-link">
                💰 Money
              </Link>
            </nav>

            <div className="header-right">
              <NotificationBell />
            </div>
          </header>

          {/* Main Content */}
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/services" element={<Services />} />
              <Route path="/search" element={<USDAGrowerSearch />} />
              <Route path="/money" element={<MoneyTracker />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </NotificationProvider>
  );
}

export default App;