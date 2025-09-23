import React, { useState } from 'react';
import { futureExpansionRoadmap, nextGenerationFeatures, marketingAutomation2026 } from '../data/futureExpansionData';

export default function FutureExpansion() {
  const [activeTab, setActiveTab] = useState('roadmap');
  const [selectedInitiative, setSelectedInitiative] = useState(null);

  const tabs = [
    { id: 'roadmap', label: '2026-2030 Roadmap', icon: '🗺️' },
    { id: 'nextgen', label: 'Next-Gen Features', icon: '🚀' },
    { id: 'marketing', label: 'Marketing 2026', icon: '📱' },
    { id: 'technology', label: 'Technology Stack', icon: '⚡' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'planning': return 'bg-blue-100 text-blue-800';
      case 'research': return 'bg-purple-100 text-purple-800';
      case 'development': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return '🟢';
      case 'planning': return '🔵';
      case 'research': return '🟣';
      case 'development': return '🟡';
      default: return '⚪';
    }
  };

  const renderRoadmap = () => (
    <div className="space-y-6">
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Future Expansion Roadmap (2026-2030)</h2>
            <p className="text-slate-600 mt-2">{futureExpansionRoadmap.overview.description}</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">{futureExpansionRoadmap.overview.projectedRevenue}</div>
            <div className="text-sm text-slate-500">Projected Revenue</div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{futureExpansionRoadmap.overview.totalInitiatives}</div>
            <div className="text-sm text-slate-600">Total Initiatives</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{futureExpansionRoadmap.overview.estimatedInvestment}</div>
            <div className="text-sm text-slate-600">Investment</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{futureExpansionRoadmap.overview.keyTechnologies.length}</div>
            <div className="text-sm text-slate-600">Key Technologies</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">6 Years</div>
            <div className="text-sm text-slate-600">Timeline</div>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-3">Key Technologies</h3>
          <div className="flex flex-wrap gap-2">
            {futureExpansionRoadmap.overview.keyTechnologies.map((tech, index) => (
              <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {futureExpansionRoadmap.phases.map((phase, index) => (
        <div key={phase.id} className="card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-800">{phase.name}</h3>
              <p className="text-slate-600">{phase.timeline}</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-green-600">{phase.budget}</div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(phase.status)}`}>
                {phase.status}
              </span>
            </div>
          </div>

          <div className="grid gap-6">
            {phase.initiatives.map((initiative) => (
              <div key={initiative.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-xl">{getStatusIcon(initiative.status)}</span>
                      <h4 className="text-lg font-semibold text-slate-800">{initiative.name}</h4>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(initiative.status)}`}>
                        {initiative.status}
                      </span>
                    </div>
                    <p className="text-slate-600 mb-3">{initiative.description}</p>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-lg font-bold text-blue-600">{initiative.budget}</div>
                    <div className="text-sm text-green-600">ROI: {initiative.roi}</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-slate-700 mb-3">Key Features:</h5>
                    <ul className="text-sm text-slate-600 space-y-2">
                      {initiative.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2">
                          <span className="text-blue-500">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-slate-700 mb-3">Technologies:</h5>
                    <div className="flex flex-wrap gap-2">
                      {initiative.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex space-x-3">
                  <button 
                    className="btn btn-primary text-sm"
                    onClick={() => setSelectedInitiative(initiative)}
                  >
                    View Details
                  </button>
                  <button className="btn btn-secondary text-sm">Track Progress</button>
                  <button className="btn btn-outline text-sm">Export Plan</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderNextGen = () => (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Next-Generation Features</h2>
        
        <div className="grid gap-6">
          {Object.entries(nextGenerationFeatures).map(([category, features]) => (
            <div key={category} className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4 capitalize">{category} Features</h3>
              
              <div className="grid gap-4">
                {Object.entries(features).map(([featureKey, feature]) => (
                  <div key={featureKey} className="border-l-4 border-blue-500 pl-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-slate-800">{featureKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h4>
                      {feature.status && (
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(feature.status)}`}>
                          {feature.status}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 text-sm mb-3">{feature.description}</p>
                    
                    {feature.features && (
                      <div className="mb-3">
                        <h5 className="text-sm font-medium text-slate-700 mb-2">Capabilities:</h5>
                        <div className="grid md:grid-cols-2 gap-2">
                          {feature.features.map((capability, index) => (
                            <div key={index} className="text-xs text-slate-600 flex items-center space-x-1">
                              <span className="text-green-500">✓</span>
                              <span>{capability}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {feature.capabilities && (
                      <div className="mb-3">
                        <h5 className="text-sm font-medium text-slate-700 mb-2">Technical Capabilities:</h5>
                        <div className="grid md:grid-cols-2 gap-2">
                          {feature.capabilities.map((capability, index) => (
                            <div key={index} className="text-xs text-slate-600 flex items-center space-x-1">
                              <span className="text-blue-500">•</span>
                              <span>{capability}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {feature.timeline && (
                      <div className="text-xs text-slate-500">
                        Timeline: <span className="font-medium">{feature.timeline}</span>
                      </div>
                    )}

                    {feature.deploymentScale && (
                      <div className="mt-2 grid md:grid-cols-2 gap-4 text-xs">
                        <div>Scale: <span className="font-medium">{feature.deploymentScale}</span></div>
                        <div>Coverage: <span className="font-medium">{feature.coverage}</span></div>
                      </div>
                    )}

                    {feature.network && (
                      <div className="mt-2 grid md:grid-cols-2 gap-4 text-xs">
                        <div>Network: <span className="font-medium">{feature.network}</span></div>
                        <div>Scalability: <span className="font-medium">{feature.scalability}</span></div>
                      </div>
                    )}

                    {feature.processing && (
                      <div className="mt-2 grid md:grid-cols-2 gap-4 text-xs">
                        <div>Processing: <span className="font-medium">{feature.processing}</span></div>
                        <div>Accuracy: <span className="font-medium">{feature.accuracy}</span></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMarketing2026 = () => (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Marketing Automation 2026</h2>
        
        <div className="grid gap-6">
          {marketingAutomation2026.campaigns.map((campaign, index) => (
            <div key={campaign.id} className="border rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-800">{campaign.name}</h3>
                  <p className="text-slate-600">{campaign.type} • {campaign.timeline}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">{campaign.budget}</div>
                  <div className="text-sm text-slate-500">Budget</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-medium text-slate-700 mb-3">Channels:</h4>
                  <div className="flex flex-wrap gap-2">
                    {campaign.channels.map((channel, channelIndex) => (
                      <span key={channelIndex} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {channel}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-slate-700 mb-3">Key Features:</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    {campaign.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <span className="text-green-500">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-slate-700 mb-3">Key Performance Indicators:</h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Object.entries(campaign.kpis).map(([kpi, value]) => (
                    <div key={kpi} className="text-center p-3 bg-slate-50 rounded-lg">
                      <div className="text-lg font-bold text-slate-800">{value}</div>
                      <div className="text-xs text-slate-500 capitalize">{kpi.replace(/([A-Z])/g, ' $1')}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex space-x-3">
                <button className="btn btn-primary">Launch Campaign</button>
                <button className="btn btn-secondary">Preview</button>
                <button className="btn btn-outline">Analytics</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTechnology = () => (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Technology Stack Overview</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(nextGenerationFeatures).map(([category, features]) => (
            <div key={category} className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold text-slate-800 mb-3 capitalize">{category}</h3>
              <div className="space-y-3">
                {Object.entries(features).map(([featureKey, feature]) => (
                  <div key={featureKey} className="text-sm">
                    <div className="font-medium text-slate-700 mb-1">
                      {featureKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </div>
                    {feature.status && (
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(feature.status)}`}>
                        {feature.status}
                      </span>
                    )}
                    {feature.timeline && (
                      <div className="text-xs text-slate-500 mt-1">
                        {feature.timeline}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Implementation Timeline</h3>
        <div className="space-y-4">
          {futureExpansionRoadmap.phases.map((phase, index) => (
            <div key={phase.id} className="flex items-center space-x-4 p-4 border rounded-lg">
              <div className="w-16 text-center">
                <div className="text-sm font-bold text-slate-800">{phase.timeline.split(' - ')[0]}</div>
              </div>
              <div className="flex-1">
                <div className="font-medium text-slate-800">{phase.name}</div>
                <div className="text-sm text-slate-600">{phase.initiatives.length} initiatives • {phase.budget}</div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(phase.status)}`}>
                {phase.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-800">Future Expansion (2026-2030)</h1>
        <div className="flex space-x-2">
          <button className="btn btn-primary">📊 Analytics</button>
          <button className="btn btn-secondary">📋 Export Roadmap</button>
          <button className="btn btn-outline">⚙️ Settings</button>
        </div>
      </div>

      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {activeTab === 'roadmap' && renderRoadmap()}
      {activeTab === 'nextgen' && renderNextGen()}
      {activeTab === 'marketing' && renderMarketing2026()}
      {activeTab === 'technology' && renderTechnology()}

      {selectedInitiative && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-800">{selectedInitiative.name}</h3>
              <button 
                onClick={() => setSelectedInitiative(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>
            <p className="text-slate-600 mb-4">{selectedInitiative.description}</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-slate-700 mb-2">Budget: {selectedInitiative.budget}</h4>
                <h4 className="font-medium text-slate-700 mb-2">Expected ROI: {selectedInitiative.roi}</h4>
              </div>
              <div>
                <h4 className="font-medium text-slate-700 mb-2">Status:</h4>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedInitiative.status)}`}>
                  {selectedInitiative.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}