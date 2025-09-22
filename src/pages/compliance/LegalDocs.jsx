import React, { useState, useRef } from "react";

/**
 * Legal Documents Component
 * 
 * Comprehensive legal contract and certificate template management system.
 * Provides access to legal document templates, compliance certificates,
 * PDF generation, and document tracking for audit purposes.
 * 
 * Features:
 * - Legal contract templates library
 * - Compliance certificate templates
 * - PDF export and generation
 * - Document versioning
 * - Template customization
 * - Digital signature placeholders
 * - Audit trail tracking
 * 
 * @component
 */
export default function LegalDocs() {
  const [activeCategory, setActiveCategory] = useState("contracts");
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [generating, setGenerating] = useState(false);
  const printRef = useRef();

  // Document categories
  const categories = [
    { 
      id: "contracts", 
      label: "Legal Contracts", 
      icon: "📋",
      description: "Contract templates and agreements"
    },
    { 
      id: "certificates", 
      label: "Compliance Certificates", 
      icon: "🏆",
      description: "Compliance and certification documents"
    },
    { 
      id: "forms", 
      label: "Legal Forms", 
      icon: "📝",
      description: "Standard legal forms and applications"
    },
    { 
      id: "reports", 
      label: "Audit Reports", 
      icon: "📊",
      description: "Audit and compliance report templates"
    }
  ];

  // Mock legal documents data
  const documents = {
    contracts: [
      {
        id: "nda-001",
        title: "Non-Disclosure Agreement (Standard)",
        description: "Standard NDA template for business partnerships",
        version: "v2.1",
        lastUpdated: "2024-01-15",
        category: "Privacy",
        complexity: "Simple",
        pages: 3,
        fields: ["Party A", "Party B", "Effective Date", "Term"],
        compliance: ["GDPR", "CCPA"],
        status: "active"
      },
      {
        id: "service-001",
        title: "Service Agreement Template",
        description: "Comprehensive service agreement for professional services",
        version: "v1.5",
        lastUpdated: "2024-01-10",
        category: "Service",
        complexity: "Moderate",
        pages: 8,
        fields: ["Service Provider", "Client", "Scope", "Payment Terms"],
        compliance: ["Commercial Law"],
        status: "active"
      },
      {
        id: "vendor-001",
        title: "Vendor Agreement",
        description: "Vendor relationship and procurement agreement",
        version: "v3.0",
        lastUpdated: "2024-01-08",
        category: "Procurement",
        complexity: "Complex",
        pages: 12,
        fields: ["Vendor Name", "Products/Services", "Terms", "SLA"],
        compliance: ["Commercial Law", "Data Protection"],
        status: "active"
      }
    ],
    certificates: [
      {
        id: "gdpr-cert-001",
        title: "GDPR Compliance Certificate",
        description: "Certificate of GDPR compliance for data processing",
        version: "v1.2",
        lastUpdated: "2024-01-12",
        category: "Data Protection",
        complexity: "Simple",
        pages: 2,
        fields: ["Organization", "DPO", "Valid Until", "Scope"],
        compliance: ["GDPR"],
        status: "active"
      },
      {
        id: "audit-cert-001",
        title: "Internal Audit Completion Certificate",
        description: "Certificate confirming completion of internal audit",
        version: "v2.0",
        lastUpdated: "2024-01-09",
        category: "Audit",
        complexity: "Simple",
        pages: 1,
        fields: ["Audit Date", "Auditor", "Scope", "Result"],
        compliance: ["Internal Controls"],
        status: "active"
      },
      {
        id: "financial-cert-001",
        title: "Financial Compliance Certificate",
        description: "Certificate of financial regulatory compliance",
        version: "v1.8",
        lastUpdated: "2024-01-07",
        category: "Financial",
        complexity: "Moderate",
        pages: 3,
        fields: ["Institution", "Regulatory Body", "Compliance Period"],
        compliance: ["GLBA", "Financial Regulations"],
        status: "active"
      }
    ],
    forms: [
      {
        id: "dsar-001",
        title: "Data Subject Access Request Form",
        description: "Form for processing data subject access requests",
        version: "v1.4",
        lastUpdated: "2024-01-14",
        category: "Privacy",
        complexity: "Simple",
        pages: 2,
        fields: ["Requestor", "Request Type", "Data Categories"],
        compliance: ["GDPR", "CCPA"],
        status: "active"
      },
      {
        id: "incident-001",
        title: "Security Incident Report Form",
        description: "Template for reporting security incidents",
        version: "v2.2",
        lastUpdated: "2024-01-11",
        category: "Security",
        complexity: "Moderate",
        pages: 4,
        fields: ["Incident Date", "Type", "Impact", "Response"],
        compliance: ["Security Standards"],
        status: "active"
      }
    ],
    reports: [
      {
        id: "compliance-report-001",
        title: "Quarterly Compliance Report",
        description: "Template for quarterly compliance status reporting",
        version: "v1.6",
        lastUpdated: "2024-01-13",
        category: "Compliance",
        complexity: "Complex",
        pages: 15,
        fields: ["Period", "Frameworks", "Status", "Issues"],
        compliance: ["All Frameworks"],
        status: "active"
      },
      {
        id: "audit-summary-001",
        title: "Audit Summary Report",
        description: "Executive summary of audit findings and recommendations",
        version: "v2.3",
        lastUpdated: "2024-01-06",
        category: "Audit",
        complexity: "Moderate",
        pages: 6,
        fields: ["Audit Scope", "Findings", "Recommendations"],
        compliance: ["Audit Standards"],
        status: "active"
      }
    ]
  };

  // Filter documents based on search term
  const getFilteredDocuments = () => {
    const docs = documents[activeCategory] || [];
    if (!searchTerm) return docs;
    
    return docs.filter(doc => 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Generate PDF
  const generatePDF = async (doc) => {
    setGenerating(true);
    
    try {
      // Simulate PDF generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a simple PDF content simulation
      const pdfContent = `
        ${doc.title}
        Version: ${doc.version}
        Generated: ${new Date().toLocaleString()}
        
        Description: ${doc.description}
        Category: ${doc.category}
        Compliance: ${doc.compliance.join(", ")}
        
        [Document content would be generated here based on template]
      `;
      
      const blob = new Blob([pdfContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${doc.title.replace(/\s+/g, "-").toLowerCase()}-${doc.version}.txt`;
      a.click();
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error("PDF generation error:", error);
    } finally {
      setGenerating(false);
    }
  };

  // Get complexity badge
  const getComplexityBadge = (complexity) => {
    const baseClasses = "status-badge";
    switch (complexity.toLowerCase()) {
      case "simple":
        return `${baseClasses} status-ready`;
      case "moderate":
        return `${baseClasses} status-progress`;
      case "complex":
        return `${baseClasses} bg-orange-100 text-orange-800`;
      default:
        return `${baseClasses} status-planned`;
    }
  };

  // Get status badge
  const getStatusBadge = (status) => {
    const baseClasses = "status-badge";
    switch (status.toLowerCase()) {
      case "active":
        return `${baseClasses} status-ready`;
      case "draft":
        return `${baseClasses} status-progress`;
      case "archived":
        return `${baseClasses} status-planned`;
      default:
        return `${baseClasses} status-planned`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Navigation */}
      <div className="compliance-card">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Legal Document Library</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id);
                setSelectedDoc(null);
              }}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                activeCategory === category.id
                  ? 'border-compliance-500 bg-compliance-50'
                  : 'border-slate-200 hover:border-compliance-300'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{category.icon}</span>
                <span className="font-medium">{category.label}</span>
              </div>
              <p className="text-sm text-slate-600">{category.description}</p>
              <p className="text-xs text-slate-500 mt-2">
                {documents[category.id]?.length || 0} templates
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="compliance-card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search documents..."
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-compliance-500 focus:border-compliance-500"
            />
          </div>
          <div className="flex gap-2">
            <button className="btn-secondary">
              📊 Usage Stats
            </button>
            <button className="btn-secondary">
              📁 Manage Templates
            </button>
          </div>
        </div>
      </div>

      {/* Document List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="compliance-card">
          <h4 className="font-semibold text-slate-800 mb-4">
            {categories.find(c => c.id === activeCategory)?.label}
          </h4>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {getFilteredDocuments().map((doc) => (
              <div
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedDoc?.id === doc.id
                    ? 'border-compliance-500 bg-compliance-50'
                    : 'border-slate-200 hover:border-compliance-300'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h5 className="font-medium text-slate-800">{doc.title}</h5>
                  <div className="flex gap-1">
                    <span className={getComplexityBadge(doc.complexity)}>
                      {doc.complexity}
                    </span>
                    <span className={getStatusBadge(doc.status)}>
                      {doc.status}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-slate-600 mb-2">{doc.description}</p>
                
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{doc.version} • {doc.pages} pages</span>
                  <span>Updated: {doc.lastUpdated}</span>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-2">
                  {doc.compliance.map((comp, index) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                    >
                      {comp}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {getFilteredDocuments().length === 0 && (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">📄</div>
              <p className="text-slate-600">No documents found</p>
            </div>
          )}
        </div>

        {/* Document Preview/Details */}
        <div className="compliance-card">
          {selectedDoc ? (
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-slate-800 mb-1">
                    {selectedDoc.title}
                  </h4>
                  <p className="text-sm text-slate-600">{selectedDoc.description}</p>
                </div>
                <div className="flex gap-1">
                  <span className={getComplexityBadge(selectedDoc.complexity)}>
                    {selectedDoc.complexity}
                  </span>
                  <span className={getStatusBadge(selectedDoc.status)}>
                    {selectedDoc.status}
                  </span>
                </div>
              </div>

              {/* Document Details */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-slate-700">Version:</span>
                    <p className="text-slate-600">{selectedDoc.version}</p>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">Pages:</span>
                    <p className="text-slate-600">{selectedDoc.pages}</p>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">Category:</span>
                    <p className="text-slate-600">{selectedDoc.category}</p>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">Last Updated:</span>
                    <p className="text-slate-600">{selectedDoc.lastUpdated}</p>
                  </div>
                </div>

                {/* Required Fields */}
                <div>
                  <span className="font-medium text-slate-700 block mb-2">Required Fields:</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedDoc.fields.map((field, index) => (
                      <span
                        key={index}
                        className="inline-block px-2 py-1 bg-slate-100 text-slate-700 text-sm rounded"
                      >
                        {field}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Compliance Requirements */}
                <div>
                  <span className="font-medium text-slate-700 block mb-2">Compliance Requirements:</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedDoc.compliance.map((comp, index) => (
                      <span
                        key={index}
                        className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded"
                      >
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 pt-4 border-t">
                  <button
                    onClick={() => generatePDF(selectedDoc)}
                    disabled={generating}
                    className="btn-primary flex items-center gap-2"
                  >
                    📄 {generating ? "Generating..." : "Generate PDF"}
                  </button>
                  <button className="btn-secondary">
                    ✏️ Customize Template
                  </button>
                  <button className="btn-secondary">
                    👁️ Preview
                  </button>
                  <button className="btn-secondary">
                    📋 Copy Template
                  </button>
                </div>

                {/* Version History */}
                <details className="mt-4">
                  <summary className="text-sm font-medium text-slate-700 cursor-pointer hover:text-compliance-600">
                    Version History
                  </summary>
                  <div className="mt-2 space-y-2">
                    <div className="p-3 bg-slate-50 rounded text-sm">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{selectedDoc.version} (Current)</span>
                        <span className="text-slate-600">{selectedDoc.lastUpdated}</span>
                      </div>
                      <p className="text-slate-600 mt-1">Latest version with updated compliance requirements</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded text-sm">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">v{(parseFloat(selectedDoc.version.replace('v', '')) - 0.1).toFixed(1)}</span>
                        <span className="text-slate-600">2023-12-15</span>
                      </div>
                      <p className="text-slate-600 mt-1">Previous version</p>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📄</div>
              <h4 className="font-semibold text-slate-800 mb-2">Select a Document</h4>
              <p className="text-slate-600">
                Choose a document from the list to view details and generate PDFs
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="compliance-card text-center">
          <div className="text-2xl mb-2">📋</div>
          <div className="font-semibold text-slate-800">
            {Object.values(documents).flat().length}
          </div>
          <div className="text-sm text-slate-600">Total Templates</div>
        </div>
        <div className="compliance-card text-center">
          <div className="text-2xl mb-2">✅</div>
          <div className="font-semibold text-slate-800">
            {Object.values(documents).flat().filter(d => d.status === 'active').length}
          </div>
          <div className="text-sm text-slate-600">Active Documents</div>
        </div>
        <div className="compliance-card text-center">
          <div className="text-2xl mb-2">🔄</div>
          <div className="font-semibold text-slate-800">5</div>
          <div className="text-sm text-slate-600">Recent Updates</div>
        </div>
        <div className="compliance-card text-center">
          <div className="text-2xl mb-2">📊</div>
          <div className="font-semibold text-slate-800">12</div>
          <div className="text-sm text-slate-600">PDFs Generated Today</div>
        </div>
      </div>
    </div>
  );
}