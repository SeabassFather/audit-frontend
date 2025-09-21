import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function CommodityChart({ lines = [] }){
 // lines: [{ year, rows:[{week, price}] }]
 const weeks = [...new Set(lines.flatMap(l=> l.rows.map(r=> r.week)))].sort((a,b)=>a-b)
 const data = weeks.map(w => {
 const obj = { week: 'W'+w }
 for (const l of lines) {
 const r = l.rows.find(x=>x.week===w)
 obj[l.year] = r?.price ?? null
 }
 return obj
 })

 return (
 <div className='card'>
 <div className='card-hd'>5-Year Weekly Overlay (W1W26)</div>
 <div className='card-bd' style={{height: 360}}>
 <ResponsiveContainer width='100%' height='100%'>
 <LineChart data={data}>
 <CartesianGrid strokeDasharray='3 3' />
 <XAxis dataKey='week' />
 <YAxis />
 <Tooltip />
 <Legend />
 {lines.map((l,idx)=>(
 <Line key={l.year} type='monotone' dataKey={l.year} dot={false}/>
 ))}
 </LineChart>
 </ResponsiveContainer>
 </div>
 </div>
 )
}