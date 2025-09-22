import React, { useState, useEffect, useMemo } from 'react';
import { mortgageSearchAPI } from '../../utils/searchAPIs.js';

const loanTypes = [
  { value: 'conventional', label: 'Conventional', description: 'Standard loan for qualified borrowers' },
  { value: 'fha', label: 'FHA', description: 'Government-backed, lower down payment' },
  { value: 'va', label: 'VA', description: 'Veterans Affairs loans' },
  { value: 'usda', label: 'USDA', description: 'Rural development loans' },
  { value: 'jumbo', label: 'Jumbo', description: 'High-value properties' },
  { value: 'heloc', label: 'HELOC', description: 'Home equity line of credit' },
  { value: 'refinance', label: 'Refinance', description: 'Replace existing mortgage' },
  { value: 'cash-out', label: 'Cash-Out Refi', description: 'Refinance with cash out' }
];

const creditRanges = [
  { value: '750+', label: 'Excellent (750+)', min: 750 },
  { value: '700-749', label: 'Good (700-749)', min: 700 },
  { value: '650-699', label: 'Fair (650-699)', min: 650 },
  { value: '600-649', label: 'Poor (600-649)', min: 600 },
  { value: '<600', label: 'Bad (<600)', min: 0 }
];

const incomeRanges = [
  { value: '100k+', label: '$100k+', min: 100000 },
  { value: '75k-100k', label: '$75k-$100k', min: 75000 },
  { value: '50k-75k', label: '$50k-$75k', min: 50000 },
  { value: '35k-50k', label: '$35k-$50k', min: 35000 },
  { value: '<35k', label: 'Under $35k', min: 0 }
];

const regions = [
  'California', 'Texas', 'Florida', 'New York', 'Illinois', 
  'Pennsylvania', 'Ohio', 'Georgia', 'North Carolina', 'Michigan',
  'Cross-Border (Mexico)', 'International'
];

export default function MortgageSearchEngine() {
  const [searchParams, setSearchParams] = useState({
    loanType: 'conventional',
    creditScore: '700-749',
    income: '75k-100k',
    region: 'California',
    loanAmount: 500000,
    downPayment: 20,
    propertyType: 'primary',
    employment: 'W2'
  });

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLender, setSelectedLender] = useState(null);
  const [dealTracker, setDealTracker] = useState([]);

  // Search for lenders
  const searchLenders = async () => {
    setLoading(true);
    try {
      const results = await mortgageSearchAPI(searchParams);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching lenders:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate loan metrics
  const loanMetrics = useMemo(() => {
    const loanAmount = searchParams.loanAmount;
    const downPaymentAmount = (loanAmount * searchParams.downPayment) / 100;
    const loanAmountAfterDown = loanAmount - downPaymentAmount;
    
    return {
      loanAmount,
      downPaymentAmount,
      loanAmountAfterDown,
      estimatedPayment: (loanAmountAfterDown * 0.005).toFixed(0), // Rough estimate
      dti: ((loanAmountAfterDown * 0.005 * 12) / searchParams.income * 100).toFixed(1)
    };
  }, [searchParams]);

  useEffect(() => {
    searchLenders();
  }, [searchParams]);

  const addToDealTracker = (lender) => {
    const deal = {
      id: Date.now(),
      lender: lender.lender,
      rate: lender.rate,
      product: lender.product,
      status: 'Interested',
      timestamp: new Date().toLocaleDateString(),
      ...searchParams
    };
    setDealTracker(prev => [...prev, deal]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mortgage & Loan Search Engine</h1>
          <p className="text-gray-600">Find the best lenders and rates for your mortgage needs</p>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-sm text-blue-600 font-medium">Estimated Payment</div>
          <div className="text-2xl font-bold text-blue-800">${loanMetrics.estimatedPayment}/mo</div>
          <div className="text-xs text-blue-600">DTI: {loanMetrics.dti}%</div>
        </div>
      </div>

      {/* Search Parameters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Loan Parameters</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Loan Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Loan Type</label>
            <select
              value={searchParams.loanType}
              onChange={(e) => setSearchParams(prev => ({...prev, loanType: e.target.value}))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              {loanTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          {/* Credit Score */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Credit Score</label>
            <select
              value={searchParams.creditScore}
              onChange={(e) => setSearchParams(prev => ({...prev, creditScore: e.target.value}))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              {creditRanges.map(range => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
          </div>

          {/* Income Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Annual Income</label>
            <select
              value={searchParams.income}
              onChange={(e) => setSearchParams(prev => ({...prev, income: e.target.value}))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              {incomeRanges.map(range => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
          </div>

          {/* Region */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
            <select
              value={searchParams.region}
              onChange={(e) => setSearchParams(prev => ({...prev, region: e.target.value}))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>

          {/* Loan Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount</label>
            <input
              type="number"
              value={searchParams.loanAmount}
              onChange={(e) => setSearchParams(prev => ({...prev, loanAmount: Number(e.target.value)}))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              step="10000"
            />
          </div>

          {/* Down Payment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Down Payment %</label>
            <input
              type="number"
              value={searchParams.downPayment}
              onChange={(e) => setSearchParams(prev => ({...prev, downPayment: Number(e.target.value)}))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              min="0"
              max="50"
            />
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
            <select
              value={searchParams.propertyType}
              onChange={(e) => setSearchParams(prev => ({...prev, propertyType: e.target.value}))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="primary">Primary Residence</option>
              <option value="investment">Investment Property</option>
              <option value="vacation">Vacation Home</option>
            </select>
          </div>

          {/* Employment Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Employment</label>
            <select
              value={searchParams.employment}
              onChange={(e) => setSearchParams(prev => ({...prev, employment: e.target.value}))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="W2">W2 Employee</option>
              <option value="self-employed">Self-Employed</option>
              <option value="contractor">1099 Contractor</option>
              <option value="business-owner">Business Owner</option>
            </select>
          </div>
        </div>
      </div>

      {/* Loan Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-600">Total Loan Amount</div>
          <div className="text-xl font-bold text-gray-900">${loanMetrics.loanAmount.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-600">Down Payment</div>
          <div className="text-xl font-bold text-gray-900">${loanMetrics.downPaymentAmount.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-600">Financed Amount</div>
          <div className="text-xl font-bold text-gray-900">${loanMetrics.loanAmountAfterDown.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-600">Est. DTI Ratio</div>
          <div className="text-xl font-bold text-gray-900">{loanMetrics.dti}%</div>
        </div>
      </div>

      {/* Search Results */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Lender Matches</h2>
          {loading && <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>}
        </div>

        {searchResults.length > 0 ? (
          <div className="space-y-4">
            {searchResults.map((lender, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{lender.lender}</h3>
                    <div className="text-sm text-gray-600">{lender.product}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Fit: <span className={`font-medium ${
                        lender.fit === 'Strong' ? 'text-green-600' : 
                        lender.fit === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                      }`}>{lender.fit}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-900">{lender.rate}</div>
                    <div className="text-sm text-gray-600">Interest Rate</div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedLender(lender)}
                      className="btn btn-outline text-sm"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => addToDealTracker(lender)}
                      className="btn btn-primary text-sm"
                    >
                      Track Deal
                    </button>
                  </div>
                </div>
                {lender.reasons && (
                  <div className="mt-2 text-sm text-gray-600">
                    Reasons: {lender.reasons.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          !loading && (
            <div className="text-center py-8 text-gray-500">
              No lenders found matching your criteria. Try adjusting your search parameters.
            </div>
          )
        )}
      </div>

      {/* Deal Tracker */}
      {dealTracker.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Deal Tracker</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2">Lender</th>
                  <th className="text-left py-2">Rate</th>
                  <th className="text-left py-2">Product</th>
                  <th className="text-left py-2">Status</th>
                  <th className="text-left py-2">Date Added</th>
                  <th className="text-left py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {dealTracker.map((deal) => (
                  <tr key={deal.id} className="border-b border-gray-100">
                    <td className="py-2 font-medium">{deal.lender}</td>
                    <td className="py-2">{deal.rate}</td>
                    <td className="py-2">{deal.product}</td>
                    <td className="py-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs">
                        {deal.status}
                      </span>
                    </td>
                    <td className="py-2">{deal.timestamp}</td>
                    <td className="py-2">
                      <button className="text-blue-600 hover:text-blue-800 text-xs">
                        Update Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Cross-Border Special Section */}
      {searchParams.region === 'Cross-Border (Mexico)' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-4">🌎 Cross-Border Lending Specialist</h3>
          <p className="text-yellow-700 mb-4">
            You've selected cross-border lending for Mexico properties. This requires specialized documentation and lender relationships.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-yellow-800 mb-2">Required Documents:</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Valid passport and visa status</li>
                <li>• Proof of income (US/Mexico)</li>
                <li>• Mexican property documentation</li>
                <li>• Bank statements (both countries)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-yellow-800 mb-2">Specialist Lenders:</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Cross-border mortgage specialists</li>
                <li>• International banks</li>
                <li>• Developer financing programs</li>
                <li>• Private lenders</li>
              </ul>
            </div>
          </div>
          <button className="btn bg-yellow-600 text-white hover:bg-yellow-700 mt-4">
            Connect with Cross-Border Specialist
          </button>
        </div>
      )}
    </div>
  );
}