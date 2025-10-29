import React from 'react';
import { Activity, TrendingUp, FileText } from 'lucide-react';
export default function Home(){
  return (
    <div className='container'>
      <h1>AuditDNA Global Dashboard</h1>
      <div className='grid'>
        <div className='card'><Activity/> USDA Pricing <p className='muted'>Track commodities</p></div>
        <div className='card'><TrendingUp/> Mortgage Engine <p className='muted'>Find best rates</p></div>
        <div className='card'><FileText/> Ag Factoring <p className='muted'>Finance invoices</p></div>
        <div className='card'><FileText/> Compliance <p className='muted'>Audit frameworks</p></div>
      </div>
    </div>
  );
}



