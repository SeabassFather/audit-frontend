import { useMortgageSearch } from "../hooks/searchHooks";
import LoanMatchForm from "../forms/LoanMatchForm";
import Spinner from "../components/Spinner";

export default function MortgageSearchPage(){
  const {values, setValue, submit, loading, results} = useMortgageSearch();
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Mortgage Loan Search</h1>
            <p className="text-slate-600 mt-1">Find the best lenders and loan products for your needs</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Live Search
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Search Form */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-700">Loan Criteria</h2>
            <LoanMatchForm values={values} setValue={setValue} onSubmit={submit} loading={loading}/>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-700">Lender Matches</h2>
              {results.length > 0 && (
                <span className="text-sm text-slate-500">{results.length} matches found</span>
              )}
            </div>
            
            <div className="bg-slate-50 rounded-lg p-4 min-h-[400px]">
              {loading && <Spinner/>}
              
              {!loading && results.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-slate-400 mb-2">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <p className="text-slate-500 text-sm">Submit the form to find matching lenders</p>
                </div>
              )}

              <div className="space-y-4">
                {results.map((lender, i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    {/* Lender Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-slate-800">{lender.lender}</h3>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            {lender.lenderType}
                          </span>
                        </div>
                        <div className="text-sm text-slate-600 mb-1">{lender.product}</div>
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span>Approval Rate: {lender.approvalRate}</span>
                          <span>•</span>
                          <span>Avg Time: {lender.avgApprovalTime}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">{lender.rate}</div>
                        <div className="text-sm text-slate-500">APR: {lender.apr}</div>
                        <div className={`mt-1 px-3 py-1 rounded-full text-xs font-medium ${
                          lender.fit === 'Excellent' ? 'bg-green-100 text-green-700' :
                          lender.fit === 'Strong' ? 'bg-blue-100 text-blue-700' :
                          lender.fit === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {lender.fit} Match
                        </div>
                      </div>
                    </div>

                    {/* Loan Requirements */}
                    <div className="grid md:grid-cols-2 gap-4 mb-4 p-3 bg-slate-50 rounded-lg">
                      <div className="space-y-1">
                        <div className="text-xs font-medium text-slate-600">Requirements</div>
                        <div className="text-xs text-slate-700">
                          Min Credit: {lender.minCreditScore} | Max LTV: {lender.maxLTV}% | Max DTI: {lender.maxDTI}%
                        </div>
                        <div className="text-xs text-slate-700">
                          Loan Range: ${(lender.minLoanAmount/1000)}K - ${(lender.maxLoanAmount/1000000)}M
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs font-medium text-slate-600">Estimated Fees</div>
                        <div className="text-xs text-slate-700">
                          Origination: {lender.fees.origination} | Underwriting: {lender.fees.underwriting}
                        </div>
                        <div className="text-xs text-slate-700">
                          Processing: {lender.fees.processing}
                        </div>
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="mb-4">
                      <div className="text-xs font-medium text-slate-600 mb-2">Specialties</div>
                      <div className="flex flex-wrap gap-2">
                        {lender.specialties.map((specialty, idx) => (
                          <span key={idx} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Match Reasons */}
                    <div className="mb-4">
                      <div className="text-xs font-medium text-slate-600 mb-2">Why this lender matches:</div>
                      <div className="text-xs text-slate-700">
                        {lender.reasons.join(" • ")}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-3 border-t border-slate-200">
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors">
                        Get Quote
                      </button>
                      <button className="flex-1 border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-medium py-2 px-4 rounded-lg transition-colors">
                        View Details
                      </button>
                      <button className="px-4 py-2 text-slate-400 hover:text-slate-600 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}