import React, { useState } from 'react';

export default function TraceabilityTracker({ sampleType = 'water', onLocationSubmit }) {
  const [locationData, setLocationData] = useState({
    latitude: '', longitude: '', altitude: '', farmName: '', fieldNumber: '',
    lotNumber: '', acreage: '', waterSource: '', currentCrop: '',
    fertilizersApplied: '', pesticidesApplied: ''
  });

  const getGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocationData({...locationData, latitude: pos.coords.latitude.toFixed(6), longitude: pos.coords.longitude.toFixed(6)}),
        () => alert('GPS unavailable')
      );
    }
  };

  return (
    <div style={{background: '#1e293b', padding: '30px', borderRadius: '16px', border: '2px solid #06b6d4'}}>
      <h2 style={{color: '#06b6d4', marginBottom: '20px'}}>Ã°Å¸Å’Â Location Tracking</h2>
      <button onClick={getGPS} style={{padding: '10px 20px', background: '#06b6d4', border: 'none', borderRadius: '8px', color: 'white', fontWeight: '700', cursor: 'pointer', marginBottom: '20px'}}>Ã°Å¸â€œÂ Auto-Detect GPS</button>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px'}}>
        <div><label style={{display: 'block', color: '#94a3b8', marginBottom: '5px'}}>Latitude *</label><input type="number" step="0.000001" value={locationData.latitude} onChange={e => setLocationData({...locationData, latitude: e.target.value})} style={{width: '100%', padding: '10px', background: '#0f172a', border: '2px solid #334155', borderRadius: '8px', color: 'white'}} /></div>
        <div><label style={{display: 'block', color: '#94a3b8', marginBottom: '5px'}}>Longitude *</label><input type="number" step="0.000001" value={locationData.longitude} onChange={e => setLocationData({...locationData, longitude: e.target.value})} style={{width: '100%', padding: '10px', background: '#0f172a', border: '2px solid #334155', borderRadius: '8px', color: 'white'}} /></div>
        <div><label style={{display: 'block', color: '#94a3b8', marginBottom: '5px'}}>Farm Name *</label><input type="text" value={locationData.farmName} onChange={e => setLocationData({...locationData, farmName: e.target.value})} style={{width: '100%', padding: '10px', background: '#0f172a', border: '2px solid #334155', borderRadius: '8px', color: 'white'}} /></div>
        <div><label style={{display: 'block', color: '#94a3b8', marginBottom: '5px'}}>Field Number *</label><input type="text" value={locationData.fieldNumber} onChange={e => setLocationData({...locationData, fieldNumber: e.target.value})} style={{width: '100%', padding: '10px', background: '#0f172a', border: '2px solid #334155', borderRadius: '8px', color: 'white'}} /></div>
        <div><label style={{display: 'block', color: '#94a3b8', marginBottom: '5px'}}>Acreage</label><input type="number" value={locationData.acreage} onChange={e => setLocationData({...locationData, acreage: e.target.value})} style={{width: '100%', padding: '10px', background: '#0f172a', border: '2px solid #334155', borderRadius: '8px', color: 'white'}} /></div>
        <div><label style={{display: 'block', color: '#94a3b8', marginBottom: '5px'}}>Current Crop</label><input type="text" value={locationData.currentCrop} onChange={e => setLocationData({...locationData, currentCrop: e.target.value})} style={{width: '100%', padding: '10px', background: '#0f172a', border: '2px solid #334155', borderRadius: '8px', color: 'white'}} /></div>
      </div>
      <button onClick={() => {
        if (!locationData.latitude || !locationData.longitude || !locationData.farmName || !locationData.fieldNumber) {
          alert('Ã¢Å¡Â Ã¯Â¸Â GPS coordinates, farm name, and field number required!');
          return;
        }
        onLocationSubmit({...locationData, traceabilityID: `${sampleType.toUpperCase()}-${locationData.farmName.replace(/\s/g, '')}-${locationData.fieldNumber}-${Date.now()}`});
      }} style={{width: '100%', marginTop: '20px', padding: '16px', background: 'linear-gradient(135deg, #06b6d4, #0891b2)', border: 'none', borderRadius: '12px', color: 'white', fontSize: '1.2rem', fontWeight: '700', cursor: 'pointer'}}>Ã¢Å“â€¦ Confirm Location</button>
    </div>
  );
}