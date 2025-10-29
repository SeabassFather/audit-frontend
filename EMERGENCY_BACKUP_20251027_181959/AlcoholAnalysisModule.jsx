/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import FileUploadComponent from './FileUploadComponent';
import ContactCardComponent from './ContactCardComponent';
import BillingComponent from './BillingComponent';
import QRCodeComponent from './QRCodeComponent';

export default function AlcoholAnalysisModule() {
  const [step, setStep] = useState(1);
  const [contactInfo, setContactInfo] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [paymentData, setPaymentData] = useState(null);
  const [alcoholData, setAlcoholData] = useState({
    alcoholType: "",
    purity: "",
    waterContent: "",
    methanol: ""
  });
  const [analysis, setAnalysis] = useState(null);

  const handleAnalyze = () => {
    const score = 100 - (alcoholData.waterContent * 20) - (alcoholData.methanol * 100);
    setAnalysis({
      qualityScore: Math.max(score, 0),
      grade: score >= 90 ? 'Premium' : score >= 75 ? 'Standard' : 'Below Standard',
      safety: alcoholData.methanol > 0.1 ? 'TOXIC' : 'Safe'
    });
    setStep(3);
  };

  return (
    <div style={{padding: '40px', background: '#0f172a', minHeight: '100vh', color: 'white'}}>
      <h1 style={{fontSize: '2.5rem', color: '#ec4899', marginBottom: '30px'}}>
        Ã°Å¸Â§Âª Alcohol Quality Analysis
      </h1>

      {/* PROGRESS STEPS */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '40px',
        padding: '20px',
        background: '#1e293b',
        borderRadius: '12px'
      }}>
        {[
          {num: 1, label: 'Contact', icon: 'Ã°Å¸â€œâ€¹'},
          {num: 2, label: 'Sample Data', icon: 'Ã°Å¸Â§Âª'},
          {num: 3, label: 'Upload', icon: 'Ã°Å¸â€œÂ¤'},
          {num: 4, label: 'Payment', icon: 'Ã°Å¸â€™Â³'},
          {num: 5, label: 'QR Code', icon: 'Ã°Å¸â€œÂ±'}
        ].map(s => (
          <div key={s.num} style={{
            textAlign: 'center',
            opacity: step >= s.num ? 1 : 0.4,
            flex: 1
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: step >= s.num ? '#ec4899' : '#334155',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 10px',
              fontSize: '1.5rem',
              transition: 'all 0.3s'
            }}>
              {s.icon}
            </div>
            <div style={{
              color: step >= s.num ? '#ec4899' : '#64748b',
              fontWeight: '600',
              fontSize: '0.9rem'
            }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {step === 1 && <ContactCardComponent onContactSubmit={(data) => {setContactInfo(data); setStep(2);}} moduleType="alcohol" />}

      {step === 2 && (
        <div style={{background: '#1e293b', padding: '30px', borderRadius: '16px'}}>
          <h2 style={{color: '#10b981', marginBottom: '20px'}}>Alcohol Sample Data</h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px'}}>
            <div>
              <label style={{display: 'block', marginBottom: '8px', color: '#94a3b8'}}>Alcohol Type</label>
              <select value={alcoholData.alcoholType} onChange={e => setAlcoholData({...alcoholData, alcoholType: e.target.value})} style={{width: '100%', padding: '12px', background: '#0f172a', border: '2px solid #334155', borderRadius: '8px', color: 'white'}}>
                <option value="">Select...</option>
                <option value="ethanol">Ethanol</option>
                <option value="methanol">Methanol</option>
              </select>
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '8px', color: '#94a3b8'}}>Purity (%)</label>
              <input type="number" step="0.1" value={alcoholData.purity} onChange={e => setAlcoholData({...alcoholData, purity: e.target.value})} placeholder="95.0" style={{width: '100%', padding: '12px', background: '#0f172a', border: '2px solid #334155', borderRadius: '8px', color: 'white'}} />
            </div>
          </div>
          <button onClick={handleAnalyze} style={{width: '100%', padding: '16px', marginTop: '30px', background: 'linear-gradient(135deg, #ec4899, #be185d)', border: 'none', borderRadius: '12px', color: 'white', fontSize: '1.2rem', fontWeight: '700', cursor: 'pointer'}}>
            Ã°Å¸Å¡â‚¬ Analyze Alcohol
          </button>
        </div>
      )}

      {step === 3 && <FileUploadComponent onUploadComplete={(data) => {setUploadedFiles(data.files || []); setStep(4);}} moduleType="alcohol" />}
      {step === 4 && <BillingComponent contactInfo={contactInfo} uploadedFiles={uploadedFiles} moduleType="alcohol" onPaymentComplete={(data) => {setPaymentData(data); setStep(5);}} />}

      {step === 5 && (
        <div>
          <QRCodeComponent 
            data={`AUDITDNA-ALCOHOL-${paymentData?.transactionId}`}
            orderInfo={{
              orderId: paymentData?.transactionId,
              moduleType: 'Alcohol Analysis',
              customerName: contactInfo?.fullName,
              email: contactInfo?.email
            }}
          />
        </div>
      )}
    </div>
  );
}