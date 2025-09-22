import React, { useState, useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

export default function Services() {
  const [services, setServices] = useState({});
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load services data
    fetch('/src/services.json')
      .then(response => response.json())
      .then(data => {
        setServices(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading services:', error);
        // Fallback services data
        setServices({
          "Business": ["LLC Formation", "Payroll Audit", "Corporate Tax Filing"],
          "Medical": ["HIPAA Compliance Audit", "Insurance Claims Audit"],
          "Legal": ["Contract Review", "Privacy Policy Drafting"],
        });
        setLoading(false);
      });
  }, []);

  const toggleCategory = (category) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const filteredServices = Object.entries(services).reduce((acc, [category, serviceList]) => {
    const filtered = serviceList.filter(service =>
      service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[category] = filtered;
    }
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          🧬 AuditDNA Services
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive audit and compliance services across multiple industries
        </p>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Services Grid */}
      <div className="grid gap-6">
        {Object.entries(filteredServices).map(([category, serviceList]) => (
          <div key={category} className="card">
            <button
              onClick={() => toggleCategory(category)}
              className="w-full flex items-center justify-between p-4 text-left"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{category}</h3>
                <p className="text-gray-600">{serviceList.length} services available</p>
              </div>
              {expandedCategories.has(category) ? (
                <ChevronUpIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDownIcon className="h-5 w-5 text-gray-500" />
              )}
            </button>
            
            {expandedCategories.has(category) && (
              <div className="px-4 pb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                  {serviceList.map((service, index) => (
                    <div
                      key={index}
                      className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <span className="text-sm font-medium text-gray-700">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {Object.keys(filteredServices).length === 0 && searchTerm && (
        <div className="text-center py-12">
          <p className="text-gray-500">No services found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
}