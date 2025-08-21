import React, { useMemo, useState } from "react";
function qmPointsCap(a){ if(a>=100000) return .03; if(a>=60000) return .05; if(a>=20000) return .06; return .08; }
function hpml({spread,lien="first",jumbo=false}){ const t=lien==="subordinate"?3.5:(jumbo?2.5:1.5); return spread>=t; }
function qmStatus({spread,pointsPct,capPct,dti}){ if(pointsPct>capPct) return {label:"Non-QM"}; if(spread<1.5) return {label:"QM (Safe Harbor)"}; if(spread<2.25||dti<=43) return {label:"QM (Rebuttable)"}; return {label:"Non-QM"}; }
const LENDERS=[{name:"ConformCo",product:["30y Fixed","15y Fixed","5/1 ARM","10/1 ARM"],docs:["Full"],minScore:620,maxDTI:49,maxLTV:{Purchase:97,"Rate/Term":95,"Cash-Out":80},min:75000,max:766000,jumbo:false,occ:["Owner","Second"],types:["SFR","Condo","2-4 Unit"],requireQM:true,notes:"Best LLPA 680; MI >80% LTV."},
{name:"JumboPlus",product:["30y Fixed","10/1 ARM"],docs:["Full"],minScore:680,maxDTI:43,maxLTV:{Purchase:90,"Rate/Term":85,"Cash-Out":75},min:766000,max:3000000,jumbo:true,occ:["Owner","Second"],types:["SFR","Condo"],requireQM:true,notes:"Reserves 612mo."},
{name:"AltPrime BankStmt",product:["30y Fixed","10/1 ARM"],docs:["BankStmt"],minScore:660,maxDTI:50,maxLTV:{Purchase:85,"Rate/Term":80,"Cash-Out":75},min:150000,max:2000000,jumbo:true,occ:["Owner","Second","Investment"],types:["SFR","Condo","2-4 Unit"],requireQM:false,notes:"1224mo bank statements."},
{name:"DSCR Investor",product:["DSCR"],docs:["DSCR"],minScore:660,maxDTI:999,maxLTV:{Purchase:80,"Rate/Term":80,"Cash-Out":75},min:100000,max:2000000,jumbo:true,occ:["Investment"],types:["SFR","Condo","2-4 Unit"],requireQM:false,notes:"DSCR  1.01.1."},
{name:"ITIN Access",product:["30y Fixed"],docs:["Full"],minScore:640,maxDTI:50,maxLTV:{Purchase:80,"Rate/Term":75,"Cash-Out":70},min:100000,max:1000000,jumbo:false,occ:["Owner"],types:["SFR","Condo"],requireQM:false,notes:"ITIN & alt-doc."}];
const Badge=({kind,children})=>(<span className={`badge ${kind}`}>{children}</span>);
const Stat=({label,value})=>(<div className="stat"><div className="statVal">{value}</div><div className="statLbl">{label}</div></div>);
export default function LoanMatch(){
  const [f,setF]=useState({purpose:"Purchase",property:"SFR",occupancy:"Owner",credit:700,price:550000,down:110000,amount:440000,rate:7.25,apor:6.75,pointsPct:2.0,income:12000,debts:1800,doc:"Full",product:"30y Fixed"});
  const set=(k,v)=>setF(p=>({...p,[k]:v}));
  const dti = useMemo(()=> f.income? (f.debts/f.income)*100 : 0,[f.income,f.debts]);
  const ltv = useMemo(()=> f.price? (f.amount/f.price)*100 : 0,[f.price,f.amount]);
  const spread = useMemo(()=> Math.max(0,f.rate-f.apor),[f.rate,f.apor]);
  const capPct = useMemo(()=> qmPointsCap(f.amount)*100,[f.amount]);
  const qm = useMemo(()=> qmStatus({spread,pointsPct:f.pointsPct/100,capPct:capPct/100,dti}),[spread,f.pointsPct,capPct,dti]);
  const rows = useMemo(()=> LENDERS.map(l=>{
    if(f.credit<l.minScore) return {l,fail:`Score < ${l.minScore}`};
    if(dti>l.maxDTI && l.docs.indexOf("DSCR")===-1) return {l,fail:`DTI ${dti.toFixed(1)}%>${l.maxDTI}%`};
    if((l.maxLTV[f.purpose]??0) < ltv) return {l,fail:`LTV ${ltv.toFixed(1)}%>${l.maxLTV[f.purpose]}%`};
    if(l.requireQM && qm.label.startsWith("Non")) return {l,fail:`QM required`};
    let fit=60; fit+=Math.max(0,(l.maxDTI-dti)); fit+=Math.max(0,(l.maxLTV[f.purpose]-ltv)/2); fit+=Math.max(0,(f.credit-l.minScore)/10);
    return {l,fit:Math.round(Math.min(100,fit))};
  }).sort((a,b)=>(b.fit||0)-(a.fit||0)),[f,ltv,dti,qm]);
  return (<div className="page"><h2>Loan Match</h2>
    <div className="mortGrid">
      <label>Purpose<select value={f.purpose} onChange={e=>set("purpose",e.target.value)}>{["Purchase","Rate/Term","Cash-Out"].map(x=><option key={x}>{x}</option>)}</select></label>
      <label>Property<select value={f.property} onChange={e=>set("property",e.target.value)}>{["SFR","Condo","2-4 Unit"].map(x=><option key={x}>{x}</option>)}</select></label>
      <label>Occupancy<select value={f.occupancy} onChange={e=>set("occupancy",e.target.value)}>{["Owner","Second","Investment"].map(x=><option key={x}>{x}</option>)}</select></label>
      <label>Credit<input type="range" min="500" max="850" step="5" value={f.credit} onChange={e=>set("credit",+e.target.value)}/><span>{f.credit}</span></label>
      <label>Price<input type="number" value={f.price} onChange={e=>{const price=+e.target.value||0; setF(p=>({...p,price,amount:Math.max(0,price-p.down)}));}}/></label>
      <label>Down<input type="number" value={f.down} onChange={e=>{const down=+e.target.value||0; setF(p=>({...p,down,amount:Math.max(0,p.price-down)}));}}/></label>
      <label>Amount<input type="number" value={f.amount} onChange={e=>set("amount",+e.target.value||0)}/></label>
      <label>Rate %<input type="number" step="0.01" value={f.rate} onChange={e=>set("rate",+e.target.value||0)}/></label>
      <label>APOR %<input type="number" step="0.01" value={f.apor} onChange={e=>set("apor",+e.target.value||0)}/></label>
      <label>P&F %<input type="number" step="0.01" value={f.pointsPct} onChange={e=>set("pointsPct",+e.target.value||0)}/></label>
      <label>Income<input type="number" value={f.income} onChange={e=>set("income",+e.target.value||0)}/></label>
      <label>Debts<input type="number" value={f.debts} onChange={e=>set("debts",+e.target.value||0)}/></label>
      <label>Doc<select value={f.doc} onChange={e=>set("doc",e.target.value)}>{["Full","BankStmt","DSCR"].map(x=><option key={x}>{x}</option>)}</select></label>
      <label>Product<select value={f.product} onChange={e=>set("product",e.target.value)}>{["30y Fixed","15y Fixed","5/1 ARM","10/1 ARM"].map(x=><option key={x}>{x}</option>)}</select></label>
    </div>
    <div className="statRow"><Stat label="DTI" value={`${(f.income?(f.debts/f.income)*100:0).toFixed(1)}%`}/><Stat label="LTV" value={`${(f.price?(f.amount/f.price)*100:0).toFixed(1)}%`}/><Stat label="APR-APOR" value={`${Math.max(0,f.rate-f.apor).toFixed(2)}%`}/><Stat label="P&F Cap" value={`${(qmPointsCap(f.amount)*100).toFixed(2)}%`}/><div className="badges"><Badge kind={qm.label.startsWith("Non")?"bad":qm.label.includes("Rebut")?"warn":"good"}>{qm.label}</Badge></div></div>
    <div className="tableWrap"><table className="tbl"><thead><tr><th>Lender</th><th>Product</th><th>Docs</th><th>Max LTV ({f.purpose})</th><th>Min Score</th><th>Max DTI</th><th>MinMax</th><th>Fit</th><th>Notes</th><th>Status</th></tr></thead><tbody>{rows.map((r,i)=>{const cap=r.l?.maxLTV?.[f.purpose];if(r.fail)return(<tr key={i} className="mut"><td>{r.l.name}</td><td>{r.l.product?.join(", ")}</td><td>{r.l.docs?.join(", ")}</td><td>{cap?`${cap}%`:""}</td><td>{r.l.minScore}</td><td>{r.l.maxDTI}%</td><td>${r.l.min.toLocaleString()}  ${r.l.max.toLocaleString()}</td><td></td><td>{r.l.notes}</td><td><Badge kind="bad">{r.fail}</Badge></td></tr>);return(<tr key={i}><td>{r.l.name}</td><td>{r.l.product?.join(", ")}</td><td>{r.l.docs?.join(", ")}</td><td>{cap?`${cap}%`:""}</td><td>{r.l.minScore}</td><td>{r.l.maxDTI}%</td><td>${r.l.min.toLocaleString()}  ${r.l.max.toLocaleString()}</td><td><div className="fit"><div style={{width:`${r.fit}%`}}/></div><span>{r.fit}%</span></td><td>{r.l.notes}</td><td><Badge kind="good">Eligible</Badge></td></tr>);})}</tbody></table></div>
  </div>);
}