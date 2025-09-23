import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, Shield, Heart, Home, UserCheck, Scale, Zap, 
  CheckCircle, Clock, AlertCircle, Play, Settings, ArrowRight,
  ChevronDown, ChevronRight, Activity
} from 'lucide-react';
import { comprehensiveModules } from '../data/comprehensiveModules';

// Icon mapping for modules
const iconMap = {
  'Building2': Building2,
  'Shield': Shield, 
  'Heart': Heart,
  'Home': Home,
  'UserCheck': UserCheck,
  'Scale': Scale,
  'Zap': Zap
};

// Status badge component
const StatusBadge = ({ status, priority = null }) => {
  const getStatusColor = () => {
    if (priority === 'ASAP') return 'bg-red-100 text-red-800 border-red-200';
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'development': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'priority': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor()}`}>
      {priority === 'ASAP' && <Zap className="w-3 h-3 mr-1" />}
      {status === 'active' && <CheckCircle className="w-3 h-3 mr-1" />}
      {status === 'development' && <Clock className="w-3 h-3 mr-1" />}
      {status === 'priority' && <AlertCircle className="w-3 h-3 mr-1" />}
      {priority || status}
    </span>
  );
};

// Individual module card component
const ModuleCard = ({ module, onTrigger }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-semibold text-gray-900">{module.name}</h4>
            <StatusBadge status={module.status} priority={module.priority} />
          </div>
          <p className="text-sm text-gray-600 mb-2">{module.description}</p>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-2 p-1 hover:bg-gray-100 rounded transition-colors"
        >
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="mb-3">
            <h5 className="text-sm font-medium text-gray-700 mb-2">Features:</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              {module.features?.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex gap-2">
            {module.actionable && (
              <button
                onClick={() => onTrigger(module)}
                className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
              >
                <Play className="w-3 h-3" />
                Execute
              </button>
            )}
            {module.drillDownPath && (
              <Link
                to={module.drillDownPath}
                className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50 transition-colors"
              >
                <Settings className="w-3 h-3" />
                Configure
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Module category section component
const ModuleCategorySection = ({ categoryData, onModuleTrigger }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const IconComponent = iconMap[categoryData.icon] || Building2;

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
                <h3 className="text-lg font-semibold text-gray-900">{categoryData.title}</h3>
                <StatusBadge status={categoryData.status} priority={categoryData.priority} />
              </div>
              <p className="text-sm text-gray-600">{categoryData.description}</p>
              <p className="text-xs text-gray-500 mt-1">{categoryData.modules?.length || 0} modules</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-gray-400" />
            {isExpanded ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-5 h-5 text-gray-400" />}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categoryData.modules?.map((module, idx) => (
              <ModuleCard 
                key={module.id || idx} 
                module={module} 
                onTrigger={onModuleTrigger}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Main comprehensive modules page
export default function ComprehensiveModulesPage() {
  const [executionResults, setExecutionResults] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const handleModuleTrigger = async (module) => {
    // Simulate backend processing
    setExecutionResults(prev => ({
      ...prev,
      [module.id]: { status: 'processing', message: 'Initializing module...' }
    }));

    // Simulate processing delay
    setTimeout(() => {
      setExecutionResults(prev => ({
        ...prev,
        [module.id]: {
          status: 'completed',
          message: `${module.name} executed successfully`,
          timestamp: new Date().toLocaleTimeString(),
          results: module.features?.slice(0, 3) || ['Process completed', 'Data validated', 'Report generated']
        }
      }));
    }, 2000);
  };

  // Filter modules based on search
  const filteredModules = comprehensiveModules.filter(category =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.modules?.some(module => 
      module.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Calculate overall stats
  const totalModules = comprehensiveModules.reduce((acc, cat) => acc + (cat.modules?.length || 0), 0);
  const activeModules = comprehensiveModules.reduce((acc, cat) => 
    acc + (cat.modules?.filter(m => m.status === 'active').length || 0), 0
  );
  const priorityModules = comprehensiveModules.reduce((acc, cat) => 
    acc + (cat.modules?.filter(m => m.priority === 'ASAP').length || 0), 0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AuditDNA Comprehensive Modules</h1>
              <p className="mt-2 text-gray-600">Complete audit and compliance module suite with interactive engines</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{totalModules}</div>
                <div className="text-gray-500">Total Modules</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{activeModules}</div>
                <div className="text-gray-500">Active</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{priorityModules}</div>
                <div className="text-gray-500">Priority</div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-6">
            <input
              type="text"
              placeholder="Search modules, features, or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Execution Results Banner */}
      {Object.keys(executionResults).length > 0 && (
        <div className="bg-blue-50 border-b border-blue-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Recent Executions:</h3>
            <div className="space-y-1">
              {Object.entries(executionResults).slice(-3).map(([moduleId, result]) => (
                <div key={moduleId} className="flex items-center gap-2 text-sm">
                  {result.status === 'processing' ? (
                    <Clock className="w-4 h-4 text-yellow-500 animate-spin" />
                  ) : (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                  <span className="text-blue-700">{result.message}</span>
                  {result.timestamp && (
                    <span className="text-blue-500 text-xs">({result.timestamp})</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Module Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {filteredModules.map((category) => (
            <ModuleCategorySection
              key={category.id}
              categoryData={category}
              onModuleTrigger={handleModuleTrigger}
            />
          ))}
        </div>

        {filteredModules.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Settings className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No modules found</h3>
            <p className="text-gray-600">Try adjusting your search terms or clear the search to see all modules.</p>
          </div>
        )}

        {/* Quick Navigation */}
        <div className="mt-12 bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Navigation</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/engines" className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Settings className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium">Audit Engines</span>
              <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
            </Link>
            <Link to="/checklist" className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <CheckCircle className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium">Development Checklist</span>
              <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
            </Link>
            <Link to="/partners" className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <UserCheck className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium">Partner Portal</span>
              <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
            </Link>
            <Link to="/dashboard" className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Activity className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium">Dashboard</span>
              <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}