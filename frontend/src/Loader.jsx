import React from 'react';
export default function Loader() {
  return (
    <div style={{
      height:'100vh',
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      background:'linear-gradient(135deg,#0f172a,#14532d)',
      color:'#38bdf8',
      fontSize:'26px',
      fontWeight:'600'
    }}>
      Loading AuditDNA Modules...
    </div>
  );
}
