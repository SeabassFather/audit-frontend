import React, { useMemo } from "react";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid
} from "recharts";

const COLORS = ["#4da3ff","#2ecc71","#ff7f50","#a78bfa","#f59e0b","#ef4444","#10b981","#06b6d4","#ec4899","#94a3b8"];

export default function CommodityCompare({ seriesMap = {} }){
  const keys = Object.keys(seriesMap);
  const data = useMemo(()=>{
    // merge by date: {date, Papaya, Orange, ...}
    const map = new Map();
    keys.forEach(k=>{
      (seriesMap[k]||[]).forEach(p=>{
        const row = map.get(p.date) || { date: p.date };
        row[k] = p.price;
        map.set(p.date, row);
      });
    });
    return Array.from(map.values()).sort((a,b)=> a.date.localeCompare(b.date));
  }, [seriesMap, keys.join("|")]);

  return (
    <div style={{height: 380, background:"#0f1733", border:"1px solid #233055", borderRadius:16, padding:12}}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ left: 10, right: 20, top: 10, bottom: 10 }}>
          <CartesianGrid stroke="#1f2a4d" strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{fill:"#9fb2e4"}} minTickGap={24}/>
          <YAxis tick={{fill:"#9fb2e4"}} />
          <Tooltip contentStyle={{ background:"#0e1530", border:"1px solid #233055", borderRadius:12, color:"#e9eeff" }}/>
          <Legend />
          {keys.map((k, i)=> (
            <Line key={k} type="monotone" dataKey={k} stroke={COLORS[i%COLORS.length]} strokeWidth={2} dot={false} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}