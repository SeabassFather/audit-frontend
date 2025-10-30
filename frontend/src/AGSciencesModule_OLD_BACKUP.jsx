import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { useCart } from './CartContext';
import audioSystem from './audioSystem';

const AGSciencesModule = () => {
  const { language } = useLanguage();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const agCategories = [
    {
      id: 'vegetables',
      name: 'Vegetables',
      nameEs: 'Vegetales',
      icon: '🥬',
      color: '#10b981',
      products: ['Lettuce', 'Romaine Lettuce', 'Iceberg Lettuce', 'Butterhead Lettuce', 'Spinach', 'Baby Spinach', 'Kale', 'Curly Kale', 'Lacinato Kale', 'Arugula', 'Baby Arugula', 'Cabbage', 'Green Cabbage', 'Red Cabbage', 'Napa Cabbage', 'Savoy Cabbage', 'Broccoli', 'Broccolini', 'Cauliflower', 'Romanesco', 'Brussels Sprouts', 'Tomatoes', 'Cherry Tomatoes', 'Grape Tomatoes', 'Roma Tomatoes', 'Beefsteak Tomatoes', 'Heirloom Tomatoes', 'Sun-Dried Tomatoes', 'Bell Peppers', 'Red Bell Peppers', 'Yellow Bell Peppers', 'Orange Bell Peppers', 'Green Bell Peppers', 'Hot Peppers', 'Jalapeños', 'Serrano Peppers', 'Habanero Peppers', 'Poblano Peppers', 'Anaheim Peppers', 'Banana Peppers', 'Cucumbers', 'English Cucumbers', 'Persian Cucumbers', 'Pickling Cucumbers', 'Zucchini', 'Yellow Squash', 'Butternut Squash', 'Acorn Squash', 'Spaghetti Squash', 'Delicata Squash', 'Kabocha Squash', 'Pumpkin', 'Sugar Pumpkins', 'Carving Pumpkins', 'Carrots', 'Baby Carrots', 'Rainbow Carrots', 'Beets', 'Golden Beets', 'Chioggia Beets', 'Radishes', 'Daikon Radish', 'Watermelon Radish', 'Turnips', 'Rutabaga', 'Parsnips', 'Potatoes', 'Russet Potatoes', 'Red Potatoes', 'Yukon Gold Potatoes', 'Fingerling Potatoes', 'Purple Potatoes', 'Sweet Potatoes', 'Purple Sweet Potatoes', 'Japanese Sweet Potatoes', 'Yams', 'Onions', 'Yellow Onions', 'Red Onions', 'White Onions', 'Sweet Onions', 'Pearl Onions', 'Shallots', 'Garlic', 'Elephant Garlic', 'Black Garlic', 'Leeks', 'Green Onions', 'Scallions', 'Chives', 'Chinese Chives', 'Celery', 'Celery Root', 'Asparagus', 'White Asparagus', 'Purple Asparagus', 'Artichokes', 'Baby Artichokes', 'Eggplant', 'Japanese Eggplant', 'Chinese Eggplant', 'Okra', 'Bok Choy', 'Baby Bok Choy', 'Green Beans', 'Yellow Wax Beans', 'Purple Beans', 'Snap Peas', 'Snow Peas', 'Edamame', 'Corn', 'Sweet Corn', 'Baby Corn']
    },
    {
      id: 'fruits',
      name: 'Fruits',
      nameEs: 'Frutas',
      icon: '🍎',
      color: '#ec4899',
      products: ['Apples', 'Fuji Apples', 'Gala Apples', 'Honeycrisp Apples', 'Granny Smith Apples', 'Pears', 'Oranges', 'Lemons', 'Limes', 'Grapefruit', 'Tangerines', 'Mandarins', 'Bananas', 'Plantains', 'Mangoes', 'Papayas', 'Pineapples', 'Avocados', 'Guavas', 'Passion Fruit', 'Strawberries', 'Blueberries', 'Raspberries', 'Blackberries', 'Cranberries', 'Grapes', 'Watermelon', 'Cantaloupe', 'Honeydew', 'Peaches', 'Nectarines', 'Plums', 'Apricots', 'Cherries', 'Figs', 'Dates', 'Pomegranates', 'Kiwi', 'Dragon Fruit', 'Star Fruit', 'Lychee', 'Coconut', 'Durian', 'Jackfruit', 'Persimmons']
    },
    {
      id: 'berries',
      name: 'Berries',
      nameEs: 'Bayas',
      icon: '🫐',
      color: '#8b5cf6',
      products: ['Strawberries', 'Blueberries', 'Raspberries', 'Blackberries', 'Cranberries', 'Goji Berries', 'Acai Berries', 'Elderberries', 'Mulberries', 'Gooseberries', 'Currants', 'Boysenberries', 'Loganberries', 'Marionberries', 'Huckleberries']
    },
    {
      id: 'juices',
      name: 'Juices',
      nameEs: 'Jugos',
      icon: '🧃',
      color: '#06b6d4',
      products: ['Orange Juice', 'Apple Juice', 'Grape Juice', 'Cranberry Juice', 'Pineapple Juice', 'Grapefruit Juice', 'Lemon Juice', 'Lime Juice', 'Pomegranate Juice', 'Carrot Juice', 'Beet Juice', 'Celery Juice', 'Tomato Juice', 'Green Juice', 'Smoothies']
    },
    {
      id: 'nuts',
      name: 'Nuts & Seeds',
      nameEs: 'Nueces y Semillas',
      icon: '🥜',
      color: '#d97706',
      products: ['Almonds', 'Walnuts', 'Pecans', 'Cashews', 'Pistachios', 'Hazelnuts', 'Macadamia Nuts', 'Brazil Nuts', 'Pine Nuts', 'Peanuts', 'Sunflower Seeds', 'Pumpkin Seeds', 'Chia Seeds', 'Flax Seeds', 'Sesame Seeds', 'Hemp Seeds']
    },
    {
      id: 'fertilizers',
      name: 'Fertilizers',
      nameEs: 'Fertilizantes',
      icon: '🧪',
      color: '#a855f7',
      products: ['Nitrogen Fertilizers', 'Phosphate Fertilizers', 'Potassium Fertilizers', 'NPK Blends', 'Organic Compost', 'Manure', 'Bone Meal', 'Blood Meal', 'Fish Emulsion', 'Seaweed Extract', 'Humic Acid', 'Mycorrhizae', 'Biochar']
    },
    {
      id: 'dairy',
      name: 'Dairy',
      nameEs: 'Lácteos',
      icon: '🥛',
      color: '#94a3b8',
      products: ['Milk', 'Cream', 'Butter', 'Cheese', 'Yogurt', 'Sour Cream', 'Ice Cream']
    },
    {
      id: 'meat',
      name: 'Meat & Poultry',
      nameEs: 'Carnes',
      icon: '🥩',
      color: '#ef4444',
      products: ['Beef', 'Pork', 'Lamb', 'Chicken', 'Turkey', 'Duck']
    },
    {
      id: 'seafood',
      name: 'Seafood',
      nameEs: 'Mariscos',
      icon: '🐟',
      color: '#3b82f6',
      products: ['Salmon', 'Tuna', 'Cod', 'Shrimp', 'Crab', 'Lobster', 'Oysters', 'Mussels']
    }
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      audioSystem.playSuccess();
    }
  };

  const handleAddToCart = () => {
    if (!uploadedFile) {
      alert(language === 'es' ? 'Sube tus resultados primero' : 'Upload your results first');
      return;
    }
    if (!selectedProduct) {
      alert(language === 'es' ? 'Selecciona un producto' : 'Select a product');
      return;
    }

    const category = agCategories.find(c => c.id === selectedCategory);
    addToCart({
      id: 'AG-' + Date.now(),
      name: {selectedProduct} Analysis,
      price: 179,
      uploadedFile: uploadedFile.name,
      product: selectedProduct
    });
    audioSystem.playSuccess();
    navigate('/cart');
  };

  if (!selectedCategory) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)', padding: '2rem', color: '#fff' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3rem', textAlign: 'center', color: '#10b981', marginBottom: '1rem' }}>🌾 AG Sciences</h1>
          <p style={{ textAlign: 'center', color: '#b0bec5', marginBottom: '3rem' }}>500+ Analyzable Products</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
            {agCategories.map(cat => (
              <div key={cat.id} onClick={() => setSelectedCategory(cat.id)} style={{ background: {cat.color}20, border: 3px solid {cat.color}, borderRadius: '25px', padding: '2rem', cursor: 'pointer', textAlign: 'center' }}>
                <div style={{ fontSize: '4rem' }}>{cat.icon}</div>
                <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '1rem' }}>{language === 'es' ? cat.nameEs : cat.name}</h3>
                <div style={{ fontSize: '2rem', color: cat.color, fontWeight: 'bold' }}>{cat.products.length}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const category = agCategories.find(c => c.id === selectedCategory);
  if (!selectedProduct) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)', padding: '2rem', color: '#fff' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <button onClick={() => setSelectedCategory(null)} style={{ padding: '1rem 2rem', background: 'rgba(100, 116, 139, 0.3)', border: '2px solid #64748b', borderRadius: '12px', color: '#fff', cursor: 'pointer', marginBottom: '2rem' }}>← Back</button>
          <h1 style={{ fontSize: '3rem', textAlign: 'center', color: category.color, marginBottom: '3rem' }}>{category.icon} {category.name}</h1>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {category.products.map(product => (
              <div key={product} onClick={() => setSelectedProduct(product)} style={{ background: 'rgba(45, 55, 72, 0.9)', border: 2px solid {category.color}40, borderRadius: '15px', padding: '2rem 1.5rem', cursor: 'pointer', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#fff' }}>{product}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)', padding: '2rem', color: '#fff' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <button onClick={() => setSelectedProduct(null)} style={{ padding: '1rem 2rem', background: 'rgba(100, 116, 139, 0.3)', border: '2px solid #64748b', borderRadius: '12px', color: '#fff', cursor: 'pointer', marginBottom: '2rem' }}>← Back</button>
        <h1 style={{ fontSize: '2.5rem', textAlign: 'center', color: category.color, marginBottom: '3rem' }}>{category.icon} {selectedProduct}</h1>
        <div style={{ background: 'rgba(45, 55, 72, 0.9)', padding: '3rem', borderRadius: '25px', border: 2px solid {category.color} }}>
          <h2 style={{ fontSize: '2rem', color: category.color, marginBottom: '2rem', textAlign: 'center' }}>📤 Upload Lab Results</h2>
          <input type="file" id="fileUpload" onChange={handleFileUpload} accept=".pdf,.xlsx,.csv,image/*" style={{ display: 'none' }} />
          <button onClick={() => document.getElementById('fileUpload').click()} style={{ width: '100%', padding: '2rem', background: uploadedFile ? 'rgba(16, 185, 129, 0.3)' : linear-gradient(135deg, {category.color} 0%, {category.color}CC 100%), border: uploadedFile ? '3px solid #10b981' : 'none', borderRadius: '15px', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.3rem', marginBottom: '2rem' }}>
            {uploadedFile ? ✅ {uploadedFile.name} : '📤 Select File'}
          </button>
          {uploadedFile && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ background: {category.color}20, padding: '2rem', borderRadius: '15px', border: 2px solid {category.color}, marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.5rem', color: category.color, marginBottom: '1rem' }}>📊 Analysis Includes:</h3>
                <ul style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto', lineHeight: '2', listStyle: 'none', padding: 0 }}>
                  <li>✅ Quality assessment</li>
                  <li>✅ Contaminant detection</li>
                  <li>✅ Pesticide residue analysis</li>
                  <li>✅ FDA/USDA/EU compliance</li>
                  <li>✅ AI recommendations</li>
                  <li>✅ QR code tracking</li>
                </ul>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginBottom: '2rem' }}>
                <div><div style={{ fontSize: '3rem', color: category.color, fontWeight: 'bold' }}>179</div><div>Complete audit</div></div>
                <div style={{ fontSize: '2rem', color: '#64748b' }}>|</div>
                <div><div style={{ fontSize: '2.5rem', color: '#10b981', fontWeight: 'bold' }}>24-48h</div><div>Turnaround</div></div>
              </div>
              <button onClick={handleAddToCart} style={{ padding: '1.5rem 4rem', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', border: 'none', borderRadius: '15px', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.5rem' }}>🛒 Add to Cart</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AGSciencesModule;
