import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import analyzeTestResults from './aiAnalysisEngine';

function AuditDNAEnvAI() {
  const { language } = useLanguage();
  const [testType, setTestType] = useState('');
  const [manualData, setManualData] = useState({});

  const testTypes = [
    { id: 'water', name: language === 'es' ? 'Agua' : 'Water', icon: '', color: '#06b6d4' },
    { id: 'soil', name: language === 'es' ? 'Suelo' : 'Soil', icon: '', color: '#4ade80' },
    { id: 'strawberry', name: language === 'es' ? 'Fresas' : 'Strawberry', icon: '', color: '#ec4899' },
    { id: 'vegetables', name: language === 'es' ? 'Vegetales' : 'Vegetables', icon: '', color: '#10b981' },
    { id: 'fruits', name: language === 'es' ? 'Frutas' : 'Fruits', icon: '', color: '#f59e0b' },
    { id: 'fuel', name: language === 'es' ? 'Combustible' : 'Fuel', icon: '', color: '#94a3b8' },
    { id: 'alcohol', name: language === 'es' ? 'Alcohol' : 'Alcohol', icon: '', color: '#facc15' },
    { id: 'engine', name: language === 'es' ? 'Motor' : 'Engine', icon: '', color: '#8b5cf6' }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#1a2332', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '56px', fontWeight: 'bold', color: '#ec4899', marginBottom: '16px' }}>
            {language === 'es' ? 'Análisis de IA Ambiental' : 'AI Environmental Analysis'}
          </h1>
          <p style={{ fontSize: '20px', color: '#64748b' }}>
            {language === 'es' ? 'Análisis Predictivo  Recomendaciones Inteligentes' : 'Predictive Analysis  Smart Recommendations'}
          </p>
        </div>

        <div style={{ background: '#0f1923', borderRadius: '24px', padding: '40px', border: '1px solid rgba(236,72,153,0.3)' }}>
          <h2 style={{ fontSize: '32px', color: '#ec4899', marginBottom: '30px', fontWeight: '700' }}>
            {language === 'es' ? 'Seleccionar Tipo de Análisis' : 'Select Analysis Type'}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px' }}>
            {testTypes.map(type => (
              <div
                key={type.id}
                onClick={() => setTestType(type.id)}
                style={{
                  background: testType === type.id ? `rgba(${hexToRgb(type.color)}, 0.2)` : 'rgba(15,25,35,0.6)',
                  border: testType === type.id ? `3px solid ${type.color}` : '1px solid rgba(100,116,139,0.3)',
                  borderRadius: '16px',
                  padding: '30px 20px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.3s'
                }}
              >
                <div style={{ fontSize: '60px', marginBottom: '12px' }}>{type.icon}</div>
                <div style={{ fontSize: '18px', color: type.color, fontWeight: '700' }}>{type.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '236, 72, 153';
}

export default AuditDNAEnvAI;
