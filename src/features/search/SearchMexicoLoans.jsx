import React, { useMemo, useState } from "react";
import ContactCard from "../../components/ContactCard";
import { saveLead } from "../../lib/leads";

const STATES = ["CDMX","JAL","NLE","QRO","YUC","BCN","BCS","GTO","MEX","MOR","PUE","QROO","SIN","SON","TAM","VER"];
const PROPERTY_TYPES = ["Residential", "Condo", "Land", "Mixed-use"];
const PURPOSES = ["Purchase","Refinance","Cash-out Refi","Construction"];
const CURRENCIES = ["USD","MXN"];
const INCOME_DOC = ["Full-Doc","Bank Statements","DSCR-like","Foreign National (Alt-Doc)"];
const TERMS = [10,15,20,25,30];

export default function SearchMexicoLoans(){
  const [f,setF] = useState({
    state:"CDMX", city:"", propertyType:"Residential", purpose:"Purchase",
    price:8000000, downPct:30, loanCurrency:"MXN",
    residency:"Foreign National", nationality:"US", term:20,
    monthlyIncome:250000, monthlyDebts:20000, incomeDoc:"Foreign National (Alt-Doc)"
  });

  const ltv = useMemo(()=> Math.max(0, Math.min(100, 100 - (f.downPct||0))), [f.downPct]);
  const dti = useMemo(()=>{
    const inc = Number(f.monthlyIncome||0), debts = Number(f.monthlyDebts||0);
    return inc>0 ? +((debts)/(inc)).toFixed(2) : null;
  },[f.monthlyIncome,f.monthlyDebts]);

  const prelim = useMemo(()=>{
    // crude gate: max LTV 80; DTI target <= 0.45; min price 1M MXN for foreign national alt-doc
    const gates = [];
    if (ltv > 80) gates.push("Target  80% LTV"); 
    if (dti!=null && dti > 0.45) gates.push("Target DTI  0.45");
    if (f.residency.includes("Foreign") && (f.price||0) < 1000000) gates.push("Min price  1,000,000 MXN for FN/Alt-Doc");
    return gates.length ? { ok:false, notes:gates } : { ok:true, notes:["Looks in-range for partner underwriting"] };
  },[ltv,dti,f]);

  function change(k,v){ setF(s=>({ ...s, [k]: v })); }

  function handleLead(lead){
    const payload = { ...lead, service:"MEX-RE", app: f, calc:{ ltv, dti } };
    if (saveLead(payload)) alert("Mexico Loan lead saved to Inbox.");
  }

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 rounded-2xl border border-amber-300 bg-amber-50 p-4 space-y-3">
        <div className="grid md:grid-cols-3 gap-3">
          <div>
            <label className="text-xs text-slate-600">State</label>
            <select className="w-full rounded-lg border border-slate-300 px-3 py-2" value={f.state} onChange={e=>change("state", e.target.value)}>
              {STATES.map(s=><option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-600">City</label>
            <input className="w-full rounded-lg border border-slate-300 px-3 py-2" value={f.city} onChange={e=>change("city", e.target.value)} placeholder="CDMX / Guadalajara / etc."/>
          </div>
          <div>
            <label className="text-xs text-slate-600">Property Type</label>
            <select className="w-full rounded-lg border border-slate-300 px-3 py-2" value={f.propertyType} onChange={e=>change("propertyType", e.target.value)}>
              {PROPERTY_TYPES.map(p=><option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-600">Purpose</label>
            <select className="w-full rounded-lg border border-slate-300 px-3 py-2" value={f.purpose} onChange={e=>change("purpose", e.target.value)}>
              {PURPOSES.map(p=><option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-600">Price ({f.loanCurrency})</label>
            <input type="number" className="w-full rounded-lg border border-slate-300 px-3 py-2" value={f.price} onChange={e=>change("price", +e.target.value||0)} />
          </div>
          <div>
            <label className="text-xs text-slate-600">Down Payment %</label>
            <input type="number" className="w-full rounded-lg border border-slate-300 px-3 py-2" value={f.downPct} onChange={e=>change("downPct", +e.target.value||0)} />
          </div>
          <div>
            <label className="text-xs text-slate-600">Currency</label>
            <select className="w-full rounded-lg border border-slate-300 px-3 py-2" value={f.loanCurrency} onChange={e=>change("loanCurrency", e.target.value)}>
              {CURRENCIES.map(c=><option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-600">Residency</label>
            <select className="w-full rounded-lg border border-slate-300 px-3 py-2" value={f.residency} onChange={e=>change("residency", e.target.value)}>
              <option>Mexican Resident</option><option>Foreign National</option><option>Temporary/Permanent Resident</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-600">Nationality</label>
            <input className="w-full rounded-lg border border-slate-300 px-3 py-2" value={f.nationality} onChange={e=>change("nationality", e.target.value)} placeholder="US / CA / EU / etc."/>
          </div>
          <div>
            <label className="text-xs text-slate-600">Term (years)</label>
            <select className="w-full rounded-lg border border-slate-300 px-3 py-2" value={f.term} onChange={e=>change("term", +e.target.value||20)}>
              {TERMS.map(t=><option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-600">Monthly Income ({f.loanCurrency})</label>
            <input type="number" className="w-full rounded-lg border border-slate-300 px-3 py-2" value={f.monthlyIncome} onChange={e=>change("monthlyIncome", +e.target.value||0)} />
          </div>
          <div>
            <label className="text-xs text-slate-600">Monthly Debts ({f.loanCurrency})</label>
            <input type="number" className="w-full rounded-lg border border-slate-300 px-3 py-2" value={f.monthlyDebts} onChange={e=>change("monthlyDebts", +e.target.value||0)} />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs text-slate-600">Income Documentation</label>
            <select className="w-full rounded-lg border border-slate-300 px-3 py-2" value={f.incomeDoc} onChange={e=>change("incomeDoc", e.target.value)}>
              {INCOME_DOC.map(x=><option key={x}>{x}</option>)}
            </select>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-3 grid sm:grid-cols-3 gap-3">
          <div>
            <div className="text-xs text-slate-500">Estimated LTV</div>
            <div className="text-xl font-semibold text-slate-900">{ltv}%</div>
          </div>
          <div>
            <div className="text-xs text-slate-500">Estimated DTI</div>
            <div className="text-xl font-semibold text-slate-900">{dti!=null ? (dti*100).toFixed(0)+"%" : ""}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500">Prelim Check</div>
            <div className={`text-sm font-medium ${prelim.ok? "text-emerald-700" : "text-rose-700"}`}>
              {prelim.ok ? "In-range" : "Adjust inputs"}
            </div>
          </div>
          {!prelim.ok && <div className="sm:col-span-3 text-xs text-rose-700">{prelim.notes.join("  ")}</div>}
        </div>
      </div>

      <ContactCard
        title="Real Estate Loans  Mexico (Agent Network)"
        partner="Partner-backed (private)"
        service="MEX-RE"
        onSubmit={handleLead}
       targetEmail="saul@financelend.me" />
    </div>
  );
}