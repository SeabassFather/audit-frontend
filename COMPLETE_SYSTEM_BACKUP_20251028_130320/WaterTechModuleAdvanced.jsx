import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import audioSystem from './audioSystem';

const WaterTechModuleAdvanced = () => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTests, setSelectedTests] = useState([]);

  const featuredCategories = [
    { id: 'drinking', icon: '🚰', name: 'Drinking Water', nameEs: 'Agua Potable', tests: 15, color: '#06b6d4' },
    { id: 'wastewater', icon: '🏭', name: 'Wastewater', nameEs: 'Aguas Residuales', tests: 12, color: '#8b5cf6' },
    { id: 'surface', icon: '🌊', name: 'Surface Water', nameEs: 'Agua Superficial', tests: 10, color: '#10b981' },
    { id: 'ground', icon: '💧', name: 'Groundwater', nameEs: 'Agua Subterránea', tests: 13, color: '#06b6d4' }
  ];

  const allTests = [
    { id: 'WAT-001', name: 'E.coli Detection', category: 'drinking', price: 85, days: 2 },
    { id: 'WAT-002', name: 'Total Coliform', category: 'drinking', price: 75, days: 2 },
    { id: 'WAT-003', name: 'Lead Content', category: 'drinking', price: 95, days: 3 },
    { id: 'WAT-004', name: 'Copper Analysis', category: 'drinking', price: 90, days: 3 },
    { id: 'WAT-005', name: 'Chlorine Residual', category: 'drinking', price: 60, days: 1 },
    { id: 'WAT-006', name: 'pH Level', category: 'drinking', price: 50, days: 1 },
    { id: 'WAT-007', name: 'BOD Analysis', category: 'wastewater', price: 95, days: 5 },
    { id: 'WAT-008', name: 'COD Analysis', category: 'wastewater', price: 90, days: 3 },
    { id: 'WAT-009', name: 'TSS Analysis', category: 'wastewater', price: 80, days: 2 },
    { id: 'WAT-010', name: 'Nitrate/Nitrite', category: 'surface', price: 85, days: 2 }
  ];

  const FeaturedCard = ({ category }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
      <div
        onClick={() => { audioSystem.playClick(); setSelectedCategory(category.id); }}
        onMouseEnter={() => { setIsHovered(true); audioSystem.playHover(); }}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: isHovered ? `linear-gradient(135deg, ${category.color}40 0%, ${category.color}20 100%)` : 'rgba(30, 41, 59, 0.6)',
          backdropFilter: 'blur(20px)',
          border: `3px solid ${isHovered ? category.color : 'rgba(100, 116, 139, 0.3)'}`,
          borderRadius: '25px',
          padding: '3rem 2rem',
          cursor: 'pointer',
          transition: 'all 0.4s ease',
          transform: isHovered ? 'translateY(-15px) scale(1.05)' : 'translateY(0)',
          boxShadow: isHovered ? `0 25px 60px ${category.color}60` : '0 10px 30px rgba(0,0,0,0.3)',
          textAlign: 'center'
        }}
      >
        <div style={{ fontSize: '5rem', marginBottom: '1.5rem', filter: isHovered ? `drop-shadow(0 0 20px ${category.color})` : 'none' }}>
          {category.icon}
        </div>
        <h3 style={{ fontSize: '2rem', color: isHovered ? category.color : '#fff', marginBottom: '1rem', fontWeight: 'bold' }}>
          {language === 'es' ? category.nameEs : category.name}
        </h3>
        <div style={{ fontSize: '3rem', fontWeight: 'bold', color: category.color, marginBottom: '0.5rem' }}>
          {category.tests}
        </div>
        <p style={{ color: '#94a3b8' }}>{language === 'es' ? 'pruebas disponibles' : 'tests available'}</p>
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '2rem', color: '#fff' }}>
      <h1 style={{ fontSize: '3rem', textAlign: 'center', color: '#06b6d4', marginBottom: '1rem' }}>
        Water Analysis
      </h1>
      <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '3rem', fontSize: '1.2rem' }}>
        50+ Premium Tests
      </p>

      {!selectedCategory ? (
        <>
          <h2 style={{ fontSize: '2rem', textAlign: 'center', color: '#10b981', marginBottom: '3rem' }}>
            {language === 'es' ? 'Seleccionar Categoría' : 'Select Category'}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
            {featuredCategories.map(cat => <FeaturedCard key={cat.id} category={cat} />)}
          </div>
        </>
      ) : (
        <div>
          <button onClick={() => setSelectedCategory(null)} style={{ padding: '1rem 2rem', background: 'rgba(100, 116, 139, 0.3)', border: '2px solid #64748b', borderRadius: '12px', color: '#fff', cursor: 'pointer', marginBottom: '2rem', fontWeight: 'bold' }}>
            ← Back
          </button>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {allTests.filter(t => t.category === selectedCategory).map(test => (
              <div key={test.id} style={{ background: 'rgba(30, 41, 59, 0.6)', border: '2px solid rgba(6, 182, 212, 0.3)', borderRadius: '15px', padding: '1.5rem' }}>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.5rem' }}>{test.id}</div>
                <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '1rem', fontWeight: 'bold' }}>{test.name}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ color: '#10b981', fontSize: '1.5rem', fontWeight: 'bold' }}>${test.price}</span>
                  <span style={{ color: '#94a3b8' }}>{test.days}d</span>
                </div>
                <button onClick={() => { audioSystem.playSuccess(); setSelectedTests([...selectedTests, test]); }} style={{ width: '100%', padding: '0.8rem', background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)', border: 'none', borderRadius: '10px', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
                  + Add
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedTests.length > 0 && (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', background: 'rgba(15, 23, 42, 0.95)', border: '2px solid #06b6d4', borderRadius: '20px', padding: '1.5rem', minWidth: '300px' }}>
          <h3 style={{ color: '#06b6d4', marginBottom: '1rem' }}>Cart ({selectedTests.length})</h3>
          <div style={{ fontSize: '2rem', color: '#10b981', fontWeight: 'bold' }}>${selectedTests.reduce((sum, t) => sum + t.price, 0)}</div>
        </div>
      )}
    </div>
  );
};

export default WaterTechModuleAdvanced;
