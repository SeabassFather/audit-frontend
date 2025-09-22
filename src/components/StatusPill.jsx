import React from 'react'
export default function StatusPill({online}) {
 const c = online ? 'bg-emerald-100 text-emerald-700 border-emerald-300' : 'bg-rose-100 text-rose-700 border-rose-300'
 return <span className={'inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ' + c}>
 <span className={'h-2.5 w-2.5 rounded-full ' + (online?'bg-emerald-500':'bg-rose-500')}></span>
 {online ? 'Backend: Online' : 'Backend: Offline'}
 </span>
}
