import { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  FileText,
  BarChart3,
  Shield,
  Building,
  Leaf,
  CreditCard,
  Download,
  Clock,
} from "lucide-react";
import Ticker from "../components/Ticker";

export default function Dashboard() {
  const [stats] = useState([
    {
      title: "USDA Pricing",
      value: "$2.45 / lb",
      icon: <DollarSign className="w-6 h-6 text-green-500" />,
      desc: "Latest weekly average",
      trend: "+2.4%",
      positive: true,
    },
    {
      title: "Mortgage Rates",
      value: "6.8%",
      icon: <TrendingUp className="w-6 h-6 text-blue-500" />,
      desc: "30yr fixed (avg)",
      trend: "-0.1%",
      positive: true,
    },
    {
      title: "Compliance Alerts",
      value: "3",
      icon: <AlertCircle className="w-6 h-6 text-red-500" />,
      desc: "Pending review",
      trend: "2 new",
      positive: false,
    },
    {
      title: "Audits Completed",
      value: "27",
      icon: <CheckCircle className="w-6 h-6 text-emerald-500" />,
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Ticker />
      
      <div className="p-6 space-y-8">
        {/* Header */}
        <header>
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">AuditDNA Dashboard</h1>
              <p className="text-lg text-gray-600 mt-2">
                Real-time overview of compliance, pricing, audits, and risk scoring
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>Last updated: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </header>

        {/* KPI Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className="group bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-blue-50 transition-colors">
                  {s.icon}
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  s.positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
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

        {/* Two Column Layout */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Compliance & Reports */}
          <div className="col-span-2 space-y-6">
            <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                <FileText className="w-6 h-6 text-indigo-500" /> 
                Compliance & Reports
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Generate compliance, pricing, and audit reports for stakeholders
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all shadow-lg">
                  <Download className="w-5 h-5" />
                  Generate Compliance Report
                </button>
                <button className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-all shadow-lg">
                  <Download className="w-5 h-5" />
                  Export USDA Pricing
                </button>
              </div>
            </div>

            <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                <BarChart3 className="w-6 h-6 text-purple-500" /> 
                Analytics
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Visualize USDA W1–W26 overlays, mortgage trends, and risk scores
              </p>
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl h-64 flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 font-medium">Chart Component</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Audit Status & Risk */}
          <div className="space-y-6">
            <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                <Shield className="w-6 h-6 text-blue-500" /> 
                Audit Status
              </h2>
              <ul className="space-y-3">
                {audits.map((a, idx) => (
                  <li key={idx} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold text-gray-900">{a.name}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        a.risk === "High" ? "bg-red-100 text-red-700" :
                        a.risk === "Medium" ? "bg-yellow-100 text-yellow-700" :
                        "bg-green-100 text-green-700"
                      }`}>
                        {a.risk}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{a.status}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                <Building className="w-6 h-6 text-orange-500" /> 
                Risk Modules
              </h2>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <Leaf className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-gray-800">USDA Pricing Volatility</span>
                </li>
                <li className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg">
                  <CreditCard className="w-5 h-5 text-pink-600" />
                  <span className="font-medium text-gray-800">Mortgage Lending Risk</span>
                </li>
                <li className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-800">Compliance Gaps</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
