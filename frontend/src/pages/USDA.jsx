import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Download, Calendar, Loader, AlertCircle } from 'lucide-react';

const USDA_NASS_API_KEY = '4F158DB1-85C2-3243-BFFA-58B53FB40D23';
const USDA_NASS_URL = 'https://quickstats.nass.usda.gov/api/api_GET/';

export default function USDA() {
  const [activeTab, setActiveTab] = useState('pricing');
  const [commodities, setCommodities] = useState([]);
  const [selectedCommodities, setSelectedCommodities] = useState([]);
  const [priceData, setPriceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCommodities, setLoadingCommodities] = useState(true);
  const [error, setError] = useState('');
  const [timeframe, setTimeframe] = useState('weekly');
  
  const [selectedProduct, setSelectedProduct] = useState('AVOCADOS');
  const [selectedSize, setSelectedSize] = useState('48s (Medium)');
  const [selectedPackaging, setSelectedPackaging] = useState('Carton 25lb');
  const [yourCost, setYourCost] = useState(28);

  // Product specifications with sizes and packaging
  const productSpecs = {
    'AVOCADOS': { sizes: ['32s (XLarge)', '40s (Large)', '48s (Medium)', '60s (Small)', '70s (XSmall)', '84s (Mini)'], packaging: ['Carton 25lb', 'Carton 22lb', 'Flat 11lb', 'Box 10kg', 'Bulk Bin 1000lb', 'Maya Bag 50lb'] },
    'STRAWBERRIES': { sizes: ['Extra Large', 'Large', 'Medium', 'Small', '1lb Clamshell', '2lb Clamshell'], packaging: ['Flat 8x1lb', 'Flat 12x1lb', 'Carton 10lb', 'Pallet Bulk', 'Maya Bag 20lb'] },
    'BLUEBERRIES': { sizes: ['Jumbo', 'Large', 'Medium', '6oz Clamshell', '12oz Clamshell', '18oz Clamshell'], packaging: ['Flat 12x6oz', 'Flat 12x12oz', 'Bulk 10lb', 'Maya Bag 25lb', 'Plastic Bag 2lb'] },
    'TOMATOES': { sizes: ['Extra Large', 'Large', 'Medium', 'Small', '4x5', '5x6', '6x7'], packaging: ['Carton 25lb', 'Box 20lb', 'Lugs 30lb', 'Bulk Bin 800lb', 'Maya Bag 50lb', 'Plastic Bag 5lb'] },
    'PEPPERS': { sizes: ['Jumbo', 'Extra Large', 'Large', 'Medium', 'Small'], packaging: ['Carton 25lb', 'Box 11lb', 'Bushel 28lb', 'Bulk Bin 1000lb', 'Maya Bag 50lb', 'Plastic Bag 2lb'] },
    'CUCUMBERS': { sizes: ['Super Select', 'Select', 'Medium', 'Large'], packaging: ['Carton 24ct', 'Box 18lb', 'Bushel 55lb', 'Bulk Bin', 'Maya Bag 40lb'] },
    'LETTUCE': { sizes: ['24ct', '30ct', 'Loose Leaf', 'Hearts 6ct'], packaging: ['Carton 50lb', 'Box 18lb', 'Bulk Bin', 'Plastic Bag 3ct'] },
    'LIMES': { sizes: ['110ct', '150ct', '175ct', '200ct', '230ct', '250ct'], packaging: ['Carton 40lb', 'Box 10lb', 'Sack 55lb', 'Bulk Bin', 'Maya Bag 25lb'] },
    'MANGOES': { sizes: ['6ct', '8ct', '10ct', '12ct', '14ct'], packaging: ['Carton 10lb', 'Box 8lb', 'Flat 4ct', 'Bulk Bin', 'Maya Bag 15lb'] },
    'CARROTS': { sizes: ['Baby', 'Medium', 'Jumbo', '1lb Bag', '2lb Bag', '5lb Bag'], packaging: ['Carton 50lb', 'Sack 50lb', 'Box 24x1lb', 'Bulk Bin', 'Maya Bag 25lb'] },
    'POTATOES': { sizes: ['A', 'B', 'C', '5lb Bag', '10lb Bag', '20lb Bag'], packaging: ['Carton 50lb', 'Sack 50lb', 'Pallet Bag 2000lb', 'Bulk Bin', 'Maya Bag 100lb'] },
    'ONIONS': { sizes: ['Jumbo', 'Medium', '3lb Bag', '5lb Bag', '10lb Bag'], packaging: ['Sack 50lb', 'Carton 40lb', 'Mesh Bag 25lb', 'Bulk Bin 2000lb', 'Maya Bag 50lb'] }
  };

  const currentSpecs = productSpecs[selectedProduct] || { sizes: ['Small', 'Medium', 'Large'], packaging: ['Carton 25lb', 'Box 20lb', 'Bulk Bin'] };

  useEffect(() => {
    fetchAvailableCommodities();
  }, []);

  const fetchAvailableCommodities = async () => {
    setLoadingCommodities(true);
    try {
      setCommodities([
        'AVOCADOS', 'MANGOES', 'PAPAYAS', 'PINEAPPLES', 'BANANAS',
        'STRAWBERRIES', 'BLUEBERRIES', 'RASPBERRIES', 'BLACKBERRIES', 'GRAPES',
        'LIMES', 'LEMONS', 'ORANGES', 'TANGERINES', 'MANDARINS', 'GRAPEFRUIT',
        'MELONS', 'WATERMELONS', 'CANTALOUPES', 'HONEYDEW MELONS',
        'TOMATOES', 'CHERRY TOMATOES', 'ROMA TOMATOES',
<<<<<<< HEAD
        'PEPPERS', 'BELL PEPPERS', 'JALAPEÑOS', 'HABANEROS',
=======
        'PEPPERS', 'BELL PEPPERS', 'JALAPEÃƒâ€˜OS', 'HABANEROS',
>>>>>>> my/push-branch
        'CUCUMBERS', 'PERSIAN CUCUMBERS',
        'SQUASH', 'ZUCCHINI', 'YELLOW SQUASH',
        'LETTUCE', 'ROMAINE LETTUCE', 'SPINACH', 'KALE',
        'BROCCOLI', 'CAULIFLOWER', 'ASPARAGUS', 'GREEN BEANS',
        'CARROTS', 'POTATOES', 'SWEET POTATOES',
        'ONIONS', 'GREEN ONIONS', 'GARLIC',
        'CORN', 'SWEET CORN',
        'CILANTRO', 'BASIL', 'PARSLEY'
      ]);
    } catch (err) {
      console.warn('Using fallback commodities');
    } finally {
      setLoadingCommodities(false);
    }
  };

  const toggleCommodity = (commodity) => {
    if (selectedCommodities.includes(commodity)) {
      setSelectedCommodities(prev => prev.filter(c => c !== commodity));
    } else {
      if (selectedCommodities.length >= 10) {
        alert('Maximum 10 commodities can be selected');
        return;
      }
      setSelectedCommodities(prev => [...prev, commodity]);
    }
  };

  const fetchRealPriceData = async () => {
    if (selectedCommodities.length === 0) {
      alert('Please select at least one commodity');
      return;
    }
    setLoading(true);
    setError('');
    setPriceData([]);

    try {
      const currentYear = new Date().getFullYear();
      const years = timeframe === 'weekly' ? [currentYear] : [currentYear - 4, currentYear - 3, currentYear - 2, currentYear - 1, currentYear];
      const allData = [];

      for (const commodity of selectedCommodities) {
        for (const year of years) {
          try {
            const response = await fetch(
              `${USDA_NASS_URL}?key=${USDA_NASS_API_KEY}&commodity_desc=${encodeURIComponent(commodity)}&year=${year}&statisticcat_desc=PRICE RECEIVED&freq_desc=WEEKLY&format=JSON`
            );
            if (!response.ok) continue;
            const data = await response.json();
            if (data.data && data.data.length > 0) {
              data.data.forEach(item => {
                if (item.Value && item.Value !== '' && !isNaN(parseFloat(item.Value))) {
                  allData.push({
                    commodity: commodity,
                    year: item.year,
                    week: item.week_ending,
                    price: parseFloat(item.Value)
                  });
                }
              });
            }
          } catch (err) {
            console.error(`Error fetching ${commodity} ${year}`);
          }
        }
      }

      if (allData.length === 0) {
        setError('No price data available. Try different selections.');
      } else {
        setPriceData(allData);
      }
    } catch (err) {
      setError(`Data fetch error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const chartData = React.useMemo(() => {
    if (priceData.length === 0) return [];
    const grouped = {};
    priceData.forEach(item => {
      const key = timeframe === 'weekly' ? item.week : item.year;
      if (!grouped[key]) grouped[key] = { timeLabel: key };
      grouped[key][item.commodity] = item.price;
    });
    return Object.values(grouped).sort((a, b) => {
      if (timeframe === 'weekly') return new Date(a.timeLabel) - new Date(b.timeLabel);
      return a.timeLabel - b.timeLabel;
    });
  }, [priceData, timeframe]);

  const exportToCSV = () => {
    if (chartData.length === 0) return;
    let csv = 'Date/Week,' + selectedCommodities.join(',') + '\n';
    chartData.forEach(row => {
      const values = selectedCommodities.map(c => row[c] || '').join(',');
      csv += `${row.timeLabel},${values}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `USDA_Comparison_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const calculatePricing = () => {
    const sizes = [
      { name: '32s (XLarge)', multiplier: 1.14 },
      { name: '40s (Large)', multiplier: 1.0 },
      { name: '48s (Medium)', multiplier: 0.93 },
      { name: '60s (Small)', multiplier: 0.86 },
      { name: '70s (XSmall)', multiplier: 0.79 },
      { name: '84s (Mini)', multiplier: 0.71 }
    ];
    return sizes.map(size => {
      const baseCost = yourCost * size.multiplier;
      return {
        size: size.name,
        yourCost: baseCost,
        westCoast: baseCost * 1.05,
        westRetail: baseCost * 1.05 * 1.35,
        midwest: baseCost * 1.12,
        midwestRetail: baseCost * 1.12 * 1.40,
        eastCoast: baseCost * 1.18,
        eastRetail: baseCost * 1.18 * 1.45
      };
    });
  };

  const pricingBreakdown = calculatePricing();
  const colors = ['#16a34a', '#2563eb', '#dc2626', '#9333ea', '#ea580c', '#0891b2', '#be123c', '#7c3aed', '#0d9488', '#c026d3'];

  return (
    <div className="max-w-[95%] mx-auto p-6 space-y-6">
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg shadow-lg p-6">
<<<<<<< HEAD
        <h1 className="text-3xl font-bold mb-2">🌽 USDA Pricing Comparison & Analytics</h1>
        <p className="text-green-100">100+ Products • Regional Pricing • Market Analytics</p>
=======
        <h1 className="text-3xl font-bold mb-2">Ã°Å¸Å’Â½ USDA Pricing Comparison & Analytics</h1>
        <p className="text-green-100">100+ Products Ã¢â‚¬Â¢ Regional Pricing Ã¢â‚¬Â¢ Market Analytics</p>
>>>>>>> my/push-branch
      </div>

      <div className="bg-white rounded-lg shadow-lg p-2 flex gap-2">
        <button
          onClick={() => setActiveTab('pricing')}
          className={`flex-1 px-6 py-3 rounded-lg font-bold ${activeTab === 'pricing' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}
        >
<<<<<<< HEAD
          💰 Pricing vs Cost Comparison
=======
          Ã°Å¸â€™Â° Pricing vs Cost Comparison
>>>>>>> my/push-branch
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex-1 px-6 py-3 rounded-lg font-bold ${activeTab === 'analytics' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
        >
<<<<<<< HEAD
          📊 Market Analytics
=======
          Ã°Å¸â€œÅ  Market Analytics
>>>>>>> my/push-branch
        </button>
      </div>

      {activeTab === 'pricing' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Calculate Your Margin</h2>
            <div className="grid grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Product</label>
                <select 
                  value={selectedProduct} 
                  onChange={(e) => {
                    setSelectedProduct(e.target.value);
                    const specs = productSpecs[e.target.value] || currentSpecs;
                    setSelectedSize(specs.sizes[0]);
                    setSelectedPackaging(specs.packaging[0]);
                  }} 
                  className="w-full border rounded-lg px-4 py-2"
                >
                  {commodities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Size/Grade</label>
                <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} className="w-full border rounded-lg px-4 py-2">
                  {currentSpecs.sizes.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Packaging</label>
                <select value={selectedPackaging} onChange={(e) => setSelectedPackaging(e.target.value)} className="w-full border rounded-lg px-4 py-2">
                  {currentSpecs.packaging.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Your FOB Cost ($)</label>
                <input type="number" value={yourCost} onChange={(e) => setYourCost(parseFloat(e.target.value) || 0)} className="w-full border rounded-lg px-4 py-2" step="0.50" />
              </div>
            </div>
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-sm flex-wrap">
                <span className="font-bold text-blue-800">Selected:</span>
                <span className="text-blue-900 font-semibold">{selectedProduct}</span>
<<<<<<< HEAD
                <span className="text-gray-400">•</span>
                <span className="text-blue-900">{selectedSize}</span>
                <span className="text-gray-400">•</span>
                <span className="text-blue-900 font-semibold">{selectedPackaging}</span>
                <span className="text-gray-400">•</span>
=======
                <span className="text-gray-400">Ã¢â‚¬Â¢</span>
                <span className="text-blue-900">{selectedSize}</span>
                <span className="text-gray-400">Ã¢â‚¬Â¢</span>
                <span className="text-blue-900 font-semibold">{selectedPackaging}</span>
                <span className="text-gray-400">Ã¢â‚¬Â¢</span>
>>>>>>> my/push-branch
                <span className="text-green-700 font-bold">${yourCost.toFixed(2)} FOB</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
<<<<<<< HEAD
              <h3 className="text-lg font-bold text-blue-900 mb-4">🌊 West Coast</h3>
=======
              <h3 className="text-lg font-bold text-blue-900 mb-4">Ã°Å¸Å’Å  West Coast</h3>
>>>>>>> my/push-branch
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-gray-600">Wholesale Price</div>
                  <div className="text-2xl font-bold text-blue-700">${(yourCost * 1.05).toFixed(2)}</div>
                  <div className="text-xs text-gray-500">+5% freight</div>
                </div>
                <div className="pt-3 border-t">
                  <div className="text-xs text-gray-600">Est. Retail Range</div>
                  <div className="text-lg font-semibold text-blue-800">${(yourCost * 1.05 * 1.25).toFixed(2)} - ${(yourCost * 1.05 * 1.45).toFixed(2)}</div>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 rounded-lg shadow-lg p-6 border-l-4 border-orange-500">
<<<<<<< HEAD
              <h3 className="text-lg font-bold text-orange-900 mb-4">🌾 Midwest</h3>
=======
              <h3 className="text-lg font-bold text-orange-900 mb-4">Ã°Å¸Å’Â¾ Midwest</h3>
>>>>>>> my/push-branch
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-gray-600">Wholesale Price</div>
                  <div className="text-2xl font-bold text-orange-700">${(yourCost * 1.12).toFixed(2)}</div>
                  <div className="text-xs text-gray-500">+12% freight</div>
                </div>
                <div className="pt-3 border-t">
                  <div className="text-xs text-gray-600">Est. Retail Range</div>
                  <div className="text-lg font-semibold text-orange-800">${(yourCost * 1.12 * 1.30).toFixed(2)} - ${(yourCost * 1.12 * 1.50).toFixed(2)}</div>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
<<<<<<< HEAD
              <h3 className="text-lg font-bold text-purple-900 mb-4">🏙️ East Coast</h3>
=======
              <h3 className="text-lg font-bold text-purple-900 mb-4">Ã°Å¸Ââ„¢Ã¯Â¸Â East Coast</h3>
>>>>>>> my/push-branch
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-gray-600">Wholesale Price</div>
                  <div className="text-2xl font-bold text-purple-700">${(yourCost * 1.18).toFixed(2)}</div>
                  <div className="text-xs text-gray-500">+18% freight</div>
                </div>
                <div className="pt-3 border-t">
                  <div className="text-xs text-gray-600">Est. Retail Range</div>
                  <div className="text-lg font-semibold text-purple-800">${(yourCost * 1.18 * 1.35).toFixed(2)} - ${(yourCost * 1.18 * 1.55).toFixed(2)}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Complete Pricing Breakdown by Size</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left font-bold">Size</th>
                    <th className="px-4 py-3 text-right font-bold">Your Cost</th>
                    <th className="px-4 py-3 text-center font-bold text-blue-700">West Wholesale</th>
                    <th className="px-4 py-3 text-center font-bold text-blue-600">West Retail</th>
                    <th className="px-4 py-3 text-center font-bold text-orange-700">Midwest Wholesale</th>
                    <th className="px-4 py-3 text-center font-bold text-orange-600">Midwest Retail</th>
                    <th className="px-4 py-3 text-center font-bold text-purple-700">East Wholesale</th>
                    <th className="px-4 py-3 text-center font-bold text-purple-600">East Retail</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {pricingBreakdown.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold">{row.size}</td>
                      <td className="px-4 py-3 text-right font-bold">${row.yourCost.toFixed(2)}</td>
                      <td className="px-4 py-3 text-center bg-blue-50 font-semibold">${row.westCoast.toFixed(2)}</td>
                      <td className="px-4 py-3 text-center bg-blue-100">${row.westRetail.toFixed(2)}</td>
                      <td className="px-4 py-3 text-center bg-orange-50 font-semibold">${row.midwest.toFixed(2)}</td>
                      <td className="px-4 py-3 text-center bg-orange-100">${row.midwestRetail.toFixed(2)}</td>
                      <td className="px-4 py-3 text-center bg-purple-50 font-semibold">${row.eastCoast.toFixed(2)}</td>
                      <td className="px-4 py-3 text-center bg-purple-100">${row.eastRetail.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="bg-green-50 rounded-lg p-5 border-l-4 border-green-500">
              <div className="text-xs font-semibold text-gray-600">Avg Wholesale Markup</div>
              <div className="text-3xl font-bold text-green-700">+11.7%</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-5 border-l-4 border-blue-500">
              <div className="text-xs font-semibold text-gray-600">Avg Retail Markup</div>
              <div className="text-3xl font-bold text-blue-700">+38%</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-5 border-l-4 border-yellow-500">
              <div className="text-xs font-semibold text-gray-600">Best Market</div>
              <div className="text-2xl font-bold text-yellow-700">East Coast</div>
            </div>
            <div className="bg-red-50 rounded-lg p-5 border-l-4 border-red-500">
              <div className="text-xs font-semibold text-gray-600">Freight Impact</div>
              <div className="text-3xl font-bold text-red-700">5-18%</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Select Commodities (Max 10)</h2>
              <select value={timeframe} onChange={(e) => setTimeframe(e.target.value)} className="border rounded-lg px-3 py-2">
                <option value="weekly">Weekly (Current Year)</option>
                <option value="yearly">5-Year Comparison</option>
              </select>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {commodities.slice(0, 30).map(commodity => (
                <button
                  key={commodity}
                  onClick={() => toggleCommodity(commodity)}
                  className={`px-4 py-2 rounded-lg font-medium ${selectedCommodities.includes(commodity) ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                >
<<<<<<< HEAD
                  {commodity} {selectedCommodities.includes(commodity) && '✓'}
=======
                  {commodity} {selectedCommodities.includes(commodity) && 'Ã¢Å“â€œ'}
>>>>>>> my/push-branch
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button onClick={fetchRealPriceData} disabled={loading} className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold">
                {loading ? 'Loading...' : 'Load Real Price Data'}
              </button>
              {chartData.length > 0 && (
                <button onClick={exportToCSV} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold">Export CSV</button>
              )}
            </div>
          </div>

          {error && <div className="bg-red-50 border border-red-200 rounded-lg p-4"><p className="text-red-700">{error}</p></div>}

          {chartData.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-6">{timeframe === 'weekly' ? 'Weekly Price Comparison' : '5-Year Price Trends'}</h3>
              <ResponsiveContainer width="100%" height={500}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timeLabel" angle={-45} textAnchor="end" height={100} />
                  <YAxis label={{ value: 'Price ($)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  {selectedCommodities.map((commodity, index) => (
                    <Line key={commodity} type="monotone" dataKey={commodity} stroke={colors[index % colors.length]} strokeWidth={3} />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {chartData.length === 0 && !loading && (
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <TrendingUp className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Ready to Compare Prices</h3>
              <p className="text-gray-600">Select commodities and click Load Real Price Data</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}