import { useState } from "react";

export default function LoanMatchForm({ onSearch }) {
 const [values, setValues] = useState({
 state: "",
 price: "",
 down: "",
 loanAmount: "",
 ltv: "",
 dti: "",
 creditRange: "720+"
 });

 function setValue(k, v){
 setValues(s => ({ ...s, [k]: v }));
 }

 function submit(e){
 e.preventDefault();
 onSearch?.(values);
 }

 return (
 <form onSubmit={submit} className="card p-4 space-y-3 max-w-2xl">
 <div className="grid md:grid-cols-3 gap-3">
 <select
 className="border rounded p-2"
 value={values.state}
 onChange={(e)=>setValue("state", e.target.value)}
 >
 <option value="">State</option>
 <option value="CA">CA</option>
 <option value="TX">TX</option>
 <option value="FL">FL</option>
 <option value="WA">WA</option>
 <option value="NY">NY</option>
 </select>

 <input
 className="border rounded p-2"
 placeholder="Price"
 value={values.price}
 onChange={(e)=>setValue("price", e.target.value)}
 />

 <input
 className="border rounded p-2"
 placeholder="Down"
 value={values.down}
 onChange={(e)=>setValue("down", e.target.value)}
 />
 </div>

 <div className="grid md:grid-cols-3 gap-3">
 <input
 className="border rounded p-2"
 placeholder="Loan Amount"
 value={values.loanAmount}
 onChange={(e)=>setValue("loanAmount", e.target.value)}
 />

 <input
 className="border rounded p-2"
 placeholder="LTV %"
 value={values.ltv}
 onChange={(e)=>setValue("ltv", e.target.value)}
 />

 <input
 className="border rounded p-2"
 placeholder="DTI %"
 value={values.dti}
 onChange={(e)=>setValue("dti", e.target.value)}
 />
 </div>

 <div className="grid md:grid-cols-3 gap-3">
 <select
 className="border rounded p-2"
 value={values.creditRange}
 onChange={(e)=>setValue("creditRange", e.target.value)}
 >
 <option value="720+">720+</option>
 <option value="680-719">680-719</option>
 <option value="640-679">640-679</option>
 <option value="600-639">600-639</option>
 <option value="<600">&lt;600</option>
 </select>

 <button className="bg-dnaBlue text-white px-3 py-2 rounded" type="submit">
 Search
 </button>
 </div>
 </form>
 );
}