﻿import { useMemo, useState } from 'react'

const LENDERS = [
  { name:'MoXi Capital', state:'TX', product:'Leasehold Structure', maxLTV: 70, minScore: 660 },
  { name:'Blue Coast Finance', state:'CA', product:'2nd Home Mexico', maxLTV: 65, minScore: 680 },
  { name:'Desert Bay Lending', state:'AZ', product:'Cross-Border Condo', maxLTV: 60, minScore: 640 }
]

export default function Mortgage(){
  const [score, setScore] = useState(700)
  const [ltv, setLtv] = useState(65)
  const [state, setState] = useState('TX')

  const matches = useMemo(()=>{
    return LENDERS
      .filter(l=> l.minScore <= score && l.maxLTV >= ltv)
      .filter(l=> !state || l.state === state)
      .map(l=> ({ ...l, match: Math.round(((score - l.minScore)/100)*60 + (l.maxLTV - ltv)) }))
      .sort((a,b)=> b.match - a.match)
  }, [score, ltv, state])

  return (
    <div className='card'>
      <h2 className='text-lg font-semibold'>Mortgage Search (Stub)</h2>
      <div className='mt-3 grid gap-3 sm:grid-cols-3'>
        <label className='block text-sm'>Credit Score
          <input type='number' value={score} onChange={e=>setScore(+e.target.value)}
                 className='mt-1 w-full rounded-md border px-2 py-1'/>
        </label>
        <label className='block text-sm'>Target LTV (%)
          <input type='number' value={ltv} onChange={e=>setLtv(+e.target.value)}
                 className='mt-1 w-full rounded-md border px-2 py-1'/>
        </label>
        <label className='block text-sm'>State
          <select value={state} onChange={e=>setState(e.target.value)}
                  className='mt-1 w-full rounded-md border px-2 py-1'>
            {['TX','CA','AZ','NV','NM'].map(s=> <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
      </div>

      <div className='mt-4 grid gap-3 sm:grid-cols-2'>
        {matches.map((m,i)=>(
          <div key={i} className='card'>
            <div className='text-sm text-gray-500'>{m.product}  {m.state}</div>
            <div className='mt-1 font-semibold'>{m.name}</div>
            <div className='mt-2 text-sm'>Max LTV: {m.maxLTV}%  Min Score: {m.minScore}</div>
            <div className='mt-2 text-sm'>Match Score: <b>{m.match}</b></div>
          </div>
        ))}
      </div>
    </div>
  )
}
