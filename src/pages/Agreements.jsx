import React, { useState, useEffect } from 'react';
import { PlusIcon, FileTextIcon, CalendarIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';

export default function Agreements() {
  const [agreements, setAgreements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Simulate loading agreements data
    setTimeout(() => {
      setAgreements([
        {
          id: 1,
          title: "Master Service Agreement - AcmeCorp",
          type: "MSA",
          status: "Active",
          startDate: "2024-01-15",
          endDate: "2025-01-15",
          value: "$250,000",
          parties: ["AuditDNA", "AcmeCorp LLC"]
        },
        {
          id: 2,
          title: "Compliance Audit Contract - TechStart",
          type: "Service",
          status: "Pending",
          startDate: "2024-02-01",
          endDate: "2024-08-01",
          value: "$75,000",
          parties: ["AuditDNA", "TechStart Inc"]
        },
        {
          id: 3,
          title: "Data Processing Agreement - MedCorp",
          type: "DPA",
          status: "Expired",
          startDate: "2023-06-01",
          endDate: "2024-06-01",
          value: "$125,000",
          parties: ["AuditDNA", "MedCorp Health"]
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredAgreements = agreements.filter(agreement => {
    if (filter === 'all') return true;
    return agreement.status.toLowerCase() === filter.toLowerCase();
  });

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <CalendarIcon className="h-5 w-5 text-yellow-500" />;
      case 'expired':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <FileTextIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading agreements...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agreements</h1>
          <p className="text-gray-600 mt-2">Manage contracts and legal agreements</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <PlusIcon className="h-5 w-5" />
          New Agreement
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {['all', 'active', 'pending', 'expired'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                filter === status
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {status}
            </button>
          ))}
        </nav>
      </div>

      {/* Agreements List */}
      <div className="space-y-4">
        {filteredAgreements.map((agreement) => (
          <div key={agreement.id} className="card p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <FileTextIcon className="h-5 w-5 text-gray-400" />
                  <h3 className="text-lg font-semibold text-gray-900">{agreement.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(agreement.status)}`}>
                    {agreement.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-gray-500">Type</p>
                    <p className="font-medium">{agreement.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Value</p>
                    <p className="font-medium">{agreement.value}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Start Date</p>
                    <p className="font-medium">{new Date(agreement.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">End Date</p>
                    <p className="font-medium">{new Date(agreement.endDate).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Parties</p>
                  <p className="font-medium">{agreement.parties.join(' • ')}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                {getStatusIcon(agreement.status)}
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAgreements.length === 0 && (
        <div className="text-center py-12">
          <FileTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No agreements found for "{filter}" status</p>
        </div>
      )}
    </div>
  );
}