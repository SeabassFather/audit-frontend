import React, { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { listCommodities, fetchWeeklySeries, fetchHistoricalData, fetchLivePrices } from '../../lib/usda.js';

const timeRanges = [
  { value: '1M', label: '1 Month', weeks: 4 },
  { value: '3M', label: '3 Months', weeks: 12 },
  { value: '6M', label: '6 Months', weeks: 26 },
  { value: '1Y', label: '1 Year', weeks: 52 },
  { value: '5Y', label: '5 Years', weeks: 260 }
];

const chartTypes = [
  { value: 'line', label: 'Line Chart', icon: '📈' },
  { value: 'area', label: 'Area Chart', icon: '📊' },
  { value: 'overlay', label: 'Price Overlay', icon: '🔄' }
];

export default function USDADashboard() {
  const [selectedCommodity, setSelectedCommodity] = useState('Avocado');
  const [timeRange, setTimeRange] = useState('6M');
  const [chartType, setChartType] = useState('line');
  const [priceData, setPriceData] = useState([]);
  const [livePrice, setLivePrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayData, setOverlayData] = useState([]);

  const commodities = useMemo(() => listCommodities(), []);
  const selectedRange = timeRanges.find(r => r.value === timeRange);

  // Fetch price data
  useEffect(() => {
    const loadPriceData = async () => {
      setLoading(true);
      try {
        if (selectedRange.weeks <= 52) {
          // Use weekly series for shorter ranges
          const data = await fetchWeeklySeries(selectedCommodity, selectedRange.weeks);
          setPriceData(data);
        } else {
          // Use historical data for longer ranges
          const data = await fetchHistoricalData(selectedCommodity, selectedRange.weeks);
          setPriceData(data);
        }
      } catch (error) {
        console.error('Error fetching price data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPriceData();
  }, [selectedCommodity, selectedRange]);

  // Fetch live price
  useEffect(() => {
    const loadLivePrice = async () => {
      try {
        const live = await fetchLivePrices(selectedCommodity);
        setLivePrice(live);
      } catch (error) {
        console.error('Error fetching live price:', error);
      }
    };

    loadLivePrice();
    const interval = setInterval(loadLivePrice, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [selectedCommodity]);

  // Calculate price statistics
  const priceStats = useMemo(() => {
    if (!priceData.length) return null;
    
    const prices = priceData.map(d => d.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const avg = prices.reduce((a, b) => a + b, 0) / prices.length;
    const latest = prices[prices.length - 1];
    const previous = prices[prices.length - 2] || latest;
    const change = latest - previous;
    const changePercent = (change / previous) * 100;

    return {
      current: latest?.toFixed(2),
      min: min?.toFixed(2),
      max: max?.toFixed(2),
      avg: avg?.toFixed(2),
      change: change?.toFixed(2),
      changePercent: changePercent?.toFixed(2)
    };
  }, [priceData]);

  const renderChart = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    if (chartType === 'area') {
      return (
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={priceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip formatter={(value) => [`$${value}`, 'Price']} />
            <Legend />
            <Area type="monotone" dataKey="price" stroke="#3B82F6" fill="#93C5FD" fillOpacity={0.3} />
            <Area type="monotone" dataKey="avg5" stroke="#10B981" fill="#86EFAC" fillOpacity={0.2} strokeDasharray="5 5" />
          </AreaChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={priceData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip formatter={(value) => [`$${value}`, 'Price']} />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#3B82F6" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="avg5" stroke="#10B981" strokeWidth={2} strokeDasharray="5 5" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">USDA Pricing & Analytics</h1>
          <p className="text-gray-600">Real-time agricultural commodity pricing with historical analysis</p>
        </div>
        
        {livePrice && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="text-sm text-green-600 font-medium">Live Price</div>
            <div className="text-2xl font-bold text-green-800">${livePrice.price}</div>
            <div className="text-xs text-green-600">Updated: {livePrice.timestamp}</div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Commodity Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Commodity</label>
            <select
              value={selectedCommodity}
              onChange={(e) => setSelectedCommodity(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {commodities.map(commodity => (
                <option key={commodity} value={commodity}>{commodity}</option>
              ))}
            </select>
          </div>

          {/* Time Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Range</label>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {timeRanges.map(range => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
          </div>

          {/* Chart Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Chart Type</label>
            <select
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {chartTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.icon} {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Overlay Toggle */}
        <div className="mt-4 flex items-center gap-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showOverlay}
              onChange={(e) => setShowOverlay(e.target.checked)}
              className="mr-2"
            />
            Show Price Overlay Comparison
          </label>
        </div>
      </div>

      {/* Price Statistics */}
      {priceStats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-sm text-gray-600">Current</div>
            <div className="text-xl font-bold text-gray-900">${priceStats.current}</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-sm text-gray-600">Change</div>
            <div className={`text-xl font-bold ${priceStats.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {priceStats.change >= 0 ? '+' : ''}${priceStats.change}
            </div>
            <div className={`text-xs ${priceStats.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ({priceStats.changePercent}%)
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-sm text-gray-600">Average</div>
            <div className="text-xl font-bold text-gray-900">${priceStats.avg}</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-sm text-gray-600">Min</div>
            <div className="text-xl font-bold text-gray-900">${priceStats.min}</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-sm text-gray-600">Max</div>
            <div className="text-xl font-bold text-gray-900">${priceStats.max}</div>
          </div>
        </div>
      )}

      {/* Price Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {selectedCommodity} Price Trend - {selectedRange?.label}
          </h2>
          <div className="text-sm text-gray-500">
            Data source: USDA AMS/NASS (with synthetic fallback)
          </div>
        </div>
        
        {renderChart()}
      </div>

      {/* Data Export */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Data</h3>
        <div className="flex gap-4">
          <button className="btn btn-outline">
            📊 Export CSV
          </button>
          <button className="btn btn-outline">
            📋 Copy to Clipboard
          </button>
          <button className="btn btn-outline">
            📧 Email Report
          </button>
        </div>
      </div>
    </div>
  );
}