import React, { useState } from 'react';
import { 
  documentControlData, 
  supportMaintenanceData, 
  qaTestingData, 
  businessContinuityData 
} from '../data/businessArchitecture';

const BusinessArchitecture = () => {
  const [activeTab, setActiveTab] = useState('documents');

  const TabButton = ({ id, label, icon, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
        isActive 
          ? 'bg-ocean-600 text-white shadow-lg' 
          : 'bg-white text-ocean-600 border border-ocean-200 hover:bg-ocean-50'
      }`}
    >
      <span className="text-lg">{icon}</span>
      {label}
    </button>
  );

  const DocumentControlPanel = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-ocean-800">📋 Document Control Management</h3>
        
        {/* Document Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {documentControlData.documentStatuses.map(status => (
            <div key={status.id} className="bg-gray-50 rounded-lg p-4">
              <div className={`w-3 h-3 rounded-full bg-${status.color}-500 inline-block mr-2`}></div>
              <span className="font-medium">{status.name}</span>
              <p className="text-sm text-gray-600 mt-1">{status.description}</p>
            </div>
          ))}
        </div>

        {/* Sample Documents Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-ocean-50 text-ocean-800">
              <tr>
                <th className="px-4 py-3 text-left">Document ID</th>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Version</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Next Review</th>
                <th className="px-4 py-3 text-left">Owner</th>
              </tr>
            </thead>
            <tbody>
              {documentControlData.sampleDocuments.map(doc => (
                <tr key={doc.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono">{doc.id}</td>
                  <td className="px-4 py-3">{doc.title}</td>
                  <td className="px-4 py-3">v{doc.version}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{doc.nextReview}</td>
                  <td className="px-4 py-3">{doc.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Review Cycles */}
        <div className="mt-6">
          <h4 className="font-semibold mb-3">Review Cycles Configuration</h4>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {documentControlData.reviewCycles.map(cycle => (
              <div key={cycle.id} className="bg-blue-50 rounded-lg p-3 text-center">
                <div className="font-semibold text-blue-800">{cycle.name}</div>
                <div className="text-sm text-blue-600">{cycle.frequency} days</div>
                <div className="text-xs text-blue-500 mt-1">{cycle.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const SupportMaintenancePanel = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-ocean-800">🔧 Support & Maintenance Management</h3>
        
        {/* Support Tiers */}
        <div className="mb-6">
          <h4 className="font-semibold mb-3">Support Tier System</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {supportMaintenanceData.supportTiers.map(tier => (
              <div key={tier.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h5 className="font-semibold text-ocean-700">{tier.name}</h5>
                <div className="mt-2 space-y-1 text-sm">
                  <div><strong>Response Time:</strong> {tier.responseTime}</div>
                  <div><strong>Availability:</strong> {tier.availability}</div>
                  <div><strong>Channels:</strong> {tier.channels.join(', ')}</div>
                  <div><strong>Coverage:</strong> {tier.coverage}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance Schedules */}
        <div className="mb-6">
          <h4 className="font-semibold mb-3">Maintenance Scheduling</h4>
          <div className="space-y-3">
            {supportMaintenanceData.maintenanceSchedules.map(schedule => (
              <div key={schedule.type} className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-semibold">{schedule.name}</h5>
                    <div className="text-sm text-gray-600 mt-1">
                      <strong>Tasks:</strong> {schedule.tasks.join(', ')}
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <div><strong>Duration:</strong> {schedule.duration}</div>
                    <div><strong>Schedule:</strong> {schedule.scheduledTime}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resource Requirements */}
        <div>
          <h4 className="font-semibold mb-3">Resource Requirement Phases</h4>
          <div className="space-y-3">
            {supportMaintenanceData.resourceRequirements.map(phase => (
              <div key={phase.phase} className="border-l-4 border-ocean-400 pl-4">
                <h5 className="font-semibold">{phase.phase}</h5>
                <div className="text-sm text-gray-600 mt-1">
                  <div><strong>Duration:</strong> {phase.duration}</div>
                  <div><strong>Resources:</strong> {phase.resources.join(', ')}</div>
                  <div><strong>Deliverables:</strong> {phase.deliverables.join(', ')}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const QATestingPanel = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-ocean-800">🧪 QA/Testing & CI/CD Management</h3>
        
        {/* Testing Pyramid */}
        <div className="mb-6">
          <h4 className="font-semibold mb-3">Testing Pyramid Structure</h4>
          <div className="space-y-4">
            {Object.entries(qaTestingData.testingPyramid).map(([key, level]) => (
              <div key={key} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-semibold text-ocean-700">{level.level}</h5>
                  <span className="bg-ocean-100 text-ocean-800 px-2 py-1 rounded text-sm font-medium">{level.percentage}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{level.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Types:</strong>
                    <ul className="list-disc list-inside mt-1 text-gray-600">
                      {level.types.map(type => <li key={type}>{type}</li>)}
                    </ul>
                  </div>
                  <div>
                    <strong>Tools:</strong>
                    <ul className="list-disc list-inside mt-1 text-gray-600">
                      {level.tools.map(tool => <li key={tool}>{tool}</li>)}
                    </ul>
                  </div>
                </div>
                <div className="mt-2 text-sm">
                  <strong>Frequency:</strong> <span className="text-ocean-600">{level.frequency}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* QA Processes */}
        <div>
          <h4 className="font-semibold mb-3">QA Process Workflow</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {qaTestingData.qaProcesses.map(process => (
              <div key={process.id} className="bg-blue-50 rounded-lg p-4">
                <h5 className="font-semibold text-blue-800">{process.name}</h5>
                <p className="text-sm text-blue-600 mt-1 mb-3">{process.description}</p>
                <div className="text-sm">
                  <div className="mb-2">
                    <strong>Activities:</strong>
                    <ul className="list-disc list-inside mt-1 text-gray-600">
                      {process.activities.map(activity => <li key={activity}>{activity}</li>)}
                    </ul>
                  </div>
                  <div>
                    <strong>Deliverables:</strong>
                    <ul className="list-disc list-inside mt-1 text-gray-600">
                      {process.deliverables.map(deliverable => <li key={deliverable}>{deliverable}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const BusinessContinuityPanel = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-ocean-800">🔄 Business Continuity & Exit Strategy</h3>
        
        {/* Exit Strategies */}
        <div className="mb-6">
          <h4 className="font-semibold mb-3">Exit Strategy Planning</h4>
          <div className="space-y-4">
            {businessContinuityData.exitStrategies.map(strategy => (
              <div key={strategy.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-semibold text-red-700">{strategy.name}</h5>
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">{strategy.timeline}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{strategy.description}</p>
                <div className="text-sm">
                  <div><strong>Components:</strong> {strategy.components.join(', ')}</div>
                  <div><strong>Responsibility:</strong> {strategy.responsibility}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Backup Strategies */}
        <div className="mb-6">
          <h4 className="font-semibold mb-3">Backup & Recovery Management</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {businessContinuityData.backupStrategies.map(backup => (
              <div key={backup.type} className="bg-green-50 rounded-lg p-4">
                <h5 className="font-semibold text-green-800">{backup.name}</h5>
                <div className="text-sm text-green-700 mt-2 space-y-1">
                  <div><strong>Frequency:</strong> {backup.frequency}</div>
                  <div><strong>Retention:</strong> {backup.retention}</div>
                  <div><strong>Scope:</strong> {backup.scope}</div>
                  <div><strong>Location:</strong> {backup.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Succession Planning */}
        <div>
          <h4 className="font-semibold mb-3">Succession Planning</h4>
          <div className="space-y-3">
            {businessContinuityData.successionPlanning.map((plan, index) => (
              <div key={index} className="bg-yellow-50 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-semibold text-yellow-800">{plan.role}</h5>
                    <div className="text-sm text-yellow-700 mt-1">
                      <div><strong>Successor:</strong> {plan.successor}</div>
                      <div><strong>Documentation:</strong> {plan.documentation}</div>
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <div className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded">{plan.timeline}</div>
                    <div className="mt-2 text-xs text-yellow-600">
                      {plan.requirements.join(', ')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'documents', label: 'Document Control', icon: '📋', component: DocumentControlPanel },
    { id: 'support', label: 'Support & Maintenance', icon: '🔧', component: SupportMaintenancePanel },
    { id: 'qa', label: 'QA/Testing & CI/CD', icon: '🧪', component: QATestingPanel },
    { id: 'continuity', label: 'Business Continuity', icon: '🔄', component: BusinessContinuityPanel },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || DocumentControlPanel;

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl">🏗️</span>
          <div>
            <h1 className="text-3xl font-bold text-ocean-800">Business Architecture & Operations</h1>
            <p className="text-ocean-600">Comprehensive business operations management and continuity planning</p>
          </div>
        </div>
        
        {/* Audit Traceability Banner */}
        <div className="bg-blue-100 border border-blue-300 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-blue-600">🔍</span>
            <strong className="text-blue-800">Audit Traceability:</strong>
            <span className="text-blue-700">All processes and changes tracked for compliance and review (Reference: Images 10-13)</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-3 mb-6">
        {tabs.map(tab => (
          <TabButton
            key={tab.id}
            id={tab.id}
            label={tab.label}
            icon={tab.icon}
            isActive={activeTab === tab.id}
            onClick={setActiveTab}
          />
        ))}
      </div>

      {/* Active Panel */}
      <ActiveComponent />

      {/* Action Buttons */}
      <div className="mt-8 flex flex-wrap gap-4">
        <button className="bg-ocean-600 text-white px-6 py-3 rounded-lg hover:bg-ocean-700 transition-colors">
          📊 Generate Architecture Report
        </button>
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
          💾 Export Configuration
        </button>
        <button className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition-colors">
          🔧 Schedule Maintenance
        </button>
        <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors">
          🚨 Emergency Procedures
        </button>
      </div>
    </div>
  );
};

export default BusinessArchitecture;