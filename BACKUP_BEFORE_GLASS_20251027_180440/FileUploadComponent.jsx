import React, { useState } from 'react';

export default function FileUploadComponent({ 
  onUploadComplete, 
  allowedTypes = ['image/*', '.pdf', '.csv', '.xlsx', '.doc', '.docx', '.txt'],
  maxSizeMB = 10,
  moduleType = 'general'
}) {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = (selectedFiles) => {
    const fileArray = Array.from(selectedFiles);
    
    // Validate file sizes
    const validFiles = fileArray.filter(file => {
      const sizeMB = file.size / (1024 * 1024);
      if (sizeMB > maxSizeMB) {
        alert(`${file.name} is too large. Max size: ${maxSizeMB}MB`);
        return false;
      }
      return true;
    });

    setFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

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
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert('Please select files to upload');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });
    formData.append('moduleType', moduleType);
    formData.append('timestamp', new Date().toISOString());

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Upload to backend
      const response = await fetch('http://localhost:8001/api/upload', {
        method: 'POST',
        body: formData
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();

      setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
        if (onUploadComplete) {
          onUploadComplete(data);
        }
      }, 500);

    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please check backend is running on port 8001');
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const getFileIcon = (file) => {
    const type = file.type.toLowerCase();
    if (type.includes('image')) return '🖼️';
    if (type.includes('pdf')) return '📄';
    if (type.includes('excel') || type.includes('sheet')) return '📊';
    if (type.includes('word') || type.includes('doc')) return '📝';
    if (type.includes('csv')) return '📈';
    return '📎';
  };

  return (
    <div style={{
      background: '#1e293b',
      padding: '30px',
      borderRadius: '16px',
      border: '2px solid #334155',
      marginBottom: '30px'
    }}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
        <h3 style={{color: '#06b6d4', fontSize: '1.3rem', margin: 0}}>
          📤 Upload Lab Reports & Documents
        </h3>
        <div style={{color: '#94a3b8', fontSize: '0.9rem'}}>
          {files.length} file{files.length !== 1 ? 's' : ''} selected
        </div>
      </div>

      {/* Drop Zone */}
      <div 
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        style={{
          border: `3px dashed ${dragActive ? '#06b6d4' : '#334155'}`,
          borderRadius: '12px',
          padding: '40px',
          textAlign: 'center',
          marginBottom: '20px',
          background: dragActive ? '#1e293b' : '#0f172a',
          cursor: 'pointer',
          transition: 'all 0.3s'
        }}
      >
        <div style={{fontSize: '3rem', marginBottom: '15px'}}>
          {dragActive ? '📥' : '📁'}
        </div>
        <p style={{color: '#94a3b8', fontSize: '1.1rem', marginBottom: '10px'}}>
          {dragActive ? 'Drop files here!' : 'Drag & Drop files here or click to browse'}
        </p>
        <p style={{color: '#64748b', fontSize: '0.9rem', marginBottom: '20px'}}>
          Supported: Lab Reports (PDF), Photos (JPG/PNG), Spreadsheets (Excel/CSV), Documents (Word)
        </p>
        <p style={{color: '#64748b', fontSize: '0.85rem'}}>
          Max size: {maxSizeMB}MB per file
        </p>
        <input
          type="file"
          multiple
          accept={allowedTypes.join(',')}
          onChange={(e) => handleFileSelect(e.target.files)}
          style={{display: 'none'}}
          id={`fileInput-${moduleType}`}
        />
        <label 
          htmlFor={`fileInput-${moduleType}`}
          style={{
            display: 'inline-block',
            marginTop: '20px',
            padding: '12px 30px',
            background: '#06b6d4',
            color: 'white',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.3s'
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#0891b2'}
          onMouseLeave={e => e.currentTarget.style.background = '#06b6d4'}
        >
          Browse Files
        </label>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div style={{marginBottom: '20px'}}>
          <h4 style={{color: '#94a3b8', marginBottom: '15px', fontSize: '1rem'}}>
            Selected Files ({files.length})
          </h4>
          <div style={{maxHeight: '300px', overflowY: 'auto'}}>
            {files.map((file, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px',
                background: '#0f172a',
                borderRadius: '8px',
                marginBottom: '8px',
                border: '1px solid #334155'
              }}>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0}}>
                  <span style={{fontSize: '1.5rem', flexShrink: 0}}>
                    {getFileIcon(file)}
                  </span>
                  <div style={{minWidth: 0, flex: 1}}>
                    <div style={{
                      color: '#e2e8f0', 
                      fontWeight: '600',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {file.name}
                    </div>
                    <div style={{color: '#64748b', fontSize: '0.85rem'}}>
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  style={{
                    padding: '6px 12px',
                    background: '#ef4444',
                    border: 'none',
                    borderRadius: '6px',
                    color: 'white',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    flexShrink: 0,
                    marginLeft: '12px'
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Progress */}
      {uploading && (
        <div style={{marginBottom: '20px'}}>
          <div style={{
            background: '#0f172a',
            borderRadius: '8px',
            height: '40px',
            overflow: 'hidden',
            position: 'relative',
            border: '2px solid #334155'
          }}>
            <div style={{
              width: `${uploadProgress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #06b6d4, #0891b2)',
              transition: 'width 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '700',
              fontSize: '1rem'
            }}>
              {uploadProgress}%
            </div>
          </div>
          <p style={{color: '#94a3b8', textAlign: 'center', marginTop: '10px', fontSize: '0.95rem'}}>
            Uploading {files.length} file{files.length !== 1 ? 's' : ''}... Please wait.
          </p>
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={uploading || files.length === 0}
        style={{
          width: '100%',
          padding: '16px',
          background: files.length === 0 || uploading ? '#334155' : 'linear-gradient(135deg, #10b981, #059669)',
          border: 'none',
          borderRadius: '12px',
          color: 'white',
          fontSize: '1.1rem',
          fontWeight: '700',
          cursor: files.length === 0 || uploading ? 'not-allowed' : 'pointer',
          opacity: files.length === 0 || uploading ? 0.5 : 1,
          transition: 'all 0.3s'
        }}
      >
        {uploading ? '⏳ Uploading...' : `📤 Upload ${files.length} File${files.length !== 1 ? 's' : ''}`}
      </button>

      <p style={{
        color: '#64748b', 
        fontSize: '0.85rem', 
        textAlign: 'center', 
        marginTop: '15px',
        lineHeight: '1.5'
      }}>
        💡 <strong>Tip:</strong> Upload lab reports, test results, photos, or any supporting documentation. 
        All files are encrypted and secure.
      </p>
    </div>
  );
}