import React from 'react';
import { Routes, Route } from 'react-router-dom';

function Marketplace() {
  return (
    <div className='p-8'>
      <h1 className='text-4xl font-bold mb-4'>Ag Marketplace</h1>
      <p>Marketplace coming soon...</p>
    </div>
  );
}

export default function AgricultureApp() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='bg-yellow-700 text-white p-4'>
        <h1 className='text-2xl font-bold'> Agriculture Module</h1>
      </div>
      <Routes>
        <Route path='/' element={<h2 className='p-8 text-3xl'>Agriculture Dashboard</h2>} />
        <Route path='/marketplace' element={<Marketplace />} />
      </Routes>
    </div>
  );
}
