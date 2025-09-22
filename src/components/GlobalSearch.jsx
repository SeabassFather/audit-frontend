import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import data from '../data/services.json';

const SEARCH_ENGINES = [
  { id: 'usda', name: 'USDA Commodity Search', path: '/usda-search', description: 'Search USDA commodity pricing data' },
  { id: 'mexico', name: 'Mexico Real Estate Loans', path: '/mexico-search', description: 'Cross-border real estate financing' },
  { id: 'factoring', name: 'Factoring Search', path: '/factoring', description: 'Invoice factoring and working capital' },
  { id: 'lenders', name: 'Lenders Database', path: '/lenders-search', description: 'Search real estate lenders nationwide' },
];

export default function GlobalSearch(){
 const [q,setQ]=useState('');const nav=useNavigate();
 const all=data.categories.flatMap(c=>
 (c.items||[]).concat(...(c.subcategories||[]).map(sc=>sc.items||[]))
 );
 
 const serviceResults=all.filter(i=>i.name.toLowerCase().includes(q.toLowerCase())).slice(0,6);
 const engineResults=SEARCH_ENGINES.filter(e=>
   e.name.toLowerCase().includes(q.toLowerCase()) || e.description.toLowerCase().includes(q.toLowerCase())
 ).slice(0,4);
 
 const hasResults = q && (serviceResults.length > 0 || engineResults.length > 0);
 
 return(
 <div style={{margin:'12px 0', position: 'relative'}}>
 <input className='input' placeholder='Quick search services & tools...' value={q} onChange={e=>setQ(e.target.value)} style={{width:'100%'}}/>
 {hasResults && (
 <div className='card' style={{position:'absolute',zIndex:10,background:'#fff',maxHeight:300,overflowY:'auto',width:'100%',marginTop:'4px',boxShadow:'0 4px 6px -1px rgba(0,0,0,0.1)'}}>
 {engineResults.length > 0 && (
   <div>
     <div style={{padding:'8px 12px',background:'#f8fafc',fontSize:'12px',fontWeight:'600',color:'#64748b',borderBottom:'1px solid #e2e8f0'}}>SEARCH ENGINES</div>
     {engineResults.map(r=>
     <div key={r.id} style={{padding:'8px 12px',cursor:'pointer',borderBottom:'1px solid #f1f5f9'}} 
          onMouseEnter={e=>e.target.style.background='#f8fafc'} 
          onMouseLeave={e=>e.target.style.background='transparent'}
          onClick={()=>{nav(r.path);setQ('')}}>
       <div style={{fontWeight:'500'}}>{r.name}</div>
       <div style={{fontSize:'12px',color:'#64748b'}}>{r.description}</div>
     </div>
     )}
   </div>
 )}
 {serviceResults.length > 0 && (
   <div>
     <div style={{padding:'8px 12px',background:'#f8fafc',fontSize:'12px',fontWeight:'600',color:'#64748b',borderBottom:'1px solid #e2e8f0'}}>SERVICES</div>
     {serviceResults.map(r=>
     <div key={r.id} style={{padding:'8px 12px',cursor:'pointer'}} 
          onMouseEnter={e=>e.target.style.background='#f8fafc'} 
          onMouseLeave={e=>e.target.style.background='transparent'}
          onClick={()=>{nav('/service/'+r.id);setQ('')}}>
       {r.name}
     </div>
     )}
   </div>
 )}
 {!serviceResults.length && !engineResults.length && q && (
   <div style={{padding:'12px',color:'#64748b',textAlign:'center'}}>No results found</div>
 )}
 </div>
 )}
 </div>
 )
}
