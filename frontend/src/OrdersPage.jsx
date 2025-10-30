import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { useLanguage } from './LanguageContext';
import audioSystem from './audioSystem';

const OrdersPage = () => {
  const navigate = useNavigate();
  const { orders, getOrderAnalytics } = useCart();
  const { language } = useLanguage();
  const analytics = getOrderAnalytics();

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '2rem', color: '#fff' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        <h1 style={{ fontSize: '3rem', marginBottom: '2rem', textAlign: 'center', color: '#10b981' }}>
          {language === 'es' ? 'Mis Pedidos' : 'My Orders'}
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '2px solid #10b981', borderRadius: '15px', padding: '2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', color: '#10b981', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {analytics.totalOrders}
            </div>
            <div style={{ color: '#94a3b8' }}>{language === 'es' ? 'Total Pedidos' : 'Total Orders'}</div>
          </div>
          <div style={{ background: 'rgba(6, 182, 212, 0.1)', border: '2px solid #06b6d4', borderRadius: '15px', padding: '2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', color: '#06b6d4', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              ${analytics.totalRevenue.toFixed(2)}
            </div>
            <div style={{ color: '#94a3b8' }}>{language === 'es' ? 'Ingresos Totales' : 'Total Revenue'}</div>
          </div>
          <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '2px solid #f59e0b', borderRadius: '15px', padding: '2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', color: '#f59e0b', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              ${analytics.averageOrderValue.toFixed(2)}
            </div>
            <div style={{ color: '#94a3b8' }}>{language === 'es' ? 'Valor Promedio' : 'Average Order'}</div>
          </div>
        </div>

        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', background: 'rgba(30, 41, 59, 0.6)', borderRadius: '20px' }}>
            <div style={{ fontSize: '6rem', marginBottom: '2rem' }}>📦</div>
            <h2 style={{ fontSize: '2rem', color: '#94a3b8', marginBottom: '2rem' }}>
              {language === 'es' ? 'No tienes pedidos aún' : 'No orders yet'}
            </h2>
            <button
              onClick={() => { audioSystem.playClick(); navigate('/'); }}
              style={{ padding: '1rem 2rem', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem' }}
            >
              {language === 'es' ? 'Explorar Servicios' : 'Explore Services'}
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {[...orders].reverse().map(order => (
              <div key={order.orderId} style={{ background: 'rgba(30, 41, 59, 0.6)', borderRadius: '20px', padding: '2rem', border: '2px solid rgba(16, 185, 129, 0.3)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
                  <div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.3rem' }}>
                      {new Date(order.date).toLocaleDateString()} • {new Date(order.date).toLocaleTimeString()}
                    </div>
                    <h3 style={{ fontSize: '1.8rem', color: '#10b981', marginBottom: '0.5rem' }}>
                      {language === 'es' ? 'Pedido' : 'Order'} #{order.orderNumber}
                    </h3>
                    <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                      {order.receiptNumber} • {order.trackingNumber}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '2rem', color: '#10b981', fontWeight: 'bold' }}>
                      ${order.pricing.total.toFixed(2)}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                      {order.items.length} {language === 'es' ? 'artículos' : 'items'}
                    </div>
                  </div>
                </div>

                <div style={{ background: 'rgba(15, 23, 42, 0.8)', borderRadius: '12px', padding: '1.5rem', marginBottom: '1rem' }}>
                  <h4 style={{ fontSize: '1.1rem', color: '#06b6d4', marginBottom: '1rem' }}>
                    {language === 'es' ? 'Artículos del Pedido' : 'Order Items'}
                  </h4>
                  {order.items.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: idx < order.items.length - 1 ? '1px solid rgba(100, 116, 139, 0.3)' : 'none' }}>
                      <div>
                        <span style={{ color: '#64748b', fontSize: '0.8rem', marginRight: '0.5rem' }}>{item.id}</span>
                        <span style={{ color: '#fff' }}>{item.name}</span>
                      </div>
                      <span style={{ color: '#10b981', fontWeight: 'bold' }}>${item.price}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem' }}>
                  <div style={{ flex: 1, background: 'rgba(15, 23, 42, 0.6)', borderRadius: '8px', padding: '1rem' }}>
                    <div style={{ color: '#64748b', marginBottom: '0.3rem' }}>{language === 'es' ? 'Cliente' : 'Customer'}</div>
                    <div style={{ color: '#fff', fontWeight: 'bold' }}>{order.customer.name}</div>
                    <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{order.customer.email}</div>
                  </div>
                  <div style={{ flex: 1, background: 'rgba(15, 23, 42, 0.6)', borderRadius: '8px', padding: '1rem' }}>
                    <div style={{ color: '#64748b', marginBottom: '0.3rem' }}>{language === 'es' ? 'Pago' : 'Payment'}</div>
                    <div style={{ color: '#fff', fontWeight: 'bold' }}>{order.payment.method.toUpperCase()}</div>
                    <div style={{ color: '#10b981', fontSize: '0.85rem' }}>✓ {order.payment.status}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default OrdersPage;
