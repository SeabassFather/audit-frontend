import React from "react";
import IDUploadForm from "../components/IDUploadForm";
import OCRUpload from "../components/OCRUpload";

export default function UploadPage() {
  const [activeTab, setActiveTab] = React.useState("id");

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Document Upload Center</h1>
        <p className="text-gray-600">
          Upload and process documents with advanced OCR and verification capabilities.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab("id")}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === "id"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              ID Documents
            </button>
            <button
              onClick={() => setActiveTab("ocr")}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === "ocr"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              OCR Processing
            </button>
            <button
              onClick={() => setActiveTab("bulk")}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === "bulk"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Bulk Upload
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "id" && (
            <IDUploadForm
              onUploadComplete={(data) => {
                console.log("ID upload completed:", data);
                alert("ID document processed successfully!");
              }}
            />
          )}

          {activeTab === "ocr" && (
            <OCRUpload
              onTextExtracted={(data) => {
                console.log("Text extracted:", data);
                // Handle extracted text
              }}
            />
          )}

          {activeTab === "bulk" && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <div className="mx-auto h-16 w-16 text-gray-400 mb-4">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Bulk Upload</h3>
                <p className="text-gray-600 mb-6">Upload multiple documents at once for batch processing</p>
                
                <input
                  type="file"
                  multiple
                  accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                  className="hidden"
                  id="bulk-upload"
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    console.log("Bulk upload files:", files);
                    alert(`Selected ${files.length} files for bulk processing`);
                  }}
                />
                <label
                  htmlFor="bulk-upload"
                  className="cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium inline-block"
                >
                  Select Multiple Files
                </label>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Bulk Upload Features:</h4>
                <ul className="list-disc list-inside text-sm text-yellow-700 space-y-1">
                  <li>Process up to 100 documents simultaneously</li>
                  <li>Automatic file type detection and routing</li>
                  <li>Progress tracking for each document</li>
                  <li>Batch OCR processing</li>
                  <li>Consolidated results report</li>
                  <li>Error handling and retry mechanisms</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Upload Statistics */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Upload Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">1,247</div>
            <div className="text-sm text-gray-600">Documents Processed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">98.5%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">2.3s</div>
            <div className="text-sm text-gray-600">Avg Processing Time</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">15GB</div>
            <div className="text-sm text-gray-600">Total Data Processed</div>
          </div>
        </div>
      </div>
    </div>
  );
}