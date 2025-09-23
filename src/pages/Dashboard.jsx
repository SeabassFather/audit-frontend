import React from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

const stats = [
  { label: "Active Audits", value: "1,247", change: "+12%", color: "text-green-600", icon: "⚡" },
  { label: "Total Recovery", value: "$2.8M", change: "+23%", color: "text-blue-600", icon: "💰" },
  { label: "Success Rate", value: "94.2%", change: "+2.1%", color: "text-purple-600", icon: "📊" },
  { label: "Active Clients", value: "356", change: "+8%", color: "text-orange-600", icon: "👥" },
];

const quickActions = [
  { to: "/services", label: "Start New Audit", icon: "🔍", description: "Launch a comprehensive financial audit" },
  { to: "/uploads", label: "Upload Documents", icon: "📁", description: "Upload client documents for processing" },
  { to: "/audit-engines", label: "AI Analysis", icon: "🤖", description: "Access AI-powered audit tools" },
  { to: "/mexico-loans", label: "Mexico RE/Loans", icon: "🏠", description: "Cross-border real estate services" },
];

const recentActivity = [
  { type: "audit", client: "Jane Grower", action: "Mortgage audit completed", amount: "$3,240", time: "2 hours ago" },
  { type: "recovery", client: "Marco Buyer", action: "Recovery payment received", amount: "$1,850", time: "4 hours ago" },
  { type: "upload", client: "Lee Driver", action: "Documents uploaded", amount: "", time: "6 hours ago" },
  { type: "audit", client: "Sarah Martinez", action: "Insurance audit initiated", amount: "$1,200", time: "1 day ago" },
];

export default function Dashboard() {
  const { theme, isFuturistic, isDark } = useTheme();
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="animate-fade-in">
          <h1 className={`
            text-3xl font-bold transition-all duration-300
            ${isFuturistic 
              ? 'text-transparent bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text' 
              : isDark 
                ? 'text-white' 
                : 'text-gray-900'
            }
          `}>
            Dashboard
          </h1>
          <p className={`
            mt-2 transition-colors duration-300
            ${isFuturistic ? 'text-cyan-200/80' : isDark ? 'text-gray-300' : 'text-gray-600'}
          `}>
            Welcome back! Here's your AuditDNA overview.
          </p>
        </div>
        <NavLink 
          to="/services" 
          className={`
            btn px-6 py-3 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105
            ${isFuturistic 
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-[0_0_20px_rgba(0,212,255,0.4)] hover:shadow-[0_0_30px_rgba(0,212,255,0.6)]' 
              : isDark
                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }
          `}
        >
          Start New Audit
        </NavLink>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className={`
              card p-6 transition-all duration-300 hover:scale-105 cursor-pointer group
              ${isFuturistic ? 'hover:shadow-[0_0_30px_rgba(0,212,255,0.3)]' : ''}
            `}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className={`
                    text-lg transition-all duration-300 group-hover:scale-110
                    ${isFuturistic ? 'filter drop-shadow-[0_0_8px_rgba(0,212,255,0.6)]' : ''}
                  `}>
                    {stat.icon}
                  </span>
                  <p className={`
                    text-sm font-medium transition-colors duration-300
                    ${isFuturistic ? 'text-cyan-300/80' : isDark ? 'text-gray-300' : 'text-gray-600'}
                  `}>
                    {stat.label}
                  </p>
                </div>
                <p className={`
                  text-2xl font-bold transition-colors duration-300
                  ${isFuturistic 
                    ? 'text-transparent bg-gradient-to-r from-cyan-300 to-green-300 bg-clip-text' 
                    : isDark 
                      ? 'text-white' 
                      : 'text-gray-900'
                  }
                `}>
                  {stat.value}
                </p>
              </div>
              <div className={`
                text-sm font-medium px-2 py-1 rounded-full transition-all duration-300
                ${isFuturistic 
                  ? 'text-green-300 bg-green-500/20 border border-green-400/30' 
                  : `${stat.color} bg-opacity-10`
                }
              `}>
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className={`
          text-xl font-semibold mb-6 transition-colors duration-300
          ${isFuturistic 
            ? 'text-transparent bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text' 
            : isDark 
              ? 'text-white' 
              : 'text-gray-900'
          }
        `}>
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <NavLink 
              key={index} 
              to={action.to}
              className={`
                p-6 rounded-lg border transition-all duration-300 group hover:scale-105 transform
                ${isFuturistic 
                  ? 'border-cyan-500/30 hover:border-cyan-400/60 bg-gradient-to-br from-slate-800/50 to-slate-700/50 hover:shadow-[0_0_20px_rgba(0,212,255,0.3)]' 
                  : isDark
                    ? 'border-gray-600 hover:border-gray-500 bg-gray-800 hover:bg-gray-700'
                    : 'border-gray-200 hover:border-ocean-300 hover:bg-ocean-50'
                }
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`
                text-2xl mb-3 transition-all duration-300 group-hover:scale-110
                ${isFuturistic ? 'filter drop-shadow-[0_0_12px_rgba(0,212,255,0.8)]' : ''}
              `}>
                {action.icon}
              </div>
              <h3 className={`
                font-medium transition-colors duration-300
                ${isFuturistic 
                  ? 'text-cyan-200 group-hover:text-cyan-100' 
                  : isDark
                    ? 'text-white group-hover:text-gray-100'
                    : 'text-gray-900 group-hover:text-ocean-700'
                }
              `}>
                {action.label}
              </h3>
              <p className={`
                text-sm mt-2 transition-colors duration-300
                ${isFuturistic 
                  ? 'text-cyan-300/70 group-hover:text-cyan-200/80' 
                  : isDark
                    ? 'text-gray-400 group-hover:text-gray-300'
                    : 'text-gray-600'
                }
              `}>
                {action.description}
              </p>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className={`
            text-xl font-semibold transition-colors duration-300
            ${isFuturistic 
              ? 'text-transparent bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text' 
              : isDark 
                ? 'text-white' 
                : 'text-gray-900'
            }
          `}>
            Recent Activity
          </h2>
          <NavLink 
            to="/admin" 
            className={`
              text-sm font-medium transition-all duration-300 hover:scale-105
              ${isFuturistic 
                ? 'text-cyan-400 hover:text-cyan-300 hover:shadow-[0_0_10px_rgba(0,212,255,0.5)]' 
                : isDark
                  ? 'text-blue-400 hover:text-blue-300'
                  : 'text-ocean-600 hover:text-ocean-700'
              }
            `}
          >
            View All
          </NavLink>
        </div>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div 
              key={index} 
              className={`
                flex items-center justify-between py-4 border-b last:border-b-0 transition-all duration-300 hover:scale-[1.02] rounded-lg hover:px-2
                ${isFuturistic 
                  ? 'border-cyan-500/20 hover:bg-cyan-500/10' 
                  : isDark
                    ? 'border-gray-700 hover:bg-gray-800/50'
                    : 'border-gray-100 hover:bg-gray-50'
                }
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-4">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all duration-300
                  ${activity.type === 'audit' 
                    ? (isFuturistic ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30' : 'bg-blue-100 text-blue-600')
                    : activity.type === 'recovery' 
                      ? (isFuturistic ? 'bg-green-500/20 text-green-300 border border-green-400/30' : 'bg-green-100 text-green-600')
                      : (isFuturistic ? 'bg-gray-500/20 text-gray-300 border border-gray-400/30' : 'bg-gray-100 text-gray-600')
                  }
                `}>
                  {activity.type === 'audit' ? '🔍' : activity.type === 'recovery' ? '💰' : '📁'}
                </div>
                <div>
                  <p className={`
                    font-medium transition-colors duration-300
                    ${isFuturistic ? 'text-cyan-200' : isDark ? 'text-white' : 'text-gray-900'}
                  `}>
                    {activity.client}
                  </p>
                  <p className={`
                    text-sm transition-colors duration-300
                    ${isFuturistic ? 'text-cyan-300/70' : isDark ? 'text-gray-400' : 'text-gray-600'}
                  `}>
                    {activity.action}
                  </p>
                </div>
              </div>
              <div className="text-right">
                {activity.amount && (
                  <p className={`
                    font-medium transition-colors duration-300
                    ${isFuturistic ? 'text-green-300' : isDark ? 'text-white' : 'text-gray-900'}
                  `}>
                    {activity.amount}
                  </p>
                )}
                <p className={`
                  text-sm transition-colors duration-300
                  ${isFuturistic ? 'text-cyan-400/60' : isDark ? 'text-gray-500' : 'text-gray-500'}
                `}>
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}