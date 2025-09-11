import { useEffect, useMemo, useState } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

function synth(commodity){
  const weeks = Array.from({length:26},(_,i)=> `W${i+1}`);
  const h = [...commodity].reduce((a,c)=> (a*31 + c.charCodeAt(0))|0, 0);
  const base = Math.abs(h)%30 + 20, amp = 6 + (Math.abs(h*7)%10);
  return weeks.map((w,i)=>({ week:w, price: Math.round((base + Math.sin(i/4)*amp + ((i%5)-2))*100)/100, avg5: Math.round((base-2 + Math.sin((i+1)/4)*(amp*.6))*100)/100 }));
}

export default function PricingUSDA(){
  const [commodity,setCommodity] = useState("Papaya");
  const data = useMemo(()=> synth(commodity),[commodity]);
  return (
    <div className="space-y-4">
      <div className="card">
        <label className="block text-sm text-gray-600 mb-1">Commodity</label>
        <select className="border border-silver-300 rounded-xl2 px-3 py-2" value={commodity} onChange={e=>setCommodity(e.target.value)}>
          {["Papaya","Orange","Lemon","Avocado","Tomato","Onion","Corn","Carrot"].map(c=> <option key={c}>{c}</option>)}
        </select>
        <div className="text-xs text-gray-600 mt-1">Synthetic series shows immediately; wire live NASS/AMS later.</div>
      </div>

      <div className="card">
        <div className="text-lg font-semibold mb-3">Weekly Price  W1 to W26 + 5-Year Average</div>
        <div style={{width:"100%", height: 360}}>
          <ResponsiveContainer>
            <LineChart data={data} margin={{top:10,right:20,left:0,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" tickMargin={8} />
              <YAxis allowDecimals={false} />
              <Tooltip /><Legend />
              <Line type="monotone" dataKey="price" name="Current" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="avg5"  name="5-yr Avg" strokeWidth={2} strokeDasharray="5 5" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}