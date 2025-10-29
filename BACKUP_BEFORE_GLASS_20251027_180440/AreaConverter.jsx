import React from 'react';

export default function AreaConverter({ value, onChange }) {
  return (
    <div>
      <input type="number" value={value} onChange={e => onChange(e.target.value)} style={{width: '100%', padding: '10px', background: '#1e293b', border: '2px solid #334155', borderRadius: '8px', color: 'white'}} />
      <div style={{color: '#64748b', fontSize: '0.75rem', marginTop: '5px'}}>≈ {(value * 0.404686).toFixed(2)} hectares</div>
    </div>
  );
}