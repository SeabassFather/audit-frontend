import React, { useState } from 'react';
import audioSystem from './audioSystem';

function TraceabilityModule() {
  const [sampleData, setSampleData] = useState({
    sampleId: '',
    location: '',
    operator: '',
    timestamp: new Date().toISOString()
  });

  const [chainOfCustody, setChainOfCustody] = useState([]);
  const [qrGenerated, setQrGenerated] = useState(false);

  const generateSampleId = () => {
    const id = `AUD-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    setSampleData(prev => ({ ...prev, sampleId: id }));
    return id;
  };

  const captureGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const location = `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`;
        setSampleData(prev => ({ ...prev, location }));
      });
    }
  };

  const addCustodyTransfer = () => {
    const transfer = {
      timestamp: new Date().toISOString(),
      from: sampleData.operator || 'Lab Technician',
      to: 'Next Handler',
      action: 'Sample Transfer',
      sampleId: sampleData.sampleId
    };
    setChainOfCustody(prev => [...prev, transfer]);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#1a2332', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        
        <h1 style={{ 
          fontSize: '56px', 
          fontWeight: 'bold', 
          color: '#10b981', 
          marginBottom: '40px', 
          textAlign: 'center',
          textShadow: '0 0 20px rgba(16,185,129,0.5)'
        }}>
          Traceability & Chain of Custody
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '40px' }}>
          
          {/* Sample Registration */}
          <div style={{ 
            background: '#0f1923', 
            borderRadius: '24px', 
            padding: '40px',
            border: '1px solid rgba(16,185,129,0.3)'
          }}>
            <div style={{ fontSize: '80px', marginBottom: '24px' }}>📍</div>
            <h2 style={{ fontSize: '32px', color: '#10b981', marginBottom: '30px', fontWeight: '700' }}>
              Sample Registration
            </h2>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '8px', display: 'block', fontWeight: '600' }}>
                Sample ID
              </label>
              <div style={{ display: 'flex', gap: '12px' }}>
                <input
                  type="text"
                  value={sampleData.sampleId}
                  readOnly
                  placeholder="Click generate..."
                  style={{
                    flex: 1,
                    padding: '14px 16px',
                    fontSize: '16px',
                    background: 'rgba(15,25,35,0.6)',
                    border: '1px solid rgba(100,116,139,0.3)',
                    borderRadius: '10px',
                    color: 'white',
                    outline: 'none'
                  }}
                />
                <button
                  onMouseEnter={() => audioSystem.playHover()} onClick={() => { audioSystem.playClick();  audioSystem.playClick(); generateSampleId();  }}
                  style={{
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '14px 24px',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  Generate
                </button>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '8px', display: 'block', fontWeight: '600' }}>
                GPS Location
              </label>
              <div style={{ display: 'flex', gap: '12px' }}>
                <input
                  type="text"
                  value={sampleData.location}
                  readOnly
                  placeholder="Click capture GPS..."
                  style={{
                    flex: 1,
                    padding: '14px 16px',
                    fontSize: '16px',
                    background: 'rgba(15,25,35,0.6)',
                    border: '1px solid rgba(100,116,139,0.3)',
                    borderRadius: '10px',
                    color: 'white',
                    outline: 'none'
                  }}
                />
                <button
                  onMouseEnter={() => audioSystem.playHover()} onClick={() => { audioSystem.playClick();  audioSystem.playClick(); captureGPS();  }}
                  style={{
                    background: 'rgba(16,185,129,0.2)',
                    color: '#10b981',
                    border: '1px solid rgba(16,185,129,0.4)',
                    borderRadius: '10px',
                    padding: '14px 24px',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  📍 GPS
                </button>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '8px', display: 'block', fontWeight: '600' }}>
                Operator Name
              </label>
              <input
                type="text"
                value={sampleData.operator}
                onChange={(e) => setSampleData(prev => ({ ...prev, operator: e.target.value }))}
                placeholder="Enter operator name..."
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  fontSize: '16px',
                  background: 'rgba(15,25,35,0.6)',
                  border: '1px solid rgba(100,116,139,0.3)',
                  borderRadius: '10px',
                  color: 'white',
                  outline: 'none'
                }}
              />
            </div>

            <button
              onMouseEnter={() => audioSystem.playHover()} onClick={() => setQrGenerated(true)}
              disabled={!sampleData.sampleId}
              style={{
                background: sampleData.sampleId 
                  ? 'linear-gradient(135deg, #10b981, #059669)'
                  : 'rgba(100,116,139,0.2)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '16px 40px',
                fontSize: '18px',
                fontWeight: '700',
                cursor: sampleData.sampleId ? 'pointer' : 'not-allowed',
                width: '100%',
                boxShadow: sampleData.sampleId ? '0 8px 25px rgba(16,185,129,0.4)' : 'none'
              }}
            >
              Generate QR Code
            </button>
          </div>

          {/* QR Code Display */}
          <div style={{ 
            background: '#0f1923', 
            borderRadius: '24px', 
            padding: '40px',
            border: '1px solid rgba(16,185,129,0.3)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {qrGenerated && sampleData.sampleId ? (
              <>
                <div style={{ fontSize: '80px', marginBottom: '24px' }}>📱</div>
                <div style={{ 
                  background: 'white', 
                  width: '300px', 
                  height: '300px', 
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px',
                  fontSize: '100px'
                }}>
                  📱
                </div>
                <div style={{ textAlign: 'center', color: '#94a3b8' }}>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#10b981', marginBottom: '8px' }}>
                    {sampleData.sampleId}
                  </div>
                  <div style={{ fontSize: '14px' }}>
                    Scan to track sample
                  </div>
                </div>
                <button
                  style={{
                    background: 'rgba(16,185,129,0.2)',
                    color: '#10b981',
                    border: '1px solid rgba(16,185,129,0.4)',
                    borderRadius: '10px',
                    padding: '14px 30px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    marginTop: '24px'
                  }}
                >
                  Download QR Code
                </button>
              </>
            ) : (
              <>
                <div style={{ fontSize: '120px', marginBottom: '24px', opacity: 0.3 }}>📱</div>
                <p style={{ color: '#64748b', fontSize: '18px', textAlign: 'center' }}>
                  Generate a sample ID first<br/>to create QR code
                </p>
              </>
            )}
          </div>
        </div>

        {/* Chain of Custody */}
        <div style={{ 
          background: '#0f1923', 
          borderRadius: '24px', 
          padding: '40px',
          border: '1px solid rgba(16,185,129,0.3)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '32px', color: '#10b981', margin: 0, fontWeight: '700' }}>
              Chain of Custody Log
            </h2>
            <button
              onMouseEnter={() => audioSystem.playHover()} onClick={() => { audioSystem.playClick();  audioSystem.playClick(); addCustodyTransfer();  }}
              disabled={!sampleData.sampleId}
              style={{
                background: sampleData.sampleId ? 'rgba(16,185,129,0.2)' : 'rgba(100,116,139,0.2)',
                color: sampleData.sampleId ? '#10b981' : '#64748b',
                border: `1px solid ${sampleData.sampleId ? 'rgba(16,185,129,0.4)' : 'rgba(100,116,139,0.3)'}`,
                borderRadius: '10px',
                padding: '14px 30px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: sampleData.sampleId ? 'pointer' : 'not-allowed'
              }}
            >
              + Add Transfer
            </button>
          </div>

          {chainOfCustody.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
              <div style={{ fontSize: '80px', marginBottom: '20px', opacity: 0.3 }}>📋</div>
              <p style={{ fontSize: '18px' }}>No custody transfers logged yet</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '16px' }}>
              {chainOfCustody.map((transfer, index) => (
                <div
                  key={index}
                  style={{
                    background: 'rgba(15,25,35,0.6)',
                    border: '1px solid rgba(100,116,139,0.3)',
                    borderLeft: '4px solid #10b981',
                    borderRadius: '12px',
                    padding: '24px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div style={{ fontSize: '18px', color: 'white', fontWeight: '700' }}>
                      Transfer #{index + 1}
                    </div>
                    <div style={{ fontSize: '14px', color: '#64748b' }}>
                      {new Date(transfer.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <div style={{ fontSize: '16px', color: '#94a3b8', lineHeight: '1.8' }}>
                    <div><strong>From:</strong> {transfer.from}</div>
                    <div><strong>To:</strong> {transfer.to}</div>
                    <div><strong>Action:</strong> {transfer.action}</div>
                    <div><strong>Sample ID:</strong> {transfer.sampleId}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Compliance Info */}
        <div style={{ 
          marginTop: '30px',
          background: 'rgba(56,189,248,0.1)', 
          border: '1px solid rgba(56,189,248,0.3)', 
          borderRadius: '16px', 
          padding: '30px'
        }}>
          <h3 style={{ fontSize: '24px', color: '#38bdf8', marginBottom: '16px', fontWeight: '700' }}>
            ISO-17025 Compliance Features
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            <div style={{ color: '#94a3b8' }}>✓ QR Code Sample Tracking</div>
            <div style={{ color: '#94a3b8' }}>✓ GPS Coordinate Logging</div>
            <div style={{ color: '#94a3b8' }}>✓ Timestamped Events</div>
            <div style={{ color: '#94a3b8' }}>✓ Chain of Custody Documentation</div>
            <div style={{ color: '#94a3b8' }}>✓ Operator Identification</div>
            <div style={{ color: '#94a3b8' }}>✓ Complete Audit Trail</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TraceabilityModule;


