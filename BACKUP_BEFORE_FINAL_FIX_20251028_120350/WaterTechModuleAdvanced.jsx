import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import audioSystem from './audioSystem';
import QRCodeGenerator from './QRCodeGenerator';
// FileUploadManager - will add later

// Import water test catalog
import { waterTests, waterCategories } from './waterTestCatalog';

const WaterTechModuleAdvanced = () => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState([]);
  const [showQR, setShowQR] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const addToCart = (test) => {
    audioSystem.playSuccess();
    setCart([...cart, test]);
  };

  const removeFromCart = (index) => {
    audioSystem.playWarning();
    setCart(cart.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return cart.reduce((sum, test) => sum + test.price, 0);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      padding: '2rem',
      color: '#fff'
    }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1rem'
        }}>
          💧 {language === 'es' ? 'Análisis de Agua' : 'Water Analysis'}
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#94a3b8' }}>
          {language === 'es' ? '50+ Pruebas Premium' : '50+ Premium Tests'}
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          <ActionButton label={language === 'es' ? '📤 Subir Resultados' : '📤 Upload Results'} onClick={() => setShowUpload(!showUpload)} />
          <ActionButton label={language === 'es' ? '📱 Generar QR' : '📱 Generate QR'} onClick={() => setShowQR(!showQR)} />
          <ActionButton label={language === 'es' ? '📧 Contacto' : '📧 Contact'} onClick={() => setShowContact(!showContact)} />
        </div>
      </div>

      {/* Upload Section */}
      {showUpload && (
        <div style={{ marginBottom: '2rem' }}>
          // Upload feature coming soon
        </div>
      )}

      {/* QR Section */}
      {showQR && (
        <QRCodeGenerator orderId="WATER-001" customerEmail="customer@example.com" testName="Water Analysis" />
      )}

      {/* Contact Card */}
      {showContact && <ContactCard language={language} />}

      {/* Category Selection */}
      {!selectedCategory && (
        <div>
          <h2 style={{ fontSize: '2rem', color: '#06b6d4', marginBottom: '2rem', textAlign: 'center' }}>
            {language === 'es' ? 'Seleccionar Categoría' : 'Select Category'}
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {waterCategories.map(cat => (
              <CategoryCard 
                key={cat.id}
                category={cat}
                onClick={() => {
                  audioSystem.playClick();
                  setSelectedCategory(cat);
                }}
                language={language}
              />
            ))}
          </div>
        </div>
      )}

      {/* Test List */}
      {selectedCategory && (
        <TestList 
          category={selectedCategory}
          tests={waterTests.filter(t => t.category === selectedCategory.name)}
          onBack={() => setSelectedCategory(null)}
          onAddToCart={addToCart}
          cart={cart}
          onRemoveFromCart={removeFromCart}
          calculateTotal={calculateTotal}
          language={language}
        />
      )}
    </div>
  );
};

// Reusable Components
const ActionButton = ({ label, onClick }) => (
  <button
    onClick={onClick}
    onMouseEnter={() => audioSystem.playHover()}
    style={{
      padding: '0.8rem 1.5rem',
      background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
      border: 'none',
      borderRadius: '10px',
      color: '#fff',
      fontWeight: 'bold',
      cursor: 'pointer',
      fontSize: '1rem'
    }}
  >
    {label}
  </button>
);

const CategoryCard = ({ category, onClick, language }) => (
  <div
    onClick={onClick}
    onMouseEnter={() => audioSystem.playHover()}
    style={{
      background: 'rgba(6, 182, 212, 0.1)',
      border: '2px solid #06b6d4',
      borderRadius: '20px',
      padding: '2rem',
      cursor: 'pointer',
      textAlign: 'center',
      transition: 'all 0.3s ease'
    }}
  >
    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{category.icon}</div>
    <h3 style={{ fontSize: '1.5rem', color: '#06b6d4', marginBottom: '0.5rem' }}>
      {language === 'es' ? category.nameEs : category.name}
    </h3>
    <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
      {category.testCount}
    </div>
    <p style={{ color: '#94a3b8' }}>
      {language === 'es' ? 'pruebas disponibles' : 'tests available'}
    </p>
  </div>
);

const TestList = ({ category, tests, onBack, onAddToCart, cart, onRemoveFromCart, calculateTotal, language }) => (
  <div>
    <button
      onClick={onBack}
      onMouseEnter={() => audioSystem.playHover()}
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
      ← {language === 'es' ? 'Volver' : 'Back'}
    </button>

    <h2 style={{ fontSize: '2rem', color: '#06b6d4', marginBottom: '2rem', textAlign: 'center' }}>
      {category.icon} {language === 'es' ? category.nameEs : category.name}
    </h2>

    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem'
    }}>
      {tests.map(test => (
        <div
          key={test.id}
          style={{
            background: 'rgba(30, 41, 59, 0.6)',
            border: '2px solid rgba(6, 182, 212, 0.3)',
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
              ⏱️ {test.turnaround} {language === 'es' ? 'días' : 'days'}
            </span>
          </div>
          <button
            onClick={() => onAddToCart(test)}
            onMouseEnter={() => audioSystem.playHover()}
            style={{
              width: '100%',
              padding: '0.8rem',
              background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
              border: 'none',
              borderRadius: '10px',
              color: '#fff',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            ➕ {language === 'es' ? 'Añadir al Carrito' : 'Add to Cart'}
          </button>
        </div>
      ))}
    </div>

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
          🛒 {language === 'es' ? 'Carrito' : 'Cart'} ({cart.length})
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
            <div>
              <div style={{ fontSize: '0.9rem', color: '#fff', marginBottom: '0.3rem' }}>
                {test.name}
              </div>
              <div style={{ fontSize: '1rem', color: '#10b981', fontWeight: 'bold' }}>
                ${test.price}
              </div>
            </div>
            <button
              onClick={() => onRemoveFromCart(index)}
              style={{
                background: '#ef4444',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                padding: '0.5rem 0.8rem',
                cursor: 'pointer',
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
            <span style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 'bold' }}>
              {language === 'es' ? 'Total:' : 'Total:'}
            </span>
            <span style={{ fontSize: '1.5rem', color: '#10b981', fontWeight: 'bold' }}>
              ${calculateTotal()}
            </span>
          </div>
          <button
            onClick={() => {
              audioSystem.playSuccess();
              alert(`${language === 'es' ? '¡Pedido enviado!' : 'Order submitted!'} Total: $${calculateTotal()}`);
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
            💳 {language === 'es' ? 'Pagar' : 'Checkout'}
          </button>
        </div>
      </div>
    )}
  </div>
);

const ContactCard = ({ language }) => (
  <div style={{
    maxWidth: '600px',
    margin: '2rem auto',
    background: 'rgba(30, 41, 59, 0.6)',
    border: '2px solid #10b981',
    borderRadius: '20px',
    padding: '2rem',
    textAlign: 'center'
  }}>
    <h3 style={{ fontSize: '2rem', color: '#10b981', marginBottom: '1.5rem' }}>
      📧 {language === 'es' ? 'Contacto' : 'Contact Us'}
    </h3>
    <div style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: '2' }}>
      <div>📞 <strong>Phone:</strong> +1 (555) 123-4567</div>
      <div>📧 <strong>Email:</strong> support@auditdna.com</div>
      <div>🌐 <strong>Web:</strong> www.auditdna.com</div>
      <div>📍 <strong>{language === 'es' ? 'Dirección' : 'Address'}:</strong> 123 Lab St, Science City</div>
    </div>
  </div>
);

export default WaterTechModuleAdvanced;


