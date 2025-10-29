import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';

const Footer = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <footer style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderTop: '2px solid rgba(100, 181, 246, 0.2)', padding: '3rem 2rem 1.5rem', color: '#fff', marginTop: 'auto' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
          
          {/* COMPANY INFO */}
          <div>
            <h3 style={{ fontSize: '1.5rem', color: '#64b5f6', marginBottom: '1rem' }}>AuditDNA</h3>
            <p style={{ color: '#b0bec5', lineHeight: '1.6', marginBottom: '1rem' }}>
              {language === 'es' 
                ? 'Análisis de datos con IA para agua, suelo, alimentos y más. Interpretación profesional de resultados de laboratorio.'
                : 'AI-powered data analysis for water, soil, food, and more. Professional interpretation of lab results.'}
            </p>
            <div style={{ color: '#64b5f6', fontWeight: 'bold' }}>252+ {language === 'es' ? 'Análisis Disponibles' : 'Analyses Available'}</div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 style={{ fontSize: '1.2rem', color: '#64b5f6', marginBottom: '1rem' }}>
              {language === 'es' ? 'Enlaces Rápidos' : 'Quick Links'}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <a onClick={() => navigate('/water')} style={{ color: '#b0bec5', cursor: 'pointer', textDecoration: 'none', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#64b5f6'} onMouseLeave={(e) => e.currentTarget.style.color = '#b0bec5'}>
                💧 {language === 'es' ? 'Análisis de Agua' : 'Water Analysis'}
              </a>
              <a onClick={() => navigate('/soil')} style={{ color: '#b0bec5', cursor: 'pointer', textDecoration: 'none', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#64b5f6'} onMouseLeave={(e) => e.currentTarget.style.color = '#b0bec5'}>
                🌱 {language === 'es' ? 'Análisis de Suelo' : 'Soil Analysis'}
              </a>
              <a onClick={() => navigate('/ag')} style={{ color: '#b0bec5', cursor: 'pointer', textDecoration: 'none', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#64b5f6'} onMouseLeave={(e) => e.currentTarget.style.color = '#b0bec5'}>
                🌾 {language === 'es' ? 'Ciencias Agrícolas' : 'AG Sciences'}
              </a>
              <a onClick={() => navigate('/engine')} style={{ color: '#b0bec5', cursor: 'pointer', textDecoration: 'none', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#64b5f6'} onMouseLeave={(e) => e.currentTarget.style.color = '#b0bec5'}>
                🔧 {language === 'es' ? 'Análisis de Motor' : 'Engine Analysis'}
              </a>
              <a onClick={() => navigate('/fuel')} style={{ color: '#b0bec5', cursor: 'pointer', textDecoration: 'none', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#64b5f6'} onMouseLeave={(e) => e.currentTarget.style.color = '#b0bec5'}>
                ⛽ {language === 'es' ? 'Análisis de Combustible' : 'Fuel Analysis'}
              </a>
              <a onClick={() => navigate('/alcohol')} style={{ color: '#b0bec5', cursor: 'pointer', textDecoration: 'none', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#64b5f6'} onMouseLeave={(e) => e.currentTarget.style.color = '#b0bec5'}>
                🍷 {language === 'es' ? 'Análisis de Alcohol' : 'Alcohol Analysis'}
              </a>
            </div>
          </div>

          {/* CONTACT INFO */}
          <div>
            <h4 style={{ fontSize: '1.2rem', color: '#64b5f6', marginBottom: '1rem' }}>
              {language === 'es' ? 'Contacto' : 'Contact'}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', color: '#b0bec5' }}>
              <div>
                <div style={{ fontWeight: 'bold', color: '#fff', marginBottom: '0.2rem' }}>📧 Email:</div>
                <a href="mailto:support@auditdna.com" style={{ color: '#64b5f6', textDecoration: 'none' }}>support@auditdna.com</a>
              </div>
              <div>
                <div style={{ fontWeight: 'bold', color: '#fff', marginBottom: '0.2rem' }}>📱 {language === 'es' ? 'Teléfono:' : 'Phone:'}</div>
                <a href="tel:+15551234567" style={{ color: '#64b5f6', textDecoration: 'none' }}>+1 (555) 123-4567</a>
              </div>
              <div>
                <div style={{ fontWeight: 'bold', color: '#fff', marginBottom: '0.2rem' }}>🕐 {language === 'es' ? 'Horario:' : 'Hours:'}</div>
                {language === 'es' ? 'Lun - Vie: 8 AM - 6 PM EST' : 'Mon - Fri: 8 AM - 6 PM EST'}
              </div>
              <button 
                onClick={() => navigate('/contact')}
                style={{ padding: '0.8rem 1.5rem', background: 'linear-gradient(135deg, #64b5f6 0%, #42a5f5 100%)', border: 'none', borderRadius: '10px', color: '#fff', fontWeight: 'bold', cursor: 'pointer', marginTop: '0.5rem', transition: 'all 0.3s ease' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                ✉️ {language === 'es' ? 'Contáctanos' : 'Contact Us'}
              </button>
            </div>
          </div>

          {/* SUPPORT */}
          <div>
            <h4 style={{ fontSize: '1.2rem', color: '#64b5f6', marginBottom: '1rem' }}>
              {language === 'es' ? 'Soporte' : 'Support'}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <a onClick={() => navigate('/cart')} style={{ color: '#b0bec5', cursor: 'pointer', textDecoration: 'none', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#64b5f6'} onMouseLeave={(e) => e.currentTarget.style.color = '#b0bec5'}>
                🛒 {language === 'es' ? 'Carrito' : 'Cart'}
              </a>
              <a onClick={() => navigate('/orders')} style={{ color: '#b0bec5', cursor: 'pointer', textDecoration: 'none', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#64b5f6'} onMouseLeave={(e) => e.currentTarget.style.color = '#b0bec5'}>
                📦 {language === 'es' ? 'Pedidos' : 'Orders'}
              </a>
              <a onClick={() => navigate('/results')} style={{ color: '#b0bec5', cursor: 'pointer', textDecoration: 'none', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#64b5f6'} onMouseLeave={(e) => e.currentTarget.style.color = '#b0bec5'}>
                📊 {language === 'es' ? 'Resultados' : 'Results'}
              </a>
              <a onClick={() => navigate('/testing')} style={{ color: '#b0bec5', cursor: 'pointer', textDecoration: 'none', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#64b5f6'} onMouseLeave={(e) => e.currentTarget.style.color = '#b0bec5'}>
                🧪 {language === 'es' ? 'Catálogo' : 'Catalog'}
              </a>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div style={{ borderTop: '1px solid rgba(100, 181, 246, 0.2)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ color: '#64748b', fontSize: '0.9rem' }}>
            © 2025 AuditDNA Supreme. {language === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#" style={{ color: '#64748b', fontSize: '0.9rem', textDecoration: 'none' }} onMouseEnter={(e) => e.currentTarget.style.color = '#64b5f6'} onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}>
              {language === 'es' ? 'Privacidad' : 'Privacy'}
            </a>
            <a href="#" style={{ color: '#64748b', fontSize: '0.9rem', textDecoration: 'none' }} onMouseEnter={(e) => e.currentTarget.style.color = '#64b5f6'} onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}>
              {language === 'es' ? 'Términos' : 'Terms'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
