import React from 'react';
import { useLanguage } from './LanguageContext';

function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      style={{
        background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
        color: 'white',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: '10px',
        padding: '10px 20px',
        fontSize: '14px',
        fontWeight: '700',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.3s',
        boxShadow: '0 4px 15px rgba(139,92,246,0.3)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 6px 20px rgba(139,92,246,0.5)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 15px rgba(139,92,246,0.3)';
      }}
    >
      <span style={{ fontSize: '18px' }}>🌐</span>
      <span>{language === 'en' ? 'English' : 'Español'}</span>
      <span style={{ fontSize: '12px', opacity: 0.8 }}>
        {language === 'en' ? '→ ES' : '→ EN'}
      </span>
    </button>
  );
}

export default LanguageToggle;
