import React, { useState } from "react";
import axios from "axios";
import FileUploadComponent from './FileUploadComponent';
import ContactCardComponent from './ContactCardComponent';
import BillingComponent from './BillingComponent';
import QRCodeComponent from './QRCodeComponent';

export default function SoilAnalysisModule() {
  const [step, setStep] = useState(1);
  const [contactInfo, setContactInfo] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [paymentData, setPaymentData] = useState(null);
  const [soilData, setSoilData] = useState({
    salinity: "",
    pH: "",
    organicMatter: "",
    moisture: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    fieldSize: "",
    location: "",
    testDate: new Date().toISOString().split('T')[0]
  });
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8001/api/soil/analyze", soilData);
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
      <h1 style={{fontSize: '2.5rem', color: '#10b981', marginBottom: '30px'}}>
        🌱 Soil Health & Fertility Analysis
      </h1>

      {/* Progress */}
      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '40px', padding: '20px', background: '#1e293b', borderRadius: '12px'}}>
        {[
          {num: 1, label: 'Contact', icon: '📋'},
          {num: 2, label: 'Soil Data', icon: '🌱'},
          {num: 3, label: 'Upload', icon: '📤'},
          {num: 4, label: 'Payment', icon: '💳'},
          {num: 5, label: 'QR Code', icon: '📱'}
        ].map(s => (
          <div key={s.num} style={{textAlign: 'center', opacity: step >= s.num ? 1 : 0.4}}>
            <div style={{width: '50px', height: '50px', borderRadius: '50%', background: step >= s.num ? '#10b981' : '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', fontSize: '1.5rem'}}>
              {s.icon}
            </div>
            <div style={{color: step >= s.num ? '#10b981' : '#64748b', fontWeight: '600'}}>{s.label}</div>
          </div>
        ))}
      </div>

      {step === 1 && <ContactCardComponent onContactSubmit={(data) => {setContactInfo(data); setStep(2);}} moduleType="soil" />}

      {step === 2 && (
        <div style={{background: '#1e293b', padding: '30px', borderRadius: '16px'}}>
          <h2 style={{color: '#10b981', marginBottom: '20px'}}>Soil Parameters</h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px'}}>
            <div>
              <label style={{display: 'block', marginBottom: '8px', color: '#94a3b8'}}>Salinity (EC dS/m)</label>
              <input type="number" step="0.1" value={soilData.salinity} onChange={e => setSoilData({...soilData, salinity: e.target.value})} placeholder="1.2" style={{width: '100%', padding: '12px', background: '#0f172a', border: '2px solid #334155', borderRadius: '8px', color: 'white'}} />
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '8px', color: '#94a3b8'}}>pH Level</label>
              <input type="number" step="0.1" value={soilData.pH} onChange={e => setSoilData({...soilData, pH: e.target.value})} placeholder="6.8" style={{width: '100%', padding: '12px', background: '#0f172a', border: '2px solid #334155', borderRadius: '8px', color: 'white'}} />
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '8px', color: '#94a3b8'}}>Organic Matter (%)</label>
              <input type="number" step="0.1" value={soilData.organicMatter} onChange={e => setSoilData({...soilData, organicMatter: e.target.value})} placeholder="4.5" style={{width: '100%', padding: '12px', background: '#0f172a', border: '2px solid #334155', borderRadius: '8px', color: 'white'}} />
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '8px', color: '#94a3b8'}}>Moisture Content (%)</label>
              <input type="number" step="0.1" value={soilData.moisture} onChange={e => setSoilData({...soilData, moisture: e.target.value})} placeholder="25" style={{width: '100%', padding: '12px', background: '#0f172a', border: '2px solid #334155', borderRadius: '8px', color: 'white'}} />
            </div>
          </div>
          <button onClick={handleAnalyze} disabled={loading} style={{width: '100%', padding: '16px', marginTop: '30px', background: loading ? '#334155' : 'linear-gradient(135deg, #10b981, #059669)', border: 'none', borderRadius: '12px', color: 'white', fontSize: '1.2rem', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer'}}>
            {loading ? '⏳ Analyzing...' : '🚀 Analyze Soil'}
          </button>
        </div>
      )}

      {step === 3 && <FileUploadComponent onUploadComplete={(data) => {setUploadedFiles(data.files || []); setStep(4);}} moduleType="soil" />}
      {step === 4 && <BillingComponent contactInfo={contactInfo} uploadedFiles={uploadedFiles} moduleType="soil" onPaymentComplete={(data) => {setPaymentData(data); setStep(5);}} />}

      {step === 5 && (
        <div>
          <QRCodeComponent 
            data={`AUDITDNA-SOIL-${paymentData?.transactionId}`}
            orderInfo={{
              orderId: paymentData?.transactionId,
              moduleType: 'Soil Analysis',
              customerName: contactInfo?.fullName,
              email: contactInfo?.email
            }}
          />
          <div style={{background: '#1e293b', padding: '30px', borderRadius: '16px', marginTop: '30px', textAlign: 'center'}}>
            <h2 style={{color: '#10b981'}}>✅ Results Ready!</h2>
            <div style={{fontSize: '3rem', fontWeight: '900', color: '#10b981', marginTop: '20px'}}>
              {analysis?.data?.health_score || 88}
            </div>
            <p style={{color: '#94a3b8'}}>Soil Health Score</p>
          </div>
        </div>
      )}
    </div>
  );
}