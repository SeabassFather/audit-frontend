import React, { useState } from "react";

const uploadCategories = [
  { id: "mortgage", label: "Mortgage Documents", icon: "🏠", accept: ".pdf,.doc,.docx", description: "Loan agreements, statements, disclosures" },
  { id: "insurance", label: "Insurance Policies", icon: "🛡️", accept: ".pdf,.doc,.docx", description: "Auto, health, life insurance documents" },
  { id: "utility", label: "Utility Bills", icon: "⚡", accept: ".pdf,.jpg,.png", description: "Electric, gas, water bills" },
  { id: "financial", label: "Financial Statements", icon: "💰", accept: ".pdf,.xlsx,.csv", description: "Bank statements, credit reports" },
  { id: "contracts", label: "Contracts & Agreements", icon: "📋", accept: ".pdf,.doc,.docx", description: "Service agreements, employment contracts" },
  { id: "other", label: "Other Documents", icon: "📄", accept: "*", description: "Any other relevant documents" },
];

const recentUploads = [
  { name: "mortgage_statement_2024.pdf", category: "Mortgage Documents", size: "2.4 MB", status: "processed", uploadedAt: "2 hours ago" },
  { name: "insurance_policy.pdf", category: "Insurance Policies", size: "1.8 MB", status: "processing", uploadedAt: "4 hours ago" },
  { name: "utility_bill_dec.pdf", category: "Utility Bills", size: "856 KB", status: "processed", uploadedAt: "1 day ago" },
  { name: "bank_statement.pdf", category: "Financial Statements", size: "3.2 MB", status: "processed", uploadedAt: "2 days ago" },
];

export default function Uploads() {
  const [dragActive, setDragActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("mortgage");
  const [uploadProgress, setUploadProgress] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file drop logic here
    console.log("Files dropped:", e.dataTransfer.files);
  };

  const handleFileInput = (e) => {
    // Handle file input logic here
    console.log("Files selected:", e.target.files);
  };

  const getStatusBadge = (status) => {
    const styles = {
      processed: "bg-green-100 text-green-800",
      processing: "bg-yellow-100 text-yellow-800",
      error: "bg-red-100 text-red-800"
    };
    return `px-2 py-1 rounded-full text-xs font-medium ${styles[status] || styles.processing}`;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Document Upload Center</h1>
        <p className="text-gray-600">
          Securely upload your documents for AI-powered analysis and audit processing. 
          All files are encrypted and processed with chain-of-custody tracking.
        </p>
      </div>

      {/* Upload Categories */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Document Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {uploadCategories.map((category) => (
            <label
              key={category.id}
              className={`cursor-pointer p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedCategory === category.id
                  ? "border-ocean-500 bg-ocean-50"
                  : "border-gray-200 hover:border-ocean-300 hover:bg-gray-50"
              }`}
            >
              <input
                type="radio"
                name="category"
                value={category.id}
                checked={selectedCategory === category.id}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="sr-only"
              />
              <div className="flex items-start gap-3">
                <span className="text-2xl">{category.icon}</span>
                <div>
                  <h3 className="font-medium text-gray-900">{category.label}</h3>
                  <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Upload Area */}
      <div className="card">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
            dragActive
              ? "border-ocean-500 bg-ocean-50"
              : "border-gray-300 hover:border-ocean-400 hover:bg-gray-50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="space-y-4">
            <div className="text-4xl">📁</div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Drop files here or click to upload</h3>
              <p className="text-gray-600 mt-1">
                Supports PDF, DOC, DOCX, JPG, PNG, XLSX files up to 10MB each
              </p>
            </div>
            <div className="flex gap-4 justify-center">
              <input
                type="file"
                id="file-upload"
                multiple
                accept={uploadCategories.find(c => c.id === selectedCategory)?.accept || "*"}
                onChange={handleFileInput}
                className="sr-only"
              />
              <label htmlFor="file-upload" className="btn btn-primary cursor-pointer">
                Choose Files
              </label>
              <button className="btn btn-outline">
                Upload from URL
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Uploads */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Uploads</h2>
          <button className="text-sm text-ocean-600 hover:text-ocean-700 font-medium">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {recentUploads.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-ocean-100 rounded-lg flex items-center justify-center">
                  <span className="text-ocean-600 font-medium">📄</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{file.name}</h3>
                  <p className="text-sm text-gray-600">{file.category} • {file.size}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={getStatusBadge(file.status)}>
                  {file.status}
                </span>
                <span className="text-sm text-gray-500">{file.uploadedAt}</span>
                <button className="text-ocean-600 hover:text-ocean-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Notice */}
      <div className="card bg-blue-50 border-blue-200">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 text-blue-600 flex-shrink-0">🔒</div>
          <div>
            <h3 className="font-medium text-blue-900 mb-1">Security & Privacy</h3>
            <p className="text-blue-800 text-sm">
              All uploads are encrypted in transit and at rest. Files are automatically deleted after 90 days unless 
              explicitly saved to your case file. Our AI processing is HIPAA and SOC 2 compliant.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
