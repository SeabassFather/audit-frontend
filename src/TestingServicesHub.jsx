import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { useCart } from './CartContext';
import audioSystem from './audioSystem';

const TestingServicesHub = () => {
  const { language } = useLanguage();
  const { addToCart, cart, getTotal } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // COMPLETE ANALYSIS CATALOG - ALL MODULES COMBINED
  const allAnalyses = [
    // WATER (24 analyses)
    { id: 'WAT-001', name: 'E.coli Detection', category: 'Water', analysisPrice: 45, turnaround: '2d' },
    { id: 'WAT-002', name: 'Total Coliform', category: 'Water', analysisPrice: 40, turnaround: '2d' },
    { id: 'WAT-003', name: 'Lead Content', category: 'Water', analysisPrice: 55, turnaround: '3d' },
    { id: 'WAT-004', name: 'Copper Analysis', category: 'Water', analysisPrice: 50, turnaround: '2d' },
    { id: 'WAT-005', name: 'Chlorine Residual', category: 'Water', analysisPrice: 35, turnaround: '1d' },
    { id: 'WAT-006', name: 'pH Level', category: 'Water', analysisPrice: 30, turnaround: '1d' },
    { id: 'WAT-007', name: 'Turbidity', category: 'Water', analysisPrice: 35, turnaround: '1d' },
    { id: 'WAT-008', name: 'TDS (Total Dissolved Solids)', category: 'Water', analysisPrice: 40, turnaround: '1d' },
    { id: 'WAT-009', name: 'Hardness (Ca+Mg)', category: 'Water', analysisPrice: 45, turnaround: '2d' },
    { id: 'WAT-010', name: 'Iron Content', category: 'Water', analysisPrice: 50, turnaround: '2d' },
    { id: 'WAT-011', name: 'Manganese', category: 'Water', analysisPrice: 50, turnaround: '2d' },
    { id: 'WAT-012', name: 'Nitrate/Nitrite', category: 'Water', analysisPrice: 50, turnaround: '2d' },
    { id: 'WAT-013', name: 'Arsenic Detection', category: 'Water', analysisPrice: 60, turnaround: '3d' },
    { id: 'WAT-014', name: 'Fluoride Level', category: 'Water', analysisPrice: 40, turnaround: '2d' },
    { id: 'WAT-015', name: 'Sulfate', category: 'Water', analysisPrice: 40, turnaround: '2d' },
    { id: 'WAT-016', name: 'BOD (Biochemical Oxygen Demand)', category: 'Water', analysisPrice: 65, turnaround: '5d' },
    { id: 'WAT-017', name: 'COD (Chemical Oxygen Demand)', category: 'Water', analysisPrice: 60, turnaround: '3d' },
    { id: 'WAT-018', name: 'TSS (Total Suspended Solids)', category: 'Water', analysisPrice: 55, turnaround: '2d' },
    { id: 'WAT-019', name: 'Ammonia Nitrogen', category: 'Water', analysisPrice: 55, turnaround: '2d' },
    { id: 'WAT-020', name: 'Total Phosphorus', category: 'Water', analysisPrice: 55, turnaround: '3d' },
    { id: 'WAT-021', name: 'Oil & Grease', category: 'Water', analysisPrice: 70, turnaround: '3d' },
    { id: 'WAT-022', name: 'Heavy Metals Panel', category: 'Water', analysisPrice: 125, turnaround: '4d' },
    { id: 'WAT-023', name: 'Fecal Coliform', category: 'Water', analysisPrice: 60, turnaround: '2d' },
    { id: 'WAT-024', name: 'Phenols', category: 'Water', analysisPrice: 70, turnaround: '3d' },

    // SOIL (8 analyses)
    { id: 'SOIL-001', name: 'NPK Analysis', category: 'Soil', analysisPrice: 75, turnaround: '2d' },
    { id: 'SOIL-002', name: 'pH Level', category: 'Soil', analysisPrice: 40, turnaround: '1d' },
    { id: 'SOIL-003', name: 'Organic Matter', category: 'Soil', analysisPrice: 60, turnaround: '2d' },
    { id: 'SOIL-004', name: 'CEC (Cation Exchange Capacity)', category: 'Soil', analysisPrice: 70, turnaround: '2d' },
    { id: 'SOIL-005', name: 'Calcium', category: 'Soil', analysisPrice: 45, turnaround: '2d' },
    { id: 'SOIL-006', name: 'Magnesium', category: 'Soil', analysisPrice: 45, turnaround: '2d' },
    { id: 'SOIL-007', name: 'Sulfur', category: 'Soil', analysisPrice: 55, turnaround: '2d' },
    { id: 'SOIL-008', name: 'Micronutrients Panel', category: 'Soil', analysisPrice: 95, turnaround: '3d' },

    // ALCOHOL (5 analyses)
    { id: 'ALC-001', name: 'Ethanol Content (ABV)', category: 'Alcohol', analysisPrice: 45, turnaround: '2d' },
    { id: 'ALC-002', name: 'Methanol Detection', category: 'Alcohol', analysisPrice: 65, turnaround: '3d' },
    { id: 'ALC-003', name: 'Sugar Content', category: 'Alcohol', analysisPrice: 40, turnaround: '2d' },
    { id: 'ALC-004', name: 'pH Level', category: 'Alcohol', analysisPrice: 30, turnaround: '1d' },
    { id: 'ALC-005', name: 'Acidity (TA)', category: 'Alcohol', analysisPrice: 35, turnaround: '2d' },

    // ENGINE (3 analyses)
    { id: 'ENG-001', name: 'Oil Viscosity', category: 'Engine', analysisPrice: 55, turnaround: '2d' },
    { id: 'ENG-002', name: 'TBN (Total Base Number)', category: 'Engine', analysisPrice: 60, turnaround: '2d' },
    { id: 'ENG-003', name: 'Wear Metals Panel', category: 'Engine', analysisPrice: 125, turnaround: '3d' },

    // FUEL (3 analyses)
    { id: 'FUEL-001', name: 'Cetane Number', category: 'Fuel', analysisPrice: 95, turnaround: '3d' },
    { id: 'FUEL-002', name: 'Cloud Point', category: 'Fuel', analysisPrice: 55, turnaround: '2d' },
    { id: 'FUEL-003', name: 'Sulfur Content', category: 'Fuel', analysisPrice: 75, turnaround: '3d' }
  ];

  const categories = [
    { id: 'all', name: language === 'es' ? 'Todos los Análisis' : 'All Analyses', count: allAnalyses.length },
    { id: 'Water', name: language === 'es' ? 'Agua' : 'Water', count: allAnalyses.filter(t => t.category === 'Water').length },
    { id: 'Soil', name: language === 'es' ? 'Suelo' : 'Soil', count: allAnalyses.filter(t => t.category === 'Soil').length },
    { id: 'Alcohol', name: language === 'es' ? 'Alcohol' : 'Alcohol', count: allAnalyses.filter(t => t.category === 'Alcohol').length },
    { id: 'Engine', name: language === 'es' ? 'Motor' : 'Engine', count: allAnalyses.filter(t => t.category === 'Engine').length },
    { id: 'Fuel', name: language === 'es' ? 'Combustible' : 'Fuel', count: allAnalyses.filter(t => t.category === 'Fuel').length }
  ];

  const filteredAnalyses = allAnalyses
    .filter(t => selectedCategory === 'all' || t.category === selectedCategory)
    .filter(t => !searchQuery || t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.id.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '2rem', color: '#fff' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        <h1 style={{ fontSize: '3rem', textAlign: 'center', color: '#f97316', marginBottom: '1rem' }}>
          {language === 'es' ? 'Catálogo de Análisis' : 'Analysis Catalog'}
        </h1>

        {/* SEARCH */}
        <input
          type="text"
          placeholder={language === 'es' ? 'Buscar análisis...' : 'Search analyses...'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '100%', maxWidth: '600px', padding: '1rem', background: 'rgba(30, 41, 59, 0.6)', border: '2px solid #334155', borderRadius: '12px', color: '#fff', fontSize: '1rem', margin: '0 auto 2rem', display: 'block' }}
        />

        {/* CATEGORY FILTERS */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => { setSelectedCategory(cat.id); audioSystem.playClick(); }}
              style={{
                padding: '0.8rem 1.5rem',
                background: selectedCategory === cat.id ? '#10b981' : 'rgba(30, 41, 59, 0.6)',
                border: '2px solid ' + (selectedCategory === cat.id ? '#10b981' : '#334155'),
                borderRadius: '12px',
                color: '#fff',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginBottom: '2rem', color: '#10b981', fontSize: '1.2rem' }}>
          {language === 'es' ? 'Mostrando' : 'Showing'} {filteredAnalyses.length} {language === 'es' ? 'análisis' : 'analyses'}
        </div>

        {/* ANALYSES GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {filteredAnalyses.map(analysis => (
            <div key={analysis.id} style={{ background: 'rgba(30, 41, 59, 0.6)', border: '2px solid rgba(16, 185, 129, 0.3)', borderRadius: '15px', padding: '1.5rem' }}>
              <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.5rem' }}>{analysis.category}</div>
              <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>{analysis.id}</div>
              <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1rem', fontWeight: 'bold', minHeight: '2.5rem' }}>{analysis.name}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.5rem', color: '#10b981', fontWeight: 'bold' }}>${analysis.analysisPrice}</span>
                <span style={{ color: '#94a3b8' }}>{analysis.turnaround}</span>
              </div>
              <button 
                onClick={() => { 
                  addToCart({...analysis, price: analysis.analysisPrice, name: analysis.name, id: analysis.id}); 
                  audioSystem.playSuccess(); 
                }} 
                style={{ width: '100%', padding: '0.8rem', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', border: 'none', borderRadius: '10px', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}
              >
                🛒 {language === 'es' ? 'Añadir' : 'Add'}
              </button>
            </div>
          ))}
        </div>

      </div>

      {cart.length > 0 && (
        <div onClick={() => navigate('/cart')} style={{ position: 'fixed', bottom: '2rem', right: '2rem', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', border: '3px solid #10b981', borderRadius: '20px', padding: '1.5rem', minWidth: '200px', cursor: 'pointer', zIndex: 9999, textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem' }}>🛒</div>
          <div style={{ color: '#fff', fontWeight: 'bold' }}>{cart.length} {language === 'es' ? 'análisis' : 'analyses'}</div>
          <div style={{ fontSize: '1.8rem', color: '#fff', fontWeight: 'bold' }}>${getTotal().toFixed(2)}</div>
        </div>
      )}
    </div>
  );
};

export default TestingServicesHub;


