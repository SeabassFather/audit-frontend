import React, { useState } from 'react';

const DataExportModule = () => {
  const [exportType, setExportType] = useState('full');
  const [selectedComponents, setSelectedComponents] = useState([]);
  const [exportFormat, setExportFormat] = useState('json');

  const exportableComponents = [
    { id: 'documents', name: 'Document Control Data', size: '2.3 MB' },
    { id: 'support', name: 'Support & Maintenance Records', size: '1.8 MB' },
    { id: 'qa', name: 'QA/Testing Data', size: '3.1 MB' },
    { id: 'continuity', name: 'Business Continuity Plans', size: '1.2 MB' },
    { id: 'audit-logs', name: 'Audit Trail Logs', size: '15.7 MB' },
    { id: 'user-data', name: 'User Management Data', size: '0.9 MB' },
    { id: 'financial', name: 'Financial Records', size: '4.5 MB' },
    { id: 'compliance', name: 'Compliance Documentation', size: '2.7 MB' }
  ];

  const formats = [
    { id: 'json', name: 'JSON', description: 'Machine-readable format' },
    { id: 'csv', name: 'CSV', description: 'Spreadsheet compatible' },
    { id: 'xml', name: 'XML', description: 'Structured data format' },
    { id: 'pdf', name: 'PDF', description: 'Human-readable reports' }
  ];

  const handleComponentToggle = (componentId) => {
    setSelectedComponents(prev => 
      prev.includes(componentId) 
        ? prev.filter(id => id !== componentId)
        : [...prev, componentId]
    );
  };

  const handleExport = () => {
    // Simulate export process
    alert(`Exporting ${exportType === 'full' ? 'full system data' : 'selected components'} in ${exportFormat.toUpperCase()} format...`);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-ocean-800">💾 Data Export & Migration</h3>
      
      {/* Export Type Selection */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Export Scope</h4>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="full"
              checked={exportType === 'full'}
              onChange={(e) => setExportType(e.target.value)}
              className="mr-2"
            />
            <span>Full System Export</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="selective"
              checked={exportType === 'selective'}
              onChange={(e) => setExportType(e.target.value)}
              className="mr-2"
            />
            <span>Selective Component Export</span>
          </label>
        </div>
      </div>

      {/* Component Selection (when selective) */}
      {exportType === 'selective' && (
        <div className="mb-6">
          <h4 className="font-semibold mb-3">Select Components to Export</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {exportableComponents.map(component => (
              <label key={component.id} className="flex items-center p-3 bg-gray-50 rounded">
                <input
                  type="checkbox"
                  checked={selectedComponents.includes(component.id)}
                  onChange={() => handleComponentToggle(component.id)}
                  className="mr-3"
                />
                <div className="flex-1">
                  <div className="font-medium">{component.name}</div>
                  <div className="text-sm text-gray-500">{component.size}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Format Selection */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Export Format</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {formats.map(format => (
            <label key={format.id} className="flex flex-col p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <div className="flex items-center mb-1">
                <input
                  type="radio"
                  value={format.id}
                  checked={exportFormat === format.id}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="mr-2"
                />
                <span className="font-medium">{format.name}</span>
              </div>
              <span className="text-sm text-gray-600">{format.description}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Export Summary */}
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <h4 className="font-semibold mb-2">Export Summary</h4>
        <div className="text-sm space-y-1">
          <div>
            <strong>Scope:</strong> {exportType === 'full' ? 'Complete system data' : `${selectedComponents.length} selected components`}
          </div>
          <div>
            <strong>Format:</strong> {formats.find(f => f.id === exportFormat)?.name}
          </div>
          <div>
            <strong>Estimated Size:</strong> {
              exportType === 'full' 
                ? '32.2 MB' 
                : selectedComponents.reduce((total, id) => {
                    const component = exportableComponents.find(c => c.id === id);
                    return total + parseFloat(component?.size || '0');
                  }, 0).toFixed(1) + ' MB'
            }
          </div>
        </div>
      </div>

      {/* Export Actions */}
      <div className="flex gap-3">
        <button
          onClick={handleExport}
          disabled={exportType === 'selective' && selectedComponents.length === 0}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          🚀 Start Export
        </button>
        <button className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition-colors">
          📋 Generate Export Report
        </button>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          📅 Schedule Export
        </button>
      </div>

      {/* Migration Assistance */}
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <h5 className="font-semibold text-yellow-800 mb-2">🔄 Migration Assistance</h5>
        <p className="text-sm text-yellow-700 mb-3">
          Need help with data migration? Our migration services include data mapping, validation, and transfer assistance.
        </p>
        <button className="bg-yellow-600 text-white px-4 py-2 rounded text-sm hover:bg-yellow-700 transition-colors">
          Contact Migration Team
        </button>
      </div>
    </div>
  );
};

export default DataExportModule;