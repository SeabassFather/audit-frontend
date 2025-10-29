import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { useCart } from './CartContext';
import audioSystem from './audioSystem';

const FuelOilAnalysisModule = () => {
  const { language } = useLanguage();
  const { addToCart, cart, getTotal } = useCart();
  const navigate = useNavigate();
  const [expandedCategory, setExpandedCategory] = useState(null);

  const fuelTests = [
    { id: 'FUEL-001', name: 'Cetane Number (Diesel)', analysisPrice: 95, unit: 'CN', description: 'Ignition quality + combustion efficiency analysis', category: 'Diesel' },
    { id: 'FUEL-002', name: 'Cloud Point', analysisPrice: 55, unit: '°C', description: 'Cold weather operability assessment', category: 'Diesel' },
    { id: 'FUEL-003', name: 'Pour Point', analysisPrice: 55, unit: '°C', description: 'Minimum flow temperature analysis', category: 'Diesel' },
    { id: 'FUEL-004', name: 'Sulfur Content (ULSD)', analysisPrice: 75, unit: 'ppm', description: 'EPA 15 ppm limit compliance verification', category: 'Diesel', critical: true },
    { id: 'FUEL-005', name: 'Lubricity (HFRR)', analysisPrice: 85, unit: 'microns', description: 'Fuel pump protection assessment', category: 'Diesel' },
    { id: 'FUEL-006', name: 'Water Content (Karl Fischer)', analysisPrice: 70, unit: 'ppm', description: 'Microbial growth risk + corrosion assessment', category: 'Diesel' },
    { id: 'FUEL-007', name: 'Biodiesel Blend Level (FAME)', analysisPrice: 90, unit: '% vol', description: 'B5/B20 blend verification + warranty compliance', category: 'Diesel' },
    { id: 'FUEL-008', name: 'Octane Rating (RON/MON)', analysisPrice: 105, unit: 'Octane', description: 'Gasoline knock resistance analysis', category: 'Gasoline' },
    { id: 'FUEL-009', name: 'Ethanol Content', analysisPrice: 65, unit: '% vol', description: 'E10/E15/E85 blend verification', category: 'Gasoline' },
    { id: 'FUEL-010', name: 'Reid Vapor Pressure (RVP)', analysisPrice: 70, unit: 'psi', description: 'Evaporation rate + EPA compliance check', category: 'Gasoline' },
    { id: 'FUEL-011', name: 'Gum & Varnish (Existent)', analysisPrice: 80, unit: 'mg/100mL', description: 'Deposit formation risk assessment', category: 'Gasoline' },
    { id: 'FUEL-012', name: 'Complete Diesel Analysis', analysisPrice: 295, unit: 'Full Report', description: 'Comprehensive fuel quality + compliance audit', category: 'Diesel', popular: true },
    { id: 'FUEL-013', name: 'Complete Gasoline Analysis', analysisPrice: 275, unit: 'Full Report', description: 'Full gasoline quality + octane verification', category: 'Gasoline', popular: true }
  ];

  const categories = ['Diesel', 'Gasoline'];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '2rem', color: '#fff' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        <h1 style={{ fontSize: '3.5rem', textAlign: 'center', color: '#8b5cf6', marginBottom: '1rem' }}>
          ⛽ Fuel & Oil Analysis
        </h1>
        <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '3rem', fontSize: '1.2rem' }}>
          Upload your fuel test results - Get quality analysis + compliance verification
        </p>

        {categories.map(category => (
          <div key={category} style={{ marginBottom: '2rem' }}>
            <div
              onClick={() => { setExpandedCategory(expandedCategory === category ? null : category); audioSystem.playClick(); }}
              style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '1.5rem', borderRadius: '15px', border: '2px solid #8b5cf6', cursor: 'pointer', marginBottom: '1rem' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '2rem', color: '#8b5cf6' }}>{category} Tests</h2>
                <span style={{ fontSize: '2rem', color: '#8b5cf6' }}>{expandedCategory === category ? '▼' : '▶'}</span>
              </div>
            </div>

            {expandedCategory === category && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
                {fuelTests.filter(t => t.category === category).map(test => (
                  <div key={test.id} style={{ background: 'rgba(30, 41, 59, 0.6)', border: test.critical ? '2px solid #ef4444' : '2px solid rgba(139, 92, 246, 0.3)', borderRadius: '20px', padding: '1.5rem', position: 'relative' }}>
                    {test.popular && <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: '#f59e0b', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>⭐ POPULAR</div>}
                    {test.critical && <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: '#ef4444', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>🚨 CRITICAL</div>}
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.5rem' }}>{test.id}</div>
                    <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '1rem', fontWeight: 'bold', minHeight: '3rem' }}>{test.name}</h3>
                    <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1rem', minHeight: '3rem' }}>{test.description}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <span style={{ fontSize: '1.8rem', color: '#10b981', fontWeight: 'bold' }}>${test.analysisPrice}</span>
                      <span style={{ color: '#94a3b8' }}>📊 {test.unit}</span>
                    </div>
                    <button onClick={() => { addToCart({...test, price: test.analysisPrice}); audioSystem.playSuccess(); }} style={{ width: '100%', padding: '1rem', background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
                      🛒 Request Analysis
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

      </div>

      {cart.length > 0 && (
        <div onClick={() => navigate('/cart')} style={{ position: 'fixed', bottom: '2rem', right: '2rem', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', border: '3px solid #10b981', borderRadius: '20px', padding: '1.5rem', minWidth: '200px', cursor: 'pointer', zIndex: 9999, textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem' }}>🛒</div>
          <div style={{ color: '#fff', fontWeight: 'bold' }}>{cart.length} analyses</div>
          <div style={{ fontSize: '1.8rem', color: '#fff', fontWeight: 'bold' }}>${getTotal().toFixed(2)}</div>
        </div>
      )}
    </div>
  );
};

export default FuelOilAnalysisModule;
