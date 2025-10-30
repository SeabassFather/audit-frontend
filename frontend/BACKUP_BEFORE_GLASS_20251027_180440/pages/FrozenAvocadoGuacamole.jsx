import React, { useState } from 'react';
import { Package, TrendingUp, Factory, Truck, Thermometer, Award, DollarSign, FileText, Search, Download } from 'lucide-react';

export default function FrozenAvocadoGuacamole() {
  const [activeTab, setActiveTab] = useState('products');

  // Product categories
  const productCategories = [
    {
      name: 'IQF Avocado Chunks',
      description: 'Individually Quick Frozen diced avocado',
      packSizes: ['2.5 lb bags', '5 lb bags', '10 lb bags', '30 lb cases'],
      priceRange: '$2.50 - $3.50/lb',
      shelfLife: '18-24 months',
      hsCode: '0811.90.80',
      applications: ['Foodservice', 'Retail', 'Food Manufacturing'],
      storageTemp: '-18°C (0°F)',
      icon: '🧊'
    },
    {
      name: 'Frozen Guacamole (Traditional)',
      description: 'Ready-to-thaw traditional recipe',
      packSizes: ['2 lb pouches', '5 lb pouches', '32 oz cups', '6 oz cups'],
      priceRange: '$3.00 - $4.50/lb',
      shelfLife: '12-18 months',
      hsCode: '2008.99.90',
      applications: ['Foodservice', 'Retail', 'Quick Service'],
      storageTemp: '-18°C (0°F)',
      icon: '🥣'
    },
    {
      name: 'Frozen Avocado Halves',
      description: 'Whole avocado halves, frozen',
      packSizes: ['24 halves/case', '48 halves/case', 'Bulk'],
      priceRange: '$0.80 - $1.20/unit',
      shelfLife: '18-24 months',
      hsCode: '0811.90.80',
      applications: ['Foodservice', 'Guacamole Production'],
      storageTemp: '-18°C (0°F)',
      icon: '🥑'
    }
  ];

  const suppliers = [
    { name: 'Calavo Growers', location: 'Santa Paula, CA', volume: '50M+ lbs/year' },
    { name: 'Mission Produce', location: 'Oxnard, CA', volume: '100M+ lbs/year' },
    { name: 'Simplot', location: 'Mexico', volume: '200M+ lbs/year' }
  ];

  const buyers = [
    { name: 'Chipotle', volume: '100M+ lbs/year', products: 'Guacamole, Chunks' },
    { name: 'Walmart', volume: '80M+ lbs/year', products: 'All frozen products' },
    { name: 'Costco', volume: '60M+ lbs/year', products: 'Retail guacamole, IQF' }
  ];

  const tabs = [
    { id: 'products', name: 'Product Catalog', icon: Package },
    { id: 'pricing', name: 'Market Pricing', icon: DollarSign },
    { id: 'suppliers', name: 'Suppliers', icon: Factory },
    { id: 'buyers', name: 'Major Buyers', icon: Truck }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 via-emerald-600 to-green-700 rounded-xl p-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-6xl">🥑</div>
          <div>
            <h1 className="text-4xl font-black mb-2">Frozen Avocado & Guacamole Intelligence</h1>
            <p className="text-green-100 text-lg">Market intelligence • Pricing • Suppliers • Buyers</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-lg p-2 flex flex-wrap gap-2">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon className="w-5 h-5" />
              {tab.name}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        {activeTab === 'products' && (
          <div>
            <h2 className="text-2xl font-black mb-6">Frozen Avocado Product Catalog</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productCategories.map((product, idx) => (
                <div key={idx} className="border-2 border-gray-200 rounded-xl p-6 hover:border-green-500 transition-all">
                  <div className="text-4xl mb-4">{product.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  <div className="space-y-2 text-sm">
                    <div><strong>Price:</strong> {product.priceRange}</div>
                    <div><strong>Shelf Life:</strong> {product.shelfLife}</div>
                    <div><strong>HS Code:</strong> {product.hsCode}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'suppliers' && (
          <div>
            <h2 className="text-2xl font-black mb-6">Major Suppliers</h2>
            <div className="space-y-4">
              {suppliers.map((supplier, idx) => (
                <div key={idx} className="border-2 border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-lg">{supplier.name}</h3>
                  <div className="text-sm text-gray-600">
                    {supplier.location} • {supplier.volume}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'buyers' && (
          <div>
            <h2 className="text-2xl font-black mb-6">Major Buyers</h2>
            <div className="space-y-4">
              {buyers.map((buyer, idx) => (
                <div key={idx} className="border-2 border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-lg">{buyer.name}</h3>
                  <div className="text-sm"><strong>Volume:</strong> {buyer.volume}</div>
                  <div className="text-sm text-gray-600">{buyer.products}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}