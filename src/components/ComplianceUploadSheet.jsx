import { useEffect, useRef, useState } from "react";
import { X, Upload, QrCode, FileText } from "lucide-react";

/**
 * ComplianceUploadSheet Component
 * 
 * A simplified upload component for the compliance module that doesn't depend on
 * the IntakeProvider context. This is specifically designed for compliance document
 * uploads with category tagging support.
 */
export default function ComplianceUploadSheet({ open, onClose, service }) {
  const inputRef = useRef(null);
  const [qrUrl, setQrUrl] = useState("");
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const link = `${location.origin}/service/${service?.id ?? ""}`;

  useEffect(() => {
    if (!open) return;
    
    let alive = true;
    (async () => {
      try {
        const QR = (await import("qrcode")).default;
        const url = await QR.toDataURL(link);
        if (alive) setQrUrl(url);
      } catch { 
        setQrUrl(""); 
      }
    })();
    return () => { alive = false; };
  }, [link, open]);

  if (!open) return null;

  function handleFiles(fileList) {
    if (fileList?.length) {
      const newFiles = Array.from(fileList).map(file => ({
        file,
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        category: service?.name || "Compliance",
        selectedItems: service?.selectedItems || [],
        selectedCategories: service?.selectedCategories || []
      }));
      setFiles(prev => [...prev, ...newFiles]);
    }
  }

  function choose() { 
    inputRef.current?.click(); 
  }

  function onChange(e) { 
    handleFiles(e.target.files); 
    e.target.value = ""; 
  }

  function onDrop(e) { 
    e.preventDefault(); 
    setIsDragging(false);
    handleFiles(e.dataTransfer?.files); 
  }

  function onDragOver(e) {
    e.preventDefault();
    setIsDragging(true);
  }

  function onDragLeave(e) {
    e.preventDefault();
    setIsDragging(false);
  }

  function removeFile(fileId) {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  }

  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  function handleSubmit() {
    // Here you would normally send the files to your backend
    console.log('Uploading files:', files);
    alert(`${files.length} file(s) uploaded for ${service?.name || 'Compliance'}`);
    setFiles([]);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Upload Documents</h2>
              <p className="text-sm text-gray-600 mt-1">
                {service?.name || 'Compliance Document Intake'}
              </p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {/* Service Info */}
          {(service?.selectedCategories?.length > 0 || service?.selectedItems?.length > 0) && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">Selected Categories & Items</h3>
              {service.selectedCategories?.length > 0 && (
                <div className="mb-2">
                  <span className="text-sm text-blue-800">Categories: </span>
                  <span className="text-sm text-blue-600">
                    {service.selectedCategories.length} selected
                  </span>
                </div>
              )}
              {service.selectedItems?.length > 0 && (
                <div>
                  <span className="text-sm text-blue-800">Items: </span>
                  <span className="text-sm text-blue-600">
                    {service.selectedItems.length} selected
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
          >
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <div className="text-lg font-medium text-gray-900 mb-2">
              Drop files here or click to browse
            </div>
            <div className="text-sm text-gray-600 mb-4">
              Supports PDF, DOCX, JPG, PNG, XLSX, ZIP files
            </div>
            <button
              onClick={choose}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Choose Files
            </button>
            <input
              ref={inputRef}
              type="file"
              multiple
              className="hidden"
              onChange={onChange}
              accept=".pdf,.docx,.jpg,.jpeg,.png,.xlsx,.zip"
            />
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="mt-6">
              <h3 className="font-medium text-gray-900 mb-3">
                Files to Upload ({files.length})
              </h3>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {files.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-gray-500" />
                      <div>
                        <div className="font-medium text-sm">{file.name}</div>
                        <div className="text-xs text-gray-500">{formatFileSize(file.size)}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(file.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* QR Code */}
          {qrUrl && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div>
                  <QrCode className="h-5 w-5 text-gray-600 mb-2" />
                  <img src={qrUrl} alt="QR Code" className="w-20 h-20" />
                </div>
                <div>
                  <div className="font-medium text-sm text-gray-900 mb-1">
                    Quick Upload Link
                  </div>
                  <div className="text-xs text-gray-600">
                    Scan to upload from mobile device
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {files.length} file(s) selected
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={files.length === 0}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  files.length > 0
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Upload {files.length > 0 && `(${files.length})`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}