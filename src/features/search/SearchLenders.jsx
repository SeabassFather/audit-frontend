import React, { useMemo, useState } from "react";
import ContactCard from "../../components/ContactCard";
import { saveLead } from "../../lib/leads";

// Sample lenders data - in a real app this would come from a CSV file or API
const LENDERS_DATA = [
  {
    id: 1,
    name: "Everwise Capital",
    type: "Private Money Lender",
    location: "Los Angeles, CA",
    minCredit: 620,
    maxLTV: 80,
    minLoanAmount: 100000,
    maxLoanAmount: 5000000,
    interestRate: "8.5-12.5%",
    states: ["CA", "NV", "AZ", "TX"],
    products: ["Fix & Flip", "DSCR", "Commercial"],
    specialties: "Real Estate Investment, Bridge Loans",
    contactEmail: "contact@everwise.com",
    contactPhone: "555-0123",
    website: "www.everwise.com"
  },
  {
    id: 2,
    name: "Kiavi",
    type: "Hard Money Lender",
    location: "San Francisco, CA",
    minCredit: 660,
    maxLTV: 85,
    minLoanAmount: 75000,
    maxLoanAmount: 3000000,
    interestRate: "9.0-13.0%",
    states: ["CA", "TX", "FL", "NY", "AZ", "NV", "CO", "GA"],
    products: ["Fix & Flip", "Rental Properties", "Bridge Loans"],
    specialties: "Technology-driven lending, Fast closings",
    contactEmail: "loans@kiavi.com",
    contactPhone: "555-0234",
    website: "www.kiavi.com"
  },
  {
    id: 3,
    name: "Lima One Capital",
    type: "Portfolio Lender",
    location: "Indianapolis, IN",
    minCredit: 640,
    maxLTV: 80,
    minLoanAmount: 50000,
    maxLoanAmount: 4000000,
    interestRate: "8.75-11.5%",
    states: ["All 50 States"],
    products: ["Fix & Flip", "DSCR", "New Construction", "Bridge"],
    specialties: "Nationwide lending, Investor-focused",
    contactEmail: "info@limaone.com",
    contactPhone: "555-0345",
    website: "www.limaone.com"
  },
  {
    id: 4,
    name: "CoreVest Finance",
    type: "Commercial Lender",
    location: "Irvine, CA",
    minCredit: 680,
    maxLTV: 75,
    minLoanAmount: 100000,
    maxLoanAmount: 15000000,
    interestRate: "7.5-10.0%",
    states: ["All 50 States"],
    products: ["DSCR", "Commercial", "Portfolio"],
    specialties: "Large portfolios, Institutional lending",
    contactEmail: "lending@corevest.com",
    contactPhone: "555-0456",
    website: "www.corevest.com"
  },
  {
    id: 5,
    name: "Groundfloor Finance",
    type: "Crowdfunded Lender",
    location: "Atlanta, GA",
    minCredit: 600,
    maxLTV: 85,
    minLoanAmount: 20000,
    maxLoanAmount: 1500000,
    interestRate: "10.0-14.0%",
    states: ["GA", "FL", "TN", "SC", "NC", "AL"],
    products: ["Fix & Flip", "Ground Up Construction"],
    specialties: "Crowdfunded model, Tech platform",
    contactEmail: "support@groundfloor.com",
    contactPhone: "555-0567",
    website: "www.groundfloor.com"
  },
  {
    id: 6,
    name: "RCN Capital",
    type: "Hard Money Lender",
    location: "Brookfield, CT",
    minCredit: 650,
    maxLTV: 80,
    minLoanAmount: 35000,
    maxLoanAmount: 2500000,
    interestRate: "9.5-12.5%",
    states: ["CT", "NY", "NJ", "PA", "MA", "FL", "GA", "NC", "SC", "VA"],
    products: ["Fix & Flip", "DSCR", "Rental"],
    specialties: "Regional expertise, Quick decisions",
    contactEmail: "info@rcncapital.com",
    contactPhone: "555-0678",
    website: "www.rcncapital.com"
  },
  {
    id: 7,
    name: "AMZA Capital",
    type: "Bridge Lender",
    location: "Phoenix, AZ",
    minCredit: 660,
    maxLTV: 70,
    minLoanAmount: 250000,
    maxLoanAmount: 10000000,
    interestRate: "8.0-11.0%",
    states: ["AZ", "CA", "NV", "TX", "CO", "FL"],
    products: ["Bridge Loans", "Commercial", "Construction"],
    specialties: "Commercial focus, Bridge specialist",
    contactEmail: "loans@amzacapital.com",
    contactPhone: "555-0789",
    website: "www.amzacapital.com"
  },
  {
    id: 8,
    name: "Visio Lending",
    type: "DSCR Specialist",
    location: "Tampa, FL",
    minCredit: 640,
    maxLTV: 80,
    minLoanAmount: 50000,
    maxLoanAmount: 3000000,
    interestRate: "7.5-9.5%",
    states: ["All 50 States"],
    products: ["DSCR", "Rental Properties", "Portfolio"],
    specialties: "DSCR expertise, Rental property focus",
    contactEmail: "info@visiolending.com",
    contactPhone: "555-0890",
    website: "www.visiolending.com"
  },
  {
    id: 9,
    name: "Angel Oak Mortgage",
    type: "Portfolio Lender",
    location: "Atlanta, GA",
    minCredit: 620,
    maxLTV: 85,
    minLoanAmount: 75000,
    maxLoanAmount: 2500000,
    interestRate: "8.25-10.75%",
    states: ["GA", "FL", "SC", "NC", "TN", "AL", "TX"],
    products: ["DSCR", "Non-QM", "Bank Statements"],
    specialties: "Non-QM specialist, Investor programs",
    contactEmail: "mortgage@angeloak.com",
    contactPhone: "555-0901",
    website: "www.angeloakmortgage.com"
  },
  {
    id: 10,
    name: "Athas Capital",
    type: "Private Lender",
    location: "Newport Beach, CA",
    minCredit: 680,
    maxLTV: 75,
    minLoanAmount: 500000,
    maxLoanAmount: 25000000,
    interestRate: "7.0-10.0%",
    states: ["CA", "AZ", "NV", "TX", "FL", "NY"],
    products: ["Commercial", "Bridge", "Construction"],
    specialties: "High-net-worth, Large commercial",
    contactEmail: "capital@athas.com",
    contactPhone: "555-1012",
    website: "www.athascapital.com"
  },
  {
    id: 11,
    name: "Flip Funding",
    type: "Tech Lender",
    location: "San Diego, CA",
    minCredit: 600,
    maxLTV: 80,
    minLoanAmount: 25000,
    maxLoanAmount: 1000000,
    interestRate: "9.5-13.0%",
    states: ["CA", "TX", "FL", "AZ", "NV", "CO"],
    products: ["Fix & Flip", "BRRRR", "Rental"],
    specialties: "Technology platform, Fast funding",
    contactEmail: "funding@flipfunding.com",
    contactPhone: "555-1123",
    website: "www.flipfunding.com"
  },
  {
    id: 12,
    name: "Patch of Land",
    type: "Marketplace Lender",
    location: "Los Angeles, CA",
    minCredit: 620,
    maxLTV: 75,
    minLoanAmount: 50000,
    maxLoanAmount: 2000000,
    interestRate: "8.5-12.0%",
    states: ["CA", "TX", "FL", "AZ", "NV", "GA", "NC", "SC"],
    products: ["Fix & Flip", "Ground Up", "Bridge"],
    specialties: "Marketplace model, Investor network",
    contactEmail: "loans@patchofland.com",
    contactPhone: "555-1234",
    website: "www.patchofland.com"
  }
];

const LENDER_TYPES = ["All", "Private Money Lender", "Hard Money Lender", "Portfolio Lender", "Commercial Lender", "DSCR Specialist", "Bridge Lender"];
const PRODUCT_TYPES = ["All", "Fix & Flip", "DSCR", "Commercial", "Bridge Loans", "Rental Properties", "New Construction"];
const STATES_LIST = ["All", "CA", "TX", "FL", "NY", "AZ", "NV", "CO", "GA", "NC", "SC", "VA", "TN", "AL"];

export default function SearchLenders() {
  const [filters, setFilters] = useState({
    search: "",
    lenderType: "All",
    productType: "All",
    state: "All",
    minCredit: "",
    maxLTV: "",
    minLoanAmount: "",
    maxLoanAmount: ""
  });

  const [selectedLender, setSelectedLender] = useState(null);

  const filteredLenders = useMemo(() => {
    return LENDERS_DATA.filter(lender => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const searchableText = `${lender.name} ${lender.type} ${lender.location} ${lender.specialties}`.toLowerCase();
        if (!searchableText.includes(searchTerm)) return false;
      }

      // Lender type filter
      if (filters.lenderType !== "All" && lender.type !== filters.lenderType) return false;

      // Product type filter
      if (filters.productType !== "All" && !lender.products.includes(filters.productType)) return false;

      // State filter
      if (filters.state !== "All") {
        if (!lender.states.includes("All 50 States") && !lender.states.includes(filters.state)) return false;
      }

      // Credit score filter
      if (filters.minCredit && lender.minCredit > Number(filters.minCredit)) return false;

      // LTV filter
      if (filters.maxLTV && lender.maxLTV < Number(filters.maxLTV)) return false;

      // Loan amount filters
      if (filters.minLoanAmount && lender.maxLoanAmount < Number(filters.minLoanAmount)) return false;
      if (filters.maxLoanAmount && lender.minLoanAmount > Number(filters.maxLoanAmount)) return false;

      return true;
    });
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      lenderType: "All",
      productType: "All",
      state: "All",
      minCredit: "",
      maxLTV: "",
      minLoanAmount: "",
      maxLoanAmount: ""
    });
  };

  const handleLead = (lead) => {
    const payload = { 
      ...lead, 
      service: "LENDERS", 
      lender: selectedLender?.name || "General",
      filters: filters 
    };
    if (saveLead(payload)) alert("Lender inquiry saved to Inbox.");
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid lg:grid-cols-4 gap-4">
      <div className="lg:col-span-3 space-y-4">
        {/* Search and Filters */}
        <div className="rounded-2xl border border-blue-300 bg-blue-50 p-4">
          <div className="grid md:grid-cols-4 gap-3 mb-4">
            <div className="md:col-span-2">
              <label className="text-sm text-slate-600">Search Lenders</label>
              <input
                type="text"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2"
                placeholder="Search by name, type, location, or specialty..."
                value={filters.search}
                onChange={e => handleFilterChange("search", e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-slate-600">Lender Type</label>
              <select 
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2"
                value={filters.lenderType}
                onChange={e => handleFilterChange("lenderType", e.target.value)}
              >
                {LENDER_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-600">Product Type</label>
              <select 
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2"
                value={filters.productType}
                onChange={e => handleFilterChange("productType", e.target.value)}
              >
                {PRODUCT_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-600">State</label>
              <select 
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2"
                value={filters.state}
                onChange={e => handleFilterChange("state", e.target.value)}
              >
                {STATES_LIST.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-600">Min Credit Score</label>
              <input
                type="number"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2"
                placeholder="e.g. 620"
                value={filters.minCredit}
                onChange={e => handleFilterChange("minCredit", e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-slate-600">Max LTV %</label>
              <input
                type="number"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2"
                placeholder="e.g. 80"
                value={filters.maxLTV}
                onChange={e => handleFilterChange("maxLTV", e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-slate-600">Min Loan Amount</label>
              <input
                type="number"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2"
                placeholder="e.g. 100000"
                value={filters.minLoanAmount}
                onChange={e => handleFilterChange("minLoanAmount", e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 hover:bg-slate-50"
              >
                Clear Filters
              </button>
            </div>
          </div>
          <div className="text-sm text-slate-600">
            Showing {filteredLenders.length} of {LENDERS_DATA.length} lenders
          </div>
        </div>

        {/* Results Table */}
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100 sticky top-0">
                <tr>
                  <th className="text-left px-3 py-3 font-medium">Lender</th>
                  <th className="text-left px-3 py-3 font-medium">Type</th>
                  <th className="text-left px-3 py-3 font-medium">Location</th>
                  <th className="text-left px-3 py-3 font-medium">Credit Min</th>
                  <th className="text-left px-3 py-3 font-medium">Max LTV</th>
                  <th className="text-left px-3 py-3 font-medium">Loan Range</th>
                  <th className="text-left px-3 py-3 font-medium">Rate</th>
                  <th className="text-left px-3 py-3 font-medium">Products</th>
                  <th className="text-left px-3 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLenders.map((lender) => (
                  <tr key={lender.id} className="border-t hover:bg-slate-50">
                    <td className="px-3 py-3">
                      <div className="font-medium text-slate-900">{lender.name}</div>
                      <div className="text-xs text-slate-500">{lender.specialties}</div>
                    </td>
                    <td className="px-3 py-3 text-slate-600">{lender.type}</td>
                    <td className="px-3 py-3 text-slate-600">{lender.location}</td>
                    <td className="px-3 py-3 text-slate-600">{lender.minCredit}</td>
                    <td className="px-3 py-3 text-slate-600">{lender.maxLTV}%</td>
                    <td className="px-3 py-3 text-slate-600">
                      {formatCurrency(lender.minLoanAmount)} - {formatCurrency(lender.maxLoanAmount)}
                    </td>
                    <td className="px-3 py-3 text-slate-600">{lender.interestRate}</td>
                    <td className="px-3 py-3">
                      <div className="flex flex-wrap gap-1">
                        {lender.products.slice(0, 2).map((product, idx) => (
                          <span key={idx} className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                            {product}
                          </span>
                        ))}
                        {lender.products.length > 2 && (
                          <span className="inline-block px-2 py-1 text-xs bg-slate-100 text-slate-600 rounded">
                            +{lender.products.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <button
                        onClick={() => setSelectedLender(lender)}
                        className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                      >
                        Contact
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredLenders.length === 0 && (
                  <tr>
                    <td className="px-3 py-6 text-center text-slate-500" colSpan="9">
                      No lenders match your search criteria. Try adjusting your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Lender Details */}
        {selectedLender && (
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-slate-900">{selectedLender.name}</h3>
              <button
                onClick={() => setSelectedLender(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm font-medium text-slate-600">Contact Information</div>
                <div className="text-sm text-slate-900 mt-1">
                  <div>📧 {selectedLender.contactEmail}</div>
                  <div>📞 {selectedLender.contactPhone}</div>
                  <div>🌐 {selectedLender.website}</div>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-slate-600">Products & Services</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedLender.products.map((product, idx) => (
                    <span key={idx} className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                      {product}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-slate-600">Service Areas</div>
                <div className="text-sm text-slate-900 mt-1">
                  {selectedLender.states.includes("All 50 States") ? "All 50 States" : selectedLender.states.join(", ")}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <ContactCard
        title="Lender Network Contact"
        partner={selectedLender ? selectedLender.name : "AuditDNA Lender Network"}
        service="LENDERS"
        onSubmit={handleLead}
      />
    </div>
  );
}