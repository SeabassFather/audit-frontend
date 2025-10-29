import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import audioSystem from './audioSystem';
import QRCodeGenerator from './QRCodeGenerator';

const AuditDNAEnvAI = () => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [cart, setCart] = useState([]);
  const [showQR, setShowQR] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  const categories = [
    { id: 'vegetables', name: 'Vegetables', nameEs: 'Verduras', icon: '??', color: '#10b981', products: 120 },
    { id: 'fruits', name: 'Fruits', nameEs: 'Frutas', icon: '??', color: '#ec4899', products: 85 },
    { id: 'grains', name: 'Grains', nameEs: 'Granos', icon: '??', color: '#f59e0b', products: 45 },
    { id: 'legumes', name: 'Legumes', nameEs: 'Legumbres', icon: '??', color: '#8b5cf6', products: 35 },
    { id: 'nuts', name: 'Nuts & Seeds', nameEs: 'Nueces y Semillas', icon: '??', color: '#f97316', products: 40 },
    { id: 'herbs', name: 'Herbs & Spices', nameEs: 'Hierbas y Especias', icon: '??', color: '#14b8a6', products: 60 },
    { id: 'dairy', name: 'Dairy', nameEs: 'Lácteos', icon: '??', color: '#06b6d4', products: 30 },
    { id: 'meat', name: 'Meat & Poultry', nameEs: 'Carne y Aves', icon: '??', color: '#ef4444', products: 50 },
    { id: 'seafood', name: 'Seafood', nameEs: 'Mariscos', icon: '??', color: '#0ea5e9', products: 45 }
  ];

  const allProducts = {
    vegetables: ['Lettuce', 'Spinach', 'Kale', 'Cabbage', 'Broccoli', 'Cauliflower', 'Brussels Sprouts', 'Carrots', 'Beets', 'Radish', 'Turnips', 'Potatoes', 'Sweet Potatoes', 'Yams', 'Tomatoes', 'Peppers', 'Cucumbers', 'Zucchini', 'Eggplant', 'Squash', 'Pumpkins', 'Onions', 'Garlic', 'Leeks', 'Shallots', 'Scallions', 'Celery', 'Asparagus'],
    fruits: ['Apples', 'Pears', 'Oranges', 'Lemons', 'Limes', 'Grapefruits', 'Bananas', 'Strawberries', 'Blueberries', 'Raspberries', 'Blackberries', 'Cranberries', 'Grapes', 'Watermelon', 'Cantaloupe', 'Honeydew', 'Peaches', 'Plums', 'Cherries', 'Mangoes', 'Pineapples', 'Papayas', 'Kiwis', 'Pomegranates', 'Figs', 'Dates'],
    grains: ['Wheat', 'Rice', 'Corn', 'Barley', 'Oats', 'Rye', 'Millet', 'Quinoa', 'Buckwheat', 'Sorghum', 'Amaranth', 'Teff', 'Spelt', 'Farro', 'Bulgur'],
    legumes: ['Black Beans', 'Kidney Beans', 'Pinto Beans', 'Navy Beans', 'Chickpeas', 'Lentils', 'Split Peas', 'Black-Eyed Peas', 'Soybeans', 'Edamame', 'Lima Beans'],
    nuts: ['Almonds', 'Walnuts', 'Pecans', 'Cashews', 'Pistachios', 'Hazelnuts', 'Macadamias', 'Pine Nuts', 'Brazil Nuts', 'Peanuts', 'Sunflower Seeds', 'Pumpkin Seeds', 'Chia Seeds', 'Flax Seeds', 'Hemp Seeds', 'Sesame Seeds'],
    herbs: ['Basil', 'Oregano', 'Thyme', 'Rosemary', 'Sage', 'Parsley', 'Cilantro', 'Dill', 'Mint', 'Chives', 'Tarragon', 'Bay Leaves', 'Cinnamon', 'Cumin', 'Turmeric', 'Paprika', 'Black Pepper', 'Ginger', 'Cardamom', 'Cloves', 'Nutmeg'],
    dairy: ['Milk', 'Cheese', 'Yogurt', 'Butter', 'Cream', 'Sour Cream', 'Cottage Cheese', 'Ricotta', 'Mozzarella', 'Cheddar', 'Swiss', 'Parmesan', 'Feta', 'Goat Cheese'],
    meat: ['Beef', 'Pork', 'Lamb', 'Chicken', 'Turkey', 'Duck', 'Goose', 'Veal', 'Bacon', 'Sausage', 'Ham', 'Ground Beef', 'Steaks', 'Ribs', 'Wings'],
    seafood: ['Salmon', 'Tuna', 'Cod', 'Halibut', 'Tilapia', 'Shrimp', 'Crab', 'Lobster', 'Oysters', 'Clams', 'Mussels', 'Scallops', 'Squid', 'Octopus', 'Sardines']
  };

  const tests = [
    { id: 'AI-001', name: 'Pesticide Multi-Residue Analysis', price: 175, days: 5 },
    { id: 'AI-002', name: 'Heavy Metals Panel (Pb, Cd, As, Hg)', price: 145, days: 4 },
    { id: 'AI-003', name: 'Microbial Contamination (E.coli, Salmonella)', price: 95, days: 3 },
    { id: 'AI-004', name: 'Nutritional Profile Analysis', price: 120, days: 3 },
    { id: 'AI-005', name: 'GMO Detection', price: 135, days: 4 },
    { id: 'AI-006', name: 'Allergen Testing Panel', price: 110, days: 3 },
    { id: 'AI-007', name: 'Aflatoxin Screening', price: 125, days: 4 },
    { id: 'AI-008', name: 'Mycotoxin Panel', price: 155, days: 5 }
  ];

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    audioSystem.playClick();
    
    setTimeout(() => {
      const results = [];
      Object.entries(allProducts).forEach(([catId, products]) => {
        const matches = products.filter(p => 
          p.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (matches.length > 0) {
          const cat = categories.find(c => c.id === catId);
          results.push({
            category: cat,
            matches: matches
          });
        }
      });
      setSearchResults(results);
      setIsSearching(false);
      audioSystem.playSuccess();
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      const timer = setTimeout(() => {
        handleSearch();
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      padding: '2rem',
      color: '#fff'
    }}>
      <h1 style={{
        fontSize: '3rem',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '0.5rem'
      }}>
        ?? AI Environmental Analysis
      </h1>
      <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '2rem' }}>
        {language === 'es' ? 'Análisis Predictivo • Recomendaciones Inteligentes • 500+ Productos' : 'Predictive Analysis • Smart Recommendations • 500+ Products'}
      </p>

      {/* ACTION BUTTONS */}
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap' }}>
        <button onClick={() => setShowUpload(!showUpload)} style={{
          padding: '1rem 2rem',
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          border: 'none',
          borderRadius: '10px',
          color: '#fff',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '1rem'
        }}>
          ?? Upload Results
        </button>
        <button onClick={() => setShowQR(!showQR)} style={{
          padding: '1rem 2rem',
          background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
          border: 'none',
          borderRadius: '10px',
          color: '#fff',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '1rem'
        }}>
          ?? Generate QR
        </button>
        <button style={{
          padding: '1rem 2rem',
          background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
          border: 'none',
          borderRadius: '10px',
          color: '#fff',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '1rem'
        }}>
          ?? Pay (${cart.length * 125})
        </button>
      </div>

      {showQR && <QRCodeGenerator orderId="AI-001" customerEmail="customer@example.com" testName="AI Analysis" />}

      {!selectedCategory && !selectedProduct ? (
        <div>
          {/* CATEGORIES OR SEARCH */}
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            
            {/* SEARCH BAR */}
            <div style={{
              background: 'rgba(30, 41, 59, 0.6)',
              borderRadius: '20px',
              padding: '2rem',
              marginBottom: '3rem',
              border: '2px solid #334155'
            }}>
              <h2 style={{ fontSize: '2rem', color: '#ec4899', marginBottom: '1.5rem', textAlign: 'center' }}>
                ?? {language === 'es' ? 'Buscar en 500+ Productos' : 'Search 500+ Products'}
              </h2>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <input
                  type="text"
                  placeholder={language === 'es' ? 'Escriba el nombre del producto (ej: sunflower seeds)...' : 'Type product name (e.g., sunflower seeds)...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  style={{
                    flex: 1,
                    padding: '1.2rem',
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '2px solid #334155',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '1.1rem',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#ec4899'}
                  onBlur={(e) => e.target.style.borderColor = '#334155'}
                />
                <button
                  onClick={handleSearch}
                  disabled={isSearching}
                  style={{
                    padding: '1.2rem 2.5rem',
                    background: isSearching 
                      ? 'rgba(100, 116, 139, 0.5)'
                      : 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#fff',
                    fontWeight: 'bold',
                    cursor: isSearching ? 'not-allowed' : 'pointer',
                    fontSize: '1.1rem',
                    minWidth: '150px'
                  }}
                >
                  {isSearching ? '? Searching...' : '?? Search'}
                </button>
              </div>

              {searchQuery && (
                <div style={{
                  marginTop: '1rem',
                  padding: '0.8rem',
                  background: 'rgba(236, 72, 153, 0.1)',
                  border: '1px solid #ec4899',
                  borderRadius: '8px',
                  color: '#ec4899',
                  fontSize: '0.9rem'
                }}>
                  ?? Press Enter or click Search button to find products
                </div>
              )}
            </div>

            {/* SEARCH RESULTS */}
            {searchResults.length > 0 && (
              <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2rem', color: '#10b981', marginBottom: '2rem' }}>
                  ? Found {searchResults.reduce((sum, r) => sum + r.matches.length, 0)} Results
                </h2>
                
                {searchResults.map((result, idx) => (
                  <div key={idx} style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.5rem', color: result.category.color, marginBottom: '1rem' }}>
                      {result.category.icon} {result.category.name} ({result.matches.length})
                    </h3>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                      gap: '1rem'
                    }}>
                      {result.matches.map((product, pIdx) => (
                        <div
                          key={pIdx}
                          onClick={() => {
                            audioSystem.playClick();
                            setSelectedCategory(result.category);
                            setSelectedProduct(product);
                          }}
                          onMouseEnter={() => audioSystem.playHover()}
                          style={{
                            background: `linear-gradient(135deg, ${result.category.color}20 0%, ${result.category.color}10 100%)`,
                            border: `2px solid ${result.category.color}`,
                            borderRadius: '12px',
                            padding: '1.5rem',
                            cursor: 'pointer',
                            textAlign: 'center',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{result.category.icon}</div>
                          <div style={{ fontSize: '1rem', color: '#fff', fontWeight: 'bold' }}>
                            {product}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CATEGORIES */}
            <h2 style={{ fontSize: '2rem', color: '#ec4899', marginBottom: '2rem', textAlign: 'center' }}>
              {language === 'es' ? 'O Explorar por Categoría' : 'Or Browse by Category'}
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem'
            }}>
              {categories.map(cat => (
                <div
                  key={cat.id}
                  onClick={() => {
                    audioSystem.playClick();
                    setSelectedCategory(cat);
                  }}
                  onMouseEnter={() => audioSystem.playHover()}
                  style={{
                    background: `linear-gradient(135deg, ${cat.color}20 0%, ${cat.color}10 100%)`,
                    border: `2px solid ${cat.color}`,
                    borderRadius: '20px',
                    padding: '2rem',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{cat.icon}</div>
                  <h3 style={{ fontSize: '1.5rem', color: cat.color, marginBottom: '0.5rem' }}>
                    {language === 'es' ? cat.nameEs : cat.name}
                  </h3>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    {cat.products}
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                    {language === 'es' ? 'productos' : 'products'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : selectedProduct ? (
        <div>
          <button
            onClick={() => setSelectedProduct(null)}
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
            ? Back
          </button>

          <h2 style={{ fontSize: '2.5rem', color: selectedCategory.color, marginBottom: '2rem', textAlign: 'center' }}>
            {selectedCategory.icon} {selectedProduct}
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {tests.map(test => (
              <div
                key={test.id}
                style={{
                  background: 'rgba(30, 41, 59, 0.6)',
                  border: '2px solid rgba(236, 72, 153, 0.3)',
                  borderRadius: '15px',
                  padding: '1.5rem'
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
                    ?? {test.days}d
                  </span>
                </div>
                <button
                  onClick={() => {
                    audioSystem.playSuccess();
                    setCart([...cart, test]);
                  }}
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
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
        </div>
      ) : null}

      {cart.length > 0 && (
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
            ?? Cart ({cart.length})
          </h3>
          <div style={{ fontSize: '2rem', color: '#10b981', fontWeight: 'bold' }}>
            ${cart.reduce((sum, t) => sum + t.price, 0)}
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditDNAEnvAI;
