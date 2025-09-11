import React from 'react'
import { fetchCommoditySeries } from './usdaApi'
import CommodityChart from './CommodityChart.jsx'
import { Search } from 'lucide-react'

const COMMON = ['ORANGES','PAPAYA','LETTUCE','TOMATOES','AVOCADO','GRAPES','BERRIES']

export default function UsdaCommoditySearch({ mode='demo' }){
  const [q, setQ] = React.useState('PAPAYA')
  const [range, setRange] = React.useState([1,26])
  const [loading, setLoading] = React.useState(false)
  const [lines, setLines] = React.useState([])
  const [error, setError] = React.useState('')

  async function run(){
    setLoading(true); setError('')
    try{
      const out = await fetchCommoditySeries({
        commodity: q,
        wFrom: range[0],
        wTo: range[1],
        yearsBack: 5
      })
      setLines(out)
    } catch(e){
      setError(String(e.message||e))
      setLines([])
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(()=>{ run() }, []) // initial

  return (
    <div className='space-y-4'>
      <h1 className='text-2xl font-semibold'>USDA Pricing</h1>

      <div className='card'>
        <div className='card-bd flex flex-wrap items-center gap-3'>
          <div className='flex items-center gap-2'>
            <input
              value={q}
              onChange={(e)=>setQ(e.target.value.toUpperCase())}
              placeholder='Commodity (e.g., PAPAYA)'
              className='border border-gray-300 rounded-xl px-3 py-2 w-56'
            />
            <button onClick={()=>setQ(COMMON[0])} className='btn'>Common</button>
          </div>
          <div className='flex items-center gap-2'>
            <label className='text-sm text-gray-600'>Week:</label>
            <input type='number' min='1' max='26' value={range[0]} onChange={e=>setRange([+e.target.value, range[1]])} className='border border-gray-300 rounded-xl px-2 py-1 w-16'/>
            <span></span>
            <input type='number' min='1' max='26' value={range[1]} onChange={e=>setRange([range[0], +e.target.value])} className='border border-gray-300 rounded-xl px-2 py-1 w-16'/>
          </div>
          <button onClick={run} className='btn primary'>
            <Search size={16} className='mr-1'/> Search
          </button>
          <div className='ml-auto text-xs text-gray-600'>
            Mode: <b>{mode.toUpperCase()}</b> (uses NASS key if provided)
          </div>
        </div>
      </div>

      {error && <div className='p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700'>{error}</div>}
      {loading ? (
        <div className='p-4 text-sm text-gray-600'>Loading</div>
      ) : lines?.length ? (
        <CommodityChart lines={lines}/>
      ) : (
        <div className='text-sm text-gray-600'>No data.</div>
      )}

      <div className='text-xs text-gray-500'>
        Tip: set <code>VITE_NASS_KEY</code> in your shell for live NASS calls: <code>4F158DB1-85C2-3243-BFFA-58B53FB40D23 = 'YOUR_KEY'</code>
      </div>
    </div>
  )
}