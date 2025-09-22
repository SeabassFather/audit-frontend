import React, { useState } from 'react';
import { lenderCriteria } from '../data/mexicoLoanProducts';

export default function MexicoLoanAdmin() {
  const [criteria, setCriteria] = useState(lenderCriteria);
  const [activeTab, setActiveTab] = useState('Global Cross-Border Partners');
  const [saved, setSaved] = useState(false);

  const lenders = Object.keys(criteria);

  const updateCriteria = (lender, field, value) => {
    setCriteria(prev => ({
      ...prev,
      [lender]: {
        ...prev[lender],
        [field]: value
      }
    }));
    setSaved(false);
  };

  const saveCriteria = () => {
    // In a real app, this would save to a backend
    console.log('Saving criteria:', criteria);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const resetToDefaults = () => {
    setCriteria(lenderCriteria);
    setSaved(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Mexico Loan Administration</h1>
        <p className="text-blue-100">Configure lender criteria and qualification parameters</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {lenders.map(lender => (
            <button
              key={lender}
              onClick={() => setActiveTab(lender)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === lender
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {lender}
            </button>
          ))}
        </nav>
      </div>

      {/* Lender Configuration */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {activeTab} - Lending Criteria
          </h2>
          <div className="flex gap-2">
            {saved && (
              <span className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-lg border border-green-200">
                ✓ Saved
              </span>
            )}
            <button
              onClick={resetToDefaults}
              className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Reset to Defaults
            </button>
            <button
              onClick={saveCriteria}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Core Criteria */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
              Core Qualification Criteria
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maximum LTV (%)
              </label>
              <input
                type="number"
                min="50"
                max="95"
                step="5"
                value={criteria[activeTab]?.maxLTV * 100 || 75}
                onChange={(e) => updateCriteria(activeTab, 'maxLTV', (e.target.value / 100))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum FICO Score
              </label>
              <input
                type="number"
                min="600"
                max="800"
                step="10"
                value={criteria[activeTab]?.minFICO || 650}
                onChange={(e) => updateCriteria(activeTab, 'minFICO', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maximum DTI (%)
              </label>
              <input
                type="number"
                min="25"
                max="50"
                step="1"
                value={criteria[activeTab]?.maxDTI * 100 || 43}
                onChange={(e) => updateCriteria(activeTab, 'maxDTI', (e.target.value / 100))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Residency & Regions */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
              Eligibility Parameters
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Accepted Residency Types
              </label>
              <div className="space-y-2">
                {['Foreign National', 'Mexican Resident', 'Temporary/Permanent Resident', 'US Citizen'].map(type => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={criteria[activeTab]?.acceptedResidency?.includes(type) || false}
                      onChange={(e) => {
                        const current = criteria[activeTab]?.acceptedResidency || [];
                        const updated = e.target.checked
                          ? [...current, type]
                          : current.filter(t => t !== type);
                        updateCriteria(activeTab, 'acceptedResidency', updated);
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Regions
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['CDMX', 'JAL', 'NLE', 'QRO', 'YUC', 'BCN', 'BCS', 'GTO', 'QROO', 'ROO'].map(region => (
                  <label key={region} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={criteria[activeTab]?.preferredRegions?.includes(region) || false}
                      onChange={(e) => {
                        const current = criteria[activeTab]?.preferredRegions || [];
                        const updated = e.target.checked
                          ? [...current, region]
                          : current.filter(r => r !== region);
                        updateCriteria(activeTab, 'preferredRegions', updated);
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{region}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Current Settings Summary */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Current Settings Summary</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Max LTV:</span>
              <span className="ml-1 font-medium">{(criteria[activeTab]?.maxLTV * 100)}%</span>
            </div>
            <div>
              <span className="text-gray-600">Min FICO:</span>
              <span className="ml-1 font-medium">{criteria[activeTab]?.minFICO}</span>
            </div>
            <div>
              <span className="text-gray-600">Max DTI:</span>
              <span className="ml-1 font-medium">{(criteria[activeTab]?.maxDTI * 100)}%</span>
            </div>
            <div>
              <span className="text-gray-600">Regions:</span>
              <span className="ml-1 font-medium">{criteria[activeTab]?.preferredRegions?.length || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Documentation & Compliance */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Compliance & Documentation Requirements</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">Foreign Nationals</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Valid passport</li>
              <li>• Tourist permit or FM3/FM2</li>
              <li>• Bank account verification</li>
              <li>• Source of funds documentation</li>
              <li>• Mexican tax ID (RFC) assistance</li>
              <li>• Fideicomiso setup</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">Mexican Residents</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Mexican ID (INE/IFE)</li>
              <li>• CURP certificate</li>
              <li>• RFC tax ID</li>
              <li>• Proof of residence</li>
              <li>• Income verification</li>
              <li>• CNBV compliance</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">Cross-Border Features</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• FINCEN compliance</li>
              <li>• Currency transfer assistance</li>
              <li>• Remote e-signature</li>
              <li>• Bilingual documentation</li>
              <li>• Title insurance coordination</li>
              <li>• Legal due diligence</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}