import React from 'react';

function FieldConditionsLogger() {
  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '56px', fontWeight: 'bold', color: '#f59e0b', marginBottom: '40px', textAlign: 'center' }}>
        Field Conditions Logger
      </h1>
      <div style={{ background: 'rgba(30,41,59,0.6)', backdropFilter: 'blur(16px)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '24px', padding: '80px', textAlign: 'center' }}>
        <div style={{ fontSize: '80px', marginBottom: '30px' }}>📝</div>
        <p style={{ fontSize: '32px', color: 'white', marginBottom: '20px', fontWeight: '600' }}>Document Field Conditions</p>
        <p style={{ fontSize: '18px', color: '#94a3b8' }}>GPS, Weather, Photos, Notes, Sampling Data</p>
      </div>
    </div>
  );
}

export default FieldConditionsLogger;

