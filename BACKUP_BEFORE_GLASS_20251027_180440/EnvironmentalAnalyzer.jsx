import React, { useState } from 'react';

export default function EnvironmentalAnalyzer({ locationData, onAnalysisComplete }) {
  const [envData] = useState({
    sunrise: '06:30', sunset: '18:45', dayLength: 12.25, solarRadiation: 650,
    moonPhase: 'Full Moon 🌕', currentTemp: 72, maxTemp: 85, minTemp: 55,
    humidity: 65, windSpeed: 8, pressure: 30.12
  });

  return (
    <div style={{background: '#1e293b', padding: '30px', borderRadius: '16px', border: '2px solid #f59e0b'}}>
      <h2 style={{color: '#f59e0b', marginBottom: '20px'}}>🌞 Environmental Data</h2>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '20px'}}>
        <div style={{textAlign: 'center'}}><div style={{color: '#64748b', fontSize: '0.85rem'}}>Sunrise</div><div style={{color: '#fbbf24', fontSize: '1.5rem', fontWeight: '800'}}>{envData.sunrise}</div></div>
        <div style={{textAlign: 'center'}}><div style={{color: '#64748b', fontSize: '0.85rem'}}>Sunset</div><div style={{color: '#fbbf24', fontSize: '1.5rem', fontWeight: '800'}}>{envData.sunset}</div></div>
        <div style={{textAlign: 'center'}}><div style={{color: '#64748b', fontSize: '0.85rem'}}>Day Length</div><div style={{color: '#fbbf24', fontSize: '1.5rem', fontWeight: '800'}}>{envData.dayLength} hrs</div></div>
      </div>
      <button onClick={() => onAnalysisComplete(envData)} style={{width: '100%', padding: '16px', background: 'linear-gradient(135deg, #f59e0b, #d97706)', border: 'none', borderRadius: '12px', color: 'white', fontSize: '1.2rem', fontWeight: '700', cursor: 'pointer'}}>✅ Save Environmental Data</button>
    </div>
  );
}