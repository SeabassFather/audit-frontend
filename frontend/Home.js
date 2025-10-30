$ErrorActionPreference = "Stop"
cd "C:\AuditDNA\AUDIT_DNA_Frontend_Final\frontend"

Set-Content -Path .\src\pages\Home.js -Value @"
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import services from '../data/services.json';

function getRandomService() {
  const cat = services[Math.floor(Math.random()*services.length)];
  const item = cat.items[Math.floor(Math.random()*cat.items.length)];
  return cat.category + ': ' + item;
}

export default function Home(){
  const [tick, setTick] = useState({});

  useEffect(()=>{
    const interval = setInterval(()=>{
      setTick({
        services: getRandomService(),
        usda: 'USDA ' + ['Avocados','Tomatoes','Strawberries','Lettuce'][Math.floor(Math.random()*4)] + ' W' + (1+Math.floor(Math.random()*26)),
        mortgage: 'Loan Rate ' + (6+Math.random()).toFixed(2) + '%',
        factoring: 'Invoice $' + (10000+Math.random()*20000).toFixed(0),
        admin: ['GDPR: ✅','CCPA: ⚠️','GLBA: ✅','HIPAA: ⚠️'][Math.floor(Math.random()*4)]
      });
    }, 3000);
    return ()=> clearInterval(interval);
  },[]);

  const cards = [
    {to:'/services', title:'Services', desc:'Spartan 300 categories & audits', key:'services'},
    {to:'/usda', title:'USDA Pricing', desc:'Weekly commodity price tracking', key:'usda'},
    {to:'/mortgage', title:'Mortgage', desc:'Loan search, audit & compliance', key:'mortgage'},
    {to:'/factoring', title:'Ag Factoring', desc:'Invoice upload & trade finance', key:'factoring'},
    {to:'/admin', title:'Admin', desc:'Global Compliance & Ethics', key:'admin'}
  ];

  return (
    <div className='container'>
      <h1>AuditDNA Dashboard</h1>
      <p className='muted'>Your unified compliance, audit, and trade-finance platform.</p>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:20,marginTop:20}}>
        {cards.map(c=>(
          <Link key={c.to} to={c.to} style={{textDecoration:'none',color:'inherit'}}>
            <div className='card' style={{minHeight:120,display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
              <div>
                <h2 style={{margin:'0 0 6px 0',fontSize:18,color:'var(--auditdna-blue)'}}>{c.title}</h2>
                <p className='muted' style={{margin:0,fontSize:13}}>{c.desc}</p>
              </div>
              <div style={{marginTop:12,fontSize:14,fontWeight:600,color:'var(--accent)'}}>
                {tick[c.key] || 'Loading…'}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
"@
