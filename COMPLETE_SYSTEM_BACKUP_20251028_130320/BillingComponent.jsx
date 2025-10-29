import React, { useState } from 'react';
import audioSystem from './audioSystem';

function BillingComponent() {
  const [paymentMethod, setPaymentMethod] = useState('card');

  const invoices = [
    { id: 'INV-2025-001', date: '2025-10-15', amount: 850, status: 'paid', tests: 15 },
    { id: 'INV-2025-002', date: '2025-10-20', amount: 1240, status: 'pending', tests: 22 },
    { id: 'INV-2025-003', date: '2025-10-25', amount: 560, status: 'overdue', tests: 10 }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'paid': return '#10b981';
      case 'pending': return '#facc15';
      case 'overdue': return '#ef4444';
      default: return '#94a3b8';
    }
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <h1 style={{ 
        fontSize: '56px', 
        fontWeight: 'bold', 
        background: 'linear-gradient(135deg, #a855f7, #9333ea)', 
        WebkitBackgroundClip: 'text', 
        WebkitTextFillColor: 'transparent', 
        marginBottom: '40px', 
        textAlign: 'center'
      }}>
        Payment & Billing
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px', marginBottom: '40px' }}>
        {/* Invoices */}
        <div style={{ 
          background: 'rgba(30,41,59,0.6)', 
          backdropFilter: 'blur(16px)', 
          border: '1px solid rgba(168,85,247,0.3)', 
          borderRadius: '24px', 
          padding: '40px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '32px', color: '#a855f7', fontWeight: '700' }}>
              Recent Invoices
            </h2>
            <div style={{ fontSize: '48px' }}></div>
          </div>

          <div style={{ display: 'grid', gap: '16px' }}>
            {invoices.map(invoice => (
              <div
                key={invoice.id}
                style={{
                  background: 'rgba(15,23,42,0.6)',
                  border: `1px solid rgba(148,163,184,0.3)`,
                  borderLeft: `4px solid ${getStatusColor(invoice.status)}`,
                  borderRadius: '12px',
                  padding: '24px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                  <div>
                    <div style={{ fontSize: '18px', color: 'white', fontWeight: '700', marginBottom: '8px' }}>
                      {invoice.id}
                    </div>
                    <div style={{ fontSize: '14px', color: '#94a3b8' }}>
                      {new Date(invoice.date).toLocaleDateString()}  {invoice.tests} tests
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '24px', color: '#a855f7', fontWeight: '700', marginBottom: '4px' }}>
                      ${invoice.amount}
                    </div>
                    <div style={{ 
                      fontSize: '12px', 
                      color: getStatusColor(invoice.status),
                      background: `${getStatusColor(invoice.status)}20`,
                      padding: '4px 12px',
                      borderRadius: '6px',
                      fontWeight: '600',
                      textTransform: 'uppercase'
                    }}>
                      {invoice.status}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button style={{
                    background: 'rgba(168,85,247,0.2)',
                    color: '#a855f7',
                    border: '1px solid rgba(168,85,247,0.4)',
                    borderRadius: '8px',
                    padding: '10px 20px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    flex: 1
                  }}>
                    View Invoice
                  </button>
                  <button style={{
                    background: 'rgba(56,189,248,0.2)',
                    color: '#38bdf8',
                    border: '1px solid rgba(56,189,248,0.4)',
                    borderRadius: '8px',
                    padding: '10px 20px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    flex: 1
                  }}>
                    Download PDF
                  </button>
                  {invoice.status !== 'paid' && (
                    <button style={{
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '10px 20px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      flex: 1
                    }}>
                      Pay Now
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Account Summary */}
        <div style={{ 
          background: 'rgba(30,41,59,0.6)', 
          backdropFilter: 'blur(16px)', 
          border: '1px solid rgba(168,85,247,0.3)', 
          borderRadius: '24px', 
          padding: '40px'
        }}>
          <div style={{ fontSize: '48px', textAlign: 'center', marginBottom: '20px' }}></div>
          <h2 style={{ fontSize: '24px', color: '#a855f7', marginBottom: '30px', fontWeight: '700', textAlign: 'center' }}>
            Account Summary
          </h2>

          <div style={{ display: 'grid', gap: '20px', marginBottom: '30px' }}>
            <div style={{ 
              background: 'rgba(168,85,247,0.1)', 
              border: '1px solid rgba(168,85,247,0.3)', 
              borderRadius: '12px', 
              padding: '20px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '8px' }}>Total Outstanding</div>
              <div style={{ fontSize: '32px', color: '#ef4444', fontWeight: '700' }}>$1,800</div>
            </div>

            <div style={{ 
              background: 'rgba(16,185,129,0.1)', 
              border: '1px solid rgba(16,185,129,0.3)', 
              borderRadius: '12px', 
              padding: '20px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '8px' }}>This Month</div>
              <div style={{ fontSize: '32px', color: '#10b981', fontWeight: '700' }}>$850</div>
            </div>

            <div style={{ 
              background: 'rgba(56,189,248,0.1)', 
              border: '1px solid rgba(56,189,248,0.3)', 
              borderRadius: '12px', 
              padding: '20px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '8px' }}>Tests Completed</div>
              <div style={{ fontSize: '32px', color: '#38bdf8', fontWeight: '700' }}>47</div>
            </div>
          </div>

          <button style={{
            background: 'linear-gradient(135deg, #a855f7, #9333ea)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '16px',
            fontWeight: '700',
            cursor: 'pointer',
            width: '100%',
            marginBottom: '20px',
            boxShadow: '0 8px 25px rgba(168,85,247,0.4)'
          }}>
            Pay All Outstanding
          </button>

          <div style={{ padding: '16px', background: 'rgba(56,189,248,0.1)', borderRadius: '10px', border: '1px solid rgba(56,189,248,0.3)' }}>
            <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.6' }}>
              <strong style={{ color: '#38bdf8' }}>Auto-Pay Available:</strong> Set up automatic payments to never miss a due date. Contact billing@auditdna.com
            </p>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div style={{ 
        background: 'rgba(30,41,59,0.6)', 
        backdropFilter: 'blur(16px)', 
        border: '1px solid rgba(168,85,247,0.3)', 
        borderRadius: '24px', 
        padding: '40px'
      }}>
        <h2 style={{ fontSize: '28px', color: '#a855f7', marginBottom: '30px', fontWeight: '700' }}>
          Payment Methods
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          <button
            onMouseEnter={() => audioSystem.playHover()} onClick={() => setPaymentMethod('card')}
            style={{
              background: paymentMethod === 'card' ? 'rgba(168,85,247,0.2)' : 'rgba(15,23,42,0.6)',
              border: `2px solid ${paymentMethod === 'card' ? 'rgba(168,85,247,0.6)' : 'rgba(148,163,184,0.3)'}`,
              borderRadius: '12px',
              padding: '24px',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.3s'
            }}
          >
            <div style={{ fontSize: '40px', marginBottom: '12px' }}></div>
            <div style={{ fontSize: '16px', color: 'white', fontWeight: '600' }}>Credit Card</div>
          </button>

          <button
            onMouseEnter={() => audioSystem.playHover()} onClick={() => setPaymentMethod('bank')}
            style={{
              background: paymentMethod === 'bank' ? 'rgba(168,85,247,0.2)' : 'rgba(15,23,42,0.6)',
              border: `2px solid ${paymentMethod === 'bank' ? 'rgba(168,85,247,0.6)' : 'rgba(148,163,184,0.3)'}`,
              borderRadius: '12px',
              padding: '24px',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.3s'
            }}
          >
            <div style={{ fontSize: '40px', marginBottom: '12px' }}></div>
            <div style={{ fontSize: '16px', color: 'white', fontWeight: '600' }}>Bank Transfer</div>
          </button>

          <button
            onMouseEnter={() => audioSystem.playHover()} onClick={() => setPaymentMethod('invoice')}
            style={{
              background: paymentMethod === 'invoice' ? 'rgba(168,85,247,0.2)' : 'rgba(15,23,42,0.6)',
              border: `2px solid ${paymentMethod === 'invoice' ? 'rgba(168,85,247,0.6)' : 'rgba(148,163,184,0.3)'}`,
              borderRadius: '12px',
              padding: '24px',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.3s'
            }}
          >
            <div style={{ fontSize: '40px', marginBottom: '12px' }}></div>
            <div style={{ fontSize: '16px', color: 'white', fontWeight: '600' }}>Net 30 Invoice</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default BillingComponent;


