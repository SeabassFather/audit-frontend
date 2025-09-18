import React, { useState } from 'react'
export default function MortgageMexico(){
  const [fico, setFico] = useState(710)
  const [ltv, setLtv] = useState(0.70)
  const [dti, setDti] = useState(0.38)
  const [state, setState] = useState('ROO')
  const [loading, setLoading] = useState(false)
  const [lenders, setLenders] = useState([])

  const findLenders = async () => {
    setLoading(true)
    try {
      await new Promise(r=>setTimeout(r,700))
      setLenders([
        {name:'Moxie (Cabo)', products:['Leasehold','Construction'], maxLTV:0.75, minFICO:680, mxStates:['BCS','JAL','ROO']},
        {name:'CB Lend Partners', products:['Condo','Villa'], maxLTV:0.70, minFICO:700, mxStates:['ROO','YUC']},
      ])
    } finally { setLoading(false) }
  }

  return (
    <main className='mx-auto max-w-6xl px-4 py-10 grid gap-6'>
      <section className='card'>
        <div className='flex items-center justify-between mb-4'>
          <h1 className='text-xl font-bold'>USA  Mexico Scenario</h1>
          <div className='text-xs text-slate-500'>Leasehold-friendly flow (no land ownership)</div>
        </div>

        <div className='grid md:grid-cols-5 gap-4'>
          <div><div className='text-xs font-medium text-slate-600'>FICO</div><input className='input' type='number' min='520' max='850' value={fico} onChange={e=>setFico(+e.target.value)} /></div>
          <div><div className='text-xs font-medium text-slate-600'>LTV (01)</div><input className='input' type='number' step='0.01' min='0' max='1' value={ltv} onChange={e=>setLtv(+e.target.value)} /></div>
          <div><div className='text-xs font-medium text-slate-600'>DTI (01)</div><input className='input' type='number' step='0.01' min='0' max='1' value={dti} onChange={e=>setDti(+e.target.value)} /></div>
          <div>
            <div className='text-xs font-medium text-slate-600'>Property (MX State)</div>
            <select className='input' value={state} onChange={e=>setState(e.target.value)}>
              {['ROO','BCS','JAL','YUC','SON','NAY'].map(s=><option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className='flex items-end'><button onClick={findLenders} className='btn-primary w-full'>{loading ? 'Searching' : 'Find Cross-Border Lenders'}</button></div>
        </div>
      </section>

      <section className='grid gap-4 md:grid-cols-2'>
        {lenders.length === 0 ? (
          <div className='card'><div className='text-sm text-slate-600'>Enter a scenario and click <span className='font-semibold'>Find Cross-Border Lenders</span>.</div></div>
        ) : lenders.map((l,i)=>(
          <div key={i} className='card'>
            <div className='flex items-center justify-between'>
              <h3 className='text-lg font-semibold'>{l.name}</h3>
              <span className='px-3 py-1 rounded-full text-xs font-semibold bg-auditdna-glow/40 text-slate-800 border border-yellow-300'>max LTV {Math.round(l.maxLTV*100)}%</span>
            </div>
            <div className='mt-2 text-sm text-slate-700'>Products: {l.products.join(', ')}</div>
            <div className='mt-1 text-sm text-slate-700'>Min FICO: {l.minFICO}</div>
            <div className='mt-1 text-xs text-slate-500'>Coverage: {l.mxStates.join('  ')}</div>
            <div className='mt-4 flex gap-2'>
              <button className='btn-primary'>Request Pre-check</button>
              <button className='btn-ghost'>View Terms</button>
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}