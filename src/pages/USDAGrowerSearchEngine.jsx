import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, MapPin, Phone, Mail, MessageCircle, Download, 
  Star, TrendingUp, Award, AlertCircle, CheckCircle, Globe, 
  Truck, Clock, DollarSign, FileText, QrCode, Camera
} from 'lucide-react';
import { growerDatabase, searchGrowers, getFilterOptions } from '../data/growerDatabase';
import { cropsTaxonomy, certificationTypes, regions, foodSafetyBadges } from '../data/cropsTaxonomy';
import { calculateMatchScore, assessGrowerRisk, predictShipping, suggestBestDeals } from '../utils/aiMatchmaking';
import GrowerProfileModal from '../components/GrowerProfileModal';
import DealRoomModal from '../components/DealRoomModal';

export default function USDAGrowerSearchEngine() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    commodity: '',
    region: '',
    certification: '',
    organic: null,
    type: '',
    minRiskScore: 0,
    minRating: 0
  });
  const [selectedGrower, setSelectedGrower] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [sortBy, setSortBy] = useState('relevance');
  const [showDealRoom, setShowDealRoom] = useState(false);
  const [buyerRequirements, setBuyerRequirements] = useState(null);
  const [showQRScanner, setShowQRScanner] = useState(false);

  // Get filter options from database
  const filterOptions = useMemo(() => getFilterOptions(), []);
  
  // Calculate unique commodities count
  const totalCommodities = useMemo(() => filterOptions.commodities.length, [filterOptions]);
  
  // Search and filter growers
  const filteredGrowers = useMemo(() => {
    let results = searchGrowers(filters);
    
    if (searchTerm) {
      results = results.filter(g => 
        g.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.dba.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.commodities.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Sort results
    switch (sortBy) {
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      case 'riskScore':
        results.sort((a, b) => b.riskScore - a.riskScore);
        break;
      case 'deals':
        results.sort((a, b) => b.deals - a.deals);
        break;
      case 'name':
        results.sort((a, b) => a.companyName.localeCompare(b.companyName));
        break;
      default: // relevance
        break;
    }
    
    return results;
  }, [searchTerm, filters, sortBy]);

  // AI Matchmaking suggestions
  const aiSuggestions = useMemo(() => {
    if (!buyerRequirements) return null;
    return suggestBestDeals(filteredGrowers, buyerRequirements);
  }, [filteredGrowers, buyerRequirements]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      commodity: '',
      region: '',
      certification: '',
      organic: null,
      type: '',
      minRiskScore: 0,
      minRating: 0
    });
    setSearchTerm('');
  };

  const getRiskColor = (score) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 90) return 'text-blue-600';
    if (score >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskBadge = (score) => {
    if (score >= 95) return 'bg-green-100 text-green-800';
    if (score >= 90) return 'bg-blue-100 text-blue-800';
    if (score >= 85) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">🌾 USDA Grower Search Engine</h1>
              <p className="text-green-100">AI-Powered Produce Sourcing & Compliance Platform</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowQRScanner(true)}
                className="flex items-center gap-2 bg-white text-green-700 px-4 py-2 rounded-lg hover:bg-green-50 transition"
              >
                <QrCode size={20} />
                <span>Scan QR</span>
              </button>
              <button
                onClick={() => setShowQRScanner(true)}
                className="flex items-center gap-2 bg-white text-green-700 px-4 py-2 rounded-lg hover:bg-green-50 transition"
              >
                <Camera size={20} />
                <span>AR Scan</span>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by grower name, commodity, location..."
              className="w-full pl-12 pr-4 py-4 text-lg rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              <Filter size={18} />
              Filters
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur rounded-lg p-3">
              <div className="text-2xl font-bold">{growerDatabase.length}+</div>
              <div className="text-sm text-green-100">USDA Certified Growers</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-3">
              <div className="text-2xl font-bold">{totalCommodities}+</div>
              <div className="text-sm text-green-100">Products/Commodities</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-3">
              <div className="text-2xl font-bold">{filteredGrowers.length}</div>
              <div className="text-sm text-green-100">Search Results</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-3">
              <div className="text-2xl font-bold">98%</div>
              <div className="text-sm text-green-100">Match Success</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Commodity</label>
                <select
                  value={filters.commodity}
                  onChange={(e) => handleFilterChange('commodity', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">All Commodities</option>
                  {Object.values(cropsTaxonomy).flatMap(cat => 
                    cat.items.map(item => (
                      <option key={item.value} value={item.value}>{item.label}</option>
                    ))
                  )}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                <select
                  value={filters.region}
                  onChange={(e) => handleFilterChange('region', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">All Regions</option>
                  {regions.map(r => (
                    <option key={r.value} value={r.value}>{r.label} ({r.country})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Certification</label>
                <select
                  value={filters.certification}
                  onChange={(e) => handleFilterChange('certification', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">All Certifications</option>
                  {certificationTypes.map(c => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">All Types</option>
                  <option value="grower">Grower</option>
                  <option value="exporter">Exporter</option>
                  <option value="importer">Importer</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Organic</label>
                <select
                  value={filters.organic === null ? '' : filters.organic}
                  onChange={(e) => handleFilterChange('organic', e.target.value === '' ? null : e.target.value === 'true')}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Any</option>
                  <option value="true">Organic Only</option>
                  <option value="false">Conventional</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Risk Score</label>
                <select
                  value={filters.minRiskScore}
                  onChange={(e) => handleFilterChange('minRiskScore', Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="0">Any</option>
                  <option value="85">85+</option>
                  <option value="90">90+</option>
                  <option value="95">95+</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <button
                onClick={clearFilters}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Clear All Filters
              </button>
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="relevance">Relevance</option>
                  <option value="rating">Rating</option>
                  <option value="riskScore">Risk Score</option>
                  <option value="deals">Deal History</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Matchmaking Banner */}
      {aiSuggestions && (
        <div className="bg-blue-50 border-b border-blue-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TrendingUp className="text-blue-600" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-900">AI-Powered Recommendations</h3>
                  <p className="text-sm text-gray-600">
                    Found {aiSuggestions.recommendedDeals.length} excellent matches based on your requirements
                  </p>
                </div>
              </div>
              <button
                onClick={() => setBuyerRequirements(null)}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Results Grid/List */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {filteredGrowers.length} Growers Found
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 rounded ${viewMode === 'grid' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 rounded ${viewMode === 'list' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              List
            </button>
          </div>
        </div>

        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {filteredGrowers.map(grower => (
            <GrowerCard
              key={grower.id}
              grower={grower}
              viewMode={viewMode}
              onViewProfile={() => setSelectedGrower(grower)}
              onInitiateDeal={() => {
                setSelectedGrower(grower);
                setShowDealRoom(true);
              }}
              getRiskColor={getRiskColor}
              getRiskBadge={getRiskBadge}
            />
          ))}
        </div>

        {filteredGrowers.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No growers found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms</p>
            <button
              onClick={clearFilters}
              className="mt-4 text-green-600 hover:text-green-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Grower Profile Modal */}
      {selectedGrower && !showDealRoom && (
        <GrowerProfileModal
          grower={selectedGrower}
          onClose={() => setSelectedGrower(null)}
          onInitiateDeal={() => setShowDealRoom(true)}
        />
      )}

      {/* Deal Room Modal */}
      {showDealRoom && selectedGrower && (
        <DealRoomModal
          grower={selectedGrower}
          onClose={() => {
            setShowDealRoom(false);
            setSelectedGrower(null);
          }}
        />
      )}

      {/* QR/AR Scanner Modal */}
      {showQRScanner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">QR/AR Scanner</h3>
            <div className="bg-gray-100 rounded-lg p-8 text-center mb-4">
              <QrCode className="mx-auto text-gray-400 mb-2" size={64} />
              <p className="text-gray-600">Scan QR code or use AR to instantly lookup grower profiles</p>
            </div>
            <button
              onClick={() => setShowQRScanner(false)}
              className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Grower Card Component
function GrowerCard({ grower, viewMode, onViewProfile, onInitiateDeal, getRiskColor, getRiskBadge }) {
  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg transition">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-bold text-gray-900">{grower.companyName}</h3>
              {grower.organic && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">🌿 Organic</span>}
              <span className={`text-xs px-2 py-1 rounded ${getRiskBadge(grower.riskScore)}`}>
                Risk: {grower.riskScore}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
              <span className="flex items-center gap-1">
                <MapPin size={14} />
                {grower.location.city}, {grower.location.region}
              </span>
              <span className="flex items-center gap-1">
                <Star size={14} className="text-yellow-500" />
                {grower.rating} ({grower.reviewCount} reviews)
              </span>
              <span>{grower.deals} deals</span>
            </div>
            <div className="flex flex-wrap gap-1 mb-2">
              {grower.commodities.slice(0, 3).map((c, i) => (
                <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">{c}</span>
              ))}
              {grower.commodities.length > 3 && (
                <span className="text-xs text-gray-500">+{grower.commodities.length - 3} more</span>
              )}
            </div>
            <div className="flex flex-wrap gap-1">
              {grower.certifications.slice(0, 4).map((cert, i) => {
                const certInfo = certificationTypes.find(c => c.value === cert);
                return (
                  <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                    {certInfo?.icon} {certInfo?.label || cert}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-2 ml-4">
            <button
              onClick={onViewProfile}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm whitespace-nowrap"
            >
              View Profile
            </button>
            <button
              onClick={onInitiateDeal}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm whitespace-nowrap"
            >
              Initiate Deal
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 hover:shadow-xl transition overflow-hidden">
      <div className="bg-gradient-to-r from-green-500 to-green-600 px-4 py-3">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-bold truncate">{grower.companyName}</h3>
          {grower.organic && <span className="text-xs bg-white text-green-700 px-2 py-1 rounded">🌿</span>}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="flex items-center gap-1 text-sm text-gray-600">
            <MapPin size={14} />
            {grower.location.city}, {grower.location.country}
          </span>
          <span className={`text-xs px-2 py-1 rounded ${getRiskBadge(grower.riskScore)}`}>
            {grower.riskScore}
          </span>
        </div>

        <div className="flex items-center gap-1 mb-3">
          <Star className="text-yellow-500" size={16} />
          <span className="font-semibold">{grower.rating}</span>
          <span className="text-sm text-gray-500">({grower.reviewCount})</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {grower.commodities.slice(0, 2).map((c, i) => (
            <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">{c}</span>
          ))}
          {grower.commodities.length > 2 && (
            <span className="text-xs text-gray-500">+{grower.commodities.length - 2}</span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-gray-600">
          <div>
            <div className="font-medium">Deals</div>
            <div>{grower.deals}</div>
          </div>
          <div>
            <div className="font-medium">On-Time</div>
            <div>{grower.onTimeDelivery}%</div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onViewProfile}
            className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition text-sm font-medium"
          >
            View Profile
          </button>
          <button
            onClick={onInitiateDeal}
            className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <MessageCircle size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
