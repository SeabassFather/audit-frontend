import { useState } from "react";

export default function LoanMatchForm(){
  const [v,setV] = useState({
    name:"", email:"", phone:"", consentNMLS:false, consentSoft:false,
    address:"", type:"Single Family", occupancy:"Primary", purpose:"Purchase",
    price:"", value:"", credit:"680-719", dti:"<35%", ltv:"<=80%", income:"", assets:"",
    amount:"", product:"Conventional", close:"30-45 days", lock:"Floating"
  });
  const set = e => setV(o=>({...o, [e.target.name]: e.target.type==="checkbox"? e.target.checked : e.target.value}));

  const preview = {
    lead:{ name:v.name, email:v.email, phone:v.phone, consentNMLS:v.consentNMLS, consentSoft:v.consentSoft },
    property:{ address:v.address, type:v.type, occupancy:v.occupancy, purpose:v.purpose, price:v.price, value:v.value },
    financial:{ credit:v.credit, dti:v.dti, ltv:v.ltv, income:v.income, assets:v.assets, amount:v.amount, product:v.product },
    timing:{ close:v.close, lock:v.lock }
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="card p-4 space-y-2">
        <div className="font-semibold mb-1">Borrower</div>
        <input className="border p-2 rounded w-full" name="name" placeholder="Full name" value={v.name} onChange={set}/>
        <input className="border p-2 rounded w-full" name="email" placeholder="Email" value={v.email} onChange={set}/>
        <input className="border p-2 rounded w-full" name="phone" placeholder="Phone" value={v.phone} onChange={set}/>
        <label className="text-sm flex items-center gap-2"><input type="checkbox" name="consentNMLS" checked={v.consentNMLS} onChange={set}/> NMLS consent</label>
        <label className="text-sm flex items-center gap-2"><input type="checkbox" name="consentSoft" checked={v.consentSoft} onChange={set}/> Soft-pull consent</label>
        <div className="font-semibold mt-3">Property</div>
        <input className="border p-2 rounded w-full" name="address" placeholder="Address" value={v.address} onChange={set}/>
        <div className="grid grid-cols-3 gap-2">
          <select className="border p-2 rounded" name="type" value={v.type} onChange={set}>
            <option>Single Family</option><option>Condo</option><option>Multi-Family</option>
          </select>
          <select className="border p-2 rounded" name="occupancy" value={v.occupancy} onChange={set}>
            <option>Primary</option><option>Second Home</option><option>Investment</option>
          </select>
          <select className="border p-2 rounded" name="purpose" value={v.purpose} onChange={set}>
            <option>Purchase</option><option>Refi</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <input className="border p-2 rounded" name="price" placeholder="Purchase price" value={v.price} onChange={set}/>
          <input className="border p-2 rounded" name="value" placeholder="Est. value" value={v.value} onChange={set}/>
        </div>
      </div>

      <div className="card p-4 space-y-2">
        <div className="font-semibold mb-1">Financial & Product</div>
        <div className="grid grid-cols-3 gap-2">
          <select className="border p-2 rounded" name="credit" value={v.credit} onChange={set}>
            <option>{"<620"}</option><option>620-679</option><option>680-719</option><option>720-759</option><option>{">=760"}</option>
          </select>
          <select className="border p-2 rounded" name="dti" value={v.dti} onChange={set}>
            <option>{"<35%"}</option><option>35-43%</option><option>{">43%"}</option>
          </select>
          <select className="border p-2 rounded" name="ltv" value={v.ltv} onChange={set}>
            <option>{"<=80%"}</option><option>80-90%</option><option>{">90%"}</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <input className="border p-2 rounded" name="income" placeholder="Annual income" value={v.income} onChange={set}/>
          <input className="border p-2 rounded" name="assets" placeholder="Liquid assets" value={v.assets} onChange={set}/>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <input className="border p-2 rounded" name="amount" placeholder="Loan amount" value={v.amount} onChange={set}/>
          <select className="border p-2 rounded" name="product" value={v.product} onChange={set}>
            <option>Conventional</option><option>FHA</option><option>VA</option><option>USDA</option><option>Jumbo</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <select className="border p-2 rounded" name="close" value={v.close} onChange={set}>
            <option>30-45 days</option><option>15-30 days</option><option>ASAP</option>
          </select>
          <select className="border p-2 rounded" name="lock" value={v.lock} onChange={set}>
            <option>Floating</option><option>Lock now</option>
          </select>
        </div>
      </div>

      <div className="md:col-span-2 card p-4">
        <div className="font-semibold mb-2">Preview (loanMatcher input)</div>
        <pre className="text-xs overflow-auto">{JSON.stringify(preview,null,2)}</pre>
        <button className="mt-2 bg-dnaBlue text-white px-3 py-2 rounded">Run Match (demo)</button>
      </div>
    </div>
  );
}