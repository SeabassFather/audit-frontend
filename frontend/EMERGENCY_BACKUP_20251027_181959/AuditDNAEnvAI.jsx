import React, { useState } from "react";
import axios from "axios";
import FileUploadComponent from './FileUploadComponent';
import ContactCardComponent from './ContactCardComponent';
import BillingComponent from './BillingComponent';
import QRCodeComponent from './QRCodeComponent';

export default function AuditDNAEnvAI() {
  const [step, setStep] = useState(1);
  const [contactInfo, setContactInfo] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [paymentData, setPaymentData] = useState(null);
  const [envData, setEnvData] = useState({
    waterPH: 7.0,
    soilPH: 6.5,
    temperature: 22,
    humidity: 65
  });
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8001/api/ai/analyze", {
        water: { pH: envData.waterPH, nitrate: 5, turbidity: 2 },
        soil: { pH: envData.soilPH, salinity: 1.0, organic: 4.0 },
        environment: { temperature: envData.temperature, humidity: envData.humidity }
      });
      setAnalysis(response.data);
      setStep(3);
    } catch (err) {
      alert("Backend error!");
    }
    setLoading(false);
  };

  return (
    <div style={{padding: '40px', background: '#0f172a', minHeight: '100vh', color: 'white'}}>
      <h1 style={{fontSize: '2.5rem', color: '#10b981', marginBottom: '30px'}}>
        ðŸŒ¿ Environment AI Analysis
      </h1>

      {/* PROGRESS STEPS - MATCHING OTHER MODULES */}
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
          {num: 2, label: 'Environment', icon: 'ðŸŒ¿'},
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
              background: step >= s.num ? '#10b981' : '#334155',
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
              color: step >= s.num ? '#10b981' : '#64748b',
              fontWeight: '600',
              fontSize: '0.9rem'
            }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {step === 1 && <ContactCardComponent onContactSubmit={(data) => {setContactInfo(data); setStep(2);}} moduleType="environmental" />}

      {step === 2 && (
        <div style={{background: '#1e293b', padding: '30px', borderRadius: '16px'}}>
          <h2 style={{color: '#10b981', marginBottom: '20px'}}>Environmental Data</h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px'}}>
            <div>
              <label style={{display: 'block', marginBottom: '8px', color: '#94a3b8'}}>Water pH</label>
              <input type="number" step="0.1" value={envData.waterPH} onChange={e => setEnvData({...envData, waterPH: e.target.value})} style={{width: '100%', padding: '12px', background: '#0f172a', border: '2px solid #334155', borderRadius: '8px', color: 'white'}} />
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '8px', color: '#94a3b8'}}>Soil pH</label>
              <input type="number" step="0.1" value={envData.soilPH} onChange={e => setEnvData({...envData, soilPH: e.target.value})} style={{width: '100%', padding: '12px', background: '#0f172a', border: '2px solid #334155', borderRadius: '8px', color: 'white'}} />
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '8px', color: '#94a3b8'}}>Temperature (Â°C)</label>
              <input type="number" step="0.1" value={envData.temperature} onChange={e => setEnvData({...envData, temperature: e.target.value})} style={{width: '100%', padding: '12px', background: '#0f172a', border: '2px solid #334155', borderRadius: '8px', color: 'white'}} />
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '8px', color: '#94a3b8'}}>Humidity (%)</label>
              <input type="number" step="0.1" value={envData.humidity} onChange={e => setEnvData({...envData, humidity: e.target.value})} style={{width: '100%', padding: '12px', background: '#0f172a', border: '2px solid #334155', borderRadius: '8px', color: 'white'}} />
            </div>
          </div>
          <button onClick={handleAnalyze} disabled={loading} style={{width: '100%', padding: '16px', marginTop: '30px', background: loading ? '#334155' : 'linear-gradient(135deg, #10b981, #059669)', border: 'none', borderRadius: '12px', color: 'white', fontSize: '1.2rem', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer'}}>
            {loading ? 'â³ Analyzing...' : 'ðŸš€ Analyze Environment'}
          </button>
        </div>
      )}

      {step === 3 && <FileUploadComponent onUploadComplete={(data) => {setUploadedFiles(data.files || []); setStep(4);}} moduleType="environmental" />}
      {step === 4 && <BillingComponent contactInfo={contactInfo} uploadedFiles={uploadedFiles} moduleType="environmental" onPaymentComplete={(data) => {setPaymentData(data); setStep(5);}} />}

      {step === 5 && (
        <div>
          <QRCodeComponent 
            data={`AUDITDNA-ENV-${paymentData?.transactionId}`}
            orderInfo={{
              orderId: paymentData?.transactionId,
              moduleType: 'Environment AI',
              customerName: contactInfo?.fullName,
              email: contactInfo?.email
            }}
          />
          <div style={{background: '#1e293b', padding: '30px', borderRadius: '16px', marginTop: '30px', textAlign: 'center'}}>
            <h2 style={{color: '#10b981', marginBottom: '20px'}}>âœ… Analysis Complete!</h2>
            <div style={{fontSize: '4rem', marginBottom: '15px'}}>ðŸŒ¿</div>
            <div style={{fontSize: '3rem', fontWeight: '900', color: '#10b981', marginTop: '20px'}}>
              {analysis?.EcoIndex || 88}
            </div>
            <p style={{color: '#94a3b8', fontSize: '1.2rem'}}>EcoIndex Score</p>
          </div>
        </div>
      )}
    </div>
  );
}