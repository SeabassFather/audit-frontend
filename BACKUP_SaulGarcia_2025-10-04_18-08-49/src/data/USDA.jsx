import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, DollarSign, Calculator, FileText, Upload, MapPin, Calendar, Package, CheckCircle, X, Search, ShoppingCart } from 'lucide-react';

export default function USDA() {
  const [activeTab, setActiveTab] = useState('pricing');
  const [invoiceAmount, setInvoiceAmount] = useState('');
  const [advancePercent, setAdvancePercent] = useState(85);
  const [factoringTier, setFactoringTier] = useState('standard');
  const [showListingModal, setShowListingModal] = useState(false);
  
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [originRegion, setOriginRegion] = useState('');
  const [destinationMarket, setDestinationMarket] = useState('west-coast');
  const [pricingResults, setPricingResults] = useState(null);

  const products = {
    avocado: {
      name: 'Avocado Hass',
      nameEs: 'Aguacate Hass',
      sizes: [
        { id: '48s', label: '48s (Large)', baseCost: 32 },
        { id: '60s', label: '60s (Medium)', baseCost: 28 },
        { id: '70s', label: '70s (Small)', baseCost: 24 },
        { id: '84s', label: '84s (Extra Small)', baseCost: 20 }
      ]
    },
    strawberries: {
      name: 'Strawberries',
      nameEs: 'Fresas',
      sizes: [
        { id: '1lb-clamshell', label: '1 lb Clamshell', baseCost: 4.50 },
        { id: '2lb-clamshell', label: '2 lb Clamshell', baseCost: 8.00 },
        { id: '8lb-flat', label: '8 lb Flat', baseCost: 28 }
      ]
    },
    carrots: {
      name: 'Carrots',
      nameEs: 'Zanahorias',
      sizes: [
        { id: '25lb-bag', label: '25 lb Bag', baseCost: 12 },
        { id: '50lb-bag', label: '50 lb Bag', baseCost: 22 },
        { id: '1lb-bag', label: '1 lb Bag (retail)', baseCost: 1.20 }
      ]
    },
    peppers: {
      name: 'Bell Peppers',
      nameEs: 'Pimientos',
      sizes: [
        { id: '25lb-box', label: '25 lb Box', baseCost: 18 },
        { id: '11lb-box', label: '11 lb Box', baseCost: 10 }
      ]
    },
    asparagus: {
      name: 'Asparagus',
      nameEs: 'Espárragos',
      sizes: [
        { id: '11lb-box', label: '11 lb Box (Standard)', baseCost: 35 },
        { id: '28lb-box', label: '28 lb Box (Jumbo)', baseCost: 85 }
      ]
    }
  };

  const origins = [
    { id: 'michoacan-mx', label: 'Michoacán, Mexico', country: 'mexico' },
    { id: 'sinaloa-mx', label: 'Sinaloa, Mexico', country: 'mexico' },
    { id: 'jalisco-mx', label: 'Jalisco, Mexico', country: 'mexico' },
    { id: 'baja-california-mx', label: 'Baja California, Mexico', country: 'mexico' },
    { id: 'california-usa', label: 'California, USA', country: 'usa' },
    { id: 'florida-usa', label: 'Florida, USA', country: 'usa' },
    { id: 'guatemala', label: 'Guatemala', country: 'central-america' },
    { id: 'peru', label: 'Peru', country: 'south-america' },
    { id: 'chile', label: 'Chile', country: 'south-america' }
  ];

  const freightRates = {
    'mexico-west-coast': 0.05,
    'mexico-midwest': 0.12,
    'mexico-east-coast': 0.18,
    'usa-west-coast': 0.03,
    'usa-midwest': 0.08,
    'usa-east-coast': 0.15,
    'central-america-west-coast': 0.15,
    'central-america-midwest': 0.20,
    'central-america-east-coast': 0.25,
    'south-america-west-coast': 0.22,
    'south-america-midwest': 0.28,
    'south-america-east-coast': 0.35,
  };

  const calculatePricing = () => {
    if (!selectedProduct || !selectedSize || !originRegion) {
      alert('Please select product, size, and origin region');
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

  const mockListings = [
    { id: 'ID-1', crop: 'Avocado Hass', cropEs: 'Aguacate Hass', hectares: 45, season: 'Year-round', seasonEs: 'Todo el año', targetPrice: '$24-28/case', certs: ['GlobalGAP', 'PRIMUS'], state: 'Michoacán, MX', volume: '500 tons/week' },
    { id: 'ID-2', crop: 'Organic Strawberries', cropEs: 'Fresas Orgánicas', hectares: 12, season: 'Nov - Apr', seasonEs: 'Nov - Abr', targetPrice: '$18-22/flat', certs: ['GlobalGAP', 'Organic'], state: 'Baja California, MX', volume: '200 tons/week' },
    { id: 'ID-3', crop: 'Bell Peppers (Mixed)', cropEs: 'Pimientos Mixtos', hectares: 28, season: 'Mar - Oct', seasonEs: 'Mar - Oct', targetPrice: '$10-14/box', certs: ['PRIMUS', 'HACCP'], state: 'Sinaloa, MX', volume: '800 tons/week' },
    { id: 'ID-4', crop: 'Asparagus', cropEs: 'Espárragos', hectares: 18, season: 'Feb - May', seasonEs: 'Feb - May', targetPrice: '$16-20/lb', certs: ['GlobalGAP'], state: 'Sonora, MX', volume: '150 tons/week' },
  ];

  const calculateFactoringRate = () => {
    const amount = parseFloat(invoiceAmount);
    if (isNaN(amount) || amount <= 0) return null;

    let baseRate = 3.5;
    if (amount >= 100000) baseRate = 2.5;
    else if (amount >= 50000) baseRate = 3.0;
    
    const tierRates = { standard: 0, expedited: 0.5, international: 1.0 };
    const totalRate = baseRate + tierRates[factoringTier];
    const fee = (amount * totalRate / 100).toFixed(2);
    const advance = (amount * advancePercent / 100).toFixed(2);

    return { rate: totalRate.toFixed(2), fee, advance };
  };

  const factoringQuote = calculateFactoringRate();

  return (
    <div className="space-y-6 p-6">
      {/* TABS */}
      <div className="bg-white rounded-lg shadow-lg p-2">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('pricing')}
            className={`flex-1 py-4 px-6 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2 ${
              activeTab === 'pricing'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Search className="w-6 h-6" />
            <div className="text-left">
              <div>Pricing & Search</div>
              <div className="text-xs opacity-75">Precios y Búsqueda</div>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`flex-1 py-4 px-6 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2 ${
              activeTab === 'marketplace'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <ShoppingCart className="w-6 h-6" />
            <div className="text-left">
              <div>Grower Marketplace</div>
              <div className="text-xs opacity-75">Mercado de Productores</div>
            </div>
          </button>
        </div>
      </div>

      {/* TAB 1: PRICING & SEARCH */}
      {activeTab === 'pricing' && (
        <div className="space-y-8">
          {/* Product Pricing Calculator */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
              <TrendingUp className="text-green-600" />
              Product Pricing Calculator
            </h2>
            <p className="text-sm text-gray-500 italic mb-6">Calculadora de Precios por Producto</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Product * <span className="text-gray-500 text-xs italic">/ Producto</span>
                </label>
                <select
                  value={selectedProduct}
                  onChange={(e) => {
                    setSelectedProduct(e.target.value);
                    setSelectedSize('');
                    setPricingResults(null);
                  }}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 font-semibold"
                >
                  <option value="">Select product...</option>
                  <option value="avocado">🥑 Avocado Hass / Aguacate</option>
                  <option value="strawberries">🍓 Strawberries / Fresas</option>
                  <option value="carrots">🥕 Carrots / Zanahorias</option>
                  <option value="peppers">🫑 Bell Peppers / Pimientos</option>
                  <option value="asparagus">Asparagus / Espárragos</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Size/Pack * <span className="text-gray-500 text-xs italic">/ Tamaño</span>
                </label>
                <select
                  value={selectedSize}
                  onChange={(e) => {
                    setSelectedSize(e.target.value);
                    setPricingResults(null);
                  }}
                  disabled={!selectedProduct}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 font-semibold disabled:bg-gray-100"
                >
                  <option value="">Select size...</option>
                  {selectedProduct && products[selectedProduct].sizes.map(size => (
                    <option key={size.id} value={size.id}>{size.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Origin Region * <span className="text-gray-500 text-xs italic">/ Origen</span>
                </label>
                <select
                  value={originRegion}
                  onChange={(e) => {
                    setOriginRegion(e.target.value);
                    setPricingResults(null);
                  }}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 font-semibold"
                >
                  <option value="">Select origin...</option>
                  {origins.map(origin => (
                    <option key={origin.id} value={origin.id}>{origin.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Destination * <span className="text-gray-500 text-xs italic">/ Destino</span>
                </label>
                <select
                  value={destinationMarket}
                  onChange={(e) => {
                    setDestinationMarket(e.target.value);
                    setPricingResults(null);
                  }}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 font-semibold"
                >
                  <option value="west-coast">🌊 West Coast</option>
                  <option value="midwest">🌾 Midwest</option>
                  <option value="east-coast">🏙️ East Coast</option>
                </select>
              </div>
            </div>

            <button
              onClick={calculatePricing}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-bold text-lg transition-all shadow-lg"
            >
              🚀 Calculate Pricing / Calcular Precios
            </button>

            {pricingResults && (
              <div className="mt-8 space-y-6">
                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 border-2 border-green-300 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{pricingResults.product}</h3>
                      <p className="text-sm text-gray-500 italic">{pricingResults.productEs}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-700">{pricingResults.size}</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 mb-6 shadow">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Route:</span> {pricingResults.origin} → {pricingResults.destination}
                    </p>
                  </div>

                  {/* PRICING CHART */}
                  <div className="bg-white rounded-lg p-6 mb-6 shadow-lg">
                    <h4 className="text-lg font-bold text-gray-800 mb-4">📊 Pricing Breakdown / Desglose de Precios</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={[
                        { name: 'Base Cost', value: parseFloat(pricingResults.baseCost), fill: '#6B7280' },
                        { name: 'Cost+Freight', value: parseFloat(pricingResults.totalCost), fill: '#F59E0B' },
                        { name: 'Wholesale', value: parseFloat(pricingResults.wholesalePrice), fill: '#3B82F6' },
                        { name: 'Retail Min', value: parseFloat(pricingResults.retailMin), fill: '#8B5CF6' },
                        { name: 'Retail Max', value: parseFloat(pricingResults.retailMax), fill: '#7C3AED' }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" style={{ fontSize: '12px' }} />
                        <YAxis label={{ value: 'Price ($)', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                          {[0, 1, 2, 3, 4].map((index) => (
                            <Cell key={`cell-${index}`} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-gray-400">
                      <p className="text-xs text-gray-600 font-semibold mb-1">Base Cost</p>
                      <p className="text-2xl font-bold text-gray-800">${pricingResults.baseCost}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-orange-400">
                      <p className="text-xs text-gray-600 font-semibold mb-1">Freight ({pricingResults.freightRate}%)</p>
                      <p className="text-2xl font-bold text-orange-600">${pricingResults.freightCost}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-red-400">
                      <p className="text-xs text-gray-600 font-semibold mb-1">Total Cost</p>
                      <p className="text-2xl font-bold text-red-600">${pricingResults.totalCost}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-green-400">
                      <p className="text-xs text-gray-600 font-semibold mb-1">Your Margin</p>
                      <p className="text-2xl font-bold text-green-600">${pricingResults.margin}</p>
                      <p className="text-xs text-green-600 font-bold">({pricingResults.marginPercent}%)</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-lg p-6 shadow-lg">
                      <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <DollarSign className="w-5 h-5" />
                        YOUR WHOLESALE PRICE
                      </p>
                      <p className="text-5xl font-bold mb-2">${pricingResults.wholesalePrice}</p>
                      <p className="text-xs opacity-90">Price you sell to distributors/retailers</p>
                      <p className="text-xs opacity-75 italic mt-1">Precio mayorista</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-lg p-6 shadow-lg">
                      <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <Calculator className="w-5 h-5" />
                        SUGGESTED RETAIL PRICE
                      </p>
                      <p className="text-5xl font-bold mb-2">${pricingResults.retailMin} - ${pricingResults.retailMax}</p>
                      <p className="text-xs opacity-90">What your customers should charge consumers</p>
                      <p className="text-xs opacity-75 italic mt-1">Precio minorista sugerido</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Factoring Calculator */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <FileText className="text-purple-600" />
              Factoring Services Calculator
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Invoice Amount ($)</label>
                <input
                  type="number"
                  value={invoiceAmount}
                  onChange={(e) => setInvoiceAmount(e.target.value)}
                  placeholder="50000"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Advance %</label>
                <input
                  type="range"
                  min="80"
                  max="90"
                  value={advancePercent}
                  onChange={(e) => setAdvancePercent(e.target.value)}
                  className="w-full"
                />
                <p className="text-center font-bold text-gray-800 mt-1">{advancePercent}%</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Service Tier</label>
                <select
                  value={factoringTier}
                  onChange={(e) => setFactoringTier(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                >
                  <option value="standard">Standard (2-3 days)</option>
                  <option value="expedited">Expedited (24 hrs)</option>
                  <option value="international">International</option>
                </select>
              </div>
            </div>

            {factoringQuote && (
              <div className="bg-purple-50 rounded-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-700">Estimated Rate</p>
                  <p className="text-2xl font-bold text-purple-700">{factoringQuote.rate}%</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">Factoring Fee</p>
                  <p className="text-2xl font-bold text-purple-700">${factoringQuote.fee}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">Advance Amount</p>
                  <p className="text-2xl font-bold text-purple-700">${factoringQuote.advance}</p>
                </div>
                <div className="col-span-3">
                  <p className="text-xs text-gray-600 italic">* Approximate quote - final rate subject to underwriting and credit review</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: GROWER MARKETPLACE */}
      {activeTab === 'marketplace' && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <TrendingUp className="text-green-600" />
                Grower Marketplace
              </h2>
              <p className="text-sm text-gray-500 italic mt-1">Mercado de Productores</p>
            </div>
            <button
              onClick={() => setShowListingModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex flex-col items-center gap-1 transition-all shadow-lg"
            >
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                <span>List Your Crop</span>
              </div>
              <span className="text-xs opacity-90">Publicar Cultivo</span>
            </button>
          </div>

          <div className="mb-6 flex flex-wrap gap-4">
            <select className="border border-gray-300 rounded-lg px-4 py-2">
              <option>All Crops / Todos los Cultivos</option>
              <option>Avocado / Aguacate</option>
              <option>Strawberries / Fresas</option>
              <option>Bell Peppers / Pimientos</option>
              <option>Asparagus / Espárragos</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-4 py-2">
              <option>All States / Todos los Estados</option>
              <option>Sinaloa</option>
              <option>Jalisco</option>
              <option>Michoacán</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-4 py-2">
              <option>All Seasons / Todas las Temporadas</option>
              <option>Year-round / Todo el año</option>
              <option>Nov - Apr</option>
              <option>Mar - Oct</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockListings.map((listing) => (
              <div key={listing.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{listing.crop}</h3>
                    <p className="text-xs text-gray-500 italic">{listing.cropEs}</p>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{listing.id}</span>
                </div>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-green-600" />
                    <span className="font-semibold">{listing.state}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-blue-600" />
                    <div className="flex flex-col">
                      <span>{listing.hectares} hectares • {listing.volume}</span>
                      <span className="text-xs text-gray-500 italic">{listing.hectares} hectáreas</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-orange-600" />
                    <div className="flex flex-col">
                      <span>{listing.season}</span>
                      <span className="text-xs text-gray-500 italic">{listing.seasonEs}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-700" />
                    <div className="flex flex-col">
                      <span className="font-bold text-green-700">{listing.targetPrice}</span>
                      <span className="text-xs text-gray-500 italic">Precio objetivo</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {listing.certs.map((cert, i) => (
                    <span key={i} className="text