import React from "react";

function MiniChart({ points = "0,60 20,40 40,55 60,25 80,50 100,30" }) {
  return (
    <svg viewBox="0 0 100 80" className="mini-chart">
      <polyline fill="none" stroke="currentColor" strokeWidth="2" points={points}/>
    </svg>
  );
}

export default function Dashboard(){
  return (
    <div className="grid">
      <div className="card">
        <div className="card-title">Active Cases</div>
        <div className="metric">42</div>
        <MiniChart />
      </div>
      <div className="card">
        <div className="card-title">USDA Records</div>
        <div className="metric">—</div>
        <div className="subtext">Open USDA tab to fetch</div>
      </div>
      <div className="card">
        <div className="card-title">Lender Partners</div>
        <div className="metric">18</div>
        <MiniChart points="0,70 20,60 40,45 60,40 80,35 100,30" />
      </div>
      <div className="card">
        <div className="card-title">PDF Exports</div>
        <div className="metric">7</div>
        <MiniChart points="0,30 20,50 40,20 60,40 80,10 100,35" />
      </div>
    </div>
  );
}