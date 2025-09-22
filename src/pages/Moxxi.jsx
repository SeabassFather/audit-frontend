import { useState } from "react";
export default function Moxxi(){
 const [input,setInput]=useState({purpose:"purchase",fico:710,dti:0.38,ltv:0.65,loanAmount:400000});
 const [result,setResult]=useState(null);
 const submit=async()=>{ const r=await fetch("/api/moxxi/quote",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(input)}); setResult(await r.json());};
 return <main className="p-6"><h2 className="text-xl font-bold mb-3">MoXi Mortgage</h2>
 <button className="btn-primary" onClick={submit}>Get Quote</button>
 <pre className="bg-slate-100 p-3 mt-4 rounded text-xs overflow-x-auto">{JSON.stringify(result,null,2)}</pre>
 </main>;
}
