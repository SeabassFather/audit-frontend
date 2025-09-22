import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const ALL_SERVICES = [
  { id: 'usda-pricing',    name: 'USDA Pricing',    cat: 'Agriculture' },
  { id: 'mortgage-search', name: 'Mortgage Search', cat: 'Finance' },
  { id: 'factoring',       name: 'Ag Factoring',    cat: 'Finance' },
  { id: 'compliance',      name: 'Compliance Kit',  cat: 'Compliance' },
];

function UploadSheet({ open, service, onClose }){
  if (!open) return null;
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='absolute inset-0 bg-black/40' onClick={onClose}/>
      <div className='relative z-10 w-[92vw] max-w-xl rounded-2xl border border-gray-200 bg-white p-5 shadow-xl'>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-semibold'>Upload to {service?.name ?? 'Service'}</h3>
          <button onClick={onClose} className='btn btn-outline'>Close</button>
        </div>
        <div className='mt-4'>
          <input type='file' className='block w-full text-sm' />
        </div>
        <div className='mt-5 flex justify-end gap-2'>
          <button onClick={onClose} className='btn btn-outline'>Cancel</button>
          <button onClick={onClose} className='btn btn-primary'>Upload</button>
        </div>
      </div>
    </div>
  )
}

export default function Services(){
  const [q, setQ] = useState('');
  const [sheet, setSheet] = useState({ open:false, svc:null });

  const list = useMemo(()=>{
    const query = q.trim().toLowerCase();
    if (!query) return ALL_SERVICES;
    return ALL_SERVICES.filter(s => s.name.toLowerCase().includes(query) || s.cat.toLowerCase().includes(query));
  }, [q]);

  return (
    <>
      <div className='mb-4 flex items-center justify-between gap-3'>
        <h1 className='text-2xl font-bold'>Services</h1>
        <input className='w-64 rounded-md border px-3 py-2 text-sm outline-none focus:ring'
               placeholder='Filter services' value={q} onChange={e=>setQ(e.target.value)} />
      </div>
      <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
        {list.map(s=>(
          <div key={s.id} className='card'>
            <div className='text-xs text-gray-500'>{s.cat}</div>
            <div className='mt-1 text-lg font-semibold'>{s.name}</div>
            <div className='mt-3 flex gap-2'>
              <Link to={'/service/'+s.id} className='btn btn-outline'>Open</Link>
              <button onClick={()=>setSheet({open:true, svc:s})} className='btn btn-primary'>Upload</button>
            </div>
          </div>
        ))}
      </div>

      <UploadSheet open={sheet.open} service={sheet.svc} onClose={()=>setSheet({open:false, svc:null})}/>
    </>
  )
}