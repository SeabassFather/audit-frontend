import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import audioSystem from './audioSystem';

const TraceabilityModule = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, create, view, upload
  const [selectedTrace, setSelectedTrace] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // SAMPLE TRACE RECORDS
  const traceRecords = [
    {
      traceId: 'TRC-2025-MX-001',
      grower: 'Rancho Los Aguacates',
      product: 'Hass Avocado 48s',
      harvestDate: '2025-10-22',
      sampleType: 'Soil + Water',
      lab: 'Mexausa Analytical Lab',
      status: 'complete',
      aiRisk: 4.7,
      custodyChain: 5,
      qrLink: 'https://auditdna.com/trace/TRC-2025-MX-001',
      events: [
        { date: '2025-10-22 08:15', actor: 'Juan Martinez', action: 'Sample Collected', location: 'Block 7, Lot 3A', gps: '19.7060, -101.1949', status: 'verified' },
        { date: '2025-10-22 09:30', actor: 'Carlos Rodriguez', action: 'Transfer to Lab', location: 'Transport Van', gps: '19.7100, -101.2000', status: 'verified' },
        { date: '2025-10-22 11:45', actor: 'Maria Gonzalez', action: 'Lab Receipt', location: 'AuditDNA Lab - Morelia', gps: '19.7050, -101.1900', status: 'verified' },
        { date: '2025-10-22 14:30', actor: 'Dr. Sofia Ramirez', action: 'Testing Started', location: 'Lab Room A-12', gps: '', status: 'verified' },
        { date: '2025-10-22 17:30', actor: 'Dr. Miguel Torres', action: 'Results Approved', location: 'Lab QA Office', gps: '', status: 'verified' }
      ]
    },
    {
      traceId: 'TRC-2025-MX-002',
      grower: 'Fresa Dorada Export',
      product: 'Strawberry Organic',
      harvestDate: '2025-10-25',
      sampleType: 'Soil + Pesticide Screen',
      lab: 'Mexausa Analytical Lab',
      status: 'pending',
      aiRisk: 3.8,
      custodyChain: 3,
      qrLink: 'https://auditdna.com/trace/TRC-2025-MX-002',
      events: [
        { date: '2025-10-25 07:00', actor: 'Pedro Sanchez', action: 'Sample Collected', location: 'Greenhouse G-4', gps: '32.5149, -116.9685', status: 'verified' },
        { date: '2025-10-25 10:15', actor: 'Transport Team', action: 'In Transit', location: 'Highway 1D', gps: '32.5200, -116.9700', status: 'verified' },
        { date: '2025-10-25 14:00', actor: 'Lab Intake', action: 'Sample Received', location: 'AuditDNA Lab - Tijuana', gps: '32.5250, -116.9800', status: 'pending' }
      ]
    },
    {
      traceId: 'TRC-2025-MX-003',
      grower: 'Berries del Valle',
      product: 'Blueberry Premium',
      harvestDate: '2025-10-20',
      sampleType: 'Water + Heavy Metals',
      lab: 'Mexausa Analytical Lab',
      status: 'flagged',
      aiRisk: 2.3,
      custodyChain: 4,
      qrLink: 'https://auditdna.com/trace/TRC-2025-MX-003',
      events: [
        { date: '2025-10-20 06:30', actor: 'Farm Tech', action: 'Sample Collected', location: 'Field 12-B', gps: '31.8681, -116.5965', status: 'verified' },
        { date: '2025-10-20 09:00', actor: 'Courier', action: 'Transfer to Lab', location: 'Cold Storage Van', gps: '31.8700, -116.6000', status: 'verified' },
        { date: '2025-10-20 12:30', actor: 'Lab Receipt', action: 'Sample Received', location: 'Lab', gps: '31.8750, -116.6100', status: 'verified' },
        { date: '2025-10-20 15:00', actor: 'Lab Analyst', action: 'Testing Complete', location: 'Lab', gps: '', status: 'flagged - elevated lead' }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'complete': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'flagged': return '#ef4444';
      default: return '#64748b';
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'complete': return '✅ Compliant';
      case 'pending': return '🟡 Pending';
      case 'flagged': return '🔴 Non-Compliant';
      default: return '⚪ Unknown';
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles([...uploadedFiles, ...files]);
    audioSystem.playSuccess();
  };

  const generateQRCode = (traceId) => {
    // QR Code generation placeholder - integrate with qrcode.react in production
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://auditdna.com/trace/${traceId}`;
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #1e1b4b 100%)', padding: '2rem', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      
      {/* ANIMATED BACKGROUND */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'hidden' }}>
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: Math.random() * 150 + 50 + 'px',
              height: Math.random() * 150 + 50 + 'px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${['#10b981', '#06b6d4', '#8b5cf6'][Math.floor(Math.random() * 3)]}20 0%, transparent 70%)`,
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `float-trace ${15 + Math.random() * 15}s ease-in-out infinite`,
              animationDelay: Math.random() * 5 + 's'
            }}
          />
        ))}
      </div>

      <div style={{ maxWidth: '1600px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ 
            fontSize: '4rem', 
            background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #8b5cf6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem',
            fontWeight: 'bold',
            textShadow: '0 0 60px rgba(16, 185, 129, 0.5)',
            animation: 'glow-pulse-trace 3s ease-in-out infinite'
          }}>
            🔗 Traceability & Chain of Custody
          </h1>
          <p style={{ fontSize: '1.3rem', color: '#94a3b8' }}>
            {language === 'es' ? 'Del Campo al Laboratorio - Trazabilidad Completa' : 'Field to Lab - Complete Traceability'}
          </p>
        </div>

        {/* TAB NAVIGATION */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { id: 'dashboard', name: 'Dashboard', icon: '📊' },
            { id: 'create', name: 'Create Trace', icon: '➕' },
            { id: 'upload', name: 'Upload Docs', icon: '📤' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); audioSystem.playClick(); }}
              style={{
                padding: '1rem 2rem',
                background: activeTab === tab.id ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'rgba(30, 41, 59, 0.6)',
                backdropFilter: 'blur(20px)',
                border: activeTab === tab.id ? '3px solid #10b981' : '2px solid rgba(100, 116, 139, 0.3)',
                borderRadius: '15px',
                color: '#fff',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '1.1rem',
                transition: 'all 0.3s ease',
                boxShadow: activeTab === tab.id ? '0 10px 30px rgba(16, 185, 129, 0.5)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  e.target.style.background = 'rgba(30, 41, 59, 0.8)';
                  e.target.style.borderColor = '#10b981';
                }
                audioSystem.playHover();
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  e.target.style.background = 'rgba(30, 41, 59, 0.6)';
                  e.target.style.borderColor = 'rgba(100, 116, 139, 0.3)';
                }
              }}
            >
              {tab.icon} {tab.name}
            </button>
          ))}
        </div>

        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
              {/* STATS CARDS */}
              {[
                { label: 'Total Traces', value: '47', icon: '🔗', color: '#10b981' },
                { label: 'Active Records', value: '12', icon: '📊', color: '#06b6d4' },
                { label: 'Compliance Rate', value: '94.7%', icon: '✅', color: '#8b5cf6' },
                { label: 'Flagged Items', value: '3', icon: '⚠️', color: '#ef4444' }
              ].map((stat, idx) => (
                <div key={idx} style={{
                  background: 'rgba(30, 41, 59, 0.4)',
                  backdropFilter: 'blur(30px)',
                  borderRadius: '25px',
                  padding: '2rem',
                  border: '2px solid ' + stat.color + '40',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
                  textAlign: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.borderColor = stat.color;
                  e.currentTarget.style.boxShadow = `0 25px 70px ${stat.color}60`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = stat.color + '40';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.4)';
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{stat.icon}</div>
                  <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: stat.color, marginBottom: '0.5rem' }}>
                    {stat.value}
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '0.95rem' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* TRACE RECORDS TABLE */}
            <div style={{
              background: 'rgba(30, 41, 59, 0.4)',
              backdropFilter: 'blur(30px)',
              borderRadius: '30px',
              padding: '2.5rem',
              border: '2px solid rgba(16, 185, 129, 0.3)',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.5)'
            }}>
              <h2 style={{ fontSize: '2rem', color: '#10b981', marginBottom: '2rem' }}>
                {language === 'es' ? 'Registros de Trazabilidad' : 'Trace Records'}
              </h2>

              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {traceRecords.map(record => (
                  <div
                    key={record.traceId}
                    style={{
                      background: 'rgba(15, 23, 42, 0.6)',
                      backdropFilter: 'blur(20px)',
                      borderRadius: '20px',
                      padding: '2rem',
                      border: '2px solid ' + getStatusColor(record.status) + '50',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onClick={() => { setSelectedTrace(record); setActiveTab('view'); audioSystem.playClick(); }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(10px)';
                      e.currentTarget.style.borderColor = getStatusColor(record.status);
                      e.currentTarget.style.boxShadow = `0 15px 40px ${getStatusColor(record.status)}40`;
                      audioSystem.playHover();
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.borderColor = getStatusColor(record.status) + '50';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '2rem', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem' }}>
                          {record.traceId}
                        </div>
                        <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                          {record.grower}
                        </div>
                        <div style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.3rem' }}>
                          {record.product}
                        </div>
                      </div>

                      <div>
                        <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                          {language === 'es' ? 'Cosecha' : 'Harvest'}
                        </div>
                        <div style={{ color: '#fff', fontSize: '1rem', fontWeight: 'bold' }}>
                          {record.harvestDate}
                        </div>
                        <div style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.3rem' }}>
                          {record.sampleType}
                        </div>
                      </div>

                      <div>
                        <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                          {language === 'es' ? 'Riesgo AI' : 'AI Risk'}
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: record.aiRisk >= 4 ? '#10b981' : record.aiRisk >= 3 ? '#f59e0b' : '#ef4444' }}>
                          {record.aiRisk} / 5
                        </div>
                        <div style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.3rem' }}>
                          {record.custodyChain} {language === 'es' ? 'transferencias' : 'transfers'}
                        </div>
                      </div>

                      <div>
                        <div style={{
                          padding: '0.8rem 1.5rem',
                          background: getStatusColor(record.status) + '20',
                          border: '2px solid ' + getStatusColor(record.status),
                          borderRadius: '15px',
                          color: getStatusColor(record.status),
                          fontWeight: 'bold',
                          fontSize: '0.9rem',
                          textAlign: 'center',
                          whiteSpace: 'nowrap'
                        }}>
                          {getStatusBadge(record.status)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW TRACE DETAILS */}
        {activeTab === 'view' && selectedTrace && (
          <div>
            <button
              onClick={() => { setActiveTab('dashboard'); setSelectedTrace(null); audioSystem.playClick(); }}
              style={{
                padding: '1rem 2rem',
                background: 'rgba(100, 116, 139, 0.3)',
                border: '2px solid #64748b',
                borderRadius: '12px',
                color: '#fff',
                cursor: 'pointer',
                marginBottom: '2rem',
                fontWeight: 'bold'
              }}
            >
              ← {language === 'es' ? 'Volver' : 'Back'}
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
              
              {/* CHAIN OF CUSTODY TIMELINE */}
              <div style={{
                background: 'rgba(30, 41, 59, 0.4)',
                backdropFilter: 'blur(30px)',
                borderRadius: '30px',
                padding: '2.5rem',
                border: '2px solid rgba(16, 185, 129, 0.3)',
                boxShadow: '0 30px 80px rgba(0, 0, 0, 0.5)'
              }}>
                <h2 style={{ fontSize: '2rem', color: '#10b981', marginBottom: '2rem' }}>
                  {language === 'es' ? 'Cadena de Custodia' : 'Chain of Custody'}
                </h2>

                <div style={{ position: 'relative', paddingLeft: '3rem' }}>
                  {/* VERTICAL LINE */}
                  <div style={{
                    position: 'absolute',
                    left: '1.5rem',
                    top: '1rem',
                    bottom: '1rem',
                    width: '3px',
                    background: 'linear-gradient(180deg, #10b981 0%, #06b6d4 100%)'
                  }} />

                  {selectedTrace.events.map((event, idx) => (
                    <div key={idx} style={{ position: 'relative', marginBottom: '2rem' }}>
                      {/* DOT */}
                      <div style={{
                        position: 'absolute',
                        left: '-2.5rem',
                        top: '0.5rem',
                        width: '2rem',
                        height: '2rem',
                        borderRadius: '50%',
                        background: event.status === 'verified' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : event.status === 'pending' ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                        border: '3px solid #0f172a',
                        boxShadow: event.status === 'verified' ? '0 0 20px rgba(16, 185, 129, 0.6)' : '0 0 20px rgba(239, 68, 68, 0.6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.8rem'
                      }}>
                        {event.status === 'verified' ? '✓' : event.status === 'pending' ? '⏳' : '⚠'}
                      </div>

                      <div style={{
                        background: 'rgba(15, 23, 42, 0.6)',
                        borderRadius: '15px',
                        padding: '1.5rem',
                        border: '2px solid rgba(16, 185, 129, 0.3)'
                      }}>
                        <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.5rem' }}>
                          {event.date}
                        </div>
                        <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem' }}>
                          {event.action}
                        </div>
                        <div style={{ color: '#94a3b8', marginBottom: '0.3rem' }}>
                          👤 {event.actor}
                        </div>
                        <div style={{ color: '#94a3b8', marginBottom: '0.3rem' }}>
                          📍 {event.location}
                        </div>
                        {event.gps && (
                          <div style={{ color: '#06b6d4', fontSize: '0.85rem' }}>
                            🌍 GPS: {event.gps}
                          </div>
                        )}
                        {event.status && (
                          <div style={{
                            marginTop: '0.5rem',
                            padding: '0.5rem 1rem',
                            background: event.status.includes('flagged') ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                            border: '1px solid ' + (event.status.includes('flagged') ? '#ef4444' : '#10b981'),
                            borderRadius: '8px',
                            fontSize: '0.85rem',
                            color: event.status.includes('flagged') ? '#ef4444' : '#10b981',
                            fontWeight: 'bold'
                          }}>
                            {event.status}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* TRACE INFO & QR */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                
                {/* TRACE INFO */}
                <div style={{
                  background: 'rgba(30, 41, 59, 0.4)',
                  backdropFilter: 'blur(30px)',
                  borderRadius: '30px',
                  padding: '2rem',
                  border: '2px solid rgba(6, 182, 212, 0.3)',
                  boxShadow: '0 30px 80px rgba(0, 0, 0, 0.5)'
                }}>
                  <h3 style={{ fontSize: '1.5rem', color: '#06b6d4', marginBottom: '1.5rem' }}>
                    {language === 'es' ? 'Información de Trazabilidad' : 'Trace Information'}
                  </h3>

                  {[
                    { label: 'Trace ID', value: selectedTrace.traceId },
                    { label: 'Grower', value: selectedTrace.grower },
                    { label: 'Product', value: selectedTrace.product },
                    { label: 'Harvest Date', value: selectedTrace.harvestDate },
                    { label: 'Sample Type', value: selectedTrace.sampleType },
                    { label: 'Lab', value: selectedTrace.lab },
                    { label: 'AI Risk Score', value: `${selectedTrace.aiRisk} / 5` },
                    { label: 'Custody Transfers', value: selectedTrace.custodyChain }
                  ].map((item, idx) => (
                    <div key={idx} style={{
                      padding: '1rem',
                      background: 'rgba(15, 23, 42, 0.6)',
                      borderRadius: '12px',
                      marginBottom: '0.75rem',
                      border: '1px solid rgba(100, 116, 139, 0.3)'
                    }}>
                      <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.3rem' }}>
                        {item.label}
                      </div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fff' }}>
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* QR CODE */}
                <div style={{
                  background: 'rgba(30, 41, 59, 0.4)',
                  backdropFilter: 'blur(30px)',
                  borderRadius: '30px',
                  padding: '2rem',
                  border: '2px solid rgba(139, 92, 246, 0.3)',
                  boxShadow: '0 30px 80px rgba(0, 0, 0, 0.5)',
                  textAlign: 'center'
                }}>
                  <h3 style={{ fontSize: '1.5rem', color: '#8b5cf6', marginBottom: '1.5rem' }}>
                    {language === 'es' ? 'Código QR' : 'QR Code'}
                  </h3>

                  <div style={{
                    background: '#fff',
                    padding: '1.5rem',
                    borderRadius: '15px',
                    marginBottom: '1rem'
                  }}>
                    <img 
                      src={generateQRCode(selectedTrace.traceId)} 
                      alt="QR Code"
                      style={{ width: '100%', maxWidth: '250px' }}
                    />
                  </div>

                  <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1rem', wordBreak: 'break-all' }}>
                    {selectedTrace.qrLink}
                  </div>

                  <button
                    onClick={() => { navigator.clipboard.writeText(selectedTrace.qrLink); audioSystem.playSuccess(); }}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                      border: 'none',
                      borderRadius: '12px',
                      color: '#fff',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      marginBottom: '0.5rem'
                    }}
                  >
                    {language === 'es' ? 'Copiar Link' : 'Copy Link'}
                  </button>

                  <button
                    onClick={() => audioSystem.playClick()}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: 'rgba(100, 116, 139, 0.3)',
                      border: '2px solid #06b6d4',
                      borderRadius: '12px',
                      color: '#06b6d4',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    {language === 'es' ? 'Descargar QR' : 'Download QR'}
                  </button>
                </div>

                {/* EXPORT BUTTONS */}
                <div style={{
                  background: 'rgba(30, 41, 59, 0.4)',
                  backdropFilter: 'blur(30px)',
                  borderRadius: '30px',
                  padding: '2rem',
                  border: '2px solid rgba(16, 185, 129, 0.3)',
                  boxShadow: '0 30px 80px rgba(0, 0, 0, 0.5)'
                }}>
                  <button
                    onClick={() => audioSystem.playSuccess()}
                    style={{
                      width: '100%',
                      padding: '1.2rem',
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      border: 'none',
                      borderRadius: '12px',
                      color: '#fff',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      marginBottom: '1rem',
                      fontSize: '1.1rem'
                    }}
                  >
                    📄 {language === 'es' ? 'Exportar PDF' : 'Export PDF'}
                  </button>

                  <button
                    onClick={() => audioSystem.playClick()}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: 'rgba(100, 116, 139, 0.3)',
                      border: '2px solid #ec4899',
                      borderRadius: '12px',
                      color: '#ec4899',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    📧 {language === 'es' ? 'Enviar por Email' : 'Email Report'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CREATE NEW TRACE */}
        {activeTab === 'create' && (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{
              background: 'rgba(30, 41, 59, 0.4)',
              backdropFilter: 'blur(30px)',
              borderRadius: '30px',
              padding: '3rem',
              border: '2px solid rgba(16, 185, 129, 0.3)',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.5)'
            }}>
              <h2 style={{ fontSize: '2.5rem', color: '#10b981', marginBottom: '2rem', textAlign: 'center' }}>
                {language === 'es' ? 'Crear Nueva Trazabilidad' : 'Create New Trace'}
              </h2>

              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {[
                  { label: 'Grower Name', placeholder: 'Rancho Los Aguacates' },
                  { label: 'Product', placeholder: 'Hass Avocado 48s' },
                  { label: 'Harvest Date', placeholder: '2025-10-28', type: 'date' },
                  { label: 'Sample Type', placeholder: 'Soil + Water' },
                  { label: 'Field Location', placeholder: 'Block 7, Lot 3A' },
                  { label: 'GPS Coordinates', placeholder: '19.7060, -101.1949' },
                  { label: 'Collector Name', placeholder: 'Juan Martinez' }
                ].map((field, idx) => (
                  <div key={idx}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8', fontWeight: 'bold' }}>
                      {field.label}
                    </label>
                    <input
                      type={field.type || 'text'}
                      placeholder={field.placeholder}
                      style={{
                        width: '100%',
                        padding: '1rem',
                        background: 'rgba(15, 23, 42, 0.6)',
                        border: '2px solid #334155',
                        borderRadius: '12px',
                        color: '#fff',
                        fontSize: '1rem',
                        outline: 'none'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#10b981'}
                      onBlur={(e) => e.target.style.borderColor = '#334155'}
                    />
                  </div>
                ))}

                <button
                  onClick={() => { audioSystem.playSuccess(); setActiveTab('dashboard'); }}
                  style={{
                    width: '100%',
                    padding: '1.5rem',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    border: 'none',
                    borderRadius: '15px',
                    color: '#fff',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    marginTop: '1rem',
                    boxShadow: '0 10px 30px rgba(16, 185, 129, 0.5)'
                  }}
                >
                  ✅ {language === 'es' ? 'Crear Trazabilidad' : 'Create Trace Record'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* UPLOAD DOCUMENTS */}
        {activeTab === 'upload' && (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{
              background: 'rgba(30, 41, 59, 0.4)',
              backdropFilter: 'blur(30px)',
              borderRadius: '30px',
              padding: '3rem',
              border: '2px solid rgba(6, 182, 212, 0.3)',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.5)',
              textAlign: 'center'
            }}>
              <h2 style={{ fontSize: '2.5rem', color: '#06b6d4', marginBottom: '2rem' }}>
                {language === 'es' ? 'Subir Documentos' : 'Upload Documents'}
              </h2>

              <input
                type="file"
                id="docUpload"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ display: 'none' }}
                onChange={handleFileUpload}
              />

              <button
                onClick={() => document.getElementById('docUpload').click()}
                style={{
                  width: '100%',
                  padding: '4rem',
                  background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                  border: '3px dashed #fff',
                  borderRadius: '25px',
                  color: '#fff',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '1.5rem',
                  marginBottom: '2rem'
                }}
              >
                📁 {language === 'es' ? 'Click para Seleccionar Archivos' : 'Click to Select Files'}
                <div style={{ fontSize: '1rem', marginTop: '1rem', opacity: 0.8 }}>
                  PDF, JPG, PNG
                </div>
              </button>

              {uploadedFiles.length > 0 && (
                <div style={{
                  background: 'rgba(15, 23, 42, 0.6)',
                  borderRadius: '20px',
                  padding: '2rem'
                }}>
                  <h3 style={{ color: '#10b981', marginBottom: '1rem' }}>
                    ✅ {language === 'es' ? 'Archivos Subidos:' : 'Uploaded Files:'}
                  </h3>
                  {uploadedFiles.map((file, idx) => (
                    <div key={idx} style={{
                      padding: '1rem',
                      background: 'rgba(30, 41, 59, 0.6)',
                      borderRadius: '12px',
                      marginBottom: '0.5rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{ color: '#fff' }}>📄 {file.name}</span>
                      <span style={{ color: '#10b981' }}>✅</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      <style>{`
        @keyframes float-trace {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.2; }
          50% { transform: translate(30px, -30px) rotate(180deg); opacity: 0.5; }
        }
        @keyframes glow-pulse-trace {
          0%, 100% { text-shadow: 0 0 60px rgba(16, 185, 129, 0.5); }
          50% { text-shadow: 0 0 80px rgba(16, 185, 129, 0.8), 0 0 120px rgba(6, 182, 212, 0.6); }
        }
      `}</style>
    </div>
  );
};

export default TraceabilityModule;
