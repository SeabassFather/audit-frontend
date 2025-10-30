import React, { useState, useMemo } from 'react';
import { waterTestCatalog } from './waterTestCatalog';
import { soilTestCatalog } from './soilTestCatalog';
import { alcoholTestCatalog } from './alcoholTestCatalog';
import { fuelOilTestCatalog } from './fuelOilTestCatalog';
import { engineTestCatalog } from './engineTestCatalog';

function SearchableTestSelector({ onSelectTests }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedModule, setSelectedModule] = useState('all');
  const [selectedTests, setSelectedTests] = useState([]);

  // Combine all test catalogs
  const allTests = useMemo(() => {
    return [
      ...waterTestCatalog.map(t => ({ ...t, module: 'water' })),
      ...soilTestCatalog.map(t => ({ ...t, module: 'soil' })),
      ...alcoholTestCatalog.map(t => ({ ...t, module: 'alcohol' })),
      ...fuelOilTestCatalog.map(t => ({ ...t, module: 'fuel' })),
      ...engineTestCatalog.map(t => ({ ...t, module: 'engine' }))
    ];
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    return ['all', ...new Set(allTests.map(t => t.category))];
  }, [allTests]);

  // Get unique modules
  const modules = [
    { id: 'all', name: 'All Tests', color: '#38bdf8' },
    { id: 'water', name: 'Water (50)', color: '#06b6d4' },
    { id: 'soil', name: 'Soil (40)', color: '#4ade80' },
    { id: 'alcohol', name: 'Alcohol (25)', color: '#facc15' },
    { id: 'fuel', name: 'Fuel (30)', color: '#94a3b8' },
    { id: 'engine', name: 'Engine (20)', color: '#8b5cf6' }
  ];

  // Filter tests
  const filteredTests = useMemo(() => {
    return allTests.filter(test => {
      const matchesSearch = test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           test.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           test.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || test.category === selectedCategory;
      const matchesModule = selectedModule === 'all' || test.module === selectedModule;
      return matchesSearch && matchesCategory && matchesModule;
    });
  }, [allTests, searchTerm, selectedCategory, selectedModule]);

  const toggleTest = (testId) => {
    setSelectedTests(prev => 
      prev.includes(testId) 
        ? prev.filter(id => id !== testId)
        : [...prev, testId]
    );
  };

  const totalCost = useMemo(() => {
    return selectedTests.reduce((sum, testId) => {
      const test = allTests.find(t => t.id === testId);
      return sum + (test ? test.price : 0);
    }, 0);
  }, [selectedTests, allTests]);

  const handleSubmit = () => {
    const tests = selectedTests.map(id => allTests.find(t => t.id === id));
    onSelectTests?.(tests);
  };

  return (
    <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ 
        background: 'rgba(30,41,59,0.6)', 
        backdropFilter: 'blur(16px)', 
        border: '1px solid rgba(56,189,248,0.3)', 
        borderRadius: '24px', 
        padding: '40px',
        marginBottom: '30px'
      }}>
        <h1 style={{ 
          fontSize: '48px', 
          fontWeight: 'bold', 
          background: 'linear-gradient(135deg, #38bdf8, #3b82f6)', 
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent', 
          marginBottom: '20px',
          textAlign: 'center'
        }}>
           Complete Test Catalog - 165 Tests
        </h1>
        <p style={{ fontSize: '18px', color: '#94a3b8', textAlign: 'center' }}>
          Search, filter, and select from our complete testing portfolio
        </p>
      </div>

      {/* Filters */}
      <div style={{ 
        background: 'rgba(30,41,59,0.6)', 
        backdropFilter: 'blur(16px)', 
        border: '1px solid rgba(56,189,248,0.3)', 
        borderRadius: '24px', 
        padding: '30px',
        marginBottom: '30px'
      }}>
        {/* Search Bar */}
        <div style={{ marginBottom: '24px' }}>
          <input
            type="text"
            placeholder=" Search tests by name, description, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '16px 20px',
              fontSize: '16px',
              background: 'rgba(15,23,42,0.6)',
              border: '2px solid rgba(56,189,248,0.4)',
              borderRadius: '12px',
              color: 'white',
              outline: 'none'
            }}
          />
        </div>

        {/* Module Filter */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '8px', display: 'block' }}>
            Filter by Module
          </label>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {modules.map(module => (
              <button
                key={module.id}
                onClick={() => setSelectedModule(module.id)}
                style={{
                  background: selectedModule === module.id 
                    ? module.color 
                    : 'rgba(30,41,59,0.4)',
                  color: 'white',
                  border: `2px solid ${selectedModule === module.id ? module.color : 'rgba(148,163,184,0.3)'}`,
                  borderRadius: '10px',
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                {module.name}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <label style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '8px', display: 'block' }}>
            Filter by Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: '12px 16px',
              fontSize: '14px',
              background: 'rgba(15,23,42,0.6)',
              border: '2px solid rgba(56,189,248,0.4)',
              borderRadius: '10px',
              color: 'white',
              cursor: 'pointer',
              minWidth: '200px'
            }}
          >
            <option value="all">All Categories</option>
            {categories.filter(c => c !== 'all').map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Results Count */}
        <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(56,189,248,0.1)', borderRadius: '10px', border: '1px solid rgba(56,189,248,0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#38bdf8', fontSize: '16px', fontWeight: '600' }}>
              {filteredTests.length} tests found | {selectedTests.length} selected
            </span>
            <span style={{ color: '#38bdf8', fontSize: '20px', fontWeight: '700' }}>
              Total: ${totalCost}
            </span>
          </div>
        </div>
      </div>

      {/* Test Results Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '20px',
        marginBottom: '30px'
      }}>
        {filteredTests.map(test => (
          <div
            key={test.id}
            onClick={() => toggleTest(test.id)}
            style={{
              background: selectedTests.includes(test.id) 
                ? 'rgba(56,189,248,0.2)' 
                : 'rgba(30,41,59,0.6)',
              backdropFilter: 'blur(16px)',
              border: selectedTests.includes(test.id)
                ? '2px solid rgba(56,189,248,0.6)'
                : '1px solid rgba(148,163,184,0.2)',
              borderRadius: '16px',
              padding: '24px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              transform: selectedTests.includes(test.id) ? 'scale(1.02)' : 'scale(1)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>
                  {test.id}  {test.module.toUpperCase()}
                </div>
                <div style={{ fontSize: '18px', fontWeight: '700', color: 'white', marginBottom: '8px' }}>
                  {test.name}
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', padding: '4px 10px', background: 'rgba(148,163,184,0.2)', borderRadius: '6px', display: 'inline-block', marginBottom: '8px' }}>
                  {test.category}
                </div>
              </div>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                background: selectedTests.includes(test.id) ? '#38bdf8' : 'transparent',
                border: '2px solid #38bdf8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '16px',
                fontWeight: 'bold',
                flexShrink: 0
              }}>
                {selectedTests.includes(test.id) && ''}
              </div>
            </div>
            <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '12px', lineHeight: '1.5' }}>
              {test.description}
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '20px', fontWeight: '700', color: '#38bdf8' }}>
                ${test.price}
              </span>
              <span style={{ fontSize: '13px', color: '#64748b' }}>
                {test.turnaround} days
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      {selectedTests.length > 0 && (
        <div style={{ 
          position: 'sticky', 
          bottom: '20px',
          background: 'rgba(30,41,59,0.95)', 
          backdropFilter: 'blur(20px)', 
          border: '2px solid rgba(56,189,248,0.4)', 
          borderRadius: '20px', 
          padding: '30px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
            <div>
              <div style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '4px' }}>
                {selectedTests.length} tests selected
              </div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#38bdf8' }}>
                Total: ${totalCost}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button
                onClick={() => setSelectedTests([])}
                style={{
                  background: 'rgba(148,163,184,0.2)',
                  color: '#cbd5e1',
                  border: '1px solid rgba(148,163,184,0.4)',
                  borderRadius: '12px',
                  padding: '16px 32px',
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                Clear All
              </button>
              <button
                onClick={handleSubmit}
                style={{
                  background: 'linear-gradient(135deg, #38bdf8, #0891b2)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '16px 40px',
                  fontSize: '18px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: '0 8px 25px rgba(56,189,248,0.4)',
                  transition: 'all 0.3s'
                }}
              >
                Add to Cart 
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchableTestSelector;
