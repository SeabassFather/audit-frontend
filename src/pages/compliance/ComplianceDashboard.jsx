import React, { useState } from "react";
import { FileText, Download, Calendar, MapPin, Building, Shield, CheckCircle, Clock, AlertTriangle } from "lucide-react";

export default function ComplianceDashboard() {
  const [activeTab, setActiveTab] = useState('frameworks');
  
  const complianceFrameworks = [
    { name: "CCPA/CPRA (California)", status: "Ready", type: "Privacy" },
    { name: "GLBA (US Financial)", status: "Ready", type: "Financial" },
    { name: "GDPR (EU/Ireland)", status: "In Progress", type: "Privacy" },
    { name: "PIPEDA (Canada)", status: "Ready", type: "Privacy" },
    { name: "PDPA (Singapore)", status: "Planned", type: "Privacy" },
    { name: "Australia Privacy Act", status: "Planned", type: "Privacy" },
    { name: "TRID", status: "Ready", type: "Mortgage" },
    { name: "ECOA", status: "Ready", type: "Lending" },
  ];

  // Mock data for Water/Soil reports - in real app this would come from API
  const waterSoilReports = [
    {
      id: 1,
      property: "Green Valley Farm",
      region: "California",
      lab: "AgriTest Labs",
      testDate: "2024-01-15",
      certification: "USDA Organic Certified",
      fileName: "water_soil_report_jan2024.pdf",
      uploadDate: "2024-01-16",
      status: "Compliant"
    },
    {
      id: 2,
      property: "Riverside Ranch",
      region: "Texas",
      lab: "SoilTech Analysis",
      testDate: "2024-01-10",
      certification: "EPA Approved",
      fileName: "soil_analysis_riverside.pdf",
      uploadDate: "2024-01-11",
      status: "Compliant"
    },
    {
      id: 3,
      property: "Mountain View Orchards",
      region: "Oregon",
      lab: "EcoLab Services",
      testDate: "2024-01-05",
      certification: "Pending Verification",
      fileName: "water_test_mountain_view.pdf",
      uploadDate: "2024-01-06",
      status: "Pending Review"
    }
  ];

  function getStatusIcon(status) {
    switch (status) {
      case 'Ready':
      case 'Compliant':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'In Progress':
      case 'Pending Review':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'Planned':
        return <AlertTriangle className="w-4 h-4 text-gray-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  }

  function getStatusColor(status) {
    switch (status) {
      case 'Ready':
      case 'Compliant':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
      case 'Pending Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Planned':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  function downloadReport(reportId) {
    // In a real application, this would download from a server
    const report = waterSoilReports.find(r => r.id === reportId);
    if (report) {
      // Simulate download
      const element = document.createElement('a');
      element.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(
        `Water & Soil Analysis Report\n\nProperty: ${report.property}\nRegion: ${report.region}\nLab: ${report.lab}\nTest Date: ${report.testDate}\nCertification: ${report.certification}`
      );
      element.download = report.fileName;
      element.click();
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <Shield className="w-6 h-6 mr-3 text-blue-600" />
              Compliance Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Centralized compliance management including regulatory frameworks and environmental reports
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <FileText className="w-4 h-4 mr-2" />
              Generate Compliance Kit
            </button>
            <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4 mr-2" />
              Export All Reports
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('frameworks')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'frameworks'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Compliance Frameworks
            </button>
            <button
              onClick={() => setActiveTab('watersoil')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'watersoil'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Water & Soil Reports
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'frameworks' && (
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="grid md:grid-cols-4 gap-4">
                <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 text-gray-600 hover:text-gray-700">
                  <FileText className="w-5 h-5 mr-2" />
                  New DSAR
                </button>
                <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 text-gray-600 hover:text-gray-700">
                  <Building className="w-5 h-5 mr-2" />
                  Add Vendor
                </button>
                <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 text-gray-600 hover:text-gray-700">
                  <Shield className="w-5 h-5 mr-2" />
                  Policy Pack
                </button>
                <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 text-gray-600 hover:text-gray-700">
                  <Download className="w-5 h-5 mr-2" />
                  Audit Report
                </button>
              </div>

              {/* Frameworks Table */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Regulatory Framework Status</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Framework
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {complianceFrameworks.map((framework, index) => (
                        <tr key={framework.name} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {getStatusIcon(framework.status)}
                              <span className="ml-3 text-sm font-medium text-gray-900">{framework.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {framework.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(framework.status)}`}>
                              {framework.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-4">View Details</button>
                            <button className="text-green-600 hover:text-green-900">Download Kit</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'watersoil' && (
            <div className="space-y-6">
              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-green-600">Compliant Reports</p>
                      <p className="text-2xl font-semibold text-green-900">
                        {waterSoilReports.filter(r => r.status === 'Compliant').length}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <Clock className="w-8 h-8 text-yellow-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-yellow-600">Pending Review</p>
                      <p className="text-2xl font-semibold text-yellow-900">
                        {waterSoilReports.filter(r => r.status === 'Pending Review').length}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <FileText className="w-8 h-8 text-blue-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-blue-600">Total Reports</p>
                      <p className="text-2xl font-semibold text-blue-900">{waterSoilReports.length}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <Building className="w-8 h-8 text-purple-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-purple-600">Properties</p>
                      <p className="text-2xl font-semibold text-purple-900">
                        {new Set(waterSoilReports.map(r => r.property)).size}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Water & Soil Reports Table */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Water & Soil Analysis Reports</h3>
                  <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    <FileText className="w-4 h-4 mr-2" />
                    Upload New Report
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Property
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Region
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Lab
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Test Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Certification
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {waterSoilReports.map((report, index) => (
                        <tr key={report.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Building className="w-4 h-4 text-gray-400 mr-2" />
                              <span className="text-sm font-medium text-gray-900">{report.property}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                              <span className="text-sm text-gray-900">{report.region}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {report.lab}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                              <span className="text-sm text-gray-900">{report.testDate}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              report.certification.includes('Certified') || report.certification.includes('Approved')
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {report.certification}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                              {report.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => downloadReport(report.id)}
                              className="flex items-center text-blue-600 hover:text-blue-900 transition-colors"
                            >
                              <Download className="w-4 h-4 mr-1" />
                              Download
                            </button>
                          </td>
                        </tr>
                      ))}
                      {waterSoilReports.length === 0 && (
                        <tr>
                          <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                            No water & soil reports found. Upload your first report to get started.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
