import React, { useState } from "react";
import { MetricCard, ActivityItem, LoadingSpinner } from "../components/UIComponents.jsx";
import { clients, partners, adminUsers } from "../data/clientsData.js";

export default function Admin() {
  const [activeTab, setActiveTab] = useState('overview');

  const adminMetrics = [
    {
      title: "Total Clients",
      value: clients.length.toString(),
      change: "+5 this week",
      trend: "up",
      icon: "👥",
      color: "bg-gradient-to-r from-blue-500 to-blue-600"
    },
    {
      title: "Active Partners",
      value: partners.filter(p => p.status === 'Active').length.toString(),
      change: "+2 this month",
      trend: "up",
      icon: "🤝",
      color: "bg-gradient-to-r from-green-500 to-green-600"
    },
    {
      title: "Admin Users",
      value: adminUsers.filter(u => u.status === 'Active').length.toString(),
      change: "No changes",
      trend: "neutral",
      icon: "⚙️",
      color: "bg-gradient-to-r from-purple-500 to-purple-600"
    },
    {
      title: "System Health",
      value: "99.9%",
      change: "All systems operational",
      trend: "up",
      icon: "💚",
      color: "bg-gradient-to-r from-emerald-500 to-emerald-600"
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'clients', label: 'Client Management', icon: '👥' },
    { id: 'partners', label: 'Partner Management', icon: '🤝' },
    { id: 'users', label: 'User Management', icon: '👤' },
    { id: 'settings', label: 'System Settings', icon: '⚙️' }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminMetrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            trend={metric.trend}
            icon={metric.icon}
            color={metric.color}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Admin Activities */}
        <div className="widget">
          <h3 className="text-lg font-semibold mb-4">Recent Admin Activities</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">New client onboarded</p>
                <p className="text-sm text-gray-600">Pacific Coastal Ventures - 2 hours ago</p>
              </div>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Success</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Partner agreement updated</p>
                <p className="text-sm text-gray-600">Mexican Development Bank - 4 hours ago</p>
              </div>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Updated</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">System backup completed</p>
                <p className="text-sm text-gray-600">Daily backup - 6 hours ago</p>
              </div>
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">System</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="widget">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="btn btn-primary flex flex-col items-center p-4">
              <span className="text-lg mb-2">👥</span>
              <span className="text-sm">Add Client</span>
            </button>
            <button className="btn btn-secondary flex flex-col items-center p-4">
              <span className="text-lg mb-2">🤝</span>
              <span className="text-sm">Add Partner</span>
            </button>
            <button className="btn btn-secondary flex flex-col items-center p-4">
              <span className="text-lg mb-2">👤</span>
              <span className="text-sm">Add User</span>
            </button>
            <button className="btn btn-secondary flex flex-col items-center p-4">
              <span className="text-lg mb-2">📊</span>
              <span className="text-sm">Generate Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderClients = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Client Management</h2>
        <button className="btn btn-primary">+ Add New Client</button>
      </div>

      <div className="widget">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Client Name</th>
                <th className="text-left py-3 px-4">Type</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Total Spent</th>
                <th className="text-left py-3 px-4">Join Date</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium">{client.name}</div>
                      <div className="text-sm text-gray-600">{client.contact.email}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">{client.type}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      client.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium">{client.totalSpent}</td>
                  <td className="py-3 px-4">{client.joinDate}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="btn btn-secondary text-xs">View</button>
                      <button className="btn btn-secondary text-xs">Edit</button>
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

  const renderPartners = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Partner Management</h2>
        <button className="btn btn-primary">+ Add New Partner</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {partners.map((partner) => (
          <div key={partner.id} className="widget">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">{partner.name}</h3>
                <p className="text-gray-600">{partner.type}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                partner.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {partner.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Partner Since:</span>
                <span className="font-medium">{partner.partnerSince}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Commission:</span>
                <span className="font-medium">{partner.commission}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Referrals:</span>
                <span className="font-medium">{partner.totalReferrals}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Revenue Generated:</span>
                <span className="font-medium text-brand-blue">{partner.revenue}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="text-sm text-gray-600">
                <div><strong>Contact:</strong> {partner.contact.primaryContact}</div>
                <div>{partner.contact.email}</div>
              </div>
            </div>

            <div className="flex space-x-2 mt-4">
              <button className="btn btn-primary flex-1">View Details</button>
              <button className="btn btn-secondary">Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">User Management</h2>
        <button className="btn btn-primary">+ Add New User</button>
      </div>

      <div className="widget">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Role</th>
                <th className="text-left py-3 px-4">Department</th>
                <th className="text-left py-3 px-4">Last Login</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {adminUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-600">{user.email}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">{user.role}</td>
                  <td className="py-3 px-4">{user.department}</td>
                  <td className="py-3 px-4">{user.lastLogin}</td>
                  <td className="py-3 px-4">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="btn btn-secondary text-xs">Edit</button>
                      <button className="btn btn-secondary text-xs">Permissions</button>
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

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">System Settings</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="widget">
          <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Two-Factor Authentication</span>
              <input type="checkbox" defaultChecked className="toggle" />
            </div>
            <div className="flex justify-between items-center">
              <span>Password Expiry (days)</span>
              <input type="number" defaultValue="90" className="input-field w-20" />
            </div>
            <div className="flex justify-between items-center">
              <span>Failed Login Attempts</span>
              <input type="number" defaultValue="5" className="input-field w-20" />
            </div>
          </div>
        </div>

        <div className="widget">
          <h3 className="text-lg font-semibold mb-4">System Configuration</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Maintenance Mode</span>
              <input type="checkbox" className="toggle" />
            </div>
            <div className="flex justify-between items-center">
              <span>Debug Mode</span>
              <input type="checkbox" className="toggle" />
            </div>
            <div className="flex justify-between items-center">
              <span>Auto Backups</span>
              <input type="checkbox" defaultChecked className="toggle" />
            </div>
          </div>
        </div>

        <div className="widget">
          <h3 className="text-lg font-semibold mb-4">API Configuration</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Rate Limit (requests/minute)</label>
              <input type="number" defaultValue="1000" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">API Version</label>
              <select className="input-field">
                <option>v1.0</option>
                <option>v1.1</option>
                <option>v2.0</option>
              </select>
            </div>
          </div>
        </div>

        <div className="widget">
          <h3 className="text-lg font-semibold mb-4">Notifications</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Email Notifications</span>
              <input type="checkbox" defaultChecked className="toggle" />
            </div>
            <div className="flex justify-between items-center">
              <span>SMS Alerts</span>
              <input type="checkbox" className="toggle" />
            </div>
            <div className="flex justify-between items-center">
              <span>Push Notifications</span>
              <input type="checkbox" defaultChecked className="toggle" />
            </div>
          </div>
        </div>
      </div>

      <div className="widget">
        <h3 className="text-lg font-semibold mb-4">System Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="btn btn-secondary">
            💾 Backup System
          </button>
          <button className="btn btn-secondary">
            🔄 Restart Services
          </button>
          <button className="btn btn-secondary">
            📊 Export Logs
          </button>
          <button className="btn btn-secondary">
            🧹 Clear Cache
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'clients': return renderClients();
      case 'partners': return renderPartners();
      case 'users': return renderUsers();
      case 'settings': return renderSettings();
      default: return renderOverview();
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-white/90">
          Comprehensive system administration and management tools
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  );
}
