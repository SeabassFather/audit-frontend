import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Factoring() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  const deals = [
    { id: 1, client: 'ABC Manufacturing', invoice: 'INV-2024-001', amount: '$125,000', advance: '$106,250', status: 'Funded', date: '2024-10-20' },
    { id: 2, client: 'XYZ Distributors', invoice: 'INV-2024-002', amount: '$85,000', advance: '$72,250', status: 'Pending', date: '2024-10-22' },
    { id: 3, client: 'Global Suppliers Inc', invoice: 'INV-2024-003', amount: '$200,000', advance: '$170,000', status: 'In Review', date: '2024-10-24' },
  ];

  const renderDashboard = () => (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <div style={{ background: '#eff6ff', border: '3px solid #3b82f6', borderRadius: '12px', padding: '24px' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#1e40af', marginBottom: '8px' }}>ACTIVE DEALS</div>
          <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#1e40af' }}>23</div>
        </div>
        <div style={{ background: '#f0fdf4', border: '3px solid #22c55e', borderRadius: '12px', padding: '24px' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#166534', marginBottom: '8px' }}>TOTAL FUNDED</div>
          <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#166534' }}>$2.4M</div>
        </div>
        <div style={{ background: '#fefce8', border: '3px solid #eab308', borderRadius: '12px', padding: '24px' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#854d0e', marginBottom: '8px' }}>AVG ADVANCE RATE</div>
          <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#854d0e' }}>85%</div>
        </div>
        <div style={{ background: '#fef2f2', border: '3px solid #ef4444', borderRadius: '12px', padding: '24px' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#991b1b', marginBottom: '8px' }}>PENDING REVIEW</div>
          <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#991b1b' }}>5</div>
        </div>
      </div>

      <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '16px' }}>Recent Deals</h3>
      <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(15, 23, 42, 0.08)', border: '2px solid #e2e8f0' }}>
        {deals.map((deal, idx) => (
          <div key={deal.id} style={{ 
            padding: '16px', 
            background: '#f8fafc', 
            borderRadius: '8px', 
            marginBottom: idx < deals.length - 1 ? '12px' : '0',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr 120px',
            gap: '16px',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>CLIENT</div>
              <div style={{ fontSize: '1rem', fontWeight: '700', color: '#0f172a' }}>{deal.client}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>INVOICE</div>
              <div style={{ fontSize: '1rem', fontWeight: '700', color: '#0f172a' }}>{deal.invoice}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>AMOUNT</div>
              <div style={{ fontSize: '1rem', fontWeight: '700', color: '#0f172a' }}>{deal.amount}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>ADVANCE</div>
              <div style={{ fontSize: '1rem', fontWeight: '700', color: '#22c55e' }}>{deal.advance}</div>
            </div>
            <div>
              <span style={{ 
                padding: '6px 12px', 
                borderRadius: '20px', 
                fontSize: '0.8rem', 
                fontWeight: '700',
                background: deal.status === 'Funded' ? '#dcfce7' : deal.status === 'Pending' ? '#fef3c7' : '#dbeafe',
                color: deal.status === 'Funded' ? '#166534' : deal.status === 'Pending' ? '#854d0e' : '#1e40af',
                display: 'inline-block'
              }}>
                {deal.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNewDeal = () => (
    <div style={{ background: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 2px 8px rgba(15, 23, 42, 0.08)', border: '2px solid #e2e8f0' }}>
      <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a', marginBottom: '24px' }}>New Factoring Deal</h3>
      
      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>Client Name</label>
        <input type='text' placeholder='ABC Manufacturing' style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem' }} />
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>Invoice Number</label>
        <input type='text' placeholder='INV-2024-001' style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>Invoice Amount ($)</label>
          <input type='number' placeholder='125000' style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem' }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>Advance Rate (%)</label>
          <input type='number' placeholder='85' style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem' }} />
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>Upload Invoice (PDF)</label>
        <div style={{ 
          border: '3px dashed #cbd5e1', 
          borderRadius: '12px', 
          padding: '40px', 
          textAlign: 'center',
          background: '#f8fafc',
          cursor: 'pointer'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '12px' }}>📄</div>
          <div style={{ fontSize: '1rem', fontWeight: '600', color: '#64748b' }}>Click to upload or drag and drop</div>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '8px' }}>PDF, PNG, JPG (MAX 10MB)</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px' }}>
        <button style={{ 
          flex: 1,
          padding: '14px', 
          background: '#3b82f6', 
          color: 'white', 
          border: 'none', 
          borderRadius: '8px', 
          fontSize: '1rem', 
          fontWeight: '700',
          cursor: 'pointer'
        }}>
          Submit for Review
        </button>
        <button style={{ 
          flex: 1,
          padding: '14px', 
          background: '#f1f5f9', 
          color: '#475569', 
          border: '2px solid #e2e8f0', 
          borderRadius: '8px', 
          fontSize: '1rem', 
          fontWeight: '700',
          cursor: 'pointer'
        }}>
          Save as Draft
        </button>
      </div>
    </div>
  );

  const renderReports = () => (
    <div style={{ background: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 2px 8px rgba(15, 23, 42, 0.08)', border: '2px solid #e2e8f0' }}>
      <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a', marginBottom: '24px' }}>Factoring Reports</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '12px', border: '2px solid #e2e8f0' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📊</div>
          <h4 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>Monthly Summary</h4>
          <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '16px' }}>Deals funded, volume, fees collected</p>
          <button style={{ width: '100%', padding: '10px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '700', cursor: 'pointer' }}>
            Generate PDF
          </button>
        </div>

        <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '12px', border: '2px solid #e2e8f0' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📧</div>
          <h4 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>Email Invoice</h4>
          <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '16px' }}>Send invoice to client via email</p>
          <button style={{ width: '100%', padding: '10px', background: '#22c55e', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '700', cursor: 'pointer' }}>
            Send Email
          </button>
        </div>

        <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '12px', border: '2px solid #e2e8f0' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🖨️</div>
          <h4 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>Print Deal Summary</h4>
          <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '16px' }}>Print factoring deal details</p>
          <button style={{ width: '100%', padding: '10px', background: '#64748b', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '700', cursor: 'pointer' }}>
            Print
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* HEADER */}
        <div style={{ marginBottom: '32px' }}>
          <button 
            onClick={() => navigate('/financial')}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#3b82f6', 
              fontSize: '1rem', 
              fontWeight: '700', 
              cursor: 'pointer',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            ← Back to Financial Services
          </button>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '900', color: '#0f172a', marginBottom: '12px', letterSpacing: '-1.5px' }}>
            💵 Invoice Factoring
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#475569', fontWeight: '500' }}>
            Convert your invoices to immediate cash. Get funded within 24 hours.
          </p>
        </div>

        {/* TABS */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', borderBottom: '2px solid #e2e8f0' }}>
          <button
            onClick={() => setActiveTab('dashboard')}
            style={{
              padding: '12px 24px',
              background: activeTab === 'dashboard' ? '#3b82f6' : 'transparent',
              color: activeTab === 'dashboard' ? 'white' : '#64748b',
              border: 'none',
              borderRadius: '8px 8px 0 0',
              fontSize: '1rem',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('new')}
            style={{
              padding: '12px 24px',
              background: activeTab === 'new' ? '#3b82f6' : 'transparent',
              color: activeTab === 'new' ? 'white' : '#64748b',
              border: 'none',
              borderRadius: '8px 8px 0 0',
              fontSize: '1rem',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            New Deal
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            style={{
              padding: '12px 24px',
              background: activeTab === 'reports' ? '#3b82f6' : 'transparent',
              color: activeTab === 'reports' ? 'white' : '#64748b',
              border: 'none',
              borderRadius: '8px 8px 0 0',
              fontSize: '1rem',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            Reports
          </button>
        </div>

        {/* TAB CONTENT */}
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'new' && renderNewDeal()}
        {activeTab === 'reports' && renderReports()}

      </div>
    </div>
  );
}
