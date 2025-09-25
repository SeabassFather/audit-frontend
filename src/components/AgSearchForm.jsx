import React, { useState } from "react";
import useAgMarketplaceSearch from "../hooks/useAgMarketplaceSearch";
import useFileUpload from "../hooks/useFileUpload";

export default function AgSearchForm({ onSearch }) {
  const [formData, setFormData] = useState({
    // Company & KYB
    legalName: "",
    dba: "",
    country: "",
    ein: "",
    duns: "",
    yearsInBusiness: "",
    owners: "",
    contactPerson: "",
    
    // Facility
    facilityLocation: "",
    warehousePartner: "",
    coldChainCapability: false,
    recallPlanOnFile: false,
    
    // Product Offerings
    cropType: "",
    variety: "",
    grade: "",
    packStyle: "",
    size: "",
    hsCode: "",
    harvestWindow: "",
    volume: "",
    targetPrice: "",
    incoterms: "",
    shippingTerms: "",
    
    // Buyer & Docs
    buyer: "",
    buyerType: "",
    poNumber: "",
    poValue: "",
    paymentTerms: "",
  });

  const { loading, searchAgMarket, results } = useAgMarketplaceSearch();
  const { uploading, uploadFile, uploadedFiles } = useFileUpload();
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowResults(true);
    const result = await searchAgMarket(formData);
    if (onSearch) {
      onSearch(result);
    }
  };

  const handleFileUpload = async (file, category) => {
    await uploadFile(file, "/api/ag/upload-document", { category });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Agriculture Marketplace Search</h2>
          
          {/* Company & KYB Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Company & KYB Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Legal Name</label>
                <input
                  type="text"
                  value={formData.legalName}
                  onChange={(e) => handleInputChange('legalName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Company Legal Name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">DBA</label>
                <input
                  type="text"
                  value={formData.dba}
                  onChange={(e) => handleInputChange('dba', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Doing Business As"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <select
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select Country</option>
                  <option value="US">United States</option>
                  <option value="MX">Mexico</option>
                  <option value="CA">Canada</option>
                  <option value="GT">Guatemala</option>
                  <option value="HN">Honduras</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">EIN/RFC</label>
                <input
                  type="text"
                  value={formData.ein}
                  onChange={(e) => handleInputChange('ein', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Tax ID Number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">DUNS Number</label>
                <input
                  type="text"
                  value={formData.duns}
                  onChange={(e) => handleInputChange('duns', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="DUNS Number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Years in Business</label>
                <input
                  type="number"
                  value={formData.yearsInBusiness}
                  onChange={(e) => handleInputChange('yearsInBusiness', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="5"
                />
              </div>
            </div>
          </div>

          {/* Facility Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Facility Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Facility Location(s)</label>
                <input
                  type="text"
                  value={formData.facilityLocation}
                  onChange={(e) => handleInputChange('facilityLocation', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="City, State/Region"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">LA Warehouse Partner (Optional)</label>
                <input
                  type="text"
                  value={formData.warehousePartner}
                  onChange={(e) => handleInputChange('warehousePartner', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Warehouse Partner Name"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.coldChainCapability}
                  onChange={(e) => handleInputChange('coldChainCapability', e.target.checked)}
                  className="mr-2 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Cold chain capability</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.recallPlanOnFile}
                  onChange={(e) => handleInputChange('recallPlanOnFile', e.target.checked)}
                  className="mr-2 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Recall plan on file</span>
              </label>
            </div>
          </div>

          {/* Product Offerings Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Product Offerings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Crop Type</label>
                <select
                  value={formData.cropType}
                  onChange={(e) => handleInputChange('cropType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select Crop</option>
                  <option value="avocado">Avocado</option>
                  <option value="berries">Berries</option>
                  <option value="citrus">Citrus</option>
                  <option value="tomatoes">Tomatoes</option>
                  <option value="leafy_greens">Leafy Greens</option>
                  <option value="stone_fruit">Stone Fruit</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Variety</label>
                <input
                  type="text"
                  value={formData.variety}
                  onChange={(e) => handleInputChange('variety', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., Hass, Fuerte"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Grade/Specification</label>
                <input
                  type="text"
                  value={formData.grade}
                  onChange={(e) => handleInputChange('grade', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Grade A, Organic, etc."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Volume (per week/month)</label>
                <input
                  type="text"
                  value={formData.volume}
                  onChange={(e) => handleInputChange('volume', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., 1000 lbs/week"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Price</label>
                <input
                  type="text"
                  value={formData.targetPrice}
                  onChange={(e) => handleInputChange('targetPrice', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="$2.50/lb"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Harvest Window</label>
                <input
                  type="text"
                  value={formData.harvestWindow}
                  onChange={(e) => handleInputChange('harvestWindow', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Jan-Mar, Year-round"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? 'Searching...' : 'Search Growers & Compliance'}
          </button>
        </div>
      </form>

      {/* File Upload Section */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Upload Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Certifications (PDF/Images)</label>
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0], 'certifications')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Lab Tests/MRL Reports</label>
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0], 'lab_tests')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">HACCP/FSMA Plan</label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0], 'haccp_plan')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
        
        {uploading && (
          <div className="mt-4 text-center">
            <div className="inline-flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600 mr-2"></div>
              <span className="text-sm text-gray-600">Uploading...</span>
            </div>
          </div>
        )}
      </div>

      {/* Results Section */}
      {showResults && (
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Search Results</h3>
          {results.length > 0 ? (
            <div className="space-y-4">
              {results.map((grower, index) => (
                <div key={index} className="border border-gray-200 rounded-md p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-900">{grower.name || `Grower ${index + 1}`}</h4>
                      <p className="text-sm text-gray-600">{grower.location || 'Location not specified'}</p>
                      <p className="text-sm text-gray-600">{grower.crops || 'Multiple crops available'}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-green-600">{grower.certifications || 'GAP Certified'}</div>
                      <div className="text-xs text-gray-500">Compliance Status</div>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      Volume Available: <span className="font-medium">{grower.volume || 'Contact for details'}</span>
                    </div>
                    <button className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700">
                      Contact Grower
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-500">
                {loading ? 'Searching for growers...' : 'No matching growers found. Try adjusting your search criteria.'}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
