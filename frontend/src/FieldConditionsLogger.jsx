import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import audioSystem from './audioSystem';

const FieldConditionsLogger = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    location: '',
    gps: '',
    weather: '',
    temp: '',
    humidity: '',
    soilTemp: '',
    notes: '',
    photos: []
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Field conditions logged:', formData);
    audioSystem.playSuccess();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ location: '', gps: '', weather: '', temp: '', humidity: '', soilTemp: '', notes: '', photos: [] });
    }, 3000);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '2rem', color: '#fff' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        <h1 style={{ fontSize: '3.5rem', textAlign: 'center', color: '#f59e0b', marginBottom: '1rem' }}>
          📍 Field Conditions Logger
        </h1>
        <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '3rem', fontSize: '1.2rem' }}>
          {language === 'es' ? 'Documenta condiciones de campo para trazabilidad' : 'Document field conditions for traceability'}
        </p>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '4rem', background: 'rgba(30, 41, 59, 0.6)', borderRadius: '25px', border: '2px solid #10b981' }}>
            <div style={{ fontSize: '6rem', marginBottom: '2rem' }}>✅</div>
            <h2 style={{ fontSize: '2.5rem', color: '#10b981', marginBottom: '1rem' }}>
              {language === 'es' ? '¡Condiciones Guardadas!' : 'Conditions Logged!'}
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#94a3b8' }}>
              {language === 'es' ? 'Datos agregados a trazabilidad' : 'Data added to traceability record'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ background: 'rgba(30, 41, 59, 0.6)', borderRadius: '25px', padding: '3rem', border: '2px solid rgba(245, 158, 11, 0.3)' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8', fontWeight: 'bold' }}>
                  📍 {language === 'es' ? 'Ubicación' : 'Location'}
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="Block 7, Lot 3A"
                  style={{ width: '100%', padding: '1rem', background: 'rgba(15, 23, 42, 0.6)', border: '2px solid #334155', borderRadius: '12px', color: '#fff', fontSize: '1rem', outline: 'none' }}
                  onFocus={(e) => e.target.style.borderColor = '#f59e0b'}
                  onBlur={(e) => e.target.style.borderColor = '#334155'}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8', fontWeight: 'bold' }}>
                  🌍 GPS Coordinates
                </label>
                <input
                  type="text"
                  value={formData.gps}
                  onChange={(e) => setFormData({...formData, gps: e.target.value})}
                  placeholder="19.7060, -101.1949"
                  style={{ width: '100%', padding: '1rem', background: 'rgba(15, 23, 42, 0.6)', border: '2px solid #334155', borderRadius: '12px', color: '#fff', fontSize: '1rem', outline: 'none' }}
                  onFocus={(e) => e.target.style.borderColor = '#f59e0b'}
                  onBlur={(e) => e.target.style.borderColor = '#334155'}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8', fontWeight: 'bold' }}>
                  🌤️ {language === 'es' ? 'Clima' : 'Weather'}
                </label>
                <select
                  value={formData.weather}
                  onChange={(e) => setFormData({...formData, weather: e.target.value})}
                  style={{ width: '100%', padding: '1rem', background: 'rgba(15, 23, 42, 0.6)', border: '2px solid #334155', borderRadius: '12px', color: '#fff', fontSize: '1rem', cursor: 'pointer' }}
                >
                  <option value="">Select...</option>
                  <option value="sunny">☀️ Sunny</option>
                  <option value="cloudy">☁️ Cloudy</option>
                  <option value="rainy">🌧️ Rainy</option>
                  <option value="windy">💨 Windy</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8', fontWeight: 'bold' }}>
                  🌡️ Temperature (°C)
                </label>
                <input
                  type="number"
                  value={formData.temp}
                  onChange={(e) => setFormData({...formData, temp: e.target.value})}
                  placeholder="25"
                  style={{ width: '100%', padding: '1rem', background: 'rgba(15, 23, 42, 0.6)', border: '2px solid #334155', borderRadius: '12px', color: '#fff', fontSize: '1rem', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8', fontWeight: 'bold' }}>
                  💧 Humidity (%)
                </label>
                <input
                  type="number"
                  value={formData.humidity}
                  onChange={(e) => setFormData({...formData, humidity: e.target.value})}
                  placeholder="65"
                  style={{ width: '100%', padding: '1rem', background: 'rgba(15, 23, 42, 0.6)', border: '2px solid #334155', borderRadius: '12px', color: '#fff', fontSize: '1rem', outline: 'none' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8', fontWeight: 'bold' }}>
                📝 {language === 'es' ? 'Notas de Campo' : 'Field Notes'}
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                rows={5}
                placeholder="Soil condition, crop status, any observations..."
                style={{ width: '100%', padding: '1rem', background: 'rgba(15, 23, 42, 0.6)', border: '2px solid #334155', borderRadius: '12px', color: '#fff', fontSize: '1rem', resize: 'vertical', fontFamily: 'inherit' }}
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8', fontWeight: 'bold' }}>
                📸 {language === 'es' ? 'Fotos' : 'Photos'}
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setFormData({...formData, photos: Array.from(e.target.files)})}
                style={{ width: '100%', padding: '1rem', background: 'rgba(15, 23, 42, 0.6)', border: '2px solid #334155', borderRadius: '12px', color: '#fff', cursor: 'pointer' }}
              />
            </div>

            <button
              type="submit"
              style={{ width: '100%', padding: '1.5rem', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', border: 'none', borderRadius: '15px', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.2rem', boxShadow: '0 10px 30px rgba(245, 158, 11, 0.5)' }}
            >
              ✅ {language === 'es' ? 'Guardar Condiciones' : 'Save Conditions'}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};

export default FieldConditionsLogger;
