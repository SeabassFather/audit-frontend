import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import audioSystem from './audioSystem';

const AlcoholAnalysisModule = () => {
  const { language } = useLanguage();
  const [selectedTests, setSelectedTests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const alcoholTests = [
    { id: 'ALC-001', name: 'Ethanol Content (ABV)', category: 'Alcohol', price: 75, turnaround: 2 },
    { id: 'ALC-002', name: 'Methanol Detection', category: 'Alcohol', price: 95, turnaround: 3 },
    { id: 'ALC-003', name: 'Congener Analysis', category: 'Alcohol', price: 120, turnaround: 4 },
    { id: 'ALC-004', name: 'Sugar Content', category: 'Alcohol', price: 65, turnaround: 2 },
    { id: 'ALC-005', name: 'pH Level', category: 'Alcohol', price: 50, turnaround: 1 },
    { id: 'ALC-006', name: 'Acidity (TA)', category: 'Alcohol', price: 60, turnaround: 2 },
    { id: 'ALC-007', name: 'Sulfite Content', category: 'Alcohol', price: 70, turnaround: 2 },
    { id: 'ALC-008', name: 'Acetaldehyde', category: 'Alcohol', price: 85, turnaround: 3 },
    { id: 'ALC-009', name: 'Fusel Oils', category: 'Alcohol', price: 90, turnaround: 3 },
    { id: 'ALC-010', name: 'Ester Profile', category: 'Alcohol', price: 110, turnaround: 4 },
    { id: 'ALC-011', name: 'Tannin Analysis', category: 'Alcohol', price: 95, turnaround: 3 },
    { id: 'ALC-012', name: 'Color Intensity', category: 'Alcohol', price: 55, turnaround: 1 },
    { id: 'ALC-013', name: 'Turbidity', category: 'Alcohol', price: 60, turnaround: 2 },
    { id: 'ALC-014', name: 'Yeast Viability', category: 'Alcohol', price: 80, turnaround: 3 },
    { id: 'ALC-015', name: 'Bacterial Contamination', category: 'Alcohol', price: 100, turnaround: 4 },
    { id: 'ALC-016', name: 'Heavy Metals Screen', category: 'Alcohol', price: 130, turnaround: 4 },
    { id: 'ALC-017', name: 'Pesticide Residue', category: 'Alcohol', price: 145, turnaround: 5 },
    { id: 'ALC-018', name: 'Allergen Testing', category: 'Alcohol', price: 90, turnaround: 3 },
    { id: 'ALC-019', name: 'Nutritional Analysis', category: 'Alcohol', price: 105, turnaround: 4 },
    { id: 'ALC-020', name: 'Authenticity Verification', category: 'Alcohol', price: 125, turnaround: 5 },
    { id: 'ALC-021', name: 'Age Verification', category: 'Alcohol', price: 140, turnaround: 5 },
    { id: 'ALC-022', name: 'Flavor Compound ID', category: 'Alcohol', price: 115, turnaround: 4 },
    { id: 'ALC-023', name: 'Glycerol Content', category: 'Alcohol', price: 75, turnaround: 2 },
    { id: 'ALC-024', name: 'Volatile Acidity', category: 'Alcohol', price: 70, turnaround: 2 },
    { id: 'ALC-025', name: 'Free SO2', category: 'Alcohol', price: 65, turnaround: 2 }
  ];

  const filteredTests = alcoholTests.filter(test =>
    test.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '2rem', color: '#fff' }}>
      <h1 style={{ fontSize: '3rem', textAlign: 'center', color: '#ec4899', marginBottom: '2rem' }}>
        ?? {language === 'es' ? 'Análisis de Alcohol' : 'Alcohol Analysis'}
      </h1>
      <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '3rem' }}>
        {language === 'es' ? '25 Pruebas Profesionales' : '25 Professional Tests'}
      </p>

      <input
        type="text"
        placeholder={language === 'es' ? '?? Buscar pruebas...' : '?? Search tests...'}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          maxWidth: '800px',
          margin: '0 auto 3rem',
          display: 'block',
          padding: '1.2rem',
          background: 'rgba(30, 41, 59, 0.8)',
          border: '2px solid #334155',
          borderRadius: '12px',
          color: '#fff',
          fontSize: '1.1rem'
        }}
      />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '1.5rem',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {filteredTests.map((test) => (
          <div
            key={test.id}
            style={{
              background: 'rgba(30, 41, 59, 0.6)',
              border: '2px solid rgba(236, 72, 153, 0.3)',
              borderRadius: '15px',
              padding: '1.5rem',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.5rem' }}>
              {test.id}
            </div>
            <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '1rem', fontWeight: 'bold', minHeight: '3rem' }}>
              {test.name}
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ color: '#10b981', fontSize: '1.5rem', fontWeight: 'bold' }}>
                ${test.price}
              </span>
              <span style={{ color: '#94a3b8' }}>
                ?? {test.turnaround}d
              </span>
            </div>
            <button
              onClick={() => {
                audioSystem.playSuccess();
                setSelectedTests([...selectedTests, test]);
              }}
              style={{
                width: '100%',
                padding: '0.8rem',
                background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
                border: 'none',
                borderRadius: '10px',
                color: '#fff',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              + {language === 'es' ? 'Añadir' : 'Add'}
            </button>
          </div>
        ))}
      </div>

      {selectedTests.length > 0 && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          background: 'rgba(15, 23, 42, 0.95)',
          border: '2px solid #ec4899',
          borderRadius: '20px',
          padding: '1.5rem',
          minWidth: '300px'
        }}>
          <h3 style={{ color: '#ec4899', marginBottom: '1rem' }}>
            ?? {language === 'es' ? 'Carrito' : 'Cart'} ({selectedTests.length})
          </h3>
          <div style={{ fontSize: '2rem', color: '#10b981', fontWeight: 'bold' }}>
            ${selectedTests.reduce((sum, t) => sum + t.price, 0)}
          </div>
        </div>
      )}
    </div>
  );
};

export default AlcoholAnalysisModule;
