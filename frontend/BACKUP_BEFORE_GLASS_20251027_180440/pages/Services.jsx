import React, { useState } from 'react';
import { X, CheckCircle, TrendingUp } from 'lucide-react';
import servicesData from '../services.json';

function ServiceCard({ service, onSelect }) {
  return (
    <div 
      onClick={() => onSelect(service)} 
      className="group bg-white rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all cursor-pointer p-4"
    >
      <h3 className="text-base font-bold text-gray-900 hover:text-blue-600 transition-colors">
        {service}
      </h3>
    </div>
  );
}

function ServiceModal({ service, onClose }) {
  const [caseId] = useState(`ADN-2025-${Math.floor(Math.random() * 10000)}`);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{service}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        
        {!submitted ? (
          <div>
            <p className="text-gray-600 mb-6">Request audit service for: <strong>{service}</strong></p>
            <button 
              onClick={() => setSubmitted(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
            >
              Submit Request
            </button>
          </div>
        ) : (
          <div className="text-center">
            <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted!</h3>
            <p className="text-xl font-mono text-blue-600 mb-4">Case ID: {caseId}</p>
            <p className="text-gray-600 mb-6">You will receive confirmation via email.</p>
            <button 
              onClick={onClose}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Services() {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            AuditDNA <span className="text-blue-600">Professional Services</span>
          </h1>
          <p className="text-xl text-gray-600">
            Comprehensive auditing & compliance services - 300+ services across all industries
          </p>
        </div>

        <div className="space-y-6">
          {servicesData.map((category, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => setExpandedCategory(expandedCategory === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition"
                style={{ borderLeft: `6px solid ${category.color || '#3b82f6'}` }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{category.icon}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{category.category}</h2>
                    <p className="text-gray-600">{category.items.length} services available</p>
                  </div>
                </div>
                <svg 
                  className={`w-6 h-6 text-gray-400 transition-transform ${expandedCategory === idx ? 'rotate-90' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {expandedCategory === idx && (
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-50">
                  {category.items.map((service, sIdx) => (
                    <ServiceCard 
                      key={sIdx} 
                      service={service} 
                      onSelect={setSelectedService}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedService && (
        <ServiceModal 
          service={selectedService} 
          onClose={() => setSelectedService(null)} 
        />
      )}
    </div>
  );
}