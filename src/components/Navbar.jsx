import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavItem = ({ to, children }) => {
  const { pathname } = useLocation();
  const active = pathname === to;
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-xl text-sm transition-colors ${
        active 
          ? "bg-blue-600 text-white" 
          : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
      }`}
    >
      {children}
    </Link>
  );
};

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="font-bold text-xl text-gray-900">AuditDNA</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-2">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/mortgages">Mortgages</NavItem>
            <NavItem to="/ag-market">Ag Market</NavItem>
            <NavItem to="/trade-finance">Trade Finance</NavItem>
            <NavItem to="/tickers">Tickers</NavItem>
            <NavItem to="/partner-agreements">Agreements</NavItem>
            <NavItem to="/marketing">Marketing</NavItem>
            <NavItem to="/pitch-deck">Pitch Deck</NavItem>
            <NavItem to="/upload">Upload</NavItem>
            <NavItem to="/scanner">Scanner</NavItem>
            <NavItem to="/facial-recognition">Facial ID</NavItem>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            <Link 
              to="/login" 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-500 hover:text-gray-700 p-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}