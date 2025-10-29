import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { useCart } from './CartContext';
import audioSystem from './audioSystem';

const AlcoholAnalysisModule = () => {
  const { language } = useLanguage();
  const { addToCart, cart, getTotal } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // ALL 25 TESTS
  const tests = [
    { id: 'ALC-001', name: 'Ethanol Content (ABV)', price: 75, days: 2 },
    { id: 'ALC-002', name: 'Methanol Detection', price: 95, days: 3 },
    { id: 'ALC-003', name: 'Congener Analysis', price: 120, days: 4 },
    { id: 'ALC-004', name: 'Sugar Content', price: 65, days: 2 },
    { id: 'ALC-005', name: 'pH Level', price: 50, days: 1 },
    { id: 'ALC-006', name: 'Acidity (TA)', price: 60, days: 2 },
    { id: 'ALC-007', name: 'Sulfite Content', price: 70, days: 2 },
    { id: 'ALC-008', name: 'Acetaldehyde', price: 85, days: 3 },
    { id: 'ALC-009', name: 'Fusel Oils', price: 90, days: 3 },
    { id: 'ALC-010', name: 'Ester Profile', price: 110, days: 4 },
    { id: 'ALC-011', name: 'Tannin Analysis', price: 95, days: 3 },
    { id: 'ALC-012', name: 'Color Intensity', price: 55, days: 1 },
    { id: 'ALC-013', name: 'Turbidity', price: 50, days: 1 },
    { id: 'ALC-014', name: 'Specific Gravity', price: 55, days: 1 },
    { id: 'ALC-015', name: 'Volatile Acidity', price: 70, days: 2 },
    { id: 'ALC-016', name: 'Total Phenolics', price: 85, days: 3 },
    { id: 'ALC-017', name: 'Anthocyanins', price: 95, days: 3 },
    { id: 'ALC-018', name: 'Malic Acid', price: 75, days: 2 },
    { id: 'ALC-019', name: 'Lactic Acid', price: 75, days: 2 },
    { id: 'ALC-020', name: 'Tartaric Acid', price: 75, days: 2 },
    { id: 'ALC-021', name: 'Free SO2', price: 65, days: 2 },
    { id: 'ALC-022', name: 'Total SO2', price: 70, days: 2 },
    { id: 'ALC-023', name: 'Copper Content', price: 80, days: 3 },
    { id: 'ALC-024', name: 'Iron Content', price: 80, days: 3 },
    { id: 'ALC-025', name: 'Residual Sugar', price: 70, days: 2 }
  ];

  const filteredTests = searchQuery 
    ? tests.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.id.toLowerCase().includes(searchQuery.toLowerCase()))
    : tests;

  const handleAddClick = (test) => {
    console.log('🔥 ADD BUTTON CLICKED!', test);
    console.log('🔥 Current cart before add:', cart);
    
    try {
      const result = addToCart(test);
      console.log('✅ Item added to cart:', result);
      console.log('✅ Cart after add:', cart);
      audioSystem.playSuccess();
      alert(`✅ ${test.name} added to cart! Total items: ${cart.length + 1}`);
    } catch (error) {
      console.error('❌ Error adding to cart:', error);
      alert('❌ Error adding to cart. Check console.');
    }
  };

  console.log('🍷 Alcohol Module Rendered');
  console.log('📦 Cart state:', cart);
  console.log('💰 Cart total:', getTotal());

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '2rem', color: '#fff' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        <h1 style={{ fontSize: '3rem', textAlign: 'center', color: '#ec4899', marginBottom: '1rem' }}>
          Alcohol Analysis
        </h1>
        <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '3rem', fontSize: '1.2rem' }}>
          25 Professional Tests
        </p>

        {/* SEARCH BAR */}
        <div style={{ maxWidth: '600px', margin: '0 auto 3rem' }}>
          <input
            type="text"
            placeholder={language === 'es' ? 'Buscar pruebas...' : 'Search tests...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '1.2rem',
              background: 'rgba(30, 41, 59, 0.6)',
              border: '2px solid #334155',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '1.1rem',
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.borderColor = '#ec4899'}
            onBlur={(e) => e.target.style.borderColor = '#334155'}
          />
        </div>

        {/* TESTS GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {filteredTests.map(test => (
            <div 
              key={test.id} 
              style={{ 
                background: 'rgba(30, 41, 59, 0.6)', 
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(236, 72, 153, 0.3)', 
                borderRadius: '15px', 
                padding: '1.5rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = '#ec4899';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(236, 72, 153, 0.4)';
                audioSystem.playHover();
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(236, 72, 153, 0.3)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.5rem' }}>
                {test.id}
              </div>
              <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '1rem', fontWeight: 'bold', minHeight: '3rem' }}>
                {test.name}
              </h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.5rem', color: '#10b981', fontWeight: 'bold' }}>
                  ${test.price}
                </span>
                <span style={{ color: '#94a3b8' }}>
                  {test.days}d
                </span>
              </div>
              
              {/* ADD BUTTON - COMPLETELY ISOLATED */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('🎯 Button onClick fired for:', test.id);
                  handleAddClick(test);
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  console.log('👆 Button mouseDown:', test.id);
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
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  zIndex: 10
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 5px 15px rgba(236, 72, 153, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                + Add
              </button>
            </div>
          ))}
        </div>

        {filteredTests.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b', fontSize: '1.2rem' }}>
            {language === 'es' ? 'No se encontraron pruebas' : 'No tests found'}
          </div>
        )}

        {/* DEBUG INFO */}
        <div style={{ 
          position: 'fixed', 
          bottom: '1rem', 
          left: '1rem', 
          background: 'rgba(15, 23, 42, 0.9)', 
          padding: '1rem', 
          borderRadius: '10px',
          fontSize: '0.8rem',
          color: '#10b981',
          border: '1px solid #10b981',
          maxWidth: '300px',
          zIndex: 9998
        }}>
          <div>🔍 Debug Info:</div>
          <div>Cart Items: {cart.length}</div>
          <div>Cart Total: ${getTotal().toFixed(2)}</div>
          <div>Tests Shown: {filteredTests.length}</div>
        </div>

      </div>

      {/* FLOATING CART */}
      {cart.length > 0 && (
        <div 
          onClick={() => { 
            console.log('🛒 Cart widget clicked');
            audioSystem.playClick(); 
            navigate('/cart'); 
          }}
          style={{ 
            position: 'fixed', 
            bottom: '2rem', 
            right: '2rem', 
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
            border: '3px solid #10b981', 
            borderRadius: '20px', 
            padding: '1.5rem', 
            minWidth: '180px',
            boxShadow: '0 20px 60px rgba(16, 185, 129, 0.6)',
            cursor: 'pointer',
            zIndex: 9999,
            textAlign: 'center',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05) translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 25px 70px rgba(16, 185, 129, 0.8)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) translateY(0)';
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(16, 185, 129, 0.6)';
          }}
        >
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🛒</div>
          <div style={{ color: '#fff', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            {cart.length} {language === 'es' ? 'artículos' : 'items'}
          </div>
          <div style={{ fontSize: '1.8rem', color: '#fff', fontWeight: 'bold' }}>
            ${getTotal().toFixed(2)}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', marginTop: '0.5rem' }}>
            {language === 'es' ? 'Click para ver' : 'Click to view'}
          </div>
        </div>
      )}

    </div>
  );
};

export default AlcoholAnalysisModule;
