import React, { useState } from "react";
import { partners } from "../data/clientsData.js";
import { MetricCard, EmptyState } from "../components/UIComponents.jsx";

export default function Partners() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const partnerMetrics = [
    {
      title: "Active Partners",
      value: partners.filter(p => p.status === 'Active').length.toString(),
      change: "+2 this quarter",
      trend: "up",
      icon: "🤝",
      color: "bg-gradient-to-r from-green-500 to-green-600"
    },
    {
      title: "Total Referrals",
      value: partners.reduce((sum, p) => sum + p.totalReferrals, 0).toString(),
      change: "+45 this month",
      trend: "up",
      icon: "📈",
      color: "bg-gradient-to-r from-blue-500 to-blue-600"
    },
    {
      title: "Partner Revenue",
      value: "$636,500",
      change: "+18.7%",
      trend: "up",
      icon: "💰",
      color: "bg-gradient-to-r from-yellow-500 to-orange-500"
    },
    {
      title: "Avg Commission",
      value: "7.2%",
      change: "+0.5%",
      trend: "up",
      icon: "📊",
      color: "bg-gradient-to-r from-purple-500 to-purple-600"
    }
  ];

  const partnerTypes = [
    { id: 'all', label: 'All Partners' },
    { id: 'Financial Institution', label: 'Financial Institutions' },
    { id: 'Specialty Lender', label: 'Specialty Lenders' },
    { id: 'Technology Partner', label: 'Technology Partners' },
    { id: 'Consulting Firm', label: 'Consulting Firms' }
  ];

  const filteredPartners = selectedFilter === 'all' 
    ? partners 
    : partners.filter(partner => partner.type === selectedFilter);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Financial Institution': return '🏦';
      case 'Specialty Lender': return '💼';
      case 'Technology Partner': return '💻';
      case 'Consulting Firm': return '🎯';
      default: return '🤝';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-700 rounded-2xl p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Partner Management</h1>
            <p className="text-white/90 mt-2">
              Manage strategic partnerships and track collaboration metrics
            </p>
          </div>
          <button className="btn bg-white text-green-600 hover:bg-gray-100">
            + Add New Partner
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {partnerMetrics.map((metric, index) => (
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

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {partnerTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedFilter(type.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedFilter === type.id
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Partners Grid */}
      {filteredPartners.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPartners.map((partner) => (
            <div key={partner.id} className="widget card-hover">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{getTypeIcon(partner.type)}</div>
                  <div>
                    <h3 className="font-semibold text-xl">{partner.name}</h3>
                    <p className="text-gray-600">{partner.type}</p>
                    <p className="text-sm text-gray-500">Partner since {partner.partnerSince}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(partner.status)}`}>
                  {partner.status}
                </span>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{partner.totalReferrals}</div>
                  <div className="text-sm text-gray-600">Total Referrals</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{partner.revenue}</div>
                  <div className="text-sm text-gray-600">Revenue Generated</div>
                </div>
              </div>

              {/* Commission & Services */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Commission Rate:</span>
                  <span className="font-medium">{partner.commission}</span>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-2">Services Offered:</div>
                  <div className="flex flex-wrap gap-2">
                    {partner.servicesOffered.map((service, index) => (
                      <span 
                        key={index}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Primary Contact</h4>
                <div className="space-y-1 text-sm">
                  <div><strong>{partner.contact.primaryContact}</strong></div>
                  <div className="text-gray-600">{partner.contact.email}</div>
                  <div className="text-gray-600">{partner.contact.phone}</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button className="btn btn-primary flex-1">
                  View Details
                </button>
                <button className="btn btn-secondary">
                  📧 Contact
                </button>
                <button className="btn btn-secondary">
                  📊 Reports
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon="🤝"
          title="No partners found"
          description="No partners match the selected criteria."
          action={
            <button 
              onClick={() => setSelectedFilter('all')}
              className="btn btn-primary"
            >
              Show All Partners
            </button>
          }
        />
      )}

      {/* Partnership Performance */}
      <div className="widget">
        <h3 className="text-lg font-semibold mb-6">Partnership Performance</h3>
        <div className="space-y-4">
          {partners.map((partner, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <span className="text-2xl">{getTypeIcon(partner.type)}</span>
                <div>
                  <div className="font-medium">{partner.name}</div>
                  <div className="text-sm text-gray-600">{partner.totalReferrals} referrals</div>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <div className="font-medium">{partner.revenue}</div>
                  <div className="text-sm text-gray-600">Revenue</div>
                </div>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                    style={{ width: `${Math.min((partner.totalReferrals / 200) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600 w-12 text-center">
                  {Math.round((partner.totalReferrals / 200) * 100)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="widget">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="btn btn-primary flex flex-col items-center p-4">
            <span className="text-lg mb-2">🤝</span>
            <span className="text-sm">Add Partner</span>
          </button>
          <button className="btn btn-secondary flex flex-col items-center p-4">
            <span className="text-lg mb-2">📋</span>
            <span className="text-sm">New Agreement</span>
          </button>
          <button className="btn btn-secondary flex flex-col items-center p-4">
            <span className="text-lg mb-2">📊</span>
            <span className="text-sm">Performance Report</span>
          </button>
          <button className="btn btn-secondary flex flex-col items-center p-4">
            <span className="text-lg mb-2">💰</span>
            <span className="text-sm">Commission Report</span>
          </button>
        </div>
      </div>
    </div>
  );
}