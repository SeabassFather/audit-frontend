import React, { useState, useEffect, useMemo } from 'react';
import { agMarketplaceAPI, tradeFinanceAPI } from '../../utils/searchAPIs.js';

const factoringTypes = [
  { value: 'invoice', label: 'Invoice Factoring', description: 'Sell outstanding invoices for immediate cash' },
  { value: 'equipment', label: 'Equipment Finance', description: 'Finance agricultural equipment purchases' },
  { value: 'purchase-order', label: 'Purchase Order Finance', description: 'Finance against confirmed purchase orders' },
  { value: 'inventory', label: 'Inventory Finance', description: 'Use inventory as collateral for funding' },
  { value: 'trade-credit', label: 'Trade Credit', description: 'Extended payment terms for suppliers' },
  { value: 'crop-advance', label: 'Crop Advance', description: 'Pre-harvest financing for growers' }
];

const cropTypes = [
  'Avocado', 'Berries', 'Citrus', 'Tomatoes', 'Leafy Greens', 
  'Stone Fruit', 'Grapes', 'Nuts', 'Corn', 'Soybeans', 'Wheat', 'Other'
];

const certifications = [
  'USDA Organic', 'GlobalG.A.P.', 'SQF', 'BRC', 'Fair Trade', 
  'Rainforest Alliance', 'PrimusGFS', 'SMETA', 'Non-GMO Project'
];

export default function AgFactoringMarketplace() {
  const [activeTab, setActiveTab] = useState('browse');
  const [searchParams, setSearchParams] = useState({
    factoringType: 'invoice',
    cropType: 'Avocado',
    amount: 100000,
    advanceRate: 80,
    term: 30,
    certification: '',
    region: 'California'
  });

  const [deals, setDeals] = useState([]);
  const [myDeals, setMyDeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newDeal, setNewDeal] = useState({
    title: '',
    type: 'invoice',
    amount: 0,
    advanceRate: 80,
    term: 30,
    crop: 'Avocado',
    description: '',
    certifications: [],
    region: 'California'
  });

  // Load marketplace deals
  useEffect(() => {
    const loadDeals = async () => {
      setLoading(true);
      try {
        const [agDeals, financeDeals] = await Promise.all([
          agMarketplaceAPI(searchParams),
          tradeFinanceAPI(searchParams)
        ]);
        
        // Combine and format deals
        const combinedDeals = [
          ...agDeals.map(deal => ({
            id: Math.random().toString(36),
            type: 'agricultural',
            title: `${deal.crop} Factoring - ${deal.grower}`,
            grower: deal.grower,
            crop: deal.crop,
            certifications: deal.certs || [],
            riskLevel: deal.risk || 'Medium',
            amount: Math.floor(Math.random() * 500000) + 50000,
            advanceRate: 75 + Math.floor(Math.random() * 20),
            term: 30 + Math.floor(Math.random() * 60),
            region: 'California',
            status: 'Available',
            postedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()
          })),
          ...financeDeals.map(deal => ({
            id: Math.random().toString(36),
            type: 'finance',
            title: `${deal.product} - ${deal.note}`,
            product: deal.product,
            advanceRate: parseInt(deal.advance),
            term: parseInt(deal.tenor),
            amount: Math.floor(Math.random() * 1000000) + 100000,
            riskLevel: 'Low',
            region: 'Multi-State',
            status: 'Available',
            postedDate: new Date(Date.now() - Math.random() * 15 * 24 * 60 * 60 * 1000).toLocaleDateString()
          }))
        ];
        
        setDeals(combinedDeals);
      } catch (error) {
        console.error('Error loading deals:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDeals();
  }, [searchParams]);

  // Filter deals based on search params
  const filteredDeals = useMemo(() => {
    return deals.filter(deal => {
      if (searchParams.factoringType === 'invoice' && deal.type !== 'agricultural') return false;
      if (searchParams.factoringType === 'equipment' && deal.type !== 'finance') return false;
      if (searchParams.cropType !== 'Other' && deal.crop && deal.crop !== searchParams.cropType) return false;
      if (searchParams.amount && deal.amount < searchParams.amount * 0.5) return false;
      return true;
    });
  }, [deals, searchParams]);

  const submitNewDeal = () => {
    const deal = {
      ...newDeal,
      id: Math.random().toString(36),
      status: 'Pending Approval',
      postedDate: new Date().toLocaleDateString(),
      submittedBy: 'Current User'
    };
    
    setMyDeals(prev => [...prev, deal]);
    setNewDeal({
      title: '',
      type: 'invoice',
      amount: 0,
      advanceRate: 80,
      term: 30,
      crop: 'Avocado',
      description: '',
      certifications: [],
      region: 'California'
    });
    setActiveTab('my-deals');
  };

  const renderBrowseDeals = () => (
    <div className="space-y-6">
      {/* Search Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Search Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Factoring Type</label>
            <select
              value={searchParams.factoringType}
              onChange={(e) => setSearchParams(prev => ({...prev, factoringType: e.target.value}))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              {factoringTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Crop Type</label>
            <select
              value={searchParams.cropType}
              onChange={(e) => setSearchParams(prev => ({...prev, cropType: e.target.value}))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              {cropTypes.map(crop => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Min Amount</label>
            <input
              type="number"
              value={searchParams.amount}
              onChange={(e) => setSearchParams(prev => ({...prev, amount: Number(e.target.value)}))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              step="10000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
            <select
              value={searchParams.region}
              onChange={(e) => setSearchParams(prev => ({...prev, region: e.target.value}))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="California">California</option>
              <option value="Florida">Florida</option>
              <option value="Texas">Texas</option>
              <option value="Mexico">Mexico</option>
              <option value="Multi-State">Multi-State</option>
            </select>
          </div>
        </div>
      </div>

      {/* Deals List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredDeals.length > 0 ? (
          filteredDeals.map(deal => (
            <div key={deal.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{deal.title}</h3>
                  <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Amount:</span>
                      <div className="font-medium">${deal.amount.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Advance Rate:</span>
                      <div className="font-medium">{deal.advanceRate}%</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Term:</span>
                      <div className="font-medium">{deal.term} days</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Risk Level:</span>
                      <div className={`font-medium ${
                        deal.riskLevel === 'Low' ? 'text-green-600' :
                        deal.riskLevel === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                      }`}>{deal.riskLevel}</div>
                    </div>
                  </div>
                  
                  {deal.certifications && deal.certifications.length > 0 && (
                    <div className="mt-3">
                      <span className="text-sm text-gray-600">Certifications:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {deal.certifications.map(cert => (
                          <span key={cert} className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-3 text-sm text-gray-600">
                    Posted: {deal.postedDate} • Region: {deal.region}
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 ml-4">
                  <span className={`px-3 py-1 rounded-md text-sm font-medium ${
                    deal.status === 'Available' ? 'bg-green-100 text-green-800' :
                    deal.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {deal.status}
                  </span>
                  <button className="btn btn-primary text-sm">
                    View Details
                  </button>
                  <button className="btn btn-outline text-sm">
                    Make Offer
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No deals found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );

  const renderSubmitDeal = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Submit New Factoring Deal</h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Deal Title</label>
            <input
              type="text"
              value={newDeal.title}
              onChange={(e) => setNewDeal(prev => ({...prev, title: e.target.value}))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="e.g., Avocado Invoice Factoring"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              value={newDeal.type}
              onChange={(e) => setNewDeal(prev => ({...prev, type: e.target.value}))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              {factoringTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount ($)</label>
            <input
              type="number"
              value={newDeal.amount}
              onChange={(e) => setNewDeal(prev => ({...prev, amount: Number(e.target.value)}))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              step="1000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Advance Rate (%)</label>
            <input
              type="number"
              value={newDeal.advanceRate}
              onChange={(e) => setNewDeal(prev => ({...prev, advanceRate: Number(e.target.value)}))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              min="1"
              max="95"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Term (Days)</label>
            <input
              type="number"
              value={newDeal.term}
              onChange={(e) => setNewDeal(prev => ({...prev, term: Number(e.target.value)}))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              min="1"
              max="365"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Crop Type</label>
            <select
              value={newDeal.crop}
              onChange={(e) => setNewDeal(prev => ({...prev, crop: e.target.value}))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              {cropTypes.map(crop => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={newDeal.description}
            onChange={(e) => setNewDeal(prev => ({...prev, description: e.target.value}))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            rows="4"
            placeholder="Describe your factoring needs, payment terms, buyer information, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Certifications</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {certifications.map(cert => (
              <label key={cert} className="flex items-center">
                <input
                  type="checkbox"
                  checked={newDeal.certifications.includes(cert)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setNewDeal(prev => ({...prev, certifications: [...prev.certifications, cert]}));
                    } else {
                      setNewDeal(prev => ({...prev, certifications: prev.certifications.filter(c => c !== cert)}));
                    }
                  }}
                  className="mr-2"
                />
                <span className="text-sm">{cert}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={submitNewDeal}
          disabled={!newDeal.title || !newDeal.amount}
          className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Deal for Review
        </button>
      </div>
    </div>
  );

  const renderMyDeals = () => (
    <div className="space-y-4">
      {myDeals.length > 0 ? (
        myDeals.map(deal => (
          <div key={deal.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{deal.title}</h3>
                <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Amount:</span>
                    <div className="font-medium">${deal.amount.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Advance Rate:</span>
                    <div className="font-medium">{deal.advanceRate}%</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Term:</span>
                    <div className="font-medium">{deal.term} days</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Posted:</span>
                    <div className="font-medium">{deal.postedDate}</div>
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-md text-sm font-medium ${
                deal.status === 'Pending Approval' ? 'bg-yellow-100 text-yellow-800' :
                deal.status === 'Active' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {deal.status}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8 text-gray-500">
          You haven't submitted any deals yet.
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Agricultural Factoring Marketplace</h1>
        <p className="text-gray-600">Connect growers with funders for transparent agricultural financing</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'browse', label: 'Browse Deals', icon: '🔍' },
            { id: 'submit', label: 'Submit Deal', icon: '📝' },
            { id: 'my-deals', label: 'My Deals', icon: '📋' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'browse' && renderBrowseDeals()}
      {activeTab === 'submit' && renderSubmitDeal()}
      {activeTab === 'my-deals' && renderMyDeals()}
    </div>
  );
}