import React, { useState, useEffect } from 'react';

const labTestTypes = [
  { id: 'water-quality', name: 'Water Quality Analysis', icon: '💧', requirements: ['pH', 'TDS', 'Nitrates', 'Phosphates'] },
  { id: 'soil-analysis', name: 'Soil Analysis', icon: '🌱', requirements: ['NPK', 'pH', 'Organic Matter', 'Heavy Metals'] },
  { id: 'pesticide-residue', name: 'Pesticide Residue', icon: '🔬', requirements: ['Organophosphates', 'Carbamates', 'Pyrethroids'] },
  { id: 'microbiological', name: 'Microbiological Testing', icon: '🦠', requirements: ['E.coli', 'Salmonella', 'Listeria'] },
  { id: 'heavy-metals', name: 'Heavy Metals', icon: '⚗️', requirements: ['Lead', 'Cadmium', 'Mercury', 'Arsenic'] },
  { id: 'organic-certification', name: 'Organic Certification', icon: '🌿', requirements: ['Prohibited Substances', 'GMO Testing'] }
];

const certificationTypes = [
  { id: 'usda-organic', name: 'USDA Organic', icon: '🇺🇸', description: 'United States organic certification' },
  { id: 'eu-organic', name: 'EU Organic', icon: '🇪🇺', description: 'European Union organic standards' },
  { id: 'rainforest-alliance', name: 'Rainforest Alliance', icon: '🌳', description: 'Sustainable agriculture certification' },
  { id: 'fair-trade', name: 'Fair Trade', icon: '🤝', description: 'Ethical trading certification' },
  { id: 'carbon-neutral', name: 'Carbon Neutral', icon: '🌍', description: 'Climate-neutral farming practices' },
  { id: 'water-stewardship', name: 'Water Stewardship', icon: '💧', description: 'Responsible water management' }
];

const greenFinancingOptions = [
  { id: 'sustainability-loans', name: 'Sustainability Loans', rate: '3.5-5.2%', description: 'Lower rates for eco-friendly practices' },
  { id: 'carbon-credit-advance', name: 'Carbon Credit Advance', rate: '4.1-6.8%', description: 'Financing against future carbon credits' },
  { id: 'renewable-energy', name: 'Renewable Energy Finance', rate: '2.9-4.7%', description: 'Solar, wind, and biogas installations' },
  { id: 'organic-transition', name: 'Organic Transition Loans', rate: '4.8-7.2%', description: 'Support during organic conversion period' },
  { id: 'water-conservation', name: 'Water Conservation Finance', rate: '3.8-5.9%', description: 'Efficient irrigation and water systems' }
];

export default function EcoWaterTechIntegration() {
  const [activeTab, setActiveTab] = useState('lab-reports');
  const [uploadedReports, setUploadedReports] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [financeApplications, setFinanceApplications] = useState([]);
  const [apiConnections, setApiConnections] = useState([]);

  // Mock API connections
  useEffect(() => {
    setApiConnections([
      { id: 'epa-api', name: 'EPA Environmental Data', status: 'Connected', lastSync: '2 hours ago' },
      { id: 'noaa-weather', name: 'NOAA Weather Data', status: 'Connected', lastSync: '15 minutes ago' },
      { id: 'usgs-water', name: 'USGS Water Data', status: 'Disconnected', lastSync: 'Never' },
      { id: 'carbon-registry', name: 'Carbon Registry API', status: 'Connected', lastSync: '1 day ago' },
      { id: 'soil-health', name: 'Soil Health Partnership', status: 'Pending', lastSync: 'Connecting...' }
    ]);
  }, []);

  const handleLabReportUpload = (event) => {
    const files = Array.from(event.target.files);
    const newReports = files.map(file => ({
      id: Math.random().toString(36),
      name: file.name,
      type: 'Lab Report',
      size: file.size,
      uploadDate: new Date().toLocaleDateString(),
      status: 'Processing',
      testType: labTestTypes[Math.floor(Math.random() * labTestTypes.length)]
    }));
    setUploadedReports(prev => [...prev, ...newReports]);
  };

  const handleCertificationUpload = (certType) => {
    const newCert = {
      id: Math.random().toString(36),
      type: certType,
      uploadDate: new Date().toLocaleDateString(),
      status: 'Under Review',
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      documents: ['Certificate.pdf', 'Inspection_Report.pdf']
    };
    setCertifications(prev => [...prev, newCert]);
  };

  const applyForGreenFinancing = (option) => {
    const application = {
      id: Math.random().toString(36),
      type: option.name,
      rate: option.rate,
      amount: 250000,
      applicationDate: new Date().toLocaleDateString(),
      status: 'Application Submitted',
      estimatedDecision: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()
    };
    setFinanceApplications(prev => [...prev, application]);
  };

  const renderLabReports = () => (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Lab Report Upload Center</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {labTestTypes.map(testType => (
            <div key={testType.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{testType.icon}</span>
                <h4 className="font-medium text-gray-900">{testType.name}</h4>
              </div>
              <div className="text-sm text-gray-600 mb-3">
                Tests: {testType.requirements.join(', ')}
              </div>
              <input
                type="file"
                onChange={handleLabReportUpload}
                className="hidden"
                id={`upload-${testType.id}`}
                accept=".pdf,.doc,.docx,.jpg,.png"
                multiple
              />
              <label
                htmlFor={`upload-${testType.id}`}
                className="btn btn-outline text-sm cursor-pointer"
              >
                Upload Reports
              </label>
            </div>
          ))}
        </div>

        {/* Uploaded Reports */}
        {uploadedReports.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Recent Uploads</h4>
            <div className="space-y-3">
              {uploadedReports.map(report => (
                <div key={report.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{report.testType.icon}</span>
                    <div>
                      <div className="font-medium text-gray-900">{report.name}</div>
                      <div className="text-sm text-gray-600">
                        {report.testType.name} • {(report.size / 1024).toFixed(1)} KB
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${
                      report.status === 'Processing' ? 'text-yellow-600' :
                      report.status === 'Completed' ? 'text-green-600' : 'text-gray-600'
                    }`}>
                      {report.status}
                    </div>
                    <div className="text-xs text-gray-500">{report.uploadDate}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* AI Analysis Results */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🤖 AI Analysis Results</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Water Quality Assessment</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>pH Level</span>
                <span className="text-green-600 font-medium">6.8 (Optimal)</span>
              </div>
              <div className="flex justify-between">
                <span>Nitrate Levels</span>
                <span className="text-yellow-600 font-medium">12 ppm (Caution)</span>
              </div>
              <div className="flex justify-between">
                <span>Heavy Metals</span>
                <span className="text-green-600 font-medium">Below Detection</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Soil Health Score</h4>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600">87/100</div>
              <div className="text-sm text-gray-600">Excellent soil health</div>
            </div>
            <div className="text-sm text-gray-600">
              Recommendations: Increase organic matter by 2%, monitor phosphate levels
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCertifications = () => (
    <div className="space-y-6">
      {/* Available Certifications */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Eco-Certification Programs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {certificationTypes.map(cert => (
            <div key={cert.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{cert.icon}</span>
                <div>
                  <h4 className="font-medium text-gray-900">{cert.name}</h4>
                  <p className="text-sm text-gray-600">{cert.description}</p>
                </div>
              </div>
              <button
                onClick={() => handleCertificationUpload(cert)}
                className="btn btn-primary text-sm w-full"
              >
                Apply for Certification
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* My Certifications */}
      {certifications.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">My Certifications</h3>
          <div className="space-y-4">
            {certifications.map(cert => (
              <div key={cert.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{cert.type.icon}</span>
                  <div>
                    <h4 className="font-medium text-gray-900">{cert.type.name}</h4>
                    <div className="text-sm text-gray-600">
                      Applied: {cert.uploadDate} • Expires: {cert.expiryDate}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${
                    cert.status === 'Under Review' ? 'text-yellow-600' :
                    cert.status === 'Approved' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {cert.status}
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderGreenFinancing = () => (
    <div className="space-y-6">
      {/* Available Financing Options */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Green Financing Options</h3>
        <div className="space-y-4">
          {greenFinancingOptions.map(option => (
            <div key={option.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{option.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                  <div className="text-sm text-green-600 font-medium mt-2">
                    Interest Rate: {option.rate}
                  </div>
                </div>
                <button
                  onClick={() => applyForGreenFinancing(option)}
                  className="btn btn-primary ml-4"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carbon Credits Calculator */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🌱 Carbon Credits Calculator</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Farm Size (acres)</label>
                <input type="number" defaultValue="500" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sustainable Practices</label>
                <div className="space-y-2">
                  {['Cover Crops', 'No-Till Farming', 'Composting', 'Renewable Energy'].map(practice => (
                    <label key={practice} className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">{practice}</span>
                    </label>
                  ))}
                </div>
              </div>
              <button className="btn btn-primary w-full">Calculate Credits</button>
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-800 mb-3">Estimated Annual Credits</h4>
            <div className="text-3xl font-bold text-green-800 mb-2">145 tCO2e</div>
            <div className="text-sm text-green-600 mb-4">
              Estimated value: $2,175 - $4,350/year
            </div>
            <button className="btn bg-green-600 text-white hover:bg-green-700 w-full">
              Register for Carbon Program
            </button>
          </div>
        </div>
      </div>

      {/* My Applications */}
      {financeApplications.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">My Financing Applications</h3>
          <div className="space-y-4">
            {financeApplications.map(app => (
              <div key={app.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{app.type}</h4>
                  <div className="text-sm text-gray-600">
                    Amount: ${app.amount.toLocaleString()} • Rate: {app.rate}
                  </div>
                  <div className="text-sm text-gray-500">
                    Applied: {app.applicationDate} • Decision by: {app.estimatedDecision}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-blue-600">{app.status}</div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    Track Application
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderApiIntegrations = () => (
    <div className="space-y-6">
      {/* API Connections */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Environmental Data API Integrations</h3>
        <div className="space-y-4">
          {apiConnections.map(api => (
            <div key={api.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{api.name}</h4>
                <div className="text-sm text-gray-600">Last sync: {api.lastSync}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-md text-sm font-medium ${
                  api.status === 'Connected' ? 'bg-green-100 text-green-800' :
                  api.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {api.status}
                </span>
                <button className="btn btn-outline text-sm">Configure</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Visualization */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🌡️ Environmental Data Dashboard</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">72°F</div>
            <div className="text-sm text-gray-600">Current Temperature</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">45%</div>
            <div className="text-sm text-gray-600">Soil Moisture</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">310 ppm</div>
            <div className="text-sm text-gray-600">CO2 Levels</div>
          </div>
        </div>
      </div>

      {/* Automated Alerts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🚨 Environmental Alerts</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <span className="text-yellow-600">⚠️</span>
            <div>
              <div className="font-medium text-yellow-800">High Nitrate Levels Detected</div>
              <div className="text-sm text-yellow-600">Water quality monitoring shows elevated nitrates in sector 3</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <span className="text-blue-600">💧</span>
            <div>
              <div className="font-medium text-blue-800">Irrigation Schedule Optimized</div>
              <div className="text-sm text-blue-600">AI recommendations available for 15% water savings</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <span className="text-green-600">🌱</span>
            <div>
              <div className="font-medium text-green-800">Carbon Sequestration Goal Met</div>
              <div className="text-sm text-green-600">Monthly carbon credit target achieved 3 days early</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Eco & Water-Tech Integration</h1>
        <p className="text-gray-600">Environmental monitoring, certification tracking, and green financing solutions</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'lab-reports', label: 'Lab Reports', icon: '🔬' },
            { id: 'certifications', label: 'Eco-Certifications', icon: '🌿' },
            { id: 'green-financing', label: 'Green Financing', icon: '💚' },
            { id: 'api-integrations', label: 'API Integrations', icon: '🔗' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'lab-reports' && renderLabReports()}
      {activeTab === 'certifications' && renderCertifications()}
      {activeTab === 'green-financing' && renderGreenFinancing()}
      {activeTab === 'api-integrations' && renderApiIntegrations()}
    </div>
  );
}