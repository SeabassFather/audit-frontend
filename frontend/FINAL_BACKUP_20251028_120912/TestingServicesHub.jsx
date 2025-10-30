import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import audioSystem from './audioSystem';

function TestingServicesHub() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTests, setSelectedTests] = useState([]);
  const [filteredTests, setFilteredTests] = useState([]);
  const { language } = useLanguage();

  const fuelTests = [
    { id: 'FUEL-001', name: 'Diesel Fuel Quality', category: 'Fuel', price: 120, turnaround: 3 },
    { id: 'FUEL-002', name: 'Gasoline Octane Rating', category: 'Fuel', price: 81, turnaround: 4 },
    { id: 'FUEL-003', name: 'Biodiesel Blend Analysis', category: 'Fuel', price: 117, turnaround: 4 },
    { id: 'FUEL-004', name: 'Jet Fuel Contamination', category: 'Fuel', price: 93, turnaround: 1 },
    { id: 'FUEL-005', name: 'Fuel System Cleanliness', category: 'Fuel', price: 88, turnaround: 1 },
    { id: 'FUEL-006', name: 'Cetane Number', category: 'Fuel', price: 92, turnaround: 3 },
    { id: 'FUEL-007', name: 'Sulfur Content', category: 'Fuel', price: 90, turnaround: 4 },
    { id: 'FUEL-008', name: 'Flash Point', category: 'Fuel', price: 102, turnaround: 4 },
    { id: 'FUEL-009', name: 'Water & Sediment', category: 'Fuel', price: 111, turnaround: 1 },
    { id: 'FUEL-010', name: 'Cloud Point', category: 'Fuel', price: 110, turnaround: 3 },
    { id: 'FUEL-011', name: 'Pour Point', category: 'Fuel', price: 117, turnaround: 2 },
    { id: 'FUEL-012', name: 'Cold Filter Plugging', category: 'Fuel', price: 97, turnaround: 4 },
    { id: 'FUEL-013', name: 'Lubricity (HFRR)', category: 'Fuel', price: 72, turnaround: 1 },
    { id: 'FUEL-014', name: 'Viscosity', category: 'Fuel', price: 109, turnaround: 3 },
    { id: 'FUEL-015', name: 'Density/Specific Gravity', category: 'Fuel', price: 84, turnaround: 3 },
    { id: 'FUEL-016', name: 'Ash Content', category: 'Fuel', price: 114, turnaround: 2 },
    { id: 'FUEL-017', name: 'Carbon Residue', category: 'Fuel', price: 84, turnaround: 1 },
    { id: 'FUEL-018', name: 'Distillation Profile', category: 'Fuel', price: 110, turnaround: 2 },
    { id: 'FUEL-019', name: 'Aromatics Content', category: 'Fuel', price: 82, turnaround: 2 },
    { id: 'FUEL-020', name: 'Benzene Content', category: 'Fuel', price: 94, turnaround: 3 },
    { id: 'FUEL-021', name: 'Ethanol Content', category: 'Fuel', price: 93, turnaround: 2 },
    { id: 'FUEL-022', name: 'FAME Content', category: 'Fuel', price: 87, turnaround: 3 },
    { id: 'FUEL-023', name: 'Oxidation Stability', category: 'Fuel', price: 118, turnaround: 1 },
    { id: 'FUEL-024', name: 'Thermal Stability', category: 'Fuel', price: 94, turnaround: 2 },
    { id: 'FUEL-025', name: 'Corrosion Test', category: 'Fuel', price: 114, turnaround: 3 },
    { id: 'FUEL-026', name: 'Gum & Varnish', category: 'Fuel', price: 100, turnaround: 4 },
    { id: 'FUEL-027', name: 'Reid Vapor Pressure', category: 'Fuel', price: 117, turnaround: 4 },
    { id: 'FUEL-028', name: 'Particulate Matter', category: 'Fuel', price: 122, turnaround: 4 },
    { id: 'FUEL-029', name: 'Microbial Contamination', category: 'Fuel', price: 79, turnaround: 1 },
    { id: 'FUEL-030', name: 'Additive Package Analysis', category: 'Fuel', price: 94, turnaround: 3 }
  ];

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
    { id: 'WAT-011', name: 'Hardness (Ca/Mg)', category: 'Water', price: 80, turnaround: 2 },
    { id: 'WAT-012', name: 'Iron Content', category: 'Water', price: 75, turnaround: 2 },
    { id: 'WAT-013', name: 'Manganese', category: 'Water', price: 75, turnaround: 2 },
    { id: 'WAT-014', name: 'Sulfate', category: 'Water', price: 70, turnaround: 2 },
    { id: 'WAT-015', name: 'TDS (Total Dissolved Solids)', category: 'Water', price: 65, turnaround: 1 },
    { id: 'WAT-016', name: 'BOD (Biochemical Oxygen Demand)', category: 'Water', price: 95, turnaround: 5 },
    { id: 'WAT-017', name: 'COD (Chemical Oxygen Demand)', category: 'Water', price: 90, turnaround: 3 },
    { id: 'WAT-018', name: 'TSS (Total Suspended Solids)', category: 'Water', price: 80, turnaround: 2 },
    { id: 'WAT-019', name: 'Ammonia Nitrogen', category: 'Water', price: 85, turnaround: 2 },
    { id: 'WAT-020', name: 'Total Phosphorus', category: 'Water', price: 90, turnaround: 3 },
    { id: 'WAT-021', name: 'Oil & Grease', category: 'Water', price: 105, turnaround: 3 },
    { id: 'WAT-022', name: 'Fecal Coliform', category: 'Water', price: 85, turnaround: 2 },
    { id: 'WAT-023', name: 'Heavy Metals Panel', category: 'Water', price: 150, turnaround: 4 },
    { id: 'WAT-024', name: 'Phenols', category: 'Water', price: 110, turnaround: 3 },
    { id: 'WAT-025', name: 'Cyanide', category: 'Water', price: 120, turnaround: 3 },
    { id: 'WAT-026', name: 'Sulfide', category: 'Water', price: 95, turnaround: 2 },
    { id: 'WAT-027', name: 'Chloride', category: 'Water', price: 75, turnaround: 2 },
    { id: 'WAT-028', name: 'Algae Identification', category: 'Water', price: 125, turnaround: 4 },
    { id: 'WAT-029', name: 'Dissolved Oxygen', category: 'Water', price: 70, turnaround: 1 },
    { id: 'WAT-030', name: 'Conductivity', category: 'Water', price: 60, turnaround: 1 },
    { id: 'WAT-031', name: 'Pesticide Screen', category: 'Water', price: 175, turnaround: 5 },
    { id: 'WAT-032', name: 'Herbicide Screen', category: 'Water', price: 175, turnaround: 5 },
    { id: 'WAT-033', name: 'Microcystin Toxin', category: 'Water', price: 140, turnaround: 4 },
    { id: 'WAT-034', name: 'Phosphate', category: 'Water', price: 80, turnaround: 2 },
    { id: 'WAT-035', name: 'Sediment Analysis', category: 'Water', price: 110, turnaround: 3 },
    { id: 'WAT-036', name: 'VOCs Panel', category: 'Water', price: 185, turnaround: 5 },
    { id: 'WAT-037', name: 'BTEX Analysis', category: 'Water', price: 165, turnaround: 4 },
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
    name: ['Soil pH Test', 'NPK Analysis', 'Organic Matter %', 'CEC Test', 'Micronutrient Panel'][i % 5] + ` ${Math.floor(i/5) + 1}`,
    category: 'Soil',
    price: 65 + Math.floor(Math.random() * 50),
    turnaround: 2 + Math.floor(Math.random() * 4)
  }));

  const alcoholTests = Array.from({length: 25}, (_, i) => ({
    id: `ALC-${String(i+1).padStart(3, '0')}`,
    name: ['ABV Analysis', 'Methanol Detection', 'Congener Profile', 'Sugar Content', 'Acidity Test'][i % 5] + ` ${Math.floor(i/5) + 1}`,
    category: 'Alcohol',
    price: 75 + Math.floor(Math.random() * 60),
    turnaround: 2 + Math.floor(Math.random() * 3)
  }));

  const engineTests = Array.from({length: 20}, (_, i) => ({
    id: `ENG-${String(i+1).padStart(3, '0')}`,
    name: ['Oil Viscosity', 'Coolant Analysis', 'Wear Metals', 'Contamination Check', 'Additive Depletion'][i % 5] + ` ${Math.floor(i/5) + 1}`,
    category: 'Engine',
    price: 85 + Math.floor(Math.random() * 70),
    turnaround: 2 + Math.floor(Math.random() * 4)
  }));

  const allTests = [...waterTests, ...soilTests, ...alcoholTests, ...engineTests, ...fuelTests];

  const categories = [
    { id: 'all', name: 'All Tests', count: 165 },
    { id: 'Water', name: 'Water', count: 50 },
    { id: 'Soil', name: 'Soil', count: 40 },
    { id: 'Alcohol', name: 'Alcohol', count: 25 },
    { id: 'Engine', name: 'Engine', count: 20 },
    { id: 'Fuel', name: 'Fuel', count: 30 }
  ];

  useEffect(() => {
    let results = allTests;
    if (selectedCategory !== 'all') results = results.filter(t => t.category === selectedCategory);
    if (searchTerm) results = results.filter(t => 
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTests(results);
  }, [searchTerm, selectedCategory]);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '2rem', color: '#fff' }}>
      <h1 style={{ fontSize: '2.5rem', color: '#f97316', marginBottom: '2rem' }}>Browse Test Catalog</h1>
      <input type="text" placeholder="Search tests..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', padding: '1rem', background: 'rgba(30, 41, 59, 0.8)', border: '2px solid #334155', borderRadius: '10px', color: '#fff', fontSize: '1rem', marginBottom: '2rem' }} />
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button key={cat.id} onClick={() => { audioSystem.playClick(); setSelectedCategory(cat.id); }} style={{ padding: '0.8rem 1.5rem', background: selectedCategory === cat.id ? '#10b981' : 'rgba(30, 41, 59, 0.6)', border: `2px solid ${selectedCategory === cat.id ? '#10b981' : '#334155'}`, borderRadius: '25px', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
            {cat.name} ({cat.count})
          </button>
        ))}
      </div>
      <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', borderRadius: '10px', marginBottom: '2rem', color: '#10b981' }}>Showing {filteredTests.length} tests</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {filteredTests.map((test) => (
          <div key={test.id} style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '12px', padding: '1.5rem' }}>
            <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.5rem' }}>{test.category}</div>
            <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1rem', minHeight: '3rem' }}>{test.name}</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ color: '#10b981', fontSize: '1.3rem', fontWeight: 'bold' }}>${test.price}</span>
              <span style={{ color: '#94a3b8' }}>{test.turnaround}d</span>
            </div>
            <button onClick={() => { audioSystem.playSuccess(); setSelectedTests([...selectedTests, test]); }} style={{ width: '100%', padding: '0.8rem', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', border: 'none', borderRadius: '8px', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>+ Add</button>
          </div>
        ))}
      </div>
      {selectedTests.length > 0 && (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', background: 'rgba(15, 23, 42, 0.95)', border: '2px solid #10b981', borderRadius: '20px', padding: '1.5rem', minWidth: '300px' }}>
          <h3 style={{ color: '#10b981', marginBottom: '1rem' }}>?? Cart ({selectedTests.length})</h3>
          <div style={{ fontSize: '2rem', color: '#10b981', fontWeight: 'bold' }}>${selectedTests.reduce((sum, t) => sum + t.price, 0)}</div>
        </div>
      )}
    </div>
  );
}

export default TestingServicesHub;
