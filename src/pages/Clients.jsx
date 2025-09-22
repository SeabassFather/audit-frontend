import React, { useState } from "react";
import { clients } from "../data/clientsData.js";
import { MetricCard, EmptyState, LoadingSpinner } from "../components/UIComponents.jsx";

export default function Clients() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const clientMetrics = [
    {
      title: "Total Clients",
      value: clients.length.toString(),
      change: "+12 this month",
      trend: "up",
      icon: "👥",
      color: "bg-gradient-to-r from-blue-500 to-blue-600"
    },
    {
      title: "Active Clients",
      value: clients.filter(c => c.status === 'Active').length.toString(),
      change: "+8.5%",
      trend: "up",
      icon: "✅",
      color: "bg-gradient-to-r from-green-500 to-green-600"
    },
    {
      title: "Total Revenue",
      value: "$325,470",
      change: "+15.2%",
      trend: "up",
      icon: "💰",
      color: "bg-gradient-to-r from-yellow-500 to-orange-500"
    },
    {
      title: "Avg Contract Value",
      value: "$12,850",
      change: "+5.7%",
      trend: "up",
      icon: "📊",
      color: "bg-gradient-to-r from-purple-500 to-purple-600"
    }
  ];

  const filters = [
    { id: 'all', label: 'All Clients' },
    { id: 'active', label: 'Active' },
    { id: 'pending', label: 'Pending' },
    { id: 'individual', label: 'Individual' },
    { id: 'business', label: 'Business' }
  ];

  const filteredClients = clients.filter(client => {
    const matchesFilter = selectedFilter === 'all' || 
      client.status.toLowerCase() === selectedFilter ||
      client.type.toLowerCase() === selectedFilter;
    
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    return type === 'Business' ? '🏢' : '👤';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-2xl p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Client Management</h1>
            <p className="text-white/90 mt-2">
              Manage your client relationships and track business metrics
            </p>
          </div>
          <button className="btn bg-white text-blue-600 hover:bg-gray-100">
            + Add New Client
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {clientMetrics.map((metric, index) => (
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

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search clients by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedFilter === filter.id
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Client List */}
      {filteredClients.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <div key={client.id} className="widget card-hover">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{getTypeIcon(client.type)}</div>
                  <div>
                    <h3 className="font-semibold text-lg">{client.name}</h3>
                    <p className="text-sm text-gray-600">{client.type}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                  {client.status}
                </span>
              </div>

              <div className="space-y-3">
                <div className="text-sm">
                  <p className="text-gray-600">Email:</p>
                  <p className="font-medium">{client.contact.email}</p>
                </div>
                <div className="text-sm">
                  <p className="text-gray-600">Phone:</p>
                  <p className="font-medium">{client.contact.phone}</p>
                </div>
                <div className="text-sm">
                  <p className="text-gray-600">Total Spent:</p>
                  <p className="font-medium text-brand-blue">{client.totalSpent}</p>
                </div>
                <div className="text-sm">
                  <p className="text-gray-600">Join Date:</p>
                  <p className="font-medium">{client.joinDate}</p>
                </div>
              </div>

              <div className="mt-4">
                <div className="text-sm text-gray-600 mb-2">Services Used:</div>
                <div className="flex flex-wrap gap-1">
                  {client.servicesUsed.slice(0, 2).map((service, index) => (
                    <span 
                      key={index}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs"
                    >
                      {service}
                    </span>
                  ))}
                  {client.servicesUsed.length > 2 && (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs">
                      +{client.servicesUsed.length - 2} more
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="text-xs text-gray-500 mb-3">
                  Recent: {client.recentActivity}
                </div>
                <div className="flex space-x-2">
                  <button className="btn btn-primary flex-1 text-sm">
                    View Details
                  </button>
                  <button className="btn btn-secondary text-sm">
                    📧
                  </button>
                  <button className="btn btn-secondary text-sm">
                    📞
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon="👥"
          title="No clients found"
          description={`No clients match your search "${searchTerm}" with the selected filters.`}
          action={
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedFilter('all');
              }}
              className="btn btn-primary"
            >
              Clear filters
            </button>
          }
        />
      )}

      {/* Quick Actions */}
      <div className="widget">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="btn btn-primary flex flex-col items-center p-4">
            <span className="text-lg mb-2">👥</span>
            <span className="text-sm">Add Client</span>
          </button>
          <button className="btn btn-secondary flex flex-col items-center p-4">
            <span className="text-lg mb-2">📧</span>
            <span className="text-sm">Send Newsletter</span>
          </button>
          <button className="btn btn-secondary flex flex-col items-center p-4">
            <span className="text-lg mb-2">📊</span>
            <span className="text-sm">Generate Report</span>
          </button>
          <button className="btn btn-secondary flex flex-col items-center p-4">
            <span className="text-lg mb-2">📥</span>
            <span className="text-sm">Import Clients</span>
          </button>
        </div>
      </div>
    </div>
  );
}