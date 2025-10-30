import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { useLanguage } from './LanguageContext';
import audioSystem from './audioSystem';

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, getTotal, getTax, getGrandTotal } = useCart();
  const { language } = useLanguage();

  const subtotal = getTotal();
  const tax = getTax();
  const total = getGrandTotal();

  if (cart.length === 0) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '4rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', background: 'rgba(30, 41, 59, 0.6)', backdropFilter: 'blur(20px)', borderRadius: '25px', padding: '4rem', border: '3px solid rgba(100, 116, 139, 0.3)', maxWidth: '600px' }}>
          <div style={{ fontSize: '8rem', marginBottom: '2rem' }}>🛒</div>
          <h2 style={{ fontSize: '2.5rem', color: '#94a3b8', marginBottom: '2rem' }}>
            {language === 'es' ? 'Tu carrito está vacío' : 'Your cart is empty'}
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '3rem' }}>
            {language === 'es' 
              ? 'Explora nuestros módulos de prueba y añade servicios a tu carrito.'
              : 'Explore our testing modules and add services to your cart.'}
          </p>
          <button
            onClick={() => { audioSystem.playClick(); navigate('/'); }}
            style={{ padding: '1.2rem 3rem', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.2rem' }}
          >
            {language === 'es' ? 'Volver al Inicio' : 'Back to Home'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '2rem', color: '#fff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <h1 style={{ fontSize: '3rem', marginBottom: '2rem', textAlign: 'center', color: '#10b981' }}>
          {language === 'es' ? 'Tu Carrito' : 'Your Cart'}
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          
          <div>
            <div style={{ background: 'rgba(30, 41, 59, 0.6)', borderRadius: '20px', padding: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#06b6d4' }}>
                {language === 'es' ? 'Artículos' : 'Items'} ({cart.length})
              </h2>
              
              {cart.map((item) => (
                <div key={item.cartId} style={{ 
                  background: 'rgba(15, 23, 42, 0.8)', 
                  borderRadius: '12px', 
                  padding: '1.5rem', 
                  marginBottom: '1rem',
                  border: '2px solid rgba(16, 185, 129, 0.3)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.3rem' }}>{item.id}</div>
                    <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '0.5rem', fontWeight: 'bold' }}>{item.name}</h3>
                    <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                      {item.days && `${item.days}d`}
                      {item.unit && ` • ${item.unit}`}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <div style={{ fontSize: '1.5rem', color: '#10b981', fontWeight: 'bold' }}>
                      ${item.price}
                    </div>
                    <button
                      onClick={() => { audioSystem.playClick(); removeFromCart(item.cartId); }}
                      style={{
                        padding: '0.5rem 1rem',
                        background: 'rgba(239, 68, 68, 0.2)',
                        border: '2px solid #ef4444',
                        borderRadius: '8px',
                        color: '#ef4444',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}
                    >
                      {language === 'es' ? 'Eliminar' : 'Remove'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ background: 'rgba(30, 41, 59, 0.6)', borderRadius: '20px', padding: '2rem', position: 'sticky', top: '6rem' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#06b6d4' }}>
                {language === 'es' ? 'Resumen del Pedido' : 'Order Summary'}
              </h2>
              
              <div style={{ borderBottom: '1px solid rgba(100, 116, 139, 0.3)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#94a3b8' }}>{language === 'es' ? 'Subtotal' : 'Subtotal'}:</span>
                  <span style={{ color: '#fff', fontWeight: 'bold' }}>${subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#94a3b8' }}>{language === 'es' ? 'Impuesto (8%)' : 'Tax (8%)'}:</span>
                  <span style={{ color: '#fff', fontWeight: 'bold' }}>${tax.toFixed(2)}</span>
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <span style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#fff' }}>{language === 'es' ? 'Total' : 'Total'}:</span>
                <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#10b981' }}>${total.toFixed(2)}</span>
              </div>

              <button
                onClick={() => { audioSystem.playClick(); navigate('/checkout'); }}
                style={{
                  width: '100%',
                  padding: '1.2rem',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#fff',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  marginBottom: '1rem',
                  boxShadow: '0 10px 30px rgba(16, 185, 129, 0.4)'
                }}
              >
                {language === 'es' ? 'Proceder al Pago' : 'Proceed to Checkout'}
              </button>

              <button
                onClick={() => { audioSystem.playClick(); navigate('/'); }}
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: 'rgba(100, 116, 139, 0.3)',
                  border: '2px solid #64748b',
                  borderRadius: '12px',
                  color: '#fff',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                {language === 'es' ? 'Seguir Comprando' : 'Continue Shopping'}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CartPage;
