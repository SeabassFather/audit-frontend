import { useState, useEffect } from "react";

export default function Tickers() {
  const [activeTab, setActiveTab] = useState("stocks");
  const [stockData, setStockData] = useState([]);
  const [mortgageData, setMortgageData] = useState([]);
  const [commodityData, setCommodityData] = useState([]);

  // Sample data - in production this would come from real APIs
  useEffect(() => {
    setStockData([
      { symbol: "AAPL", price: 193.42, change: +2.15, changePercent: +1.12 },
      { symbol: "GOOGL", price: 145.78, change: -1.22, changePercent: -0.83 },
      { symbol: "MSFT", price: 415.33, change: +5.67, changePercent: +1.38 },
      { symbol: "TSLA", price: 248.91, change: -3.45, changePercent: -1.37 },
      { symbol: "NVDA", price: 875.20, change: +12.45, changePercent: +1.44 },
      { symbol: "JPM", price: 185.67, change: +1.89, changePercent: +1.03 }
    ]);

    setMortgageData([
      { type: "30-Year Fixed", rate: 7.25, change: +0.05, trend: "up" },
      { type: "15-Year Fixed", rate: 6.89, change: +0.03, trend: "up" },
      { type: "5/1 ARM", rate: 6.45, change: -0.02, trend: "down" },
      { type: "FHA 30-Year", rate: 7.18, change: +0.07, trend: "up" },
      { type: "VA 30-Year", rate: 7.12, change: +0.04, trend: "up" },
      { type: "Jumbo 30-Year", rate: 7.35, change: +0.06, trend: "up" }
    ]);

    setCommodityData([
      { name: "Corn", price: 485.75, unit: "¢/bushel", change: +2.25, changePercent: +0.47 },
      { name: "Soybeans", price: 1234.50, unit: "¢/bushel", change: -8.75, changePercent: -0.70 },
      { name: "Wheat", price: 612.25, unit: "¢/bushel", change: +15.50, changePercent: +2.60 },
      { name: "Live Cattle", price: 178.45, unit: "¢/lb", change: +1.25, changePercent: +0.71 },
      { name: "Lean Hogs", price: 82.30, unit: "¢/lb", change: -0.95, changePercent: -1.14 },
      { name: "Cotton", price: 74.85, unit: "¢/lb", change: +0.65, changePercent: +0.88 }
    ]);
  }, []);

  const tabs = [
    { id: "stocks", label: "Stock Market", icon: "📈" },
    { id: "mortgages", label: "Mortgage Rates", icon: "🏠" },
    { id: "commodities", label: "USDA Commodities", icon: "🌾" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Market Tickers</h1>
          <p className="text-slate-600 mt-2">
            Real-time market data for stocks, mortgage rates, and USDA commodity pricing
          </p>
        </div>
        <div className="text-sm text-slate-500">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 p-1 bg-slate-100 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-600 hover:bg-white/50"
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Stock Market */}
      {activeTab === "stocks" && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stockData.map((stock) => (
            <div key={stock.symbol} className="card-hover">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-slate-800">{stock.symbol}</h3>
                <span className={`badge ${
                  stock.change >= 0 ? "badge-green" : "text-red-600 bg-red-50 border-red-200"
                }`}>
                  {stock.change >= 0 ? "↗" : "↘"}
                </span>
              </div>
              <div className="text-2xl font-bold text-slate-800 mb-2">
                ${stock.price.toFixed(2)}
              </div>
              <div className={`text-sm font-medium ${
                stock.change >= 0 ? "text-green-600" : "text-red-600"
              }`}>
                {stock.change >= 0 ? "+" : ""}{stock.change.toFixed(2)} 
                ({stock.changePercent >= 0 ? "+" : ""}{stock.changePercent.toFixed(2)}%)
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mortgage Rates */}
      {activeTab === "mortgages" && (
        <div className="space-y-4">
          <div className="card">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Current Mortgage Rates</h2>
            <div className="space-y-3">
              {mortgageData.map((mortgage, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                  <div>
                    <div className="font-medium text-slate-800">{mortgage.type}</div>
                    <div className="text-sm text-slate-600">Current Rate</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-slate-800">
                      {mortgage.rate.toFixed(2)}%
                    </div>
                    <div className={`text-sm font-medium flex items-center gap-1 justify-end ${
                      mortgage.trend === "up" ? "text-red-600" : "text-green-600"
                    }`}>
                      {mortgage.trend === "up" ? "↗" : "↘"}
                      {mortgage.change >= 0 ? "+" : ""}{mortgage.change.toFixed(2)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="card text-center">
              <h3 className="font-semibold text-slate-800 mb-2">Market Outlook</h3>
              <div className="text-sm text-slate-600">
                Rates trending upward due to Federal Reserve policy
              </div>
            </div>
            <div className="card text-center">
              <h3 className="font-semibold text-slate-800 mb-2">Best Rate</h3>
              <div className="text-2xl font-bold text-green-600">6.45%</div>
              <div className="text-sm text-slate-600">5/1 ARM</div>
            </div>
            <div className="card text-center">
              <h3 className="font-semibold text-slate-800 mb-2">Avg. 30-Year</h3>
              <div className="text-2xl font-bold text-blue-600">7.25%</div>
              <div className="text-sm text-slate-600">Fixed Rate</div>
            </div>
          </div>
        </div>
      )}

      {/* USDA Commodities */}
      {activeTab === "commodities" && (
        <div className="space-y-6">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-800">USDA Commodity Prices</h2>
              <span className="badge-yellow">W1W26 + 5-year average</span>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {commodityData.map((commodity, i) => (
                <div key={i} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-slate-800">{commodity.name}</h3>
                    <span className={`text-sm font-medium ${
                      commodity.change >= 0 ? "text-green-600" : "text-red-600"
                    }`}>
                      {commodity.change >= 0 ? "↗" : "↘"}
                    </span>
                  </div>
                  <div className="text-lg font-bold text-slate-800 mb-1">
                    {commodity.price.toFixed(2)} {commodity.unit}
                  </div>
                  <div className={`text-sm font-medium ${
                    commodity.change >= 0 ? "text-green-600" : "text-red-600"
                  }`}>
                    {commodity.change >= 0 ? "+" : ""}{commodity.change.toFixed(2)} 
                    ({commodity.changePercent >= 0 ? "+" : ""}{commodity.changePercent.toFixed(2)}%)
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="font-semibold text-slate-800 mb-4">Market Highlights</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-green-600">🌾</span>
                  Wheat prices up 2.60% on strong export demand
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-600">🌽</span>
                  Corn steady with seasonal patterns
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">🐄</span>
                  Live cattle showing strength in futures
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">🧵</span>
                  Cotton rebounds on global supply concerns
                </li>
              </ul>
            </div>

            <div className="card">
              <h3 className="font-semibold text-slate-800 mb-4">USDA Reports</h3>
              <div className="space-y-3">
                <a href="/usda" className="block p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <div className="font-medium text-green-800">Crop Progress Report</div>
                  <div className="text-sm text-green-600">Weekly crop conditions and planting progress</div>
                </a>
                <a href="/usda" className="block p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <div className="font-medium text-blue-800">World Agricultural Supply</div>
                  <div className="text-sm text-blue-600">Global production and demand outlook</div>
                </a>
                <a href="/usda" className="block p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
                  <div className="font-medium text-yellow-800">Grain Transportation</div>
                  <div className="text-sm text-yellow-600">Rail and barge movement data</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Market Summary Footer */}
      <div className="card bg-gradient-to-r from-blue-50 to-green-50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-slate-800">Market Data Disclaimer</h3>
            <p className="text-sm text-slate-600 mt-1">
              Market data is provided for informational purposes only and may be delayed. 
              Consult with financial professionals before making investment decisions.
            </p>
          </div>
          <div className="flex gap-2">
            <a href="/services" className="btn-outline">
              Audit Services
            </a>
            <a href="/usda" className="btn-primary">
              USDA Pricing
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}