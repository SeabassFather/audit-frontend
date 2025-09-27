import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-auditdna sticky-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <div className="logo-badge me-2">A</div>
          AuditDNA
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link 
                className={`nav-link px-3 py-2 ${isActive('/') ? 'active' : ''}`} 
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link px-3 py-2 ${isActive('/services') ? 'active' : ''}`} 
                to="/services"
              >
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link px-3 py-2 ${isActive('/cases') ? 'active' : ''}`} 
                to="/cases"
              >
                Cases
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link px-3 py-2 ${isActive('/files') ? 'active' : ''}`} 
                to="/files"
              >
                File Uploads
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link px-3 py-2 ${isActive('/admin') ? 'active' : ''}`} 
                to="/admin"
              >
                Admin Dashboard
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a 
                className="nav-link px-3 py-2" 
                href="https://nass.usda.gov/Data_and_Statistics/index.php" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                USDA Commodity Explorer
              </a>
            </li>
            <li className="nav-item">
              <a 
                className="nav-link px-3 py-2" 
                href="https://www.docusign.com" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                DocuSign
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;