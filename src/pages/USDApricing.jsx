import React, { useState, useEffect } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

// API service - placeholder for real backend integration
async function fetchUSDApricing(commodity = "Tomatoes") {
  // TODO: Replace with real USDA API endpoint
  try {
    const response = await fetch(`/api/usda/pricing?commodity=${encodeURIComponent(commodity)}`);
    if (!response.ok) throw new Error("USDA API error");
    return await response.json();
  } catch (error) {
    console.log("USDA API not available, using mock data");
    // Mock data for demonstration
    return {
      commodity,
      current_price: 2.45,
      avg_5_year: 2.12,
      weekly_data: [
        { week: "Week 1", price: 2.30, avg5yr: 2.10 },
        { week: "Week 2", price: 2.35, avg5yr: 2.12 },
        { week: "Week 3", price: 2.40, avg5yr: 2.15 },
        { week: "Week 4", price: 2.45, avg5yr: 2.12 },
      ],
      alerts: ["Price 15% above 5-year average"]
    };
  }
}

export default function USDApricing() {
  const [commodity, setCommodity] = useState("Tomatoes");
  const [pricingData, setPricingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const commodities = [
    "Tomatoes", "Avocados", "Lettuce", "Carrots", "Onions", 
    "Peppers", "Cucumbers", "Broccoli", "Cauliflower", "Spinach"
  ];

  const filteredCommodities = commodities.filter(c => 
    c.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    loadPricingData();
  }, [commodity]);

  async function loadPricingData() {
    setLoading(true);
    try {
      const data = await fetchUSDApricing(commodity);
      setPricingData(data);
    } catch (error) {
      console.error("Failed to load USDA pricing data:", error);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">USDA 5-Year Avg Pricing</h1>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => window.history.back()}
              className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Search and Filter Controls */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Search Commodities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Commodity
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Type to search commodities..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Commodity
              </label>
              <select
                value={commodity}
                onChange={(e) => setCommodity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {filteredCommodities.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={loadPricingData}
            disabled={loading}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {loading ? "Loading..." : "Search Pricing Data"}
          </button>
        </div>

        {/* Pricing Cards */}
        {pricingData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">💰</span>
                <h3 className="font-semibold text-lg">Current Price</h3>
              </div>
              <div className="text-3xl font-bold text-green-600 mb-1">
                ${pricingData.current_price}
              </div>
              <div className="text-sm text-gray-500">per unit</div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">📊</span>
                <h3 className="font-semibold text-lg">5-Year Average</h3>
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-1">
                ${pricingData.avg_5_year}
              </div>
              <div className="text-sm text-gray-500">historical average</div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">⚠️</span>
                <h3 className="font-semibold text-lg">Price Alerts</h3>
              </div>
              <div className="text-lg font-semibold text-orange-600 mb-1">
                {pricingData.alerts?.length || 0}
              </div>
              <div className="text-sm text-gray-500">active alerts</div>
            </div>
          </div>
        )}

        {/* Price Trend Chart */}
        {pricingData && (
          <div className="bg-white rounded-xl shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Price Trend vs 5-Year Average</h2>
            <div style={{ height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={pricingData.weekly_data}>
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#2563eb" 
                    strokeWidth={3}
                    name="Current Price" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="avg5yr" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="5-Year Average" 
                  />
                  <CartesianGrid stroke="#e5e7eb" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Price Alerts */}
        {pricingData?.alerts && pricingData.alerts.length > 0 && (
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Price Alerts</h2>
            <div className="space-y-3">
              {pricingData.alerts.map((alert, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <span className="text-orange-500">⚠️</span>
                  <span className="text-orange-800">{alert}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}