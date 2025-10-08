import React, { useEffect, useState } from "react";

const sampleData = [
  { label: "Avocados", value: 27.45, change: +1.2 },
  { label: "Mortgage 30Y", value: 6.85, change: -0.05 },
  { label: "Factoring Advance", value: 82, change: +0.7 },
  { label: "Water Index", value: 103.2, change: -1.1 },
  { label: "Carbon Credit", value: 19.8, change: +2.3 }
];

export default function Ticker() {
  const [data, setData] = useState([...sampleData, ...sampleData, ...sampleData]);

  useEffect(() => {
    const int = setInterval(() => {
      setData(prev =>
        prev.map(item => {
          let rand = (Math.random() - 0.5) * 0.5;
          return {
            ...item,
            value: +(item.value + rand).toFixed(2),
            change: +(rand).toFixed(2)
          };
        })
      );
    }, 4000);
    return () => clearInterval(int);
  }, []);

  return (
    <div style={{
      background: 'linear-gradient(90deg, #1e293b 0%, #334155 50%, #1e293b 100%)',
      borderBottom: '1px solid #475569',
      overflow: 'hidden',
      padding: '10px 0',
      width: '100%'
    }}>
      <div style={{
        display: 'flex',
        gap: '60px',
        animation: 'tickerScroll 40s linear infinite',
        whiteSpace: 'nowrap'
      }}>
        {data.map((item, i) => (
          <div key={i} style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            color: 'white',
            fontSize: '14px'
          }}>
            <span style={{ color: '#94a3b8', fontWeight: '600' }}>{item.label}</span>
            <span style={{ fontWeight: 'bold', fontSize: '15px' }}>{item.value}</span>
            <span style={{
              color: item.change >= 0 ? '#10b981' : '#ef4444',
              fontWeight: '600',
              fontSize: '12px'
            }}>
              {item.change >= 0 ? '▲' : '▼'} {Math.abs(item.change).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}