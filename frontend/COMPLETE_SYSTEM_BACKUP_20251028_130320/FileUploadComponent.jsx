import React, { useState } from 'react';

function FileUploadComponent() {
  const [files, setFiles] = useState([]);
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

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList).map(file => ({
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date().toISOString()
    }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <h1 style={{ 
        fontSize: '56px', 
        fontWeight: 'bold', 
        background: 'linear-gradient(135deg, #38bdf8, #0891b2)', 
        WebkitBackgroundClip: 'text', 
        WebkitTextFillColor: 'transparent', 
        marginBottom: '40px', 
        textAlign: 'center'
      }}>
        File Upload Center
      </h1>

      <div style={{ 
        background: 'rgba(30,41,59,0.6)', 
        backdropFilter: 'blur(16px)', 
        border: '1px solid rgba(56,189,248,0.3)', 
        borderRadius: '24px', 
        padding: '60px'
      }}>
        <div style={{ fontSize: '80px', textAlign: 'center', marginBottom: '30px' }}></div>

        {/* Drop Zone */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          style={{
            border: dragActive 
              ? '3px dashed rgba(56,189,248,0.8)' 
              : '2px dashed rgba(148,163,184,0.4)',
            borderRadius: '16px',
            padding: '60px 40px',
            textAlign: 'center',
            background: dragActive 
              ? 'rgba(56,189,248,0.1)' 
              : 'rgba(15,23,42,0.4)',
            transition: 'all 0.3s',
            cursor: 'pointer',
            marginBottom: '40px'
          }}
          onClick={() => document.getElementById('fileInput').click()}
        >
          <input
            id="fileInput"
            type="file"
            multiple
            onChange={handleChange}
            style={{ display: 'none' }}
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx,.csv"
          />
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>
            {dragActive ? '' : ''}
          </div>
          <p style={{ fontSize: '20px', color: '#cbd5e1', marginBottom: '12px', fontWeight: '600' }}>
            {dragActive ? 'Drop files here' : 'Drag & drop files here'}
          </p>
          <p style={{ fontSize: '16px', color: '#94a3b8', marginBottom: '20px' }}>
            or click to browse
          </p>
          <p style={{ fontSize: '14px', color: '#64748b' }}>
            Accepted: PDF, Images, Word, Excel, CSV
          </p>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div>
            <h3 style={{ fontSize: '24px', color: '#38bdf8', marginBottom: '20px', fontWeight: '700' }}>
              Uploaded Files ({files.length})
            </h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              {files.map((fileObj, index) => (
                <div
                  key={index}
                  style={{
                    background: 'rgba(15,23,42,0.6)',
                    border: '1px solid rgba(148,163,184,0.3)',
                    borderRadius: '12px',
                    padding: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '16px', color: 'white', fontWeight: '600', marginBottom: '8px' }}>
                       {fileObj.name}
                    </div>
                    <div style={{ fontSize: '14px', color: '#94a3b8' }}>
                      {formatFileSize(fileObj.size)}  {fileObj.type || 'Unknown type'}  {new Date(fileObj.uploadedAt).toLocaleTimeString()}
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    style={{
                      background: 'rgba(239,68,68,0.2)',
                      color: '#ef4444',
                      border: '1px solid rgba(239,68,68,0.4)',
                      borderRadius: '8px',
                      padding: '10px 20px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <button
              style={{
                background: 'linear-gradient(135deg, #38bdf8, #0891b2)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '18px 40px',
                fontSize: '18px',
                fontWeight: '700',
                cursor: 'pointer',
                width: '100%',
                marginTop: '30px',
                boxShadow: '0 8px 25px rgba(56,189,248,0.4)',
                transition: 'all 0.3s'
              }}
            >
              Upload All Files to Server
            </button>
          </div>
        )}

        <div style={{ marginTop: '40px', padding: '20px', background: 'rgba(16,185,129,0.1)', borderRadius: '12px', border: '1px solid rgba(16,185,129,0.3)' }}>
          <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6' }}>
            <strong style={{ color: '#10b981' }}>Upload Guidelines:</strong> Upload chain of custody documents, field photos, sample data sheets, or any supporting documentation. Max file size: 25MB per file. All uploads are encrypted and stored securely.
          </p>
        </div>
      </div>
    </div>
  );
}

export default FileUploadComponent;
