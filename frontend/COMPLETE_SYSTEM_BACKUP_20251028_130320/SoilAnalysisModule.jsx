import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import audioSystem from './audioSystem';

const SoilAnalysisModule = () => {
  const { language } = useLanguage();
  const [selectedTests, setSelectedTests] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [viewMode, setViewMode] = useState('featured'); // 'featured' or 'detailed'

  const featuredCategories = [
    { id: 'nutrients', icon: '🌾', name: 'Nutrients (NPK)', nameEs: 'Nutrientes (NPK)', tests: 12, color: '#10b981', description: 'Essential plant nutrients' },
    { id: 'physical', icon: '🏜️', name: 'Physical Properties', nameEs: 'Propiedades Físicas', tests: 10, color: '#f59e0b', description: 'Texture, structure, density' },
    { id: 'chemical', icon: '🧪', name: 'Chemical Analysis', nameEs: 'Análisis Químico', tests: 10, color: '#8b5cf6', description: 'pH, EC, CEC, organic matter' },
    { id: 'metals', icon: '⚗️', name: 'Heavy Metals', nameEs: 'Metales Pesados', tests: 8, color: '#ef4444', description: 'Lead, cadmium, arsenic' }
  ];

  const categories = [
    {
      id: 'ph',
      name: 'Soil pH Test',
      icon: '🧪',
      tests: [
        { id: 'pH-001', name: 'Basic pH Test', price: 45, days: 1 },
        { id: 'pH-002', name: 'pH + Buffer Capacity', price: 65, days: 2 },
        { id: 'pH-003', name: 'Complete pH Analysis', price: 85, days: 2 }
      ]
    },
    {
      id: 'ec',
      name: 'Electrical Conductivity (EC)',
      icon: '⚡',
      tests: [
        { id: 'EC-001', name: 'Standard EC Test', price: 50, days: 1 },
        { id: 'EC-002', name: 'EC + Salinity Analysis', price: 75, days: 2 },
        { id: 'EC-003', name: 'Complete Salinity Profile', price: 95, days: 3 }
      ]
    },
    {
      id: 'om',
      name: 'Organic Matter %',
      icon: '🍂',
      tests: [
        { id: 'OM-001', name: 'Organic Matter Content', price: 60, days: 2 },
        { id: 'OM-002', name: 'OM + Carbon Analysis', price: 85, days: 3 },
        { id: 'OM-003', name: 'Complete Organic Profile', price: 110, days: 4 }
      ]
    },
    {
      id: 'cec',
      name: 'Cation Exchange Capacity (CEC)',
      icon: '🔄',
      tests: [
        { id: 'CEC-001', name: 'Standard CEC Test', price: 70, days: 2 },
        { id: 'CEC-002', name: 'CEC + Base Saturation', price: 95, days: 3 },
        { id: 'CEC-003', name: 'Complete CEC Analysis', price: 125, days: 4 }
      ]
    },
    {
      id: 'texture',
      name: 'Soil Texture Analysis',
      icon: '🏜️',
      tests: [
        { id: 'TEX-001', name: 'Sand/Silt/Clay Ratios', price: 80, days: 3 },
        { id: 'TEX-002', name: 'Particle Size Distribution', price: 105, days: 4 },
        { id: 'TEX-003', name: 'Complete Texture Profile', price: 135, days: 5 }
      ]
    },
    {
      id: 'nitrogen',
      name: 'Total Nitrogen (N)',
      icon: '🌾',
      tests: [
        { id: 'N-001', name: 'Total Nitrogen', price: 55, days: 2 },
        { id: 'N-002', name: 'N + Available N', price: 75, days: 3 },
        { id: 'N-003', name: 'Complete N Analysis', price: 100, days: 4 }
      ]
    },
    {
      id: 'nitrate',
      name: 'Nitrate-Nitrogen (NO3-N)',
      icon: '💧',
      tests: [
        { id: 'NO3-001', name: 'Nitrate Test', price: 50, days: 2 },
        { id: 'NO3-002', name: 'Nitrate + Nitrite', price: 70, days: 2 },
        { id: 'NO3-003', name: 'Complete NO3 Profile', price: 95, days: 3 }
      ]
    }
  ];

  const FeaturedCard = ({ category }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
      <div
        onClick={() => { audioSystem.playClick(); setViewMode('detailed'); }}
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
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {isHovered && (
          <div style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: `radial-gradient(circle, ${category.color}30 0%, transparent 70%)`,
            animation: 'pulse 2s ease-in-out infinite'
          }} />
        )}
        <div style={{ fontSize: '5rem', marginBottom: '1.5rem', filter: isHovered ? `drop-shadow(0 0 20px ${category.color})` : 'none', position: 'relative', zIndex: 1 }}>
          {category.icon}
        </div>
        <h3 style={{ fontSize: '2rem', color: isHovered ? category.color : '#fff', marginBottom: '0.5rem', fontWeight: 'bold', position: 'relative', zIndex: 1 }}>
          {language === 'es' ? category.nameEs : category.name}
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>
          {category.description}
        </p>
        <div style={{ fontSize: '3rem', fontWeight: 'bold', color: category.color, marginBottom: '0.5rem', position: 'relative', zIndex: 1 }}>
          {category.tests}
        </div>
        <p style={{ color: '#94a3b8', position: 'relative', zIndex: 1 }}>
          {language === 'es' ? 'pruebas disponibles' : 'tests available'}
        </p>
        <style>{`
          @keyframes pulse {
            0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.3; }
            50% { transform: scale(1.2) rotate(180deg); opacity: 0.6; }
          }
        `}</style>
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '2rem', color: '#fff' }}>
      <h1 style={{ fontSize: '3rem', textAlign: 'center', color: '#10b981', marginBottom: '1rem' }}>
        Soil Analysis - 40 Tests
      </h1>
      <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '3rem', fontSize: '1.2rem' }}>
        {language === 'es' ? 'Análisis Completo del Suelo' : 'Complete Soil Testing'}
      </p>

      {viewMode === 'featured' ? (
        <>
          <h2 style={{ fontSize: '2rem', textAlign: 'center', color: '#10b981', marginBottom: '3rem' }}>
            {language === 'es' ? 'Seleccionar Categoría' : 'Select Category'}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
            {featuredCategories.map(cat => <FeaturedCard key={cat.id} category={cat} />)}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button
              onClick={() => { audioSystem.playClick(); setViewMode('detailed'); }}
              style={{
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '1.1rem',
                boxShadow: '0 10px 30px rgba(16, 185, 129, 0.4)'
              }}
            >
              {language === 'es' ? 'Ver Todas las Pruebas' : 'View All Tests'}
            </button>
          </div>
        </>
      ) : (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <button
            onClick={() => { audioSystem.playClick(); setViewMode('featured'); }}
            style={{
              padding: '0.8rem 1.5rem',
              background: 'rgba(100, 116, 139, 0.3)',
              border: '2px solid #64748b',
              borderRadius: '10px',
              color: '#fff',
              cursor: 'pointer',
              marginBottom: '2rem',
              fontWeight: 'bold'
            }}
          >
            ← {language === 'es' ? 'Volver a Categorías' : 'Back to Categories'}
          </button>

          <div style={{ background: 'rgba(30, 41, 59, 0.6)', borderRadius: '20px', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ fontSize: '4rem' }}>🌱</div>
                <div>
                  <h2 style={{ fontSize: '1.5rem', color: '#10b981', marginBottom: '0.5rem' }}>
                    {language === 'es' ? 'Seleccionar Pruebas' : 'Select Tests'}
                  </h2>
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>NPK, Micronutrients, Metals</p>
                </div>
              </div>
              <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '1.5rem', borderRadius: '15px', border: '2px solid #10b981', textAlign: 'center' }}>
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
                    alignItems: 'center',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#10b981'; audioSystem.playHover(); }}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = '#334155'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ fontSize: '2rem' }}>{category.icon}</div>
                    <div style={{ fontSize: '1.2rem', color: '#10b981', fontWeight: 'bold' }}>{category.name}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ color: '#94a3b8' }}>{category.tests.length} tests</div>
                    <div style={{ fontSize: '1.5rem', color: '#10b981' }}>
                      {expandedCategory === category.id ? '▼' : '▶'}
                    </div>
                  </div>
                </div>

                {expandedCategory === category.id && (
                  <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                    {category.tests.map((test) => (
                      <div key={test.id} style={{ background: 'rgba(30, 41, 59, 0.6)', border: '2px solid rgba(16, 185, 129, 0.3)', borderRadius: '12px', padding: '1.5rem' }}>
                        <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.5rem' }}>{test.id}</div>
                        <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1rem', fontWeight: 'bold' }}>{test.name}</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                          <span style={{ color: '#10b981', fontSize: '1.3rem', fontWeight: 'bold' }}>${test.price}</span>
                          <span style={{ color: '#94a3b8' }}>⏱️ {test.days}d</span>
                        </div>
                        <button
                          onClick={() => {
                            audioSystem.playSuccess();
                            setSelectedTests([...selectedTests, test]);
                          }}
                          style={{
                            width: '100%',
                            padding: '0.8rem',
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
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
      )}

      {selectedTests.length > 0 && (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', background: 'rgba(15, 23, 42, 0.95)', border: '2px solid #10b981', borderRadius: '20px', padding: '1.5rem', minWidth: '300px' }}>
          <h3 style={{ color: '#10b981', marginBottom: '1rem' }}>Cart ({selectedTests.length})</h3>
          <div style={{ fontSize: '2rem', color: '#10b981', fontWeight: 'bold' }}>
            ${selectedTests.reduce((sum, t) => sum + t.price, 0)}
          </div>
        </div>
      )}
    </div>
  );
};

export default SoilAnalysisModule;
