import React from 'react';

export const MetricCard = ({ title, value, change, trend, icon, color, className = '' }) => {
  const trendColor = trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600';
  const trendIcon = trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→';
  
  return (
    <div className={`metric-card ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <span className="text-white text-xl font-bold">{icon}</span>
        </div>
      </div>
      {change && (
        <div className="flex items-center mt-3">
          <span className={`text-sm font-medium ${trendColor}`}>
            {trendIcon} {change}
          </span>
          <span className="text-sm text-gray-500 ml-2">vs last period</span>
        </div>
      )}
    </div>
  );
};

export const ServiceCard = ({ service, category, onClick }) => {
  return (
    <div 
      className="card card-hover cursor-pointer"
      onClick={() => onClick && onClick(service)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900 mb-2">{service.name}</h3>
          <p className="text-gray-600 text-sm mb-4">{service.description}</p>
          
          {service.features && (
            <div className="flex flex-wrap gap-2 mb-4">
              {service.features.slice(0, 3).map((feature, index) => (
                <span 
                  key={index}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs"
                >
                  {feature}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div className="text-right">
          <div className="text-lg font-bold text-brand-blue">{service.price}</div>
          {service.popular && (
            <span className="bg-gradient-to-r from-brand-green to-brand-yellow text-gray-900 px-2 py-1 rounded-md text-xs font-medium">
              Popular
            </span>
          )}
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <button className="btn btn-primary w-full">
          Learn More
        </button>
      </div>
    </div>
  );
};

export const ActivityItem = ({ activity }) => {
  const statusColors = {
    completed: 'bg-green-100 text-green-800',
    success: 'bg-blue-100 text-blue-800',
    pending: 'bg-yellow-100 text-yellow-800',
    new: 'bg-purple-100 text-purple-800',
    info: 'bg-gray-100 text-gray-800'
  };
  
  return (
    <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[activity.status]}`}>
        {activity.status}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
        <p className="text-xs text-gray-500 mt-1">
          {activity.user} • {activity.timestamp}
        </p>
      </div>
    </div>
  );
};

export const TickerItem = ({ ticker }) => {
  const isPositive = ticker.change >= 0;
  const changeColor = isPositive ? 'text-green-600' : 'text-red-600';
  const bgColor = isPositive ? 'bg-green-50' : 'bg-red-50';
  
  return (
    <div className={`p-3 rounded-lg ${bgColor} border border-gray-200`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="font-medium text-gray-900">{ticker.symbol}</p>
          <p className="text-xs text-gray-600">{ticker.name}</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-gray-900">${ticker.price}</p>
          <p className={`text-xs ${changeColor}`}>
            {isPositive ? '+' : ''}{ticker.changePercent}%
          </p>
        </div>
      </div>
    </div>
  );
};

export const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };
  
  return (
    <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-brand-blue ${sizeClasses[size]} ${className}`}></div>
  );
};

export const EmptyState = ({ title, description, icon, action }) => {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
        <span className="text-2xl text-gray-400">{icon}</span>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-sm mx-auto">{description}</p>
      {action && action}
    </div>
  );
};