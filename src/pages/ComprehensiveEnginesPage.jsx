import React, { useState } from 'react';
import { 
  Calculator, Brain, ShieldCheck, Upload, Users, Cog, Zap,
  Play, Pause, Settings, Activity, CheckCircle, Clock, AlertTriangle,
  ChevronDown, ChevronRight, BarChart3, FileText, Workflow
} from 'lucide-react';
import { comprehensiveEngines, engineTriggers } from '../data/comprehensiveEngines';

// Icon mapping for engines
const engineIconMap = {
  'Calculator': Calculator,
  'Brain': Brain,
  'ShieldCheck': ShieldCheck,
  'Upload': Upload,
  'Users': Users,
  'Cog': Cog,
  'Zap': Zap
};

// Engine status component
const EngineStatus = ({ status, isRunning = false }) => {
  const getStatusConfig = () => {
    if (isRunning) return { color: 'text-blue-600', icon: Activity, label: 'Running' };
    
    switch (status) {
      case 'active': return { color: 'text-green-600', icon: CheckCircle, label: 'Active' };
      case 'development': return { color: 'text-yellow-600', icon: Clock, label: 'Development' };
      case 'maintenance': return { color: 'text-orange-600', icon: AlertTriangle, label: 'Maintenance' };
      case 'priority': return { color: 'text-red-600', icon: Zap, label: 'Priority' };
      default: return { color: 'text-gray-600', icon: Clock, label: 'Unknown' };
    }
  };

  const { color, icon: Icon, label } = getStatusConfig();
  
  return (
    <div className={`flex items-center gap-1 ${color}`}>
      <Icon className={`w-4 h-4 ${isRunning ? 'animate-pulse' : ''}`} />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};

// Individual engine component
const EngineCard = ({ engine, onTrigger, isRunning, results }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-semibold text-gray-900">{engine.name}</h4>
              <EngineStatus status={engine.status} isRunning={isRunning} />
              {engine.priority && (
                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                  {engine.priority}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-3">{engine.description}</p>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-2 p-1 hover:bg-gray-100 rounded transition-colors"
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        {/* Engine Controls */}
        <div className="flex items-center gap-2 mb-3">
          <button
            onClick={() => onTrigger(engine)}
            disabled={isRunning}
            className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded transition-colors ${
              isRunning 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4" />
                Processing...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Execute Engine
              </>
            )}
          </button>
          
          {engine.triggerPath && (
            <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50 transition-colors">
              <Settings className="w-3 h-3" />
              Configure
            </button>
          )}
        </div>

        {/* Execution Results */}
        {results && (
          <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Execution Result</span>
            </div>
            <p className="text-sm text-blue-700 mb-2">{results.message}</p>
            {results.results && (
              <ul className="text-sm text-blue-600 space-y-1">
                {results.results.map((result, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3" />
                    {result}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Expanded Features */}
        {isExpanded && (
          <div className="pt-3 border-t border-gray-100">
            <h5 className="text-sm font-medium text-gray-700 mb-2">Engine Features:</h5>
            <ul className="text-sm text-gray-600 space-y-1 mb-3">
              {engine.features?.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
            
            {engine.backendLogic && (
              <div className="text-xs text-gray-500">
                <span className="font-medium">Backend Logic:</span> {engine.backendLogic}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Engine category section
const EngineCategorySection = ({ engineCategory, onEngineTrigger, runningEngines, engineResults }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const IconComponent = engineIconMap[engineCategory.icon] || Cog;

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div 
        className="p-4 bg-gray-50 border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <IconComponent className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-gray-900">{engineCategory.name}</h3>
                <EngineStatus status={engineCategory.status} />
                {engineCategory.version && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">
                    v{engineCategory.version}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600">{engineCategory.description}</p>
              <p className="text-xs text-gray-500 mt-1">{engineCategory.engines?.length || 0} engines</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-gray-400" />
            {isExpanded ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-5 h-5 text-gray-400" />}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4">
          <div className="grid gap-4 lg:grid-cols-2">
            {engineCategory.engines?.map((engine) => (
              <EngineCard
                key={engine.id}
                engine={engine}
                onTrigger={onEngineTrigger}
                isRunning={runningEngines.has(engine.id)}
                results={engineResults[engine.id]}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Main comprehensive engines page
export default function ComprehensiveEnginesPage() {
  const [runningEngines, setRunningEngines] = useState(new Set());
  const [engineResults, setEngineResults] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const handleEngineTrigger = async (engine) => {
    const engineId = engine.id;
    
    // Start engine execution
    setRunningEngines(prev => new Set(prev).add(engineId));
    setEngineResults(prev => ({
      ...prev,
      [engineId]: { status: 'processing', message: 'Engine initializing...' }
    }));

    // Simulate engine processing
    setTimeout(() => {
      const triggerFunction = engineTriggers[engine.backendLogic] || engineTriggers.default;
      const result = triggerFunction({ engineId, engineData: engine });
      
      setEngineResults(prev => ({
        ...prev,
        [engineId]: {
          ...result,
          timestamp: new Date().toLocaleTimeString(),
          engineName: engine.name
        }
      }));
      
      setRunningEngines(prev => {
        const newSet = new Set(prev);
        newSet.delete(engineId);
        return newSet;
      });
    }, 3000);
  };

  // Filter engines based on search
  const filteredEngines = comprehensiveEngines.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.engines?.some(engine => 
      engine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      engine.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Calculate stats
  const totalEngines = comprehensiveEngines.reduce((acc, cat) => acc + (cat.engines?.length || 0), 0);
  const activeEngines = comprehensiveEngines.reduce((acc, cat) => 
    acc + (cat.engines?.filter(e => e.status === 'active').length || 0), 0
  );
  const runningCount = runningEngines.size;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AuditDNA Engine Suite</h1>
              <p className="mt-2 text-gray-600">Comprehensive audit engines with backend processing simulation</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{totalEngines}</div>
                <div className="text-gray-500">Total Engines</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{activeEngines}</div>
                <div className="text-gray-500">Active</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{runningCount}</div>
                <div className="text-gray-500">Running</div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-6">
            <input
              type="text"
              placeholder="Search engines, features, or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Running Engines Banner */}
      {runningCount > 0 && (
        <div className="bg-blue-50 border-b border-blue-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600 animate-pulse" />
              <span className="text-blue-800 font-medium">
                {runningCount} engine{runningCount > 1 ? 's' : ''} currently processing...
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Recent Results Banner */}
      {Object.keys(engineResults).length > 0 && (
        <div className="bg-green-50 border-b border-green-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <h3 className="text-sm font-medium text-green-800 mb-2">Recent Engine Results:</h3>
            <div className="space-y-1">
              {Object.entries(engineResults)
                .filter(([_, result]) => result.status === 'processing' || result.timestamp)
                .slice(-3)
                .map(([engineId, result]) => (
                <div key={engineId} className="flex items-center gap-2 text-sm">
                  {result.status === 'processing' ? (
                    <Clock className="w-4 h-4 text-yellow-500 animate-spin" />
                  ) : (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                  <span className="text-green-700">{result.engineName}: {result.message}</span>
                  {result.timestamp && (
                    <span className="text-green-500 text-xs">({result.timestamp})</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Engine Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {filteredEngines.map((engineCategory) => (
            <EngineCategorySection
              key={engineCategory.id}
              engineCategory={engineCategory}
              onEngineTrigger={handleEngineTrigger}
              runningEngines={runningEngines}
              engineResults={engineResults}
            />
          ))}
        </div>

        {filteredEngines.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Cog className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No engines found</h3>
            <p className="text-gray-600">Try adjusting your search terms or clear the search to see all engines.</p>
          </div>
        )}

        {/* Engine Documentation */}
        <div className="mt-12 bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Engine Documentation</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">How Engines Work</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Engines simulate backend processing for audit workflows</li>
                <li>• Each engine has specific features and processing capabilities</li>
                <li>• Results are returned with status indicators and detailed output</li>
                <li>• Engines can be configured and customized for specific use cases</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Engine Categories</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• <strong>Financial:</strong> Mortgage, banking, and credit processing</li>
                <li>• <strong>AI & Automation:</strong> OCR, document analysis, letter generation</li>
                <li>• <strong>Compliance:</strong> Regulatory validation and audit checks</li>
                <li>• <strong>Specialized:</strong> Industry-specific processing engines</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}