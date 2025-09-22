import React, { useState, useCallback } from "react";

/**
 * Title Search Component
 * 
 * Property and title records search interface with integration stubs for
 * Zadarama, US, and Mexico property databases. Provides comprehensive
 * search capabilities and result display for compliance and audit purposes.
 * 
 * Features:
 * - Multi-source property search (US, Mexico, Zadarama)
 * - Advanced search filters
 * - Real-time search suggestions
 * - Property details and compliance status
 * - Export search results
 * - Search history tracking
 * 
 * @component
 */
export default function TitleSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("address");
  const [selectedRegion, setSelectedRegion] = useState("us");
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [filters, setFilters] = useState({
    propertyType: "",
    dateRange: "",
    complianceStatus: "",
    priceRange: ""
  });

  // Search types available
  const searchTypes = [
    { value: "address", label: "Property Address", icon: "📍" },
    { value: "parcel", label: "Parcel Number", icon: "#️⃣" },
    { value: "owner", label: "Owner Name", icon: "👤" },
    { value: "legal", label: "Legal Description", icon: "📋" }
  ];

  // Regions with data source integration
  const regions = [
    { 
      value: "us", 
      label: "United States", 
      icon: "🇺🇸",
      description: "US Title Records API",
      status: "online"
    },
    { 
      value: "mexico", 
      label: "Mexico", 
      icon: "🇲🇽",
      description: "Mexico Records API",
      status: "degraded"
    },
    { 
      value: "zadarama", 
      label: "Zadarama Network", 
      icon: "🌐",
      description: "Zadarama Global API",
      status: "online"
    }
  ];

  // Mock search results data
  const mockResults = [
    {
      id: "prop-001",
      address: "123 Main Street, Los Angeles, CA 90210",
      parcelId: "5555-123-456",
      owner: "John Smith",
      propertyType: "Residential",
      lastSale: "$850,000 (2023-05-15)",
      complianceStatus: "Compliant",
      titleIssues: [],
      region: "us",
      coordinates: { lat: 34.0522, lng: -118.2437 }
    },
    {
      id: "prop-002", 
      address: "456 Oak Avenue, Beverly Hills, CA 90210",
      parcelId: "5555-789-012",
      owner: "Jane Corporation LLC",
      propertyType: "Commercial",
      lastSale: "$2,400,000 (2023-03-22)",
      complianceStatus: "Under Review",
      titleIssues: ["Pending lien verification"],
      region: "us",
      coordinates: { lat: 34.0736, lng: -118.4004 }
    },
    {
      id: "prop-003",
      address: "Calle Revolución 789, Tijuana, Baja California",
      parcelId: "MX-TJ-2023-445",
      owner: "María González",
      propertyType: "Residential",
      lastSale: "$145,000 USD (2023-07-08)",
      complianceStatus: "Compliant",
      titleIssues: [],
      region: "mexico",
      coordinates: { lat: 32.5149, lng: -117.0382 }
    }
  ];

  // Perform search
  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) return;

    setSearching(true);
    
    // Add to search history
    const historyEntry = {
      id: Date.now(),
      query: searchQuery,
      type: searchType,
      region: selectedRegion,
      timestamp: new Date().toISOString(),
      resultsCount: 0
    };

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Filter mock results based on search criteria
      const filteredResults = mockResults.filter(result => {
        const matchesRegion = result.region === selectedRegion;
        const matchesQuery = result.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           result.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           result.parcelId.toLowerCase().includes(searchQuery.toLowerCase());
        
        return matchesRegion && matchesQuery;
      });

      setResults(filteredResults);
      
      // Update search history with results count
      historyEntry.resultsCount = filteredResults.length;
      setSearchHistory(prev => [historyEntry, ...prev.slice(0, 9)]); // Keep last 10 searches
      
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setSearching(false);
    }
  }, [searchQuery, searchType, selectedRegion]);

  // Clear search results
  const clearResults = () => {
    setResults([]);
    setSearchQuery("");
  };

  // Export results
  const exportResults = () => {
    const csvContent = [
      ["Address", "Parcel ID", "Owner", "Property Type", "Last Sale", "Compliance Status", "Issues"],
      ...results.map(r => [
        r.address,
        r.parcelId,
        r.owner,
        r.propertyType,
        r.lastSale,
        r.complianceStatus,
        r.titleIssues.join("; ")
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `title-search-results-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Get status badge for compliance
  const getComplianceStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "compliant":
        return "status-badge status-ready";
      case "under review":
        return "status-badge status-progress";
      case "non-compliant":
        return "status-badge bg-red-100 text-red-800";
      default:
        return "status-badge status-planned";
    }
  };

  // Get region status badge
  const getRegionStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "online":
        return "status-badge status-ready";
      case "degraded":
        return "status-badge status-progress";
      case "offline":
        return "status-badge bg-red-100 text-red-800";
      default:
        return "status-badge status-planned";
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Interface */}
      <div className="compliance-card">
        <h3 className="text-lg font-semibold text-slate-800 mb-6">Property & Title Search</h3>
        
        {/* Region Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {regions.map((region) => (
            <div
              key={region.value}
              onClick={() => setSelectedRegion(region.value)}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedRegion === region.value 
                  ? 'border-compliance-500 bg-compliance-50' 
                  : 'border-slate-200 hover:border-compliance-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{region.icon}</span>
                  <span className="font-medium">{region.label}</span>
                </div>
                <span className={getRegionStatusBadge(region.status)}>
                  {region.status}
                </span>
              </div>
              <p className="text-sm text-slate-600">{region.description}</p>
            </div>
          ))}
        </div>

        {/* Search Form */}
        <div className="space-y-4">
          <div className="flex gap-4">
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-compliance-500 focus:border-compliance-500"
            >
              {searchTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.icon} {type.label}
                </option>
              ))}
            </select>
            
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder={`Enter ${searchTypes.find(t => t.value === searchType)?.label.toLowerCase()}...`}
              className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-compliance-500 focus:border-compliance-500"
            />
            
            <button
              onClick={handleSearch}
              disabled={searching || !searchQuery.trim()}
              className="btn-primary px-6"
            >
              {searching ? "Searching..." : "Search"}
            </button>
          </div>

          {/* Advanced Filters */}
          <details className="mt-4">
            <summary className="text-sm font-medium text-slate-700 cursor-pointer hover:text-compliance-600">
              Advanced Filters
            </summary>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 p-4 bg-slate-50 rounded-lg">
              <select
                value={filters.propertyType}
                onChange={(e) => setFilters(prev => ({ ...prev, propertyType: e.target.value }))}
                className="px-3 py-2 border border-slate-300 rounded text-sm"
              >
                <option value="">All Property Types</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="industrial">Industrial</option>
                <option value="land">Land</option>
              </select>
              
              <select
                value={filters.complianceStatus}
                onChange={(e) => setFilters(prev => ({ ...prev, complianceStatus: e.target.value }))}
                className="px-3 py-2 border border-slate-300 rounded text-sm"
              >
                <option value="">All Compliance Status</option>
                <option value="compliant">Compliant</option>
                <option value="under-review">Under Review</option>
                <option value="non-compliant">Non-Compliant</option>
              </select>
              
              <input
                type="text"
                value={filters.priceRange}
                onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
                placeholder="Price range"
                className="px-3 py-2 border border-slate-300 rounded text-sm"
              />
              
              <input
                type="date"
                value={filters.dateRange}
                onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                className="px-3 py-2 border border-slate-300 rounded text-sm"
              />
            </div>
          </details>
        </div>
      </div>

      {/* Search Results */}
      {results.length > 0 && (
        <div className="compliance-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-800">
              Search Results ({results.length})
            </h3>
            <div className="flex gap-2">
              <button
                onClick={exportResults}
                className="btn-secondary text-sm px-3 py-2"
              >
                📊 Export CSV
              </button>
              <button
                onClick={clearResults}
                className="btn-secondary text-sm px-3 py-2"
              >
                Clear Results
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {results.map((property) => (
              <div key={property.id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-800 mb-1">
                      {property.address}
                    </h4>
                    <p className="text-sm text-slate-600">
                      Parcel ID: {property.parcelId} • Owner: {property.owner}
                    </p>
                  </div>
                  <span className={getComplianceStatusBadge(property.complianceStatus)}>
                    {property.complianceStatus}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-slate-700">Property Type:</span>
                    <p className="text-slate-600">{property.propertyType}</p>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">Last Sale:</span>
                    <p className="text-slate-600">{property.lastSale}</p>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">Region:</span>
                    <p className="text-slate-600 flex items-center gap-1">
                      {regions.find(r => r.value === property.region)?.icon}
                      {regions.find(r => r.value === property.region)?.label}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">Coordinates:</span>
                    <p className="text-slate-600 font-mono text-xs">
                      {property.coordinates.lat.toFixed(4)}, {property.coordinates.lng.toFixed(4)}
                    </p>
                  </div>
                </div>

                {property.titleIssues.length > 0 && (
                  <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <h5 className="font-medium text-yellow-800 mb-1">Title Issues:</h5>
                    <ul className="text-sm text-yellow-700">
                      {property.titleIssues.map((issue, index) => (
                        <li key={index} className="flex items-center gap-1">
                          <span>⚠️</span>
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-3 flex gap-2">
                  <button className="btn-primary text-sm px-3 py-1">
                    View Details
                  </button>
                  <button className="btn-secondary text-sm px-3 py-1">
                    Download Report
                  </button>
                  <button className="btn-secondary text-sm px-3 py-1">
                    Add to Audit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search History */}
      {searchHistory.length > 0 && (
        <div className="compliance-card">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Searches</h3>
          <div className="space-y-2">
            {searchHistory.slice(0, 5).map((search) => (
              <div
                key={search.id}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">
                    {searchTypes.find(t => t.value === search.type)?.icon}
                  </span>
                  <div>
                    <p className="font-medium text-slate-800">{search.query}</p>
                    <p className="text-sm text-slate-600">
                      {regions.find(r => r.value === search.region)?.label} • 
                      {search.resultsCount} results • 
                      {new Date(search.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSearchQuery(search.query);
                    setSearchType(search.type);
                    setSelectedRegion(search.region);
                  }}
                  className="text-sm text-compliance-600 hover:text-compliance-800"
                >
                  Repeat Search
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {searching === false && results.length === 0 && searchQuery && (
        <div className="compliance-card text-center py-8">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">No Results Found</h3>
          <p className="text-slate-600 mb-4">
            Try adjusting your search query or check a different region.
          </p>
          <button
            onClick={() => setSearchQuery("")}
            className="btn-secondary"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
}