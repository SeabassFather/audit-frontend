import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MortgageSearchPage() {
  const navigate = useNavigate();
  const [searchForm, setSearchForm] = useState({
    lenderType: "US", // US or Mexico
    lenderName: "",
    propertyType: "leasehold", // leasehold or freehold
    loanAmount: "",
    region: ""
  });
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLender, setSelectedLender] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock lender data for demonstration
  const mockLenders = {
    US: [
      { id: 1, name: "Wells Fargo", region: "National", complianceRules: ["TRID", "ECOA", "HMDA"], rating: "A" },
      { id: 2, name: "Chase Mortgage", region: "National", complianceRules: ["TRID", "ECOA", "HMDA"], rating: "A-" },
      { id: 3, name: "Bank of America", region: "National", complianceRules: ["TRID", "ECOA", "HMDA"], rating: "B+" },
      { id: 4, name: "Quicken Loans", region: "National", complianceRules: ["TRID", "ECOA", "HMDA"], rating: "A" }
    ],
    Mexico: [
      { id: 5, name: "BBVA México", region: "Mexico City", complianceRules: ["CNBV", "Local Regulations"], rating: "A" },
      { id: 6, name: "Santander México", region: "Guadalajara", complianceRules: ["CNBV", "Local Regulations"], rating: "A-" },
      { id: 7, name: "Banamex", region: "Monterrey", complianceRules: ["CNBV", "Local Regulations"], rating: "B+" }
    ]
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const results = mockLenders[searchForm.lenderType].filter(lender => 
        searchForm.lenderName === "" || 
        lender.name.toLowerCase().includes(searchForm.lenderName.toLowerCase())
      );
      setSearchResults(results);
      setLoading(false);
    }, 1000);
  };

  const selectLender = (lender) => {
    setSelectedLender(lender);
    // Store lender selection in localStorage for use in compliance step
    localStorage.setItem('selectedLender', JSON.stringify(lender));
  };

  const proceedToCompliance = () => {
    if (selectedLender) {
      navigate('/compliance');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Mortgage Lender Search & Discovery
          </h1>
          <p className="text-gray-600">
            Step 1: Find lenders for US or Mexico leasehold properties and view their compliance requirements
          </p>
        </div>

        {/* Navigation breadcrumb */}
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <div className="flex items-center">
                  <span className="bg-blue-600 text-white px-3 py-1 text-sm font-medium rounded-full">1</span>
                  <span className="ml-2 text-sm font-medium text-blue-600">Lender Search</span>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="text-gray-400">→</span>
                  <span className="bg-gray-300 text-gray-500 px-3 py-1 text-sm font-medium rounded-full ml-4">2</span>
                  <span className="ml-2 text-sm font-medium text-gray-500">Compliance Rules</span>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="text-gray-400">→</span>
                  <span className="bg-gray-300 text-gray-500 px-3 py-1 text-sm font-medium rounded-full ml-4">3</span>
                  <span className="ml-2 text-sm font-medium text-gray-500">Contract Upload</span>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="text-gray-400">→</span>
                  <span className="bg-gray-300 text-gray-500 px-3 py-1 text-sm font-medium rounded-full ml-4">4</span>
                  <span className="ml-2 text-sm font-medium text-gray-500">Audit Report</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Search Criteria</h2>
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lender Region</label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchForm.lenderType}
                onChange={(e) => setSearchForm(prev => ({ ...prev, lenderType: e.target.value }))}
              >
                <option value="US">United States</option>
                <option value="Mexico">Mexico</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchForm.propertyType}
                onChange={(e) => setSearchForm(prev => ({ ...prev, propertyType: e.target.value }))}
              >
                <option value="leasehold">Leasehold</option>
                <option value="freehold">Freehold</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lender Name (Optional)</label>
              <input
                type="text"
                placeholder="Search by name..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchForm.lenderName}
                onChange={(e) => setSearchForm(prev => ({ ...prev, lenderName: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Loan Amount</label>
              <input
                type="number"
                placeholder="e.g., 250000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchForm.loanAmount}
                onChange={(e) => setSearchForm(prev => ({ ...prev, loanAmount: e.target.value }))}
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? "Searching..." : "Search Lenders"}
              </button>
            </div>
          </form>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Available Lenders</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map(lender => (
                <div 
                  key={lender.id}
                  className={`border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer ${
                    selectedLender?.id === lender.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                  onClick={() => selectLender(lender)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{lender.name}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      lender.rating.startsWith('A') ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {lender.rating}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{lender.region}</p>
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">Compliance Requirements:</p>
                    <div className="flex flex-wrap gap-1">
                      {lender.complianceRules.map(rule => (
                        <span key={rule} className="bg-gray-100 text-gray-700 px-2 py-1 text-xs rounded">
                          {rule}
                        </span>
                      ))}
                    </div>
                  </div>
                  {selectedLender?.id === lender.id && (
                    <div className="text-blue-600 text-sm font-medium">✓ Selected</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Selected Lender Summary & Next Steps */}
        {selectedLender && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Selected Lender Summary</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-lg text-blue-900">{selectedLender.name}</h3>
                  <p className="text-blue-700">Region: {selectedLender.region}</p>
                  <p className="text-blue-700">Rating: {selectedLender.rating}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-blue-900 mb-1">Required Compliance:</p>
                  <div className="flex flex-wrap gap-1 justify-end">
                    {selectedLender.complianceRules.map(rule => (
                      <span key={rule} className="bg-blue-100 text-blue-800 px-2 py-1 text-xs rounded">
                        {rule}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <p className="text-gray-600">
                Next: Review compliance rules and requirements for {selectedLender.name}
              </p>
              <button
                onClick={proceedToCompliance}
                className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Proceed to Compliance Review →
              </button>
            </div>
          </div>
        )}

        {/* Quick Links */}
        <div className="mt-8 text-center">
          <div className="space-x-4">
            <button
              onClick={() => navigate('/elite-modules')}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              ← Back to Modules
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              View Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
