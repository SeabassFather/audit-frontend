import React, { useState } from 'react';
import agriTests from '../data/agriTests.json';
import WaterTech from './WaterTech';

const thresholds = {
  // --- water ---
  EColi: 0, BOD: [0,30], COD: [0,50], Turbidity: [0,5], Chlorine: [0,4],
  Fluoride: [0,1.5], Nitrate: [0,10], Nitrite: [0,1], Ammonia: [0,2], Phosphorus: [0,5],
  Salinity: [0,2], TDS: [0,1500], Sodium: [0,100], Potassium: [0,20], Chloride: [0,250],
  Sulfates: [0,250], Boron: [0,1], Arsenic: 0.01, Lead: 0.015, Mercury: 0.002, Cadmium: 0.005,
  Zinc: [0,5], Copper: [0,1.3], Manganese: [0,0.3],
  // --- soil ---
  pH: [6,7.5], CEC: [10,30], OrganicMatter: [3,6], Nitrogen: [20,50],
  Phosphorus: [20,60], Potassium: [150,300], Calcium: [1000,3000], Magnesium: [50,300],
  Sulfur: [10,50], Zinc: [1,5], Copper: [0.2,2], Iron: [2,10], Manganese: [2,10],
  Boron: [0.5,1], Lead: 0.01, Cadmium: 0.01
};

export default function SoilTests(){
  const [source,setSource]=useState('Sanitation');
  const report=agriTests[source];

  const getStatus=(metric,val)=>{
    const range=thresholds[metric];
    if(range && Array.isArray(range)){
      if(val<range[0]||val>range[1]) return '';
      return '';
    }
    if(typeof range==='number' && val>range) return '';
    return '';
  };

  const failingMetrics=[];
  Object.entries(report).forEach(([metric,val])=>{
    if(getStatus(metric,val)!=='') failingMetrics.push(metric);
  });

  return (
    <div className='container'>
      <h1>Soil & Water SuperMax Analysis</h1>
      <label>Choose Source: </label>
      <select value={source} onChange={e=>setSource(e.target.value)}>
        {Object.keys(agriTests).map(s=><option key={s}>{s}</option>)}
      </select>
      <h2>{source} Results</h2>
      <table><thead><tr><th>Metric</th><th>Value</th><th>Status</th></tr></thead>
      <tbody>
        {Object.entries(report).map(([m,v])=>
          <tr key={m}><td>{m}</td><td>{v}</td><td>{getStatus(m,v)}</td></tr>
        )}
      </tbody></table>
      <h2>Suggested Technology</h2>
      <p className='muted'>Auto-matched to failing metrics: {failingMetrics.join(', ')||'None'}</p>
      <WaterTech match={failingMetrics}/>
    </div>
  );
}



