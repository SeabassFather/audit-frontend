import { useMemo, useState } from "react";
const cats = ["Business Compliance","Commercial","Legal","Medical","Educational","Travel","Insurance","Consumer","Real Estate","Agriculture","Water Technology","Environmental","Finance","Cross-Border Trade","Logistics","HR & Payroll","Cybersecurity","Data Privacy","Debt & Collections","Tax & Accounting","Due Diligence","KYC/AML","Audits & QA","Safety & OSHA","Training & Certifications"];
const all = cats.flatMap(c => Array.from({length:12},(_,i)=>({ id:`${c}-${i+1}`, category:c, name:`${c}  Service ${i+1}`, summary:`High-impact ${c.toLowerCase()} solution #${i+1}`, tags:[c.split(" ")[0].toLowerCase(),"audit","compliance","auditdna"], status:(i+1)%5===0?"Pilot":"Available", sla:`${7+((i+1)%5)} days` })));
function groups(list){ const m=new Map(); for(const s of list){ if(!m.has(s.category)) m.set(s.category,[]); m.get(s.category).push(s);} return Array.from(m.entries()).map(([k,v])=>({category:k,items:v})); }
export default function Services(){
  const [q,setQ]=useState(new URLSearchParams(location.search).get("query")||"");
  const filtered = useMemo(()=>{ const s=q.trim().toLowerCase(); if(!s) return all; return all.filter(x => [x.name,x.summary,x.category,(x.tags||[]).join(" ")].join(" ").toLowerCase().includes(s)); },[q]);
  const g = useMemo(()=>groups(filtered),[filtered]);
  return (<div>
    <div className="card"><div className="h1">AuditDNA Services</div>
      <div className="controls"><div style={{flex:"1 1 auto"}}><div className="subtle">Search all {all.length} services</div><input style={{width:"100%"}} value={q} onChange={e=>setQ(e.target.value)} placeholder="legal, mortgage, OSHA, water tech, etc"/></div></div>
    </div>
    <div className="mt-4 grid grid-2">
      {g.map((grp,i)=>(<details key={i} className="accordion" open={i<4}>
        <summary>{grp.category}<span className="badge" style={{marginLeft:8}}>{grp.items.length}</span></summary>
        <section><table className="table"><thead><tr><th>Name</th><th>Summary</th><th>Tags</th><th>Status</th><th>SLA</th></tr></thead>
          <tbody>{grp.items.map(item=>(<tr key={item.id}><td style={{fontWeight:700}}>{item.name}</td><td>{item.summary}</td><td>{(item.tags||[]).map(t=><span className="tag" key={t}>{t}</span>)}</td><td>{item.status}</td><td>{item.sla}</td></tr>))}</tbody>
        </table></section>
      </details>))}
    </div>
  </div>);
}