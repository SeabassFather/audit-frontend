import { useState } from "react";

export default function TradeFinanceForm(){
  const [v,setV]=useState({
    legalName:"", duns:"", country:"Mexico", revenue:"", aging:"", facility:"Factoring",
    amount:"", currency:"USD", debtor:"", terms:"Net 30", recurrence:"One-off", season:"",
    collateral:"Inventory", shipping:"FOB", insurance:"Product COI", commitment:"60 days",
    regions:"Mexico, Central America, South America"
  });
  const set = e => setV(o=>({...o,[e.target.name]: e.target.value}));
  const preview = { business:{legalName:v.legalName,duns:v.duns,country:v.country,revenue:v.revenue,aging:v.aging},
    facility:v.facility, invoice:{amount:v.amount,currency:v.currency,debtor:v.debtor,terms:v.terms,recurrence:v.recurrence,season:v.season},
    collateral:{type:v.collateral, shipping:v.shipping, insurance:v.insurance},
    commitment:v.commitment, regions:v.regions };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="card p-4 space-y-2">
        <div className="font-semibold mb-1">Business</div>
        <input className="border p-2 rounded w-full" name="legalName" placeholder="Legal name" value={v.legalName} onChange={set}/>
        <div className="grid grid-cols-3 gap-2">
          <input className="border p-2 rounded" name="duns" placeholder="DUNS" value={v.duns} onChange={set}/>
          <input className="border p-2 rounded" name="country" placeholder="Country" value={v.country} onChange={set}/>
          <input className="border p-2 rounded" name="revenue" placeholder="Annual revenue" value={v.revenue} onChange={set}/>
        </div>
        <input className="border p-2 rounded w-full" name="aging" placeholder="AR aging summary" value={v.aging} onChange={set}/>
        <div className="font-semibold mt-3">Facility desired</div>
        <select className="border p-2 rounded w-full" name="facility" value={v.facility} onChange={set}>
          <option>Factoring</option><option>PO Financing</option><option>Both</option>
        </select>
      </div>

      <div className="card p-4 space-y-2">
        <div className="font-semibold mb-1">Invoice / PO</div>
        <div className="grid grid-cols-3 gap-2">
          <input className="border p-2 rounded" name="amount" placeholder="Amount" value={v.amount} onChange={set}/>
          <select className="border p-2 rounded" name="currency" value={v.currency} onChange={set}><option>USD</option><option>MXN</option></select>
          <input className="border p-2 rounded" name="debtor" placeholder="Debtor/Buyer" value={v.debtor} onChange={set}/>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <select className="border p-2 rounded" name="terms" value={v.terms} onChange={set}><option>Net 30</option><option>Net 45</option><option>Net 60</option><option>Net 90</option></select>
          <select className="border p-2 rounded" name="recurrence" value={v.recurrence} onChange={set}><option>One-off</option><option>Monthly</option><option>Seasonal</option></select>
          <input className="border p-2 rounded" name="season" placeholder="Season (if seasonal)" value={v.season} onChange={set}/>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <input className="border p-2 rounded" name="collateral" placeholder="Collateral" value={v.collateral} onChange={set}/>
          <input className="border p-2 rounded" name="shipping" placeholder="Shipping terms" value={v.shipping} onChange={set}/>
          <input className="border p-2 rounded" name="insurance" placeholder="Insurance" value={v.insurance} onChange={set}/>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <select className="border p-2 rounded" name="commitment" value={v.commitment} onChange={set}>
            <option>30 days</option><option>60 days</option><option>90 days</option><option>120 days</option><option>Seasonal</option>
          </select>
          <input className="border p-2 rounded" name="regions" placeholder="Regions allowed" value={v.regions} onChange={set}/>
        </div>
      </div>

      <div className="md:col-span-2 card p-4">
        <div className="font-semibold mb-2">Preview (tradeFinanceMatcher input)</div>
        <pre className="text-xs overflow-auto">{JSON.stringify(preview,null,2)}</pre>
        <div className="flex gap-2 mt-2">
          <button className="bg-dnaBlue text-white px-3 py-2 rounded">Request Factoring</button>
          <button className="border px-3 py-2 rounded">Request PO Finance</button>
        </div>
      </div>
    </div>
  );
}