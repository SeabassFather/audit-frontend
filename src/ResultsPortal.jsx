import React, { useState } from 'react';
import { useCart } from './CartContext';
import { useLanguage } from './LanguageContext';
import audioSystem from './audioSystem';

const ResultsPortal = () => {
  const { orders } = useCart();
  const { language } = useLanguage();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = orders.filter(o => 
    !searchQuery || 
    o.orderNumber.toString().includes(searchQuery) ||
    o.receiptNumber.includes(searchQuery) ||
    o.customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '2rem', color: '#fff' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        <h1 style={{ fontSize: '3.5rem', textAlign: 'center', color: '#ec4899', marginBottom: '3rem' }}>
          📊 Results Portal
        </h1>

        <input
          type="text"
          placeholder={language === 'es' ? 'Buscar por número de orden, recibo o nombre...' : 'Search by order number, receipt, or name...'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '100%', maxWidth: '600px', padding: '1rem', background: 'rgba(30, 41, 59, 0.6)', border: '2px solid #334155', borderRadius: '12px', color: '#fff', fontSize: '1rem', margin: '0 auto 3rem', display: 'block' }}
        />

        {filteredOrders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', background: 'rgba(30, 41, 59, 0.6)', borderRadius: '25px' }}>
            <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>📋</div>
            <h2 style={{ fontSize: '2rem', color: '#94a3b8', marginBottom: '1rem' }}>
              {language === 'es' ? 'No hay resultados disponibles' : 'No results available'}
            </h2>
            <p style={{ color: '#64748b' }}>
              {language === 'es' ? 'Los resultados aparecerán aquí cuando los análisis estén completos' : 'Results will appear here when analyses are complete'}
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {filteredOrders.map(order => (
              <div key={order.orderId} style={{ background: 'rgba(30, 41, 59, 0.6)', border: '2px solid #10b981', borderRadius: '20px', padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '0.5rem' }}>
                      {language === 'es' ? 'Orden' : 'Order'} #{order.orderNumber}
                    </h3>
                    <p style={{ color: '#94a3b8' }}>{order.receiptNumber}</p>
                    <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <div style={{ padding: '0.5rem 1rem', background: '#10b981', borderRadius: '20px', fontWeight: 'bold' }}>
                    ✅ {language === 'es' ? 'Completo' : 'Complete'}
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ color: '#10b981', marginBottom: '1rem' }}>
                    {language === 'es' ? 'Análisis Solicitados:' : 'Requested Analyses:'}
                  </h4>
                  {order.items.map((item, idx) => (
                    <div key={idx} style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1rem', borderRadius: '10px', marginBottom: '0.5rem' }}>
                      <div style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '0.3rem' }}>{item.name}</div>
                      <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>{item.id}</div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    onClick={() => audioSystem.playClick()}
                    style={{ flex: 1, padding: '1rem', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    📄 {language === 'es' ? 'Ver Resultados' : 'View Results'}
                  </button>
                  <button
                    onClick={() => audioSystem.playClick()}
                    style={{ flex: 1, padding: '1rem', background: 'rgba(100, 116, 139, 0.3)', border: '2px solid #06b6d4', borderRadius: '12px', color: '#06b6d4', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    📥 {language === 'es' ? 'Descargar PDF' : 'Download PDF'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default ResultsPortal;
