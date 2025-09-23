import React, { useState, useEffect } from 'react';
import { checklistSystem, endToEndFlowSimulation } from '../data/checklistData';

export default function InteractiveChecklists() {
  const [activeTab, setActiveTab] = useState('checklists');
  const [selectedChecklist, setSelectedChecklist] = useState(null);
  const [checklistStates, setChecklistStates] = useState({});
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  useEffect(() => {
    // Initialize checklist states
    const initialStates = {};
    checklistSystem.checklistTypes.forEach(type => {
      type.items.forEach(item => {
        item.checklist.forEach(checkItem => {
          initialStates[`${item.id}-${checkItem.item}`] = checkItem.completed;
        });
      });
    });
    setChecklistStates(initialStates);
  }, []);

  const handleChecklistToggle = (itemId, checkItemName) => {
    const key = `${itemId}-${checkItemName}`;
    setChecklistStates(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getStatusColor = (status) => {
    const statusType = checklistSystem.statusTypes[status];
    return statusType ? statusType.color : 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    const statusType = checklistSystem.statusTypes[status];
    return statusType ? statusType.icon : '⚪';
  };

  const getPriorityColor = (priority) => {
    const priorityType = checklistSystem.priorityTypes[priority];
    return priorityType ? priorityType.color : 'bg-gray-500 text-white';
  };

  const calculateProgress = (item) => {
    const totalItems = item.checklist.length;
    const completedItems = item.checklist.filter(checkItem => 
      checklistStates[`${item.id}-${checkItem.item}`]
    ).length;
    return Math.round((completedItems / totalItems) * 100);
  };

  const filteredChecklists = checklistSystem.checklistTypes.map(type => ({
    ...type,
    items: type.items.filter(item => {
      const statusMatch = filterStatus === 'all' || item.status === filterStatus;
      const priorityMatch = filterPriority === 'all' || item.priority === filterPriority;
      return statusMatch && priorityMatch;
    })
  })).filter(type => type.items.length > 0);

  const tabs = [
    { id: 'checklists', label: 'Interactive Checklists', icon: '✅' },
    { id: 'workflows', label: 'End-to-End Workflows', icon: '🔄' },
    { id: 'analytics', label: 'Analytics & Insights', icon: '📊' },
    { id: 'integrations', label: 'Integrations', icon: '🔗' }
  ];

  const renderChecklists = () => (
    <div className="space-y-6">
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Interactive Checklist Management</h2>
            <p className="text-slate-600 mt-2">{checklistSystem.overview.description}</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{checklistSystem.overview.completionRate}%</div>
            <div className="text-sm text-slate-500">Overall Completion</div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{checklistSystem.overview.totalChecklists}</div>
            <div className="text-sm text-slate-600">Total Checklists</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{checklistSystem.overview.totalItems}</div>
            <div className="text-sm text-slate-600">Total Items</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">Active</div>
            <div className="text-sm text-slate-600">Status</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">Real-time</div>
            <div className="text-sm text-slate-600">Updates</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-slate-700">Status:</label>
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border rounded px-3 py-1 text-sm"
            >
              <option value="all">All Statuses</option>
              {Object.entries(checklistSystem.statusTypes).map(([key, status]) => (
                <option key={key} value={key}>{status.label}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-slate-700">Priority:</label>
            <select 
              value={filterPriority} 
              onChange={(e) => setFilterPriority(e.target.value)}
              className="border rounded px-3 py-1 text-sm"
            >
              <option value="all">All Priorities</option>
              {Object.entries(checklistSystem.priorityTypes).map(([key, priority]) => (
                <option key={key} value={key}>{priority.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredChecklists.map((type, typeIndex) => (
        <div key={type.id} className="card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-800">{type.name}</h3>
              <p className="text-slate-600">{type.category}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(type.priority)}`}>
              {checklistSystem.priorityTypes[type.priority]?.label || type.priority}
            </span>
          </div>

          <div className="grid gap-6">
            {type.items.map((item, itemIndex) => {
              const progress = calculateProgress(item);
              return (
                <div key={item.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-xl">{getStatusIcon(item.status)}</span>
                        <h4 className="text-lg font-semibold text-slate-800">{item.title}</h4>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(item.status)}`}>
                          {checklistSystem.statusTypes[item.status]?.label || item.status}
                        </span>
                      </div>
                      <p className="text-slate-600 mb-3">{item.description}</p>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-lg font-bold text-blue-600">{progress}%</div>
                      <div className="text-sm text-slate-500">Complete</div>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-4">
                    <div className="text-sm text-slate-600 space-y-1">
                      <div><span className="font-medium">Due Date:</span> {item.dueDate}</div>
                      <div><span className="font-medium">Assignee:</span> {item.assignee}</div>
                      <div><span className="font-medium">Priority:</span> {item.priority}</div>
                      {item.dependencies && (
                        <div><span className="font-medium">Dependencies:</span> {item.dependencies.join(', ')}</div>
                      )}
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-slate-700 mb-2">Sub-Features:</h5>
                      <div className="space-y-2">
                        {item.subFeatures?.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center justify-between text-sm">
                            <span>{feature.name}</span>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded text-xs ${getStatusColor(feature.status)}`}>
                                {feature.status}
                              </span>
                              <button className="text-blue-600 hover:underline">
                                <a href={feature.link}>View</a>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h5 className="font-medium text-slate-700 mb-3">Checklist Items:</h5>
                    <div className="grid md:grid-cols-2 gap-3">
                      {item.checklist.map((checkItem, checkIndex) => (
                        <label key={checkIndex} className="flex items-center space-x-3 text-sm">
                          <input
                            type="checkbox"
                            checked={checklistStates[`${item.id}-${checkItem.item}`] || false}
                            onChange={() => handleChecklistToggle(item.id, checkItem.item)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className={`${checkItem.required ? 'font-medium' : ''} ${checklistStates[`${item.id}-${checkItem.item}`] ? 'line-through text-slate-400' : ''}`}>
                            {checkItem.item} {checkItem.required && <span className="text-red-500">*</span>}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-3">
                    <button 
                      className="btn btn-primary text-sm"
                      onClick={() => setSelectedChecklist(item)}
                    >
                      View Details
                    </button>
                    <button className="btn btn-secondary text-sm">Track Progress</button>
                    <button className="btn btn-outline text-sm">Export Report</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  const renderWorkflows = () => (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">End-to-End Workflow Simulation</h2>
        
        <div className="space-y-8">
          {endToEndFlowSimulation.workflows.map((workflow, index) => (
            <div key={workflow.id} className="border rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-slate-800">{workflow.name}</h3>
                  <p className="text-slate-600">{workflow.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">{workflow.metrics.automationLevel}</div>
                  <div className="text-sm text-slate-500">Automation</div>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-4 mb-6">
                {Object.entries(workflow.metrics).map(([key, value]) => (
                  <div key={key} className="text-center p-3 bg-slate-50 rounded-lg">
                    <div className="text-lg font-bold text-slate-800">{value}</div>
                    <div className="text-xs text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-slate-700">Workflow Steps:</h4>
                <div className="relative">
                  {workflow.steps.map((step, stepIndex) => (
                    <div key={step.id} className="flex items-start space-x-4 pb-8">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          step.status === 'automated' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
                        }`}>
                          {stepIndex + 1}
                        </div>
                        {stepIndex < workflow.steps.length - 1 && (
                          <div className="w-0.5 h-12 bg-gray-300 mt-2"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-semibold text-slate-800">{step.name}</h5>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              step.status === 'automated' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {step.status}
                            </span>
                            <span className="text-sm text-slate-500">{step.duration}</span>
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-slate-700">Inputs:</span>
                            <ul className="text-slate-600 mt-1">
                              {step.inputs.map((input, inputIndex) => (
                                <li key={inputIndex} className="flex items-center space-x-1">
                                  <span className="text-blue-500">•</span>
                                  <span>{input}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <span className="font-medium text-slate-700">Outputs:</span>
                            <ul className="text-slate-600 mt-1">
                              {step.outputs.map((output, outputIndex) => (
                                <li key={outputIndex} className="flex items-center space-x-1">
                                  <span className="text-green-500">•</span>
                                  <span>{output}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <span className="font-medium text-slate-700">Actions:</span>
                            <ul className="text-slate-600 mt-1">
                              {step.actions.map((action, actionIndex) => (
                                <li key={actionIndex} className="flex items-center space-x-1">
                                  <span className="text-purple-500">•</span>
                                  <span>{action}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex space-x-3">
                <button className="btn btn-primary">Run Simulation</button>
                <button className="btn btn-secondary">View Logs</button>
                <button className="btn btn-outline">Export Flow</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Integration Points</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {endToEndFlowSimulation.integrationPoints.map((integration, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-slate-800">{integration.name}</h4>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(integration.status)}`}>
                  {integration.status}
                </span>
              </div>
              <div className="text-sm text-slate-600 mb-2">
                <span className="font-medium">Sync:</span> {integration.dataSync}
              </div>
              <div className="flex flex-wrap gap-1">
                {integration.systems.map((system, systemIndex) => (
                  <span key={systemIndex} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                    {system}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Checklist Analytics & Insights</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">85%</div>
            <div className="text-sm text-slate-600">On-time Completion</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">3.2 days</div>
            <div className="text-sm text-slate-600">Avg Completion Time</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">92%</div>
            <div className="text-sm text-slate-600">Quality Score</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">156</div>
            <div className="text-sm text-slate-600">Active Items</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Completion by Status</h3>
            <div className="space-y-3">
              {Object.entries(checklistSystem.statusTypes).map(([key, status]) => {
                const percentage = Math.floor(Math.random() * 100);
                return (
                  <div key={key}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{status.label}</span>
                      <span>{percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Priority Distribution</h3>
            <div className="space-y-3">
              {Object.entries(checklistSystem.priorityTypes).map(([key, priority]) => {
                const count = Math.floor(Math.random() * 50) + 10;
                return (
                  <div key={key} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${priority.color}`}>
                        {priority.label}
                      </span>
                    </div>
                    <span className="text-lg font-bold text-slate-800">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIntegrations = () => (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">System Integrations</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {endToEndFlowSimulation.integrationPoints.map((integration, index) => (
            <div key={index} className="border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800">{integration.name}</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(integration.status)}`}>
                  {integration.status}
                </span>
              </div>
              
              <div className="mb-4">
                <div className="text-sm text-slate-600 mb-2">
                  <span className="font-medium">Data Sync:</span> {integration.dataSync}
                </div>
                <div className="text-sm text-slate-600">
                  <span className="font-medium">Systems:</span> {integration.systems.length}
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                {integration.systems.map((system, systemIndex) => (
                  <div key={systemIndex} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                    <span className="text-sm font-medium">{system}</span>
                    <span className="text-xs text-green-600">Connected</span>
                  </div>
                ))}
              </div>
              
              <div className="flex space-x-2">
                <button className="btn btn-primary text-sm flex-1">Configure</button>
                <button className="btn btn-outline text-sm">Test</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-800">Interactive Checklist System</h1>
        <div className="flex space-x-2">
          <button className="btn btn-primary">➕ New Checklist</button>
          <button className="btn btn-secondary">📊 Analytics</button>
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
                ? 'bg-white text-green-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            <span>{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {activeTab === 'checklists' && renderChecklists()}
      {activeTab === 'workflows' && renderWorkflows()}
      {activeTab === 'analytics' && renderAnalytics()}
      {activeTab === 'integrations' && renderIntegrations()}

      {selectedChecklist && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-800">{selectedChecklist.title}</h3>
              <button 
                onClick={() => setSelectedChecklist(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>
            <p className="text-slate-600 mb-4">{selectedChecklist.description}</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-slate-700 mb-2">Details:</h4>
                <div className="text-sm space-y-1">
                  <div><span className="font-medium">Due Date:</span> {selectedChecklist.dueDate}</div>
                  <div><span className="font-medium">Assignee:</span> {selectedChecklist.assignee}</div>
                  <div><span className="font-medium">Priority:</span> {selectedChecklist.priority}</div>
                  <div><span className="font-medium">Progress:</span> {calculateProgress(selectedChecklist)}%</div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-slate-700 mb-2">Dependencies:</h4>
                <div className="text-sm">
                  {selectedChecklist.dependencies?.join(', ') || 'None'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}