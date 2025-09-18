import { useEffect,useState } from "react";
export default function RealEstate(){
  const [list,setList]=useState([]);
  useEffect(()=>{ fetch("/api/realestate/mx").then(r=>r.json()).then(setList);},[]);
  return <main className="p-6"><h2 className="text-xl font-bold mb-3">Mexico Real Estate</h2>
    <ul>{list.map(p=><li key={p.id}>{p.state}  {p.type}  ${p.priceUSD.toLocaleString()}</li>)}</ul>
  </main>;
}