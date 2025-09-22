import React from "react";

export default function Services() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-4">AuditDNA Services</h1>
        <p className="text-slate-600 mb-6">
          Comprehensive AI-powered audit and compliance solutions for your business needs.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">Mortgage Services</h3>
            <p className="text-blue-700 text-sm mb-4">
              Complete loan search and lender matching platform
            </p>
            <a 
              href="/search/mortgage" 
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Learn More →
            </a>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-900 mb-2">USDA Pricing</h3>
            <p className="text-green-700 text-sm mb-4">
              Agricultural commodity pricing and market data
            </p>
            <a 
              href="/usda-search" 
              className="text-green-600 hover:text-green-800 text-sm font-medium"
            >
              Learn More →
            </a>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-purple-900 mb-2">Trade Finance</h3>
            <p className="text-purple-700 text-sm mb-4">
              Factoring and trade finance solutions
            </p>
            <a 
              href="/search/trade-finance" 
              className="text-purple-600 hover:text-purple-800 text-sm font-medium"
            >
              Learn More →
            </a>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
            <h3 className="font-semibold text-orange-900 mb-2">Mexico Real Estate</h3>
            <p className="text-orange-700 text-sm mb-4">
              Mexico property and loan services
            </p>
            <a 
              href="/mexico-loans" 
              className="text-orange-600 hover:text-orange-800 text-sm font-medium"
            >
              Learn More →
            </a>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg border border-red-200">
            <h3 className="font-semibold text-red-900 mb-2">AI Engines</h3>
            <p className="text-red-700 text-sm mb-4">
              Automated audit and compliance engines
            </p>
            <a 
              href="/audit-engines" 
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Learn More →
            </a>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">Admin Tools</h3>
            <p className="text-gray-700 text-sm mb-4">
              System administration and configuration
            </p>
            <a 
              href="/admin" 
              className="text-gray-600 hover:text-gray-800 text-sm font-medium"
            >
              Learn More →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}