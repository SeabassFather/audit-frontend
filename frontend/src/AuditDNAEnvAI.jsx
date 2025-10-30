import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import audioSystem from './audioSystem';

const AuditDNAEnvAI = () => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [showQR, setShowQR] = useState(false);

  const categories = [
    { id: 'vegetables', name: 'Vegetables', nameEs: 'Vegetales', icon: '', products: 120, color: '#10b981' },
    { id: 'fruits', name: 'Fruits', nameEs: 'Frutas', icon: '', products: 85, color: '#ec4899' },
    { id: 'grains', name: 'Grains', nameEs: 'Granos', icon: '', products: 45, color: '#f59e0b' },
    { id: 'legumes', name: 'Legumes', nameEs: 'Legumbres', icon: '', products: 35, color: '#8b5cf6' },
    { id: 'nuts', name: 'Nuts & Seeds', nameEs: 'Nueces y Semillas', icon: '', products: 40, color: '#f97316' },
    { id: 'herbs', name: 'Herbs & Spices', nameEs: 'Hierbas y Especias', icon: '', products: 60, color: '#10b981' },
    { id: 'dairy', name: 'Dairy', nameEs: 'Lácteos', icon: '', products: 30, color: '#06b6d4' },
    { id: 'meat', name: 'Meat & Poultry', nameEs: 'Carne y Aves', icon: '', products: 50, color: '#ef4444' },
    { id: 'seafood', name: 'Seafood', nameEs: 'Mariscos', icon: '', products: 45, color: '#06b6d4' }
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      audioSystem.playSuccess();
    }
  };

  const handleGenerateQR = () => {
    setShowQR(true);
    audioSystem.playSuccess();
    setTimeout(() => setShowQR(false), 5000);
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    audioSystem.playClick();
  };

  if (selectedCategory) {
    const category = categories.find(c => c.id === selectedCategory);
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)', padding: '2rem', color: '#fff' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <button
            onClick={() => { setSelectedCategory(null); audioSystem.playClick(); }}
            style={{ padding: '1rem 2rem', background: 'rgba(100, 181, 246, 0.2)', border: '2px solid #64b5f6', borderRadius: '12px', color: '#fff', fontWeight: 'bold', cursor: 'pointer', marginBottom: '2rem' }}
          >
             {language === 'es' ? 'Volver' : 'Back'}
          </button>
          
          <h1 style={{ fontSize: '3rem', color: '#64b5f6', marginBottom: '2rem', textShadow: '0 0 30px rgba(100, 181, 246, 0.6)' }}>
            {category.icon} {language === 'es' ? category.nameEs : category.name}
          </h1>

          <div style={{ background: 'rgba(45, 55, 72, 0.9)', padding: '3rem', borderRadius: '25px', border: '2px solid rgba(100, 181, 246, 0.3)' }}>
            <h2 style={{ fontSize: '2rem', color: '#fff', marginBottom: '2rem' }}>
              {category.products} {language === 'es' ? 'productos disponibles' : 'products available'}
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#b0bec5', lineHeight: '1.8' }}>
              {language === 'es' 
                ? 'Sube los resultados de tus análisis para obtener recomendaciones personalizadas con IA, perfiles nutricionales completos y verificación de cumplimiento para esta categoría.'
                : 'Upload your analysis results to get AI-powered personalized recommendations, complete nutritional profiles, and compliance verification for this category.'}
            </p>

            <div style={{ marginTop: '3rem', display: 'grid', gap: '1rem' }}>
              <button
                onClick={() => document.getElementById('fileUpload').click()}
                style={{ padding: '1.5rem', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', border: 'none', borderRadius: '15px', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.2rem' }}
              >
                 {language === 'es' ? 'Subir Resultados' : 'Upload Results'}
              </button>
              <input type="file" id="fileUpload" style={{ display: 'none' }} onChange={handleFileUpload} accept=".pdf,.xlsx,.csv" />
              
              {uploadedFile && (
                <div style={{ background: 'rgba(16, 185, 129, 0.2)', border: '2px solid #10b981', borderRadius: '15px', padding: '1.5rem', marginTop: '1rem' }}>
                  <p style={{ color: '#10b981', fontWeight: 'bold' }}> {language === 'es' ? 'Archivo subido:' : 'File uploaded:'} {uploadedFile.name}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)', padding: '2rem', color: '#fff' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        <h1 style={{ fontSize: '3.5rem', textAlign: 'center', background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1rem', textShadow: '0 0 40px rgba(236, 72, 153, 0.5)' }}>
          AI Environmental Analysis
        </h1>
        <p style={{ textAlign: 'center', color: '#b0bec5', marginBottom: '2rem', fontSize: '1.1rem' }}>
          {language === 'es' ? 'Análisis Predictivo  Recomendaciones Inteligentes  500+ Productos' : 'Predictive Analysis  Smart Recommendations  500+ Products'}
        </p>

        {/* ACTION BUTTONS */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => document.getElementById('fileUploadMain').click()}
            style={{ padding: '1rem 2rem', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem', transition: 'all 0.3s ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 10px 40px rgba(16, 185, 129, 0.5)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
             {language === 'es' ? 'Subir Resultados' : 'Upload Results'}
          </button>
          <input type="file" id="fileUploadMain" style={{ display: 'none' }} onChange={handleFileUpload} accept=".pdf,.xlsx,.csv" />
          
          <button
            onClick={handleGenerateQR}
            style={{ padding: '1rem 2rem', background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem', transition: 'all 0.3s ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 10px 40px rgba(6, 182, 212, 0.5)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
             {language === 'es' ? 'Generar QR' : 'Generate QR'}
          </button>
          
          <button
            onClick={() => { audioSystem.playClick(); alert(language === 'es' ? 'Función de pago próximamente' : 'Payment feature coming soon'); }}
            style={{ padding: '1rem 2rem', background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem', transition: 'all 0.3s ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 10px 40px rgba(139, 92, 246, 0.5)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
             {language === 'es' ? 'Pagar ($0)' : 'Pay ($0)'}
          </button>
        </div>

        {uploadedFile && (
          <div style={{ background: 'rgba(16, 185, 129, 0.2)', border: '2px solid #10b981', borderRadius: '15px', padding: '1.5rem', marginBottom: '2rem', textAlign: 'center' }}>
            <p style={{ color: '#10b981', fontWeight: 'bold', fontSize: '1.1rem' }}> {language === 'es' ? 'Archivo subido:' : 'File uploaded:'} {uploadedFile.name}</p>
          </div>
        )}

        {showQR && (
          <div style={{ background: 'rgba(6, 182, 212, 0.2)', border: '2px solid #06b6d4', borderRadius: '15px', padding: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '10rem' }}></div>
            <p style={{ color: '#06b6d4', fontWeight: 'bold', fontSize: '1.2rem' }}>
              {language === 'es' ? 'Código QR generado - Escanear para más información' : 'QR Code Generated - Scan for details'}
            </p>
          </div>
        )}

        {/* SEARCH */}
        <h2 style={{ fontSize: '2rem', textAlign: 'center', color: '#ec4899', marginBottom: '2rem' }}>
          {language === 'es' ? 'Buscar 500+ Productos' : 'Search 500+ Products'}
        </h2>

        <input
          type="text"
          placeholder={language === 'es' ? 'Escribir nombre del producto (ej. semillas de girasol)' : 'Type product name (e.g., sunflower seeds)'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '100%', maxWidth: '900px', padding: '1.5rem', background: 'rgba(30, 41, 59, 0.6)', border: '2px solid #334155', borderRadius: '15px', color: '#fff', fontSize: '1.1rem', margin: '0 auto 3rem', display: 'block' }}
        />

        {/* CATEGORIES */}
        <h2 style={{ fontSize: '2rem', textAlign: 'center', color: '#ec4899', marginBottom: '2rem' }}>
          {language === 'es' ? 'O Explorar por Categoría' : 'Or Browse by Category'}
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {categories.map(cat => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              style={{
                background: `linear-gradient(135deg, ${cat.color}30 0%, ${cat.color}15 100%)`,
                backdropFilter: 'blur(20px)',
                border: '3px solid ' + cat.color,
                borderRadius: '25px',
                padding: '2.5rem 2rem',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)';
                e.currentTarget.style.boxShadow = `0 20px 50px ${cat.color}60`;
                audioSystem.playHover();
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{cat.icon}</div>
              <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '1rem', fontWeight: 'bold' }}>
                {language === 'es' ? cat.nameEs : cat.name}
              </h3>
              <div style={{ fontSize: '2rem', color: cat.color, fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {cat.products}
              </div>
              <div style={{ color: '#b0bec5' }}>
                {language === 'es' ? 'productos' : 'products'}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AuditDNAEnvAI;
