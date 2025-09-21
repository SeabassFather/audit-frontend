import { useState } from "react";
export default function Tabs({tabs, initial=0}){
 const [i,setI] = useState(initial);
 return (
 <div>
 <div className="flex gap-2 border-b">
 {tabs.map((t,idx)=>(
 <button key={t.label}
 onClick={()=>setI(idx)}
 className={px-3 py-2 text-sm border-b-2 -mb-px ${i===idx?'border-dnaBlue text-dnaBlue':'border-transparent text-slate-600 hover:text-slate-900'}}>
 {t.label}
 </button>
 ))}
 </div>
 <div className="pt-4">{tabs[i]?.content}</div>
 </div>
 );
}
