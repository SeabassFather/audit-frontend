import React, { useState } from 'react';
import { Search, Home, AlertCircle, TrendingUp, Award, FileText, CheckCircle } from 'lucide-react';

export default function MortgageTabUS() {
  const [loanType, setLoanType] = useState('conventional');
  const [loanPurpose, setLoanPurpose] = useState('purchase');
  const [propertyType, setPropertyType] = useState('single');
  const [loanAmount, setLoanAmount] = useState('');
  const [creditScore, setCreditScore] = useState('740');
  const [results, setResults] = useState([]);

  // REAL LENDER DATA from your rate sheet
  const lenders = [
    { id: 1, comp: 2.5, fee: 995, conv: 620, fha: 550, va: 550, usda: 620, jumbo: true, baseRate: 6.875 },
    { id: 2, comp: 2.0, fee: 995, conv: 620, fha: 600, va: 600, usda: 620, jumbo: true, baseRate: 6.750 },
    { id: 3, comp: 2.25, fee: 0, conv: 620, fha: 580, va: 580, usda: 580, jumbo: false, baseRate: 6.625 },
    { id: 4, comp: 1.5, fee: 915, conv: 620, fha: 600, va: 600, usda: 620, jumbo: true, baseRate: 6.500 },
    { id: 5, comp: 1.0, fee: 895, conv: 620, fha: 620, va: 620, usda: 0, jumbo: false, baseRate: 6.990 },
    { id: 6, comp: 2.0, fee: 965, conv: 620, fha: 580, va: 620, usda: 620, jumbo: false, baseRate: 7.125 },
    { id: 7, comp: 1.75, fee: 0, conv: 620, fha: 580, va: 580, usda: 580, jumbo: true, baseRate: 6.800 },
    { id: 8, comp: 1.625, fee: 1095, conv: 620, fha: 580, va: 580, usda: 580, jumbo: true, baseRate: 6.650 },
    { id: 9, comp: 2.5, fee: 1495, conv: 620, fha: 550, va: 580, usda: 600, jumbo: false, baseRate: 7.000 },
    { id: 10, comp: 2.25, fee: 999, conv: 620, fha: 550, va: 580, usda: 0, jumbo: true, baseRate: 6.725 }
  ];

  const matchLenders = () => {
    const amount = parseFloat(loanAmount);
    const fico = parseInt(creditScore);
    
    if (!amount || amount < 50000) {
      alert('Please enter a valid loan amount (minimum $50,000)');
      return;
    }

    const isJumbo = amount > 766550;
    
    const qualified = lenders.filter(lender => {
      if (isJumbo && !lender.jumbo) return false;
      
      let minFico = 0;
      switch(loanType) {
        case 'conventional': minFico = lender.conv; break;
        case 'fha': minFico = lender.fha; break;
        case 'va': minFico = lender.va; break;
        case 'usda': minFico = lender.usda; break;
        default: minFico = lender.conv;
      }
      
      if (minFico === 0) return false;
      return fico >= minFico;
    });

    const calculatedResults = qualified.map(lender => {
      const ficoAdjustment = fico < 700 ? 0.25 : fico < 740 ? 0.125 : 0;
      const ltvAdjustment = loanPurpose === 'cashout' ? 0.375 : 0;
      const jumboAdjustment = isJumbo ? 0.25 : 0;
      
      const finalRate = lender.baseRate + ficoAdjustment + ltvAdjustment + jumboAdjustment;
      const monthlyPayment = calculatePayment(amount, finalRate, 30);
      
      return {
        id: lender.id,
        estimatedRate: finalRate.toFixed(3),
        monthlyPayment: monthlyPayment,
        lenderComp: lender.comp,
        processingFee: lender.fee,
        score: finalRate
      };
    });

    setResults(calculatedResults.sort((a, b) => a.score - b.score));
  };

  const calculatePayment = (principal, annualRate, years) => {
    const monthlyRate = annualRate / 100 / 12;
    const numPayments = years * 12;
    const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                    (Math.pow(1 + monthlyRate, numPayments) - 1);
    return payment.toFixed(2);
  };

  const getLoanTypeLabel = () => {
    const labels = { conventional: 'Conventional', fha: 'FHA', va: 'VA', usda: 'USDA' };
    return labels[loanType] || 'Conventional';
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 rounded-lg shadow-2xl p-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <Home className="w-12 h-12" />
          <div>
            <h1 className="text-4xl font-bold">US Mortgage Loan Search Engine</h1>
            <p className="text-xl">Real-Time Lender Matching • Professional Service</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <Search className="w-7 h-7 text-green-600" />
          Loan Search Criteria
        </h2>
        
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block font-bold mb-2">Loan Type</label>
            <select value={loanType} onChange={(e) => setLoanType(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:border-green-500 focus:outline-none">
              <option value="conventional">Conventional</option>
              <option value="fha">FHA (Federal Housing Administration)</option>
              <option value="va">VA (Veterans Affairs)</option>
              <option value="usda">USDA (Rural Development)</option>
            </select>
          </div>

          <div>
            <label className="block font-bold mb-2">Loan Purpose</label>
            <select value={loanPurpose} onChange={(e) => setLoanPurpose(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:border-green-500 focus:outline-none">
              <option value="purchase">Purchase</option>
              <option value="refinance">Rate & Term Refinance</option>
              <option value="cashout">Cash-Out Refinance</option>
            </select>
          </div>

          <div>
            <label className="block font-bold mb-2">Property Type</label>
            <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:border-green-500 focus:outline-none">
              <option value="single">Single Family Residence</option>
              <option value="condo">Condominium</option>
              <option value="multi">Multi-Family (2-4 units)</option>
              <option value="townhome">Townhome</option>
            </select>
          </div>

          <div>
            <label className="block font-bold mb-2">Loan Amount</label>
            <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="Enter loan amount"
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:border-green-500 focus:outline-none" />
            {parseFloat(loanAmount) > 766550 && (
              <p className="text-sm text-blue-600 mt-1 font-semibold">⚡ Jumbo Loan Amount (over $766,550)</p>
            )}
          </div>

          <div className="col-span-2">
            <label className="block font-bold mb-2">Credit Score Range</label>
            <select value={creditScore} onChange={(e) => setCreditScore(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:border-green-500 focus:outline-none">
              <option value="800">Excellent (740+)</option>
              <option value="720">Good (700-739)</option>
              <option value="680">Fair (660-699)</option>
              <option value="640">Below Average (620-659)</option>
              <option value="600">Poor (580-619)</option>
              <option value="560">Very Poor (Below 580)</option>
            </select>
          </div>
        </div>

        <button onClick={matchLenders}
          className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white py-4 rounded-lg font-bold text-xl flex items-center justify-center gap-3 shadow-lg transition-all">
          <Search className="w-6 h-6" />
          Find Matching Lenders
        </button>
      </div>

      {results.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-gray-800">
                <strong>IMPORTANT DISCLOSURE:</strong> Estimated rates shown are approximate and based on general criteria for {getLoanTypeLabel()} loans. Final rates require full application, credit report, income verification, property appraisal, and underwriting approval.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <Award className="w-7 h-7 text-green-600" />
              Matched Lenders ({results.length} Available)
            </h3>
            <div className="text-right">
              <p className="text-sm text-gray-600">Loan Type</p>
              <p className="text-lg font-bold text-green-600">{getLoanTypeLabel()}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {results.map((result, index) => (
              <div key={result.id} className="border-2 border-gray-200 rounded-lg p-6 hover:border-green-400 hover:shadow-lg transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                        #{index + 1}
                      </div>
                      <h4 className="text-xl font-bold text-gray-800">Lender {String.fromCharCode(65 + index)}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">30-Year Fixed Rate Mortgage</p>
                    <p className="text-xs text-gray-500 mt-1">Processing Fee: ${result.processingFee}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Estimated Rate*</p>
                    <p className="text-4xl font-bold text-green-600">{result.estimatedRate}%</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-sm text-gray-600">Estimated Monthly Payment</p>
                    <p className="text-2xl font-bold text-gray-800">${result.monthlyPayment}</p>
                    <p className="text-xs text-gray-500 mt-1">Principal & Interest Only</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Broker Compensation</p>
                    <p className="text-xl font-bold text-gray-700">{result.lenderComp}%</p>
                    <p className="text-xs text-gray-500 mt-1">Lender Paid</p>
                  </div>
                </div>

                {index === 0 && (
                  <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-green-700 font-semibold">
                      <TrendingUp className="w-5 h-5" />
                      <span>Best Rate Available</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Next Steps:
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                Submit complete loan application with supporting documentation
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                Provide 2 years tax returns, W-2s, recent paystubs, and bank statements
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                Property appraisal ordered and completed
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                Credit report pulled and reviewed by underwriting
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                Final loan approval and clear to close
              </li>
            </ul>
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
          <p className="text-sm text-gray-600">Phone: 1-844-853-9300</p>
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
            © {new Date().getFullYear()} Everwise Home Loans & Realty. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}