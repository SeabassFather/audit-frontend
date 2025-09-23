import React, { useState, useEffect } from 'react';
import { deploymentInfrastructure, deploymentEnvironments } from '../data/infrastructureData';

export default function DeploymentInfrastructure() {
  const [activeTab, setActiveTab] = useState('overview');
  const [realTimeMetrics, setRealTimeMetrics] = useState(deploymentInfrastructure.operationalAnalytics.realTimeMetrics);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let interval;
    if (isLive) {
      interval = setInterval(() => {
        // Simulate real-time metric updates
        setRealTimeMetrics(prev => 
          prev.map(metric => ({
            ...metric,
            current: generateRandomMetric(metric)
          }))
        );
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isLive]);

  const generateRandomMetric = (metric) => {
    const baseValue = parseFloat(metric.current.replace(/[^\d.]/g, ''));
    const variation = baseValue * 0.1; // 10% variation
    const newValue = baseValue + (Math.random() - 0.5) * variation;
    
    if (metric.name === 'Request Rate') {
      return `${Math.round(newValue)}K requests/minute`;
    } else if (metric.name === 'Response Time') {
      return `${Math.round(newValue)}ms average`;
    } else if (metric.name === 'Error Rate') {
      return `${(newValue / 1000).toFixed(3)}%`;
    } else {
      return `${Math.round(newValue)} active`;
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'cloud', label: 'Cloud Infrastructure', icon: '☁️' },
    { id: 'databases', label: 'Databases', icon: '🗄️' },
    { id: 'devops', label: 'DevOps & CI/CD', icon: '🔄' },
    { id: 'monitoring', label: 'Monitoring', icon: '📈' },
    { id: 'logging', label: 'Logging', icon: '📝' },
    { id: 'analytics', label: 'Analytics', icon: '🔍' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'primary': return 'bg-purple-100 text-purple-800';
      case 'secondary': return 'bg-yellow-100 text-yellow-800';
      case 'standby': return 'bg-gray-100 text-gray-800';
      case 'development': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy': return '🟢';
      case 'active': return '🔵';
      case 'primary': return '🟣';
      case 'secondary': return '🟡';
      case 'standby': return '⚪';
      case 'development': return '🟠';
      default: return '⚫';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Infrastructure Overview</h2>
            <p className="text-slate-600 mt-2">{deploymentInfrastructure.overview.description}</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{deploymentInfrastructure.overview.availability}</div>
            <div className="text-sm text-slate-500">Uptime</div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{deploymentInfrastructure.overview.globalRegions}</div>
            <div className="text-sm text-slate-600">Global Regions</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{deploymentInfrastructure.overview.totalServers}</div>
            <div className="text-sm text-slate-600">Total Servers</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{deploymentInfrastructure.overview.dailyTransactions}</div>
            <div className="text-sm text-slate-600">Daily Transactions</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{deploymentInfrastructure.overview.availability}</div>
            <div className="text-sm text-slate-600">SLA</div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Deployment Environments</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {deploymentEnvironments.map((env, index) => (
            <div key={env.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-slate-800">{env.name}</h4>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(env.status)}`}>
                  {env.status}
                </span>
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Uptime:</span>
                  <span className="font-medium text-green-600">{env.uptime}</span>
                </div>
                <div className="flex justify-between">
                  <span>Users:</span>
                  <span className="font-medium">{env.users}</span>
                </div>
                <div className="flex justify-between">
                  <span>Deployment:</span>
                  <span className="font-medium">{env.deployment}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCloud = () => (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Cloud Infrastructure</h2>
        
        {deploymentInfrastructure.cloudInfrastructure.providers.map((provider, index) => (
          <div key={provider.id} className="border rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-slate-800">{provider.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(provider.status)}`}>
                  {provider.status}
                </span>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-green-600">{provider.totalCost}</div>
                <div className="text-sm text-slate-500">Monthly Cost</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-slate-700 mb-3">Regions:</h4>
                <div className="space-y-2">
                  {provider.regions.map((region, regionIndex) => (
                    <div key={regionIndex} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                      <span className="text-sm font-medium">{region.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs ${getStatusColor(region.status)}`}>
                          {region.status}
                        </span>
                        <span className="text-xs text-slate-500">{region.usage}</span>
                        <span className="text-xs font-medium">{region.costs}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-slate-700 mb-3">Services:</h4>
                <div className="flex flex-wrap gap-2">
                  {provider.services.map((service, serviceIndex) => (
                    <span key={serviceIndex} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="card">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Architecture Overview</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div><span className="font-medium">Pattern:</span> {deploymentInfrastructure.cloudInfrastructure.architecture.pattern}</div>
              <div><span className="font-medium">Containers:</span> {deploymentInfrastructure.cloudInfrastructure.architecture.containers}</div>
              <div><span className="font-medium">Services:</span> {deploymentInfrastructure.cloudInfrastructure.architecture.serviceCount}</div>
            </div>
            <div className="space-y-3">
              <div><span className="font-medium">API Gateway:</span> {deploymentInfrastructure.cloudInfrastructure.architecture.apiGateway}</div>
              <div><span className="font-medium">Load Balancing:</span> {deploymentInfrastructure.cloudInfrastructure.architecture.loadBalancing}</div>
              <div><span className="font-medium">CDN:</span> {deploymentInfrastructure.cloudInfrastructure.architecture.cdn}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDatabases = () => (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Database Infrastructure</h2>
        
        {Object.entries(deploymentInfrastructure.databases).map(([category, databases]) => (
          <div key={category} className="mb-8">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 capitalize">{category} Databases</h3>
            
            <div className="grid gap-4">
              {databases.map((db, index) => (
                <div key={db.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-slate-800">{db.name}</h4>
                      <span className="text-sm text-slate-500">{db.type}</span>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(db.status)}`}>
                      {db.status}
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    {db.storage && (
                      <div>
                        <span className="text-slate-500">Storage:</span>
                        <div className="font-medium">{db.storage}</div>
                      </div>
                    )}
                    {db.dailyOperations && (
                      <div>
                        <span className="text-slate-500">Daily Ops:</span>
                        <div className="font-medium">{db.dailyOperations}</div>
                      </div>
                    )}
                    {db.replication && (
                      <div>
                        <span className="text-slate-500">Replication:</span>
                        <div className="font-medium">{db.replication}</div>
                      </div>
                    )}
                    {db.backups && (
                      <div>
                        <span className="text-slate-500">Backups:</span>
                        <div className="font-medium">{db.backups}</div>
                      </div>
                    )}
                    {db.nodes && (
                      <div>
                        <span className="text-slate-500">Nodes:</span>
                        <div className="font-medium">{db.nodes}</div>
                      </div>
                    )}
                    {db.memory && (
                      <div>
                        <span className="text-slate-500">Memory:</span>
                        <div className="font-medium">{db.memory}</div>
                      </div>
                    )}
                    {db.operations && (
                      <div>
                        <span className="text-slate-500">Operations:</span>
                        <div className="font-medium">{db.operations}</div>
                      </div>
                    )}
                    {db.hitRate && (
                      <div>
                        <span className="text-slate-500">Hit Rate:</span>
                        <div className="font-medium text-green-600">{db.hitRate}</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDevOps = () => (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">DevOps & CI/CD</h2>
        
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">CI/CD Pipelines</h3>
          <div className="space-y-4">
            {deploymentInfrastructure.devOps.cicd.pipelines.map((pipeline, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-slate-800">{pipeline.name}</h4>
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-600">{pipeline.successRate}</div>
                    <div className="text-xs text-slate-500">Success Rate</div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500">Trigger:</span>
                    <div className="font-medium">{pipeline.trigger}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Duration:</span>
                    <div className="font-medium">{pipeline.duration}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Deployments:</span>
                    <div className="font-medium">{pipeline.deployments}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Stages:</span>
                    <div className="flex flex-wrap gap-1">
                      {pipeline.stages.map((stage, stageIndex) => (
                        <span key={stageIndex} className="px-1 py-0.5 bg-blue-100 text-blue-800 rounded text-xs">
                          {stage}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Containerization</h3>
          <div className="space-y-4">
            {deploymentInfrastructure.devOps.containerization.clusters.map((cluster, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h4 className="font-semibold text-slate-800 mb-3">{cluster.name}</h4>
                <div className="grid md:grid-cols-5 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500">Nodes:</span>
                    <div className="font-medium">{cluster.nodes}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Pods:</span>
                    <div className="font-medium">{cluster.pods}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Namespaces:</span>
                    <div className="font-medium">{cluster.namespaces}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Utilization:</span>
                    <div className="font-medium">{cluster.resourceUtilization}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Auto Scaling:</span>
                    <div className="font-medium text-green-600">{cluster.autoScaling}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Security & Compliance</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-slate-700 mb-2">Security Scanning:</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                {deploymentInfrastructure.devOps.security.scanning.map((scan, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>{scan}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-slate-700 mb-2">Compliance:</h4>
              <div className="flex flex-wrap gap-1">
                {deploymentInfrastructure.devOps.security.compliance.map((comp, index) => (
                  <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                    {comp}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-slate-700 mb-2">Security Policies:</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                {deploymentInfrastructure.devOps.security.policies.slice(0, 3).map((policy, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="text-blue-500">•</span>
                    <span>{policy}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMonitoring = () => (
    <div className="space-y-6">
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Monitoring & Alerting</h2>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsLive(!isLive)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                isLive ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {isLive ? '🔴 Live' : '⚪ Static'}
            </button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {realTimeMetrics.map((metric, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="text-lg font-semibold text-slate-800">{metric.name}</div>
              <div className="text-2xl font-bold text-blue-600 mt-2">{metric.current}</div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-slate-500">Threshold: {metric.threshold}</span>
                <span className={`text-xs font-medium ${metric.trend.startsWith('+') ? 'text-green-600' : metric.trend.startsWith('-') ? 'text-red-600' : 'text-slate-600'}`}>
                  {metric.trend}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          {deploymentInfrastructure.monitoring.platforms.map((platform, index) => (
            <div key={platform.id} className="border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-800">{platform.name}</h3>
                  <p className="text-slate-600">{platform.type}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">{platform.alerts}</div>
                  <div className="text-sm text-slate-500">Active Alerts</div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <span className="text-slate-500 text-sm">Coverage:</span>
                  <div className="font-medium">{platform.coverage}</div>
                </div>
                <div>
                  <span className="text-slate-500 text-sm">Dashboards:</span>
                  <div className="font-medium">{platform.dashboards}</div>
                </div>
                <div>
                  <span className="text-slate-500 text-sm">Retention:</span>
                  <div className="font-medium">{platform.retention}</div>
                </div>
                <div>
                  <span className="text-slate-500 text-sm">Alerts:</span>
                  <div className="font-medium">{platform.alerts}</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-slate-700 mb-2">Features:</h4>
                <div className="flex flex-wrap gap-2">
                  {platform.features.map((feature, featureIndex) => (
                    <span key={featureIndex} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">SLA Metrics</h3>
          <div className="grid md:grid-cols-5 gap-4">
            {Object.entries(deploymentInfrastructure.monitoring.sla).map(([metric, value]) => (
              <div key={metric} className="text-center p-3 bg-slate-50 rounded-lg">
                <div className="text-lg font-bold text-slate-800">{value}</div>
                <div className="text-xs text-slate-500 capitalize">{metric.replace(/([A-Z])/g, ' $1')}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderLogging = () => (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Centralized Logging</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">Log Management</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Platform:</span>
                <span className="font-medium">{deploymentInfrastructure.logging.centralized.platform}</span>
              </div>
              <div className="flex justify-between">
                <span>Daily Ingestion:</span>
                <span className="font-medium">{deploymentInfrastructure.logging.centralized.ingestion}</span>
              </div>
              <div className="flex justify-between">
                <span>Retention:</span>
                <span className="font-medium">{deploymentInfrastructure.logging.centralized.retention}</span>
              </div>
              <div className="flex justify-between">
                <span>Search:</span>
                <span className="font-medium">{deploymentInfrastructure.logging.centralized.searchCapability}</span>
              </div>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">Log Sources</h3>
            <div className="space-y-2">
              {deploymentInfrastructure.logging.sources.map((source, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-blue-500">•</span>
                  <span className="text-sm">{source}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Compliance & Security</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-slate-700 mb-2">Audit & Compliance:</h4>
              <div className="space-y-2 text-sm">
                <div><span className="text-slate-500">Audit Trail:</span> {deploymentInfrastructure.logging.compliance.auditTrail}</div>
                <div><span className="text-slate-500">Retention:</span> {deploymentInfrastructure.logging.compliance.retention}</div>
                <div><span className="text-slate-500">Encryption:</span> {deploymentInfrastructure.logging.compliance.encryption}</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-slate-700 mb-2">Access & Security:</h4>
              <div className="space-y-2 text-sm">
                <div><span className="text-slate-500">Access Control:</span> {deploymentInfrastructure.logging.compliance.access}</div>
                <div><span className="text-slate-500">Integrity:</span> {deploymentInfrastructure.logging.compliance.integrity}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Operational Analytics</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Business Metrics</h3>
            <div className="space-y-4">
              {deploymentInfrastructure.operationalAnalytics.businessMetrics.map((metric, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-slate-800">{metric.name}</h4>
                    <span className={`text-sm font-medium ${metric.trend.startsWith('+') ? 'text-green-600' : 'text-slate-600'}`}>
                      {metric.trend}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">{metric.current}</span>
                    <span className="text-sm text-slate-500">Goal: {metric.goal}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">System Metrics</h3>
            <div className="space-y-4">
              {realTimeMetrics.map((metric, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-slate-800">{metric.name}</h4>
                    <span className={`text-sm font-medium ${metric.trend.includes('Stable') ? 'text-green-600' : metric.trend.startsWith('+') ? 'text-orange-600' : 'text-green-600'}`}>
                      {metric.trend}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">{metric.current}</span>
                    <span className="text-sm text-slate-500">Max: {metric.threshold}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Capacity Planning</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {Object.entries(deploymentInfrastructure.operationalAnalytics.capacityPlanning).filter(([key]) => key !== 'scalingTriggers' && key !== 'autoScaling').map(([key, value]) => (
              <div key={key} className="text-center p-3 bg-slate-50 rounded-lg">
                <div className="text-lg font-bold text-slate-800">{value}</div>
                <div className="text-xs text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
              </div>
            ))}
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-slate-700 mb-2">Auto Scaling Triggers:</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                {deploymentInfrastructure.operationalAnalytics.capacityPlanning.scalingTriggers.map((trigger, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="text-orange-500">⚠️</span>
                    <span>{trigger}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-slate-700 mb-2">Auto Scaling:</h4>
              <div className="text-sm">
                <span className="text-green-600 font-medium">{deploymentInfrastructure.operationalAnalytics.capacityPlanning.autoScaling}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-800">Deployment & Infrastructure</h1>
        <div className="flex space-x-2">
          <button className="btn btn-primary">🔧 Manage</button>
          <button className="btn btn-secondary">📊 Reports</button>
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
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'cloud' && renderCloud()}
      {activeTab === 'databases' && renderDatabases()}
      {activeTab === 'devops' && renderDevOps()}
      {activeTab === 'monitoring' && renderMonitoring()}
      {activeTab === 'logging' && renderLogging()}
      {activeTab === 'analytics' && renderAnalytics()}
    </div>
  );
}