import React, { useState } from 'react';
import { 
  CheckCircle, Clock, AlertCircle, User, Calendar, ArrowRight,
  ChevronDown, ChevronRight, BarChart3, Target, Zap, Filter,
  Download, RefreshCw, TrendingUp
} from 'lucide-react';
import { auditDNAElite2Checklist, checklistStatusTypes, priorityLevels } from '../data/developmentChecklist';

// Status badge component
const StatusBadge = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'completed':
        return { color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle, label: 'Completed' };
      case 'in-progress':
        return { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: Clock, label: 'In Progress' };
      case 'planned':
        return { color: 'bg-gray-100 text-gray-800 border-gray-200', icon: Calendar, label: 'Planned' };
      case 'blocked':
        return { color: 'bg-red-100 text-red-800 border-red-200', icon: AlertCircle, label: 'Blocked' };
      case 'on-hold':
        return { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: AlertCircle, label: 'On Hold' };
      default:
        return { color: 'bg-gray-100 text-gray-800 border-gray-200', icon: Clock, label: 'Unknown' };
    }
  };

  const { color, icon: Icon, label } = getStatusConfig();
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${color}`}>
      <Icon className="w-3 h-3 mr-1" />
      {label}
    </span>
  );
};

// Priority badge component
const PriorityBadge = ({ priority }) => {
  const getPriorityColor = () => {
    switch (priority) {
      case 'ASAP': return 'bg-red-100 text-red-800 border-red-200';
      case 'HIGH': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'LOW': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getPriorityColor()}`}>
      {priority === 'ASAP' && <Zap className="w-3 h-3 mr-1" />}
      {priority}
    </span>
  );
};

// Individual checklist item component
const ChecklistItem = ({ item, onStatusChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isOverdue = new Date(item.dueDate) < new Date() && item.status !== 'completed';

  return (
    <div className={`bg-white border rounded-lg p-4 ${isOverdue ? 'border-red-200 bg-red-50' : 'border-gray-200'}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-400 hover:text-gray-600"
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            <h4 className={`font-medium ${isOverdue ? 'text-red-900' : 'text-gray-900'}`}>
              {item.name}
            </h4>
            <StatusBadge status={item.status} />
            <PriorityBadge priority={item.priority} />
            {isOverdue && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                <AlertCircle className="w-3 h-3 mr-1" />
                Overdue
              </span>
            )}
          </div>
          
          <div className="ml-6 space-y-2">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{item.assignee}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(item.dueDate).toLocaleDateString()}</span>
              </div>
            </div>
            
            {item.dependencies?.length > 0 && (
              <div className="text-sm text-gray-600">
                <span className="font-medium">Dependencies:</span> {item.dependencies.join(', ')}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <select
            value={item.status}
            onChange={(e) => onStatusChange(item.id, e.target.value)}
            className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {Object.values(checklistStatusTypes).map(status => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 ml-6 pt-4 border-t border-gray-100">
          {item.notes && (
            <div className="mb-3">
              <h5 className="text-sm font-medium text-gray-700 mb-1">Notes:</h5>
              <p className="text-sm text-gray-600">{item.notes}</p>
            </div>
          )}
          
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-500">Item ID: {item.id}</span>
            <span className="text-gray-500">Due: {new Date(item.dueDate).toLocaleDateString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Category section component
const CategorySection = ({ category, onItemStatusChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const completed = category.items.filter(item => item.status === 'completed').length;
  const total = category.items.length;
  const completionPercentage = Math.round((completed / total) * 100);

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div 
        className="p-4 bg-gray-50 border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
              <PriorityBadge priority={category.priority} />
              <StatusBadge status={category.status} />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">
                {completed}/{total} completed
              </div>
              <div className="text-xs text-gray-500">
                {completionPercentage}% complete
              </div>
            </div>
            <div className="w-24 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            {isExpanded ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-5 h-5 text-gray-400" />}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4">
          <div className="space-y-3">
            {category.items.map((item) => (
              <ChecklistItem
                key={item.id}
                item={item}
                onStatusChange={onItemStatusChange}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Main development checklist page
export default function DevelopmentChecklistPage() {
  const [checklist, setChecklist] = useState(auditDNAElite2Checklist);
  const [filterPriority, setFilterPriority] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showOverdueOnly, setShowOverdueOnly] = useState(false);

  const handleItemStatusChange = (itemId, newStatus) => {
    setChecklist(prev => ({
      ...prev,
      categories: prev.categories.map(category => ({
        ...category,
        items: category.items.map(item =>
          item.id === itemId ? { ...item, status: newStatus } : item
        )
      }))
    }));
  };

  // Get filtered categories
  const filteredCategories = checklist.categories.map(category => ({
    ...category,
    items: category.items.filter(item => {
      const matchesPriority = !filterPriority || item.priority === filterPriority;
      const matchesStatus = !filterStatus || item.status === filterStatus;
      const isOverdue = new Date(item.dueDate) < new Date() && item.status !== 'completed';
      const matchesOverdue = !showOverdueOnly || isOverdue;
      
      return matchesPriority && matchesStatus && matchesOverdue;
    })
  })).filter(category => category.items.length > 0);

  // Calculate overall progress
  const progressStats = checklist.getProgressStats();
  const overdueItems = checklist.getOverdueItems();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{checklist.title}</h1>
              <p className="mt-2 text-gray-600">Version {checklist.version} • Last updated: {new Date(checklist.lastUpdated).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                <span className="text-blue-800 font-medium">Total Progress</span>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold text-blue-900">{progressStats.completionPercentage}%</div>
                <div className="text-sm text-blue-700">{progressStats.completed}/{progressStats.total} items</div>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-800 font-medium">Completed</span>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold text-green-900">{progressStats.completed}</div>
                <div className="text-sm text-green-700">items finished</div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-yellow-600" />
                <span className="text-yellow-800 font-medium">In Progress</span>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold text-yellow-900">{progressStats.inProgress}</div>
                <div className="text-sm text-yellow-700">items active</div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-red-800 font-medium">Overdue</span>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold text-red-900">{overdueItems.length}</div>
                <div className="text-sm text-red-700">items overdue</div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>
            
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="text-sm border border-gray-300 rounded px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Priorities</option>
              {Object.values(priorityLevels).map(priority => (
                <option key={priority} value={priority}>{priority}</option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-sm border border-gray-300 rounded px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Statuses</option>
              {Object.values(checklistStatusTypes).map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                </option>
              ))}
            </select>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={showOverdueOnly}
                onChange={(e) => setShowOverdueOnly(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              Show overdue only
            </label>
          </div>
        </div>
      </div>

      {/* Checklist Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {filteredCategories.map((category) => (
            <CategorySection
              key={category.id}
              category={category}
              onItemStatusChange={handleItemStatusChange}
            />
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <CheckCircle className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600">Try adjusting your filters to see checklist items.</p>
          </div>
        )}

        {/* Progress Summary */}
        <div className="mt-12 bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Development Progress Summary</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Key Milestones</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Core Infrastructure: {Math.round((checklist.categories.find(c => c.id === 'core-infrastructure')?.items.filter(i => i.status === 'completed').length || 0) / (checklist.categories.find(c => c.id === 'core-infrastructure')?.items.length || 1) * 100)}% complete</li>
                <li>• AI & Automation: {Math.round((checklist.categories.find(c => c.id === 'ai-automation')?.items.filter(i => i.status === 'completed').length || 0) / (checklist.categories.find(c => c.id === 'ai-automation')?.items.length || 1) * 100)}% complete</li>
                <li>• Regulatory Compliance: {Math.round((checklist.categories.find(c => c.id === 'regulatory-compliance')?.items.filter(i => i.status === 'completed').length || 0) / (checklist.categories.find(c => c.id === 'regulatory-compliance')?.items.length || 1) * 100)}% complete</li>
                <li>• Deployment & DevOps: {Math.round((checklist.categories.find(c => c.id === 'deployment-devops')?.items.filter(i => i.status === 'completed').length || 0) / (checklist.categories.find(c => c.id === 'deployment-devops')?.items.length || 1) * 100)}% complete</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Next Steps</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Focus on ASAP priority items for immediate deployment</li>
                <li>• Complete core infrastructure before advancing to specialized modules</li>
                <li>• Address overdue items to maintain project timeline</li>
                <li>• Regular progress reviews and checklist updates</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}