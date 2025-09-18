import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

export default function PriceChart({data}){
  return (
    <div className="card">
      <div className="text-lg font-semibold mb-3">Weekly Price  W1 to W26 + 5Year Average</div>
      <div style={{width:"100%", height: 360}}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{top:10,right:20,left:0,bottom:0}}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" tickMargin={8} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="price" name="Current" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="avg5" name="5yr Avg" strokeWidth={2} strokeDasharray="5 5" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}