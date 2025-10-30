import React, { useState } from 'react';

export default function BillingComponent({ 
  contactInfo, 
  uploadedFiles = [], 
  moduleType = 'general',
  onPaymentComplete 
}) {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [processing, setProcessing] = useState(false);

  // Pricing structure
  const pricing = {
    water: { base: 125, perFile: 25 },
    soil: { base: 85, perFile: 20 },
    engine: { base: 150, perFile: 30 },
    fuelOil: { base: 175, perFile: 35 },
    alcohol: { base: 185, perFile: 40 },
    environmental: { base: 95, perFile: 25 },
    general: { base: 100, perFile: 25 }
  };

  const modulePrice = pricing[moduleType] || pricing.general;
  const basePrice = modulePrice.base;
  const filePrice = uploadedFiles.length * modulePrice.perFile;
  const subtotal = basePrice + filePrice;
  const processingFee = subtotal * 0.03; // 3% processing fee
  const total = subtotal + processingFee;

  const handlePayment = async () => {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const paymentData = {
        contactInfo,
        moduleType,
        filesUploaded: uploadedFiles.length,
        pricing: {
          basePrice,
          filePrice,
          subtotal,
          processingFee,
          total
        },
        paymentMethod,
        transactionId: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        timestamp: new Date().toISOString(),
        status: 'PAID'
      };

      setProcessing(false);
      
      if (onPaymentComplete) {
        onPaymentComplete(paymentData);
      }
    }, 2000);
  };

  return (
    <div style={{
      background: '#1e293b',
      padding: '30px',
      borderRadius: '16px',
      border: '2px solid #334155',
      marginBottom: '30px'
    }}>
      <h3 style={{color: '#10b981', marginBottom: '20px', fontSize: '1.5rem'}}>
        💳 Billing & Payment
      </h3>

      <div style={{
        background: '#0f172a',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '25px'
      }}>
        <h4 style={{color: '#94a3b8', marginBottom: '15px'}}>Order Summary</h4>
        
        <div style={{display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #334155'}}>
          <span style={{color: '#94a3b8'}}>Base Analysis Fee ({moduleType})</span>
          <span style={{color: 'white', fontWeight: '600'}}>${basePrice.toFixed(2)}</span>
        </div>

        <div style={{display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #334155'}}>
          <span style={{color: '#94a3b8'}}>File Processing ({uploadedFiles.length} files × ${modulePrice.perFile})</span>
          <span style={{color: 'white', fontWeight: '600'}}>${filePrice.toFixed(2)}</span>
        </div>

        <div style={{display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #334155'}}>
          <span style={{color: '#94a3b8'}}>Subtotal</span>
          <span style={{color: 'white', fontWeight: '600'}}>${subtotal.toFixed(2)}</span>
        </div>

        <div style={{display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #334155'}}>
          <span style={{color: '#94a3b8'}}>Processing Fee (3%)</span>
          <span style={{color: 'white', fontWeight: '600'}}>${processingFee.toFixed(2)}</span>
        </div>

        <div style={{display: 'flex', justifyContent: 'space-between', padding: '15px 0', marginTop: '10px'}}>
          <span style={{color: '#10b981', fontSize: '1.3rem', fontWeight: '800'}}>Total</span>
          <span style={{color: '#10b981', fontSize: '1.8rem', fontWeight: '900'}}>${total.toFixed(2)}</span>
        </div>
      </div>

      <div style={{marginBottom: '25px'}}>
        <h4 style={{color: '#94a3b8', marginBottom: '15px'}}>Select Payment Method</h4>
        
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px'}}>
          <div
            onClick={() => setPaymentMethod('card')}
            style={{
              padding: '20px',
              background: paymentMethod === 'card' ? '#06b6d4' : '#0f172a',
              border: `2px solid ${paymentMethod === 'card' ? '#06b6d4' : '#334155'}`,
              borderRadius: '12px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            <div style={{fontSize: '2rem', marginBottom: '10px'}}>💳</div>
            <div style={{color: 'white', fontWeight: '600'}}>Credit/Debit</div>
          </div>

          <div
            onClick={() => setPaymentMethod('paypal')}
            style={{
              padding: '20px',
              background: paymentMethod === 'paypal' ? '#06b6d4' : '#0f172a',
              border: `2px solid ${paymentMethod === 'paypal' ? '#06b6d4' : '#334155'}`,
              borderRadius: '12px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            <div style={{fontSize: '2rem', marginBottom: '10px'}}>🅿️</div>
            <div style={{color: 'white', fontWeight: '600'}}>PayPal</div>
          </div>

          <div
            onClick={() => setPaymentMethod('ach')}
            style={{
              padding: '20px',
              background: paymentMethod === 'ach' ? '#06b6d4' : '#0f172a',
              border: `2px solid ${paymentMethod === 'ach' ? '#06b6d4' : '#334155'}`,
              borderRadius: '12px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            <div style={{fontSize: '2rem', marginBottom: '10px'}}>🏦</div>
            <div style={{color: 'white', fontWeight: '600'}}>Bank ACH</div>
          </div>
        </div>
      </div>

      <div style={{
        background: 'rgba(14, 165, 233, 0.1)',
        border: '2px solid #0ea5e9',
        borderRadius: '12px',
        padding: '15px',
        marginBottom: '25px'
      }}>
        <p style={{color: '#0ea5e9', fontSize: '0.95rem', lineHeight: '1.6'}}>
          💡 <strong>Billing Policy:</strong> You will only be charged after your files are successfully uploaded and processed. If you cancel or lose connection during upload, no charge will be made. A receipt will be emailed to {contactInfo?.email || 'your email address'} immediately after payment.
        </p>
      </div>

      <button
        onClick={handlePayment}
        disabled={processing || !paymentMethod}
        style={{
          width: '100%',
          padding: '18px',
          background: processing || !paymentMethod ? '#334155' : 'linear-gradient(135deg, #10b981, #059669)',
          border: 'none',
          borderRadius: '12px',
          color: 'white',
          fontSize: '1.2rem',
          fontWeight: '800',
          cursor: processing || !paymentMethod ? 'not-allowed' : 'pointer',
          opacity: processing || !paymentMethod ? 0.5 : 1
        }}
      >
        {processing ? '⏳ Processing Payment...' : `💳 Pay $${total.toFixed(2)} Now`}
      </button>

      <p style={{color: '#64748b', fontSize: '0.85rem', textAlign: 'center', marginTop: '15px'}}>
        🔒 Secure payment processing. Your data is encrypted and never stored on our servers.
      </p>
    </div>
  );
}