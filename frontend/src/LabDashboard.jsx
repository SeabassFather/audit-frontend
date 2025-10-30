import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { useLanguage } from './LanguageContext';
import audioSystem from './audioSystem';

const LabDashboard = () => {
  const navigate = useNavigate();
  const { orders } = useCart();
  const { language } = useLanguage();

  const stats = {
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    completed: orders.filter(o => o.status === 'confirmed').length
  };

  const availableModules = [
    { name: 'Water Analysis', icon: '💧', tests: 53, route: '/water', color: '#06b6d4' },
    { name: 'Soil Analysis', icon: '🌱', tests: 40, route: '/soil', color: '#10b981' },
    { name: 'AG Sciences', icon: '🌾', tests: 100, route: '/ag', color: '#f59e0b' },
    { name: 'Alcohol Analysis', icon: '🍷', tests: 26, route: '/alcohol', color: '#ec4899' },
    { name: 'Engine Performance', icon: '🔧', tests: 20, route: '/engine', color: '#f97316' },
    { name: 'Fuel Testing', icon: '⛽', tests: 13, route: '/fuel', color: '#8b5cf6' }
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '2rem', color: '#fff' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        <h1 style={{ fontSize: '3.5rem', textAlign: 'center', color: '#06b6d4', marginBottom: '3rem' }}>
          🔬 Lab Dashboard
        </h1>

        {/* STATS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '4rem' }}>
          <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '2px solid #f59e0b', borderRadius: '20px', padding: '2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', color: '#f59e0b', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {stats.pending}
            </div>
            <div style={{ color: '#94a3b8', fontSize: '1.2rem' }}>
              {language === 'es' ? 'Órdenes Pendientes' : 'Pending Orders'}
            </div>
          </div>
          <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '2px solid #f97316', borderRadius: '20px', padding: '2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', color: '#f97316', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {stats.processing}
            </div>
            <div style={{ color: '#94a3b8', fontSize: '1.2rem' }}>
              {language === 'es' ? 'En Proceso' : 'Processing'}
            </div>
          </div>
          <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '2px solid #10b981', borderRadius: '20px', padding: '2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', color: '#10b981', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {stats.completed}
            </div>
            <div style={{ color: '#94a3b8', fontSize: '1.2rem' }}>
              {language === 'es' ? 'Completados' : 'Completed'}
            </div>
          </div>
        </div>

        {/* AVAILABLE MODULES */}
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', borderRadius: '25px', padding: '3rem', border: '2px solid rgba(6, 182, 212, 0.3)' }}>
          <h2 style={{ fontSize: '2.5rem', color: '#06b6d4', marginBottom: '2rem', textAlign: 'center' }}>
            {language === 'es' ? 'Módulos de Análisis Disponibles' : 'Available Analysis Modules'}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {availableModules.map(module => (
              <div
                key={module.route}
                onClick={() => { audioSystem.playClick(); navigate(module.route); }}
                style={{
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '2px solid ' + module.color + '50',
                  borderRadius: '20px',
                  padding: '2rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.borderColor = module.color;
                  e.currentTarget.style.boxShadow = '0 15px 40px ' + module.color + '60';
                  audioSystem.playHover();
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = module.color + '50';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{module.icon}</div>
                <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '1rem', fontWeight: 'bold' }}>
                  {module.name}
                </h3>
                <div style={{ fontSize: '2rem', color: module.color, fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  {module.tests}
                </div>
                <div style={{ color: '#94a3b8' }}>
                  {language === 'es' ? 'tests disponibles' : 'available tests'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TOTAL TESTS */}
        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', color: '#94a3b8', marginBottom: '1rem' }}>
            {language === 'es' ? 'Total de Tests Analizables' : 'Total Analyzable Tests'}
          </div>
          <div style={{ fontSize: '5rem', color: '#10b981', fontWeight: 'bold' }}>
            252+
          </div>
        </div>

      </div>
    </div>
  );
};

export default LabDashboard;
