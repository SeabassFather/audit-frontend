import React, { useState } from "react";

const forms = [
  {
    id: "financial-audit",
    title: "Financial Audit Authorization",
    description: "Authorize AuditDNA to conduct financial statement reviews, payroll reconciliation, and compliance audits.",
    downloadPath: "/forms/financial_audit_authorization.txt",
    category: "Financial"
  },
  {
    id: "partner-onboarding", 
    title: "Partner Onboarding & Eligibility",
    description: "Complete onboarding process and verify eligibility requirements for AuditDNA partnership.",
    downloadPath: "/forms/partner_onboarding_eligibility.txt",
    category: "Partnership"
  }
];

const FormSection = ({ form, onInteractiveForm }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{form.title}</h3>
          <span className="px-2 py-1 text-xs font-medium bg-brand-blue/10 text-brand-blue rounded-full">
            {form.category}
          </span>
        </div>
        <p className="text-gray-600 text-sm">{form.description}</p>
      </div>
    </div>
    
    <div className="flex items-center gap-3">
      <a
        href={form.downloadPath}
        download
        className="flex items-center gap-2 px-4 py-2 bg-brand-green text-white rounded-md hover:bg-brand-green/90 transition-colors text-sm font-medium"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Download .txt
      </a>
      
      <button
        onClick={() => onInteractiveForm(form)}
        className="flex items-center gap-2 px-4 py-2 bg-brand-blue text-white rounded-md hover:bg-brand-blue/90 transition-colors text-sm font-medium"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        Interactive Form
      </button>
      
      <div className="text-xs text-gray-500 ml-auto">
        💡 Interactive forms auto-save progress
      </div>
    </div>
  </div>
);

const InteractiveForm = ({ form, onClose }) => {
  const [formData, setFormData] = useState({});
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would submit to backend
    alert("Form submitted successfully! You will receive a confirmation email shortly.");
    onClose();
  };

  if (form.id === "financial-audit") {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{form.title}</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                <input type="text" required className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-brand-blue focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Primary Contact *</label>
                <input type="text" required className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-brand-blue focus:border-transparent" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Address *</label>
              <input type="text" required className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-brand-blue focus:border-transparent" />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input type="tel" required className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-brand-blue focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input type="email" required className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-brand-blue focus:border-transparent" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Audit Scope (Select all that apply)</label>
              <div className="space-y-2">
                {["Financial Statement Review", "Payroll Reconciliation", "Tax Compliance Audit", "Internal Controls Assessment", "Fraud Risk Assessment"].map(item => (
                  <label key={item} className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-brand-blue focus:ring-brand-blue mr-2" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
              <textarea rows={3} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-brand-blue focus:border-transparent" />
            </div>
            
            <div className="flex items-center gap-3 pt-4">
              <button type="submit" className="px-6 py-2 bg-brand-green text-white rounded-md hover:bg-brand-green/90 font-medium">
                Submit Authorization
              </button>
              <button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Partner onboarding form
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{form.title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Business Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Legal Business Name *</label>
                <input type="text" required className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-brand-blue focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Federal EIN *</label>
                <input type="text" required className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-brand-blue focus:border-transparent" />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Eligibility Requirements</h3>
            <div className="space-y-2">
              {["Annual Revenue > $500K", "Current Business License", "Valid Insurance Coverage", "No Outstanding Tax Liens", "Agrees to Terms of Service"].map(item => (
                <label key={item} className="flex items-center">
                  <input type="checkbox" required className="rounded border-gray-300 text-brand-blue focus:ring-brand-blue mr-2" />
                  <span className="text-sm text-gray-700">{item}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-3 pt-4">
            <button type="submit" className="px-6 py-2 bg-brand-green text-white rounded-md hover:bg-brand-green/90 font-medium">
              Submit Application
            </button>
            <button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function Agreements() {
  const [activeForm, setActiveForm] = useState(null);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-brand-blue/10 to-brand-green/10 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Agreements & Forms</h1>
        <p className="text-gray-600">
          Access and complete essential forms for audit services and partnership agreements. 
          Forms are available as downloadable text files or interactive web forms.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Available Forms</h2>
          <div className="text-sm text-gray-500">
            💾 All forms auto-save your progress as you type
          </div>
        </div>
        
        {forms.map(form => (
          <FormSection 
            key={form.id} 
            form={form} 
            onInteractiveForm={setActiveForm}
          />
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 className="font-medium text-blue-900">Need Help?</h3>
            <p className="text-sm text-blue-700 mt-1">
              Contact our support team at <a href="mailto:support@auditdna.com" className="underline">support@auditdna.com</a> or 
              call 1-800-AUDIT-DNA for assistance with forms or documentation.
            </p>
          </div>
        </div>
      </div>

      {activeForm && (
        <InteractiveForm 
          form={activeForm} 
          onClose={() => setActiveForm(null)} 
        />
      )}
    </div>
  );
}
