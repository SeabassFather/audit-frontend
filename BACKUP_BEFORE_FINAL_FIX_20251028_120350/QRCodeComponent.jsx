import React from 'react';

function QRCodeComponent() {
  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '56px', fontWeight: 'bold', color: '#10b981', marginBottom: '40px', textAlign: 'center' }}>
        QR Code Generator
      </h1>
      <div style={{ background: 'rgba(30,41,59,0.6)', backdropFilter: 'blur(16px)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '24px', padding: '80px', textAlign: 'center' }}>
        <div style={{ fontSize: '80px', marginBottom: '30px' }}>📱</div>
        <p style={{ fontSize: '32px', color: 'white', marginBottom: '20px', fontWeight: '600' }}>Generate Sample QR Codes</p>
        <p style={{ fontSize: '18px', color: '#94a3b8' }}>Unique IDs, Mobile Scanning, Traceability</p>
      </div>
    </div>
  );
}

export default QRCodeComponent;
