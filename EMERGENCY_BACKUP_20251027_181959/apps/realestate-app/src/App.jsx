import React from 'react';
import { Routes, Route } from 'react-router-dom';

function PropertySearch() {
  return (
    <div className='p-8'>
      <h1 className='text-4xl font-bold mb-4'>Property Search</h1>
      <p>Property search coming soon...</p>
    </div>
  );
}

export default function RealEstateApp() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='bg-green-900 text-white p-4'>
        <h1 className='text-2xl font-bold'> Real Estate Module</h1>
      </div>
      <Routes>
        <Route path='/' element={<h2 className='p-8 text-3xl'>Real Estate Dashboard</h2>} />
        <Route path='/search' element={<PropertySearch />} />
      </Routes>
    </div>
  );
}
