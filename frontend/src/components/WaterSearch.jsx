import React from 'react';

export default function WaterSearch() {
  return (
    <div className='p-4 bg-blue-50 rounded-lg'>
      <h3 className='text-lg font-bold mb-2'>Water Search</h3>
      <input type='text' placeholder='Search water resources...' className='w-full p-2 border rounded' />
    </div>
  );
}
