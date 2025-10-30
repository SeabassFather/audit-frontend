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
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [aiAnalysis, setAiAnalysis] = useState(null);

  const categories = [
    { id: 'vegetables', name: 'Vegetables', nameEs: 'Verduras', icon: '', color: '#10b981', products: 120, gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' },
    { id: 'fruits', name: 'Fruits', nameEs: 'Frutas', icon: '', color: '#ec4899', products: 85, gradient: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)' },
    { id: 'grains', name: 'Grains', nameEs: 'Granos', icon: '', color: '#f59e0b', products: 45, gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' },
    { id: 'legumes', name: 'Legumes', nameEs: 'Legumbres', icon: '', color: '#8b5cf6', products: 35, gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' },
    { id: 'nuts', name: 'Nuts & Seeds', nameEs: 'Nueces y Semillas', icon: '', color: '#f97316', products: 40, gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)' },
    { id: 'herbs', name: 'Herbs & Spices', nameEs: 'Hierbas', icon: '', color: '#14b8a6', products: 60, gradient: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)' },
    { id: 'dairy', name: 'Dairy', nameEs: 'Lácteos', icon: '', color: '#06b6d4', products: 30, gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)' },
    { id: 'meat', name: 'Meat & Poultry', nameEs: 'Carne', icon: '', color: '#ef4444', products: 50, gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' },
    { id: 'seafood', name: 'Seafood', nameEs: 'Mariscos', icon: '', color: '#0ea5e9', products: 45, gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)' }
  ];

  const allProducts = {
    vegetables: ['Lettuce', 'Spinach', 'Kale', 'Arugula', 'Cabbage', 'Broccoli', 'Cauliflower', 'Brussels Sprouts', 'Bok Choy', 'Carrots', 'Beets', 'Radish', 'Turnips', 'Potatoes', 'Sweet Potatoes', 'Yams', 'Tomatoes', 'Cherry Tomatoes', 'Bell Peppers', 'Jalapeños', 'Cucumbers', 'Zucchini', 'Eggplant', 'Butternut Squash', 'Acorn Squash', 'Pumpkins', 'Onions', 'Red Onions', 'Garlic', 'Leeks', 'Shallots', 'Scallions', 'Celery', 'Asparagus', 'Green Beans', 'Snap Peas', 'Snow Peas', 'Artichokes', 'Fennel', 'Okra'],
    fruits: ['Apples', 'Granny Smith', 'Honeycrisp', 'Pears', 'Oranges', 'Navel Oranges', 'Blood Oranges', 'Lemons', 'Limes', 'Grapefruits', 'Tangerines', 'Clementines', 'Bananas', 'Plantains', 'Strawberries', 'Blueberries', 'Raspberries', 'Blackberries', 'Cranberries', 'Grapes', 'Red Grapes', 'Green Grapes', 'Watermelon', 'Cantaloupe', 'Honeydew', 'Peaches', 'Nectarines', 'Plums', 'Cherries', 'Apricots', 'Mangoes', 'Pineapples', 'Papayas', 'Kiwis', 'Pomegranates', 'Figs', 'Dates', 'Dragon Fruit', 'Passion Fruit', 'Guava', 'Lychee'],
    grains: ['Wheat', 'Hard Red Winter Wheat', 'Soft White Wheat', 'Durum Wheat', 'Rice', 'White Rice', 'Brown Rice', 'Jasmine Rice', 'Basmati Rice', 'Wild Rice', 'Corn', 'Sweet Corn', 'Field Corn', 'Barley', 'Oats', 'Rolled Oats', 'Steel Cut Oats', 'Rye', 'Millet', 'Quinoa', 'White Quinoa', 'Red Quinoa', 'Black Quinoa', 'Buckwheat', 'Sorghum', 'Amaranth', 'Teff', 'Spelt', 'Farro', 'Bulgur', 'Kamut', 'Freekeh'],
    legumes: ['Black Beans', 'Kidney Beans', 'Pinto Beans', 'Navy Beans', 'Great Northern Beans', 'Cannellini Beans', 'Lima Beans', 'Chickpeas', 'Garbanzo Beans', 'Lentils', 'Red Lentils', 'Green Lentils', 'Black Lentils', 'Split Peas', 'Yellow Split Peas', 'Green Split Peas', 'Black-Eyed Peas', 'Soybeans', 'Edamame', 'Mung Beans', 'Adzuki Beans', 'Fava Beans'],
    nuts: ['Almonds', 'Raw Almonds', 'Roasted Almonds', 'Walnuts', 'Black Walnuts', 'English Walnuts', 'Pecans', 'Cashews', 'Pistachios', 'Hazelnuts', 'Macadamias', 'Pine Nuts', 'Brazil Nuts', 'Peanuts', 'Sunflower Seeds', 'Pumpkin Seeds', 'Pepitas', 'Chia Seeds', 'Flax Seeds', 'Hemp Seeds', 'Sesame Seeds', 'Poppy Seeds'],
    herbs: ['Basil', 'Sweet Basil', 'Thai Basil', 'Oregano', 'Thyme', 'Rosemary', 'Sage', 'Parsley', 'Flat Leaf Parsley', 'Cilantro', 'Coriander', 'Dill', 'Mint', 'Spearmint', 'Peppermint', 'Chives', 'Tarragon', 'Bay Leaves', 'Marjoram', 'Cinnamon', 'Cumin', 'Turmeric', 'Paprika', 'Smoked Paprika', 'Black Pepper', 'White Pepper', 'Ginger', 'Cardamom', 'Cloves', 'Nutmeg', 'Allspice', 'Fennel Seeds', 'Mustard Seeds', 'Curry Powder'],
    dairy: ['Whole Milk', '2% Milk', 'Skim Milk', 'Almond Milk', 'Cheddar Cheese', 'Mozzarella', 'Swiss Cheese', 'Parmesan', 'Feta', 'Goat Cheese', 'Brie', 'Camembert', 'Greek Yogurt', 'Regular Yogurt', 'Butter', 'Salted Butter', 'Unsalted Butter', 'Heavy Cream', 'Sour Cream', 'Cottage Cheese', 'Ricotta', 'Cream Cheese'],
    meat: ['Beef', 'Ground Beef', 'Ribeye Steak', 'Sirloin Steak', 'Filet Mignon', 'Brisket', 'Short Ribs', 'Pork', 'Pork Chops', 'Pork Tenderloin', 'Bacon', 'Sausage', 'Italian Sausage', 'Ham', 'Lamb', 'Lamb Chops', 'Leg of Lamb', 'Chicken', 'Chicken Breast', 'Chicken Thighs', 'Chicken Wings', 'Whole Chicken', 'Turkey', 'Turkey Breast', 'Ground Turkey', 'Duck', 'Duck Breast', 'Goose', 'Veal', 'Venison'],
    seafood: ['Salmon', 'Atlantic Salmon', 'Sockeye Salmon', 'Coho Salmon', 'Tuna', 'Yellowfin Tuna', 'Albacore Tuna', 'Cod', 'Halibut', 'Tilapia', 'Mahi Mahi', 'Swordfish', 'Shrimp', 'Jumbo Shrimp', 'Tiger Shrimp', 'Crab', 'King Crab', 'Snow Crab', 'Lobster', 'Maine Lobster', 'Oysters', 'Clams', 'Mussels', 'Scallops', 'Squid', 'Calamari', 'Octopus', 'Sardines', 'Anchovies', 'Mackerel']
  };

  const tests = [
    { id: 'AI-001', name: 'Pesticide Multi-Residue (400+ compounds)', price: 185, days: 5, icon: '' },
    { id: 'AI-002', name: 'Heavy Metals Panel (Pb, Cd, As, Hg, Cr)', price: 155, days: 4, icon: '' },
    { id: 'AI-003', name: 'Microbial Contamination Full Panel', price: 125, days: 3, icon: '' },
    { id: 'AI-004', name: 'Complete Nutritional Profile', price: 145, days: 3, icon: '' },
    { id: 'AI-005', name: 'GMO Detection & Verification', price: 165, days: 4, icon: '' },
    { id: 'AI-006', name: 'Comprehensive Allergen Testing', price: 135, days: 3, icon: '' },
    { id: 'AI-007', name: 'Mycotoxin Screening Panel', price: 175, days: 5, icon: '' },
    { id: 'AI-008', name: 'Authenticity & Origin Verification', price: 195, days: 6, icon: '?' }
  ];

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    audioSystem.playClick();
    setTimeout(() => {
      const results = [];
      Object.entries(allProducts).forEach(([catId, products]) => {
        const matches = products.filter(p => p.toLowerCase().includes(searchQuery.toLowerCase()));
        if (matches.length > 0) {
          const cat = categories.find(c => c.id === catId);
          results.push({ category: cat, matches });
        }
      });
      setSearchResults(results);
      setIsSearching(false);
      audioSystem.playSuccess();
    }, 400);
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      const timer = setTimeout(handleSearch, 300);
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '2rem', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      
      {/* Animated Background Particles */}
      {[...Array(40)].map((_, i) => (
        <div key={i} style={{ position: 'absolute', width: `${Math.random() * 3 + 1}px`, height: `${Math.random() * 3 + 1}px`, background: ['#ec4899', '#10b981', '#3b82f6', '#f59e0b'][i % 4], borderRadius: '50%', top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, animation: `float ${Math.random() * 15 + 10}s ease-in-out infinite`, opacity: 0.4, boxShadow: `0 0 10px ${['#ec4899', '#10b981', '#3b82f6', '#f59e0b'][i % 4]}` }} />
      ))}

      <style>{`@keyframes float { 0%, 100% { transform: translateY(0) translateX(0); } 50% { transform: translateY(-30px) translateX(15px); } }`}</style>

      <h1 style={{ fontSize: '3.5rem', textAlign: 'center', background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.5rem', position: 'relative', zIndex: 1 }}>
        AI Environmental Analysis
      </h1>
      <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '2rem', fontSize: '1.2rem', position: 'relative', zIndex: 1 }}>
        {language === 'es' ? 'Análisis Predictivo • Recomendaciones Inteligentes • 500+ Productos' : 'Predictive Analysis • Smart Recommendations • 500+ Products'}
      </p>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
        <button onClick={() => document.getElementById('fileUpload').click()} style={{ padding: '1rem 2rem', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem', boxShadow: '0 10px 30px rgba(16, 185, 129, 0.4)', transition: 'all 0.3s ease' }} onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>
           Upload Results
        </button>
        <input id="fileUpload" type="file" multiple style={{ display: 'none' }} onChange={(e) => setUploadedFiles([...uploadedFiles, ...Array.from(e.target.files)])} />
        <button onClick={() => setShowQR(!showQR)} style={{ padding: '1rem 2rem', background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem', boxShadow: '0 10px 30px rgba(59, 130, 246, 0.4)' }}>
           Generate QR
        </button>
        <button style={{ padding: '1rem 2rem', background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem', boxShadow: '0 10px 30px rgba(139, 92, 246, 0.4)' }}>
           Pay (${cart.reduce((sum, t) => sum + t.price, 0)})
        </button>
      </div>

      {showQR && <div style={{ textAlign: 'center', marginBottom: '2rem' }}><QRCodeGenerator orderId="AI-001" customerEmail="customer@example.com" testName="AI Analysis" /></div>}

      {!selectedCategory && !selectedProduct ? (
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ background: 'rgba(30, 41, 59, 0.6)', backdropFilter: 'blur(20px)', borderRadius: '25px', padding: '3rem', marginBottom: '3rem', border: '2px solid rgba(236, 72, 153, 0.3)', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)' }}>
            <h2 style={{ fontSize: '2.5rem', color: '#ec4899', marginBottom: '2rem', textAlign: 'center', textShadow: '0 0 20px rgba(236, 72, 153, 0.5)' }}>
               {language === 'es' ? 'Buscar en 500+ Productos' : 'Search 500+ Products'}
            </h2>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <input type="text" placeholder={language === 'es' ? 'Escriba el nombre del producto (ej: sunflower seeds)...' : 'Type product name (e.g., sunflower seeds)...'} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSearch()} style={{ flex: 1, padding: '1.5rem', background: 'rgba(15, 23, 42, 0.8)', border: '2px solid #334155', borderRadius: '15px', color: '#fff', fontSize: '1.2rem', outline: 'none' }} onFocus={(e) => e.target.style.borderColor = '#ec4899'} onBlur={(e) => e.target.style.borderColor = '#334155'} />
              <button onClick={handleSearch} disabled={isSearching} style={{ padding: '1.5rem 3rem', background: isSearching ? 'rgba(100, 116, 139, 0.5)' : 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)', border: 'none', borderRadius: '15px', color: '#fff', fontWeight: 'bold', cursor: isSearching ? 'not-allowed' : 'pointer', fontSize: '1.2rem', minWidth: '180px', boxShadow: '0 10px 30px rgba(236, 72, 153, 0.4)' }}>
                {isSearching ? '? Searching...' : ' Search'}
              </button>
            </div>
          </div>

          {searchResults.length > 0 && (
            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '2.5rem', color: '#10b981', marginBottom: '2rem', textAlign: 'center' }}>
                ? Found {searchResults.reduce((sum, r) => sum + r.matches.length, 0)} Results
              </h2>
              {searchResults.map((result, idx) => (
                <div key={idx} style={{ marginBottom: '3rem' }}>
                  <h3 style={{ fontSize: '2rem', color: result.category.color, marginBottom: '1.5rem', textShadow: `0 0 20px ${result.category.color}` }}>
                    {result.category.icon} {result.category.name} ({result.matches.length})
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
                    {result.matches.map((product, pIdx) => (
                      <div key={pIdx} onClick={() => { audioSystem.playClick(); setSelectedCategory(result.category); setSelectedProduct(product); }} onMouseEnter={() => audioSystem.playHover()} style={{ background: `${result.category.gradient}`, border: `2px solid ${result.category.color}`, borderRadius: '20px', padding: '2rem', cursor: 'pointer', textAlign: 'center', transition: 'all 0.4s ease', boxShadow: `0 10px 30px ${result.category.color}40` }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)'; e.currentTarget.style.boxShadow = `0 20px 50px ${result.category.color}80`; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = `0 10px 30px ${result.category.color}40`; }}>
                        <div style={{ fontSize: '3.5rem', marginBottom: '1rem', filter: `drop-shadow(0 0 10px ${result.category.color})` }}>{result.category.icon}</div>
                        <div style={{ fontSize: '1.1rem', color: '#fff', fontWeight: 'bold' }}>{product}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <h2 style={{ fontSize: '2.5rem', color: '#ec4899', marginBottom: '2rem', textAlign: 'center' }}>
            {language === 'es' ? 'O Explorar por Categoría' : 'Or Browse by Category'}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {categories.map(cat => (
              <div key={cat.id} onClick={() => { audioSystem.playClick(); setSelectedCategory(cat); }} onMouseEnter={() => audioSystem.playHover()} style={{ background: cat.gradient, border: `3px solid ${cat.color}`, borderRadius: '25px', padding: '2.5rem', cursor: 'pointer', textAlign: 'center', transition: 'all 0.4s ease', position: 'relative', overflow: 'hidden', boxShadow: `0 15px 40px ${cat.color}60` }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-15px) scale(1.05)'; e.currentTarget.style.boxShadow = `0 25px 60px ${cat.color}90`; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = `0 15px 40px ${cat.color}60`; }}>
                <div style={{ fontSize: '5rem', marginBottom: '1rem', filter: `drop-shadow(0 0 15px ${cat.color})` }}>{cat.icon}</div>
                <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '0.5rem', fontWeight: 'bold', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                  {language === 'es' ? cat.nameEs : cat.name}
                </h3>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#fff' }}>{cat.products}</div>
                <p style={{ color: '#e5e7eb', fontSize: '1rem' }}>{language === 'es' ? 'productos' : 'products'}</p>
              </div>
            ))}
          </div>
        </div>
      ) : selectedProduct ? (
        <div>
          <button onClick={() => setSelectedProduct(null)} style={{ padding: '1rem 2rem', background: 'rgba(100, 116, 139, 0.3)', border: '2px solid #64748b', borderRadius: '12px', color: '#fff', cursor: 'pointer', marginBottom: '2rem', fontWeight: 'bold' }}>? Back</button>
          <h2 style={{ fontSize: '3rem', color: selectedCategory.color, marginBottom: '3rem', textAlign: 'center', textShadow: `0 0 30px ${selectedCategory.color}` }}>
            {selectedCategory.icon} {selectedProduct}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
            {tests.map(test => (
              <div key={test.id} style={{ background: 'rgba(30, 41, 59, 0.6)', backdropFilter: 'blur(20px)', border: '2px solid rgba(236, 72, 153, 0.3)', borderRadius: '20px', padding: '2rem', boxShadow: '0 15px 40px rgba(0, 0, 0, 0.3)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.9rem', color: '#64748b' }}>{test.id}</div>
                  <div style={{ fontSize: '2.5rem' }}>{test.icon}</div>
                </div>
                <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '1.5rem', fontWeight: 'bold', minHeight: '3.5rem' }}>{test.name}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <span style={{ color: '#10b981', fontSize: '1.8rem', fontWeight: 'bold' }}>${test.price}</span>
                  <span style={{ color: '#94a3b8', fontSize: '1.1rem' }}> {test.days}d</span>
                </div>
                <button onClick={() => { audioSystem.playSuccess(); setCart([...cart, test]); }} style={{ width: '100%', padding: '1rem', background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem', boxShadow: '0 10px 30px rgba(236, 72, 153, 0.4)' }}>+ Add</button>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {cart.length > 0 && (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', background: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(20px)', border: '2px solid #ec4899', borderRadius: '25px', padding: '2rem', minWidth: '350px', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)', zIndex: 1000 }}>
          <h3 style={{ color: '#ec4899', marginBottom: '1rem', fontSize: '1.5rem' }}> Cart ({cart.length})</h3>
          <div style={{ fontSize: '2.5rem', color: '#10b981', fontWeight: 'bold', marginBottom: '1rem' }}>${cart.reduce((sum, t) => sum + t.price, 0)}</div>
          <button style={{ width: '100%', padding: '1rem', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem' }}>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default AuditDNAEnvAI;

