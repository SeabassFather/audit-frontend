import React, { useState } from 'react';
import { 
  californiaBusinessEmpireChecklist, 
  revenueOptimization, 
  milestoneDeadlines, 
  futureExpansionFeatures,
  goToMarketStrategy,
  deploymentInfrastructure,
  cloudInfrastructure 
} from '../data/businessStrategy';

const BusinessStrategy = () => {
  const [activeTab, setActiveTab] = useState('empire-checklist');

  const tabs = [
    { id: 'empire-checklist', label: 'Business Empire', icon: '🏢' },
    { id: 'revenue-optimization', label: 'Revenue Optimization', icon: '💰' },
    { id: 'milestones', label: 'Milestones & Deadlines', icon: '🎯' },
    { id: 'future-expansion', label: 'Future Expansion', icon: '🚀' },
    { id: 'go-to-market', label: 'Go-to-Market', icon: '📈' },
    { id: 'infrastructure', label: 'Infrastructure', icon: '☁️' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'operational': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-orange-100 text-orange-800';
      case 'healthy': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderEmpireChecklist = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{californiaBusinessEmpireChecklist.title}</h2>
          <span className="text-sm text-gray-500">Reference: {californiaBusinessEmpireChecklist.imageReference}</span>
        </div>
        <p className="text-gray-600 mb-6">{californiaBusinessEmpireChecklist.description}</p>
        
        <div className="grid gap-6 md:grid-cols-2">
          {californiaBusinessEmpireChecklist.categories.map((category) => (
            <div key={category.id} className="bg-gray-50 rounded-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{category.name}</h3>
                <div className="flex items-center">
                  <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${category.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{category.progress}%</span>
                </div>
              </div>
              
              <div className="space-y-3">
                {category.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-white rounded border">
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500">Due: {item.deadline}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(item.priority)}`}>
                        {item.priority}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRevenueOptimization = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{revenueOptimization.title}</h2>
          <span className="text-sm text-gray-500">Reference: {revenueOptimization.imageReference}</span>
        </div>
        <p className="text-gray-600 mb-6">{revenueOptimization.description}</p>
        
        {/* Revenue Metrics Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">${revenueOptimization.metrics.totalRevenue.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Revenue</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{revenueOptimization.metrics.monthlyGrowth}%</div>
            <div className="text-sm text-gray-600">Monthly Growth</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">${revenueOptimization.metrics.customerAcquisitionCost}</div>
            <div className="text-sm text-gray-600">CAC</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">${revenueOptimization.metrics.customerLifetimeValue.toLocaleString()}</div>
            <div className="text-sm text-gray-600">LTV</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{revenueOptimization.metrics.churnRate}%</div>
            <div className="text-sm text-gray-600">Churn Rate</div>
          </div>
        </div>

        {/* Revenue Streams */}
        <div className="space-y-4">
          {revenueOptimization.streams.map((stream) => (
            <div key={stream.id} className="bg-gray-50 rounded-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{stream.name}</h3>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">${stream.currentRevenue.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Target: ${stream.targetRevenue.toLocaleString()}</div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress to Target</span>
                  <span>{Math.round((stream.currentRevenue / stream.targetRevenue) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${(stream.currentRevenue / stream.targetRevenue) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Optimization Strategies:</h4>
                {stream.optimization.map((opt, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                    <span className="text-sm">{opt.strategy}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-green-600">{opt.impact}</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(opt.status)}`}>
                        {opt.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMilestones = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{milestoneDeadlines.title}</h2>
          <span className="text-sm text-gray-500">Reference: {milestoneDeadlines.imageReference}</span>
        </div>
        <p className="text-gray-600 mb-6">{milestoneDeadlines.description}</p>
        
        <div className="grid gap-6 md:grid-cols-2">
          {milestoneDeadlines.quarters.map((quarter) => (
            <div key={quarter.id} className="bg-gray-50 rounded-lg p-5">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">{quarter.name}</h3>
                <p className="text-sm text-gray-600">{quarter.period}</p>
              </div>
              
              <div className="space-y-3">
                {quarter.milestones.map((milestone) => (
                  <div key={milestone.id} className="p-3 bg-white rounded border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{milestone.name}</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(milestone.status)}`}>
                        {milestone.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Due: {milestone.deadline}</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(milestone.priority)}`}>
                        {milestone.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFutureExpansion = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{futureExpansionFeatures.title}</h2>
          <span className="text-sm text-gray-500">Reference: {futureExpansionFeatures.imageReference}</span>
        </div>
        <p className="text-gray-600 mb-6">{futureExpansionFeatures.description}</p>
        
        <div className="space-y-6">
          {futureExpansionFeatures.expansionAreas.map((area) => (
            <div key={area.id} className="bg-gray-50 rounded-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{area.name}</h3>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full" 
                        style={{ width: `${area.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{area.progress}%</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(area.status)}`}>
                    {area.status}
                  </span>
                </div>
              </div>
              
              <div className="grid gap-3 md:grid-cols-2">
                {area.features.map((feature, index) => (
                  <div key={index} className="p-3 bg-white rounded border">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{feature.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          feature.impact === 'high' ? 'bg-red-100 text-red-800' :
                          feature.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {feature.impact} impact
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(feature.status)}`}>
                          {feature.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderGoToMarket = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{goToMarketStrategy.title}</h2>
          <span className="text-sm text-gray-500">Reference: {goToMarketStrategy.imageReference}</span>
        </div>
        <p className="text-gray-600 mb-6">{goToMarketStrategy.description}</p>
        
        <div className="space-y-6">
          {goToMarketStrategy.phases.map((phase) => (
            <div key={phase.id} className="bg-gray-50 rounded-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{phase.name}</h3>
                  <p className="text-sm text-gray-600">Duration: {phase.duration}</p>
                </div>
                <span className={`px-3 py-1 rounded text-sm font-medium ${getStatusColor(phase.status)}`}>
                  {phase.status}
                </span>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Objectives:</h4>
                  <ul className="space-y-2">
                    {phase.objectives.map((objective, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                        <span className="text-sm">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Key Performance Indicators:</h4>
                  <div className="space-y-2">
                    {phase.kpis.map((kpi, index) => (
                      <div key={index} className="p-2 bg-white rounded border">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{kpi.metric}</span>
                          <span className="text-sm">
                            {kpi.actual > 0 ? `${kpi.actual}` : 'TBD'} / {kpi.target}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                          <div 
                            className={`h-1 rounded-full ${
                              kpi.actual >= kpi.target ? 'bg-green-500' : 'bg-blue-500'
                            }`}
                            style={{ 
                              width: `${Math.min((kpi.actual / (typeof kpi.target === 'string' ? 
                                parseFloat(kpi.target.replace(/[^0-9.]/g, '')) : kpi.target)) * 100, 100)}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderInfrastructure = () => (
    <div className="space-y-6">
      {/* Deployment Infrastructure */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{deploymentInfrastructure.title}</h2>
          <span className="text-sm text-gray-500">Reference: {deploymentInfrastructure.imageReference}</span>
        </div>
        <p className="text-gray-600 mb-6">{deploymentInfrastructure.description}</p>
        
        <div className="grid gap-6 md:grid-cols-3">
          {deploymentInfrastructure.environments.map((env) => (
            <div key={env.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">{env.name}</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(env.status)}`}>
                  {env.status}
                </span>
              </div>
              
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>Uptime</span>
                  <span>{env.uptime}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${env.uptime}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-2">
                {env.components.map((component, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-white rounded text-sm">
                    <span>{component.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">{component.uptime}%</span>
                      <span className={`px-1 py-0.5 rounded text-xs ${getStatusColor(component.status)}`}>
                        {component.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="text-lg font-bold text-blue-600">{deploymentInfrastructure.metrics.deploymentFrequency}</div>
            <div className="text-xs text-gray-600">Deployments/Week</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="text-lg font-bold text-green-600">{deploymentInfrastructure.metrics.leadTime}</div>
            <div className="text-xs text-gray-600">Lead Time</div>
          </div>
          <div className="bg-red-50 p-3 rounded-lg">
            <div className="text-lg font-bold text-red-600">{deploymentInfrastructure.metrics.failureRate}</div>
            <div className="text-xs text-gray-600">Failure Rate</div>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg">
            <div className="text-lg font-bold text-orange-600">{deploymentInfrastructure.metrics.recoveryTime}</div>
            <div className="text-xs text-gray-600">Recovery Time</div>
          </div>
        </div>
      </div>

      {/* Cloud Infrastructure */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{cloudInfrastructure.title}</h2>
          <span className="text-sm text-gray-500">Reference: {cloudInfrastructure.imageReference}</span>
        </div>
        <p className="text-gray-600 mb-6">{cloudInfrastructure.description}</p>
        
        <div className="grid gap-6 md:grid-cols-3">
          {cloudInfrastructure.providers.map((provider) => (
            <div key={provider.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold">{provider.name}</h3>
                  <p className="text-sm text-gray-600">{provider.service}</p>
                  <p className="text-xs text-gray-500">{provider.region}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(provider.status)}`}>
                  {provider.status}
                </span>
              </div>
              
              <div className="space-y-2">
                {Object.entries(provider.metrics).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="font-medium">{value}{key === 'uptime' ? '%' : ''}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold mb-3">Cost Analysis</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">${cloudInfrastructure.costs.monthly.total}</div>
              <div className="text-xs text-gray-600">Monthly Total</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">${cloudInfrastructure.costs.projected['6months']}</div>
              <div className="text-xs text-gray-600">6 Month Projection</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600">${cloudInfrastructure.costs.projected['1year']}</div>
              <div className="text-xs text-gray-600">Annual Projection</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-orange-600">{cloudInfrastructure.costs.projected.growth}</div>
              <div className="text-xs text-gray-600">Expected Growth</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'empire-checklist':
        return renderEmpireChecklist();
      case 'revenue-optimization':
        return renderRevenueOptimization();
      case 'milestones':
        return renderMilestones();
      case 'future-expansion':
        return renderFutureExpansion();
      case 'go-to-market':
        return renderGoToMarket();
      case 'infrastructure':
        return renderInfrastructure();
      default:
        return renderEmpireChecklist();
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`flex-shrink-0 px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {renderContent()}
    </div>
  );
};

export default BusinessStrategy;