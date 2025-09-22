import React from "react";

const policies = [
  {
    title: "Data Privacy",
    description: "AuditDNA is committed to protecting your personal and business information. All data is encrypted in transit and at rest, with access restricted to authorized personnel only. We comply with all applicable privacy regulations including GDPR and CCPA."
  },
  {
    title: "Service Transparency",
    description: "All fees, terms, and audit procedures are disclosed up front. You will never be charged hidden fees or surprise costs. Detailed reports are provided for each engagement."
  },
  {
    title: "Security Protocols",
    description: "Strict access controls, routine security audits, and continuous monitoring protect your data. Our platform undergoes regular third-party penetration testing."
  },
  {
    title: "Client Rights",
    description: "You have the right to access, correct, or delete your information at any time. Contact support@auditdna.com for assistance with your data or account."
  },
  {
    title: "Terms of Engagement",
    description: "AuditDNA services are provided subject to our standard service agreement, which defines scope, limitations, and mutual responsibilities."
  }
];

export default function Policies() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-100/40 to-green-100/40 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">AuditDNA Policies</h1>
        <p className="text-gray-600">
          Review our core policies on privacy, transparency, security, and your rights as a client.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {policies.map((policy, idx) => (
          <div key={idx} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">{policy.title}</h2>
            <p className="text-gray-700">{policy.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}