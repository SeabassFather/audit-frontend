import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import data from '../data/services.json';

export default function GlobalSearch(){
 const [q,setQ]=useState('');const nav=useNavigate();
 const all=data.categories.flatMap(c=>
 (c.items||[]).concat(...(c.subcategories||[]).map(sc=>sc.items||[]))
 );
 const results=all.filter(i=>i.name.toLowerCase().includes(q.toLowerCase())).slice(0,8);
 return(
 <div style={{margin:'12px 0'}}>
 <input className='input' placeholder='Quick search services' value={q} onChange={e=>setQ(e.target.value)} style={{width:'100%'}}/>
 {q && (
 <div className='card' style={{position:'absolute',zIndex:10,background:'#fff',maxHeight:200,overflowY:'auto',width:'90%'}}>
 {results.map(r=>
 <div key={r.id} style={{padding:6,cursor:'pointer'}} onClick={()=>nav('/service/'+r.id)}>{r.name}</div>
 )}
 </div>
 )}
 </div>
 )
}