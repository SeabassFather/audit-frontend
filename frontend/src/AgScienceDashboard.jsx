import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { useCart } from './CartContext';
import audioSystem from './audioSystem';

const AgScienceDashboard = () => {
  const { language } = useLanguage();
  const { addToCart, cart, getTotal } = useCart();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { id: 'crop', icon: '🌾', name: 'Crop Quality Audit', nameEs: 'Auditoría de Cultivos', description: 'Yield, quality, disease risk assessment' },
    { id: 'pest', icon: '🦗', name: 'Pest Management Audit', nameEs: 'Auditoría de Plagas', description: 'IPM compliance & resistance risk analysis' },
    { id: 'residue', icon: '☣️', name: 'Pesticide Residue Audit', nameEs: 'Auditoría de Residuos', description: 'MRL compliance for export markets' },
    { id: 'seed', icon: '🌱', name: 'Seed Quality Audit', nameEs: 'Auditoría de Semillas', description: 'Germination, purity, certification compliance' }
  ];

  const auditServices = {
    crop: [
      {
        id: 'AG-AUDIT-001',
        name: 'Crop Disease Risk Assessment',
        description: 'Analyze your pathogen test results for outbreak prevention',
        price: 95,
        turnaround: '48 hours',
        includes: [
          'Disease identification verification',
          'Spread risk modeling',
          'Treatment effectiveness analysis',
          'Prevention recommendations',
          'Cost-benefit projections'
        ],
        aiPowered: true
      },
      {
        id: 'AG-AUDIT-002',
        name: 'Yield Optimization Analysis',
        description: 'Compare your nutrient/soil data to maximize crop yield',
        price: 125,
        turnaround: '3-5 days',
        includes: [
          'Growth factor analysis',
          'Nutrient efficiency scoring',
          'Stress impact assessment',
          'Yield prediction modeling',
          'ROI optimization plan'
        ],
        popular: true,
        aiPowered: true
      },
      {
        id: 'AG-AUDIT-003',
        name: 'Post-Harvest Quality Audit',
        description: 'Assess quality metrics for market grading & pricing',
        price: 85,
        turnaround: '24-48 hours',
        includes: [
          'Quality grade verification',
          'Shelf-life prediction',
          'Storage recommendations',
          'Market positioning analysis'
        ],
        aiPowered: true
      }
    ],
    pest: [
      {
        id: 'AG-AUDIT-004',
        name: 'IPM Program Effectiveness Audit',
        description: 'Evaluate your integrated pest management strategy results',
        price: 115,
        turnaround: '3-5 days',
        includes: [
          'Pest population trend analysis',
          'Treatment efficacy scoring',
          'Economic threshold verification',
          'IPM optimization recommendations',
          'Resistance risk assessment'
        ],
        aiPowered: true
      },
      {
        id: 'AG-AUDIT-005',
        name: 'Pesticide Resistance Analysis',
        description: 'Analyze bioassay/resistance test data for management strategy',
        price: 145,
        turnaround: '5-7 days',
        includes: [
          'Resistance mechanism identification',
          'Cross-resistance risk mapping',
          'Alternative product recommendations',
          'Rotation strategy planning',
          'Long-term management plan'
        ],
        popular: true,
        aiPowered: true,
        critical: true
      }
    ],
    residue: [
      {
        id: 'AG-AUDIT-006',
        name: 'Export MRL Compliance Audit',
        description: 'Verify your pesticide residue data meets destination country limits',
        price: 135,
        turnaround: '48 hours',
        includes: [
          'Multi-country MRL verification',
          'Rejection risk scoring',
          'Pre-harvest interval compliance',
          'Alternative chemistry recommendations',
          'Documentation prep for customs'
        ],
        aiPowered: true,
        critical: true
      },
      {
        id: 'AG-AUDIT-007',
        name: 'Organic Certification Residue Audit',
        description: 'Verify zero prohibited substance residues for organic certification',
        price: 165,
        turnaround: '3-5 days',
        includes: [
          'USDA/EU organic standards check',
          'Contamination source investigation',
          'Buffer zone effectiveness analysis',
          'Certification readiness report',
          'Corrective action plan'
        ],
        popular: true,
        aiPowered: true,
        critical: true
      },
      {
        id: 'AG-AUDIT-008',
        name: 'Residue Degradation Analysis',
        description: 'Model residue breakdown for safe harvest timing',
        price: 95,
        turnaround: '24-48 hours',
        includes: [
          'Degradation rate calculation',
          'Safe harvest date prediction',
          'Environmental factor modeling',
          'Re-entry interval verification'
        ],
        aiPowered: true
      }
    ],
    seed: [
      {
        id: 'AG-AUDIT-009',
        name: 'Seed Germination Quality Audit',
        description: 'Analyze your germination test results for quality assurance',
        price: 75,
        turnaround: '24 hours',
        includes: [
          'AOSA standard verification',
          'Vigor index analysis',
          'Storage condition recommendations',
          'Sell-by date calculation',
          'Quality grade assignment'
        ],
        aiPowered: true
      },
      {
        id: 'AG-AUDIT-010',
        name: 'Seed Purity Certification Audit',
        description: 'Verify purity standards for seed certification programs',
        price: 105,
        turnaround: '48 hours',
        includes: [
          'AOSCA/OECD compliance check',
          'Varietal purity verification',
          'Weed seed tolerance analysis',
          'Certification eligibility report',
          'Labeling requirement guidance'
        ],
        aiPowered: true,
        critical: true
      },
      {
        id: 'AG-AUDIT-011',
        name: 'Seed Health Pathogen Audit',
        description: 'Assess seed-borne disease risk for crop safety',
        price: 125,
        turnaround: '3-5 days',
        includes: [
          'Pathogen detection verification',
          'Disease transmission risk',
          'Seed treatment recommendations',
          'Phytosanitary certification prep',
          'Export documentation support'
        ],
        popular: true,
        aiPowered: true,
        critical: true
      },
      {
        id: 'AG-AUDIT-012',
        name: 'GMO Compliance & Traceability Audit',
        description: 'Verify GMO detection results for regulatory compliance',
        price: 155,
        turnaround: '3-5 days',
        includes: [
          'GMO presence/absence verification',
          'Threshold compliance check (0.9% EU)',
          'Traceability documentation review',
          'Labeling requirement guidance',
          'Market-specific compliance report'
        ],
        aiPowered: true,
        critical: true
      }
    ]
  };

  const FeaturedCard = ({ category }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <div
        onClick={() => { audioSystem.playClick(); setSelectedCategory(category.id); }}
        onMouseEnter={() => { setIsHovered(true); audioSystem.playHover(); }}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: isHovered ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, rgba(16, 185, 129, 0.1) 100%)' : 'rgba(30, 41, 59, 0.6)',
          backdropFilter: 'blur(20px)',
          border: isHovered ? '3px solid #10b981' : '2px solid rgba(100, 116, 139, 0.3)',
          borderRadius: '25px',
          padding: '3rem 2rem',
          cursor: 'pointer',
          transition: 'all 0.4s ease',
          transform: isHovered ? 'translateY(-15px) scale(1.05)' : 'translateY(0)',
          boxShadow: isHovered ? '0 25px 60px rgba(16, 185, 129, 0.5)' : '0 10px 30px rgba(0,0,0,0.3)',
          textAlign: 'center'
        }}
      >
        <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>{category.icon}</div>
        <h3 style={{ fontSize: '1.8rem', color: isHovered ? '#10b981' : '#fff', marginBottom: '1rem', fontWeight: 'bold' }}>
          {language === 'es' ? category.nameEs : category.name}
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
          {category.description}
        </p>
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '2rem', color: '#fff' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        <h1 style={{ fontSize: '3.5rem', textAlign: 'center', color: '#10b981', marginBottom: '1rem' }}>
          🌾 AG Sciences Compliance Auditing
        </h1>
        <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '1rem', fontSize: '1.3rem', maxWidth: '900px', margin: '0 auto 1rem' }}>
          {language === 'es' 
            ? 'Sube tus resultados agrícolas - Obten auditoría profesional + recomendaciones AI'
            : 'Upload your agricultural test results - Get professional audits + AI recommendations'}
        </p>
        <p style={{ textAlign: 'center', color: '#10b981', marginBottom: '3rem', fontSize: '1.1rem', fontWeight: 'bold' }}>
          🤖 AI-Powered • 🌍 Export Ready • 📊 Data-Driven Decisions
        </p>

        {!selectedCategory ? (
          <>
            <h2 style={{ fontSize: '2rem', textAlign: 'center', color: '#10b981', marginBottom: '3rem' }}>
              {language === 'es' ? 'Seleccionar Tipo de Auditoría' : 'Select Audit Type'}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {categories.map(cat => <FeaturedCard key={cat.id} category={cat} />)}
            </div>
          </>
        ) : (
          <div>
            <button 
              onClick={() => { audioSystem.playClick(); setSelectedCategory(null); }}
              style={{
                padding: '1rem 2rem',
                background: 'rgba(100, 116, 139, 0.3)',
                border: '2px solid #64748b',
                borderRadius: '12px',
                color: '#fff',
                cursor: 'pointer',
                marginBottom: '2rem',
                fontWeight: 'bold'
              }}
            >
              ← {language === 'es' ? 'Volver' : 'Back'}
            </button>

            <h2 style={{ fontSize: '2.5rem', color: '#10b981', marginBottom: '2rem' }}>
              {categories.find(c => c.id === selectedCategory)?.name}
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '2rem' }}>
              {auditServices[selectedCategory]?.map(service => (
                <div key={service.id} style={{
                  background: 'rgba(30, 41, 59, 0.6)',
                  border: service.critical ? '2px solid #ef4444' : '2px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '20px',
                  padding: '2rem',
                  position: 'relative',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.borderColor = service.critical ? '#ef4444' : '#10b981';
                  e.currentTarget.style.boxShadow = service.critical ? '0 20px 50px rgba(239, 68, 68, 0.4)' : '0 20px 50px rgba(16, 185, 129, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  {service.popular && (
                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: '#f59e0b', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                      ⭐ POPULAR
                    </div>
                  )}
                  {service.critical && (
                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: '#ef4444', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                      🚨 CRITICAL
                    </div>
                  )}
                  {service.aiPowered && (
                    <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: '#8b5cf6', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                      🤖 AI
                    </div>
                  )}

                  <h3 style={{ fontSize: '1.3rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem', fontWeight: 'bold', minHeight: '3rem' }}>
                    {service.name}
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '1.5rem', minHeight: '3rem', lineHeight: '1.5' }}>
                    {service.description}
                  </p>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                      ✅ {language === 'es' ? 'Incluye:' : 'Includes:'}
                    </div>
                    {service.includes.map((item, idx) => (
                      <div key={idx} style={{ color: '#10b981', fontSize: '0.9rem', marginBottom: '0.3rem', paddingLeft: '1rem' }}>
                        • {item}
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', padding: '1rem', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '12px' }}>
                    <div>
                      <div style={{ fontSize: '2rem', color: '#10b981', fontWeight: 'bold' }}>
                        ${service.price}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                        per audit
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1rem', color: '#06b6d4', fontWeight: 'bold' }}>
                        ⏱️ {service.turnaround}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                        delivery
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => { addToCart(service); audioSystem.playSuccess(); }}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      border: 'none',
                      borderRadius: '12px',
                      color: '#fff',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      fontSize: '1.1rem'
                    }}
                  >
                    🛒 {language === 'es' ? 'Solicitar Auditoría' : 'Request Audit'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {cart.length > 0 && (
        <div 
          onClick={() => { audioSystem.playClick(); navigate('/cart'); }}
          style={{ 
            position: 'fixed', 
            bottom: '2rem', 
            right: '2rem', 
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
            border: '3px solid #10b981', 
            borderRadius: '20px', 
            padding: '1.5rem', 
            minWidth: '200px',
            boxShadow: '0 20px 60px rgba(16, 185, 129, 0.6)',
            cursor: 'pointer',
            zIndex: 9999,
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🛒</div>
          <div style={{ color: '#fff', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            {cart.length} {language === 'es' ? 'auditorías' : 'audits'}
          </div>
          <div style={{ fontSize: '1.8rem', color: '#fff', fontWeight: 'bold' }}>
            ${getTotal().toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
};

export default AgScienceDashboard;
