import React from 'react';
import { Routes, Route } from 'react-router-dom';

function ComplianceDashboard() {
  return (
    <div className='p-8'>
      <h1 className='text-4xl font-bold mb-4'>Compliance Dashboard</h1>
      <p>AuditDNA compliance tools coming soon...</p>
    </div>
  );
}

export default function ComplianceModule() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='bg-purple-900 text-white p-4'>
        <h1 className='text-2xl font-bold'> Compliance Module</h1>
      </div>
      <Routes>
        <Route path='/' element={<ComplianceDashboard />} />
      </Routes>
    </div>
  );
}
