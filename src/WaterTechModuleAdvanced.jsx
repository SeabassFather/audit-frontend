import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { useCart } from './CartContext';
import audioSystem from './audioSystem';

const WaterTechModuleAdvanced = () => {
  const { language } = useLanguage();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);

  const waterParameters = [
    { id: 'W-MB-001', name: 'E.coli', category: 'Microbiological', compliance: ['EPA', 'WHO', 'EU'], riskLevel: 'Critical' },
    { id: 'W-MB-002', name: 'Total Coliform', category: 'Microbiological', compliance: ['EPA', 'WHO'], riskLevel: 'High' },
    { id: 'W-MB-003', name: 'Fecal Coliform', category: 'Microbiological', compliance: ['EPA', 'WHO'], riskLevel: 'Critical' },
    { id: 'W-HM-001', name: 'Lead (Pb)', category: 'Heavy Metals', compliance: ['EPA', 'WHO', 'EU'], riskLevel: 'Critical' },
    { id: 'W-HM-002', name: 'Arsenic (As)', category: 'Heavy Metals', compliance: ['EPA', 'WHO'], riskLevel: 'Critical' },
    { id: 'W-HM-003', name: 'Mercury (Hg)', category: 'Heavy Metals', compliance: ['EPA', 'WHO'], riskLevel: 'Critical' },
    { id: 'W-HM-004', name: 'Cadmium (Cd)', category: 'Heavy Metals', compliance: ['EPA', 'WHO'], riskLevel: 'Critical' },
    { id: 'W-HM-005', name: 'Chromium (Cr)', category: 'Heavy Metals', compliance: ['EPA', 'WHO'], riskLevel: 'High' },
    { id: 'W-PC-001', name: 'pH', category: 'Physical-Chemical', compliance: ['EPA', 'WHO'], riskLevel: 'High' },
    { id: 'W-PC-002', name: 'Turbidity', category: 'Physical-Chemical', compliance: ['EPA', 'WHO'], riskLevel: 'Medium' }
  ];

  const categories = [...new Set(waterParameters.map(p => p.category))];
  const filteredParams = waterParameters.filter(p => 
    !searchQuery || 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      audioSystem.playSuccess();
    }
  };

  const handleAddToCart = () => {
    if (!uploadedFile) {
      alert(language === 'es' ? 'Por favor sube tus resultados de laboratorio primero' : 'Please upload your lab results first');
      return;
    }

    const analysisService = {
      id: 'WATER-ANALYSIS-' + Date.now(),
      name: language === 'es' ? 'Análisis Completo de Agua con IA' : 'Complete Water Analysis with AI',
      price: 149.00,
      description: language === 'es' 
        ? 'Análisis con IA de 150+ parámetros + Verificación de cumplimiento (EPA, WHO, EU) + Recomendaciones profesionales'
        : 'AI Analysis of 150+ parameters + Compliance verification (EPA, WHO, EU) + Professional recommendations',
      uploadedFile: uploadedFile.name,
      turnaround: '24-48 hours',
      category: 'Water'
    };

    addToCart(analysisService);
    audioSystem.playSuccess();
    navigate('/cart');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)', padding: '2rem', color: '#fff' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        <h1 style={{ fontSize: '3rem', textAlign: 'center', color: '#06b6d4', marginBottom: '1rem', textShadow: '0 0 30px rgba(6, 182, 212, 0.6)' }}>
          💧 {language === 'es' ? 'Análisis de Datos de Agua' : 'Water Data Analysis'}
        </h1>
        <p style={{ textAlign: 'center', color: '#b0bec5', marginBottom: '2rem', fontSize: '1.2rem', maxWidth: '900px', margin: '0 auto 3rem', lineHeight: '1.8' }}>
          {language === 'es' 
            ? 'Sube tus resultados de laboratorio. Nuestro IA analizará 150+ parámetros para cumplimiento, riesgos y recomendaciones profesionales.'
            : 'Upload your lab results. Our AI will analyze 150+ parameters for compliance, risks, and professional recommendations.'}
        </p>

        {/* PARAMETERS OVERVIEW */}
        <div style={{ background: 'rgba(6, 182, 212, 0.15)', border: '2px solid #06b6d4', borderRadius: '20px', padding: '2rem', marginBottom: '3rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', color: '#06b6d4', marginBottom: '1.5rem' }}>
            {language === 'es' ? '🎯 Qué Analizamos' : '🎯 What We Analyze'}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            {categories.map(cat => {
              const count = waterParameters.filter(p => p.category === cat).length;
              return (
                <div key={cat} style={{ background: 'rgba(45, 55, 72, 0.8)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
                  <div style={{ fontSize: '1.5rem', color: '#06b6d4', fontWeight: 'bold', marginBottom: '0.3rem' }}>{count}+</div>
                  <div style={{ fontSize: '0.9rem', color: '#fff' }}>{cat}</div>
                </div>
              );
            })}
          </div>
          <div style={{ fontSize: '2.5rem', color: '#06b6d4', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            150+ {language === 'es' ? 'Parámetros' : 'Parameters'}
          </div>
          <p style={{ color: '#b0bec5', fontSize: '1.1rem' }}>
            {language === 'es' ? 'EPA, WHO, EU, ISO' : 'EPA, WHO, EU, ISO'}
          </p>
        </div>

        {/* UPLOAD SECTION */}
        <div style={{ background: 'rgba(45, 55, 72, 0.9)', padding: '3rem', borderRadius: '25px', marginBottom: '3rem', border: '2px solid rgba(6, 182, 212, 0.3)' }}>
          <h2 style={{ fontSize: '2rem', color: '#06b6d4', marginBottom: '2rem', textAlign: 'center' }}>
            📤 {language === 'es' ? 'Subir Resultados de Laboratorio' : 'Upload Lab Results'}
          </h2>
          
          <input type="file" id="fileUpload" onChange={handleFileUpload} accept=".pdf,.xlsx,.xls,.csv,image/*" style={{ display: 'none' }} />
          
          <button
            onClick={() => document.getElementById('fileUpload').click()}
            style={{ 
              width: '100%', 
              padding: '2rem', 
              background: uploadedFile ? 'rgba(16, 185, 129, 0.3)' : 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)', 
              border: uploadedFile ? '3px solid #10b981' : 'none',
              borderRadius: '15px', 
              color: '#fff', 
              fontWeight: 'bold', 
              cursor: 'pointer', 
              fontSize: '1.3rem', 
              marginBottom: '1.5rem',
              transition: 'all 0.3s ease'
            }}
          >
            {uploadedFile ? `✅ ${uploadedFile.name}` : `📤 ${language === 'es' ? 'Seleccionar Archivo' : 'Select File'}`}
          </button>
          
          <p style={{ fontSize: '1rem', color: '#94a3b8', textAlign: 'center', marginBottom: '2rem' }}>
            {language === 'es' 
              ? 'PDF, Excel, CSV, JPG, PNG'
              : 'PDF, Excel, CSV, JPG, PNG'}
          </p>

          {uploadedFile && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ background: 'rgba(6, 182, 212, 0.2)', padding: '2rem', borderRadius: '15px', border: '2px solid #06b6d4', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.5rem', color: '#06b6d4', marginBottom: '1rem' }}>
                  {language === 'es' ? '📊 Análisis Incluye:' : '📊 Analysis Includes:'}
                </h3>
                <ul style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto 2rem', lineHeight: '2', fontSize: '1.05rem', listStyle: 'none', padding: 0 }}>
                  <li>✅ {language === 'es' ? '150+ parámetros analizados' : '150+ parameters analyzed'}</li>
                  <li>✅ {language === 'es' ? 'Verificación de cumplimiento (EPA, WHO, EU)' : 'Compliance verification (EPA, WHO, EU)'}</li>
                  <li>✅ {language === 'es' ? 'Identificación de riesgos (Crítico/Alto/Medio/Bajo)' : 'Risk identification (Critical/High/Medium/Low)'}</li>
                  <li>✅ {language === 'es' ? 'Recomendaciones con IA' : 'AI-powered recommendations'}</li>
                  <li>✅ {language === 'es' ? 'Informe profesional PDF' : 'Professional PDF report'}</li>
                  <li>✅ {language === 'es' ? 'Código QR para seguimiento' : 'QR code for tracking'}</li>
                </ul>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ fontSize: '3rem', color: '#06b6d4', fontWeight: 'bold' }}>$149</div>
                    <div style={{ fontSize: '1rem', color: '#b0bec5' }}>{language === 'es' ? 'Análisis completo' : 'Complete analysis'}</div>
                  </div>
                  <div style={{ fontSize: '2rem', color: '#64748b' }}>|</div>
                  <div>
                    <div style={{ fontSize: '2.5rem', color: '#10b981', fontWeight: 'bold' }}>24-48h</div>
                    <div style={{ fontSize: '1rem', color: '#b0bec5' }}>{language === 'es' ? 'Entrega' : 'Turnaround'}</div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                style={{ 
                  padding: '1.5rem 4rem', 
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
                  border: 'none', 
                  borderRadius: '15px', 
                  color: '#fff', 
                  fontWeight: 'bold', 
                  cursor: 'pointer', 
                  fontSize: '1.5rem', 
                  boxShadow: '0 10px 40px rgba(16, 185, 129, 0.5)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 15px 60px rgba(16, 185, 129, 0.7)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(16, 185, 129, 0.5)';
                }}
              >
                🛒 {language === 'es' ? 'Añadir al Carrito' : 'Add to Cart'}
              </button>
            </div>
          )}
        </div>

        {/* PARAMETER CATALOG - INFORMATIONAL ONLY */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', color: '#06b6d4', marginBottom: '1.5rem', textAlign: 'center' }}>
            {language === 'es' ? '📋 Catálogo Completo de Parámetros' : '📋 Complete Parameters Catalog'}
          </h2>
          
          <input
            type="text"
            placeholder={language === 'es' ? 'Buscar parámetro...' : 'Search parameter...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '1rem', background: 'rgba(30, 41, 59, 0.6)', border: '2px solid #334155', borderRadius: '12px', color: '#fff', fontSize: '1rem', marginBottom: '2rem' }}
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
            {filteredParams.map(param => {
              const riskColors = { 'Critical': '#ef4444', 'High': '#f59e0b', 'Medium': '#eab308', 'Low': '#10b981' };
              return (
                <div 
                  key={param.id}
                  style={{ 
                    background: 'rgba(30, 41, 59, 0.6)', 
                    border: '1px solid rgba(6, 182, 212, 0.2)', 
                    borderRadius: '12px', 
                    padding: '1rem'
                  }}
                >
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>{param.id}</div>
                  <h3 style={{ fontSize: '1rem', color: '#fff', marginBottom: '0.8rem', fontWeight: 'bold' }}>{param.name}</h3>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', background: 'rgba(6, 182, 212, 0.2)', borderRadius: '8px', color: '#06b6d4' }}>
                      {param.category}
                    </span>
                    <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', background: `${riskColors[param.riskLevel]}20`, borderRadius: '8px', color: riskColors[param.riskLevel] }}>
                      {param.riskLevel}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    {param.compliance.join(', ')}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button onClick={() => navigate('/')} style={{ padding: '1rem 2rem', background: 'rgba(100, 116, 139, 0.3)', border: '2px solid #64748b', borderRadius: '12px', color: '#fff', cursor: 'pointer' }}>
          ← {language === 'es' ? 'Inicio' : 'Home'}
        </button>

      </div>
    </div>
  );
};

export default WaterTechModuleAdvanced;
