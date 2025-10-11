import { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  FileText,
  BarChart3,
  Shield,
  Leaf,
  CreditCard,
  Download,
  Clock,
  Activity,
  Zap,
  Users,
  Target,
} from "lucide-react";
import Ticker from "../components/Ticker";

export default function Dashboard() {
  const [stats] = useState([
    {
      title: "USDA Pricing",
      value: "$2.45 / lb",
      icon: <DollarSign className="w-6 h-6 text-emerald-600" />,
      desc: "Latest weekly average",
      trend: "+2.4%",
      positive: true,
    },
    {
      title: "Mortgage Rates",
      value: "6.8%",
      icon: <TrendingUp className="w-6 h-6 text-blue-600" />,
      desc: "30yr fixed (avg)",
      trend: "-0.1%",
      positive: true,
    },
    {
      title: "Compliance Alerts",
      value: "3",
      icon: <AlertCircle className="w-6 h-6 text-amber-600" />,
      desc: "Pending review",
      trend: "2 new",
      positive: false,
    },
    {
      title: "Audits Completed",
      value: "27",
      icon: <CheckCircle className="w-6 h-6 text-emerald-600" />,
      desc: "This quarter",
      trend: "+5 this week",
      positive: true,
    },
  ]);

  const [audits] = useState([
    { name: "Mortgage File Review", status: "Complete", risk: "Low" },
    { name: "Consumer Privacy Audit", status: "In Progress", risk: "Medium" },
    { name: "Agri-Factoring Audit", status: "Pending", risk: "High" },
  ]);

  const [modules, setModules] = useState([
    { 
      name: "USDA Pricing", 
      icon: Leaf, 
      enabled: true, 
      revenue: "$890K",
      clients: 1203,
      avgDeal: "$740",
      color: "#10b981"
    },
    { 
      name: "Mortgage Lending", 
      icon: CreditCard, 
      enabled: true, 
      revenue: "$2.4M",
      clients: 847,
      avgDeal: "$2,834",
      color: "#3b82f6"
    },
    { 
      name: "Compliance Suite", 
      icon: Shield, 
      enabled: true, 
      revenue: "$3.8M",
      clients: 2341,
      avgDeal: "$1,623",
      color: "#8b5cf6"
    },
    { 
      name: "WaterTech Analytics", 
      icon: Activity, 
      enabled: false, 
      revenue: "$1.2M",
      clients: 456,
      avgDeal: "$2,631",
      color: "#06b6d4"
    },
    { 
      name: "Factoring Module", 
      icon: DollarSign, 
      enabled: false, 
      revenue: "$0",
      clients: 0,
      avgDeal: "$0",
      color: "#f59e0b"
    },
  ]);

  const toggleModule = (index) => {
    setModules(prev => prev.map((m, i) => 
      i === index ? { ...m, enabled: !m.enabled } : m
    ));
  };

  const totalRevenue = modules
    .filter(m => m.enabled)
    .reduce((sum, m) => sum + parseFloat(m.revenue.replace(/[$MK,]/g, '')) * (m.revenue.includes('M') ? 1000000 : 1000), 0);

  const totalClients = modules.filter(m => m.enabled).reduce((sum, m) => sum + m.clients, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Ticker />

      <div className="p-8 max-w-[1600px] mx-auto space-y-8">
        {/* Header with Total Revenue */}
        <header className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">AuditDNA Dashboard</h1>
              <p className="text-lg text-gray-600">Real-time compliance, pricing, and revenue analytics</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-1">Total Active Revenue</div>
              <div className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                ${(totalRevenue / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-gray-600 mt-1">{totalClients.toLocaleString()} active clients</div>
            </div>
          </div>
        </header>

        {/* KPI Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  {s.icon}
                </div>
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                  s.positive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                }`}>
                  {s.trend}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-gray-600 mb-1">{s.title}</h3>
              <div className="text-3xl font-bold text-gray-900 mb-1">{s.value}</div>
              <p className="text-sm text-gray-500">{s.desc}</p>
            </div>
          ))}
        </section>

        {/* Module Revenue Control */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-blue-50 rounded-xl">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Revenue Stream Management</h2>
              <p className="text-gray-600">Toggle modules to activate revenue channels</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, idx) => (
              <div
                key={idx}
                className={`relative rounded-xl border-2 p-6 transition-all duration-300 ${
                  module.enabled 
                    ? 'bg-white border-gray-300 shadow-md'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                {/* Revenue Badge */}
                {module.enabled && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-2 rounded-full shadow-lg">
                    <span className="text-sm font-bold">{module.revenue}</span>
                  </div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <div 
                    className="p-3 rounded-xl transition-all duration-300" 
                    style={{ 
                      backgroundColor: module.enabled ? `${module.color}15` : '#f3f4f6'
                    }}
                  >
                    <module.icon 
                      className="w-7 h-7" 
                      style={{ color: module.enabled ? module.color : '#9ca3af' }}
                    />
                  </div>
                  
                  {/* Professional Toggle Switch */}
                  <button
                    onClick={() => toggleModule(idx)}
                    className={`relative w-16 h-8 rounded-full transition-all duration-300 ${
                      module.enabled ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${
                      module.enabled ? 'left-9' : 'left-1'
                    }`}></div>
                  </button>
                </div>
                
                <h3 className={`font-bold text-lg mb-3 ${module.enabled ? 'text-gray-900' : 'text-gray-500'}`}>
                  {module.name}
                </h3>

                {/* Revenue Metrics */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Revenue</span>
                    <span className={`font-bold ${module.enabled ? 'text-emerald-600' : 'text-gray-400'}`}>
                      {module.revenue}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Clients</span>
                    <span className={`font-semibold ${module.enabled ? 'text-gray-900' : 'text-gray-400'}`}>
                      {module.clients.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Avg Deal</span>
                    <span className={`font-semibold ${module.enabled ? 'text-gray-900' : 'text-gray-400'}`}>
                      {module.avgDeal}
                    </span>
                  </div>
                </div>

                {/* Status */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <span className={`text-xs font-semibold ${module.enabled ? 'text-emerald-600' : 'text-gray-500'}`}>
                    {module.enabled ? '● ACTIVE' : '○ INACTIVE'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Two Column Layout */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reports */}
          <div className="col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-gray-900">
                <FileText className="w-6 h-6 text-blue-600" />
                Compliance & Reports
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Generate compliance, pricing, and audit reports for stakeholders
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all shadow-sm">
                  <Download className="w-5 h-5" />
                  Compliance Report
                </button>
                <button className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-all shadow-sm">
                  <Download className="w-5 h-5" />
                  USDA Pricing
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-gray-900">
                <BarChart3 className="w-6 h-6 text-purple-600" />
                Revenue Analytics
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Visualize revenue trends, client acquisition, and ROI metrics
              </p>
              <div className="border-2 border-dashed border-gray-200 rounded-xl h-64 flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500 font-medium">Chart Component</p>
                </div>
              </div>
            </div>
          </div>

          {/* Audit Status */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-gray-900">
                <Shield className="w-6 h-6 text-blue-600" />
                Audit Status
              </h2>
              <ul className="space-y-3">
                {audits.map((a, idx) => (
                  <li key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold text-gray-900">{a.name}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        a.risk === "High" ? "bg-red-100 text-red-700" :
                        a.risk === "Medium" ? "bg-amber-100 text-amber-700" :
                        "bg-emerald-100 text-emerald-700"
                      }`}>
                        {a.risk}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{a.status}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}