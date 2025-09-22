import React from "react";
import { NavLink } from "react-router-dom";

const stats = [
  { label: "Active Audits", value: "1,247", change: "+12%", color: "text-green-600" },
  { label: "Total Recovery", value: "$2.8M", change: "+23%", color: "text-blue-600" },
  { label: "Success Rate", value: "94.2%", change: "+2.1%", color: "text-purple-600" },
  { label: "Active Clients", value: "356", change: "+8%", color: "text-orange-600" },
];

const quickActions = [
  { to: "/services", label: "Start New Audit", icon: "🔍", description: "Launch a comprehensive financial audit" },
  { to: "/uploads", label: "Upload Documents", icon: "📁", description: "Upload client documents for processing" },
  { to: "/audit-engines", label: "AI Analysis", icon: "🤖", description: "Access AI-powered audit tools" },
  { to: "/mexico-loans", label: "Mexico RE/Loans", icon: "🏠", description: "Cross-border real estate services" },
];

const recentActivity = [
  { type: "audit", client: "Jane Grower", action: "Mortgage audit completed", amount: "$3,240", time: "2 hours ago" },
  { type: "recovery", client: "Marco Buyer", action: "Recovery payment received", amount: "$1,850", time: "4 hours ago" },
  { type: "upload", client: "Lee Driver", action: "Documents uploaded", amount: "", time: "6 hours ago" },
  { type: "audit", client: "Sarah Martinez", action: "Insurance audit initiated", amount: "$1,200", time: "1 day ago" },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's your AuditDNA overview.</p>
        </div>
        <NavLink to="/services" className="btn btn-primary">
          Start New Audit
        </NavLink>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="card-simple">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`text-sm font-medium ${stat.color}`}>
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <NavLink 
              key={index} 
              to={action.to}
              className="p-4 rounded-lg border border-gray-200 hover:border-ocean-300 hover:bg-ocean-50 transition-all duration-200 group"
            >
              <div className="text-2xl mb-2">{action.icon}</div>
              <h3 className="font-medium text-gray-900 group-hover:text-ocean-700">{action.label}</h3>
              <p className="text-sm text-gray-600 mt-1">{action.description}</p>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
          <NavLink to="/admin" className="text-sm text-ocean-600 hover:text-ocean-700 font-medium">
            View All
          </NavLink>
        </div>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  activity.type === 'audit' ? 'bg-blue-100 text-blue-600' :
                  activity.type === 'recovery' ? 'bg-green-100 text-green-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {activity.type === 'audit' ? '🔍' : activity.type === 'recovery' ? '💰' : '📁'}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{activity.client}</p>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                </div>
              </div>
              <div className="text-right">
                {activity.amount && <p className="font-medium text-gray-900">{activity.amount}</p>}
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}