import React from 'react';

function TraceabilityTracker() {
  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '56px', fontWeight: 'bold', color: '#10b981', marginBottom: '40px', textAlign: 'center' }}>
        Traceability & Chain of Custody
      </h1>
      <div style={{ background: 'rgba(30,41,59,0.6)', backdropFilter: 'blur(16px)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '24px', padding: '80px', textAlign: 'center' }}>
        <div style={{ fontSize: '80px', marginBottom: '30px' }}>📍</div>
        <p style={{ fontSize: '32px', color: 'white', marginBottom: '20px', fontWeight: '600' }}>Full Sample Tracking</p>
        <p style={{ fontSize: '18px', color: '#94a3b8', marginBottom: '20px' }}>QR Codes, GPS Logging, Chain of Custody, ISO-17025 Compliance</p>
        <p style={{ fontSize: '16px', color: '#64748b' }}>Track samples from field to final report</p>
      </div>
    </div>
  );
}

export default TraceabilityTracker;
