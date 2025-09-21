import React, { useState } from "react";
import { EmptyState, LoadingSpinner } from "../components/UIComponents.jsx";

export default function Uploads() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([
    {
      id: 1,
      name: "mortgage_application_2024.pdf",
      size: "2.4 MB",
      type: "PDF Document",
      status: "completed",
      uploadDate: "2024-06-15",
      category: "Mortgage Documents"
    },
    {
      id: 2,
      name: "tax_returns_2023.pdf",
      size: "1.8 MB",
      type: "PDF Document", 
      status: "processing",
      uploadDate: "2024-06-15",
      category: "Financial Documents"
    },
    {
      id: 3,
      name: "bank_statements.zip",
      size: "5.2 MB",
      type: "ZIP Archive",
      status: "completed",
      uploadDate: "2024-06-14",
      category: "Financial Documents"
    },
    {
      id: 4,
      name: "property_deed.pdf",
      size: "1.1 MB",
      type: "PDF Document",
      status: "failed",
      uploadDate: "2024-06-14",
      category: "Property Documents"
    }
  ]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Documents' },
    { id: 'mortgage', name: 'Mortgage Documents' },
    { id: 'financial', name: 'Financial Documents' },
    { id: 'property', name: 'Property Documents' },
    { id: 'compliance', name: 'Compliance Documents' }
  ];

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
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files) => {
    Array.from(files).forEach(file => {
      console.log("Uploading file:", file.name);
      // Simulate file upload
      const newFile = {
        id: Date.now() + Math.random(),
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(1) + " MB",
        type: file.type || "Unknown",
        status: "processing",
        uploadDate: new Date().toISOString().split('T')[0],
        category: "Uncategorized"
      };
      
      setUploadedFiles(prev => [newFile, ...prev]);
      
      // Simulate processing time
      setTimeout(() => {
        setUploadedFiles(prev => 
          prev.map(f => f.id === newFile.id ? { ...f, status: "completed" } : f)
        );
      }, 2000);
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return '✅';
      case 'processing': return '⏳';
      case 'failed': return '❌';
      default: return '📄';
    }
  };

  const filteredFiles = selectedCategory === 'all' 
    ? uploadedFiles 
    : uploadedFiles.filter(file => file.category.toLowerCase().includes(selectedCategory));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-green via-brand-blue to-brand-yellow rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Document Upload Center</h1>
        <p className="text-white/90">
          Secure document upload with AI-powered processing and analysis
        </p>
      </div>

      {/* Upload Area */}
      <div className="widget">
        <h2 className="text-xl font-semibold mb-4">Upload Documents</h2>
        
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive 
              ? 'border-brand-blue bg-brand-blue/5' 
              : 'border-gray-300 hover:border-brand-blue hover:bg-gray-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="space-y-4">
            <div className="text-4xl">📁</div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Drop files here or click to upload
              </h3>
              <p className="text-gray-600 mt-1">
                Support for PDF, DOC, DOCX, JPG, PNG up to 10MB
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="file"
                multiple
                onChange={(e) => handleFiles(e.target.files)}
                className="hidden"
                id="file-upload"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              <label 
                htmlFor="file-upload"
                className="btn btn-primary cursor-pointer"
              >
                Choose Files
              </label>
              <button className="btn btn-secondary">
                📷 Scan Document
              </button>
            </div>
          </div>
        </div>

        {/* Upload Guidelines */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-900 mb-2">📋 Upload Guidelines</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Ensure documents are clear and legible</li>
            <li>• Remove any sensitive information not required for processing</li>
            <li>• Use descriptive filenames for easier organization</li>
            <li>• All uploads are encrypted and securely stored</li>
          </ul>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-brand-blue to-brand-green text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* File List */}
      <div className="widget">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            Uploaded Documents ({filteredFiles.length})
          </h2>
          <div className="flex gap-2">
            <button className="btn btn-secondary text-sm">
              📥 Bulk Download
            </button>
            <button className="btn btn-secondary text-sm">
              🗑️ Delete Selected
            </button>
          </div>
        </div>

        {filteredFiles.length > 0 ? (
          <div className="space-y-4">
            {filteredFiles.map((file) => (
              <div key={file.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
                    />
                    <div className="text-2xl">
                      {getStatusIcon(file.status)}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{file.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span>{file.size}</span>
                        <span>•</span>
                        <span>{file.type}</span>
                        <span>•</span>
                        <span>{file.uploadDate}</span>
                        <span>•</span>
                        <span className="text-brand-blue">{file.category}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(file.status)}`}>
                      {file.status}
                    </span>
                    
                    {file.status === 'processing' && (
                      <LoadingSpinner size="sm" />
                    )}
                    
                    <div className="flex space-x-2">
                      <button className="btn btn-secondary text-xs">
                        👁️ View
                      </button>
                      <button className="btn btn-secondary text-xs">
                        📥 Download
                      </button>
                      <button className="btn btn-secondary text-xs">
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
                
                {file.status === 'processing' && (
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-brand-blue to-brand-green h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Processing document with AI engines...</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon="📄"
            title="No documents found"
            description="Upload your first document to get started with our AI-powered analysis."
            action={
              <label htmlFor="file-upload" className="btn btn-primary cursor-pointer">
                Upload Document
              </label>
            }
          />
        )}
      </div>

      {/* Processing Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="metric-card">
          <div className="text-center">
            <div className="text-2xl font-bold text-brand-blue">
              {uploadedFiles.filter(f => f.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {uploadedFiles.filter(f => f.status === 'processing').length}
            </div>
            <div className="text-sm text-gray-600">Processing</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {uploadedFiles.filter(f => f.status === 'failed').length}
            </div>
            <div className="text-sm text-gray-600">Failed</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {uploadedFiles.reduce((sum, f) => sum + parseFloat(f.size), 0).toFixed(1)} MB
            </div>
            <div className="text-sm text-gray-600">Total Size</div>
          </div>
        </div>
      </div>
    </div>
  );
}
