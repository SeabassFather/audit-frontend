import React from 'react';
import { Routes, Route } from 'react-router-dom';

export default function MexicoOpsModule() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='bg-red-700 text-white p-4'>
        <h1 className='text-2xl font-bold'> Mexico Operations Module</h1>
      </div>
      <Routes>
        <Route path='/' element={<h2 className='p-8 text-3xl'>Mexico Ops Dashboard</h2>} />
      </Routes>
    </div>
  );
}
