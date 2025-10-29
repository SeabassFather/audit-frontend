import React, { useState } from "react";
import AgreementViewer from "../components/AgreementViewer";

export default function PartnerAgreementsPage() {
  const [selectedAgreement, setSelectedAgreement] = useState(null);
  
  const agreements = [
    {
      id: "nda-001",
      title: "Non-Disclosure Agreement",
      description: "Standard NDA for partners and service providers",
      status: "active",
      lastUpdated: "2024-01-15"
    },
    {
      id: "service-001", 
      title: "Service Level Agreement",
      description: "SLA defining service standards and expectations",
      status: "active",
      lastUpdated: "2024-01-20"
    },
    {
      id: "data-001",
      title: "Data Processing Agreement",
      description: "Agreement for data handling and privacy compliance",
      status: "active", 
      lastUpdated: "2024-02-01"
    }
  ];

  if (selectedAgreement) {
    return (
      <AgreementViewer 
        agreementId={selectedAgreement}
        onAccept={(data) => {
          console.log('Agreement accepted:', data);
          setSelectedAgreement(null);
        }}
        onDecline={(data) => {
          console.log('Agreement declined:', data);
          setSelectedAgreement(null);
        }}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Partner Agreements</h1>
        <p className="text-gray-600">
          Review and manage partnership agreements, NDAs, and service contracts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agreements.map((agreement) => (
          <div key={agreement.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{agreement.title}</h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                agreement.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {agreement.status}
              </span>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">{agreement.description}</p>
            
            <div className="text-xs text-gray-500 mb-4">
              Last updated: {new Date(agreement.lastUpdated).toLocaleDateString()}
            </div>
            
            <button
              onClick={() => setSelectedAgreement(agreement.id)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-medium"
            >
              View Agreement
            </button>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-xl font-bold text-blue-900 mb-4">Agreement Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">3</div>
            <div className="text-sm text-blue-800">Active Agreements</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">15</div>
            <div className="text-sm text-blue-800">Signed This Month</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600 mb-2">2</div>
            <div className="text-sm text-blue-800">Pending Signatures</div>
          </div>
        </div>
      </div>
    </div>
  );
}