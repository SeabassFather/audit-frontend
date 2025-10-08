import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Search, ShoppingCart, BarChart3, X } from 'lucide-react';

export default function USDA() {
  const [activeTab, setActiveTab] = useState('pricing');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [originRegion, setOriginRegion] = useState('');
  const [destinationMarket, setDestinationMarket] = useState('west-coast');
  const [pricingResults, setPricingResults] = useState(null);
  const [invoiceAmount, setInvoiceAmount] = useState('');
  const [advancePercent, setAdvancePercent] = useState(85);
  const [factoringTier, setFactoringTier] = useState('standard');
  const [trendProduct, setTrendProduct] = useState('avocado');
  const [showListingModal, setShowListingModal] = useState(false);

  const products = {
    avocado: {
      name: 'Avocado Hass',
      nameEs: 'Aguacate Hass',
      sizes: [
        { id: '48s', label: '48s (Large)', baseCost: 32 },
        { id: '60s', label: '60s (Medium)', baseCost: 28 },
        { id: '70s', label: '70s (Small)', baseCost: 24 }
      ]
    },
    strawberries: {
      name: 'Strawberries',
      nameEs: 'Fresas',
      sizes: [
        { id: '1lb', label: '1 lb Clamshell', baseCost: 4.50 },
        { id: '8lb', label: '8 lb Flat', baseCost: 28 }
      ]
    }
  };

  const origins = [
    { id: 'michoacan-mx', label: 'Michoacán, Mexico', country: 'mexico' },
    { id: 'sinaloa-mx', label: 'Sinaloa, Mexico', country: 'mexico' },
    { id: 'california-usa', label: 'California, USA', country: 'usa' }
  ];

  const freightRates = {
    'mexico-west-coast': 0.05,
    'mexico-midwest': 0.12,
    'mexico-east-coast': 0.18,
    'usa-west-coast': 0.03,
    'usa-midwest': 0.08,
    'usa-east-coast': 0.15
  };

  const historicalData = {
    avocado: [
      { week: 'W1', y2021: 32, y2022: 35, y2023: 38, y2024: 34, y2025: 36 },
      { week: 'W8', y2021: 31, y2022: 34, y2023: 37, y2024: 33, y2025: 35 },
      { week: 'W16', y2021: 36, y2022: 39, y2023: 42, y2024: 38, y2025: 40 },
      { week: 'W26', y2021: 34, y2022: 37, y2023: 40, y2024: 36, y2025: 38 }
    ],
    strawberries: [
      { week: 'W1', y2021: 4.2, y2022: 4.5, y2023: 4.8, y2024: 4.4, y2025: 4.6 },
      { week: 'W8', y2021: 4.1, y2022: 4.4, y2023: 4.7, y2024: 4.3, y2025: 4.5 },
      { week: 'W16', y2021: 4.6, y2022: 4.9, y2023: 5.2, y2024: 4.8, y2025: 5.0 },
      { week: 'W26', y2021: 4.4, y2022: 4.7, y2023: 5.0, y2024: 4.6, y2025: 4.8 }
    ]
  };

  const mockListings = [
    {
      id: 'ID-1',
      crop: 'Avocado Hass',
      cropEs: 'Aguacate Hass',
      hectares: 45,
      season: 'Year-round',
      seasonEs: 'Todo el año',
      targetPrice: '$24-28/case',
      certs: ['GlobalGAP', 'PRIMUS'],
      state: 'Michoacán, MX',
      volume: '500 tons/week'
    },
    {
      id: 'ID-2',
      crop: 'Organic Strawberries',
      cropEs: 'Fresas Orgánicas',
      hectares: 12,
      season: 'Nov - Apr',
      seasonEs: 'Nov - Abr',
      targetPrice: '$18-22/flat',
      certs: ['GlobalGAP', 'Organic'],
      state: 'Baja California, MX',
      volume: '200 tons/week'
    }
  ];

  const calculatePricing = () => {
    if (!selectedProduct || !selectedSize || !originRegion) {
      alert('Please select all fields');
      return;
    }

    const product = products[selectedProduct];
    const sizeData = product.sizes.find(s => s.id === selectedSize);
    const origin = origins.find(o => o.id === originRegion);
    const baseCost = sizeData.baseCost;
    const freightKey = `${origin.country}-${destinationMarket}`;
    const freightRate = freightRates[freightKey] || 0.15;
    const freightCost = baseCost * freightRate;
    const totalCost = baseCost + freightCost;
    const wholesalePrice = totalCost * 1.20;
    const retailMin = wholesalePrice * 1.25;
    const retailMax = wholesalePrice * 1.50;

    setPricingResults({
      product: product.name,
      productEs: product.nameEs,
      size: sizeData.label,
      origin: origin.label,
      destination: destinationMarket,
      baseCost: baseCost.toFixed(2),
      freightCost: freightCost.toFixed(2),
      freightRate: (freightRate * 100).toFixed(0),
      totalCost: totalCost.toFixed(2),
      wholesalePrice: wholesalePrice.toFixed(2),
      retailMin: retailMin.toFixed(2),
      retailMax: retailMax.toFixed(2),
      margin: (wholesalePrice - totalCost).toFixed(2),
      marginPercent: ((wholesalePrice - totalCost) / totalCost * 100).toFixed(1)
    });
  };

  const calculateFactoringRate = () => {
    const amount = parseFloat(invoiceAmount);
    if (isNaN(amount) || amount <= 0) return null;

    let baseRate = 3.5;
    if (amount >= 100000) baseRate = 2.5;
    else if (amount >= 50000) baseRate = 3.0;

    const tierRates = { standard: 0, expedited: 0.5, international: 1.0 };
    const totalRate = baseRate + tierRates[factoringTier];

    return {
      rate: totalRate.toFixed(2),
      fee: (amount * totalRate / 100).toFixed(2),
      advance: (amount * advancePercent / 100).toFixed(2)
    };
  };

  const factoringQuote = calculateFactoringRate();

  return (
    <div className="space-y-6 p-6">
      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-lg p-2">
        <div className="flex gap-2">
          {[
            { key: 'pricing', icon: Search, label: 'Pricing & Search', labelEs: 'Precios' },
            { key: 'trends', icon: BarChart3, label: 'Market Trends', labelEs: 'Tendencias' },
            { key: 'marketplace', icon: ShoppingCart, label: 'Grower Marketplace', labelEs: 'Mercado' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-4 px-6 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === tab.key ? 'bg-green-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <tab.icon className="w-6 h-6" />
              <div>
                <div>{tab.label}</div>
                <div className="text-xs opacity-75">{tab.labelEs}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: Pricing & Search */}
      {activeTab === 'pricing' && (
        <div className="space-y-8">
          {/* Product Pricing Calculator */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Product Pricing Calculator</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <select
                value={selectedProduct}
                onChange={(e) => {
                  setSelectedProduct(e.target.value);
                  setSelectedSize('');
                }}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select Product...</option>
                <option value="avocado">Avocado Hass</option>
                <option value="strawberries">Strawberries</option>
              </select>

              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                disabled={!selectedProduct}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100"
              >
                <option value="">Select Size...</option>
                {selectedProduct && products[selectedProduct].sizes.map(s => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>

              <select
                value={originRegion}
                onChange={(e) => setOriginRegion(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select Origin...</option>
                {origins.map(o => (
                  <option key={o.id} value={o.id}>{o.label}</option>
                ))}
              </select>

              <select
                value={destinationMarket}
                onChange={(e) => setDestinationMarket(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="west-coast">West Coast</option>
                <option value="midwest">Midwest</option>
                <option value="east-coast">East Coast</option>
              </select>
            </div>

            <button
              onClick={calculatePricing}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold transition-colors"
            >
              Calculate Pricing
            </button>

            {pricingResults && (
              <div className="mt-6 p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  {pricingResults.product} - {pricingResults.size}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {pricingResults.origin} → {pricingResults.destination}
                </p>

                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    data={[
                      { name: 'Base Cost', value: parseFloat(pricingResults.baseCost) },
                      { name: 'Total Cost', value: parseFloat(pricingResults.totalCost) },
                      { name: 'Wholesale', value: parseFloat(pricingResults.wholesalePrice) },
                      { name: 'Retail Max', value: parseFloat(pricingResults.retailMax) }
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#16a34a" />
                  </BarChart>
                </ResponsiveContainer>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-blue-600 text-white p-4 rounded-lg shadow">
                    <p className="text-sm opacity-90">Wholesale Price</p>
                    <p className="text-3xl font-bold">${pricingResults.wholesalePrice}</p>
                    <p className="text-xs opacity-75 mt-1">Margin: {pricingResults.marginPercent}%</p>
                  </div>
                  <div className="bg-purple-600 text-white p-4 rounded-lg shadow">
                    <p className="text-sm opacity-90">Retail Range</p>
                    <p className="text-3xl font-bold">${pricingResults.retailMin} - ${pricingResults.retailMax}</p>
                    <p className="text-xs opacity-75 mt-1">Suggested pricing</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Factoring Calculator */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Factoring Services Calculator</h2>
            <p className="text-sm text-gray-600 mb-6">Calculate financing options for your invoices</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Invoice Amount</label>
                <input
                  type="number"
                  value={invoiceAmount}
                  onChange={(e) => setInvoiceAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Advance Rate: {advancePercent}%
                </label>
                <input
                  type="range"
                  min="80"
                  max="90"
                  value={advancePercent}
                  onChange={(e) => setAdvancePercent(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Service Tier</label>
                <select
                  value={factoringTier}
                  onChange={(e) => setFactoringTier(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="standard">Standard</option>
                  <option value="expedited">Expedited (+0.5%)</option>
                  <option value="international">International (+1.0%)</option>
                </select>
              </div>
            </div>

            {factoringQuote && (
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-sm font-bold text-gray-700 mb-1">Factoring Rate</p>
                    <p className="text-3xl font-bold text-purple-700">{factoringQuote.rate}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-gray-700 mb-1">Service Fee</p>
                    <p className="text-3xl font-bold text-purple-700">${factoringQuote.fee}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-gray-700 mb-1">Cash Advance</p>
                    <p className="text-3xl font-bold text-purple-700">${factoringQuote.advance}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: Market Trends */}
      {activeTab === 'trends' && (
        <div className="space-y-6">
          {/* Search Controls */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Market Trends & Analytics</h2>
            
            <div className="grid grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Product</label>
                <input
                  type="text"
                  value={trendProduct}
                  onChange={(e) => setTrendProduct(e.target.value)}
                  placeholder="Type any product..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Size</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500">
                  <option>48s</option>
                  <option>60s</option>
                  <option>70s</option>
                  <option>84s</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Origin</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500">
                  <option>Michoacán, MX</option>
                  <option>Sinaloa, MX</option>
                  <option>California, USA</option>
                  <option>Florida, USA</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Your Cost</label>
                <input
                  type="number"
                  defaultValue="28"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="flex items-end">
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-bold">
                  Analyze
                </button>
              </div>
            </div>
          </div>

          {/* Price Charts - Side by Side */}
          <div className="grid grid-cols-2 gap-6">
            {/* Historical Trends */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4 text-gray-700">5-Year Price History - {trendProduct}</h3>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={historicalData[trendProduct === 'avocado' ? 'avocado' : 'strawberries']}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="y2021" stroke="#cbd5e1" strokeWidth={2} name="2021" />
                  <Line type="monotone" dataKey="y2022" stroke="#94a3b8" strokeWidth={2} name="2022" />
                  <Line type="monotone" dataKey="y2023" stroke="#64748b" strokeWidth={2} name="2023" />
                  <Line type="monotone" dataKey="y2024" stroke="#475569" strokeWidth={2} name="2024" />
                  <Line type="monotone" dataKey="y2025" stroke="#16a34a" strokeWidth={3} name="2025" />
                </LineChart>
              </ResponsiveContainer>
              
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="bg-gray-50 p-3 rounded text-center">
                  <p className="text-xs text-gray-600">2025 Avg</p>
                  <p className="text-xl font-bold text-green-700">$37.25</p>
                </div>
                <div className="bg-gray-50 p-3 rounded text-center">
                  <p className="text-xs text-gray-600">5-Yr Avg</p>
                  <p className="text-xl font-bold text-gray-700">$35.80</p>
                </div>
                <div className="bg-gray-50 p-3 rounded text-center">
                  <p className="text-xs text-gray-600">YoY Change</p>
                  <p className="text-xl font-bold text-green-700">+5.6%</p>
                </div>
              </div>
            </div>

            {/* Regional Price Comparison */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4 text-gray-700">Regional Price Comparison</h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={[
                  { region: 'West Coast', wholesale: 35.28, retail: 44.10 },
                  { region: 'Midwest', wholesale: 37.63, retail: 47.04 },
                  { region: 'East Coast', wholesale: 39.65, retail: 49.56 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="wholesale" fill="#3b82f6" name="Wholesale" />
                  <Bar dataKey="retail" fill="#8b5cf6" name="Retail (Min)" />
                </BarChart>
              </ResponsiveContainer>

              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="bg-blue-50 p-3 rounded text-center">
                  <p className="text-xs text-blue-700 font-semibold">West</p>
                  <p className="text-lg font-bold text-blue-800">$35.28</p>
                  <p className="text-xs text-gray-600">+5% freight</p>
                </div>
                <div className="bg-orange-50 p-3 rounded text-center">
                  <p className="text-xs text-orange-700 font-semibold">Midwest</p>
                  <p className="text-lg font-bold text-orange-800">$37.63</p>
                  <p className="text-xs text-gray-600">+12% freight</p>
                </div>
                <div className="bg-purple-50 p-3 rounded text-center">
                  <p className="text-xs text-purple-700 font-semibold">East</p>
                  <p className="text-lg font-bold text-purple-800">$39.65</p>
                  <p className="text-xs text-gray-600">+18% freight</p>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Breakdown Table */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold mb-4 text-gray-700">Detailed Pricing Breakdown by Size & Region</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Size</th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Your Cost</th>
                    <th className="px-4 py-3 text-center text-sm font-bold text-blue-700">West Coast</th>
                    <th className="px-4 py-3 text-center text-sm font-bold text-orange-700">Midwest</th>
                    <th className="px-4 py-3 text-center text-sm font-bold text-purple-700">East Coast</th>
                    <th className="px-4 py-3 text-right text-sm font-bold text-gray-700">Retail Range</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    { size: '48s (Large)', cost: 32 },
                    { size: '60s (Medium)', cost: 28 },
                    { size: '70s (Small)', cost: 24 },
                    { size: '84s (XSmall)', cost: 20 }
                  ].map(item => (
                    <tr key={item.size} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold">{item.size}</td>
                      <td className="px-4 py-3">${item.cost.toFixed(2)}</td>
                      <td className="px-4 py-3 text-center bg-blue-50 font-semibold text-blue-800">
                        ${(item.cost * 1.05 * 1.20).toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-center bg-orange-50 font-semibold text-orange-800">
                        ${(item.cost * 1.12 * 1.20).toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-center bg-purple-50 font-semibold text-purple-800">
                        ${(item.cost * 1.18 * 1.20).toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-right text-sm text-gray-600">
                        ${(item.cost * 1.05 * 1.20 * 1.25).toFixed(2)} - ${(item.cost * 1.18 * 1.20 * 1.50).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Market Insights */}
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-lg p-6 border-l-4 border-green-500">
              <h4 className="text-sm font-bold text-gray-700 mb-2">Supply Status</h4>
              <p className="text-3xl font-bold text-green-700 mb-2">High</p>
              <p className="text-xs text-gray-600">Peak harvest season, abundant supply from Michoacán and Sinaloa regions</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
              <h4 className="text-sm font-bold text-gray-700 mb-2">Demand Forecast</h4>
              <p className="text-3xl font-bold text-blue-700 mb-2">Rising</p>
              <p className="text-xs text-gray-600">Expected 8-12% increase in Q2 due to seasonal demand and export growth</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
              <h4 className="text-sm font-bold text-gray-700 mb-2">Price Outlook</h4>
              <p className="text-3xl font-bold text-purple-700 mb-2">Stable</p>
              <p className="text-xs text-gray-600">Prices expected to remain within $32-38 range through next quarter</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Grower Marketplace */}
      {activeTab === 'marketplace' && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Grower Marketplace</h2>
              <p className="text-sm text-gray-600 italic">Mercado de Productores</p>
            </div>
            <button
              onClick={() => setShowListingModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-colors shadow-lg"
            >
              <div>List Your Crop</div>
              <div className="text-xs opacity-90">Publicar Cultivo</div>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockListings.map(listing => (
              <div key={listing.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{listing.crop}</h3>
                    <p className="text-sm italic text-gray-500">{listing.cropEs}</p>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-semibold">
                    {listing.id}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Location:</span> {listing.state}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Size:</span> {listing.hectares} hectares
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Volume:</span> {listing.volume}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Season:</span> {listing.season} <span className="italic text-gray-500">({listing.seasonEs})</span>
                  </p>
                  <p className="text-lg font-bold text-green-700 mt-2">{listing.targetPrice}</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {listing.certs.map(cert => (
                    <span key={cert} className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                      {cert}
                    </span>
                  ))}
                </div>

                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-colors">
                  Request Details / Solicitar Detalles
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* List Your Crop Modal */}
      {showListingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">List Your Crop</h3>
                <p className="text-sm text-gray-600 italic">Publicar Cultivo</p>
              </div>
              <button
                onClick={() => setShowListingModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Crop Type / Tipo de Cultivo"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="State/Region / Estado/Región"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Municipality / Municipio"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Land Size (hectares) / Tamaño"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Target Price / Precio Objetivo"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowListingModal(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-bold transition-colors"
              >
                Cancel / Cancelar
              </button>
              <button
                onClick={() => setShowListingModal(false)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold transition-colors"
              >
                Submit / Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
