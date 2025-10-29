import React from 'react';
import { Routes, Route } from 'react-router-dom';

function Factoring() {
  return (
    <div className='p-8'>
      <h1 className='text-4xl font-bold mb-4'>Invoice Factoring</h1>
      <p>Factoring module coming soon...</p>
    </div>
  );
}

function TradeFinance() {
  return (
    <div className='p-8'>
      <h1 className='text-4xl font-bold mb-4'>Trade Finance</h1>
      <p>Trade Finance module coming soon...</p>
    </div>
  );
}

export default function FinancialApp() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='bg-blue-900 text-white p-4'>
        <h1 className='text-2xl font-bold'> Financial Services Module</h1>
      </div>
      <Routes>
        <Route path='/' element={<h2 className='p-8 text-3xl'>Financial Dashboard</h2>} />
        <Route path='/factoring' element={<Factoring />} />
        <Route path='/trade-finance' element={<TradeFinance />} />
      </Routes>
    </div>
  );
}
