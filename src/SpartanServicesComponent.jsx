import React, { useState, useEffect } from 'react';
import spartanServices from './data/spartan_services.json';
import { X, Upload, CheckCircle, ChevronDown, Building, Phone, Calendar, DollarSign, Shield } from 'lucide-react';

function ContactCard({ serviceName, onClose }) {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    serviceType: serviceName,
    urgency: 'standard',
    budget: '',
    preferredDate: '',
    additionalInfo: '',
    // Security Questions
    lastFourSSN: '',
    dateOfBirth: '',
    propertyAddress: '',
    loanNumber: ''
  });
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    
    // Log form data - you'll replace this with your API call to title companies
    console.log('Form Data:', formData);
    console.log('Files:', files);
    
    setTimeout(() => {
      setSuccess(true);
      setTimeout(() => onClose(), 2500);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-white rounded-2xl p-8 max-w-4xl w-full my-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Request Audit/Compliance Review</h2>
            <p className="text-gray-600 mt-1">{serviceName}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="text-center py-12">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted Successfully!</h3>
            <p className="text-gray-600 mb-4">Thank you for your inquiry. Our team will review your request and contact you within 24-48 hours.</p>
            <p className="text-sm text-gray-500">Reference ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Contact Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="John Doe"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="(555) 123-4567"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@company.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Company/Organization Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="company"
                    placeholder="Acme Corporation"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Security Verification Section */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Identity Verification</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                For refund verification and title company coordination, please provide the following information:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last 4 Digits of SSN <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastFourSSN"
                    placeholder="1234"
                    required
                    maxLength="4"
                    pattern="[0-9]{4}"
                    value={formData.lastFourSSN}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    required
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Property Address (if applicable)
                  </label>
                  <input
                    type="text"
                    name="propertyAddress"
                    placeholder="123 Main St, City, ST 12345"
                    value={formData.propertyAddress}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Loan Number (if applicable)
                  </label>
                  <input
                    type="text"
                    name="loanNumber"
                    placeholder="Enter loan number"
                    value={formData.loanNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Service Requirements</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Service Urgency <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="urgency"
                    required
                    value={formData.urgency}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option value="standard">Standard (2-4 weeks)</option>
                    <option value="expedited">Expedited (1-2 weeks)</option>
                    <option value="rush">Rush (3-5 days)</option>
                    <option value="emergency">Emergency (24-48 hours)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Estimated Budget Range
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                    >
                      <option value="">Select budget range</option>
                      <option value="under-5k">Under $5,000</option>
                      <option value="5k-10k">$5,000 - $10,000</option>
                      <option value="10k-25k">$10,000 - $25,000</option>
                      <option value="25k-50k">$25,000 - $50,000</option>
                      <option value="50k-plus">$50,000+</option>
                      <option value="undecided">Not sure yet</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preferred Start Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Additional Information / Specific Requirements
              </label>
              <textarea
                name="additionalInfo"
                rows="4"
                placeholder="Please provide any additional details about your audit/compliance needs, refund inquiries, or specific areas of concern..."
                value={formData.additionalInfo}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
              />
            </div>

            {/* Document Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Upload Supporting Documents (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer bg-gray-50">
                <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(Array.from(e.target.files))}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="text-blue-600 font-semibold hover:text-blue-700">Click to upload</span>
                  <span className="text-gray-600"> or drag and drop</span>
                  <p className="text-xs text-gray-500 mt-2">PDF, DOC, XLS, Images (Max 10MB per file)</p>
                </label>
              </div>
              
              {files.length > 0 && (
                <div className="mt-3 space-y-2">
                  {files.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg border border-blue-200">
                      <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700 truncate flex-1">{f.name}</span>
                      <span className="text-xs text-gray-500">{(f.size / 1024).toFixed(1)} KB</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={uploading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {uploading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing Request...
                  </span>
                ) : (
                  'Submit Service Request'
                )}
              </button>
              <p className="text-xs text-center text-gray-500 mt-3">
                By submitting, you agree to receive communications regarding your service request. All information is encrypted and secure.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function Services() {
  const [expandedCategory, setExpandedCategory] = useState(0);
  const [selectedService, setSelectedService] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Convert spartan_services.json object to array format
    if (spartanServices && typeof spartanServices === 'object') {
      const categoriesArray = Object.entries(spartanServices).map(([category, items]) => ({
        category,
        items,
        icon: getCategoryIcon(category)
      }));
      setCategories(categoriesArray);
    }
  }, []);

  // Helper function to get appropriate icon for each category
  const getCategoryIcon = (category) => {
    const iconMap = {
      'Agriculture & Food Systems': '🌾',
      'Mortgage & Real Estate': '🏠',
      'Legal & Compliance': '⚖️',
      'Finance & Factoring': '💰',
      'Education & Workforce': '🎓',
      'Eco & Sustainability': '🌍',
      'Healthcare & Insurance': '🏥',
      'Global Trade & Logistics': '🌐',
      'Technology & Data': '💻',
      'Consumer & Retail': '🛒'
    };
    return iconMap[category] || '🛠️';
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">AuditDNA Services Catalog</h1>
        <p className="text-gray-600 mt-2 text-lg">
          Professional auditing, compliance, and advisory services - 200+ services across all industries
        </p>
      </div>

      <div className="space-y-4">
        {categories.map((cat, idx) => {
          const isExpanded = expandedCategory === idx;
          
          return (
            <div key={idx} className="bg-white shadow-lg rounded-xl border border-gray-100 overflow-hidden transition-all hover:shadow-xl">
              <button
                onClick={() => setExpandedCategory(isExpanded ? null : idx)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <span className="text-2xl">{cat.icon || '🛠️'}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{cat.category}</h3>
                    <p className="text-sm text-gray-500 mt-1">{cat.items?.length || 0} services available</p>
                  </div>
                </div>
                <ChevronDown className={`w-6 h-6 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
              </button>

              {isExpanded && (
                <div className="px-6 pb-6 bg-gray-50 border-t border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-6">
                    {cat.items?.map((svc, i) => (
                      <div
                        key={i}
                        onClick={() => setSelectedService({ category: cat.category, service: svc })}
                        className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer group"
                      >
                        <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors leading-snug">
                          {svc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedService && (
        <ContactCard
          serviceName={`${selectedService.category} - ${selectedService.service}`}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
}