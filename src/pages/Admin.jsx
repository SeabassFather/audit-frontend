import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const adminStats = [
  { label: "Total Users", value: "2,847", change: "+12%", icon: "👥" },
  { label: "Active Cases", value: "1,247", change: "+8%", icon: "📁" },
  { label: "Monthly Revenue", value: "$42.8K", change: "+23%", icon: "💰" },
  { label: "System Health", value: "99.8%", change: "+0.1%", icon: "💚" },
];

const adminTabs = [
  { id: "overview", label: "Overview", icon: "📊" },
  { id: "users", label: "User Management", icon: "👥" },
  { id: "cases", label: "Case Management", icon: "📁" },
  { id: "system", label: "System Settings", icon: "⚙️" },
  { id: "reports", label: "Reports", icon: "📈" },
];

const recentActivity = [
  { type: "user", message: "New user registration: john.doe@email.com", time: "5 min ago", status: "info" },
  { type: "case", message: "Case CASE-1045 completed successfully", time: "12 min ago", status: "success" },
  { type: "system", message: "System backup completed", time: "1 hour ago", status: "success" },
  { type: "alert", message: "High API usage detected", time: "2 hours ago", status: "warning" },
  { type: "error", message: "Payment processing error for case CASE-1043", time: "3 hours ago", status: "error" },
];

const systemMetrics = [
  { name: "API Response Time", value: "245ms", status: "good" },
  { name: "Database Performance", value: "Optimal", status: "good" },
  { name: "Storage Usage", value: "67%", status: "warning" },
  { name: "Error Rate", value: "0.02%", status: "good" },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState("overview");

  const getStatusColor = (status) => {
    switch (status) {
      case "success": return "text-green-600 bg-green-100";
      case "warning": return "text-yellow-600 bg-yellow-100";
      case "error": return "text-red-600 bg-red-100";
      default: return "text-blue-600 bg-blue-100";
    }
  };

  const getMetricStatus = (status) => {
    switch (status) {
      case "good": return "bg-green-500";
      case "warning": return "bg-yellow-500";
      case "error": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Portal</h1>
          <p className="text-gray-600 mt-2">Manage users, cases, system settings, and monitor platform health.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-outline">
            Export Data
          </button>
          <button className="btn btn-primary">
            System Backup
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminStats.map((stat, index) => (
          <div key={index} className="card-simple">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-2xl mb-1">{stat.icon}</span>
                <span className="text-sm font-medium text-green-600">{stat.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Admin Tabs */}
      <div className="card">
        <div className="border-b border-gray-200 mb-6">
          <div className="flex gap-1">
            {adminTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-t-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-ocean-50 text-ocean-700 border-b-2 border-ocean-500"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* System Metrics */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {systemMetrics.map((metric, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">{metric.name}</span>
                      <div className={`w-3 h-3 rounded-full ${getMetricStatus(metric.status)}`}></div>
                    </div>
                    <span className="text-lg font-semibold text-gray-900">{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 ${getMetricStatus(activity.status)}`}></div>
                    <div className="flex-1">
                      <p className="text-gray-900">{activity.message}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                      {activity.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
              <button className="btn btn-primary">Add New User</button>
            </div>
            <div className="text-center py-12 text-gray-500">
              <div className="text-4xl mb-4">👥</div>
              <p>User management interface will be implemented here</p>
            </div>
          </div>
        )}

        {activeTab === "cases" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Case Management</h3>
              <button className="btn btn-primary">Export Cases</button>
            </div>
            <div className="text-center py-12 text-gray-500">
              <div className="text-4xl mb-4">📁</div>
              <p>Case management interface will be implemented here</p>
            </div>
          </div>
        )}

        {activeTab === "system" && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">System Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">General Settings</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-gray-700">Enable email notifications</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-gray-700">Auto-backup enabled</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-700">Maintenance mode</span>
                  </label>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Security Settings</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-gray-700">Two-factor authentication required</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-gray-700">Session timeout (30 min)</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-gray-700">Audit logging enabled</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "reports" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Reports & Analytics</h3>
              <button className="btn btn-primary">Generate Report</button>
            </div>
            <div className="text-center py-12 text-gray-500">
              <div className="text-4xl mb-4">📈</div>
              <p>Reports and analytics dashboard will be implemented here</p>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="card bg-gradient-to-r from-ocean-50 to-blue-50 border-ocean-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="btn btn-outline">
            🔄 Restart System
          </button>
          <button className="btn btn-outline">
            📊 View System Logs
          </button>
          <button className="btn btn-outline">
            🛠️ Run Diagnostics
          </button>
        </div>
      </div>
    </div>
  );
}
