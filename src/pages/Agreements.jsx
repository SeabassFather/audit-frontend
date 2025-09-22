import React, { useState } from "react";

export default function Agreements() {
  const [selectedAgreement, setSelectedAgreement] = useState(null);
  const [filter, setFilter] = useState("all");

  const agreements = [
    {
      id: 1,
      title: "Service Agreement",
      type: "service",
      version: "v2.1",
      lastUpdated: "2024-01-15",
      status: "active",
      description: "Standard terms of service for AuditDNA platform usage",
      content: `SERVICE AGREEMENT

1. SERVICES
AuditDNA provides comprehensive audit and compliance services including but not limited to:
- Document processing and OCR analysis
- CFPB-aware compliance checking
- Real-time USDA pricing data
- AI-powered audit assistance
- Professional reporting and documentation

2. TERMS OF USE
- Services are provided on a subscription basis
- Users must comply with all applicable regulations
- Data security and privacy are maintained according to industry standards

3. LIMITATION OF LIABILITY
AuditDNA's liability is limited to the subscription fees paid for the relevant service period.

4. INTELLECTUAL PROPERTY
All platform technology and methodologies remain the property of AuditDNA.

Last updated: January 15, 2024`
    },
    {
      id: 2,
      title: "Privacy Policy",
      type: "privacy",
      version: "v1.8",
      lastUpdated: "2024-01-10",
      status: "active",
      description: "Data privacy and protection policies",
      content: `PRIVACY POLICY

1. DATA COLLECTION
We collect information necessary to provide our audit services:
- Account information and contact details
- Uploaded documents and audit data
- Usage analytics and platform interactions

2. DATA PROTECTION
- All data is encrypted in transit and at rest
- GDPR and CCPA compliant data handling
- Regular security audits and monitoring

3. DATA SHARING
We do not sell or share personal data with third parties except:
- As required by law or regulation
- With explicit user consent
- For legitimate business purposes (anonymized data only)

4. USER RIGHTS
Users have the right to:
- Access their personal data
- Request data correction or deletion
- Opt-out of non-essential communications

Last updated: January 10, 2024`
    },
    {
      id: 3,
      title: "Partner Agreement",
      type: "partnership",
      version: "v1.5",
      lastUpdated: "2023-12-20",
      status: "active",
      description: "Terms for AuditDNA integration partners",
      content: `PARTNER AGREEMENT

1. PARTNERSHIP SCOPE
This agreement governs the relationship between AuditDNA and integration partners.

2. RESPONSIBILITIES
Partner responsibilities include:
- Maintaining data security standards
- Following API usage guidelines
- Providing timely support to mutual clients

3. REVENUE SHARING
- 20% commission on referred business
- Quarterly payments with detailed reporting
- Performance bonuses for top partners

4. INTELLECTUAL PROPERTY
- Shared technology remains with respective owners
- Joint marketing materials require mutual approval

5. TERMINATION
Either party may terminate with 30 days written notice.

Last updated: December 20, 2023`
    },
    {
      id: 4,
      title: "Enterprise License",
      type: "enterprise",
      version: "v3.0",
      lastUpdated: "2024-01-05",
      status: "active",
      description: "Enterprise-level service licensing terms",
      content: `ENTERPRISE LICENSE AGREEMENT

1. LICENSE GRANT
AuditDNA grants enterprise clients an unlimited license to use platform services.

2. ENTERPRISE FEATURES
- Unlimited audit processing
- Dedicated support team
- Custom integrations and APIs
- White-label options
- Advanced security controls

3. SERVICE LEVEL AGREEMENT
- 99.9% uptime guarantee
- 24/7 technical support
- Response time guarantees
- Disaster recovery provisions

4. CUSTOM DEVELOPMENT
- Additional development work billed separately
- Source code escrow available
- Intellectual property assignments

5. PRICING
Enterprise pricing is custom-negotiated based on volume and requirements.

Last updated: January 5, 2024`
    },
    {
      id: 5,
      title: "API Terms of Use",
      type: "api",
      version: "v2.3",
      lastUpdated: "2023-11-30",
      status: "active",
      description: "Terms governing API access and usage",
      content: `API TERMS OF USE

1. API ACCESS
Authorized users may access AuditDNA APIs subject to these terms.

2. USAGE LIMITS
- Rate limiting applies based on subscription tier
- Excessive usage may result in throttling
- Enterprise clients have higher limits

3. ACCEPTABLE USE
APIs must be used for legitimate business purposes only:
- No reverse engineering or unauthorized access
- No reselling of API access
- Compliance with all applicable laws

4. SUPPORT
- API documentation available online
- Technical support during business hours
- Community forums for developer discussion

5. CHANGES
API terms may be updated with 30 days notice to registered developers.

Last updated: November 30, 2023`
    },
    {
      id: 6,
      title: "Data Processing Agreement",
      type: "privacy",
      version: "v1.2",
      lastUpdated: "2023-10-15",
      status: "archived",
      description: "GDPR-compliant data processing terms (archived)",
      content: `DATA PROCESSING AGREEMENT (ARCHIVED)

This version has been superseded by the current Privacy Policy.

Please refer to the current Privacy Policy for up-to-date data processing terms.

Archive date: October 15, 2023`
    }
  ];

  const filteredAgreements = agreements.filter(agreement => 
    filter === "all" || agreement.type === filter
  );

  const agreementTypes = [
    { value: "all", label: "All Types" },
    { value: "service", label: "Service Agreements" },
    { value: "privacy", label: "Privacy & Data" },
    { value: "partnership", label: "Partnerships" },
    { value: "enterprise", label: "Enterprise" },
    { value: "api", label: "API & Technical" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Legal Agreements</h1>
          <p className="text-slate-600 mt-2">
            Access all AuditDNA legal documents, terms of service, and partnership agreements
          </p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input w-48"
          >
            {agreementTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Agreement List */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xl font-semibold text-slate-800">Documents</h2>
          {filteredAgreements.map((agreement) => (
            <div
              key={agreement.id}
              onClick={() => setSelectedAgreement(agreement)}
              className={`card cursor-pointer transition-all duration-200 ${
                selectedAgreement?.id === agreement.id
                  ? "border-blue-500 shadow-md"
                  : "hover:shadow-md"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800">{agreement.title}</h3>
                  <p className="text-sm text-slate-600 mt-1">{agreement.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                    <span>{agreement.version}</span>
                    <span>•</span>
                    <span>{agreement.lastUpdated}</span>
                  </div>
                </div>
                <div className="ml-4">
                  <span className={`badge ${
                    agreement.status === "active" ? "badge-green" : "badge-silver"
                  }`}>
                    {agreement.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Agreement Viewer */}
        <div className="lg:col-span-2">
          {selectedAgreement ? (
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    {selectedAgreement.title}
                  </h2>
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                    <span>Version {selectedAgreement.version}</span>
                    <span>•</span>
                    <span>Last updated: {selectedAgreement.lastUpdated}</span>
                    <span className={`badge ${
                      selectedAgreement.status === "active" ? "badge-green" : "badge-silver"
                    }`}>
                      {selectedAgreement.status}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="btn-outline">
                    📥 Download PDF
                  </button>
                  <button className="btn-primary">
                    📧 Email Copy
                  </button>
                </div>
              </div>
              
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700 font-sans">
                  {selectedAgreement.content}
                </pre>
              </div>
            </div>
          ) : (
            <div className="card text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-600 mb-2">
                Select a Document
              </h3>
              <p className="text-slate-500">
                Choose an agreement from the list to view its contents
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card-hover text-center">
          <h3 className="font-semibold text-slate-800 mb-2">Need Help?</h3>
          <p className="text-sm text-slate-600 mb-4">
            Questions about our agreements or terms?
          </p>
          <a href="/admin" className="btn-outline">
            Contact Legal Team
          </a>
        </div>

        <div className="card-hover text-center">
          <h3 className="font-semibold text-slate-800 mb-2">Enterprise Agreements</h3>
          <p className="text-sm text-slate-600 mb-4">
            Custom terms for enterprise clients
          </p>
          <a href="/admin" className="btn-primary">
            Contact Sales
          </a>
        </div>

        <div className="card-hover text-center">
          <h3 className="font-semibold text-slate-800 mb-2">Updates & Notifications</h3>
          <p className="text-sm text-slate-600 mb-4">
            Stay informed about agreement changes
          </p>
          <button className="btn-secondary">
            Subscribe to Updates
          </button>
        </div>
      </div>
    </div>
  );
}