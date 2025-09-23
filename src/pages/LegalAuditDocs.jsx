import React, { useState } from "react";

const legalDocuments = [
  {
    name: "AuditDNA Legal Audit Report 2025-08-01 Version 15",
    filename: "AuditDNA_Legal_Audit_Report_2025-08-01_Version15.md",
    description: "Comprehensive legal audit report covering compliance status and regulatory adherence",
    type: "Audit Report",
    size: "~4KB",
    lastUpdated: "August 1, 2025",
    icon: "📋"
  },
  {
    name: "Financial Audit Authorization",
    filename: "financial_audit_authorization.txt",
    description: "Authorization form for conducting financial audits and compliance reviews",
    type: "Authorization Form",
    size: "~1KB",
    lastUpdated: "January 2025",
    icon: "💰"
  },
  {
    name: "Partner Access Disclosure",
    filename: "partner_access_disclosure.txt",
    description: "Access policies and procedures for AuditDNA partners and authorized users",
    type: "Policy Document",
    size: "~2KB",
    lastUpdated: "January 2024",
    icon: "🤝"
  },
  {
    name: "Compliance Checklist - Working Draft",
    filename: "Untitled document.txt",
    description: "Daily, weekly, monthly, and annual compliance requirements checklist",
    type: "Working Document",
    size: "~2KB",
    lastUpdated: "August 1, 2025",
    icon: "✅"
  },
  {
    name: "Business Continuity & Disaster Recovery Plan",
    filename: "Untitled document (2).txt",
    description: "Comprehensive business continuity and disaster recovery procedures",
    type: "Business Plan",
    size: "~3KB",
    lastUpdated: "October 2025",
    icon: "🛡️"
  }
];

export default function LegalAuditDocs() {
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDocs = legalDocuments.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDocument = (doc) => {
    const fileUrl = `/forms/${doc.filename}`;
    window.open(fileUrl, '_blank');
  };

  const handleDownloadDocument = (doc) => {
    const fileUrl = `/forms/${doc.filename}`;
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = doc.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-5xl">⚖️</span>
          <div>
            <h1 className="text-4xl font-bold text-slate-800">Legal & Audit Documentation</h1>
            <p className="text-xl text-slate-600 mt-2">
              Access and manage legal documents, audit reports, and compliance materials
            </p>
            <div className="flex gap-4 mt-4 text-sm text-slate-500">
              <span>📊 {legalDocuments.length} documents available</span>
              <span>🔐 Secure access required</span>
              <span>📅 Updated regularly</span>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-soft p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search legal documents, audit reports, or compliance materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-ocean-300 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-3 bg-ocean-500 text-white rounded-lg hover:bg-ocean-600 transition-colors">
                📋 All Docs
              </button>
              <button className="px-4 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
                🔍 Filter
              </button>
            </div>
          </div>
        </div>

        {/* Document Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc, index) => (
            <div key={index} className="bg-white rounded-xl shadow-soft p-6 border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <span className="text-3xl">{doc.icon}</span>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">{doc.name}</h3>
                  <p className="text-slate-600 text-sm mb-3">{doc.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-ocean-100 text-ocean-700 text-xs rounded-full">
                      {doc.type}
                    </span>
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                      {doc.size}
                    </span>
                  </div>
                  
                  <div className="text-xs text-slate-500 mb-4">
                    Last updated: {doc.lastUpdated}
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewDocument(doc)}
                      className="flex-1 px-3 py-2 bg-ocean-500 text-white text-sm rounded-lg hover:bg-ocean-600 transition-colors"
                    >
                      👁️ View
                    </button>
                    <button
                      onClick={() => handleDownloadDocument(doc)}
                      className="flex-1 px-3 py-2 bg-slate-100 text-slate-700 text-sm rounded-lg hover:bg-slate-200 transition-colors"
                    >
                      📥 Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDocs.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-soft">
            <span className="text-4xl mb-4 block">🔍</span>
            <h3 className="text-lg font-semibold text-slate-600 mb-2">No documents found</h3>
            <p className="text-slate-500">Try adjusting your search terms or filters</p>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-8 bg-gradient-to-r from-ocean-50 to-slate-50 rounded-xl p-6 border border-ocean-100">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">ℹ️</span>
            <h3 className="text-lg font-semibold text-slate-800">Document Access & Compliance</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-slate-600">
            <div>
              <h4 className="font-medium text-slate-700 mb-2">🔐 Security & Access</h4>
              <ul className="space-y-1">
                <li>• All documents are stored securely and encrypted</li>
                <li>• Access is logged and monitored for compliance</li>
                <li>• Sensitive information requires proper authorization</li>
                <li>• Regular security audits ensure data protection</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-slate-700 mb-2">📋 Usage Guidelines</h4>
              <ul className="space-y-1">
                <li>• Documents are for authorized business use only</li>
                <li>• Maintain confidentiality of sensitive information</li>
                <li>• Report any issues or discrepancies immediately</li>
                <li>• Ensure compliance with all applicable regulations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}