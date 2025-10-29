import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import audioSystem from './audioSystem';

function ResultsPortal() {
  const { language } = useLanguage();

  // Sample showcase data (in production, this would come from backend API)
  const showcaseResults = [
    {
      id: 1,
      testType: 'Water Analysis',
      icon: '💧',
      color: '#06b6d4',
      testsUsed: ['pH Analysis', 'Heavy Metals Screen', 'E.coli Detection', 'Chlorine Levels'],
      testsCount: 15,
      satisfaction: 5,
      comment: language === 'es' 
        ? 'Resultados rápidos y precisos. ¡Excelente servicio!' 
        : 'Fast and accurate results. Excellent service!',
      turnaround: 2,
      dateCompleted: '2025-10-25',
      location: language === 'es' ? 'California, USA' : 'California, USA'
    },
    {
      id: 2,
      testType: 'Soil Analysis',
      icon: '🌱',
      color: '#4ade80',
      testsUsed: ['NPK Analysis', 'pH Testing', 'Organic Matter', 'Micronutrients Panel'],
      testsCount: 12,
      satisfaction: 5,
      comment: language === 'es' 
        ? 'Las recomendaciones mejoraron mi rendimiento de cultivos en un 25%' 
        : 'The recommendations improved my crop yield by 25%',
      turnaround: 3,
      dateCompleted: '2025-10-24',
      location: language === 'es' ? 'Sinaloa, México' : 'Sinaloa, Mexico'
    },
    {
      id: 3,
      testType: 'Alcohol Testing',
      icon: '🍷',
      color: '#facc15',
      testsUsed: ['Ethanol Content', 'Methanol Detection', 'Congener Analysis'],
      testsCount: 8,
      satisfaction: 5,
      comment: language === 'es' 
        ? 'Análisis completo para mi destilería. Muy profesional.' 
        : 'Comprehensive analysis for my distillery. Very professional.',
      turnaround: 2,
      dateCompleted: '2025-10-23',
      location: language === 'es' ? 'Jalisco, México' : 'Jalisco, Mexico'
    },
    {
      id: 4,
      testType: 'Fuel Testing',
      icon: '⛽',
      color: '#94a3b8',
      testsUsed: ['Octane Rating', 'Sulfur Content', 'Water Contamination'],
      testsCount: 10,
      satisfaction: 4,
      comment: language === 'es' 
        ? 'Buen servicio, resultados confiables para mi flota' 
        : 'Good service, reliable results for my fleet',
      turnaround: 3,
      dateCompleted: '2025-10-22',
      location: language === 'es' ? 'Texas, USA' : 'Texas, USA'
    },
    {
      id: 5,
      testType: 'Engine Diagnostics',
      icon: '🔧',
      color: '#8b5cf6',
      testsUsed: ['Oil Viscosity', 'Wear Metals', 'TBN Analysis'],
      testsCount: 7,
      satisfaction: 5,
      comment: language === 'es' 
        ? 'Detectaron un problema antes de que fallara el motor. ¡Increíble!' 
        : 'Detected a problem before engine failure. Amazing!',
      turnaround: 1,
      dateCompleted: '2025-10-26',
      location: language === 'es' ? 'Arizona, USA' : 'Arizona, USA'
    },
    {
      id: 6,
      testType: 'Agriculture Testing',
      icon: '🌾',
      color: '#10b981',
      testsUsed: ['Strawberry - Brix', 'Pesticide Residue', 'Nitrate Content'],
      testsCount: 9,
      satisfaction: 5,
      comment: language === 'es' 
        ? 'Análisis detallado que me ayudó a certificar mi producto orgánico' 
        : 'Detailed analysis that helped me certify my organic product',
      turnaround: 4,
      dateCompleted: '2025-10-21',
      location: language === 'es' ? 'Michoacán, México' : 'Michoacan, Mexico'
    },
    {
      id: 7,
      testType: 'Water Analysis',
      icon: '💧',
      color: '#06b6d4',
      testsUsed: ['Total Dissolved Solids', 'Hardness', 'Nitrate/Nitrite'],
      testsCount: 6,
      satisfaction: 5,
      comment: language === 'es' 
        ? 'Perfecto para validar mi sistema de filtración' 
        : 'Perfect for validating my filtration system',
      turnaround: 2,
      dateCompleted: '2025-10-20',
      location: language === 'es' ? 'Florida, USA' : 'Florida, USA'
    },
    {
      id: 8,
      testType: 'Soil Analysis',
      icon: '🌱',
      color: '#4ade80',
      testsUsed: ['Heavy Metals', 'Salinity', 'CEC Analysis'],
      testsCount: 11,
      satisfaction: 4,
      comment: language === 'es' 
        ? 'Muy útil para planificar mi próxima temporada de siembra' 
        : 'Very useful for planning my next planting season',
      turnaround: 3,
      dateCompleted: '2025-10-19',
      location: language === 'es' ? 'Sonora, México' : 'Sonora, Mexico'
    }
  ];

  const [filter, setFilter] = useState('All');

  const testTypes = ['All', 'Water Analysis', 'Soil Analysis', 'Alcohol Testing', 'Fuel Testing', 'Engine Diagnostics', 'Agriculture Testing'];

  const filteredResults = filter === 'All' 
    ? showcaseResults 
    : showcaseResults.filter(r => r.testType === filter);

  const stats = {
    totalOrders: showcaseResults.length,
    avgSatisfaction: (showcaseResults.reduce((sum, r) => sum + r.satisfaction, 0) / showcaseResults.length).toFixed(1),
    avgTurnaround: (showcaseResults.reduce((sum, r) => sum + r.turnaround, 0) / showcaseResults.length).toFixed(1),
    totalTests: showcaseResults.reduce((sum, r) => sum + r.testsCount, 0)
  };

  return (
    <div style={{ minHeight: '100vh', background: '#1a2332', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1800px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '56px', fontWeight: 'bold', color: '#ec4899', textShadow: '0 0 20px rgba(236,72,153,0.5)', marginBottom: '16px' }}>
            {language === 'es' ? 'Galería de Resultados' : 'Results Showcase'}
          </h1>
          <p style={{ fontSize: '20px', color: '#64748b' }}>
            {language === 'es' 
              ? 'Testimonios reales de clientes satisfechos • Datos anónimos' 
              : 'Real testimonials from satisfied customers • Anonymous data'}
          </p>
        </div>

        {/* Stats Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
          <div style={{ background: '#0f1923', border: '1px solid rgba(236,72,153,0.3)', borderRadius: '16px', padding: '30px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#ec4899', marginBottom: '8px' }}>{stats.totalOrders}</div>
            <div style={{ fontSize: '16px', color: '#64748b' }}>{language === 'es' ? 'Pedidos Completados' : 'Completed Orders'}</div>
          </div>
          <div style={{ background: '#0f1923', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '16px', padding: '30px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#10b981', marginBottom: '8px' }}>{stats.avgSatisfaction} ⭐</div>
            <div style={{ fontSize: '16px', color: '#64748b' }}>{language === 'es' ? 'Satisfacción Promedio' : 'Average Satisfaction'}</div>
          </div>
          <div style={{ background: '#0f1923', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '16px', padding: '30px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#3b82f6', marginBottom: '8px' }}>{stats.avgTurnaround} {language === 'es' ? 'días' : 'days'}</div>
            <div style={{ fontSize: '16px', color: '#64748b' }}>{language === 'es' ? 'Tiempo Promedio' : 'Average Turnaround'}</div>
          </div>
          <div style={{ background: '#0f1923', border: '1px solid rgba(250,204,21,0.3)', borderRadius: '16px', padding: '30px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#facc15', marginBottom: '8px' }}>{stats.totalTests}</div>
            <div style={{ fontSize: '16px', color: '#64748b' }}>{language === 'es' ? 'Pruebas Realizadas' : 'Tests Performed'}</div>
          </div>
        </div>

        {/* Filter Bar */}
        <div style={{ background: '#0f1923', borderRadius: '16px', padding: '20px', marginBottom: '40px', border: '1px solid rgba(100,116,139,0.3)' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {testTypes.map(type => (
              <button
                key={type}
                onMouseEnter={() => audioSystem.playHover()} onClick={() => setFilter(type)}
                style={{
                  background: filter === type ? 'rgba(236,72,153,0.3)' : 'rgba(15,25,35,0.6)',
                  color: filter === type ? '#ec4899' : '#94a3b8',
                  border: filter === type ? '2px solid rgba(236,72,153,0.6)' : '1px solid rgba(100,116,139,0.3)',
                  borderRadius: '10px',
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))', gap: '30px' }}>
          {filteredResults.map(result => (
            <div
              key={result.id}
              style={{
                background: '#0f1923',
                border: `2px solid ${result.color}40`,
                borderRadius: '20px',
                padding: '30px',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = `0 20px 60px ${result.color}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ fontSize: '48px' }}>{result.icon}</div>
                  <div>
                    <h3 style={{ fontSize: '24px', color: result.color, margin: 0, fontWeight: '700' }}>
                      {result.testType}
                    </h3>
                    <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0 0' }}>
                      {result.testsCount} {language === 'es' ? 'pruebas' : 'tests'}
                    </p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '24px', color: '#facc15', marginBottom: '4px' }}>
                    {'⭐'.repeat(result.satisfaction)}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>
                    {result.satisfaction}/5
                  </div>
                </div>
              </div>

              {/* Tests Used */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '12px', fontWeight: '600' }}>
                  {language === 'es' ? 'Pruebas Utilizadas:' : 'Tests Used:'}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {result.testsUsed.map((test, idx) => (
                    <span
                      key={idx}
                      style={{
                        background: `${result.color}20`,
                        color: result.color,
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: '600',
                        border: `1px solid ${result.color}40`
                      }}
                    >
                      {test}
                    </span>
                  ))}
                </div>
              </div>

              {/* Comment */}
              <div style={{ background: 'rgba(15,25,35,0.6)', borderRadius: '12px', padding: '20px', marginBottom: '20px', borderLeft: `4px solid ${result.color}` }}>
                <p style={{ fontSize: '15px', color: 'white', fontStyle: 'italic', margin: 0, lineHeight: '1.6' }}>
                  "{result.comment}"
                </p>
              </div>

              {/* Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', borderTop: '1px solid rgba(100,116,139,0.2)' }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>
                    {language === 'es' ? 'Ubicación' : 'Location'}
                  </div>
                  <div style={{ fontSize: '14px', color: '#94a3b8', fontWeight: '600' }}>
                    📍 {result.location}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>
                    {language === 'es' ? 'Completado' : 'Completed'}
                  </div>
                  <div style={{ fontSize: '14px', color: result.color, fontWeight: '600' }}>
                    {result.turnaround} {language === 'es' ? 'días' : 'days'} • {result.dateCompleted}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div style={{ marginTop: '60px', background: 'linear-gradient(135deg, #ec4899, #8b5cf6)', borderRadius: '24px', padding: '60px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '40px', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>
            {language === 'es' ? '¿Listo para obtener sus resultados?' : 'Ready to get your results?'}
          </h2>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)', marginBottom: '30px' }}>
            {language === 'es' 
              ? 'Únase a cientos de clientes satisfechos que confían en AuditDNA para pruebas precisas' 
              : 'Join hundreds of satisfied customers who trust AuditDNA for accurate testing'}
          </p>
          <button
            style={{
              background: 'white',
              color: '#ec4899',
              border: 'none',
              borderRadius: '12px',
              padding: '18px 50px',
              fontSize: '20px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            onClick={() => window.location.href = '/testing'}
          >
            {language === 'es' ? 'Comenzar Ahora' : 'Get Started Now'} →
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultsPortal;

