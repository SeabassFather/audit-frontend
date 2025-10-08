import React, { useState, useEffect } from 'react';
import servicesData from '../data/services.json';

function ContactCard({ serviceName, onClose }) {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setTimeout(() => {
      setSuccess(true);
      setTimeout(() => onClose(), 2000);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{serviceName}</h2>
        <p className="text-gray-600 mb-6">Submit your documents for audit review</p>
        {success ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Documents Submitted!</h3>
            <p className="text-gray-600">We'll review your submission shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                placeholder="john@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Documents</label>
              <input
                type="file"
                multiple
                required
                onChange={(e) => setFiles(Array.from(e.target.files))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
              {files.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {files.map((f, i) => (
                    <li key={i} className="text-sm text-gray-700 bg-gray-50 p-2 rounded">{f.name}</li>
                  ))}
                </ul>
              )}
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition-colors">
              {uploading ? 'Uploading...' : 'Submit for Audit'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function Services() {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (servicesData && Array.isArray(servicesData)) {
      setCategories(servicesData);
    }
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Header matching Dashboard style */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Professional Services</h1>
        <p className="text-gray-600 mt-2 text-lg">
          Comprehensive audit, compliance, and advisory services across all industries
        </p>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        {categories.map((cat, idx) => {
          const isExpanded = expandedCategory === idx;
          
          return (
            <div key={idx} className="bg-white shadow-lg rounded-xl border border-gray-100 overflow-hidden transition-shadow hover:shadow-xl">
              <button
                onClick={() => setExpandedCategory(isExpanded ? null : idx)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="text-2xl">{cat.icon || '🛠️'}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{cat.category}</h3>
                    <p className="text-sm text-gray-500 mt-1">{cat.items?.length || 0} services available</p>
                  </div>
                </div>
                <svg 
                  className={`w-6 h-6 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isExpanded && (
                <div className="px-6 pb-6 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-4">
                    {cat.items?.map((svc, i) => (
                      <div
                        key={i}
                        onClick={() => setSelectedService({ category: cat.category, service: svc })}
                        className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow