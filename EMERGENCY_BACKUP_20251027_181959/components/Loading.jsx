import React from 'react';

export default function Loading({ module }) {
  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
      <div className='text-center'>
        <div className='animate-spin rounded-full h-16 w-16 border-b-4 border-green-500 mx-auto mb-4'></div>
        <h2 className='text-2xl font-bold text-gray-800'>
          Loading {module || 'Module'}...
        </h2>
        <p className='text-gray-600 mt-2'>Please wait</p>
      </div>
    </div>
  );
}
