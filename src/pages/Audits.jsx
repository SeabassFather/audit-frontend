import { useMemo, useState } from 'react'
import { AUDIT_CATEGORIES } from '../data/audits'

export default function Audits(){
  const [q,setQ]=useState('')
  const [mode,setMode]=useState('demo')
  const cats = useMemo(()=>{
    const s=q.trim().toLowerCase()
    if(!s) return AUDIT_CATEGORIES
    return AUDIT_CATEGORIES.map(c=>({
      ...c,
      items: c.items.filter(i => i.name.toLowerCase().includes(s) || c.label.toLowerCase().includes(s))
    })).filter(c => c.items.length)
  },[q])

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Audits & Compliance Checks</h1>
        <div className='flex items-center gap-3 text-sm'>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder='Find an auditâ€¦'
                 className='rounded-md border px-3 py-2 w-64'/>
          <label className='flex items-center gap-2'>
            <input type='checkbox' checked={mode==='live'} onChange={e=>setMode(e.target.checked?'live':'demo')}/> Live
          </label>
        </div>
      </div>

      <div className='grid gap-4 lg:grid-cols-2'>
        {cats.map(c=>(
          <div key={c.id} className='card'>
            <div className='text-xs text-gray-500'>{c.label}</div>
            <div className='mt-2 grid sm:grid-cols-2 gap-2'>
              {c.items.map(i=>(
                <div key={i.id} className='rounded-xl border p-3'>
                  <div className='font-medium'>{i.name}</div>
                  <div className='mt-2 flex gap-2'>
                    <button className='btn btn-outline'>Open</button>
                    <button className='btn btn-primary'>{mode==='live'?'Run Check':'Demo'}</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {cats.length===0 && <div className='text-sm text-gray-500'>No audits match â€œ{q}â€.</div>}
      </div>
    </div>
  )
}
