import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { useCart } from './CartContext';
import audioSystem from './audioSystem';

const EnginePerformanceModule = () => {
  const { language } = useLanguage();
  const { addToCart, cart, getTotal } = useCart();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { id: 'oil', icon: '🛢️', name: 'Oil Analysis', tests: 8, color: '#f97316' },
    { id: 'coolant', icon: '❄️', name: 'Coolant Testing', tests: 5, color: '#06b6d4' },
    { id: 'wear', icon: '⚙️', name: 'Wear Metals', tests: 4, color: '#ef4444' },
    { id: 'performance', icon: '🔧', name: 'Performance', tests: 3, color: '#10b981' }
  ];

  const allTests = {
    oil: [
      { id: 'OIL-001', name: 'Viscosity @ 40°C & 100°C', analysisPrice: 55, unit: 'cSt', description: 'Oil thickness analysis + degradation assessment' },
      { id: 'OIL-002', name: 'TBN (Total Base Number)', analysisPrice: 60, unit: 'mgKOH/g', description: 'Acid neutralization capacity + remaining life analysis' },
      { id: 'OIL-003', name: 'TAN (Total Acid Number)', analysisPrice: 60, unit: 'mgKOH/g', description: 'Oxidation level + oil condition assessment' },
      { id: 'OIL-004', name: 'Oxidation & Nitration', analysisPrice: 70, unit: 'Abs/cm', description: 'Chemical degradation analysis via FTIR' },
      { id: 'OIL-005', name: 'Fuel Dilution', analysisPrice: 65, unit: '%', description: 'Gasoline/diesel contamination detection' },
      { id: 'OIL-006', name: 'Water Content (Karl Fischer)', analysisPrice: 70, unit: 'ppm', description: 'Moisture contamination + corrosion risk assessment' },
      { id: 'OIL-007', name: 'Soot Content', analysisPrice: 65, unit: '%', description: 'Combustion byproduct analysis (diesel engines)' },
      { id: 'OIL-008', name: 'Complete Oil Condition Analysis', analysisPrice: 225, unit: 'Full Report', description: 'Comprehensive oil health + change interval recommendations', popular: true }
    ],
    coolant: [
      { id: 'CLT-001', name: 'Freeze Point Protection', analysisPrice: 50, unit: '°C', description: 'Winter protection level verification' },
      { id: 'CLT-002', name: 'pH Level', analysisPrice: 40, unit: 'pH', description: 'Corrosion protection assessment' },
      { id: 'CLT-003', name: 'Reserve Alkalinity', analysisPrice: 55, unit: 'mL', description: 'Remaining additive package analysis' },
      { id: 'CLT-004', name: 'Inhibitor Depletion', analysisPrice: 70, unit: '%', description: 'Corrosion inhibitor effectiveness check' },
      { id: 'CLT-005', name: 'Complete Coolant Analysis', analysisPrice: 165, unit: 'Full Report', description: 'Full coolant condition + replacement recommendations', popular: true }
    ],
    wear: [
      { id: 'WR-001', name: 'Iron (Fe) - Cylinder Wear', analysisPrice: 55, unit: 'ppm', description: 'Piston ring & cylinder liner wear analysis' },
      { id: 'WR-002', name: 'Copper (Cu) - Bearing Wear', analysisPrice: 55, unit: 'ppm', description: 'Bushing & bearing degradation assessment' },
      { id: 'WR-003', name: 'Lead (Pb) - Bearing Alloy', analysisPrice: 55, unit: 'ppm', description: 'Bearing material wear detection' },
      { id: 'WR-004', name: 'Complete Wear Metals Panel', analysisPrice: 125, unit: 'Full Report', description: '15+ metals analysis + failure prediction', popular: true }
    ],
    performance: [
      { id: 'PRF-001', name: 'Compression Test Analysis', analysisPrice: 85, unit: 'psi', description: 'Cylinder health + blow-by assessment' },
      { id: 'PRF-002', name: 'Power Output Verification', analysisPrice: 95, unit: 'HP', description: 'Engine efficiency + performance loss analysis' },
      { id: 'PRF-003', name: 'Fuel Efficiency Analysis', analysisPrice: 75, unit: 'MPG', description: 'Consumption rate + optimization recommendations', popular: true }
    ]
  };

  const currentTests = selectedCategory ? allTests[selectedCategory] : [];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '2rem', color: '#fff' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        <h1 style={{ fontSize: '3.5rem', textAlign: 'center', color: '#f97316', marginBottom: '1rem' }}>
          🔧 Engine Performance Analysis
        </h1>
        <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '3rem', fontSize: '1.2rem' }}>
          Upload your engine test results - Get AI-powered analysis + maintenance recommendations
        </p>

        {!selectedCategory ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {categories.map(cat => (
              <div
                key={cat.id}
                onClick={() => { audioSystem.playClick(); setSelectedCategory(cat.id); }}
                style={{
                  background: 'rgba(30, 41, 59, 0.6)',
                  border: '3px solid ' + cat.color + '50',
                  borderRadius: '25px',
                  padding: '3rem 2rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.4s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-15px) scale(1.05)';
                  e.currentTarget.style.borderColor = cat.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
              >
                <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>{cat.icon}</div>
                <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '1rem' }}>{cat.name}</h3>
                <div style={{ fontSize: '2.5rem', color: cat.color, fontWeight: 'bold' }}>{cat.tests}</div>
                <p style={{ color: '#94a3b8' }}>tests</p>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <button onClick={() => { setSelectedCategory(null); audioSystem.playClick(); }} style={{ padding: '1rem 2rem', background: 'rgba(100, 116, 139, 0.3)', border: '2px solid #64748b', borderRadius: '12px', color: '#fff', cursor: 'pointer', marginBottom: '2rem' }}>
              ← Back
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
              {currentTests.map(test => (
                <div key={test.id} style={{ background: 'rgba(30, 41, 59, 0.6)', border: '2px solid rgba(249, 115, 22, 0.3)', borderRadius: '20px', padding: '1.5rem' }}>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.5rem' }}>{test.id}</div>
                  <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '1rem', fontWeight: 'bold' }}>{test.name}</h3>
                  <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1rem' }}>{test.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '1.8rem', color: '#10b981', fontWeight: 'bold' }}>${test.analysisPrice}</span>
                    <span style={{ color: '#94a3b8' }}>📊 {test.unit}</span>
                  </div>
                  <button onClick={() => { addToCart({...test, price: test.analysisPrice}); audioSystem.playSuccess(); }} style={{ width: '100%', padding: '1rem', background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
                    🛒 Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

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

export default EnginePerformanceModule;


