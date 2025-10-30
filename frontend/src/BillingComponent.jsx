import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import audioSystem from './audioSystem';

const BillingComponent = () => {
  const { language } = useLanguage();
  const [selectedPayment, setSelectedPayment] = useState('card');

  const invoices = [
    { 
      id: 'INV-2025-001', 
      date: '10/14/2025', 
      tests: 15, 
      amount: 850, 
      status: 'paid',
      color: '#10b981'
    },
    { 
      id: 'INV-2025-002', 
      date: '10/18/2025', 
      tests: 22, 
      amount: 1240, 
      status: 'pending',
      color: '#f59e0b'
    },
    { 
      id: 'INV-2025-003', 
      date: '10/24/2025', 
      tests: 18, 
      amount: 560, 
      status: 'overdue',
      color: '#ef4444'
    }
  ];

  const paymentMethods = [
    { id: 'card', name: 'Credit Card', icon: '💳', color: '#8b5cf6' },
    { id: 'transfer', name: 'Bank Transfer', icon: '🏦', color: '#06b6d4' },
    { id: 'net30', name: 'Net 30 Invoice', icon: '📄', color: '#10b981' }
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #1e1b4b 100%)', 
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* ANIMATED BACKGROUND PARTICLES */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'hidden' }}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: Math.random() * 100 + 50 + 'px',
              height: Math.random() * 100 + 50 + 'px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${['#8b5cf6', '#ec4899', '#06b6d4', '#10b981'][Math.floor(Math.random() * 4)]}30 0%, transparent 70%)`,
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `float-particle ${10 + Math.random() * 20}s ease-in-out infinite`,
              animationDelay: Math.random() * 5 + 's'
            }}
          />
        ))}
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        {/* HEADER WITH 3D EFFECT */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '3rem',
          transform: 'translateZ(50px)',
          perspective: '1000px'
        }}>
          <h1 style={{ 
            fontSize: '4rem', 
            background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #06b6d4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem',
            fontWeight: 'bold',
            textShadow: '0 0 60px rgba(236, 72, 153, 0.5)',
            animation: 'glow-pulse 3s ease-in-out infinite'
          }}>
            Payment & Billing
          </h1>
          <p style={{ fontSize: '1.3rem', color: '#94a3b8', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            {language === 'es' ? 'Gestión de Pagos y Facturación' : 'Manage Your Payments & Invoices'}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          
          {/* LEFT COLUMN - INVOICES */}
          <div>
            <div style={{ 
              background: 'rgba(30, 41, 59, 0.4)',
              backdropFilter: 'blur(30px)',
              borderRadius: '30px',
              padding: '2.5rem',
              border: '2px solid rgba(139, 92, 246, 0.3)',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* GLASSMORPHIC SHINE OVERLAY */}
              <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.05) 50%, transparent 70%)',
                animation: 'shine-sweep 6s ease-in-out infinite',
                pointerEvents: 'none'
              }} />

              <h2 style={{ 
                fontSize: '2rem', 
                color: '#ec4899', 
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                textShadow: '0 0 20px rgba(236, 72, 153, 0.5)'
              }}>
                <span style={{ fontSize: '2.5rem' }}>📄</span>
                {language === 'es' ? 'Facturas Recientes' : 'Recent Invoices'}
              </h2>

              {invoices.map((invoice, idx) => (
                <div 
                  key={invoice.id}
                  style={{ 
                    background: 'rgba(15, 23, 42, 0.6)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '20px',
                    padding: '1.5rem',
                    marginBottom: '1.5rem',
                    border: '2px solid ' + invoice.color + '50',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                    e.currentTarget.style.borderColor = invoice.color;
                    e.currentTarget.style.boxShadow = `0 25px 60px ${invoice.color}60, inset 0 1px 0 rgba(255, 255, 255, 0.1)`;
                    audioSystem.playHover();
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.borderColor = invoice.color + '50';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)';
                  }}
                >
                  {/* GLOWING BORDER ANIMATION */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: '20px',
                    padding: '2px',
                    background: `linear-gradient(135deg, ${invoice.color}00 0%, ${invoice.color}60 50%, ${invoice.color}00 100%)`,
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    animation: 'rotate-border 4s linear infinite',
                    pointerEvents: 'none'
                  }} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem' }}>
                        {invoice.id}
                      </div>
                      <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                        {invoice.date} • {invoice.tests} tests
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '2rem', fontWeight: 'bold', color: invoice.color }}>
                        ${invoice.amount}
                      </div>
                      <div style={{ 
                        fontSize: '0.8rem', 
                        fontWeight: 'bold',
                        color: invoice.color,
                        textTransform: 'uppercase',
                        background: invoice.color + '20',
                        padding: '0.3rem 0.8rem',
                        borderRadius: '20px',
                        marginTop: '0.5rem'
                      }}>
                        {invoice.status}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                      onClick={() => audioSystem.playClick()}
                      style={{
                        flex: 1,
                        padding: '0.8rem',
                        background: 'linear-gradient(135deg, ' + invoice.color + ' 0%, ' + invoice.color + 'dd 100%)',
                        border: 'none',
                        borderRadius: '12px',
                        color: '#fff',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: '0.95rem',
                        boxShadow: '0 5px 15px ' + invoice.color + '40',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'scale(1.05)';
                        e.target.style.boxShadow = '0 10px 25px ' + invoice.color + '60';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = '0 5px 15px ' + invoice.color + '40';
                      }}
                    >
                      {language === 'es' ? 'Ver Factura' : 'View Invoice'}
                    </button>
                    <button
                      onClick={() => audioSystem.playClick()}
                      style={{
                        flex: 1,
                        padding: '0.8rem',
                        background: 'rgba(30, 41, 59, 0.6)',
                        border: '2px solid #06b6d4',
                        borderRadius: '12px',
                        color: '#06b6d4',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: '0.95rem',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(6, 182, 212, 0.2)';
                        e.target.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(30, 41, 59, 0.6)';
                        e.target.style.transform = 'scale(1)';
                      }}
                    >
                      {language === 'es' ? 'Descargar PDF' : 'Download PDF'}
                    </button>
                    {invoice.status === 'pending' || invoice.status === 'overdue' ? (
                      <button
                        onClick={() => audioSystem.playSuccess()}
                        style={{
                          padding: '0.8rem 1.5rem',
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                          border: 'none',
                          borderRadius: '12px',
                          color: '#fff',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          fontSize: '0.95rem',
                          boxShadow: '0 5px 15px rgba(16, 185, 129, 0.4)',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'scale(1.05)';
                          e.target.style.boxShadow = '0 10px 25px rgba(16, 185, 129, 0.6)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'scale(1)';
                          e.target.style.boxShadow = '0 5px 15px rgba(16, 185, 129, 0.4)';
                        }}
                      >
                        {language === 'es' ? 'Pagar Ahora' : 'Pay Now'}
                      </button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN - SUMMARY & PAYMENT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* ACCOUNT SUMMARY */}
            <div style={{ 
              background: 'rgba(30, 41, 59, 0.4)',
              backdropFilter: 'blur(30px)',
              borderRadius: '30px',
              padding: '2rem',
              border: '2px solid rgba(16, 185, 129, 0.3)',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-50%',
                width: '200%',
                height: '200%',
                background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
                animation: 'pulse-glow 4s ease-in-out infinite'
              }} />

              <h2 style={{ 
                fontSize: '1.5rem', 
                color: '#10b981', 
                marginBottom: '2rem',
                textAlign: 'center',
                textShadow: '0 0 20px rgba(16, 185, 129, 0.5)'
              }}>
                {language === 'es' ? 'Resumen de Cuenta' : 'Account Summary'}
              </h2>

              <div style={{ 
                background: 'rgba(15, 23, 42, 0.6)',
                backdropFilter: 'blur(15px)',
                borderRadius: '20px',
                padding: '1.5rem',
                marginBottom: '1.5rem',
                border: '2px solid rgba(239, 68, 68, 0.3)',
                textAlign: 'center'
              }}>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                  {language === 'es' ? 'Total Pendiente' : 'Total Outstanding'}
                </div>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#ef4444', textShadow: '0 0 30px rgba(239, 68, 68, 0.6)' }}>
                  $1,800
                </div>
              </div>

              <div style={{ 
                background: 'rgba(15, 23, 42, 0.6)',
                backdropFilter: 'blur(15px)',
                borderRadius: '20px',
                padding: '1.5rem',
                marginBottom: '1.5rem',
                border: '2px solid rgba(16, 185, 129, 0.3)',
                textAlign: 'center'
              }}>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                  {language === 'es' ? 'Este Mes' : 'This Month'}
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981', textShadow: '0 0 30px rgba(16, 185, 129, 0.6)' }}>
                  $850
                </div>
              </div>

              <div style={{ 
                background: 'rgba(15, 23, 42, 0.6)',
                backdropFilter: 'blur(15px)',
                borderRadius: '20px',
                padding: '1.5rem',
                marginBottom: '2rem',
                border: '2px solid rgba(6, 182, 212, 0.3)',
                textAlign: 'center'
              }}>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                  {language === 'es' ? 'Pruebas Completadas' : 'Tests Completed'}
                </div>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#06b6d4', textShadow: '0 0 30px rgba(6, 182, 212, 0.6)' }}>
                  47
                </div>
              </div>

              <button
                onClick={() => audioSystem.playSuccess()}
                style={{
                  width: '100%',
                  padding: '1.2rem',
                  background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
                  border: 'none',
                  borderRadius: '15px',
                  color: '#fff',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  boxShadow: '0 10px 30px rgba(236, 72, 153, 0.5)',
                  transition: 'all 0.3s ease',
                  marginBottom: '1rem'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 15px 40px rgba(236, 72, 153, 0.7)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 10px 30px rgba(236, 72, 153, 0.5)';
                }}
              >
                {language === 'es' ? 'Pagar Todo Pendiente' : 'Pay All Outstanding'}
              </button>

              <div style={{ 
                background: 'rgba(6, 182, 212, 0.1)',
                border: '2px solid rgba(6, 182, 212, 0.3)',
                borderRadius: '12px',
                padding: '1rem',
                fontSize: '0.85rem',
                color: '#94a3b8',
                textAlign: 'center'
              }}>
                <strong style={{ color: '#06b6d4' }}>Auto-Pay Available:</strong> Set up automatic payments to never miss a due date. Contact billing@auditdna.com
              </div>
            </div>

            {/* PAYMENT METHODS */}
            <div style={{ 
              background: 'rgba(30, 41, 59, 0.4)',
              backdropFilter: 'blur(30px)',
              borderRadius: '30px',
              padding: '2rem',
              border: '2px solid rgba(139, 92, 246, 0.3)',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}>
              <h2 style={{ 
                fontSize: '1.5rem', 
                color: '#8b5cf6', 
                marginBottom: '1.5rem',
                textAlign: 'center',
                textShadow: '0 0 20px rgba(139, 92, 246, 0.5)'
              }}>
                {language === 'es' ? 'Métodos de Pago' : 'Payment Methods'}
              </h2>

              <div style={{ display: 'grid', gap: '1rem' }}>
                {paymentMethods.map(method => (
                  <div
                    key={method.id}
                    onClick={() => { setSelectedPayment(method.id); audioSystem.playClick(); }}
                    style={{
                      background: selectedPayment === method.id ? `linear-gradient(135deg, ${method.color}40 0%, ${method.color}20 100%)` : 'rgba(15, 23, 42, 0.6)',
                      backdropFilter: 'blur(15px)',
                      borderRadius: '15px',
                      padding: '1.5rem',
                      border: selectedPayment === method.id ? `3px solid ${method.color}` : '2px solid rgba(100, 116, 139, 0.3)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      boxShadow: selectedPayment === method.id ? `0 10px 30px ${method.color}40` : '0 5px 15px rgba(0, 0, 0, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(5px) scale(1.02)';
                      e.currentTarget.style.borderColor = method.color;
                      audioSystem.playHover();
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0) scale(1)';
                      if (selectedPayment !== method.id) {
                        e.currentTarget.style.borderColor = 'rgba(100, 116, 139, 0.3)';
                      }
                    }}
                  >
                    <div style={{ fontSize: '2.5rem' }}>{method.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fff' }}>
                        {method.name}
                      </div>
                    </div>
                    {selectedPayment === method.id && (
                      <div style={{ fontSize: '1.5rem', color: method.color }}>✓</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes float-particle {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.3; }
          50% { transform: translate(50px, -50px) rotate(180deg); opacity: 0.6; }
        }
        @keyframes glow-pulse {
          0%, 100% { text-shadow: 0 0 60px rgba(236, 72, 153, 0.5); }
          50% { text-shadow: 0 0 80px rgba(236, 72, 153, 0.8), 0 0 120px rgba(139, 92, 246, 0.6); }
        }
        @keyframes shine-sweep {
          0% { transform: translateX(-100%) translateY(-100%); }
          100% { transform: translateX(100%) translateY(100%); }
        }
        @keyframes rotate-border {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default BillingComponent;
