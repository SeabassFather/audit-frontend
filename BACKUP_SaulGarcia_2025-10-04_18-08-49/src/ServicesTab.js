import React from 'react';

export default function ServicesTab({ selectedService }) {
  const s = {
    card: { background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)', borderRadius: '16px', padding: '24px', marginBottom: '20px', border: '2px solid #e3f2fd', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', color: '#2d3748' },
    input: { width: '100%', padding: '14px 18px', background: 'linear-gradient(135deg, #fff 0%, #fafafa 100%)', border: '2px solid #bbdefb', borderRadius: '10px', color: '#2d3748', fontSize: '15px', fontWeight: '500', outline: 'none' },
    btn: { padding: '14px 32px', background: 'linear-gradient(135deg, #66bb6a 0%, #4caf50 100%)', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 12px rgba(76,175,80,0.3)' },
    h: { fontSize: '26px', fontWeight: '700', color: '#1a365d', marginBottom: '24px' },
    label: { display: 'block', marginBottom: '10px', color: '#2d3748', fontSize: '15px', fontWeight: '600' }
  };

  if (!selectedService) return null;

  return (
    <div style={s.card}>
      <h2 style={s.h}>Request Service: {selectedService}</h2>
      <label style={s.label}>Name</label>
      <input type="text" placeholder="Your name" style={s.input} />
      <label style={{ ...s.label, marginTop: '16px' }}>Email</label>
      <input type="email" placeholder="your@email.com" style={s.input} />
      <label style={{ ...s.label, marginTop: '16px' }}>Message</label>
      <textarea placeholder="Describe your needs..." style={{ ...s.input, minHeight: '120px' }} />
      <button style={{ ...s.btn, marginTop: '16px' }}>Submit Request</button>
    </div>
  );
}


