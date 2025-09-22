import React, { useState } from "react";

/**
 * Compliance Dashboard Component
 * 
 * Provides curated regulatory overview, compliance status monitoring,
 * download kits for regulatory frameworks, and API/data status monitoring.
 * 
 * Features:
 * - Global privacy framework status
 * - Regulatory compliance tracking
 * - Download compliance kits
 * - API and data source status monitoring
 * - Quick action buttons for common tasks
 * 
 * @component
 */
export default function ComplianceDashboard() {
  const [refreshing, setRefreshing] = useState(false);

  // Regulatory framework status data
  const frameworks = [
    { name: "CCPA/CPRA (California)", status: "Ready", compliance: 98, color: "green" },
    { name: "GLBA (US Financial)", status: "Ready", compliance: 95, color: "green" },
    { name: "GDPR (EU/Ireland)", status: "In Progress", compliance: 78, color: "yellow" },
    { name: "PIPEDA (Canada)", status: "Ready", compliance: 92, color: "green" },
    { name: "PDPA (Singapore)", status: "Planned", compliance: 45, color: "slate" },
    { name: "Australia Privacy Act", status: "Planned", compliance: 30, color: "slate" },
  ];

  // API and data source status
  const dataSources = [
    { name: "Zadarama API", status: "Online", lastCheck: "2 min ago", latency: "120ms" },
    { name: "US Title Records", status: "Online", lastCheck: "5 min ago", latency: "89ms" },
    { name: "Mexico Records API", status: "Degraded", lastCheck: "1 min ago", latency: "450ms" },
    { name: "Compliance Database", status: "Online", lastCheck: "30 sec ago", latency: "45ms" },
  ];

  // Compliance kits available for download
  const complianceKits = [
    { name: "GDPR Compliance Kit", version: "v2.1", size: "4.2 MB", updated: "2024-01-15" },
    { name: "CCPA Documentation", version: "v1.8", size: "2.1 MB", updated: "2024-01-12" },
    { name: "Financial Services Kit", version: "v3.0", size: "8.7 MB", updated: "2024-01-10" },
    { name: "International Templates", version: "v1.5", size: "5.3 MB", updated: "2024-01-08" },
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  const getStatusBadge = (status) => {
    const baseClasses = "status-badge";
    switch (status.toLowerCase()) {
      case "ready":
        return `${baseClasses} status-ready`;
      case "in progress":
        return `${baseClasses} status-progress`;
      case "planned":
        return `${baseClasses} status-planned`;
      default:
        return `${baseClasses} status-planned`;
    }
  };

  const getApiStatusBadge = (status) => {
    const baseClasses = "status-badge";
    switch (status.toLowerCase()) {
      case "online":
        return `${baseClasses} status-ready`;
      case "degraded":
        return `${baseClasses} status-progress`;
      case "offline":
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} status-planned`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="compliance-card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Active Frameworks</h3>
              <p className="text-3xl font-bold text-compliance-600 mt-2">
                {frameworks.filter(f => f.status === "Ready").length}
              </p>
            </div>
            <div className="text-compliance-400 text-4xl">⚖️</div>
          </div>
          <p className="text-sm text-slate-600 mt-2">
            Ready for compliance monitoring
          </p>
        </div>

        <div className="compliance-card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Avg. Compliance</h3>
              <p className="text-3xl font-bold text-dnaGreen mt-2">
                {Math.round(frameworks.reduce((acc, f) => acc + f.compliance, 0) / frameworks.length)}%
              </p>
            </div>
            <div className="text-green-400 text-4xl">📈</div>
          </div>
          <p className="text-sm text-slate-600 mt-2">
            Across all active frameworks
          </p>
        </div>

        <div className="compliance-card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Data Sources</h3>
              <p className="text-3xl font-bold text-dnaBlue mt-2">
                {dataSources.filter(d => d.status === "Online").length}/{dataSources.length}
              </p>
            </div>
            <div className="text-blue-400 text-4xl">🔗</div>
          </div>
          <p className="text-sm text-slate-600 mt-2">
            API endpoints operational
          </p>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Regulatory Framework Status */}
        <div className="compliance-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Regulatory Framework Status</h3>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="btn-secondary text-sm px-3 py-1"
            >
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>
          </div>
          
          <div className="space-y-3">
            {frameworks.map((framework, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-slate-800">{framework.name}</h4>
                    <span className={getStatusBadge(framework.status)}>
                      {framework.status}
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-sm text-slate-600 mb-1">
                      <span>Compliance Score</span>
                      <span>{framework.compliance}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          framework.compliance >= 90 
                            ? 'bg-green-500'
                            : framework.compliance >= 70 
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                        }`}
                        style={{ width: `${framework.compliance}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* API & Data Source Status */}
        <div className="compliance-card">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">API & Data Source Status</h3>
          
          <div className="space-y-3">
            {dataSources.map((source, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-slate-800">{source.name}</h4>
                    <span className={getApiStatusBadge(source.status)}>
                      {source.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-600 mt-1">
                    <span>Last check: {source.lastCheck}</span>
                    <span>Latency: {source.latency}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="compliance-card">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button className="btn-primary">New DSAR Request</button>
          <button className="btn-secondary">Add Vendor</button>
          <button className="btn-success">Generate Policy Pack</button>
          <button className="btn-warning">Export Compliance Report</button>
        </div>
      </div>

      {/* Download Compliance Kits */}
      <div className="compliance-card">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Compliance Kits & Documentation</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {complianceKits.map((kit, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <div className="flex-1">
                <h4 className="font-medium text-slate-800">{kit.name}</h4>
                <div className="flex items-center gap-4 text-sm text-slate-600 mt-1">
                  <span>{kit.version}</span>
                  <span>{kit.size}</span>
                  <span>Updated: {kit.updated}</span>
                </div>
              </div>
              <button className="btn-primary text-sm px-3 py-1">
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
