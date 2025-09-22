import { useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
export default function Pricing(){
  const commodities = ["Lettuce","Tomatoes","Avocados","Strawberries"];
  const [c,setC] = useState(commodities[0]);
  const data = Array.from({length:26},(_,i)=>({week:"W"+(i+1),price: Math.round(10+Math.random()*5)}));
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">USDA Pricing</h1>
      <select value={c} onChange={e=>setC(e.target.value)} className="border p-2 rounded mb-4">
        {commodities.map(x=><option key={x}>{x}</option>)}
      </select>
      <div className="card p-4">
        <LineChart width={800} height={320} data={data}>
          <Line type="monotone" dataKey="price" stroke="#16a34a" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="week" /><YAxis /><Tooltip /><Legend />
        </LineChart>
      </div>
    </div>
  );
}
