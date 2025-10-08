import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Percent, AlertCircle, CheckCircle } from 'lucide-react';

function FinancialTickerBar() {
  const tickers = [
    { label: 'MXN/USD', labelEs: 'Peso/Dólar', value: '16.85', change: '+0.7%', trend: 'up' },
    { label: 'US Fed Rate', labelEs: 'Tasa Fed', value: '4.50%', change: '0.0%', trend: 'neutral' },
    { label: 'Banxico', labelEs: 'Tasa MX', value: '11.00%', change: '-2.2%', trend: 'down' },
    { label: '10Y Treasury', labelEs: 'Bono 10A', value: '4.25%', change: '+0.7%', trend: 'up' },
    { label: 'Avocado Index', labelEs: 'Índice Aguacate', value: '$32.50', change: '+3.8%', trend: 'up' },
    { label: 'Produce Futures', labelEs: 'Futuros', value: '$28.75', change: '-1.7%', trend: 'down' },
    { label: 'Lending Rate', labelEs: 'Tasa Préstamo', value: '7.25%', change: '+1.4%', trend: 'up' },
    { label: 'Factoring', labelEs: 'Factoraje', value: '3.50%', change: '0.0%', trend: 'neutral' }
  ];

  const getTrendColor = (trend) => {
    if (trend === 'up') return 'text-green-400';
    if (trend === 'down') return 'text-red-400';
    return 'text-gray-400';
  };

  const getTrendIcon = (trend) => {
    if (trend === 'up') return <TrendingUp className="w-3 h-3" />;
    if (trend === 'down') return <TrendingDown className="w-3 h-3" />;
    return null;
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-3 px-4 shadow-lg overflow-hidden">
      <div className="flex items-center gap-8">
        {tickers.map((ticker, idx) => (
          <div key={idx} className="flex items-center gap-3 min-w-fit">
            <div className="text-left">
              <div className="flex items-center gap-1">
                <span className="font-bold text-sm">{ticker.label}</span>
                <span className="text-xs text-gray-400">({ticker.labelEs})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg">{ticker.value}</span>
                <span className={`flex items-center gap-1 text-xs font-semibold ${getTrendColor(ticker.trend)}`}>
                  {getTrendIcon(ticker.trend)}
                  {ticker.change}
                </span>
              </div>
            </div>
            <div className="h-8 w-px bg-gray-700"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <FinancialTickerBar />

      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">AuditDNA Dashboard</h1>
          <p className="text-gray-600">Real-time overview of compliance, pricing, audits, and risk scoring</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8 text-green-600" />
              <span className="text-sm font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">+2.4%</span>
            </div>
            <h3 className="text-gray-600 text-sm font-semibold mb-1">USDA Pricing</h3>
            <p className="text-3xl font-bold text-gray-900">$2.45 / lb</p>
            <p className="text-xs text-gray-500 mt-1">Latest weekly average</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-2">
              <Percent className="w-8 h-8 text-blue-600" />
              <span className="text-sm font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">-0.1%</span>
            </div>
            <h3 className="text-gray-600 text-sm font-semibold mb-1">Mortgage Rates</h3>
            <p className="text-3xl font-bold text-gray-900">6.8%</p>
            <p className="text-xs text-gray-500 mt-1">30yr fixed (avg)</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-purple-600" />
              <span className="text-sm font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">+0.7%</span>
            </div>
            <h3 className="text-gray-600 text-sm font-semibold mb-1">MXN/USD Exchange</h3>
            <p className="text-3xl font-bold text-gray-900">16.85</p>
            <p className="text-xs text-gray-500 mt-1">Mexican Peso</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-teal-500">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-teal-600" />
              <span className="text-sm font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded">Stable</span>
            </div>
            <h3 className="text-gray-600 text-sm font-semibold mb-1">Factoring Rate</h3>
            <p className="text-3xl font-bold text-gray-900">3.50%</p>
            <p className="text-xs text-gray-500 mt-1">Invoice factoring avg</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Compliance & Reports</h2>
            <p className="text-gray-600 text-sm mb-6">Generate compliance, pricing, and audit reports for stakeholders</p>
            <div className="flex gap-4">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition">
                Generate Compliance Report
              </button>
              <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition">
                Export USDA Pricing
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Audit Status</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Mortgage File Review</span>
                <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">Low</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Consumer Privacy Audit</span>
                <span className="text-xs font-semibold text-yellow-600 bg-yellow-100 px-2 py-1 rounded">Medium</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Agri-Factoring Audit</span>
                <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded">High</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Analytics</h2>
            <p className="text-gray-600 text-sm mb-4">Visualize USDA W1-W26 overlays, mortgage trends, and risk scores</p>
            <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <TrendingUp className="w-16 h-16 mx-auto mb-2 opacity-50" />
                <p className="font-semibold">Chart Component</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Risk Modules</h2>
            <div className="space-y-3">
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm font-semibold text-green-800">USDA Pricing Volatility</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm font-semibold text-yellow-800">Mortgage Lending Risk</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                <p className="text-sm font-semibold text-red-800">Compliance Gaps</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}