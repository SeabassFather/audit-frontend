import React, { useState } from 'react';
import { agCategories } from './agCategories';
import { loadTestsByCategory, getSubcategories } from './agTestLoader';
import audioSystem from './audioSystem';

const AgScienceDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [tests, setTests] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategorySelect = (category) => {
    audioSystem.playClick();
    setSelectedCategory(category);
    setSelectedSubcategory(null);
    setTests([]);
  };

  const handleSubcategorySelect = (subcategory) => {
    audioSystem.playClick();
    setSelectedSubcategory(subcategory);
    const loadedTests = loadTestsByCategory(selectedCategory.id, subcategory);
    setTests(loadedTests);
  };

  const addToCart = (test) => {
    audioSystem.playSuccess();
    setCart([...cart, test]);
  };

  const removeFromCart = (index) => {
    audioSystem.playWarning();
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  const calculateTotal = () => {
    return cart.reduce((sum, test) => sum + test.price, 0);
  };

  const filteredTests = searchQuery 
    ? tests.filter(test => 
        test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tests;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      padding: '2rem',
      color: '#fff'
    }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1rem'
        }}>
          🌾 Agriculture Science Dashboard
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#94a3b8' }}>
          220+ Premium Tests | AI Analysis | Real-Time Results
        </p>
      </div>

      {/* Step 1: Category Selection WITH EMOJIS */}
      {!selectedCategory && (
        <div>
          <h2 style={{ fontSize: '2rem', color: '#10b981', marginBottom: '2rem', textAlign: 'center' }}>
            1. Select Main Category
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2rem',
            maxWidth: '1400px',
            margin: '0 auto'
          }}>
            {/* VEGETABLES CARD */}
            <div
              onClick={() => handleCategorySelect(agCategories[0])}
              onMouseEnter={() => audioSystem.playHover()}
              style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0.1) 100%)',
                border: '2px solid #10b981',
                borderRadius: '20px',
                padding: '2rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textAlign: 'center'
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(16, 185, 129, 0.6)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🥬</div>
              <h3 style={{ fontSize: '1.8rem', color: '#10b981', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Vegetables
              </h3>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem' }}>
                55
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1rem' }}>
                tests available
              </p>
              <p style={{ color: '#cbd5e1', fontSize: '0.85rem', fontStyle: 'italic' }}>
                Leafy Greens, Cruciferous, Fruiting, Roots, Alliums
              </p>
            </div>

            {/* FRUITS CARD */}
            <div
              onClick={() => handleCategorySelect(agCategories[1])}
              onMouseEnter={() => audioSystem.playHover()}
              style={{
                background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(236, 72, 153, 0.1) 100%)',
                border: '2px solid #ec4899',
                borderRadius: '20px',
                padding: '2rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textAlign: 'center'
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(236, 72, 153, 0.6)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🍎</div>
              <h3 style={{ fontSize: '1.8rem', color: '#ec4899', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Fruits
              </h3>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem' }}>
                45
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1rem' }}>
                tests available
              </p>
              <p style={{ color: '#cbd5e1', fontSize: '0.85rem', fontStyle: 'italic' }}>
                Berries, Citrus, Tropical, Stone Fruits
              </p>
            </div>

            {/* ANIMAL PROTEIN CARD */}
            <div
              onClick={() => handleCategorySelect(agCategories[2])}
              onMouseEnter={() => audioSystem.playHover()}
              style={{
                background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.2) 0%, rgba(249, 115, 22, 0.1) 100%)',
                border: '2px solid #f97316',
                borderRadius: '20px',
                padding: '2rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textAlign: 'center'
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(249, 115, 22, 0.6)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🥩</div>
              <h3 style={{ fontSize: '1.8rem', color: '#f97316', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Animal Protein
              </h3>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem' }}>
                60
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1rem' }}>
                tests available
              </p>
              <p style={{ color: '#cbd5e1', fontSize: '0.85rem', fontStyle: 'italic' }}>
                Beef, Pork, Poultry, Lamb & Goat, Eggs, Dairy
              </p>
            </div>

            {/* SEAFOOD CARD */}
            <div
              onClick={() => handleCategorySelect(agCategories[3])}
              onMouseEnter={() => audioSystem.playHover()}
              style={{
                background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(6, 182, 212, 0.1) 100%)',
                border: '2px solid #06b6d4',
                borderRadius: '20px',
                padding: '2rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textAlign: 'center'
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(6, 182, 212, 0.6)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🐟</div>
              <h3 style={{ fontSize: '1.8rem', color: '#06b6d4', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Seafood
              </h3>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem' }}>
                60
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1rem' }}>
                tests available
              </p>
              <p style={{ color: '#cbd5e1', fontSize: '0.85rem', fontStyle: 'italic' }}>
                Finfish, Crustaceans, Mollusks, Roe & Caviar
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Subcategory Selection */}
      {selectedCategory && !selectedSubcategory && (
        <div>
          <button
            onClick={() => {
              audioSystem.playClick();
              setSelectedCategory(null);
            }}
            style={{
              padding: '0.8rem 1.5rem',
              background: 'rgba(100, 116, 139, 0.3)',
              border: '2px solid #64748b',
              borderRadius: '10px',
              color: '#fff',
              cursor: 'pointer',
              marginBottom: '2rem',
              fontSize: '1rem',
              fontWeight: 'bold'
            }}
            onMouseEnter={() => audioSystem.playHover()}
          >
            ← Back to Categories
          </button>

          <h2 style={{ fontSize: '2rem', color: selectedCategory.color, marginBottom: '2rem', textAlign: 'center' }}>
            {selectedCategory.icon} {selectedCategory.name} - Select Subcategory
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {getSubcategories(selectedCategory.id).map(subcategory => (
              <div
                key={subcategory}
                onClick={() => handleSubcategorySelect(subcategory)}
                onMouseEnter={() => audioSystem.playHover()}
                style={{
                  background: `linear-gradient(135deg, ${selectedCategory.color}30 0%, ${selectedCategory.color}15 100%)`,
                  border: `2px solid ${selectedCategory.color}`,
                  borderRadius: '15px',
                  padding: '1.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'center'
                }}
                onMouseOver={e => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = `0 10px 30px ${selectedCategory.color}40`;
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <h3 style={{ fontSize: '1.3rem', color: selectedCategory.color, fontWeight: 'bold' }}>
                  {subcategory}
                </h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Test List */}
      {selectedSubcategory && (
        <div>
          <button
            onClick={() => {
              audioSystem.playClick();
              setSelectedSubcategory(null);
              setTests([]);
            }}
            style={{
              padding: '0.8rem 1.5rem',
              background: 'rgba(100, 116, 139, 0.3)',
              border: '2px solid #64748b',
              borderRadius: '10px',
              color: '#fff',
              cursor: 'pointer',
              marginBottom: '2rem',
              fontSize: '1rem',
              fontWeight: 'bold'
            }}
            onMouseEnter={() => audioSystem.playHover()}
          >
            ← Back to Subcategories
          </button>

          <h2 style={{ fontSize: '2rem', color: selectedCategory.color, marginBottom: '1rem', textAlign: 'center' }}>
            {selectedCategory.icon} {selectedCategory.name} → {selectedSubcategory}
          </h2>

          {/* Search */}
          <div style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
            <input
              type="text"
              placeholder="🔍 Search tests..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem',
                background: 'rgba(30, 41, 59, 0.8)',
                border: '2px solid #334155',
                borderRadius: '10px',
                color: '#fff',
                fontSize: '1rem'
              }}
            />
          </div>

          {/* Test Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {filteredTests.map(test => (
              <div
                key={test.id}
                style={{
                  background: 'rgba(30, 41, 59, 0.6)',
                  border: `2px solid ${selectedCategory.color}40`,
                  borderRadius: '15px',
                  padding: '1.5rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={e => {
                  e.currentTarget.style.borderColor = selectedCategory.color;
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.borderColor = `${selectedCategory.color}40`;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.5rem' }}>
                  {test.id}
                </div>
                <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1rem', fontWeight: 'bold' }}>
                  {test.name}
                </h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ color: '#10b981', fontSize: '1.3rem', fontWeight: 'bold' }}>
                    ${test.price}
                  </span>
                  <span style={{ color: '#94a3b8' }}>
                    ⏱️ {test.turnaround} days
                  </span>
                </div>
                <button
                  onClick={() => addToCart(test)}
                  onMouseEnter={() => audioSystem.playHover()}
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    background: `linear-gradient(135deg, ${selectedCategory.color} 0%, ${selectedCategory.color}dd 100%)`,
                    border: 'none',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  ➕ Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Shopping Cart */}
      {cart.length > 0 && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          background: 'rgba(15, 23, 42, 0.95)',
          border: '2px solid #10b981',
          borderRadius: '20px',
          padding: '1.5rem',
          minWidth: '350px',
          maxHeight: '500px',
          overflowY: 'auto',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
        }}>
          <h3 style={{ fontSize: '1.5rem', color: '#10b981', marginBottom: '1rem' }}>
            🛒 Cart ({cart.length})
          </h3>
          {cart.map((test, index) => (
            <div
              key={index}
              style={{
                background: 'rgba(30, 41, 59, 0.6)',
                padding: '0.8rem',
                borderRadius: '10px',
                marginBottom: '0.8rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.9rem', color: '#fff', marginBottom: '0.3rem' }}>
                  {test.name}
                </div>
                <div style={{ fontSize: '1rem', color: '#10b981', fontWeight: 'bold' }}>
                  ${test.price}
                </div>
              </div>
              <button
                onClick={() => removeFromCart(index)}
                style={{
                  background: '#ef4444',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                  padding: '0.5rem 0.8rem',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}
              >
                ✖
              </button>
            </div>
          ))}
          <div style={{
            borderTop: '2px solid #334155',
            paddingTop: '1rem',
            marginTop: '1rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 'bold' }}>Total:</span>
              <span style={{ fontSize: '1.5rem', color: '#10b981', fontWeight: 'bold' }}>
                ${calculateTotal()}
              </span>
            </div>
            <button
              onClick={() => {
                audioSystem.playSuccess();
                alert(`Order submitted! Total: $${calculateTotal()}`);
                setCart([]);
              }}
              style={{
                width: '100%',
                padding: '1rem',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                border: 'none',
                borderRadius: '10px',
                color: '#fff',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              💳 Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgScienceDashboard;