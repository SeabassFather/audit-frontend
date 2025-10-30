import React, { useState } from 'react';

function QRCodeGenerator() {
  const [sampleId, setSampleId] = useState('');
  const [qrData, setQrData] = useState(null);

  const generateQR = () => {
    const timestamp = new Date().toISOString();
    const data = {
      sampleId: sampleId || `SAMPLE-${Date.now()}`,
      timestamp,
      lab: 'AuditDNA Supreme',
      location: 'Lab Facility'
    };
    setQrData(data);
  };

  const downloadQR = () => {
    // In production, use a real QR code library like qrcode.react
    alert('QR Code download feature - integrate with qrcode.react library');
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ 
        fontSize: '56px', 
        fontWeight: 'bold', 
        background: 'linear-gradient(135deg, #10b981, #059669)', 
        WebkitBackgroundClip: 'text', 
        WebkitTextFillColor: 'transparent', 
        marginBottom: '40px', 
        textAlign: 'center'
      }}>
        QR Code Generator
      </h1>

      <div style={{ 
        background: 'rgba(30,41,59,0.6)', 
        backdropFilter: 'blur(16px)', 
        border: '1px solid rgba(16,185,129,0.3)', 
        borderRadius: '24px', 
        padding: '60px'
      }}>
        <div style={{ fontSize: '80px', textAlign: 'center', marginBottom: '30px' }}></div>

        <div style={{ marginBottom: '30px' }}>
          <label style={{ color: '#cbd5e1', fontSize: '16px', marginBottom: '12px', display: 'block', fontWeight: '600' }}>
            Sample ID (optional - will auto-generate if blank)
          </label>
          <input
            type="text"
            value={sampleId}
            onChange={(e) => setSampleId(e.target.value)}
            placeholder="Enter sample ID or leave blank..."
            style={{
              width: '100%',
              padding: '16px 20px',
              fontSize: '16px',
              background: 'rgba(15,23,42,0.6)',
              border: '2px solid rgba(16,185,129,0.4)',
              borderRadius: '12px',
              color: 'white',
              outline: 'none'
            }}
          />
        </div>

        <button
          onClick={generateQR}
          style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '18px 40px',
            fontSize: '18px',
            fontWeight: '700',
            cursor: 'pointer',
            width: '100%',
            marginBottom: '30px',
            boxShadow: '0 8px 25px rgba(16,185,129,0.4)',
            transition: 'all 0.3s'
          }}
        >
          Generate QR Code
        </button>

        {qrData && (
          <div style={{ 
            background: 'rgba(16,185,129,0.1)', 
            border: '2px solid rgba(16,185,129,0.4)', 
            borderRadius: '16px', 
            padding: '40px',
            textAlign: 'center'
          }}>
            <div style={{ 
              background: 'white', 
              width: '300px', 
              height: '300px', 
              margin: '0 auto 30px',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '80px'
            }}>
              
            </div>
            <div style={{ color: '#cbd5e1', fontSize: '16px', marginBottom: '20px' }}>
              <div><strong>Sample ID:</strong> {qrData.sampleId}</div>
              <div><strong>Generated:</strong> {new Date(qrData.timestamp).toLocaleString()}</div>
              <div><strong>Lab:</strong> {qrData.lab}</div>
            </div>
            <button
              onClick={downloadQR}
              style={{
                background: 'rgba(16,185,129,0.2)',
                color: '#10b981',
                border: '2px solid rgba(16,185,129,0.4)',
                borderRadius: '10px',
                padding: '14px 30px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              Download QR Code
            </button>
          </div>
        )}

        <div style={{ marginTop: '40px', padding: '20px', background: 'rgba(56,189,248,0.1)', borderRadius: '12px', border: '1px solid rgba(56,189,248,0.3)' }}>
          <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6' }}>
            <strong style={{ color: '#38bdf8' }}>Note:</strong> In production, integrate with <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>qrcode.react</code> or similar library for actual QR code generation. QR codes enable mobile scanning for instant sample tracking and chain of custody verification.
          </p>
        </div>
      </div>
    </div>
  );
}

export default QRCodeGenerator;
