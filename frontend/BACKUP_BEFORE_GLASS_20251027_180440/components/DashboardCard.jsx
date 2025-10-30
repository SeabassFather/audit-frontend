import React from 'react';
import './DashboardCard.css';

function DashboardCard({ title, live, children, gradient, onClick }) {
  return (
    <div
      className='dashboard-card'
      style={{
        background: gradient || 'linear-gradient(90deg,#e3f2fd 0%,#e8f5e9 100%)',
        cursor: onClick ? 'pointer' : 'default'
      }}
      onClick={onClick}
    >
      <div className='dashboard-card-header'>
        <span>{title}</span>
        {live && <span className='dashboard-card-live'>LIVE</span>}
      </div>
      <div className='dashboard-card-content'>{children}</div>
    </div>
  );
}

export default DashboardCard;
