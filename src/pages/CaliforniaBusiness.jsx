import React, { useState, useEffect } from 'react';
import { businessEmpireChecklist, revenueOptimization, subscriptionTiers, enterpriseSolutions } from '../data/businessEmpireData';

export default function CaliforniaBusiness() {
  const [activeTab, setActiveTab] = useState('timeline');
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [checklistStates, setChecklistStates] = useState({});

  useEffect(() => {
    // Initialize checklist states
    const initialStates = {};
    businessEmpireChecklist.phases.forEach(phase => {
      phase.milestones.forEach(milestone => {
        milestone.checklist.forEach(item => {
          initialStates[`${milestone.id}-${item.item}`] = item.completed;
        });
      });
    });
    setChecklistStates(initialStates);
  }, []);

  const handleChecklistToggle = (milestoneId, itemName) => {
    const key = `${milestoneId}-${itemName}`;
    setChecklistStates(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return '✅';
      case 'active': return '🔄';
      case 'planning': return '📋';
      default: return '⚪';
    }
  };

  const tabs = [
    { id: 'timeline', label: 'Timeline & Features', icon: '📅' },
    { id: 'domination', label: 'World Domination', icon: '🌍' },
    { id: 'revenue', label: 'Revenue Optimization', icon: '💰' },
    { id: 'subscriptions', label: 'Subscription Tiers', icon: '🎯' },
    { id: 'enterprise', label: 'Enterprise Solutions', icon: '🏢' },
    { id: 'marketing', label: 'Marketing & Production', icon: '📈' }
  ];

  const renderTimeline = () => (
    <div className="space-y-6">
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">California Business Empire Checklist</h2>
            <p className="text-slate-600 mt-2">{businessEmpireChecklist.overview.description}</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{businessEmpireChecklist.overview.completionRate}%</div>
            <div className="text-sm text-slate-500">Complete</div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{businessEmpireChecklist.overview.totalMilestones}</div>
            <div className="text-sm text-slate-600">Total Milestones</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{businessEmpireChecklist.overview.estimatedTimeframe}</div>
            <div className="text-sm text-slate-600">Timeline</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">Active</div>
            <div className="text-sm text-slate-600">Status</div>
          </div>
        </div>
      </div>

      {businessEmpireChecklist.phases.map((phase, index) => (
        <div key={phase.id} className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{getStatusIcon(phase.status)}</div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800">{phase.name}</h3>
                <p className="text-slate-600">{phase.timeline}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(phase.status)}`}>
                {phase.status}
              </span>
              <div className="text-right">
                <div className="text-lg font-bold text-slate-800">{phase.completion}%</div>
                <div className="text-xs text-slate-500">Complete</div>
              </div>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${phase.completion}%` }}
            ></div>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
            {phase.milestones.map((milestone) => (
              <div key={milestone.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-slate-800">{milestone.name}</h4>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(milestone.status)}`}>
                    {milestone.status}
                  </span>
                </div>
                
                <div className="text-sm text-slate-600 mb-3">
                  <div>Due: {milestone.dueDate}</div>
                  <div>Assignee: {milestone.assignee}</div>
                  <div>Priority: {milestone.priority}</div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="text-sm font-medium text-slate-700">Checklist:</div>
                  {milestone.checklist.map((item, itemIndex) => (
                    <label key={itemIndex} className="flex items-center space-x-2 text-sm">
                      <input
                        type="checkbox"
                        checked={checklistStates[`${milestone.id}-${item.item}`] || false}
                        onChange={() => handleChecklistToggle(milestone.id, item.item)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className={`${item.required ? 'font-medium' : ''} ${checklistStates[`${milestone.id}-${item.item}`] ? 'line-through text-slate-400' : ''}`}>
                        {item.item} {item.required && <span className="text-red-500">*</span>}
                      </span>
                    </label>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium text-slate-700">Sub-Features:</div>
                  {milestone.subFeatures?.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center justify-between text-sm">
                      <span>{feature.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs ${getStatusColor(feature.status)}`}>
                          {feature.status}
                        </span>
                        <button className="text-blue-600 hover:underline">View</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderWorldDomination = () => (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">World Domination Mapping</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {businessEmpireChecklist.features.worldDominationMapping.regions.map((region, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-slate-800">{region.name}</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(region.status)}`}>
                  {region.status}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
                  style={{ width: `${region.completion}%` }}
                ></div>
              </div>
              <div className="text-sm text-slate-600">
                {region.completion}% Complete • Priority: {region.priority}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Post-Launch Metrics</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {businessEmpireChecklist.features.postLaunchMetrics.kpis.map((kpi, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="text-lg font-semibold text-slate-800">{kpi.name}</div>
              <div className="flex items-center justify-between mt-2">
                <div>
                  <div className="text-xl font-bold text-blue-600">{kpi.current}</div>
                  <div className="text-sm text-slate-500">Target: {kpi.target}</div>
                </div>
                <div className={`text-sm font-medium ${kpi.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {kpi.growth}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRevenue = () => (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Revenue Optimization Strategies</h2>
        
        <div className="grid gap-6">
          {revenueOptimization.strategies.map((strategy, index) => (
            <div key={strategy.id} className="border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-800">{strategy.name}</h3>
                  <p className="text-slate-600">{strategy.timeline}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">{strategy.estimatedRevenue}</div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(strategy.status)}`}>
                    {strategy.status}
                  </span>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div 
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                  style={{ width: `${strategy.implementation}%` }}
                ></div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-slate-700 mb-2">Implementation Details:</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    {strategy.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center space-x-2">
                        <span className="text-green-500">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-slate-700 mb-2">Key Metrics:</h4>
                  <div className="text-sm text-slate-600 space-y-1">
                    <div>Impact: <span className="font-medium">{strategy.impact}</span></div>
                    <div>Implementation: <span className="font-medium">{strategy.implementation}%</span></div>
                    <div>Revenue Target: <span className="font-medium">{strategy.estimatedRevenue}</span></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Monetization Strategies</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {revenueOptimization.monetizationStrategies.map((strategy, index) => (
            <div key={strategy.id} className="border rounded-lg p-4">
              <h4 className="font-semibold text-slate-800 mb-3">{strategy.name}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Conversion Rate:</span>
                  <span className="font-medium">{strategy.conversionRate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg Revenue/User:</span>
                  <span className="font-medium">{strategy.avgRevenuePerUser}</span>
                </div>
                <div className="flex justify-between">
                  <span>Growth Rate:</span>
                  <span className="font-medium text-green-600">{strategy.growthRate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSubscriptions = () => (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Subscription Tiers</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {subscriptionTiers.map((tier, index) => (
            <div key={tier.id} className={`border rounded-lg p-6 relative ${tier.mostPopular ? 'border-blue-500 shadow-lg' : ''}`}>
              {tier.mostPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-slate-800">{tier.name}</h3>
                <div className="text-3xl font-bold text-blue-600 mt-2">{tier.price}</div>
                <div className="text-sm text-slate-500 mt-1">Conversion: {tier.conversionRate}</div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-slate-700 mb-2">Features:</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <span className="text-green-500">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {tier.limitations.length > 0 && (
                  <div>
                    <h4 className="font-medium text-slate-700 mb-2">Limitations:</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      {tier.limitations.map((limitation, limitIndex) => (
                        <li key={limitIndex} className="flex items-center space-x-2">
                          <span className="text-red-500">×</span>
                          <span>{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div>
                  <h4 className="font-medium text-slate-700 mb-1">Target Audience:</h4>
                  <p className="text-sm text-slate-600">{tier.targetAudience}</p>
                </div>
              </div>
              
              <button className={`w-full mt-6 py-2 px-4 rounded-lg font-medium ${
                tier.mostPopular 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
              }`}>
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderEnterprise = () => (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Enterprise Solutions</h2>
        
        <div className="grid gap-6">
          {enterpriseSolutions.map((solution, index) => (
            <div key={solution.id} className="border rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-800">{solution.name}</h3>
                  <p className="text-slate-600 mt-2">{solution.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">{solution.pricing}</div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-slate-700 mb-3">Key Features:</h4>
                  <ul className="text-sm text-slate-600 space-y-2">
                    {solution.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <span className="text-green-500">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-slate-700 mb-3">Ideal For:</h4>
                  <ul className="text-sm text-slate-600 space-y-2">
                    {solution.clients.map((client, clientIndex) => (
                      <li key={clientIndex} className="flex items-center space-x-2">
                        <span className="text-blue-500">•</span>
                        <span>{client}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-3">
                <button className="btn btn-primary">Learn More</button>
                <button className="btn btn-secondary">Request Demo</button>
                <button className="btn btn-outline">Get Quote</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMarketing = () => (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Marketing & Production Deployment</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800">Marketing Automation</h3>
            {businessEmpireChecklist.features.marketingAutomation.campaigns.map((campaign, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-slate-800">{campaign.name}</h4>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(campaign.status)}`}>
                    {campaign.status}
                  </span>
                </div>
                <div className="text-sm text-slate-600">
                  ROI: <span className="font-medium text-green-600">{campaign.roi}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800">Production Environments</h3>
            {businessEmpireChecklist.features.productionDeployment.environments.map((env, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-slate-800">{env.name}</h4>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(env.status)}`}>
                    {env.status}
                  </span>
                </div>
                <div className="text-sm text-slate-600">
                  Uptime: <span className="font-medium text-green-600">{env.uptime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-800">California Business Empire</h1>
        <div className="flex space-x-2">
          <button className="btn btn-primary">📊 Analytics</button>
          <button className="btn btn-secondary">📋 Export</button>
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
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {activeTab === 'timeline' && renderTimeline()}
      {activeTab === 'domination' && renderWorldDomination()}
      {activeTab === 'revenue' && renderRevenue()}
      {activeTab === 'subscriptions' && renderSubscriptions()}
      {activeTab === 'enterprise' && renderEnterprise()}
      {activeTab === 'marketing' && renderMarketing()}
    </div>
  );
}