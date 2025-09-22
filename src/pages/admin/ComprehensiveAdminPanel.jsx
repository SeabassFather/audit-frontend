import React, { useState, useEffect } from 'react';

const userRoles = ['Admin', 'Manager', 'Auditor', 'Client', 'Partner'];
const userStatuses = ['Active', 'Inactive', 'Pending', 'Suspended'];

const apiEndpoints = [
  { name: 'USDA Price Feed', url: '/api/usda/prices', status: 'Healthy', responseTime: '120ms', lastCheck: '2 min ago' },
  { name: 'Mortgage Search API', url: '/api/mortgages/search', status: 'Healthy', responseTime: '85ms', lastCheck: '1 min ago' },
  { name: 'Factoring API', url: '/api/factoring/deals', status: 'Warning', responseTime: '450ms', lastCheck: '3 min ago' },
  { name: 'Compliance Engine', url: '/api/compliance/check', status: 'Healthy', responseTime: '200ms', lastCheck: '1 min ago' },
  { name: 'Document Upload', url: '/api/documents/upload', status: 'Error', responseTime: 'Timeout', lastCheck: '5 min ago' },
  { name: 'Environmental Data', url: '/api/environmental/sensors', status: 'Healthy', responseTime: '95ms', lastCheck: '30 sec ago' }
];

export default function ComprehensiveAdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [partners, setPartners] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [scripts, setScripts] = useState([]);
  const [syntheticDataEnabled, setSyntheticDataEnabled] = useState(true);

  // Initialize mock data
  useEffect(() => {
    setUsers([
      { id: 1, name: 'John Smith', email: 'john@example.com', role: 'Admin', status: 'Active', lastLogin: '2 hours ago', created: '2024-01-15' },
      { id: 2, name: 'Sarah Johnson', email: 'sarah@auditdna.com', role: 'Manager', status: 'Active', lastLogin: '1 day ago', created: '2024-02-01' },
      { id: 3, name: 'Mike Chen', email: 'mike@partner.com', role: 'Partner', status: 'Active', lastLogin: '3 hours ago', created: '2024-01-20' },
      { id: 4, name: 'Lisa Rodriguez', email: 'lisa@client.com', role: 'Client', status: 'Pending', lastLogin: 'Never', created: '2024-03-10' },
      { id: 5, name: 'David Wilson', email: 'david@auditor.com', role: 'Auditor', status: 'Active', lastLogin: '6 hours ago', created: '2024-02-15' }
    ]);

    setPartners([
      { id: 1, name: 'AgriFinance Partners', type: 'Lender', status: 'Active', contracts: 3, revenue: '$45,000', contact: 'partners@agrifinance.com' },
      { id: 2, name: 'Green Certification Co', type: 'Certification', status: 'Active', contracts: 2, revenue: '$28,500', contact: 'certs@greencert.com' },
      { id: 3, name: 'Environmental Labs Inc', type: 'Testing', status: 'Active', contracts: 5, revenue: '$67,200', contact: 'lab@envlabs.com' },
      { id: 4, name: 'Legal Documents LLC', type: 'Legal', status: 'Pending', contracts: 1, revenue: '$12,000', contact: 'legal@legaldocs.com' }
    ]);

    setDocuments([
      { id: 1, name: 'Terms of Service Template', category: 'Legal', size: '245 KB', uploadDate: '2024-03-01', status: 'Active' },
      { id: 2, name: 'Privacy Policy Template', category: 'Legal', size: '198 KB', uploadDate: '2024-03-01', status: 'Active' },
      { id: 3, name: 'Mortgage Disclosure Forms', category: 'Compliance', size: '1.2 MB', uploadDate: '2024-02-28', status: 'Active' },
      { id: 4, name: 'Agricultural Audit Checklist', category: 'Audit', size: '856 KB', uploadDate: '2024-03-05', status: 'Draft' }
    ]);

    setScripts([
      { id: 1, name: 'Mortgage Lead Qualifier', type: 'Marketing', status: 'Active', conversions: '23%', lastUsed: '1 hour ago' },
      { id: 2, name: 'Agricultural Finance Script', type: 'Sales', status: 'Active', conversions: '31%', lastUsed: '3 hours ago' },
      { id: 3, name: 'Compliance Onboarding', type: 'Training', status: 'Draft', conversions: 'N/A', lastUsed: 'Never' },
      { id: 4, name: 'Environmental Consultation', type: 'Consultation', status: 'Active', conversions: '18%', lastUsed: '2 days ago' }
    ]);
  }, []);

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{users.length}</div>
              <div className="text-sm text-gray-600">Total Users</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🤝</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{partners.length}</div>
              <div className="text-sm text-gray-600">Active Partners</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📄</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{documents.length}</div>
              <div className="text-sm text-gray-600">Documents</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{scripts.length}</div>
              <div className="text-sm text-gray-600">Marketing Scripts</div>
            </div>
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🔍 System Health Monitor</h3>
        <div className="space-y-4">
          {apiEndpoints.map((endpoint, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${
                  endpoint.status === 'Healthy' ? 'bg-green-500' :
                  endpoint.status === 'Warning' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
                <div>
                  <div className="font-medium text-gray-900">{endpoint.name}</div>
                  <div className="text-sm text-gray-600">{endpoint.url}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">{endpoint.responseTime}</div>
                <div className="text-xs text-gray-500">{endpoint.lastCheck}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Synthetic Data Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">⚙️ Synthetic Data Controls</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Enable Synthetic Data Fallback</h4>
              <p className="text-sm text-gray-600">Use synthetic data when live APIs are unavailable</p>
            </div>
            <button
              onClick={() => setSyntheticDataEnabled(!syntheticDataEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                syntheticDataEnabled ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                syntheticDataEnabled ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="btn btn-outline">🔄 Regenerate USDA Data</button>
            <button className="btn btn-outline">🏠 Reset Mortgage Data</button>
            <button className="btn btn-outline">🌾 Refresh Ag Data</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="space-y-6">
      {/* Add User Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
        <button className="btn btn-primary">+ Add New User</button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Email</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Role</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Last Login</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{user.name}</td>
                  <td className="py-3 px-4 text-gray-600">{user.email}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                      user.role === 'Admin' ? 'bg-purple-100 text-purple-800' :
                      user.role === 'Manager' ? 'bg-blue-100 text-blue-800' :
                      user.role === 'Partner' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                      user.status === 'Active' ? 'bg-green-100 text-green-800' :
                      user.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{user.lastLogin}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                      <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderPartnerManagement = () => (
    <div className="space-y-6">
      {/* Add Partner Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Partner Management</h3>
        <button className="btn btn-primary">+ Add New Partner</button>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {partners.map(partner => (
          <div key={partner.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-semibold text-gray-900">{partner.name}</h4>
                <p className="text-sm text-gray-600">{partner.type}</p>
              </div>
              <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                partner.status === 'Active' ? 'bg-green-100 text-green-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {partner.status}
              </span>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Contracts:</span>
                <span className="font-medium">{partner.contracts}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Revenue:</span>
                <span className="font-medium">{partner.revenue}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Contact:</span>
                <span className="font-medium">{partner.contact}</span>
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <button className="btn btn-outline text-sm flex-1">View Details</button>
              <button className="btn btn-primary text-sm flex-1">Manage</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDocumentManagement = () => (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Upload Center</h3>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input type="file" multiple className="hidden" id="doc-upload" />
          <label htmlFor="doc-upload" className="cursor-pointer">
            <div className="text-4xl text-gray-400 mb-2">📄</div>
            <p className="text-gray-600">Upload legal documents, templates, and compliance forms</p>
            <p className="text-sm text-gray-500">PDF, DOC, DOCX files supported</p>
          </label>
        </div>
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Library</h3>
        <div className="space-y-4">
          {documents.map(doc => (
            <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600">📄</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{doc.name}</h4>
                  <div className="text-sm text-gray-600">
                    {doc.category} • {doc.size} • {doc.uploadDate}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                  doc.status === 'Active' ? 'bg-green-100 text-green-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {doc.status}
                </span>
                <div className="flex gap-2">
                  <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                  <button className="text-green-600 hover:text-green-800 text-sm">Download</button>
                  <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderScriptManagement = () => (
    <div className="space-y-6">
      {/* Add Script Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Marketing & Sales Scripts</h3>
        <button className="btn btn-primary">+ Create New Script</button>
      </div>

      {/* Scripts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scripts.map(script => (
          <div key={script.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-semibold text-gray-900">{script.name}</h4>
                <p className="text-sm text-gray-600">{script.type}</p>
              </div>
              <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                script.status === 'Active' ? 'bg-green-100 text-green-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {script.status}
              </span>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Conversion Rate:</span>
                <span className="font-medium">{script.conversions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Used:</span>
                <span className="font-medium">{script.lastUsed}</span>
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <button className="btn btn-outline text-sm flex-1">Edit Script</button>
              <button className="btn btn-primary text-sm flex-1">Deploy</button>
            </div>
          </div>
        ))}
      </div>

      {/* Script Analytics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Script Performance Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">24.3%</div>
            <div className="text-sm text-gray-600">Average Conversion Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">847</div>
            <div className="text-sm text-gray-600">Total Interactions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">$125K</div>
            <div className="text-sm text-gray-600">Generated Revenue</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
        <p className="text-gray-600">Comprehensive system administration and management</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: '📊' },
            { id: 'users', label: 'User Management', icon: '👥' },
            { id: 'partners', label: 'Partners', icon: '🤝' },
            { id: 'documents', label: 'Documents', icon: '📄' },
            { id: 'scripts', label: 'Scripts & Marketing', icon: '🎯' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
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
      {activeTab === 'dashboard' && renderDashboard()}
      {activeTab === 'users' && renderUserManagement()}
      {activeTab === 'partners' && renderPartnerManagement()}
      {activeTab === 'documents' && renderDocumentManagement()}
      {activeTab === 'scripts' && renderScriptManagement()}
    </div>
  );
}