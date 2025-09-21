import React, { useState, useEffect } from "react";
import { TickerItem, MetricCard } from "../components/UIComponents.jsx";
import { MiniChart } from "../components/Charts.jsx";
import { tickerData, alertSettings } from "../data/tickerData.js";

export default function Tickers() {
  const [activeTab, setActiveTab] = useState('commodities');
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: 'commodities', label: 'Commodities', icon: '🌾' },
    { id: 'currencies', label: 'Currencies', icon: '💱' },
    { id: 'mortgageRates', label: 'Mortgage Rates', icon: '🏠' },
    { id: 'marketIndices', label: 'Market Indices', icon: '📈' }
  ];

  const renderCommodities = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tickerData.commodities.map((commodity) => (
        <div key={commodity.symbol} className="widget">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-bold text-lg">{commodity.symbol}</h3>
              <p className="text-sm text-gray-600">{commodity.name}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">${commodity.price}</div>
              <div className={`text-sm ${commodity.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {commodity.change >= 0 ? '+' : ''}{commodity.change} ({commodity.changePercent >= 0 ? '+' : ''}{commodity.changePercent}%)
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <span className="text-gray-600">High:</span>
              <span className="font-medium ml-2">${commodity.high}</span>
            </div>
            <div>
              <span className="text-gray-600">Low:</span>
              <span className="font-medium ml-2">${commodity.low}</span>
            </div>
            <div>
              <span className="text-gray-600">Volume:</span>
              <span className="font-medium ml-2">{commodity.volume}</span>
            </div>
          </div>
          
          <div className="h-16 mb-4">
            <MiniChart 
              data={[
                { value: commodity.low },
                { value: commodity.price * 0.95 },
                { value: commodity.price * 1.02 },
                { value: commodity.price },
                { value: commodity.high }
              ]}
              type="area"
              color={commodity.change >= 0 ? '#22c55e' : '#ef4444'}
            />
          </div>
          
          <button className="btn btn-secondary w-full text-sm">
            Set Price Alert
          </button>
        </div>
      ))}
    </div>
  );

  const renderCurrencies = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tickerData.currencies.map((currency) => (
        <div key={currency.symbol} className="widget">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-bold text-lg">{currency.symbol}</h3>
              <p className="text-sm text-gray-600">{currency.name}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{currency.price}</div>
              <div className={`text-sm ${currency.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {currency.change >= 0 ? '+' : ''}{currency.change} ({currency.changePercent >= 0 ? '+' : ''}{currency.changePercent}%)
              </div>
            </div>
          </div>
          
          <div className="h-16 mb-4">
            <MiniChart 
              data={[
                { value: currency.price * 0.98 },
                { value: currency.price * 0.99 },
                { value: currency.price * 1.01 },
                { value: currency.price },
                { value: currency.price * 1.005 }
              ]}
              type="line"
              color={currency.change >= 0 ? '#22c55e' : '#ef4444'}
            />
          </div>
          
          <div className="text-xs text-gray-500 text-center">
            Last updated: {new Date(currency.lastUpdate).toLocaleTimeString()}
          </div>
        </div>
      ))}
    </div>
  );

  const renderMortgageRates = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tickerData.mortgageRates.map((rate, index) => (
        <div key={index} className="widget">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-bold text-lg">{rate.term}</h3>
              <p className="text-sm text-gray-600">Mortgage Rate</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{rate.rate}%</div>
              <div className={`text-sm ${rate.change >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                {rate.change >= 0 ? '+' : ''}{rate.change}%
              </div>
            </div>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Points:</span>
              <span className="font-medium">{rate.points}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">APR:</span>
              <span className="font-medium">{rate.apr}%</span>
            </div>
          </div>
          
          <button className="btn btn-primary w-full mt-4">
            Get Quote
          </button>
        </div>
      ))}
    </div>
  );

  const renderMarketIndices = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tickerData.marketIndices.map((index) => (
        <div key={index.symbol} className="widget">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-bold text-lg">{index.symbol}</h3>
              <p className="text-sm text-gray-600">{index.name}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">${index.price}</div>
              <div className={`text-sm ${index.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {index.change >= 0 ? '+' : ''}{index.change} ({index.changePercent >= 0 ? '+' : ''}{index.changePercent}%)
              </div>
            </div>
          </div>
          
          <div className="text-sm mb-4">
            <span className="text-gray-600">Volume:</span>
            <span className="font-medium ml-2">{index.volume}</span>
          </div>
          
          <div className="h-16">
            <MiniChart 
              data={[
                { value: index.price * 0.99 },
                { value: index.price * 0.995 },
                { value: index.price * 1.001 },
                { value: index.price },
                { value: index.price * 1.002 }
              ]}
              type="area"
              color={index.change >= 0 ? '#22c55e' : '#ef4444'}
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'commodities': return renderCommodities();
      case 'currencies': return renderCurrencies();
      case 'mortgageRates': return renderMortgageRates();
      case 'marketIndices': return renderMarketIndices();
      default: return renderCommodities();
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-blue via-brand-green to-brand-yellow rounded-2xl p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Live Market Tickers</h1>
            <p className="text-white/90 mt-2">
              Real-time financial data for commodities, currencies, and market indices
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center text-sm opacity-90 mb-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
              Live Data
            </div>
            <div className="text-sm">
              Updated: {lastUpdate.toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-brand-blue to-brand-green text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Active Alerts"
          value={alertSettings.filter(alert => alert.active).length.toString()}
          icon="🔔"
          color="bg-gradient-to-r from-yellow-500 to-orange-500"
        />
        <MetricCard
          title="Triggered Today"
          value="3"
          icon="⚡"
          color="bg-gradient-to-r from-red-500 to-pink-500"
        />
        <MetricCard
          title="Watchlist Items"
          value="12"
          icon="👁️"
          color="bg-gradient-to-r from-blue-500 to-indigo-500"
        />
      </div>

      {/* Content */}
      {renderContent()}

      {/* Quick Actions */}
      <div className="widget">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="btn btn-primary">
            📊 Create Alert
          </button>
          <button className="btn btn-secondary">
            📈 Export Data
          </button>
          <button className="btn btn-secondary">
            📱 Mobile Alerts
          </button>
          <button className="btn btn-secondary">
            ⚙️ Settings
          </button>
        </div>
      </div>
    </div>
  );
}
