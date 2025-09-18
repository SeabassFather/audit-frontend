import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts'
export default function PriceChart({data}){
  return (
    <div className='card'>
      <div className='text-lg font-semibold mb-2'>W1W26 Price Trend</div>
      <div style={{width:'100%', height:360}}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='week'/><YAxis/><Tooltip/><Legend/>
            <Line type='monotone' dataKey='price' name='This Season' dot={false} />
            <Line type='monotone' dataKey='avg5' name='5-Year Avg' strokeDasharray='5 5' dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}