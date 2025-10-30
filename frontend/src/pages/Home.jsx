import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const services = [
    {
      to: "/services",
      title: "Audit Services",
      description: "Comprehensive audit and compliance solutions for financial services",
<<<<<<< HEAD
      icon: "📊",
=======
      icon: "Ã°Å¸â€œÅ ",
>>>>>>> my/push-branch
      color: "bg-accent-yellow"
    },
    {
      to: "/cases",
      title: "Case Management",
      description: "Track and manage audit cases with powerful workflow tools",
<<<<<<< HEAD
      icon: "📋",
=======
      icon: "Ã°Å¸â€œâ€¹",
>>>>>>> my/push-branch
      color: "bg-accent-green"
    },
    {
      to: "/files",
      title: "File Uploads",
      description: "Secure document upload and management system",
<<<<<<< HEAD
      icon: "📁",
=======
      icon: "Ã°Å¸â€œÂ",
>>>>>>> my/push-branch
      color: "bg-primary-silver"
    },
    {
      to: "/admin",
      title: "Admin Dashboard",
      description: "Administrative tools and system configuration",
<<<<<<< HEAD
      icon: "⚙️",
=======
      icon: "Ã¢Å¡â„¢Ã¯Â¸Â",
>>>>>>> my/push-branch
      color: "bg-accent-yellow"
    }
  ];

  const externalLinks = [
    {
      href: "https://nass.usda.gov/Data_and_Statistics/index.php",
      title: "USDA Commodity Explorer",
      description: "Access comprehensive agricultural commodity data and statistics",
<<<<<<< HEAD
      icon: "🌾"
=======
      icon: "Ã°Å¸Å’Â¾"
>>>>>>> my/push-branch
    },
    {
      href: "https://www.docusign.com",
      title: "DocuSign Integration",
      description: "Electronic signature and document workflow management",
<<<<<<< HEAD
      icon: "✍️"
=======
      icon: "Ã¢Å“ÂÃ¯Â¸Â"
>>>>>>> my/push-branch
    }
  ];

  return (
    <div className="container py-5">
      {/* Hero Section */}
      <div className="hero-section p-5 mb-5 text-center">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h1 className="display-4 fw-bold text-secondary-blue mb-4">
              Welcome to AuditDNA
            </h1>
            <p className="lead text-muted mb-4">
              Your comprehensive audit and compliance platform for mortgage, agriculture, and trade finance industries. 
              Streamline your processes with cutting-edge technology and ensure regulatory compliance.
            </p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <Link to="/services" className="btn btn-secondary-blue btn-lg">
                Get Started
              </Link>
              <Link to="/admin" className="btn btn-primary-silver btn-lg">
                Admin Portal
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Services Grid */}
      <div className="mb-5">
        <h2 className="text-center mb-4 text-secondary-blue fw-bold">Our Services</h2>
        <div className="row g-4">
          {services.map(service => (
            <div key={service.to} className="col-lg-6 col-md-6">
              <Link to={service.to} className="text-decoration-none">
                <div className="card card-auditdna h-100">
                  <div className={`card-header ${service.color} text-center`}>
                    <div className="display-4 mb-2">{service.icon}</div>
                    <h5 className="card-title mb-0 text-dark">{service.title}</h5>
                  </div>
                  <div className="card-body">
                    <p className="card-text text-muted">{service.description}</p>
                    <div className="d-flex justify-content-end">
                      <small className="text-secondary-blue fw-semibold">
<<<<<<< HEAD
                        Learn More →
=======
                        Learn More Ã¢â€ â€™
>>>>>>> my/push-branch
                      </small>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* External Integration Links */}
      <div className="mb-5">
        <h2 className="text-center mb-4 text-secondary-blue fw-bold">External Integrations</h2>
        <div className="row g-4 justify-content-center">
          {externalLinks.map(link => (
            <div key={link.href} className="col-lg-5 col-md-6">
              <a 
                href={link.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-decoration-none"
              >
                <div className="card card-auditdna h-100">
                  <div className="card-header bg-accent-green text-center">
                    <div className="display-4 mb-2">{link.icon}</div>
                    <h5 className="card-title mb-0 text-dark">{link.title}</h5>
                  </div>
                  <div className="card-body">
                    <p className="card-text text-muted">{link.description}</p>
                    <div className="d-flex justify-content-end">
                      <small className="text-secondary-blue fw-semibold">
<<<<<<< HEAD
                        Open External ↗
=======
                        Open External Ã¢â€ â€”
>>>>>>> my/push-branch
                      </small>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="row text-center bg-primary-silver rounded-3 p-4">
        <div className="col-md-3 col-6 mb-3">
          <div className="h2 fw-bold text-secondary-blue mb-1">1000+</div>
          <div className="text-muted small">Cases Processed</div>
        </div>
        <div className="col-md-3 col-6 mb-3">
          <div className="h2 fw-bold text-secondary-blue mb-1">99.9%</div>
          <div className="text-muted small">Uptime</div>
        </div>
        <div className="col-md-3 col-6 mb-3">
          <div className="h2 fw-bold text-secondary-blue mb-1">24/7</div>
          <div className="text-muted small">Support</div>
        </div>
        <div className="col-md-3 col-6 mb-3">
          <div className="h2 fw-bold text-secondary-blue mb-1">SOC 2</div>
          <div className="text-muted small">Compliance</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
