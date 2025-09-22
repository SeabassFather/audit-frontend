import React, { useState } from "react";
import { MetricCard, ServiceCard, LoadingSpinner } from "../components/UIComponents.jsx";

export default function Engines() {
  const [activeEngine, setActiveEngine] = useState('all');

  const engineMetrics = [
    {
      title: "OCR Processed",
      value: "12,847",
      change: "+15.2%",
      trend: "up",
      icon: "📄",
      color: "bg-gradient-to-r from-blue-500 to-blue-600"
    },
    {
      title: "Facial Recognition",
      value: "8,923",
      change: "+8.7%",
      trend: "up",
      icon: "👤",
      color: "bg-gradient-to-r from-green-500 to-green-600"
    },
    {
      title: "Document Analysis",
      value: "6,754",
      change: "+22.1%",
      trend: "up",
      icon: "🔍",
      color: "bg-gradient-to-r from-purple-500 to-purple-600"
    },
    {
      title: "Fraud Detection",
      value: "234",
      change: "Flags detected",
      trend: "neutral",
      icon: "🚨",
      color: "bg-gradient-to-r from-red-500 to-red-600"
    }
  ];

  const aiEngines = [
    {
      id: "ocr-engine",
      name: "OCR Document Processing",
      description: "Advanced optical character recognition for document digitization",
      status: "online",
      accuracy: "99.2%",
      processingTime: "2.3s avg",
      features: ["Multi-language support", "Handwriting recognition", "Table extraction"],
      apiEndpoint: "/api/v1/ocr",
      usage: 87
    },
    {
      id: "facial-recognition",
      name: "Facial Recognition KYC",
      description: "Identity verification through advanced facial recognition",
      status: "online",
      accuracy: "98.8%",
      processingTime: "1.2s avg",
      features: ["Live detection", "Anti-spoofing", "ID document matching"],
      apiEndpoint: "/api/v1/facial-recognition",
      usage: 72
    },
    {
      id: "document-analysis",
      name: "Document Analysis Engine",
      description: "AI-powered document classification and analysis",
      status: "online",
      accuracy: "96.5%",
      processingTime: "3.8s avg",
      features: ["Document classification", "Data extraction", "Compliance check"],
      apiEndpoint: "/api/v1/document-analysis",
      usage: 91
    },
    {
      id: "fraud-detection",
      name: "Fraud Detection System",
      description: "Real-time fraud detection and risk assessment",
      status: "online",
      accuracy: "94.7%",
      processingTime: "0.8s avg",
      features: ["Pattern recognition", "Anomaly detection", "Risk scoring"],
      apiEndpoint: "/api/v1/fraud-detection",
      usage: 68
    },
    {
      id: "compliance-engine",
      name: "Compliance Analysis Engine",
      description: "Automated compliance checking and regulatory analysis",
      status: "maintenance",
      accuracy: "97.1%",
      processingTime: "4.2s avg",
      features: ["Regulatory mapping", "Policy checking", "Violation detection"],
      apiEndpoint: "/api/v1/compliance",
      usage: 45
    },
    {
      id: "natural-language",
      name: "Natural Language Processing",
      description: "Text analysis and understanding for document processing",
      status: "online",
      accuracy: "95.3%",
      processingTime: "2.7s avg",
      features: ["Sentiment analysis", "Entity extraction", "Summarization"],
      apiEndpoint: "/api/v1/nlp",
      usage: 83
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online': return '🟢';
      case 'maintenance': return '🟡';
      case 'offline': return '🔴';
      default: return '⚪';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-700 rounded-2xl p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">AI Engine Dashboard</h1>
            <p className="text-white/90 mt-2">
              Monitor and manage AI-powered processing engines
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center text-sm opacity-90 mb-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
              All Systems Operational
            </div>
            <div className="text-sm">
              Uptime: 99.9%
            </div>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {engineMetrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            trend={metric.trend}
            icon={metric.icon}
            color={metric.color}
          />
        ))}
      </div>

      {/* Engine Status Overview */}
      <div className="widget">
        <h2 className="text-xl font-semibold mb-6">Engine Status Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiEngines.map((engine) => (
            <div key={engine.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{engine.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{engine.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span>{getStatusIcon(engine.status)}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(engine.status)}`}>
                    {engine.status}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Accuracy:</span>
                  <span className="font-medium">{engine.accuracy}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Avg Processing:</span>
                  <span className="font-medium">{engine.processingTime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Usage:</span>
                  <span className="font-medium">{engine.usage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-brand-green to-brand-blue h-2 rounded-full"
                    style={{ width: `${engine.usage}%` }}
                  ></div>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Features:</h4>
                <div className="flex flex-wrap gap-1">
                  {engine.features.slice(0, 3).map((feature, index) => (
                    <span 
                      key={index}
                      className="bg-white text-gray-700 px-2 py-1 rounded-md text-xs border"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="text-xs text-gray-500 mb-3">
                  API: <code className="bg-gray-200 px-1 rounded">{engine.apiEndpoint}</code>
                </div>
                <div className="flex space-x-2">
                  <button className="btn btn-primary flex-1 text-sm">
                    Configure
                  </button>
                  <button className="btn btn-secondary text-sm">
                    Test
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Engine Testing Console */}
      <div className="widget">
        <h2 className="text-xl font-semibold mb-6">Engine Testing Console</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-4">Test Input</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Select Engine</label>
                <select className="input-field">
                  <option>OCR Document Processing</option>
                  <option>Facial Recognition KYC</option>
                  <option>Document Analysis Engine</option>
                  <option>Fraud Detection System</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Upload Test File</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="text-2xl mb-2">📁</div>
                  <p className="text-sm text-gray-600">Drop file here or click to upload</p>
                  <button className="btn btn-secondary mt-2">Choose File</button>
                </div>
              </div>
              <button className="btn btn-primary w-full">
                🚀 Run Test
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Test Results</h3>
            <div className="bg-gray-900 text-gray-100 rounded-lg p-4 h-64 overflow-y-auto font-mono text-sm">
              <div className="text-green-400">$ AI Engine Test Console v2.1.0</div>
              <div className="text-gray-400">Waiting for test input...</div>
              <div className="text-gray-400">Ready to process requests.</div>
              <div className="animate-pulse">_</div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="widget">
          <h3 className="text-lg font-semibold mb-4">Processing Volume (Last 7 Days)</h3>
          <div className="space-y-3">
            {aiEngines.slice(0, 4).map((engine, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm font-medium">{engine.name}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-brand-blue to-brand-green h-2 rounded-full"
                      style={{ width: `${engine.usage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{engine.usage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="widget">
          <h3 className="text-lg font-semibold mb-4">System Health</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>CPU Usage</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '45%'}}></div>
                </div>
                <span className="text-sm">45%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Memory Usage</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{width: '67%'}}></div>
                </div>
                <span className="text-sm">67%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>GPU Usage</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '82%'}}></div>
                </div>
                <span className="text-sm">82%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Network I/O</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{width: '23%'}}></div>
                </div>
                <span className="text-sm">23%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
