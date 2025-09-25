import React, { useState } from 'react';

const Services = () => {
  const [activeService, setActiveService] = useState(null);

  const services = [
    {
      id: 1,
      title: "Mortgage Audit Services",
      description: "Comprehensive mortgage loan auditing and compliance verification",
      icon: "🏠",
      features: [
        "Loan file review and analysis",
        "Regulatory compliance checking",
        "Documentation verification",
        "Risk assessment reporting"
      ],
      pricing: "Starting at $299/audit"
    },
    {
      id: 2,
      title: "Agricultural Compliance",
      description: "USDA and agricultural regulatory compliance services",
      icon: "🌾",
      features: [
        "USDA certification assistance",
        "Organic compliance verification",
        "Crop insurance documentation",
        "Subsidy program compliance"
      ],
      pricing: "Starting at $199/assessment"
    },
    {
      id: 3,
      title: "Trade Finance Auditing",
      description: "International trade finance document review and compliance",
      icon: "🌐",
      features: [
        "Letter of credit verification",
        "Export documentation review",
        "Anti-money laundering checks",
        "Cross-border compliance"
      ],
      pricing: "Starting at $499/transaction"
    },
    {
      id: 4,
      title: "Document Management",
      description: "Secure document storage and workflow management",
      icon: "📁",
      features: [
        "Encrypted document storage",
        "Version control system",
        "Automated workflows",
        "Compliance tracking"
      ],
      pricing: "Starting at $99/month"
    },
    {
      id: 5,
      title: "Risk Assessment",
      description: "Comprehensive risk analysis and mitigation strategies",
      icon: "⚠️",
      features: [
        "Risk scoring algorithms",
        "Predictive analytics",
        "Compliance monitoring",
        "Real-time alerts"
      ],
      pricing: "Starting at $399/assessment"
    },
    {
      id: 6,
      title: "Regulatory Reporting",
      description: "Automated regulatory report generation and submission",
      icon: "📊",
      features: [
        "Automated report generation",
        "Regulatory deadline tracking",
        "Multi-format exports",
        "Audit trail maintenance"
      ],
      pricing: "Starting at $149/month"
    }
  ];

  return (
    <div className="container py-5">
      {/* Page Header */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-secondary-blue mb-3">
          Our Services
        </h1>
        <p className="lead text-muted col-lg-8 mx-auto">
          Comprehensive audit and compliance solutions tailored for financial services, 
          agriculture, and trade finance industries. Choose from our range of professional services.
        </p>
      </div>

      {/* Services Grid */}
      <div className="row g-4 mb-5">
        {services.map(service => (
          <div key={service.id} className="col-lg-4 col-md-6">
            <div className="card card-auditdna h-100">
              <div className="card-header bg-accent-yellow text-center">
                <div className="display-4 mb-2">{service.icon}</div>
                <h5 className="card-title mb-0 text-dark">{service.title}</h5>
              </div>
              <div className="card-body d-flex flex-column">
                <p className="card-text text-muted mb-3">{service.description}</p>
                
                <ul className="list-unstyled mb-3 flex-grow-1">
                  {service.features.map((feature, index) => (
                    <li key={index} className="mb-2">
                      <small className="text-muted">
                        <span className="text-success me-2">✓</span>
                        {feature}
                      </small>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-auto">
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-secondary-blue fw-bold">
                      {service.pricing}
                    </small>
                    <button 
                      className="btn btn-secondary-blue btn-sm"
                      onClick={() => setActiveService(service.id)}
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Service Details Modal */}
      {activeService && (
        <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-secondary-blue text-white">
                <h5 className="modal-title">
                  {services.find(s => s.id === activeService)?.title}
                </h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={() => setActiveService(null)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-8">
                    <p className="mb-3">
                      {services.find(s => s.id === activeService)?.description}
                    </p>
                    <h6 className="fw-bold mb-3">Service Features:</h6>
                    <ul>
                      {services.find(s => s.id === activeService)?.features.map((feature, index) => (
                        <li key={index} className="mb-2">{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-md-4">
                    <div className="bg-accent-yellow p-3 rounded">
                      <h6 className="fw-bold mb-2">Pricing</h6>
                      <p className="h5 text-secondary-blue">
                        {services.find(s => s.id === activeService)?.pricing}
                      </p>
                      <button className="btn btn-secondary-blue w-100 mt-2">
                        Get Quote
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="bg-primary-silver rounded-3 p-5 text-center">
        <h3 className="fw-bold text-secondary-blue mb-3">Need Custom Solutions?</h3>
        <p className="text-muted mb-4">
          Our team can create tailored audit and compliance solutions specific to your industry needs.
        </p>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <button className="btn btn-secondary-blue">Contact Sales</button>
          <button className="btn btn-accent-green">Schedule Demo</button>
        </div>
      </div>
    </div>
  );
};

export default Services;
