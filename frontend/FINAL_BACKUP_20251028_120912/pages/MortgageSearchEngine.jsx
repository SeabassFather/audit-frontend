import React, { useState } from 'react';
import { Search, Home, AlertCircle, Calculator } from 'lucide-react';

export default function MortgageSearchEngine() {
  const [loanPurpose, setLoanPurpose] = useState('purchase');
  const [propertyType, setPropertyType] = useState('single');
  const [loanAmount, setLoanAmount] = useState('');
  const [creditScore, setCreditScore] = useState('740');
  const [results, setResults] = useState([]);

  const lenders = [
    { name: 'Lender A', baseRate: 6.875, term: '30-Year Fixed' },
    { name: 'Lender B', baseRate: 6.750, term: '30-Year Fixed' },
    { name: 'Lender C', baseRate: 6.625, term: '15-Year Fixed' },
    { name: 'Lender D', baseRate: 6.990, term: '30-Year Fixed' },
    { name: 'Lender E', baseRate: 6.500, term: '15-Year Fixed' },
    { name: 'Lender F', baseRate: 7.125, term: '30-Year Fixed ARM' }
  ];

  const calculateRates = () => {
    const amount = parseFloat(loanAmount);
    if (!amount || amount < 50000) {
      alert('Please enter a valid loan amount (minimum $50,000)');
      return;
    }

    const creditAdjustment = creditScore < 700 ? 0.25 : creditScore < 740 ? 0.125 : 0;
    const ltvAdjustment = loanPurpose === 'cashout' ? 0.375 : 0;

    const calculatedResults = lenders.map((lender, idx) => ({
      id: idx + 1,
      displayName: `Lender ${idx + 1}`,
      estimatedRate: (lender.baseRate + creditAdjustment + ltvAdjustment).toFixed(3),
      term: lender.term,
      monthlyPayment: calculatePayment(amount, lender.baseRate + creditAdjustment + ltvAdjustment, 30)
    }));

    setResults(calculatedResults.sort((a, b) => parseFloat(a.estimatedRate) - parseFloat(b.estimatedRate)));
  };

  const calculatePayment = (principal, annualRate, years) => {
    const monthlyRate = annualRate / 100 / 12;
    const numPayments = years * 12;
    const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    return payment.toFixed(2);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 rounded-lg shadow-2xl p-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <Home className="w-12 h-12" />
          <div>
            <h1 className="text-4xl font-bold">US Mortgage Loan Search Engine</h1>
            <p className="text-xl">Find Your Best Rate - Licensed Professional Service</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Loan Search Criteria</h2>
        
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block font-bold mb-2">Loan Purpose</label>
            <select 
              value={loanPurpose}
              onChange={(e) => setLoanPurpose(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg"
            >
              <option value="purchase">Purchase</option>
              <option value="refinance">Rate & Term Refinance</option>
              <option value="cashout">Cash-Out Refinance</option>
            </select>
          </div>

          <div>
            <label className="block font-bold mb-2">Property Type</label>
            <select 
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg"
            >
              <option value="single">Single Family</option>
              <option value="condo">Condominium</option>
              <option value="multi">Multi-Family (2-4 units)</option>
              <option value="townhome">Townhome</option>
            </select>
          </div>

          <div>
            <label className="block font-bold mb-2">Loan Amount</label>
            <input 
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg"
            />
          </div>

          <div>
            <label className="block font-bold mb-2">Estimated Credit Score</label>
            <select 
              value={creditScore}
              onChange={(e) => setCreditScore(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg"
            >
              <option value="800">Excellent (740+)</option>
              <option value="720">Good (700-739)</option>
              <option value="680">Fair (660-699)</option>
              <option value="640">Below Average (620-659)</option>
            </select>
          </div>
        </div>

        <button 
          onClick={calculateRates}
          className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white py-4 rounded-lg font-bold text-xl flex items-center justify-center gap-3 shadow-lg"
        >
          <Search className="w-6 h-6" />
          Search Available Rates
        </button>
      </div>

      {results.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="w-6 h-6 text-blue-600" />
            <p className="text-lg font-semibold text-gray-700">
              Estimated rates shown below are approximate. Final rates depend on full loan submission, property appraisal, credit verification, and underwriting approval.
            </p>
          </div>

          <h3 className="text-2xl font-bold mb-4">Available Loan Options</h3>
          
          <div className="space-y-4">
            {results.map(result => (
              <div key={result.id} className="border-2 border-gray-200 rounded-lg p-6 hover:border-green-400 transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xl font-bold text-gray-800">{result.displayName}</h4>
                    <p className="text-sm text-gray-600 mt-1">{result.term}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Estimated Rate*</p>
                    <p className="text-3xl font-bold text-green-600">{result.estimatedRate}%</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-semibold">Estimated Monthly Payment:</span>
                    <span className="text-2xl font-bold text-gray-800">${result.monthlyPayment}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">*Principal & Interest only. Does not include taxes, insurance, or HOA.</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6">
            <p className="text-sm text-gray-700 font-semibold mb-2">IMPORTANT DISCLOSURE:</p>
            <p className="text-sm text-gray-600">
              Rates displayed are estimates only and subject to change without notice. Actual rates, terms, and conditions require a complete loan application, credit report, income verification, property appraisal, and underwriting approval. Contact us for a personalized rate quote and full loan details.
            </p>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-lg p-8 border-2 border-gray-300">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Licensed Mortgage Professional</h3>
          <div className="h-1 w-24 bg-green-600 mx-auto rounded"></div>
        </div>

        <div className="space-y-3 text-center">
          <p className="text-xl font-bold text-gray-800">Saul Garcia</p>
          <p className="text-lg font-semibold text-gray-700">NMLS License #337526</p>
          <p className="text-lg font-bold text-green-700">Everwise Home Loans & Realty</p>
          <p className="text-base font-semibold text-gray-700">Company NMLS #1739012 | DRE #02067255</p>
          <p className="text-sm text-gray-600">15615 Alton Pkwy, Suite 450, Irvine, CA 92618</p>
        </div>

        <div className="mt-6 pt-6 border-t-2 border-gray-300 space-y-3 text-sm text-gray-600">
          <p className="font-semibold">CALIFORNIA BUREAU OF REAL ESTATE DISCLOSURE:</p>
          <p>
            This is not a commitment to lend. All loan applications are subject to credit approval, income verification, property appraisal, and underwriting guidelines. Rates, terms, and conditions are subject to change without notice. Licensed by the California Bureau of Real Estate.
          </p>
          <p className="font-semibold mt-4">EQUAL HOUSING OPPORTUNITY:</p>
          <p>
            We do business in accordance with the Federal Fair Housing Law and the Equal Credit Opportunity Act. We are committed to providing equal service to all qualified borrowers regardless of race, color, religion, national origin, sex, handicap, or familial status.
          </p>
          <p className="font-semibold mt-4">LICENSING INFORMATION:</p>
          <p>
            Nationwide Mortgage Licensing System (NMLS) Consumer Access: <a href="http://www.nmlsconsumeraccess.org" className="text-blue-600 underline">www.nmlsconsumeraccess.org</a>
          </p>
          <p className="text-xs text-gray-500 mt-4 text-center">
            Ã‚Â© {new Date().getFullYear()} Everwise Home Loans & Realty. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
