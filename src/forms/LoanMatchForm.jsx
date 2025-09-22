import { useState } from "react";

const LOAN_TYPES = [
  "Conventional", "FHA", "VA", "USDA", "Jumbo", "Conforming",
  "Business", "Commercial", "SBA", "Asset-Based", "Factoring"
];

const PROPERTY_TYPES = [
  "Single Family", "Condo", "Townhouse", "Multi-Family (2-4 units)",
  "Commercial", "Mixed Use", "Investment Property", "Vacant Land"
];

const LOAN_PURPOSES = [
  "Purchase", "Refinance", "Cash-Out Refinance", "Construction",
  "Renovation", "Investment", "Business Expansion"
];

const OCCUPANCY_TYPES = [
  "Primary Residence", "Second Home", "Investment Property"
];

const INCOME_TYPES = [
  "W-2 Employment", "Self-Employed", "1099 Contractor", "Business Owner",
  "Investment Income", "Retirement Income", "Mixed Income"
];

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

export default function LoanMatchForm({ values, setValue, onSubmit, loading }) {
  
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit?.();
  }

  const calculateLTV = () => {
    const price = parseFloat(values.price) || 0;
    const down = parseFloat(values.down) || 0;
    const loanAmount = parseFloat(values.loanAmount) || 0;
    
    if (price && down) {
      return Math.round(((price - down) / price) * 100);
    } else if (price && loanAmount) {
      return Math.round((loanAmount / price) * 100);
    }
    return 0;
  };

  const calculateDTI = () => {
    const monthlyIncome = parseFloat(values.monthlyIncome) || 0;
    const monthlyDebts = parseFloat(values.monthlyDebts) || 0;
    
    if (monthlyIncome && monthlyDebts) {
      return Math.round((monthlyDebts / monthlyIncome) * 100);
    }
    return 0;
  };

  // Show business/commercial fields for business loan types
  const showBusinessFields = ["Business", "Commercial", "SBA", "Asset-Based", "Factoring"].includes(values.product);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Loan Basic Information */}
      <div className="bg-white border border-slate-200 rounded-lg p-4">
        <h3 className="font-semibold text-slate-700 mb-4">Loan Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Loan Type</label>
            <select
              className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={values.product || "Conventional"}
              onChange={(e) => setValue("product", e.target.value)}
            >
              {LOAN_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Purpose</label>
            <select
              className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={values.purpose || "Purchase"}
              onChange={(e) => setValue("purpose", e.target.value)}
            >
              {LOAN_PURPOSES.map(purpose => (
                <option key={purpose} value={purpose}>{purpose}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Property Information */}
      {!showBusinessFields && (
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h3 className="font-semibold text-slate-700 mb-4">Property Information</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Property Type</label>
              <select
                className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={values.propertyType || "Single Family"}
                onChange={(e) => setValue("propertyType", e.target.value)}
              >
                {PROPERTY_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Occupancy</label>
              <select
                className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={values.occupancy || "Primary Residence"}
                onChange={(e) => setValue("occupancy", e.target.value)}
              >
                {OCCUPANCY_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">State</label>
              <select
                className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={values.state || ""}
                onChange={(e) => setValue("state", e.target.value)}
              >
                <option value="">Select State</option>
                {US_STATES.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Financial Information */}
      <div className="bg-white border border-slate-200 rounded-lg p-4">
        <h3 className="font-semibold text-slate-700 mb-4">
          {showBusinessFields ? "Business Financial Information" : "Financial Information"}
        </h3>
        
        {!showBusinessFields ? (
          <>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Purchase Price</label>
                <input
                  type="number"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="500,000"
                  value={values.price || ""}
                  onChange={(e) => setValue("price", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Down Payment</label>
                <input
                  type="number"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="100,000"
                  value={values.down || ""}
                  onChange={(e) => setValue("down", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Loan Amount</label>
                <input
                  type="number"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="400,000"
                  value={values.loanAmount || ""}
                  onChange={(e) => setValue("loanAmount", e.target.value)}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Credit Score Range</label>
                <select
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={values.creditRange || "720+"}
                  onChange={(e) => setValue("creditRange", e.target.value)}
                >
                  <option value="800+">800+</option>
                  <option value="760-799">760-799</option>
                  <option value="720-759">720-759</option>
                  <option value="680-719">680-719</option>
                  <option value="640-679">640-679</option>
                  <option value="600-639">600-639</option>
                  <option value="<600">&lt;600</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Monthly Income</label>
                <input
                  type="number"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="8,000"
                  value={values.monthlyIncome || ""}
                  onChange={(e) => setValue("monthlyIncome", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Monthly Debts</label>
                <input
                  type="number"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="2,000"
                  value={values.monthlyDebts || ""}
                  onChange={(e) => setValue("monthlyDebts", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Income Type</label>
                <select
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={values.incomeType || "W-2 Employment"}
                  onChange={(e) => setValue("incomeType", e.target.value)}
                >
                  {INCOME_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </>
        ) : (
          /* Business Fields */
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Business Legal Name</label>
                <input
                  type="text"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Business Name LLC"
                  value={values.businessName || ""}
                  onChange={(e) => setValue("businessName", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Annual Revenue</label>
                <input
                  type="number"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="1,000,000"
                  value={values.annualRevenue || ""}
                  onChange={(e) => setValue("annualRevenue", e.target.value)}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Loan Amount Requested</label>
                <input
                  type="number"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="250,000"
                  value={values.loanAmount || ""}
                  onChange={(e) => setValue("loanAmount", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Years in Business</label>
                <select
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={values.yearsInBusiness || "2+"}
                  onChange={(e) => setValue("yearsInBusiness", e.target.value)}
                >
                  <option value="<1">Less than 1 year</option>
                  <option value="1-2">1-2 years</option>
                  <option value="2+">2+ years</option>
                  <option value="5+">5+ years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Credit Score</label>
                <select
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={values.creditRange || "680-719"}
                  onChange={(e) => setValue("creditRange", e.target.value)}
                >
                  <option value="750+">750+</option>
                  <option value="700-749">700-749</option>
                  <option value="680-719">680-719</option>
                  <option value="640-679">640-679</option>
                  <option value="600-639">600-639</option>
                  <option value="<600">&lt;600</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Calculated Metrics */}
      {!showBusinessFields && (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
          <h3 className="font-semibold text-slate-700 mb-3">Calculated Ratios</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Loan-to-Value (LTV):</span>
              <span className="font-medium">{calculateLTV()}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Debt-to-Income (DTI):</span>
              <span className="font-medium">{calculateDTI()}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Contact Information */}
      <div className="bg-white border border-slate-200 rounded-lg p-4">
        <h3 className="font-semibold text-slate-700 mb-4">Contact Information</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="John Doe"
              value={values.borrowerName || ""}
              onChange={(e) => setValue("borrowerName", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="john@example.com"
              value={values.email || ""}
              onChange={(e) => setValue("email", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
            <input
              type="tel"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="(555) 123-4567"
              value={values.phone || ""}
              onChange={(e) => setValue("phone", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center pt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium px-8 py-3 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Searching...
            </span>
          ) : (
            "Find Lenders"
          )}
        </button>
      </div>
    </form>
  );
}