import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FinancialServices() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('factoring');

  const tabs = [
    { id: 'factoring', label: 'Invoice Factoring', icon: 'ðŸ’µ' },
    { id: 'payment-terms', label: 'Payment Terms', icon: 'ðŸ“…' },
    { id: 'credit-risk', label: 'Credit Risk', icon: 'âš ï¸' },
    { id: 'working-capital', label: 'Working Capital', icon: 'ðŸ“ˆ' },
    { id: 'currency', label: 'Currency Exchange', icon: 'ðŸŒ' },
    { id: 'reports', label: 'Financial Reports', icon: 'ðŸ“Š' }
  ];

  const services = [
    {
      id: 1,
      name: 'Invoice Factoring',
      icon: 'ðŸ’µ',
      desc: 'Convert invoices to immediate cash. Upload invoices, get funded within 24 hours.',
      stats: { active: '23 Deals', volume: '$2.4M' },
      color: '#3b82f6'
    },
    {
      id: 2,
      name: 'Trade Finance',
      icon: 'ðŸŒ',
      desc: 'Letters of Credit, shipping documents, international trade compliance.',
      stats: { active: '12 LCs', volume: '$1.8M' },
      color: '#22c55e'
    },
    {
      id: 3,
      name: 'Business Loans',
      icon: 'ðŸ¦',
      desc: 'Equipment financing, working capital, commercial real estate loans.',
      stats: { active: '8 Apps', volume: '$3.2M' },
      color: '#eab308'
    },
    {
      id: 4,
      name: 'Credit Analysis',
      icon: 'ðŸ“Š',
      desc: 'Analyze debtor creditworthiness, risk scoring, financial statement analysis.',
      stats: { reports: '45', avg: '720 FICO' },
      color: '#8b5cf6'
    }
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* HEADER */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ 
            fontSize: '3.5rem', 
            fontWeight: '900', 
            color: '#0f172a',
            marginBottom: '12px',
            letterSpacing: '-1.5px'
          }}>
            ðŸ’° Financial Services
          </h1>
          <p style={{ 
            fontSize: '1.15rem', 
            color: '#475569', 
            fontWeight: '500',
            maxWidth: '800px'
          }}>
            Invoice factoring, payment terms analysis, credit risk assessment, and financial reporting.
          </p>
        </div>

        {/* STATS OVERVIEW */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '20px', 
          marginBottom: '40px' 
        }}>
          <div style={{ background: '#eff6ff', border: '3px solid #3b82f6', borderRadius: '12px', padding: '24px' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#1e40af', marginBottom: '8px', textTransform: 'uppercase' }}>Total Volume</div>
            <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#1e40af' }}>$7.4M</div>
          </div>
          <div style={{ background: '#f0fdf4', border: '3px solid #22c55e', borderRadius: '12px', padding: '24px' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#166534', marginBottom: '8px', textTransform: 'uppercase' }}>Active Deals</div>
            <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#166534' }}>43</div>
          </div>
          <div style={{ background: '#fefce8', border: '3px solid #eab308', borderRadius: '12px', padding: '24px' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#854d0e', marginBottom: '8px', textTransform: 'uppercase' }}>Funded This Month</div>
            <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#854d0e' }}>$1.2M</div>
          </div>
          <div style={{ background: '#f5f3ff', border: '3px solid #8b5cf6', borderRadius: '12px', padding: '24px' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#5b21b6', marginBottom: '8px', textTransform: 'uppercase' }}>Pending Review</div>
            <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#5b21b6' }}>7</div>
          </div>
        </div>

        {/* TABS */}
        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          marginBottom: '32px', 
          overflowX: 'auto',
          paddingBottom: '12px',
          borderBottom: '2px solid #e2e8f0'
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '12px 24px',
                background: activeTab === tab.id ? '#3b82f6' : 'white',
                color: activeTab === tab.id ? 'white' : '#64748b',
                border: activeTab === tab.id ? 'none' : '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '700',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}
        <div style={{ 
          background: 'white', 
          borderRadius: '12px', 
          padding: '32px',
          boxShadow: '0 2px 8px rgba(15, 23, 42, 0.08)',
          border: '2px solid #e2e8f0'
        }}>
          {activeTab === 'factoring' && <FactoringTab />}
          {activeTab === 'payment-terms' && <PaymentTermsTab />}
          {activeTab === 'credit-risk' && <CreditRiskTab />}
          {activeTab === 'working-capital' && <WorkingCapitalTab />}
          {activeTab === 'currency' && <CurrencyTab />}
          {activeTab === 'reports' && <ReportsTab />}
        </div>

      </div>
    </div>
  );
}

// ========================================
// TAB 1: INVOICE FACTORING
// ========================================
function FactoringTab() {
  const [formData, setFormData] = useState({
    invoiceAmount: '',
    advanceRate: 85,
    feeRate: 2.5
  });

  const [result, setResult] = useState(null);

  const calculateFactoring = () => {
    const invoice = parseFloat(formData.invoiceAmount) || 0;
    const advance = (invoice * formData.advanceRate) / 100;
    const fee = (invoice * formData.feeRate) / 100;
    const reserve = invoice - advance;
    const netAdvance = advance - fee;

    setResult({
      invoiceAmount: invoice.toFixed(2),
      advanceAmount: advance.toFixed(2),
      feeAmount: fee.toFixed(2),
      reserveAmount: reserve.toFixed(2),
      netAdvance: netAdvance.toFixed(2)
    });
  };

  return (
    <div style={{ padding: '20px 0' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', marginBottom: '24px' }}>
        Invoice Factoring Calculator
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>
            Invoice Amount ($)
          </label>
          <input
            type="number"
            value={formData.invoiceAmount}
            onChange={(e) => setFormData({...formData, invoiceAmount: e.target.value})}
            placeholder="50000"
            style={{ 
              width: '100%', 
              padding: '12px', 
              border: '2px solid #e2e8f0', 
              borderRadius: '8px', 
              fontSize: '1rem',
              color: '#0f172a'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>
            Advance Rate (%)
          </label>
          <input
            type="number"
            value={formData.advanceRate}
            onChange={(e) => setFormData({...formData, advanceRate: parseFloat(e.target.value)})}
            style={{ 
              width: '100%', 
              padding: '12px', 
              border: '2px solid #e2e8f0', 
              borderRadius: '8px', 
              fontSize: '1rem',
              color: '#0f172a'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>
            Fee Rate (%)
          </label>
          <input
            type="number"
            step="0.1"
            value={formData.feeRate}
            onChange={(e) => setFormData({...formData, feeRate: parseFloat(e.target.value)})}
            style={{ 
              width: '100%', 
              padding: '12px', 
              border: '2px solid #e2e8f0', 
              borderRadius: '8px', 
              fontSize: '1rem',
              color: '#0f172a'
            }}
          />
        </div>
      </div>

      <button
        onClick={calculateFactoring}
        style={{ 
          padding: '14px 32px', 
          background: '#3b82f6', 
          color: 'white', 
          border: 'none', 
          borderRadius: '8px', 
          fontSize: '1rem', 
          fontWeight: '700',
          cursor: 'pointer',
          marginBottom: '32px'
        }}
      >
        Calculate Factoring
      </button>

      {result && (
        <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '2px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '20px' }}>
            Factoring Results
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div style={{ background: 'white', padding: '16px', borderRadius: '8px', border: '2px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '6px' }}>Invoice Amount</div>
              <div style={{ fontSize: '2rem', fontWeight: '900', color: '#0f172a' }}>${result.invoiceAmount}</div>
            </div>
            <div style={{ background: '#dcfce7', padding: '16px', borderRadius: '8px', border: '2px solid #22c55e' }}>
              <div style={{ fontSize: '0.85rem', color: '#166534', marginBottom: '6px' }}>Advance Amount</div>
              <div style={{ fontSize: '2rem', fontWeight: '900', color: '#166534' }}>${result.advanceAmount}</div>
            </div>
            <div style={{ background: '#fee2e2', padding: '16px', borderRadius: '8px', border: '2px solid #ef4444' }}>
              <div style={{ fontSize: '0.85rem', color: '#991b1b', marginBottom: '6px' }}>Factoring Fee</div>
              <div style={{ fontSize: '2rem', fontWeight: '900', color: '#991b1b' }}>${result.feeAmount}</div>
            </div>
            <div style={{ background: '#fef3c7', padding: '16px', borderRadius: '8px', border: '2px solid #eab308' }}>
              <div style={{ fontSize: '0.85rem', color: '#854d0e', marginBottom: '6px' }}>Reserve Amount</div>
              <div style={{ fontSize: '2rem', fontWeight: '900', color: '#854d0e' }}>${result.reserveAmount}</div>
            </div>
            <div style={{ background: '#dbeafe', padding: '20px', borderRadius: '8px', border: '3px solid #3b82f6', gridColumn: 'span 2' }}>
              <div style={{ fontSize: '0.9rem', color: '#1e40af', marginBottom: '8px', fontWeight: '700' }}>Net Cash Advance</div>
              <div style={{ fontSize: '3rem', fontWeight: '900', color: '#1e40af' }}>${result.netAdvance}</div>
            </div>
          </div>
          
          {/* PDF/EMAIL/PRINT BUTTONS */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '24px', paddingTop: '24px', borderTop: '2px solid #e2e8f0' }}>
            <button style={{ 
              flex: 1,
              padding: '12px', 
              background: '#ef4444', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px', 
              fontWeight: '700',
              cursor: 'pointer'
            }}>
              ðŸ“„ Generate PDF
            </button>
            <button style={{ 
              flex: 1,
              padding: '12px', 
              background: '#22c55e', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px', 
              fontWeight: '700',
              cursor: 'pointer'
            }}>
              ðŸ“§ Email Report
            </button>
            <button style={{ 
              flex: 1,
              padding: '12px', 
              background: '#64748b', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px', 
              fontWeight: '700',
              cursor: 'pointer'
            }}>
              ðŸ–¨ï¸ Print
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ========================================
// TAB 2: PAYMENT TERMS
// ========================================
function PaymentTermsTab() {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <div style={{ fontSize: '4rem', marginBottom: '24px' }}>ðŸ“…</div>
      <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', marginBottom: '16px' }}>
        Payment Terms Analysis
      </h2>
      <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '32px' }}>
        Analyze early payment discounts and effective interest rates (2/10 Net 30, Net 60)
      </p>
      <div style={{ background: '#eff6ff', padding: '32px', borderRadius: '12px', border: '2px solid #3b82f6', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ fontSize: '1.3rem', fontWeight: '700', color: '#1e40af' }}>Coming Soon</div>
        <div style={{ fontSize: '0.95rem', color: '#64748b', marginTop: '8px' }}>Payment terms calculator and analysis tools</div>
      </div>
    </div>
  );
}

// ========================================
// TAB 3: CREDIT RISK
// ========================================
function CreditRiskTab() {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <div style={{ fontSize: '4rem', marginBottom: '24px' }}>âš ï¸</div>
      <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', marginBottom: '16px' }}>
        Credit Risk Assessment
      </h2>
      <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '32px' }}>
        Evaluate customer creditworthiness and AI-powered risk scoring
      </p>
      <div style={{ background: '#fef3c7', padding: '32px', borderRadius: '12px', border: '2px solid #eab308', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ fontSize: '1.3rem', fontWeight: '700', color: '#854d0e' }}>Coming Soon</div>
        <div style={{ fontSize: '0.95rem', color: '#64748b', marginTop: '8px' }}>AI-powered credit analysis and risk scoring engine</div>
      </div>
    </div>
  );
}

// ========================================
// TAB 4: WORKING CAPITAL
// ========================================
function WorkingCapitalTab() {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <div style={{ fontSize: '4rem', marginBottom: '24px' }}>ðŸ“ˆ</div>
      <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', marginBottom: '16px' }}>
        Working Capital Management
      </h2>
      <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '32px' }}>
        Calculate working capital ratios and optimize cash flow
      </p>
      <div style={{ background: '#dcfce7', padding: '32px', borderRadius: '12px', border: '2px solid #22c55e', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ fontSize: '1.3rem', fontWeight: '700', color: '#166534' }}>Coming Soon</div>
        <div style={{ fontSize: '0.95rem', color: '#64748b', marginTop: '8px' }}>Cash flow optimizer and liquidity analysis tools</div>
      </div>
    </div>
  );
}

// ========================================
// TAB 5: CURRENCY EXCHANGE
// ========================================
function CurrencyTab() {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <div style={{ fontSize: '4rem', marginBottom: '24px' }}>ðŸŒ</div>
      <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', marginBottom: '16px' }}>
        Currency Exchange
      </h2>
      <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '32px' }}>
        Multi-currency conversion for international transactions
      </p>
      <div style={{ background: '#f5f3ff', padding: '32px', borderRadius: '12px', border: '2px solid #8b5cf6', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ fontSize: '1.3rem', fontWeight: '700', color: '#5b21b6', marginBottom: '16px' }}>11 Currency Support</div>
        <div style={{ fontSize: '0.95rem', color: '#64748b' }}>USD, EUR, GBP, MXN, CAD, JPY, CNY, INR, AUD, BRL, CHF</div>
      </div>
    </div>
  );
}

// ========================================
// TAB 6: FINANCIAL REPORTS
// ========================================
function ReportsTab() {
  const reports = [
    { name: 'Summary Report', icon: 'ðŸ“Š', desc: 'Key financial metrics and KPIs', color: '#3b82f6' },
    { name: 'AR Aging Report', icon: 'ðŸ“…', desc: 'Accounts receivable aging analysis', color: '#22c55e' },
    { name: 'Profitability Analysis', icon: 'ðŸ’°', desc: 'Product-level profit margins', color: '#8b5cf6' },
    { name: 'Cash Flow Statement', icon: 'ðŸ’µ', desc: 'Operating, investing, financing activities', color: '#eab308' }
  ];

  return (
    <div style={{ padding: '20px 0' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', marginBottom: '24px' }}>
        Financial Reports
      </h2>
      <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '32px' }}>
        Generate comprehensive financial summaries and dashboards
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {reports.map(report => (
          <div key={report.name} style={{ 
            background: 'white', 
            padding: '24px', 
            borderRadius: '12px',
            border: `3px solid ${report.color}`,
            transition: 'transform 0.2s'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>{report.icon}</div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>
              {report.name}
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '20px', lineHeight: '1.5' }}>
              {report.desc}
            </p>
            <button style={{ 
              width: '100%',
              padding: '12px', 
              background: report.color, 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px', 
              fontWeight: '700',
              cursor: 'pointer'
            }}>
              Generate Report
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
