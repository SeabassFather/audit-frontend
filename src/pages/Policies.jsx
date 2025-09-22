import React, { useState } from 'react';
import { FileTextIcon, ShieldCheckIcon, GlobeIcon, LockIcon } from 'lucide-react';

export default function Policies() {
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  const policies = [
    {
      id: 1,
      title: "Privacy Policy",
      icon: <LockIcon className="h-6 w-6" />,
      description: "How we collect, use, and protect your personal information",
      lastUpdated: "2024-01-15",
      content: `
        <h3>Information We Collect</h3>
        <p>We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.</p>
        
        <h3>How We Use Your Information</h3>
        <p>We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.</p>
        
        <h3>Information Sharing</h3>
        <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>
      `
    },
    {
      id: 2,
      title: "Terms of Service",
      icon: <FileTextIcon className="h-6 w-6" />,
      description: "Terms and conditions for using AuditDNA services",
      lastUpdated: "2024-01-10",
      content: `
        <h3>Acceptance of Terms</h3>
        <p>By accessing and using AuditDNA services, you accept and agree to be bound by the terms and provision of this agreement.</p>
        
        <h3>Service Description</h3>
        <p>AuditDNA provides AI-powered audit and compliance services to help organizations meet regulatory requirements.</p>
        
        <h3>User Responsibilities</h3>
        <p>You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>
      `
    },
    {
      id: 3,
      title: "Data Protection Policy",
      icon: <ShieldCheckIcon className="h-6 w-6" />,
      description: "Our commitment to protecting your data and ensuring compliance",
      lastUpdated: "2024-01-20",
      content: `
        <h3>Data Security</h3>
        <p>We implement appropriate technical and organizational measures to protect your data against unauthorized access, alteration, disclosure, or destruction.</p>
        
        <h3>Data Retention</h3>
        <p>We retain your personal information only for as long as necessary to provide our services and comply with legal obligations.</p>
        
        <h3>Your Rights</h3>
        <p>You have the right to access, update, or delete your personal information, and to request that we restrict or stop processing your data.</p>
      `
    },
    {
      id: 4,
      title: "Cookie Policy",
      icon: <GlobeIcon className="h-6 w-6" />,
      description: "How we use cookies and similar technologies",
      lastUpdated: "2024-01-05",
      content: `
        <h3>What Are Cookies</h3>
        <p>Cookies are small text files that are stored on your device when you visit our website.</p>
        
        <h3>How We Use Cookies</h3>
        <p>We use cookies to improve your browsing experience, analyze site traffic, and personalize content.</p>
        
        <h3>Managing Cookies</h3>
        <p>You can control and manage cookies through your browser settings. However, disabling cookies may affect the functionality of our services.</p>
      `
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          📋 Policies & Legal
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Important information about how we operate and protect your data
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Policy List */}
        <div className="space-y-4">
          {policies.map((policy) => (
            <div
              key={policy.id}
              className={`card p-4 cursor-pointer transition-all ${
                selectedPolicy?.id === policy.id 
                  ? 'ring-2 ring-blue-500 bg-blue-50' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedPolicy(policy)}
            >
              <div className="flex items-start gap-3">
                <div className="text-blue-600 mt-1">
                  {policy.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {policy.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {policy.description}
                  </p>
                  <p className="text-xs text-gray-500">
                    Last updated: {new Date(policy.lastUpdated).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Policy Content */}
        <div className="card p-6">
          {selectedPolicy ? (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="text-blue-600">
                  {selectedPolicy.icon}
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {selectedPolicy.title}
                </h2>
              </div>
              
              <div className="prose prose-sm max-w-none">
                <div dangerouslySetInnerHTML={{ __html: selectedPolicy.content }} />
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Last updated: {new Date(selectedPolicy.lastUpdated).toLocaleDateString()}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <FileTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Select a Policy
              </h3>
              <p className="text-gray-600">
                Choose a policy from the list to view its details
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Contact Section */}
      <div className="card p-6 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Questions About Our Policies?
          </h3>
          <p className="text-gray-600 mb-4">
            Contact our legal team for clarification or concerns
          </p>
          <button className="btn-primary">
            Contact Legal Team
          </button>
        </div>
      </div>
    </div>
  );
}