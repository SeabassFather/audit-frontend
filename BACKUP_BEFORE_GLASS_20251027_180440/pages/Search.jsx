import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Search() {
  const navigate = useNavigate();
  const routerLocation = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Mock search results
    setSearchResults([
      { id: 1, title: 'Financial Services', path: '/financial', type: 'Module' },
      { id: 2, title: 'Real Estate', path: '/real-estate', type: 'Module' },
      { id: 3, title: 'Agriculture', path: '/agriculture', type: 'Module' },
    ].filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase())));
  };

  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-4xl font-bold mb-8'>Search</h1>
        <form onSubmit={handleSearch} className='mb-8'>
          <input
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Search modules, features, documents...'
            className='w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none'
          />
          <button
            type='submit'
            className='mt-4 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold'
          >
            Search
          </button>
        </form>
        {searchResults.length > 0 && (
          <div className='space-y-4'>
            <h2 className='text-2xl font-bold mb-4'>Results ({searchResults.length})</h2>
            {searchResults.map(result => (
              <div
                key={result.id}
                onClick={() => navigate(result.path)}
                className='bg-white p-6 rounded-lg shadow hover:shadow-lg cursor-pointer'
              >
                <h3 className='text-xl font-bold'>{result.title}</h3>
                <p className='text-gray-600'>{result.type}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
