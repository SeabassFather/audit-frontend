import React from 'react';

function LabDashboard() {
  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '56px', fontWeight: 'bold', color: '#3b82f6', marginBottom: '40px', textAlign: 'center' }}>
        Lab Dashboard
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
        <div style={{ background: 'rgba(30,41,59,0.6)', backdropFilter: 'blur(16px)', border: '1px solid rgba(250,204,21,0.3)', borderRadius: '20px', padding: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '56px', fontWeight: 'bold', color: '#facc15', marginBottom: '12px' }}>0</div>
          <div style={{ color: '#cbd5e1', fontSize: '20px', fontWeight: '600' }}>Pending Orders</div>
        </div>
        <div style={{ background: 'rgba(30,41,59,0.6)', backdropFilter: 'blur(16px)', border: '1px solid rgba(249,115,22,0.3)', borderRadius: '20px', padding: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '56px', fontWeight: 'bold', color: '#f97316', marginBottom: '12px' }}>0</div>
          <div style={{ color: '#cbd5e1', fontSize: '20px', fontWeight: '600' }}>Processing</div>
        </div>
        <div style={{ background: 'rgba(30,41,59,0.6)', backdropFilter: 'blur(16px)', border: '1px solid rgba(74,222,128,0.3)', borderRadius: '20px', padding: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '56px', fontWeight: 'bold', color: '#4ade80', marginBottom: '12px' }}>0</div>
          <div style={{ color: '#cbd5e1', fontSize: '20px', fontWeight: '600' }}>Completed</div>
        </div>
      </div>
      <div style={{ background: 'rgba(30,41,59,0.6)', backdropFilter: 'blur(16px)', border: '1px solid rgba(56,189,248,0.3)', borderRadius: '24px', padding: '50px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '36px', color: '#38bdf8', marginBottom: '24px', fontWeight: 'bold' }}>165 Tests Available</h2>
        <p style={{ color: '#cbd5e1', fontSize: '20px' }}>Backend API: http://localhost:8001/api/tests/</p>
      </div>
    </div>
  );
}

export default LabDashboard;

