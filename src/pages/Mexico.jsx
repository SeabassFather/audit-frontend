import React, { useState } from "react";
import { MetricCard } from "../components/UIComponents.jsx";

export default function Mexico() {
  const [activeTab, setActiveTab] = useState('overview');

  const mexicoMetrics = [
    {
      title: "Active Projects",
      value: "23",
      change: "+4 this month",
      trend: "up",
      icon: "🏗️",
      color: "bg-gradient-to-r from-emerald-500 to-green-600"
    },
    {
      title: "Total Investment",
      value: "$12.8M",
      change: "+25.3%",
      trend: "up",
      icon: "💰",
      color: "bg-gradient-to-r from-blue-500 to-cyan-600"
    },
    {
      title: "Exchange Rate",
      value: "17.82 MXN",
      change: "+0.85%",
      trend: "up",
      icon: "💱",
      color: "bg-gradient-to-r from-yellow-500 to-orange-500"
    },
    {
      title: "Processing Time",
      value: "14 days",
      change: "-3 days",
      trend: "up",
      icon: "⏱️",
      color: "bg-gradient-to-r from-purple-500 to-indigo-600"
    }
  ];

  const projects = [
    {
      id: 1,
      name: "Estero Beach Resort Development",
      location: "Ensenada, Baja California",
      type: "Luxury Resort",
      investment: "$3.2M USD",
      status: "Active",
      completion: 65,
      buyers: 12,
      description: "Luxury beachfront resort with 50 units and marina access"
    },
    {
      id: 2,
      name: "Rosarito Residential Complex",
      location: "Rosarito, Baja California",
      type: "Residential",
      investment: "$1.8M USD",
      status: "Planning",
      completion: 15,
      buyers: 8,
      description: "Gated community with 25 luxury homes and amenities"
    },
    {
      id: 3,
      name: "Cabo Marina Village",
      location: "Los Cabos, Baja California Sur",
      type: "Mixed Use",
      investment: "$5.4M USD",
      status: "Active",
      completion: 40,
      buyers: 18,
      description: "Marina-front development with residential and commercial spaces"
    },
    {
      id: 4,
      name: "Puerto Vallarta Condos",
      location: "Puerto Vallarta, Jalisco",
      type: "Condominiums",
      investment: "$2.4M USD",
      status: "Completed",
      completion: 100,
      buyers: 24,
      description: "High-rise condominium complex with ocean views"
    }
  ];

  const complianceChecklist = [
    {
      category: "Legal Requirements",
      items: [
        { name: "Fideicomiso Setup", status: "completed", required: true },
        { name: "Mexican Bank Trust", status: "completed", required: true },
        { name: "CURP Registration", status: "completed", required: true },
        { name: "RFC Tax ID", status: "pending", required: true },
        { name: "Permits & Licenses", status: "in-progress", required: true }
      ]
    },
    {
      category: "Financial Compliance",
      items: [
        { name: "Currency Exchange Documentation", status: "completed", required: true },
        { name: "Anti-Money Laundering Check", status: "completed", required: true },
        { name: "Source of Funds Verification", status: "completed", required: true },
        { name: "Tax Obligations Review", status: "pending", required: true }
      ]
    },
    {
      category: "Property Documentation",
      items: [
        { name: "Property Title Verification", status: "completed", required: true },
        { name: "Environmental Impact Assessment", status: "in-progress", required: false },
        { name: "Survey and Appraisal", status: "completed", required: true },
        { name: "Insurance Coverage", status: "pending", required: true }
      ]
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '🏠' },
    { id: 'projects', label: 'Projects', icon: '🏗️' },
    { id: 'compliance', label: 'Compliance', icon: '📋' },
    { id: 'financing', label: 'Financing', icon: '💰' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Planning': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return '✅';
      case 'in-progress': return '⏳';
      case 'pending': return '⏸️';
      default: return '📋';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mexicoMetrics.map((metric, index) => (
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
        <div className="widget">
          <h3 className="text-lg font-semibold mb-4">Market Overview</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Baja California (Primary Market)</span>
              <span className="font-medium text-green-600">Strong Growth</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Los Cabos (Luxury Segment)</span>
              <span className="font-medium text-blue-600">High Demand</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Puerto Vallarta (Tourism Hub)</span>
              <span className="font-medium text-yellow-600">Stable</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Riviera Maya (Emerging)</span>
              <span className="font-medium text-purple-600">Developing</span>
            </div>
          </div>
        </div>

        <div className="widget">
          <h3 className="text-lg font-semibold mb-4">Regulatory Updates</h3>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <div className="font-medium text-blue-900">New Foreign Investment Guidelines</div>
              <div className="text-sm text-blue-700">Updated requirements for foreign property ownership through fideicomiso</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
              <div className="font-medium text-green-900">Simplified Permit Process</div>
              <div className="text-sm text-green-700">Streamlined construction permits for residential developments</div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <div className="font-medium text-yellow-900">Tax Law Changes</div>
              <div className="text-sm text-yellow-700">New tax obligations for foreign property owners</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="widget">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">{project.name}</h3>
                <p className="text-gray-600">{project.location}</p>
                <p className="text-sm text-gray-500">{project.type}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-4">{project.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm text-gray-600">Investment</div>
                <div className="font-medium">{project.investment}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">US Buyers</div>
                <div className="font-medium">{project.buyers}</div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Completion</span>
                <span>{project.completion}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-brand-green to-brand-blue h-2 rounded-full"
                  style={{ width: `${project.completion}%` }}
                ></div>
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="btn btn-primary flex-1">View Details</button>
              <button className="btn btn-secondary">📊 Reports</button>
              <button className="btn btn-secondary">📍 Location</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCompliance = () => (
    <div className="space-y-6">
      {complianceChecklist.map((category, index) => (
        <div key={index} className="widget">
          <h3 className="text-lg font-semibold mb-4">{category.category}</h3>
          <div className="space-y-3">
            {category.items.map((item, itemIndex) => (
              <div key={itemIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{getStatusIcon(item.status)}</span>
                  <div>
                    <div className="font-medium">{item.name}</div>
                    {item.required && (
                      <div className="text-xs text-red-600">Required</div>
                    )}
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                  {item.status.replace('-', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderFinancing = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="widget">
          <h3 className="text-lg font-semibold mb-4">Financing Options</h3>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Developer Financing</h4>
              <p className="text-sm text-gray-600 mt-1">Direct financing through Mexican developers</p>
              <div className="text-sm mt-2">
                <span className="text-green-600">✓ Lower down payment</span>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Mexican Bank Loans</h4>
              <p className="text-sm text-gray-600 mt-1">Traditional mortgage through Mexican banks</p>
              <div className="text-sm mt-2">
                <span className="text-green-600">✓ Competitive rates</span>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">US Hard Money</h4>
              <p className="text-sm text-gray-600 mt-1">Bridge financing from US lenders</p>
              <div className="text-sm mt-2">
                <span className="text-green-600">✓ Fast approval</span>
              </div>
            </div>
          </div>
        </div>

        <div className="widget">
          <h3 className="text-lg font-semibold mb-4">Currency Exchange</h3>
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">USD to MXN</div>
                  <div className="text-sm text-gray-600">Current Rate</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold">17.82</div>
                  <div className="text-sm text-green-600">+0.85%</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Weekly High</span>
                <span className="text-sm font-medium">18.05</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Weekly Low</span>
                <span className="text-sm font-medium">17.45</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Monthly Average</span>
                <span className="text-sm font-medium">17.73</span>
              </div>
            </div>

            <button className="btn btn-primary w-full">
              💱 Currency Calculator
            </button>
          </div>
        </div>
      </div>

      <div className="widget">
        <h3 className="text-lg font-semibold mb-4">Partner Lenders</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg text-center">
            <div className="text-2xl mb-2">🏦</div>
            <h4 className="font-medium">Banco de Mexico</h4>
            <p className="text-sm text-gray-600">Traditional banking partner</p>
            <div className="text-xs text-green-600 mt-2">Rates from 8.5%</div>
          </div>
          <div className="p-4 border rounded-lg text-center">
            <div className="text-2xl mb-2">🏢</div>
            <h4 className="font-medium">BBVA Mexico</h4>
            <p className="text-sm text-gray-600">International banking</p>
            <div className="text-xs text-green-600 mt-2">US citizen friendly</div>
          </div>
          <div className="p-4 border rounded-lg text-center">
            <div className="text-2xl mb-2">💼</div>
            <h4 className="font-medium">Private Lenders</h4>
            <p className="text-sm text-gray-600">Alternative financing</p>
            <div className="text-xs text-blue-600 mt-2">Fast approval</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'projects': return renderProjects();
      case 'compliance': return renderCompliance();
      case 'financing': return renderFinancing();
      default: return renderOverview();
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-700 rounded-2xl p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">🇲🇽 Mexico/US Cross-Border</h1>
            <p className="text-white/90 mt-2">
              Real estate investment and lending solutions for US buyers in Mexico
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-90">Exchange Rate</div>
            <div className="text-xl font-bold">$1 USD = 17.82 MXN</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white'
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

      {/* Quick Actions */}
      <div className="widget">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="btn btn-primary flex flex-col items-center p-4">
            <span className="text-lg mb-2">🏠</span>
            <span className="text-sm">New Project</span>
          </button>
          <button className="btn btn-secondary flex flex-col items-center p-4">
            <span className="text-lg mb-2">📋</span>
            <span className="text-sm">Compliance Check</span>
          </button>
          <button className="btn btn-secondary flex flex-col items-center p-4">
            <span className="text-lg mb-2">💱</span>
            <span className="text-sm">Exchange Rate</span>
          </button>
          <button className="btn btn-secondary flex flex-col items-center p-4">
            <span className="text-lg mb-2">🤝</span>
            <span className="text-sm">Partner Network</span>
          </button>
        </div>
      </div>
    </div>
  );
}