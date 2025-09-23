import React, { useState } from "react";
import { Upload, FileText, Download, Calendar, MapPin, Building } from "lucide-react";

export default function WaterSoil() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");
  const [reportData, setReportData] = useState({
    property: "",
    region: "",
    contactEmail: "",
    lab: "",
    testDate: "",
    certification: ""
  });
  const [uploadedReports, setUploadedReports] = useState([
    // Mock data for demonstration
    {
      id: 1,
      property: "Green Valley Farm",
      region: "California",
      lab: "AgriTest Labs",
      testDate: "2024-01-15",
      certification: "USDA Organic Certified",
      fileName: "water_soil_report_jan2024.pdf",
      uploadDate: "2024-01-16"
    },
    {
      id: 2,
      property: "Riverside Ranch",
      region: "Texas",
      lab: "SoilTech Analysis",
      testDate: "2024-01-10",
      certification: "EPA Approved",
      fileName: "soil_analysis_riverside.pdf",
      uploadDate: "2024-01-11"
    }
  ]);

  function handleInputChange(field, value) {
    setReportData(prev => ({ ...prev, [field]: value }));
  }

  function upload(e) {
    e.preventDefault();
    if (!file) {
      setMsg("No file selected");
      return;
    }
    
    if (!reportData.property || !reportData.region || !reportData.lab) {
      setMsg("Please fill in all required fields (Property, Region, Lab)");
      return;
    }

    // Create new report entry
    const newReport = {
      id: uploadedReports.length + 1,
      property: reportData.property,
      region: reportData.region,
      lab: reportData.lab,
      testDate: reportData.testDate || new Date().toISOString().split('T')[0],
      certification: reportData.certification || "Pending Verification",
      fileName: file.name,
      uploadDate: new Date().toISOString().split('T')[0]
    };

    setUploadedReports(prev => [newReport, ...prev]);
    setMsg(`Successfully uploaded: ${file.name}`);
    
    // Reset form
    setFile(null);
    setReportData({
      property: "",
      region: "",
      contactEmail: "",
      lab: "",
      testDate: "",
      certification: ""
    });
    
    // Clear file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
  }

  function downloadReport(reportId) {
    // In a real application, this would download from a server
    const report = uploadedReports.find(r => r.id === reportId);
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
      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Upload className="w-5 h-5 mr-2 text-green-600" />
          Water & Soil Report Upload
        </h2>
        
        <form onSubmit={upload} className="space-y-4">
          {/* Report Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Name *
              </label>
              <input
                type="text"
                value={reportData.property}
                onChange={(e) => handleInputChange('property', e.target.value)}
                placeholder="Farm / Ranch Name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-green-500 focus:ring-green-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Region / State *
              </label>
              <input
                type="text"
                value={reportData.region}
                onChange={(e) => handleInputChange('region', e.target.value)}
                placeholder="California, Texas, etc."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-green-500 focus:ring-green-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Email
              </label>
              <input
                type="email"
                value={reportData.contactEmail}
                onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                placeholder="contact@farm.com"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-green-500 focus:ring-green-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Testing Lab *
              </label>
              <input
                type="text"
                value={reportData.lab}
                onChange={(e) => handleInputChange('lab', e.target.value)}
                placeholder="Lab Name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-green-500 focus:ring-green-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Test Date
              </label>
              <input
                type="date"
                value={reportData.testDate}
                onChange={(e) => handleInputChange('testDate', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-green-500 focus:ring-green-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Certification
              </label>
              <select
                value={reportData.certification}
                onChange={(e) => handleInputChange('certification', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-green-500 focus:ring-green-500"
              >
                <option value="">Select Certification</option>
                <option value="USDA Organic Certified">USDA Organic Certified</option>
                <option value="EPA Approved">EPA Approved</option>
                <option value="State Certified">State Certified</option>
                <option value="ISO 17025">ISO 17025</option>
                <option value="Pending Verification">Pending Verification</option>
              </select>
            </div>
          </div>

          {/* File Upload */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <label className="block">
              <span className="sr-only">Choose file</span>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={(e) => setFile(e.target.files[0])}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
              />
            </label>
            <p className="text-sm text-gray-500 mt-2">PDF, DOC, DOCX, TXT up to 10MB</p>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Report
            </button>
            
            {msg && (
              <p className={`text-sm ${msg.includes('Error') || msg.includes('Please') ? 'text-red-600' : 'text-green-600'}`}>
                {msg}
              </p>
            )}
          </div>
        </form>
      </div>

      {/* Uploaded Reports Table */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-blue-600" />
          Uploaded Water & Soil Reports
        </h3>
        
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
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {uploadedReports.map((report, index) => (
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
              {uploadedReports.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                    No reports uploaded yet. Upload your first water & soil analysis report above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
