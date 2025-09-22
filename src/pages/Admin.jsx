import React, { useState } from "react";
import MexicoLoanAdmin from "../components/MexicoLoanAdmin";

export default function Admin(){
  const [activeTab, setActiveTab] = useState('overview');
  
  const rows = [
    {name:"DSAR Workflow", status:"Ready"},
    {name:"Vendor Reviews", status:"In Progress"},
    {name:"Policy Pack Generator", status:"Ready"},
    {name:"KYC/KYB Checklist", status:"Ready"},
    {name:"Mexico Loan Criteria", status:"Active"},
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'mexico-loans', label: 'Mexico Loans', icon: '🏠' },
    { id: 'compliance', label: 'Compliance', icon: '✅' },
    { id: 'partners', label: 'Partners', icon: '🤝' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-700 to-slate-800 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">AuditDNA Administration Panel</h1>
        <p className="text-slate-300">Manage system settings, lender criteria, and compliance configurations</p>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-lg font-semibold">Admin Controls</div>
            <p className="text-gray-700 mt-2">Compliance toggles & partner integrations.</p>
            <ul className="list-disc ml-5 mt-2">{rows.map(r=> <li key={r.name}><b>{r.name}</b>: {r.status}</li>)}</ul>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">System Health</h3>
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              </div>
              <p className="text-sm text-gray-600">All systems operational</p>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">Active Lenders</h3>
                <span className="text-lg font-bold text-blue-600">5</span>
              </div>
              <p className="text-sm text-gray-600">Mexico loan programs</p>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">Compliance Score</h3>
                <span className="text-lg font-bold text-green-600">98%</span>
              </div>
              <p className="text-sm text-gray-600">All regions covered</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'mexico-loans' && <MexicoLoanAdmin />}

      {activeTab === 'compliance' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Compliance Management</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">US Compliance</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center justify-between">
                  <span>TRID Compliance</span>
                  <span className="text-green-600">✓ Active</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>CFPB Reporting</span>
                  <span className="text-green-600">✓ Active</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>FINCEN AML</span>
                  <span className="text-green-600">✓ Active</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Mexico Compliance</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center justify-between">
                  <span>CNBV Standards</span>
                  <span className="text-green-600">✓ Active</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Fideicomiso Setup</span>
                  <span className="text-green-600">✓ Active</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Cross-Border KYC</span>
                  <span className="text-green-600">✓ Active</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'partners' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Partner Network</h2>
          <div className="space-y-4">
            {[
              'Global Cross-Border Partners',
              'Banco Nacional Partners', 
              'International Bridge Lending',
              'Development Finance Group',
              'Equity Release Partners'
            ].map((partner, i) => (
              <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{partner}</h3>
                  <p className="text-sm text-gray-600">Active lending partner</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">Active</span>
                  <button className="text-blue-600 hover:text-blue-800 text-sm">Manage</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
