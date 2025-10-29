import React from 'react';
import { Routes, Route } from 'react-router-dom';

export default function AnalyticsModule() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='bg-indigo-900 text-white p-4'>
        <h1 className='text-2xl font-bold'> Analytics Module</h1>
      </div>
      <Routes>
        <Route path='/' element={<h2 className='p-8 text-3xl'>Analytics Dashboard</h2>} />
      </Routes>
    </div>
  );
}
