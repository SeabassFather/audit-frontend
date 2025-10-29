import React, { useState } from 'react';

const FileUploads = () => {
  const [uploadedFiles, setUploadedFiles] = useState([
    {
      id: 1,
      name: "mortgage_compliance_docs.pdf",
      size: "2.4 MB",
      type: "PDF",
      uploadDate: "2024-01-15",
      status: "Processed",
      category: "Mortgage"
    },
    {
      id: 2,
      name: "agricultural_audit_report.xlsx",
      size: "1.8 MB",
      type: "Excel",
      uploadDate: "2024-01-14",
      status: "Processing",
      category: "Agriculture"
    },
    {
      id: 3,
      name: "trade_finance_contracts.zip",
      size: "5.2 MB",
      type: "Archive",
      uploadDate: "2024-01-13",
      status: "Completed",
      category: "Trade Finance"
    }
  ]);

  const [dragActive, setDragActive] = useState(false);

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
      const newFile = {
        id: uploadedFiles.length + Math.random(),
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        type: file.type.split('/')[1]?.toUpperCase() || "Unknown",
        uploadDate: new Date().toISOString().split('T')[0],
        status: "Uploading",
        category: "General"
      };
      
      setUploadedFiles(prev => [...prev, newFile]);
      
      // Simulate upload process
      setTimeout(() => {
        setUploadedFiles(prev => 
          prev.map(f => 
            f.id === newFile.id 
              ? { ...f, status: "Processing" } 
              : f
          )
        );
      }, 1000);
      
      setTimeout(() => {
        setUploadedFiles(prev => 
          prev.map(f => 
            f.id === newFile.id 
              ? { ...f, status: "Completed" } 
              : f
          )
        );
      }, 3000);
    });
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      'Uploading': 'bg-info text-white',
      'Processing': 'bg-warning text-dark',
      'Completed': 'bg-success text-white',
      'Processed': 'bg-success text-white',
      'Failed': 'bg-danger text-white'
    };
    return statusClasses[status] || 'bg-secondary text-white';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Mortgage': 'bg-accent-yellow',
      'Agriculture': 'bg-accent-green',
      'Trade Finance': 'bg-primary-silver',
      'General': 'bg-light'
    };
    return colors[category] || 'bg-light';
  };

  return (
    <div className="container py-5">
      {/* Page Header */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-secondary-blue mb-3">
          File Upload Center
        </h1>
        <p className="lead text-muted col-lg-8 mx-auto">
          Secure document upload and management system for audit and compliance files. 
          Upload, organize, and track your important documents.
        </p>
      </div>

      {/* Upload Area */}
      <div className="row mb-5">
        <div className="col-lg-8 mx-auto">
          <div 
            className={`card card-auditdna ${dragActive ? 'border-primary' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="card-header bg-accent-yellow text-center">
              <h5 className="card-title mb-0 text-dark">Upload Documents</h5>
            </div>
            <div className="card-body text-center py-5">
              <div className="mb-4">
                <div className="display-1 text-muted mb-3">📁</div>
                <h5 className="fw-bold mb-3">
                  {dragActive ? "Drop files here!" : "Drag & drop files here"}
                </h5>
                <p className="text-muted mb-4">
                  Supported formats: PDF, DOC, XLS, ZIP, PNG, JPG (Max: 10MB per file)
                </p>
              </div>
              
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <label className="btn btn-secondary-blue">
                  <input 
                    type="file" 
                    multiple 
                    className="d-none"
                    onChange={(e) => handleFiles(e.target.files)}
                  />
                  Choose Files
                </label>
                <button className="btn btn-accent-green">
                  Upload from Cloud
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Stats */}
      <div className="row g-4 mb-5">
        <div className="col-lg-3 col-md-6">
          <div className="card card-auditdna">
            <div className="card-body text-center">
              <div className="h2 fw-bold text-secondary-blue mb-1">
                {uploadedFiles.length}
              </div>
              <div className="text-muted small">Total Files</div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="card card-auditdna">
            <div className="card-body text-center">
              <div className="h2 fw-bold text-success mb-1">
                {uploadedFiles.filter(f => f.status === 'Completed' || f.status === 'Processed').length}
              </div>
              <div className="text-muted small">Processed</div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="card card-auditdna">
            <div className="card-body text-center">
              <div className="h2 fw-bold text-warning mb-1">
                {uploadedFiles.filter(f => f.status === 'Processing' || f.status === 'Uploading').length}
              </div>
              <div className="text-muted small">Processing</div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="card card-auditdna">
            <div className="card-body text-center">
              <div className="h2 fw-bold text-muted mb-1">
                12.8 GB
              </div>
              <div className="text-muted small">Storage Used</div>
            </div>
          </div>
        </div>
      </div>

      {/* Files Table */}
      <div className="card card-auditdna">
        <div className="card-header bg-accent-yellow d-flex justify-content-between align-items-center">
          <h5 className="card-title mb-0 text-dark">Uploaded Files</h5>
          <div className="d-flex gap-2">
            <select className="form-select form-select-sm">
              <option>All Categories</option>
              <option>Mortgage</option>
              <option>Agriculture</option>
              <option>Trade Finance</option>
            </select>
            <select className="form-select form-select-sm">
              <option>All Statuses</option>
              <option>Completed</option>
              <option>Processing</option>
              <option>Failed</option>
            </select>
          </div>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>File Name</th>
                  <th>Category</th>
                  <th>Size</th>
                  <th>Type</th>
                  <th>Upload Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {uploadedFiles.map(file => (
                  <tr key={file.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="me-3">
                          {file.type === 'PDF' && '📄'}
                          {file.type === 'EXCEL' && '📊'}
                          {file.type === 'ZIP' && '🗂️'}
                          {!['PDF', 'EXCEL', 'ZIP'].includes(file.type) && '📋'}
                        </div>
                        <div>
                          <div className="fw-semibold">{file.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${getCategoryColor(file.category)} text-dark`}>
                        {file.category}
                      </span>
                    </td>
                    <td>{file.size}</td>
                    <td>{file.type}</td>
                    <td>{file.uploadDate}</td>
                    <td>
                      <span className={`badge ${getStatusBadge(file.status)}`}>
                        {file.status}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex gap-1">
                        <button className="btn btn-sm btn-outline-secondary">
                          <small>View</small>
                        </button>
                        <button className="btn btn-sm btn-outline-primary">
                          <small>Download</small>
                        </button>
                        <button className="btn btn-sm btn-outline-danger">
                          <small>Delete</small>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploads;
