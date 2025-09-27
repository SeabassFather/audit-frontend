import React, { useState } from "react";

// API service for mortgage search - TODO: Replace with real backend
async function searchMortgages(criteria) {
  try {
    const response = await fetch("/api/search/mortgages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(criteria)
    });
    
    if (!response.ok) throw new Error("Mortgage search API error");
    return await response.json();
  } catch (error) {
    console.log("Mortgage API not available, using mock data");
    // Mock data for demonstration
    return {
      results: [
        {
          id: 1,
          lender: "First National Bank",
          rate: "3.25%",
          apr: "3.45%",
          loan_amount: criteria.loanAmount || 250000,
          term: "30 years",
          type: criteria.loanType || "Conventional",
          fees: 2500,
          status: "Pre-approved"
        },
        {
          id: 2,
          lender: "Community Credit Union",
          rate: "3.15%",
          apr: "3.38%",
          loan_amount: criteria.loanAmount || 250000,
          term: "30 years",
          type: criteria.loanType || "Conventional",
          fees: 1800,
          status: "Available"
        },
        {
          id: 3,
          lender: "Metro Mortgage Corp",
          rate: "3.35%",
          apr: "3.52%",
          loan_amount: criteria.loanAmount || 250000,
          term: "30 years",
          type: criteria.loanType || "Conventional",
          fees: 3200,
          status: "Available"
        }
      ],
      total_matches: 3
    };
  }
}

export default function MortgageSearch() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    loanAmount: "",
    loanType: "Conventional",
    propertyType: "Owner",
    purpose: "Purchase",
    timing: "",
    nmlsConsent: false,
    softPullConsent: false
  });
  
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const results = await searchMortgages(formData);
      setSearchResults(results);
    } catch (err) {
      setError("Failed to search mortgages. Please try again.");
    }
    
    setLoading(false);
  };

  const calculateLTV = () => {
    // Simple LTV calculation placeholder
    return formData.loanAmount ? "75%" : "0%";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-400 to-green-600" />
            <h1 className="text-2xl font-bold text-gray-900">Mortgage Search</h1>
          </div>
          <button 
            onClick={() => window.history.back()}
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition"
          >
            ← Back to Dashboard
          </button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-600 mb-8">
            Submit your loan criteria to find the best mortgage options from our network of lenders.
          </p>

          {/* Search Form */}
          <div className="bg-white rounded-xl shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Loan Application</h2>
            <p className="text-sm text-gray-500 mb-6">POST /api/search/mortgages</p>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Personal Information</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="nmlsConsent"
                        checked={formData.nmlsConsent}
                        onChange={handleInputChange}
                        className="mr-2"
                        required
                      />
                      <span className="text-sm">NMLS Consent Required</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="softPullConsent"
                        checked={formData.softPullConsent}
                        onChange={handleInputChange}
                        className="mr-2"
                        required
                      />
                      <span className="text-sm">Soft Credit Pull Consent</span>
                    </label>
                  </div>
                </div>

                {/* Loan Information */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Loan Details</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Property Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Loan Amount ($)</label>
                    <input
                      type="number"
                      name="loanAmount"
                      value={formData.loanAmount}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Loan Type</label>
                    <select
                      name="loanType"
                      value={formData.loanType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="Conventional">Conventional</option>
                      <option value="FHA">FHA</option>
                      <option value="VA">VA</option>
                      <option value="USDA">USDA</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                    <div className="space-y-2">
                      {["Owner", "Second", "Investment"].map(type => (
                        <label key={type} className="flex items-center">
                          <input
                            type="radio"
                            name="propertyType"
                            value={type}
                            checked={formData.propertyType === type}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          <span className="text-sm">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Computed LTV: {calculateLTV()}</label>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Additional Details</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Closing Timeline</label>
                    <input
                      type="date"
                      name="timing"
                      value={formData.timing}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
                    <div className="space-y-2">
                      {["Purchase", "Refinance"].map(purpose => (
                        <label key={purpose} className="flex items-center">
                          <input
                            type="radio"
                            name="purpose"
                            value={purpose}
                            checked={formData.purpose === purpose}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          <span className="text-sm">{purpose}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {error && (
                <div className="mt-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <div className="mt-8 text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 transition"
                >
                  {loading ? "Searching..." : "Search & Match Lenders"}
                </button>
              </div>
            </form>
          </div>

          {/* Search Results */}
          {searchResults && (
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold mb-4">
                Search Results ({searchResults.total_matches} matches found)
              </h2>
              <div className="space-y-4">
                {searchResults.results.map((result) => (
                  <div key={result.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{result.lender}</h3>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          result.status === 'Pre-approved' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {result.status}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">{result.rate}</div>
                        <div className="text-sm text-gray-500">APR: {result.apr}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Loan Amount:</span>
                        <div className="font-medium">${result.loan_amount.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Term:</span>
                        <div className="font-medium">{result.term}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Type:</span>
                        <div className="font-medium">{result.type}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Est. Fees:</span>
                        <div className="font-medium">${result.fees.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition">
                        Apply Now
                      </button>
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200 transition">
                        Get Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
