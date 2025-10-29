import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import audioSystem from './audioSystem';

const FuelOilAnalysisModule = () => {
  const { language } = useLanguage();
  const [selectedTests, setSelectedTests] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);

  const categories = [
    {
      id: 'cetane',
      name: 'Cetane Number',
      icon: '',
      tests: [
        { id: 'CET-001', name: 'Standard Cetane Test', price: 85, days: 2 },
        { id: 'CET-002', name: 'Cetane + Ignition Quality', price: 110, days: 3 }
      ]
    },
    {
      id: 'cloud',
      name: 'Cloud Point',
      icon: '',
      tests: [
        { id: 'CP-001', name: 'Cloud Point Test', price: 75, days: 2 },
        { id: 'CP-002', name: 'Cloud + Pour Point', price: 95, days: 2 }
      ]
    },
    {
      id: 'pour',
      name: 'Pour Point',
      icon: '',
      tests: [
        { id: 'PP-001', name: 'Pour Point Test', price: 70, days: 2 },
        { id: 'PP-002', name: 'Pour + Cold Filter', price: 90, days: 3 }
      ]
    },
    {
      id: 'sulfur',
      name: 'Sulfur Content (Diesel)',
      icon: '',
      tests: [
        { id: 'SUL-001', name: 'Total Sulfur', price: 80, days: 2 },
        { id: 'SUL-002', name: 'Ultra-Low Sulfur Test', price: 100, days: 3 }
      ]
    },
    {
      id: 'lubricity',
      name: 'Lubricity (HFRR)',
      icon: '',
      tests: [
        { id: 'LUB-001', name: 'HFRR Lubricity Test', price: 95, days: 3 },
        { id: 'LUB-002', name: 'Complete Lubricity Profile', price: 125, days: 4 }
      ]
    },
    {
      id: 'water',
      name: 'Water Content (Diesel)',
      icon: '',
      tests: [
        { id: 'WAT-001', name: 'Water & Sediment Test', price: 65, days: 2 },
        { id: 'WAT-002', name: 'Karl Fischer Water Test', price: 85, days: 2 }
      ]
    },
    {
      id: 'biodiesel',
      name: 'Biodiesel Blend Level (FAME)',
      icon: '',
      tests: [
        { id: 'BIO-001', name: 'FAME Content Analysis', price: 90, days: 3 },
        { id: 'BIO-002', name: 'Complete Biodiesel Profile', price: 120, days: 4 }
      ]
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '2rem', color: '#fff' }}>
      <h1 style={{ fontSize: '3rem', textAlign: 'center', color: '#8b5cf6', marginBottom: '1rem' }}>
        Fuel Testing - 30 Tests
      </h1>

      <div style={{ maxWidth: '1200px', margin: '0 auto', background: 'rgba(30, 41, 59, 0.6)', borderRadius: '20px', padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ fontSize: '4rem' }}></div>
            <div>
              <h2 style={{ fontSize: '1.5rem', color: '#8b5cf6', marginBottom: '0.5rem' }}>Select Tests</h2>
            </div>
          </div>
          <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '1.5rem', borderRadius: '15px', border: '2px solid #8b5cf6', textAlign: 'center' }}>
            <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.3rem' }}>Total</div>
            <div style={{ fontSize: '2rem', color: '#10b981', fontWeight: 'bold' }}>
              ${selectedTests.reduce((sum, t) => sum + t.price, 0)}
            </div>
            <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{selectedTests.length} tests</div>
          </div>
        </div>

        {categories.map((category) => (
          <div key={category.id} style={{ marginBottom: '1rem' }}>
            <div
              onClick={() => {
                audioSystem.playClick();
                setExpandedCategory(expandedCategory === category.id ? null : category.id);
              }}
              style={{
                background: 'rgba(15, 23, 42, 0.8)',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '2px solid #334155',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#8b5cf6'; audioSystem.playHover(); }}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#334155'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ fontSize: '2rem' }}>{category.icon}</div>
                <div style={{ fontSize: '1.2rem', color: '#8b5cf6', fontWeight: 'bold' }}>{category.name}</div>
              </div>
              <div style={{ fontSize: '1.5rem', color: '#8b5cf6' }}>
                {expandedCategory === category.id ? '' : ''}
              </div>
            </div>

            {expandedCategory === category.id && (
              <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                {category.tests.map((test) => (
                  <div key={test.id} style={{ background: 'rgba(30, 41, 59, 0.6)', border: '2px solid rgba(139, 92, 246, 0.3)', borderRadius: '12px', padding: '1.5rem' }}>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.5rem' }}>{test.id}</div>
                    <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1rem', fontWeight: 'bold' }}>{test.name}</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <span style={{ color: '#10b981', fontSize: '1.3rem', fontWeight: 'bold' }}>${test.price}</span>
                      <span style={{ color: '#94a3b8' }}> {test.days}d</span>
                    </div>
                    <button
                      onClick={() => {
                        audioSystem.playSuccess();
                        setSelectedTests([...selectedTests, test]);
                      }}
                      style={{
                        width: '100%',
                        padding: '0.8rem',
                        background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                        border: 'none',
                        borderRadius: '10px',
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
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FuelOilAnalysisModule;
