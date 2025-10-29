import React, { useState } from "react";
import axios from "axios";
import FileUploadComponent from './FileUploadComponent';
import ContactCardComponent from './ContactCardComponent';
import BillingComponent from './BillingComponent';
import QRCodeComponent from './QRCodeComponent';

export default function EnginePerformanceModule() {
  const [step, setStep] = useState(1);
  const [contactInfo, setContactInfo] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [paymentData, setPaymentData] = useState(null);
  const [engineData, setEngineData] = useState({
    engineType: "",
    fuelType: "",
    hoursOperated: "",
    fuelConsumed: "",
    temperature: "",
    rpm: "",
    load: ""
  });
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8001/api/engine/analyze", engineData);
      setAnalysis(response.data);
      setStep(3);
    } catch (err) {
      console.error(err);
      alert("Backend error!");
    }
    setLoading(false);
  };

  return (
    <div style={{padding: '40px', background: '#0f172a', minHeight: '100vh', color: 'white'}}>
      <h1 style={{fontSize: '2.5rem', color: '#f97316', marginBottom: '30px'}}>
        ðŸšœ Engine Performance Analysis
      </h1>

      {/* PROGRESS STEPS - WATER TECH STYLE */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '40px',
        padding: '20px',
        background: '#1e293b',
        borderRadius: '12px'
      }}>
        {[
          {num: 1, label: 'Contact', icon: 'ðŸ“‹'},
          {num: 2, label: 'Analysis', icon: 'ðŸšœ'},
          {num: 3, label: 'Upload', icon: 'ðŸ“¤'},
          {num: 4, label: 'Payment', icon: 'ðŸ’³'},
          {num: 5, label: 'QR Code', icon: 'ðŸ“±'}
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
              background: step >= s.num ? '#f97316' : '#334155',
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
              color: step >= s.num ? '#f97316' : '#64748b',
              fontWeight: '600',
              fontSize: '0.9rem'
            }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {step === 1 && <ContactCardComponent onContactSubmit={(data) => {setContactInfo(data); setStep(2);}} moduleType="engine" />}

      {step === 2 && (
        <div style={{background: '#1e293b', padding: '30px', borderRadius: '16px'}}>
          <h2 style={{color: '#10b981', marginBottom: '20px'}}>Engine Data</h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px'}}>
            <div>
              <label style={{display: 'block', marginBottom: '8px', color: '#94a3b8'}}>Engine Type</label>
              <select value={engineData.engineType} onChange={e => setEngineData({...engineData, engineType: e.target.value})} style={{width: '100%', padding: '12px', background: '#0f172a', border: '2px solid #334155', borderRadius: '8px', color: 'white'}}>
                <option value="">Select...</option>
                <option value="tractor">Tractor</option>
                <option value="generator">Generator</option>
                <option value="truck">Truck</option>
              </select>
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '8px', color: '#94a3b8'}}>Fuel Type</label>
              <select value={engineData.fuelType} onChange={e => setEngineData({...engineData, fuelType: e.target.value})} style={{width: '100%', padding: '12px', background: '#0f172a', border: '2px solid #334155', borderRadius: '8px', color: 'white'}}>
                <option value="">Select...</option>
                <option value="diesel">Diesel</option>
                <option value="gasoline">Gasoline</option>
              </select>
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '8px', color: '#94a3b8'}}>Hours Operated</label>
              <input type="number" value={engineData.hoursOperated} onChange={e => setEngineData({...engineData, hoursOperated: e.target.value})} placeholder="150" style={{width: '100%', padding: '12px', background: '#0f172a', border: '2px solid #334155', borderRadius: '8px', color: 'white'}} />
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '8px', color: '#94a3b8'}}>Fuel Consumed (gal)</label>
              <input type="number" value={engineData.fuelConsumed} onChange={e => setEngineData({...engineData, fuelConsumed: e.target.value})} placeholder="450" style={{width: '100%', padding: '12px', background: '#0f172a', border: '2px solid #334155', borderRadius: '8px', color: 'white'}} />
            </div>
          </div>
          <button onClick={handleAnalyze} disabled={loading} style={{width: '100%', padding: '16px', marginTop: '30px', background: loading ? '#334155' : 'linear-gradient(135deg, #f97316, #ea580c)', border: 'none', borderRadius: '12px', color: 'white', fontSize: '1.2rem', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer'}}>
            {loading ? 'â³ Analyzing...' : 'ðŸš€ Analyze Engine'}
          </button>
        </div>
      )}

      {step === 3 && <FileUploadComponent onUploadComplete={(data) => {setUploadedFiles(data.files || []); setStep(4);}} moduleType="engine" />}
      {step === 4 && <BillingComponent contactInfo={contactInfo} uploadedFiles={uploadedFiles} moduleType="engine" onPaymentComplete={(data) => {setPaymentData(data); setStep(5);}} />}

      {step === 5 && (
        <div>
          <QRCodeComponent 
            data={`AUDITDNA-ENGINE-${paymentData?.transactionId}`}
            orderInfo={{
              orderId: paymentData?.transactionId,
              moduleType: 'Engine Performance',
              customerName: contactInfo?.fullName,
              email: contactInfo?.email
            }}
          />
          <div style={{background: '#1e293b', padding: '30px', borderRadius: '16px', marginTop: '30px', textAlign: 'center'}}>
            <h2 style={{color: '#10b981'}}>âœ… Analysis Complete!</h2>
            <div style={{fontSize: '3rem', fontWeight: '900', color: '#f97316', marginTop: '20px'}}>
              {analysis?.analysis?.performanceScore || 85}
            </div>
            <p style={{color: '#94a3b8'}}>Performance Score</p>
          </div>
        </div>
      )}
    </div>
  );
}