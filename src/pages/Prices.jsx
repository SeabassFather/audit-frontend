import { useEffect, useMemo, useState } from "react";
import { getUSDAWeeklyPrices } from "../lib/api";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from "recharts";

const DEFAULT = { commodity:"Tomatoes", market:"Nogales", year:new Date().getFullYear() };

export default function Prices(){
  const [commodity, setCommodity] = useState(DEFAULT.commodity);
  const [market, setMarket] = useState(DEFAULT.market);
  const [year, setYear] = useState(DEFAULT.year);
  const [data, setData] = useState([]);
  const [avg, setAvg] = useState([]);

  async function load(){ 
    const res = await getUSDAWeeklyPrices({ commodity, market, year });
    setData(res.current || []); setAvg(res.avg5 || []);
  }
  useEffect(()=>{ load(); },[commodity,market,year]);

  const chartData = useMemo(()=>{
    const map = {};
    data.forEach(d=>{ map[d.week] = { week:d.week, price:d.price }});
    avg.forEach(d=>{ map[d.week] = { ...(map[d.week]||{week:d.week}), avg5:d.price }});
    return Object.values(map).sort((a,b)=>a.week-b.week);
  },[data, avg]);

  return (
    <div className="card">
      <div className="controls">
        <div>
          <div style={{fontSize:12,color:"#6b7280"}}>Commodity</div>
          <select value={commodity} onChange={e=>setCommodity(e.target.value)}>
            {["Tomatoes","Avocados","Limes","Bell Peppers","Cucumbers"].map(c=><option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <div style={{fontSize:12,color:"#6b7280"}}>Market</div>
          <select value={market} onChange={e=>setMarket(e.target.value)}>
            {["Nogales","McAllen","San Diego","Los Angeles"].map(m=><option key={m}>{m}</option>)}
          </select>
        </div>
        <div>
          <div style={{fontSize:12,color:"#6b7280"}}>Year</div>
          <input type="number" value={year} min="2010" max="2100" onChange={e=>setYear(+e.target.value)}/>
        </div>
        <button className="btn btn-primary" onClick={load}>Refresh</button>
      </div>

      <div className="mt-4" style={{height:380}}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top:10, right:16, bottom:0, left:0 }}>
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="week" tickFormatter={w=>"W"+w}/>
            <YAxis domain={["auto","auto"]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="price" name={`${year}`} strokeWidth={2} dot={false}/>
            <Line type="monotone" dataKey="avg5" name="5-yr avg" strokeWidth={2} strokeDasharray="6 6" dot={false}/>
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2" style={{fontSize:12,color:"#6b7280"}}>Backend proxy or synthetic fallback.</p>
    </div>
  );
}
