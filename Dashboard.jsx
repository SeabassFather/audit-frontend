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
  ExternalLink,
  TrendingDown,
  Clock,
} from "lucide-react";

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
    { name: "Mortgage File Review", status: "Complete", risk: "Low", date: "2 days ago" },
    { name: "Consumer Privacy Audit", status: "In Progress", risk: "Medium", date: "Active" },
    { name: "Agri-Factoring Audit", status: "Pending", risk: "High", date: "Scheduled" },
  ]);

  const [recentReports] = useState([
    { title: "Q4 Compliance Report", date: "Oct 1, 2025", size: "2.4 MB" },
    { title: "USDA Pricing Analysis", date: "Sep 28, 2025", size: "1.8 MB" },
    { title: "Risk Assessment", date: "Sep 25, 2025", size: "3.1 MB" },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">AuditDNA Dashboard</h1>
              <p className="text-lg text-gray-600">
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
              className="group relative bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              {/* Background gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-white transition-colors">
                    {s.icon}
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    s.positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {s.trend}
                  </span>