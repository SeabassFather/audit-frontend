import React, { useState } from "react";
import axios from "axios";
import FileUploadComponent from './FileUploadComponent';
import ContactCardComponent from './ContactCardComponent';
import BillingComponent from './BillingComponent';
import QRCodeComponent from './QRCodeComponent';

export default function FuelOilAnalysisModule() {
  const [step, setStep] = useState(1);
  const [contactInfo, setContactInfo] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [paymentData, setPaymentData] = useState(null);
  const [sampleData, setSampleData] = useState({
    sampleType: "",
    fuelType: "",
    viscosity: "",
    waterContent: "",
    particulates: "",
    sulfurContent: ""
  });
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8001/api/fuel-oil/analyze", sampleData);
      setAnalysis(response.data);
      setStep(3);
    } catch (err) {
      alert("Backend error!");
    }
    setLoading(false);
  };

  return (
    <div style={{padding: '40px', background: '#0f172a', minHeight: '100vh', color: 'white'}}>
      <h1 style={{fontSize: '2.5rem', color: '#8b5cf6', marginBottom: '30px'}}>
        ⛽ Fuel/Oil Quality Analysis
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
          {num: 1, label: 'Contact', icon: '📋'},
          {num: 2, label: 'Sample Data', icon: '⛽'},
          {num: 3, label: 'Upload', icon: '📤'},
          {num: 4, label: 'Payment', icon: '💳'},
          {num: 5, label: 'QR Code', icon: '📱'}
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
              background: step >= s.num ? '#8b5cf6' : '#334155',
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
              color: step >= s.num ? '#8b5cf6' : '#64748b',
              fontWeight: '600',
              fontSize: '0.9rem'
            }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {step === 1 && <ContactCardComponent onContactSubmit={(data) => {setContactInfo(data); setStep(2);}} moduleType="fuelOil" />}

      {step === 2 && (
        <div style={{background: '#1e293b', padding: '30px', borderRadius: '16px'}}>
          <h2 style={{color: '#10b981', marginBottom: '20px'}}>Sample Information</h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px'}}>
            <div>
              <label style={{display: 'block', marginBottom: '8px', color: '#94a3b8'}}>Sample Type</label>
              <select value={sampleData.sampleType} onChange={e => setSampleData({...sampleData, sampleType: e.target.value})} style={{width: '100%', padding: '12px', background: '#0f172a', border: '2px solid #334155', borderRadius: '8px', color: 'white'}}>
                <option value="">Select...</option>
                <option value="fuel">Fuel</option>
                <option value="oil">Oil</option>
              </select>
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '8px', color: '#94a3b8'}}>Fuel Type</label>
              <select value={sampleData.fuelType} onChange={e => setSampleData({...sampleData, fuelType: e.target.value})} style={{width: '100%', padding: '12px', background: '#0f172a', border: '2px solid #334155', borderRadius: '8px', color: 'white'}}>
                <option value="">Select...</option>
                <option value="diesel">Diesel</option>
                <option value="gasoline">Gasoline</option>
              </select>
            </div>
          </div>
          <button onClick={handleAnalyze} disabled={loading} style={{width: '100%', padding: '16px', marginTop: '30px', background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', border: 'none', borderRadius: '12px', color: 'white', fontSize: '1.2rem', fontWeight: '700', cursor: 'pointer'}}>
            {loading ? '⏳ Analyzing...' : '🚀 Analyze Sample'}
          </button>
        </div>
      )}

      {step === 3 && <FileUploadComponent onUploadComplete={(data) => {setUploadedFiles(data.files || []); setStep(4);}} moduleType="fuelOil" />}
      {step === 4 && <BillingComponent contactInfo={contactInfo} uploadedFiles={uploadedFiles} moduleType="fuelOil" onPaymentComplete={(data) => {setPaymentData(data); setStep(5);}} />}

      {step === 5 && (
        <div>
          <QRCodeComponent 
            data={`AUDITDNA-FUEL-${paymentData?.transactionId}`}
            orderInfo={{
              orderId: paymentData?.transactionId,
              moduleType: 'Fuel/Oil Analysis',
              customerName: contactInfo?.fullName,
              email: contactInfo?.email
            }}
          />
        </div>
      )}
    </div>
  );
}