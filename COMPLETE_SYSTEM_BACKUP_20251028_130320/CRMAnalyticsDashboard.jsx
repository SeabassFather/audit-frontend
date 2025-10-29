import React, { useState, useMemo } from 'react';

function CRMAnalyticsDashboard() {
  // Mock order data - in production, fetch from backend
  const [orders] = useState([
    { id: 'ORD-001', customer: 'John Farms', email: 'john@farms.com', location: 'California', tests: 12, amount: 850, date: '2025-10-25', status: 'completed' },
    { id: 'ORD-002', customer: 'AgriCorp Inc', email: 'lab@agricorp.com', location: 'Texas', tests: 25, amount: 1240, date: '2025-10-26', status: 'processing' },
    { id: 'ORD-003', customer: 'Green Valley', email: 'test@greenvalley.com', location: 'Iowa', tests: 8, amount: 560, date: '2025-10-27', status: 'pending' },
    { id: 'ORD-004', customer: 'Sunset Vineyards', email: 'quality@sunset.com', location: 'California', tests: 18, amount: 1150, date: '2025-10-27', status: 'completed' },
    { id: 'ORD-005', customer: 'Prairie Grain Co', email: 'orders@prairie.com', location: 'Kansas', tests: 30, amount: 1890, date: '2025-10-28', status: 'processing' }
  ]);

  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
      const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.id.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [orders, filterStatus, searchTerm]);

  const stats = useMemo(() => {
    return {
      totalOrders: orders.length,
      totalRevenue: orders.reduce((sum, o) => sum + o.amount, 0),
      totalTests: orders.reduce((sum, o) => sum + o.tests, 0),
      avgOrderValue: Math.round(orders.reduce((sum, o) => sum + o.amount, 0) / orders.length),
      byLocation: orders.reduce((acc, o) => {
        acc[o.location] = (acc[o.location] || 0) + 1;
        return acc;
      }, {}),
      byStatus: orders.reduce((acc, o) => {
        acc[o.status] = (acc[o.status] || 0) + 1;
        return acc;
      }, {})
    };
  }, [orders]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return '#10b981';
      case 'processing': return '#f97316';
      case 'pending': return '#facc15';
      default: return '#94a3b8';
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#1a2332', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1800px', margin: '0 auto' }}>
        
        <h1 style={{ 
          fontSize: '56px', 
          fontWeight: 'bold', 
          color: '#a855f7', 
          marginBottom: '20px', 
          textAlign: 'center',
          textShadow: '0 0 20px rgba(168,85,247,0.5)'
        }}>
          CRM & Analytics Dashboard
        </h1>
        <p style={{ fontSize: '20px', color: '#64748b', textAlign: 'center', marginBottom: '40px' }}>
          Track customers, orders, revenue - Know who orders what from where
        </p>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '40px' }}>
          <div style={{ 
            background: '#0f1923', 
            borderRadius: '20px', 
            padding: '30px',
            border: '1px solid rgba(168,85,247,0.3)'
          }}>
            <div style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '12px', fontWeight: '600' }}>Total Orders</div>
            <div style={{ fontSize: '48px', color: '#a855f7', fontWeight: '700', marginBottom: '8px' }}>
              {stats.totalOrders}
            </div>
            <div style={{ fontSize: '13px', color: '#64748b' }}>All time</div>
          </div>

          <div style={{ 
            background: '#0f1923', 
            borderRadius: '20px', 
            padding: '30px',
            border: '1px solid rgba(16,185,129,0.3)'
          }}>
            <div style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '12px', fontWeight: '600' }}>Total Revenue</div>
            <div style={{ fontSize: '48px', color: '#10b981', fontWeight: '700', marginBottom: '8px' }}>
              ${stats.totalRevenue.toLocaleString()}
            </div>
            <div style={{ fontSize: '13px', color: '#64748b' }}>All time</div>
          </div>

          <div style={{ 
            background: '#0f1923', 
            borderRadius: '20px', 
            padding: '30px',
            border: '1px solid rgba(56,189,248,0.3)'
          }}>
            <div style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '12px', fontWeight: '600' }}>Total Tests</div>
            <div style={{ fontSize: '48px', color: '#38bdf8', fontWeight: '700', marginBottom: '8px' }}>
              {stats.totalTests}
            </div>
            <div style={{ fontSize: '13px', color: '#64748b' }}>All time</div>
          </div>

          <div style={{ 
            background: '#0f1923', 
            borderRadius: '20px', 
            padding: '30px',
            border: '1px solid rgba(249,115,22,0.3)'
          }}>
            <div style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '12px', fontWeight: '600' }}>Avg Order Value</div>
            <div style={{ fontSize: '48px', color: '#f97316', fontWeight: '700', marginBottom: '8px' }}>
              ${stats.avgOrderValue}
            </div>
            <div style={{ fontSize: '13px', color: '#64748b' }}>Per order</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px', marginBottom: '40px' }}>
          
          {/* Orders List */}
          <div style={{ 
            background: '#0f1923', 
            borderRadius: '24px', 
            padding: '40px',
            border: '1px solid rgba(168,85,247,0.3)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ fontSize: '32px', color: '#a855f7', margin: 0, fontWeight: '700' }}>
                Recent Orders
              </h2>
              <div style={{ display: 'flex', gap: '12px' }}>
                {['all', 'pending', 'processing', 'completed'].map(status => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    style={{
                      background: filterStatus === status ? 'rgba(168,85,247,0.2)' : 'rgba(15,25,35,0.6)',
                      color: filterStatus === status ? '#a855f7' : '#94a3b8',
                      border: `1px solid ${filterStatus === status ? 'rgba(168,85,247,0.4)' : 'rgba(100,116,139,0.3)'}`,
                      borderRadius: '8px',
                      padding: '8px 16px',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      textTransform: 'capitalize'
                    }}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="🔍 Search orders by customer, email, location, or order ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  fontSize: '16px',
                  background: 'rgba(15,25,35,0.6)',
                  border: '1px solid rgba(100,116,139,0.3)',
                  borderRadius: '10px',
                  color: 'white',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ display: 'grid', gap: '16px' }}>
              {filteredOrders.map(order => (
                <div
                  key={order.id}
                  style={{
                    background: 'rgba(15,25,35,0.6)',
                    border: '1px solid rgba(100,116,139,0.3)',
                    borderLeft: `4px solid ${getStatusColor(order.status)}`,
                    borderRadius: '12px',
                    padding: '24px',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(4px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div>
                      <div style={{ fontSize: '18px', color: 'white', fontWeight: '700', marginBottom: '6px' }}>
                        {order.customer}
                      </div>
                      <div style={{ fontSize: '14px', color: '#94a3b8' }}>
                        {order.email} • {order.location}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '24px', color: '#a855f7', fontWeight: '700', marginBottom: '4px' }}>
                        ${order.amount}
                      </div>
                      <div style={{ 
                        fontSize: '11px', 
                        color: getStatusColor(order.status),
                        background: `${getStatusColor(order.status)}20`,
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        display: 'inline-block'
                      }}>
                        {order.status}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#64748b' }}>
                    <span>Order ID: {order.id}</span>
                    <span>{order.tests} tests</span>
                    <span>{new Date(order.date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Location & Status Breakdown */}
          <div>
            {/* By Location */}
            <div style={{ 
              background: '#0f1923', 
              borderRadius: '24px', 
              padding: '30px',
              border: '1px solid rgba(168,85,247,0.3)',
              marginBottom: '24px'
            }}>
              <h3 style={{ fontSize: '24px', color: '#a855f7', marginBottom: '24px', fontWeight: '700' }}>
                Orders by Location
              </h3>
              <div style={{ display: 'grid', gap: '16px' }}>
                {Object.entries(stats.byLocation).map(([location, count]) => (
                  <div key={location}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: '#cbd5e1', fontSize: '16px' }}>📍 {location}</span>
                      <span style={{ color: '#a855f7', fontSize: '18px', fontWeight: '700' }}>{count}</span>
                    </div>
                    <div style={{ 
                      height: '8px', 
                      background: 'rgba(100,116,139,0.2)', 
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{ 
                        width: `${(count / stats.totalOrders) * 100}%`, 
                        height: '100%', 
                        background: 'linear-gradient(135deg, #a855f7, #9333ea)',
                        borderRadius: '4px'
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* By Status */}
            <div style={{ 
              background: '#0f1923', 
              borderRadius: '24px', 
              padding: '30px',
              border: '1px solid rgba(168,85,247,0.3)'
            }}>
              <h3 style={{ fontSize: '24px', color: '#a855f7', marginBottom: '24px', fontWeight: '700' }}>
                Orders by Status
              </h3>
              <div style={{ display: 'grid', gap: '16px' }}>
                {Object.entries(stats.byStatus).map(([status, count]) => (
                  <div 
                    key={status}
                    style={{ 
                      padding: '20px', 
                      background: `${getStatusColor(status)}10`, 
                      border: `1px solid ${getStatusColor(status)}40`,
                      borderRadius: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#cbd5e1', fontSize: '16px', textTransform: 'capitalize' }}>
                        {status}
                      </span>
                      <span style={{ color: getStatusColor(status), fontSize: '28px', fontWeight: '700' }}>
                        {count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Export Options */}
        <div style={{ 
          background: 'rgba(56,189,248,0.1)', 
          border: '1px solid rgba(56,189,248,0.3)', 
          borderRadius: '16px', 
          padding: '30px',
          textAlign: 'center'
        }}>
          <p style={{ color: '#94a3b8', fontSize: '16px', marginBottom: '20px' }}>
            Export customer data, sales reports, and analytics
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button style={{
              background: 'rgba(56,189,248,0.2)',
              color: '#38bdf8',
              border: '1px solid rgba(56,189,248,0.4)',
              borderRadius: '10px',
              padding: '14px 30px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
              📊 Export CSV
            </button>
            <button style={{
              background: 'rgba(239,68,68,0.2)',
              color: '#ef4444',
              border: '1px solid rgba(239,68,68,0.4)',
              borderRadius: '10px',
              padding: '14px 30px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
              📄 Export PDF
            </button>
            <button style={{
              background: 'rgba(16,185,129,0.2)',
              color: '#10b981',
              border: '1px solid rgba(16,185,129,0.4)',
              borderRadius: '10px',
              padding: '14px 30px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
              📧 Email Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CRMAnalyticsDashboard;
