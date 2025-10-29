import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { useLanguage } from './LanguageContext';
import audioSystem from './audioSystem';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, getTotal, getTax, getGrandTotal, createOrder } = useCart();
  const { language } = useLanguage();
  const [step, setStep] = useState(1); // 1: Review, 2: Info, 3: Payment, 4: Confirmation
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });
  const [paymentInfo, setPaymentInfo] = useState({
    method: 'card',
    cardNumber: '',
    expiry: '',
    cvv: '',
    nameOnCard: ''
  });
  const [order, setOrder] = useState(null);
  const [errors, setErrors] = useState({});

  if (cart.length === 0 && !order) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '4rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', background: 'rgba(30, 41, 59, 0.6)', backdropFilter: 'blur(20px)', borderRadius: '25px', padding: '4rem', border: '3px solid rgba(100, 116, 139, 0.3)' }}>
          <div style={{ fontSize: '6rem', marginBottom: '2rem' }}>🛒</div>
          <h2 style={{ fontSize: '2.5rem', color: '#94a3b8', marginBottom: '2rem' }}>
            {language === 'es' ? 'Tu carrito está vacío' : 'Your cart is empty'}
          </h2>
          <button
            onClick={() => navigate('/')}
            style={{ padding: '1rem 3rem', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem' }}
          >
            {language === 'es' ? '← Volver al Inicio' : '← Back to Home'}
          </button>
        </div>
      </div>
    );
  }

  const validateStep2 = () => {
    const newErrors = {};
    if (!customerInfo.name) newErrors.name = 'Required';
    if (!customerInfo.email) newErrors.email = 'Required';
    if (!/\S+@\S+\.\S+/.test(customerInfo.email)) newErrors.email = 'Invalid email';
    if (!customerInfo.phone) newErrors.phone = 'Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    if (!paymentInfo.nameOnCard) newErrors.nameOnCard = 'Required';
    if (!paymentInfo.cardNumber) newErrors.cardNumber = 'Required';
    if (paymentInfo.cardNumber.replace(/\s/g, '').length !== 16) newErrors.cardNumber = 'Invalid';
    if (!paymentInfo.expiry) newErrors.expiry = 'Required';
    if (!paymentInfo.cvv || paymentInfo.cvv.length !== 3) newErrors.cvv = 'Invalid';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitPayment = () => {
    if (!validateStep3()) return;
    audioSystem.playClick();
    
    const newOrder = createOrder(customerInfo, paymentInfo);
    setOrder(newOrder);
    setStep(4);
    audioSystem.playSuccess();
  };

  const subtotal = getTotal();
  const tax = getTax();
  const total = getGrandTotal();

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '2rem', color: '#fff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* PROGRESS BAR */}
        {step < 4 && (
          <div style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              {[1, 2, 3].map(s => (
                <div key={s} style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ 
                    width: '50px', 
                    height: '50px', 
                    borderRadius: '50%', 
                    background: s <= step ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'rgba(100, 116, 139, 0.3)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: '0 auto',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    border: s === step ? '3px solid #10b981' : 'none'
                  }}>
                    {s}
                  </div>
                  <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: s <= step ? '#10b981' : '#64748b' }}>
                    {s === 1 && (language === 'es' ? 'Revisar' : 'Review')}
                    {s === 2 && (language === 'es' ? 'Información' : 'Information')}
                    {s === 3 && (language === 'es' ? 'Pago' : 'Payment')}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ height: '4px', background: 'rgba(100, 116, 139, 0.3)', borderRadius: '2px', position: 'relative' }}>
              <div style={{ height: '100%', width: `${(step - 1) * 50}%`, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', borderRadius: '2px', transition: 'width 0.3s ease' }} />
            </div>
          </div>
        )}

        {/* STEP 1: REVIEW CART */}
        {step === 1 && (
          <div>
            <h1 style={{ fontSize: '3rem', marginBottom: '2rem', textAlign: 'center', color: '#10b981' }}>
              {language === 'es' ? '🛒 Revisar Pedido' : '🛒 Review Order'}
            </h1>
            
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
              <div style={{ background: 'rgba(30, 41, 59, 0.6)', borderRadius: '20px', padding: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#06b6d4' }}>
                  {language === 'es' ? 'Artículos en el Carrito' : 'Cart Items'} ({cart.length})
                </h2>
                {cart.map((item, idx) => (
                  <div key={item.cartId} style={{ 
                    background: 'rgba(15, 23, 42, 0.8)', 
                    borderRadius: '12px', 
                    padding: '1.5rem', 
                    marginBottom: '1rem',
                    border: '2px solid rgba(16, 185, 129, 0.3)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.3rem' }}>{item.id}</div>
                        <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '0.5rem', fontWeight: 'bold' }}>{item.name}</h3>
                        <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                          {item.days && `⏱️ ${item.days}d`}
                          {item.unit && ` • ${item.unit}`}
                        </div>
                      </div>
                      <div style={{ fontSize: '1.5rem', color: '#10b981', fontWeight: 'bold' }}>
                        ${item.price}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <div style={{ background: 'rgba(30, 41, 59, 0.6)', borderRadius: '20px', padding: '2rem', position: 'sticky', top: '2rem' }}>
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
                    onClick={() => { audioSystem.playClick(); setStep(2); }}
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
                      marginBottom: '1rem'
                    }}
                  >
                    {language === 'es' ? 'Continuar →' : 'Continue →'}
                  </button>

                  <button
                    onClick={() => navigate('/')}
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
                    {language === 'es' ? '← Seguir Comprando' : '← Continue Shopping'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: CUSTOMER INFO */}
        {step === 2 && (
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '2rem', textAlign: 'center', color: '#10b981' }}>
              {language === 'es' ? '📋 Tu Información' : '📋 Your Information'}
            </h1>
            
            <div style={{ background: 'rgba(30, 41, 59, 0.6)', borderRadius: '20px', padding: '3rem' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>
                  {language === 'es' ? 'Nombre Completo *' : 'Full Name *'}
                </label>
                <input
                  type="text"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: errors.name ? '2px solid #ef4444' : '2px solid #334155',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '1rem'
                  }}
                />
                {errors.name && <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.3rem' }}>{errors.name}</div>}
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>
                  {language === 'es' ? 'Email *' : 'Email *'}
                </label>
                <input
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: errors.email ? '2px solid #ef4444' : '2px solid #334155',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '1rem'
                  }}
                />
                {errors.email && <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.3rem' }}>{errors.email}</div>}
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>
                  {language === 'es' ? 'Empresa' : 'Company'}
                </label>
                <input
                  type="text"
                  value={customerInfo.company}
                  onChange={(e) => setCustomerInfo({...customerInfo, company: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '2px solid #334155',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>
                  {language === 'es' ? 'Teléfono *' : 'Phone *'}
                </label>
                <input
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: errors.phone ? '2px solid #ef4444' : '2px solid #334155',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '1rem'
                  }}
                />
                {errors.phone && <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.3rem' }}>{errors.phone}</div>}
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>
                  {language === 'es' ? 'Dirección' : 'Address'}
                </label>
                <input
                  type="text"
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '2px solid #334155',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>
                    {language === 'es' ? 'Ciudad' : 'City'}
                  </label>
                  <input
                    type="text"
                    value={customerInfo.city}
                    onChange={(e) => setCustomerInfo({...customerInfo, city: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '2px solid #334155',
                      borderRadius: '10px',
                      color: '#fff',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>
                    {language === 'es' ? 'Estado' : 'State'}
                  </label>
                  <input
                    type="text"
                    value={customerInfo.state}
                    onChange={(e) => setCustomerInfo({...customerInfo, state: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '2px solid #334155',
                      borderRadius: '10px',
                      color: '#fff',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>ZIP</label>
                  <input
                    type="text"
                    value={customerInfo.zip}
                    onChange={(e) => setCustomerInfo({...customerInfo, zip: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '2px solid #334155',
                      borderRadius: '10px',
                      color: '#fff',
                      fontSize: '1rem'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={() => { audioSystem.playClick(); setStep(1); }}
                  style={{
                    flex: 1,
                    padding: '1rem',
                    background: 'rgba(100, 116, 139, 0.3)',
                    border: '2px solid #64748b',
                    borderRadius: '12px',
                    color: '#fff',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  ← {language === 'es' ? 'Atrás' : 'Back'}
                </button>
                <button
                  onClick={() => { 
                    if (validateStep2()) {
                      audioSystem.playClick(); 
                      setStep(3);
                    }
                  }}
                  style={{
                    flex: 1,
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
                  {language === 'es' ? 'Continuar →' : 'Continue →'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: PAYMENT */}
        {step === 3 && (
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '2rem', textAlign: 'center', color: '#10b981' }}>
              {language === 'es' ? '💳 Información de Pago' : '💳 Payment Information'}
            </h1>
            
            <div style={{ background: 'rgba(30, 41, 59, 0.6)', borderRadius: '20px', padding: '3rem', marginBottom: '2rem' }}>
              
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>
                  {language === 'es' ? 'Método de Pago' : 'Payment Method'}
                </label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    onClick={() => setPaymentInfo({...paymentInfo, method: 'card'})}
                    style={{
                      flex: 1,
                      padding: '1rem',
                      background: paymentInfo.method === 'card' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'rgba(100, 116, 139, 0.3)',
                      border: '2px solid ' + (paymentInfo.method === 'card' ? '#10b981' : '#64748b'),
                      borderRadius: '12px',
                      color: '#fff',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    💳 {language === 'es' ? 'Tarjeta' : 'Card'}
                  </button>
                  <button
                    onClick={() => setPaymentInfo({...paymentInfo, method: 'paypal'})}
                    style={{
                      flex: 1,
                      padding: '1rem',
                      background: paymentInfo.method === 'paypal' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'rgba(100, 116, 139, 0.3)',
                      border: '2px solid ' + (paymentInfo.method === 'paypal' ? '#10b981' : '#64748b'),
                      borderRadius: '12px',
                      color: '#fff',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    PayPal
                  </button>
                </div>
              </div>

              {paymentInfo.method === 'card' && (
                <>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>
                      {language === 'es' ? 'Nombre en la Tarjeta *' : 'Name on Card *'}
                    </label>
                    <input
                      type="text"
                      value={paymentInfo.nameOnCard}
                      onChange={(e) => setPaymentInfo({...paymentInfo, nameOnCard: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '1rem',
                        background: 'rgba(15, 23, 42, 0.8)',
                        border: errors.nameOnCard ? '2px solid #ef4444' : '2px solid #334155',
                        borderRadius: '10px',
                        color: '#fff',
                        fontSize: '1rem'
                      }}
                    />
                    {errors.nameOnCard && <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.3rem' }}>{errors.nameOnCard}</div>}
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>
                      {language === 'es' ? 'Número de Tarjeta *' : 'Card Number *'}
                    </label>
                    <input
                      type="text"
                      maxLength="19"
                      placeholder="1234 5678 9012 3456"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
                        setPaymentInfo({...paymentInfo, cardNumber: val});
                      }}
                      style={{
                        width: '100%',
                        padding: '1rem',
                        background: 'rgba(15, 23, 42, 0.8)',
                        border: errors.cardNumber ? '2px solid #ef4444' : '2px solid #334155',
                        borderRadius: '10px',
                        color: '#fff',
                        fontSize: '1rem'
                      }}
                    />
                    {errors.cardNumber && <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.3rem' }}>{errors.cardNumber}</div>}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>
                        {language === 'es' ? 'Vencimiento *' : 'Expiry *'}
                      </label>
                      <input
                        type="text"
                        maxLength="5"
                        placeholder="MM/YY"
                        value={paymentInfo.expiry}
                        onChange={(e) => {
                          let val = e.target.value.replace(/\D/g, '');
                          if (val.length >= 2) val = val.slice(0, 2) + '/' + val.slice(2, 4);
                          setPaymentInfo({...paymentInfo, expiry: val});
                        }}
                        style={{
                          width: '100%',
                          padding: '1rem',
                          background: 'rgba(15, 23, 42, 0.8)',
                          border: errors.expiry ? '2px solid #ef4444' : '2px solid #334155',
                          borderRadius: '10px',
                          color: '#fff',
                          fontSize: '1rem'
                        }}
                      />
                      {errors.expiry && <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.3rem' }}>{errors.expiry}</div>}
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>CVV *</label>
                      <input
                        type="text"
                        maxLength="3"
                        placeholder="123"
                        value={paymentInfo.cvv}
                        onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value.replace(/\D/g, '')})}
                        style={{
                          width: '100%',
                          padding: '1rem',
                          background: 'rgba(15, 23, 42, 0.8)',
                          border: errors.cvv ? '2px solid #ef4444' : '2px solid #334155',
                          borderRadius: '10px',
                          color: '#fff',
                          fontSize: '1rem'
                        }}
                      />
                      {errors.cvv && <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.3rem' }}>{errors.cvv}</div>}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div style={{ background: 'rgba(30, 41, 59, 0.6)', borderRadius: '20px', padding: '2rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#06b6d4' }}>
                {language === 'es' ? 'Resumen Final' : 'Final Summary'}
              </h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#94a3b8' }}>{language === 'es' ? 'Subtotal' : 'Subtotal'}:</span>
                <span style={{ color: '#fff' }}>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#94a3b8' }}>{language === 'es' ? 'Impuesto (8%)' : 'Tax (8%)'}:</span>
                <span style={{ color: '#fff' }}>${tax.toFixed(2)}</span>
              </div>
              <div style={{ borderTop: '2px solid rgba(100, 116, 139, 0.3)', paddingTop: '1rem', marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>{language === 'es' ? 'Total' : 'Total'}:</span>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>${total.toFixed(2)}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => { audioSystem.playClick(); setStep(2); }}
                style={{
                  flex: 1,
                  padding: '1rem',
                  background: 'rgba(100, 116, 139, 0.3)',
                  border: '2px solid #64748b',
                  borderRadius: '12px',
                  color: '#fff',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                ← {language === 'es' ? 'Atrás' : 'Back'}
              </button>
              <button
                onClick={handleSubmitPayment}
                style={{
                  flex: 2,
                  padding: '1.2rem',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#fff',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '1.2rem'
                }}
              >
                🔒 {language === 'es' ? `Pagar $${total.toFixed(2)}` : `Pay $${total.toFixed(2)}`}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: CONFIRMATION */}
        {step === 4 && order && (
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontSize: '8rem', marginBottom: '2rem' }}>✅</div>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', color: '#10b981' }}>
              {language === 'es' ? '¡Pedido Confirmado!' : 'Order Confirmed!'}
            </h1>
            <p style={{ fontSize: '1.3rem', color: '#94a3b8', marginBottom: '3rem' }}>
              {language === 'es' 
                ? 'Gracias por tu pedido. Te hemos enviado un email de confirmación.' 
                : 'Thank you for your order. We have sent you a confirmation email.'}
            </p>

            <div style={{ background: 'rgba(30, 41, 59, 0.6)', borderRadius: '20px', padding: '3rem', marginBottom: '2rem', textAlign: 'left' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                <div>
                  <div style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '0.5rem' }}>
                    {language === 'es' ? 'Número de Pedido' : 'Order Number'}
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>
                    #{order.orderNumber}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '0.5rem' }}>
                    {language === 'es' ? 'Número de Recibo' : 'Receipt Number'}
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#06b6d4' }}>
                    {order.receiptNumber}
                  </div>
                </div>
              </div>

              <div style={{ background: 'rgba(15, 23, 42, 0.8)', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '0.5rem' }}>
                  {language === 'es' ? 'ID de Pedido' : 'Order ID'}
                </div>
                <div style={{ fontSize: '1rem', fontFamily: 'monospace', color: '#fff' }}>
                  {order.orderId}
                </div>
              </div>

              <div style={{ background: 'rgba(15, 23, 42, 0.8)', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '0.5rem' }}>
                  {language === 'es' ? 'Número de Seguimiento' : 'Tracking Number'}
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#10b981' }}>
                  {order.trackingNumber}
                </div>
              </div>

              <div style={{ borderTop: '2px solid rgba(100, 116, 139, 0.3)', paddingTop: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#94a3b8' }}>{language === 'es' ? 'Total Pagado' : 'Total Paid'}:</span>
                  <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>
                    ${order.pricing.total.toFixed(2)}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#64748b' }}>
                  <span>{language === 'es' ? 'Fecha' : 'Date'}:</span>
                  <span>{new Date(order.date).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={() => navigate('/')}
                style={{
                  padding: '1rem 2rem',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#fff',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '1.1rem'
                }}
              >
                {language === 'es' ? '← Volver al Inicio' : '← Back to Home'}
              </button>
              <button
                onClick={() => navigate('/orders')}
                style={{
                  padding: '1rem 2rem',
                  background: 'rgba(100, 116, 139, 0.3)',
                  border: '2px solid #06b6d4',
                  borderRadius: '12px',
                  color: '#fff',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '1.1rem'
                }}
              >
                {language === 'es' ? 'Ver Mis Pedidos' : 'View My Orders'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CheckoutPage;
