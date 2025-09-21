import { Link, useLocation } from 'react-router-dom';
import data from '../data/services.json';

export default function Breadcrumbs(){
 const loc = useLocation();
 const parts = loc.pathname.split('/').filter(Boolean);
 let path = '';

 // Lookup helpers
 const findCat = (id)=> (data.categories||[]).find(c=>c.id===id);
 const findSub = (cat,id)=> (cat?.subcategories||[]).find(s=>s.id===id);
 const findSvc = (id)=>{
 for(const c of (data.categories||[])){
 for(const i of (c.items||[])){ if(i.id===id) return {svc:i,cat:c}; }
 for(const s of (c.subcategories||[])){
 for(const i of (s.items||[])){ if(i.id===id) return {svc:i,cat:c,sub:s}; }
 }
 }
 return null;
 };

 return (
 <div style={{fontSize:13,marginBottom:12,color:'#475569'}}>
 <Link to='/'>Dashboard</Link>
 {parts.map((p,i)=>{
 path+='/'+p;
 let label = p.charAt(0).toUpperCase()+p.slice(1);
 let linkPath = path;

 if(i===0 && p==='services'){ label='Services'; linkPath='/services'; }
 else if(i===1){ // category
 const cat=findCat(p);
 if(cat){ label=cat.title; linkPath='/services?open='+cat.id; }
 }
 else if(i===2){ // subcategory
 const cat=findCat(parts[1]);
 const sub=findSub(cat,p);
 if(sub){ label=sub.title; linkPath='/services?open='+cat.id+','+sub.id; }
 else {
 const svc=findSvc(p);
 if(svc){ label=svc.svc.name; linkPath='/service/'+svc.svc.id; }
 }
 }
 else if(i===3){ // service inside subcategory
 const svc=findSvc(p);
 if(svc){ label=svc.svc.name; linkPath='/service/'+svc.svc.id; }
 }

 return <span key={i}> <Link to={linkPath}>{label}</Link></span>
 })}
 </div>
 );
}
