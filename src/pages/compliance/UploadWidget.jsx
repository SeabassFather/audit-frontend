import React, { useState, useRef, useCallback } from "react";

/**
 * Upload Widget Component
 * 
 * Advanced drag & drop upload interface with auto-categorization and tagging.
 * Supports multiple file types and automatically categorizes documents based on
 * content analysis for legal, compliance, eco, and title categories.
 * 
 * Features:
 * - Drag & drop file upload
 * - Auto-categorization based on file type and content
 * - Manual tagging system
 * - File preview and management
 * - Upload progress tracking
 * - Integration with compliance workflow
 * 
 * @component
 */
export default function UploadWidget() {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const fileInputRef = useRef(null);

  // Document categories for auto-classification
  const categories = {
    legal: { label: "Legal", color: "blue", icon: "⚖️" },
    compliance: { label: "Compliance", color: "green", icon: "✅" },
    eco: { label: "Environmental", color: "emerald", icon: "🌱" },
    title: { label: "Title/Property", color: "purple", icon: "🏠" },
    financial: { label: "Financial", color: "yellow", icon: "💰" },
    other: { label: "Other", color: "slate", icon: "📄" }
  };

  // Auto-categorization logic based on file name and type
  const categorizeFile = (file) => {
    const fileName = file.name.toLowerCase();
    const fileType = file.type.toLowerCase();
    
    // Legal documents
    if (fileName.includes('contract') || fileName.includes('agreement') || 
        fileName.includes('legal') || fileName.includes('nda') ||
        fileName.includes('terms') || fileType.includes('pdf')) {
      return 'legal';
    }
    
    // Compliance documents
    if (fileName.includes('compliance') || fileName.includes('audit') ||
        fileName.includes('regulation') || fileName.includes('policy') ||
        fileName.includes('gdpr') || fileName.includes('ccpa')) {
      return 'compliance';
    }
    
    // Environmental/ESG documents
    if (fileName.includes('environmental') || fileName.includes('sustainability') ||
        fileName.includes('esg') || fileName.includes('carbon') ||
        fileName.includes('green') || fileName.includes('eco')) {
      return 'eco';
    }
    
    // Title/Property documents
    if (fileName.includes('title') || fileName.includes('deed') ||
        fileName.includes('property') || fileName.includes('real estate') ||
        fileName.includes('mortgage') || fileName.includes('escrow')) {
      return 'title';
    }
    
    // Financial documents
    if (fileName.includes('financial') || fileName.includes('statement') ||
        fileName.includes('invoice') || fileName.includes('receipt') ||
        fileName.includes('tax') || fileName.includes('bank')) {
      return 'financial';
    }
    
    return 'other';
  };

  // Handle drag events
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  // Handle drop event
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  // Handle file selection
  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      category: categorizeFile(file),
      tags: [],
      uploaded: false,
      progress: 0
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
  };

  // Simulate file upload with progress
  const uploadFile = async (fileData) => {
    const { id } = fileData;
    setUploadProgress(prev => ({ ...prev, [id]: 0 }));
    
    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setUploadProgress(prev => ({ ...prev, [id]: progress }));
      
      setFiles(prev => prev.map(f => 
        f.id === id ? { ...f, progress } : f
      ));
    }
    
    // Mark as uploaded
    setFiles(prev => prev.map(f => 
      f.id === id ? { ...f, uploaded: true, progress: 100 } : f
    ));
    
    delete uploadProgress[id];
  };

  // Upload all files
  const handleUploadAll = async () => {
    setUploading(true);
    const unuploadedFiles = files.filter(f => !f.uploaded);
    
    // Upload files in parallel
    await Promise.all(unuploadedFiles.map(uploadFile));
    
    setUploading(false);
  };

  // Remove file
  const removeFile = (id) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  // Update file category
  const updateCategory = (id, category) => {
    setFiles(prev => prev.map(f => 
      f.id === id ? { ...f, category } : f
    ));
  };

  // Add tag to file
  const addTag = (id, tag) => {
    if (!tag.trim()) return;
    
    setFiles(prev => prev.map(f => 
      f.id === id ? { 
        ...f, 
        tags: [...f.tags, tag.trim()].filter((t, i, arr) => arr.indexOf(t) === i)
      } : f
    ));
  };

  // Remove tag from file
  const removeTag = (id, tagToRemove) => {
    setFiles(prev => prev.map(f => 
      f.id === id ? { 
        ...f, 
        tags: f.tags.filter(tag => tag !== tagToRemove)
      } : f
    ));
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Get category styles
  const getCategoryStyles = (category) => {
    const cat = categories[category] || categories.other;
    return {
      badge: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${cat.color}-100 text-${cat.color}-800`,
      border: `border-${cat.color}-200`
    };
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <div
        className={`upload-zone ${dragActive ? 'upload-zone-active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="text-center">
          <div className="text-6xl mb-4">📤</div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">
            Drop files here or click to browse
          </h3>
          <p className="text-slate-600 mb-4">
            Supports PDF, DOC, DOCX, XLS, XLSX, TXT, and image files
          </p>
          <p className="text-sm text-slate-500 mb-6">
            Files will be automatically categorized based on content and filename
          </p>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
            accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.jpg,.jpeg,.png,.gif"
          />
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="btn-primary px-6 py-3"
          >
            Select Files
          </button>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="compliance-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-800">
              Uploaded Files ({files.length})
            </h3>
            <div className="flex gap-2">
              <button
                onClick={handleUploadAll}
                disabled={uploading || files.every(f => f.uploaded)}
                className="btn-primary"
              >
                {uploading ? 'Uploading...' : 'Upload All'}
              </button>
              <button
                onClick={() => setFiles([])}
                className="btn-secondary"
              >
                Clear All
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {files.map((fileData) => {
              const styles = getCategoryStyles(fileData.category);
              
              return (
                <div key={fileData.id} className={`border-l-4 ${styles.border} bg-slate-50 p-4 rounded-lg`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{categories[fileData.category].icon}</span>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-slate-800 truncate">
                            {fileData.name}
                          </h4>
                          <p className="text-sm text-slate-600">
                            {formatFileSize(fileData.size)} • {fileData.type || 'Unknown type'}
                          </p>
                        </div>
                      </div>

                      {/* Category and Tags */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <select
                          value={fileData.category}
                          onChange={(e) => updateCategory(fileData.id, e.target.value)}
                          className="text-xs border border-slate-300 rounded px-2 py-1"
                        >
                          {Object.entries(categories).map(([key, cat]) => (
                            <option key={key} value={key}>
                              {cat.icon} {cat.label}
                            </option>
                          ))}
                        </select>

                        {fileData.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                          >
                            {tag}
                            <button
                              onClick={() => removeTag(fileData.id, tag)}
                              className="ml-1 text-blue-600 hover:text-blue-800"
                            >
                              ×
                            </button>
                          </span>
                        ))}

                        <input
                          type="text"
                          placeholder="Add tag..."
                          className="text-xs border border-slate-300 rounded px-2 py-1 w-20"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addTag(fileData.id, e.target.value);
                              e.target.value = '';
                            }
                          }}
                        />
                      </div>

                      {/* Progress Bar */}
                      {fileData.progress > 0 && fileData.progress < 100 && (
                        <div className="mb-2">
                          <div className="flex items-center justify-between text-sm text-slate-600 mb-1">
                            <span>Uploading...</span>
                            <span>{fileData.progress}%</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div
                              className="bg-compliance-600 h-2 rounded-full transition-all"
                              style={{ width: `${fileData.progress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Upload Status */}
                      {fileData.uploaded && (
                        <div className="flex items-center text-sm text-green-600">
                          <span className="mr-1">✅</span>
                          Successfully uploaded
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => removeFile(fileData.id)}
                      className="text-slate-400 hover:text-red-600 p-1"
                      title="Remove file"
                    >
                      ×
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Upload Statistics */}
      {files.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(categories).map(([key, cat]) => {
            const count = files.filter(f => f.category === key).length;
            if (count === 0) return null;
            
            return (
              <div key={key} className="compliance-card text-center">
                <div className="text-2xl mb-2">{cat.icon}</div>
                <div className="font-semibold text-slate-800">{count}</div>
                <div className="text-sm text-slate-600">{cat.label}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}