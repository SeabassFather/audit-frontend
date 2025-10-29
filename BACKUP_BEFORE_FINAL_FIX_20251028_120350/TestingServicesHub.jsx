import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import audioSystem from './audioSystem';

function TestingServicesHub() {
  const [currentStep, setCurrentStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTests, setSelectedTests] = useState([]);
  const [filteredTests, setFilteredTests] = useState([]);
  const { language } = useLanguage();

  const waterTests = [
    { id: 'WAT-001', name: 'E.coli Detection', category: 'Water', price: 85, turnaround: 2 },
    { id: 'WAT-002', name: 'Total Coliform', category: 'Water', price: 75, turnaround: 2 },
    { id: 'WAT-003', name: 'Lead Content', category: 'Water', price: 95, turnaround: 3 },
    { id: 'WAT-004', name: 'Copper Analysis', category: 'Water', price: 90, turnaround: 3 },
    { id: 'WAT-005', name: 'Chlorine Residual', category: 'Water', price: 60, turnaround: 1 },
    { id: 'WAT-006', name: 'pH Level', category: 'Water', price: 50, turnaround: 1 },
    { id: 'WAT-007', name: 'Turbidity', category: 'Water', price: 55, turnaround: 1 },
    { id: 'WAT-008', name: 'Nitrate/Nitrite', category: 'Water', price: 85, turnaround: 2 },
    { id: 'WAT-009', name: 'Arsenic Detection', category: 'Water', price: 110, turnaround: 3 },
    { id: 'WAT-010', name: 'Fluoride Level', category: 'Water', price: 70, turnaround: 2 },
    { id: 'WAT-011', name: 'Hardness', category: 'Water', price: 80, turnaround: 2 },
    { id: 'WAT-012', name: 'Iron Content', category: 'Water', price: 75, turnaround: 2 },
    { id: 'WAT-013', name: 'Manganese', category: 'Water', price: 75, turnaround: 2 },
    { id: 'WAT-014', name: 'Sulfate', category: 'Water', price: 70, turnaround: 2 },
    { id: 'WAT-015', name: 'TDS', category: 'Water', price: 65, turnaround: 1 },
    { id: 'WAT-016', name: 'BOD', category: 'Water', price: 95, turnaround: 5 },
    { id: 'WAT-017', name: 'COD', category: 'Water', price: 90, turnaround: 3 },
    { id: 'WAT-018', name: 'TSS', category: 'Water', price: 80, turnaround: 2 },
    { id: 'WAT-019', name: 'Ammonia Nitrogen', category: 'Water', price: 85, turnaround: 2 },
    { id: 'WAT-020', name: 'Total Phosphorus', category: 'Water', price: 90, turnaround: 3 },
    { id: 'WAT-021', name: 'Oil & Grease', category: 'Water', price: 105, turnaround: 3 },
    { id: 'WAT-022', name: 'Fecal Coliform', category: 'Water', price: 85, turnaround: 2 },
    { id: 'WAT-023', name: 'Heavy Metals Panel', category: 'Water', price: 150, turnaround: 4 },
    { id: 'WAT-024', name: 'Phenols', category: 'Water', price: 110, turnaround: 3 },
    { id: 'WAT-025', name: 'Cyanide', category: 'Water', price: 120, turnaround: 3 },
    { id: 'WAT-026', name: 'Sulfide', category: 'Water', price: 95, turnaround: 2 },
    { id: 'WAT-027', name: 'Chloride', category: 'Water', price: 75, turnaround: 2 },
    { id: 'WAT-028', name: 'Algae ID', category: 'Water', price: 125, turnaround: 4 },
    { id: 'WAT-029', name: 'Dissolved Oxygen', category: 'Water', price: 70, turnaround: 1 },
    { id: 'WAT-030', name: 'Conductivity', category: 'Water', price: 60, turnaround: 1 },
    { id: 'WAT-031', name: 'Pesticide Screen', category: 'Water', price: 175, turnaround: 5 },
    { id: 'WAT-032', name: 'Herbicide Screen', category: 'Water', price: 175, turnaround: 5 },
    { id: 'WAT-033', name: 'Microcystin Toxin', category: 'Water', price: 140, turnaround: 4 },
    { id: 'WAT-034', name: 'Phosphate', category: 'Water', price: 80, turnaround: 2 },
    { id: 'WAT-035', name: 'Sediment Analysis', category: 'Water', price: 110, turnaround: 3 },
    { id: 'WAT-036', name: 'VOCs', category: 'Water', price: 185, turnaround: 5 },
    { id: 'WAT-037', name: 'BTEX', category: 'Water', price: 165, turnaround: 4 },
    { id: 'WAT-038', name: 'Petroleum Hydrocarbons', category: 'Water', price: 155, turnaround: 4 },
    { id: 'WAT-039', name: 'MTBE Detection', category: 'Water', price: 130, turnaround: 3 },
    { id: 'WAT-040', name: 'Perchlorate', category: 'Water', price: 135, turnaround: 4 },
    { id: 'WAT-041', name: 'Chromium-6', category: 'Water', price: 125, turnaround: 3 },
    { id: 'WAT-042', name: 'Radon', category: 'Water', price: 145, turnaround: 4 },
    { id: 'WAT-043', name: 'Uranium', category: 'Water', price: 140, turnaround: 4 },
    { id: 'WAT-044', name: 'Methane', category: 'Water', price: 115, turnaround: 3 },
    { id: 'WAT-045', name: 'Sulfur Bacteria', category: 'Water', price: 95, turnaround: 3 },
    { id: 'WAT-046', name: 'Iron Bacteria', category: 'Water', price: 95, turnaround: 3 },
    { id: 'WAT-047', name: 'Electrical Conductivity', category: 'Water', price: 60, turnaround: 1 },
    { id: 'WAT-048', name: 'Alkalinity', category: 'Water', price: 70, turnaround: 2 },
    { id: 'WAT-049', name: 'Calcium Hardness', category: 'Water', price: 75, turnaround: 2 },
    { id: 'WAT-050', name: 'Magnesium Content', category: 'Water', price: 75, turnaround: 2 }
  ];

  const soilTests = Array.from({length: 40}, (_, i) => ({
    id: `SOIL-${String(i+1).padStart(3, '0')}`,
    name: `Soil Test ${i+1}`,
    category: 'Soil',
    price: 65 + Math.floor(Math.random() * 50),
    turnaround: 2 + Math.floor(Math.random() * 4)
  }));

  const alcoholTests = Array.from({length: 25}, (_, i) => ({
    id: `ALC-${String(i+1).padStart(3, '0')}`,
    name: `Alcohol Test ${i+1}`,
    category: 'Alcohol',
    price: 75 + Math.floor(Math.random() * 60),
    turnaround: 2 + Math.floor(Math.random() * 3)
  }));

  const engineTests = Array.from({length: 20}, (_, i) => ({
    id: `ENG-${String(i+1).padStart(3, '0')}`,
    name: `Engine Test ${i+1}`,
    category: 'Engine',
    price: 85 + Math.floor(Math.random() * 70),
    turnaround: 2 + Math.floor(Math.random() * 4)
  }));

  const fuelTests = Array.from({length: 30}, (_, i) => ({
    id: `FUEL-${String(i+1).padStart(3, '0')}`,
    name: `Fuel Test ${i+1}`,
    category: 'Fuel',
    price: 70 + Math.floor(Math.random() * 55),
    turnaround: 1 + Math.floor(Math.random() * 4)
  }));

  const allTests = [...waterTests, ...soilTests, ...alcoholTests, ...engineTests, ...fuelTests];

  const categories = [
    { id: 'all', name: 'All Tests', count: allTests.length },
    { id: 'Water', name: 'Water', count: 50 },
    { id: 'Soil', name: 'Soil', count: 40 },
    { id: 'Alcohol', name: 'Alcohol', count: 25 },
    { id: 'Engine', name: 'Engine', count: 20 },
    { id: 'Fuel', name: 'Fuel', count: 30 }
  ];

  useEffect(() => {
    let results = allTests;
    
    if (selectedCategory !== 'all') {
      results = results.filter(test => test.category === selectedCategory);
    }
    
    if (searchTerm) {
      results = results.filter(test => 
        test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredTests(results);
  }, [searchTerm, selectedCategory]);

  const addToCart = (test) => {
    audioSystem.playSuccess();
    setSelectedTests([...selectedTests, test]);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '2rem', color: '#fff' }}>
      <h1 style={{ fontSize: '2.5rem', color: '#f97316', marginBottom: '2rem' }}>Browse Test Catalog</h1>

      <input
        type="text"
        placeholder="Search tests by name, category, or ID..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          padding: '1rem',
          background: 'rgba(30, 41, 59, 0.8)',
          border: '2px solid #334155',
          borderRadius: '10px',
          color: '#fff',
          fontSize: '1rem',
          marginBottom: '2rem'
        }}
      />

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              audioSystem.playClick();
              setSelectedCategory(cat.id);
            }}
            style={{
              padding: '0.8rem 1.5rem',
              background: selectedCategory === cat.id ? '#10b981' : 'rgba(30, 41, 59, 0.6)',
              border: `2px solid ${selectedCategory === cat.id ? '#10b981' : '#334155'}`,
              borderRadius: '25px',
              color: '#fff',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {cat.name} ({cat.count})
          </button>
        ))}
      </div>

      <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', borderRadius: '10px', marginBottom: '2rem', color: '#10b981' }}>
        Showing {filteredTests.length} tests
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {filteredTests.map((test) => (
          <div key={test.id} style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '12px', padding: '1.5rem' }}>
            <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.5rem' }}>{test.category}</div>
            <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1rem' }}>{test.name}</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ color: '#10b981', fontSize: '1.3rem', fontWeight: 'bold' }}>${test.price}</span>
              <span style={{ color: '#94a3b8' }}>{test.turnaround}d</span>
            </div>
            <button
              onClick={() => addToCart(test)}
              style={{
                width: '100%',
                padding: '0.8rem',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              + Add
            </button>
          </div>
        ))}
      </div>

      {selectedTests.length > 0 && (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', background: 'rgba(15, 23, 42, 0.95)', border: '2px solid #10b981', borderRadius: '20px', padding: '1.5rem', minWidth: '300px' }}>
          <h3 style={{ color: '#10b981', marginBottom: '1rem' }}>?? Cart ({selectedTests.length})</h3>
          <div style={{ fontSize: '2rem', color: '#10b981', fontWeight: 'bold' }}>
            ${selectedTests.reduce((sum, t) => sum + t.price, 0)}
          </div>
        </div>
      )}
    </div>
  );
}

export default TestingServicesHub;
