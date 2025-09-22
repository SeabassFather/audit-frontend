import React, { useState } from "react";
import ComplianceDashboard from "./compliance/ComplianceDashboard";
import UploadWidget from "./compliance/UploadWidget"; 
import TitleSearch from "./compliance/TitleSearch";
import LegalDocs from "./compliance/LegalDocs";

/**
 * AuditDNA Compliance Module - Main Entry Point
 * 
 * Professional compliance management interface with tabbed navigation.
 * Provides access to regulatory overview, document management, title search,
 * and legal document templates.
 * 
 * @component
 * @example
 * <Compliance />
 */
export default function Compliance() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const tabs = [
    { id: "dashboard", label: "Compliance Dashboard", icon: "📊" },
    { id: "upload", label: "Document Upload", icon: "📤" },
    { id: "title", label: "Title Search", icon: "🔍" },
    { id: "legal", label: "Legal Documents", icon: "📋" }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <ComplianceDashboard />;
      case "upload":
        return <UploadWidget />;
      case "title":
        return <TitleSearch />;
      case "legal":
        return <LegalDocs />;
      default:
        return <ComplianceDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dnaLight via-white to-compliance-50">
      {/* Header */}
      <div className="compliance-header">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold">AuditDNA Audit & Compliance</h1>
          <p className="text-compliance-100 mt-1">
            Professional regulatory compliance management and audit tools
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-1" aria-label="Compliance Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-t-lg transition-all
                  ${activeTab === tab.id 
                    ? 'bg-compliance-600 text-white shadow-sm border-t-2 border-compliance-700' 
                    : 'text-slate-600 hover:text-compliance-700 hover:bg-compliance-50'
                  }
                `}
                aria-current={activeTab === tab.id ? 'page' : undefined}
              >
                <span className="text-lg">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="min-h-96">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
