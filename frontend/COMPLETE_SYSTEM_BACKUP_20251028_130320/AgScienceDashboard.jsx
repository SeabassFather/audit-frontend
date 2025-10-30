import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import audioSystem from './audioSystem';

const AgScienceDashboard = () => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const featuredCategories = [
    { id: 'crop', icon: '🌾', name: 'Crop Analysis', nameEs: 'Análisis de Cultivos', tests: 60, color: '#10b981' },
    { id: 'pest', icon: '🦗', name: 'Pest Control', nameEs: 'Control de Plagas', tests: 45, color: '#ef4444' },
    { id: 'nutrient', icon: '🧪', name: 'Nutrient Testing', nameEs: 'Prueba de Nutrientes', tests: 55, color: '#f59e0b' },
    { id: 'seed', icon: '🌱', name: 'Seed Quality', nameEs: 'Calidad de Semillas', tests: 60, color: '#06b6d4' }
  ];

  const FeaturedCard = ({ category }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
      <div
        onClick={() => { audioSystem.playClick(); setSelectedCategory(category.id); }}
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
          textAlign: 'center'
        }}
      >
        <div style={{ fontSize: '5rem', marginBottom: '1.5rem', filter: isHovered ? `drop-shadow(0 0 20px ${category.color})` : 'none' }}>
          {category.icon}
        </div>
        <h3 style={{ fontSize: '2rem', color: isHovered ? category.color : '#fff', marginBottom: '1rem', fontWeight: 'bold' }}>
          {language === 'es' ? category.nameEs : category.name}
        </h3>
        <div style={{ fontSize: '3rem', fontWeight: 'bold', color: category.color, marginBottom: '0.5rem' }}>
          {category.tests}
        </div>
        <p style={{ color: '#94a3b8' }}>{language === 'es' ? 'pruebas disponibles' : 'tests available'}</p>
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '2rem', color: '#fff' }}>
      <h1 style={{ fontSize: '3rem', textAlign: 'center', color: '#10b981', marginBottom: '1rem' }}>
        AG Sciences Dashboard
      </h1>
      <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '3rem', fontSize: '1.2rem' }}>
        220+ Premium Tests
      </p>

      <h2 style={{ fontSize: '2rem', textAlign: 'center', color: '#10b981', marginBottom: '3rem' }}>
        {language === 'es' ? 'Seleccionar Categoría' : 'Select Category'}
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        {featuredCategories.map(cat => <FeaturedCard key={cat.id} category={cat} />)}
      </div>
    </div>
  );
};

export default AgScienceDashboard;
